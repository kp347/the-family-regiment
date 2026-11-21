
"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { useRouter } from "next/navigation";
import QuestionCard from "@/components/builder/QuestionCard";
import { createClient } from "@/lib/supabase/client";

type SymbolsForm = {
  animals: string;
  colors: string;
  places: string;
  objects: string;
  plants: string;
  meaningfulSymbols: string;
};

type SaveStatus =
  | "loading"
  | "saved"
  | "saving"
  | "unsaved"
  | "error";

const emptyForm: SymbolsForm = {
  animals: "",
  colors: "",
  places: "",
  objects: "",
  plants: "",
  meaningfulSymbols: "",
};

export default function SymbolsPage() {
  const router = useRouter();

  const [recordId, setRecordId] = useState<string | null>(
    null
  );
  const [form, setForm] = useState<SymbolsForm>(emptyForm);
  const [userId, setUserId] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [saveStatus, setSaveStatus] =
    useState<SaveStatus>("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const [revision, setRevision] = useState(0);
  const [navigating, setNavigating] = useState(false);

  const latestFormRef = useRef<SymbolsForm>(emptyForm);
  const revisionRef = useRef(0);
  const savedRevisionRef = useRef(0);
  const saveQueueRef = useRef<Promise<boolean>>(
    Promise.resolve(true)
  );

  useEffect(() => {
    let cancelled = false;

    async function loadSymbols() {
      const supabase = createClient();

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (cancelled) return;

      if (userError || !user) {
        router.replace("/auth/sign-in");
        return;
      }

      // One account owns one Family Record.
      // Geographic family branches remain optional
      // fields within that record.
      const { data: record, error } = await supabase
        .from("family_records")
        .select("id, symbols")
        .eq("user_id", user.id)
        .maybeSingle();

      if (cancelled) return;

      if (error || !record) {
        if (error) {
          console.error(
            "Unable to load Symbols:",
            error
          );
        }

        setBlocked(true);
        setErrorMessage(
          "We could not find your Family Record. Return to the Founding Journey and complete Origins first."
        );
        setSaveStatus("error");
        setLoaded(true);
        return;
      }

      const restored: SymbolsForm = record.symbols
        ? {
            ...emptyForm,
            ...(record.symbols as Partial<SymbolsForm>),
          }
        : { ...emptyForm };

      latestFormRef.current = restored;
      setForm(restored);
      setRecordId(record.id);
      setUserId(user.id);
      setLoaded(true);
      setSaveStatus("saved");
    }

    void loadSymbols();

    return () => {
      cancelled = true;
    };
  }, [router]);

  function updateField(
    field: keyof SymbolsForm,
    value: string
  ) {
    if (blocked || !recordId || navigating) return;

    revisionRef.current += 1;

    const next: SymbolsForm = {
      ...latestFormRef.current,
      [field]: value,
    };

    latestFormRef.current = next;
    setForm(next);
    setRevision(revisionRef.current);
    setSaveStatus("unsaved");
    setErrorMessage("");
  }

  function saveSymbols(
    nextArticle?: "achievements"
  ): Promise<boolean> {
    if (!userId || !recordId || blocked || !loaded) {
      setErrorMessage(
        "Your Family Record is unavailable. Please refresh and try again."
      );
      setSaveStatus("error");
      return Promise.resolve(false);
    }

    const performSave = async (): Promise<boolean> => {
      setSaveStatus("saving");
      setErrorMessage("");

      const supabase = createClient();

      // Save the latest answers. If edits arrive while
      // saving, continue until they are persisted.
      do {
        const version = revisionRef.current;
        const snapshot = { ...latestFormRef.current };

        const payload = {
          symbols: snapshot,
          updated_at: new Date().toISOString(),
          ...(nextArticle
            ? { current_article: nextArticle }
            : {}),
        };

        const { data: savedRecord, error } = await supabase
          .from("family_records")
          .update(payload)
          .eq("id", recordId)
          .eq("user_id", userId)
          .select("id")
          .maybeSingle();

        if (error || !savedRecord) {
          console.error(
            "Unable to save Symbols:",
            error ?? "No matching Family Record"
          );

          setErrorMessage(
            "Your changes could not be saved. Please try again."
          );
          setSaveStatus("error");
          return false;
        }

        savedRevisionRef.current = Math.max(
          savedRevisionRef.current,
          version
        );
      } while (
        savedRevisionRef.current < revisionRef.current
      );

      setSaveStatus("saved");
      return true;
    };

    // Queue all saves, including chapter advancement.
    const operation = saveQueueRef.current.then(
      performSave,
      performSave
    );

    saveQueueRef.current = operation;

    return operation;
  }

  useEffect(() => {
    if (!loaded || !userId || !recordId || blocked) {
      return;
    }

    if (revision === 0) return;
    if (revision <= savedRevisionRef.current) return;

    const timer = window.setTimeout(() => {
      void saveSymbols();
    }, 800);

    return () => window.clearTimeout(timer);

    // saveSymbols reads the latest form from refs.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [revision, loaded, userId, recordId, blocked]);

  async function saveNow() {
    if (blocked || !recordId || navigating) return;

    await saveSymbols();
  }

  async function goBack() {
    if (blocked || !recordId || navigating) return;

    setNavigating(true);

    const success = await saveSymbols();

    if (success) {
      router.push("/begin/traditions");
    } else {
      setNavigating(false);
    }
  }

  async function continueToAchievements(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (blocked || !recordId || navigating) return;

    if (!latestFormRef.current.meaningfulSymbols.trim()) {
      setErrorMessage(
        "Please describe the symbols most meaningful to your family."
      );
      return;
    }

    setNavigating(true);

    const success = await saveSymbols("achievements");

    if (!success) {
      setNavigating(false);
      return;
    }

    router.push("/begin/achievements");
  }

  function getStatusText() {
    switch (saveStatus) {
      case "loading":
        return "Loading Family Record...";
      case "saving":
        return "Saving to Family Record...";
      case "unsaved":
        return "Changes pending";
      case "error":
        return "Save failed";
      default:
        return "Saved to Family Record";
    }
  }

  const textareaClass =
    "w-full resize-y border border-[#cdbda5] bg-[#fbf8f2] px-4 py-3 text-lg leading-8 text-[#2d2822] outline-none transition focus:border-[#8b542f]";

  if (!loaded) {
    return (
      <section>
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#817366]">
          Loading Family Record...
        </p>
      </section>
    );
  }

  return (
    <form onSubmit={continueToAchievements}>
      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8b542f]">
          Article V · Symbols
        </p>

        <h1 className="font-display mt-5 text-5xl leading-[1.05] sm:text-6xl">
          What symbols already belong to your family&apos;s story?
        </h1>

        <div className="mt-7 h-px w-20 bg-[#b89559]" />

        <p className="mt-7 text-lg leading-8 text-[#665b50]">
          Heraldry should emerge from meaning, not decoration.
          These answers help identify visual themes that may
          later influence your crest, motto, colors, and other
          expressions of family identity.
        </p>
      </header>

      <div className="mt-10 border-l-2 border-[#b89559] bg-[#eee5d7] px-6 py-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8b542f]">
          Symbols of Your House
        </p>

        <p className="mt-3 text-sm leading-7 text-[#665b50]">
          Your family&apos;s symbols should reflect its own
          history, values, and traditions. Consider the
          places and experiences that matter most to
          the family you represent.
        </p>
      </div>

      {errorMessage && (
        <div
          role="alert"
          className="mt-8 border border-red-300 bg-red-50 px-5 py-4 text-sm text-red-800"
        >
          {errorMessage}
        </div>
      )}

      <fieldset
        disabled={blocked || navigating || !recordId}
        className="mt-12 space-y-6"
      >
        <QuestionCard
          label="Animals"
          description="Are there animals with personal, geographic, occupational, religious, or historical meaning to your family?"
        >
          <textarea
            value={form.animals}
            onChange={(event) =>
              updateField("animals", event.target.value)
            }
            rows={5}
            placeholder="Examples: eagle, horse, bear, stag, dog, lion, hawk..."
            className={textareaClass}
          />
        </QuestionCard>

        <QuestionCard
          label="Colors"
          description="List colors that carry meaning for your family, and explain why when possible."
        >
          <textarea
            value={form.colors}
            onChange={(event) =>
              updateField("colors", event.target.value)
            }
            rows={4}
            placeholder="Examples: navy for service, green for farmland, red from a state or national flag..."
            className={textareaClass}
          />
        </QuestionCard>

        <QuestionCard
          label="Places and Landscapes"
          description="Identify mountains, rivers, coastlines, farms, cities, states, countries, or other places strongly associated with your family."
        >
          <textarea
            value={form.places}
            onChange={(event) =>
              updateField("places", event.target.value)
            }
            rows={5}
            placeholder="What landscapes or places feel inseparable from your family story?"
            className={textareaClass}
          />
        </QuestionCard>

        <QuestionCard
          label="Objects, Tools, and Occupations"
          description="Include meaningful tools, instruments, vehicles, books, equipment, crafts, or objects tied to family professions and history."
        >
          <textarea
            value={form.objects}
            onChange={(event) =>
              updateField("objects", event.target.value)
            }
            rows={5}
            placeholder="Examples: hammer, plow, compass, medical symbol, book, ship, aircraft, musical instrument..."
            className={textareaClass}
          />
        </QuestionCard>

        <QuestionCard
          label="Trees, Plants, and Natural Symbols"
          description="Record plants or natural forms with meaning to your family or places of origin."
        >
          <textarea
            value={form.plants}
            onChange={(event) =>
              updateField("plants", event.target.value)
            }
            rows={4}
            placeholder="Examples: oak, pine, rose, thistle, wheat, olive branch..."
            className={textareaClass}
          />
        </QuestionCard>

        <QuestionCard
          label="Symbols That Must Be Considered"
          description="If there are one or more symbols you strongly believe belong in your family identity, explain them here."
          required
        >
          <textarea
            required
            value={form.meaningfulSymbols}
            onChange={(event) =>
              updateField(
                "meaningfulSymbols",
                event.target.value
              )
            }
            rows={6}
            placeholder="Tell us which symbols matter most and what they represent."
            className={textareaClass}
          />
        </QuestionCard>
      </fieldset>

      <footer className="mt-10 border-t border-[#cdbda5] pt-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={goBack}
            disabled={
              blocked ||
              navigating ||
              !recordId
            }
            className="text-sm font-semibold uppercase tracking-[0.15em] text-[#6f4328] disabled:opacity-50"
          >
            ← Back to Traditions
          </button>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <p
              aria-live="polite"
              className={`mr-2 text-xs font-semibold uppercase tracking-[0.18em] ${
                saveStatus === "error"
                  ? "text-red-700"
                  : "text-[#817366]"
              }`}
            >
              {getStatusText()}
            </p>

            <button
              type="button"
              onClick={saveNow}
              disabled={
                blocked ||
                navigating ||
                !recordId ||
                saveStatus === "saving"
              }
              className="border border-[#9d835f] px-6 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-[#5b4433] transition hover:bg-[#ebe1d2] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Save Progress
            </button>

            <button
              type="submit"
              disabled={
                blocked ||
                navigating ||
                !recordId ||
                saveStatus === "saving"
              }
              className="border border-[#6f4328] bg-[#6f4328] px-7 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-[#875235] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {navigating
                ? "Saving..."
                : "Continue to Achievements →"}
            </button>
          </div>
        </div>
      </footer>
    </form>
  );
}

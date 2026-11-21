
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

type TraditionsForm = {
  holidays: string;
  gatherings: string;
  recipes: string;
  sayings: string;
  customs: string;
  traditionsToPreserve: string;
};

type SaveStatus =
  | "loading"
  | "saved"
  | "saving"
  | "unsaved"
  | "error";

const emptyForm: TraditionsForm = {
  holidays: "",
  gatherings: "",
  recipes: "",
  sayings: "",
  customs: "",
  traditionsToPreserve: "",
};

export default function TraditionsPage() {
  const router = useRouter();

  const [recordId, setRecordId] = useState<string | null>(
    null
  );

  const [form, setForm] =
    useState<TraditionsForm>(emptyForm);

  const [userId, setUserId] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [blocked, setBlocked] = useState(false);

  const [saveStatus, setSaveStatus] =
    useState<SaveStatus>("loading");

  const [errorMessage, setErrorMessage] = useState("");
  const [revision, setRevision] = useState(0);
  const [navigating, setNavigating] = useState(false);

  const latestFormRef = useRef<TraditionsForm>(emptyForm);
  const revisionRef = useRef(0);
  const savedRevisionRef = useRef(0);

  // Serialize writes so navigation saves cannot
  // be overtaken by an earlier autosave.
  const saveQueueRef = useRef<Promise<boolean>>(
    Promise.resolve(true)
  );

  function publishStatus(status: SaveStatus) {
    setSaveStatus(status);

    window.dispatchEvent(
      new CustomEvent("family-record-save-status", {
        detail: status,
      })
    );
  }

  useEffect(() => {
    let cancelled = false;

    async function loadTraditions() {
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

      // Each authenticated account owns one Family Record.
      const { data: record, error } = await supabase
        .from("family_records")
        .select("id, traditions")
        .eq("user_id", user.id)
        .maybeSingle();

      if (cancelled) return;

      if (error || !record) {
        if (error) {
          console.error(
            "Unable to load Traditions:",
            error
          );
        }

        setBlocked(true);
        setErrorMessage(
          "We could not load your Family Record. Return to the Founding Journey and try again."
        );

        publishStatus("error");
        setLoaded(true);
        return;
      }

      const restored: TraditionsForm = record.traditions
        ? {
            ...emptyForm,
            ...(record.traditions as Partial<TraditionsForm>),
          }
        : { ...emptyForm };

      latestFormRef.current = restored;
      setForm(restored);
      setRecordId(record.id);
      setUserId(user.id);
      setLoaded(true);

      publishStatus("saved");
    }

    void loadTraditions();

    return () => {
      cancelled = true;
    };

    // Loading occurs when this chapter mounts.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  function updateField(
    field: keyof TraditionsForm,
    value: string
  ) {
    if (blocked || navigating) return;

    revisionRef.current += 1;

    const next: TraditionsForm = {
      ...latestFormRef.current,
      [field]: value,
    };

    latestFormRef.current = next;

    setForm(next);
    setRevision(revisionRef.current);
    publishStatus("unsaved");
    setErrorMessage("");
  }

  function saveTraditions(
    nextArticle?: "symbols"
  ): Promise<boolean> {
    if (!userId || !recordId || blocked || !loaded) {
      setErrorMessage(
        "Your Family Record is unavailable. Please refresh and try again."
      );
      publishStatus("error");
      return Promise.resolve(false);
    }

    const performSave = async (): Promise<boolean> => {
      publishStatus("saving");
      setErrorMessage("");

      const supabase = createClient();

      // Save the latest form. If edits occurred while
      // the request was running, persist those as well.
      do {
        const version = revisionRef.current;
        const snapshot = { ...latestFormRef.current };

        const payload = {
          traditions: snapshot,
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
            "Unable to save Traditions:",
            error ?? "No matching Family Record"
          );

          setErrorMessage(
            "Your changes could not be saved. Please try again."
          );

          publishStatus("error");
          return false;
        }

        savedRevisionRef.current = Math.max(
          savedRevisionRef.current,
          version
        );
      } while (
        savedRevisionRef.current < revisionRef.current
      );

      publishStatus("saved");
      return true;
    };

    // Queue every save, including explicit advancement
    // to the Symbols chapter.
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
      void saveTraditions();
    }, 800);

    return () => window.clearTimeout(timer);

    // saveTraditions reads the current form from refs.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [revision, loaded, userId, recordId, blocked]);

  async function saveNow() {
    if (blocked || navigating || !recordId) return;

    await saveTraditions();
  }

  async function goBack() {
    if (blocked || navigating || !recordId) return;

    setNavigating(true);

    const success = await saveTraditions();

    if (success) {
      router.push("/begin/service");
    } else {
      setNavigating(false);
    }
  }

  async function continueToSymbols(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (blocked || navigating || !recordId) return;

    if (
      !latestFormRef.current.traditionsToPreserve.trim()
    ) {
      setErrorMessage(
        "Please describe the traditions you want future generations to preserve."
      );
      return;
    }

    setNavigating(true);

    const success = await saveTraditions("symbols");

    if (!success) {
      setNavigating(false);
      return;
    }

    router.push("/begin/symbols");
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
    <form onSubmit={continueToSymbols}>
      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8b542f]">
          Article IV · Traditions
        </p>

        <h1 className="font-display mt-5 text-5xl leading-[1.05] sm:text-6xl">
          What does your family return to,
          generation after generation?
        </h1>

        <div className="mt-7 h-px w-20 bg-[#b89559]" />

        <p className="mt-7 text-lg leading-8 text-[#665b50]">
          Traditions are the repeated acts that make
          family identity tangible. They may be formal
          customs or simple habits that have endured
          because they carry meaning.
        </p>
      </header>

      <div className="mt-10 border-l-2 border-[#b89559] bg-[#eee5d7] px-6 py-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8b542f]">
          Traditions of Your House
        </p>

        <p className="mt-3 text-sm leading-7 text-[#665b50]">
          Families may share a common ancestry while
          developing different traditions across
          generations and locations. Record the customs
          that define your family and the heritage you
          wish to preserve.
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
          label="Holidays and Celebrations"
          description="Describe holidays, religious observances, anniversaries, or celebrations that are especially important to your family."
        >
          <textarea
            value={form.holidays}
            onChange={(event) =>
              updateField(
                "holidays",
                event.target.value
              )
            }
            rows={5}
            placeholder="What occasions bring your family together, and how are they celebrated?"
            className={textareaClass}
          />
        </QuestionCard>

        <QuestionCard
          label="Family Gatherings"
          description="Include reunions, annual trips, Sunday dinners, seasonal gatherings, or other recurring occasions."
        >
          <textarea
            value={form.gatherings}
            onChange={(event) =>
              updateField(
                "gatherings",
                event.target.value
              )
            }
            rows={5}
            placeholder="Describe the gatherings your family makes an effort to preserve."
            className={textareaClass}
          />
        </QuestionCard>

        <QuestionCard
          label="Food and Recipes"
          description="Record meals, recipes, ingredients, or food traditions that hold special meaning."
        >
          <textarea
            value={form.recipes}
            onChange={(event) =>
              updateField(
                "recipes",
                event.target.value
              )
            }
            rows={5}
            placeholder="What foods immediately make members of your family think of home?"
            className={textareaClass}
          />
        </QuestionCard>

        <QuestionCard
          label="Family Sayings and Stories"
          description="Include sayings, jokes, expressions, repeated stories, nicknames, or phrases that have become part of family culture."
        >
          <textarea
            value={form.sayings}
            onChange={(event) =>
              updateField(
                "sayings",
                event.target.value
              )
            }
            rows={5}
            placeholder="What words or stories would family members recognize immediately?"
            className={textareaClass}
          />
        </QuestionCard>

        <QuestionCard
          label="Customs and Rituals"
          description="Describe customs around births, weddings, funerals, military service, graduations, faith, work, travel, or other life events."
        >
          <textarea
            value={form.customs}
            onChange={(event) =>
              updateField(
                "customs",
                event.target.value
              )
            }
            rows={5}
            placeholder="What does your family do in moments that matter?"
            className={textareaClass}
          />
        </QuestionCard>

        <QuestionCard
          label="Traditions Worth Preserving"
          description="Which traditions should still exist in your family fifty or one hundred years from now?"
          required
        >
          <textarea
            required
            value={form.traditionsToPreserve}
            onChange={(event) =>
              updateField(
                "traditionsToPreserve",
                event.target.value
              )
            }
            rows={6}
            placeholder="Identify the customs you most want future generations to continue."
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
            ← Back to Service
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
                : "Continue to Symbols →"}
            </button>
          </div>
        </div>
      </footer>
    </form>
  );
}

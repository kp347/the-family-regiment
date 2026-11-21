
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

type ValuesForm = {
  coreValues: string;
  faithRole: string;
  familyPrinciples: string;
  admiredQualities: string;
  lessonsToCarryForward: string;
};

type SaveStatus =
  | "loading"
  | "saved"
  | "saving"
  | "unsaved"
  | "error";

const emptyForm: ValuesForm = {
  coreValues: "",
  faithRole: "",
  familyPrinciples: "",
  admiredQualities: "",
  lessonsToCarryForward: "",
};

export default function ValuesPage() {
  const router = useRouter();

  const [form, setForm] = useState<ValuesForm>(emptyForm);
  const [userId, setUserId] = useState<string | null>(null);
  const [recordId, setRecordId] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [saveStatus, setSaveStatus] =
    useState<SaveStatus>("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const [navigating, setNavigating] = useState(false);

  const latestForm = useRef<ValuesForm>(emptyForm);
  const saveQueue = useRef<Promise<boolean>>(
    Promise.resolve(true)
  );
  const changeVersion = useRef(0);
  const savedVersion = useRef(0);

  useEffect(() => {
    let cancelled = false;

    async function loadValues() {
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
        .select("id, values_record")
        .eq("user_id", user.id)
        .maybeSingle();

      if (cancelled) return;

      if (error || !record) {
        if (error) {
          console.error("Unable to load Values:", error);
        }

        setBlocked(true);
        setErrorMessage(
          "Family Record not found or unavailable. Please complete Origins first."
        );
        setSaveStatus("error");
        setLoaded(true);
        return;
      }

      if (record.values_record) {
        const restored: ValuesForm = {
          ...emptyForm,
          ...(record.values_record as Partial<ValuesForm>),
        };

        latestForm.current = restored;
        setForm(restored);
      }

      setRecordId(record.id);
      setUserId(user.id);
      setLoaded(true);
      setSaveStatus("saved");
    }

    void loadValues();

    return () => {
      cancelled = true;
    };
  }, [router]);

  function updateField(
    field: keyof ValuesForm,
    value: string
  ) {
    if (blocked || navigating) return;

    changeVersion.current += 1;

    const next: ValuesForm = {
      ...latestForm.current,
      [field]: value,
    };

    latestForm.current = next;
    setForm(next);
    setSaveStatus("unsaved");
    setErrorMessage("");
  }

  function saveValues(
    nextArticle?: "service"
  ): Promise<boolean> {
    if (!userId || !recordId || blocked) {
      setErrorMessage(
        "Your Family Record is unavailable. Please refresh and try again."
      );
      return Promise.resolve(false);
    }

    const snapshot = { ...latestForm.current };
    const version = changeVersion.current;

    const performSave = async (): Promise<boolean> => {
      const supabase = createClient();

      const payload = {
        values_record: snapshot,
        updated_at: new Date().toISOString(),
        ...(nextArticle
          ? { current_article: nextArticle }
          : {}),
      };

      const { data, error } = await supabase
        .from("family_records")
        .update(payload)
        .eq("id", recordId)
        .eq("user_id", userId)
        .select("id");

      if (error || !data || data.length !== 1) {
        console.error(
          "Unable to save Values:",
          error ?? "No matching record updated"
        );

        setErrorMessage(
          "Your changes could not be saved. Please try again."
        );

        return false;
      }

      savedVersion.current = Math.max(
        savedVersion.current,
        version
      );

      return true;
    };

    // Serialize writes so older requests cannot
    // overwrite newer answers.
    const next = saveQueue.current.then(
      performSave,
      performSave
    );

    saveQueue.current = next;

    return next;
  }

  useEffect(() => {
    if (!loaded || !userId || !recordId || blocked) return;
    if (changeVersion.current === 0) return;
    if (changeVersion.current <= savedVersion.current) return;

    const version = changeVersion.current;

    const timer = window.setTimeout(async () => {
      setSaveStatus("saving");

      const success = await saveValues();

      if (version === changeVersion.current) {
        setSaveStatus(success ? "saved" : "error");
      }
    }, 800);

    return () => window.clearTimeout(timer);

    // saveValues reads the current snapshot from refs.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, loaded, userId, recordId, blocked]);

  async function saveNow() {
    if (blocked || navigating || !recordId) return;

    setSaveStatus("saving");
    setErrorMessage("");

    const version = changeVersion.current;
    const success = await saveValues();

    if (version === changeVersion.current) {
      setSaveStatus(success ? "saved" : "error");
    }
  }

  async function continueToService(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (blocked || navigating || !recordId) return;

    const snapshot = latestForm.current;

    if (!snapshot.coreValues.trim()) {
      setErrorMessage(
        "Please describe your family's core values."
      );
      return;
    }

    if (!snapshot.lessonsToCarryForward.trim()) {
      setErrorMessage(
        "Please describe the lessons your family wants to carry forward."
      );
      return;
    }

    setNavigating(true);
    setSaveStatus("saving");
    setErrorMessage("");

    const success = await saveValues("service");

    if (!success) {
      setSaveStatus("error");
      setNavigating(false);
      return;
    }

    setSaveStatus("saved");
    router.push("/begin/service");
  }

  async function backToOrigins() {
    if (blocked || navigating || !recordId) return;

    setNavigating(true);
    setSaveStatus("saving");

    const success = await saveValues();

    if (!success) {
      setNavigating(false);
      setSaveStatus("error");
      return;
    }

    router.push("/begin/origins");
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
    <form onSubmit={continueToService}>
      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8b542f]">
          Article II · Values
        </p>

        <h1 className="font-display mt-5 text-5xl leading-[1.05] sm:text-6xl">
          What does your family stand for?
        </h1>

        <div className="mt-7 h-px w-20 bg-[#b89559]" />

        <p className="mt-7 text-lg leading-8 text-[#665b50]">
          Values give meaning to the symbols that will
          eventually represent your family. Think about
          the principles, beliefs, and qualities that
          have shaped the way your family lives and
          serves others.
        </p>
      </header>

      <div className="mt-10 border-l-2 border-[#b89559] bg-[#eee5d7] px-6 py-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8b542f]">
          Your House · Your Values
        </p>

        <p className="mt-3 text-sm leading-7 text-[#665b50]">
          These answers will help shape your family
          identity and the meaning behind its heraldry.
          Describe the values you want your family
          to represent and carry forward.
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

      <div className="mt-12 space-y-6">
        <QuestionCard
          label="Core Family Values"
          description="List the values that best describe your family. Examples might include faith, courage, service, honesty, loyalty, perseverance, stewardship, wisdom, or compassion."
          required
        >
          <textarea
            required
            value={form.coreValues}
            onChange={(event) =>
              updateField(
                "coreValues",
                event.target.value
              )
            }
            rows={5}
            placeholder="What values have been passed from generation to generation?"
            className={textareaClass}
          />
        </QuestionCard>

        <QuestionCard
          label="Faith and Belief"
          description="If faith or spiritual belief has played a meaningful role in your family, describe it here."
        >
          <textarea
            value={form.faithRole}
            onChange={(event) =>
              updateField(
                "faithRole",
                event.target.value
              )
            }
            rows={4}
            placeholder="Describe the role of faith, belief, or spiritual tradition in your family."
            className={textareaClass}
          />
        </QuestionCard>

        <QuestionCard
          label="Family Principles"
          description="What rules, sayings, expectations, or standards have guided your family?"
        >
          <textarea
            value={form.familyPrinciples}
            onChange={(event) =>
              updateField(
                "familyPrinciples",
                event.target.value
              )
            }
            rows={4}
            placeholder="Examples: keep your word, serve before self, work hard, care for family, finish what you start."
            className={textareaClass}
          />
        </QuestionCard>

        <QuestionCard
          label="Qualities You Most Admire"
          description="Think of relatives you respect. What qualities made them memorable?"
        >
          <textarea
            value={form.admiredQualities}
            onChange={(event) =>
              updateField(
                "admiredQualities",
                event.target.value
              )
            }
            rows={4}
            placeholder="Describe the character traits you most admire in your family."
            className={textareaClass}
          />
        </QuestionCard>

        <QuestionCard
          label="Lessons Worth Carrying Forward"
          description="What should future generations learn from the way your family has lived?"
          required
        >
          <textarea
            required
            value={form.lessonsToCarryForward}
            onChange={(event) =>
              updateField(
                "lessonsToCarryForward",
                event.target.value
              )
            }
            rows={6}
            placeholder="What lessons should your children, grandchildren, and future descendants remember?"
            className={textareaClass}
          />
        </QuestionCard>
      </div>

      <footer className="mt-10 border-t border-[#cdbda5] pt-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={backToOrigins}
            disabled={
              blocked ||
              navigating ||
              !recordId
            }
            className="text-sm font-semibold uppercase tracking-[0.15em] text-[#6f4328] disabled:opacity-50"
          >
            ← Back to Origins
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
                : "Continue to Service →"}
            </button>
          </div>
        </div>
      </footer>
    </form>
  );
}


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

type FutureForm = {
  futureVision: string;
  descendantsShouldKnow: string;
  familyMission: string;
  responsibilities: string;
  hopesForNextGeneration: string;
  legacyStatement: string;
};

type SaveStatus =
  | "loading"
  | "saved"
  | "saving"
  | "unsaved"
  | "error";

const emptyForm: FutureForm = {
  futureVision: "",
  descendantsShouldKnow: "",
  familyMission: "",
  responsibilities: "",
  hopesForNextGeneration: "",
  legacyStatement: "",
};

export default function FuturePage() {
  const router = useRouter();

  const [recordId, setRecordId] = useState<string | null>(
    null
  );
  const [form, setForm] = useState<FutureForm>(emptyForm);
  const [userId, setUserId] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [saveStatus, setSaveStatus] =
    useState<SaveStatus>("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const [revision, setRevision] = useState(0);
  const [navigating, setNavigating] = useState(false);

  const latestFormRef = useRef<FutureForm>(emptyForm);
  const revisionRef = useRef(0);
  const savedRevisionRef = useRef(0);
  const saveQueueRef = useRef<Promise<boolean>>(
    Promise.resolve(true)
  );

  useEffect(() => {
    let cancelled = false;

    async function loadFutureLegacy() {
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

      // One authenticated account owns one Family Record.
      const { data: record, error } = await supabase
        .from("family_records")
        .select("id, future_legacy")
        .eq("user_id", user.id)
        .maybeSingle();

      if (cancelled) return;

      if (error || !record) {
        if (error) {
          console.error(
            "Unable to load Future Legacy:",
            error
          );
        }

        setBlocked(true);
        setErrorMessage(
          "Your Family Record was not found. Return to the Founding Journey to begin or resume it."
        );
        setSaveStatus("error");
        setLoaded(true);
        return;
      }

      const restored: FutureForm = record.future_legacy
        ? {
            ...emptyForm,
            ...(record.future_legacy as Partial<FutureForm>),
          }
        : { ...emptyForm };

      latestFormRef.current = restored;
      setForm(restored);
      setRecordId(record.id);
      setUserId(user.id);
      setLoaded(true);
      setSaveStatus("saved");
    }

    void loadFutureLegacy();

    return () => {
      cancelled = true;
    };
  }, [router]);

  function updateField(
    field: keyof FutureForm,
    value: string
  ) {
    if (blocked || !recordId || navigating) return;

    revisionRef.current += 1;

    const next: FutureForm = {
      ...latestFormRef.current,
      [field]: value,
    };

    latestFormRef.current = next;
    setForm(next);
    setRevision(revisionRef.current);
    setSaveStatus("unsaved");
    setErrorMessage("");
  }

  function saveFutureLegacy(
    nextArticle?: "review"
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

      // Save the latest form, including edits made
      // during any earlier in-flight request.
      do {
        const version = revisionRef.current;
        const snapshot = { ...latestFormRef.current };

        const payload = {
          future_legacy: snapshot,
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
            "Unable to save Future Legacy:",
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

    // Serialize autosaves and navigation saves.
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
      void saveFutureLegacy();
    }, 800);

    return () => window.clearTimeout(timer);

    // saveFutureLegacy reads current values from refs.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [revision, loaded, userId, recordId, blocked]);

  async function saveNow() {
    if (blocked || !recordId || navigating) return;

    await saveFutureLegacy();
  }

  async function goBack() {
    if (blocked || !recordId || navigating) return;

    setNavigating(true);

    const success = await saveFutureLegacy();

    if (success) {
      router.push("/begin/achievements");
    } else {
      setNavigating(false);
    }
  }

  async function continueToReview(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (blocked || !recordId || navigating) return;

    const current = latestFormRef.current;

    if (!current.futureVision.trim()) {
      setErrorMessage(
        "Please describe your vision for future generations."
      );
      return;
    }

    if (!current.descendantsShouldKnow.trim()) {
      setErrorMessage(
        "Please describe what your descendants should know."
      );
      return;
    }

    if (!current.legacyStatement.trim()) {
      setErrorMessage(
        "Please complete your family's legacy statement."
      );
      return;
    }

    setNavigating(true);

    const success = await saveFutureLegacy("review");

    if (!success) {
      setNavigating(false);
      return;
    }

    router.push("/begin/review");
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
    <form onSubmit={continueToReview}>
      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8b542f]">
          Article VII · Future Legacy
        </p>

        <h1 className="font-display mt-5 text-5xl leading-[1.05] sm:text-6xl">
          What should your family carry forward?
        </h1>

        <div className="mt-7 h-px w-20 bg-[#b89559]" />

        <p className="mt-7 text-lg leading-8 text-[#665b50]">
          A Family Record is not only about remembering
          the past. It also gives future generations a
          clearer understanding of what they have
          inherited and what they are responsible
          for preserving.
        </p>
      </header>

      <div className="mt-10 border-l-2 border-[#b89559] bg-[#eee5d7] px-6 py-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8b542f]">
          A Legacy for Future Generations
        </p>

        <p className="mt-3 text-sm leading-7 text-[#665b50]">
          Your family&apos;s future is shaped by the commitments
          you establish today. Record the mission,
          responsibilities, and aspirations you want
          future generations to inherit.
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
          label="Your Vision for the Family"
          description="Imagine your family fifty or one hundred years from now. What do you hope remains true about who they are?"
          required
        >
          <textarea
            required
            value={form.futureVision}
            onChange={(event) =>
              updateField(
                "futureVision",
                event.target.value
              )
            }
            rows={6}
            placeholder="Describe the kind of family you hope future generations continue to become."
            className={textareaClass}
          />
        </QuestionCard>

        <QuestionCard
          label="What Should Your Descendants Know?"
          description="If a descendant opened this Family Record a century from now, what would you most want them to understand about your family?"
          required
        >
          <textarea
            required
            value={form.descendantsShouldKnow}
            onChange={(event) =>
              updateField(
                "descendantsShouldKnow",
                event.target.value
              )
            }
            rows={6}
            placeholder="What truth about your family should never be lost?"
            className={textareaClass}
          />
        </QuestionCard>

        <QuestionCard
          label="Family Mission"
          description="In plain language, what should your family continue trying to do well?"
        >
          <textarea
            value={form.familyMission}
            onChange={(event) =>
              updateField(
                "familyMission",
                event.target.value
              )
            }
            rows={5}
            placeholder="Examples: serve others, build strong families, pursue meaningful work, preserve faith, remain generous..."
            className={textareaClass}
          />
        </QuestionCard>

        <QuestionCard
          label="Responsibilities of Future Stewards"
          description="What responsibilities should future members accept when they inherit the family's record, symbols, and traditions?"
        >
          <textarea
            value={form.responsibilities}
            onChange={(event) =>
              updateField(
                "responsibilities",
                event.target.value
              )
            }
            rows={5}
            placeholder="What does stewardship of the family legacy require?"
            className={textareaClass}
          />
        </QuestionCard>

        <QuestionCard
          label="Hopes for the Next Generation"
          description="Think specifically about children, grandchildren, nieces, nephews, or younger relatives."
        >
          <textarea
            value={form.hopesForNextGeneration}
            onChange={(event) =>
              updateField(
                "hopesForNextGeneration",
                event.target.value
              )
            }
            rows={5}
            placeholder="What do you hope they become, remember, protect, or improve?"
            className={textareaClass}
          />
        </QuestionCard>

        <QuestionCard
          label="Legacy Statement"
          description="Complete the Family Record with a short statement that captures what your family intends to preserve and pass forward."
          required
        >
          <textarea
            required
            value={form.legacyStatement}
            onChange={(event) =>
              updateField(
                "legacyStatement",
                event.target.value
              )
            }
            rows={6}
            placeholder="Write a statement future generations could read and immediately understand what your family hoped to stand for."
            className={textareaClass}
          />
        </QuestionCard>
      </fieldset>

      <footer className="mt-10 border-t border-[#cdbda5] pt-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={goBack}
            disabled={blocked || navigating || !recordId}
            className="text-sm font-semibold uppercase tracking-[0.15em] text-[#6f4328] disabled:opacity-50"
          >
            ← Back to Achievements
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
                : "Review Family Record →"}
            </button>
          </div>
        </div>
      </footer>
    </form>
  );
}


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

type AchievementsForm = {
  militaryAchievements: string;
  educationAchievements: string;
  careerAchievements: string;
  civicAchievements: string;
  familyMilestones: string;
  proudestLegacy: string;
};

type SaveStatus =
  | "loading"
  | "saved"
  | "saving"
  | "unsaved"
  | "error";

const emptyForm: AchievementsForm = {
  militaryAchievements: "",
  educationAchievements: "",
  careerAchievements: "",
  civicAchievements: "",
  familyMilestones: "",
  proudestLegacy: "",
};

export default function AchievementsPage() {
  const router = useRouter();

  const [recordId, setRecordId] = useState<string | null>(
    null
  );
  const [form, setForm] =
    useState<AchievementsForm>(emptyForm);
  const [userId, setUserId] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [saveStatus, setSaveStatus] =
    useState<SaveStatus>("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const [revision, setRevision] = useState(0);
  const [navigating, setNavigating] = useState(false);

  const latestFormRef =
    useRef<AchievementsForm>(emptyForm);
  const revisionRef = useRef(0);
  const savedRevisionRef = useRef(0);
  const saveQueueRef = useRef<Promise<boolean>>(
    Promise.resolve(true)
  );

  useEffect(() => {
    let cancelled = false;

    async function loadAchievements() {
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
        .select("id, achievements")
        .eq("user_id", user.id)
        .maybeSingle();

      if (cancelled) return;

      if (error || !record) {
        if (error) {
          console.error(
            "Unable to load Achievements:",
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

      const restored: AchievementsForm =
        record.achievements
          ? {
              ...emptyForm,
              ...(record.achievements as Partial<AchievementsForm>),
            }
          : { ...emptyForm };

      latestFormRef.current = restored;
      setForm(restored);
      setRecordId(record.id);
      setUserId(user.id);
      setLoaded(true);
      setSaveStatus("saved");
    }

    void loadAchievements();

    return () => {
      cancelled = true;
    };
  }, [router]);

  function updateField(
    field: keyof AchievementsForm,
    value: string
  ) {
    if (blocked || !recordId || navigating) return;

    revisionRef.current += 1;

    const next: AchievementsForm = {
      ...latestFormRef.current,
      [field]: value,
    };

    latestFormRef.current = next;
    setForm(next);
    setRevision(revisionRef.current);
    setSaveStatus("unsaved");
    setErrorMessage("");
  }

  function saveAchievements(
    nextArticle?: "future"
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

      // Persist the latest answers, including any
      // changes made while an earlier save was running.
      do {
        const version = revisionRef.current;
        const snapshot = { ...latestFormRef.current };

        const payload = {
          achievements: snapshot,
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
            "Unable to save Achievements:",
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

    // Serialize autosaves and explicit navigation saves.
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
      void saveAchievements();
    }, 800);

    return () => window.clearTimeout(timer);

    // saveAchievements reads current answers from refs.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [revision, loaded, userId, recordId, blocked]);

  async function saveNow() {
    if (blocked || !recordId || navigating) return;

    await saveAchievements();
  }

  async function goBack() {
    if (blocked || !recordId || navigating) return;

    setNavigating(true);

    const success = await saveAchievements();

    if (success) {
      router.push("/begin/symbols");
    } else {
      setNavigating(false);
    }
  }

  async function continueToFuture(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (blocked || !recordId || navigating) return;

    if (!latestFormRef.current.proudestLegacy.trim()) {
      setErrorMessage(
        "Please describe the achievement or turning point that best represents your family."
      );
      return;
    }

    setNavigating(true);

    const success = await saveAchievements("future");

    if (!success) {
      setNavigating(false);
      return;
    }

    router.push("/begin/future");
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
    <form onSubmit={continueToFuture}>
      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8b542f]">
          Article VI · Achievements
        </p>

        <h1 className="font-display mt-5 text-5xl leading-[1.05] sm:text-6xl">
          What has your family built, accomplished, and overcome?
        </h1>

        <div className="mt-7 h-px w-20 bg-[#b89559]" />

        <p className="mt-7 text-lg leading-8 text-[#665b50]">
          Achievement is broader than awards or titles.
          It includes service, education, enterprise,
          perseverance, sacrifice, milestones, and the
          quiet accomplishments that changed a
          family&apos;s path.
        </p>
      </header>

      <div className="mt-10 border-l-2 border-[#b89559] bg-[#eee5d7] px-6 py-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8b542f]">
          The Achievements of Your House
        </p>

        <p className="mt-3 text-sm leading-7 text-[#665b50]">
          Record the accomplishments, sacrifices, and
          milestones that have shaped your family. These
          experiences help tell the story of your House
          and the legacy it will carry forward.
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
          label="Military Achievements"
          description="Record decorations, promotions, commands, distinguished service, deployments, or other military accomplishments."
        >
          <textarea
            value={form.militaryAchievements}
            onChange={(event) =>
              updateField(
                "militaryAchievements",
                event.target.value
              )
            }
            rows={5}
            placeholder="Optional"
            className={textareaClass}
          />
        </QuestionCard>

        <QuestionCard
          label="Education and Scholarship"
          description="Include degrees, schools, academic accomplishments, teaching, research, scholarships, or educational milestones."
        >
          <textarea
            value={form.educationAchievements}
            onChange={(event) =>
              updateField(
                "educationAchievements",
                event.target.value
              )
            }
            rows={5}
            placeholder="What educational achievements are part of your family story?"
            className={textareaClass}
          />
        </QuestionCard>

        <QuestionCard
          label="Career, Business, and Craft"
          description="Record businesses founded, professions mastered, inventions, careers, trades, farms, crafts, or significant professional contributions."
        >
          <textarea
            value={form.careerAchievements}
            onChange={(event) =>
              updateField(
                "careerAchievements",
                event.target.value
              )
            }
            rows={5}
            placeholder="What did members of your family build, lead, create, or master?"
            className={textareaClass}
          />
        </QuestionCard>

        <QuestionCard
          label="Civic and Community Achievements"
          description="Include public leadership, charitable work, community improvements, ministry, coaching, mentoring, or service that made a lasting difference."
        >
          <textarea
            value={form.civicAchievements}
            onChange={(event) =>
              updateField(
                "civicAchievements",
                event.target.value
              )
            }
            rows={5}
            placeholder="How has your family made its community stronger?"
            className={textareaClass}
          />
        </QuestionCard>

        <QuestionCard
          label="Family Milestones"
          description="Record migrations, home ownership, recovery from hardship, major anniversaries, reunions, generational firsts, or other defining family milestones."
        >
          <textarea
            value={form.familyMilestones}
            onChange={(event) =>
              updateField(
                "familyMilestones",
                event.target.value
              )
            }
            rows={5}
            placeholder="What moments changed the direction of your family?"
            className={textareaClass}
          />
        </QuestionCard>

        <QuestionCard
          label="The Achievement That Best Represents Your Family"
          description="If future generations remembered only one accomplishment, sacrifice, or turning point, what should it be?"
          required
        >
          <textarea
            required
            value={form.proudestLegacy}
            onChange={(event) =>
              updateField(
                "proudestLegacy",
                event.target.value
              )
            }
            rows={6}
            placeholder="Tell the story and explain why it matters."
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
            ← Back to Symbols
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
                : "Continue to Future Legacy →"}
            </button>
          </div>
        </div>
      </footer>
    </form>
  );
}

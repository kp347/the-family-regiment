
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

type ServiceForm = {
  militaryService: string;
  publicService: string;
  communityService: string;
  professions: string;
  organizations: string;
  serviceLegacy: string;
};

type SaveStatus =
  | "loading"
  | "saved"
  | "saving"
  | "unsaved"
  | "error";

const emptyForm: ServiceForm = {
  militaryService: "",
  publicService: "",
  communityService: "",
  professions: "",
  organizations: "",
  serviceLegacy: "",
};

export default function ServicePage() {
  const router = useRouter();

  const [form, setForm] = useState<ServiceForm>(emptyForm);
  const [userId, setUserId] = useState<string | null>(null);
  const [recordId, setRecordId] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [saveStatus, setSaveStatus] =
    useState<SaveStatus>("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const [revision, setRevision] = useState(0);
  const [navigating, setNavigating] = useState(false);

  const revisionRef = useRef(0);
  const savedRevisionRef = useRef(0);
  const latestFormRef = useRef<ServiceForm>(emptyForm);

  // All writes run in order. A Continue operation
  // cannot be skipped by an earlier autosave.
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

    async function loadService() {
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

      // One Family Record belongs to each account.
      const { data: record, error } = await supabase
        .from("family_records")
        .select("id, service")
        .eq("user_id", user.id)
        .maybeSingle();

      if (cancelled) return;

      if (error || !record) {
        if (error) {
          console.error(
            "Unable to load Service:",
            error
          );
        }

        setBlocked(true);
        setErrorMessage(
          "Family Record not found or unavailable. Please complete Origins first."
        );
        publishStatus("error");
        setLoaded(true);
        return;
      }

      const initialForm: ServiceForm = record.service
        ? {
            ...emptyForm,
            ...(record.service as Partial<ServiceForm>),
          }
        : { ...emptyForm };

      latestFormRef.current = initialForm;
      setForm(initialForm);
      setRecordId(record.id);
      setUserId(user.id);
      setLoaded(true);
      publishStatus("saved");
    }

    void loadService();

    return () => {
      cancelled = true;
    };
  }, [router]);

  useEffect(() => {
    if (!loaded || !userId || !recordId || blocked) {
      return;
    }

    if (revision === 0) return;
    if (revision <= savedRevisionRef.current) return;

    const timer = window.setTimeout(() => {
      void flushSave();
    }, 800);

    return () => window.clearTimeout(timer);

    // flushSave uses the latest form and revision refs.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [revision, loaded, userId, recordId, blocked]);

  function updateField(
    field: keyof ServiceForm,
    value: string
  ) {
    if (blocked || navigating) return;

    const next: ServiceForm = {
      ...latestFormRef.current,
      [field]: value,
    };

    latestFormRef.current = next;
    revisionRef.current += 1;

    setRevision(revisionRef.current);
    setForm(next);
    publishStatus("unsaved");
    setErrorMessage("");
  }

  function flushSave(
    nextArticle?: "traditions"
  ): Promise<boolean> {
    if (!userId || !recordId || !loaded || blocked) {
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

      // Continue saving until all edits made during
      // a request have also been persisted.
      do {
        const version = revisionRef.current;
        const snapshot = { ...latestFormRef.current };

        const payload = {
          service: snapshot,
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
            "Unable to save Service:",
            error ?? "No matching record updated"
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

    // Serialize all writes, including navigation saves.
    const operation = saveQueueRef.current.then(
      performSave,
      performSave
    );

    saveQueueRef.current = operation;

    return operation;
  }

  async function saveNow() {
    if (blocked || navigating) return;

    await flushSave();
  }

  async function goBack() {
    if (blocked || navigating) return;

    setNavigating(true);

    const success = await flushSave();

    if (success) {
      router.push("/begin/values");
    } else {
      setNavigating(false);
    }
  }

  async function continueToTraditions(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (blocked || navigating) return;

    if (!latestFormRef.current.professions.trim()) {
      setErrorMessage(
        "Please describe the professions or trades in your family."
      );
      return;
    }

    if (!latestFormRef.current.serviceLegacy.trim()) {
      setErrorMessage(
        "Please describe your family's legacy of service."
      );
      return;
    }

    setNavigating(true);

    const success = await flushSave("traditions");

    if (success) {
      router.push("/begin/traditions");
    } else {
      setNavigating(false);
    }
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
    <form onSubmit={continueToTraditions}>
      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8b542f]">
          Article III · Service
        </p>

        <h1 className="font-display mt-5 text-5xl leading-[1.05] sm:text-6xl">
          How has your family served?
        </h1>

        <div className="mt-7 h-px w-20 bg-[#b89559]" />

        <p className="mt-7 text-lg leading-8 text-[#665b50]">
          Service takes many forms. Military duty, public
          leadership, community involvement, faith,
          professions, trades, caregiving, and quiet acts
          of responsibility can all become part of a
          family&apos;s enduring identity.
        </p>
      </header>

      <div className="mt-10 border-l-2 border-[#b89559] bg-[#eee5d7] px-6 py-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8b542f]">
          Service Across Generations
        </p>

        <p className="mt-3 text-sm leading-7 text-[#665b50]">
          Record the contributions, professions, and
          commitments most meaningful to your family.
          Include the service of relatives and ancestors
          you wish to honor, wherever they lived.
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
          label="Military Service"
          description="Record known military service within your family. Include branches, conflicts, units, ranks, locations, or stories when known."
        >
          <textarea
            value={form.militaryService}
            onChange={(event) =>
              updateField(
                "militaryService",
                event.target.value
              )
            }
            rows={5}
            placeholder="Example: U.S. Army, Vietnam era; Navy service during World War II; National Guard service..."
            className={textareaClass}
          />
        </QuestionCard>

        <QuestionCard
          label="Public Service"
          description="Include service in government, law enforcement, fire and rescue, education, medicine, elected office, or other public institutions."
        >
          <textarea
            value={form.publicService}
            onChange={(event) =>
              updateField(
                "publicService",
                event.target.value
              )
            }
            rows={5}
            placeholder="Describe public roles, offices held, careers of service, or notable contributions."
            className={textareaClass}
          />
        </QuestionCard>

        <QuestionCard
          label="Community and Faith Service"
          description="Describe service through churches, charities, civic groups, volunteer organizations, mentoring, caregiving, or local leadership."
        >
          <textarea
            value={form.communityService}
            onChange={(event) =>
              updateField(
                "communityService",
                event.target.value
              )
            }
            rows={5}
            placeholder="How has your family contributed to the lives of others?"
            className={textareaClass}
          />
        </QuestionCard>

        <QuestionCard
          label="Professions and Trades"
          description="What occupations, trades, businesses, or crafts have been important across generations?"
          required
        >
          <textarea
            required
            value={form.professions}
            onChange={(event) =>
              updateField(
                "professions",
                event.target.value
              )
            }
            rows={5}
            placeholder="Examples: farmers, teachers, physicians, builders, machinists, clergy, business owners, engineers..."
            className={textareaClass}
          />
        </QuestionCard>

        <QuestionCard
          label="Organizations and Institutions"
          description="List organizations that have had lasting importance to your family."
        >
          <textarea
            value={form.organizations}
            onChange={(event) =>
              updateField(
                "organizations",
                event.target.value
              )
            }
            rows={4}
            placeholder="Military units, schools, churches, unions, civic organizations, companies, clubs, professional associations..."
            className={textareaClass}
          />
        </QuestionCard>

        <QuestionCard
          label="Legacy of Service"
          description="What does service mean within your family, and what example should future generations carry forward?"
          required
        >
          <textarea
            required
            value={form.serviceLegacy}
            onChange={(event) =>
              updateField(
                "serviceLegacy",
                event.target.value
              )
            }
            rows={6}
            placeholder="Describe the spirit of service you want represented in your Family Record."
            className={textareaClass}
          />
        </QuestionCard>
      </div>

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
            ← Back to Values
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
                : "Continue to Traditions →"}
            </button>
          </div>
        </div>
      </footer>
    </form>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
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

const emptyForm: ServiceForm = {
  militaryService: "",
  publicService: "",
  communityService: "",
  professions: "",
  organizations: "",
  serviceLegacy: "",
};

type SaveStatus =
  | "loading"
  | "saved"
  | "saving"
  | "unsaved"
  | "error";

export default function ServicePage() {
  const router = useRouter();

  const [form, setForm] = useState<ServiceForm>(emptyForm);
  const [userId, setUserId] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [saveStatus, setSaveStatus] =
    useState<SaveStatus>("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const [revision, setRevision] = useState(0);
  const revisionRef = useRef(0);
  const savedRevisionRef = useRef(0);
  const latestFormRef = useRef<ServiceForm>(emptyForm);
  const saveInFlightRef = useRef<Promise<boolean> | null>(null);

  function publishStatus(status: SaveStatus) {
    setSaveStatus(status);
    window.dispatchEvent(new CustomEvent("family-record-save-status", { detail: status }));
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

      setUserId(user.id);

      const { data, error } = await supabase
        .from("family_records")
        .select("service")
        .eq("user_id", user.id)
        .maybeSingle();

      if (cancelled) return;

      if (error) {
        console.error("Unable to load Service:", error);
        setErrorMessage(
          "We could not load this part of your Family Record. Please try again."
        );
        publishStatus("error");
        setLoaded(true);
        return;
      }

      const initialForm = data?.service
        ? { ...emptyForm, ...(data.service as Partial<ServiceForm>) }
        : emptyForm;
      latestFormRef.current = initialForm;
      setForm(initialForm);
      setLoaded(true);
      publishStatus("saved");
    }

    loadService();

    return () => {
      cancelled = true;
    };
  }, [router]);

  useEffect(() => {
    if (!loaded || !userId || revision === 0) return;
    const timer = window.setTimeout(() => { void flushSave(); }, 800);
    return () => window.clearTimeout(timer);
    // The flush uses refs for the latest form and revision.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [revision, loaded, userId]);

  function updateField(field: keyof ServiceForm, value: string) {
    const next = { ...latestFormRef.current, [field]: value };
    latestFormRef.current = next;
    revisionRef.current += 1;
    setRevision(revisionRef.current);
    setForm(next);
    publishStatus("unsaved");
  }

  async function flushSave(): Promise<boolean> {
    if (!userId || !loaded) {
      setErrorMessage("Please sign in before saving.");
      publishStatus("error");
      return false;
    }
    // Only one writer at a time. If the user types during a save,
    // the loop saves the newest revision before reporting success.
    if (saveInFlightRef.current) return saveInFlightRef.current;

    const operation = (async () => {
      publishStatus("saving");
      setErrorMessage("");
      const supabase = createClient();
      do {
        const version = revisionRef.current;
        const snapshot = { ...latestFormRef.current };
        const { error } = await supabase.from("family_records").upsert(
          {
            user_id: userId,
            service: snapshot,
            current_article: "service",
            updated_at: new Date().toISOString(),
          },
          { onConflict: "user_id" }
        );
        if (error) {
          console.error("Unable to save Service:", error);
          setErrorMessage(`Save failed: ${error.message}`);
          publishStatus("error");
          return false;
        }
        savedRevisionRef.current = version;
      } while (savedRevisionRef.current < revisionRef.current);
      publishStatus("saved");
      return true;
    })();
    saveInFlightRef.current = operation;
    try {
      return await operation;
    } finally {
      saveInFlightRef.current = null;
    }
  }

  async function saveNow() {
    await flushSave();
  }

  async function goBack() {
    if (await flushSave()) router.push("/begin/values");
  }

  async function continueToTraditions(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (await flushSave()) router.push("/begin/traditions");
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
          Service takes many forms. Military duty, public leadership,
          community involvement, faith, professions, trades, caregiving,
          and quiet acts of responsibility can all become part of a
          family&apos;s enduring identity.
        </p>
      </header>

      {errorMessage && (
        <div className="mt-8 border border-red-300 bg-red-50 px-5 py-4 text-sm text-red-800">
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
              updateField("militaryService", event.target.value)
            }
            rows={5}
            placeholder="Example: U.S. Army, Vietnam era; Navy service during World War II; National Guard service..."
            className="w-full resize-y border border-[#cdbda5] bg-[#fbf8f2] px-4 py-3 text-lg leading-8 text-[#2d2822] outline-none transition focus:border-[#8b542f]"
          />
        </QuestionCard>

        <QuestionCard
          label="Public Service"
          description="Include service in government, law enforcement, fire and rescue, education, medicine, elected office, or other public institutions."
        >
          <textarea
            value={form.publicService}
            onChange={(event) =>
              updateField("publicService", event.target.value)
            }
            rows={5}
            placeholder="Describe public roles, offices held, careers of service, or notable contributions."
            className="w-full resize-y border border-[#cdbda5] bg-[#fbf8f2] px-4 py-3 text-lg leading-8 text-[#2d2822] outline-none transition focus:border-[#8b542f]"
          />
        </QuestionCard>

        <QuestionCard
          label="Community and Faith Service"
          description="Describe service through churches, charities, civic groups, volunteer organizations, mentoring, caregiving, or local leadership."
        >
          <textarea
            value={form.communityService}
            onChange={(event) =>
              updateField("communityService", event.target.value)
            }
            rows={5}
            placeholder="How has your family contributed to the lives of others?"
            className="w-full resize-y border border-[#cdbda5] bg-[#fbf8f2] px-4 py-3 text-lg leading-8 text-[#2d2822] outline-none transition focus:border-[#8b542f]"
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
              updateField("professions", event.target.value)
            }
            rows={5}
            placeholder="Examples: farmers, teachers, physicians, builders, machinists, clergy, business owners, engineers..."
            className="w-full resize-y border border-[#cdbda5] bg-[#fbf8f2] px-4 py-3 text-lg leading-8 text-[#2d2822] outline-none transition focus:border-[#8b542f]"
          />
        </QuestionCard>

        <QuestionCard
          label="Organizations and Institutions"
          description="List organizations that have had lasting importance to your family."
        >
          <textarea
            value={form.organizations}
            onChange={(event) =>
              updateField("organizations", event.target.value)
            }
            rows={4}
            placeholder="Military units, schools, churches, unions, civic organizations, companies, clubs, professional associations..."
            className="w-full resize-y border border-[#cdbda5] bg-[#fbf8f2] px-4 py-3 text-lg leading-8 text-[#2d2822] outline-none transition focus:border-[#8b542f]"
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
              updateField("serviceLegacy", event.target.value)
            }
            rows={6}
            placeholder="Describe the spirit of service you want represented in your Family Record."
            className="w-full resize-y border border-[#cdbda5] bg-[#fbf8f2] px-4 py-3 text-lg leading-8 text-[#2d2822] outline-none transition focus:border-[#8b542f]"
          />
        </QuestionCard>
      </div>

      <footer className="mt-10 border-t border-[#cdbda5] pt-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={goBack}
            className="text-sm font-semibold uppercase tracking-[0.15em] text-[#6f4328]"
          >
            ← Back to Values
          </button>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <p
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
              disabled={saveStatus === "saving"}
              className="border border-[#9d835f] px-6 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-[#5b4433] transition hover:bg-[#ebe1d2] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Save Progress
            </button>

            <button
              type="submit"
              disabled={saveStatus === "saving"}
              className="border border-[#6f4328] bg-[#6f4328] px-7 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-[#875235] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Continue to Traditions →
            </button>
          </div>
        </div>
      </footer>
    </form>
  );
}
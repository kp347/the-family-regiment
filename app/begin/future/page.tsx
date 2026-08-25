"use client";

import { useEffect, useState } from "react";
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

const emptyForm: FutureForm = {
  futureVision: "",
  descendantsShouldKnow: "",
  familyMission: "",
  responsibilities: "",
  hopesForNextGeneration: "",
  legacyStatement: "",
};

type SaveStatus =
  | "loading"
  | "saved"
  | "saving"
  | "unsaved"
  | "error";

export default function FuturePage() {
  const router = useRouter();

  const [form, setForm] = useState<FutureForm>(emptyForm);
  const [userId, setUserId] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [saveStatus, setSaveStatus] =
    useState<SaveStatus>("loading");
  const [errorMessage, setErrorMessage] = useState("");

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

      setUserId(user.id);

      const { data, error } = await supabase
        .from("family_records")
        .select("future_legacy")
        .eq("user_id", user.id)
        .maybeSingle();

      if (cancelled) return;

      if (error) {
        console.error("Unable to load Future Legacy:", error);

        setErrorMessage(
          "We could not load this part of your Family Record. Please try again."
        );

        setSaveStatus("error");
        setLoaded(true);
        return;
      }

      if (data?.future_legacy) {
        setForm({
          ...emptyForm,
          ...(data.future_legacy as Partial<FutureForm>),
        });
      }

      setLoaded(true);
      setSaveStatus("saved");
    }

    loadFutureLegacy();

    return () => {
      cancelled = true;
    };
  }, [router]);

  useEffect(() => {
    if (!loaded || !userId) return;

    setSaveStatus("saving");
    setErrorMessage("");

    const timer = window.setTimeout(async () => {
      const success = await saveFutureLegacy();
      setSaveStatus(success ? "saved" : "error");
    }, 800);

    return () => window.clearTimeout(timer);
  }, [form, loaded, userId]);

  function updateField(
    field: keyof FutureForm,
    value: string
  ) {
    setSaveStatus("unsaved");

    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function saveFutureLegacy(): Promise<boolean> {
    if (!userId) {
      setErrorMessage("Please sign in before saving.");
      return false;
    }

    const supabase = createClient();

    const { error } = await supabase
      .from("family_records")
      .upsert(
        {
          user_id: userId,
          future_legacy: form,
          current_article: "future",
          completion_percent: 100,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "user_id",
        }
      );

    if (error) {
      console.error("Unable to save Future Legacy:", error);

      setErrorMessage(
        "Your changes could not be saved. Please try again."
      );

      return false;
    }

    return true;
  }

  async function saveNow() {
    setSaveStatus("saving");
    setErrorMessage("");

    const success = await saveFutureLegacy();

    setSaveStatus(success ? "saved" : "error");
  }

  async function continueToReview(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setSaveStatus("saving");
    setErrorMessage("");

    const success = await saveFutureLegacy();

    if (!success) {
      setSaveStatus("error");
      return;
    }

    setSaveStatus("saved");
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
          A Family Record is not only about remembering the past. It also gives
          future generations a clearer understanding of what they have
          inherited and what they are responsible for preserving.
        </p>
      </header>

      {errorMessage && (
        <div className="mt-8 border border-red-300 bg-red-50 px-5 py-4 text-sm text-red-800">
          {errorMessage}
        </div>
      )}

      <div className="mt-12 space-y-6">
        <QuestionCard
          label="Your Vision for the Family"
          description="Imagine your family fifty or one hundred years from now. What do you hope remains true about who they are?"
          required
        >
          <textarea
            required
            value={form.futureVision}
            onChange={(event) =>
              updateField("futureVision", event.target.value)
            }
            rows={6}
            placeholder="Describe the kind of family you hope future generations continue to become."
            className="w-full resize-y border border-[#cdbda5] bg-[#fbf8f2] px-4 py-3 text-lg leading-8 text-[#2d2822] outline-none transition focus:border-[#8b542f]"
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
            className="w-full resize-y border border-[#cdbda5] bg-[#fbf8f2] px-4 py-3 text-lg leading-8 text-[#2d2822] outline-none transition focus:border-[#8b542f]"
          />
        </QuestionCard>

        <QuestionCard
          label="Family Mission"
          description="In plain language, what should your family continue trying to do well?"
        >
          <textarea
            value={form.familyMission}
            onChange={(event) =>
              updateField("familyMission", event.target.value)
            }
            rows={5}
            placeholder="Examples: serve others, build strong families, pursue meaningful work, preserve faith, remain generous..."
            className="w-full resize-y border border-[#cdbda5] bg-[#fbf8f2] px-4 py-3 text-lg leading-8 text-[#2d2822] outline-none transition focus:border-[#8b542f]"
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
            className="w-full resize-y border border-[#cdbda5] bg-[#fbf8f2] px-4 py-3 text-lg leading-8 text-[#2d2822] outline-none transition focus:border-[#8b542f]"
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
            className="w-full resize-y border border-[#cdbda5] bg-[#fbf8f2] px-4 py-3 text-lg leading-8 text-[#2d2822] outline-none transition focus:border-[#8b542f]"
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
            className="w-full resize-y border border-[#cdbda5] bg-[#fbf8f2] px-4 py-3 text-lg leading-8 text-[#2d2822] outline-none transition focus:border-[#8b542f]"
          />
        </QuestionCard>
      </div>

      <footer className="mt-10 border-t border-[#cdbda5] pt-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={() =>
              router.push("/begin/achievements")
            }
            className="text-sm font-semibold uppercase tracking-[0.15em] text-[#6f4328]"
          >
            ← Back to Achievements
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
              Review Family Record →
            </button>
          </div>
        </div>
      </footer>
    </form>
  );
}
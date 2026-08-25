"use client";

import { useEffect, useState } from "react";
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

const emptyForm: AchievementsForm = {
  militaryAchievements: "",
  educationAchievements: "",
  careerAchievements: "",
  civicAchievements: "",
  familyMilestones: "",
  proudestLegacy: "",
};

type SaveStatus =
  | "loading"
  | "saved"
  | "saving"
  | "unsaved"
  | "error";

export default function AchievementsPage() {
  const router = useRouter();

  const [form, setForm] = useState<AchievementsForm>(emptyForm);
  const [userId, setUserId] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [saveStatus, setSaveStatus] =
    useState<SaveStatus>("loading");
  const [errorMessage, setErrorMessage] = useState("");

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

      setUserId(user.id);

      const { data, error } = await supabase
        .from("family_records")
        .select("achievements")
        .eq("user_id", user.id)
        .maybeSingle();

      if (cancelled) return;

      if (error) {
        console.error("Unable to load Achievements:", error);

        setErrorMessage(
          "We could not load this part of your Family Record. Please try again."
        );

        setSaveStatus("error");
        setLoaded(true);
        return;
      }

      if (data?.achievements) {
        setForm({
          ...emptyForm,
          ...(data.achievements as Partial<AchievementsForm>),
        });
      }

      setLoaded(true);
      setSaveStatus("saved");
    }

    loadAchievements();

    return () => {
      cancelled = true;
    };
  }, [router]);

  useEffect(() => {
    if (!loaded || !userId) return;

    setSaveStatus("saving");
    setErrorMessage("");

    const timer = window.setTimeout(async () => {
      const success = await saveAchievements();
      setSaveStatus(success ? "saved" : "error");
    }, 800);

    return () => window.clearTimeout(timer);
  }, [form, loaded, userId]);

  function updateField(
    field: keyof AchievementsForm,
    value: string
  ) {
    setSaveStatus("unsaved");

    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function saveAchievements(): Promise<boolean> {
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
          achievements: form,
          current_article: "achievements",
          completion_percent: 85,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "user_id",
        }
      );

    if (error) {
      console.error("Unable to save Achievements:", error);

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

    const success = await saveAchievements();

    setSaveStatus(success ? "saved" : "error");
  }

  async function continueToFuture(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setSaveStatus("saving");
    setErrorMessage("");

    const success = await saveAchievements();

    if (!success) {
      setSaveStatus("error");
      return;
    }

    setSaveStatus("saved");
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
          Achievement is broader than awards or titles. It includes service,
          education, enterprise, perseverance, sacrifice, milestones, and the
          quiet accomplishments that changed a family&apos;s path.
        </p>
      </header>

      {errorMessage && (
        <div className="mt-8 border border-red-300 bg-red-50 px-5 py-4 text-sm text-red-800">
          {errorMessage}
        </div>
      )}

      <div className="mt-12 space-y-6">
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
            className="w-full resize-y border border-[#cdbda5] bg-[#fbf8f2] px-4 py-3 text-lg leading-8 text-[#2d2822] outline-none transition focus:border-[#8b542f]"
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
            className="w-full resize-y border border-[#cdbda5] bg-[#fbf8f2] px-4 py-3 text-lg leading-8 text-[#2d2822] outline-none transition focus:border-[#8b542f]"
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
            className="w-full resize-y border border-[#cdbda5] bg-[#fbf8f2] px-4 py-3 text-lg leading-8 text-[#2d2822] outline-none transition focus:border-[#8b542f]"
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
            className="w-full resize-y border border-[#cdbda5] bg-[#fbf8f2] px-4 py-3 text-lg leading-8 text-[#2d2822] outline-none transition focus:border-[#8b542f]"
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
            className="w-full resize-y border border-[#cdbda5] bg-[#fbf8f2] px-4 py-3 text-lg leading-8 text-[#2d2822] outline-none transition focus:border-[#8b542f]"
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
            className="w-full resize-y border border-[#cdbda5] bg-[#fbf8f2] px-4 py-3 text-lg leading-8 text-[#2d2822] outline-none transition focus:border-[#8b542f]"
          />
        </QuestionCard>
      </div>

      <footer className="mt-10 border-t border-[#cdbda5] pt-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={() => router.push("/begin/symbols")}
            className="text-sm font-semibold uppercase tracking-[0.15em] text-[#6f4328]"
          >
            ← Back to Symbols
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
              Continue to Future Legacy →
            </button>
          </div>
        </div>
      </footer>
    </form>
  );
}
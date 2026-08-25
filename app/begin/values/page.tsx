"use client";

import { useEffect, useState } from "react";
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

const emptyForm: ValuesForm = {
  coreValues: "",
  faithRole: "",
  familyPrinciples: "",
  admiredQualities: "",
  lessonsToCarryForward: "",
};

type SaveStatus =
  | "loading"
  | "saved"
  | "saving"
  | "unsaved"
  | "error";

export default function ValuesPage() {
  const router = useRouter();

  const [form, setForm] = useState<ValuesForm>(emptyForm);
  const [userId, setUserId] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [saveStatus, setSaveStatus] =
    useState<SaveStatus>("loading");
  const [errorMessage, setErrorMessage] = useState("");

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

      setUserId(user.id);

      const { data, error } = await supabase
        .from("family_records")
        .select("values_record")
        .eq("user_id", user.id)
        .maybeSingle();

      if (cancelled) return;

      if (error) {
        console.error("Unable to load Values:", error);

        setErrorMessage(
          "We could not load this part of your Family Record. Please try again."
        );

        setSaveStatus("error");
        setLoaded(true);
        return;
      }

      if (data?.values_record) {
        setForm({
          ...emptyForm,
          ...(data.values_record as Partial<ValuesForm>),
        });
      }

      setLoaded(true);
      setSaveStatus("saved");
    }

    loadValues();

    return () => {
      cancelled = true;
    };
  }, [router]);

  useEffect(() => {
    if (!loaded || !userId) return;

    setSaveStatus("saving");
    setErrorMessage("");

    const timer = window.setTimeout(async () => {
      const success = await saveValues();

      setSaveStatus(success ? "saved" : "error");
    }, 800);

    return () => window.clearTimeout(timer);
  }, [form, loaded, userId]);

  function updateField(
    field: keyof ValuesForm,
    value: string
  ) {
    setSaveStatus("unsaved");

    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function saveValues(): Promise<boolean> {
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
          values_record: form,
          current_article: "values",
          completion_percent: 28,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "user_id",
        }
      );

    if (error) {
      console.error("Unable to save Values:", error);

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

    const success = await saveValues();

    setSaveStatus(success ? "saved" : "error");
  }

  async function continueToService(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setSaveStatus("saving");
    setErrorMessage("");

    const success = await saveValues();

    if (!success) {
      setSaveStatus("error");
      return;
    }

    setSaveStatus("saved");
    router.push("/begin/service");
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
          Values give meaning to the symbols that will eventually
          represent your family. Think about the principles,
          beliefs, and qualities that have shaped the way your
          family lives and serves others.
        </p>
      </header>

      {errorMessage && (
        <div className="mt-8 border border-red-300 bg-red-50 px-5 py-4 text-sm text-red-800">
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
              updateField("coreValues", event.target.value)
            }
            rows={5}
            placeholder="What values have been passed from generation to generation?"
            className="w-full resize-y border border-[#cdbda5] bg-[#fbf8f2] px-4 py-3 text-lg leading-8 text-[#2d2822] outline-none transition focus:border-[#8b542f]"
          />
        </QuestionCard>

        <QuestionCard
          label="Faith and Belief"
          description="If faith or spiritual belief has played a meaningful role in your family, describe it here."
        >
          <textarea
            value={form.faithRole}
            onChange={(event) =>
              updateField("faithRole", event.target.value)
            }
            rows={4}
            placeholder="Describe the role of faith, belief, or spiritual tradition in your family."
            className="w-full resize-y border border-[#cdbda5] bg-[#fbf8f2] px-4 py-3 text-lg leading-8 text-[#2d2822] outline-none transition focus:border-[#8b542f]"
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
            className="w-full resize-y border border-[#cdbda5] bg-[#fbf8f2] px-4 py-3 text-lg leading-8 text-[#2d2822] outline-none transition focus:border-[#8b542f]"
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
            className="w-full resize-y border border-[#cdbda5] bg-[#fbf8f2] px-4 py-3 text-lg leading-8 text-[#2d2822] outline-none transition focus:border-[#8b542f]"
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
            className="w-full resize-y border border-[#cdbda5] bg-[#fbf8f2] px-4 py-3 text-lg leading-8 text-[#2d2822] outline-none transition focus:border-[#8b542f]"
          />
        </QuestionCard>
      </div>

      <footer className="mt-10 border-t border-[#cdbda5] pt-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={() => router.push("/begin/origins")}
            className="text-sm font-semibold uppercase tracking-[0.15em] text-[#6f4328]"
          >
            ← Back to Origins
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
              Continue to Service →
            </button>
          </div>
        </div>
      </footer>
    </form>
  );
}
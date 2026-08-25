"use client";

import { useEffect, useState } from "react";
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

const emptyForm: TraditionsForm = {
  holidays: "",
  gatherings: "",
  recipes: "",
  sayings: "",
  customs: "",
  traditionsToPreserve: "",
};

type SaveStatus =
  | "loading"
  | "saved"
  | "saving"
  | "unsaved"
  | "error";

export default function TraditionsPage() {
  const router = useRouter();

  const [form, setForm] = useState<TraditionsForm>(emptyForm);
  const [userId, setUserId] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [saveStatus, setSaveStatus] =
    useState<SaveStatus>("loading");
  const [errorMessage, setErrorMessage] = useState("");

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

      setUserId(user.id);

      const { data, error } = await supabase
        .from("family_records")
        .select("traditions")
        .eq("user_id", user.id)
        .maybeSingle();

      if (cancelled) return;

      if (error) {
        console.error("Unable to load Traditions:", error);

        setErrorMessage(
          "We could not load this part of your Family Record. Please try again."
        );

        setSaveStatus("error");
        setLoaded(true);
        return;
      }

      if (data?.traditions) {
        setForm({
          ...emptyForm,
          ...(data.traditions as Partial<TraditionsForm>),
        });
      }

      setLoaded(true);
      setSaveStatus("saved");
    }

    loadTraditions();

    return () => {
      cancelled = true;
    };
  }, [router]);

  useEffect(() => {
    if (!loaded || !userId) return;

    setSaveStatus("saving");
    setErrorMessage("");

    const timer = window.setTimeout(async () => {
      const success = await saveTraditions();
      setSaveStatus(success ? "saved" : "error");
    }, 800);

    return () => window.clearTimeout(timer);
  }, [form, loaded, userId]);

  function updateField(
    field: keyof TraditionsForm,
    value: string
  ) {
    setSaveStatus("unsaved");

    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function saveTraditions(): Promise<boolean> {
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
          traditions: form,
          current_article: "traditions",
          completion_percent: 57,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "user_id",
        }
      );

    if (error) {
      console.error("Unable to save Traditions:", error);

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

    const success = await saveTraditions();

    setSaveStatus(success ? "saved" : "error");
  }

  async function continueToSymbols(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setSaveStatus("saving");
    setErrorMessage("");

    const success = await saveTraditions();

    if (!success) {
      setSaveStatus("error");
      return;
    }

    setSaveStatus("saved");
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
          What does your family return to, generation after generation?
        </h1>

        <div className="mt-7 h-px w-20 bg-[#b89559]" />

        <p className="mt-7 text-lg leading-8 text-[#665b50]">
          Traditions are the repeated acts that make family identity tangible.
          They may be formal customs or simple habits that have endured because
          they carry meaning.
        </p>
      </header>

      {errorMessage && (
        <div className="mt-8 border border-red-300 bg-red-50 px-5 py-4 text-sm text-red-800">
          {errorMessage}
        </div>
      )}

      <div className="mt-12 space-y-6">
        <QuestionCard
          label="Holidays and Celebrations"
          description="Describe holidays, religious observances, anniversaries, or celebrations that are especially important to your family."
        >
          <textarea
            value={form.holidays}
            onChange={(event) =>
              updateField("holidays", event.target.value)
            }
            rows={5}
            placeholder="What occasions bring your family together, and how are they celebrated?"
            className="w-full resize-y border border-[#cdbda5] bg-[#fbf8f2] px-4 py-3 text-lg leading-8 text-[#2d2822] outline-none transition focus:border-[#8b542f]"
          />
        </QuestionCard>

        <QuestionCard
          label="Family Gatherings"
          description="Include reunions, annual trips, Sunday dinners, seasonal gatherings, or other recurring occasions."
        >
          <textarea
            value={form.gatherings}
            onChange={(event) =>
              updateField("gatherings", event.target.value)
            }
            rows={5}
            placeholder="Describe the gatherings your family makes an effort to preserve."
            className="w-full resize-y border border-[#cdbda5] bg-[#fbf8f2] px-4 py-3 text-lg leading-8 text-[#2d2822] outline-none transition focus:border-[#8b542f]"
          />
        </QuestionCard>

        <QuestionCard
          label="Food and Recipes"
          description="Record meals, recipes, ingredients, or food traditions that hold special meaning."
        >
          <textarea
            value={form.recipes}
            onChange={(event) =>
              updateField("recipes", event.target.value)
            }
            rows={5}
            placeholder="What foods immediately make members of your family think of home?"
            className="w-full resize-y border border-[#cdbda5] bg-[#fbf8f2] px-4 py-3 text-lg leading-8 text-[#2d2822] outline-none transition focus:border-[#8b542f]"
          />
        </QuestionCard>

        <QuestionCard
          label="Family Sayings and Stories"
          description="Include sayings, jokes, expressions, repeated stories, nicknames, or phrases that have become part of family culture."
        >
          <textarea
            value={form.sayings}
            onChange={(event) =>
              updateField("sayings", event.target.value)
            }
            rows={5}
            placeholder="What words or stories would family members recognize immediately?"
            className="w-full resize-y border border-[#cdbda5] bg-[#fbf8f2] px-4 py-3 text-lg leading-8 text-[#2d2822] outline-none transition focus:border-[#8b542f]"
          />
        </QuestionCard>

        <QuestionCard
          label="Customs and Rituals"
          description="Describe customs around births, weddings, funerals, military service, graduations, faith, work, travel, or other life events."
        >
          <textarea
            value={form.customs}
            onChange={(event) =>
              updateField("customs", event.target.value)
            }
            rows={5}
            placeholder="What does your family do in moments that matter?"
            className="w-full resize-y border border-[#cdbda5] bg-[#fbf8f2] px-4 py-3 text-lg leading-8 text-[#2d2822] outline-none transition focus:border-[#8b542f]"
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
            className="w-full resize-y border border-[#cdbda5] bg-[#fbf8f2] px-4 py-3 text-lg leading-8 text-[#2d2822] outline-none transition focus:border-[#8b542f]"
          />
        </QuestionCard>
      </div>

      <footer className="mt-10 border-t border-[#cdbda5] pt-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={() => router.push("/begin/service")}
            className="text-sm font-semibold uppercase tracking-[0.15em] text-[#6f4328]"
          >
            ← Back to Service
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
              Continue to Symbols →
            </button>
          </div>
        </div>
      </footer>
    </form>
  );
}
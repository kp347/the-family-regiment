"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import QuestionCard from "@/components/builder/QuestionCard";
import { createClient } from "@/lib/supabase/client";

type SymbolsForm = {
  animals: string;
  colors: string;
  places: string;
  objects: string;
  plants: string;
  meaningfulSymbols: string;
};

const emptyForm: SymbolsForm = {
  animals: "",
  colors: "",
  places: "",
  objects: "",
  plants: "",
  meaningfulSymbols: "",
};

type SaveStatus =
  | "loading"
  | "saved"
  | "saving"
  | "unsaved"
  | "error";

export default function SymbolsPage() {
  const router = useRouter();

  const [form, setForm] = useState<SymbolsForm>(emptyForm);
  const [userId, setUserId] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [saveStatus, setSaveStatus] =
    useState<SaveStatus>("loading");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadSymbols() {
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
        .select("symbols")
        .eq("user_id", user.id)
        .maybeSingle();

      if (cancelled) return;

      if (error) {
        console.error("Unable to load Symbols:", error);

        setErrorMessage(
          "We could not load this part of your Family Record. Please try again."
        );

        setSaveStatus("error");
        setLoaded(true);
        return;
      }

      if (data?.symbols) {
        setForm({
          ...emptyForm,
          ...(data.symbols as Partial<SymbolsForm>),
        });
      }

      setLoaded(true);
      setSaveStatus("saved");
    }

    loadSymbols();

    return () => {
      cancelled = true;
    };
  }, [router]);

  useEffect(() => {
    if (!loaded || !userId) return;

    setSaveStatus("saving");
    setErrorMessage("");

    const timer = window.setTimeout(async () => {
      const success = await saveSymbols();
      setSaveStatus(success ? "saved" : "error");
    }, 800);

    return () => window.clearTimeout(timer);
  }, [form, loaded, userId]);

  function updateField(
    field: keyof SymbolsForm,
    value: string
  ) {
    setSaveStatus("unsaved");

    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function saveSymbols(): Promise<boolean> {
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
          symbols: form,
          current_article: "symbols",
          completion_percent: 71,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "user_id",
        }
      );

    if (error) {
      console.error("Unable to save Symbols:", error);

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

    const success = await saveSymbols();

    setSaveStatus(success ? "saved" : "error");
  }

  async function continueToAchievements(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setSaveStatus("saving");
    setErrorMessage("");

    const success = await saveSymbols();

    if (!success) {
      setSaveStatus("error");
      return;
    }

    setSaveStatus("saved");
    router.push("/begin/achievements");
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
    <form onSubmit={continueToAchievements}>
      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8b542f]">
          Article V · Symbols
        </p>

        <h1 className="font-display mt-5 text-5xl leading-[1.05] sm:text-6xl">
          What symbols already belong to your family&apos;s story?
        </h1>

        <div className="mt-7 h-px w-20 bg-[#b89559]" />

        <p className="mt-7 text-lg leading-8 text-[#665b50]">
          Heraldry should emerge from meaning, not decoration. These answers
          help identify visual themes that may later influence your crest,
          motto, colors, and other expressions of family identity.
        </p>
      </header>

      {errorMessage && (
        <div className="mt-8 border border-red-300 bg-red-50 px-5 py-4 text-sm text-red-800">
          {errorMessage}
        </div>
      )}

      <div className="mt-12 space-y-6">
        <QuestionCard
          label="Animals"
          description="Are there animals with personal, geographic, occupational, religious, or historical meaning to your family?"
        >
          <textarea
            value={form.animals}
            onChange={(event) =>
              updateField("animals", event.target.value)
            }
            rows={5}
            placeholder="Examples: eagle, horse, bear, stag, dog, lion, hawk..."
            className="w-full resize-y border border-[#cdbda5] bg-[#fbf8f2] px-4 py-3 text-lg leading-8 text-[#2d2822] outline-none transition focus:border-[#8b542f]"
          />
        </QuestionCard>

        <QuestionCard
          label="Colors"
          description="List colors that carry meaning for your family, and explain why when possible."
        >
          <textarea
            value={form.colors}
            onChange={(event) =>
              updateField("colors", event.target.value)
            }
            rows={4}
            placeholder="Examples: navy for service, green for farmland, red from a state or national flag..."
            className="w-full resize-y border border-[#cdbda5] bg-[#fbf8f2] px-4 py-3 text-lg leading-8 text-[#2d2822] outline-none transition focus:border-[#8b542f]"
          />
        </QuestionCard>

        <QuestionCard
          label="Places and Landscapes"
          description="Identify mountains, rivers, coastlines, farms, cities, states, countries, or other places strongly associated with your family."
        >
          <textarea
            value={form.places}
            onChange={(event) =>
              updateField("places", event.target.value)
            }
            rows={5}
            placeholder="What landscapes or places feel inseparable from your family story?"
            className="w-full resize-y border border-[#cdbda5] bg-[#fbf8f2] px-4 py-3 text-lg leading-8 text-[#2d2822] outline-none transition focus:border-[#8b542f]"
          />
        </QuestionCard>

        <QuestionCard
          label="Objects, Tools, and Occupations"
          description="Include meaningful tools, instruments, vehicles, books, equipment, crafts, or objects tied to family professions and history."
        >
          <textarea
            value={form.objects}
            onChange={(event) =>
              updateField("objects", event.target.value)
            }
            rows={5}
            placeholder="Examples: hammer, plow, compass, medical symbol, book, ship, aircraft, musical instrument..."
            className="w-full resize-y border border-[#cdbda5] bg-[#fbf8f2] px-4 py-3 text-lg leading-8 text-[#2d2822] outline-none transition focus:border-[#8b542f]"
          />
        </QuestionCard>

        <QuestionCard
          label="Trees, Plants, and Natural Symbols"
          description="Record plants or natural forms with meaning to your family or places of origin."
        >
          <textarea
            value={form.plants}
            onChange={(event) =>
              updateField("plants", event.target.value)
            }
            rows={4}
            placeholder="Examples: oak, pine, rose, thistle, wheat, olive branch..."
            className="w-full resize-y border border-[#cdbda5] bg-[#fbf8f2] px-4 py-3 text-lg leading-8 text-[#2d2822] outline-none transition focus:border-[#8b542f]"
          />
        </QuestionCard>

        <QuestionCard
          label="Symbols That Must Be Considered"
          description="If there are one or more symbols you strongly believe belong in your family identity, explain them here."
          required
        >
          <textarea
            required
            value={form.meaningfulSymbols}
            onChange={(event) =>
              updateField(
                "meaningfulSymbols",
                event.target.value
              )
            }
            rows={6}
            placeholder="Tell us which symbols matter most and what they represent."
            className="w-full resize-y border border-[#cdbda5] bg-[#fbf8f2] px-4 py-3 text-lg leading-8 text-[#2d2822] outline-none transition focus:border-[#8b542f]"
          />
        </QuestionCard>
      </div>

      <footer className="mt-10 border-t border-[#cdbda5] pt-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={() => router.push("/begin/traditions")}
            className="text-sm font-semibold uppercase tracking-[0.15em] text-[#6f4328]"
          >
            ← Back to Traditions
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
              Continue to Achievements →
            </button>
          </div>
        </div>
      </footer>
    </form>
  );
}
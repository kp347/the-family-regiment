"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import QuestionCard from "@/components/builder/QuestionCard";
import { createClient } from "@/lib/supabase/client";

type OriginsForm = {
  surname: string;
  alternateSpellings: string;
  countryOfOrigin: string;
  regionOfOrigin: string;
  earliestAncestor: string;
  approximateYear: string;
  familyStory: string;
};

const emptyForm: OriginsForm = {
  surname: "",
  alternateSpellings: "",
  countryOfOrigin: "",
  regionOfOrigin: "",
  earliestAncestor: "",
  approximateYear: "",
  familyStory: "",
};

type SaveStatus =
  | "loading"
  | "saved"
  | "saving"
  | "unsaved"
  | "error";

export default function OriginsPage() {
  const router = useRouter();

  const [form, setForm] = useState<OriginsForm>(emptyForm);
  const [userId, setUserId] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [saveStatus, setSaveStatus] =
    useState<SaveStatus>("loading");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadOrigins() {
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
        .select("origins")
        .eq("user_id", user.id)
        .maybeSingle();

      if (cancelled) return;

      if (error) {
        console.error("Unable to load Origins:", error);
        setErrorMessage(
          "We could not load your Family Record. Please try again."
        );
        setSaveStatus("error");
        setLoaded(true);
        return;
      }

      if (data?.origins) {
        setForm({
          ...emptyForm,
          ...(data.origins as Partial<OriginsForm>),
        });
      }

      setLoaded(true);
      setSaveStatus("saved");
    }

    loadOrigins();

    return () => {
      cancelled = true;
    };
  }, [router]);

  useEffect(() => {
    if (!loaded || !userId) return;

    setSaveStatus("saving");
    setErrorMessage("");

    const timer = window.setTimeout(async () => {
      const success = await saveOrigins();

      if (success) {
        setSaveStatus("saved");
      } else {
        setSaveStatus("error");
      }
    }, 800);

    return () => window.clearTimeout(timer);
  }, [form, loaded, userId]);

  function updateField(
    field: keyof OriginsForm,
    value: string
  ) {
    setSaveStatus("unsaved");

    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function saveOrigins(): Promise<boolean> {
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
          origins: form,
          current_article: "origins",
          completion_percent: 14,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "user_id",
        }
      );

    if (error) {
      console.error("Unable to save Origins:", error);

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

    const success = await saveOrigins();

    setSaveStatus(success ? "saved" : "error");
  }

  async function continueToValues(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setSaveStatus("saving");
    setErrorMessage("");

    const success = await saveOrigins();

    if (!success) {
      setSaveStatus("error");
      return;
    }

    setSaveStatus("saved");
    router.push("/begin/values");
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
    <form onSubmit={continueToValues}>
      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8b542f]">
          Article I · Origins
        </p>

        <h1 className="font-display mt-5 text-5xl leading-[1.05] sm:text-6xl">
          Every family&apos;s story begins somewhere.
        </h1>

        <div className="mt-7 h-px w-20 bg-[#b89559]" />

        <p className="mt-7 text-lg leading-8 text-[#665b50]">
          Begin with what you know. Exact dates and complete
          genealogical research are not required. Your Family
          Record can continue to grow as new information is
          discovered.
        </p>
      </header>

      {errorMessage && (
        <div className="mt-8 border border-red-300 bg-red-50 px-5 py-4 text-sm text-red-800">
          {errorMessage}
        </div>
      )}

      <div className="mt-12 space-y-6">
        <QuestionCard
          label="Family Surname"
          description="Enter the primary surname this Family Record will represent."
          required
        >
          <input
            type="text"
            required
            value={form.surname}
            onChange={(event) =>
              updateField("surname", event.target.value)
            }
            placeholder="Example: Hamilton"
            className="w-full border border-[#cdbda5] bg-[#fbf8f2] px-4 py-3 text-lg text-[#2d2822] outline-none transition focus:border-[#8b542f]"
          />
        </QuestionCard>

        <QuestionCard
          label="Alternate Spellings"
          description="Include historic spellings, changed surnames, or other versions used by your family."
        >
          <input
            type="text"
            value={form.alternateSpellings}
            onChange={(event) =>
              updateField(
                "alternateSpellings",
                event.target.value
              )
            }
            placeholder="Optional"
            className="w-full border border-[#cdbda5] bg-[#fbf8f2] px-4 py-3 text-lg text-[#2d2822] outline-none transition focus:border-[#8b542f]"
          />
        </QuestionCard>

        <QuestionCard
          label="Country of Origin"
          description="Enter the country or countries most closely associated with your family's known origins."
          required
        >
          <input
            type="text"
            required
            value={form.countryOfOrigin}
            onChange={(event) =>
              updateField(
                "countryOfOrigin",
                event.target.value
              )
            }
            placeholder="Example: Scotland"
            className="w-full border border-[#cdbda5] bg-[#fbf8f2] px-4 py-3 text-lg text-[#2d2822] outline-none transition focus:border-[#8b542f]"
          />
        </QuestionCard>

        <QuestionCard
          label="State, Province, or Region"
          description="If known, identify the more specific place connected to your family's origins."
        >
          <input
            type="text"
            value={form.regionOfOrigin}
            onChange={(event) =>
              updateField(
                "regionOfOrigin",
                event.target.value
              )
            }
            placeholder="Example: Highlands, Virginia, Bavaria"
            className="w-full border border-[#cdbda5] bg-[#fbf8f2] px-4 py-3 text-lg text-[#2d2822] outline-none transition focus:border-[#8b542f]"
          />
        </QuestionCard>

        <QuestionCard
          label="Earliest Known Ancestor"
          description="Name the earliest ancestor you currently know enough about to identify."
        >
          <input
            type="text"
            value={form.earliestAncestor}
            onChange={(event) =>
              updateField(
                "earliestAncestor",
                event.target.value
              )
            }
            placeholder="Name or identifying description"
            className="w-full border border-[#cdbda5] bg-[#fbf8f2] px-4 py-3 text-lg text-[#2d2822] outline-none transition focus:border-[#8b542f]"
          />
        </QuestionCard>

        <QuestionCard
          label="Approximate Year"
          description="An estimate is perfectly acceptable."
        >
          <input
            type="text"
            value={form.approximateYear}
            onChange={(event) =>
              updateField(
                "approximateYear",
                event.target.value
              )
            }
            placeholder="Example: 1885 or late 1800s"
            className="w-full border border-[#cdbda5] bg-[#fbf8f2] px-4 py-3 text-lg text-[#2d2822] outline-none transition focus:border-[#8b542f]"
          />
        </QuestionCard>

        <QuestionCard
          label="The Story of Your Origins"
          description="Tell us what your family understands about where it came from, how it moved, and how it arrived where it is today."
        >
          <textarea
            value={form.familyStory}
            onChange={(event) =>
              updateField(
                "familyStory",
                event.target.value
              )
            }
            rows={8}
            placeholder="Write what you know. Family stories, migration, military postings, immigration, moves between states, and uncertain details are all welcome."
            className="w-full resize-y border border-[#cdbda5] bg-[#fbf8f2] px-4 py-3 text-lg leading-8 text-[#2d2822] outline-none transition focus:border-[#8b542f]"
          />
        </QuestionCard>
      </div>

      <footer className="mt-10 border-t border-[#cdbda5] pt-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p
            className={`text-xs font-semibold uppercase tracking-[0.18em] ${
              saveStatus === "error"
                ? "text-red-700"
                : "text-[#817366]"
            }`}
          >
            {getStatusText()}
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
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
              Continue to Values →
            </button>
          </div>
        </div>
      </footer>
    </form>
  );
}
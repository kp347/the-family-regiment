
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

type OriginsForm = {
  surname: string;
  alternateSpellings: string;
  countryOfOrigin: string;
  regionOfOrigin: string;
  branchName: string;
  branchLocation: string;
  earliestAncestor: string;
  approximateYear: string;
  familyStory: string;
};

type SaveStatus =
  | "loading"
  | "saved"
  | "saving"
  | "unsaved"
  | "error";

const emptyForm: OriginsForm = {
  surname: "",
  alternateSpellings: "",
  countryOfOrigin: "",
  regionOfOrigin: "",
  branchName: "",
  branchLocation: "",
  earliestAncestor: "",
  approximateYear: "",
  familyStory: "",
};

export default function OriginsPage() {
  const router = useRouter();

  const [form, setForm] = useState<OriginsForm>(emptyForm);

  const [userId, setUserId] = useState<string | null>(
    null
  );

  const [loaded, setLoaded] = useState(false);
  const [ready, setReady] = useState(false);

  const [saveStatus, setSaveStatus] =
    useState<SaveStatus>("loading");

  const [errorMessage, setErrorMessage] = useState("");

  // Refs are reserved for asynchronous save operations.
  // React state controls the rendered interface.
  const recordId = useRef<string | null>(null);
  const recordReady = useRef(false);

  const latestForm = useRef<OriginsForm>(emptyForm);

  const saveQueue = useRef<Promise<boolean>>(
    Promise.resolve(true)
  );

  const changeVersion = useRef(0);
  const savedVersion = useRef(0);

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

      // Exactly one Family Record per authenticated user.
      const { data: record, error } = await supabase
        .from("family_records")
        .select("id, origins")
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

      recordId.current = record?.id ?? null;

      if (record?.origins) {
        const restored: OriginsForm = {
          ...emptyForm,
          ...(record.origins as Partial<OriginsForm>),
        };

        latestForm.current = restored;
        setForm(restored);
      }

      recordReady.current = true;

      // This state controls buttons and other JSX.
      setReady(true);
      setLoaded(true);
      setSaveStatus("saved");
    }

    void loadOrigins();

    return () => {
      cancelled = true;
    };
  }, [router]);

  function updateField(
    field: keyof OriginsForm,
    value: string
  ) {
    changeVersion.current += 1;

    const next: OriginsForm = {
      ...latestForm.current,
      [field]: value,
    };

    latestForm.current = next;

    setForm(next);
    setSaveStatus("unsaved");
    setErrorMessage("");
  }

  function saveOrigins(
    nextArticle?: "values"
  ): Promise<boolean> {
    if (!userId || !recordReady.current) {
      setErrorMessage(
        "Your Family Record is not ready. Please refresh and try again."
      );

      return Promise.resolve(false);
    }

    const snapshot = { ...latestForm.current };
    const version = changeVersion.current;

    const performSave = async (): Promise<boolean> => {
      const supabase = createClient();
      const now = new Date().toISOString();

      if (recordId.current) {
        // Update the existing Family Record.
        const updatePayload = {
          origins: snapshot,
          updated_at: now,
          ...(nextArticle
            ? { current_article: nextArticle }
            : {}),
        };

        const { data, error } = await supabase
          .from("family_records")
          .update(updatePayload)
          .eq("id", recordId.current)
          .eq("user_id", userId)
          .select("id")
          .maybeSingle();

        if (error || !data) {
          console.error(
            "Unable to update Origins:",
            error
          );

          setErrorMessage(
            "Your changes could not be saved. Please try again."
          );

          return false;
        }
      } else {
        // Create the customer's one Family Record
        // when the Origins chapter is first saved.
        const { data, error } = await supabase
          .from("family_records")
          .insert({
            user_id: userId,
            origins: snapshot,
            updated_at: now,
            current_article: nextArticle ?? "origins",
          })
          .select("id")
          .single();

        if (error || !data) {
          console.error(
            "Unable to create Family Record:",
            error
          );

          setErrorMessage(
            "Your Family Record could not be created. Please refresh and try again."
          );

          return false;
        }

        recordId.current = data.id;
      }

      savedVersion.current = Math.max(
        savedVersion.current,
        version
      );

      return true;
    };

    // Serialize writes to prevent overlapping saves
    // from completing out of order.
    const next = saveQueue.current.then(
      performSave,
      performSave
    );

    saveQueue.current = next;

    return next;
  }

  useEffect(() => {
    if (!loaded || !ready || !userId) return;

    if (changeVersion.current === 0) return;

    const version = changeVersion.current;

    if (version <= savedVersion.current) return;

    const timer = window.setTimeout(async () => {
      setSaveStatus("saving");

      const success = await saveOrigins();

      if (version === changeVersion.current) {
        setSaveStatus(
          success ? "saved" : "error"
        );
      }
    }, 800);

    return () => {
      window.clearTimeout(timer);
    };

    // saveOrigins reads the latest form from refs.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, loaded, ready, userId]);

  async function saveNow() {
    if (!recordReady.current) return;

    setSaveStatus("saving");
    setErrorMessage("");

    const version = changeVersion.current;
    const success = await saveOrigins();

    if (version === changeVersion.current) {
      setSaveStatus(
        success ? "saved" : "error"
      );
    }
  }

  async function continueToValues(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!recordReady.current) return;

    if (!form.surname.trim()) {
      setErrorMessage(
        "Please enter your family surname."
      );
      return;
    }

    if (!form.countryOfOrigin.trim()) {
      setErrorMessage(
        "Please enter your family's country of origin."
      );
      return;
    }

    setSaveStatus("saving");
    setErrorMessage("");

    const success = await saveOrigins("values");

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

  const inputClass =
    "w-full border border-[#cdbda5] bg-[#fbf8f2] px-4 py-3 text-lg text-[#2d2822] outline-none transition focus:border-[#8b542f]";

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
          Begin with what you know. Exact dates and
          complete genealogical research are not required.
          Your Family Record can continue to grow as new
          information is discovered.
        </p>
      </header>

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
          label="Family Surname"
          description="Enter the primary surname this Family Record will represent."
          required
        >
          <input
            type="text"
            required
            value={form.surname}
            onChange={(event) =>
              updateField(
                "surname",
                event.target.value
              )
            }
            placeholder="Example: Blake"
            className={inputClass}
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
            className={inputClass}
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
            placeholder="Example: France"
            className={inputClass}
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
            placeholder="Example: Normandy, Bavaria, Virginia"
            className={inputClass}
          />
        </QuestionCard>

        <div className="my-12 border-y border-[#cdbda5] py-10">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8b542f]">
            Your Family Branch · Optional
          </p>

          <h2 className="font-display mt-4 text-3xl text-[#2d2822] sm:text-4xl">
            One family heritage. Your representation.
          </h2>

          <p className="mt-5 max-w-3xl text-base leading-8 text-[#665b50]">
            Families sharing a surname may have different
            histories, traditions, values, and heraldic
            identities. You may identify your geographic
            family branch here as part of your single
            Family Record. This does not create a separate
            record or crest.
          </p>

          <div className="mt-8 space-y-6">
            <QuestionCard
              label="Family Branch Name"
              description="An optional name for the family branch you represent. This does not change your family crest."
            >
              <input
                type="text"
                value={form.branchName}
                onChange={(event) =>
                  updateField(
                    "branchName",
                    event.target.value
                  )
                }
                placeholder="Example: Maryland Branch"
                className={inputClass}
              />
            </QuestionCard>

            <QuestionCard
              label="Branch Location"
              description="Where your family is represented today, such as a state, city, or country."
            >
              <input
                type="text"
                value={form.branchLocation}
                onChange={(event) =>
                  updateField(
                    "branchLocation",
                    event.target.value
                  )
                }
                placeholder="Example: Maryland, United States"
                className={inputClass}
              />
            </QuestionCard>
          </div>

          <p className="mt-6 text-sm italic leading-6 text-[#817366]">
            You can leave both fields blank. Your family
            surname remains the primary House identity.
          </p>
        </div>

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
            className={inputClass}
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
            className={inputClass}
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
            className={`${inputClass} resize-y leading-8`}
          />
        </QuestionCard>
      </div>

      <footer className="mt-10 border-t border-[#cdbda5] pt-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p
            aria-live="polite"
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
              disabled={
                !ready ||
                saveStatus === "saving"
              }
              className="border border-[#9d835f] px-6 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-[#5b4433] transition hover:bg-[#ebe1d2] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Save Progress
            </button>

            <button
              type="submit"
              disabled={
                !ready ||
                saveStatus === "saving"
              }
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

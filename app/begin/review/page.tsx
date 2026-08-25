"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type RecordSection = {
  title: string;
  route: string;
  sourceKey:
    | "origins"
    | "values_record"
    | "service"
    | "traditions"
    | "symbols"
    | "achievements"
    | "future_legacy";
  labels: Record<string, string>;
};

const sections: RecordSection[] = [
  {
    title: "Origins",
    route: "/begin/origins",
    sourceKey: "origins",
    labels: {
      surname: "Family Surname",
      alternateSpellings: "Alternate Spellings",
      countryOfOrigin: "Country of Origin",
      regionOfOrigin: "State, Province, or Region",
      earliestAncestor: "Earliest Known Ancestor",
      approximateYear: "Approximate Year",
      familyStory: "The Story of Your Origins",
    },
  },
  {
    title: "Values",
    route: "/begin/values",
    sourceKey: "values_record",
    labels: {
      coreValues: "Core Family Values",
      faithRole: "Faith and Belief",
      familyPrinciples: "Family Principles",
      admiredQualities: "Qualities You Most Admire",
      lessonsToCarryForward: "Lessons Worth Carrying Forward",
    },
  },
  {
    title: "Service",
    route: "/begin/service",
    sourceKey: "service",
    labels: {
      militaryService: "Military Service",
      publicService: "Public Service",
      communityService: "Community and Faith Service",
      professions: "Professions and Trades",
      organizations: "Organizations and Institutions",
      serviceLegacy: "Legacy of Service",
    },
  },
  {
    title: "Traditions",
    route: "/begin/traditions",
    sourceKey: "traditions",
    labels: {
      holidays: "Holidays and Celebrations",
      gatherings: "Family Gatherings",
      recipes: "Food and Recipes",
      sayings: "Family Sayings and Stories",
      customs: "Customs and Rituals",
      traditionsToPreserve: "Traditions Worth Preserving",
    },
  },
  {
    title: "Symbols",
    route: "/begin/symbols",
    sourceKey: "symbols",
    labels: {
      animals: "Animals",
      colors: "Colors",
      places: "Places and Landscapes",
      objects: "Objects, Tools, and Occupations",
      plants: "Trees, Plants, and Natural Symbols",
      meaningfulSymbols: "Symbols That Must Be Considered",
    },
  },
  {
    title: "Achievements",
    route: "/begin/achievements",
    sourceKey: "achievements",
    labels: {
      militaryAchievements: "Military Achievements",
      educationAchievements: "Education and Scholarship",
      careerAchievements: "Career, Business, and Craft",
      civicAchievements: "Civic and Community Achievements",
      familyMilestones: "Family Milestones",
      proudestLegacy: "The Achievement That Best Represents Your Family",
    },
  },
  {
    title: "Future Legacy",
    route: "/begin/future",
    sourceKey: "future_legacy",
    labels: {
      futureVision: "Your Vision for the Family",
      descendantsShouldKnow: "What Should Your Descendants Know?",
      familyMission: "Family Mission",
      responsibilities: "Responsibilities of Future Stewards",
      hopesForNextGeneration: "Hopes for the Next Generation",
      legacyStatement: "Legacy Statement",
    },
  },
];

type FamilyRecordRow = {
  origins: Record<string, string> | null;
  values_record: Record<string, string> | null;
  service: Record<string, string> | null;
  traditions: Record<string, string> | null;
  symbols: Record<string, string> | null;
  achievements: Record<string, string> | null;
  future_legacy: Record<string, string> | null;
};

type SavedSection = {
  title: string;
  route: string;
  entries: {
    label: string;
    value: string;
  }[];
};

export default function ReviewPage() {
  const router = useRouter();

  const [record, setRecord] = useState<SavedSection[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadFamilyRecord() {
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

      const { data, error } = await supabase
        .from("family_records")
        .select(
          `
          origins,
          values_record,
          service,
          traditions,
          symbols,
          achievements,
          future_legacy
        `
        )
        .eq("user_id", user.id)
        .maybeSingle();

      if (cancelled) return;

      if (error) {
        console.error("Unable to load Family Record:", error);
        setErrorMessage(
          "We could not load your Family Record. Please try again."
        );
        setLoaded(true);
        return;
      }

      const familyRecord = (data ?? {
        origins: {},
        values_record: {},
        service: {},
        traditions: {},
        symbols: {},
        achievements: {},
        future_legacy: {},
      }) as FamilyRecordRow;

      const formattedRecord: SavedSection[] = sections.map((section) => {
        const source = familyRecord[section.sourceKey] ?? {};

        return {
          title: section.title,
          route: section.route,
          entries: Object.entries(section.labels).map(([field, label]) => ({
            label,
            value: source[field]?.trim() || "Not provided",
          })),
        };
      });

      setRecord(formattedRecord);
      setLoaded(true);
    }

    loadFamilyRecord();

    return () => {
      cancelled = true;
    };
  }, [router]);

  const completion = useMemo(() => {
    if (!loaded) return 0;

    const entries = record.flatMap((section) => section.entries);

    if (entries.length === 0) return 0;

    const completed = entries.filter(
      (entry) => entry.value !== "Not provided"
    ).length;

    return Math.round((completed / entries.length) * 100);
  }, [record, loaded]);

  async function continueToHerald() {
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/auth/sign-in");
      return;
    }

    const { error } = await supabase
      .from("family_records")
      .update({
        current_article: "review",
        completion_percent: 100,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", user.id);

    if (error) {
      console.error("Unable to finalize Family Record:", error);
      setErrorMessage(
        "Your Family Record could not be finalized. Please try again."
      );
      return;
    }

    router.push("/herald");
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
    <section>
      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8b542f]">
          Article VIII · Review
        </p>

        <h1 className="font-display mt-5 text-5xl leading-[1.05] sm:text-6xl">
          Review your Family Record.
        </h1>

        <div className="mt-7 h-px w-20 bg-[#b89559]" />

        <p className="mt-7 text-lg leading-8 text-[#665b50]">
          Review each article before continuing. This record will become the
          source material for the heraldic recommendations created in the next
          stage.
        </p>
      </header>

      {errorMessage && (
        <div className="mt-8 border border-red-300 bg-red-50 px-5 py-4 text-sm text-red-800">
          {errorMessage}
        </div>
      )}

      <div className="mt-10 border border-[#cdbda5] bg-[#ebe1d2] p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8b542f]">
              Record Completion
            </p>

            <p className="font-display mt-2 text-3xl text-[#2d2822]">
              {completion}%
            </p>
          </div>

          <div className="w-full max-w-md">
            <div className="h-2 overflow-hidden bg-[#d7c9b5]">
              <div
                className="h-full bg-[#8b542f] transition-all duration-300"
                style={{ width: `${completion}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 space-y-8">
        {record.map((section) => (
          <article
            key={section.title}
            className="border border-[#d8c9b3] bg-white/70"
          >
            <div className="flex flex-col gap-4 border-b border-[#d8c9b3] px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
              <h2 className="font-display text-3xl text-[#2d2822]">
                {section.title}
              </h2>

              <button
                type="button"
                onClick={() => router.push(section.route)}
                className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6f4328]"
              >
                Edit Article
              </button>
            </div>

            <div className="divide-y divide-[#e1d5c4]">
              {section.entries.map((entry) => (
                <div
                  key={entry.label}
                  className="grid gap-3 px-6 py-5 sm:grid-cols-[220px_1fr] sm:px-8"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8b542f]">
                    {entry.label}
                  </p>

                  <p
                    className={`whitespace-pre-wrap leading-7 ${
                      entry.value === "Not provided"
                        ? "italic text-[#9a8e80]"
                        : "text-[#4d443b]"
                    }`}
                  >
                    {entry.value}
                  </p>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>

      <div className="mt-12 border border-[#b99a62] bg-[#141510] p-8 text-[#f2e9da] sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#c8a86b]">
          The Next Stage
        </p>

        <h2 className="font-display mt-4 text-4xl">
          Your family story now becomes heraldic direction.
        </h2>

        <p className="mt-5 max-w-3xl leading-8 text-[#c8bfb2]">
          The Herald will interpret the themes in your Family Record and use
          them to develop meaningful recommendations for colors, symbols,
          charges, motto directions, and visual identity.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => router.push("/begin/future")}
            className="border border-[#8c806e] px-6 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-[#eee4d4] transition hover:bg-white/[0.05]"
          >
            ← Back to Future Legacy
          </button>

          <button
            type="button"
            onClick={continueToHerald}
            className="border border-[#a7723f] bg-[#7a4728] px-7 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-[#925a32]"
          >
            Continue to the Herald →
          </button>
        </div>
      </div>
    </section>
  );
}
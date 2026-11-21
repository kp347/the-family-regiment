
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type SectionKey =
  | "origins"
  | "values_record"
  | "service"
  | "traditions"
  | "symbols"
  | "achievements"
  | "future_legacy";

type RecordSection = {
  title: string;
  route: string;
  sourceKey: SectionKey;
  labels: Record<string, string>;
  requiredFields: string[];
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
      branchName: "Family Branch (Optional)",
      branchLocation: "Family Branch Location (Optional)",
      earliestAncestor: "Earliest Known Ancestor",
      approximateYear: "Approximate Year",
      familyStory: "The Story of Your Origins",
    },
    requiredFields: ["surname", "familyStory"],
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
    requiredFields: [
      "coreValues",
      "lessonsToCarryForward",
    ],
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
    requiredFields: ["professions", "serviceLegacy"],
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
    requiredFields: ["traditionsToPreserve"],
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
    requiredFields: ["meaningfulSymbols"],
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
      proudestLegacy:
        "The Achievement That Best Represents Your Family",
    },
    requiredFields: ["proudestLegacy"],
  },
  {
    title: "Future Legacy",
    route: "/begin/future",
    sourceKey: "future_legacy",
    labels: {
      futureVision: "Your Vision for the Family",
      descendantsShouldKnow:
        "What Should Your Descendants Know?",
      familyMission: "Family Mission",
      responsibilities:
        "Responsibilities of Future Stewards",
      hopesForNextGeneration:
        "Hopes for the Next Generation",
      legacyStatement: "Legacy Statement",
    },
    requiredFields: [
      "futureVision",
      "descendantsShouldKnow",
      "legacyStatement",
    ],
  },
];

type FamilyRecordRow = {
  id: string;
} & Record<SectionKey, Record<string, string> | null>;

type SavedEntry = {
  field: string;
  label: string;
  value: string;
  required: boolean;
  provided: boolean;
};

type SavedSection = {
  title: string;
  route: string;
  entries: SavedEntry[];
};

function formatRecord(
  familyRecord: FamilyRecordRow
): SavedSection[] {
  return sections.map((section) => {
    const source = familyRecord[section.sourceKey] ?? {};

    return {
      title: section.title,
      route: section.route,
      entries: Object.entries(section.labels).map(
        ([field, label]) => {
          const rawValue = source[field];
          const value =
            typeof rawValue === "string"
              ? rawValue.trim()
              : "";

          return {
            field,
            label,
            value,
            required:
              section.requiredFields.includes(field),
            provided: value.length > 0,
          };
        }
      ),
    };
  });
}

export default function ReviewPage() {
  const router = useRouter();

  const [record, setRecord] = useState<SavedSection[]>([]);
  const [userId, setUserId] = useState<string | null>(
    null
  );
  const [recordId, setRecordId] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [finalizing, setFinalizing] = useState(false);

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

      // One authenticated account owns one Family Record.
      const { data: familyRecord, error } = await supabase
        .from("family_records")
        .select("id, origins, values_record, service, traditions, symbols, achievements, future_legacy")
        .eq("user_id", user.id)
        .maybeSingle();

      if (cancelled) return;

      if (error) {
        console.error("Unable to load Family Record:", error);
        setErrorMessage("We could not load your Family Record. Please try again.");
        setLoaded(true);
        return;
      }

      if (!familyRecord) {
        setErrorMessage("No Family Record was found. Begin with Origins to create your record.");
        setLoaded(true);
        return;
      }

      setRecordId(familyRecord.id);
      setRecord(formatRecord(familyRecord));
      setUserId(user.id);
      setLoaded(true);
    }

    void loadFamilyRecord();

    return () => {
      cancelled = true;
    };
  }, [router]);

  const requiredProgress = useMemo(() => {
    const required = record.flatMap((section) =>
      section.entries.filter((entry) => entry.required)
    );

    const completed = required.filter(
      (entry) => entry.provided
    ).length;

    return {
      completed,
      total: required.length,
      percentage:
        required.length > 0
          ? Math.round(
              (completed / required.length) * 100
            )
          : 0,
    };
  }, [record]);

  const missingSections = useMemo(() => {
    return record
      .map((section) => ({
        title: section.title,
        route: section.route,
        missing: section.entries.filter(
          (entry) => entry.required && !entry.provided
        ),
      }))
      .filter((section) => section.missing.length > 0);
  }, [record]);

  const canFinalize =
    !!userId &&
    !!recordId &&
    loaded &&
    record.length === sections.length &&
    requiredProgress.total > 0 &&
    missingSections.length === 0 &&
    !finalizing;

  async function continueToHerald() {
    if (!userId || !recordId || finalizing) return;

    setFinalizing(true);
    setErrorMessage("");

    try {
      const supabase = createClient();

      // Reload before finalization so the required-field
      // check uses the latest persisted record.
      const { data, error: loadError } = await supabase
        .from("family_records")
        .select(`id, origins, values_record, service, traditions, symbols, achievements, future_legacy`)
        .eq("id", recordId)
        .eq("user_id", userId)
        .limit(1);

      if (loadError || !data?.[0]) {
        setErrorMessage(
          "We could not verify your saved Family Record. Please try again."
        );
        return;
      }

      const freshRecord = formatRecord(
        data[0] as FamilyRecordRow
      );

      setRecord(freshRecord);

      const hasMissingRequired = freshRecord.some(
        (section) =>
          section.entries.some(
            (entry) => entry.required && !entry.provided
          )
      );

      if (hasMissingRequired) {
        setErrorMessage(
          "Some required answers are missing. Please complete the highlighted fields before continuing."
        );
        return;
      }

      const { data: updatedRows, error: updateError } =
        await supabase
          .from("family_records")
          .update({
            current_article: "review",
            completion_percent: 100,
            updated_at: new Date().toISOString(),
          })
          .eq("id", recordId)
          .eq("user_id", userId)
          .select("id");

      if (updateError || updatedRows?.length !== 1) {
        console.error(
          "Unable to finalize Family Record:",
          updateError
        );

        setErrorMessage(
          "Your Family Record could not be finalized. Please try again."
        );
        return;
      }

      router.push("/herald");
    } catch (error) {
      console.error(
        "Unexpected Family Record finalization error:",
        error
      );

      setErrorMessage(
        "Something went wrong while finalizing your Family Record. Please try again."
      );
    } finally {
      setFinalizing(false);
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
          Review each article before continuing. This
          record will become the source material for
          the heraldic recommendations created in
          the next stage.
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

      <div className="mt-10 border border-[#cdbda5] bg-[#ebe1d2] p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8b542f]">
              Required Answers Completed
            </p>

            <p className="font-display mt-2 text-3xl text-[#2d2822]">
              {requiredProgress.percentage}%
            </p>

            <p className="mt-2 text-sm text-[#665b50]">
              {requiredProgress.completed} of{" "}
              {requiredProgress.total} required answers
              provided. Optional questions do not
              affect this percentage.
            </p>
          </div>

          <div className="w-full max-w-md">
            <div
              className="h-2 overflow-hidden bg-[#d7c9b5]"
              role="progressbar"
              aria-label="Required answers completed"
              aria-valuenow={requiredProgress.percentage}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="h-full bg-[#8b542f] transition-all duration-300"
                style={{
                  width: `${requiredProgress.percentage}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {missingSections.length > 0 && (
        <div className="mt-8 border border-[#cdbda5] bg-[#fbf8f2] px-6 py-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8b542f]">
            Answers Needed Before Continuing
          </p>

          <p className="mt-3 text-sm leading-7 text-[#665b50]">
            Complete the following required questions.
            Your other answers have been preserved.
          </p>

          <ul className="mt-4 space-y-4">
            {missingSections.map((section) => (
              <li key={section.title}>
                <button
                  type="button"
                  onClick={() => {
                    if (recordId) router.push(section.route);
                  }}
                  className="text-sm font-semibold text-[#6f4328] underline underline-offset-4"
                >
                  Edit {section.title}
                </button>

                <p className="mt-1 text-sm leading-6 text-[#665b50]">
                  {section.missing
                    .map((entry) => entry.label)
                    .join(", ")}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}

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
                onClick={() => {
                  if (recordId) router.push(section.route);
                }}
                className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6f4328]"
              >
                Edit Article
              </button>
            </div>

            <div className="divide-y divide-[#e1d5c4]">
              {section.entries.map((entry) => (
                <div
                  key={entry.field}
                  className="grid gap-3 px-6 py-5 sm:grid-cols-[220px_1fr] sm:px-8"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8b542f]">
                    {entry.label}
                    {entry.required && (
                      <span
                        className="ml-1 text-[#8b542f]"
                        aria-label="Required"
                      >
                        *
                      </span>
                    )}
                  </p>

                  <p
                    className={`whitespace-pre-wrap leading-7 ${
                      !entry.provided
                        ? "italic text-[#9a8e80]"
                        : "text-[#4d443b]"
                    }`}
                  >
                    {entry.provided
                      ? entry.value
                      : entry.required
                        ? "Required answer missing"
                        : "Not provided"}
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
          The Herald will interpret the themes in your
          Family Record and use them to develop
          meaningful recommendations for colors,
          symbols, charges, motto directions, and
          visual identity.
        </p>

        <p className="mt-4 text-sm leading-7 text-[#c8bfb2]">
          You may return to edit your Family Record.
          Completing this stage confirms that the
          required information is ready for heraldic
          interpretation.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => {
              if (recordId) router.push("/begin/future");
            }}
            disabled={finalizing || !recordId}
            className="border border-[#8c806e] px-6 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-[#eee4d4] transition hover:bg-white/[0.05] disabled:opacity-50"
          >
            ← Back to Future Legacy
          </button>

          <button
            type="button"
            onClick={continueToHerald}
            disabled={!canFinalize}
            className="border border-[#a7723f] bg-[#7a4728] px-7 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-[#925a32] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {finalizing
              ? "Finalizing Family Record..."
              : "Continue to the Herald →"}
          </button>
        </div>
      </div>
    </section>
  );
}

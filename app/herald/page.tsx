
"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type HeraldRecommendation = {
  recommendation: string;
  traditionalMeaning: string;
  familyReason: string;
  learnMore: string;
};

type HeraldReport = {
  family_summary: string;
  themes: string[];
  virtues: string[];
  recommended_colors: HeraldRecommendation[];
  recommended_symbols: HeraldRecommendation[];
  recommended_charges: HeraldRecommendation[];
  shield_direction: HeraldRecommendation;
  crest_direction: HeraldRecommendation;
  motto_options: HeraldRecommendation[];
};

type StoredHeraldReport = HeraldReport & {
  created_at: string | null;
  family_record_id: string | null;
};

type AnalysisStep = {
  title: string;
  detail: string;
};

const analysisSteps: AnalysisStep[] = [
  {
    title: "Reviewing ancestral origins",
    detail:
      "Examining places, migrations, surnames, and the earliest known threads of your family story.",
  },
  {
    title: "Examining family values",
    detail:
      "Identifying the principles, convictions, and virtues that recur throughout the Family Record.",
  },
  {
    title: "Studying service and sacrifice",
    detail:
      "Considering military, civic, professional, religious, and community service across generations.",
  },
  {
    title: "Reviewing traditions",
    detail:
      "Looking for customs, gatherings, stories, rituals, and practices worthy of preservation.",
  },
  {
    title: "Comparing recurring symbols",
    detail:
      "Evaluating animals, landscapes, colors, objects, and other imagery already meaningful to the family.",
  },
  {
    title: "Consulting heraldic conventions",
    detail:
      "Translating the strongest themes into disciplined heraldic language without inventing historical claims.",
  },
  {
    title: "Preparing the Herald's Report",
    detail:
      "Bringing the findings together into recommendations for family symbols, a meaningful motto, and a crest direction.",
  },
];

const reportColumns = `
  family_record_id,
  created_at,
  family_summary,
  themes,
  virtues,
  recommended_colors,
  recommended_symbols,
  recommended_charges,
  shield_direction,
  crest_direction,
  motto_options
`;

function isReportCurrent(
  reportCreatedAt: string | null,
  recordUpdatedAt: string | null
): boolean {
  if (!reportCreatedAt || !recordUpdatedAt) {
    return false;
  }

  const reportTime = Date.parse(reportCreatedAt);
  const recordTime = Date.parse(recordUpdatedAt);

  return (
    Number.isFinite(reportTime) &&
    Number.isFinite(recordTime) &&
    reportTime >= recordTime
  );
}

export default function HeraldPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [report, setReport] = useState<HeraldReport | null>(
    null
  );

  const [recordId, setRecordId] = useState<string | null>(
    null
  );

  const [recordReady, setRecordReady] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [analysisStep, setAnalysisStep] = useState(0);
  const [analysisComplete, setAnalysisComplete] =
    useState(false);

  const ceremonyTimer = useRef<
    ReturnType<typeof setInterval> | null
  >(null);

  const analysisInFlightRef = useRef(false);

  useEffect(() => {
    let cancelled = false;

    async function initializeHerald() {
      const supabase = createClient();

      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (cancelled) return;

      if (authError || !user) {
        router.replace("/auth/sign-in");
        return;
      }

      // One authenticated account has one Family Record.
      const {
        data: familyRecord,
        error: recordError,
      } = await supabase
        .from("family_records")
        .select("id, completion_percent, updated_at")
        .eq("user_id", user.id)
        .maybeSingle();

      if (cancelled) return;

      if (recordError) {
        console.error(
          "Unable to load Family Record:",
          recordError
        );

        setErrorMessage(
          "We could not load your Family Record. Please try again."
        );
        setLoading(false);
        return;
      }

      if (!familyRecord) {
        setErrorMessage(
          "No Family Record was found. Begin the Founding Journey before visiting the Herald."
        );
        setLoading(false);
        return;
      }

      setRecordId(familyRecord.id);

      if (familyRecord.completion_percent !== 100) {
        setErrorMessage(
          "Your Family Record must be completed and reviewed before heraldic analysis can begin."
        );
        setLoading(false);
        return;
      }

      setRecordReady(true);

      // Only display reports associated with this
      // authenticated customer's Family Record.
      const { data: reports, error: reportError } =
        await supabase
          .from("herald_reports")
          .select(reportColumns)
          .eq("user_id", user.id)
          .eq("family_record_id", familyRecord.id)
          .order("created_at", {
            ascending: false,
          })
          .limit(1);

      if (cancelled) return;

      if (reportError) {
        console.error(
          "Unable to load Herald Report:",
          reportError
        );

        setErrorMessage(
          "Your previous Herald Report could not be loaded. You may try the analysis again."
        );
      } else {
        const existing = reports?.[0] as
          | StoredHeraldReport
          | undefined;

        // Never present an old report as the current
        // interpretation of an edited Family Record.
        if (
          existing &&
          existing.family_record_id === familyRecord.id &&
          isReportCurrent(
            existing.created_at,
            familyRecord.updated_at
          )
        ) {
          setReport(existing);
        }
      }

      setLoading(false);
    }

    void initializeHerald();

    return () => {
      cancelled = true;

      if (ceremonyTimer.current) {
        clearInterval(ceremonyTimer.current);
        ceremonyTimer.current = null;
      }
    };
  }, [router]);

  function beginCeremony() {
    setAnalysisStep(0);
    setAnalysisComplete(false);

    if (ceremonyTimer.current) {
      clearInterval(ceremonyTimer.current);
    }

    ceremonyTimer.current = setInterval(() => {
      setAnalysisStep((current) => {
        if (current >= analysisSteps.length - 1) {
          if (ceremonyTimer.current) {
            clearInterval(ceremonyTimer.current);
            ceremonyTimer.current = null;
          }

          setAnalysisComplete(true);
          return current;
        }

        return current + 1;
      });
    }, 1400);
  }

  async function waitForCeremony() {
    const minimumCeremonyTime =
      analysisSteps.length * 1400 + 600;

    await new Promise<void>((resolve) => {
      window.setTimeout(resolve, minimumCeremonyTime);
    });
  }

  async function beginAnalysis() {
    if (
      analysisInFlightRef.current ||
      !recordId ||
      !recordReady
    ) {
      return;
    }

    analysisInFlightRef.current = true;

    setAnalyzing(true);
    setErrorMessage("");

    beginCeremony();

    try {
      // The API identifies the Family Record from
      // the authenticated user, not a client-supplied ID.
      const [response] = await Promise.all([
        fetch("/api/herald/analyze", {
          method: "POST",
          cache: "no-store",
        }),
        waitForCeremony(),
      ]);

      let result: {
        report?: HeraldReport;
        reused?: boolean;
        error?: string;
      } = {};

      try {
        result = await response.json();
      } catch {
        throw new Error(
          "The Herald received an incomplete response. Please try again."
        );
      }

      if (!response.ok) {
        throw new Error(
          result.error ||
            "The Herald could not complete the analysis."
        );
      }

      if (!result.report) {
        throw new Error(
          "The Herald completed the review but returned no report."
        );
      }

      setAnalysisComplete(true);

      await new Promise<void>((resolve) => {
        window.setTimeout(resolve, 900);
      });

      setReport(result.report);
    } catch (error) {
      console.error("Herald analysis failed:", error);

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "The Herald could not complete the analysis."
      );
    } finally {
      if (ceremonyTimer.current) {
        clearInterval(ceremonyTimer.current);
        ceremonyTimer.current = null;
      }

      setAnalyzing(false);
      analysisInFlightRef.current = false;
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#11120f] px-6 py-20 text-[#f2e9da]">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#c8a86b]">
            Preparing the Herald&apos;s Chamber...
          </p>
        </div>
      </main>
    );
  }

  if (analyzing) {
    return (
      <HeraldChamber
        activeStep={analysisStep}
        analysisComplete={analysisComplete}
      />
    );
  }

  return (
    <main className="min-h-screen bg-[#141510] text-[#f2e9da]">
      <section className="mx-auto max-w-6xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[#c8a86b]">
            The Herald
          </p>

          <h1 className="font-display mt-6 text-5xl leading-[1.02] sm:text-6xl lg:text-7xl">
            Your family story now becomes symbolic language.
          </h1>

          <div className="mt-8 h-px w-24 bg-[#b89559]" />

          <p className="mt-8 max-w-3xl text-lg leading-8 text-[#c8bfb2]">
            The Herald considers what makes your family
            distinct and proposes symbols and words that
            can carry its story forward. Every
            recommendation must be traceable to something
            meaningful in the record you have created.
          </p>
        </div>

        {!recordReady && (
          <section className="mt-12 border border-[#574c3d] bg-[#1b1c17] p-8">
            <p
              role="alert"
              className="text-sm leading-7 text-[#e4b5a7]"
            >
              {errorMessage ||
                "Your Family Record is not ready for heraldic analysis."}
            </p>

            <button
              type="button"
              onClick={() => router.push("/begin")}
              className="mt-7 border border-[#8c7450] px-6 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#cfb486] transition hover:bg-white/[0.04]"
            >
              Return to Founding Journey
            </button>
          </section>
        )}

        {recordReady && !report && (
          <section className="mt-16 border border-[#574c3d] bg-[#1b1c17] p-8 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#c8a86b]">
              The Record Has Been Received
            </p>

            <h2 className="font-display mt-4 max-w-3xl text-4xl leading-tight">
              The Herald is prepared to examine your
              family&apos;s record.
            </h2>

            <p className="mt-5 max-w-3xl leading-8 text-[#bcb3a7]">
              Origins, values, service, traditions, symbols,
              achievements, and future legacy will be
              considered together before any heraldic
              recommendation is made.
            </p>

            <div className="mt-8 border-l border-[#6b593d] pl-6">
              <p className="text-sm italic leading-7 text-[#9f9689]">
                The purpose of this analysis is not to
                invent a history, but to interpret the
                history and identity your family has
                documented.
              </p>
            </div>

            {errorMessage && (
              <div
                role="alert"
                className="mt-8 border border-red-900/60 bg-red-950/30 px-5 py-4 text-sm text-red-200"
              >
                {errorMessage}
              </div>
            )}

            <button
              type="button"
              onClick={beginAnalysis}
              disabled={analyzing}
              className="mt-10 border border-[#a7723f] bg-[#7a4728] px-7 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-[#925a32] disabled:opacity-50"
            >
              Begin Heraldic Analysis
            </button>
          </section>
        )}

        {report && errorMessage && (
          <div
            role="alert"
            className="mt-10 border border-red-900/60 bg-red-950/30 px-5 py-4 text-sm text-red-200"
          >
            {errorMessage} Your previous report remains
            available below.
          </div>
        )}

        {recordReady && report && (
          <HeraldReportView
            report={report}
            onContinue={() => router.push("/builder")}
            onCheckAnalysis={beginAnalysis}
            onReturn={() => router.push("/begin/review")}
          />
        )}
      </section>
    </main>
  );
}

function HeraldChamber({
  activeStep,
  analysisComplete,
}: {
  activeStep: number;
  analysisComplete: boolean;
}) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0f100d] text-[#f2e9da]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-220px] h-[550px] w-[550px] -translate-x-1/2 rounded-full bg-[#7f6535]/10 blur-3xl" />

        <div className="absolute bottom-[-250px] left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-black/50 blur-3xl" />
      </div>

      <section className="relative mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 py-16 sm:px-10">
        <div className="mx-auto w-full max-w-3xl">
          <div className="text-center">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.42em] text-[#c8a86b]">
              The Herald&apos;s Chamber
            </p>

            <h1 className="font-display mt-6 text-4xl leading-tight sm:text-5xl">
              The Family Record has been sealed.
            </h1>

            <div className="mx-auto mt-7 h-px w-24 bg-[#8f7447]" />

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#a9a095]">
              The Herald will now consider the record as a
              whole before preparing any recommendation.
            </p>
          </div>

          <div className="mt-14 border-y border-[#3b362e] py-5">
            {analysisSteps.map((step, index) => {
              const completed =
                index < activeStep ||
                (analysisComplete &&
                  index <= activeStep);

              const active =
                index === activeStep &&
                !analysisComplete;

              return (
                <div
                  key={step.title}
                  className={`grid grid-cols-[34px_1fr] gap-4 border-b border-[#292722] py-5 transition-all duration-700 last:border-b-0 ${
                    active
                      ? "opacity-100"
                      : completed
                        ? "opacity-70"
                        : "opacity-25"
                  }`}
                >
                  <div className="pt-1">
                    {completed ? (
                      <span className="flex h-6 w-6 items-center justify-center border border-[#987b49] text-xs text-[#c8a86b]">
                        ✓
                      </span>
                    ) : active ? (
                      <span className="flex h-6 w-6 items-center justify-center">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-[#c8a86b]" />
                      </span>
                    ) : (
                      <span className="flex h-6 w-6 items-center justify-center border border-[#4c473e] text-[0.6rem] text-[#6f695f]">
                        {index + 1}
                      </span>
                    )}
                  </div>

                  <div>
                    <p
                      className={`font-display text-xl transition-colors duration-500 ${
                        active
                          ? "text-[#f0e4d1]"
                          : completed
                            ? "text-[#bfb4a4]"
                            : "text-[#706a61]"
                      }`}
                    >
                      {step.title}
                      {active && "..."}
                    </p>

                    <p
                      className={`mt-2 text-sm leading-6 transition-opacity duration-500 ${
                        active
                          ? "text-[#aaa094]"
                          : completed
                            ? "text-[#716a60]"
                            : "text-[#504c46]"
                      }`}
                    >
                      {step.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            {analysisComplete ? (
              <>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#c8a86b]">
                  Analysis Complete
                </p>

                <p className="font-display mt-4 text-3xl text-[#e8dbc7]">
                  The Herald&apos;s Report is ready.
                </p>
              </>
            ) : (
              <p className="text-xs uppercase tracking-[0.24em] text-[#756e64]">
                Please remain while the Herald examines
                the record.
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

type RecommendationValue =
  | HeraldRecommendation
  | string
  | null
  | undefined;

function normalizeRecommendation(
  value: RecommendationValue
): HeraldRecommendation | null {
  if (!value) return null;

  if (typeof value === "object") {
    return typeof value.recommendation === "string"
      ? {
          recommendation: value.recommendation,
          traditionalMeaning:
            value.traditionalMeaning || "",
          familyReason: value.familyReason || "",
          learnMore: value.learnMore || "",
        }
      : null;
  }

  // Older reports may store a recommendation
  // object as JSON text.
  const text = value.trim();

  if (!text) return null;

  if (text.startsWith("{")) {
    try {
      const parsed: unknown = JSON.parse(text);

      if (
        parsed &&
        typeof parsed === "object" &&
        "recommendation" in parsed
      ) {
        const item = parsed as Record<
          string,
          unknown
        >;

        if (
          typeof item.recommendation === "string"
        ) {
          return {
            recommendation: item.recommendation,
            traditionalMeaning:
              typeof item.traditionalMeaning ===
              "string"
                ? item.traditionalMeaning
                : "",
            familyReason:
              typeof item.familyReason === "string"
                ? item.familyReason
                : "",
            learnMore:
              typeof item.learnMore === "string"
                ? item.learnMore
                : "",
          };
        }
      }
    } catch {
      // Plain text is valid legacy content.
    }
  }

  return {
    recommendation: text,
    traditionalMeaning: "",
    familyReason: "",
    learnMore: "",
  };
}

function HeraldReportView({
  report,
  onContinue,
  onCheckAnalysis,
  onReturn,
}: {
  report: HeraldReport;
  onContinue: () => void;
  onCheckAnalysis: () => void;
  onReturn: () => void;
}) {
  const [
    showHeraldicDetails,
    setShowHeraldicDetails,
  ] = useState(false);

  return (
    <div className="mt-12 space-y-8">
      <section className="border border-[#6b593d] bg-[#f5efe4] px-6 py-9 text-[#2d2822] shadow-2xl sm:px-10 sm:py-12">
        <p className="text-center text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-[#8b6a37]">
          The Family Regiment
        </p>

        <h2 className="font-display mt-4 text-center text-3xl sm:text-4xl">
          The Herald&apos;s Report
        </h2>

        <p className="mt-3 text-center text-xs uppercase tracking-[0.2em] text-[#8a7b6c]">
          A reflection of your Family Record
        </p>

        <div className="mx-auto mt-7 h-px w-24 bg-[#b89b6a]" />

        <p className="mt-8 whitespace-pre-line text-base leading-8 text-[#453b32] sm:text-lg">
          {report.family_summary}
        </p>

        <p className="mt-7 border-t border-[#d8c9b3] pt-5 text-sm leading-7 text-[#695b4c]">
          This is an interpretation of the history your
          family provided, not a claim of inherited arms,
          noble rank, or a shared identity with everyone
          who bears the same surname.
        </p>
      </section>

      <div className="grid gap-5 md:grid-cols-2">
        <SimpleList
          title="What defines your family"
          items={report.themes}
        />

        <SimpleList
          title="Values worth carrying forward"
          items={report.virtues}
        />
      </div>

      <section className="space-y-5">
        <SectionHeading
          title="Symbols with a personal connection"
          description="These suggestions matter because of the experiences and principles recorded by your family—not simply because they look impressive."
        />

        <div className="grid gap-5 md:grid-cols-2">
          <MeaningfulList
            title="Symbols"
            items={report.recommended_symbols}
          />

          <MeaningfulList
            title="Principal heraldic imagery"
            items={report.recommended_charges}
          />
        </div>
      </section>

      <section className="space-y-5">
        <SectionHeading
          title="Words your family can live by"
          description="Possible mottos grounded in the values and lessons of your Family Record. These are starting points, not decisions made on your behalf."
        />

        <MeaningfulList
          title="Motto ideas"
          items={report.motto_options}
        />
      </section>

      <section className="space-y-5">
        <SectionHeading
          title="How the story could become a crest"
          description="Two complementary design directions to consider as you customize your family's single heraldic identity."
        />

        <div className="grid gap-5 md:grid-cols-2">
          <DirectionCard
            eyebrow="Shield concept"
            recommendation={report.shield_direction}
          />

          <DirectionCard
            eyebrow="Crest concept"
            recommendation={report.crest_direction}
          />
        </div>
      </section>

      <section className="border border-[#574c3d] bg-[#1b1c17] p-6 sm:p-8">
        <h3 className="font-display text-xl text-[#f1e7cf]">
          One Family Record. One Heraldic Identity.
        </h3>

        <p className="mt-3 text-sm leading-7 text-[#c8bfb2]">
          Your Family Record establishes the identity,
          values, traditions, and symbolism of your House.
          Its heraldic recommendations provide a common
          foundation for the family crest used throughout
          The Family Regiment collection.
        </p>

        <p className="mt-3 text-sm leading-7 text-[#c8bfb2]">
          The Regiment Jacket and Heritage Blazer share
          this same family heraldry. Their crest sizes and
          garment placements differ, but they do not
          represent separate family identities.
        </p>
      </section>

      <section className="border border-[#574c3d] bg-[#1b1c17] p-6 sm:p-8">
        <button
          type="button"
          onClick={() =>
            setShowHeraldicDetails(
              (previous) => !previous
            )
          }
          aria-expanded={showHeraldicDetails}
          className="flex w-full items-center justify-between gap-4 text-left"
        >
          <span>
            <span className="block font-display text-xl text-[#f1e7cf]">
              Heraldic reference notes
            </span>

            <span className="mt-2 block text-sm text-[#a9a095]">
              Optional details about colors,
              traditional associations, and symbolism.
            </span>
          </span>

          <span
            className="text-xl text-[#c8a86b]"
            aria-hidden="true"
          >
            {showHeraldicDetails ? "−" : "+"}
          </span>
        </button>

        {showHeraldicDetails && (
          <div className="mt-6 grid gap-4 border-t border-[#514735] pt-6 md:grid-cols-2">
            {(report.recommended_colors || []).map(
              (entry, index) => {
                const item =
                  normalizeRecommendation(entry);

                return item ? (
                  <MeaningCard
                    key={index}
                    item={item}
                    showContext
                  />
                ) : null;
              }
            )}
          </div>
        )}
      </section>

      <div className="flex flex-col gap-4 border-t border-[#574c3d] pt-8 sm:flex-row sm:flex-wrap">
        <button
          type="button"
          onClick={onReturn}
          className="border border-[#6c6255] px-6 py-4 text-xs font-semibold uppercase tracking-[0.13em] text-[#d5cbbb] transition hover:bg-white/[0.04]"
        >
          Return to Family Record
        </button>

        <button
          type="button"
          onClick={onCheckAnalysis}
          className="border border-[#8c7450] px-6 py-4 text-xs font-semibold uppercase tracking-[0.13em] text-[#cfb486] transition hover:bg-white/[0.04]"
        >
          Check for Updated Analysis
        </button>

        <button
          type="button"
          onClick={onContinue}
          className="border border-[#a7723f] bg-[#7a4728] px-7 py-4 text-xs font-semibold uppercase tracking-[0.13em] text-white transition hover:bg-[#925a32]"
        >
          Continue to Crest Builder →
        </button>
      </div>
    </div>
  );
}

function SectionHeading({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div>
      <h2 className="font-display text-2xl text-[#f1e7cf] sm:text-3xl">
        {title}
      </h2>

      <p className="mt-2 max-w-3xl text-sm leading-7 text-[#b8afa2]">
        {description}
      </p>
    </div>
  );
}

function SimpleList({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <section className="border border-[#574c3d] bg-[#1b1c17] p-6">
      <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c8a86b]">
        {title}
      </h3>

      <ul className="mt-5 space-y-3">
        {(items || []).map((item, index) => (
          <li
            key={index}
            className="border-l-2 border-[#8f7447] py-1 pl-4 text-sm leading-6 text-[#e2d7c6]"
          >
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

function MeaningCard({
  item,
  showContext = false,
}: {
  item: HeraldRecommendation;
  showContext?: boolean;
}) {
  return (
    <article className="border border-[#655845] bg-[#20211c] p-5">
      <h4 className="font-display text-lg leading-7 text-[#f1e7cf]">
        {item.recommendation}
      </h4>

      {item.familyReason && (
        <p className="mt-3 text-sm leading-7 text-[#ddd2c2]">
          {item.familyReason}
        </p>
      )}

      {showContext && item.traditionalMeaning && (
        <p className="mt-4 border-t border-[#514735] pt-4 text-xs leading-6 text-[#b8afa2]">
          <span className="font-semibold text-[#c8a86b]">
            Traditional association:{" "}
          </span>
          {item.traditionalMeaning}
        </p>
      )}

      {showContext && item.learnMore && (
        <p className="mt-3 text-xs leading-6 text-[#a9a095]">
          {item.learnMore}
        </p>
      )}
    </article>
  );
}

function MeaningfulList({
  title,
  items,
}: {
  title: string;
  items: HeraldRecommendation[];
}) {
  const normalized = (items || [])
    .map(normalizeRecommendation)
    .filter(
      (item): item is HeraldRecommendation =>
        item !== null
    );

  return (
    <section className="border border-[#574c3d] bg-[#1b1c17] p-6">
      <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c8a86b]">
        {title}
      </h3>

      <div className="mt-5 grid gap-4">
        {normalized.length ? (
          normalized.map((item, index) => (
            <MeaningCard
              key={index}
              item={item}
            />
          ))
        ) : (
          <p className="text-sm text-[#a9a095]">
            No suggestions available yet.
          </p>
        )}
      </div>
    </section>
  );
}

function DirectionCard({
  eyebrow,
  recommendation,
}: {
  eyebrow: string;
  recommendation: RecommendationValue;
}) {
  const item =
    normalizeRecommendation(recommendation);

  return (
    <section className="min-w-0 border border-[#574c3d] bg-[#1b1c17] p-6">
      <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c8a86b]">
        {eyebrow}
      </h3>

      <p className="mt-4 break-words font-display text-lg leading-7 text-[#eee3d2] sm:text-xl">
        {item?.recommendation ||
          "Direction not yet available."}
      </p>

      {item?.familyReason && (
        <div className="mt-5 border-l-2 border-[#8f7447] pl-4">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-[#c8a86b]">
            Why it fits your family
          </p>

          <p className="mt-2 text-sm leading-7 text-[#d5cbbb]">
            {item.familyReason}
          </p>
        </div>
      )}
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type HeraldReport = {
  family_summary: string;
  themes: string[];
  virtues: string[];

  recommended_colors: string[];
  recommended_symbols: string[];
  recommended_charges: string[];

  shield_direction: string;
  crest_direction: string;

  motto_options: string[];
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
      "Bringing the findings together into recommendations for tinctures, charges, crest direction, and motto.",
  },
];

export default function HeraldPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [report, setReport] = useState<HeraldReport | null>(null);

  const [errorMessage, setErrorMessage] = useState("");
  const [analysisStep, setAnalysisStep] = useState(0);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  const ceremonyTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function initializeHerald() {
      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (cancelled) return;

      if (!user) {
        router.replace("/auth/sign-in");
        return;
      }

      const { data, error } = await supabase
        .from("herald_reports")
        .select(
          `
          family_summary,
          themes,
          virtues,
          recommended_colors,
          recommended_symbols,
          recommended_charges,
          shield_direction,
          crest_direction,
          motto_options
        `
        )
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (cancelled) return;

      if (error) {
        console.error("Unable to load Herald Report:", error);
      }

      if (data) {
        setReport(data as HeraldReport);
      }

      setLoading(false);
    }

    initializeHerald();

    return () => {
      cancelled = true;

      if (ceremonyTimer.current) {
        clearInterval(ceremonyTimer.current);
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

    await new Promise((resolve) =>
      window.setTimeout(resolve, minimumCeremonyTime)
    );
  }

  async function beginAnalysis() {
    setAnalyzing(true);
    setErrorMessage("");
    setReport(null);

    beginCeremony();

    try {
      const [response] = await Promise.all([
        fetch("/api/herald/analyze", {
          method: "POST",
        }),
        waitForCeremony(),
      ]);

      let result: {
        report?: HeraldReport;
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

      await new Promise((resolve) =>
        window.setTimeout(resolve, 900)
      );

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
      }

      setAnalyzing(false);
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
            The Herald examines your Family Record and develops a
            disciplined starting point for your family&apos;s heraldry.
            Every recommendation must be traceable to something meaningful
            in the record you have created.
          </p>
        </div>

        {!report && (
          <section className="mt-16 border border-[#574c3d] bg-[#1b1c17] p-8 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#c8a86b]">
              The Record Has Been Received
            </p>

            <h2 className="font-display mt-4 max-w-3xl text-4xl leading-tight">
              The Herald is prepared to examine your family&apos;s record.
            </h2>

            <p className="mt-5 max-w-3xl leading-8 text-[#bcb3a7]">
              Origins, values, service, traditions, symbols,
              achievements, and future legacy will be considered together
              before any heraldic recommendation is made.
            </p>

            <div className="mt-8 border-l border-[#6b593d] pl-6">
              <p className="text-sm italic leading-7 text-[#9f9689]">
                The purpose of this analysis is not to invent a history,
                but to interpret the history and identity your family has
                documented.
              </p>
            </div>

            {errorMessage && (
              <div className="mt-8 border border-red-900/60 bg-red-950/30 px-5 py-4 text-sm text-red-200">
                {errorMessage}
              </div>
            )}

            <button
              type="button"
              onClick={beginAnalysis}
              className="mt-10 border border-[#a7723f] bg-[#7a4728] px-7 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-[#925a32]"
            >
              Begin Heraldic Analysis
            </button>
          </section>
        )}

        {report && (
          <HeraldReportView
            report={report}
            onContinue={() => router.push("/studio")}
            onRegenerate={beginAnalysis}
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
              The Herald will now consider the record as a whole before
              preparing any recommendation.
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

              const waiting = index > activeStep;

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
                Please remain while the Herald examines the record.
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

function HeraldReportView({
  report,
  onContinue,
  onRegenerate,
}: {
  report: HeraldReport;
  onContinue: () => void;
  onRegenerate: () => void;
}) {
  return (
    <div className="mt-16 space-y-10">
      <section className="border border-[#6b593d] bg-[#f5efe4] px-10 py-12 text-[#2d2822] shadow-2xl">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.45em] text-[#8b6a37]">
          The Family Regiment
        </p>

        <h1 className="font-display mt-5 text-center text-5xl">
          The Herald&apos;s Report
        </h1>

        <p className="mt-3 text-center text-sm uppercase tracking-[0.28em] text-[#8a7b6c]">
          Prepared From Your Family Record
        </p>

        <div className="mx-auto mt-8 h-px w-32 bg-[#b89b6a]" />

        <div className="mt-10">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#8b6a37]">
            The Herald&apos;s Findings
          </p>

          <p className="mt-6 whitespace-pre-wrap text-lg leading-9 text-[#453b32]">
            {report.family_summary}
          </p>
        </div>

        <div className="mt-12 border-l-4 border-[#b89b6a] pl-6">
          <p className="text-base italic leading-8 text-[#5b5147]">
            Every recommendation contained within this report is derived
            from the information provided in your Family Record. The
            Herald does not invent family history, but interprets
            recurring themes and traditions into meaningful heraldic
            recommendations.
          </p>
        </div>
      </section>

      <div className="grid gap-8 lg:grid-cols-2">
        <Recommendation
          title="Core Themes"
          items={report.themes}
        />

        <Recommendation
          title="Virtues"
          items={report.virtues}
        />

        <Recommendation
          title="Recommended Tinctures"
          items={report.recommended_colors}
        />

        <Recommendation
          title="Recommended Symbols"
          items={report.recommended_symbols}
        />

        <Recommendation
          title="Heraldic Charges"
          items={report.recommended_charges}
        />

        <Recommendation
          title="Motto Directions"
          items={report.motto_options}
        />
      </div>

      <section className="grid gap-8 lg:grid-cols-2">
        <DirectionCard
          eyebrow="Shield Direction"
          text={report.shield_direction}
        />

        <DirectionCard
          eyebrow="Crest Direction"
          text={report.crest_direction}
        />
      </section>

      <div className="flex flex-col gap-4 border-t border-[#574c3d] pt-10 sm:flex-row sm:flex-wrap">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="border border-[#6c6255] px-6 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-[#d5cbbb] transition hover:bg-white/[0.04]"
        >
          ← Return to Family Record
        </button>

        <button
          type="button"
          onClick={onRegenerate}
          className="border border-[#8c7450] px-6 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-[#cfb486] transition hover:bg-white/[0.04]"
        >
          Run Analysis Again
        </button>

        <button
          type="button"
          onClick={onContinue}
          className="border border-[#a7723f] bg-[#7a4728] px-7 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-[#925a32]"
        >
          Continue to Design Studio →
        </button>
      </div>
    </div>
  );
}

function Recommendation({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <section className="border border-[#574c3d] bg-[#1b1c17] p-7">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#c8a86b]">
        {title}
      </p>

      <div className="mt-5 flex flex-wrap gap-3">
        {items?.length ? (
          items.map((item) => (
            <span
              key={item}
              className="border border-[#655845] bg-[#20211c] px-4 py-2 text-sm leading-6 text-[#ddd2c2]"
            >
              {item}
            </span>
          ))
        ) : (
          <p className="text-[#958c80]">
            No recommendation yet.
          </p>
        )}
      </div>
    </section>
  );
}

function DirectionCard({
  eyebrow,
  text,
}: {
  eyebrow: string;
  text: string;
}) {
  return (
    <section className="border border-[#574c3d] bg-[#1b1c17] p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#c8a86b]">
        {eyebrow}
      </p>

      <p className="font-display mt-5 text-3xl leading-tight text-[#eee3d2]">
        {text}
      </p>
    </section>
  );
}
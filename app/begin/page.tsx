
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

type JourneyState = {
  loading: boolean;
  signedIn: boolean;
  hasProgress: boolean;
  completed: boolean;
  destination: string;
  error: string | null;
};

type FamilyRecordProgress = {
  origins: unknown;
  values_record: unknown;
  service: unknown;
  traditions: unknown;
  symbols: unknown;
  achievements: unknown;
  future_legacy: unknown;
  current_article: string | null;
  completion_percent: number | null;
};

const chapterPaths = [
  "origins", "values", "service", "traditions",
  "symbols", "achievements", "future", "review",
] as const;

const initialJourney: JourneyState = {
  loading: true,
  signedIn: false,
  hasProgress: false,
  completed: false,
  destination: "/begin/origins",
  error: null,
};

function hasAnswers(value: unknown): boolean {
  return Boolean(
    value &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    Object.values(value).some(
      (answer) =>
        typeof answer === "string" &&
        answer.trim().length > 0,
    ),
  );
}

function getResumeDestination(
  record: FamilyRecordProgress,
): string {
  if (Number(record.completion_percent ?? 0) >= 100) {
    return "/begin/review";
  }

  const savedArticle = chapterPaths.find(
    (chapter) => chapter === record.current_article,
  );

  if (savedArticle) return `/begin/${savedArticle}`;

  const latestAnswered = [
    { chapter: "future", answers: record.future_legacy },
    { chapter: "achievements", answers: record.achievements },
    { chapter: "symbols", answers: record.symbols },
    { chapter: "traditions", answers: record.traditions },
    { chapter: "service", answers: record.service },
    { chapter: "values", answers: record.values_record },
    { chapter: "origins", answers: record.origins },
  ].find(({ answers }) => hasAnswers(answers));

  return latestAnswered
    ? `/begin/${latestAnswered.chapter}`
    : "/begin/origins";
}

export default function BeginPage() {
  const [journey, setJourney] =
    useState<JourneyState>(initialJourney);

  useEffect(() => {
    let cancelled = false;

    async function loadJourney() {
      try {
        const supabase = createClient();

        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();

        if (cancelled) return;

        if (authError || !user) {
          setJourney({
            ...initialJourney,
            loading: false,
            destination: "/auth/sign-in",
            error: authError
              ? "We could not verify your session. Please sign in again."
              : null,
          });
          return;
        }

        const { data, error } = await supabase
          .from("family_records")
          .select(`
            origins,
            values_record,
            service,
            traditions,
            symbols,
            achievements,
            future_legacy,
            current_article,
            completion_percent
          `)
          .eq("user_id", user.id)
          .maybeSingle();

        if (cancelled) return;

        if (error) {
          console.error(
            "Unable to load Family Record:",
            error,
          );

          setJourney({
            ...initialJourney,
            loading: false,
            signedIn: true,
            error:
              "We could not load your Family Record. Please refresh and try again.",
          });
          return;
        }

        const record =
          data as FamilyRecordProgress | null;

        if (!record) {
          setJourney({
            loading: false,
            signedIn: true,
            hasProgress: false,
            completed: false,
            destination: "/begin/origins",
            error: null,
          });
          return;
        }

        const hasProgress =
          [
            record.origins,
            record.values_record,
            record.service,
            record.traditions,
            record.symbols,
            record.achievements,
            record.future_legacy,
          ].some(hasAnswers) ||
          Number(record.completion_percent ?? 0) > 0;

        setJourney({
          loading: false,
          signedIn: true,
          hasProgress,
          completed:
            Number(record.completion_percent ?? 0) >= 100,
          destination: getResumeDestination(record),
          error: null,
        });
      } catch (error) {
        if (cancelled) return;

        console.error(
          "Unexpected Family Record error:",
          error,
        );

        setJourney({
          ...initialJourney,
          loading: false,
          signedIn: true,
          error:
            "Something went wrong while opening your Family Record. Please refresh and try again.",
        });
      }
    }

    void loadJourney();

    return () => {
      cancelled = true;
    };
  }, []);

  const buttonText = journey.loading
    ? "Loading Your Family Record..."
    : journey.error
      ? "Family Record Unavailable"
      : !journey.signedIn
        ? "Sign In to Begin"
        : journey.completed
          ? "View Your Family Record"
          : journey.hasProgress
            ? "Continue Your Family Record"
            : "Begin Your Family Record";

  return (
    <main className="min-h-screen bg-[#171914] px-6 py-20 text-[#F1E7CF]">
      <div className="mx-auto flex min-h-[75vh] max-w-4xl flex-col items-center justify-center text-center">
        <p className="mb-8 text-xs font-semibold uppercase tracking-[0.3em] text-[#D4AF6A]">
          The Family Regiment · Your Founding Journey
        </p>

        <h1 className="font-serif text-5xl leading-tight md:text-7xl">
          Every Family
          <br />
          Has a Story.
        </h1>

        <p className="mt-8 max-w-xl text-lg leading-relaxed text-[#C9C1AE]">
          Yours is shaped by the people who came before
          you, the values you carry, and the legacy
          you hope to leave behind.
        </p>

        <p className="mt-6 max-w-xl text-base leading-relaxed text-[#C9C1AE]">
          {journey.completed
            ? "Your Family Record is ready to revisit. Explore the history, values, and legacy you have documented."
            : journey.hasProgress
              ? "Your family's story is waiting. Pick up where you left off and continue building a lasting record."
              : "Through eight thoughtful chapters, document the identity, heritage, and legacy of your family."}
        </p>

        <div className="mt-12 w-full max-w-2xl border border-[#D4AF6A]/30 bg-[#22251E] p-7 text-left sm:p-9">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D4AF6A]">
            Your House
          </p>

          <h2 className="mt-3 font-serif text-2xl text-[#F1E7CF]">
            One Family Heritage. Your Story.
          </h2>

          <p className="mt-3 text-sm leading-7 text-[#C9C1AE]">
            Record your family origins, values,
            traditions, and legacy. You may identify
            the place your family represents and
            acknowledge other family branches without
            creating separate records or identifying
            relatives.
          </p>
        </div>

        {journey.error && (
          <p
            role="alert"
            className="mt-8 max-w-lg text-sm text-red-300"
          >
            {journey.error}
          </p>
        )}

        <Link
          href={journey.destination}
          aria-disabled={
            journey.loading || !!journey.error
          }
          tabIndex={
            journey.loading || journey.error ? -1 : 0
          }
          className={`mt-12 inline-flex min-h-14 items-center justify-center bg-[#D4AF6A] px-10 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#171914] transition-colors hover:bg-[#E6C78D] ${
            journey.loading || journey.error
              ? "pointer-events-none opacity-60"
              : ""
          }`}
        >
          {buttonText}
        </Link>

        <p className="mt-6 text-sm text-[#A69D88]">
          {journey.hasProgress
            ? "Your progress is linked to your account."
            : "Eight chapters · Complete at your own pace"}
        </p>

        <Link
          href="/"
          className="mt-12 text-xs uppercase tracking-[0.16em] text-[#D4AF6A] underline underline-offset-8"
        >
          Return to The Family Regiment
        </Link>
      </div>
    </main>
  );
}

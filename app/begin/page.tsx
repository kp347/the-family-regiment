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

const chapterPaths = [
  "origins", "values", "service", "traditions", "symbols",
  "achievements", "future", "review",
] as const;

function hasAnswers(value: unknown): boolean {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  return Object.values(value).some(
    (answer) => typeof answer === "string" && answer.trim().length > 0
  );
}

export default function BeginPage() {
  const [journey, setJourney] = useState<JourneyState>({
    loading: true,
    signedIn: false,
    hasProgress: false,
    completed: false,
    destination: "/begin/origins",
    error: null,
  });

  useEffect(() => {
    let cancelled = false;
    async function loadJourney() {
      const supabase = createClient();
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (cancelled) return;
      if (authError || !user) {
        setJourney({
          loading: false, signedIn: false, hasProgress: false,
          completed: false, destination: "/auth/sign-in",
          error: authError ? "We could not verify your session. Please sign in again." : null,
        });
        return;
      }
      const { data, error } = await supabase
        .from("family_records")
        .select("origins, values_record, current_article, completion_percent")
        .eq("user_id", user.id)
        .maybeSingle();
      if (cancelled) return;
      if (error) {
        console.error("Unable to load Family Record:", error);
        setJourney({
          loading: false, signedIn: true, hasProgress: false,
          completed: false, destination: "/begin/origins",
          error: "We could not load your Family Record. Please refresh and try again.",
        });
        return;
      }
      const savedArticle = data?.current_article;
      const validArticle = chapterPaths.find((chapter) => chapter === savedArticle);
      const hasProgress =
        hasAnswers(data?.origins) ||
        hasAnswers(data?.values_record) ||
        (validArticle !== undefined && validArticle !== "origins") ||
        Number(data?.completion_percent ?? 0) > 0;
      const completed = Number(data?.completion_percent ?? 0) >= 100;
      setJourney({
        loading: false,
        signedIn: true,
        hasProgress,
        completed,
        destination: completed
          ? "/begin/review"
          : validArticle && hasProgress
            ? `/begin/${validArticle}`
            : "/begin/origins",
        error: null,
      });
    }
    void loadJourney();
    return () => { cancelled = true; };
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
      <div className="mx-auto flex min-h-[75vh] max-w-3xl flex-col items-center justify-center text-center">
        <p className="mb-8 text-xs font-semibold uppercase tracking-[0.3em] text-[#D4AF6A]">
          The Family Regiment · Your Founding Journey
        </p>
        <h1 className="font-serif text-5xl leading-tight md:text-7xl">
          Every Family<br />Has a Story.
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-[#C9C1AE]">
          Yours is shaped by the people who came before you,
          the values you carry, and the legacy you hope to leave behind.
        </p>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-[#C9C1AE]">
          {journey.completed
            ? "Your Family Record is ready to revisit. Explore the story, values, and legacy of your House."
            : journey.hasProgress
              ? "Your family's story is waiting. Pick up where you left off and continue building a lasting record of your House."
              : "Through eight thoughtful chapters, discover what defines your House and begin creating a lasting record of your family's identity."}
        </p>
        {journey.error && <p role="alert" className="mt-8 max-w-lg text-sm text-red-300">{journey.error}</p>}
        <Link
          href={journey.destination}
          aria-disabled={journey.loading || !!journey.error}
          tabIndex={journey.loading || journey.error ? -1 : 0}
          className={`mt-12 inline-flex min-h-14 items-center justify-center bg-[#D4AF6A] px-10 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#171914] transition-colors hover:bg-[#E6C78D] ${journey.loading || journey.error ? "pointer-events-none opacity-60" : ""}`}
        >
          {buttonText}
        </Link>
        <p className="mt-6 text-sm text-[#A69D88]">
          {journey.hasProgress ? "Your progress is linked to your account" : "Eight chapters · Complete at your own pace"}
        </p>
        <Link href="/" className="mt-12 text-xs uppercase tracking-[0.16em] text-[#D4AF6A] underline underline-offset-8">
          Return to The Family Regiment
        </Link>
      </div>
    </main>
  );
}

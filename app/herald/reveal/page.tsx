"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import HeraldReport from "@/components/herald/HeraldReport";

interface SavedRecommendation {
  recommendation: string;
  traditionalMeaning: string;
  familyReason: string;
  learnMore: string;
}

interface SavedHeraldReport {
  family_summary: string;

  recommended_colors: SavedRecommendation[];

  recommended_symbols: SavedRecommendation[];

  recommended_charges: SavedRecommendation[];

  shield_direction: SavedRecommendation;

  crest_direction: SavedRecommendation;

  motto_options: SavedRecommendation[];
}

interface ReportResponse {
  report?: SavedHeraldReport;
  error?: string;
}

interface DisplayRecommendation {
  id: string;
  name: string;
  category: string;
  score: number;
  summary: string;
  reasons: string[];
}

function buildDisplayRecommendations(
  report: SavedHeraldReport,
): DisplayRecommendation[] {
  const recommendations: DisplayRecommendation[] = [];

  report.recommended_colors.forEach((item, index) => {
    recommendations.push({
      id: `color-${index}`,
      name: item.recommendation,
      category: "Tincture",
      score: 5,
      summary: item.traditionalMeaning,
      reasons: [
        item.familyReason,
        item.learnMore,
      ].filter(Boolean),
    });
  });

  report.recommended_charges.forEach((item, index) => {
    recommendations.push({
      id: `charge-${index}`,
      name: item.recommendation,
      category: "Charge",
      score: 5,
      summary: item.traditionalMeaning,
      reasons: [
        item.familyReason,
        item.learnMore,
      ].filter(Boolean),
    });
  });

  report.recommended_symbols.forEach((item, index) => {
    recommendations.push({
      id: `symbol-${index}`,
      name: item.recommendation,
      category: "Symbol",
      score: 4,
      summary: item.traditionalMeaning,
      reasons: [
        item.familyReason,
        item.learnMore,
      ].filter(Boolean),
    });
  });

  recommendations.push({
    id: "shield-direction",
    name: report.shield_direction.recommendation,
    category: "Shield",
    score: 5,
    summary: report.shield_direction.traditionalMeaning,
    reasons: [
      report.shield_direction.familyReason,
      report.shield_direction.learnMore,
    ].filter(Boolean),
  });

  recommendations.push({
    id: "crest-direction",
    name: report.crest_direction.recommendation,
    category: "Crest",
    score: 5,
    summary: report.crest_direction.traditionalMeaning,
    reasons: [
      report.crest_direction.familyReason,
      report.crest_direction.learnMore,
    ].filter(Boolean),
  });

  report.motto_options.forEach((item, index) => {
    recommendations.push({
      id: `motto-${index}`,
      name: item.recommendation,
      category: "Motto",
      score: 4,
      summary: item.traditionalMeaning,
      reasons: [
        item.familyReason,
        item.learnMore,
      ].filter(Boolean),
    });
  });

  return recommendations;
}

export default function HeraldRevealPage() {
  const [report, setReport] =
    useState<SavedHeraldReport | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    async function loadReport() {
      try {
        const response = await fetch(
          "/api/herald/report",
          {
            method: "GET",
            cache: "no-store",
          },
        );

        const data =
          (await response.json()) as ReportResponse;

        if (!response.ok) {
          setError(
            data.error ||
              "Unable to load your Herald Report.",
          );

          return;
        }

        if (!data.report) {
          setError(
            "No Herald Report has been created yet.",
          );

          return;
        }

        setReport(data.report);
      } catch (loadError) {
        console.error(
          "Unable to load Herald Report:",
          loadError,
        );

        setError(
          "The Herald Report could not be loaded.",
        );
      } finally {
        setLoading(false);
      }
    }

    void loadReport();
  }, []);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#171815] px-6 text-[#F2EBDD]">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.45em] text-[#B08D57]">
            The Family Regiment
          </p>

          <h1 className="mt-6 font-serif text-4xl">
            Preparing Your Herald Report
          </h1>
        </div>
      </main>
    );
  }

  if (error || !report) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#171815] px-6 text-[#F2EBDD]">
        <div className="max-w-xl text-center">
          <p className="text-xs uppercase tracking-[0.45em] text-[#B08D57]">
            Herald Chamber
          </p>

          <h1 className="mt-6 font-serif text-4xl">
            Report Unavailable
          </h1>

          <p className="mt-6 leading-8 text-[#BEB7AA]">
            {error ||
              "No Herald Report is currently available."}
          </p>

          <Link
            href="/herald"
            className="mt-10 inline-block border border-[#C8A969] bg-[#C8A969] px-8 py-4 text-xs font-bold uppercase tracking-[0.25em] text-[#181914] transition hover:bg-[#DFC07D]"
          >
            Return to Herald Chamber
          </Link>
        </div>
      </main>
    );
  }

  const recommendations =
    buildDisplayRecommendations(report);

  return (
    <main className="min-h-screen bg-[#171815] text-[#F2EBDD]">
      <HeraldReport
        familyName="Family Heraldic Record"
        summary={report.family_summary}
        recommendations={recommendations}
      />
    </main>
  );
}
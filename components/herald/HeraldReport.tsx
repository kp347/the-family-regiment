"use client";

import IdentitySummary from "./IdentitySummary";
import RecommendationCard from "./RecommendationCard";
import ManufacturingCard from "./ManufacturingCard";
import ReportActions from "./ReportActions";

interface Recommendation {
  id: string;
  name: string;
  category: string;
  score: number;
  summary: string;
  reasons: string[];
}

interface HeraldReportProps {
  familyName: string;

  summary: string;

  recommendations: Recommendation[];
}

export default function HeraldReport({
  familyName,
  summary,
  recommendations,
}: HeraldReportProps) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-12 text-center">
        <p className="text-sm uppercase tracking-[0.35em] text-stone-500">
          The Family Regiment
        </p>

        <h1 className="mt-4 text-5xl font-serif">
          Herald Report
        </h1>

        <p className="mt-3 text-stone-600">
          Official Heraldic Interpretation
        </p>
      </div>

      <IdentitySummary
        familyName={familyName}
        summary={summary}
      />

      <div className="mt-12">
        <h2 className="mb-6 text-2xl font-semibold">
          Heraldic Recommendations
        </h2>

        <div className="grid gap-6 lg:grid-cols-2">
          {recommendations.map(
            (recommendation) => (
              <RecommendationCard
                key={recommendation.id}
                recommendation={
                  recommendation
                }
              />
            ),
          )}
        </div>
      </div>

      <div className="mt-12">
        <ManufacturingCard />
      </div>

      <div className="mt-12">
        <ReportActions />
      </div>
    </section>
  );
}
"use client";

import type { HeraldDesign } from "@/lib/herald/design";
import { validateProduction } from "@/lib/herald/validator";

type ProductionStatusProps = {
  design: HeraldDesign;
};

export default function ProductionStatus({
  design,
}: ProductionStatusProps) {
  const report = validateProduction(design);

  return (
    <section className="rounded-2xl border border-white/10 bg-[#18191A] p-6 text-[#F6F2EA] shadow-sm">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[#B08D57]">
            Production Status
          </p>

          <h2 className="mt-2 font-serif text-3xl">
            Manufacturing Review
          </h2>
        </div>

        <div
          className={`w-fit rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] ${
            report.productionReady
              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
              : "border-amber-500/30 bg-amber-500/10 text-amber-300"
          }`}
        >
          {report.productionReady
            ? "Production Ready"
            : "Needs Review"}
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <MetricCard
          title="Complexity"
          value={report.complexity.rating}
        />

        <MetricCard
          title="Complexity Score"
          value={report.complexity.score.toString()}
        />

        <MetricCard
          title="Estimated Stitches"
          value={report.stitches.estimatedStitches.toLocaleString()}
        />

        <MetricCard
          title="Thread Colors"
          value={report.threads.threadColors.toString()}
        />

        <MetricCard
          title="Recommended Patch"
          value={`${report.stitches.recommendedPatchSize}"`}
        />

        <MetricCard
          title="Density"
          value={report.stitches.density}
        />
      </div>

      {report.warnings.length > 0 && (
        <div className="mt-8 rounded-xl border border-amber-500/20 bg-amber-500/[0.06] p-5">
          <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-300">
            Production Warnings
          </h3>

          <ul className="mt-4 space-y-2 text-sm leading-6 text-[#D8D3CA]">
            {report.warnings.map((warning) => (
              <li key={warning} className="flex gap-3">
                <span className="text-amber-300">•</span>
                <span>{warning}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {report.recommendations.length > 0 && (
        <div className="mt-6 rounded-xl border border-[#B08D57]/20 bg-[#B08D57]/[0.05] p-5">
          <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-[#BDA16F]">
            Production Recommendations
          </h3>

          <ul className="mt-4 space-y-2 text-sm leading-6 text-[#D8D3CA]">
            {report.recommendations.map((recommendation) => (
              <li key={recommendation} className="flex gap-3">
                <span className="text-[#B08D57]">•</span>
                <span>{recommendation}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="mt-6 text-[10px] uppercase tracking-[0.25em] text-[#65625D]">
        Preliminary production estimate · Final specifications require
        manufacturer validation
      </p>
    </section>
  );
}

type MetricCardProps = {
  title: string;
  value: string;
};

function MetricCard({
  title,
  value,
}: MetricCardProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.025] p-4">
      <p className="text-[9px] uppercase tracking-[0.24em] text-[#77736A]">
        {title}
      </p>

      <p className="mt-3 text-xl font-semibold text-[#F6F2EA]">
        {value}
      </p>
    </div>
  );
}
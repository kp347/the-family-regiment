"use client";

import { useMemo } from "react";

import type {
  HeraldDesign,
} from "@/lib/herald/design";

import {
  renderHeraldDesign,
} from "@/lib/herald/svg/svgRenderer";

interface CrestPreviewProps {
  design: HeraldDesign;
}

export default function CrestPreview({
  design,
}: CrestPreviewProps) {
  const svg = useMemo(
    () =>
      renderHeraldDesign(
        design,
      ),
    [design],
  );

  return (
    <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <p className="text-xs uppercase tracking-[0.3em] text-stone-500">
          Live Crest Preview
        </p>

        <h2 className="mt-2 font-serif text-3xl text-stone-900">
          {design.familyName}
        </h2>
      </div>

      <div className="flex min-h-[520px] items-center justify-center rounded-xl bg-stone-100 p-6">
        <div
          className="w-full max-w-sm"
          dangerouslySetInnerHTML={{
            __html: svg,
          }}
        />
      </div>

      <div className="mt-6 grid gap-3 text-sm text-stone-600 sm:grid-cols-2">
        <p>
          <span className="font-semibold text-stone-900">
            Shield:
          </span>{" "}
          {design.shield}
        </p>

        <p>
          <span className="font-semibold text-stone-900">
            Primary Charge:
          </span>{" "}
          {design.primaryCharge}
        </p>

        <p>
          <span className="font-semibold text-stone-900">
            Crown:
          </span>{" "}
          {design.crown}
        </p>

        <p>
          <span className="font-semibold text-stone-900">
            Patch Size:
          </span>{" "}
          {design.patch.size}&quot;
        </p>

        <p>
          <span className="font-semibold text-stone-900">
            Backing:
          </span>{" "}
          {design.patch.backing}
        </p>

        <p>
          <span className="font-semibold text-stone-900">
            Border:
          </span>{" "}
          {design.patch.border}
        </p>

        <p>
          <span className="font-semibold text-stone-900">
            Embroidery Finish:
          </span>{" "}
          {design.embroidery.finish}
        </p>

        <p>
          <span className="font-semibold text-stone-900">
            Motto:
          </span>{" "}
          {design.motto.latin || "Not selected"}
        </p>
      </div>
    </section>
  );
}
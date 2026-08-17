// lib/herald/production/stitchEstimator.ts

import type { HeraldDesign } from "../design";
import { estimateComplexity } from "./complexity";

export interface StitchEstimate {
  estimatedStitches: number;

  recommendedPatchSize: 3 | 4 | 5;

  density: "Low" | "Normal" | "High";

  notes: string[];
}

/*
 * ============================================================
 * Stitch Estimator
 *
 * Produces a consistent embroidery estimate.
 *
 * These are intentionally conservative baseline numbers.
 * We'll calibrate them later with actual vendor feedback.
 * ============================================================
 */

export function estimateStitches(
  design: HeraldDesign,
): StitchEstimate {
  const complexity = estimateComplexity(design);

  let stitches = 7000;

  stitches += complexity.score * 1800;

  if (design.banner) stitches += 1200;

  if (design.crown !== "None") stitches += 1000;

  stitches += design.supporters.length * 2200;

  if (design.wreath) stitches += 1800;

  const notes: string[] = [];

  let density: "Low" | "Normal" | "High" = "Normal";

  if (
    stitches > 18000 &&
    design.patch.size === 3
  ) {
    density = "High";

    notes.push(
      "Consider increasing to a 4-inch patch.",
    );
  }

  if (stitches < 10000) {
    density = "Low";
  }

  let recommendedPatchSize: 3 | 4 | 5 =
    design.patch.size;

  if (stitches > 22000) {
    recommendedPatchSize = 5;

    notes.push(
      "Recommended 5-inch patch for cleaner embroidery.",
    );
  } else if (stitches > 16000) {
    recommendedPatchSize = 4;
  }

  return {
    estimatedStitches: stitches,

    recommendedPatchSize,

    density,

    notes,
  };
}
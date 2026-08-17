// lib/herald/production/threadEstimator.ts

import type { HeraldDesign } from "../design";

export interface ThreadEstimate {
  threadColors: number;

  metallicThreads: number;

  warnings: string[];

  productionReady: boolean;
}

/*
 * ============================================================
 * Thread Color Estimator
 *
 * Estimates embroidery thread usage.
 *
 * Initial estimates are intentionally conservative.
 * Vendor-specific limits will be introduced later.
 * ============================================================
 */

export function estimateThreads(
  design: HeraldDesign,
): ThreadEstimate {
  let threadColors = 2;

  const warnings: string[] = [];

  let metallicThreads = 0;

  if (design.colors.metallic === "gold") {
    metallicThreads++;
  }

  if (design.colors.metallic === "silver") {
    metallicThreads++;
  }

  if (design.secondaryCharge) {
    threadColors++;
  }

  if (design.banner) {
    threadColors++;
  }

  if (design.crown !== "None") {
    threadColors++;
  }

  if (design.supporters.length > 0) {
    threadColors++;
  }

  if (design.wreath) {
    threadColors++;
  }

  if (threadColors > 8) {
    warnings.push(
      "High thread count may increase manufacturing cost.",
    );
  }

  if (threadColors > 10) {
    warnings.push(
      "Consider simplifying the crest.",
    );
  }

  return {
    threadColors,

    metallicThreads,

    warnings,

    productionReady: threadColors <= 10,
  };
}
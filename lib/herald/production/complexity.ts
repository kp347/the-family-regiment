// lib/herald/production/complexity.ts

import type { HeraldDesign } from "../design";

export type ComplexityRating =
  | "Low"
  | "Medium"
  | "High"
  | "Extreme";

export interface ComplexityResult {
  score: number;

  rating: ComplexityRating;

  reasons: string[];
}

/*
 * ============================================================
 * Complexity Estimator
 *
 * Scores a crest based on embroidery difficulty.
 *
 * The goal is NOT perfect accuracy.
 * The goal is consistency across every crest.
 *
 * Vendor-specific tuning comes later.
 * ============================================================
 */

export function estimateComplexity(
  design: HeraldDesign,
): ComplexityResult {
  let score = 0;

  const reasons: string[] = [];

  score += 2;

  if (design.secondaryCharge) {
    score += 2;
    reasons.push("Secondary charge");
  }

  if (design.supporters.length > 0) {
    score += design.supporters.length * 2;
    reasons.push(
      `${design.supporters.length} supporter(s)`,
    );
  }

  if (design.banner) {
    score += 1;
    reasons.push("Banner");
  }

  if (design.wreath) {
    score += 2;
    reasons.push("Wreath");
  }

  if (design.crown !== "None") {
    score += 2;
    reasons.push("Crown");
  }

  if (design.patch.size === 3) {
    score += 2;
    reasons.push(
      "Small patch size increases stitch density",
    );
  }

  let rating: ComplexityRating;

  if (score <= 4) {
    rating = "Low";
  } else if (score <= 8) {
    rating = "Medium";
  } else if (score <= 12) {
    rating = "High";
  } else {
    rating = "Extreme";
  }

  return {
    score,
    rating,
    reasons,
  };
}
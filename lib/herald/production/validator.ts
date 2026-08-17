// lib/herald/production/validator.ts

import type { HeraldDesign } from "../design";

import {
  estimateComplexity,
} from "./complexity";

import {
  estimateStitches,
} from "./stitchEstimator";

import {
  estimateThreads,
} from "./threadEstimator";

export interface ProductionValidation {
  productionReady: boolean;

  complexity: ReturnType<
    typeof estimateComplexity
  >;

  stitches: ReturnType<
    typeof estimateStitches
  >;

  threads: ReturnType<
    typeof estimateThreads
  >;

  warnings: string[];

  recommendations: string[];
}

/*
 * ============================================================
 * Production Validator
 *
 * Aggregates every production estimator into a single
 * manufacturing assessment.
 *
 * This becomes the primary API for:
 *
 * • Builder
 * • Crest Workshop
 * • Checkout
 * • Vendor Export
 * ============================================================
 */

export function validateProduction(
  design: HeraldDesign,
): ProductionValidation {
  const complexity =
    estimateComplexity(design);

  const stitches =
    estimateStitches(design);

  const threads =
    estimateThreads(design);

  const warnings: string[] = [];

  const recommendations: string[] = [];

  warnings.push(...threads.warnings);

  warnings.push(...stitches.notes);

  if (complexity.rating === "Extreme") {
    warnings.push(
      "Very complex designs may require manual simplification.",
    );
  }

  if (
    stitches.recommendedPatchSize >
    design.patch.size
  ) {
    recommendations.push(
      `Increase patch size to ${stitches.recommendedPatchSize}" for improved embroidery quality.`,
    );
  }

  if (
    threads.threadColors > 8
  ) {
    recommendations.push(
      "Reduce thread colors to lower production cost.",
    );
  }

  if (
    complexity.rating === "High" ||
    complexity.rating === "Extreme"
  ) {
    recommendations.push(
      "Review decorative elements before manufacturing.",
    );
  }

  const productionReady =
    threads.productionReady &&
    complexity.rating !== "Extreme";

  return {
    productionReady,

    complexity,

    stitches,

    threads,

    warnings,

    recommendations,
  };
}

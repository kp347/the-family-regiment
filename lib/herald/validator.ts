// lib/herald/validator.ts

import type {
  CrestSpec,
  PatchSettings,
  ValidationIssue,
  ValidationResult,
} from "./types";

import type { HeraldDesign } from "./design";

import {
  EMBROIDERY_RULES,
  getMaximumThreadColors,
} from "./rules";

/*
 * =========================================================
 * Existing Crest Validation
 * =========================================================
 *
 * Used by the crest / builder workflow.
 *
 * DO NOT remove this function.
 */

export function validateCrest(
  crest: CrestSpec,
  patch: PatchSettings,
): ValidationResult {
  const issues: ValidationIssue[] = [];

  /*
   * Thread colors
   */

  const maxColors =
    getMaximumThreadColors(
      crest.embroideryFinish,
    );

  if (
    crest.colors.length >
    maxColors
  ) {
    issues.push({
      severity: "error",

      field: "colors",

      message: `Maximum ${maxColors} thread colors allowed.`,
    });
  }

  /*
   * Motto length
   */

  if (
    crest.mottoLatin.length >
    EMBROIDERY_RULES
      .maximumMottoCharacters
  ) {
    issues.push({
      severity: "warning",

      field: "mottoLatin",

      message:
        "Latin motto may be too long for embroidery.",
    });
  }

  /*
   * Symbols
   */

  const symbolCount =
    1 +
    (crest.secondarySymbol
      ? 1
      : 0) +
    (crest.supporters?.length ??
      0);

  if (
    symbolCount >
    EMBROIDERY_RULES
      .maximumPrimarySymbols +
      EMBROIDERY_RULES
        .maximumSecondarySymbols
  ) {
    issues.push({
      severity: "warning",

      field: "symbols",

      message:
        "Too many symbols may reduce embroidery quality.",
    });
  }

  /*
   * Small patch warning
   */

  if (
    patch.size === 3 &&
    symbolCount > 2
  ) {
    issues.push({
      severity: "warning",

      field: "patchSize",

      message:
        '3" patches work best with simpler designs.',
    });
  }

  /*
   * Estimated stitch count
   */

  const stitchesPerSquareInch =
    symbolCount <= 2
      ? EMBROIDERY_RULES
          .estimatedStitchesPerSquareInch
          .medium
      : EMBROIDERY_RULES
          .estimatedStitchesPerSquareInch
          .high;

  const estimatedArea =
    patch.size * patch.size;

  const stitchCount =
    Math.round(
      estimatedArea *
        stitchesPerSquareInch,
    );

  return {
    valid: !issues.some(
      (issue) =>
        issue.severity ===
        "error",
    ),

    stitchCount,

    threadColors:
      crest.colors.length,

    issues,
  };
}

/*
 * =========================================================
 * Herald Design Production Validation
 * =========================================================
 *
 * Used by:
 *
 * components/herald/ProductionStatus.tsx
 *
 * This performs a preliminary embroidery / manufacturing
 * review of the canonical HeraldDesign.
 *
 * It does NOT replace:
 *
 * - vendor digitization
 * - actual garment measurement
 * - physical sampling
 * - final thread selection
 * - final stitch-density approval
 */

export type ProductionComplexityRating =
  | "Low"
  | "Moderate"
  | "High";

export type ProductionDensity =
  | "Light"
  | "Standard"
  | "Dense";

export interface ProductionValidationReport {
  productionReady: boolean;

  complexity: {
    rating: ProductionComplexityRating;

    score: number;
  };

  stitches: {
    estimatedStitches: number;

    recommendedPatchSize:
      | 3
      | 4
      | 5;

    density: ProductionDensity;
  };

  threads: {
    threadColors: number;
  };

  warnings: string[];

  recommendations: string[];
}

export function validateProduction(
  design: HeraldDesign,
): ProductionValidationReport {
  const complexityScore =
    calculateComplexityScore(
      design,
    );

  const complexityRating =
    getComplexityRating(
      complexityScore,
    );

  const threadColors =
    estimateThreadColors(
      design,
    );

  const recommendedPatchSize =
    getRecommendedPatchSize(
      design,
      complexityScore,
    );

  const estimatedStitches =
    estimateStitches(
      design,
      complexityScore,
      recommendedPatchSize,
    );

  const density =
    getDensity(
      complexityScore,
      estimatedStitches,
      recommendedPatchSize,
    );

  const warnings =
    buildProductionWarnings(
      design,
      complexityScore,
      threadColors,
      recommendedPatchSize,
    );

  const recommendations =
    buildProductionRecommendations(
      design,
      complexityScore,
      threadColors,
      recommendedPatchSize,
    );

  return {
    productionReady:
      design.metadata.approved &&
      warnings.length === 0,

    complexity: {
      rating:
        complexityRating,

      score:
        complexityScore,
    },

    stitches: {
      estimatedStitches,

      recommendedPatchSize,

      density,
    },

    threads: {
      threadColors,
    },

    warnings,

    recommendations,
  };
}

/*
 * =========================================================
 * Complexity
 * =========================================================
 */

function calculateComplexityScore(
  design: HeraldDesign,
): number {
  let score = 2;

  if (
    design.secondaryCharge
  ) {
    score += 1;
  }

  if (design.crest) {
    score += 1;
  }

  score +=
    design.supporters.length;

  if (
    design.crown !== "None"
  ) {
    score += 1;
  }

  if (design.wreath) {
    score += 1;
  }

  if (design.banner) {
    score += 1;
  }

  if (
    design.motto.latin.trim()
  ) {
    score += 1;
  }

  if (
    design.shield ===
      "Tournament Shield" ||
    design.shield ===
      "Crusader Shield"
  ) {
    score += 1;
  }

  return Math.min(
    score,
    10,
  );
}

function getComplexityRating(
  score: number,
): ProductionComplexityRating {
  if (score <= 4) {
    return "Low";
  }

  if (score <= 7) {
    return "Moderate";
  }

  return "High";
}

/*
 * =========================================================
 * Thread Colors
 * =========================================================
 */

function estimateThreadColors(
  design: HeraldDesign,
): number {
  const existingEstimate =
    design.embroidery
      .estimatedThreadColors;

  if (
    typeof existingEstimate ===
      "number" &&
    existingEstimate > 0
  ) {
    return Math.round(
      existingEstimate,
    );
  }

  /*
   * Base Family Regiment palette:
   *
   * primary
   * secondary
   * metallic
   */

  let colors = 3;

  if (
    design.secondaryCharge
  ) {
    colors += 1;
  }

  if (
    design.supporters.length >
    0
  ) {
    colors += 1;
  }

  if (
    design.crown !== "None"
  ) {
    colors += 1;
  }

  return Math.min(
    colors,
    7,
  );
}

/*
 * =========================================================
 * Recommended Patch Size
 * =========================================================
 */

function getRecommendedPatchSize(
  design: HeraldDesign,
  complexityScore: number,
): 3 | 4 | 5 {
  if (
    complexityScore >= 8
  ) {
    return 5;
  }

  if (
    complexityScore >= 5
  ) {
    return Math.max(
      4,
      design.patch.size,
    ) as 4 | 5;
  }

  return design.patch.size;
}

/*
 * =========================================================
 * Stitch Estimate
 * =========================================================
 */

function estimateStitches(
  design: HeraldDesign,
  complexityScore: number,
  recommendedPatchSize:
    | 3
    | 4
    | 5,
): number {
  const existingEstimate =
    design.embroidery
      .estimatedStitches;

  if (
    typeof existingEstimate ===
      "number" &&
    existingEstimate > 0
  ) {
    return Math.round(
      existingEstimate,
    );
  }

  const baseStitchesBySize: Record<
    3 | 4 | 5,
    number
  > = {
    3: 6500,

    4: 9500,

    5: 13000,
  };

  const complexityAdjustment =
    complexityScore * 850;

  const supporterAdjustment =
    design.supporters.length *
    1200;

  const mottoAdjustment =
    design.motto.latin.trim()
      ? 1000
      : 0;

  return Math.round(
    baseStitchesBySize[
      recommendedPatchSize
    ] +
      complexityAdjustment +
      supporterAdjustment +
      mottoAdjustment,
  );
}

/*
 * =========================================================
 * Density
 * =========================================================
 */

function getDensity(
  complexityScore: number,
  estimatedStitches: number,
  patchSize: 3 | 4 | 5,
): ProductionDensity {
  const nominalArea =
    patchSize * patchSize;

  const relativeDensity =
    estimatedStitches /
    nominalArea;

  if (
    complexityScore >= 8 ||
    relativeDensity > 1000
  ) {
    return "Dense";
  }

  if (
    complexityScore >= 5 ||
    relativeDensity > 700
  ) {
    return "Standard";
  }

  return "Light";
}

/*
 * =========================================================
 * Production Warnings
 * =========================================================
 */

function buildProductionWarnings(
  design: HeraldDesign,
  complexityScore: number,
  threadColors: number,
  recommendedPatchSize:
    | 3
    | 4
    | 5,
): string[] {
  const warnings: string[] =
    [];

  if (
    !design.metadata.approved
  ) {
    warnings.push(
      "Heraldic design has not yet been formally approved.",
    );
  }

  if (
    design.patch.size <
    recommendedPatchSize
  ) {
    warnings.push(
      `Current ${design.patch.size}" patch size may be too small for the selected heraldic detail. Preliminary recommendation: ${recommendedPatchSize}".`,
    );
  }

  if (
    complexityScore >= 8
  ) {
    warnings.push(
      "Design complexity is high and may require simplification during embroidery digitization.",
    );
  }

  if (
    threadColors > 7
  ) {
    warnings.push(
      "Thread count exceeds the preferred Family Regiment production range.",
    );
  }

  if (
    design.supporters.length >
    2
  ) {
    warnings.push(
      "More than two supporters may reduce clarity at embroidered patch scale.",
    );
  }

  if (
    design.motto.latin.trim()
      .length > 32
  ) {
    warnings.push(
      "Motto length may reduce legibility at embroidered patch scale.",
    );
  }

  return warnings;
}

/*
 * =========================================================
 * Production Recommendations
 * =========================================================
 */

function buildProductionRecommendations(
  design: HeraldDesign,
  complexityScore: number,
  threadColors: number,
  recommendedPatchSize:
    | 3
    | 4
    | 5,
): string[] {
  const recommendations: string[] =
    [];

  if (
    design.patch.size !==
    recommendedPatchSize
  ) {
    recommendations.push(
      `Evaluate the crest at approximately ${recommendedPatchSize}" before final sample approval.`,
    );
  }

  if (
    complexityScore >= 6
  ) {
    recommendations.push(
      "Prioritize strong silhouettes, simplified interior detail, and clear separation between major heraldic elements.",
    );
  }

  if (
    threadColors >= 6
  ) {
    recommendations.push(
      "Review whether any thread colors can be consolidated without changing the approved House identity.",
    );
  }

  if (
    design.crown !== "None" &&
    design.banner &&
    design.supporters.length >
      0
  ) {
    recommendations.push(
      "Review crown, banner, and supporter spacing carefully during embroidery sampling to avoid visual crowding.",
    );
  }

  recommendations.push(
    "Confirm final stitch density, thread codes, and digitization with the selected embroidery manufacturer.",
  );

  recommendations.push(
    "Verify final crest dimensions against the actual production garment before authorizing the physical sample.",
  );

  return recommendations;
}
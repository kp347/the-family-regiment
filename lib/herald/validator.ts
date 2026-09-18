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

import {
  getVisualCanonAsset,
} from "./visualCanon";

import type {
  VisualCanonAssetStatus,
  VisualCanonReferenceSnapshot,
} from "./visualCanon";

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

  const maxColors =
    getMaximumThreadColors(
      crest.embroideryFinish,
    );

  if (crest.colors.length > maxColors) {
    issues.push({
      severity: "error",
      field: "colors",
      message: `Maximum ${maxColors} thread colors allowed.`,
    });
  }

  if (
    crest.mottoLatin.length >
    EMBROIDERY_RULES.maximumMottoCharacters
  ) {
    issues.push({
      severity: "warning",
      field: "mottoLatin",
      message:
        "Latin motto may be too long for embroidery.",
    });
  }

  const symbolCount =
    1 +
    (crest.secondarySymbol ? 1 : 0) +
    (crest.supporters?.length ?? 0);

  if (
    symbolCount >
    EMBROIDERY_RULES.maximumPrimarySymbols +
      EMBROIDERY_RULES.maximumSecondarySymbols
  ) {
    issues.push({
      severity: "warning",
      field: "symbols",
      message:
        "Too many symbols may reduce embroidery quality.",
    });
  }

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
        issue.severity === "error",
    ),

    stitchCount,

    threadColors:
      crest.colors.length,

    issues,
  };
}

/*
 * =========================================================
 * Production Validation
 * =========================================================
 */

export type ProductionComplexityRating =
  | "Low"
  | "Moderate"
  | "High";

export type ProductionDensity =
  | "Light"
  | "Standard"
  | "Dense";

export type CanonProductionGate =
  | "blocked"
  | "sample-only"
  | "controlled-production"
  | "production-eligible";

export interface CanonValidationIssue {
  assetId: string;

  assetName: string;

  status:
    | VisualCanonAssetStatus
    | "missing";

  message: string;
}

export interface ProductionValidationReport {
  productionReady: boolean;

  /*
   * Canon gate is deliberately separate from the existing
   * productionReady boolean.
   *
   * This tells downstream systems WHY an approved design
   * may still be restricted.
   */

  canon: {
    gate: CanonProductionGate;

    valid: boolean;

    issues: CanonValidationIssue[];
  };

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

/*
 * =========================================================
 * Visual Canon Production Gate
 * =========================================================
 */

const STATUS_RANK: Record<
  VisualCanonAssetStatus,
  number
> = {
  draft: 0,
  "visual-approved": 1,
  "production-reviewed": 2,
  "sample-tested": 3,
  "canon-certified": 4,
};

function getFrozenCanonReferences(
  design: HeraldDesign,
): VisualCanonReferenceSnapshot[] {
  const canon =
    design.visualCanon;

  if (!canon) {
    return [];
  }

  return [
    canon.shield,
    canon.primaryCharge,
    canon.secondaryCharge,
    canon.crest,
    ...canon.supporters,
  ].filter(
    (
      reference,
    ): reference is VisualCanonReferenceSnapshot =>
      Boolean(reference),
  );
}

function validateCanonForProduction(
  design: HeraldDesign,
): ProductionValidationReport["canon"] {
  if (!design.visualCanon) {
    return {
      gate: "blocked",
      valid: false,
      issues: [
        {
          assetId: "visual-canon",
          assetName:
            "Visual Canon Snapshot",
          status: "missing",
          message:
            "Approved Visual Canon references have not been captured for this design.",
        },
      ],
    };
  }

  const references =
    getFrozenCanonReferences(
      design,
    );

  if (references.length === 0) {
    return {
      gate: "blocked",
      valid: false,
      issues: [
        {
          assetId: "visual-canon",
          assetName:
            "Visual Canon Snapshot",
          status: "missing",
          message:
            "The design contains no resolvable Visual Canon artwork references.",
        },
      ],
    };
  }

  const issues: CanonValidationIssue[] =
    [];

  let minimumRank = 4;

  for (const reference of references) {
    const asset =
      getVisualCanonAsset(
        reference.assetId,
      );

    if (!asset) {
      minimumRank = -1;

      issues.push({
        assetId:
          reference.assetId,

        assetName:
          reference.assetName,

        status: "missing",

        message:
          `${reference.assetName} is referenced by the approved crest but is missing from the current Visual Canon.`,
      });

      continue;
    }

    const rank =
      STATUS_RANK[asset.status];

    minimumRank =
      Math.min(
        minimumRank,
        rank,
      );

    /*
     * The frozen artwork version must remain resolvable.
     *
     * For now the registry contains only the current
     * artwork version. If that version changes, historical
     * production must not silently substitute new geometry.
     */

    if (
      asset.artworkVersion !==
      reference.artworkVersion
    ) {
      minimumRank = -1;

      issues.push({
        assetId:
          asset.id,

        assetName:
          asset.name,

        status:
          asset.status,

        message:
          `${asset.name} was approved using artwork version ${reference.artworkVersion}, but the active Visual Canon contains version ${asset.artworkVersion}. Historical artwork must be resolved before manufacturing.`,
      });

      continue;
    }

    if (
      asset.status === "draft"
    ) {
      issues.push({
        assetId:
          asset.id,

        assetName:
          asset.name,

        status:
          asset.status,

        message:
          `${asset.name} is still draft artwork and cannot be manufactured.`,
      });
    }

    if (
      asset.status ===
      "visual-approved"
    ) {
      issues.push({
        assetId:
          asset.id,

        assetName:
          asset.name,

        status:
          asset.status,

        message:
          `${asset.name} is visually approved but has not completed production review.`,
      });
    }
  }

  if (minimumRank < 2) {
    return {
      gate: "blocked",
      valid: false,
      issues,
    };
  }

  if (minimumRank === 2) {
    return {
      gate: "sample-only",
      valid: true,
      issues,
    };
  }

  if (minimumRank === 3) {
    return {
      gate:
        "controlled-production",
      valid: true,
      issues,
    };
  }

  return {
    gate:
      "production-eligible",
    valid: true,
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
 * Design approval and manufacturing eligibility are NOT
 * the same thing.
 */

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

  const canon =
    validateCanonForProduction(
      design,
    );

  const warnings =
    buildProductionWarnings(
      design,
      complexityScore,
      threadColors,
      recommendedPatchSize,
    );

  /*
   * Canon issues become visible manufacturing warnings,
   * while retaining structured data for future UI/API use.
   */

  const canonWarnings =
    canon.issues.map(
      (issue) =>
        issue.message,
    );

  const allWarnings = [
    ...warnings,
    ...canonWarnings,
  ];

  const recommendations =
    buildProductionRecommendations(
      design,
      complexityScore,
      threadColors,
      recommendedPatchSize,
      canon.gate,
    );

  return {
    /*
     * "productionReady" means normal production eligibility,
     * not merely permission to create a physical sample.
     */

    productionReady:
      design.metadata.approved &&
      canon.gate ===
        "production-eligible" &&
      allWarnings.length === 0,

    canon,

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

    warnings:
      allWarnings,

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

  if (design.secondaryCharge) {
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

  let colors = 3;

  if (design.secondaryCharge) {
    colors += 1;
  }

  if (
    design.supporters.length > 0
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
  if (complexityScore >= 8) {
    return 5;
  }

  if (complexityScore >= 5) {
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
      "Design complexity is high and may require controlled simplification before embroidery digitization.",
    );
  }

  if (threadColors > 7) {
    warnings.push(
      "Thread count exceeds the preferred Family Regiment production range.",
    );
  }

  if (
    design.supporters.length > 2
  ) {
    warnings.push(
      "More than two supporters may reduce clarity at embroidered patch scale.",
    );
  }

  if (
    design.motto.latin
      .trim()
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
  canonGate: CanonProductionGate,
): string[] {
  const recommendations: string[] =
    [];

  if (
    canonGate === "blocked"
  ) {
    recommendations.push(
      "Complete Visual Canon artwork review before creating a manufacturing sample.",
    );
  }

  if (
    canonGate === "sample-only"
  ) {
    recommendations.push(
      "Canonical artwork is production-reviewed and may proceed to a controlled physical sample, but bulk production remains blocked.",
    );
  }

  if (
    canonGate ===
    "controlled-production"
  ) {
    recommendations.push(
      "Canonical artwork has been physically sample-tested. Complete final canon certification before normal production workflow.",
    );
  }

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
      "Prioritize strong silhouettes, controlled interior detail, and clear separation between major heraldic elements.",
    );
  }

  if (threadColors >= 6) {
    recommendations.push(
      "Review whether any thread colors can be consolidated without changing the approved Family Regiment crest identity.",
    );
  }

  if (
    design.crown !== "None" &&
    design.banner &&
    design.supporters.length > 0
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
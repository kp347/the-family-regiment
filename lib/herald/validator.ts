// lib/herald/validator.ts

import type {
  CrestSpec,
  PatchSettings,
  ValidationIssue,
  ValidationResult,
} from "./types";

import {
  EMBROIDERY_RULES,
  getMaximumThreadColors,
} from "./rules";

export function validateCrest(
  crest: CrestSpec,
  patch: PatchSettings,
): ValidationResult {
  const issues: ValidationIssue[] = [];

  // Thread colors
  const maxColors = getMaximumThreadColors(
    crest.embroideryFinish,
  );

  if (crest.colors.length > maxColors) {
    issues.push({
      severity: "error",
      field: "colors",
      message: `Maximum ${maxColors} thread colors allowed.`,
    });
  }

  // Motto length
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

  // Symbols
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

  // Small patch warning
  if (patch.size === 3 && symbolCount > 2) {
    issues.push({
      severity: "warning",
      field: "patchSize",
      message:
        '3" patches work best with simpler designs.',
    });
  }

  // Estimated stitch count
  const stitchesPerSquareInch =
    symbolCount <= 2
      ? EMBROIDERY_RULES.estimatedStitchesPerSquareInch.medium
      : EMBROIDERY_RULES.estimatedStitchesPerSquareInch.high;

  const estimatedArea = patch.size * patch.size;

  const stitchCount = Math.round(
    estimatedArea * stitchesPerSquareInch,
  );

  return {
    valid: !issues.some(
      (issue) => issue.severity === "error",
    ),
    stitchCount,
    threadColors: crest.colors.length,
    issues,
  };
}
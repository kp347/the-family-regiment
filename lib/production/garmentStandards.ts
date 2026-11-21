
 // lib/production/garmentStandards.ts

export type GarmentSilhouetteId =
  | "traditional-m65"
  | "open-right-chest-field-jacket";

export type GarmentPlacementId =
  | "left-shoulder-crest"
  | "right-shoulder-flags"
  | "chest-name-tape"
  | "right-chest-pocket"
  | "right-upper-chest"
  | "left-sleeve"
  | "right-sleeve";

export interface GarmentPlacementArea {
  id: GarmentPlacementId;

  label: string;

  /*
   * Maximum usable decoration area.
   *
   * These are provisional design guardrails,
   * NOT verified manufacturing dimensions.
   *
   * Final dimensions must be confirmed against
   * actual garment samples and size runs.
   */

  maxWidthInches: number;
  maxHeightInches: number;

  recommendedWidthInches?: number;
  recommendedHeightInches?: number;

  notes: string;
}

export interface GarmentStandard {
  id: GarmentSilhouetteId;

  name: string;
  description: string;

  placements: GarmentPlacementArea[];
}

/*
 * =========================================================
 * THE FAMILY REGIMENT — PLACEMENT CANON
 * =========================================================
 *
 * Regiment Jacket:
 *
 * 1. House crest:
 *    Wearer's LEFT shoulder.
 *
 * 2. Heritage flags:
 *    Wearer's RIGHT shoulder.
 *
 * 3. Personalized name tape:
 *    Directly ABOVE the chest pocket.
 *
 * The House name displayed on the crest is
 * independent of the name tape text.
 *
 * These placements apply to both supported
 * jacket silhouettes.
 *
 * Legacy chest-crest placements are retained
 * only for backward compatibility.
 */

/*
 * =========================================================
 * Shared Placement Definitions
 * =========================================================
 */

const leftShoulderCrest: GarmentPlacementArea = {
  id: "left-shoulder-crest",

  label: "Left Shoulder — House Crest",

  maxWidthInches: 3.5,
  maxHeightInches: 4.0,

  recommendedWidthInches: 3.0,
  recommendedHeightInches: 3.5,

  notes:
    "Primary House crest placement on the wearer's left shoulder. " +
    "Includes the approved House name and motto where applicable. " +
    "Final dimensions, sleeve curvature, seam clearance, and " +
    "embroidery feasibility must be verified with the selected vendor.",
};

const rightShoulderFlags: GarmentPlacementArea = {
  id: "right-shoulder-flags",

  label: "Right Shoulder — Heritage Flags",

  maxWidthInches: 3.5,
  maxHeightInches: 4.0,

  recommendedWidthInches: 3.0,
  recommendedHeightInches: 2.0,

  notes:
    "Reserved for the customer's selected heritage flags on the " +
    "wearer's right shoulder. Flag quantity, arrangement, " +
    "individual dimensions, and spacing require vendor approval.",
};

const chestNameTape: GarmentPlacementArea = {
  id: "chest-name-tape",

  label: "Above Chest Pocket — Personalized Name Tape",

  maxWidthInches: 5.0,
  maxHeightInches: 1.25,

  recommendedWidthInches: 4.0,
  recommendedHeightInches: 1.0,

  notes:
    "Personalized name tape positioned directly above the chest " +
    "pocket. The text may be a first name, nickname, callsign, " +
    "or another customer-selected designation. It must remain " +
    "independent of the House name on the crest. " +
    "Final pocket geometry and usable dimensions require verification.",
};

/*
 * =========================================================
 * Legacy Placement Definitions
 * =========================================================
 *
 * Retained to avoid breaking previously saved
 * production specifications and older code.
 *
 * These must NOT be selected as the primary
 * House crest placement for new orders.
 */

const legacyRightChestPocket: GarmentPlacementArea = {
  id: "right-chest-pocket",

  label: "Legacy — Right Chest Pocket",

  maxWidthInches: 3.5,
  maxHeightInches: 3.75,

  recommendedWidthInches: 3.0,
  recommendedHeightInches: 3.25,

  notes:
    "LEGACY PLACEMENT ONLY. Superseded by the approved " +
    "left-shoulder House crest placement. Retained for " +
    "compatibility with historical design drafts.",
};

const legacyRightUpperChest: GarmentPlacementArea = {
  id: "right-upper-chest",

  label: "Legacy — Right Upper Chest",

  maxWidthInches: 4.5,
  maxHeightInches: 5.0,

  recommendedWidthInches: 3.75,
  recommendedHeightInches: 4.25,

  notes:
    "LEGACY PLACEMENT ONLY. This earlier crest location " +
    "is not part of the current Regiment Jacket standard. " +
    "New production specifications must use left-shoulder-crest.",
};

const legacyLeftSleeve: GarmentPlacementArea = {
  id: "left-sleeve",

  label: "Legacy — Left Sleeve",

  maxWidthInches: 3.5,
  maxHeightInches: 4.0,

  notes:
    "Legacy generic sleeve placement. For new House crest " +
    "specifications, use left-shoulder-crest instead.",
};

const legacyRightSleeve: GarmentPlacementArea = {
  id: "right-sleeve",

  label: "Legacy — Right Sleeve",

  maxWidthInches: 3.5,
  maxHeightInches: 4.0,

  notes:
    "Legacy generic sleeve placement. For new heritage flag " +
    "specifications, use right-shoulder-flags instead.",
};

/*
 * =========================================================
 * Traditional M65-Inspired Jacket
 * =========================================================
 */

const traditionalM65: GarmentStandard = {
  id: "traditional-m65",

  name: "Traditional M65-Inspired Jacket",

  description:
    "Four-pocket military-inspired field jacket with " +
    "the House crest on the left shoulder, heritage flags " +
    "on the right shoulder, and a personalized name tape " +
    "above the chest pocket.",

  placements: [
    leftShoulderCrest,
    rightShoulderFlags,
    chestNameTape,

    // Historical compatibility only.
    legacyRightChestPocket,
    legacyLeftSleeve,
    legacyRightSleeve,
  ],
};

/*
 * =========================================================
 * Open Right-Chest Field Jacket
 * =========================================================
 *
 * Retains its original silhouette identifier
 * to preserve compatibility with saved drafts.
 *
 * The open chest is a garment styling feature,
 * NOT the primary House crest placement.
 */

const openRightChestFieldJacket: GarmentStandard = {
  id: "open-right-chest-field-jacket",

  name: "Open Right-Chest Field Jacket",

  description:
    "Sleek military-inspired field jacket with an open " +
    "chest layout. The House crest is placed on the " +
    "wearer's left shoulder, heritage flags on the right " +
    "shoulder, and the personalized name tape directly " +
    "above the chest pocket.",

  placements: [
    leftShoulderCrest,
    rightShoulderFlags,
    chestNameTape,

    // Historical compatibility only.
    legacyRightUpperChest,
    legacyLeftSleeve,
    legacyRightSleeve,
  ],
};

/*
 * =========================================================
 * Garment Registry
 * =========================================================
 */

export const garmentStandards: GarmentStandard[] = [
  traditionalM65,
  openRightChestFieldJacket,
];

/*
 * =========================================================
 * Lookup Helpers
 * =========================================================
 */

export function getGarmentStandard(
  id: GarmentSilhouetteId,
): GarmentStandard {
  const standard = garmentStandards.find(
    (item) => item.id === id,
  );

  if (!standard) {
    throw new Error(
      `Unknown garment standard: ${id}`,
    );
  }

  return standard;
}

export function getGarmentPlacement(
  garmentId: GarmentSilhouetteId,
  placementId: GarmentPlacementId,
): GarmentPlacementArea {
  const garment = getGarmentStandard(garmentId);

  const placement = garment.placements.find(
    (item) => item.id === placementId,
  );

  if (!placement) {
    throw new Error(
      `Placement ${placementId} is not available for garment ${garmentId}.`,
    );
  }

  return placement;
}

/*
 * =========================================================
 * Placement Validation
 * =========================================================
 */

export function fitsGarmentPlacement(
  garmentId: GarmentSilhouetteId,
  placementId: GarmentPlacementId,
  widthInches: number,
  heightInches: number,
): boolean {
  if (
    !Number.isFinite(widthInches) ||
    !Number.isFinite(heightInches) ||
    widthInches <= 0 ||
    heightInches <= 0
  ) {
    return false;
  }

  const placement = getGarmentPlacement(
    garmentId,
    placementId,
  );

  return (
    widthInches <= placement.maxWidthInches &&
    heightInches <= placement.maxHeightInches
  );
}

/*
 * =========================================================
 * New Production Placement Validation
 * =========================================================
 *
 * Prevents legacy chest-crest placements from
 * being selected for new Regiment Jacket jobs.
 *
 * This helper does not automatically reject
 * historical records, which remain readable.
 */

export function isApprovedRegimentPlacement(
  placementId: GarmentPlacementId,
): boolean {
  return (
    placementId === "left-shoulder-crest" ||
    placementId === "right-shoulder-flags" ||
    placementId === "chest-name-tape"
  );
}

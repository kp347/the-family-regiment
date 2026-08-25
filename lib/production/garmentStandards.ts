// lib/production/garmentStandards.ts

export type GarmentSilhouetteId =
  | "traditional-m65"
  | "open-right-chest-field-jacket";

export type GarmentPlacementId =
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
   * These are design guardrails, not production truth.
   * Final placement must still be verified against the
   * actual production garment and size run.
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
 * Traditional M65-Inspired Jacket
 * =========================================================
 *
 * Uses a conventional front pocket layout.
 *
 * The right chest crest area is constrained by the
 * chest pocket and flap.
 */

const traditionalM65: GarmentStandard = {
  id: "traditional-m65",

  name: "Traditional M65-Inspired Jacket",

  description:
    "Four-pocket military-inspired field jacket with traditional chest pocket geometry.",

  placements: [
    {
      id: "right-chest-pocket",

      label: "Right Chest Pocket",

      maxWidthInches: 3.5,

      maxHeightInches: 3.75,

      recommendedWidthInches: 3.0,

      recommendedHeightInches: 3.25,

      notes:
        "Crest should remain centered within the visible pocket field below the flap. Exact dimensions must be verified on the selected garment.",
    },

    {
      id: "left-sleeve",

      label: "Left Sleeve",

      maxWidthInches: 3.5,

      maxHeightInches: 4,

      notes:
        "Reserved for approved heritage, flag, Regiment, service, or House-related patch configurations.",
    },

    {
      id: "right-sleeve",

      label: "Right Sleeve",

      maxWidthInches: 3.5,

      maxHeightInches: 4,

      notes:
        "Reserved for approved House-specific, heritage, achievement, or symbolic patch placement.",
    },
  ],
};

/*
 * =========================================================
 * Open Right-Chest Field Jacket
 * =========================================================
 *
 * Inspired by cleaner field-jacket silhouettes where
 * the right chest is not occupied by a large flap pocket.
 *
 * This provides additional room for the House crest and
 * may become a preferred premium Regiment Jacket layout.
 */

const openRightChestFieldJacket: GarmentStandard = {
  id: "open-right-chest-field-jacket",

  name: "Open Right-Chest Field Jacket",

  description:
    "Sleeker military-inspired field jacket with an open right chest area suitable for a larger crest.",

  placements: [
    {
      id: "right-upper-chest",

      label: "Right Upper Chest",

      maxWidthInches: 4.5,

      maxHeightInches: 5,

      recommendedWidthInches: 3.75,

      recommendedHeightInches: 4.25,

      notes:
        "Primary House crest placement. Increased usable area improves heraldic detail and visual hierarchy while preserving a restrained overall jacket layout.",
    },

    {
      id: "left-sleeve",

      label: "Left Sleeve",

      maxWidthInches: 3.5,

      maxHeightInches: 4,

      notes:
        "Reserved for approved heritage, flag, Regiment, service, or House-related patch configurations.",
    },

    {
      id: "right-sleeve",

      label: "Right Sleeve",

      maxWidthInches: 3.5,

      maxHeightInches: 4,

      notes:
        "Reserved for approved House-specific, heritage, achievement, or symbolic patch placement.",
    },
  ],
};

export const garmentStandards: GarmentStandard[] = [
  traditionalM65,
  openRightChestFieldJacket,
];

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
  const garment =
    getGarmentStandard(garmentId);

  const placement =
    garment.placements.find(
      (item) => item.id === placementId,
    );

  if (!placement) {
    throw new Error(
      `Placement ${placementId} is not available for garment ${garmentId}.`,
    );
  }

  return placement;
}

export function fitsGarmentPlacement(
  garmentId: GarmentSilhouetteId,
  placementId: GarmentPlacementId,
  widthInches: number,
  heightInches: number,
): boolean {
  const placement =
    getGarmentPlacement(
      garmentId,
      placementId,
    );

  return (
    widthInches <=
      placement.maxWidthInches &&
    heightInches <=
      placement.maxHeightInches
  );
}
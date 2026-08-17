// lib/herald/design.ts

import type {
  BorderStyle,
  BuilderShieldStyle,
  CrestAnimal,
  CrestColors,
  CrestCrown,
  EmbroideryFinish,
  PatchBacking,
} from "./types";

/*
 * =========================================================
 * Herald Design
 *
 * This is the canonical representation of an approved crest.
 *
 * Every downstream system consumes this model:
 *
 * - SVG Renderer
 * - Crest Workshop
 * - Embroidery Validator
 * - Vendor Export
 * - Checkout
 * - Manufacturing
 *
 * Nothing should bypass this model.
 * =========================================================
 */

export interface HeraldDesign {
  version: 1;

  familyName: string;

  shield: BuilderShieldStyle;

  primaryCharge: CrestAnimal;

  secondaryCharge?: CrestAnimal;

  crest?: CrestAnimal;

  supporters: CrestAnimal[];

  crown: CrestCrown;

  wreath: boolean;

  banner: boolean;

  motto: {
    latin: string;

    english: string;
  };

  colors: CrestColors;

  patch: {
    border: BorderStyle;

    backing: PatchBacking;

    size: 3 | 4 | 5;
  };

  embroidery: {
    finish: EmbroideryFinish;

    estimatedThreadColors?: number;

    estimatedStitches?: number;
  };

  metadata: {
    createdAt: string;

    updatedAt: string;

    canonVersion: string;

    approved: boolean;
  };
}

/*
 * =========================================================
 * Factory
 * =========================================================
 */

export function createEmptyDesign(
  familyName: string,
): HeraldDesign {
  const now = new Date().toISOString();

  return {
    version: 1,

    familyName,

    shield: "Heater Shield",

    primaryCharge: "Lion",

    supporters: [],

    crown: "None",

    wreath: false,

    banner: true,

    motto: {
      latin: "",

      english: "",
    },

    colors: {
      primary: "#1F2A1F",

      secondary: "#E8D7AE",

      metallic: "gold",
    },

    patch: {
      border: "merrow",

      backing: "hook-loop",

      size: 4,
    },

    embroidery: {
      finish: "regiment-gold",
    },

    metadata: {
      createdAt: now,

      updatedAt: now,

      canonVersion: "1.0.0",

      approved: false,
    },
  };
}

/*
 * =========================================================
 * Helpers
 * =========================================================
 */

export function touchDesign(
  design: HeraldDesign,
): HeraldDesign {
  return {
    ...design,

    metadata: {
      ...design.metadata,

      updatedAt:
        new Date().toISOString(),
    },
  };
}

export function approveDesign(
  design: HeraldDesign,
): HeraldDesign {
  return {
    ...touchDesign(design),

    metadata: {
      ...touchDesign(design)
        .metadata,

      approved: true,
    },
  };
}
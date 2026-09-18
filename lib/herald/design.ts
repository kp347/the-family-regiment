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

import {
  VISUAL_CANON_VERSION,
  createVisualCanonReferenceSnapshot,
  resolvePrimaryChargeReference,
  resolveShieldReference,
} from "./visualCanon";

import type {
  VisualCanonReference,
  VisualCanonReferenceSnapshot,
} from "./visualCanon";

/*
 * =========================================================
 * The Family Regiment
 * Herald Design
 * =========================================================
 *
 * Canonical representation of a family crest.
 *
 * Every downstream system consumes this model:
 *
 * - Builder
 * - SVG Renderer
 * - Crest Workshop
 * - Embroidery Validator
 * - Vendor Export
 * - Checkout
 * - Manufacturing
 *
 * Existing builder values remain intact for backward
 * compatibility.
 *
 * The design model additionally supports a four-quadrant
 * shield composition.
 *
 * Nothing should bypass this model.
 * =========================================================
 */

/*
 * =========================================================
 * Shield Composition
 * =========================================================
 *
 *        ┌─────────────┬─────────────┐
 *        │      I      │      II     │
 *        ├─────────────┼─────────────┤
 *        │     III     │      IV     │
 *        └─────────────┴─────────────┘
 *
 * Each quadrant is independently configurable.
 *
 * Empty quadrants are intentionally allowed.
 * =========================================================
 */

export type HeraldQuadrantId =
  | "I"
  | "II"
  | "III"
  | "IV";

export type HeraldQuadrantContentType =
  | "empty"
  | "heritage"
  | "animal"
  | "symbol"
  | "ordinary"
  | "family-branch"
  | "service"
  | "profession"
  | "custom";

export interface HeraldQuadrant {
  id: HeraldQuadrantId;

  /*
   * What kind of family information the quadrant
   * represents.
   */

  type: HeraldQuadrantContentType;

  /*
   * Human-readable builder label.
   *
   * Examples:
   *
   * "France"
   * "Lion"
   * "Fleur-de-lis"
   * "Courage"
   */

  label?: string;

  /*
   * Stable Visual Canon asset identity.
   *
   * This deliberately uses the existing Visual Canon
   * reference type rather than an unrestricted string.
   *
   * As new flags, symbols, ordinaries, etc. are admitted
   * into the Visual Canon, their stable IDs will be added
   * to VisualCanonAssetId in references.ts.
   */

  assetId?:
    VisualCanonReference["assetId"];

  /*
   * Optional controlled artwork variant.
   *
   * Example:
   *
   * lion / rampant
   */

  variantId?: string;

  /*
   * Human-readable heritage source when relevant.
   */

  heritage?: string;

  /*
   * Family meaning associated with this selection.
   */

  meaning?: string;
}

export interface HeraldShieldComposition {
  layout: "quartered";

  quadrants: [
    HeraldQuadrant,
    HeraldQuadrant,
    HeraldQuadrant,
    HeraldQuadrant,
  ];
}

/*
 * =========================================================
 * Frozen Quadrant Visual Canon Snapshot
 * =========================================================
 */

export interface HeraldQuadrantVisualCanon {
  quadrantId: HeraldQuadrantId;

  reference: VisualCanonReferenceSnapshot;
}

/*
 * =========================================================
 * Frozen Visual Canon Snapshot
 * =========================================================
 *
 * References are captured at design approval.
 *
 * This prevents later improvements to canonical artwork
 * from silently changing previously approved family crests.
 * =========================================================
 */

export interface HeraldDesignVisualCanon {
  shield?: VisualCanonReferenceSnapshot;

  primaryCharge?: VisualCanonReferenceSnapshot;

  secondaryCharge?: VisualCanonReferenceSnapshot;

  crest?: VisualCanonReferenceSnapshot;

  supporters: VisualCanonReferenceSnapshot[];

  /*
   * Canonical artwork used inside shield quadrants.
   *
   * Optional for backward compatibility with previously
   * approved designs.
   */

  quadrants?: HeraldQuadrantVisualCanon[];

  registryVersion: string;

  capturedAt: string;
}

/*
 * =========================================================
 * Herald Design
 * =========================================================
 */

export interface HeraldDesign {
  version: 1;

  familyName: string;

  /*
   * =======================================================
   * Legacy / Builder-Facing Values
   * =======================================================
   *
   * These remain intact so existing drafts, previews,
   * validators, and production code continue to work while
   * the new quadrant builder is introduced.
   */

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

  /*
   * =======================================================
   * Four-Quadrant Shield Composition
   * =======================================================
   *
   * Optional for backward compatibility.
   *
   * New builder designs can populate this while old saved
   * HeraldDesign records remain valid.
   */

  composition?: HeraldShieldComposition;

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

  /*
   * Frozen artwork identities captured at approval.
   */

  visualCanon?: HeraldDesignVisualCanon;

  metadata: {
    createdAt: string;

    updatedAt: string;

    canonVersion: string;

    approved: boolean;
  };
}

/*
 * =========================================================
 * Quadrant Factory
 * =========================================================
 */

export function createEmptyQuadrant(
  id: HeraldQuadrantId,
): HeraldQuadrant {
  return {
    id,

    type: "empty",
  };
}

export function createEmptyShieldComposition():
  HeraldShieldComposition {
  return {
    layout: "quartered",

    quadrants: [
      createEmptyQuadrant(
        "I",
      ),

      createEmptyQuadrant(
        "II",
      ),

      createEmptyQuadrant(
        "III",
      ),

      createEmptyQuadrant(
        "IV",
      ),
    ],
  };
}

/*
 * =========================================================
 * Design Factory
 * =========================================================
 */

export function createEmptyDesign(
  familyName: string,
): HeraldDesign {
  const now =
    new Date().toISOString();

  return {
    version: 1,

    familyName,

    shield:
      "Heater Shield",

    primaryCharge:
      "Lion",

    supporters: [],

    crown:
      "None",

    wreath:
      false,

    banner:
      true,

    motto: {
      latin: "",

      english: "",
    },

    colors: {
      primary:
        "#1F2A1F",

      secondary:
        "#E8D7AE",

      metallic:
        "gold",
    },

    /*
     * Every newly created design receives an available
     * four-quadrant composition.
     *
     * The quadrants begin empty.
     */

    composition:
      createEmptyShieldComposition(),

    patch: {
      border:
        "merrow",

      backing:
        "hook-loop",

      size: 4,
    },

    embroidery: {
      finish:
        "regiment-gold",
    },

    metadata: {
      createdAt:
        now,

      updatedAt:
        now,

      canonVersion:
        VISUAL_CANON_VERSION,

      approved:
        false,
    },
  };
}

/*
 * =========================================================
 * Canon Snapshot Helpers
 * =========================================================
 */

function snapshotPrimaryCharge(
  value:
    | string
    | undefined,
):
  | VisualCanonReferenceSnapshot
  | undefined {
  if (!value) {
    return undefined;
  }

  const reference =
    resolvePrimaryChargeReference(
      value,
    );

  if (!reference) {
    return undefined;
  }

  return createVisualCanonReferenceSnapshot(
    reference,
  );
}

function snapshotShield(
  value: string,
):
  | VisualCanonReferenceSnapshot
  | undefined {
  const reference =
    resolveShieldReference(
      value,
    );

  if (!reference) {
    return undefined;
  }

  return createVisualCanonReferenceSnapshot(
    reference,
  );
}

/*
 * =========================================================
 * Quadrant Snapshot
 * =========================================================
 */

function snapshotQuadrants(
  composition:
    | HeraldShieldComposition
    | undefined,
): HeraldQuadrantVisualCanon[] {
  if (!composition) {
    return [];
  }

  return composition.quadrants
    .map(
      (
        quadrant,
      ):
        | HeraldQuadrantVisualCanon
        | undefined => {
        if (
          !quadrant.assetId
        ) {
          return undefined;
        }

        /*
         * The existing Visual Canon API expects one
         * VisualCanonReference object.
         */

        const reference:
          VisualCanonReference =
          {
            assetId:
              quadrant.assetId,

            variantId:
              quadrant.variantId,
          };

        const snapshot =
          createVisualCanonReferenceSnapshot(
            reference,
          );

        if (!snapshot) {
          return undefined;
        }

        return {
          quadrantId:
            quadrant.id,

          reference:
            snapshot,
        };
      },
    )
    .filter(
      (
        snapshot,
      ): snapshot is HeraldQuadrantVisualCanon =>
        Boolean(
          snapshot,
        ),
    );
}

/*
 * =========================================================
 * Build Frozen Visual Canon Snapshot
 * =========================================================
 */

export function captureVisualCanonSnapshot(
  design: HeraldDesign,
): HeraldDesignVisualCanon {
  const supporters =
    design.supporters
      .map(
        (
          supporter,
        ) =>
          snapshotPrimaryCharge(
            supporter,
          ),
      )
      .filter(
        (
          snapshot,
        ): snapshot is VisualCanonReferenceSnapshot =>
          Boolean(
            snapshot,
          ),
      );

  const quadrants =
    snapshotQuadrants(
      design.composition,
    );

  return {
    shield:
      snapshotShield(
        design.shield,
      ),

    primaryCharge:
      snapshotPrimaryCharge(
        design.primaryCharge,
      ),

    secondaryCharge:
      snapshotPrimaryCharge(
        design.secondaryCharge,
      ),

    crest:
      snapshotPrimaryCharge(
        design.crest,
      ),

    supporters,

    quadrants,

    registryVersion:
      VISUAL_CANON_VERSION,

    capturedAt:
      new Date().toISOString(),
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

/*
 * =========================================================
 * Approval
 * =========================================================
 *
 * Approval freezes the currently selected reusable artwork
 * identities into the design.
 *
 * Design approval does NOT mean:
 *
 * - artwork is canon-certified
 * - physical sampling has occurred
 * - embroidery is automatically authorized
 * - bulk manufacturing is authorized
 *
 * Those remain separate production gates.
 * =========================================================
 */

export function approveDesign(
  design: HeraldDesign,
): HeraldDesign {
  const now =
    new Date().toISOString();

  const visualCanon =
    captureVisualCanonSnapshot(
      design,
    );

  return {
    ...design,

    visualCanon,

    metadata: {
      ...design.metadata,

      updatedAt:
        now,

      canonVersion:
        VISUAL_CANON_VERSION,

      approved:
        true,
    },
  };
}
// lib/herald/visualCanon/assets/shields.ts

import type { VisualCanonAsset } from "../types";

const CANON_VERSION = "1.0.0";

/*
 * =========================================================
 * The Family Regiment
 * Canonical Shield Families
 * =========================================================
 *
 * These establish reusable shield identities only.
 *
 * Existing preview geometry is NOT yet certified as
 * vendor-authoritative manufacturing artwork.
 * =========================================================
 */

export const shieldAssets: readonly VisualCanonAsset[] =
  Object.freeze([
    {
      id: "heater-shield",
      name: "Heater Shield",
      category: "shield",

      description:
        "A classic compact heraldic shield with broad shoulders and a tapered lower point. Intended as the principal traditional Family Regiment shield family.",

      canonVersion: CANON_VERSION,
      artworkVersion: "0.1.0",
      artworkFormat: "svg",

      dimensions: {
        viewBoxWidth: 200,
        viewBoxHeight: 220,
      },

      status: "draft",

      production: {
        supportedMethods: [
          "embroidery",
          "woven",
          "print",
          "digital",
        ],

        embroidery: {
          notes: [
            "Outer contour must remain clean at small patch sizes.",
            "Border thickness must be validated against merrow and embroidered-edge applications.",
            "Interior field must preserve adequate room for primary charges.",
          ],
        },

        complexity: 1,
        physicallySampled: false,
      },

      keywords: [
        "heater",
        "shield",
        "traditional",
        "medieval",
        "classic",
        "heraldry",
      ],

      heraldicNotes:
        "The heater form is broadly associated with medieval European heraldic display and provides a strong, familiar field for armorial composition.",

      productionNotes: [
        "Current preview geometry is not yet production-authoritative.",
      ],

      componentPath:
        "@/lib/herald/svg/shields/heater",
    },

    {
      id: "norman-shield",
      name: "Norman Shield",
      category: "shield",

      description:
        "An elongated shield family inspired by earlier medieval forms, with a narrow lower profile and strong vertical character.",

      canonVersion: CANON_VERSION,
      artworkVersion: "0.1.0",
      artworkFormat: "svg",

      dimensions: {
        viewBoxWidth: 180,
        viewBoxHeight: 240,
      },

      status: "draft",

      production: {
        supportedMethods: [
          "embroidery",
          "woven",
          "print",
          "digital",
        ],

        embroidery: {
          notes: [
            "Tall proportions require careful scaling when used on compact patches.",
            "Primary charge proportions must remain readable within the narrower lower field.",
            "Physical sampling is required before minimum size is established.",
          ],
        },

        complexity: 1,
        physicallySampled: false,
      },

      keywords: [
        "norman",
        "shield",
        "medieval",
        "elongated",
        "heritage",
      ],

      heraldicNotes:
        "This Family Regiment shield family references elongated medieval shield silhouettes without making claims regarding a specific family's documented historical arms.",

      productionNotes: [
        "Vertical proportions may require a larger finished crest than the heater shield.",
      ],

      componentPath:
        "@/lib/herald/svg/shields/norman",
    },

    {
      id: "tournament-shield",
      name: "Tournament Shield",
      category: "shield",

      description:
        "A stylized heraldic shield family with a more ceremonial profile intended for compositions requiring greater visual distinction.",

      canonVersion: CANON_VERSION,
      artworkVersion: "0.1.0",
      artworkFormat: "svg",

      dimensions: {
        viewBoxWidth: 200,
        viewBoxHeight: 220,
      },

      status: "draft",

      production: {
        supportedMethods: [
          "embroidery",
          "woven",
          "print",
          "digital",
        ],

        embroidery: {
          notes: [
            "Any concave or decorative contour transitions must remain stitchable.",
            "Small contour notches must not create fragile embroidery geometry.",
            "Border construction must be tested before certification.",
          ],
        },

        complexity: 2,
        physicallySampled: false,
      },

      keywords: [
        "tournament",
        "shield",
        "ceremonial",
        "heraldic",
        "ornamental",
      ],

      heraldicNotes:
        "Used by The Family Regiment as a stylistic shield family rather than as evidence of historical tournament entitlement or status.",

      productionNotes: [
        "Decorative contour complexity must remain subordinate to manufacturing clarity.",
      ],

      componentPath:
        "@/lib/herald/svg/shields/tournament",
    },

    {
      id: "crusader-shield",
      name: "Crusader Shield",
      category: "shield",

      description:
        "A broad medieval-inspired shield family with strong symmetrical geometry and substantial field area for bold crest compositions.",

      canonVersion: CANON_VERSION,
      artworkVersion: "0.1.0",
      artworkFormat: "svg",

      dimensions: {
        viewBoxWidth: 200,
        viewBoxHeight: 230,
      },

      status: "draft",

      production: {
        supportedMethods: [
          "embroidery",
          "woven",
          "print",
          "digital",
        ],

        embroidery: {
          notes: [
            "Broad field should support strong primary-charge readability.",
            "Lower point and border spacing require physical sample validation.",
            "Minimum finished dimensions have not yet been established.",
          ],
        },

        complexity: 1,
        physicallySampled: false,
      },

      keywords: [
        "crusader",
        "shield",
        "medieval",
        "broad",
        "heritage",
      ],

      heraldicNotes:
        "The name identifies a Family Regiment visual style only. Use does not imply historical participation in, descent from, or entitlement connected to the medieval Crusades.",

      productionNotes: [
        "Current naming should be reviewed before public launch to ensure it communicates style without unintended historical claims.",
      ],

      componentPath:
        "@/lib/herald/svg/shields/crusader",
    },
  ]);
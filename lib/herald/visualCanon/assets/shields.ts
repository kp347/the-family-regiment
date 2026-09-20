// lib/herald/visualCanon/assets/shields.ts

import type { VisualCanonAsset } from "../types";

const CANON_VERSION = "1.0.0";

/*
 * =========================================================
 * The Family Regiment
 * V1 Shield Visual Canon
 * =========================================================
 *
 * These records establish the five controlled shield
 * identities available to the standard Family Regiment
 * crest system.
 *
 * Status remains DRAFT until the corresponding artwork
 * passes visual review, production review, physical
 * sampling, and Canon certification.
 *
 * These records do not by themselves constitute
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
        "A classic compact heraldic shield with broad shoulders and a tapered lower point. The principal traditional Family Regiment shield family.",

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
            "Border thickness must be validated for embroidered and finished-edge applications.",
            "Interior field must preserve adequate room for quadrant composition and primary charges.",
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
        "The heater form provides a familiar traditional field for Family Regiment armorial composition.",

      productionNotes: [
        "Current artwork remains draft and is not vendor-authoritative.",
        "Final contour and border geometry require physical sample validation.",
      ],

      componentPath:
        "@/lib/herald/svg/shields/heater",
    },

    {
      id: "french-shield",
      name: "French Shield",
      category: "shield",

      description:
        "A broad heraldic shield with a generous field and distinctly shaped lower contour, providing a formal continental alternative within the Family Regiment Canon.",

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
            "Broad field should preserve strong quadrant readability.",
            "Lower contour must remain clean and recognizable at patch scale.",
            "Decorative elements shown in concept artwork must not be treated as structural shield geometry.",
          ],
        },

        complexity: 1,
        physicallySampled: false,
      },

      keywords: [
        "french",
        "shield",
        "continental",
        "formal",
        "heraldry",
      ],

      heraldicNotes:
        "The French shield expands the Canon with a broad continental heraldic silhouette while remaining independent of any claim to documented ancestral arms.",

      productionNotes: [
        "Any fleur-de-lis or ornamental treatment shown in concept imagery must remain a separate optional ornament rather than part of the shield silhouette.",
        "Current artwork remains draft and is not vendor-authoritative.",
      ],

      componentPath:
        "@/lib/herald/svg/shields/french",
    },

    {
      id: "norman-shield",
      name: "Norman Shield",
      category: "shield",

      description:
        "An elongated medieval-inspired shield with a narrow lower profile and strong vertical character.",

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
            "Tall proportions require careful scaling on compact patches.",
            "Primary charges and quadrant elements must remain readable within the narrower lower field.",
            "Physical sampling is required before minimum finished dimensions are established.",
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
        "Vertical proportions may require a larger finished crest than the Heater Shield.",
        "Current artwork remains draft and is not vendor-authoritative.",
      ],

      componentPath:
        "@/lib/herald/svg/shields/norman",
    },

    {
      id: "spanish-shield",
      name: "Spanish Shield",
      category: "shield",

      description:
        "A balanced heraldic shield with a rounded lower field, offering a softer and more architectural silhouette within the Family Regiment Canon.",

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
            "Rounded lower contour must remain symmetrical and visually balanced.",
            "Border thickness must remain consistent through curved transitions.",
            "Interior composition must preserve sufficient negative space near the lower field.",
          ],
        },

        complexity: 1,
        physicallySampled: false,
      },

      keywords: [
        "spanish",
        "shield",
        "rounded",
        "iberian",
        "heraldry",
      ],

      heraldicNotes:
        "The Spanish shield provides the Canon with a rounded Iberian-inspired heraldic silhouette without implying documented historical entitlement or ancestry.",

      productionNotes: [
        "Rounded geometry requires physical sampling to establish reliable border and stitch behavior.",
        "Current artwork remains draft and is not vendor-authoritative.",
      ],

      componentPath:
        "@/lib/herald/svg/shields/spanish",
    },

    {
      id: "targe-shield",
      name: "Targe",
      category: "shield",

      description:
        "A circular shield family inspired by the strong geometry of the targe, providing a distinctive round field for Family Regiment compositions.",

      canonVersion: CANON_VERSION,
      artworkVersion: "0.1.0",
      artworkFormat: "svg",

      dimensions: {
        viewBoxWidth: 200,
        viewBoxHeight: 200,
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
            "Circular outer geometry must remain true and balanced.",
            "Quadrant composition must be adapted carefully to the circular field.",
            "Any central boss or decorative hardware shown in concept imagery must remain separate from the structural shield geometry.",
          ],
        },

        complexity: 1,
        physicallySampled: false,
      },

      keywords: [
        "targe",
        "shield",
        "round",
        "circular",
        "scottish",
        "heritage",
      ],

      heraldicNotes:
        "The Targe gives the Family Regiment Canon a circular shield option with strong historical visual associations while making no claim regarding a family's documented historical arms.",

      productionNotes: [
        "A central boss shown in concept artwork is an optional ornament and must not be baked into the structural shield master.",
        "Circular field composition requires dedicated visual and physical sample review.",
        "Current artwork remains draft and is not vendor-authoritative.",
      ],

      componentPath:
        "@/lib/herald/svg/shields/targe",
    },
  ]);
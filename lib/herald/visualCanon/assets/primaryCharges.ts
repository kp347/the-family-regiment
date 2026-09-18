// lib/herald/visualCanon/assets/primaryCharges.ts

import type { VisualCanonAsset } from "../types";

const CANON_VERSION = "1.0.0";

export const primaryChargeAssets: VisualCanonAsset[] = [
  {
    id: "lion",
    name: "Lion",
    category: "primary-charge",

    description:
      "A heraldic lion representing courage, leadership, strength, valor, and protection.",

    canonVersion: CANON_VERSION,
    artworkVersion: "0.1.0",
    artworkFormat: "svg",

    dimensions: {
      viewBoxWidth: 200,
      viewBoxHeight: 200,
    },

    status: "draft",

    production: {
      supportedMethods: ["embroidery", "woven", "print", "digital"],

      embroidery: {
        notes: [
          "Maintain a strong heraldic silhouette.",
          "Preserve recognizable rampant posture.",
          "Keep limbs and claws visually distinct.",
          "Control mane detail for embroidery readability.",
          "Maintain sufficient negative space between major forms.",
        ],
      },

      complexity: 4,
      physicallySampled: false,
    },

    variants: [
      {
        id: "rampant",
        name: "Rampant",

        description:
          "The lion is shown upright on one hind leg with the forelegs raised in the traditional rampant posture.",

        status: "draft",

        production: {
          supportedMethods: ["embroidery", "woven", "print", "digital"],

          embroidery: {
            notes: [
              "Rampant posture must remain recognizable at quadrant scale.",
              "Claws, tail, mane, and raised limbs require controlled spacing.",
            ],
          },

          complexity: 4,
          physicallySampled: false,
        },
      },
    ],

    keywords: [
      "lion",
      "courage",
      "leadership",
      "strength",
      "valor",
      "protector",
      "guardian",
    ],

    heraldicNotes:
      "The lion is one of the most enduring heraldic charges and is traditionally associated with courage, strength, guardianship, and nobility of character.",

    productionNotes: [
      "Current artwork remains draft and is not vendor-authoritative.",
      "Final artwork must preserve a strong silhouette and readable rampant posture.",
      "Mane detail must remain visually rich without depending on extremely fine linework.",
    ],

    componentPath: "@/lib/herald/svg/animals/lion",
  },

  {
    id: "eagle",
    name: "Eagle",
    category: "primary-charge",

    description:
      "A heraldic eagle representing vision, vigilance, authority, freedom, and resolve.",

    canonVersion: CANON_VERSION,
    artworkVersion: "0.1.0",
    artworkFormat: "svg",

    dimensions: {
      viewBoxWidth: 200,
      viewBoxHeight: 200,
    },

    status: "draft",

    production: {
      supportedMethods: ["embroidery", "woven", "print", "digital"],

      embroidery: {
        notes: [
          "Wing silhouette must remain immediately recognizable.",
          "Feather detail must be simplified appropriately for patch scale.",
          "Head, beak, talons, and wing structure require clear separation.",
        ],
      },

      complexity: 4,
      physicallySampled: false,
    },

    keywords: [
      "eagle",
      "vision",
      "vigilance",
      "freedom",
      "authority",
      "resolve",
    ],

    heraldicNotes:
      "The eagle has long been used as a heraldic and civic symbol associated with elevated vision, vigilance, authority, and strength.",

    productionNotes: [
      "Feather structure must remain visually rich without introducing detail too fine for embroidery.",
      "Wing, head, beak, and talon silhouettes must remain immediately recognizable.",
    ],

    componentPath: "@/lib/herald/svg/animals/eagle",
  },

  {
    id: "wolf",
    name: "Wolf",
    category: "primary-charge",

    description:
      "A heraldic wolf representing loyalty, family bonds, guardianship, endurance, and instinct.",

    canonVersion: CANON_VERSION,
    artworkVersion: "0.1.0",
    artworkFormat: "svg",

    dimensions: {
      viewBoxWidth: 200,
      viewBoxHeight: 200,
    },

    status: "draft",

    production: {
      supportedMethods: ["embroidery", "woven", "print", "digital"],

      embroidery: {
        notes: [
          "Maintain a distinctive canine silhouette.",
          "Facial detail must remain legible without fine-line dependence.",
          "Fur detail should reinforce form rather than create visual noise.",
        ],
      },

      complexity: 3,
      physicallySampled: false,
    },

    keywords: [
      "wolf",
      "loyalty",
      "family",
      "guardianship",
      "endurance",
      "instinct",
    ],

    heraldicNotes:
      "Within the Family Regiment system, the wolf emphasizes loyalty to family, collective strength, vigilance, and endurance.",

    productionNotes: [
      "Final artwork must maintain a distinctive canine silhouette.",
      "Facial and fur detail must remain readable when embroidered at quadrant scale.",
    ],

    componentPath: "@/lib/herald/svg/animals/wolf",
  },

  {
    id: "bear",
    name: "Bear",
    category: "primary-charge",

    description:
      "A heraldic bear representing strength, protection, steadfastness, courage, and guardianship.",

    canonVersion: CANON_VERSION,
    artworkVersion: "0.1.0",
    artworkFormat: "svg",

    dimensions: {
      viewBoxWidth: 200,
      viewBoxHeight: 200,
    },

    status: "draft",

    production: {
      supportedMethods: ["embroidery", "woven", "print", "digital"],

      embroidery: {
        notes: [
          "Preserve the bear's heavy and powerful silhouette.",
          "Paws and facial structure must remain clear.",
          "Fur detail should be restrained for embroidery.",
        ],
      },

      complexity: 3,
      physicallySampled: false,
    },

    keywords: [
      "bear",
      "strength",
      "protection",
      "steadfastness",
      "courage",
      "guardian",
    ],

    heraldicNotes:
      "The bear provides a powerful symbol of physical strength, protection, endurance, and steadfast defense of family.",

    productionNotes: [
      "The bear must retain a strong mass and recognizable silhouette.",
      "Facial, paw, and fur detail should support the form without becoming dependent on fine embroidery lines.",
    ],

    componentPath: "@/lib/herald/svg/animals/bear",
  },

  {
    id: "stag",
    name: "Stag",
    category: "primary-charge",

    description:
      "A heraldic stag representing dignity, stewardship, renewal, heritage, and fortitude.",

    canonVersion: CANON_VERSION,
    artworkVersion: "0.1.0",
    artworkFormat: "svg",

    dimensions: {
      viewBoxWidth: 200,
      viewBoxHeight: 200,
    },

    status: "draft",

    production: {
      supportedMethods: ["embroidery", "woven", "print", "digital"],

      embroidery: {
        notes: [
          "Antlers require deliberate spacing.",
          "Avoid excessively thin antler branches.",
          "Maintain an elegant and recognizable body silhouette.",
        ],
      },

      complexity: 4,
      physicallySampled: false,
    },

    keywords: [
      "stag",
      "dignity",
      "stewardship",
      "renewal",
      "heritage",
      "fortitude",
    ],

    heraldicNotes:
      "The stag brings a quieter form of strength to the Canon, emphasizing dignity, stewardship, renewal, and continuity.",

    productionNotes: [
      "Antlers require deliberate spacing and simplification.",
      "The final silhouette must remain elegant and recognizable without relying on fragile linework.",
    ],

    componentPath: "@/lib/herald/svg/animals/stag",
  },

  {
    id: "griffin",
    name: "Griffin",
    category: "primary-charge",

    description:
      "A heraldic griffin representing guardianship, vigilance, courage, strength, and protection.",

    canonVersion: CANON_VERSION,
    artworkVersion: "0.1.0",
    artworkFormat: "svg",

    dimensions: {
      viewBoxWidth: 200,
      viewBoxHeight: 200,
    },

    status: "draft",

    production: {
      supportedMethods: ["embroidery", "woven", "print", "digital"],

      embroidery: {
        notes: [
          "The griffin must remain visually distinct from both the lion and eagle.",
          "Wing, beak, forelimb, hindquarter, and tail geometry require clear separation.",
          "Fine feather detail should be restrained at patch scale.",
        ],
      },

      complexity: 5,
      physicallySampled: false,
    },

    keywords: [
      "griffin",
      "guardian",
      "vigilance",
      "courage",
      "strength",
      "protection",
      "mythic",
    ],

    heraldicNotes:
      "The griffin combines the strength associated with the lion and the vigilance associated with the eagle, giving the Canon a deliberately mythic guardian figure.",

    productionNotes: [
      "Final artwork must clearly distinguish the griffin from both the lion and eagle.",
      "Wing, beak, forelimb, hindquarter, and tail geometry must remain readable at quadrant scale.",
    ],

    componentPath: "@/lib/herald/svg/animals/griffin",
  },

  {
    id: "salmon",
    name: "Salmon",
    category: "primary-charge",

    description:
      "A heraldic salmon representing perseverance, return, journey, continuity, and connection to heritage.",

    canonVersion: CANON_VERSION,
    artworkVersion: "0.1.0",
    artworkFormat: "svg",

    dimensions: {
      viewBoxWidth: 200,
      viewBoxHeight: 200,
    },

    status: "draft",

    production: {
      supportedMethods: ["embroidery", "woven", "print", "digital"],

      embroidery: {
        notes: [
          "Maintain a strong horizontal silhouette.",
          "Fins must remain readable without excessively thin geometry.",
          "Scale detail should remain subordinate to the overall fish form.",
        ],
      },

      complexity: 3,
      physicallySampled: false,
    },

    keywords: [
      "salmon",
      "perseverance",
      "return",
      "journey",
      "continuity",
      "heritage",
    ],

    heraldicNotes:
      "Within the Family Regiment system, the salmon emphasizes perseverance through difficult journeys, return to one's origins, and continuity across generations.",

    productionNotes: [
      "The salmon provides an important horizontal form within the animal Canon.",
      "Scale and fin detail must be restrained enough for embroidery while preserving an elegant flowing silhouette.",
    ],

    componentPath: "@/lib/herald/svg/animals/salmon",
  },
];
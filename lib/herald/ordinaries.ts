// lib/herald/ordinaries.ts

import type { CanonEntry } from "./types";

export const ORDINARY_CANON_VERSION = "1.0.0";

const chief: CanonEntry = {
  id: "chief",
  name: "Chief",
  category: "ordinary",

  summary:
    "A broad horizontal band occupying the upper portion of the shield, traditionally used as a prominent structural element in heraldic design.",

  traditionalAssociations: [
    "Leadership",
    "Authority",
    "Honor",
    "Responsibility",
  ],

  historicalNotes:
    "The chief is one of the principal ordinaries of heraldry. It occupies the upper portion of the shield and has historically provided a strong location for charges, distinctions, and secondary heraldic elements.",

  associatedVirtues: [
    "Leadership",
    "Honor",
    "Responsibility",
    "Duty",
  ],

  associatedThemes: [
    "Authority",
    "Service",
    "Command",
    "Family Leadership",
  ],

  relatedEntries: [
    "fess",
    "pale",
    "chevron",
    "lion",
    "eagle",
    "or",
    "argent",
  ],

  designGuidance:
    "The chief translates cleanly to embroidery because of its broad geometry. Maintain sufficient height for any charges placed within it.",

  keywords: [
    "chief",
    "upper",
    "band",
    "leadership",
    "authority",
    "command",
  ],

  canonVersion: ORDINARY_CANON_VERSION,
};

const fess: CanonEntry = {
  id: "fess",
  name: "Fess",
  category: "ordinary",

  summary:
    "A broad horizontal band across the center of the shield, traditionally serving as one of heraldry's principal structural divisions.",

  traditionalAssociations: [
    "Readiness",
    "Service",
    "Steadfastness",
    "Support",
  ],

  historicalNotes:
    "The fess is a principal ordinary formed as a horizontal band across the middle of the shield. Its strong central placement makes it useful for dividing fields or carrying prominent charges.",

  associatedVirtues: [
    "Duty",
    "Steadfastness",
    "Service",
    "Reliability",
  ],

  associatedThemes: [
    "Service",
    "Responsibility",
    "Continuity",
    "Support",
  ],

  relatedEntries: [
    "chief",
    "pale",
    "chevron",
    "lion",
    "eagle",
    "wolf",
  ],

  designGuidance:
    "The fess is highly embroidery-friendly. Broad proportions should be preserved so it remains distinct from a narrow stripe or decorative line.",

  keywords: [
    "fess",
    "horizontal",
    "band",
    "center",
    "service",
    "steadfastness",
  ],

  canonVersion: ORDINARY_CANON_VERSION,
};

const pale: CanonEntry = {
  id: "pale",
  name: "Pale",
  category: "ordinary",

  summary:
    "A vertical band running through the center of the shield, providing a strong axis of symmetry and structure.",

  traditionalAssociations: [
    "Strength",
    "Resolve",
    "Defense",
    "Steadfastness",
  ],

  historicalNotes:
    "The pale is one of the principal ordinaries and extends vertically from the top to the bottom of the shield. It provides a clear central structure and is often used to organize multiple charges.",

  associatedVirtues: [
    "Strength",
    "Resolve",
    "Discipline",
    "Steadfastness",
  ],

  associatedThemes: [
    "Defense",
    "Duty",
    "Order",
    "Continuity",
  ],

  relatedEntries: [
    "chief",
    "fess",
    "bend",
    "lion",
    "eagle",
    "sword",
  ],

  designGuidance:
    "The pale works well in embroidery and small patch formats because its geometry remains legible when reduced.",

  keywords: [
    "pale",
    "vertical",
    "band",
    "center",
    "strength",
    "resolve",
  ],

  canonVersion: ORDINARY_CANON_VERSION,
};

const bend: CanonEntry = {
  id: "bend",
  name: "Bend",
  category: "ordinary",

  summary:
    "A diagonal band crossing the shield, traditionally used to create movement, division, and visual direction.",

  traditionalAssociations: [
    "Defense",
    "Service",
    "Readiness",
    "Protection",
  ],

  historicalNotes:
    "The bend is a principal ordinary running diagonally across the shield. It is one of the most recognizable structural devices in heraldry and is frequently accompanied by charges or repeated as smaller bendlets.",

  associatedVirtues: [
    "Service",
    "Protection",
    "Readiness",
    "Duty",
  ],

  associatedThemes: [
    "Defense",
    "Military Service",
    "Movement",
    "Responsibility",
  ],

  relatedEntries: [
    "pale",
    "fess",
    "chevron",
    "sword",
    "lion",
  ],

  designGuidance:
    "Use a sufficiently broad diagonal band to prevent distortion during embroidery. Avoid overcrowding the band with detailed charges at small sizes.",

  keywords: [
    "bend",
    "diagonal",
    "band",
    "service",
    "defense",
    "protection",
  ],

  canonVersion: ORDINARY_CANON_VERSION,
};

const chevron: CanonEntry = {
  id: "chevron",
  name: "Chevron",
  category: "ordinary",

  summary:
    "An inverted V-shaped ordinary traditionally associated with structural support, protection, and steadfast service.",

  traditionalAssociations: [
    "Protection",
    "Support",
    "Service",
    "Steadfastness",
  ],

  historicalNotes:
    "The chevron is a principal ordinary formed by two diagonal bands meeting at an upper point. Its distinctive shape has made it one of the most enduring and recognizable heraldic divisions.",

  associatedVirtues: [
    "Protection",
    "Service",
    "Reliability",
    "Steadfastness",
  ],

  associatedThemes: [
    "Family Support",
    "Service",
    "Protection",
    "Construction",
    "Continuity",
  ],

  relatedEntries: [
    "chief",
    "fess",
    "bend",
    "lion",
    "stag",
    "oak-tree",
  ],

  designGuidance:
    "The chevron is extremely effective for patches because of its strong geometry. Preserve adequate spacing around the apex and between nearby charges.",

  keywords: [
    "chevron",
    "support",
    "protection",
    "service",
    "roof",
    "structure",
  ],

  canonVersion: ORDINARY_CANON_VERSION,
};

const cross: CanonEntry = {
  id: "cross",
  name: "Cross",
  category: "ordinary",

  summary:
    "A vertical and horizontal form intersecting at the center of the shield, widely used in heraldic, religious, civic, and military traditions.",

  traditionalAssociations: [
    "Faith",
    "Service",
    "Sacrifice",
    "Duty",
  ],

  historicalNotes:
    "The cross appears in numerous heraldic forms and regional traditions. It may function as an ordinary dividing the shield or as a standalone charge depending on proportion and treatment.",

  associatedVirtues: [
    "Faith",
    "Duty",
    "Service",
    "Sacrifice",
  ],

  associatedThemes: [
    "Faith",
    "Religious Heritage",
    "Military Service",
    "Sacrifice",
  ],

  relatedEntries: [
    "saltire",
    "chief",
    "fess",
    "sword",
    "argent",
    "gules",
  ],

  designGuidance:
    "Simple cross forms are highly suitable for embroidery. More complex cross variants should be simplified before use on small patches.",

  keywords: [
    "cross",
    "faith",
    "religion",
    "service",
    "sacrifice",
    "duty",
  ],

  canonVersion: ORDINARY_CANON_VERSION,
};

const saltire: CanonEntry = {
  id: "saltire",
  name: "Saltire",
  category: "ordinary",

  summary:
    "An X-shaped ordinary formed by two diagonal bands crossing through the shield.",

  traditionalAssociations: [
    "Strength",
    "Unity",
    "Service",
    "Resolve",
  ],

  historicalNotes:
    "The saltire is a principal heraldic ordinary formed by intersecting diagonal bands. It appears prominently in both familial and national heraldic traditions.",

  associatedVirtues: [
    "Unity",
    "Resolve",
    "Strength",
    "Service",
  ],

  associatedThemes: [
    "Unity",
    "Heritage",
    "Service",
    "National Tradition",
  ],

  relatedEntries: [
    "cross",
    "bend",
    "pale",
    "argent",
    "azure",
  ],

  designGuidance:
    "The saltire reproduces extremely well in embroidery due to its simple geometry. Ensure the crossing point remains visually centered and balanced.",

  keywords: [
    "saltire",
    "x",
    "diagonal",
    "unity",
    "strength",
    "heritage",
  ],

  canonVersion: ORDINARY_CANON_VERSION,
};

export const ordinaries: CanonEntry[] = [
  chief,
  fess,
  pale,
  bend,
  chevron,
  cross,
  saltire,
];

export const ordinaryById: Record<string, CanonEntry> =
  Object.fromEntries(
    ordinaries.map((ordinary) => [
      ordinary.id,
      ordinary,
    ]),
  );

export function getOrdinaryById(
  id: string,
): CanonEntry | undefined {
  return ordinaryById[id.trim().toLowerCase()];
}

export function searchOrdinaries(
  query: string,
): CanonEntry[] {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return ordinaries;
  }

  return ordinaries.filter((ordinary) => {
    const searchableText = [
      ordinary.id,
      ordinary.name,
      ordinary.summary,
      ...ordinary.traditionalAssociations,
      ...ordinary.associatedVirtues,
      ...ordinary.associatedThemes,
      ...(ordinary.keywords ?? []),
    ]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(normalizedQuery);
  });
}

export function findOrdinariesByVirtue(
  virtue: string,
): CanonEntry[] {
  const normalizedVirtue = virtue
    .trim()
    .toLowerCase();

  if (!normalizedVirtue) {
    return [];
  }

  return ordinaries.filter((ordinary) =>
    ordinary.associatedVirtues.some(
      (associatedVirtue) =>
        associatedVirtue.toLowerCase() ===
        normalizedVirtue,
    ),
  );
}
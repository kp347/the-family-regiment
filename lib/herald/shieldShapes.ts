// lib/herald/shieldShapes.ts

import type { CanonEntry } from "./types";

export const SHIELD_CANON_VERSION = "1.0.0";

const heater: CanonEntry = {
  id: "heater",

  name: "Heater Shield",

  category: "shield",

  summary:
    "The classic medieval shield form that became the foundation for much of European heraldic display.",

  traditionalAssociations: [
    "Tradition",
    "Chivalry",
    "Knightly Service",
    "Heritage",
  ],

  historicalNotes:
    "The heater shield emerged during the High Middle Ages and became one of the most recognizable heraldic shield forms. Because of its balanced proportions, it remains the standard presentation shape for many modern heraldic achievements.",

  associatedVirtues: [
    "Honor",
    "Service",
    "Tradition",
    "Stewardship",
  ],

  associatedThemes: [
    "Medieval Heritage",
    "European Heraldry",
    "Family Legacy",
    "Military Heritage",
  ],

  relatedEntries: [
    "lion",
    "eagle",
    "chevron",
    "chief",
    "or",
    "azure",
  ],

  designGuidance:
    "The heater shield provides the greatest usable design area while remaining highly recognizable. It is the preferred default shield for embroidered patches.",

  keywords: [
    "heater",
    "medieval",
    "knight",
    "shield",
    "traditional",
  ],

  canonVersion: SHIELD_CANON_VERSION,
};

const kite: CanonEntry = {
  id: "kite",

  name: "Norman Kite Shield",

  category: "shield",

  summary:
    "A long tapering shield associated with Norman military traditions and early medieval warfare.",

  traditionalAssociations: [
    "Protection",
    "Military Service",
    "Endurance",
    "Readiness",
  ],

  historicalNotes:
    "The kite shield appeared prominently during the Norman period and offered increased protection for mounted warriors. It remains an iconic historical form associated with early medieval Europe.",

  associatedVirtues: [
    "Protection",
    "Duty",
    "Service",
    "Endurance",
  ],

  associatedThemes: [
    "Norman Heritage",
    "Military Tradition",
    "Defense",
  ],

  relatedEntries: [
    "sword",
    "cross",
    "lion",
    "gules",
    "argent",
  ],

  designGuidance:
    "The elongated profile favors vertically oriented compositions and larger central charges.",

  keywords: [
    "kite",
    "norman",
    "medieval",
    "mounted",
    "shield",
  ],

  canonVersion: SHIELD_CANON_VERSION,
};

const spanish: CanonEntry = {
  id: "spanish",

  name: "Spanish Shield",

  category: "shield",

  summary:
    "A rounded shield form frequently associated with Iberian heraldic traditions and Renaissance display.",

  traditionalAssociations: [
    "Tradition",
    "Heritage",
    "Identity",
    "Continuity",
  ],

  historicalNotes:
    "Rounded shield forms became increasingly common throughout the Renaissance and remain widely used across Spanish and Latin heraldic traditions.",

  associatedVirtues: [
    "Identity",
    "Honor",
    "Continuity",
    "Stewardship",
  ],

  associatedThemes: [
    "Spanish Heritage",
    "Latin Heritage",
    "Family Legacy",
  ],

  relatedEntries: [
    "fleur-de-lis",
    "cross",
    "chief",
    "or",
    "gules",
  ],

  designGuidance:
    "The rounded base works well with symmetrical heraldic compositions and banner placement.",

  keywords: [
    "spanish",
    "iberian",
    "rounded",
    "renaissance",
    "shield",
  ],

  canonVersion: SHIELD_CANON_VERSION,
};

const round: CanonEntry = {
  id: "round",

  name: "Round Shield",

  category: "shield",

  summary:
    "A circular shield inspired by historical bucklers and round defensive shields.",

  traditionalAssociations: [
    "Defense",
    "Unity",
    "Protection",
    "Strength",
  ],

  historicalNotes:
    "Circular shields have appeared throughout many cultures and historical periods. Within The Family Regiment they provide an alternate presentation style while preserving heraldic principles.",

  associatedVirtues: [
    "Protection",
    "Unity",
    "Strength",
    "Service",
  ],

  associatedThemes: [
    "Military Heritage",
    "Defense",
    "Family Identity",
  ],

  relatedEntries: [
    "wolf",
    "bear",
    "cross",
    "sable",
    "vert",
  ],

  designGuidance:
    "Round shields are excellent for embroidered patches because the circular silhouette naturally fits patch production.",

  keywords: [
    "round",
    "buckler",
    "circle",
    "shield",
  ],

  canonVersion: SHIELD_CANON_VERSION,
};

export const shieldShapes: CanonEntry[] = [
  heater,
  kite,
  spanish,
  round,
];

export const shieldShapeById: Record<
  string,
  CanonEntry
> = Object.fromEntries(
  shieldShapes.map((shape) => [
    shape.id,
    shape,
  ]),
);

export function getShieldShapeById(
  id: string,
): CanonEntry | undefined {
  return shieldShapeById[
    id.trim().toLowerCase()
  ];
}

export function searchShieldShapes(
  query: string,
): CanonEntry[] {
  const normalized =
    query.trim().toLowerCase();

  if (!normalized) {
    return shieldShapes;
  }

  return shieldShapes.filter((shape) => {
    const searchable = [
      shape.id,
      shape.name,
      shape.summary,
      shape.historicalNotes,
      ...shape.traditionalAssociations,
      ...shape.associatedVirtues,
      ...shape.associatedThemes,
      ...(shape.keywords ?? []),
    ]
      .join(" ")
      .toLowerCase();

    return searchable.includes(normalized);
  });
}
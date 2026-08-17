// lib/herald/symbols.ts

import type { CanonEntry } from "./types";

export const SYMBOL_CANON_VERSION = "1.0.0";

const sword: CanonEntry = {
  id: "sword",
  name: "Sword",
  category: "symbol",

  summary:
    "A heraldic symbol traditionally associated with courage, justice, military service, defense, and readiness.",

  traditionalAssociations: [
    "Courage",
    "Justice",
    "Defense",
    "Service",
    "Readiness",
  ],

  historicalNotes:
    "Swords appear frequently in heraldic, military, civic, and religious imagery. Their interpretation depends on context, orientation, and surrounding elements, but they are commonly associated with martial service, defense, justice, and responsibility.",

  associatedVirtues: [
    "Courage",
    "Duty",
    "Justice",
    "Service",
    "Resolve",
  ],

  associatedThemes: [
    "Military Service",
    "Defense",
    "Justice",
    "Leadership",
    "Sacrifice",
  ],

  relatedEntries: [
    "lion",
    "eagle",
    "pale",
    "bend",
    "cross",
    "or",
    "argent",
  ],

  designGuidance:
    "Use a simplified blade, guard, grip, and pommel. At small patch sizes, avoid excessive engraving, ornament, or narrow interior lines.",

  keywords: [
    "sword",
    "military",
    "justice",
    "defense",
    "courage",
    "service",
    "weapon",
  ],

  canonVersion: SYMBOL_CANON_VERSION,
};

const oakTree: CanonEntry = {
  id: "oak-tree",
  name: "Oak Tree",
  category: "symbol",

  summary:
    "A symbol traditionally associated with strength, endurance, rootedness, continuity, and generational legacy.",

  traditionalAssociations: [
    "Strength",
    "Endurance",
    "Continuity",
    "Rootedness",
    "Longevity",
  ],

  historicalNotes:
    "The oak and oak tree appear across European heraldic and civic traditions. Their long life and physical strength make them especially suited to themes of permanence, land, lineage, endurance, and inherited responsibility.",

  associatedVirtues: [
    "Strength",
    "Endurance",
    "Stewardship",
    "Resilience",
    "Constancy",
  ],

  associatedThemes: [
    "Family Legacy",
    "Land",
    "Generational Continuity",
    "Nature",
    "Heritage",
  ],

  relatedEntries: [
    "stag",
    "vert",
    "or",
    "chevron",
    "acorn",
  ],

  designGuidance:
    "Use a strong trunk and simplified crown of foliage. Avoid attempting to render individual leaves on small embroidered patches.",

  keywords: [
    "oak",
    "tree",
    "strength",
    "roots",
    "legacy",
    "family",
    "land",
    "continuity",
  ],

  canonVersion: SYMBOL_CANON_VERSION,
};

const fleurDeLis: CanonEntry = {
  id: "fleur-de-lis",
  name: "Fleur-de-lis",
  category: "symbol",

  summary:
    "A stylized lily form strongly associated with French heraldic tradition and historically used in dynastic, civic, and religious contexts.",

  traditionalAssociations: [
    "Heritage",
    "Dignity",
    "Tradition",
    "Faith",
    "Continuity",
  ],

  historicalNotes:
    "The fleur-de-lis is one of the most recognizable symbols associated with French heraldic tradition. Its historical use spans royal, noble, civic, religious, and regional contexts, so its meaning should be interpreted according to the specific family and historical setting.",

  associatedVirtues: [
    "Dignity",
    "Faith",
    "Continuity",
    "Stewardship",
  ],

  associatedThemes: [
    "French Heritage",
    "Dynastic Tradition",
    "Faith",
    "Family Legacy",
  ],

  relatedEntries: [
    "or",
    "azure",
    "argent",
    "crown",
    "lion",
  ],

  designGuidance:
    "The fleur-de-lis is highly suitable for embroidery. Preserve its three-lobed silhouette and avoid excessive internal ornament at small sizes.",

  keywords: [
    "fleur-de-lis",
    "fleur de lis",
    "France",
    "French",
    "lily",
    "heritage",
    "tradition",
  ],

  canonVersion: SYMBOL_CANON_VERSION,
};

const anchor: CanonEntry = {
  id: "anchor",
  name: "Anchor",
  category: "symbol",

  summary:
    "A symbol traditionally associated with steadfastness, hope, maritime service, security, and constancy.",

  traditionalAssociations: [
    "Hope",
    "Steadfastness",
    "Security",
    "Constancy",
    "Maritime Service",
  ],

  historicalNotes:
    "Anchors appear in maritime, naval, civic, religious, and familial heraldic traditions. They may represent seafaring professions, naval service, coastal heritage, stability, or hope depending on context.",

  associatedVirtues: [
    "Steadfastness",
    "Hope",
    "Service",
    "Constancy",
    "Reliability",
  ],

  associatedThemes: [
    "Naval Service",
    "Maritime Heritage",
    "Travel",
    "Security",
    "Faith",
  ],

  relatedEntries: [
    "azure",
    "argent",
    "or",
    "rope",
    "eagle",
  ],

  designGuidance:
    "Anchors translate extremely well to embroidery. Use thick flukes, a clear shank, and simplified stock geometry.",

  keywords: [
    "anchor",
    "navy",
    "naval",
    "maritime",
    "sea",
    "steadfastness",
    "hope",
  ],

  canonVersion: SYMBOL_CANON_VERSION,
};

const tower: CanonEntry = {
  id: "tower",
  name: "Tower",
  category: "symbol",

  summary:
    "A fortified structure traditionally associated with defense, vigilance, strength, security, and steadfast protection.",

  traditionalAssociations: [
    "Defense",
    "Strength",
    "Security",
    "Vigilance",
    "Protection",
  ],

  historicalNotes:
    "Towers and castles are common architectural elements in heraldry. They may reflect fortified places, geographic identity, civic history, defense, or enduring strength.",

  associatedVirtues: [
    "Protection",
    "Strength",
    "Vigilance",
    "Duty",
    "Resolve",
  ],

  associatedThemes: [
    "Defense",
    "Homeland",
    "Security",
    "Military Service",
    "Civic Heritage",
  ],

  relatedEntries: [
    "castle",
    "sable",
    "argent",
    "gules",
    "sword",
  ],

  designGuidance:
    "Use a simplified silhouette with clearly defined battlements and one or two openings. Avoid detailed masonry patterns on small patches.",

  keywords: [
    "tower",
    "castle",
    "fortress",
    "defense",
    "security",
    "protection",
    "strength",
  ],

  canonVersion: SYMBOL_CANON_VERSION,
};

const star: CanonEntry = {
  id: "star",
  name: "Star",
  category: "symbol",

  summary:
    "A celestial symbol commonly associated with aspiration, guidance, honor, hope, and distinction.",

  traditionalAssociations: [
    "Guidance",
    "Aspiration",
    "Hope",
    "Honor",
    "Distinction",
  ],

  historicalNotes:
    "Stars appear in many heraldic traditions in several forms and point configurations. Interpretation varies by tradition, but stars commonly function as highly visible marks of distinction, celestial reference, guidance, or aspiration.",

  associatedVirtues: [
    "Hope",
    "Guidance",
    "Honor",
    "Ambition",
    "Constancy",
  ],

  associatedThemes: [
    "Achievement",
    "Navigation",
    "Faith",
    "National Heritage",
    "Aspiration",
  ],

  relatedEntries: [
    "azure",
    "or",
    "argent",
    "eagle",
  ],

  designGuidance:
    "Simple five- or six-pointed star forms reproduce very well in embroidery. Keep points broad enough to avoid thread crowding.",

  keywords: [
    "star",
    "mullet",
    "guidance",
    "hope",
    "achievement",
    "aspiration",
  ],

  canonVersion: SYMBOL_CANON_VERSION,
};

const key: CanonEntry = {
  id: "key",
  name: "Key",
  category: "symbol",

  summary:
    "A symbol traditionally associated with trust, guardianship, authority, responsibility, and access.",

  traditionalAssociations: [
    "Trust",
    "Authority",
    "Guardianship",
    "Responsibility",
    "Knowledge",
  ],

  historicalNotes:
    "Keys appear in ecclesiastical, civic, familial, and institutional heraldry. They can indicate entrusted authority, guardianship, access, office, or spiritual associations depending on context.",

  associatedVirtues: [
    "Trust",
    "Responsibility",
    "Stewardship",
    "Duty",
    "Wisdom",
  ],

  associatedThemes: [
    "Guardianship",
    "Leadership",
    "Knowledge",
    "Institutional Service",
    "Faith",
  ],

  relatedEntries: [
    "or",
    "argent",
    "cross",
    "tower",
  ],

  designGuidance:
    "Use a large bow, strong shaft, and simplified bit. Fine ornamental key designs should be avoided for small patches.",

  keywords: [
    "key",
    "trust",
    "guardianship",
    "authority",
    "access",
    "knowledge",
  ],

  canonVersion: SYMBOL_CANON_VERSION,
};

const torch: CanonEntry = {
  id: "torch",
  name: "Torch",
  category: "symbol",

  summary:
    "A symbol commonly associated with knowledge, education, guidance, enlightenment, service, and the passing of knowledge between generations.",

  traditionalAssociations: [
    "Knowledge",
    "Guidance",
    "Enlightenment",
    "Education",
    "Continuity",
  ],

  historicalNotes:
    "The torch is prominent in civic, academic, institutional, and military symbolism. Its flame makes it particularly effective for themes involving learning, guidance, remembrance, and transmission across generations.",

  associatedVirtues: [
    "Wisdom",
    "Service",
    "Guidance",
    "Stewardship",
    "Learning",
  ],

  associatedThemes: [
    "Education",
    "Knowledge",
    "Generational Legacy",
    "Leadership",
    "Service",
  ],

  relatedEntries: [
    "or",
    "gules",
    "argent",
    "star",
    "book",
  ],

  designGuidance:
    "Use a bold flame silhouette with minimal internal flame layers. The handle should remain thick enough for clean stitching.",

  keywords: [
    "torch",
    "knowledge",
    "education",
    "learning",
    "guidance",
    "legacy",
    "flame",
  ],

  canonVersion: SYMBOL_CANON_VERSION,
};

export const symbols: CanonEntry[] = [
  sword,
  oakTree,
  fleurDeLis,
  anchor,
  tower,
  star,
  key,
  torch,
];

export const symbolById: Record<string, CanonEntry> =
  Object.fromEntries(
    symbols.map((symbol) => [symbol.id, symbol]),
  );

export function getSymbolById(
  id: string,
): CanonEntry | undefined {
  return symbolById[id.trim().toLowerCase()];
}

export function searchSymbols(
  query: string,
): CanonEntry[] {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return symbols;
  }

  return symbols.filter((symbol) => {
    const searchableText = [
      symbol.id,
      symbol.name,
      symbol.summary,
      ...symbol.traditionalAssociations,
      ...symbol.associatedVirtues,
      ...symbol.associatedThemes,
      ...(symbol.keywords ?? []),
    ]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(normalizedQuery);
  });
}

export function findSymbolsByVirtue(
  virtue: string,
): CanonEntry[] {
  const normalizedVirtue = virtue
    .trim()
    .toLowerCase();

  if (!normalizedVirtue) {
    return [];
  }

  return symbols.filter((symbol) =>
    symbol.associatedVirtues.some(
      (associatedVirtue) =>
        associatedVirtue.toLowerCase() ===
        normalizedVirtue,
    ),
  );
}
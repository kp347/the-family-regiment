 // lib/herald/mottos.ts

import type { CanonEntry } from "./types";

export const MOTTO_CANON_VERSION = "1.0.0";

const fortitude: CanonEntry = {
  id: "motto-fortitude",
  name: "Fortitude",
  category: "motto",

  summary:
    "A motto tradition centered on courage, endurance, resolve, and remaining steadfast under difficulty.",

  traditionalAssociations: [
    "Courage",
    "Endurance",
    "Resolve",
    "Strength",
  ],

  historicalNotes:
    "Heraldic mottos frequently express ideals rather than literal family history. Fortitude-oriented mottos emphasize perseverance, courage, constancy, and the willingness to endure hardship in service of family, duty, or principle.",

  associatedVirtues: [
    "Courage",
    "Endurance",
    "Resolve",
    "Constancy",
  ],

  associatedThemes: [
    "Military Service",
    "Resilience",
    "Family Strength",
    "Duty",
  ],

  relatedEntries: [
    "lion",
    "bear",
    "sable",
    "gules",
    "sword",
  ],

  designGuidance:
    "Favor short motto forms that remain readable when embroidered. Avoid long phrases with complex punctuation.",

  keywords: [
    "fortitude",
    "courage",
    "strength",
    "endurance",
    "resolve",
    "steadfast",
  ],

  canonVersion: MOTTO_CANON_VERSION,
};

const familyUnity: CanonEntry = {
  id: "motto-family-unity",
  name: "Family Unity",
  category: "motto",

  summary:
    "A motto tradition centered on family bonds, loyalty, mutual support, shared identity, and continuity across generations.",

  traditionalAssociations: [
    "Unity",
    "Loyalty",
    "Continuity",
    "Family",
    "Stewardship",
  ],

  historicalNotes:
    "Mottos expressing unity and family continuity are well suited to modern family heraldry because they communicate a shared principle without asserting undocumented historical claims.",

  associatedVirtues: [
    "Unity",
    "Loyalty",
    "Stewardship",
    "Constancy",
  ],

  associatedThemes: [
    "Family Legacy",
    "Generational Continuity",
    "Kinship",
    "Belonging",
  ],

  relatedEntries: [
    "oak-tree",
    "wolf",
    "torse",
    "azure",
    "chevron",
  ],

  designGuidance:
    "Use concise wording that can fit comfortably on a motto scroll beneath or around the achievement.",

  keywords: [
    "family",
    "unity",
    "together",
    "loyalty",
    "kinship",
    "legacy",
  ],

  canonVersion: MOTTO_CANON_VERSION,
};

const service: CanonEntry = {
  id: "motto-service",
  name: "Service",
  category: "motto",

  summary:
    "A motto tradition centered on duty, responsibility, protection, sacrifice, and service beyond oneself.",

  traditionalAssociations: [
    "Duty",
    "Service",
    "Sacrifice",
    "Responsibility",
    "Protection",
  ],

  historicalNotes:
    "Service-oriented mottos are especially appropriate where a Family Record contains military, civic, professional, religious, or community service. They should reflect documented family values rather than imply honors or offices not actually held.",

  associatedVirtues: [
    "Duty",
    "Service",
    "Honor",
    "Responsibility",
  ],

  associatedThemes: [
    "Military Service",
    "Public Service",
    "Family Duty",
    "Leadership",
  ],

  relatedEntries: [
    "sword",
    "anchor",
    "chief",
    "cross",
    "gules",
  ],

  designGuidance:
    "Strong imperative or declarative phrases work well. Keep wording compact enough for embroidery and engraving.",

  keywords: [
    "service",
    "duty",
    "honor",
    "sacrifice",
    "responsibility",
    "protect",
  ],

  canonVersion: MOTTO_CANON_VERSION,
};

const legacy: CanonEntry = {
  id: "motto-legacy",
  name: "Legacy",
  category: "motto",

  summary:
    "A motto tradition centered on inheritance, stewardship, continuity, remembrance, and passing values forward.",

  traditionalAssociations: [
    "Legacy",
    "Continuity",
    "Stewardship",
    "Inheritance",
    "Remembrance",
  ],

  historicalNotes:
    "Legacy-centered mottos express responsibility toward both ancestors and future generations. They are particularly aligned with family heraldry that emphasizes preservation rather than claims of status.",

  associatedVirtues: [
    "Stewardship",
    "Constancy",
    "Responsibility",
    "Honor",
  ],

  associatedThemes: [
    "Family Legacy",
    "Generational Continuity",
    "Inheritance",
    "Preservation",
  ],

  relatedEntries: [
    "oak-tree",
    "stag",
    "or",
    "torse",
    "crest-banner",
  ],

  designGuidance:
    "Prefer phrases of approximately two to five words for strong visual balance on banners and patches.",

  keywords: [
    "legacy",
    "inheritance",
    "future",
    "generations",
    "preserve",
    "stewardship",
  ],

  canonVersion: MOTTO_CANON_VERSION,
};

const faith: CanonEntry = {
  id: "motto-faith",
  name: "Faith",
  category: "motto",

  summary:
    "A motto tradition centered on faith, trust, devotion, spiritual commitment, and moral constancy.",

  traditionalAssociations: [
    "Faith",
    "Devotion",
    "Trust",
    "Hope",
    "Constancy",
  ],

  historicalNotes:
    "Religious and spiritual mottos have a long presence in heraldic traditions. Within The Family Regiment, faith-based recommendations should only be made when the Family Record provides a clear basis for doing so.",

  associatedVirtues: [
    "Faith",
    "Hope",
    "Devotion",
    "Constancy",
  ],

  associatedThemes: [
    "Religious Heritage",
    "Spiritual Identity",
    "Family Values",
    "Service",
  ],

  relatedEntries: [
    "cross",
    "anchor",
    "argent",
    "azure",
    "torch",
  ],

  designGuidance:
    "Avoid overly long theological phrases for embroidered products. Short statements preserve both readability and dignity.",

  keywords: [
    "faith",
    "hope",
    "devotion",
    "trust",
    "spiritual",
    "religion",
  ],

  canonVersion: MOTTO_CANON_VERSION,
};

const honor: CanonEntry = {
  id: "motto-honor",
  name: "Honor",
  category: "motto",

  summary:
    "A motto tradition centered on integrity, dignity, responsibility, reputation, and principled conduct.",

  traditionalAssociations: [
    "Honor",
    "Integrity",
    "Dignity",
    "Responsibility",
    "Truth",
  ],

  historicalNotes:
    "Honor-based mottos communicate an ethical standard or family principle. They should describe an aspiration or value rather than imply formal rank, award, or inherited privilege.",

  associatedVirtues: [
    "Honor",
    "Integrity",
    "Truth",
    "Responsibility",
  ],

  associatedThemes: [
    "Family Values",
    "Leadership",
    "Service",
    "Reputation",
  ],

  relatedEntries: [
    "or",
    "argent",
    "lion",
    "chief",
    "key",
  ],

  designGuidance:
    "Short declarative wording is preferred. Avoid ornamental phrasing that obscures the core family principle.",

  keywords: [
    "honor",
    "integrity",
    "truth",
    "dignity",
    "principle",
    "character",
  ],

  canonVersion: MOTTO_CANON_VERSION,
};

const perseverance: CanonEntry = {
  id: "motto-perseverance",
  name: "Perseverance",
  category: "motto",

  summary:
    "A motto tradition centered on persistence, resilience, endurance, and continuing forward despite adversity.",

  traditionalAssociations: [
    "Perseverance",
    "Resilience",
    "Endurance",
    "Determination",
  ],

  historicalNotes:
    "Perseverance themes are appropriate where family histories emphasize migration, hardship, rebuilding, service, work, or sustained commitment across generations.",

  associatedVirtues: [
    "Perseverance",
    "Resilience",
    "Endurance",
    "Resolve",
  ],

  associatedThemes: [
    "Migration",
    "Adversity",
    "Family Strength",
    "Generational Progress",
  ],

  relatedEntries: [
    "wolf",
    "bear",
    "stag",
    "sable",
    "vert",
  ],

  designGuidance:
    "Use compact language with strong rhythm. This theme works particularly well with short Latin or English motto constructions.",

  keywords: [
    "perseverance",
    "resilience",
    "endure",
    "persist",
    "overcome",
    "determination",
  ],

  canonVersion: MOTTO_CANON_VERSION,
};

const wisdom: CanonEntry = {
  id: "motto-wisdom",
  name: "Wisdom",
  category: "motto",

  summary:
    "A motto tradition centered on learning, judgment, knowledge, reflection, and passing understanding between generations.",

  traditionalAssociations: [
    "Wisdom",
    "Knowledge",
    "Judgment",
    "Learning",
    "Guidance",
  ],

  historicalNotes:
    "Mottos emphasizing wisdom and learning are particularly appropriate for families whose records highlight education, scholarship, teaching, leadership, or the transmission of knowledge.",

  associatedVirtues: [
    "Wisdom",
    "Learning",
    "Judgment",
    "Guidance",
  ],

  associatedThemes: [
    "Education",
    "Knowledge",
    "Generational Teaching",
    "Leadership",
  ],

  relatedEntries: [
    "torch",
    "key",
    "star",
    "azure",
    "argent",
  ],

  designGuidance:
    "Use simple wording that remains intelligible without requiring extensive explanation. Avoid obscure quotations unless historically documented for the family.",

  keywords: [
    "wisdom",
    "knowledge",
    "learning",
    "education",
    "guidance",
    "judgment",
  ],

  canonVersion: MOTTO_CANON_VERSION,
};

export const mottos: CanonEntry[] = [
  fortitude,
  familyUnity,
  service,
  legacy,
  faith,
  honor,
  perseverance,
  wisdom,
];

export const mottoById: Record<string, CanonEntry> =
  Object.fromEntries(
    mottos.map((motto) => [
      motto.id,
      motto,
    ]),
  );

export function getMottoById(
  id: string,
): CanonEntry | undefined {
  return mottoById[
    id.trim().toLowerCase()
  ];
}

export function searchMottos(
  query: string,
): CanonEntry[] {
  const normalizedQuery =
    query.trim().toLowerCase();

  if (!normalizedQuery) {
    return mottos;
  }

  return mottos.filter((motto) => {
    const searchableText = [
      motto.id,
      motto.name,
      motto.summary,
      motto.historicalNotes,
      ...motto.traditionalAssociations,
      ...motto.associatedVirtues,
      ...motto.associatedThemes,
      ...(motto.keywords ?? []),
    ]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(
      normalizedQuery,
    );
  });
}

export function findMottosByVirtue(
  virtue: string,
): CanonEntry[] {
  const normalizedVirtue =
    virtue.trim().toLowerCase();

  if (!normalizedVirtue) {
    return [];
  }

  return mottos.filter((motto) =>
    motto.associatedVirtues.some(
      (associatedVirtue) =>
        associatedVirtue.toLowerCase() ===
        normalizedVirtue,
    ),
  );
}

export function findMottosByTheme(
  theme: string,
): CanonEntry[] {
  const normalizedTheme =
    theme.trim().toLowerCase();

  if (!normalizedTheme) {
    return [];
  }

  return mottos.filter((motto) =>
    motto.associatedThemes.some(
      (associatedTheme) =>
        associatedTheme.toLowerCase() ===
        normalizedTheme,
    ),
  );
}
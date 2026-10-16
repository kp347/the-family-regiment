// lib/herald/mottos.ts

/*
 * =========================================================
 * The Family Regiment
 * Motto Semantic Canon
 * =========================================================
 *
 * This file defines the semantic taxonomy used to interpret
 * family values and determine what KIND of motto fits.
 *
 * It does NOT contain customer-selectable Latin phrases.
 *
 * Semantic Canon:
 *   lib/herald/mottos.ts
 *
 * Approved Latin Phrase Library:
 *   lib/herald/motto.ts
 *
 * Intended pipeline:
 *
 * Family Story
 *   -> Semantic Motto Theme
 *   -> Approved Latin Phrase
 *   -> Rocker Fit
 *   -> Customer Selection
 *
 * AI may interpret a family story and rank semantic themes.
 * Customer-facing Latin should come from the approved phrase
 * library whenever possible.
 * =========================================================
 */

export const MOTTO_CANON_VERSION =
  "1.0.0";

export interface MottoCanonEntry {
  /*
   * Stable machine-readable semantic ID.
   *
   * These IDs correspond to the major theme vocabulary
   * used by the approved Latin phrase library.
   */

  id: string;

  /*
   * Customer/internal human-readable theme name.
   */

  name: string;

  /*
   * Short explanation of the theme.
   */

  summary: string;

  /*
   * Historical or traditional concepts commonly connected
   * with the theme.
   */

  traditionalAssociations: string[];

  /*
   * Internal contextual guidance.
   *
   * This should never be interpreted as proof that a
   * particular family historically used a given symbol
   * or motto.
   */

  historicalNotes: string;

  /*
   * Character qualities associated with this theme.
   */

  associatedVirtues: string[];

  /*
   * Broader concepts that may appear in family stories.
   */

  associatedThemes: string[];

  /*
   * IDs of related semantic Canon entries.
   */

  relatedEntries: string[];

  /*
   * Guidance for translating the semantic theme into
   * heraldic presentation without overcrowding the crest.
   */

  designGuidance: string;

  /*
   * Search and recommendation vocabulary.
   */

  keywords: string[];

  /*
   * Semantic Canon version.
   */

  canonVersion: string;
}

/*
 * =========================================================
 * Semantic Motto Canon
 * =========================================================
 */

export const mottos: MottoCanonEntry[] = [
  {
    id: "fortitude",
    name: "Fortitude",
    summary:
      "Courage, strength, and steadiness in the face of adversity.",
    traditionalAssociations: [
      "Courage under pressure",
      "Strength of character",
      "Defense of family",
      "Military resolve",
      "Steadfast leadership",
    ],
    historicalNotes:
      "Fortitude is a longstanding heraldic and moral theme associated with courage, endurance, and the ability to remain steadfast through hardship.",
    associatedVirtues: [
      "Courage",
      "Bravery",
      "Strength",
      "Resolve",
      "Leadership",
    ],
    associatedThemes: [
      "Adversity",
      "Protection",
      "Duty",
      "Resilience",
      "Victory",
    ],
    relatedEntries: [
      "perseverance",
      "honor",
      "service",
    ],
    designGuidance:
      "Favor strong, disciplined heraldic imagery. Lions, bears, eagles, fortified forms, and restrained martial symbolism are appropriate when supported by the family story.",
    keywords: [
      "fortitude",
      "courage",
      "bravery",
      "strength",
      "resolve",
      "boldness",
      "leadership",
      "protection",
      "resilience",
      "adversity",
    ],
    canonVersion:
      MOTTO_CANON_VERSION,
  },

  {
    id: "family-unity",
    name: "Family Unity",
    summary:
      "Kinship, loyalty, mutual support, and strength through family bonds.",
    traditionalAssociations: [
      "Family loyalty",
      "Shared identity",
      "Kinship",
      "Mutual protection",
      "Generational bonds",
    ],
    historicalNotes:
      "Family unity reflects the idea that a house, lineage, or family derives strength from loyalty, shared responsibility, and continuity across generations.",
    associatedVirtues: [
      "Loyalty",
      "Love",
      "Unity",
      "Devotion",
      "Fidelity",
    ],
    associatedThemes: [
      "Family",
      "Home",
      "Kinship",
      "Belonging",
      "Togetherness",
    ],
    relatedEntries: [
      "legacy",
      "honor",
      "service",
    ],
    designGuidance:
      "Favor symbolism that communicates a single house or family acting together. Keep the primary crest unified rather than dividing the composition into competing personal identities.",
    keywords: [
      "family",
      "unity",
      "kinship",
      "loyalty",
      "love",
      "home",
      "together",
      "belonging",
      "fidelity",
      "devotion",
    ],
    canonVersion:
      MOTTO_CANON_VERSION,
  },

  {
    id: "service",
    name: "Service",
    summary:
      "Duty, contribution, sacrifice, and responsibility to something greater than oneself.",
    traditionalAssociations: [
      "Public service",
      "Military service",
      "Community responsibility",
      "Sacrifice",
      "Duty",
    ],
    historicalNotes:
      "Service themes traditionally emphasize action, responsibility, discipline, and contribution to family, community, country, or a larger cause.",
    associatedVirtues: [
      "Duty",
      "Service",
      "Sacrifice",
      "Discipline",
      "Responsibility",
    ],
    associatedThemes: [
      "Community",
      "Country",
      "Protection",
      "Action",
      "Commitment",
    ],
    relatedEntries: [
      "honor",
      "fortitude",
      "family-unity",
    ],
    designGuidance:
      "Use disciplined, restrained imagery. Service symbolism should reinforce the family story without turning the family crest into a catalog of occupations or military units.",
    keywords: [
      "service",
      "duty",
      "sacrifice",
      "community",
      "country",
      "responsibility",
      "discipline",
      "action",
      "commitment",
      "protection",
    ],
    canonVersion:
      MOTTO_CANON_VERSION,
  },

  {
    id: "legacy",
    name: "Legacy",
    summary:
      "Inheritance, continuity, achievement, and what a family passes forward.",
    traditionalAssociations: [
      "Generational continuity",
      "Inheritance",
      "Ancestry",
      "Achievement",
      "Future generations",
    ],
    historicalNotes:
      "Legacy connects the achievements and values of earlier generations with the responsibility to preserve, strengthen, and pass them forward.",
    associatedVirtues: [
      "Stewardship",
      "Ambition",
      "Responsibility",
      "Continuity",
      "Purpose",
    ],
    associatedThemes: [
      "Ancestry",
      "Future",
      "Generations",
      "Achievement",
      "Heritage",
    ],
    relatedEntries: [
      "family-unity",
      "wisdom",
      "perseverance",
    ],
    designGuidance:
      "Favor enduring heraldic forms and symbols with generational meaning. Legacy should feel established and forward-looking rather than nostalgic or ornamental.",
    keywords: [
      "legacy",
      "heritage",
      "ancestry",
      "future",
      "generation",
      "generations",
      "inheritance",
      "achievement",
      "continuity",
      "stewardship",
    ],
    canonVersion:
      MOTTO_CANON_VERSION,
  },

  {
    id: "faith",
    name: "Faith",
    summary:
      "Belief, devotion, hope, trust, and spiritual conviction.",
    traditionalAssociations: [
      "Religious devotion",
      "Spiritual conviction",
      "Hope",
      "Trust",
      "Guidance",
    ],
    historicalNotes:
      "Faith has a deep historical relationship with heraldry and family mottos. Its use should reflect the family's stated beliefs rather than being inferred from unrelated heritage.",
    associatedVirtues: [
      "Faith",
      "Hope",
      "Devotion",
      "Trust",
      "Humility",
    ],
    associatedThemes: [
      "Spirituality",
      "Light",
      "Guidance",
      "Providence",
      "Belief",
    ],
    relatedEntries: [
      "wisdom",
      "fortitude",
      "perseverance",
    ],
    designGuidance:
      "Use faith symbolism only when supported by the family story or explicit customer choice. Avoid assigning religious meaning solely from nationality, ethnicity, or surname.",
    keywords: [
      "faith",
      "hope",
      "belief",
      "devotion",
      "spiritual",
      "spirituality",
      "trust",
      "guidance",
      "light",
      "humility",
    ],
    canonVersion:
      MOTTO_CANON_VERSION,
  },

  {
    id: "honor",
    name: "Honor",
    summary:
      "Integrity, truth, character, justice, and living according to principle.",
    traditionalAssociations: [
      "Integrity",
      "Truth",
      "Reputation",
      "Justice",
      "Moral character",
    ],
    historicalNotes:
      "Honor is among the most enduring themes in heraldic traditions, representing reputation, integrity, principled conduct, and responsibility to one's name.",
    associatedVirtues: [
      "Integrity",
      "Truth",
      "Justice",
      "Character",
      "Virtue",
    ],
    associatedThemes: [
      "Reputation",
      "Duty",
      "Principle",
      "Fairness",
      "Trust",
    ],
    relatedEntries: [
      "service",
      "fortitude",
      "wisdom",
    ],
    designGuidance:
      "Favor clean, authoritative heraldic forms. Honor should communicate disciplined character rather than status, rank, or inherited superiority.",
    keywords: [
      "honor",
      "integrity",
      "truth",
      "justice",
      "character",
      "virtue",
      "principle",
      "fairness",
      "reputation",
      "trust",
    ],
    canonVersion:
      MOTTO_CANON_VERSION,
  },

  {
    id: "perseverance",
    name: "Perseverance",
    summary:
      "Endurance, persistence, resilience, and continuing through difficulty.",
    traditionalAssociations: [
      "Endurance",
      "Persistence",
      "Recovery",
      "Patience",
      "Overcoming hardship",
    ],
    historicalNotes:
      "Perseverance represents sustained effort through adversity. Unlike momentary courage, it emphasizes endurance across time and repeated difficulty.",
    associatedVirtues: [
      "Perseverance",
      "Endurance",
      "Resilience",
      "Patience",
      "Discipline",
    ],
    associatedThemes: [
      "Adversity",
      "Recovery",
      "Persistence",
      "Hardship",
      "Progress",
    ],
    relatedEntries: [
      "fortitude",
      "legacy",
      "wisdom",
    ],
    designGuidance:
      "Favor stable, enduring imagery rather than aggressive symbolism. The visual language should suggest persistence, survival, and disciplined forward movement.",
    keywords: [
      "perseverance",
      "endurance",
      "resilience",
      "persistence",
      "patience",
      "discipline",
      "hardship",
      "recovery",
      "progress",
      "resolve",
    ],
    canonVersion:
      MOTTO_CANON_VERSION,
  },

  {
    id: "wisdom",
    name: "Wisdom",
    summary:
      "Knowledge, judgment, learning, reflection, and thoughtful leadership.",
    traditionalAssociations: [
      "Learning",
      "Judgment",
      "Knowledge",
      "Counsel",
      "Self-knowledge",
    ],
    historicalNotes:
      "Wisdom themes emphasize sound judgment, learning, reflection, and the ability to apply knowledge responsibly across generations.",
    associatedVirtues: [
      "Wisdom",
      "Knowledge",
      "Judgment",
      "Learning",
      "Discernment",
    ],
    associatedThemes: [
      "Education",
      "Reflection",
      "Counsel",
      "Understanding",
      "Balance",
    ],
    relatedEntries: [
      "legacy",
      "honor",
      "faith",
    ],
    designGuidance:
      "Favor restrained, intelligent symbolism. Wisdom should communicate discernment and learning without overloading the crest with books, text, or academic decoration.",
    keywords: [
      "wisdom",
      "knowledge",
      "learning",
      "education",
      "judgment",
      "reflection",
      "understanding",
      "discernment",
      "counsel",
      "balance",
    ],
    canonVersion:
      MOTTO_CANON_VERSION,
  },
];

/*
 * =========================================================
 * Lookup Helpers
 * =========================================================
 */

export const mottoById:
  Record<
    string,
    MottoCanonEntry
  > =
  Object.fromEntries(
    mottos.map(
      (entry) => [
        entry.id,
        entry,
      ],
    ),
  );

export function getMottoById(
  id: string,
): MottoCanonEntry | undefined {
  return mottoById[id];
}

/*
 * =========================================================
 * Search Helpers
 * =========================================================
 */

export function searchMottos(
  query: string,
): MottoCanonEntry[] {
  const normalizedQuery =
    query
      .trim()
      .toLowerCase();

  if (!normalizedQuery) {
    return mottos;
  }

  return mottos.filter(
    (entry) => {
      const searchableText = [
        entry.id,
        entry.name,
        entry.summary,
        entry.historicalNotes,
        entry.designGuidance,
        ...entry.traditionalAssociations,
        ...entry.associatedVirtues,
        ...entry.associatedThemes,
        ...entry.keywords,
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(
        normalizedQuery,
      );
    },
  );
}

export function findMottosByVirtue(
  virtue: string,
): MottoCanonEntry[] {
  const normalizedVirtue =
    virtue
      .trim()
      .toLowerCase();

  return mottos.filter(
    (entry) =>
      entry.associatedVirtues.some(
        (candidate) =>
          candidate
            .toLowerCase() ===
          normalizedVirtue,
      ),
  );
}

export function findMottosByTheme(
  theme: string,
): MottoCanonEntry[] {
  const normalizedTheme =
    theme
      .trim()
      .toLowerCase();

  return mottos.filter(
    (entry) =>
      entry.associatedThemes.some(
        (candidate) =>
          candidate
            .toLowerCase() ===
          normalizedTheme,
      ),
  );
}
// lib/herald/motto.ts

export type MottoTheme =
  | "fortitude"
  | "family-unity"
  | "service"
  | "legacy"
  | "faith"
  | "honor"
  | "perseverance"
  | "wisdom";

export type MottoFit =
  | "short"
  | "medium"
  | "long";

export interface Motto {
  id: string;
  latin: string;
  english: string;
  literalEnglish?: string;
  values: string[];
  themes: MottoTheme[];
  fit: MottoFit;
  status: "verified";
  note?: string;
}

export const MOTTO_MAX_CHARACTERS = 28;

function getMottoFit(
  latin: string,
): MottoFit {
  if (latin.length <= 16) {
    return "short";
  }

  if (latin.length <= 22) {
    return "medium";
  }

  return "long";
}

function motto(
  id: string,
  latin: string,
  english: string,
  values: string[],
  themes: MottoTheme[],
  options: {
    literalEnglish?: string;
    note?: string;
  } = {},
): Motto {
  if (
    latin.length >
    MOTTO_MAX_CHARACTERS
  ) {
    throw new Error(
      `Motto "${latin}" exceeds the ${MOTTO_MAX_CHARACTERS}-character V1 rocker limit.`,
    );
  }

  return {
    id,
    latin,
    english,
    literalEnglish:
      options.literalEnglish,
    values,
    themes,
    fit: getMottoFit(latin),
    status: "verified",
    note: options.note,
  };
}

/**
 * =========================================================
 * THE FAMILY REGIMENT
 * V1 LATIN MOTTO LIBRARY
 * =========================================================
 *
 * Rules:
 *
 * - Latin must fit the V1 crest rocker.
 * - Maximum length is 28 characters including spaces.
 * - Shorter phrases are preferred for embroidery.
 * - AI may rank approved mottos but should not invent Latin.
 * - English is customer-facing interpretation.
 * - literalEnglish may be supplied where useful.
 * - Institutional or historical associations can be stored
 *   in note metadata for future recommendation guardrails.
 * =========================================================
 */

export const MOTTO_LIBRARY: Motto[] = [
  /**
   * =======================================================
   * FORTITUDE
   * =======================================================
   */

  motto(
    "fortes-fortuna-adiuvat",
    "Fortes Fortuna Adiuvat",
    "Fortune Favors the Brave",
    [
      "courage",
      "bravery",
      "leadership",
    ],
    ["fortitude"],
  ),

  motto(
    "audentes-fortuna-iuvat",
    "Audentes Fortuna Iuvat",
    "Fortune Favors the Bold",
    [
      "courage",
      "boldness",
      "leadership",
    ],
    ["fortitude"],
  ),

  motto(
    "virtus-sola-invicta",
    "Virtus Sola Invicta",
    "Virtue Alone Is Unconquered",
    [
      "virtue",
      "courage",
      "character",
    ],
    [
      "fortitude",
      "honor",
    ],
  ),

  motto(
    "ne-cede-malis",
    "Ne Cede Malis",
    "Yield Not to Adversity",
    [
      "courage",
      "resolve",
      "adversity",
    ],
    [
      "fortitude",
      "perseverance",
    ],
  ),

  motto(
    "nil-desperandum",
    "Nil Desperandum",
    "Never Despair",
    [
      "hope",
      "courage",
      "resolve",
    ],
    [
      "fortitude",
      "perseverance",
    ],
  ),

  /**
   * =======================================================
   * FAMILY UNITY
   * =======================================================
   */

  motto(
    "concordia",
    "Concordia",
    "Harmony",
    [
      "family",
      "unity",
      "harmony",
    ],
    ["family-unity"],
  ),

  motto(
    "omnia-vincit-amor",
    "Omnia Vincit Amor",
    "Love Conquers All",
    [
      "family",
      "love",
      "unity",
    ],
    ["family-unity"],
  ),

  motto(
    "unus-pro-omnibus",
    "Unus Pro Omnibus",
    "One for All",
    [
      "family",
      "unity",
      "loyalty",
    ],
    ["family-unity"],
  ),

  motto(
    "pro-aris-et-focis",
    "Pro Aris Et Focis",
    "For Home and Hearth",
    [
      "family",
      "home",
      "protection",
    ],
    [
      "family-unity",
      "service",
    ],
  ),

  motto(
    "concordia-crescit",
    "Concordia Crescit",
    "Harmony Grows",
    [
      "family",
      "unity",
      "growth",
    ],
    ["family-unity"],
  ),

  /**
   * =======================================================
   * SERVICE
   * =======================================================
   */

  motto(
    "facta-non-verba",
    "Facta Non Verba",
    "Deeds, Not Words",
    [
      "service",
      "action",
      "duty",
      "integrity",
    ],
    [
      "service",
      "honor",
    ],
  ),

  motto(
    "non-sibi-sed-omnibus",
    "Non Sibi Sed Omnibus",
    "Not for Self, but for All",
    [
      "service",
      "sacrifice",
      "community",
    ],
    ["service"],
  ),

  motto(
    "age-quod-agis",
    "Age Quod Agis",
    "Do What You Are Doing Well",
    [
      "service",
      "focus",
      "duty",
    ],
    [
      "service",
      "wisdom",
    ],
  ),

  motto(
    "labor-omnia-vincit",
    "Labor Omnia Vincit",
    "Work Conquers All",
    [
      "work",
      "service",
      "discipline",
    ],
    [
      "service",
      "perseverance",
    ],
  ),

  motto(
    "pro-bono-publico",
    "Pro Bono Publico",
    "For the Public Good",
    [
      "service",
      "community",
      "duty",
    ],
    ["service"],
  ),

  /**
   * =======================================================
   * LEGACY
   * =======================================================
   */

  motto(
    "ad-maiora",
    "Ad Maiora",
    "Toward Greater Things",
    [
      "legacy",
      "future",
      "growth",
    ],
    ["legacy"],
  ),

  motto(
    "sic-itur-ad-astra",
    "Sic Itur Ad Astra",
    "Thus One Goes to the Stars",
    [
      "legacy",
      "achievement",
      "future",
    ],
    [
      "legacy",
      "fortitude",
    ],
  ),

  motto(
    "per-aspera-ad-astra",
    "Per Aspera Ad Astra",
    "Through Hardships to the Stars",
    [
      "legacy",
      "adversity",
      "achievement",
    ],
    [
      "legacy",
      "perseverance",
    ],
  ),

  motto(
    "excelsior",
    "Excelsior",
    "Ever Higher",
    [
      "legacy",
      "growth",
      "aspiration",
    ],
    ["legacy"],
  ),

  motto(
    "ad-astra",
    "Ad Astra",
    "To the Stars",
    [
      "legacy",
      "aspiration",
      "future",
    ],
    ["legacy"],
  ),

  /**
   * =======================================================
   * FAITH
   * =======================================================
   */

  motto(
    "fiat-lux",
    "Fiat Lux",
    "Let There Be Light",
    [
      "faith",
      "light",
      "hope",
    ],
    [
      "faith",
      "wisdom",
    ],
  ),

  motto(
    "deo-volente",
    "Deo Volente",
    "God Willing",
    [
      "faith",
      "trust",
      "humility",
    ],
    ["faith"],
  ),

  motto(
    "ora-et-labora",
    "Ora Et Labora",
    "Pray and Work",
    [
      "faith",
      "work",
      "discipline",
    ],
    [
      "faith",
      "service",
    ],
  ),

  motto(
    "lux-in-tenebris",
    "Lux In Tenebris",
    "Light in Darkness",
    [
      "faith",
      "hope",
      "guidance",
    ],
    ["faith"],
  ),

  motto(
    "fide-et-fortitudine",
    "Fide Et Fortitudine",
    "With Faith and Courage",
    [
      "faith",
      "courage",
      "service",
    ],
    [
      "faith",
      "fortitude",
    ],
  ),

  /**
   * =======================================================
   * HONOR
   * =======================================================
   */

  motto(
    "esse-quam-videri",
    "Esse Quam Videri",
    "To Be, Rather Than to Seem",
    [
      "honor",
      "integrity",
      "authenticity",
    ],
    [
      "honor",
      "wisdom",
    ],
  ),

  motto(
    "veritas-vincit",
    "Veritas Vincit",
    "Truth Conquers",
    [
      "honor",
      "truth",
      "integrity",
    ],
    ["honor"],
  ),

  motto(
    "suum-cuique",
    "Suum Cuique",
    "To Each Their Own",
    [
      "honor",
      "justice",
      "fairness",
    ],
    [
      "honor",
      "wisdom",
    ],
  ),

  motto(
    "virtute-et-armis",
    "Virtute Et Armis",
    "By Virtue and Arms",
    [
      "honor",
      "courage",
      "service",
    ],
    [
      "honor",
      "service",
    ],
  ),

  motto(
    "honeste-vivere",
    "Honeste Vivere",
    "Live Honorably",
    [
      "honor",
      "integrity",
      "character",
    ],
    ["honor"],
  ),

  /**
   * =======================================================
   * PERSEVERANCE
   * =======================================================
   */

  motto(
    "dum-spiro-spero",
    "Dum Spiro Spero",
    "While I Breathe, I Hope",
    [
      "hope",
      "resilience",
      "perseverance",
    ],
    ["perseverance"],
  ),

  motto(
    "gutta-cavat-lapidem",
    "Gutta Cavat Lapidem",
    "A Drop Hollows the Stone",
    [
      "perseverance",
      "persistence",
      "patience",
    ],
    ["perseverance"],
  ),

  motto(
    "festina-lente",
    "Festina Lente",
    "Make Haste Slowly",
    [
      "perseverance",
      "patience",
      "discipline",
    ],
    [
      "perseverance",
      "wisdom",
    ],
  ),

  motto(
    "vincit-qui-se-vincit",
    "Vincit Qui Se Vincit",
    "He Conquers Who Conquers Himself",
    [
      "discipline",
      "self-mastery",
      "perseverance",
    ],
    [
      "perseverance",
      "fortitude",
    ],
  ),

  motto(
    "persevera",
    "Persevera",
    "Persevere",
    [
      "perseverance",
      "resolve",
      "endurance",
    ],
    ["perseverance"],
  ),

  /**
   * =======================================================
   * WISDOM
   * =======================================================
   */

  motto(
    "sapere-aude",
    "Sapere Aude",
    "Dare to Be Wise",
    [
      "wisdom",
      "learning",
      "courage",
    ],
    [
      "wisdom",
      "fortitude",
    ],
  ),

  motto(
    "nosce-te-ipsum",
    "Nosce Te Ipsum",
    "Know Thyself",
    [
      "wisdom",
      "reflection",
      "self-knowledge",
    ],
    ["wisdom"],
  ),

  motto(
    "carpe-diem",
    "Carpe Diem",
    "Seize the Day",
    [
      "wisdom",
      "action",
      "opportunity",
    ],
    ["wisdom"],
  ),

  motto(
    "ars-longa-vita-brevis",
    "Ars Longa Vita Brevis",
    "Art Is Long, Life Is Short",
    [
      "wisdom",
      "craft",
      "learning",
      "legacy",
    ],
    [
      "wisdom",
      "legacy",
    ],
  ),

  motto(
    "discendo-discimus",
    "Discendo Discimus",
    "By Learning We Learn",
    [
      "wisdom",
      "learning",
      "education",
    ],
    ["wisdom"],
  ),
];

/**
 * Find the strongest single motto for a set of
 * family values.
 *
 * Exact value matches carry the greatest weight.
 * Theme matches add secondary weight.
 * Shorter rocker-friendly mottos win close ties.
 */
export function findBestMotto(
  values: string[],
): Motto {
  const normalized = new Set(
    values
      .map((value) =>
        value
          .trim()
          .toLowerCase(),
      )
      .filter(Boolean),
  );

  let best = MOTTO_LIBRARY[0];
  let bestScore = -1;

  for (
    const candidate
    of MOTTO_LIBRARY
  ) {
    const valueScore =
      candidate.values.reduce(
        (score, value) =>
          score +
          (
            normalized.has(
              value.toLowerCase(),
            )
              ? 3
              : 0
          ),
        0,
      );

    const themeScore =
      candidate.themes.reduce(
        (score, theme) =>
          score +
          (
            normalized.has(
              theme.toLowerCase(),
            )
              ? 2
              : 0
          ),
        0,
      );

    const fitBonus =
      candidate.fit === "short"
        ? 2
        : candidate.fit === "medium"
          ? 1
          : 0;

    const score =
      valueScore +
      themeScore +
      fitBonus;

    if (score > bestScore) {
      best = candidate;
      bestScore = score;
    }
  }

  return best;
}

/**
 * Return every approved motto belonging to a
 * Canon theme.
 */
export function findMottosByTheme(
  theme: MottoTheme,
): Motto[] {
  return MOTTO_LIBRARY.filter(
    (entry) =>
      entry.themes.includes(theme),
  );
}

/**
 * Return a ranked shortlist based on family
 * values.
 *
 * This is useful for the customer-facing builder
 * where we want several good options rather than
 * silently choosing a single motto.
 */
export function findMottosByValues(
  values: string[],
  limit = 6,
): Motto[] {
  const normalized = new Set(
    values
      .map((value) =>
        value
          .trim()
          .toLowerCase(),
      )
      .filter(Boolean),
  );

  return [...MOTTO_LIBRARY]
    .map((entry) => {
      const matches =
        entry.values.filter(
          (value) =>
            normalized.has(
              value.toLowerCase(),
            ),
        ).length;

      const fitBonus =
        entry.fit === "short"
          ? 0.2
          : entry.fit === "medium"
            ? 0.1
            : 0;

      return {
        entry,
        score:
          matches +
          fitBonus,
      };
    })
    .sort(
      (a, b) =>
        b.score - a.score,
    )
    .slice(
      0,
      Math.max(1, limit),
    )
    .map(
      ({ entry }) => entry,
    );
}

/**
 * Stable lookup for persisted builder selections.
 */
export function getMottoById(
  id: string,
): Motto | undefined {
  const normalizedId =
    id
      .trim()
      .toLowerCase();

  return MOTTO_LIBRARY.find(
    (entry) =>
      entry.id.toLowerCase() ===
      normalizedId,
  );
}

/**
 * Retained for compatibility with the existing
 * builder/runtime API.
 */
export function getRandomMotto(): Motto {
  return MOTTO_LIBRARY[
    Math.floor(
      Math.random() *
        MOTTO_LIBRARY.length,
    )
  ];
}
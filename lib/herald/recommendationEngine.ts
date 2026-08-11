// lib/herald/recommendationEngine.ts

import type {
  CanonCategory,
  CanonEntry,
} from "./types";

import type {
  FamilyRecord,
} from "./familyRecord";

import {
  HeraldCanon,
} from "./index";

export interface CanonRecommendation {
  entry: CanonEntry;

  score: number;

  reasons: string[];
}

export interface CanonRecommendationResult {
  familyName: string;

  recommendations: CanonRecommendation[];
}

function normalize(
  value: string,
): string {
  return value.trim().toLowerCase();
}

function addRecommendation(
  recommendations: Map<
    string,
    CanonRecommendation
  >,
  entry: CanonEntry,
  score: number,
  reason: string,
): void {
  const existing =
    recommendations.get(entry.id);

  if (existing) {
    existing.score += score;

    if (
      !existing.reasons.includes(reason)
    ) {
      existing.reasons.push(reason);
    }

    return;
  }

  recommendations.set(entry.id, {
    entry,
    score,
    reasons: [reason],
  });
}

function matchVirtues(
  record: FamilyRecord,
  recommendations: Map<
    string,
    CanonRecommendation
  >,
): void {
  for (const virtue of record.virtues) {
    const matches =
      HeraldCanon.byVirtue(virtue);

    for (const entry of matches) {
      addRecommendation(
        recommendations,
        entry,
        5,
        `Matches family virtue: ${virtue}`,
      );
    }
  }
}

function matchHeritage(
  record: FamilyRecord,
  recommendations: Map<
    string,
    CanonRecommendation
  >,
): void {
  for (const heritage of record.heritage) {
    const matches =
      HeraldCanon.search(heritage);

    for (const entry of matches) {
      addRecommendation(
        recommendations,
        entry,
        4,
        `Connected to heritage: ${heritage}`,
      );
    }
  }
}

function matchMilitaryService(
  record: FamilyRecord,
  recommendations: Map<
    string,
    CanonRecommendation
  >,
): void {
  if (
    record.militaryService.length === 0
  ) {
    return;
  }

  const matches =
    HeraldCanon.byTheme(
      "Military Service",
    );

  for (const entry of matches) {
    addRecommendation(
      recommendations,
      entry,
      4,
      "Connected to military service",
    );
  }
}

function matchFaith(
  record: FamilyRecord,
  recommendations: Map<
    string,
    CanonRecommendation
  >,
): void {
  if (!record.faith) {
    return;
  }

  const faithMatches = [
    ...HeraldCanon.search(
      record.faith,
    ),
    ...HeraldCanon.byTheme(
      "Faith",
    ),
    ...HeraldCanon.byTheme(
      "Religious Heritage",
    ),
  ];

  for (const entry of faithMatches) {
    addRecommendation(
      recommendations,
      entry,
      3,
      `Connected to faith tradition: ${record.faith}`,
    );
  }
}

function matchFavoriteAnimal(
  record: FamilyRecord,
  recommendations: Map<
    string,
    CanonRecommendation
  >,
): void {
  if (!record.favoriteAnimal) {
    return;
  }

  const animal =
    HeraldCanon.get(
      normalize(
        record.favoriteAnimal,
      ),
    );

  if (!animal) {
    return;
  }

  addRecommendation(
    recommendations,
    animal,
    3,
    `Preferred family animal: ${record.favoriteAnimal}`,
  );
}

function matchProfession(
  record: FamilyRecord,
  recommendations: Map<
    string,
    CanonRecommendation
  >,
): void {
  for (
    const profession
    of record.professions
  ) {
    const matches =
      HeraldCanon.search(profession);

    for (const entry of matches) {
      addRecommendation(
        recommendations,
        entry,
        2,
        `Connected to profession: ${profession}`,
      );
    }
  }
}

function includeRelatedEntries(
  recommendations: Map<
    string,
    CanonRecommendation
  >,
): void {
  const current =
    Array.from(
      recommendations.values(),
    );

  for (const recommendation of current) {
    const related =
      HeraldCanon.related(
        recommendation.entry.id,
      );

    for (const entry of related) {
      addRecommendation(
        recommendations,
        entry,
        1,
        `Related to ${recommendation.entry.name}`,
      );
    }
  }
}

export function recommendCanonEntries(
  record: FamilyRecord,
): CanonRecommendationResult {
  const recommendations =
    new Map<
      string,
      CanonRecommendation
    >();

  matchVirtues(
    record,
    recommendations,
  );

  matchHeritage(
    record,
    recommendations,
  );

  matchMilitaryService(
    record,
    recommendations,
  );

  matchFaith(
    record,
    recommendations,
  );

  matchFavoriteAnimal(
    record,
    recommendations,
  );

  matchProfession(
    record,
    recommendations,
  );

  includeRelatedEntries(
    recommendations,
  );

  const ranked =
    Array.from(
      recommendations.values(),
    ).sort(
      (a, b) =>
        b.score - a.score ||
        a.entry.name.localeCompare(
          b.entry.name,
        ),
    );

  return {
    familyName:
      record.familyName,

    recommendations: ranked,
  };
}

export function getTopRecommendations(
  result: CanonRecommendationResult,
  limit = 12,
): CanonRecommendation[] {
  return result.recommendations.slice(
    0,
    Math.max(0, limit),
  );
}

export function getRecommendationsByCategory(
  result: CanonRecommendationResult,
  category: CanonCategory,
): CanonRecommendation[] {
  return result.recommendations.filter(
    (recommendation) =>
      recommendation.entry.category ===
      category,
  );
}
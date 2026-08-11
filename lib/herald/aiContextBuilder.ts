// lib/herald/aiContextBuilder.ts

import type {
  CanonEntry,
} from "./types";

import type {
  FamilyRecord,
} from "./familyRecord";

import type {
  CanonRecommendation,
  CanonRecommendationResult,
} from "./recommendationEngine";

import {
  getTopRecommendations,
} from "./recommendationEngine";

export interface HeraldAIContextEntry {
  id: string;

  name: string;

  category: CanonEntry["category"];

  summary: string;

  traditionalAssociations: string[];

  associatedVirtues: string[];

  associatedThemes: string[];

  designGuidance?: string;

  score: number;

  reasons: string[];
}

export interface HeraldAIContext {
  family: {
    familyName: string;

    heritage: string[];

    virtues: string[];

    militaryService: string[];

    professions: string[];

    faith?: string;

    zodiac?: string;

    favoriteAnimal?: string;

    preferredStyle: string;
  };

  canon: HeraldAIContextEntry[];
}

function toContextEntry(
  recommendation: CanonRecommendation,
): HeraldAIContextEntry {
  const {
    entry,
    score,
    reasons,
  } = recommendation;

  return {
    id: entry.id,

    name: entry.name,

    category: entry.category,

    summary: entry.summary,

    traditionalAssociations:
      entry.traditionalAssociations,

    associatedVirtues:
      entry.associatedVirtues,

    associatedThemes:
      entry.associatedThemes,

    designGuidance:
      entry.designGuidance,

    score,

    reasons,
  };
}

export function buildHeraldAIContext(
  record: FamilyRecord,
  result: CanonRecommendationResult,
  limit = 12,
): HeraldAIContext {
  const recommendations =
    getTopRecommendations(
      result,
      limit,
    );

  return {
    family: {
      familyName:
        record.familyName,

      heritage:
        record.heritage,

      virtues:
        record.virtues,

      militaryService:
        record.militaryService,

      professions:
        record.professions,

      faith:
        record.faith,

      zodiac:
        record.zodiac,

      favoriteAnimal:
        record.favoriteAnimal,

      preferredStyle:
        record.preferredStyle,
    },

    canon:
      recommendations.map(
        toContextEntry,
      ),
  };
}

export function serializeHeraldAIContext(
  context: HeraldAIContext,
): string {
  return JSON.stringify(
    context,
    null,
    2,
  );
}
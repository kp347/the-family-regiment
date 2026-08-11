// lib/herald/heraldReport.ts

import type {
  CanonEntry,
} from "./types";

import type {
  FamilyRecord,
} from "./familyRecord";

import type {
  CanonRecommendationResult,
} from "./recommendationEngine";

import {
  getTopRecommendations,
  getRecommendationsByCategory,
} from "./recommendationEngine";

export interface HeraldReportRecommendation {
  id: string;

  name: string;

  category: CanonEntry["category"];

  score: number;

  reasons: string[];

  summary: string;

  traditionalAssociations: string[];

  designGuidance?: string;
}

export interface HeraldReport {
  familyName: string;

  familySummary: {
    heritage: string[];

    virtues: string[];

    militaryService: string[];

    professions: string[];

    faith?: string;

    zodiac?: string;

    favoriteAnimal?: string;

    preferredStyle: string;
  };

  primaryRecommendations: HeraldReportRecommendation[];

  tinctures: HeraldReportRecommendation[];

  charges: HeraldReportRecommendation[];

  ordinaries: HeraldReportRecommendation[];

  symbols: HeraldReportRecommendation[];

  crests: HeraldReportRecommendation[];

  mottos: HeraldReportRecommendation[];

  shields: HeraldReportRecommendation[];
}

function toReportRecommendation(
  recommendation: ReturnType<
    typeof getTopRecommendations
  >[number],
): HeraldReportRecommendation {
  return {
    id: recommendation.entry.id,

    name: recommendation.entry.name,

    category:
      recommendation.entry.category,

    score:
      recommendation.score,

    reasons:
      recommendation.reasons,

    summary:
      recommendation.entry.summary,

    traditionalAssociations:
      recommendation.entry
        .traditionalAssociations,

    designGuidance:
      recommendation.entry
        .designGuidance,
  };
}

export function buildHeraldReport(
  record: FamilyRecord,
  result: CanonRecommendationResult,
): HeraldReport {
  return {
    familyName:
      record.familyName,

    familySummary: {
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

    primaryRecommendations:
      getTopRecommendations(
        result,
        12,
      ).map(
        toReportRecommendation,
      ),

    tinctures:
      getRecommendationsByCategory(
        result,
        "tincture",
      ).map(
        toReportRecommendation,
      ),

    charges:
      getRecommendationsByCategory(
        result,
        "charge",
      ).map(
        toReportRecommendation,
      ),

    ordinaries:
      getRecommendationsByCategory(
        result,
        "ordinary",
      ).map(
        toReportRecommendation,
      ),

    symbols:
      getRecommendationsByCategory(
        result,
        "symbol",
      ).map(
        toReportRecommendation,
      ),

    crests:
      getRecommendationsByCategory(
        result,
        "crest",
      ).map(
        toReportRecommendation,
      ),

    mottos:
      getRecommendationsByCategory(
        result,
        "motto",
      ).map(
        toReportRecommendation,
      ),

    shields:
      getRecommendationsByCategory(
        result,
        "shield",
      ).map(
        toReportRecommendation,
      ),
  };
}
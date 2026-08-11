// lib/herald/productionCanonContext.ts

import {
  HeraldCanon,
} from "./index";

import type {
  CanonEntry,
} from "./types";

export interface RankedCanonEntry {
  entry: CanonEntry;

  score: number;

  matches: string[];
}

export interface ProductionCanonContextEntry {
  id: string;

  name: string;

  category: CanonEntry["category"];

  summary: string;

  traditionalAssociations: string[];

  associatedVirtues: string[];

  associatedThemes: string[];

  designGuidance?: string;

  relevanceScore: number;

  matchedFamilyTerms: string[];
}

function normalize(
  value: string,
): string {
  return value
    .trim()
    .toLowerCase();
}

function collectStrings(
  value: unknown,
): string[] {
  if (
    typeof value === "string"
  ) {
    const cleaned =
      value.trim();

    return cleaned
      ? [cleaned]
      : [];
  }

  if (
    Array.isArray(value)
  ) {
    return value.flatMap(
      collectStrings,
    );
  }

  if (
    value &&
    typeof value === "object"
  ) {
    return Object.values(
      value as Record<
        string,
        unknown
      >,
    ).flatMap(
      collectStrings,
    );
  }

  return [];
}

export function buildProductionSearchTerms(
  familyRecord: Record<
    string,
    unknown
  >,
): string[] {
  const recordSections = [
    familyRecord.origins,
    familyRecord.values_record,
    familyRecord.service,
    familyRecord.traditions,
    familyRecord.symbols,
    familyRecord.achievements,
    familyRecord.future_legacy,
  ];

  const rawStrings =
    recordSections.flatMap(
      collectStrings,
    );

  const terms =
    new Set<string>();

  for (
    const rawString
    of rawStrings
  ) {
    const cleaned =
      rawString.trim();

    if (
      cleaned.length >= 3
    ) {
      terms.add(cleaned);
    }

    const words =
      cleaned
        .split(
          /[\s,;:/|()\-–—]+/,
        )
        .map(normalize)
        .filter(
          (word) =>
            word.length >= 4,
        );

    for (
      const word
      of words
    ) {
      terms.add(word);
    }
  }

  return Array.from(terms);
}

export function rankProductionCanonEntries(
  familyRecord: Record<
    string,
    unknown
  >,
): RankedCanonEntry[] {
  const searchTerms =
    buildProductionSearchTerms(
      familyRecord,
    );

  const ranked =
    new Map<
      string,
      RankedCanonEntry
    >();

  for (
    const term
    of searchTerms
  ) {
    const matches =
      HeraldCanon.search(term);

    for (
      const entry
      of matches
    ) {
      const existing =
        ranked.get(
          entry.id,
        );

      if (existing) {
        existing.score += 1;

        if (
          !existing.matches.includes(
            term,
          )
        ) {
          existing.matches.push(
            term,
          );
        }

        continue;
      }

      ranked.set(
        entry.id,
        {
          entry,

          score: 1,

          matches: [term],
        },
      );
    }
  }

  return Array.from(
    ranked.values(),
  ).sort(
    (a, b) =>
      b.score -
        a.score ||
      a.entry.name.localeCompare(
        b.entry.name,
      ),
  );
}

export function buildProductionCanonContext(
  familyRecord: Record<
    string,
    unknown
  >,
  limit = 18,
): ProductionCanonContextEntry[] {
  const ranked =
    rankProductionCanonEntries(
      familyRecord,
    );

  return ranked
    .slice(
      0,
      Math.max(
        0,
        limit,
      ),
    )
    .map(
      ({
        entry,
        score,
        matches,
      }) => ({
        id:
          entry.id,

        name:
          entry.name,

        category:
          entry.category,

        summary:
          entry.summary,

        traditionalAssociations:
          entry
            .traditionalAssociations,

        associatedVirtues:
          entry
            .associatedVirtues,

        associatedThemes:
          entry
            .associatedThemes,

        designGuidance:
          entry
            .designGuidance,

        relevanceScore:
          score,

        matchedFamilyTerms:
          matches,
      }),
    );
}

// lib/herald/productionCanonContext.ts

import { HeraldCanon } from "./index";
import type { CanonEntry } from "./types";

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

/**
 * V1 production options currently established for the Regiment builder.
 * These are explicit product options, NOT a list of all historical heraldry.
 * Confirm against the live builder before adding or removing options.
 */
export const V1_PRODUCTION_OPTIONS = {
  primaryCharges: ["Lion", "Eagle", "Wolf", "Bear", "Stag"],
  shields: ["Heater", "Norman", "Spanish"],
  crestFinishes: ["Regiment Gold", "Tactical Subdued", "Heritage Ivory"],
  crowns: [
    "None",
    "Regiment Crown",
    "Heritage Coronet",
    "Laurel Crest",
    "Naval Crown",
  ],
} as const;

export const V1_PRODUCTION_RULES = [
  "Recommend only selectable V1 primary charges and shield shapes.",
  "A historical heraldic tincture is not an available garment or crest color option by default.",
  "Do not prescribe a red (Gules) lion, or any other charge-color combination, unless explicitly offered by the current builder.",
  "Present crest finishes by their customer-facing names: Regiment Gold, Tactical Subdued, Heritage Ivory.",
  "Do not promise a crown, rocker, charge arrangement, or fine detail without confirming the live builder and embroidery feasibility.",
  "Use plain-English labels first. Explain historical terminology only as optional education.",
  "Treat an unverified historical symbol as inspiration, not a purchasable recommendation.",
] as const;

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

function collectStrings(value: unknown): string[] {
  if (typeof value === "string") {
    const cleaned = value.trim();
    return cleaned ? [cleaned] : [];
  }

  if (Array.isArray(value)) {
    return value.flatMap(collectStrings);
  }

  if (value && typeof value === "object") {
    return Object.values(
      value as Record<string, unknown>,
    ).flatMap(collectStrings);
  }

  return [];
}

export function buildProductionSearchTerms(
  familyRecord: Record<string, unknown>,
): string[] {
  const sections = [
    familyRecord.origins,
    familyRecord.values_record,
    familyRecord.service,
    familyRecord.traditions,
    familyRecord.symbols,
    familyRecord.achievements,
    familyRecord.future_legacy,
  ];

  const terms = new Set<string>();

  for (const raw of sections.flatMap(collectStrings)) {
    const cleaned = raw.trim();

    if (cleaned.length >= 3) {
      terms.add(cleaned);
    }

    for (const word of cleaned
      .split(/[\s,;:/|()\-–—]+/)
      .map(normalize)) {
      if (word.length >= 4) {
        terms.add(word);
      }
    }
  }

  return Array.from(terms);
}

export function rankProductionCanonEntries(
  familyRecord: Record<string, unknown>,
): RankedCanonEntry[] {
  const ranked = new Map<string, RankedCanonEntry>();

  for (const term of buildProductionSearchTerms(familyRecord)) {
    for (const entry of HeraldCanon.search(term)) {
      const existing = ranked.get(entry.id);

      if (existing) {
        existing.score += 1;

        if (!existing.matches.includes(term)) {
          existing.matches.push(term);
        }
      } else {
        ranked.set(entry.id, {
          entry,
          score: 1,
          matches: [term],
        });
      }
    }
  }

  return Array.from(ranked.values()).sort(
    (a, b) =>
      b.score - a.score ||
      a.entry.name.localeCompare(b.entry.name),
  );
}

export function buildProductionCanonContext(
  familyRecord: Record<string, unknown>,
  limit = 18,
): ProductionCanonContextEntry[] {
  return rankProductionCanonEntries(familyRecord)
    .slice(0, Math.max(0, limit))
    .map(({ entry, score, matches }) => ({
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
      relevanceScore: score,
      matchedFamilyTerms: matches,
    }));
}

/**
 * Pass this object to the Herald analysis prompt
 * alongside the ranked Canon.
 */
export function buildProductionAvailabilityContext() {
  return {
    availableOptions: V1_PRODUCTION_OPTIONS,
    constraints: V1_PRODUCTION_RULES,
    note:
      "Options are product constraints; Canon associations are educational context, not additional product capabilities.",
  };
}

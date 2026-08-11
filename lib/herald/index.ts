// lib/herald/index.ts

import type {
  CanonCategory,
  CanonEntry,
} from "./types";

import {
  tinctures,
} from "./tinctures";

import {
  charges,
} from "./charges";

import {
  ordinaries,
} from "./ordinaries";

import {
  symbols,
} from "./symbols";

import {
  crests,
} from "./crests";

import {
  mottos,
} from "./mottos";

import {
  shieldShapes,
} from "./shieldShapes";

/*
 * =========================================================
 * Heraldic Canon Registry
 * =========================================================
 */

export const canonEntries: CanonEntry[] = [
  ...tinctures,
  ...charges,
  ...ordinaries,
  ...symbols,
  ...crests,
  ...mottos,
  ...shieldShapes,
];

/*
 * =========================================================
 * Fast Lookup
 * =========================================================
 */

const canonById: Record<
  string,
  CanonEntry
> = Object.fromEntries(
  canonEntries.map((entry) => [
    entry.id,
    entry,
  ]),
);

/*
 * =========================================================
 * Core Helpers
 * =========================================================
 */

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

function get(
  id: string,
): CanonEntry | undefined {
  return canonById[normalize(id)];
}

function search(
  query: string,
): CanonEntry[] {
  const normalizedQuery = normalize(query);

  if (!normalizedQuery) {
    return canonEntries;
  }

  return canonEntries.filter((entry) => {
    const searchableText = [
      entry.id,
      entry.name,
      entry.summary,
      entry.historicalNotes,
      ...entry.traditionalAssociations,
      ...entry.associatedVirtues,
      ...entry.associatedThemes,
      ...(entry.keywords ?? []),
    ]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(
      normalizedQuery,
    );
  });
}

function byCategory(
  category: CanonCategory,
): CanonEntry[] {
  return canonEntries.filter(
    (entry) =>
      entry.category === category,
  );
}

function byVirtue(
  virtue: string,
): CanonEntry[] {
  const normalizedVirtue =
    normalize(virtue);

  if (!normalizedVirtue) {
    return [];
  }

  return canonEntries.filter((entry) =>
    entry.associatedVirtues.some(
      (associatedVirtue) =>
        normalize(associatedVirtue) ===
        normalizedVirtue,
    ),
  );
}

function byTheme(
  theme: string,
): CanonEntry[] {
  const normalizedTheme =
    normalize(theme);

  if (!normalizedTheme) {
    return [];
  }

  return canonEntries.filter((entry) =>
    entry.associatedThemes.some(
      (associatedTheme) =>
        normalize(associatedTheme) ===
        normalizedTheme,
    ),
  );
}

function related(
  id: string,
): CanonEntry[] {
  const entry = get(id);

  if (!entry) {
    return [];
  }

  return entry.relatedEntries
    .map((relatedId) =>
      get(relatedId),
    )
    .filter(
      (
        relatedEntry,
      ): relatedEntry is CanonEntry =>
        relatedEntry !== undefined,
    );
}

/*
 * =========================================================
 * Canon Validation
 * =========================================================
 */

export interface CanonValidationResult {
  valid: boolean;

  duplicateIds: string[];

  missingRelatedEntries: {
    entryId: string;
    relatedId: string;
  }[];

  missingVersions: string[];
}

function validate(): CanonValidationResult {
  const duplicateIds: string[] = [];

  const missingRelatedEntries: {
    entryId: string;
    relatedId: string;
  }[] = [];

  const missingVersions: string[] = [];

  const seenIds = new Set<string>();

  for (const entry of canonEntries) {
    if (seenIds.has(entry.id)) {
      duplicateIds.push(entry.id);
    }

    seenIds.add(entry.id);

    if (!entry.canonVersion.trim()) {
      missingVersions.push(entry.id);
    }
  }

  for (const entry of canonEntries) {
    for (
      const relatedId
      of entry.relatedEntries
    ) {
      if (!canonById[relatedId]) {
        missingRelatedEntries.push({
          entryId: entry.id,
          relatedId,
        });
      }
    }
  }

  return {
    valid:
      duplicateIds.length === 0 &&
      missingRelatedEntries.length === 0 &&
      missingVersions.length === 0,

    duplicateIds,

    missingRelatedEntries,

    missingVersions,
  };
}

/*
 * =========================================================
 * Public Herald Canon API
 * =========================================================
 */

export const HeraldCanon = {
  entries: canonEntries,

  get,

  search,

  byCategory,

  byVirtue,

  byTheme,

  related,

  validate,
};

/*
 * =========================================================
 * Registry Exports
 * =========================================================
 */

export {
  tinctures,
  charges,
  ordinaries,
  symbols,
  crests,
  mottos,
  shieldShapes,
};

/*
 * =========================================================
 * Type Exports
 * =========================================================
 */

export type {
  CanonCategory,
  CanonEntry,
  CanonSource,
  ChargeEntry,
  ChargeVariant,
  CrestComponentEntry,
} from "./types";
// lib/herald/tinctures.ts

import type { CanonEntry } from "./types";

/*
 * Heraldic Canon — Tinctures
 *
 * This registry contains the foundational metals and colors
 * used throughout The Family Regiment's heraldic system.
 *
 * IMPORTANT:
 * Traditional meanings are presented as associations,
 * not universal or absolute definitions.
 *
 * Historical references and formal citations can be added
 * incrementally through CanonEntry.sources as the Canon
 * research process continues.
 */

export const TINCTURE_CANON_VERSION = "1.0.0";

/*
 * Metals
 */

const or: CanonEntry = {
  id: "or",

  name: "Or",

  category: "tincture",

  summary:
    "The heraldic metal representing gold or yellow, traditionally associated with generosity, elevation, and distinction.",

  traditionalAssociations: [
    "Generosity",
    "Honor",
    "Elevation",
    "Nobility",
    "Constancy",
  ],

  historicalNotes:
    "Or is one of the two principal heraldic metals. It is traditionally represented by gold when materials permit and by yellow in painted, printed, or simplified applications.",

  associatedVirtues: [
    "Generosity",
    "Honor",
    "Constancy",
    "Leadership",
  ],

  associatedThemes: [
    "Legacy",
    "Achievement",
    "Service",
    "Prosperity",
    "Distinction",
  ],

  relatedEntries: [
    "argent",
    "gules",
    "azure",
    "sable",
    "vert",
    "purpure",
  ],

  designGuidance:
    "For embroidery, use a warm gold thread rather than highly reflective metallic thread unless the production method specifically supports metallic embroidery. Maintain strong contrast against darker field colors.",

  keywords: [
    "gold",
    "yellow",
    "metal",
    "honor",
    "generosity",
    "legacy",
    "distinction",
  ],

  canonVersion: TINCTURE_CANON_VERSION,
};

const argent: CanonEntry = {
  id: "argent",

  name: "Argent",

  category: "tincture",

  summary:
    "The heraldic metal representing silver or white, traditionally associated with sincerity, clarity, peace, and integrity.",

  traditionalAssociations: [
    "Sincerity",
    "Peace",
    "Clarity",
    "Integrity",
    "Purity",
  ],

  historicalNotes:
    "Argent is one of the two principal heraldic metals. It may be represented by silver in formal artwork and by white in practical applications such as print, digital display, and embroidery.",

  associatedVirtues: [
    "Integrity",
    "Sincerity",
    "Peace",
    "Clarity",
  ],

  associatedThemes: [
    "Truth",
    "Stewardship",
    "Service",
    "Faithfulness",
    "Continuity",
  ],

  relatedEntries: [
    "or",
    "gules",
    "azure",
    "sable",
    "vert",
    "purpure",
  ],

  designGuidance:
    "For embroidery and patches, ivory or bright neutral thread may reproduce more cleanly than metallic silver. Preserve sufficient contrast against light-colored fields.",

  keywords: [
    "silver",
    "white",
    "metal",
    "integrity",
    "peace",
    "clarity",
    "truth",
  ],

  canonVersion: TINCTURE_CANON_VERSION,
};

/*
 * Colors
 */

const gules: CanonEntry = {
  id: "gules",

  name: "Gules",

  category: "tincture",

  summary:
    "The heraldic color red, traditionally associated with courage, strength, sacrifice, and martial resolve.",

  traditionalAssociations: [
    "Courage",
    "Strength",
    "Sacrifice",
    "Valor",
    "Resolve",
  ],

  historicalNotes:
    "Gules is the traditional heraldic term for red and has long been prominent in shields, banners, military insignia, and civic arms.",

  associatedVirtues: [
    "Courage",
    "Valor",
    "Resolve",
    "Sacrifice",
  ],

  associatedThemes: [
    "Military Service",
    "Defense",
    "Strength",
    "Leadership",
    "Devotion",
  ],

  relatedEntries: [
    "or",
    "argent",
    "azure",
    "sable",
    "vert",
    "purpure",
  ],

  designGuidance:
    "Use a deep, saturated red that remains distinct from brown or orange when embroidered. Gules works especially well with Or and Argent elements.",

  keywords: [
    "red",
    "courage",
    "valor",
    "strength",
    "sacrifice",
    "military",
  ],

  canonVersion: TINCTURE_CANON_VERSION,
};

const azure: CanonEntry = {
  id: "azure",

  name: "Azure",

  category: "tincture",

  summary:
    "The heraldic color blue, traditionally associated with loyalty, steadfastness, truth, and fidelity.",

  traditionalAssociations: [
    "Loyalty",
    "Truth",
    "Fidelity",
    "Steadfastness",
    "Constancy",
  ],

  historicalNotes:
    "Azure is the traditional heraldic term for blue. It appears extensively across European heraldic traditions and remains one of the most recognizable heraldic field colors.",

  associatedVirtues: [
    "Loyalty",
    "Truth",
    "Fidelity",
    "Steadfastness",
  ],

  associatedThemes: [
    "Family Loyalty",
    "Service",
    "Duty",
    "Trust",
    "Continuity",
  ],

  relatedEntries: [
    "or",
    "argent",
    "gules",
    "sable",
    "vert",
    "purpure",
  ],

  designGuidance:
    "Use a strong medium-to-deep blue with enough saturation to remain visually distinct from black when reduced to patch scale.",

  keywords: [
    "blue",
    "loyalty",
    "truth",
    "fidelity",
    "duty",
    "steadfastness",
  ],

  canonVersion: TINCTURE_CANON_VERSION,
};

const sable: CanonEntry = {
  id: "sable",

  name: "Sable",

  category: "tincture",

  summary:
    "The heraldic color black, traditionally associated with constancy, seriousness, endurance, and resolve.",

  traditionalAssociations: [
    "Constancy",
    "Endurance",
    "Resolve",
    "Dignity",
    "Seriousness",
  ],

  historicalNotes:
    "Sable is the traditional heraldic term for black. Its visual strength allows it to function effectively as both a field color and a contrasting element within heraldic compositions.",

  associatedVirtues: [
    "Endurance",
    "Resolve",
    "Constancy",
    "Discipline",
  ],

  associatedThemes: [
    "Strength",
    "Duty",
    "Remembrance",
    "Resilience",
    "Service",
  ],

  relatedEntries: [
    "or",
    "argent",
    "gules",
    "azure",
    "vert",
    "purpure",
  ],

  designGuidance:
    "Sable provides strong embroidery contrast with Or and Argent. Avoid placing very dark blue or dark green details directly against Sable without a separating border.",

  keywords: [
    "black",
    "endurance",
    "resolve",
    "constancy",
    "discipline",
    "strength",
  ],

  canonVersion: TINCTURE_CANON_VERSION,
};

const vert: CanonEntry = {
  id: "vert",

  name: "Vert",

  category: "tincture",

  summary:
    "The heraldic color green, traditionally associated with hope, renewal, growth, land, and vitality.",

  traditionalAssociations: [
    "Hope",
    "Growth",
    "Renewal",
    "Vitality",
    "Abundance",
  ],

  historicalNotes:
    "Vert is the traditional heraldic term for green. It is frequently connected visually with land, vegetation, agriculture, forests, and natural landscapes.",

  associatedVirtues: [
    "Hope",
    "Growth",
    "Resilience",
    "Stewardship",
  ],

  associatedThemes: [
    "Land",
    "Agriculture",
    "Nature",
    "Renewal",
    "Generational Growth",
  ],

  relatedEntries: [
    "or",
    "argent",
    "gules",
    "azure",
    "sable",
    "purpure",
  ],

  designGuidance:
    "For military-inspired products, Vert should remain distinct from the jacket's olive drab base. Use sufficient tonal separation or an outline when green heraldic elements appear on OD fabric.",

  keywords: [
    "green",
    "hope",
    "growth",
    "renewal",
    "nature",
    "land",
    "stewardship",
  ],

  canonVersion: TINCTURE_CANON_VERSION,
};

const purpure: CanonEntry = {
  id: "purpure",

  name: "Purpure",

  category: "tincture",

  summary:
    "The heraldic color purple, traditionally associated with dignity, sovereignty, authority, and distinction.",

  traditionalAssociations: [
    "Dignity",
    "Authority",
    "Sovereignty",
    "Distinction",
    "Ambition",
  ],

  historicalNotes:
    "Purpure is the traditional heraldic term for purple. Although less common than several other heraldic colors, it has long carried visual associations with rank, dignity, and distinction.",

  associatedVirtues: [
    "Dignity",
    "Leadership",
    "Authority",
    "Ambition",
  ],

  associatedThemes: [
    "Leadership",
    "Distinction",
    "Achievement",
    "Legacy",
    "Authority",
  ],

  relatedEntries: [
    "or",
    "argent",
    "gules",
    "azure",
    "sable",
    "vert",
  ],

  designGuidance:
    "Use a deep purple that remains recognizably separate from navy blue and burgundy when converted to embroidery thread.",

  keywords: [
    "purple",
    "dignity",
    "authority",
    "leadership",
    "distinction",
    "sovereignty",
  ],

  canonVersion: TINCTURE_CANON_VERSION,
};

/*
 * Public tincture registry.
 *
 * Keep registry order deliberate:
 * metals first, followed by colors.
 */

export const tinctures: CanonEntry[] = [
  or,
  argent,
  gules,
  azure,
  sable,
  vert,
  purpure,
];

/*
 * Fast lookup table for application code.
 */

export const tinctureById: Record<string, CanonEntry> =
  Object.fromEntries(
    tinctures.map((tincture) => [
      tincture.id,
      tincture,
    ]),
  );

/*
 * Canon helpers
 */

export function getTinctureById(
  id: string,
): CanonEntry | undefined {
  return tinctureById[id.trim().toLowerCase()];
}

export function searchTinctures(
  query: string,
): CanonEntry[] {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return tinctures;
  }

  return tinctures.filter((tincture) => {
    const searchableText = [
      tincture.id,
      tincture.name,
      tincture.summary,
      ...tincture.traditionalAssociations,
      ...tincture.associatedVirtues,
      ...tincture.associatedThemes,
      ...(tincture.keywords ?? []),
    ]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(normalizedQuery);
  });
}

export function findTincturesByVirtue(
  virtue: string,
): CanonEntry[] {
  const normalizedVirtue = virtue
    .trim()
    .toLowerCase();

  if (!normalizedVirtue) {
    return [];
  }

  return tinctures.filter((tincture) =>
    tincture.associatedVirtues.some(
      (associatedVirtue) =>
        associatedVirtue.toLowerCase() ===
        normalizedVirtue,
    ),
  );
}
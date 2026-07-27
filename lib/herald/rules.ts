// lib/herald/rules.ts

import type {
  EmbroideryFinish,
  HeraldicStyle,
  ShieldShape,
} from "./types";

export const HERALDIC_COLORS = [
  "gold",
  "silver",
  "white",
  "black",
  "red",
  "blue",
  "green",
  "purple",
] as const;

export type HeraldicColor = (typeof HERALDIC_COLORS)[number];

export const SHIELD_SHAPES: {
  value: ShieldShape;
  label: string;
  description: string;
}[] = [
  {
    value: "heater",
    label: "Heater Shield",
    description: "Traditional medieval shield with balanced proportions.",
  },
  {
    value: "round",
    label: "Round Shield",
    description: "Compact shape suited to military and modern designs.",
  },
  {
    value: "kite",
    label: "Kite Shield",
    description: "Tall Norman-inspired shield with a dramatic silhouette.",
  },
  {
    value: "spanish",
    label: "Spanish Shield",
    description: "Rounded lower edge suited to detailed family crests.",
  },
];

export const HERALDIC_STYLES: {
  value: HeraldicStyle;
  label: string;
  description: string;
}[] = [
  {
    value: "traditional",
    label: "Traditional Heraldry",
    description: "Classic shields, animals, crowns, banners, and symbolism.",
  },
  {
    value: "military",
    label: "Military",
    description: "Bold insignia, simplified geometry, and strong contrast.",
  },
  {
    value: "modern",
    label: "Modern",
    description: "Minimal forms, clean lines, and reduced ornamentation.",
  },
  {
    value: "celtic",
    label: "Celtic",
    description: "Knots, stags, ravens, oak leaves, and circular motifs.",
  },
  {
    value: "nordic",
    label: "Nordic",
    description: "Runic geometry, wolves, ravens, axes, and angular forms.",
  },
];

export const EMBROIDERY_FINISHES: {
  value: EmbroideryFinish;
  label: string;
  maxThreadColors: number;
}[] = [
  {
    value: "regiment-gold",
    label: "Regiment Gold",
    maxThreadColors: 8,
  },
  {
    value: "heritage-ivory",
    label: "Heritage Ivory",
    maxThreadColors: 8,
  },
  {
    value: "tactical-subdued",
    label: "Tactical Subdued",
    maxThreadColors: 5,
  },
];

export const EMBROIDERY_RULES = {
  maximumThreadColors: 8,
  preferredThreadColors: 6,

  minimumLineWidthMm: 1.2,
  preferredLineWidthMm: 1.5,

  minimumLetterHeightMm: 5,
  preferredLetterHeightMm: 6,

  minimumGapMm: 1.2,
  minimumBorderClearanceMm: 2,

  maximumMottoCharacters: 32,
  maximumPrimarySymbols: 1,
  maximumSecondarySymbols: 2,

  patchSizesInches: [3, 4, 5] as const,

  estimatedStitchesPerSquareInch: {
    low: 1800,
    medium: 2800,
    high: 4000,
  },
};

export const SYMBOL_LIBRARY = [
  {
    id: "lion",
    label: "Lion",
    meanings: ["courage", "leadership", "strength"],
    styles: ["traditional", "military", "modern"],
  },
  {
    id: "eagle",
    label: "Eagle",
    meanings: ["freedom", "vision", "service"],
    styles: ["traditional", "military", "modern"],
  },
  {
    id: "stag",
    label: "Stag",
    meanings: ["endurance", "wisdom", "renewal"],
    styles: ["traditional", "celtic", "nordic"],
  },
  {
    id: "wolf",
    label: "Wolf",
    meanings: ["loyalty", "family", "protection"],
    styles: ["military", "modern", "nordic"],
  },
  {
    id: "bear",
    label: "Bear",
    meanings: ["strength", "protection", "resilience"],
    styles: ["traditional", "military", "nordic"],
  },
  {
    id: "raven",
    label: "Raven",
    meanings: ["intelligence", "memory", "guidance"],
    styles: ["celtic", "nordic", "modern"],
  },
  {
    id: "oak",
    label: "Oak Tree",
    meanings: ["family", "roots", "endurance"],
    styles: ["traditional", "celtic", "modern"],
  },
  {
    id: "anchor",
    label: "Anchor",
    meanings: ["steadfastness", "service", "hope"],
    styles: ["traditional", "military", "modern"],
  },
  {
    id: "sword",
    label: "Sword",
    meanings: ["honor", "justice", "service"],
    styles: ["traditional", "military", "nordic"],
  },
  {
    id: "torch",
    label: "Torch",
    meanings: ["knowledge", "guidance", "legacy"],
    styles: ["traditional", "military", "modern"],
  },
] as const;

export function getMaximumThreadColors(
  finish: EmbroideryFinish,
): number {
  const selectedFinish = EMBROIDERY_FINISHES.find(
    (item) => item.value === finish,
  );

  return (
    selectedFinish?.maxThreadColors ??
    EMBROIDERY_RULES.maximumThreadColors
  );
}

export function isAllowedHeraldicColor(
  color: string,
): color is HeraldicColor {
  return HERALDIC_COLORS.includes(
    color.toLowerCase() as HeraldicColor,
  );
}

export function getSymbolsForStyle(style: HeraldicStyle) {
  return SYMBOL_LIBRARY.filter((symbol) =>
    symbol.styles.some((s) => s === style),
  );
}

export function getSymbolsForValues(values: string[]) {
  const normalizedValues = values.map((value) =>
    value.trim().toLowerCase(),
  );

  return SYMBOL_LIBRARY.filter((symbol) =>
    symbol.meanings.some((meaning) =>
      normalizedValues.includes(meaning),
    ),
  );
}
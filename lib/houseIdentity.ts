
import type { BuilderShieldStyle } from "@/lib/herald/types";

export const HOUSE_IDENTITY_KEY =
  "family-regiment-house-identity";

export const BLAZER_DRAFT_KEY =
  "family-regiment-blazer-draft";

export const REGIMENT_DRAFT_KEY =
  "family-regiment-draft";

export type HouseIdentity = {
  familyName: string;
  initials: string;
  motto: string;
  animal: string;
  shield: BuilderShieldStyle;
};

export const DEFAULT_HOUSE_IDENTITY: HouseIdentity = {
  familyName: "Laurent",
  initials: "L",
  motto: "Fortis in Familia",
  animal: "Lion",
  shield: "Heater Shield",
};

export const HOUSE_ANIMALS = [
  "Lion",
  "Eagle",
  "Wolf",
  "Bear",
  "Stag",
  "Griffin",
  "Mako Shark",
] as const;

export const HOUSE_SHIELDS: BuilderShieldStyle[] = [
  "Heater Shield",
  "French Shield",
  "Norman Shield",
  "Spanish Shield",
  "Targe",
];

type SavedRecord = Record<string, unknown>;

function isRecord(value: unknown): value is SavedRecord {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

function readObject(key: string): SavedRecord | null {
  if (typeof window === "undefined") return null;

  try {
    const saved = window.localStorage.getItem(key);
    if (!saved) return null;

    const parsed: unknown = JSON.parse(saved);
    return isRecord(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function normalizeAnimalName(value: unknown): string | null {
  if (typeof value !== "string") return null;

  const candidate = value.trim();

  if (
    candidate === "Salmon" ||
    candidate === "Shark" ||
    candidate === "mako-shark"
  ) {
    return "Mako Shark";
  }

  return (
    HOUSE_ANIMALS.find((animal) => animal === candidate) ??
    null
  );
}

function normalizeShieldName(
  value: unknown,
): BuilderShieldStyle | null {
  if (typeof value !== "string") return null;

  const migrated =
    value === "Tournament Shield"
      ? "Spanish Shield"
      : value === "Crusader Shield"
        ? "Heater Shield"
        : value;

  return HOUSE_SHIELDS.find((shield) => shield === migrated) ??
    null;
}

export function normalizeHouseIdentity(
  value: Record<string, unknown>,
  fallback: HouseIdentity = DEFAULT_HOUSE_IDENTITY,
): HouseIdentity {
  const familyName =
    typeof value.familyName === "string"
      ? value.familyName.slice(0, 40)
      : fallback.familyName;

  const initials =
    typeof value.initials === "string"
      ? value.initials.slice(0, 12)
      : familyName.trim().charAt(0).toUpperCase() ||
        fallback.initials;

  const motto =
    typeof value.motto === "string"
      ? value.motto.slice(0, 60)
      : fallback.motto;

  const animal =
    normalizeAnimalName(
      typeof value.animal === "string"
        ? value.animal
        : value.symbol,
    ) ??
    normalizeAnimalName(fallback.animal) ??
    DEFAULT_HOUSE_IDENTITY.animal;

  const shield =
    normalizeShieldName(value.shield) ??
    fallback.shield;

  return {
    familyName,
    initials,
    motto,
    animal,
    shield,
  };
}

/**
 * Merge legacy drafts without allowing a partial record
 * to overwrite valid identity fields from another draft.
 *
 * Priority:
 * 1. Existing shared House identity
 * 2. Heritage Blazer draft
 * 3. Regiment Jacket draft
 * 4. Defaults
 */
export function readHouseIdentity(): HouseIdentity {
  const shared = readObject(HOUSE_IDENTITY_KEY);
  const blazer = readObject(BLAZER_DRAFT_KEY);
  const regiment = readObject(REGIMENT_DRAFT_KEY);

  const merged: SavedRecord = {
    ...DEFAULT_HOUSE_IDENTITY,
  };

  for (const source of [regiment, blazer, shared]) {
    if (!source) continue;

    if (typeof source.familyName === "string") {
      merged.familyName = source.familyName;
    }

    if (typeof source.initials === "string") {
      merged.initials = source.initials;
    }

    if (typeof source.motto === "string") {
      merged.motto = source.motto;
    }

    const animal =
      normalizeAnimalName(source.animal) ??
      normalizeAnimalName(source.symbol);

    if (animal) {
      merged.animal = animal;
    }

    const shield = normalizeShieldName(source.shield);

    if (shield) {
      merged.shield = shield;
    }
  }

  return normalizeHouseIdentity(merged);
}

/**
 * Save the shared House identity.
 *
 * Returns false when browser storage is unavailable.
 * Garment-specific preferences are stored separately.
 */
export function saveHouseIdentity(
  identity: HouseIdentity,
): boolean {
  if (typeof window === "undefined") return false;

  try {
    const normalized = normalizeHouseIdentity(identity);

    window.localStorage.setItem(
      HOUSE_IDENTITY_KEY,
      JSON.stringify(normalized),
    );

    return true;
  } catch {
    return false;
  }
}

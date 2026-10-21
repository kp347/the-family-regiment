
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

/*
 * Customer-facing primary charges.
 *
 * Mako Shark replaces Salmon as the seventh animal.
 * Salmon remains supported as a legacy saved value
 * through normalizeHouseIdentity().
 */
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

function isRecord(
  value: unknown,
): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

function readObject(
  key: string,
): Record<string, unknown> | null {
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

/*
 * Normalize legacy animal names before checking
 * the current customer-facing selection list.
 */
function normalizeAnimalName(
  value: unknown,
): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const candidate = value.trim();

  // Legacy Salmon designs migrate to Mako Shark.
  if (candidate === "Salmon") {
    return "Mako Shark";
  }

  // Support earlier generic Shark naming.
  if (candidate === "Shark") {
    return "Mako Shark";
  }

  // Support canonical asset ID in saved records.
  if (candidate === "mako-shark") {
    return "Mako Shark";
  }

  const match = HOUSE_ANIMALS.find(
    (animal) => animal === candidate,
  );

  return match ?? null;
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

  /*
   * Supports current House identity records
   * and legacy records using the "symbol" field.
   */
  const candidateAnimal =
    typeof value.animal === "string"
      ? value.animal
      : value.symbol;

  const animal =
    normalizeAnimalName(candidateAnimal) ??
    normalizeAnimalName(fallback.animal) ??
    DEFAULT_HOUSE_IDENTITY.animal;

  const shield =
    typeof value.shield === "string" &&
    HOUSE_SHIELDS.includes(
      value.shield as BuilderShieldStyle,
    )
      ? (value.shield as BuilderShieldStyle)
      : fallback.shield;

  return {
    familyName,
    initials,
    motto,
    animal,
    shield,
  };
}

export function readHouseIdentity(): HouseIdentity {
  const shared = readObject(HOUSE_IDENTITY_KEY);

  if (shared) {
    return normalizeHouseIdentity(shared);
  }

  // Migration: preserve an existing blazer design first.
  const blazer = readObject(BLAZER_DRAFT_KEY);

  if (blazer) {
    return normalizeHouseIdentity(blazer);
  }

  const regiment = readObject(REGIMENT_DRAFT_KEY);

  if (regiment) {
    return normalizeHouseIdentity(regiment);
  }

  return { ...DEFAULT_HOUSE_IDENTITY };
}

export function saveHouseIdentity(
  identity: HouseIdentity,
): boolean {
  if (typeof window === "undefined") {
    return false;
  }

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

// lib/herald/visualCanon/animalReferences.ts

import type { PrimaryChargeVisualCanonAssetId } from "./references";

export type AnimalReferenceArtwork = {
  assetId: PrimaryChargeVisualCanonAssetId;
  name: string;
  src: string;
  alt: string;
  objectPosition?: string;
  scale?: number;
};

/**
 * Controlled presentation artwork for the Primary Charge Visual Canon.
 *
 * These PNG files are customer-facing visual references only.
 * They are NOT vendor-authoritative production masters and must not
 * be treated as embroidery-ready artwork.
 */
export const animalReferenceArtwork: Record<
  PrimaryChargeVisualCanonAssetId,
  AnimalReferenceArtwork
> = {
  lion: {
    assetId: "lion",
    name: "Lion",
    src: "/canon/animals/lion.png",
    alt: "Family Regiment Lion heraldic reference artwork",
  },

  eagle: {
    assetId: "eagle",
    name: "Eagle",
    src: "/canon/animals/eagle.png",
    alt: "Family Regiment Eagle heraldic reference artwork",
  },

  wolf: {
    assetId: "wolf",
    name: "Wolf",
    src: "/canon/animals/wolf.png",
    alt: "Family Regiment Wolf heraldic reference artwork",
  },

  bear: {
    assetId: "bear",
    name: "Bear",
    src: "/canon/animals/bear.png",
    alt: "Family Regiment Bear heraldic reference artwork",
  },

  stag: {
    assetId: "stag",
    name: "Stag",
    src: "/canon/animals/stag.png",
    alt: "Family Regiment Stag heraldic reference artwork",

    // Stag needs slightly more room because of the antlers.
    scale: 1.08,
  },

  griffin: {
    assetId: "griffin",
    name: "Griffin",
    src: "/canon/animals/griffin.png",
    alt: "Family Regiment Griffin heraldic reference artwork",
  },

  salmon: {
    assetId: "salmon",
    name: "Salmon",
    src: "/canon/animals/salmon.png",
    alt: "Family Regiment Salmon heraldic reference artwork",

    // Salmon is the intentional full-body composition.
    scale: 1.05,
  },
};

export function getAnimalReferenceArtwork(
  assetId: PrimaryChargeVisualCanonAssetId,
): AnimalReferenceArtwork {
  return animalReferenceArtwork[assetId];
}

export function getAnimalReferenceByName(
  name: string,
): AnimalReferenceArtwork | undefined {
  return Object.values(animalReferenceArtwork).find(
    (artwork) =>
      artwork.name.toLowerCase() === name.trim().toLowerCase(),
  );
}
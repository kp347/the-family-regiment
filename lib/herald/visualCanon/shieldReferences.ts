// lib/herald/visualCanon/shieldReferences.ts

import type { ShieldVisualCanonAssetId } from "./references";

/*
 * =========================================================
 * The Family Regiment
 * Shield Presentation Reference Artwork
 * =========================================================
 *
 * These images are controlled customer-facing presentation
 * references for the V1 Shield Visual Canon.
 *
 * IMPORTANT:
 *
 * These PNG files are NOT vendor-authoritative production
 * masters and must not be treated as embroidery-ready
 * artwork.
 *
 * Final production artwork will eventually be derived from
 * controlled vector masters that have passed Family Regiment
 * design review, manufacturing validation, and physical
 * sample approval.
 *
 * Decorative details appearing in presentation artwork,
 * including fleur-de-lis ornamentation or a targe boss,
 * must not automatically be interpreted as structural
 * shield geometry.
 * =========================================================
 */

export type ShieldReferenceArtwork = {
  assetId: ShieldVisualCanonAssetId;
  name: string;
  src: string;
  alt: string;
  objectPosition?: string;
  scale?: number;
};

export const shieldReferenceArtwork: Record<
  ShieldVisualCanonAssetId,
  ShieldReferenceArtwork
> = {
  "heater-shield": {
    assetId: "heater-shield",
    name: "Heater Shield",
    src: "/canon/shields/heater-shield.png",
    alt: "Family Regiment Heater Shield presentation reference",
  },

  "french-shield": {
    assetId: "french-shield",
    name: "French Shield",
    src: "/canon/shields/french-shield.png",
    alt: "Family Regiment French Shield presentation reference",
  },

  "norman-shield": {
    assetId: "norman-shield",
    name: "Norman Shield",
    src: "/canon/shields/norman-shield.png",
    alt: "Family Regiment Norman Shield presentation reference",
    scale: 1.08,
  },

  "spanish-shield": {
    assetId: "spanish-shield",
    name: "Spanish Shield",
    src: "/canon/shields/spanish-shield.png",
    alt: "Family Regiment Spanish Shield presentation reference",
  },

  "targe-shield": {
    assetId: "targe-shield",
    name: "Targe",
    src: "/canon/shields/targe-shield.png",
    alt: "Family Regiment Targe presentation reference",
    scale: 0.94,
  },
};

export function getShieldReferenceArtwork(
  assetId: ShieldVisualCanonAssetId,
): ShieldReferenceArtwork {
  return shieldReferenceArtwork[assetId];
}

export function getShieldReferenceByName(
  name: string,
): ShieldReferenceArtwork | undefined {
  return Object.values(shieldReferenceArtwork).find(
    (artwork) => artwork.name === name,
  );
}
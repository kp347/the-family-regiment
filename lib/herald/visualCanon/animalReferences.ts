
import type { PrimaryChargeVisualCanonAssetId } from "./references";

/*
 * =========================================================
 * The Family Regiment
 * Animal Presentation Reference Artwork
 * =========================================================
 *
 * Each Primary Charge maintains two controlled presentation
 * assets:
 *
 * 1. src
 *    The original Visual Canon reference artwork.
 *
 * 2. transparentSrc
 *    A transparent presentation derivative used when the
 *    Canon artwork must be composited into customer-facing
 *    crest previews.
 *
 * Neither asset is a vendor-authoritative production master.
 *
 * Final production artwork will eventually use controlled
 * vector masters and manufacturing-safe derivatives that
 * have passed Family Regiment review and physical sampling.
 *
 * Salmon remains registered for legacy saved designs.
 * Mako Shark replaces Salmon in customer-facing selections.
 * =========================================================
 */

export type AnimalReferenceArtwork = {
  assetId: PrimaryChargeVisualCanonAssetId;
  name: string;

  /*
   * Original Visual Canon presentation reference.
   */
  src: string;

  /*
   * Transparent customer-facing presentation derivative.
   * Used by browser crest previews and similar compositions.
   */
  transparentSrc: string;

  alt: string;
  objectPosition?: string;
  scale?: number;
};

export const animalReferenceArtwork: Record<
  PrimaryChargeVisualCanonAssetId,
  AnimalReferenceArtwork
> = {
  lion: {
    assetId: "lion",
    name: "Lion",
    src: "/canon/animals/lion.png",
    transparentSrc:
      "/canon/animals/lion-transparent.png",
    alt: "Family Regiment Lion presentation reference",
  },

  eagle: {
    assetId: "eagle",
    name: "Eagle",
    src: "/canon/animals/eagle.png",
    transparentSrc:
      "/canon/animals/eagle-heraldic.png",
    alt: "Family Regiment Eagle heraldic presentation reference",
  },

  wolf: {
    assetId: "wolf",
    name: "Wolf",
    src: "/canon/animals/wolf.png",
    transparentSrc:
      "/canon/animals/wolf-heraldic.png",
    alt: "Family Regiment Wolf heraldic presentation reference",
  },

  bear: {
    assetId: "bear",
    name: "Bear",
    src: "/canon/animals/bear.png",
    transparentSrc:
      "/canon/animals/bear-heraldic.png",
    alt: "Family Regiment Bear heraldic presentation reference",
  },

  stag: {
    assetId: "stag",
    name: "Stag",
    src: "/canon/animals/stag.png",
    transparentSrc:
      "/canon/animals/stag-heraldic.png",
    alt: "Family Regiment Stag heraldic presentation reference",
    scale: 1.08,
  },

  griffin: {
    assetId: "griffin",
    name: "Griffin",
    src: "/canon/animals/griffin.png",
    transparentSrc:
      "/canon/animals/griffin-transparent.png",
    alt: "Family Regiment Griffin presentation reference",
  },

  /*
   * Approved customer-facing primary charge.
   *
   * Shortfin mako in a curved, leaping heraldic pose.
   * Antique-gold artwork with restrained wave accents.
   */
  "mako-shark": {
    assetId: "mako-shark",
    name: "Mako Shark",
    src: "/canon/animals/mako-shark-transparent.png",
    transparentSrc:
      "/canon/animals/mako-shark-transparent.png",
    alt: "Family Regiment Mako Shark heraldic presentation reference",
  },

  /*
   * Legacy only.
   *
   * Retained to support previously saved family designs.
   * Do not expose Salmon as a new customer selection.
   */
  salmon: {
    assetId: "salmon",
    name: "Salmon",
    src: "/canon/animals/salmon.png",
    transparentSrc:
      "/canon/animals/salmon-transparent.png",
    alt: "Family Regiment Salmon legacy presentation reference",
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
    (artwork) => artwork.name === name,
  );
}

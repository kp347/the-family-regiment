// lib/herald/visualCanon/references.ts

import { getVisualCanonAsset } from "./registry";
import type { VisualCanonAsset } from "./types";

export type PrimaryChargeVisualCanonAssetId =
  | "lion"
  | "eagle"
  | "wolf"
  | "bear"
  | "stag"
  | "griffin"
  | "salmon";

export type ShieldVisualCanonAssetId =
  | "heater-shield"
  | "norman-shield"
  | "tournament-shield"
  | "crusader-shield";

export type HeritageFlagVisualCanonAssetId =
  | "united-states"
  | "canada"
  | "mexico"
  | "brazil"
  | "france"
  | "united-kingdom"
  | "england"
  | "scotland"
  | "ireland"
  | "italy"
  | "germany"
  | "spain"
  | "portugal"
  | "netherlands"
  | "belgium"
  | "switzerland"
  | "sweden"
  | "norway"
  | "poland"
  | "greece"
  | "japan"
  | "south-korea"
  | "nigeria"
  | "ghana"
  | "south-africa"
  | "egypt"
  | "kenya";

export type VisualCanonAssetId =
  | PrimaryChargeVisualCanonAssetId
  | ShieldVisualCanonAssetId
  | HeritageFlagVisualCanonAssetId;

export interface VisualCanonReference {
  assetId: VisualCanonAssetId;
  variantId?: string;
  artworkVersion?: string;
}

const legacyPrimaryChargeMap: Record<string, VisualCanonReference> = {
  Lion: {
    assetId: "lion",
    variantId: "rampant",
  },

  Eagle: {
    assetId: "eagle",
  },

  Wolf: {
    assetId: "wolf",
  },

  Bear: {
    assetId: "bear",
  },

  Stag: {
    assetId: "stag",
  },

  Griffin: {
    assetId: "griffin",
  },

  Salmon: {
    assetId: "salmon",
  },
};

const legacyShieldMap: Record<string, VisualCanonReference> = {
  "Heater Shield": {
    assetId: "heater-shield",
  },

  "Norman Shield": {
    assetId: "norman-shield",
  },

  "Tournament Shield": {
    assetId: "tournament-shield",
  },

  "Crusader Shield": {
    assetId: "crusader-shield",
  },
};

const heritageFlagMap: Record<
  HeritageFlagVisualCanonAssetId,
  VisualCanonReference
> = {
  "united-states": {
    assetId: "united-states",
  },

  canada: {
    assetId: "canada",
  },

  mexico: {
    assetId: "mexico",
  },

  brazil: {
    assetId: "brazil",
  },

  france: {
    assetId: "france",
  },

  "united-kingdom": {
    assetId: "united-kingdom",
  },

  england: {
    assetId: "england",
  },

  scotland: {
    assetId: "scotland",
  },

  ireland: {
    assetId: "ireland",
  },

  italy: {
    assetId: "italy",
  },

  germany: {
    assetId: "germany",
  },

  spain: {
    assetId: "spain",
  },

  portugal: {
    assetId: "portugal",
  },

  netherlands: {
    assetId: "netherlands",
  },

  belgium: {
    assetId: "belgium",
  },

  switzerland: {
    assetId: "switzerland",
  },

  sweden: {
    assetId: "sweden",
  },

  norway: {
    assetId: "norway",
  },

  poland: {
    assetId: "poland",
  },

  greece: {
    assetId: "greece",
  },

  japan: {
    assetId: "japan",
  },

  "south-korea": {
    assetId: "south-korea",
  },

  nigeria: {
    assetId: "nigeria",
  },

  ghana: {
    assetId: "ghana",
  },

  "south-africa": {
    assetId: "south-africa",
  },

  egypt: {
    assetId: "egypt",
  },

  kenya: {
    assetId: "kenya",
  },
};

export function resolvePrimaryChargeReference(
  legacyValue: string,
): VisualCanonReference | undefined {
  return legacyPrimaryChargeMap[legacyValue];
}

export function resolveShieldReference(
  legacyValue: string,
): VisualCanonReference | undefined {
  return legacyShieldMap[legacyValue];
}

export function resolveHeritageFlagReference(
  assetId: HeritageFlagVisualCanonAssetId,
): VisualCanonReference {
  return heritageFlagMap[assetId];
}

export function resolveVisualCanonReference(
  reference: VisualCanonReference,
): VisualCanonAsset | undefined {
  return getVisualCanonAsset(reference.assetId);
}

export function isCurrentArtworkVersion(
  reference: VisualCanonReference,
): boolean {
  const asset = resolveVisualCanonReference(reference);

  if (!asset) {
    return false;
  }

  if (!reference.artworkVersion) {
    return true;
  }

  return reference.artworkVersion === asset.artworkVersion;
}

export interface VisualCanonReferenceSnapshot {
  assetId: VisualCanonAssetId;

  assetName: string;

  category: VisualCanonAsset["category"];

  canonVersion: string;

  artworkVersion: string;

  variantId?: string;
}

export function createVisualCanonReferenceSnapshot(
  reference: VisualCanonReference,
): VisualCanonReferenceSnapshot | undefined {
  const asset = resolveVisualCanonReference(reference);

  if (!asset) {
    return undefined;
  }

  return {
    assetId: reference.assetId,

    assetName: asset.name,

    category: asset.category,

    canonVersion: asset.canonVersion,

    artworkVersion: asset.artworkVersion,

    variantId: reference.variantId,
  };
}
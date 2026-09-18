// lib/herald/visualCanon/references.ts

import { getVisualCanonAsset } from "./registry";
import type { VisualCanonAsset } from "./types";

export type VisualCanonAssetId =
  | "lion"
  | "eagle"
  | "wolf"
  | "bear"
  | "stag"
  | "griffin"
  | "salmon"
  | "heater-shield"
  | "norman-shield"
  | "tournament-shield"
  | "crusader-shield";

export interface VisualCanonReference {
  assetId: VisualCanonAssetId;
  variantId?: string;
  artworkVersion?: string;
}

const legacyPrimaryChargeMap: Record<
  string,
  VisualCanonReference
> = {
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

const legacyShieldMap: Record<
  string,
  VisualCanonReference
> = {
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

export function resolveVisualCanonReference(
  reference: VisualCanonReference,
): VisualCanonAsset | undefined {
  return getVisualCanonAsset(
    reference.assetId,
  );
}

export function isCurrentArtworkVersion(
  reference: VisualCanonReference,
): boolean {
  const asset =
    resolveVisualCanonReference(
      reference,
    );

  if (!asset) {
    return false;
  }

  if (!reference.artworkVersion) {
    return true;
  }

  return (
    reference.artworkVersion ===
    asset.artworkVersion
  );
}

export interface VisualCanonReferenceSnapshot {
  assetId: VisualCanonAssetId;

  assetName: string;

  category:
    VisualCanonAsset["category"];

  canonVersion: string;

  artworkVersion: string;

  variantId?: string;
}

export function createVisualCanonReferenceSnapshot(
  reference: VisualCanonReference,
): VisualCanonReferenceSnapshot | undefined {
  const asset =
    resolveVisualCanonReference(
      reference,
    );

  if (!asset) {
    return undefined;
  }

  return {
    assetId: reference.assetId,

    assetName: asset.name,

    category: asset.category,

    canonVersion:
      asset.canonVersion,

    artworkVersion:
      asset.artworkVersion,

    variantId:
      reference.variantId,
  };
}
// lib/herald/visualCanon/registry.ts

import { heritageFlagAssets } from "./assets/heritageFlags";
import { primaryChargeAssets } from "./assets/primaryCharges";
import { shieldAssets } from "./assets/shields";

import type {
  VisualCanonAsset,
  VisualCanonAssetStatus,
  VisualCanonCategory,
} from "./types";

export const VISUAL_CANON_VERSION = "1.0.0";

/*
 * =========================================================
 * The Family Regiment
 * Visual Canon Registry
 * =========================================================
 *
 * Authoritative index of reusable heraldic visual assets.
 *
 * Asset definitions live in category-specific modules.
 * Registration does NOT imply production approval.
 * =========================================================
 */

export const visualCanonRegistry: readonly VisualCanonAsset[] =
  Object.freeze([
    ...primaryChargeAssets,
    ...shieldAssets,
    ...heritageFlagAssets,
  ]);

/*
 * =========================================================
 * Retrieval
 * =========================================================
 */

export function getVisualCanonAsset(
  id: string
): VisualCanonAsset | undefined {
  return visualCanonRegistry.find(
    (asset) => asset.id === id
  );
}

export function getVisualCanonAssetsByCategory(
  category: VisualCanonCategory
): VisualCanonAsset[] {
  return visualCanonRegistry.filter(
    (asset) => asset.category === category
  );
}

export function getVisualCanonAssetsByStatus(
  status: VisualCanonAssetStatus
): VisualCanonAsset[] {
  return visualCanonRegistry.filter(
    (asset) => asset.status === status
  );
}

/*
 * =========================================================
 * Search
 * =========================================================
 */

export function searchVisualCanon(
  query: string
): VisualCanonAsset[] {
  const normalized =
    query.trim().toLowerCase();

  if (!normalized) {
    return [];
  }

  return visualCanonRegistry.filter(
    (asset) => {
      const searchable = [
        asset.id,
        asset.name,
        asset.description,
        ...asset.keywords,
        asset.heraldicNotes ?? "",
      ]
        .join(" ")
        .toLowerCase();

      return searchable.includes(
        normalized
      );
    }
  );
}

/*
 * =========================================================
 * Registry Integrity
 * =========================================================
 */

export function validateVisualCanonRegistry(): string[] {
  const errors: string[] = [];
  const ids = new Set<string>();

  for (const asset of visualCanonRegistry) {
    if (ids.has(asset.id)) {
      errors.push(
        `Duplicate Visual Canon asset ID: ${asset.id}`
      );
    }

    ids.add(asset.id);

    if (
      asset.status === "canon-certified" &&
      !asset.production.physicallySampled
    ) {
      errors.push(
        `${asset.id} is canon-certified but has not been physically sampled.`
      );
    }

    if (
      asset.production.physicallySampled &&
      asset.status === "draft"
    ) {
      errors.push(
        `${asset.id} is marked physically sampled while its status remains draft.`
      );
    }
  }

  return errors;
}
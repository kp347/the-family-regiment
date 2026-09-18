// lib/herald/visualCanon/types.ts

/*
 * =========================================================
 * The Family Regiment
 * Visual Heraldic Canon
 * =========================================================
 *
 * The Visual Canon is the authoritative registry for
 * reusable heraldic artwork.
 *
 * AI may recommend or select canonical assets.
 * AI does NOT redefine approved asset geometry.
 *
 * Customer preview artwork and production artwork should
 * ultimately resolve to these same canonical identities.
 * =========================================================
 */

export type VisualCanonCategory =
  | "shield"
  | "primary-charge"
  | "secondary-symbol"
  | "heritage-flag"
  | "ordinary"
  | "crown"
  | "coronet"
  | "helm"
  | "torse"
  | "mantling"
  | "banner"
  | "ornament";

export type VisualCanonAssetStatus =
  | "draft"
  | "visual-approved"
  | "production-reviewed"
  | "sample-tested"
  | "canon-certified";

export type VisualCanonArtworkFormat =
  | "svg";

export type VisualCanonProductionMethod =
  | "embroidery"
  | "woven"
  | "print"
  | "digital";

export type VisualCanonComplexity =
  | 1
  | 2
  | 3
  | 4
  | 5;

export interface VisualCanonDimensions {
  /*
   * Bounding-box proportions of the canonical artwork.
   *
   * These do NOT represent final patch dimensions.
   */

  viewBoxWidth: number;

  viewBoxHeight: number;
}

export interface VisualCanonEmbroideryRules {
  /*
   * Minimum recommended finished height for this asset
   * when used as a principal visual element.
   */

  minimumHeightInches?: number;

  /*
   * Minimum recommended finished width.
   */

  minimumWidthInches?: number;

  /*
   * Maximum thread colors required by the canonical asset
   * itself, excluding surrounding crest components.
   */

  maximumThreadColors?: number;

  /*
   * Production guidance established during artwork review
   * and later updated through physical sampling.
   */

  notes?: string[];
}

export interface VisualCanonProductionProfile {
  supportedMethods:
    VisualCanonProductionMethod[];

  embroidery:
    VisualCanonEmbroideryRules;

  complexity:
    VisualCanonComplexity;

  /*
   * True only after a physical sample has been evaluated.
   */

  physicallySampled: boolean;

  /*
   * Optional record of the smallest successfully tested
   * reproduction.
   */

  smallestTestedWidthInches?: number;

  smallestTestedHeightInches?: number;
}

export interface VisualCanonVariant {
  /*
   * Stable machine-readable variant ID.
   *
   * Example:
   * rampant
   * passant
   * statant
   */

  id: string;

  name: string;

  description: string;

  status:
    VisualCanonAssetStatus;

  production:
    VisualCanonProductionProfile;
}

export interface VisualCanonAsset {
  /*
   * Stable canonical ID.
   *
   * Once an asset reaches production use, this ID should
   * never be silently reassigned to different artwork.
   *
   * Example:
   * lion
   * eagle
   * heater-shield
   * france-flag
   */

  id: string;

  name: string;

  category:
    VisualCanonCategory;

  /*
   * Human-readable description of the visual identity.
   */

  description: string;

  /*
   * Canon version in which this asset definition exists.
   */

  canonVersion: string;

  /*
   * Artwork version is separate from canon version.
   *
   * Geometry changes require an artwork version change.
   */

  artworkVersion: string;

  artworkFormat:
    VisualCanonArtworkFormat;

  dimensions:
    VisualCanonDimensions;

  status:
    VisualCanonAssetStatus;

  production:
    VisualCanonProductionProfile;

  /*
   * Some heraldic subjects have historically meaningful
   * positional variants.
   */

  variants?: VisualCanonVariant[];

  /*
   * Search and interpretation terms.
   *
   * AI/recommendation systems may use these terms to find
   * appropriate assets without changing their geometry.
   */

  keywords: string[];

  /*
   * Internal historical/heraldic note.
   *
   * This does not itself claim a specific family's right
   * to use the symbol.
   */

  heraldicNotes?: string;

  /*
   * Production notes apply to the canonical artwork itself.
   */

  productionNotes?: string[];

  /*
   * Optional path to the canonical SVG component/module.
   *
   * Example:
   * "@/lib/herald/svg/animals/lion"
   * "@/lib/herald/svg/flags/france"
   *
   * This is registry metadata, not dynamic import logic.
   */

  componentPath?: string;
}

/*
 * =========================================================
 * Certification Helpers
 * =========================================================
 */

export function isVisualApproved(
  asset: VisualCanonAsset,
): boolean {
  return [
    "visual-approved",
    "production-reviewed",
    "sample-tested",
    "canon-certified",
  ].includes(
    asset.status,
  );
}

export function isProductionReviewed(
  asset: VisualCanonAsset,
): boolean {
  return [
    "production-reviewed",
    "sample-tested",
    "canon-certified",
  ].includes(
    asset.status,
  );
}

export function isSampleTested(
  asset: VisualCanonAsset,
): boolean {
  return [
    "sample-tested",
    "canon-certified",
  ].includes(
    asset.status,
  );
}

export function isCanonCertified(
  asset: VisualCanonAsset,
): boolean {
  return (
    asset.status ===
    "canon-certified"
  );
}

/*
 * =========================================================
 * Automatic Production Eligibility
 * =========================================================
 *
 * Eventually the vendor-package system can use this gate.
 *
 * During early development we can still manually review
 * production-reviewed artwork, but nothing should silently
 * become production-authoritative simply because an SVG
 * file exists.
 */

export function isAutomaticallyProductionEligible(
  asset: VisualCanonAsset,
): boolean {
  return (
    asset.status ===
      "canon-certified" &&
    asset.production.physicallySampled
  );
}
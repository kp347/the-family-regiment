export const MILITARY_BRANCH_IDS = [
  "army",
  "navy",
  "air-force",
  "marine-corps",
  "coast-guard",
  "space-force",
] as const;

export type MilitaryBranchCanonId =
  (typeof MILITARY_BRANCH_IDS)[number];

export type MilitaryBranchCanonStatus =
  | "prototype"
  | "approved"
  | "production-ready";

export type MilitaryBranchCanonAsset = {
  id: MilitaryBranchCanonId;

  /**
   * Customer-facing branch name.
   */
  label:
    | "Army"
    | "Navy"
    | "Air Force"
    | "Marine Corps"
    | "Coast Guard"
    | "Space Force";

  /**
   * Compact fallback label.
   */
  shortLabel: string;

  /**
   * Permanent customer-facing Canon SVG.
   */
  artworkSrc: string;

  /**
   * Optical normalization used only when presenting
   * the Canon artwork inside the standardized
   * left-chest identity-patch envelope.
   *
   * This does NOT alter jacket placement or the
   * underlying SVG master.
   */
  previewScale: number;

  /**
   * Optional production-specific SVG.
   *
   * Future embroidery simplification stays separate
   * from the approved customer-facing Canon artwork.
   */
  productionSrc?: string;

  status: MilitaryBranchCanonStatus;

  /**
   * Internal production guidance.
   */
  productionNotes: string;
};

export const militaryBranchCanonAssets: readonly MilitaryBranchCanonAsset[] =
  [
    {
      id: "army",
      label: "Army",
      shortLabel: "ARMY",
      artworkSrc:
        "/canon/military/army.svg",
      previewScale: 0.82,
      status: "prototype",
      productionNotes:
        "V1 branch identity patch. Preserve branch recognition and embroidery legibility at the calibrated left-chest patch size.",
    },

    {
      id: "navy",
      label: "Navy",
      shortLabel: "NAVY",
      artworkSrc:
        "/canon/military/navy.svg",
      previewScale: 0.82,
      status: "prototype",
      productionNotes:
        "V1 branch identity patch. Preserve branch recognition and embroidery legibility at the calibrated left-chest patch size.",
    },

    {
      id: "air-force",
      label: "Air Force",
      shortLabel: "AIR FORCE",
      artworkSrc:
        "/canon/military/air-force.svg",
      previewScale: 0.68,
      status: "prototype",
      productionNotes:
        "V1 branch identity patch. Preserve branch recognition and embroidery legibility at the calibrated left-chest patch size.",
    },

    {
      id: "marine-corps",
      label: "Marine Corps",
      shortLabel: "MARINES",
      artworkSrc:
        "/canon/military/marine-corps.svg",
      previewScale: 0.82,
      status: "prototype",
      productionNotes:
        "V1 branch identity patch. Preserve branch recognition and embroidery legibility at the calibrated left-chest patch size.",
    },

    {
      id: "coast-guard",
      label: "Coast Guard",
      shortLabel: "COAST GUARD",
      artworkSrc:
        "/canon/military/coast-guard.svg",
      previewScale: 0.78,
      status: "prototype",
      productionNotes:
        "V1 branch identity patch. Preserve branch recognition and embroidery legibility at the calibrated left-chest patch size.",
    },

    {
      id: "space-force",
      label: "Space Force",
      shortLabel: "SPACE FORCE",
      artworkSrc:
        "/canon/military/space-force.svg",
      previewScale: 0.82,
      status: "prototype",
      productionNotes:
        "V1 branch identity patch. Preserve branch recognition and embroidery legibility at the calibrated left-chest patch size.",
    },
  ] as const;

export function getMilitaryBranchCanonAsset(
  branch:
    | "None"
    | "Army"
    | "Navy"
    | "Air Force"
    | "Marine Corps"
    | "Coast Guard"
    | "Space Force",
): MilitaryBranchCanonAsset | undefined {
  if (branch === "None") {
    return undefined;
  }

  return militaryBranchCanonAssets.find(
    (asset) =>
      asset.label === branch,
  );
}
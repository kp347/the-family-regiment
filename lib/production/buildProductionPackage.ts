// lib/production/buildProductionPackage.ts

import type {
  PatchProductionSpec,
  ProductionApprovalRecord,
  ProductionApprovalStage,
} from "./types";

/*
 * =========================================================
 * The Family Regiment
 * Vendor Production Package
 * =========================================================
 *
 * This layer prepares an approved production specification
 * for manufacturer review.
 *
 * It does NOT create the PDF or ZIP itself.
 *
 * Instead, it produces one clean data object that future
 * exports can consume consistently.
 */

export type VendorPackageStatus =
  | "draft"
  | "ready-to-send"
  | "sent"
  | "vendor-review"
  | "quote-received"
  | "sample-requested"
  | "closed";

/*
 * =========================================================
 * Artwork
 * =========================================================
 */

export interface VendorPackageArtwork {
  masterArtworkUrl?: string;

  referenceImageUrl?: string;

  masterFormat?: string;

  artworkVersion: string;

  referenceLabel?: string;

  notes?: string;
}

/*
 * =========================================================
 * Approval
 * =========================================================
 *
 * The vendor package carries a read-only snapshot of the
 * production approval state.
 *
 * This makes approval status visible in future PDF and ZIP
 * exports without allowing the vendor package itself to
 * become the source of truth.
 */

export interface VendorPackageApprovalRecord {
  stage: ProductionApprovalStage;

  approved: boolean;

  approvedAt?: string;

  approvedBy?: string;

  notes?: string;
}

export interface VendorPackageApproval {
  currentStage: ProductionApprovalStage;

  records: VendorPackageApprovalRecord[];
}

/*
 * =========================================================
 * Garment
 * =========================================================
 */

export interface VendorPackageGarment {
  silhouette: string;

  placement: string;

  manufacturer?: string;

  styleNumber?: string;

  color?: string;
}

/*
 * =========================================================
 * Dimensions
 * =========================================================
 */

export interface VendorPackageDimensions {
  widthInches: number;

  heightInches: number;
}

/*
 * =========================================================
 * Color
 * =========================================================
 */

export interface VendorPackageColor {
  role: string;

  hex?: string;

  threadSystem?: string;

  threadCode?: string;
}

/*
 * =========================================================
 * Materials
 * =========================================================
 */

export interface VendorPackageMaterials {
  baseMaterial: string;

  embroideryFinish: string;

  border: string;

  backing: string;

  colors: VendorPackageColor[];
}

/*
 * =========================================================
 * Quantity
 * =========================================================
 */

export interface VendorPackageQuantity {
  sampleQuantity: number;

  productionQuantity: number;
}

/*
 * =========================================================
 * Vendor Production Package
 * =========================================================
 */

export interface VendorProductionPackage {
  packageId: string;

  productionSpecId: string;

  productionSpecVersion: number;

  status: VendorPackageStatus;

  createdAt: string;

  updatedAt: string;

  artwork: VendorPackageArtwork;

  approval: VendorPackageApproval;

  garment: VendorPackageGarment;

  dimensions: VendorPackageDimensions;

  construction: string;

  materials: VendorPackageMaterials;

  quantity: VendorPackageQuantity;

  requestedCompletionDate?: string;

  productionNotes?: string;

  /*
   * These fields are intentionally optional.
   *
   * We should be able to prepare a production package
   * before selecting the manufacturer.
   */

  vendor?: {
    vendorId?: string;

    vendorName?: string;

    contactName?: string;

    contactEmail?: string;
  };
}

type BuildProductionPackageOptions = {
  packageId: string;

  status?: VendorPackageStatus;

  vendor?: {
    vendorId?: string;

    vendorName?: string;

    contactName?: string;

    contactEmail?: string;
  };
};

/*
 * =========================================================
 * Build Vendor Production Package
 * =========================================================
 */

export function buildProductionPackage(
  spec: PatchProductionSpec,
  options: BuildProductionPackageOptions,
): VendorProductionPackage {
  const now = new Date().toISOString();

  return {
    packageId:
      options.packageId,

    productionSpecId:
      spec.productionSpecId,

    productionSpecVersion:
      spec.version,

    status:
      options.status ??
      "draft",

    createdAt:
      now,

    updatedAt:
      now,

    artwork: {
      masterArtworkUrl:
        spec.artwork.masterArtworkUrl,

      referenceImageUrl:
        spec.artwork.referenceImageUrl,

      masterFormat:
        spec.artwork.masterFormat,

      artworkVersion:
        spec.artwork.artworkVersion,

      referenceLabel:
        spec.artwork.referenceLabel,

      notes:
        spec.artwork.notes,
    },

    approval: {
      currentStage:
        spec.approval.currentStage,

      records:
        spec.approval.records.map(
          mapApprovalRecord,
        ),
    },

    garment: {
      silhouette:
        formatLabel(
          spec.garment.silhouetteId,
        ),

      placement:
        formatLabel(
          spec.garment.placementId,
        ),

      manufacturer:
        spec.garment.manufacturer,

      styleNumber:
        spec.garment
          .manufacturerStyleNumber,

      color:
        spec.garment.color,
    },

    dimensions: {
      widthInches:
        spec.dimensions.widthInches,

      heightInches:
        spec.dimensions.heightInches,
    },

    construction:
      formatLabel(
        spec.construction,
      ),

    materials: {
      baseMaterial:
        spec.materials.baseMaterial,

      embroideryFinish:
        formatLabel(
          spec.materials
            .embroideryFinish,
        ),

      border:
        formatLabel(
          spec.finishing.border,
        ),

      backing:
        formatLabel(
          spec.finishing.backing,
        ),

      colors:
        spec.materials.colors.map(
          (color) => ({
            role:
              color.role,

            hex:
              color.hex,

            threadSystem:
              color.threadSystem,

            threadCode:
              color.threadCode,
          }),
        ),
    },

    quantity: {
      sampleQuantity:
        spec.quantity
          .sampleQuantity,

      productionQuantity:
        spec.quantity
          .productionQuantity,
    },

    requestedCompletionDate:
      spec.deadline
        .requestedCompletionDate,

    productionNotes:
      spec.productionNotes,

    vendor:
      options.vendor,
  };
}

/*
 * =========================================================
 * Approval Mapping
 * =========================================================
 */

function mapApprovalRecord(
  record: ProductionApprovalRecord,
): VendorPackageApprovalRecord {
  return {
    stage:
      record.stage,

    approved:
      record.approved,

    approvedAt:
      record.approvedAt,

    approvedBy:
      record.approvedBy,

    notes:
      record.notes,
  };
}

/*
 * =========================================================
 * Formatting
 * =========================================================
 */

function formatLabel(
  value: string,
): string {
  return value
    .split("-")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() +
        word.slice(1),
    )
    .join(" ");
}
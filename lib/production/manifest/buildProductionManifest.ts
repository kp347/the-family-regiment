// lib/production/manifest/buildProductionManifest.ts

import type {
  VendorProductionPackage,
} from "../buildProductionPackage";

/*
 * =========================================================
 * The Family Regiment
 * Production Manifest
 * =========================================================
 *
 * The production manifest is the machine-readable companion
 * to the manufacturer PDF traveler.
 *
 * Future vendor ZIP structure:
 *
 * FR-VENDOR-0001/
 *   production-traveler.pdf
 *   manifest.json
 *   artwork/
 *     crest-master.svg
 *     crest-reference.png
 *
 * The VendorProductionPackage remains the source of truth.
 * This manifest is an export representation only.
 */

export const PRODUCTION_MANIFEST_VERSION =
  1 as const;

export interface ProductionManifest {
  manifestVersion:
    typeof PRODUCTION_MANIFEST_VERSION;

  generatedAt: string;

  package: {
    packageId: string;

    status: string;

    productionSpecId: string;

    productionSpecVersion: number;
  };

  artwork: {
    artworkVersion: string;

    masterFormat?: string;

    masterArtworkIncluded: boolean;

    referenceImageIncluded: boolean;

    referenceLabel?: string;

    notes?: string;
  };

  approval: {
    currentStage: string;

    productionAuthorized: boolean;

    records: Array<{
      stage: string;

      approved: boolean;

      approvedAt?: string;

      approvedBy?: string;

      notes?: string;
    }>;
  };

  garment: {
    silhouette: string;

    placement: string;

    manufacturer?: string;

    styleNumber?: string;

    color?: string;
  };

  patch: {
    construction: string;

    dimensions: {
      widthInches: number;

      heightInches: number;
    };

    materials: {
      baseMaterial: string;

      embroideryFinish: string;

      border: string;

      backing: string;
    };

    colors: Array<{
      role: string;

      hex?: string;

      threadSystem?: string;

      threadCode?: string;
    }>;
  };

  order: {
    sampleQuantity: number;

    productionQuantity: number;

    requestedCompletionDate?: string;
  };

  vendor?: {
    vendorId?: string;

    vendorName?: string;

    contactName?: string;

    contactEmail?: string;
  };

  productionNotes?: string;

  controls: {
    requiresPhysicalSampleApproval: boolean;

    bulkProductionAuthorized: boolean;

    artworkComplete: boolean;
  };
}

/*
 * =========================================================
 * Build Production Manifest
 * =========================================================
 */

export function buildProductionManifest(
  packageData: VendorProductionPackage,
): ProductionManifest {
  const productionAuthorized =
    packageData.approval.records.some(
      (record) =>
        record.stage ===
          "production-authorized" &&
        record.approved,
    );

  const artworkComplete =
    Boolean(
      packageData.artwork.masterArtworkUrl &&
        packageData.artwork.referenceImageUrl,
    );

  return {
    manifestVersion:
      PRODUCTION_MANIFEST_VERSION,

    generatedAt:
      new Date().toISOString(),

    package: {
      packageId:
        packageData.packageId,

      status:
        packageData.status,

      productionSpecId:
        packageData.productionSpecId,

      productionSpecVersion:
        packageData.productionSpecVersion,
    },

    artwork: {
      artworkVersion:
        packageData.artwork.artworkVersion,

      masterFormat:
        packageData.artwork.masterFormat,

      masterArtworkIncluded:
        Boolean(
          packageData.artwork.masterArtworkUrl,
        ),

      referenceImageIncluded:
        Boolean(
          packageData.artwork.referenceImageUrl,
        ),

      referenceLabel:
        packageData.artwork.referenceLabel,

      notes:
        packageData.artwork.notes,
    },

    approval: {
      currentStage:
        packageData.approval.currentStage,

      productionAuthorized,

      records:
        packageData.approval.records.map(
          (record) => ({
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
          }),
        ),
    },

    garment: {
      silhouette:
        packageData.garment.silhouette,

      placement:
        packageData.garment.placement,

      manufacturer:
        packageData.garment.manufacturer,

      styleNumber:
        packageData.garment.styleNumber,

      color:
        packageData.garment.color,
    },

    patch: {
      construction:
        packageData.construction,

      dimensions: {
        widthInches:
          packageData.dimensions.widthInches,

        heightInches:
          packageData.dimensions.heightInches,
      },

      materials: {
        baseMaterial:
          packageData.materials.baseMaterial,

        embroideryFinish:
          packageData.materials.embroideryFinish,

        border:
          packageData.materials.border,

        backing:
          packageData.materials.backing,
      },

      colors:
        packageData.materials.colors.map(
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

    order: {
      sampleQuantity:
        packageData.quantity.sampleQuantity,

      productionQuantity:
        packageData.quantity.productionQuantity,

      requestedCompletionDate:
        packageData.requestedCompletionDate,
    },

    vendor:
      packageData.vendor,

    productionNotes:
      packageData.productionNotes,

    controls: {
      /*
       * Family Regiment custom crest production requires
       * physical sample approval before bulk manufacturing.
       */

      requiresPhysicalSampleApproval:
        true,

      bulkProductionAuthorized:
        productionAuthorized,

      artworkComplete,
    },
  };
}

/*
 * =========================================================
 * Serialize Manifest
 * =========================================================
 */

export function serializeProductionManifest(
  packageData: VendorProductionPackage,
): string {
  const manifest =
    buildProductionManifest(
      packageData,
    );

  return JSON.stringify(
    manifest,
    null,
    2,
  );
}
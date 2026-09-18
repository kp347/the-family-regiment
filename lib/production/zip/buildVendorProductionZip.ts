// lib/production/zip/buildVendorProductionZip.ts

import JSZip from "jszip";

import type {
  VendorProductionPackage,
} from "@/lib/production/buildProductionPackage";

import {
  serializeProductionManifest,
} from "@/lib/production/manifest/buildProductionManifest";

import {
  buildProductionTravelerPdf,
} from "@/lib/production/pdf/buildProductionTravelerPdf";

/*
 * =========================================================
 * The Family Regiment
 * Vendor Production ZIP
 * =========================================================
 *
 * Canonical vendor package structure:
 *
 * FR-VENDOR-0001/
 *   production-traveler.pdf
 *   manifest.json
 *   artwork/
 *     crest-master.svg
 *     crest-reference.png
 *
 * Artwork files are included ONLY when actual approved
 * artwork bytes are supplied.
 *
 * We deliberately do not create fake placeholder artwork.
 */

export type ReferenceImageFormat =
  | "png"
  | "jpg"
  | "jpeg"
  | "webp";

export interface VendorProductionZipArtwork {
  masterArtwork?: Uint8Array;

  referenceImage?: Uint8Array;

  referenceImageFormat?: ReferenceImageFormat;
}

export interface BuildVendorProductionZipOptions {
  artwork?: VendorProductionZipArtwork;
}

export interface VendorProductionZipResult {
  bytes: Uint8Array;

  filename: string;

  rootFolderName: string;
}

export async function buildVendorProductionZip(
  packageData: VendorProductionPackage,
  options: BuildVendorProductionZipOptions = {},
): Promise<VendorProductionZipResult> {
  validatePackage(packageData);

  const rootFolderName =
    sanitizeFileSegment(
      packageData.packageId,
    );

  const zip =
    new JSZip();

  const root =
    zip.folder(
      rootFolderName,
    );

  if (!root) {
    throw new Error(
      "Unable to create vendor package folder.",
    );
  }

  /*
   * =======================================================
   * PDF Production Traveler
   * =======================================================
   */

  const travelerPdf =
    await buildProductionTravelerPdf(
      packageData,
    );

  root.file(
    "production-traveler.pdf",
    travelerPdf,
  );

  /*
   * =======================================================
   * Machine-readable Manifest
   * =======================================================
   */

  const manifest =
    serializeProductionManifest(
      packageData,
    );

  root.file(
    "manifest.json",
    manifest,
  );

  /*
   * =======================================================
   * Approved Artwork
   * =======================================================
   *
   * Actual artwork is optional at this stage.
   *
   * The production manifest remains authoritative about
   * whether artwork is complete.
   */

  const artworkOptions =
    options.artwork;

  if (
    artworkOptions?.masterArtwork ||
    artworkOptions?.referenceImage
  ) {
    const artworkFolder =
      root.folder(
        "artwork",
      );

    if (!artworkFolder) {
      throw new Error(
        "Unable to create artwork folder.",
      );
    }

    if (
      artworkOptions.masterArtwork
    ) {
      const masterFormat =
        packageData.artwork.masterFormat;

      if (!masterFormat) {
        throw new Error(
          "Master artwork bytes were supplied, but no master artwork format is recorded.",
        );
      }

      artworkFolder.file(
        `crest-master.${sanitizeExtension(masterFormat)}`,
        artworkOptions.masterArtwork,
      );
    }

    if (
      artworkOptions.referenceImage
    ) {
      const referenceFormat =
        artworkOptions.referenceImageFormat ??
        "png";

      artworkFolder.file(
        `crest-reference.${sanitizeExtension(referenceFormat)}`,
        artworkOptions.referenceImage,
      );
    }
  }

  /*
   * =======================================================
   * Generate Archive
   * =======================================================
   */

  const bytes =
    await zip.generateAsync({
      type: "uint8array",

      compression:
        "DEFLATE",

      compressionOptions: {
        level: 6,
      },

      platform:
        "DOS",
    });

  return {
    bytes,

    filename:
      `${rootFolderName}-vendor-package.zip`,

    rootFolderName,
  };
}

/*
 * =========================================================
 * Validation
 * =========================================================
 */

function validatePackage(
  packageData: VendorProductionPackage,
): void {
  if (!packageData) {
    throw new Error(
      "Vendor production package is required.",
    );
  }

  if (
    !packageData.packageId?.trim()
  ) {
    throw new Error(
      "Vendor package ID is required.",
    );
  }

  if (
    !packageData.productionSpecId?.trim()
  ) {
    throw new Error(
      "Production specification ID is required.",
    );
  }

  if (
    !packageData.artwork
  ) {
    throw new Error(
      "Artwork information is required.",
    );
  }

  if (
    !packageData.approval
  ) {
    throw new Error(
      "Production approval information is required.",
    );
  }

  if (
    !packageData.garment
  ) {
    throw new Error(
      "Garment information is required.",
    );
  }

  if (
    !packageData.dimensions
  ) {
    throw new Error(
      "Production dimensions are required.",
    );
  }

  if (
    !packageData.materials
  ) {
    throw new Error(
      "Production materials are required.",
    );
  }

  if (
    !packageData.quantity
  ) {
    throw new Error(
      "Production quantity information is required.",
    );
  }
}

/*
 * =========================================================
 * Filename Safety
 * =========================================================
 */

function sanitizeFileSegment(
  value: string,
): string {
  const safe =
    value
      .trim()
      .replace(
        /[^a-zA-Z0-9_-]+/g,
        "-",
      )
      .replace(
        /^-+|-+$/g,
        "",
      );

  return (
    safe ||
    "family-regiment-production"
  );
}

function sanitizeExtension(
  value: string,
): string {
  const safe =
    value
      .trim()
      .toLowerCase()
      .replace(
        /[^a-z0-9]+/g,
        "",
      );

  if (!safe) {
    throw new Error(
      "Invalid artwork file extension.",
    );
  }

  return safe;
}
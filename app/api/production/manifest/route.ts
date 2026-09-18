// app/api/production/manifest/route.ts

import { NextResponse } from "next/server";

import {
  serializeProductionManifest,
} from "@/lib/production/manifest/buildProductionManifest";

import type {
  VendorProductionPackage,
} from "@/lib/production/buildProductionPackage";

export async function POST(
  request: Request,
) {
  try {
    const packageData =
      (await request.json()) as VendorProductionPackage;

    validatePackage(
      packageData,
    );

    const manifest =
      serializeProductionManifest(
        packageData,
      );

    const filename =
      buildFilename(
        packageData,
      );

    return new NextResponse(
      manifest,
      {
        status: 200,

        headers: {
          "Content-Type":
            "application/json; charset=utf-8",

          "Content-Disposition":
            `attachment; filename="${filename}"`,

          "Cache-Control":
            "no-store",
        },
      },
    );
  } catch (error) {
    console.error(
      "Failed to generate production manifest:",
      error,
    );

    return NextResponse.json(
      {
        error:
          "Unable to generate production manifest.",
      },
      {
        status: 500,
      },
    );
  }
}

function validatePackage(
  packageData: VendorProductionPackage,
): void {
  if (!packageData) {
    throw new Error(
      "Production package is required.",
    );
  }

  if (
    !packageData.packageId?.trim()
  ) {
    throw new Error(
      "Production package ID is required.",
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
    !packageData.approval
  ) {
    throw new Error(
      "Production approval state is required.",
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
    !packageData.garment
  ) {
    throw new Error(
      "Garment information is required.",
    );
  }

  if (
    !packageData.materials
  ) {
    throw new Error(
      "Production materials are required.",
    );
  }
}

function buildFilename(
  packageData: VendorProductionPackage,
): string {
  const safePackageId =
    packageData.packageId
      .trim()
      .replace(
        /[^a-zA-Z0-9_-]+/g,
        "-",
      );

  return `${safePackageId}-manifest.json`;
}
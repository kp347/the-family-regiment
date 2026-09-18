// app/api/production/traveler/route.ts

import { NextResponse } from "next/server";

import {
  buildProductionTravelerPdf,
} from "@/lib/production/pdf/buildProductionTravelerPdf";

import type {
  VendorProductionPackage,
} from "@/lib/production/buildProductionPackage";

/*
 * =========================================================
 * The Family Regiment
 * Production Traveler PDF Endpoint
 * =========================================================
 *
 * This endpoint converts a vendor production package into
 * a downloadable manufacturing traveler PDF.
 *
 * For now it accepts package data directly in the request.
 *
 * Later this route can load the production package from the
 * database by package ID instead.
 */

export async function POST(
  request: Request,
) {
  try {
    const packageData =
      (await request.json()) as VendorProductionPackage;

    validatePackage(
      packageData,
    );

    const pdfBytes =
      await buildProductionTravelerPdf(
        packageData,
      );

    const filename =
      buildFilename(
        packageData,
      );

    return new NextResponse(
      Buffer.from(
        pdfBytes,
      ),
      {
        status: 200,

        headers: {
          "Content-Type":
            "application/pdf",

          "Content-Disposition":
            `attachment; filename="${filename}"`,

          "Cache-Control":
            "no-store",
        },
      },
    );
  } catch (
    error
  ) {
    console.error(
      "Failed to generate production traveler PDF:",
      error,
    );

    return NextResponse.json(
      {
        error:
          "Unable to generate production traveler PDF.",
      },
      {
        status: 500,
      },
    );
  }
}

/*
 * =========================================================
 * Validation
 * =========================================================
 *
 * This is intentionally lightweight.
 *
 * The production domain models remain responsible for full
 * manufacturing validation.
 *
 * This endpoint only protects the PDF generator from being
 * called with obviously incomplete package data.
 */

function validatePackage(
  packageData: VendorProductionPackage,
): void {
  if (
    !packageData
  ) {
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
    !Number.isFinite(
      packageData.productionSpecVersion,
    ) ||
    packageData.productionSpecVersion <
      1
  ) {
    throw new Error(
      "Production specification version is invalid.",
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
    !packageData.dimensions
  ) {
    throw new Error(
      "Finished dimensions are required.",
    );
  }

  if (
    !packageData.quantity
  ) {
    throw new Error(
      "Production quantity is required.",
    );
  }
}

/*
 * =========================================================
 * Filename
 * =========================================================
 */

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

  return `${safePackageId}-production-traveler.pdf`;
}
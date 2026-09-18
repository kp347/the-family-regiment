// app/api/production/package/route.ts

import { NextResponse } from "next/server";

import {
  buildVendorProductionZip,
} from "@/lib/production/zip/buildVendorProductionZip";

import type {
  VendorProductionPackage,
} from "@/lib/production/buildProductionPackage";

export async function POST(
  request: Request,
) {
  try {
    const packageData =
      (await request.json()) as VendorProductionPackage;

    const result =
      await buildVendorProductionZip(
        packageData,
      );

    /*
     * NextResponse expects a standard BodyInit.
     *
     * JSZip returns Uint8Array<ArrayBufferLike>, which can
     * include SharedArrayBuffer in its type definition.
     *
     * Copying the bytes into a plain ArrayBuffer gives the
     * response a browser/server-standard body type and avoids
     * the TypeScript BodyInit incompatibility.
     */

    const responseBuffer =
      new ArrayBuffer(
        result.bytes.byteLength,
      );

    const responseBytes =
      new Uint8Array(
        responseBuffer,
      );

    responseBytes.set(
      result.bytes,
    );

    return new NextResponse(
      responseBuffer,
      {
        status: 200,

        headers: {
          "Content-Type":
            "application/zip",

          "Content-Disposition":
            `attachment; filename="${result.filename}"`,

          "Cache-Control":
            "no-store",
        },
      },
    );
  } catch (error) {
    console.error(
      "Failed to generate vendor production package:",
      error,
    );

    return NextResponse.json(
      {
        error:
          "Unable to generate vendor production package.",
      },
      {
        status: 500,
      },
    );
  }
}
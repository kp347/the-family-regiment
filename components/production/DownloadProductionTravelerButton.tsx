"use client";

import {
  useState,
} from "react";

import type {
  VendorProductionPackage,
} from "@/lib/production/buildProductionPackage";

type DownloadProductionTravelerButtonProps = {
  packageData: VendorProductionPackage;
};

export default function DownloadProductionTravelerButton({
  packageData,
}: DownloadProductionTravelerButtonProps) {
  const [
    downloading,
    setDownloading,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState<string | null>(
    null,
  );

  async function handleDownload() {
    if (
      downloading
    ) {
      return;
    }

    setDownloading(true);

    setError(null);

    try {
      const response =
        await fetch(
          "/api/production/traveler",
          {
            method:
              "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify(
                packageData,
              ),
          },
        );

      if (
        !response.ok
      ) {
        throw new Error(
          "The production traveler could not be generated.",
        );
      }

      const blob =
        await response.blob();

      const url =
        URL.createObjectURL(
          blob,
        );

      const disposition =
        response.headers.get(
          "Content-Disposition",
        );

      const filename =
        getFilename(
          disposition,
          packageData.packageId,
        );

      const anchor =
        document.createElement(
          "a",
        );

      anchor.href =
        url;

      anchor.download =
        filename;

      document.body.appendChild(
        anchor,
      );

      anchor.click();

      anchor.remove();

      URL.revokeObjectURL(
        url,
      );
    } catch (
      downloadError
    ) {
      console.error(
        "Production traveler download failed:",
        downloadError,
      );

      setError(
        "Unable to generate the PDF traveler. Please try again.",
      );
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div className="flex flex-col items-start gap-2 sm:items-end">
      <button
        type="button"
        onClick={
          handleDownload
        }
        disabled={
          downloading
        }
        className="border border-[#b89559]/50 bg-[#b89559]/10 px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#e9d6ad] transition hover:bg-[#b89559]/20 disabled:cursor-wait disabled:opacity-60"
      >
        {downloading
          ? "Generating PDF..."
          : "Download PDF Traveler"}
      </button>

      {error && (
        <p
          role="alert"
          className="max-w-sm text-left text-xs leading-5 text-[#d8a18a] sm:text-right"
        >
          {error}
        </p>
      )}
    </div>
  );
}

function getFilename(
  disposition: string | null,
  packageId: string,
): string {
  if (
    disposition
  ) {
    const match =
      disposition.match(
        /filename="?([^"]+)"?/i,
      );

    if (
      match?.[1]
    ) {
      return match[1];
    }
  }

  const safePackageId =
    packageId
      .trim()
      .replace(
        /[^a-zA-Z0-9_-]+/g,
        "-",
      );

  return `${safePackageId}-production-traveler.pdf`;
}
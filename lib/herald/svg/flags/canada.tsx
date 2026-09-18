// lib/herald/svg/flags/canada.tsx

/*
 * =========================================================
 * The Family Regiment
 * Heritage Flag Canon — Canada
 * =========================================================
 *
 * Controlled source artwork:
 * /public/canon/flags/canada.svg
 *
 * Source lineage:
 * SVG conversion of the Government of Canada official
 * National Flag artwork.
 *
 * Official proportion:
 * 2:1
 *
 * The controlled master preserves the official stylized
 * 11-point maple leaf rather than approximating its geometry
 * inside Family Regiment application code.
 *
 * Status: Draft — visual QA required.
 * =========================================================
 */

export const CANADA_FLAG_VIEWBOX = {
  width: 1200,
  height: 600,
} as const;

export const CANADA_FLAG_ASSET_PATH = "/canon/flags/canada.svg";

export interface CanadaFlagProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  title?: string;
}

export function CanadaFlag({
  width = "100%",
  height = "100%",
  className,
  title = "Flag of Canada",
}: CanadaFlagProps) {
  return (
    <div
      className={className}
      style={{
        width,
        height,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <img
        src={CANADA_FLAG_ASSET_PATH}
        alt={title}
        draggable={false}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          maxWidth: "100%",
          maxHeight: "100%",
          objectFit: "contain",
        }}
      />
    </div>
  );
}

export function getCanadaFlagSvgAssetPath(): string {
  return CANADA_FLAG_ASSET_PATH;
}
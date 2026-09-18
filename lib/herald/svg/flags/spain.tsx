// lib/herald/svg/flags/spain.tsx

/*
 * =========================================================
 * The Family Regiment
 * Heritage Flag Canon — Spain
 * =========================================================
 *
 * Controlled source artwork:
 * /public/canon/flags/spain.svg
 *
 * Official proportion:
 * 3:2
 *
 * The detailed national coat of arms remains part of the
 * controlled SVG master. Family Regiment does not recreate
 * or approximate that geometry in application code.
 *
 * Status: Draft — visual QA required.
 * =========================================================
 */

export const SPAIN_FLAG_VIEWBOX = {
  width: 750,
  height: 500,
} as const;

export const SPAIN_FLAG_ASSET_PATH = "/canon/flags/spain.svg";

export interface SpainFlagProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  title?: string;
}

export function SpainFlag({
  width = "100%",
  height = "100%",
  className,
  title = "Flag of Spain",
}: SpainFlagProps) {
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
        src={SPAIN_FLAG_ASSET_PATH}
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

/*
 * Builder, export, and manufacturing systems should consume
 * the same controlled SVG master rather than maintaining a
 * second reconstruction of the Spanish flag.
 */
export function getSpainFlagSvgAssetPath(): string {
  return SPAIN_FLAG_ASSET_PATH;
}
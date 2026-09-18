// lib/herald/svg/flags/mexico.tsx

/*
 * =========================================================
 * The Family Regiment
 * Heritage Flag Canon — Mexico
 * =========================================================
 *
 * Controlled source artwork:
 * /public/canon/flags/mexico.svg
 *
 * Official proportion:
 * 7:4
 *
 * The national coat of arms remains part of the controlled
 * SVG master. Family Regiment does not approximate or redraw
 * the emblem.
 *
 * Status: Draft — visual QA required.
 * =========================================================
 */

export const MEXICO_FLAG_VIEWBOX = {
  width: 980,
  height: 560,
} as const;

export const MEXICO_FLAG_ASSET_PATH = "/canon/flags/mexico.svg";

export interface MexicoFlagProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  title?: string;
}

export function MexicoFlag({
  width = "100%",
  height = "100%",
  className,
  title = "Flag of Mexico",
}: MexicoFlagProps) {
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
        src={MEXICO_FLAG_ASSET_PATH}
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

export function getMexicoFlagSvgAssetPath(): string {
  return MEXICO_FLAG_ASSET_PATH;
}
// lib/herald/svg/flags/egypt.tsx

/*
 * =========================================================
 * The Family Regiment
 * Heritage Flag Canon — Egypt
 * =========================================================
 *
 * Controlled source artwork:
 * /public/canon/flags/egypt.svg
 *
 * Canon proportion:
 * 3:2
 *
 * The Eagle of Saladin remains part of the controlled SVG
 * master. Family Regiment does not approximate or independently
 * redraw the national emblem in application code.
 *
 * Status: Draft — visual QA required.
 * =========================================================
 */

export const EGYPT_FLAG_VIEWBOX = {
  width: 900,
  height: 600,
} as const;

export const EGYPT_FLAG_ASSET_PATH = "/canon/flags/egypt.svg";

export interface EgyptFlagProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  title?: string;
}

export function EgyptFlag({
  width = "100%",
  height = "100%",
  className,
  title = "Flag of Egypt",
}: EgyptFlagProps) {
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
        src={EGYPT_FLAG_ASSET_PATH}
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
 * separate reconstruction of the Egyptian flag.
 */
export function getEgyptFlagSvgAssetPath(): string {
  return EGYPT_FLAG_ASSET_PATH;
}
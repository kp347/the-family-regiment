// lib/herald/svg/flags/portugal.tsx

/*
 * =========================================================
 * The Family Regiment
 * Heritage Flag Canon — Portugal
 * =========================================================
 *
 * Controlled source artwork:
 * /public/canon/flags/portugal.svg
 *
 * Canon proportion:
 * 3:2
 *
 * The armillary sphere and national shield remain part of
 * the controlled SVG master. Family Regiment does not
 * approximate or independently redraw this geometry.
 *
 * Status: Draft — visual QA required.
 * =========================================================
 */

export const PORTUGAL_FLAG_VIEWBOX = {
  width: 900,
  height: 600,
} as const;

export const PORTUGAL_FLAG_ASSET_PATH = "/canon/flags/portugal.svg";

export interface PortugalFlagProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  title?: string;
}

export function PortugalFlag({
  width = "100%",
  height = "100%",
  className,
  title = "Flag of Portugal",
}: PortugalFlagProps) {
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
        src={PORTUGAL_FLAG_ASSET_PATH}
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
 * separate reconstruction of the Portuguese flag.
 */
export function getPortugalFlagSvgAssetPath(): string {
  return PORTUGAL_FLAG_ASSET_PATH;
}
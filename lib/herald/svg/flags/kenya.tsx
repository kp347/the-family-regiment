// lib/herald/svg/flags/kenya.tsx

/*
 * =========================================================
 * The Family Regiment
 * Heritage Flag Canon — Kenya
 * =========================================================
 *
 * Controlled source artwork:
 * /public/canon/flags/kenya.svg
 *
 * Canon proportion:
 * 3:2
 *
 * Source selection:
 * British Standard Colour construction corresponding to
 * Kenya's statutory flag specification.
 *
 * The central shield and crossed spears remain part of the
 * controlled SVG master. Family Regiment does not approximate
 * or independently redraw that geometry in application code.
 *
 * Status: Draft — visual QA required.
 * =========================================================
 */

export const KENYA_FLAG_VIEWBOX = {
  width: 900,
  height: 600,
} as const;

export const KENYA_FLAG_ASSET_PATH = "/canon/flags/kenya.svg";

export interface KenyaFlagProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  title?: string;
}

export function KenyaFlag({
  width = "100%",
  height = "100%",
  className,
  title = "Flag of Kenya",
}: KenyaFlagProps) {
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
        src={KENYA_FLAG_ASSET_PATH}
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
 * separate reconstruction of the Kenyan flag.
 */
export function getKenyaFlagSvgAssetPath(): string {
  return KENYA_FLAG_ASSET_PATH;
}
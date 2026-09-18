// lib/herald/svg/flags/brazil.tsx

/*
 * =========================================================
 * The Family Regiment
 * Heritage Flag Canon — Brazil
 * =========================================================
 *
 * Controlled source:
 * Current 27-star Brazilian national flag implementing
 * Lei nº 8.421, de 11 de maio de 1992.
 *
 * Source artwork:
 * /public/canon/flags/brazil.svg
 *
 * The underlying artwork remains a controlled external SVG
 * rather than a Family Regiment approximation.
 *
 * Status: Draft — visual QA required.
 * =========================================================
 */

export const BRAZIL_FLAG_VIEWBOX = {
  width: 1000,
  height: 700,
} as const;

export const BRAZIL_FLAG_ASSET_PATH = "/canon/flags/brazil.svg";

export interface BrazilFlagProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  title?: string;
}

export function BrazilFlag({
  width = "100%",
  height = "100%",
  className,
  title = "Flag of Brazil",
}: BrazilFlagProps) {
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
        src={BRAZIL_FLAG_ASSET_PATH}
        alt={title}
        draggable={false}
        style={{
          display: "block",
          width: "112%",
          height: "112%",
          maxWidth: "112%",
          maxHeight: "112%",
          objectFit: "contain",
        }}
      />
    </div>
  );
}

/*
 * Raw SVG export intentionally uses the actual controlled
 * source artwork rather than reconstructing the national flag
 * independently in JavaScript.
 *
 * Production/export systems should consume the controlled
 * master located at:
 *
 * public/canon/flags/brazil.svg
 */
export function getBrazilFlagSvgAssetPath(): string {
  return BRAZIL_FLAG_ASSET_PATH;
}
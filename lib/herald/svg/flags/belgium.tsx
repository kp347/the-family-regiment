// lib/herald/svg/flags/belgium.tsx

/*
 * =========================================================
 * The Family Regiment
 * Heritage Flag Canon — Belgium
 * =========================================================
 *
 * Controlled SVG geometry for the Belgian national flag.
 *
 * Canon proportion: 15:13.
 *
 * Builder presentation may crop or mask this artwork
 * inside a heraldic quadrant, but should not alter the
 * underlying flag identity.
 * =========================================================
 */

export const BELGIUM_FLAG_VIEWBOX = {
  width: 15,
  height: 13,
} as const;

export interface BelgiumFlagProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  title?: string;
}

export function BelgiumFlag({
  width = "100%",
  height = "100%",
  className,
  title = "Flag of Belgium",
}: BelgiumFlagProps) {
  return (
    <svg
      viewBox={`0 0 ${BELGIUM_FLAG_VIEWBOX.width} ${BELGIUM_FLAG_VIEWBOX.height}`}
      width={width}
      height={height}
      className={className}
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
    >
      <rect
        x="0"
        y="0"
        width="5"
        height="13"
        fill="#000000"
      />

      <rect
        x="5"
        y="0"
        width="5"
        height="13"
        fill="#FDDA24"
      />

      <rect
        x="10"
        y="0"
        width="5"
        height="13"
        fill="#EF3340"
      />
    </svg>
  );
}

export function renderBelgiumFlagSvg(): string {
  return [
    `<svg`,
    ` viewBox="0 0 ${BELGIUM_FLAG_VIEWBOX.width} ${BELGIUM_FLAG_VIEWBOX.height}"`,
    ` xmlns="http://www.w3.org/2000/svg"`,
    ` preserveAspectRatio="xMidYMid meet"`,
    `>`,
    `<rect x="0" y="0" width="5" height="13" fill="#000000"/>`,
    `<rect x="5" y="0" width="5" height="13" fill="#FDDA24"/>`,
    `<rect x="10" y="0" width="5" height="13" fill="#EF3340"/>`,
    `</svg>`,
  ].join("");
}
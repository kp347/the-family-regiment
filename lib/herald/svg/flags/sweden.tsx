// lib/herald/svg/flags/sweden.tsx

/*
 * =========================================================
 * The Family Regiment
 * Heritage Flag Canon — Sweden
 * =========================================================
 *
 * Controlled SVG geometry for the Swedish national flag.
 *
 * Canon proportion: 8:5.
 *
 * Builder presentation may crop or mask this artwork
 * inside a heraldic quadrant, but should not alter the
 * underlying flag identity.
 * =========================================================
 */

export const SWEDEN_FLAG_VIEWBOX = {
  width: 8,
  height: 5,
} as const;

export interface SwedenFlagProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  title?: string;
}

export function SwedenFlag({
  width = "100%",
  height = "100%",
  className,
  title = "Flag of Sweden",
}: SwedenFlagProps) {
  return (
    <svg
      viewBox={`0 0 ${SWEDEN_FLAG_VIEWBOX.width} ${SWEDEN_FLAG_VIEWBOX.height}`}
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
        width="8"
        height="5"
        fill="#006AA7"
      />

      <rect
        x="2.5"
        y="0"
        width="1"
        height="5"
        fill="#FECC00"
      />

      <rect
        x="0"
        y="2"
        width="8"
        height="1"
        fill="#FECC00"
      />
    </svg>
  );
}

export function renderSwedenFlagSvg(): string {
  return [
    `<svg`,
    ` viewBox="0 0 ${SWEDEN_FLAG_VIEWBOX.width} ${SWEDEN_FLAG_VIEWBOX.height}"`,
    ` xmlns="http://www.w3.org/2000/svg"`,
    ` preserveAspectRatio="xMidYMid meet"`,
    `>`,
    `<rect x="0" y="0" width="8" height="5" fill="#006AA7"/>`,
    `<rect x="2.5" y="0" width="1" height="5" fill="#FECC00"/>`,
    `<rect x="0" y="2" width="8" height="1" fill="#FECC00"/>`,
    `</svg>`,
  ].join("");
}
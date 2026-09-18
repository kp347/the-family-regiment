// lib/herald/svg/flags/switzerland.tsx

/*
 * =========================================================
 * The Family Regiment
 * Heritage Flag Canon — Switzerland
 * =========================================================
 *
 * Controlled SVG geometry for the Swiss national flag.
 *
 * Canon proportion: 1:1.
 *
 * Builder presentation may crop or mask this artwork
 * inside a heraldic quadrant, but should not alter the
 * underlying flag identity.
 * =========================================================
 */

export const SWITZERLAND_FLAG_VIEWBOX = {
  width: 1,
  height: 1,
} as const;

export interface SwitzerlandFlagProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  title?: string;
}

export function SwitzerlandFlag({
  width = "100%",
  height = "100%",
  className,
  title = "Flag of Switzerland",
}: SwitzerlandFlagProps) {
  return (
    <svg
      viewBox={`0 0 ${SWITZERLAND_FLAG_VIEWBOX.width} ${SWITZERLAND_FLAG_VIEWBOX.height}`}
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
        width="1"
        height="1"
        fill="#DA291C"
      />

      <rect
        x="0.4"
        y="0.2"
        width="0.2"
        height="0.6"
        fill="#FFFFFF"
      />

      <rect
        x="0.2"
        y="0.4"
        width="0.6"
        height="0.2"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function renderSwitzerlandFlagSvg(): string {
  return [
    `<svg`,
    ` viewBox="0 0 ${SWITZERLAND_FLAG_VIEWBOX.width} ${SWITZERLAND_FLAG_VIEWBOX.height}"`,
    ` xmlns="http://www.w3.org/2000/svg"`,
    ` preserveAspectRatio="xMidYMid meet"`,
    `>`,
    `<rect x="0" y="0" width="1" height="1" fill="#DA291C"/>`,
    `<rect x="0.4" y="0.2" width="0.2" height="0.6" fill="#FFFFFF"/>`,
    `<rect x="0.2" y="0.4" width="0.6" height="0.2" fill="#FFFFFF"/>`,
    `</svg>`,
  ].join("");
}
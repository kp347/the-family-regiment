// lib/herald/svg/flags/norway.tsx

/*
 * =========================================================
 * The Family Regiment
 * Heritage Flag Canon — Norway
 * =========================================================
 *
 * Controlled SVG geometry for the Norwegian national flag.
 *
 * Canon proportion: 22:16.
 *
 * Builder presentation may crop or mask this artwork
 * inside a heraldic quadrant, but should not alter the
 * underlying flag identity.
 * =========================================================
 */

export const NORWAY_FLAG_VIEWBOX = {
  width: 22,
  height: 16,
} as const;

export interface NorwayFlagProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  title?: string;
}

export function NorwayFlag({
  width = "100%",
  height = "100%",
  className,
  title = "Flag of Norway",
}: NorwayFlagProps) {
  return (
    <svg
      viewBox={`0 0 ${NORWAY_FLAG_VIEWBOX.width} ${NORWAY_FLAG_VIEWBOX.height}`}
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
        width="22"
        height="16"
        fill="#BA0C2F"
      />

      <rect
        x="6"
        y="0"
        width="4"
        height="16"
        fill="#FFFFFF"
      />

      <rect
        x="0"
        y="6"
        width="22"
        height="4"
        fill="#FFFFFF"
      />

      <rect
        x="7"
        y="0"
        width="2"
        height="16"
        fill="#00205B"
      />

      <rect
        x="0"
        y="7"
        width="22"
        height="2"
        fill="#00205B"
      />
    </svg>
  );
}

export function renderNorwayFlagSvg(): string {
  return [
    `<svg`,
    ` viewBox="0 0 ${NORWAY_FLAG_VIEWBOX.width} ${NORWAY_FLAG_VIEWBOX.height}"`,
    ` xmlns="http://www.w3.org/2000/svg"`,
    ` preserveAspectRatio="xMidYMid meet"`,
    `>`,
    `<rect x="0" y="0" width="22" height="16" fill="#BA0C2F"/>`,
    `<rect x="6" y="0" width="4" height="16" fill="#FFFFFF"/>`,
    `<rect x="0" y="6" width="22" height="4" fill="#FFFFFF"/>`,
    `<rect x="7" y="0" width="2" height="16" fill="#00205B"/>`,
    `<rect x="0" y="7" width="22" height="2" fill="#00205B"/>`,
    `</svg>`,
  ].join("");
}
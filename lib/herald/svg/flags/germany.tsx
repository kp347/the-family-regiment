// lib/herald/svg/flags/germany.tsx

/*
 * =========================================================
 * The Family Regiment
 * Heritage Flag Canon — Germany
 * =========================================================
 *
 * Controlled SVG geometry for the German national flag.
 *
 * Builder presentation may crop or mask this artwork
 * inside a heraldic quadrant, but should not alter the
 * underlying flag identity.
 * =========================================================
 */

export const GERMANY_FLAG_VIEWBOX = {
  width: 5,
  height: 3,
} as const;

export interface GermanyFlagProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  title?: string;
}

export function GermanyFlag({
  width = "100%",
  height = "100%",
  className,
  title = "Flag of Germany",
}: GermanyFlagProps) {
  return (
    <svg
      viewBox={`0 0 ${GERMANY_FLAG_VIEWBOX.width} ${GERMANY_FLAG_VIEWBOX.height}`}
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
        height="1"
        fill="#000000"
      />

      <rect
        x="0"
        y="1"
        width="5"
        height="1"
        fill="#DD0000"
      />

      <rect
        x="0"
        y="2"
        width="5"
        height="1"
        fill="#FFCE00"
      />
    </svg>
  );
}

export function renderGermanyFlagSvg(): string {
  return [
    `<svg`,
    ` viewBox="0 0 ${GERMANY_FLAG_VIEWBOX.width} ${GERMANY_FLAG_VIEWBOX.height}"`,
    ` xmlns="http://www.w3.org/2000/svg"`,
    ` preserveAspectRatio="xMidYMid meet"`,
    `>`,
    `<rect x="0" y="0" width="5" height="1" fill="#000000"/>`,
    `<rect x="0" y="1" width="5" height="1" fill="#DD0000"/>`,
    `<rect x="0" y="2" width="5" height="1" fill="#FFCE00"/>`,
    `</svg>`,
  ].join("");
}
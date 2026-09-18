// lib/herald/svg/flags/england.tsx

/*
 * =========================================================
 * The Family Regiment
 * Heritage Flag Canon — England
 * =========================================================
 *
 * Controlled SVG geometry for the English national flag.
 *
 * Canon land proportion: 5:3.
 *
 * Construction:
 * - White field
 * - Centered red St George's Cross
 * - Cross width = 1/5 of flag height
 *
 * Builder presentation may crop or mask this artwork
 * inside a heraldic quadrant, but should not alter the
 * underlying flag identity.
 * =========================================================
 */

export const ENGLAND_FLAG_VIEWBOX = {
  width: 50,
  height: 30,
} as const;

export interface EnglandFlagProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  title?: string;
}

export function EnglandFlag({
  width = "100%",
  height = "100%",
  className,
  title = "Flag of England",
}: EnglandFlagProps) {
  return (
    <svg
      viewBox={`0 0 ${ENGLAND_FLAG_VIEWBOX.width} ${ENGLAND_FLAG_VIEWBOX.height}`}
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
        width="50"
        height="30"
        fill="#FFFFFF"
      />

      <rect
        x="22"
        y="0"
        width="6"
        height="30"
        fill="#C8102E"
      />

      <rect
        x="0"
        y="12"
        width="50"
        height="6"
        fill="#C8102E"
      />
    </svg>
  );
}

export function renderEnglandFlagSvg(): string {
  return [
    `<svg`,
    ` viewBox="0 0 ${ENGLAND_FLAG_VIEWBOX.width} ${ENGLAND_FLAG_VIEWBOX.height}"`,
    ` xmlns="http://www.w3.org/2000/svg"`,
    ` preserveAspectRatio="xMidYMid meet"`,
    `>`,
    `<rect x="0" y="0" width="50" height="30" fill="#FFFFFF"/>`,
    `<rect x="22" y="0" width="6" height="30" fill="#C8102E"/>`,
    `<rect x="0" y="12" width="50" height="6" fill="#C8102E"/>`,
    `</svg>`,
  ].join("");
}
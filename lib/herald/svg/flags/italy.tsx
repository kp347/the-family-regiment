// lib/herald/svg/flags/italy.tsx

/*
 * =========================================================
 * The Family Regiment
 * Heritage Flag Canon — Italy
 * =========================================================
 *
 * Controlled SVG geometry for the Italian national flag.
 *
 * Builder presentation may crop or mask this artwork
 * inside a heraldic quadrant, but should not alter the
 * underlying flag identity.
 * =========================================================
 */

export const ITALY_FLAG_VIEWBOX = {
  width: 3,
  height: 2,
} as const;

export interface ItalyFlagProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  title?: string;
}

export function ItalyFlag({
  width = "100%",
  height = "100%",
  className,
  title = "Flag of Italy",
}: ItalyFlagProps) {
  return (
    <svg
      viewBox={`0 0 ${ITALY_FLAG_VIEWBOX.width} ${ITALY_FLAG_VIEWBOX.height}`}
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
        height="2"
        fill="#009246"
      />

      <rect
        x="1"
        y="0"
        width="1"
        height="2"
        fill="#FFFFFF"
      />

      <rect
        x="2"
        y="0"
        width="1"
        height="2"
        fill="#CE2B37"
      />
    </svg>
  );
}

export function renderItalyFlagSvg(): string {
  return [
    `<svg`,
    ` viewBox="0 0 ${ITALY_FLAG_VIEWBOX.width} ${ITALY_FLAG_VIEWBOX.height}"`,
    ` xmlns="http://www.w3.org/2000/svg"`,
    ` preserveAspectRatio="xMidYMid meet"`,
    `>`,
    `<rect x="0" y="0" width="1" height="2" fill="#009246"/>`,
    `<rect x="1" y="0" width="1" height="2" fill="#FFFFFF"/>`,
    `<rect x="2" y="0" width="1" height="2" fill="#CE2B37"/>`,
    `</svg>`,
  ].join("");
}
// lib/herald/svg/flags/poland.tsx

/*
 * =========================================================
 * The Family Regiment
 * Heritage Flag Canon — Poland
 * =========================================================
 *
 * Controlled SVG geometry for the Polish national flag.
 *
 * Builder presentation may crop or mask this artwork
 * inside a heraldic quadrant, but should not alter the
 * underlying flag identity.
 * =========================================================
 */

export const POLAND_FLAG_VIEWBOX = {
  width: 8,
  height: 5,
} as const;

export interface PolandFlagProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  title?: string;
}

export function PolandFlag({
  width = "100%",
  height = "100%",
  className,
  title = "Flag of Poland",
}: PolandFlagProps) {
  return (
    <svg
      viewBox={`0 0 ${POLAND_FLAG_VIEWBOX.width} ${POLAND_FLAG_VIEWBOX.height}`}
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
        height="2.5"
        fill="#FFFFFF"
      />

      <rect
        x="0"
        y="2.5"
        width="8"
        height="2.5"
        fill="#DC143C"
      />
    </svg>
  );
}

export function renderPolandFlagSvg(): string {
  return [
    `<svg`,
    ` viewBox="0 0 ${POLAND_FLAG_VIEWBOX.width} ${POLAND_FLAG_VIEWBOX.height}"`,
    ` xmlns="http://www.w3.org/2000/svg"`,
    ` preserveAspectRatio="xMidYMid meet"`,
    `>`,
    `<rect x="0" y="0" width="8" height="2.5" fill="#FFFFFF"/>`,
    `<rect x="0" y="2.5" width="8" height="2.5" fill="#DC143C"/>`,
    `</svg>`,
  ].join("");
}
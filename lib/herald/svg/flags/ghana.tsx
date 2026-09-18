// lib/herald/svg/flags/ghana.tsx

/*
 * =========================================================
 * The Family Regiment
 * Heritage Flag Canon — Ghana
 * =========================================================
 *
 * Controlled SVG geometry for the Ghanaian national flag.
 *
 * Canon proportion: 3:2.
 *
 * Construction:
 * - Three equal horizontal bands
 * - Red, gold, green
 * - Centered black five-pointed star
 *
 * Builder presentation may crop or mask this artwork
 * inside a heraldic quadrant, but should not alter the
 * underlying flag identity.
 * =========================================================
 */

export const GHANA_FLAG_VIEWBOX = {
  width: 3,
  height: 2,
} as const;

export interface GhanaFlagProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  title?: string;
}

export function GhanaFlag({
  width = "100%",
  height = "100%",
  className,
  title = "Flag of Ghana",
}: GhanaFlagProps) {
  return (
    <svg
      viewBox={`0 0 ${GHANA_FLAG_VIEWBOX.width} ${GHANA_FLAG_VIEWBOX.height}`}
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
        width="3"
        height="0.666667"
        fill="#CE1126"
      />

      <rect
        x="0"
        y="0.666667"
        width="3"
        height="0.666666"
        fill="#FCD116"
      />

      <rect
        x="0"
        y="1.333333"
        width="3"
        height="0.666667"
        fill="#006B3F"
      />

      <polygon
        points="
          1.5,0.76
          1.57,0.95
          1.77,0.95
          1.61,1.07
          1.67,1.27
          1.5,1.15
          1.33,1.27
          1.39,1.07
          1.23,0.95
          1.43,0.95
        "
        fill="#000000"
      />
    </svg>
  );
}

export function renderGhanaFlagSvg(): string {
  return [
    `<svg`,
    ` viewBox="0 0 ${GHANA_FLAG_VIEWBOX.width} ${GHANA_FLAG_VIEWBOX.height}"`,
    ` xmlns="http://www.w3.org/2000/svg"`,
    ` preserveAspectRatio="xMidYMid meet"`,
    `>`,
    `<rect x="0" y="0" width="3" height="0.666667" fill="#CE1126"/>`,
    `<rect x="0" y="0.666667" width="3" height="0.666666" fill="#FCD116"/>`,
    `<rect x="0" y="1.333333" width="3" height="0.666667" fill="#006B3F"/>`,
    `<polygon points="1.5,0.76 1.57,0.95 1.77,0.95 1.61,1.07 1.67,1.27 1.5,1.15 1.33,1.27 1.39,1.07 1.23,0.95 1.43,0.95" fill="#000000"/>`,
    `</svg>`,
  ].join("");
}
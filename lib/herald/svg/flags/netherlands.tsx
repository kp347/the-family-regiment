// lib/herald/svg/flags/netherlands.tsx

/*
 * =========================================================
 * The Family Regiment
 * Heritage Flag Canon — Netherlands
 * =========================================================
 *
 * Controlled SVG geometry for the Dutch national flag.
 *
 * Canon proportion: 3:2.
 *
 * Builder presentation may crop or mask this artwork
 * inside a heraldic quadrant, but should not alter the
 * underlying flag identity.
 * =========================================================
 */

export const NETHERLANDS_FLAG_VIEWBOX = {
  width: 3,
  height: 2,
} as const;

export interface NetherlandsFlagProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  title?: string;
}

export function NetherlandsFlag({
  width = "100%",
  height = "100%",
  className,
  title = "Flag of the Netherlands",
}: NetherlandsFlagProps) {
  return (
    <svg
      viewBox={`0 0 ${NETHERLANDS_FLAG_VIEWBOX.width} ${NETHERLANDS_FLAG_VIEWBOX.height}`}
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
        fill="#AE1C28"
      />

      <rect
        x="0"
        y="0.666667"
        width="3"
        height="0.666666"
        fill="#FFFFFF"
      />

      <rect
        x="0"
        y="1.333333"
        width="3"
        height="0.666667"
        fill="#21468B"
      />
    </svg>
  );
}

export function renderNetherlandsFlagSvg(): string {
  return [
    `<svg`,
    ` viewBox="0 0 ${NETHERLANDS_FLAG_VIEWBOX.width} ${NETHERLANDS_FLAG_VIEWBOX.height}"`,
    ` xmlns="http://www.w3.org/2000/svg"`,
    ` preserveAspectRatio="xMidYMid meet"`,
    `>`,
    `<rect x="0" y="0" width="3" height="0.666667" fill="#AE1C28"/>`,
    `<rect x="0" y="0.666667" width="3" height="0.666666" fill="#FFFFFF"/>`,
    `<rect x="0" y="1.333333" width="3" height="0.666667" fill="#21468B"/>`,
    `</svg>`,
  ].join("");
}
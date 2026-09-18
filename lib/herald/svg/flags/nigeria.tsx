// lib/herald/svg/flags/nigeria.tsx

/*
 * =========================================================
 * The Family Regiment
 * Heritage Flag Canon — Nigeria
 * =========================================================
 *
 * Controlled SVG geometry for the Nigerian national flag.
 *
 * Official proportion: 1:2.
 *
 * Builder presentation may crop or mask this artwork
 * inside a heraldic quadrant, but should not alter the
 * underlying flag identity.
 * =========================================================
 */

export const NIGERIA_FLAG_VIEWBOX = {
  width: 2,
  height: 1,
} as const;

export interface NigeriaFlagProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  title?: string;
}

export function NigeriaFlag({
  width = "100%",
  height = "100%",
  className,
  title = "Flag of Nigeria",
}: NigeriaFlagProps) {
  return (
    <svg
      viewBox={`0 0 ${NIGERIA_FLAG_VIEWBOX.width} ${NIGERIA_FLAG_VIEWBOX.height}`}
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
        width="0.666667"
        height="1"
        fill="#008751"
      />

      <rect
        x="0.666667"
        y="0"
        width="0.666666"
        height="1"
        fill="#FFFFFF"
      />

      <rect
        x="1.333333"
        y="0"
        width="0.666667"
        height="1"
        fill="#008751"
      />
    </svg>
  );
}

export function renderNigeriaFlagSvg(): string {
  return [
    `<svg`,
    ` viewBox="0 0 ${NIGERIA_FLAG_VIEWBOX.width} ${NIGERIA_FLAG_VIEWBOX.height}"`,
    ` xmlns="http://www.w3.org/2000/svg"`,
    ` preserveAspectRatio="xMidYMid meet"`,
    `>`,
    `<rect x="0" y="0" width="0.666667" height="1" fill="#008751"/>`,
    `<rect x="0.666667" y="0" width="0.666666" height="1" fill="#FFFFFF"/>`,
    `<rect x="1.333333" y="0" width="0.666667" height="1" fill="#008751"/>`,
    `</svg>`,
  ].join("");
}
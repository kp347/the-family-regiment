// lib/herald/svg/flags/greece.tsx

/*
 * =========================================================
 * The Family Regiment
 * Heritage Flag Canon — Greece
 * =========================================================
 *
 * Controlled SVG geometry for the Greek national flag.
 *
 * Canon proportion: 3:2.
 *
 * Construction:
 * - Nine equal horizontal stripes
 * - Five blue and four white
 * - Blue canton spans the first five stripes
 * - White cross centered within the canton
 *
 * Builder presentation may crop or mask this artwork
 * inside a heraldic quadrant, but should not alter the
 * underlying flag identity.
 * =========================================================
 */

export const GREECE_FLAG_VIEWBOX = {
  width: 27,
  height: 18,
} as const;

export interface GreeceFlagProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  title?: string;
}

export function GreeceFlag({
  width = "100%",
  height = "100%",
  className,
  title = "Flag of Greece",
}: GreeceFlagProps) {
  return (
    <svg
      viewBox={`0 0 ${GREECE_FLAG_VIEWBOX.width} ${GREECE_FLAG_VIEWBOX.height}`}
      width={width}
      height={height}
      className={className}
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
    >
      <rect x="0" y="0" width="27" height="18" fill="#FFFFFF" />

      <rect x="0" y="0" width="27" height="2" fill="#0D5EAF" />
      <rect x="0" y="4" width="27" height="2" fill="#0D5EAF" />
      <rect x="0" y="8" width="27" height="2" fill="#0D5EAF" />
      <rect x="0" y="12" width="27" height="2" fill="#0D5EAF" />
      <rect x="0" y="16" width="27" height="2" fill="#0D5EAF" />

      <rect x="0" y="0" width="10" height="10" fill="#0D5EAF" />

      <rect x="4" y="0" width="2" height="10" fill="#FFFFFF" />
      <rect x="0" y="4" width="10" height="2" fill="#FFFFFF" />
    </svg>
  );
}

export function renderGreeceFlagSvg(): string {
  return [
    `<svg`,
    ` viewBox="0 0 ${GREECE_FLAG_VIEWBOX.width} ${GREECE_FLAG_VIEWBOX.height}"`,
    ` xmlns="http://www.w3.org/2000/svg"`,
    ` preserveAspectRatio="xMidYMid meet"`,
    `>`,
    `<rect x="0" y="0" width="27" height="18" fill="#FFFFFF"/>`,
    `<rect x="0" y="0" width="27" height="2" fill="#0D5EAF"/>`,
    `<rect x="0" y="4" width="27" height="2" fill="#0D5EAF"/>`,
    `<rect x="0" y="8" width="27" height="2" fill="#0D5EAF"/>`,
    `<rect x="0" y="12" width="27" height="2" fill="#0D5EAF"/>`,
    `<rect x="0" y="16" width="27" height="2" fill="#0D5EAF"/>`,
    `<rect x="0" y="0" width="10" height="10" fill="#0D5EAF"/>`,
    `<rect x="4" y="0" width="2" height="10" fill="#FFFFFF"/>`,
    `<rect x="0" y="4" width="10" height="2" fill="#FFFFFF"/>`,
    `</svg>`,
  ].join("");
}
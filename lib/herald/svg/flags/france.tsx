// lib/herald/svg/flags/france.tsx

/*
 * =========================================================
 * The Family Regiment
 * Heritage Flag Canon — France
 * =========================================================
 *
 * Controlled SVG geometry for the French national flag.
 *
 * This module is intentionally simple:
 * - no gradients
 * - no filters
 * - no text
 * - no decorative reinterpretation
 *
 * The Builder may crop or mask this artwork inside a
 * heraldic quadrant, but should not alter the flag identity.
 * =========================================================
 */

export const FRANCE_FLAG_VIEWBOX = {
  width: 3,
  height: 2,
} as const;

export interface FranceFlagProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  title?: string;
}

export function FranceFlag({
  width = "100%",
  height = "100%",
  className,
  title = "Flag of France",
}: FranceFlagProps) {
  return (
    <svg
      viewBox={`0 0 ${FRANCE_FLAG_VIEWBOX.width} ${FRANCE_FLAG_VIEWBOX.height}`}
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
        fill="#0055A4"
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
        fill="#EF4135"
      />
    </svg>
  );
}

export function renderFranceFlagSvg(): string {
  return [
    `<svg`,
    ` viewBox="0 0 ${FRANCE_FLAG_VIEWBOX.width} ${FRANCE_FLAG_VIEWBOX.height}"`,
    ` xmlns="http://www.w3.org/2000/svg"`,
    ` preserveAspectRatio="xMidYMid meet"`,
    `>`,
    `<rect x="0" y="0" width="1" height="2" fill="#0055A4"/>`,
    `<rect x="1" y="0" width="1" height="2" fill="#FFFFFF"/>`,
    `<rect x="2" y="0" width="1" height="2" fill="#EF4135"/>`,
    `</svg>`,
  ].join("");
}
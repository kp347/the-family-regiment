/*
 * =========================================================
 * The Family Regiment
 * Canonical French Shield Geometry
 * =========================================================
 *
 * This module is the SINGLE SOURCE OF TRUTH for the
 * Family Regiment French Shield silhouette.
 *
 * The French Shield defines geometry only.
 *
 * Heritage symbols such as the fleur-de-lis are separate
 * Canon elements and are not embedded in the shield.
 *
 * V1 GEOMETRY:
 *
 * Broad usable field, shallow center rise, restrained upper
 * corner articulation, tapered sides, and a pointed base.
 * The interior remains uninterrupted for the dominant
 * Canon charge.
 * =========================================================
 */

export const FRENCH_SHIELD_VIEWBOX = {
  width: 100,
  height: 114,
} as const;

export const FRENCH_SHIELD_PATH = [
  "M9 22",
  "Q15 21 18 14",
  "Q34 16 50 8",
  "Q66 16 82 14",
  "Q85 21 91 22",
  "V50",
  "C91 75 75 94 50 108",
  "C25 94 9 75 9 50",
  "Z",
].join(" ");

export interface FrenchShieldProps {
  fill: string;
  borderColor: string;
  innerBorderColor?: string;
  borderWidth?: number;
  innerBorderWidth?: number;
  showInnerBorder?: boolean;
  transform?: string;
  className?: string;
}

export function FrenchShield({
  fill,
  borderColor,
  innerBorderColor,
  borderWidth = 5,
  innerBorderWidth = 1.8,
  showInnerBorder = true,
  transform,
  className,
}: FrenchShieldProps) {
  return (
    <g
      transform={transform}
      className={className}
    >
      <path
        d={FRENCH_SHIELD_PATH}
        fill={fill}
        stroke={borderColor}
        strokeWidth={borderWidth}
        strokeLinejoin="round"
      />

      {showInnerBorder && (
        <path
          d={FRENCH_SHIELD_PATH}
          transform="translate(5 6) scale(0.9)"
          fill="none"
          stroke={
            innerBorderColor ??
            borderColor
          }
          strokeWidth={
            innerBorderWidth
          }
          strokeLinejoin="round"
        />
      )}
    </g>
  );
}

/*
 * =========================================================
 * String Renderer
 * =========================================================
 *
 * Uses the same canonical path as the React renderer so
 * archival/export output cannot drift from the Builder.
 * =========================================================
 */

export interface RenderFrenchShieldSvgOptions {
  fill: string;
  borderColor: string;
  innerBorderColor?: string;
  borderWidth?: number;
  innerBorderWidth?: number;
  showInnerBorder?: boolean;
  transform?: string;
}

export function renderFrenchShieldSvg({
  fill,
  borderColor,
  innerBorderColor,
  borderWidth = 5,
  innerBorderWidth = 1.8,
  showInnerBorder = true,
  transform,
}: RenderFrenchShieldSvgOptions): string {
  const groupTransform =
    transform
      ? ` transform="${transform}"`
      : "";

  const innerBorder =
    showInnerBorder
      ? `
        <path
          d="${FRENCH_SHIELD_PATH}"
          transform="translate(5 6) scale(0.9)"
          fill="none"
          stroke="${
            innerBorderColor ??
            borderColor
          }"
          stroke-width="${innerBorderWidth}"
          stroke-linejoin="round"
        />
      `
      : "";

  return `
    <g${groupTransform}>
      <path
        d="${FRENCH_SHIELD_PATH}"
        fill="${fill}"
        stroke="${borderColor}"
        stroke-width="${borderWidth}"
        stroke-linejoin="round"
      />

      ${innerBorder}
    </g>
  `.trim();
}
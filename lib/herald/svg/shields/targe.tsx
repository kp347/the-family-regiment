/*
 * =========================================================
 * The Family Regiment
 * Canonical Targe Shield Geometry
 * =========================================================
 *
 * This module is the SINGLE SOURCE OF TRUTH for the
 * Family Regiment Targe Shield silhouette.
 *
 * V1 GEOMETRY:
 *
 * The Targe uses a clean circular shield field.
 *
 * The canonical geometry contains:
 *
 * - no center boss
 * - no crossbars
 * - no quadrants
 * - no embedded charges
 *
 * Decorative perimeter studs may appear in customer-facing
 * presentation artwork, but they are not structural shield
 * geometry and are therefore not included in this path.
 *
 * The center remains completely uninterrupted for the
 * dominant Canon charge.
 * =========================================================
 */

export const TARGE_SHIELD_VIEWBOX = {
  width: 100,
  height: 114,
} as const;

export const TARGE_SHIELD_PATH = [
  "M50 10",
  "C73 10 92 29 92 52",
  "C92 75 73 94 50 94",
  "C27 94 8 75 8 52",
  "C8 29 27 10 50 10",
  "Z",
].join(" ");

export interface TargeShieldProps {
  fill: string;
  borderColor: string;
  innerBorderColor?: string;
  borderWidth?: number;
  innerBorderWidth?: number;
  showInnerBorder?: boolean;
  transform?: string;
  className?: string;
}

export function TargeShield({
  fill,
  borderColor,
  innerBorderColor,
  borderWidth = 5,
  innerBorderWidth = 1.8,
  showInnerBorder = true,
  transform,
  className,
}: TargeShieldProps) {
  return (
    <g
      transform={transform}
      className={className}
    >
      <path
        d={TARGE_SHIELD_PATH}
        fill={fill}
        stroke={borderColor}
        strokeWidth={borderWidth}
        strokeLinejoin="round"
      />

      {showInnerBorder && (
        <path
          d={TARGE_SHIELD_PATH}
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

export interface RenderTargeShieldSvgOptions {
  fill: string;
  borderColor: string;
  innerBorderColor?: string;
  borderWidth?: number;
  innerBorderWidth?: number;
  showInnerBorder?: boolean;
  transform?: string;
}

export function renderTargeShieldSvg({
  fill,
  borderColor,
  innerBorderColor,
  borderWidth = 5,
  innerBorderWidth = 1.8,
  showInnerBorder = true,
  transform,
}: RenderTargeShieldSvgOptions): string {
  const groupTransform =
    transform
      ? ` transform="${transform}"`
      : "";

  const innerBorder =
    showInnerBorder
      ? `
        <path
          d="${TARGE_SHIELD_PATH}"
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
        d="${TARGE_SHIELD_PATH}"
        fill="${fill}"
        stroke="${borderColor}"
        stroke-width="${borderWidth}"
        stroke-linejoin="round"
      />

      ${innerBorder}
    </g>
  `.trim();
}
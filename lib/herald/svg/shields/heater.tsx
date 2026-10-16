/*
 * =========================================================
 * The Family Regiment
 * Canonical Heater Shield Geometry
 * =========================================================
 *
 * This module is the SINGLE SOURCE OF TRUTH for the
 * Family Regiment Heater Shield silhouette.
 *
 * It is used by:
 *
 * - interactive crest preview
 * - archival SVG rendering
 * - future production artwork generation
 *
 * IMPORTANT:
 *
 * Canonical geometry does NOT mean the asset is currently
 * manufacturing certified.
 *
 * Visual Canon status remains the authority for production
 * eligibility.
 *
 * V1 GEOMETRY:
 *
 * The Heater Shield uses broad shoulders, controlled
 * tapering sides, and a distinct pointed base. The interior
 * field remains uninterrupted for the dominant Canon charge.
 * =========================================================
 */

export const HEATER_SHIELD_VIEWBOX = {
  width: 100,
  height: 114,
} as const;

/*
 * Normalized canonical path.
 *
 * The upper edge uses a shallow center rise rather than the
 * rounded upper body of the legacy geometry. This keeps the
 * Heater visually distinct while preserving a broad usable
 * field for the dominant charge.
 */

export const HEATER_SHIELD_PATH = [
  "M10 18",
  "Q30 16 50 8",
  "Q70 16 90 18",
  "V48",
  "C90 73 74 92 50 108",
  "C26 92 10 73 10 48",
  "Z",
].join(" ");

/*
 * Production artwork should remain free of presentation
 * effects such as shadows, blur, gradients, and filters.
 */

export interface HeaterShieldProps {
  fill: string;
  borderColor: string;
  innerBorderColor?: string;
  borderWidth?: number;
  innerBorderWidth?: number;
  showInnerBorder?: boolean;
  transform?: string;
  className?: string;
}

export function HeaterShield({
  fill,
  borderColor,
  innerBorderColor,
  borderWidth = 5,
  innerBorderWidth = 1.8,
  showInnerBorder = true,
  transform,
  className,
}: HeaterShieldProps) {
  return (
    <g
      transform={transform}
      className={className}
    >
      <path
        d={HEATER_SHIELD_PATH}
        fill={fill}
        stroke={borderColor}
        strokeWidth={borderWidth}
        strokeLinejoin="round"
      />

      {showInnerBorder && (
        <path
          d={HEATER_SHIELD_PATH}
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
 * Server-side / downloadable SVG output cannot depend on a
 * React DOM render.
 *
 * This function deliberately uses the SAME path constant
 * as the React component above.
 * =========================================================
 */

export interface RenderHeaterShieldSvgOptions {
  fill: string;
  borderColor: string;
  innerBorderColor?: string;
  borderWidth?: number;
  innerBorderWidth?: number;
  showInnerBorder?: boolean;
  transform?: string;
}

export function renderHeaterShieldSvg({
  fill,
  borderColor,
  innerBorderColor,
  borderWidth = 5,
  innerBorderWidth = 1.8,
  showInnerBorder = true,
  transform,
}: RenderHeaterShieldSvgOptions): string {
  const groupTransform =
    transform
      ? ` transform="${transform}"`
      : "";

  const innerBorder =
    showInnerBorder
      ? `
        <path
          d="${HEATER_SHIELD_PATH}"
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
        d="${HEATER_SHIELD_PATH}"
        fill="${fill}"
        stroke="${borderColor}"
        stroke-width="${borderWidth}"
        stroke-linejoin="round"
      />

      ${innerBorder}
    </g>
  `.trim();
}
// lib/herald/svg/shields/heater.tsx

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
 * =========================================================
 */

export const HEATER_SHIELD_VIEWBOX = {
  width: 100,
  height: 114,
} as const;

/*
 * Normalized canonical path.
 *
 * Keeping the geometry normalized lets renderers scale and
 * position the shield without rewriting its shape.
 */

export const HEATER_SHIELD_PATH =
  "M50 8 C72 8 88 13 92 18 V48 C92 72 76 91 50 106 C24 91 8 72 8 48 V18 C12 13 28 8 50 8 Z";

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
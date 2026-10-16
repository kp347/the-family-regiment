/*
 * =========================================================
 * The Family Regiment
 * Canonical Spanish Shield Geometry
 * =========================================================
 *
 * This module is the SINGLE SOURCE OF TRUTH for the
 * Family Regiment Spanish Shield silhouette.
 *
 * V1 GEOMETRY:
 *
 * The Spanish Shield uses a broad upper field, relatively
 * straight sides, rounded lower corners, and a shallow
 * central lower point.
 *
 * This distinguishes it from the sharper Heater and the
 * elongated Norman while preserving a generous usable
 * interior for the dominant Canon charge.
 *
 * The interior remains uninterrupted.
 * =========================================================
 */

export const SPANISH_SHIELD_VIEWBOX = {
  width: 100,
  height: 114,
} as const;

export const SPANISH_SHIELD_PATH = [
  "M10 12",
  "H90",
  "V62",
  "C90 82 80 96 66 102",
  "L50 110",
  "L34 102",
  "C20 96 10 82 10 62",
  "Z",
].join(" ");

export interface SpanishShieldProps {
  fill: string;
  borderColor: string;
  innerBorderColor?: string;
  borderWidth?: number;
  innerBorderWidth?: number;
  showInnerBorder?: boolean;
  transform?: string;
  className?: string;
}

export function SpanishShield({
  fill,
  borderColor,
  innerBorderColor,
  borderWidth = 5,
  innerBorderWidth = 1.8,
  showInnerBorder = true,
  transform,
  className,
}: SpanishShieldProps) {
  return (
    <g
      transform={transform}
      className={className}
    >
      <path
        d={SPANISH_SHIELD_PATH}
        fill={fill}
        stroke={borderColor}
        strokeWidth={borderWidth}
        strokeLinejoin="round"
      />

      {showInnerBorder && (
        <path
          d={SPANISH_SHIELD_PATH}
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

export interface RenderSpanishShieldSvgOptions {
  fill: string;
  borderColor: string;
  innerBorderColor?: string;
  borderWidth?: number;
  innerBorderWidth?: number;
  showInnerBorder?: boolean;
  transform?: string;
}

export function renderSpanishShieldSvg({
  fill,
  borderColor,
  innerBorderColor,
  borderWidth = 5,
  innerBorderWidth = 1.8,
  showInnerBorder = true,
  transform,
}: RenderSpanishShieldSvgOptions): string {
  const groupTransform =
    transform
      ? ` transform="${transform}"`
      : "";

  const innerBorder =
    showInnerBorder
      ? `
        <path
          d="${SPANISH_SHIELD_PATH}"
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
        d="${SPANISH_SHIELD_PATH}"
        fill="${fill}"
        stroke="${borderColor}"
        stroke-width="${borderWidth}"
        stroke-linejoin="round"
      />

      ${innerBorder}
    </g>
  `.trim();
}
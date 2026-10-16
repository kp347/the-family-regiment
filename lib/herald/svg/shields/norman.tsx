/*
 * =========================================================
 * The Family Regiment
 * Canonical Norman Shield Geometry
 * =========================================================
 *
 * This module is the SINGLE SOURCE OF TRUTH for the
 * Family Regiment Norman Shield silhouette.
 *
 * V1 GEOMETRY:
 *
 * The Norman Shield remains taller and more elongated than
 * the other shield families, but its usable interior field
 * is deliberately broader than a literal historical kite
 * shield.
 *
 * This preserves the Norman character while leaving enough
 * room for every approved dominant Canon charge.
 *
 * The interior remains uninterrupted.
 * =========================================================
 */

export const NORMAN_SHIELD_VIEWBOX = {
  width: 100,
  height: 114,
} as const;

export const NORMAN_SHIELD_PATH = [
  "M14 17",
  "Q31 9 50 8",
  "Q69 9 86 17",
  "V43",
  "C86 69 72 91 50 110",
  "C28 91 14 69 14 43",
  "Z",
].join(" ");

export interface NormanShieldProps {
  fill: string;
  borderColor: string;
  innerBorderColor?: string;
  borderWidth?: number;
  innerBorderWidth?: number;
  showInnerBorder?: boolean;
  transform?: string;
  className?: string;
}

export function NormanShield({
  fill,
  borderColor,
  innerBorderColor,
  borderWidth = 5,
  innerBorderWidth = 1.8,
  showInnerBorder = true,
  transform,
  className,
}: NormanShieldProps) {
  return (
    <g
      transform={transform}
      className={className}
    >
      <path
        d={NORMAN_SHIELD_PATH}
        fill={fill}
        stroke={borderColor}
        strokeWidth={borderWidth}
        strokeLinejoin="round"
      />

      {showInnerBorder && (
        <path
          d={NORMAN_SHIELD_PATH}
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

export interface RenderNormanShieldSvgOptions {
  fill: string;
  borderColor: string;
  innerBorderColor?: string;
  borderWidth?: number;
  innerBorderWidth?: number;
  showInnerBorder?: boolean;
  transform?: string;
}

export function renderNormanShieldSvg({
  fill,
  borderColor,
  innerBorderColor,
  borderWidth = 5,
  innerBorderWidth = 1.8,
  showInnerBorder = true,
  transform,
}: RenderNormanShieldSvgOptions): string {
  const groupTransform =
    transform
      ? ` transform="${transform}"`
      : "";

  const innerBorder =
    showInnerBorder
      ? `
        <path
          d="${NORMAN_SHIELD_PATH}"
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
        d="${NORMAN_SHIELD_PATH}"
        fill="${fill}"
        stroke="${borderColor}"
        stroke-width="${borderWidth}"
        stroke-linejoin="round"
      />

      ${innerBorder}
    </g>
  `.trim();
}
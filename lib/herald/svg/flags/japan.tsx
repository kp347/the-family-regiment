// lib/herald/svg/flags/japan.tsx

/*
 * =========================================================
 * The Family Regiment
 * Heritage Flag Canon — Japan
 * =========================================================
 *
 * Controlled SVG geometry for the Japanese national flag.
 *
 * Official proportion: 2:3.
 *
 * The central disc diameter is three-fifths of the flag
 * height and is centered on the field.
 *
 * Builder presentation may crop or mask this artwork
 * inside a heraldic quadrant, but should not alter the
 * underlying flag identity.
 * =========================================================
 */

export const JAPAN_FLAG_VIEWBOX = {
  width: 3,
  height: 2,
} as const;

export interface JapanFlagProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  title?: string;
}

export function JapanFlag({
  width = "100%",
  height = "100%",
  className,
  title = "Flag of Japan",
}: JapanFlagProps) {
  return (
    <svg
      viewBox={`0 0 ${JAPAN_FLAG_VIEWBOX.width} ${JAPAN_FLAG_VIEWBOX.height}`}
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
        height="2"
        fill="#FFFFFF"
      />

      <circle
        cx="1.5"
        cy="1"
        r="0.6"
        fill="#BC002D"
      />
    </svg>
  );
}

export function renderJapanFlagSvg(): string {
  return [
    `<svg`,
    ` viewBox="0 0 ${JAPAN_FLAG_VIEWBOX.width} ${JAPAN_FLAG_VIEWBOX.height}"`,
    ` xmlns="http://www.w3.org/2000/svg"`,
    ` preserveAspectRatio="xMidYMid meet"`,
    `>`,
    `<rect x="0" y="0" width="3" height="2" fill="#FFFFFF"/>`,
    `<circle cx="1.5" cy="1" r="0.6" fill="#BC002D"/>`,
    `</svg>`,
  ].join("");
}
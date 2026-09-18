// lib/herald/svg/flags/scotland.tsx

/*
 * =========================================================
 * The Family Regiment
 * Heritage Flag Canon — Scotland
 * =========================================================
 *
 * Controlled SVG geometry for the Scottish national flag.
 *
 * Canon land proportion: 5:3.
 *
 * Construction:
 * - Blue field
 * - White St Andrew's Saltire
 * - Saltire is clipped precisely to the flag boundary
 *
 * Builder presentation may crop or mask this artwork
 * inside a heraldic quadrant, but should not alter the
 * underlying flag identity.
 * =========================================================
 */

export const SCOTLAND_FLAG_VIEWBOX = {
  width: 50,
  height: 30,
} as const;

export interface ScotlandFlagProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  title?: string;
}

export function ScotlandFlag({
  width = "100%",
  height = "100%",
  className,
  title = "Flag of Scotland",
}: ScotlandFlagProps) {
  return (
    <svg
      viewBox={`0 0 ${SCOTLAND_FLAG_VIEWBOX.width} ${SCOTLAND_FLAG_VIEWBOX.height}`}
      width={width}
      height={height}
      className={className}
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <clipPath id="scotland-flag-clip">
          <rect
            x="0"
            y="0"
            width="50"
            height="30"
          />
        </clipPath>
      </defs>

      <g clipPath="url(#scotland-flag-clip)">
        <rect
          x="0"
          y="0"
          width="50"
          height="30"
          fill="#0065BD"
        />

        <line
          x1="0"
          y1="0"
          x2="50"
          y2="30"
          stroke="#FFFFFF"
          strokeWidth="5"
        />

        <line
          x1="50"
          y1="0"
          x2="0"
          y2="30"
          stroke="#FFFFFF"
          strokeWidth="5"
        />
      </g>
    </svg>
  );
}

export function renderScotlandFlagSvg(): string {
  return [
    `<svg`,
    ` viewBox="0 0 ${SCOTLAND_FLAG_VIEWBOX.width} ${SCOTLAND_FLAG_VIEWBOX.height}"`,
    ` xmlns="http://www.w3.org/2000/svg"`,
    ` preserveAspectRatio="xMidYMid meet"`,
    `>`,
    `<defs>`,
    `<clipPath id="scotland-flag-clip">`,
    `<rect x="0" y="0" width="50" height="30"/>`,
    `</clipPath>`,
    `</defs>`,
    `<g clip-path="url(#scotland-flag-clip)">`,
    `<rect x="0" y="0" width="50" height="30" fill="#0065BD"/>`,
    `<line x1="0" y1="0" x2="50" y2="30" stroke="#FFFFFF" stroke-width="5"/>`,
    `<line x1="50" y1="0" x2="0" y2="30" stroke="#FFFFFF" stroke-width="5"/>`,
    `</g>`,
    `</svg>`,
  ].join("");
}
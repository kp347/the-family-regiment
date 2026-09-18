// lib/herald/svg/flags/south-korea.tsx

/*
 * =========================================================
 * The Family Regiment
 * Heritage Flag Canon — Republic of Korea
 * =========================================================
 *
 * Controlled SVG construction of the Taegeukgi.
 *
 * Geometry is based on the Republic of Korea national
 * flag construction specification:
 *
 * - 3:2 proportion
 * - centered Taegeuk
 * - four prescribed trigrams
 * - official rotational geometry
 *
 * This remains a draft Canon asset until final visual
 * and production review are complete.
 * =========================================================
 */

export const SOUTH_KOREA_FLAG_VIEWBOX = {
  width: 144,
  height: 96,
} as const;

export interface SouthKoreaFlagProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  title?: string;
}

const WHITE = "#FFFFFF";
const BLACK = "#000000";
const RED = "#CD2E3A";
const BLUE = "#0047A0";

const ROTATION = 33.69006752598;

function FlagArtwork() {
  return (
    <>
      {/* White field */}
      <rect
        x="-72"
        y="-48"
        width="144"
        height="96"
        fill={WHITE}
      />

      {/* Four trigrams */}
      <g
        stroke={BLACK}
        strokeWidth="4"
        strokeLinecap="butt"
      >
        {/*
         * Geon + Gon
         */}
        <path
          transform={`rotate(${ROTATION})`}
          d={[
            "M -50 -12",
            "v 24",

            "M -44 12",
            "v -24",

            "M -38 -12",
            "v 24",

            "M 38 12",
            "V 1",

            "M 38 -1",
            "v -11",

            "M 44 -12",
            "v 11",

            "M 44 1",
            "v 11",

            "M 50 12",
            "V 1",

            "M 50 -1",
            "v -11",
          ].join(" ")}
        />

        {/*
         * Ri + Gam
         */}
        <path
          transform={`rotate(${-ROTATION})`}
          d={[
            "M -50 -12",
            "v 24",

            "M -44 12",
            "V 1",

            "M -44 -1",
            "v -11",

            "M -38 -12",
            "v 24",

            "M 38 12",
            "V 1",

            "M 38 -1",
            "v -11",

            "M 44 -12",
            "v 24",

            "M 50 12",
            "V 1",

            "M 50 -1",
            "v -11",
          ].join(" ")}
        />
      </g>

      {/* Taegeuk */}
      <g transform={`rotate(${ROTATION})`}>
        <path
          fill={RED}
          d={[
            "M 12 0",
            "a 18 18 0 1 1 -36 0",
            "a 24 24 0 1 1 48 0",
          ].join(" ")}
        />

        <path
          fill={BLUE}
          d={[
            "M 0 0",
            "a 12 12 0 1 1 24 0",
            "a 24 24 0 1 1 -48 0",
            "a 12 12 0 1 0 24 0",
          ].join(" ")}
        />
      </g>
    </>
  );
}

export function SouthKoreaFlag({
  width = "100%",
  height = "100%",
  className,
  title = "Flag of the Republic of Korea",
}: SouthKoreaFlagProps) {
  return (
    <svg
      viewBox="-72 -48 144 96"
      width={width}
      height={height}
      className={className}
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
    >
      <FlagArtwork />
    </svg>
  );
}

export function renderSouthKoreaFlagSvg(): string {
  return [
    `<svg`,
    ` viewBox="-72 -48 144 96"`,
    ` xmlns="http://www.w3.org/2000/svg"`,
    ` preserveAspectRatio="xMidYMid meet"`,
    `>`,

    `<rect x="-72" y="-48" width="144" height="96" fill="${WHITE}"/>`,

    `<g stroke="${BLACK}" stroke-width="4" stroke-linecap="butt">`,

    `<path`,
    ` transform="rotate(${ROTATION})"`,
    ` d="M-50-12v24m6 0v-24m6 0v24m76 0V1m0-2v-11m6 0v11m0 2v11m6 0V1m0-2v-11"`,
    `/>`,

    `<path`,
    ` transform="rotate(${-ROTATION})"`,
    ` d="M-50-12v24m6 0V1m0-2v-11m6 0v24m76 0V1m0-2v-11m6 0v24m6 0V1m0-2v-11"`,
    `/>`,

    `</g>`,

    `<g transform="rotate(${ROTATION})">`,

    `<path`,
    ` fill="${RED}"`,
    ` d="M12 0a18 18 0 11-36 0 24 24 0 1148 0"`,
    `/>`,

    `<path`,
    ` fill="${BLUE}"`,
    ` d="M0 0a12 12 0 1124 0 24 24 0 11-48 0 12 12 0 1024 0"`,
    `/>`,

    `</g>`,

    `</svg>`,
  ].join("");
}
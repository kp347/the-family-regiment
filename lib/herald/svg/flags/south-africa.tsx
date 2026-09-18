// lib/herald/svg/flags/south-africa.tsx

/*
 * =========================================================
 * The Family Regiment
 * Heritage Flag Canon — South Africa
 * =========================================================
 *
 * Controlled SVG construction.
 *
 * Canon proportion: 3:2.
 *
 * IMPORTANT LAYERING:
 * - White borders the green Y toward red/blue.
 * - Gold borders the black triangle toward green.
 * - There is NO white border between black and gold.
 * - Black and gold both terminate flush at the hoist edge.
 *
 * Status: Draft
 * =========================================================
 */

export const SOUTH_AFRICA_FLAG_VIEWBOX = {
  width: 90,
  height: 60,
} as const;

export interface SouthAfricaFlagProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  title?: string;
}

const RED = "#E03C31";
const BLUE = "#001489";
const GREEN = "#007749";
const GOLD = "#FFB81C";
const BLACK = "#000000";
const WHITE = "#FFFFFF";

/*
 * We use explicit filled polygons rather than overlapping
 * strokes. That prevents the unwanted thin white seam that
 * appeared beside the black triangle.
 *
 * Geometry:
 *
 * BLACK
 *   Hoist: y = 15 -> 45
 *   Point: x = 27, y = 30
 *
 * GOLD
 *   Hoist: y = 11 -> 49
 *   Point: x = 33, y = 30
 *
 * GREEN
 *   Hoist: y = 6 -> 54
 *   Inner hoist: y = 15 -> 45
 *   Junction: x = 45
 *   Horizontal band: y = 24 -> 36
 *
 * WHITE
 *   Outside green only, separating green from red/blue.
 */

const WHITE_Y_PATH = [
  "M 0 3",
  "L 45 25.5",
  "L 90 25.5",
  "L 90 34.5",
  "L 45 34.5",
  "L 0 57",,
  "Z",
].join(" ");

const GREEN_Y_PATH = [
  "M 0 6",
  "L 45 27",
  "L 90 27",
  "L 90 33",
  "L 45 33",
  "L 0 54",
  "L 0 49",
  "L 33 30",
  "L 0 11",
  "Z",
].join(" ");

const GOLD_TRIANGLE_PATH = [
  "M 0 11",
  "L 33 30",
  "L 0 49",
  "Z",
].join(" ");

const BLACK_TRIANGLE_PATH = [
  "M 0 15",
  "L 27 30",
  "L 0 45",
  "Z",
].join(" ");

function SouthAfricaArtwork() {
  return (
    <>
      {/* Base flag fields */}
      <rect
        x="0"
        y="0"
        width="90"
        height="30"
        fill={RED}
      />

      <rect
        x="0"
        y="30"
        width="90"
        height="30"
        fill={BLUE}
      />

      {/*
       * White outer Y.
       *
       * White appears only between the green Y and the
       * red/blue fields.
       */}
      <path
        d={WHITE_Y_PATH}
        fill={WHITE}
      />

      {/*
       * Green Y.
       *
       * Its inner V stops at the gold triangle boundary.
       */}
      <path
        d={GREEN_Y_PATH}
        fill={GREEN}
      />

      {/*
       * Gold triangle.
       *
       * This begins directly on x=0, so the gold border
       * reaches the left/hoist edge of the flag.
       */}
      <path
        d={GOLD_TRIANGLE_PATH}
        fill={GOLD}
      />

      {/*
       * Black triangle.
       *
       * Also begins directly on x=0.
       *
       * Because black is drawn directly over gold,
       * there can be no white seam between them.
       */}
      <path
        d={BLACK_TRIANGLE_PATH}
        fill={BLACK}
      />
    </>
  );
}

export function SouthAfricaFlag({
  width = "100%",
  height = "100%",
  className,
  title = "Flag of South Africa",
}: SouthAfricaFlagProps) {
  return (
    <svg
      viewBox={`0 0 ${SOUTH_AFRICA_FLAG_VIEWBOX.width} ${SOUTH_AFRICA_FLAG_VIEWBOX.height}`}
      width={width}
      height={height}
      className={className}
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
    >
      <SouthAfricaArtwork />
    </svg>
  );
}

export function renderSouthAfricaFlagSvg(): string {
  return [
    `<svg`,
    ` viewBox="0 0 ${SOUTH_AFRICA_FLAG_VIEWBOX.width} ${SOUTH_AFRICA_FLAG_VIEWBOX.height}"`,
    ` xmlns="http://www.w3.org/2000/svg"`,
    ` preserveAspectRatio="xMidYMid meet"`,
    `>`,

    `<rect`,
    ` x="0"`,
    ` y="0"`,
    ` width="90"`,
    ` height="30"`,
    ` fill="${RED}"`,
    `/>`,

    `<rect`,
    ` x="0"`,
    ` y="30"`,
    ` width="90"`,
    ` height="30"`,
    ` fill="${BLUE}"`,
    `/>`,

    `<path`,
    ` d="${WHITE_Y_PATH}"`,
    ` fill="${WHITE}"`,
    `/>`,

    `<path`,
    ` d="${GREEN_Y_PATH}"`,
    ` fill="${GREEN}"`,
    `/>`,

    `<path`,
    ` d="${GOLD_TRIANGLE_PATH}"`,
    ` fill="${GOLD}"`,
    `/>`,

    `<path`,
    ` d="${BLACK_TRIANGLE_PATH}"`,
    ` fill="${BLACK}"`,
    `/>`,

    `</svg>`,
  ].join("");
}
// lib/herald/svg/flags/united-kingdom.tsx

/*
 * =========================================================
 * The Family Regiment
 * Heritage Flag Canon — United Kingdom
 * =========================================================
 *
 * Controlled SVG geometry for the Union Flag.
 *
 * Canon land proportion: 5:3 (50 x 30 units).
 *
 * Construction:
 * - Royal blue field
 * - White St Andrew's saltire
 * - Counterchanged red St Patrick's saltire
 * - White fimbriation around St George's cross
 * - Red St George's cross
 *
 * IMPORTANT:
 * The Union Flag is intentionally asymmetric.
 * The broader white diagonal is uppermost at the hoist.
 *
 * This remains a draft Canon asset until visual and
 * production review are complete.
 * =========================================================
 */

export const UNITED_KINGDOM_FLAG_VIEWBOX = {
  width: 50,
  height: 30,
} as const;

export interface UnitedKingdomFlagProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  title?: string;
}

const BLUE = "#012169";
const RED = "#C8102E";
const WHITE = "#FFFFFF";

/*
 * We use clipped polygons rather than strokes for the
 * counterchanged diagonals so React and raw SVG output
 * remain deterministic and identical.
 */

function UnionFlagArtwork() {
  return (
    <>
      {/* Royal blue field */}
      <rect
        x="0"
        y="0"
        width="50"
        height="30"
        fill={BLUE}
      />

      {/* St Andrew's white saltire */}
      <path
        d="M0 0 L5 0 L50 27 L50 30 L45 30 L0 3 Z"
        fill={WHITE}
      />

      <path
        d="M45 0 L50 0 L50 3 L5 30 L0 30 L0 27 Z"
        fill={WHITE}
      />

      {/*
       * St Patrick's red saltire.
       *
       * These are deliberately offset within the white
       * saltires. They must NOT be centered.
       */}

      {/* Hoist-top to fly-bottom */}
      <path
        d="M0 0 L3 0 L50 28.2 L50 30 L47 30 L0 1.8 Z"
        fill={RED}
      />

      {/* Fly-top to hoist-bottom */}
      <path
        d="M47 0 L50 0 L50 1.8 L3 30 L0 30 L0 28.2 Z"
        fill={RED}
      />

      {/* White fimbriation for St George's cross */}
      <rect
        x="20"
        y="0"
        width="10"
        height="30"
        fill={WHITE}
      />

      <rect
        x="0"
        y="10"
        width="50"
        height="10"
        fill={WHITE}
      />

      {/* Red St George's cross */}
      <rect
        x="22"
        y="0"
        width="6"
        height="30"
        fill={RED}
      />

      <rect
        x="0"
        y="12"
        width="50"
        height="6"
        fill={RED}
      />
    </>
  );
}

export function UnitedKingdomFlag({
  width = "100%",
  height = "100%",
  className,
  title = "Flag of the United Kingdom",
}: UnitedKingdomFlagProps) {
  return (
    <svg
      viewBox={`0 0 ${UNITED_KINGDOM_FLAG_VIEWBOX.width} ${UNITED_KINGDOM_FLAG_VIEWBOX.height}`}
      width={width}
      height={height}
      className={className}
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
    >
      <UnionFlagArtwork />
    </svg>
  );
}

export function renderUnitedKingdomFlagSvg(): string {
  return [
    `<svg`,
    ` viewBox="0 0 ${UNITED_KINGDOM_FLAG_VIEWBOX.width} ${UNITED_KINGDOM_FLAG_VIEWBOX.height}"`,
    ` xmlns="http://www.w3.org/2000/svg"`,
    ` preserveAspectRatio="xMidYMid meet"`,
    `>`,

    `<rect x="0" y="0" width="50" height="30" fill="${BLUE}"/>`,

    `<path d="M0 0 L5 0 L50 27 L50 30 L45 30 L0 3 Z" fill="${WHITE}"/>`,
    `<path d="M45 0 L50 0 L50 3 L5 30 L0 30 L0 27 Z" fill="${WHITE}"/>`,

    `<path d="M0 0 L3 0 L50 28.2 L50 30 L47 30 L0 1.8 Z" fill="${RED}"/>`,
    `<path d="M47 0 L50 0 L50 1.8 L3 30 L0 30 L0 28.2 Z" fill="${RED}"/>`,

    `<rect x="20" y="0" width="10" height="30" fill="${WHITE}"/>`,
    `<rect x="0" y="10" width="50" height="10" fill="${WHITE}"/>`,

    `<rect x="22" y="0" width="6" height="30" fill="${RED}"/>`,
    `<rect x="0" y="12" width="50" height="6" fill="${RED}"/>`,

    `</svg>`,
  ].join("");
}
// lib/herald/svg/flags/united-states.tsx

/*
 * =========================================================
 * The Family Regiment
 * Heritage Flag Canon — United States
 * =========================================================
 *
 * Controlled SVG geometry for the United States flag.
 *
 * Geometry follows Executive Order 10834.
 *
 * Normalized federal proportions:
 * - Hoist: 1.0
 * - Fly: 1.9
 * - Union height: 0.5385
 * - Union length: 0.76
 * - Stripe width: 0.0769
 * - Star diameter: 0.0616
 *
 * Builder presentation may crop or mask this artwork
 * inside a heraldic quadrant, but should not alter the
 * underlying flag identity.
 * =========================================================
 */

export const UNITED_STATES_FLAG_VIEWBOX = {
  width: 1.9,
  height: 1,
} as const;

const FLAG_WIDTH = 1.9;
const FLAG_HEIGHT = 1;

const STRIPE_HEIGHT = 1 / 13;

const UNION_WIDTH = 0.76;
const UNION_HEIGHT = 7 / 13;

const STAR_OUTER_RADIUS = 0.0616 / 2;
const STAR_INNER_RADIUS =
  STAR_OUTER_RADIUS * 0.38196601125;

const STAR_HORIZONTAL_STEP = 0.126;
const STAR_VERTICAL_STEP = 0.054;

export interface UnitedStatesFlagProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  title?: string;
}

interface StarCenter {
  x: number;
  y: number;
}

function getStarPoints(
  cx: number,
  cy: number,
): string {
  const points: string[] = [];

  for (let index = 0; index < 10; index += 1) {
    const angle =
      -Math.PI / 2 +
      (index * Math.PI) / 5;

    const radius =
      index % 2 === 0
        ? STAR_OUTER_RADIUS
        : STAR_INNER_RADIUS;

    const x =
      cx + Math.cos(angle) * radius;

    const y =
      cy + Math.sin(angle) * radius;

    points.push(
      `${x.toFixed(6)},${y.toFixed(6)}`,
    );
  }

  return points.join(" ");
}

function createStarCenters(): StarCenter[] {
  const stars: StarCenter[] = [];

  /*
   * Federal construction:
   *
   * 9 staggered rows.
   * Rows 1,3,5,7,9 contain 6 stars.
   * Rows 2,4,6,8 contain 5 stars.
   *
   * Six-star rows:
   * x = .063, .189, .315, .441, .567, .693
   *
   * Five-star rows:
   * x = .126, .252, .378, .504, .630
   *
   * Vertical rows begin at .054 and advance by .054.
   */

  for (let row = 0; row < 9; row += 1) {
    const y =
      STAR_VERTICAL_STEP * (row + 1);

    const sixStarRow =
      row % 2 === 0;

    const count =
      sixStarRow ? 6 : 5;

    const startX =
      sixStarRow ? 0.063 : 0.126;

    for (
      let column = 0;
      column < count;
      column += 1
    ) {
      stars.push({
        x:
          startX +
          column * STAR_HORIZONTAL_STEP,
        y,
      });
    }
  }

  return stars;
}

const STAR_CENTERS =
  createStarCenters();

function renderRedStripesReact() {
  return Array.from({
    length: 7,
  }).map((_, index) => {
    const stripeIndex =
      index * 2;

    return (
      <rect
        key={`red-stripe-${stripeIndex}`}
        x="0"
        y={
          stripeIndex *
          STRIPE_HEIGHT
        }
        width={FLAG_WIDTH}
        height={STRIPE_HEIGHT}
        fill="#B31942"
      />
    );
  });
}

export function UnitedStatesFlag({
  width = "100%",
  height = "100%",
  className,
  title = "Flag of the United States",
}: UnitedStatesFlagProps) {
  return (
    <svg
      viewBox={`0 0 ${UNITED_STATES_FLAG_VIEWBOX.width} ${UNITED_STATES_FLAG_VIEWBOX.height}`}
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
        width={FLAG_WIDTH}
        height={FLAG_HEIGHT}
        fill="#FFFFFF"
      />

      {renderRedStripesReact()}

      <rect
        x="0"
        y="0"
        width={UNION_WIDTH}
        height={UNION_HEIGHT}
        fill="#0A3161"
      />

      {STAR_CENTERS.map(
        (star, index) => (
          <polygon
            key={`star-${index}`}
            points={getStarPoints(
              star.x,
              star.y,
            )}
            fill="#FFFFFF"
          />
        ),
      )}
    </svg>
  );
}

export function renderUnitedStatesFlagSvg(): string {
  const stripes = Array.from({
    length: 7,
  })
    .map((_, index) => {
      const stripeIndex =
        index * 2;

      const y =
        stripeIndex *
        STRIPE_HEIGHT;

      return [
        `<rect`,
        ` x="0"`,
        ` y="${y.toFixed(6)}"`,
        ` width="${FLAG_WIDTH}"`,
        ` height="${STRIPE_HEIGHT.toFixed(6)}"`,
        ` fill="#B31942"`,
        `/>`,
      ].join("");
    })
    .join("");

  const stars = STAR_CENTERS
    .map((star) =>
      [
        `<polygon`,
        ` points="${getStarPoints(
          star.x,
          star.y,
        )}"`,
        ` fill="#FFFFFF"`,
        `/>`,
      ].join(""),
    )
    .join("");

  return [
    `<svg`,
    ` viewBox="0 0 ${UNITED_STATES_FLAG_VIEWBOX.width} ${UNITED_STATES_FLAG_VIEWBOX.height}"`,
    ` xmlns="http://www.w3.org/2000/svg"`,
    ` preserveAspectRatio="xMidYMid meet"`,
    `>`,
    `<rect x="0" y="0" width="${FLAG_WIDTH}" height="${FLAG_HEIGHT}" fill="#FFFFFF"/>`,
    stripes,
    `<rect x="0" y="0" width="${UNION_WIDTH}" height="${UNION_HEIGHT.toFixed(
      6,
    )}" fill="#0A3161"/>`,
    stars,
    `</svg>`,
  ].join("");
}
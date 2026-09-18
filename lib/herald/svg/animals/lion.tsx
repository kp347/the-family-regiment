/*
 * =========================================================
 * The Family Regiment
 * Canonical Lion — Rampant
 * =========================================================
 *
 * Visual Canon posture:
 *
 *   RAMPANT
 *
 * The lion stands upright with forepaws raised, one hind
 * leg supporting the body, the second raised, and the tail
 * elevated in a traditional heraldic silhouette.
 *
 * This module is the SINGLE SOURCE OF TRUTH for the
 * Family Regiment Lion Rampant geometry.
 *
 * Used by:
 *
 * - browser crest preview
 * - archival SVG rendering
 * - future production artwork generation
 *
 * IMPORTANT
 * =========================================================
 *
 * This artwork remains DRAFT.
 *
 * It must still complete:
 *
 * - visual approval
 * - production review
 * - embroidery reduction review
 * - physical sampling
 * - canon certification
 *
 * No vendor should treat this asset as production-authorized
 * until those stages are complete.
 * =========================================================
 */

export const LION_RAMPANT_VIEWBOX = {
  width: 100,
  height: 120,
} as const;

export const LION_RAMPANT_VARIANT_ID =
  "rampant" as const;

/*
 * =========================================================
 * Canonical Geometry
 * =========================================================
 *
 * Geometry is separated into named anatomical regions so
 * the lion can be refined without creating a second visual
 * identity between React and raw SVG output.
 *
 * Design priorities:
 *
 * - strong heraldic silhouette
 * - prominent mane and chest
 * - readable raised forepaws
 * - clearly articulated hind legs
 * - elevated S-curve tail
 * - controlled interior detail
 * - no gradients or filters
 * - no dependency on fonts
 * - no fragile micro-detail
 * =========================================================
 */

export const LION_RAMPANT_PATHS = {
  /*
   * Outer mane.
   *
   * The mane establishes the visual authority of the lion.
   * Broad scalloped masses create richness without relying
   * on tiny individual hair marks.
   */

  maneOuter: `
    M53 18
    C47 16 42 18 39 22
    C34 21 30 24 29 29
    C24 31 22 36 24 41
    C20 45 20 51 24 55
    C21 61 24 67 29 70
    C29 76 34 81 40 82
    C44 87 50 88 55 84
    C59 80 61 74 59 68
    C64 64 65 58 62 53
    C67 48 67 41 63 36
    C66 30 62 23 57 21
    C56 19 55 18 53 18
    Z
  `,

  /*
   * Inner mane opening.
   *
   * This cut-shaped accent gives the mane depth while
   * remaining large enough to survive reduced rendering.
   */

  maneInner: `
    M48 29
    C43 30 40 34 39 39
    C37 44 39 50 43 53
    C41 58 43 64 47 67
    C50 70 54 71 57 68
    C59 64 59 59 56 55
    C60 51 60 45 57 41
    C59 36 56 31 52 29
    C51 29 49 29 48 29
    Z
  `,

  /*
   * Torso and chest.
   *
   * The deep chest and narrowed waist give the animal a
   * more traditional heraldic proportion.
   */

  torso: `
    M48 49
    C53 46 59 47 63 51
    C68 56 69 63 66 70
    C64 76 60 80 56 84
    C52 88 50 94 50 101
    L43 101
    C42 94 43 88 46 82
    C40 81 35 78 32 73
    C28 67 27 60 30 54
    C34 49 41 47 48 49
    Z
  `,

  /*
   * Head.
   *
   * A longer brow and squared muzzle create a more
   * heraldic profile than the former rounded head.
   */

  head: `
    M54 24
    C61 21 69 23 73 28
    C77 33 77 39 74 44
    C72 47 69 49 65 50
    C61 51 57 49 55 46
    C52 43 51 39 52 35
    C50 32 51 27 54 24
    Z
  `,

  /*
   * Brow / facial plane.
   */

  brow: `
    M57 28
    C62 26 68 27 71 31
    C68 32 64 33 60 33
    C59 31 58 30 57 28
    Z
  `,

  /*
   * Muzzle.
   */

  muzzle: `
    M63 36
    C68 34 73 36 75 40
    C76 43 74 46 71 48
    C67 50 63 48 61 45
    C60 42 60 39 63 36
    Z
  `,

  /*
   * Ear.
   */

  ear: `
    M55 25
    L56 16
    L64 24
    C61 23 58 23 55 25
    Z
  `,

  /*
   * Forward raised foreleg.
   *
   * Ends in a broad paw so it remains recognizable at
   * jacket-patch scale.
   */

  forelegForward: `
    M42 48
    C37 44 33 40 29 35
    L23 28
    C21 25 17 25 15 28
    C13 31 14 34 17 36
    L23 40
    C27 46 32 52 38 56
    C40 55 42 52 42 48
    Z
  `,

  /*
   * Rear raised foreleg.
   */

  forelegRear: `
    M38 55
    C32 55 27 54 22 51
    L14 47
    C11 45 8 47 8 51
    C8 55 11 57 14 58
    L22 59
    C28 63 34 64 40 62
    C42 59 41 57 38 55
    Z
  `,

  /*
   * Supporting hind leg.
   *
   * Broad upper thigh narrows toward the paw to preserve a
   * stable rampant stance.
   */

  hindLegSupporting: `
    M53 78
    C58 83 60 89 59 95
    C59 101 57 106 55 111
    L48 111
    C48 105 48 100 47 96
    C45 91 45 86 47 81
    C49 79 51 78 53 78
    Z
  `,

  /*
   * Raised hind leg.
   */

  hindLegRaised: `
    M62 72
    C69 73 74 77 77 83
    L82 93
    C83 96 82 99 79 101
    C76 102 74 100 72 97
    L67 90
    C64 87 60 85 55 84
    C56 79 58 75 62 72
    Z
  `,

  /*
   * Tail base.
   *
   * The tail is rendered as a broad double-stroke rather
   * than a thin closed shape. This preserves the elegant
   * heraldic S-curve and makes future stitch reduction more
   * manageable.
   */

  tail: `
    M61 72
    C72 71 79 65 81 57
    C83 50 79 45 81 39
    C83 33 89 31 92 26
    C95 21 94 16 90 14
    C86 12 82 15 82 19
  `,

  /*
   * Tail tuft.
   */

  tailTuft: `
    M80 20
    C80 14 83 9 88 7
    C93 5 98 8 99 13
    C100 18 96 23 91 25
    C86 27 82 25 80 20
    Z
  `,

  /*
   * Front paw claw marks.
   */

  frontClaws: `
    M17 28 L11 23
    M19 27 L16 20
    M14 48 L8 44
    M14 51 L7 51
  `,

  /*
   * Rear paw claw marks.
   */

  rearClaws: `
    M49 110 L45 116
    M52 111 L52 118
    M80 96 L86 98
    M79 94 L85 91
  `,

  /*
   * Interior mane accents.
   *
   * These are deliberately large, sparse divisions rather
   * than hair texture.
   */

  maneAccents: `
    M36 31 C40 33 43 36 44 40
    M28 42 C34 43 38 46 40 50
    M28 58 C34 57 39 59 42 63
    M35 73 C39 69 44 68 48 69
  `,

  /*
   * Chest accent.
   */

  chestAccent: `
    M48 55
    C45 61 45 67 48 72
    C50 75 52 77 55 79
  `,

  /*
   * Mouth.
   */

  mouth: `
    M72 43
    C69 45 66 45 63 44
  `,
} as const;

/*
 * =========================================================
 * React Renderer
 * =========================================================
 */

export interface LionRampantProps {
  fill: string;
  accent: string;
  transform?: string;
  className?: string;
}

export function LionRampant({
  fill,
  accent,
  transform,
  className,
}: LionRampantProps) {
  return (
    <g
      transform={transform}
      className={className}
      fill={fill}
      stroke={accent}
      strokeWidth="1.9"
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      <path
        d={
          LION_RAMPANT_PATHS.maneOuter
        }
      />

      <path
        d={
          LION_RAMPANT_PATHS.torso
        }
      />

      <path
        d={
          LION_RAMPANT_PATHS.forelegForward
        }
      />

      <path
        d={
          LION_RAMPANT_PATHS.forelegRear
        }
      />

      <path
        d={
          LION_RAMPANT_PATHS.hindLegSupporting
        }
      />

      <path
        d={
          LION_RAMPANT_PATHS.hindLegRaised
        }
      />

      <path
        d={
          LION_RAMPANT_PATHS.head
        }
      />

      <path
        d={
          LION_RAMPANT_PATHS.ear
        }
      />

      <path
        d={
          LION_RAMPANT_PATHS.brow
        }
        fill={accent}
        stroke="none"
      />

      <path
        d={
          LION_RAMPANT_PATHS.muzzle
        }
        fill={accent}
      />

      <path
        d={
          LION_RAMPANT_PATHS.maneInner
        }
        fill={accent}
        stroke="none"
        opacity="0.3"
      />

      <path
        d={
          LION_RAMPANT_PATHS.tail
        }
        fill="none"
        stroke={fill}
        strokeWidth="7"
      />

      <path
        d={
          LION_RAMPANT_PATHS.tail
        }
        fill="none"
        stroke={accent}
        strokeWidth="1.9"
      />

      <path
        d={
          LION_RAMPANT_PATHS.tailTuft
        }
      />

      <path
        d={
          LION_RAMPANT_PATHS.maneAccents
        }
        fill="none"
        strokeWidth="1.7"
      />

      <path
        d={
          LION_RAMPANT_PATHS.chestAccent
        }
        fill="none"
        strokeWidth="1.7"
      />

      <path
        d={
          LION_RAMPANT_PATHS.frontClaws
        }
        fill="none"
        strokeWidth="2.1"
      />

      <path
        d={
          LION_RAMPANT_PATHS.rearClaws
        }
        fill="none"
        strokeWidth="2.1"
      />

      <circle
        cx="66"
        cy="34"
        r="1.65"
        fill={accent}
        stroke="none"
      />

      <path
        d={
          LION_RAMPANT_PATHS.mouth
        }
        fill="none"
        strokeWidth="1.5"
      />
    </g>
  );
}

/*
 * =========================================================
 * Raw SVG Renderer
 * =========================================================
 *
 * Uses the exact same geometry and drawing order as the
 * React renderer above.
 *
 * There is deliberately no independent second lion.
 * =========================================================
 */

export interface RenderLionRampantSvgOptions {
  fill: string;
  accent: string;
  transform?: string;
}

export function renderLionRampantSvg({
  fill,
  accent,
  transform,
}: RenderLionRampantSvgOptions): string {
  const groupTransform =
    transform
      ? ` transform="${transform}"`
      : "";

  return `
    <g${groupTransform}
      fill="${fill}"
      stroke="${accent}"
      stroke-width="1.9"
      stroke-linejoin="round"
      stroke-linecap="round"
    >
      <path
        d="${LION_RAMPANT_PATHS.maneOuter}"
      />

      <path
        d="${LION_RAMPANT_PATHS.torso}"
      />

      <path
        d="${LION_RAMPANT_PATHS.forelegForward}"
      />

      <path
        d="${LION_RAMPANT_PATHS.forelegRear}"
      />

      <path
        d="${LION_RAMPANT_PATHS.hindLegSupporting}"
      />

      <path
        d="${LION_RAMPANT_PATHS.hindLegRaised}"
      />

      <path
        d="${LION_RAMPANT_PATHS.head}"
      />

      <path
        d="${LION_RAMPANT_PATHS.ear}"
      />

      <path
        d="${LION_RAMPANT_PATHS.brow}"
        fill="${accent}"
        stroke="none"
      />

      <path
        d="${LION_RAMPANT_PATHS.muzzle}"
        fill="${accent}"
      />

      <path
        d="${LION_RAMPANT_PATHS.maneInner}"
        fill="${accent}"
        stroke="none"
        opacity="0.3"
      />

      <path
        d="${LION_RAMPANT_PATHS.tail}"
        fill="none"
        stroke="${fill}"
        stroke-width="7"
      />

      <path
        d="${LION_RAMPANT_PATHS.tail}"
        fill="none"
        stroke="${accent}"
        stroke-width="1.9"
      />

      <path
        d="${LION_RAMPANT_PATHS.tailTuft}"
      />

      <path
        d="${LION_RAMPANT_PATHS.maneAccents}"
        fill="none"
        stroke-width="1.7"
      />

      <path
        d="${LION_RAMPANT_PATHS.chestAccent}"
        fill="none"
        stroke-width="1.7"
      />

      <path
        d="${LION_RAMPANT_PATHS.frontClaws}"
        fill="none"
        stroke-width="2.1"
      />

      <path
        d="${LION_RAMPANT_PATHS.rearClaws}"
        fill="none"
        stroke-width="2.1"
      />

      <circle
        cx="66"
        cy="34"
        r="1.65"
        fill="${accent}"
        stroke="none"
      />

      <path
        d="${LION_RAMPANT_PATHS.mouth}"
        fill="none"
        stroke-width="1.5"
      />
    </g>
  `.trim();
}
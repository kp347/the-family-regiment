// lib/jacketLayout.ts

/**
 * The Family Regiment — V1 Jacket Placement Canon
 *
 * FOUR GARMENT ZONES
 *
 * 1. Wearer's LEFT shoulder:
 *    Family Crest
 *
 * 2. Wearer's RIGHT shoulder:
 *    Heritage — up to three individual country / state /
 *    approved regional flag patches
 *
 * 3. Wearer's RIGHT chest:
 *    Name Tape — directly above chest pocket
 *
 * 4. Wearer's LEFT chest:
 *    Selectable Identity Patch
 *
 * IMPORTANT ORIENTATION RULE
 *
 * "Left" and "right" ALWAYS describe the person
 * WEARING the jacket.
 *
 * They never describe the viewer's screen.
 *
 * When the jacket faces the viewer:
 *
 *   WEARER'S RIGHT = IMAGE-LEFT
 *   WEARER'S LEFT  = IMAGE-RIGHT
 *
 * Every photographic angle receives its own
 * coordinates and visibility rules.
 *
 * Never mirror an image with CSS to manufacture
 * another garment view.
 *
 * IMPORTANT VIEW RULE
 *
 * A patch should only be rendered when its physical
 * garment zone is meaningfully visible in the approved
 * photographic asset.
 *
 * Do not move a patch onto the wrong physical shoulder
 * merely to make it visible from a particular angle.
 *
 * V1 RULE:
 * There is one identity-patch zone only.
 */

export const jacketLayout = {
  /**
   * =====================================================
   * FRONT
   * =====================================================
   *
   * Jacket faces the viewer.
   *
   * IMAGE-LEFT:
   * - Wearer's RIGHT shoulder → Heritage
   * - Wearer's RIGHT chest → Name Tape
   *
   * IMAGE-RIGHT:
   * - Wearer's LEFT shoulder → Family Crest
   * - Wearer's LEFT chest → Identity Patch
   */
  front: {
    /**
     * ZONE 1
     *
     * WEARER'S LEFT SHOULDER
     * FAMILY CREST
     *
     * Front-facing wearer-left appears IMAGE-RIGHT.
     */
    familyCrest: {
      leftShoulder: {
        left: "78%",
        top: "28%",
        width: 58,
        height: 70,
        scale: 0.45,
        rotation: 0,
        visible: true,
      },
    },

    /**
     * ZONE 2
     *
     * WEARER'S RIGHT SHOULDER
     * HERITAGE
     *
     * Front-facing wearer-right appears IMAGE-LEFT.
     *
     * This coordinate is Heritage Slot 1.
     * Slots 2 and 3 are rendered relative to this
     * canonical anchor.
     */
    heritage: {
      rightShoulder: {
        left: "14%",
        top: "25%",
        width: 48,
        height: 48,
        scale: 1,
        rotation: 0,
        visible: true,
      },
    },

    /**
     * ZONE 3
     *
     * WEARER'S RIGHT CHEST
     * NAME TAPE
     *
     * Front-facing wearer-right appears IMAGE-LEFT.
     */
    nameTape: {
      rightChest: {
        left: "31%",
        top: "30%",
        width: 112,
        height: 24,
        scale: 1,
        rotation: 0,
        visible: true,
      },
    },

    /**
     * ZONE 4
     *
     * WEARER'S LEFT CHEST
     * IDENTITY PATCH
     *
     * Front-facing wearer-left appears IMAGE-RIGHT.
     *
     * Calibrated to sit above the left chest pocket
     * while remaining subordinate to the Family Crest.
     */
    identityPatch: {
      leftChest: {
        left: "63.5%",
        top: "43%",
        width: 70,
        height: 50,
        scale: 1,
        rotation: 0,
        visible: true,
      },
    },
  },

  /**
   * =====================================================
   * LEFT THREE-QUARTER
   * =====================================================
   *
   * Approved photographic asset:
   *
   * /images/products/studio/
   * jacket-left-three-quarter-clean.png
   *
   * IMPORTANT:
   *
   * The prominent IMAGE-LEFT sleeve in this photograph
   * represents the WEARER'S RIGHT shoulder.
   *
   * Therefore:
   *
   * - Heritage belongs on the prominent visible sleeve.
   * - The Family Crest does NOT belong on that sleeve.
   * - The wearer's LEFT shoulder is on the far side of
   *   the garment and is not sufficiently exposed for
   *   a trustworthy Family Crest preview.
   *
   * The Family Crest is therefore hidden in this view.
   *
   * This is intentional physical visibility behavior,
   * not a change to the four-zone placement canon.
   */
  leftThreeQuarter: {
    /**
     * ZONE 1
     *
     * WEARER'S LEFT SHOULDER
     * FAMILY CREST
     *
     * Hidden in this photographic angle because the
     * correct physical shoulder is not sufficiently
     * visible.
     *
     * Coordinates remain reserved for future reference,
     * but visibility is authoritative.
     */
    familyCrest: {
      leftShoulder: {
        left: "23%",
        top: "31%",
        width: 58,
        height: 70,
        scale: 0.38,
        rotation: 5,
        visible: false,
      },
    },

    /**
     * ZONE 2
     *
     * WEARER'S RIGHT SHOULDER
     * HERITAGE
     *
     * The prominent IMAGE-LEFT sleeve is the correct
     * physical heritage shoulder in this photograph.
     *
     * This coordinate remains the approved Slot 1
     * heritage anchor.
     *
     * Slots 2 and 3 are rendered relative to it.
     */
    heritage: {
      rightShoulder: {
        left: "21%",
        top: "27%",
        width: 42,
        height: 42,
        scale: 1.05,
        rotation: 0,
        visible: true,
      },
    },

    /**
     * ZONE 3
     *
     * WEARER'S RIGHT CHEST
     * SURNAME / NAME TAPE
     *
     * USER-CALIBRATED PLACEMENT.
     *
     * Keep these coordinates unless subsequent
     * visual QA specifically changes them.
     */
    nameTape: {
      rightChest: {
        left: "44%",
        top: "27.5%",
        width: 100,
        height: 22,
        scale: 0.76,
        rotation: -2,
        visible: true,
      },
    },

    /**
     * ZONE 4
     *
     * WEARER'S LEFT CHEST
     * SELECTABLE IDENTITY PATCH
     *
     * This is the only personal identity-patch
     * position in V1.
     *
     * Position remains provisional until we render
     * an actual selected identity patch.
     */
    identityPatch: {
      leftChest: {
        left: "72%",
        top: "42%",
        width: 62,
        height: 44,
        scale: 0.95,
        rotation: 1,
        visible: true,
      },
    },
  },

  /**
   * =====================================================
   * RIGHT THREE-QUARTER
   * =====================================================
   *
   * NOT YET CALIBRATED.
   *
   * These values are placeholders only until an
   * approved clean Right ¾ photographic asset exists.
   *
   * Do not derive this view by mirroring the
   * Left ¾ image or its coordinates.
   *
   * A future approved Right ¾ asset should provide the
   * complementary shoulder view for inspecting the
   * Family Crest on the wearer's LEFT shoulder.
   */
  rightThreeQuarter: {
    familyCrest: {
      leftShoulder: {
        left: "18%",
        top: "25%",
        width: 48,
        height: 58,
        scale: 0.26,
        rotation: -5,
        visible: false,
      },
    },

    heritage: {
      rightShoulder: {
        left: "77%",
        top: "31%",
        width: 48,
        height: 48,
        scale: 0.9,
        rotation: 5,
        visible: false,
      },
    },

    nameTape: {
      rightChest: {
        left: "57%",
        top: "34%",
        width: 100,
        height: 22,
        scale: 0.9,
        rotation: 0,
        visible: false,
      },
    },

    identityPatch: {
      leftChest: {
        left: "31%",
        top: "43%",
        width: 54,
        height: 40,
        scale: 0.78,
        rotation: 0,
        visible: false,
      },
    },
  },

  /**
   * =====================================================
   * BACK
   * =====================================================
   *
   * Front and shoulder identity zones are hidden.
   *
   * Rear-treatment coordinates remain reserved
   * for possible future use.
   */
  back: {
    familyCrest: {
      leftShoulder: {
        left: "18%",
        top: "25%",
        width: 48,
        height: 58,
        scale: 0.26,
        rotation: -5,
        visible: false,
      },
    },

    heritage: {
      rightShoulder: {
        left: "82%",
        top: "25%",
        width: 42,
        height: 42,
        scale: 0.82,
        rotation: 5,
        visible: false,
      },
    },

    nameTape: {
      rightChest: {
        left: "69%",
        top: "30%",
        width: 112,
        height: 24,
        scale: 1,
        rotation: 0,
        visible: false,
      },
    },

    identityPatch: {
      leftChest: {
        left: "31%",
        top: "39%",
        width: 64,
        height: 46,
        scale: 1,
        rotation: 0,
        visible: false,
      },
    },

    /**
     * Reserved rear treatment.
     *
     * These elements are not part of the four-zone
     * front/shoulder identity architecture.
     */
    topRocker: {
      left: "50%",
      top: "16%",
      width: 88,
      height: 20,
    },

    centerPatch: {
      left: "50%",
      top: "21%",
      width: 48,
      height: 52,
    },

    bottomRocker: {
      left: "50%",
      top: "26%",
      width: 92,
      height: 20,
    },
  },
} as const;

export type JacketViewLayout =
  | "front"
  | "leftThreeQuarter"
  | "rightThreeQuarter"
  | "back";

export function getJacketViewLayout(
  jacketView: string,
) {
  switch (jacketView) {
    case "Left ¾":
      return jacketLayout.leftThreeQuarter;

    case "Right ¾":
      return jacketLayout.rightThreeQuarter;

    case "Back":
      return jacketLayout.back;

    case "Front":
    default:
      return jacketLayout.front;
  }
}
// lib/herald/visualCanon/assets/ornaments.ts

import type { VisualCanonAsset } from "../types";

const CANON_VERSION = "1.0.0";

/*
 * =========================================================
 * The Family Regiment
 * V1 Upper Ornament Visual Canon
 * =========================================================
 *
 * Upper ornaments sit above the shield and are independent
 * of the shield's internal quadrant composition.
 *
 * These records establish controlled visual identities only.
 *
 * All assets remain DRAFT until they pass visual review,
 * production review, physical sampling, and Canon
 * certification.
 *
 * Names describe Family Regiment design families and do not
 * represent inherited noble rank, title, or entitlement.
 * =========================================================
 */

export const ornamentAssets: readonly VisualCanonAsset[] =
  Object.freeze([
    {
      id: "regiment-crown",
      name: "Regiment Crown",
      category: "crown",

      description:
        "The principal Family Regiment crown treatment, designed as a strong ceremonial upper ornament without representing inherited noble rank.",

      canonVersion: CANON_VERSION,
      artworkVersion: "0.1.0",
      artworkFormat: "svg",

      dimensions: {
        viewBoxWidth: 240,
        viewBoxHeight: 160,
      },

      status: "draft",

      production: {
        supportedMethods: [
          "embroidery",
          "woven",
          "print",
          "digital",
        ],

        embroidery: {
          notes: [
            "Primary silhouette must remain recognizable at reduced crest sizes.",
            "Small decorative details must be simplified by Family Regiment before production rather than interpreted independently by a manufacturer.",
            "Base band and upper points require physical sample validation.",
          ],
        },

        complexity: 3,
        physicallySampled: false,
      },

      keywords: [
        "regiment",
        "crown",
        "ceremonial",
        "leadership",
        "heritage",
      ],

      heraldicNotes:
        "A Family Regiment ceremonial crown identity. Selection communicates visual character only and does not assert noble title, inherited rank, or historical entitlement.",

      productionNotes: [
        "Presentation artwork is not vendor-authoritative.",
        "Manufacturing-safe simplification must remain controlled by The Family Regiment.",
      ],

      componentPath:
        "@/lib/herald/svg/ornaments/regiment-crown",
    },

    {
      id: "heritage-coronet",
      name: "Heritage Coronet",
      category: "coronet",

      description:
        "A restrained fleur-de-lis-inspired upper ornament emphasizing continuity, ancestry, and inherited family story without implying aristocratic status.",

      canonVersion: CANON_VERSION,
      artworkVersion: "0.1.0",
      artworkFormat: "svg",

      dimensions: {
        viewBoxWidth: 240,
        viewBoxHeight: 160,
      },

      status: "draft",

      production: {
        supportedMethods: [
          "embroidery",
          "woven",
          "print",
          "digital",
        ],

        embroidery: {
          notes: [
            "Fleur-de-lis forms must retain clear separation at reduced sizes.",
            "Fine interior texture must not determine embroidery geometry.",
            "Band details require physical sample validation before minimum size is established.",
          ],
        },

        complexity: 3,
        physicallySampled: false,
      },

      keywords: [
        "heritage",
        "coronet",
        "fleur-de-lis",
        "continuity",
        "ancestry",
      ],

      heraldicNotes:
        "The Heritage Coronet is a Family Regiment design identity centered on continuity and family heritage. It does not represent or confer aristocratic rank.",

      productionNotes: [
        "Presentation artwork is not vendor-authoritative.",
        "Fleur-de-lis geometry must be controlled in the eventual production master.",
      ],

      componentPath:
        "@/lib/herald/svg/ornaments/heritage-coronet",
    },

    {
      id: "laurel-crest",
      name: "Laurel Crest",
      category: "ornament",

      description:
        "An open laurel arrangement used as an upper framing ornament representing achievement, continuity, stewardship, and honor.",

      canonVersion: CANON_VERSION,
      artworkVersion: "0.1.0",
      artworkFormat: "svg",

      dimensions: {
        viewBoxWidth: 240,
        viewBoxHeight: 180,
      },

      status: "draft",

      production: {
        supportedMethods: [
          "embroidery",
          "woven",
          "print",
          "digital",
        ],

        embroidery: {
          notes: [
            "Leaf spacing must remain open enough for reliable stitch separation.",
            "Individual leaves may require controlled simplification at small finished sizes.",
            "The open center must remain visually distinct from a closed wreath.",
          ],
        },

        complexity: 3,
        physicallySampled: false,
      },

      keywords: [
        "laurel",
        "crest",
        "achievement",
        "honor",
        "stewardship",
        "continuity",
      ],

      heraldicNotes:
        "Laurel has long-standing associations with honor and achievement. Within The Family Regiment it functions as a controlled visual symbol rather than proof of historical distinction.",

      productionNotes: [
        "Presentation artwork is not vendor-authoritative.",
        "Leaf simplification must be approved before embroidery production.",
      ],

      componentPath:
        "@/lib/herald/svg/ornaments/laurel-crest",
    },

    {
      id: "naval-crown",
      name: "Naval Crown",
      category: "crown",

      description:
        "A maritime-inspired upper ornament combining ships, anchors, rope, and wave forms for families whose story includes meaningful maritime identity or service.",

      canonVersion: CANON_VERSION,
      artworkVersion: "0.1.0",
      artworkFormat: "svg",

      dimensions: {
        viewBoxWidth: 260,
        viewBoxHeight: 160,
      },

      status: "draft",

      production: {
        supportedMethods: [
          "embroidery",
          "woven",
          "print",
          "digital",
        ],

        embroidery: {
          notes: [
            "Ships, anchors, rope, and wave forms create the highest detail burden in the V1 upper ornament set.",
            "Small internal details must be simplified by Family Regiment before production.",
            "Physical sampling is required before minimum finished size is established.",
          ],
        },

        complexity: 5,
        physicallySampled: false,
      },

      keywords: [
        "naval",
        "maritime",
        "crown",
        "anchor",
        "ship",
        "sea",
        "service",
      ],

      heraldicNotes:
        "The Naval Crown is a Family Regiment maritime design identity. Its use should reflect a meaningful maritime family story or service connection and does not independently establish historical heraldic entitlement.",

      productionNotes: [
        "Presentation artwork is not vendor-authoritative.",
        "This asset will likely require a dedicated manufacturing-safe derivative because of its higher visual complexity.",
      ],

      componentPath:
        "@/lib/herald/svg/ornaments/naval-crown",
    },
  ]);
// lib/herald/crests.ts

import type {
  CrestComponentEntry,
} from "./types";

export const CREST_CANON_VERSION =
  "1.0.0";

/*
 * =========================================================
 * Torse / Wreath
 * =========================================================
 */

const torse: CrestComponentEntry = {
  id: "torse",

  name: "Torse",

  category: "crest",

  summary:
    "A twisted wreath traditionally positioned above the helm and beneath the crest, commonly displaying two principal tinctures from the arms.",

  traditionalAssociations: [
    "Continuity",
    "Identity",
    "Unity",
    "Heraldic Tradition",
  ],

  historicalNotes:
    "The torse, also called a wreath, is traditionally represented as twisted fabric placed above the helmet. It commonly incorporates the principal metal and color associated with the arms and serves as the visual base from which the crest rises.",

  associatedVirtues: [
    "Continuity",
    "Unity",
    "Stewardship",
    "Tradition",
  ],

  associatedThemes: [
    "Family Identity",
    "Heraldic Continuity",
    "Legacy",
    "Tradition",
  ],

  relatedEntries: [
    "helm",
    "mantling",
    "crest-coronet",
    "or",
    "argent",
  ],

  designGuidance:
    "For embroidery, use broad alternating sections rather than attempting highly detailed fabric twisting. Maintain clear color separation and a strong horizontal silhouette.",

  keywords: [
    "torse",
    "wreath",
    "crest wreath",
    "twisted cloth",
    "helmet wreath",
  ],

  compatibleHelmStyles: [
    "traditional-helm",
    "tournament-helm",
    "great-helm",
  ],

  compatibleMantlingStyles: [
    "traditional-mantling",
    "simplified-mantling",
  ],

  compatibleWreaths: [
    "two-tincture-torse",
  ],

  embroideryComplexity: 2,

  productionNotes:
    "Highly suitable for embroidery when simplified to broad alternating segments. Avoid narrow spiral detail on 3-inch patches.",

  canonVersion:
    CREST_CANON_VERSION,
};

/*
 * =========================================================
 * Helm
 * =========================================================
 */

const helm: CrestComponentEntry = {
  id: "helm",

  name: "Helm",

  category: "crest",

  summary:
    "The helmet positioned above the shield in a heraldic achievement, serving as the structural base for the wreath, mantling, and crest.",

  traditionalAssociations: [
    "Service",
    "Defense",
    "Readiness",
    "Martial Tradition",
  ],

  historicalNotes:
    "The helm forms an important structural element of a complete heraldic achievement. Historical heraldic traditions developed conventions concerning helmet type, position, and treatment, although those conventions vary according to jurisdiction, period, and status.",

  associatedVirtues: [
    "Duty",
    "Courage",
    "Protection",
    "Service",
  ],

  associatedThemes: [
    "Military Heritage",
    "Defense",
    "Leadership",
    "Heraldic Tradition",
  ],

  relatedEntries: [
    "torse",
    "mantling",
    "crest-coronet",
    "sword",
    "shield",
  ],

  designGuidance:
    "For patch applications, reduce the helm to its essential silhouette. Small visor openings, rivets, and engraved surfaces should be omitted unless the patch size supports them.",

  keywords: [
    "helm",
    "helmet",
    "heraldic helmet",
    "armor",
    "crest base",
  ],

  compatibleHelmStyles: [
    "traditional-helm",
    "tournament-helm",
    "great-helm",
  ],

  compatibleMantlingStyles: [
    "traditional-mantling",
    "simplified-mantling",
  ],

  compatibleWreaths: [
    "two-tincture-torse",
  ],

  embroideryComplexity: 4,

  productionNotes:
    "A detailed helm generally requires a larger crest patch. Simplified helm forms are preferable for 3-inch and 4-inch production.",

  canonVersion:
    CREST_CANON_VERSION,
};

/*
 * =========================================================
 * Mantling
 * =========================================================
 */

const mantling: CrestComponentEntry = {
  id: "mantling",

  name: "Mantling",

  category: "crest",

  summary:
    "Decorative cloth flowing from the helm, traditionally represented as draped or stylized fabric surrounding the upper portion of the achievement.",

  traditionalAssociations: [
    "Service",
    "Tradition",
    "Continuity",
    "Protection",
  ],

  historicalNotes:
    "Mantling developed from cloth associated with the helmet and became an important decorative component of heraldic achievements. Artistic styles vary greatly, from restrained drapery to elaborate foliage-like forms.",

  associatedVirtues: [
    "Service",
    "Protection",
    "Continuity",
    "Stewardship",
  ],

  associatedThemes: [
    "Heraldic Tradition",
    "Military Heritage",
    "Family Identity",
    "Ceremonial Display",
  ],

  relatedEntries: [
    "helm",
    "torse",
    "or",
    "argent",
  ],

  designGuidance:
    "Mantling should be significantly simplified for embroidery. Favor large flowing shapes rather than narrow curls, tears, or intricate foliage-like edges.",

  keywords: [
    "mantling",
    "lambrequin",
    "helmet cloth",
    "drapery",
    "crest cloth",
  ],

  compatibleHelmStyles: [
    "traditional-helm",
    "tournament-helm",
    "great-helm",
  ],

  compatibleMantlingStyles: [
    "traditional-mantling",
    "simplified-mantling",
  ],

  compatibleWreaths: [
    "two-tincture-torse",
  ],

  embroideryComplexity: 4,

  productionNotes:
    "Full heraldic mantling can become visually crowded on patches. Simplified mantling should be the default production treatment.",

  canonVersion:
    CREST_CANON_VERSION,
};

/*
 * =========================================================
 * Crest Coronet
 * =========================================================
 */

const crestCoronet: CrestComponentEntry = {
  id: "crest-coronet",

  name: "Crest Coronet",

  category: "crest",

  summary:
    "A coronet-like element used beneath or as part of a crest composition, distinct from claims of noble rank unless historically justified.",

  traditionalAssociations: [
    "Dignity",
    "Distinction",
    "Authority",
    "Ceremonial Tradition",
  ],

  historicalNotes:
    "Coronets and crown-like devices appear in various heraldic contexts. Their forms and implications differ by tradition. The Family Regiment should distinguish decorative crest coronets from rank coronets and should not imply inherited titles without documented historical basis.",

  associatedVirtues: [
    "Dignity",
    "Leadership",
    "Stewardship",
    "Responsibility",
  ],

  associatedThemes: [
    "Distinction",
    "Leadership",
    "Ceremonial Heritage",
    "Family Legacy",
  ],

  relatedEntries: [
    "helm",
    "torse",
    "or",
    "lion",
    "fleur-de-lis",
  ],

  designGuidance:
    "Use broad points and a simplified band. Avoid jewel-scale detail and avoid visual forms that falsely imply a specific noble rank unless supported by documented lineage.",

  keywords: [
    "coronet",
    "crest coronet",
    "crown",
    "dignity",
    "rank",
    "ceremonial",
  ],

  compatibleHelmStyles: [
    "traditional-helm",
    "tournament-helm",
  ],

  compatibleMantlingStyles: [
    "traditional-mantling",
    "simplified-mantling",
  ],

  compatibleWreaths: [
    "two-tincture-torse",
  ],

  embroideryComplexity: 3,

  productionNotes:
    "Works well in embroidery when reduced to a strong silhouette. Decorative stones and narrow ornament should be eliminated.",

  canonVersion:
    CREST_CANON_VERSION,
};

/*
 * =========================================================
 * Crest Badge
 * =========================================================
 */

const crestBadge: CrestComponentEntry = {
  id: "crest-badge",

  name: "Crest Badge",

  category: "crest",

  summary:
    "A simplified emblem derived from a family's heraldic identity and intended for compact display where a full achievement would be impractical.",

  traditionalAssociations: [
    "Identity",
    "Recognition",
    "Continuity",
    "Affiliation",
  ],

  historicalNotes:
    "Heraldic badges have historically served as identifying devices distinct from the complete coat of arms. Within The Family Regiment system, a crest badge can provide a production-friendly representation derived from approved heraldic elements without reproducing the entire achievement.",

  associatedVirtues: [
    "Unity",
    "Continuity",
    "Stewardship",
    "Loyalty",
  ],

  associatedThemes: [
    "Family Identity",
    "Recognition",
    "Generational Continuity",
    "Institutional Identity",
  ],

  relatedEntries: [
    "torse",
    "lion",
    "eagle",
    "oak-tree",
    "fleur-de-lis",
  ],

  designGuidance:
    "Favor one dominant symbol, a limited number of colors, and a strong silhouette. A badge should remain legible at significantly smaller scale than a complete heraldic achievement.",

  keywords: [
    "badge",
    "crest badge",
    "family badge",
    "emblem",
    "identity mark",
  ],

  compatibleHelmStyles: [
    "none",
    "traditional-helm",
  ],

  compatibleMantlingStyles: [
    "none",
    "simplified-mantling",
  ],

  compatibleWreaths: [
    "none",
    "two-tincture-torse",
  ],

  embroideryComplexity: 2,

  productionNotes:
    "Ideal for jackets, hats, sleeves, smaller accessory patches, and other applications where the full heraldic achievement would be too complex.",

  canonVersion:
    CREST_CANON_VERSION,
};

/*
 * =========================================================
 * Crest Banner
 * =========================================================
 */

const crestBanner: CrestComponentEntry = {
  id: "crest-banner",

  name: "Crest Banner",

  category: "crest",

  summary:
    "A ribbon or scroll used to carry a family motto or identifying phrase as part of a heraldic presentation.",

  traditionalAssociations: [
    "Identity",
    "Declaration",
    "Continuity",
    "Family Principle",
  ],

  historicalNotes:
    "Motto scrolls and banners are commonly used in heraldic presentation to carry mottos or identifying text. Their placement varies by artistic tradition and by the structure of the achievement.",

  associatedVirtues: [
    "Continuity",
    "Stewardship",
    "Honor",
    "Commitment",
  ],

  associatedThemes: [
    "Family Motto",
    "Identity",
    "Legacy",
    "Family Values",
  ],

  relatedEntries: [
    "torse",
    "helm",
    "motto",
  ],

  designGuidance:
    "Keep scroll folds broad and minimize decorative curls. Lettering must remain large enough to survive embroidery and should use short motto text whenever possible.",

  keywords: [
    "banner",
    "scroll",
    "motto banner",
    "motto scroll",
    "crest ribbon",
  ],

  compatibleHelmStyles: [
    "none",
    "traditional-helm",
    "tournament-helm",
  ],

  compatibleMantlingStyles: [
    "none",
    "traditional-mantling",
    "simplified-mantling",
  ],

  compatibleWreaths: [
    "none",
    "two-tincture-torse",
  ],

  embroideryComplexity: 3,

  productionNotes:
    "Banner geometry is straightforward, but lettering is production-sensitive. Very long mottos should not be embroidered at small sizes.",

  canonVersion:
    CREST_CANON_VERSION,
};

/*
 * =========================================================
 * Public Registry
 * =========================================================
 */

export const crests:
  CrestComponentEntry[] = [
    torse,
    helm,
    mantling,
    crestCoronet,
    crestBadge,
    crestBanner,
  ];

/*
 * =========================================================
 * Lookup Registry
 * =========================================================
 */

export const crestById: Record<
  string,
  CrestComponentEntry
> = Object.fromEntries(
  crests.map((crest) => [
    crest.id,
    crest,
  ]),
);

/*
 * =========================================================
 * Helpers
 * =========================================================
 */

export function getCrestById(
  id: string,
): CrestComponentEntry | undefined {
  return crestById[
    id.trim().toLowerCase()
  ];
}

export function searchCrests(
  query: string,
): CrestComponentEntry[] {
  const normalizedQuery =
    query.trim().toLowerCase();

  if (!normalizedQuery) {
    return crests;
  }

  return crests.filter((crest) => {
    const searchableText = [
      crest.id,
      crest.name,
      crest.summary,
      crest.historicalNotes,
      ...crest.traditionalAssociations,
      ...crest.associatedVirtues,
      ...crest.associatedThemes,
      ...crest.compatibleHelmStyles,
      ...crest.compatibleMantlingStyles,
      ...crest.compatibleWreaths,
      ...(crest.keywords ?? []),
    ]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(
      normalizedQuery,
    );
  });
}

export function findCrestsByVirtue(
  virtue: string,
): CrestComponentEntry[] {
  const normalizedVirtue =
    virtue.trim().toLowerCase();

  if (!normalizedVirtue) {
    return [];
  }

  return crests.filter((crest) =>
    crest.associatedVirtues.some(
      (associatedVirtue) =>
        associatedVirtue.toLowerCase() ===
        normalizedVirtue,
    ),
  );
}

export function findCrestsByMaxComplexity(
  maxComplexity:
    CrestComponentEntry["embroideryComplexity"],
): CrestComponentEntry[] {
  return crests.filter(
    (crest) =>
      crest.embroideryComplexity <=
      maxComplexity,
  );
}
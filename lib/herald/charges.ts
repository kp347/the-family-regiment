// lib/herald/charges.ts

import type { ChargeEntry } from "./types";

export const CHARGE_CANON_VERSION = "1.0.0";

const lion: ChargeEntry = {
  id: "lion",

  name: "Lion",

  category: "charge",

  summary:
    "A major heraldic beast traditionally associated with courage, strength, leadership, nobility, and martial resolve.",

  traditionalAssociations: [
    "Courage",
    "Strength",
    "Leadership",
    "Nobility",
    "Valor",
  ],

  historicalNotes:
    "The lion is among the most enduring and recognizable heraldic charges. It appears throughout European heraldic traditions in numerous attitudes and forms, often serving as a visual expression of courage, authority, martial strength, and dynastic identity.",

  associatedVirtues: [
    "Courage",
    "Leadership",
    "Strength",
    "Valor",
    "Resolve",
  ],

  associatedThemes: [
    "Military Service",
    "Leadership",
    "Family Legacy",
    "Defense",
    "Authority",
  ],

  relatedEntries: [
    "or",
    "gules",
    "azure",
    "crown",
    "sword",
    "eagle",
  ],

  designGuidance:
    "For embroidery, simplify the mane, claws, facial details, and interior linework. Strong silhouette recognition is more important than anatomical detail at patch scale.",

  keywords: [
    "lion",
    "courage",
    "strength",
    "leadership",
    "valor",
    "nobility",
    "military",
  ],

  variants: [
    {
      id: "lion-rampant",
      name: "Rampant",
      summary:
        "The lion shown upright on one hind leg with the forelegs raised, one of the most recognizable heraldic attitudes.",
    },
    {
      id: "lion-passant",
      name: "Passant",
      summary:
        "The lion shown walking with one forepaw raised.",
    },
    {
      id: "lion-passant-guardant",
      name: "Passant Guardant",
      summary:
        "The lion shown walking while facing outward toward the viewer.",
    },
    {
      id: "lion-sejant",
      name: "Sejant",
      summary:
        "The lion shown seated upright.",
    },
  ],

  compatibleTinctures: [
    "or",
    "argent",
    "gules",
    "azure",
    "sable",
  ],

  compatibleOrdinaries: [
    "chief",
    "chevron",
    "fess",
    "pale",
  ],

  embroideryComplexity: 3,

  productionNotes:
    "Best suited to medium and large crest patches. A simplified rampant or passant silhouette can work at smaller sizes.",

  canonVersion: CHARGE_CANON_VERSION,
};

const eagle: ChargeEntry = {
  id: "eagle",

  name: "Eagle",

  category: "charge",

  summary:
    "A heraldic bird traditionally associated with strength, authority, vigilance, vision, and elevation.",

  traditionalAssociations: [
    "Strength",
    "Authority",
    "Vision",
    "Vigilance",
    "Elevation",
  ],

  historicalNotes:
    "The eagle has appeared extensively in heraldry, military symbolism, civic identity, and imperial traditions. In heraldic compositions it is frequently depicted with its wings displayed to emphasize symmetry, presence, and authority.",

  associatedVirtues: [
    "Leadership",
    "Vigilance",
    "Strength",
    "Vision",
    "Courage",
  ],

  associatedThemes: [
    "Military Service",
    "Authority",
    "Freedom",
    "Leadership",
    "National Heritage",
  ],

  relatedEntries: [
    "or",
    "argent",
    "sable",
    "azure",
    "lion",
    "crown",
  ],

  designGuidance:
    "Displayed wings translate well to symmetrical patch designs. Reduce individual feather detail and preserve a bold head, wing, and talon silhouette.",

  keywords: [
    "eagle",
    "authority",
    "vision",
    "vigilance",
    "military",
    "leadership",
  ],

  variants: [
    {
      id: "eagle-displayed",
      name: "Displayed",
      summary:
        "The eagle shown frontally with wings and legs extended outward.",
    },
    {
      id: "eagle-rising",
      name: "Rising",
      summary:
        "The eagle shown preparing for flight with wings elevated.",
    },
    {
      id: "eagle-close",
      name: "Close",
      summary:
        "The eagle shown standing with its wings folded.",
    },
  ],

  compatibleTinctures: [
    "or",
    "argent",
    "sable",
    "gules",
    "azure",
  ],

  compatibleOrdinaries: [
    "chief",
    "fess",
    "pale",
  ],

  embroideryComplexity: 3,

  productionNotes:
    "Displayed eagles perform especially well in symmetrical shield compositions. Avoid dense feather detail on 3-inch patches.",

  canonVersion: CHARGE_CANON_VERSION,
};

const wolf: ChargeEntry = {
  id: "wolf",

  name: "Wolf",

  category: "charge",

  summary:
    "A heraldic beast traditionally associated with vigilance, endurance, guardianship, courage, and determined strength.",

  traditionalAssociations: [
    "Vigilance",
    "Endurance",
    "Guardianship",
    "Courage",
    "Determination",
  ],

  historicalNotes:
    "The wolf appears in heraldic traditions as both a complete animal and through representations of the wolf's head. Its strong profile and predatory character make it well suited to themes of vigilance, endurance, and protection.",

  associatedVirtues: [
    "Vigilance",
    "Loyalty",
    "Endurance",
    "Courage",
    "Protection",
  ],

  associatedThemes: [
    "Guardianship",
    "Family Loyalty",
    "Resilience",
    "Defense",
    "Wilderness",
  ],

  relatedEntries: [
    "sable",
    "argent",
    "azure",
    "vert",
    "bear",
    "stag",
  ],

  designGuidance:
    "Use a strong head, muzzle, ear, and tail silhouette. Interior fur texture should be minimized for embroidery.",

  keywords: [
    "wolf",
    "vigilance",
    "guardian",
    "loyalty",
    "endurance",
    "protection",
  ],

  variants: [
    {
      id: "wolf-rampant",
      name: "Rampant",
      summary:
        "The wolf shown upright in an active heraldic posture.",
    },
    {
      id: "wolf-passant",
      name: "Passant",
      summary:
        "The wolf shown walking with one foreleg raised.",
    },
    {
      id: "wolf-head",
      name: "Wolf's Head",
      summary:
        "A simplified representation emphasizing the head and profile.",
    },
  ],

  compatibleTinctures: [
    "sable",
    "argent",
    "or",
    "azure",
    "gules",
  ],

  compatibleOrdinaries: [
    "chief",
    "chevron",
    "fess",
  ],

  embroideryComplexity: 3,

  productionNotes:
    "The wolf's head is especially effective for smaller patches because it preserves recognition with fewer stitched details.",

  canonVersion: CHARGE_CANON_VERSION,
};

const bear: ChargeEntry = {
  id: "bear",

  name: "Bear",

  category: "charge",

  summary:
    "A heraldic beast traditionally associated with strength, courage, endurance, protection, and resilience.",

  traditionalAssociations: [
    "Strength",
    "Courage",
    "Endurance",
    "Protection",
    "Resilience",
  ],

  historicalNotes:
    "The bear appears in heraldry as a symbol of physical power and determined endurance. Its broad form and recognizable posture make it particularly suitable for heraldic designs emphasizing protection and resilience.",

  associatedVirtues: [
    "Strength",
    "Protection",
    "Endurance",
    "Courage",
    "Resilience",
  ],

  associatedThemes: [
    "Family Protection",
    "Strength",
    "Wilderness",
    "Resilience",
    "Guardianship",
  ],

  relatedEntries: [
    "sable",
    "or",
    "argent",
    "vert",
    "wolf",
    "stag",
  ],

  designGuidance:
    "Maintain a broad body, strong paws, and recognizable head. Avoid excessive fur detailing at embroidery scale.",

  keywords: [
    "bear",
    "strength",
    "protection",
    "resilience",
    "endurance",
    "guardian",
  ],

  variants: [
    {
      id: "bear-rampant",
      name: "Rampant",
      summary:
        "The bear shown upright with forepaws raised.",
    },
    {
      id: "bear-passant",
      name: "Passant",
      summary:
        "The bear shown walking in profile.",
    },
    {
      id: "bear-head",
      name: "Bear's Head",
      summary:
        "A simplified heraldic representation centered on the bear's head.",
    },
  ],

  compatibleTinctures: [
    "sable",
    "or",
    "argent",
    "gules",
    "vert",
  ],

  compatibleOrdinaries: [
    "chief",
    "fess",
    "chevron",
  ],

  embroideryComplexity: 3,

  productionNotes:
    "Broad silhouettes translate well to embroidery. A bear's head is preferable when patch size is limited.",

  canonVersion: CHARGE_CANON_VERSION,
};

const stag: ChargeEntry = {
  id: "stag",

  name: "Stag",

  category: "charge",

  summary:
    "A heraldic beast traditionally associated with dignity, endurance, renewal, guardianship, and connection to the natural world.",

  traditionalAssociations: [
    "Dignity",
    "Endurance",
    "Renewal",
    "Guardianship",
    "Vitality",
  ],

  historicalNotes:
    "The stag and hart appear throughout heraldic traditions, often distinguished by prominent antlers and an upright or active posture. Its visual identity naturally lends itself to themes involving land, lineage, endurance, and renewal.",

  associatedVirtues: [
    "Dignity",
    "Endurance",
    "Stewardship",
    "Resilience",
    "Patience",
  ],

  associatedThemes: [
    "Land",
    "Nature",
    "Family Continuity",
    "Renewal",
    "Heritage",
  ],

  relatedEntries: [
    "vert",
    "or",
    "argent",
    "oak-tree",
    "wolf",
    "bear",
  ],

  designGuidance:
    "Antler geometry is the defining visual feature. Simplify fine branches and maintain enough spacing between antlers for reliable embroidery.",

  keywords: [
    "stag",
    "deer",
    "hart",
    "dignity",
    "renewal",
    "nature",
    "heritage",
  ],

  variants: [
    {
      id: "stag-statant",
      name: "Statant",
      summary:
        "The stag shown standing with all four feet on the ground.",
    },
    {
      id: "stag-springing",
      name: "Springing",
      summary:
        "The stag shown in an active leaping posture.",
    },
    {
      id: "stag-head",
      name: "Stag's Head",
      summary:
        "A simplified heraldic representation emphasizing the head and antlers.",
    },
  ],

  compatibleTinctures: [
    "or",
    "argent",
    "sable",
    "gules",
    "vert",
  ],

  compatibleOrdinaries: [
    "chief",
    "chevron",
    "fess",
  ],

  embroideryComplexity: 3,

  productionNotes:
    "A stag's head is often preferable for small patches because full-body forms and complex antlers can become crowded.",

  canonVersion: CHARGE_CANON_VERSION,
};

export const charges: ChargeEntry[] = [
  lion,
  eagle,
  wolf,
  bear,
  stag,
];

export const chargeById: Record<string, ChargeEntry> =
  Object.fromEntries(
    charges.map((charge) => [charge.id, charge]),
  );

export function getChargeById(
  id: string,
): ChargeEntry | undefined {
  return chargeById[id.trim().toLowerCase()];
}

export function searchCharges(
  query: string,
): ChargeEntry[] {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return charges;
  }

  return charges.filter((charge) => {
    const searchableText = [
      charge.id,
      charge.name,
      charge.summary,
      ...charge.traditionalAssociations,
      ...charge.associatedVirtues,
      ...charge.associatedThemes,
      ...(charge.keywords ?? []),
      ...charge.variants.flatMap((variant) => [
        variant.id,
        variant.name,
        variant.summary,
      ]),
    ]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(normalizedQuery);
  });
}

export function findChargesByVirtue(
  virtue: string,
): ChargeEntry[] {
  const normalizedVirtue = virtue
    .trim()
    .toLowerCase();

  if (!normalizedVirtue) {
    return [];
  }

  return charges.filter((charge) =>
    charge.associatedVirtues.some(
      (associatedVirtue) =>
        associatedVirtue.toLowerCase() ===
        normalizedVirtue,
    ),
  );
}

export function findChargesByMaxComplexity(
  maxComplexity: ChargeEntry["embroideryComplexity"],
): ChargeEntry[] {
  return charges.filter(
    (charge) =>
      charge.embroideryComplexity <= maxComplexity,
  );
}
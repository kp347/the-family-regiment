// lib/herald/visualCanon/assets/heritageFlags.ts

import type {
  VisualCanonAsset,
  VisualCanonAssetStatus,
} from "../types";

export type HeritageFlagRegion =
  | "americas"
  | "europe"
  | "asia-pacific"
  | "africa";

export interface HeritageFlagAsset extends VisualCanonAsset {
  category: "heritage-flag";

  isoCode?: string;

  heritageCode: string;

  region: HeritageFlagRegion;

  countryName: string;

  subdivision?: boolean;
}

const CANON_VERSION = "1.0.0";
const ARTWORK_VERSION = "0.1.0";
const STATUS: VisualCanonAssetStatus = "draft";

function createHeritageFlag(input: {
  id: string;
  name: string;
  countryName: string;
  heritageCode: string;
  isoCode?: string;
  region: HeritageFlagRegion;
  subdivision?: boolean;
  keywords: string[];
  componentPath: string;
  viewBoxWidth: number;
  viewBoxHeight: number;
}): HeritageFlagAsset {
  return {
    id: input.id,
    name: input.name,
    category: "heritage-flag",
    description: `Canonical heritage flag artwork for ${input.countryName}.`,
    canonVersion: CANON_VERSION,
    artworkVersion: ARTWORK_VERSION,
    artworkFormat: "svg",
    dimensions: {
      viewBoxWidth: input.viewBoxWidth,
      viewBoxHeight: input.viewBoxHeight,
    },
    status: STATUS,
    production: {
      supportedMethods: [
        "embroidery",
        "woven",
        "print",
        "digital",
      ],
      embroidery: {
        notes: [
          "Flag proportions and geometry must remain faithful to the approved canonical artwork.",
          "Do not substitute emoji, text abbreviations, or vendor-created reinterpretations.",
          "Embroidery-specific simplification requires Family Regiment review before approval.",
        ],
      },
      complexity: 2,
      physicallySampled: false,
    },
    keywords: input.keywords,
    productionNotes: [
      "National and heritage flag geometry is controlled artwork.",
      "Builder presentation may crop or mask the flag within a shield quadrant without altering the underlying flag identity.",
    ],
    componentPath: input.componentPath,
    isoCode: input.isoCode,
    heritageCode: input.heritageCode,
    region: input.region,
    countryName: input.countryName,
    subdivision: input.subdivision,
  };
}

export const heritageFlagAssets: HeritageFlagAsset[] = [
  // ========================================================
  // Americas
  // ========================================================

  createHeritageFlag({
    id: "united-states",
    name: "United States",
    countryName: "United States",
    heritageCode: "US",
    isoCode: "US",
    region: "americas",
    keywords: [
      "united states",
      "usa",
      "american",
      "america",
      "stars and stripes",
    ],
    componentPath:
      "@/lib/herald/svg/flags/united-states",
    viewBoxWidth: 19,
    viewBoxHeight: 10,
  }),

  createHeritageFlag({
    id: "canada",
    name: "Canada",
    countryName: "Canada",
    heritageCode: "CA",
    isoCode: "CA",
    region: "americas",
    keywords: [
      "canada",
      "canadian",
      "maple leaf",
    ],
    componentPath:
      "@/lib/herald/svg/flags/canada",
    viewBoxWidth: 2,
    viewBoxHeight: 1,
  }),

  createHeritageFlag({
    id: "mexico",
    name: "Mexico",
    countryName: "Mexico",
    heritageCode: "MX",
    isoCode: "MX",
    region: "americas",
    keywords: [
      "mexico",
      "mexican",
    ],
    componentPath:
      "@/lib/herald/svg/flags/mexico",
    viewBoxWidth: 7,
    viewBoxHeight: 4,
  }),

  createHeritageFlag({
    id: "brazil",
    name: "Brazil",
    countryName: "Brazil",
    heritageCode: "BR",
    isoCode: "BR",
    region: "americas",
    keywords: [
      "brazil",
      "brazilian",
    ],
    componentPath:
      "@/lib/herald/svg/flags/brazil",
    viewBoxWidth: 10,
    viewBoxHeight: 7,
  }),

  // ========================================================
  // Europe
  // ========================================================

  createHeritageFlag({
    id: "france",
    name: "France",
    countryName: "France",
    heritageCode: "FR",
    isoCode: "FR",
    region: "europe",
    keywords: [
      "france",
      "french",
      "tricolour",
      "tricolor",
    ],
    componentPath:
      "@/lib/herald/svg/flags/france",
    viewBoxWidth: 3,
    viewBoxHeight: 2,
  }),

  createHeritageFlag({
    id: "united-kingdom",
    name: "United Kingdom",
    countryName: "United Kingdom",
    heritageCode: "GB",
    isoCode: "GB",
    region: "europe",
    keywords: [
      "united kingdom",
      "uk",
      "britain",
      "british",
      "great britain",
      "union jack",
    ],
    componentPath:
      "@/lib/herald/svg/flags/united-kingdom",
    viewBoxWidth: 5,
    viewBoxHeight: 3,
  }),

  createHeritageFlag({
    id: "england",
    name: "England",
    countryName: "England",
    heritageCode: "ENG",
    region: "europe",
    subdivision: true,
    keywords: [
      "england",
      "english",
      "st george",
    ],
    componentPath:
      "@/lib/herald/svg/flags/england",
    viewBoxWidth: 5,
    viewBoxHeight: 3,
  }),

  createHeritageFlag({
    id: "scotland",
    name: "Scotland",
    countryName: "Scotland",
    heritageCode: "SCO",
    region: "europe",
    subdivision: true,
    keywords: [
      "scotland",
      "scottish",
      "st andrew",
      "saltire",
    ],
    componentPath:
      "@/lib/herald/svg/flags/scotland",
    viewBoxWidth: 5,
    viewBoxHeight: 3,
  }),

  createHeritageFlag({
    id: "ireland",
    name: "Ireland",
    countryName: "Ireland",
    heritageCode: "IE",
    isoCode: "IE",
    region: "europe",
    keywords: [
      "ireland",
      "irish",
      "eire",
    ],
    componentPath:
      "@/lib/herald/svg/flags/ireland",
    viewBoxWidth: 2,
    viewBoxHeight: 1,
  }),

  createHeritageFlag({
    id: "italy",
    name: "Italy",
    countryName: "Italy",
    heritageCode: "IT",
    isoCode: "IT",
    region: "europe",
    keywords: [
      "italy",
      "italian",
    ],
    componentPath:
      "@/lib/herald/svg/flags/italy",
    viewBoxWidth: 3,
    viewBoxHeight: 2,
  }),

  createHeritageFlag({
    id: "germany",
    name: "Germany",
    countryName: "Germany",
    heritageCode: "DE",
    isoCode: "DE",
    region: "europe",
    keywords: [
      "germany",
      "german",
      "deutschland",
    ],
    componentPath:
      "@/lib/herald/svg/flags/germany",
    viewBoxWidth: 5,
    viewBoxHeight: 3,
  }),

  createHeritageFlag({
    id: "spain",
    name: "Spain",
    countryName: "Spain",
    heritageCode: "ES",
    isoCode: "ES",
    region: "europe",
    keywords: [
      "spain",
      "spanish",
      "espana",
      "españa",
    ],
    componentPath:
      "@/lib/herald/svg/flags/spain",
    viewBoxWidth: 3,
    viewBoxHeight: 2,
  }),

  createHeritageFlag({
    id: "portugal",
    name: "Portugal",
    countryName: "Portugal",
    heritageCode: "PT",
    isoCode: "PT",
    region: "europe",
    keywords: [
      "portugal",
      "portuguese",
    ],
    componentPath:
      "@/lib/herald/svg/flags/portugal",
    viewBoxWidth: 3,
    viewBoxHeight: 2,
  }),

  createHeritageFlag({
    id: "netherlands",
    name: "Netherlands",
    countryName: "Netherlands",
    heritageCode: "NL",
    isoCode: "NL",
    region: "europe",
    keywords: [
      "netherlands",
      "dutch",
      "holland",
    ],
    componentPath:
      "@/lib/herald/svg/flags/netherlands",
    viewBoxWidth: 3,
    viewBoxHeight: 2,
  }),

  createHeritageFlag({
    id: "belgium",
    name: "Belgium",
    countryName: "Belgium",
    heritageCode: "BE",
    isoCode: "BE",
    region: "europe",
    keywords: [
      "belgium",
      "belgian",
    ],
    componentPath:
      "@/lib/herald/svg/flags/belgium",
    viewBoxWidth: 15,
    viewBoxHeight: 13,
  }),

  createHeritageFlag({
    id: "switzerland",
    name: "Switzerland",
    countryName: "Switzerland",
    heritageCode: "CH",
    isoCode: "CH",
    region: "europe",
    keywords: [
      "switzerland",
      "swiss",
    ],
    componentPath:
      "@/lib/herald/svg/flags/switzerland",
    viewBoxWidth: 1,
    viewBoxHeight: 1,
  }),

  createHeritageFlag({
    id: "sweden",
    name: "Sweden",
    countryName: "Sweden",
    heritageCode: "SE",
    isoCode: "SE",
    region: "europe",
    keywords: [
      "sweden",
      "swedish",
      "nordic",
      "scandinavian",
    ],
    componentPath:
      "@/lib/herald/svg/flags/sweden",
    viewBoxWidth: 8,
    viewBoxHeight: 5,
  }),

  createHeritageFlag({
    id: "norway",
    name: "Norway",
    countryName: "Norway",
    heritageCode: "NO",
    isoCode: "NO",
    region: "europe",
    keywords: [
      "norway",
      "norwegian",
      "nordic",
      "scandinavian",
    ],
    componentPath:
      "@/lib/herald/svg/flags/norway",
    viewBoxWidth: 22,
    viewBoxHeight: 16,
  }),

  createHeritageFlag({
    id: "poland",
    name: "Poland",
    countryName: "Poland",
    heritageCode: "PL",
    isoCode: "PL",
    region: "europe",
    keywords: [
      "poland",
      "polish",
    ],
    componentPath:
      "@/lib/herald/svg/flags/poland",
    viewBoxWidth: 8,
    viewBoxHeight: 5,
  }),

  createHeritageFlag({
    id: "greece",
    name: "Greece",
    countryName: "Greece",
    heritageCode: "GR",
    isoCode: "GR",
    region: "europe",
    keywords: [
      "greece",
      "greek",
      "hellenic",
    ],
    componentPath:
      "@/lib/herald/svg/flags/greece",
    viewBoxWidth: 3,
    viewBoxHeight: 2,
  }),

  // ========================================================
  // Asia-Pacific
  // ========================================================

  createHeritageFlag({
    id: "japan",
    name: "Japan",
    countryName: "Japan",
    heritageCode: "JP",
    isoCode: "JP",
    region: "asia-pacific",
    keywords: [
      "japan",
      "japanese",
      "hinomaru",
    ],
    componentPath:
      "@/lib/herald/svg/flags/japan",
    viewBoxWidth: 3,
    viewBoxHeight: 2,
  }),

  createHeritageFlag({
    id: "south-korea",
    name: "South Korea",
    countryName: "South Korea",
    heritageCode: "KR",
    isoCode: "KR",
    region: "asia-pacific",
    keywords: [
      "south korea",
      "korea",
      "korean",
      "republic of korea",
    ],
    componentPath:
      "@/lib/herald/svg/flags/south-korea",
    viewBoxWidth: 3,
    viewBoxHeight: 2,
  }),

  // ========================================================
  // Africa
  // ========================================================

  createHeritageFlag({
    id: "nigeria",
    name: "Nigeria",
    countryName: "Nigeria",
    heritageCode: "NG",
    isoCode: "NG",
    region: "africa",
    keywords: [
      "nigeria",
      "nigerian",
    ],
    componentPath:
      "@/lib/herald/svg/flags/nigeria",
    viewBoxWidth: 2,
    viewBoxHeight: 1,
  }),

  createHeritageFlag({
    id: "south-africa",
    name: "South Africa",
    countryName: "South Africa",
    heritageCode: "ZA",
    isoCode: "ZA",
    region: "africa",
    keywords: [
      "south africa",
      "south african",
    ],
    componentPath:
      "@/lib/herald/svg/flags/south-africa",
    viewBoxWidth: 3,
    viewBoxHeight: 2,
  }),

  createHeritageFlag({
    id: "egypt",
    name: "Egypt",
    countryName: "Egypt",
    heritageCode: "EG",
    isoCode: "EG",
    region: "africa",
    keywords: [
      "egypt",
      "egyptian",
    ],
    componentPath:
      "@/lib/herald/svg/flags/egypt",
    viewBoxWidth: 3,
    viewBoxHeight: 2,
  }),

  createHeritageFlag({
    id: "ghana",
    name: "Ghana",
    countryName: "Ghana",
    heritageCode: "GH",
    isoCode: "GH",
    region: "africa",
    keywords: [
      "ghana",
      "ghanaian",
    ],
    componentPath:
      "@/lib/herald/svg/flags/ghana",
    viewBoxWidth: 3,
    viewBoxHeight: 2,
  }),

  createHeritageFlag({
    id: "kenya",
    name: "Kenya",
    countryName: "Kenya",
    heritageCode: "KE",
    isoCode: "KE",
    region: "africa",
    keywords: [
      "kenya",
      "kenyan",
    ],
    componentPath:
      "@/lib/herald/svg/flags/kenya",
    viewBoxWidth: 3,
    viewBoxHeight: 2,
  }),
];

export function getHeritageFlagAsset(
  id: string,
): HeritageFlagAsset | undefined {
  return heritageFlagAssets.find(
    (asset) => asset.id === id,
  );
}

export function getHeritageFlagsByRegion(
  region: HeritageFlagRegion,
): HeritageFlagAsset[] {
  return heritageFlagAssets.filter(
    (asset) => asset.region === region,
  );
}

export function searchHeritageFlags(
  query: string,
): HeritageFlagAsset[] {
  const normalized = query
    .trim()
    .toLowerCase();

  if (!normalized) {
    return heritageFlagAssets;
  }

  return heritageFlagAssets.filter(
    (asset) => {
      const searchable = [
        asset.name,
        asset.countryName,
        asset.heritageCode,
        asset.isoCode ?? "",
        ...asset.keywords,
      ]
        .join(" ")
        .toLowerCase();

      return searchable.includes(
        normalized,
      );
    },
  );
}

 // lib/herald/types.ts

export type HeraldicStyle =
  | "traditional"
  | "military"
  | "modern"
  | "celtic"
  | "nordic";

export type ShieldShape =
  | "heater"
  | "round"
  | "kite"
  | "spanish";

export type BuilderShieldStyle =
  | "Heater Shield"
  | "French Shield"
  | "Norman Shield"
  | "Spanish Shield"
  | "Targe";

export type BorderStyle =
  | "merrow"
  | "laser";

export type PatchBacking =
  | "sew-on"
  | "hook-loop"
  | "iron-on";

export type EmbroideryFinish =
  | "regiment-gold"
  | "heritage-ivory"
  | "tactical-subdued";

export type BuilderEmbroideryFinish =
  | "Regiment Gold"
  | "Heritage Ivory"
  | "Tactical Subdued";

export type CrestAnimal =
  | "Lion"
  | "Eagle"
  | "Wolf"
  | "Bear"
  | "Stag"
  | "Griffin"
  | "Mako Shark";

export type CrestCrown =
  | "None"
  | "Regiment Crown"
  | "Heritage Coronet"
  | "Laurel Crest"
  | "Naval Crown";

export type CrestMetallic =
  | "gold"
  | "silver";

export interface FamilyInterview {
  familyName: string;
  heritage: string[];
  militaryService?: string;
  profession?: string;
  values: string[];
  faith?: string;
  zodiac?: string;
  favoriteAnimal?: string;
  preferredStyle: HeraldicStyle;
}

export interface CrestColors {
  primary: string;
  secondary: string;
  metallic: CrestMetallic;
}

export interface CrestSpec {
  shield: ShieldShape;
  primarySymbol: string;
  secondarySymbol?: string;
  crown?: boolean;
  supporters?: string[];
  bannerTop?: string;
  bannerBottom?: string;
  colors: string[];
  mottoLatin: string;
  mottoEnglish: string;
  embroideryFinish: EmbroideryFinish;

  animal?: CrestAnimal;
  shieldStyle?: BuilderShieldStyle;
  crownStyle?: CrestCrown;
  heritage?: string;
  initials?: string;
  structuredColors?: CrestColors;
  wreath?: boolean;
  banner?: boolean;
}

export interface BuilderCrestSpec {
  animal: CrestAnimal;
  shield: BuilderShieldStyle;
  crown: CrestCrown;
  heritage: string;
  motto: string;
  initials: string;
  colors: CrestColors;
  supporters: CrestAnimal[];
  wreath: boolean;
  banner: boolean;
}

export interface PatchSettings {
  shape: ShieldShape;
  border: BorderStyle;
  backing: PatchBacking;
  size: 3 | 4 | 5;
}

export interface ValidationIssue {
  severity: "warning" | "error";
  field: string;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  stitchCount: number;
  threadColors: number;
  issues: ValidationIssue[];
}

export interface RegimentProject {
  family: FamilyInterview;
  crest: CrestSpec;
  patch: PatchSettings;
  validation: ValidationResult;
}

export const crestAnimals: CrestAnimal[] = [
  "Lion",
  "Eagle",
  "Wolf",
  "Bear",
  "Stag",
  "Griffin",
  "Mako Shark",
];

export const builderShieldStyles: BuilderShieldStyle[] = [
  "Heater Shield",
  "French Shield",
  "Norman Shield",
  "Spanish Shield",
  "Targe",
];

export const crestCrowns: CrestCrown[] = [
  "None",
  "Regiment Crown",
  "Heritage Coronet",
  "Laurel Crest",
  "Naval Crown",
];

export const defaultBuilderCrestSpec: BuilderCrestSpec = {
  animal: "Lion",
  shield: "Heater Shield",
  crown: "None",
  heritage: "France",
  motto: "Fortis in Familia",
  initials: "FR",
  colors: {
    primary: "#1F2A1F",
    secondary: "#E8D7AE",
    metallic: "gold",
  },
  supporters: [],
  wreath: false,
  banner: true,
};

export function isCrestAnimal(
  value: string,
): value is CrestAnimal {
  return crestAnimals.includes(value as CrestAnimal);
}

export function normalizeCrestAnimal(
  value: string | undefined,
): CrestAnimal {
  if (
    value === "Salmon" ||
    value === "Shark" ||
    value === "mako-shark"
  ) {
    return "Mako Shark";
  }

  if (value && isCrestAnimal(value)) {
    return value;
  }

  return defaultBuilderCrestSpec.animal;
}

export function isBuilderShieldStyle(
  value: string,
): value is BuilderShieldStyle {
  return builderShieldStyles.includes(
    value as BuilderShieldStyle,
  );
}

export function normalizeBuilderShieldStyle(
  value: string | undefined,
): BuilderShieldStyle {
  if (value && isBuilderShieldStyle(value)) {
    return value;
  }

  switch (value) {
    case "Tournament Shield":
      return "Spanish Shield";

    case "Crusader Shield":
      return "Heater Shield";

    default:
      return defaultBuilderCrestSpec.shield;
  }
}

export function isCrestCrown(
  value: string,
): value is CrestCrown {
  return crestCrowns.includes(value as CrestCrown);
}

export function normalizeCrestCrown(
  value: string | undefined,
): CrestCrown {
  if (value && isCrestCrown(value)) {
    return value;
  }

  switch (value) {
    case "Baron":
    case "Count":
    case "Ducal":
    case "Royal":
      return "None";

    default:
      return defaultBuilderCrestSpec.crown;
  }
}

export function normalizeBuilderCrestSpec(
  crest: Partial<BuilderCrestSpec> | undefined,
): BuilderCrestSpec {
  return {
    animal: normalizeCrestAnimal(crest?.animal),

    shield: normalizeBuilderShieldStyle(crest?.shield),

    crown: normalizeCrestCrown(crest?.crown),

    heritage:
      crest?.heritage?.trim() ||
      defaultBuilderCrestSpec.heritage,

    motto:
      crest?.motto?.trim() ||
      defaultBuilderCrestSpec.motto,

    initials:
      crest?.initials?.trim() ||
      defaultBuilderCrestSpec.initials,

    colors: {
      primary:
        crest?.colors?.primary?.trim() ||
        defaultBuilderCrestSpec.colors.primary,

      secondary:
        crest?.colors?.secondary?.trim() ||
        defaultBuilderCrestSpec.colors.secondary,

      metallic:
        crest?.colors?.metallic === "silver"
          ? "silver"
          : defaultBuilderCrestSpec.colors.metallic,
    },

    supporters:
      crest?.supporters
        ?.map((supporter) =>
          normalizeCrestAnimal(supporter),
        )
        .filter((supporter) =>
          isCrestAnimal(supporter),
        ) ?? defaultBuilderCrestSpec.supporters,

    wreath:
      crest?.wreath ?? defaultBuilderCrestSpec.wreath,

    banner:
      crest?.banner ?? defaultBuilderCrestSpec.banner,
  };
}

export function toShieldShape(
  shield: BuilderShieldStyle,
): ShieldShape {
  const shieldMap: Record<BuilderShieldStyle, ShieldShape> = {
    "Heater Shield": "heater",
    "French Shield": "heater",
    "Norman Shield": "kite",
    "Spanish Shield": "spanish",
    Targe: "round",
  };

  return shieldMap[shield];
}

export function toEmbroideryFinish(
  finish: BuilderEmbroideryFinish,
): EmbroideryFinish {
  const finishMap: Record<
    BuilderEmbroideryFinish,
    EmbroideryFinish
  > = {
    "Regiment Gold": "regiment-gold",
    "Heritage Ivory": "heritage-ivory",
    "Tactical Subdued": "tactical-subdued",
  };

  return finishMap[finish];
}

/*
 * =========================================================
 * Heraldic Canon
 * =========================================================
 */

export type CanonCategory =
  | "tincture"
  | "charge"
  | "ordinary"
  | "symbol"
  | "crest"
  | "motto"
  | "shield";

export type CanonSource = {
  title: string;
  author?: string;
  publisher?: string;
  year?: number;
  url?: string;
  notes?: string;
};

export interface CanonEntry {
  id: string;
  name: string;
  category: CanonCategory;
  summary: string;
  traditionalAssociations: string[];
  historicalNotes: string;
  associatedVirtues: string[];
  associatedThemes: string[];
  relatedEntries: string[];
  designGuidance?: string;
  keywords?: string[];
  sources?: CanonSource[];
  canonVersion: string;
}

export interface ChargeVariant {
  id: string;
  name: string;
  summary: string;
}

export interface ChargeEntry extends CanonEntry {
  variants: ChargeVariant[];
  compatibleTinctures: string[];
  compatibleOrdinaries: string[];
  embroideryComplexity: 1 | 2 | 3 | 4 | 5;
  productionNotes?: string;
}

export interface CrestComponentEntry extends CanonEntry {
  compatibleHelmStyles: string[];
  compatibleMantlingStyles: string[];
  compatibleWreaths: string[];
  embroideryComplexity: 1 | 2 | 3 | 4 | 5;
  productionNotes?: string;
}

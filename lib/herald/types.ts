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
  | "Norman Shield"
  | "Tournament Shield"
  | "Crusader Shield";

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
  | "Stag";

export type CrestCrown =
  | "None"
  | "Baron"
  | "Count"
  | "Ducal"
  | "Royal";

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
  /*
   * Existing heraldry-engine fields.
   * These remain in place so current generators, validators,
   * and SVG utilities continue to compile.
   */

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

  /*
   * Structured builder fields.
   * These give the visual builder, AI generator, preview,
   * and future production exports one shared data model.
   */

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
];

export const builderShieldStyles: BuilderShieldStyle[] = [
  "Heater Shield",
  "Norman Shield",
  "Tournament Shield",
  "Crusader Shield",
];

export const crestCrowns: CrestCrown[] = [
  "None",
  "Baron",
  "Count",
  "Ducal",
  "Royal",
];

export const defaultBuilderCrestSpec: BuilderCrestSpec = {
  animal: "Lion",

  shield: "Heater Shield",

  crown: "Ducal",

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

export function isCrestAnimal(value: string): value is CrestAnimal {
  return crestAnimals.includes(value as CrestAnimal);
}

export function isBuilderShieldStyle(
  value: string,
): value is BuilderShieldStyle {
  return builderShieldStyles.includes(value as BuilderShieldStyle);
}

export function isCrestCrown(value: string): value is CrestCrown {
  return crestCrowns.includes(value as CrestCrown);
}

export function normalizeBuilderCrestSpec(
  crest: Partial<BuilderCrestSpec> | undefined,
): BuilderCrestSpec {
  return {
    animal:
      crest?.animal && isCrestAnimal(crest.animal)
        ? crest.animal
        : defaultBuilderCrestSpec.animal,

    shield:
      crest?.shield && isBuilderShieldStyle(crest.shield)
        ? crest.shield
        : defaultBuilderCrestSpec.shield,

    crown:
      crest?.crown && isCrestCrown(crest.crown)
        ? crest.crown
        : defaultBuilderCrestSpec.crown,

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
      crest?.supporters?.filter((supporter) =>
        crestAnimals.includes(supporter),
      ) ?? defaultBuilderCrestSpec.supporters,

    wreath:
      crest?.wreath ??
      defaultBuilderCrestSpec.wreath,

    banner:
      crest?.banner ??
      defaultBuilderCrestSpec.banner,
  };
}

export function toShieldShape(
  shield: BuilderShieldStyle,
): ShieldShape {
  const shieldMap: Record<BuilderShieldStyle, ShieldShape> = {
    "Heater Shield": "heater",
    "Norman Shield": "kite",
    "Tournament Shield": "spanish",
    "Crusader Shield": "heater",
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
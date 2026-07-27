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
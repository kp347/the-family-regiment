"use client";

import type {
  BuilderCrestSpec,
  BuilderShieldStyle,
  CrestCrown,
} from "@/lib/herald/types";
import CrestRenderer from "@/lib/herald/svg/CrestRenderer";

import PatchBase from "./PatchBase";

export type CrestPatchFinish =
  | "Regiment Gold"
  | "Tactical Subdued"
  | "Heritage Ivory";

type CrestPatchProps = {
  crest?: Partial<BuilderCrestSpec>;
  symbol?: string;
  initials?: string;
  shield?: BuilderShieldStyle | string;
  crown?: CrestCrown | string;
  finish?: CrestPatchFinish;
  active?: boolean;
  className?: string;
};

const finishPalettes: Record<
  CrestPatchFinish,
  {
    primary: string;
    secondary: string;
    metallic: BuilderCrestSpec["colors"]["metallic"];
    border: string;
  }
> = {
  "Regiment Gold": {
    primary: "#20231C",
    secondary: "#E8D7AE",
    metallic: "gold",
    border: "border-[#B08D57]",
  },

  "Tactical Subdued": {
    primary: "#303429",
    secondary: "#C1C3B2",
    metallic: "silver",
    border: "border-[#777B63]",
  },

  "Heritage Ivory": {
    primary: "#24251F",
    secondary: "#F1E7CF",
    metallic: "gold",
    border: "border-[#D7C49C]",
  },
};

export default function CrestPatch({
  crest,
  symbol,
  initials,
  shield,
  crown,
  finish = "Regiment Gold",
  active = false,
  className = "",
}: CrestPatchProps) {
  const palette = finishPalettes[finish];

  const resolvedCrest: BuilderCrestSpec = {
    animal: normalizeAnimal(crest?.animal ?? symbol),
    shield: normalizeShield(crest?.shield ?? shield),
    crown: normalizeCrown(crest?.crown ?? crown),
    heritage: crest?.heritage?.trim() || "Heritage",
    motto: crest?.motto?.trim() || "Fortis in Familia",
    initials:
      crest?.initials?.trim() ||
      initials?.trim() ||
      "FR",
    colors: {
      primary: crest?.colors?.primary ?? palette.primary,
      secondary: crest?.colors?.secondary ?? palette.secondary,
      metallic: crest?.colors?.metallic ?? palette.metallic,
    },
    supporters: crest?.supporters ?? [],
    wreath: crest?.wreath ?? false,
    banner: crest?.banner ?? true,
  };

  return (
    <PatchBase
      shape="shield"
      active={active}
      className={`h-full min-h-[88px] w-full min-w-[78px] overflow-visible border-2 px-1.5 py-1.5 ${palette.border} ${className}`}
    >
      <CrestRenderer
        crest={resolvedCrest}
        className="h-full w-full overflow-visible"
      />
    </PatchBase>
  );
}

function normalizeAnimal(
  value: string | undefined,
): BuilderCrestSpec["animal"] {
  if (
    value === "Lion" ||
    value === "Eagle" ||
    value === "Wolf" ||
    value === "Bear" ||
    value === "Stag"
  ) {
    return value;
  }

  return "Lion";
}

function normalizeShield(
  value: BuilderShieldStyle | string | undefined,
): BuilderShieldStyle {
  if (
    value === "Norman Shield" ||
    value === "Tournament Shield" ||
    value === "Crusader Shield" ||
    value === "Heater Shield"
  ) {
    return value;
  }

  return "Heater Shield";
}

function normalizeCrown(
  value: CrestCrown | string | undefined,
): CrestCrown {
  if (
    value === "Baron" ||
    value === "Count" ||
    value === "Ducal" ||
    value === "Royal" ||
    value === "None"
  ) {
    return value;
  }

  return "None";
}
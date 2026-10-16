"use client";

import type {
  BuilderCrestSpec,
  BuilderShieldStyle,
  CrestCrown,
} from "@/lib/herald/types";

import {
  isCrestAnimal,
} from "@/lib/herald/types";

import CrestRenderer from "@/lib/herald/svg/CrestRenderer";

export type SupportedCrestFinish =
  | "Regiment Gold"
  | "Tactical Subdued"
  | "Heritage Ivory";

type FamilyCrestPreviewProps = {
  familyName: string;
  initials: string;
  motto: string;
  symbol: string;
  shield: BuilderShieldStyle;
  crown: CrestCrown;
  finish: SupportedCrestFinish;
  className?: string;

  /**
   * Presentation-only identity label.
   *
   * true:
   *   Shows "HOUSE OF {SURNAME}" beneath the crest.
   *   Intended for the standalone Live Crest presentation.
   *
   * false:
   *   Shows only the physical crest artwork.
   *   Intended for the jacket-mounted crest patch.
   */
  showPresentationLabel?: boolean;
};

type CrestPalette = {
  primary: string;
  secondary: string;
  metallic: BuilderCrestSpec["colors"]["metallic"];
  chargeColor: string;
};

const FINISH_PALETTES: Record<
  SupportedCrestFinish,
  CrestPalette
> = {
  /*
   * REGIMENT GOLD
   *
   * Signature Family Regiment expression.
   *
   * Near-black field
   * Antique-gold Canon charge
   * Antique-gold structural details
   */
  "Regiment Gold": {
    primary: "#11120F",
    secondary: "#D4AF6A",
    metallic: "gold",
    chargeColor: "#D4AF6A",
  },

  /*
   * TACTICAL SUBDUED
   *
   * Military field expression inspired by subdued
   * insignia: near-black field with OD artwork.
   *
   * No bright ivory or silver treatment.
   */
  "Tactical Subdued": {
    primary: "#11120F",
    secondary: "#626A3A",
    metallic: "gold",
    chargeColor: "#626A3A",
  },

  /*
   * HERITAGE IVORY
   *
   * Archival / heritage expression.
   *
   * Charcoal field
   * Warm ivory Canon charge
   * Warm ivory structural details
   */
  "Heritage Ivory": {
    primary: "#24251F",
    secondary: "#F1E7CF",
    metallic: "gold",
    chargeColor: "#F1E7CF",
  },
};

export default function FamilyCrestPreview({
  familyName,
  initials,
  motto,
  symbol,
  shield,
  crown,
  finish,
  className = "",
  showPresentationLabel = true,
}: FamilyCrestPreviewProps) {
  const palette =
    FINISH_PALETTES[finish];

  const animal =
    isCrestAnimal(symbol)
      ? symbol
      : "Lion";

  const displayFamilyName =
    familyName.trim() ||
    "Family";

  const displayInitials =
    initials.trim() ||
    "FR";

  const displayMotto =
    motto.trim() ||
    "Fortis in Familia";

  const crest: BuilderCrestSpec = {
    animal,

    shield,

    crown,

    heritage:
      displayFamilyName,

    motto:
      displayMotto,

    initials:
      displayInitials,

    colors: {
      primary:
        palette.primary,

      secondary:
        palette.secondary,

      metallic:
        palette.metallic,
    },

    supporters: [],

    wreath: false,

    banner: true,
  };

  return (
    <div
      className={`relative flex w-[220px] flex-col items-center ${className}`}
    >
      <CrestRenderer
        crest={crest}
        title={`${displayFamilyName} family crest`}
        chargeColor={
          palette.chargeColor
        }
        className="h-auto w-full overflow-visible"
      />

      {showPresentationLabel && (
        <p
          className="-mt-1 max-w-[190px] truncate text-center text-[7px] font-semibold uppercase tracking-[0.28em]"
          style={{
            color:
              palette.secondary,
          }}
        >
          House of{" "}
          {displayFamilyName}
        </p>
      )}
    </div>
  );
}
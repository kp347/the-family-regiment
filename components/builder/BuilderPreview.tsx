"use client";

import Image from "next/image";

import NameTape from "@/components/patches/NameTape";

import FamilyCrestPreview from "@/components/builder/FamilyCrestPreview";

import type {

  HeraldShieldComposition,

} from "@/lib/herald/design";

import {

  normalizeBuilderShieldStyle,

  normalizeCrestCrown,

} from "@/lib/herald/types";

import {

  getHeritageFlagComponent,

  type HeritageFlagComponent,

} from "@/lib/herald/svg/flags/registry";

import { heritageFlagAssets } from "@/lib/herald/visualCanon/assets/heritageFlags";

import { getMilitaryBranchCanonAsset } from "@/lib/herald/visualCanon/assets/militaryBranches";

import { getSportCanonAsset } from "@/lib/herald/visualCanon/assets/sports";

import { getZodiacCanonAsset } from "@/lib/herald/visualCanon/assets/zodiac";

import type { HeritageFlagVisualCanonAssetId } from "@/lib/herald/visualCanon/references";

import { getJacketViewLayout } from "@/lib/jacketLayout";

import type {

  IdentityPatchCategory,

  MilitaryBranch,

  Sport,

  ZodiacSign,

} from "./BuilderJacket";

export type PreviewSymbolOption = {

  name: string;

  character: string;

};

export type PreviewJacketOption = {

  name: string;

  image: string;

};

type BuilderPreviewProps = {

  familyName: string;

  initials: string;

  heritage: string;

  symbol: string;

  shield?: string;

  crown?: string;

  value: string;

  motto: string;

  jacketView: string;

  embroideryFinish: string;

  nameTapeText: string;

  rightShoulderHeritage: string[];

  leftChestIdentity: IdentityPatchCategory;

  militaryBranch?: MilitaryBranch;

  sport?: Sport;

  zodiacSign?: ZodiacSign;

  symbolOptions: PreviewSymbolOption[];

  jacketViews: PreviewJacketOption[];

  composition: HeraldShieldComposition;

};

type PreviewStatProps = {

  label: string;

  value: string;

};

type SupportedFinish =

  | "Regiment Gold"

  | "Tactical Subdued"

  | "Heritage Ivory";

const fallbackJacket: PreviewJacketOption = {

  name: "Front",

  image: "/images/jackets/m65-front.png",

};

function getHeritageAssetId(

  heritage: string,

): HeritageFlagVisualCanonAssetId | undefined {

  const asset = heritageFlagAssets.find(

    (candidate) =>

      candidate.countryName === heritage,

  );

  return asset?.id as

    | HeritageFlagVisualCanonAssetId

    | undefined;

}

function resolveHeritageFlagComponent(

  assetId: string | undefined,

  heritage: string,

): HeritageFlagComponent | undefined {

  const resolvedAssetId =

    (assetId as

      | HeritageFlagVisualCanonAssetId

      | undefined) ??

    getHeritageAssetId(heritage);

  if (!resolvedAssetId) {

    return undefined;

  }

  return getHeritageFlagComponent(

    resolvedAssetId,

  );

}

export default function BuilderPreview({

  familyName,

  initials,

  heritage,

  symbol,

  shield = "Heater Shield",

  crown = "None",

  value,

  motto,

  jacketView,

  embroideryFinish,

  nameTapeText,

  rightShoulderHeritage,

  leftChestIdentity,

  militaryBranch = "None",

  sport = "None",

  zodiacSign = "None",

  jacketViews,

  composition: _composition,

}: BuilderPreviewProps) {

  const selectedJacket =

    jacketViews.find(

      (option) =>

        option.name === jacketView,

    ) ??

    jacketViews[0] ??

    fallbackJacket;

  const finish =

    normalizeFinish(

      embroideryFinish,

    );

  const displayFamilyName =

    familyName.trim() || "Family";

  const displayInitials =

    initials.trim() || "FR";

  const displayHeritage =

    heritage.trim() || "Heritage";

  const displaySymbol =

    symbol.trim() || "Lion";

  const displayValue =

    value.trim() || "Legacy";

  const displayMotto =

    motto.trim() ||

    "Fortis in Familia";

  const displayNameTape =

    nameTapeText.trim();

  const normalizedShield =

    normalizeBuilderShieldStyle(

      shield,

    );

  const normalizedCrown =

    normalizeCrestCrown(

      crown,

    );

  const activeLayout =

    getJacketViewLayout(

      jacketView,

    );

  const familyCrestLayout =

    activeLayout.familyCrest

      .leftShoulder;

  const heritageLayout =

    activeLayout.heritage

      .rightShoulder;

  const nameTapeLayout =

    activeLayout.nameTape

      .rightChest;

  const leftChestLayout =

    activeLayout.identityPatch

      .leftChest;

  const rightShoulderHeritageSlots =

    rightShoulderHeritage

      .slice(0, 3)

      .map((heritageName) => ({

        heritageName,

        Flag: resolveHeritageFlagComponent(

          getHeritageAssetId(

            heritageName,

          ),

          heritageName,

        ),

      }))

      .filter(

        (

          slot,

        ): slot is {

          heritageName: string;

          Flag: HeritageFlagComponent;

        } => Boolean(slot.Flag),

      );

  const hasRenderableIdentityPatch =

    leftChestIdentity !== "None" &&

    !(

      leftChestIdentity ===

        "Military Branch" &&

      militaryBranch === "None"

    ) &&

    !(

      leftChestIdentity === "Sport" &&

      sport === "None"

    ) &&

    !(

      leftChestIdentity === "Zodiac" &&

      zodiacSign === "None"

    );

  return (

    <aside className="relative min-h-[720px] overflow-hidden border-t border-white/10 bg-[#20211E] lg:border-l lg:border-t-0">

      <div className="sticky top-0 flex min-h-[720px] items-center justify-center p-6 md:p-10">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(176,141,87,0.18),_transparent_65%)]" />

        <div className="relative w-full">

          <PreviewHeader

            finish={embroideryFinish}

            jacketView={jacketView}

          />

          <div className="relative mx-auto aspect-[4/5] w-full max-w-[540px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#181916] shadow-[0_35px_80px_rgba(0,0,0,0.35)]">

            <Image

              src={selectedJacket.image}

              alt={`${jacketView} view of the customized Regiment Jacket`}

              fill

              priority

              className="object-cover"

              sizes="(max-width: 1024px) 100vw, 45vw"

            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />

            {/*

             * ZONE 1

             * WEARER LEFT SHOULDER — FAMILY CREST

             */}

            {familyCrestLayout.visible && (

              <div

                style={{

                  left:

                    familyCrestLayout.left,

                  top:

                    familyCrestLayout.top,

                  transform: `translate(-50%, -50%) rotate(${familyCrestLayout.rotation}deg)`,

                }}

                className="absolute z-20"

                title="Left shoulder family crest"

              >

                <div

                  className="origin-center"

                  style={{

                    transform: `scale(${familyCrestLayout.scale})`,

                  }}

                >

                  <FamilyCrestPreview

                    familyName={

                      displayFamilyName

                    }

                    initials={

                      displayInitials

                    }

                    motto={

                      displayMotto

                    }

                    symbol={

                      displaySymbol

                    }

                    shield={

                      normalizedShield

                    }

                    crown={

                      normalizedCrown

                    }

                    finish={

                      finish

                    }

                    showPresentationLabel={

                      false

                    }

                  />

                </div>

              </div>

            )}

            {/*

             * ZONE 2

             * WEARER RIGHT SHOULDER — HERITAGE STACK

             */}

            {heritageLayout.visible &&

              rightShoulderHeritageSlots.map(

                (

                  {

                    heritageName,

                    Flag,

                  },

                  index,

                ) => {

                  const slotOffset =

                    getHeritageSlotOffset(

                      jacketView,

                      index,

                    );

                  return (

                    <div

                      key={`${heritageName}-${index}`}

                      style={{

                        left:

                          offsetPercent(

                            heritageLayout.left,

                            slotOffset.left,

                          ),

                        top:

                          offsetPercent(

                            heritageLayout.top,

                            slotOffset.top,

                          ),

                        width: `${heritageLayout.width}px`,

                        height: `${heritageLayout.height}px`,

                        transform: `translate(-50%, -50%) rotate(${heritageLayout.rotation}deg) scale(${heritageLayout.scale})`,

                        borderColor: getIdentityPatchPalette(finish).border,

                      }}

                      className="absolute z-20 flex items-center justify-center overflow-hidden rounded-full border-2 bg-[#20231C] shadow-xl"

                      title={`Right shoulder heritage slot ${index + 1}: ${heritageName}`}

                    >

                      <div className="relative flex h-[72%] w-[72%] shrink-0 items-center justify-center overflow-hidden rounded-full [&_svg]:!block [&_svg]:!h-full [&_svg]:!w-full [&_svg]:!max-h-full [&_svg]:!max-w-full">

                        <Flag

                          width={34}

                          height={34}

                          title={`Flag of ${heritageName}`}

                        />

                      </div>

                    </div>

                  );

                },

              )}

            {/*

             * ZONE 3

             * WEARER RIGHT CHEST — NAME TAPE

             */}

            {nameTapeLayout.visible &&

              displayNameTape && (

                <div

                  style={{

                    left:

                      nameTapeLayout.left,

                    top:

                      nameTapeLayout.top,

                    transform: `translate(-50%, -50%) rotate(${nameTapeLayout.rotation}deg) scale(${nameTapeLayout.scale})`,

                  }}

                  className="absolute z-20"

                >

                  <NameTape

                    name={

                      displayNameTape

                    }

                    finish={

                      finish

                    }

                    active

                    className="min-w-[112px] px-3 py-1.5"

                  />

                </div>

              )}

            {/*

             * ZONE 4

             * WEARER LEFT CHEST — IDENTITY PATCH

             */}

            {leftChestLayout.visible &&

              hasRenderableIdentityPatch && (

                <div

                  style={{

                    left:

                      leftChestLayout.left,

                    top:

                      leftChestLayout.top,

                    width: `${leftChestLayout.width}px`,

                    minHeight: `${leftChestLayout.height}px`,

                    transform: `translate(-50%, -50%) rotate(${leftChestLayout.rotation}deg) scale(${leftChestLayout.scale})`,

                  }}

                  className="absolute z-20"

                >

                  <IdentityPatchPreview

                    category={

                      leftChestIdentity

                    }

                    militaryBranch={

                      militaryBranch

                    }

                    sport={sport}

                    zodiacSign={zodiacSign}

                    finish={

                      finish

                    }

                  />

                </div>

              )}

            <div className="absolute bottom-5 left-5 right-5 z-20 flex items-end justify-between rounded-2xl border border-white/10 bg-black/45 px-5 py-4 backdrop-blur-md">

              <div className="min-w-0">

                <p className="text-[9px] uppercase tracking-[0.3em] text-[#B08D57]">

                  Regiment Identity

                </p>

                <p className="mt-2 truncate text-lg text-white">

                  {displayFamilyName}

                </p>

              </div>

              <p className="ml-4 shrink-0 text-xs uppercase tracking-[0.18em] text-[#D7D1C5]">

                {displayInitials}

              </p>

            </div>

          </div>

          {/*

           * LIVE CREST

           */}

          <div className="mt-5 rounded-[1.5rem] border border-[#B08D57]/20 bg-[#181916] p-5">

            <div className="flex items-center justify-between gap-4">

              <div>

                <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#B08D57]">

                  Live Crest

                </p>

                <p className="mt-1 text-sm text-[#D8D3CA]">

                  Regiment crest presentation

                </p>

              </div>

              <span className="rounded-full border border-[#B08D57]/30 bg-[#B08D57]/5 px-3 py-1.5 text-[9px] uppercase tracking-[0.2em] text-[#C7A767]">

                Visual Canon

              </span>

            </div>

            <div className="mt-5 flex min-h-[390px] items-center justify-center overflow-hidden rounded-2xl border border-white/8 bg-[#11120F] px-4 py-5">

              <div className="origin-center scale-[1.4]">

                <FamilyCrestPreview

                  familyName={

                    displayFamilyName

                  }

                  initials={

                    displayInitials

                  }

                  motto={

                    displayMotto

                  }

                  symbol={

                    displaySymbol

                  }

                  shield={

                    normalizedShield

                  }

                  crown={

                    normalizedCrown

                  }

                  finish={

                    finish

                  }

                />

              </div>

            </div>

          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">

            <PreviewStat

              label="View"

              value={

                jacketView

              }

            />

            <PreviewStat

              label="Left Shoulder"

              value={

                familyCrestLayout.visible

                  ? "Family Crest"

                  : "Not visible"

              }

            />

            <PreviewStat

              label="Right Shoulder"

              value={

                heritageLayout.visible

                  ? rightShoulderHeritage.length >

                    0

                    ? rightShoulderHeritage.join(

                        " · ",

                      )

                    : "None"

                  : "Not visible"

              }

            />

            <PreviewStat

              label="Name Tape"

              value={

                nameTapeLayout.visible

                  ? displayNameTape ||

                    "Blank"

                  : "Not visible"

              }

            />

            <PreviewStat

              label="Left Chest"

              value={

                getLeftChestDisplayValue(

                  leftChestLayout.visible,

                  leftChestIdentity,

                  militaryBranch,

                  sport,

                  zodiacSign,

                )

              }

            />

          </div>

          <div className="sr-only">

            {displayHeritage}

            {displaySymbol}

            {displayValue}

          </div>

        </div>

      </div>

    </aside>

  );

}

function getHeritageSlotOffset(

  jacketView: string,

  index: number,

): {

  left: number;

  top: number;

} {

  if (index === 0) {

    return {

      left: 0,

      top: 0,

    };

  }

  switch (jacketView) {

    case "Left ¾":

    case "Right ¾":

    case "Front":

    default:

      return {

        left: 0,

        top: index * 4.5,

      };

  }

}

function offsetPercent(

  value: string,

  offset: number,

): string {

  const numericValue =

    Number.parseFloat(value);

  if (

    Number.isNaN(

      numericValue,

    )

  ) {

    return value;

  }

  return `${numericValue + offset}%`;

}

function IdentityPatchPreview({

  category,

  militaryBranch,

  sport,

  zodiacSign,

  finish,

}: {

  category: IdentityPatchCategory;

  militaryBranch: MilitaryBranch;

  sport: Sport;

  zodiacSign: ZodiacSign;

  finish: SupportedFinish;

}) {

  const palette =

    getIdentityPatchPalette(

      finish,

    );

  const silhouetteOutline = [

    `drop-shadow(0.65px 0 0 ${palette.border})`,

    `drop-shadow(-0.65px 0 0 ${palette.border})`,

    `drop-shadow(0 0.65px 0 ${palette.border})`,

    `drop-shadow(0 -0.65px 0 ${palette.border})`,

    `drop-shadow(0.45px 0.45px 0 ${palette.border})`,

    `drop-shadow(-0.45px 0.45px 0 ${palette.border})`,

    `drop-shadow(0.45px -0.45px 0 ${palette.border})`,

    `drop-shadow(-0.45px -0.45px 0 ${palette.border})`,

  ].join(" ");

  if (

    category === "Military Branch"

  ) {

    const branchAsset =

      getMilitaryBranchCanonAsset(

        militaryBranch,

      );

    if (!branchAsset) {

      return null;

    }

    return (

      <div

        className="flex min-h-[38px] w-full items-center justify-center"

        title={`${branchAsset.label} identity patch`}

      >

        <div

          className="relative h-[50px] w-full origin-center"

          style={{

            transform: `scale(${branchAsset.previewScale})`,

          }}

        >

          <Image

            src={branchAsset.artworkSrc}

            alt={`${branchAsset.label} military branch patch`}

            fill

            className="object-contain"

            style={{

              filter: silhouetteOutline,

            }}

            sizes="80px"

          />

        </div>

      </div>

    );

  }

  if (category === "Sport") {

    const sportAsset =

      getSportCanonAsset(sport);

    if (!sportAsset) {

      return null;

    }

    return (

      <div

        className="flex min-h-[38px] w-full items-center justify-center"

        title={`${sportAsset.label} identity patch`}

      >

        <div

          className="relative h-[50px] w-full origin-center"

          style={{

            transform: `scale(${sportAsset.previewScale})`,

          }}

        >

          <Image

            src={sportAsset.artworkSrc}

            alt={`${sportAsset.label} sport patch`}

            fill

            className="object-contain"

            style={{

              filter: silhouetteOutline,

            }}

            sizes="80px"

          />

        </div>

      </div>

    );

  }

  if (category === "Zodiac") {

    const zodiacAsset =

      getZodiacCanonAsset(zodiacSign);

    if (!zodiacAsset) {

      return null;

    }

    return (

      <div

        className="flex min-h-[38px] w-full items-center justify-center"

        title={`${zodiacAsset.label} identity patch`}

      >

        <div

          className="relative h-[50px] w-full origin-center"

          style={{

            transform: `scale(${zodiacAsset.previewScale})`,

          }}

        >

          <Image

            src={zodiacAsset.src}

            alt={`${zodiacAsset.label} zodiac patch`}

            fill

            className="object-contain"

            style={{

              filter: silhouetteOutline,

            }}

            sizes="80px"

          />

        </div>

      </div>

    );

  }

  const shortLabel =

    getIdentityPatchShortLabel(

      category,

    );

  if (!shortLabel) {

    return null;

  }

  return (

    <div

      className="flex min-h-[38px] w-full items-center justify-center rounded-md border px-2 py-1.5 text-center shadow-lg"

      style={{

        backgroundColor:

          palette.background,

        borderColor:

          palette.border,

        color:

          palette.text,

      }}

      title={`${category} identity patch`}

    >

      <span className="text-[7px] font-semibold uppercase leading-tight tracking-[0.12em]">

        {shortLabel}

      </span>

    </div>

  );

}

function getIdentityPatchShortLabel(

  category: IdentityPatchCategory,

) {

  switch (category) {

    case "Family Value":

      return "Value";

    case "Profession":

      return "Profession";

    case "Sport":

      return "Sport";

    case "Zodiac":

      return "Zodiac";

    case "Hometown":

      return "Hometown";

    case "Military Branch":

    case "None":

    default:

      return "";

  }

}

function getLeftChestDisplayValue(

  visible: boolean,

  category: IdentityPatchCategory,

  militaryBranch: MilitaryBranch,

  sport: Sport,

  zodiacSign: ZodiacSign,

): string {

  if (!visible) {

    return "Not visible";

  }

  if (category === "None") {

    return "Open";

  }

  if (

    category ===

    "Military Branch"

  ) {

    return militaryBranch ===

      "None"

      ? "Military Branch · Choose branch"

      : militaryBranch;

  }

  if (category === "Sport") {

    return sport === "None"

      ? "Sport · Choose sport"

      : sport;

  }

  if (category === "Zodiac") {

    return zodiacSign === "None"

      ? "Zodiac · Choose sign"

      : zodiacSign;

  }

  return category;

}

function getIdentityPatchPalette(

  finish: SupportedFinish,

) {

  switch (finish) {

    case "Tactical Subdued":

      return {

        background:

          "#11120F",

        border:

          "#626A3A",

        text:

          "#626A3A",

      };

    case "Heritage Ivory":

      return {

        background:

          "#24251F",

        border:

          "#F1E7CF",

        text:

          "#F1E7CF",

      };

    case "Regiment Gold":

    default:

      return {

        background:

          "#11120F",

        border:

          "#D4AF6A",

        text:

          "#D4AF6A",

      };

  }

}

function PreviewHeader({

  finish,

  jacketView,

}: {

  finish: string;

  jacketView: string;

}) {

  return (

    <div className="mb-6 flex items-center justify-between">

      <div>

        <p className="text-xs uppercase tracking-[0.4em] text-[#B08D57]">

          Regiment Workshop

        </p>

        <p className="mt-2 text-sm text-[#77736A]">

          {jacketView} view ·{" "}

          {finish}

        </p>

      </div>

      <span className="rounded-full border border-[#B08D57]/30 bg-[#B08D57]/5 px-4 py-2 text-[10px] uppercase tracking-[0.25em] text-[#BDA16F]">

        Live Design

      </span>

    </div>

  );

}

function PreviewStat({

  label,

  value,

}: PreviewStatProps) {

  return (

    <div className="min-w-0 rounded-xl border border-white/10 bg-white/[0.025] p-4">

      <p className="text-[8px] uppercase tracking-[0.25em] text-[#65625D]">

        {label}

      </p>

      <p className="mt-2 truncate text-xs text-[#D8D3CA]">

        {value}

      </p>

    </div>

  );

}

function normalizeFinish(

  finish: string,

): SupportedFinish {

  if (

    finish ===

      "Tactical Subdued" ||

    finish ===

      "Heritage Ivory" ||

    finish ===

      "Regiment Gold"

  ) {

    return finish;

  }

  return "Regiment Gold";

}

"use client";

import Image from "next/image";
import type { CSSProperties } from "react";

import IdentityShieldPatch, { type Profession } from "./IdentityShieldPatch";
import NameTape from "@/components/patches/NameTape";
import FamilyCrestPreview from "@/components/builder/FamilyCrestPreview";

import type { HeraldShieldComposition } from "@/lib/herald/design";

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
  profession?: Profession;
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
      candidate.countryName === heritage ||
      candidate.name === heritage,
  );

  return asset?.id as
    | HeritageFlagVisualCanonAssetId
    | undefined;
}

function resolveHeritageFlagComponent(
  heritage: string,
): HeritageFlagComponent | undefined {
  const assetId = getHeritageAssetId(heritage);

  if (!assetId) {
    return undefined;
  }

  return getHeritageFlagComponent(assetId);
}

function offsetPercent(
  value: string,
  offset: number,
): string {
  const numericValue = Number.parseFloat(value);

  if (!Number.isFinite(numericValue)) {
    return value;
  }

  return `${numericValue + offset}%`;
}

/**
 * Heritage patches are sized as a percentage of
 * the jacket preview's width.
 *
 * This avoids fixed 38px/48px circles becoming
 * oversized when the image is displayed on mobile.
 *
 * Each flag has its own slot. No overlapping stack.
 */
function getHeritagePlacement(
  jacketView: string,
  index: number,
  anchorLeft: string,
  anchorTop: string,
): {
  left: string;
  top: string;
  width: string;
} {
  if (jacketView === "Left ¾") {
    return {
      left: offsetPercent(anchorLeft, 0),
      top: offsetPercent(anchorTop, index * 7.2),
      width: "7%",
    };
  }

  return {
    left: offsetPercent(anchorLeft, 2),
    top: offsetPercent(anchorTop, index * 7.2),
    width: "7%",
  };
}

function getNameTapePlacement(
  jacketView: string,
  anchorLeft: string,
  anchorTop: string,
): {
  left: string;
  top: string;
  width: string;
} {
  if (jacketView === "Left ¾") {
    return {
      left: anchorLeft,
      top: anchorTop,
      width: "20%",
    };
  }

  return {
    left: offsetPercent(anchorLeft, 3),
    top: anchorTop,
    width: "21%",
  };
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
  profession = "None",
  zodiacSign = "None",
  jacketViews,
  composition: _composition,
}: BuilderPreviewProps) {
  const selectedJacket =
    jacketViews.find(
      (option) => option.name === jacketView,
    ) ??
    jacketViews[0] ??
    fallbackJacket;

  const finish = normalizeFinish(embroideryFinish);

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
    motto.trim() || "Fortis in Familia";

  const displayNameTape = nameTapeText.trim();

  const normalizedShield =
    normalizeBuilderShieldStyle(shield);

  const normalizedCrown =
    normalizeCrestCrown(crown);

  const activeLayout = getJacketViewLayout(jacketView);

  const familyCrestLayout =
    activeLayout.familyCrest.leftShoulder;

  const heritageLayout =
    activeLayout.heritage.rightShoulder;

  const nameTapeLayout =
    activeLayout.nameTape.rightChest;

  const leftChestLayout =
    activeLayout.identityPatch.leftChest;

  const rightShoulderHeritageSlots =
    rightShoulderHeritage
      .slice(0, 3)
      .map((heritageName) => ({
        heritageName,
        Flag: resolveHeritageFlagComponent(heritageName),
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
      leftChestIdentity === "Military Branch" &&
      militaryBranch === "None"
    ) &&
    !(
      leftChestIdentity === "Sport" &&
      sport === "None"
    ) &&
    !(leftChestIdentity === "Profession" && profession === "None") &&
    !(
      leftChestIdentity === "Zodiac" &&
      zodiacSign === "None"
    );

  const palette = getIdentityPatchPalette(finish);
// Military artwork already contains its approved embroidered border.
// Use only a subtle dark shadow to separate it from the jacket fabric.
const militaryPatchShadow =
  "drop-shadow(0 2px 2px rgba(0, 0, 0, 0.55))";
  return (
    <aside className="relative w-full min-w-0 max-w-full overflow-hidden border-t border-white/10 bg-[#20211E] lg:min-h-[720px] lg:border-l lg:border-t-0">
      <div className="relative flex w-full min-w-0 max-w-full items-center justify-center p-3 sm:p-6 md:p-10 lg:sticky lg:top-0 lg:min-h-[720px]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(176,141,87,0.18),_transparent_65%)]" />

        <div className="relative w-full min-w-0 max-w-full">
          <PreviewHeader
            finish={embroideryFinish}
            jacketView={jacketView}
          />

          {/*
           * JACKET STAGE
           *
           * All percentage-based patch dimensions
           * are relative to this same image container.
           */}
          <div className="relative mx-auto aspect-[4/5] w-full min-w-0 max-w-[540px] overflow-hidden rounded-[1.25rem] border border-white/10 bg-[#181916] shadow-[0_35px_80px_rgba(0,0,0,0.35)] sm:rounded-[2rem]">
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
             * WEARER LEFT SHOULDER
             * FAMILY CREST
             *
             * Existing visual canon preserved.
             */}
            {familyCrestLayout.visible && (
              <div
                style={{
                  left: familyCrestLayout.left,
                  top: familyCrestLayout.top,
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
                    familyName={displayFamilyName}
                    initials={displayInitials}
                    motto={displayMotto}
                    symbol={displaySymbol}
                    shield={normalizedShield}
                    crown={normalizedCrown}
                    finish={finish}
                    showPresentationLabel={false}
                  />
                </div>
              </div>
            )}

            {/*
             * ZONE 2
             * WEARER RIGHT SHOULDER
             * THREE INDEPENDENT HERITAGE FLAGS
             *
             * Each patch is a percentage of the
             * jacket stage width, with separate
             * vertical slots.
             */}
            {heritageLayout.visible &&
              rightShoulderHeritageSlots.map(
                ({ heritageName, Flag }, index) => {
                  const placement = getHeritagePlacement(
                    jacketView,
                    index,
                    heritageLayout.left,
                    heritageLayout.top,
                  );

                  const patchStyle: CSSProperties = {
                    left: placement.left,
                    top: placement.top,
                    width: placement.width,
                    aspectRatio: "1 / 1",
                    transform: `translate(-50%, -50%) rotate(${heritageLayout.rotation}deg)`,
                    borderColor: palette.border,
                    backgroundColor: palette.background,
                  };

                  return (
                    <div
                      key={`${heritageName}-${index}`}
                      style={patchStyle}
                      className="absolute z-20 flex items-center justify-center overflow-hidden rounded-full border-[1.5px] shadow-lg"
                      title={`Right shoulder heritage slot ${
                        index + 1
                      }: ${heritageName}`}
                    >
                      <div className="flex h-[82%] w-[82%] items-center justify-center overflow-hidden rounded-full [&_svg]:!block [&_svg]:!h-full [&_svg]:!w-full">
                        <Flag
                          width="100%"
                          height="100%"
                          title={`Flag of ${heritageName}`}
                        />
                      </div>
                    </div>
                  );
                },
              )}

            {/*
             * ZONE 3
             * WEARER RIGHT CHEST
             * RESPONSIVE NAME TAPE
             *
             * Uses the compact NameTape variant.
             * No fixed minimum width.
             * No nested transform scaling.
             */}
            {nameTapeLayout.visible &&
              displayNameTape &&
              (() => {
                const placement = getNameTapePlacement(
                  jacketView,
                  nameTapeLayout.left,
                  nameTapeLayout.top,
                );

                return (
                  <div
                    style={{
                      left: placement.left,
                      top: placement.top,
                      width: placement.width,
                      transform: `translate(-50%, -50%) rotate(${nameTapeLayout.rotation}deg)`,
                    }}
                    className="absolute z-20"
                    title={`Name tape: ${displayNameTape}`}
                  >
                    {/* Mobile: use the compact patch without its default minimum width. */}
                    <div className="block w-full min-w-0 sm:hidden">
                      <NameTape
                        name={displayNameTape}
                        finish={finish}
                        active
                        compact
                        className="!w-full !min-w-0"
                      />
                    </div>
                    {/* Desktop: retain the existing name tape appearance. */}
                    <div className="hidden w-full min-w-0 sm:block">
                      <NameTape
                        name={displayNameTape}
                        finish={finish}
                        active
                        className="w-full min-w-0"
                      />
                    </div>
                  </div>
                );
              })()}

            {/*
             * ZONE 4
             * WEARER LEFT CHEST
             * IDENTITY PATCH
             *
             * Existing position and rendering
             * preserved.
             */}
            {leftChestLayout.visible &&
              hasRenderableIdentityPatch && (
                <div
                  style={{
                    left: `calc(${leftChestLayout.left} + 1%)`,
                    top: leftChestLayout.top,
                    width: `${leftChestLayout.width}px`,
                    minHeight: `${leftChestLayout.height}px`,
                    transform: `translate(-50%, -50%) rotate(${leftChestLayout.rotation}deg) scale(${leftChestLayout.scale})`,
                  }}
                  className="absolute z-20"
                >
                  <IdentityPatchPreview
                    category={leftChestIdentity}
                    militaryBranch={militaryBranch}
                    sport={sport}
                    profession={profession}
                    zodiacSign={zodiacSign}
                    finish={finish}
                  />
                </div>
              )}

            {/*
             * REGIMENT IDENTITY PANEL
             */}
            <div className="absolute bottom-3 left-3 right-3 z-20 flex min-w-0 items-end justify-between gap-3 rounded-2xl border border-white/10 bg-black/45 px-3 py-3 backdrop-blur-md sm:bottom-5 sm:left-5 sm:right-5 sm:px-5 sm:py-4">
              <div className="min-w-0">
                <p className="text-[8px] uppercase tracking-[0.2em] text-[#B08D57] sm:text-[9px] sm:tracking-[0.3em]">
                  Regiment Identity
                </p>

                <p className="mt-2 truncate text-base text-white sm:text-lg">
                  {displayFamilyName}
                </p>
              </div>

              <p className="shrink-0 text-xs uppercase tracking-[0.18em] text-[#D7D1C5]">
                {displayInitials}
              </p>
            </div>
          </div>

          {/*
           * LIVE CREST
           */}
          <div className="mt-5 min-w-0 overflow-hidden rounded-[1.5rem] border border-[#B08D57]/20 bg-[#181916] p-3 sm:p-5">
            <div className="flex min-w-0 flex-wrap items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#B08D57]">
                  Live Crest
                </p>

                <p className="mt-1 text-sm text-[#D8D3CA]">
                  Regiment crest presentation
                </p>
              </div>

              <span className="max-w-full rounded-full border border-[#B08D57]/30 bg-[#B08D57]/5 px-3 py-1.5 text-[9px] uppercase tracking-[0.2em] text-[#C7A767]">
                Visual Canon
              </span>
            </div>

            <div className="mt-5 flex min-h-[320px] min-w-0 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#11120F] px-3 py-5 sm:min-h-[390px] sm:px-4">
              <div className="origin-center scale-100 sm:scale-[1.4]">
                <FamilyCrestPreview
                  familyName={displayFamilyName}
                  initials={displayInitials}
                  motto={displayMotto}
                  symbol={displaySymbol}
                  shield={normalizedShield}
                  crown={normalizedCrown}
                  finish={finish}
                />
              </div>
            </div>
          </div>

          {/*
           * PREVIEW DETAILS
           */}
          <div className="mt-4 grid min-w-0 grid-cols-2 gap-3">
            <PreviewStat
              label="View"
              value={jacketView}
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
                  ? rightShoulderHeritage.length > 0
                    ? rightShoulderHeritage.join(" · ")
                    : "None"
                  : "Not visible"
              }
            />

            <PreviewStat
              label="Name Tape"
              value={
                nameTapeLayout.visible
                  ? displayNameTape || "Blank"
                  : "Not visible"
              }
            />

            <PreviewStat
              label="Left Chest"
              value={getLeftChestDisplayValue(
                leftChestLayout.visible,
                leftChestIdentity,
                militaryBranch,
                sport,
                profession,
                zodiacSign,
              )}
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

function IdentityPatchPreview({
  category,
  militaryBranch,
  sport,
  profession,
  zodiacSign,
  finish,
}: {
  category: IdentityPatchCategory;
  militaryBranch: MilitaryBranch;
  sport: Sport;
  profession: Profession;
  zodiacSign: ZodiacSign;
  finish: SupportedFinish;
}) {
  const palette = getIdentityPatchPalette(finish);
const militaryPatchShadow =
  "drop-shadow(0 2px 2px rgba(0, 0, 0, 0.55))";
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

  if (category === "Military Branch") {
    const branchAsset =
      getMilitaryBranchCanonAsset(militaryBranch);

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
    filter: militaryPatchShadow,
  }}
  sizes="80px"
/>
        </div>
      </div>
    );
  }

  if (category === "Sport" || category === "Profession") {
    const asset = category === "Sport" ? getSportCanonAsset(sport) : undefined;
    const label = category === "Sport" ? sport : profession;
    if (label === "None") return null;
    return (
      <div className="h-[65px] w-[60px]" title={`${label} identity patch`}>
        <div
          className="h-full w-full origin-center"
          style={{ transform: category === "Profession" ? "scale(0.85)" : undefined }}
        >
          <IdentityShieldPatch
            finish={finish}
            label={label}
            artworkSrc={asset?.artworkSrc}
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
    getIdentityPatchShortLabel(category);

  if (!shortLabel) {
    return null;
  }

  return (
    <div
      className="flex min-h-[38px] w-full items-center justify-center rounded-md border px-2 py-1.5 text-center shadow-lg"
      style={{
        backgroundColor: palette.background,
        borderColor: palette.border,
        color: palette.text,
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
  profession: Profession,
  zodiacSign: ZodiacSign,
): string {
  if (!visible) {
    return "Not visible";
  }

  if (category === "None") {
    return "Open";
  }

  if (category === "Military Branch") {
    return militaryBranch === "None"
      ? "Military Branch · Choose branch"
      : militaryBranch;
  }

  if (category === "Sport") {
    return sport === "None"
      ? "Sport · Choose sport"
      : sport;
  }

  if (category === "Profession") return profession === "None" ? "Profession · Choose profession" : profession;

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
        background: "#11120F",
        border: "#626A3A",
        text: "#626A3A",
      };

    case "Heritage Ivory":
      return {
        background: "#24251F",
        border: "#F1E7CF",
        text: "#F1E7CF",
      };

    case "Regiment Gold":
    default:
      return {
        background: "#11120F",
        border: "#D4AF6A",
        text: "#D4AF6A",
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
    <div className="mb-6 flex min-w-0 flex-wrap items-center justify-between gap-3">
      <div className="min-w-0">
        <p className="text-[10px] uppercase tracking-[0.25em] text-[#B08D57] sm:text-xs sm:tracking-[0.4em]">
          Regiment Workshop
        </p>

        <p className="mt-2 text-sm text-[#77736A]">
          {jacketView} view · {finish}
        </p>
      </div>

      <span className="max-w-full rounded-full border border-[#B08D57]/30 bg-[#B08D57]/5 px-3 py-2 text-[9px] uppercase tracking-[0.12em] text-[#BDA16F] sm:px-4 sm:text-[10px] sm:tracking-[0.25em]">
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
    <div className="min-w-0 rounded-xl border border-white/10 bg-white/[0.025] p-3 sm:p-4">
      <p className="text-[8px] uppercase tracking-[0.2em] text-[#65625D]">
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
    finish === "Tactical Subdued" ||
    finish === "Heritage Ivory" ||
    finish === "Regiment Gold"
  ) {
    return finish;
  }

  return "Regiment Gold";
}

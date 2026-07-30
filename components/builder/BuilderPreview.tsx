"use client";

import Image from "next/image";

import CrestPatch from "@/components/patches/CrestPatch";
import NameTape from "@/components/patches/NameTape";
import RockerPatch from "@/components/patches/RockerPatch";
import {
  isCrestAnimal,
  normalizeBuilderCrestSpec,
  type BuilderShieldStyle,
  type CrestCrown,
} from "@/lib/herald/types";
import { jacketLayout } from "@/lib/jacketLayout";

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
  crestPlacement: string;
  embroideryFinish: string;
  includeNameTape: boolean;
  includeSleevePatch: boolean;
  symbolOptions: PreviewSymbolOption[];
  jacketViews: PreviewJacketOption[];
};

type PreviewStatProps = {
  label: string;
  value: string;
};

type SupportedFinish =
  | "Regiment Gold"
  | "Tactical Subdued"
  | "Heritage Ivory";

const fallbackSymbol: PreviewSymbolOption = {
  name: "Regiment",
  character: "◆",
};

const fallbackJacket: PreviewJacketOption = {
  name: "Front",
  image: "/images/jackets/m65-front.png",
};

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
  crestPlacement,
  embroideryFinish,
  includeNameTape,
  includeSleevePatch,
  symbolOptions,
  jacketViews,
}: BuilderPreviewProps) {
  const selectedSymbol =
    symbolOptions.find((option) => option.name === symbol) ??
    symbolOptions[0] ??
    fallbackSymbol;

  const selectedJacket =
    jacketViews.find((option) => option.name === jacketView) ??
    jacketViews[0] ??
    fallbackJacket;

  const finish = normalizeFinish(embroideryFinish);
  const isFrontView = jacketView === "Front";

  const isLeftChestActive = crestPlacement === "Left Chest";
  const isRightChestActive = crestPlacement === "Right Chest";
  const isSleeveActive = crestPlacement === "Sleeve Patch";
  const isTopRockerActive = crestPlacement === "Top Rocker";
  const isBackCrestActive =
    crestPlacement === "Back Crest" || crestPlacement === "Center Patch";
  const isBottomRockerActive = crestPlacement === "Bottom Rocker";

  const crestLayout = isLeftChestActive
    ? jacketLayout.front.crest.leftChest
    : jacketLayout.front.crest.rightChest;

  const nameTapeLayout = isLeftChestActive
    ? jacketLayout.front.nameTape.leftChest
    : jacketLayout.front.nameTape.rightChest;

  const sleevePatchLayout = jacketLayout.front.sleevePatch;
  const backLayout = jacketLayout.back;

  const displayFamilyName = familyName.trim() || "Family";
  const displayInitials = initials.trim() || "FR";
  const displayHeritage = heritage.trim() || "Heritage";
  const displaySymbol = symbol.trim() || selectedSymbol.name;
  const displayValue = value.trim() || "Legacy";
  const displayMotto = motto.trim() || "Fortis in Familia";

  const crestSpec = normalizeBuilderCrestSpec({
    animal: isCrestAnimal(displaySymbol) ? displaySymbol : "Lion",
    shield: normalizeShield(shield),
    crown: normalizeCrown(crown),
    heritage: displayHeritage,
    motto: displayMotto,
    initials: displayInitials,
    colors: {
      primary: "#1F2A1F",
      secondary: "#E8D7AE",
      metallic: finish === "Heritage Ivory" ? "silver" : "gold",
    },
    supporters: [],
    wreath: false,
    banner: true,
  });

  const sleevePatchText =
    heritage.trim().length >= 2
      ? heritage.trim().slice(0, 2).toUpperCase()
      : displayInitials.slice(0, 2).toUpperCase();

  const sleeveFinishClasses =
    finish === "Tactical Subdued"
      ? "border-[#777B63] bg-[#303429] text-[#A7AA91]"
      : finish === "Heritage Ivory"
        ? "border-[#E7D8B4] bg-[#24251F] text-[#E7D8B4]"
        : "border-[#B08D57] bg-[#20231C] text-[#B08D57]";

  return (
    <aside className="relative min-h-[720px] overflow-hidden border-t border-white/10 bg-[#20211E] lg:border-l lg:border-t-0">
      <div className="sticky top-0 flex min-h-[720px] items-center justify-center p-6 md:p-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(176,141,87,0.18),_transparent_65%)]" />

        <div className="relative w-full">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-[#B08D57]">
                Regiment Workshop
              </p>

              <p className="mt-2 text-sm text-[#77736A]">
                {jacketView} view · {embroideryFinish}
              </p>
            </div>

            <span className="rounded-full border border-[#B08D57]/30 bg-[#B08D57]/5 px-4 py-2 text-[10px] uppercase tracking-[0.25em] text-[#BDA16F]">
              In Progress
            </span>
          </div>

          <div className="relative mx-auto aspect-[4/5] w-full max-w-[540px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#181916] shadow-[0_35px_80px_rgba(0,0,0,0.35)]">
            <Image
              src={selectedJacket.image}
              alt={`${jacketView} view of the customized Regiment Jacket`}
              fill
              priority
              className="object-cover transition-opacity duration-300"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10" />

            {isFrontView && (
              <>
                {includeNameTape && (
                  <div
                    style={{
                      left: nameTapeLayout.left,
                      top: nameTapeLayout.top,
                      transform: isLeftChestActive
                        ? "translate(-50%, -50%) scale(1.03)"
                        : "translate(-50%, -50%)",
                    }}
                    className="absolute z-10 transition-transform duration-300"
                  >
                    <NameTape
                      name={displayFamilyName}
                      finish={finish}
                      active={isLeftChestActive}
                      className="min-w-[112px] px-3 py-1.5"
                    />
                  </div>
                )}

                <div
                  style={{
                    left: crestLayout.left,
                    top: crestLayout.top,
                    width: `${crestLayout.width}px`,
                    height: `${crestLayout.height}px`,
                    transform:
                      isLeftChestActive || isRightChestActive
                        ? "translate(-50%, -50%) scale(1.03)"
                        : "translate(-50%, -50%)",
                  }}
                  className="absolute z-10 transition-transform duration-300"
                >
                  <CrestPatch
                    crest={crestSpec}
                    finish={finish}
                    active={isLeftChestActive || isRightChestActive}
                    className="h-full min-h-0 w-full min-w-0 px-2 py-2"
                  />
                </div>

                {includeSleevePatch && (
                  <div
                    style={{
                      left: sleevePatchLayout.left,
                      top: sleevePatchLayout.top,
                      width: `${sleevePatchLayout.size}px`,
                      height: `${sleevePatchLayout.size}px`,
                      transform: isSleeveActive
                        ? "rotate(-5deg) scale(1.06)"
                        : "rotate(-5deg)",
                    }}
                    className={`absolute z-10 flex items-center justify-center rounded-full border-2 shadow-xl transition-all duration-300 ${sleeveFinishClasses} ${
                      isSleeveActive
                        ? "ring-2 ring-[#D4AF6A]/90 ring-offset-2 ring-offset-transparent drop-shadow-[0_0_14px_rgba(212,175,106,0.75)]"
                        : ""
                    }`}
                  >
                    <span className="text-[9px] font-bold uppercase tracking-[0.12em]">
                      {sleevePatchText}
                    </span>
                  </div>
                )}
              </>
            )}

            {!isFrontView && (
              <>
                <div
                  style={{
                    left: backLayout.topRocker.left,
                    top: backLayout.topRocker.top,
                    width: `${backLayout.topRocker.width}px`,
                    height: `${backLayout.topRocker.height}px`,
                    transform: isTopRockerActive
                      ? "translate(-50%, -50%) scale(1.04)"
                      : "translate(-50%, -50%)",
                  }}
                  className="absolute z-10 transition-transform duration-300"
                >
                  <RockerPatch
                    text={displayMotto}
                    position="top"
                    finish={finish}
                    active={isTopRockerActive}
                    className="h-full min-h-0 w-full min-w-0 px-2 py-1"
                  />
                </div>

                <div
                  style={{
                    left: backLayout.centerPatch.left,
                    top: backLayout.centerPatch.top,
                    width: `${backLayout.centerPatch.width}px`,
                    height: `${backLayout.centerPatch.height}px`,
                    transform: isBackCrestActive
                      ? "translate(-50%, -50%) scale(1.04)"
                      : "translate(-50%, -50%)",
                  }}
                  className="absolute z-10 transition-transform duration-300"
                >
                  <CrestPatch
                    crest={crestSpec}
                    finish={finish}
                    active={isBackCrestActive}
                    className="h-full min-h-0 w-full min-w-0 px-2 py-2"
                  />
                </div>

                <div
                  style={{
                    left: backLayout.bottomRocker.left,
                    top: backLayout.bottomRocker.top,
                    width: `${backLayout.bottomRocker.width}px`,
                    height: `${backLayout.bottomRocker.height}px`,
                    transform: isBottomRockerActive
                      ? "translate(-50%, -50%) scale(1.04)"
                      : "translate(-50%, -50%)",
                  }}
                  className="absolute z-10 transition-transform duration-300"
                >
                  <RockerPatch
                    text={`${displayFamilyName} Regiment`}
                    position="bottom"
                    finish={finish}
                    active={isBottomRockerActive}
                    className="h-full min-h-0 w-full min-w-0 px-2 py-1"
                  />
                </div>
              </>
            )}

            <div className="absolute bottom-5 left-5 right-5 z-20 flex items-end justify-between rounded-2xl border border-white/10 bg-black/40 px-5 py-4 backdrop-blur-md">
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

          <div className="mt-6 grid grid-cols-3 gap-3">
            <PreviewStat label="Heritage" value={displayHeritage} />
            <PreviewStat label="Heraldry" value={`${displaySymbol} · ${crestSpec.crown}`} />
            <PreviewStat label="Principle" value={displayValue} />
          </div>

          <p className="mt-6 text-center text-[10px] uppercase tracking-[0.3em] text-[#65625D]">
            Workshop concept · Final placement refined for production
          </p>
        </div>
      </div>
    </aside>
  );
}

function PreviewStat({ label, value }: PreviewStatProps) {
  return (
    <div className="min-w-0 rounded-xl border border-white/10 bg-white/[0.025] p-4">
      <p className="text-[8px] uppercase tracking-[0.25em] text-[#65625D]">
        {label}
      </p>

      <p className="mt-2 truncate text-xs text-[#D8D3CA]">{value}</p>
    </div>
  );
}

function normalizeFinish(finish: string): SupportedFinish {
  if (
    finish === "Tactical Subdued" ||
    finish === "Heritage Ivory" ||
    finish === "Regiment Gold"
  ) {
    return finish;
  }

  return "Regiment Gold";
}

function normalizeShield(value: string): BuilderShieldStyle {
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

function normalizeCrown(value: string): CrestCrown {
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
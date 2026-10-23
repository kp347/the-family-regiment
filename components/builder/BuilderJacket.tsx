"use client";

import { useState } from "react";
import { readHouseIdentity } from "@/lib/houseIdentity";
import IdentityShieldPatch, { PROFESSIONS, type Profession, type IdentityPatchFinish } from "./IdentityShieldPatch";
export type { Profession } from "./IdentityShieldPatch";
import Image from "next/image";
import { getMilitaryBranchCanonAsset } from "@/lib/herald/visualCanon/assets/militaryBranches";
import { getZodiacCanonAsset } from "@/lib/herald/visualCanon/assets/zodiac";

import {

  getHeritageFlagComponent,

  type HeritageFlagComponent,

} from "@/lib/herald/svg/flags/registry";

import { heritageFlagAssets } from "@/lib/herald/visualCanon/assets/heritageFlags";

import type { HeritageFlagVisualCanonAssetId } from "@/lib/herald/visualCanon/references";

export type JacketViewOption = {

  name: string;

  image: string;

};

export type EmbroideryFinishOption = {

  name: string;

  detail: string;

};

export type IdentityPatchCategory =

  | "None"

  | "Profession"

  | "Military Branch"

  | "Sport"

  | "Zodiac"

  | "Hometown"

  | "Family Value"

  | "Faith";

export type MilitaryBranch =

  | "None"

  | "Army"

  | "Navy"

  | "Air Force"

  | "Marine Corps"

  | "Coast Guard"

  | "Space Force";

export type Sport =

  | "None"

  | "American Football"

  | "Football (Soccer)"

  | "Baseball"

  | "Basketball"

  | "Hockey"

  | "Tennis"

  | "Golf"

  | "Running"

  | "Boxing"

  | "Martial Arts"

  | "Swimming";

export type ZodiacSign =

  | "None"

  | "Aries"

  | "Taurus"

  | "Gemini"

  | "Cancer"

  | "Leo"

  | "Virgo"

  | "Libra"

  | "Scorpio"

  | "Sagittarius"

  | "Capricorn"

  | "Aquarius"

  | "Pisces";

export type InterchangeableIdentityPatch =

  | { category: "Military Branch"; value: MilitaryBranch }

  | { category: "Sport"; value: Sport }
  | { category: "Profession"; value: Profession }

  | { category: "Zodiac"; value: ZodiacSign };

type BuilderJacketProps = {

  jacketView: string;

  embroideryFinish: string;

  nameTapeText: string;

  rightShoulderHeritage: string[];

  leftChestIdentity: IdentityPatchCategory;

  militaryBranch?: MilitaryBranch;

  sport?: Sport;
  profession?: Profession;

  zodiacSign?: ZodiacSign;

  additionalIdentityPatches?: InterchangeableIdentityPatch[];

  onAdditionalIdentityPatchesChange?: (patches: InterchangeableIdentityPatch[]) => void;

  heritageOptions: string[];

  jacketViews: JacketViewOption[];

  embroideryFinishes: EmbroideryFinishOption[];

  onJacketViewChange: (value: string) => void;

  onEmbroideryFinishChange: (value: string) => void;

  onNameTapeTextChange: (value: string) => void;

  onRightShoulderHeritageChange: (

    value: string[],

  ) => void;

  onLeftChestIdentityChange: (

    value: IdentityPatchCategory,

  ) => void;

  onMilitaryBranchChange?: (

    value: MilitaryBranch,

  ) => void;

  onProfessionChange?: (value: Profession) => void;
  onSportChange?: (

    value: Sport,

  ) => void;

  onZodiacSignChange?: (

    value: ZodiacSign,

  ) => void;

};

const militaryBranches: MilitaryBranch[] = [

  "Army",

  "Navy",

  "Air Force",

  "Marine Corps",

  "Coast Guard",

  "Space Force",

];

const zodiacSigns: ZodiacSign[] = [

  "Aries",

  "Taurus",

  "Gemini",

  "Cancer",

  "Leo",

  "Virgo",

  "Libra",

  "Scorpio",

  "Sagittarius",

  "Capricorn",

  "Aquarius",

  "Pisces",

];

export default function BuilderJacket({

  jacketView,

  embroideryFinish,

  nameTapeText,

  rightShoulderHeritage,

  leftChestIdentity,

  militaryBranch = "None",

  profession = "None",

  zodiacSign = "None",

  additionalIdentityPatches = [],

  onAdditionalIdentityPatchesChange,

  heritageOptions,

  jacketViews,

  embroideryFinishes,

  onJacketViewChange,

  onEmbroideryFinishChange,

  onNameTapeTextChange,

  onRightShoulderHeritageChange,

  onLeftChestIdentityChange,

  onMilitaryBranchChange,

  onProfessionChange,

  onZodiacSignChange,

}: BuilderJacketProps) {

  return (

    <div className="space-y-12">

      <BuilderGroup title="Jacket view">

        <OptionGrid>

          {jacketViews.map((option) => (

            <OptionButton

              key={option.name}

              active={

                jacketView === option.name

              }

              onClick={() =>

                onJacketViewChange(

                  option.name,

                )

              }

              title={`${option.name} view`}

              detail={getJacketViewDetail(

                option.name,

              )}

            />

          ))}

        </OptionGrid>

      </BuilderGroup>

      <BuilderGroup title="Regiment placement">

        <div className="rounded-2xl border border-[#B08D57]/20 bg-[#B08D57]/5 p-6">

          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#B08D57]">

            Four-Zone Jacket Canon

          </p>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#BDB7AC]">

            The Regiment Jacket separates family,

            heritage, personal identification, and

            individual identity into four deliberate

            garment positions.

          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">

            <PlacementStat

              label="Left Shoulder"

              value="Family Crest"

            />

            <PlacementStat

              label="Right Shoulder"

              value="Country / State Heritage"

            />

            <PlacementStat

              label="Right Chest"

              value="Name Tape"

            />

            <PlacementStat

              label="Left Chest"

              value={getLeftChestPlacementValue(

                leftChestIdentity,

                militaryBranch,

                profession,

                zodiacSign,

              )}

            />

          </div>

        </div>

      </BuilderGroup>

      <BuilderGroup title="Embroidery finish">

        <div className="space-y-4">

          {embroideryFinishes.map(

            (option) => {

              const active =

                embroideryFinish ===

                option.name;

              return (

                <button

                  key={option.name}

                  type="button"

                  onClick={() =>

                    onEmbroideryFinishChange(

                      option.name,

                    )

                  }

                  className={`w-full rounded-2xl border p-6 text-left transition ${

                    active

                      ? "border-[#B08D57] bg-[#B08D57]/10"

                      : "border-white/10 bg-white/[0.02] hover:border-white/25"

                  }`}

                >

                  <div className="flex items-center justify-between gap-6">

                    <div>

                      <p className="text-xl">

                        {option.name}

                      </p>

                      <p className="mt-2 text-sm leading-6 text-[#77736A]">

                        {option.detail}

                      </p>

                    </div>

                    <span className="shrink-0 text-xs uppercase tracking-[0.2em] text-[#B08D57]">

                      {active

                        ? "Selected"

                        : "Choose"}

                    </span>

                  </div>

                </button>

              );

            },

          )}

        </div>

      </BuilderGroup>

      <BuilderGroup title="Left shoulder · Family crest">

        <FixedPlacementCard

          eyebrow="Fixed Regiment Position"

          title="Family Crest"

          detail="Your family crest is permanently assigned to the left shoulder. It serves as the primary family and Regiment identifier across jackets."

        />

      </BuilderGroup>

      <BuilderGroup title="Right shoulder · Heritage">

        <div className="rounded-2xl border border-[#B08D57]/20 bg-[#B08D57]/5 p-5">

          <p className="text-sm leading-6 text-[#BDB7AC]">

            The right shoulder carries geographic

            and ancestral heritage. Country and

            state flags belong in this zone rather

            than competing with the Family Crest.

          </p>

        </div>

        <div className="mt-6">

          <ShoulderFlagSelector

            title="Right shoulder"

            value={

              rightShoulderHeritage

            }

            options={

              heritageOptions

            }

            onChange={

              onRightShoulderHeritageChange

            }

          />

        </div>

      </BuilderGroup>

      <BuilderGroup title="Right chest · Personal name tape">

        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">

          <p className="text-xs uppercase tracking-[0.24em] text-[#B08D57]">

            Your Personal Identity

          </p>

          <p className="mt-3 text-sm leading-6 text-[#77736A]">

            Your family crest carries your House Name. The name tape sits above the right chest pocket and can carry your first name, nickname, callsign, or surname instead. These two names do not need to match.

          </p>

          <label className="mt-6 block">

            <span className="text-[10px] uppercase tracking-[0.22em] text-[#77736A]">

              Name, nickname, or callsign

            </span>

            <input

              type="text"

              value={

                nameTapeText

              }

              onChange={(event) =>

                onNameTapeTextChange(

                  event.target.value,

                )

              }

              maxLength={18}

              placeholder="e.g. MAVERICK"

              className="mt-3 w-full rounded-xl border border-white/10 bg-[#151614] px-4 py-4 text-sm uppercase tracking-[0.18em] text-[#F6F2EA] outline-none transition placeholder:text-[#55524C] focus:border-[#B08D57]"

            />

          </label>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#B08D57]/20 bg-[#B08D57]/5 p-4">
            <p className="max-w-sm text-xs leading-5 text-[#BDB7AC]">
              Want the same name on your crest and name tape? Copy your House Name with one click.
            </p>
            <button
              type="button"
              onClick={() => onNameTapeTextChange(readHouseIdentity().familyName.slice(0, 18))}
              className="rounded-full border border-[#B08D57]/60 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#D4AF6A] transition hover:bg-[#B08D57]/10"
            >
              Use My House Name
            </button>
          </div>
          <p className="mt-3 text-xs leading-5 text-[#8D8981]">
            Example: House crest — FITZGERALD · Name tape — MAVERICK. Your current name tape remains unchanged unless you edit it.
          </p>

          <p className="mt-3 text-[9px] uppercase tracking-[0.18em] text-[#65625D]">

            Up to 18 characters

          </p>

      </div>

      </BuilderGroup>

      <BuilderGroup title="Left chest · Personal identity collection">

        <PersonalIdentityCollection

          primaryCategory={leftChestIdentity}

          militaryBranch={militaryBranch}

          profession={profession}
          finish={embroideryFinish}

          zodiacSign={zodiacSign}

          patches={additionalIdentityPatches}

          onPrimaryCategoryChange={onLeftChestIdentityChange}

          onMilitaryBranchChange={onMilitaryBranchChange}

          onProfessionChange={onProfessionChange}

          onZodiacSignChange={onZodiacSignChange}

          onPatchesChange={onAdditionalIdentityPatchesChange}

        />

      </BuilderGroup>

    </div>

  );

}

function getLeftChestPlacementValue(

  category: IdentityPatchCategory,

  militaryBranch: MilitaryBranch,

  profession: Profession,

  zodiacSign: ZodiacSign,

) {

  if (category === "None") {

    return "Identity Patch";

  }

  if (

    category === "Military Branch" &&

    militaryBranch !== "None"

  ) {

    return militaryBranch;

  }

  // Legacy Sports selections are no longer offered in V1.

  if (category === "Profession" && profession !== "None") return profession;

  if (

    category === "Zodiac" &&

    zodiacSign !== "None"

  ) {

    return zodiacSign;

  }

  return category;

}

function getJacketViewDetail(

  view: string,

) {

  switch (view) {

    case "Left ¾":

      return "Inspect right-shoulder heritage and right-chest identification from the three-quarter garment angle.";

    case "Right ¾":

      return "Inspect the Family Crest on the left shoulder while retaining a view of the chest.";

    case "Back":

      return "Inspect the rear construction and overall jacket silhouette.";

    case "Front":

    default:

      return "Inspect the name tape, left-chest identity patch, and overall Regiment placement.";

  }

}

type AvailableIdentityCategory = Exclude<InterchangeableIdentityPatch["category"], "Sport">;

function PersonalIdentityCollection({

  primaryCategory,

  militaryBranch,

  profession,
  finish,

  zodiacSign,

  patches,

  onPrimaryCategoryChange,

  onMilitaryBranchChange,

  onProfessionChange,

  onZodiacSignChange,

  onPatchesChange,

}: {

  primaryCategory: IdentityPatchCategory;

  militaryBranch: MilitaryBranch;

  profession: Profession;
  finish: string;

  zodiacSign: ZodiacSign;

  patches: InterchangeableIdentityPatch[];

  onPrimaryCategoryChange: (value: IdentityPatchCategory) => void;

  onMilitaryBranchChange?: (value: MilitaryBranch) => void;

  onProfessionChange?: (value: Profession) => void;

  onZodiacSignChange?: (value: ZodiacSign) => void;

  onPatchesChange?: (patches: InterchangeableIdentityPatch[]) => void;

}) {

  const visiblePatches = patches.filter(
    (patch): patch is Exclude<InterchangeableIdentityPatch, { category: "Sport" }> =>
      patch.category !== "Sport",
  );

  const patchFinish: IdentityPatchFinish = finish === "Tactical Subdued" || finish === "Heritage Ivory" ? finish : "Regiment Gold";

  const [mode, setMode] = useState<"primary" | "additional">("primary");

  const [browseCategory, setBrowseCategory] = useState<AvailableIdentityCategory>("Profession");

  const activeCategory: AvailableIdentityCategory =

    mode === "primary" &&

    (primaryCategory === "Military Branch" || primaryCategory === "Profession" || primaryCategory === "Zodiac")

      ? primaryCategory

      : browseCategory;

  const primaryValue =

    primaryCategory === "Military Branch" ? militaryBranch :

    primaryCategory === "Profession" ? profession :

    primaryCategory === "Zodiac" ? zodiacSign : "None";

  const selectedPrimary = primaryValue !== "None" &&

    (primaryCategory === "Military Branch" || primaryCategory === "Profession" || primaryCategory === "Zodiac");

  const options = activeCategory === "Military Branch" ? militaryBranches :

    activeCategory === "Profession" ? PROFESSIONS : zodiacSigns;

  const canSelectPrimary = activeCategory === "Military Branch" ? !!onMilitaryBranchChange :

    activeCategory === "Profession" ? !!onProfessionChange : !!onZodiacSignChange;

  function chooseCategory(category: AvailableIdentityCategory) {

    setBrowseCategory(category);

    if (mode === "primary") onPrimaryCategoryChange(category);

  }

  function choosePatch(value: string) {

    if (mode === "primary") {

      if (!canSelectPrimary) return;

      onPrimaryCategoryChange(activeCategory);

      if (activeCategory === "Military Branch") onMilitaryBranchChange?.(value as MilitaryBranch);

      if (activeCategory === "Profession") onProfessionChange?.(value as Profession);

      if (activeCategory === "Zodiac") onZodiacSignChange?.(value as ZodiacSign);

      // The same patch cannot be both the installed primary and an extra.

      if (onPatchesChange && visiblePatches.some(p => p.category === activeCategory && p.value === value)) {

        onPatchesChange(visiblePatches.filter(p => !(p.category === activeCategory && p.value === value)));

      }

      return;

    }

    if (!onPatchesChange || value === "None") return;

    const exists = visiblePatches.some(p => p.category === activeCategory && p.value === value);

    if (exists) {

      onPatchesChange(visiblePatches.filter(p => !(p.category === activeCategory && p.value === value)));

    } else {

      onPatchesChange([...visiblePatches, { category: activeCategory, value } as InterchangeableIdentityPatch]);

    }

  }

  function makePrimary(patch: Exclude<InterchangeableIdentityPatch, { category: "Sport" }>) {
    const previous = selectedPrimary
      ? { category: primaryCategory, value: primaryValue } as InterchangeableIdentityPatch
      : undefined;
    onPrimaryCategoryChange(patch.category);
    if (patch.category === "Military Branch") onMilitaryBranchChange?.(patch.value);
    if (patch.category === "Profession") onProfessionChange?.(patch.value);
    if (patch.category === "Zodiac") onZodiacSignChange?.(patch.value);
    const remaining = visiblePatches.filter(p => !(p.category === patch.category && p.value === patch.value));
    if (previous && previous.category !== "Sport" && !(previous.category === patch.category && previous.value === patch.value)) {
      remaining.unshift(previous);
    }
    onPatchesChange?.(remaining);
    setBrowseCategory(patch.category);
    setMode("primary");
  }

  function patchArtwork(patch: InterchangeableIdentityPatch): string | undefined {
    if (patch.category === "Military Branch") return getMilitaryBranchCanonAsset(patch.value)?.artworkSrc;
    if (patch.category === "Profession") return undefined;
    if (patch.category === "Zodiac") return getZodiacCanonAsset(patch.value)?.src;
    return undefined;
  }

  return (

    <div className="space-y-6">

      <div className="rounded-2xl border border-[#B08D57]/20 bg-[#B08D57]/5 p-5">

        <p className="text-sm leading-6 text-[#BDB7AC]">

          Choose the identity displayed on your left chest, then add optional patches to interchange at the same attachment position. Only one identity is worn at a time.

        </p>

      </div>

      <div className="grid gap-3 sm:grid-cols-2">

        <button type="button" onClick={() => { setMode("primary"); if (primaryCategory === "Military Branch" || primaryCategory === "Profession" || primaryCategory === "Zodiac") setBrowseCategory(primaryCategory); }}

          aria-pressed={mode === "primary"}

          className={`rounded-xl border p-5 text-left transition ${mode === "primary" ? "border-[#B08D57] bg-[#B08D57]/10" : "border-white/10 bg-[#151614] hover:border-white/25"}`}>

          <span className="block text-xs uppercase tracking-[0.2em] text-[#B08D57]">01 · On the jacket</span>

          <span className="mt-2 block text-lg text-[#F6F2EA]">Primary patch</span>

          <span className="mt-2 block text-sm text-[#8E8A81]">{selectedPrimary ? `${primaryCategory} · ${primaryValue}` : "Choose your primary identity"}</span>

        </button>

        <button type="button" onClick={() => setMode("additional")}

          aria-pressed={mode === "additional"}

          className={`rounded-xl border p-5 text-left transition ${mode === "additional" ? "border-[#B08D57] bg-[#B08D57]/10" : "border-white/10 bg-[#151614] hover:border-white/25"}`}>

          <span className="block text-xs uppercase tracking-[0.2em] text-[#B08D57]">02 · Interchangeable</span>

          <span className="mt-2 block text-lg text-[#F6F2EA]">Additional patches</span>

          <span className="mt-2 block text-sm text-[#8E8A81]">{visiblePatches.length} selected · supplied separately</span>

        </button>

      </div>

      {mode === "primary" && (

        <div className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-[#151614] p-4">

          <span className="text-sm text-[#BDB7AC]">{selectedPrimary ? `Currently displayed: ${primaryValue}` : "No primary identity selected"}</span>

          <button type="button" onClick={() => onPrimaryCategoryChange("None")}

            disabled={primaryCategory === "None"}

            className="text-xs text-[#B08D57] disabled:opacity-40">Clear primary</button>

        </div>

      )}

      <div>

        <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#B08D57]">Browse identity collection</p>

        <div className="flex flex-wrap gap-2">

          {(["Military Branch", "Profession", "Zodiac"] as const).map(category => (

            <button key={category} type="button" onClick={() => chooseCategory(category)}

              aria-pressed={activeCategory === category}

              className={`rounded-full border px-4 py-2.5 text-xs transition ${activeCategory === category ? "border-[#B08D57] bg-[#B08D57]/10 text-[#F6F2EA]" : "border-white/15 text-[#BDB7AC] hover:border-white/30"}`}>

              {category}

            </button>

          ))}

          {(["Faith"] as const).map(category => (

            <span key={category} title="Pending approved Canon artwork"

              className="rounded-full border border-white/10 px-4 py-2.5 text-xs text-[#77736A]">

              {category} · Coming soon

            </span>

          ))}

        </div>

      </div>

      <div className="grid gap-3 sm:grid-cols-2">

        {options.map(value => {

          const isPrimary = primaryCategory === activeCategory && primaryValue === value;

          const isExtra = visiblePatches.some(p => p.category === activeCategory && p.value === value);

          const active = mode === "primary" ? isPrimary : isExtra;

          const disabled = mode === "primary" ? !canSelectPrimary : !onPatchesChange || isPrimary;

          return (

            <button key={value} type="button" disabled={disabled} onClick={() => choosePatch(value)}

              aria-pressed={active || (mode === "additional" && isPrimary)}

              className={`rounded-xl border p-4 text-left transition ${active ? "border-[#B08D57] bg-[#B08D57]/10" : "border-white/10 bg-[#151614]"} ${disabled ? "cursor-not-allowed opacity-50" : "hover:border-[#B08D57]/60"}`}>

              <div className="mb-3 h-24 w-24">{activeCategory === "Profession" && <IdentityShieldPatch finish={patchFinish} label={value} />}</div>
              <span className="block text-sm text-[#E4DED3]">{value}</span>

              <span className="mt-2 block text-[9px] uppercase tracking-[0.16em] text-[#B08D57]">

                {isPrimary ? "Primary · On jacket" : mode === "primary" ? "Set as primary" : isExtra ? "Added · Click to remove" : "Add interchangeable patch"}

              </span>

            </button>

          );

        })}

      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-[#B08D57]">Your patch collection</p>
        <p className="mt-2 text-sm text-[#99958D]">One patch is worn on the jacket. Your additional patches are displayed here and can be swapped into the primary position.</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {selectedPrimary && (
            <div className="rounded-xl border border-[#B08D57]/50 bg-[#151614] p-4">
              <p className="text-[10px] uppercase tracking-wider text-[#B08D57]">On jacket · Primary</p>
              <div className="relative my-3 h-24 w-full">
                {primaryCategory === "Profession" ? (
                  <IdentityShieldPatch finish={patchFinish} label={primaryValue} />
                ) : patchArtwork({ category: primaryCategory, value: primaryValue } as InterchangeableIdentityPatch) && (
                  <Image src={patchArtwork({ category: primaryCategory, value: primaryValue } as InterchangeableIdentityPatch)!} alt={`${primaryValue} patch`} fill sizes="180px" className="object-contain" />
                )}
              </div>
              <p className="text-sm text-[#E4DED3]">{primaryValue}</p>
              <p className="mt-1 text-xs text-[#77736A]">{primaryCategory}</p>
            </div>
          )}
          {visiblePatches.map(patch => (
            <div key={`${patch.category}:${patch.value}`} className="rounded-xl border border-white/10 bg-[#151614] p-4">
              <p className="text-[10px] uppercase tracking-wider text-[#B08D57]">Interchangeable · Additional</p>
              <div className="relative my-3 h-24 w-full">
                {patch.category === "Profession" ? (
                  <IdentityShieldPatch finish={patchFinish} label={patch.value} />
                ) : patchArtwork(patch) && (
                  <Image src={patchArtwork(patch)!} alt={`${patch.value} patch`} fill sizes="180px" className="object-contain" />
                )}
              </div>
              <p className="text-sm text-[#E4DED3]">{patch.value}</p>
              <p className="mt-1 text-xs text-[#77736A]">{patch.category}</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <button type="button" onClick={() => makePrimary(patch)}
                  disabled={!onPatchesChange}
                  className="rounded-full border border-[#B08D57]/60 px-3 py-2 text-[10px] uppercase tracking-wider text-[#D4AF6A] disabled:opacity-40">Make primary</button>
                <button type="button" disabled={!onPatchesChange}
                  onClick={() => onPatchesChange?.(visiblePatches.filter(p => !(p.category === patch.category && p.value === patch.value)))}
                  className="px-2 py-2 text-xs text-[#99958D] disabled:opacity-40">Remove</button>
              </div>
            </div>
          ))}
        </div>
        {!selectedPrimary && visiblePatches.length === 0 && <p className="mt-4 text-sm text-[#77736A]">No identity patches selected.</p>}
        <p className="mt-4 text-xs leading-5 text-[#77736A]">Additional patches are saved to your draft. Checkout pricing and fulfillment are not yet connected.</p>
      </div>

    </div>

  );

}

function ShoulderFlagSelector({

  title,

  value,

  options,

  onChange,

}: {

  title: string;

  value: string[];

  options: string[];

  onChange: (value: string[]) => void;

}) {

  const MAX_HERITAGE_FLAGS = 3;

  function toggleFlag(option: string) {

    const active = value.includes(option);

    if (active) {

      onChange(

        value.filter(

          (item) => item !== option,

        ),

      );

      return;

    }

    if (

      value.length >=

      MAX_HERITAGE_FLAGS

    ) {

      return;

    }

    onChange([

      ...value,

      option,

    ]);

  }

  return (

    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">

      <div className="flex items-start justify-between gap-4">

        <div>

          <p className="text-xs uppercase tracking-[0.24em] text-[#B08D57]">

            {title}

          </p>

          <p className="mt-2 text-sm text-[#77736A]">

            {value.length > 0

              ? value.join(" · ")

              : "No heritage flags selected"}

          </p>

          <p className="mt-2 text-[9px] uppercase tracking-[0.18em] text-[#65625D]">

            {value.length} /{" "}

            {MAX_HERITAGE_FLAGS} selected

          </p>

        </div>

        {value.length > 0 ? (

          <button

            type="button"

            onClick={() =>

              onChange([])

            }

            className="shrink-0 rounded-full border border-white/15 px-3 py-1.5 text-[9px] uppercase tracking-[0.18em] text-[#BDB7AC] transition hover:border-[#B08D57] hover:text-[#B08D57]"

          >

            Clear

          </button>

        ) : (

          <span className="rounded-full border border-white/10 px-3 py-1.5 text-[9px] uppercase tracking-[0.18em] text-[#77736A]">

            None

          </span>

        )}

      </div>

      <div className="mt-4 rounded-xl border border-[#B08D57]/20 bg-[#B08D57]/5 px-4 py-3">

        <p className="text-xs leading-5 text-[#8D8981]">

          Select up to three individual country,

          state, or province flags. Each selection

          remains its own reusable heritage patch.

        </p>

      </div>

      <div className="mt-5 grid max-h-[420px] grid-cols-2 gap-3 overflow-y-auto pr-1">

        {options.map((option) => {

          const active =

            value.includes(option);

          const atLimit =

            value.length >=

              MAX_HERITAGE_FLAGS &&

            !active;

          const Flag =

            getFlagComponent(

              option,

            );

          return (

            <button

              key={option}

              type="button"

              onClick={() =>

                toggleFlag(

                  option,

                )

              }

              disabled={atLimit}

              aria-pressed={

                active

              }

              className={`rounded-xl border p-3 text-left transition ${

                active

                  ? "border-[#B08D57] bg-[#B08D57]/10"

                  : atLimit

                    ? "cursor-not-allowed border-white/5 bg-[#151614] opacity-40"

                    : "border-white/10 bg-[#151614] hover:border-white/25"

              }`}

            >

              <div className="flex h-14 items-center justify-center overflow-hidden rounded-lg bg-[#777777] p-2">

                {Flag ? (

                  <Flag

                    width="100%"

                    height="100%"

                    title={`Flag of ${option}`}

                  />

                ) : (

                  <span className="text-[10px] uppercase tracking-[0.18em] text-white/70">

                    Flag

                  </span>

                )}

              </div>

              <p className="mt-3 truncate text-xs text-[#E4DED3]">

                {option}

              </p>

              <p className="mt-1 text-[8px] uppercase tracking-[0.18em] text-[#77736A]">

                {active

                  ? "Selected"

                  : atLimit

                    ? "Limit reached"

                    : "Choose"}

              </p>

            </button>

          );

        })}

      </div>

    </div>

  );

}

function getFlagComponent(

  heritage: string,

): HeritageFlagComponent | undefined {

  const asset =

    heritageFlagAssets.find(

      (candidate) =>

        candidate.countryName ===

        heritage,

    );

  if (!asset) {

    return undefined;

  }

  return getHeritageFlagComponent(

    asset.id as HeritageFlagVisualCanonAssetId,

  );

}

function FixedPlacementCard({

  eyebrow,

  title,

  detail,

}: {

  eyebrow: string;

  title: string;

  detail: string;

}) {

  return (

    <div className="rounded-2xl border border-[#B08D57]/30 bg-[#B08D57]/5 p-6">

      <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-[#B08D57]">

        {eyebrow}

      </p>

      <p className="mt-3 text-xl text-[#F6F2EA]">

        {title}

      </p>

      <p className="mt-2 max-w-xl text-sm leading-6 text-[#8D8981]">

        {detail}

      </p>

      <div className="mt-5 inline-flex rounded-full border border-[#B08D57]/30 px-3 py-1.5 text-[9px] uppercase tracking-[0.2em] text-[#BDA16F]">

        Locked Position

      </div>

    </div>

  );

}

function PlacementStat({

  label,

  value,

}: {

  label: string;

  value: string;

}) {

  return (

    <div className="rounded-xl border border-white/10 bg-[#151614] p-4">

      <p className="text-[8px] uppercase tracking-[0.2em] text-[#65625D]">

        {label}

      </p>

      <p className="mt-2 text-sm text-[#E4DED3]">

        {value}

      </p>

    </div>

  );

}

function BuilderGroup({

  title,

  children,

}: {

  title: string;

  children: React.ReactNode;

}) {

  return (

    <div>

      <p className="mb-5 text-xs uppercase tracking-[0.3em] text-[#B08D57]">

        {title}

      </p>

      {children}

    </div>

  );

}

function OptionGrid({

  children,

}: {

  children: React.ReactNode;

}) {

  return (

    <div className="grid gap-4 sm:grid-cols-2">

      {children}

    </div>

  );

}

function OptionButton({

  active,

  onClick,

  title,

  detail,

}: {

  active: boolean;

  onClick: () => void;

  title: string;

  detail: string;

}) {

  return (

    <button

      type="button"

      onClick={onClick}

      className={`min-h-32 rounded-2xl border p-6 text-left transition ${

        active

          ? "border-[#B08D57] bg-[#B08D57]/10"

          : "border-white/10 bg-white/[0.02] hover:border-white/25"

      }`}

    >

      <p className="text-xl">

        {title}

      </p>

      <p className="mt-2 text-sm leading-6 text-[#77736A]">

        {detail}

      </p>

    </button>

  );

}

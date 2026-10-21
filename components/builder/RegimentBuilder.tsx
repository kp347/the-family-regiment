"use client";
import { useRouter } from "next/navigation";
import {
  useEffect,
  useMemo,
  useState,
} from "react";
import BuilderHeader from "./BuilderHeader";
import BuilderHeraldry from "./BuilderHeraldry";
import BuilderHeritage from "./BuilderHeritage";
import BuilderIdentity from "./BuilderIdentity";
import BuilderJacket, {
  type IdentityPatchCategory,
  type InterchangeableIdentityPatch,
  type MilitaryBranch,
  type Profession,
  type ZodiacSign,
} from "./BuilderJacket";
import BuilderMotto from "./BuilderMotto";
import { PROFESSIONS } from "./IdentityShieldPatch";
import BuilderPreview from "./BuilderPreview";
import BuilderStepper from "./BuilderStepper";
import BuilderSummary from "./BuilderSummary";
import BuilderValues from "./BuilderValues";
import {
  MOTTO_LIBRARY,
  findMottosByValues,
} from "@/lib/herald/motto";
import type {
  HeraldDesign,
  HeraldQuadrant,
  HeraldShieldComposition,
} from "@/lib/herald/design";
import {
  HOUSE_IDENTITY_KEY,
  readHouseIdentity,
  saveHouseIdentity,
  type HouseIdentity,
} from "@/lib/houseIdentity";
import { heritageFlagAssets } from "@/lib/herald/visualCanon/assets/heritageFlags";
import type { HeritageFlagVisualCanonAssetId } from "@/lib/herald/visualCanon/references";
import {
  isBuilderShieldStyle,
  isCrestAnimal,
  isCrestCrown,
  toEmbroideryFinish,
  type BuilderEmbroideryFinish,
  type BuilderShieldStyle,
  type CrestAnimal,
  type CrestCrown,
} from "@/lib/herald/types";
function normalizeAdditionalIdentityPatches(value: unknown): InterchangeableIdentityPatch[] {
  if (!Array.isArray(value)) return [];
  const result: InterchangeableIdentityPatch[] = [];
  const seen = new Set<string>();
  for (const item of value) {
    if (!item || typeof item !== "object") continue;
    const candidate = item as { category?: unknown; value?: unknown };
    if (typeof candidate.value !== "string") continue;
    let patch: InterchangeableIdentityPatch | undefined;
    if (candidate.category === "Military Branch") {
      const normalized = normalizeMilitaryBranch(candidate.value as MilitaryBranch);
      if (normalized !== "None") patch = { category: "Military Branch", value: normalized };
    } else if (candidate.category === "Profession") {
      const normalized = normalizeProfession(candidate.value);
      if (normalized !== "None") patch = { category: "Profession", value: normalized };
    } else if (candidate.category === "Zodiac") {
      const normalized = normalizeZodiacSign(candidate.value as ZodiacSign);
      if (normalized !== "None") patch = { category: "Zodiac", value: normalized };
    }
    if (!patch) continue;
    const key = `${patch.category}:${patch.value}`;
    if (!seen.has(key)) { seen.add(key); result.push(patch); }
  }
  return result;
}

type BuilderDraft = {
  familyName: string;
  initials: string;
  heritage: string;
  animal: string;
  shield: string;
  crown: string;
  value: string;
  motto: string;
  jacketView: string;
  embroideryFinish: string;
  nameTapeText: string;
  rightShoulderHeritage: string[];
  leftChestIdentity: IdentityPatchCategory;
  /** Extra purchased patches, not additional garment positions. */
  additionalIdentityPatches: InterchangeableIdentityPatch[];
militaryBranch: MilitaryBranch;
  profession: Profession;
  zodiacSign: ZodiacSign;
  /**
   \* Temporary five-zone fields retained only for migration of
   \* drafts saved during the jacket-placement transition.
   */
  rightPocketIdentity?: IdentityPatchCategory;
  leftPocketIdentity?: IdentityPatchCategory;
  composition?: HeraldShieldComposition;
  /**
   \* Legacy fields retained only for migration of older
   \* localStorage drafts.
   */
  crestPlacement?: string;
  includeNameTape?: boolean;
  leftShoulderHeritage?: string;
  includeSleevePatch?: boolean;
};
const steps = [
  {
    number: "01",
    name: "Identity",
    description:
      "Add the family name and monogram carried by your regiment.",
  },
  {
    number: "02",
    name: "Heritage",
    description:
      "Choose the place or culture that anchors your family story.",
  },
  {
    number: "03",
    name: "Heraldry",
    description:
      "Choose the heraldic form, then compose the fields that tell your family story.",
  },
  {
    number: "04",
    name: "Values",
    description:
      "Choose the principle your family stands behind.",
  },
  {
    number: "05",
    name: "Motto",
    description:
      "Select the phrase carried beneath your crest.",
  },
  {
    number: "06",
    name: "Jacket",
    description:
      "Assign family, heritage, name, and personal identity to the Regiment Jacket.",
  },
  {
    number: "07",
    name: "Regiment",
    description:
      "Review the identity that will guide your finished heirloom.",
  },
];
const heritageOptions = heritageFlagAssets.map(
  (asset) => asset.countryName,
);
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
const symbolOptions = [
  {
    name: "Lion",
    character: "♌",
    meaning:
      "Courage, leadership, and noble strength.",
  },
  {
    name: "Eagle",
    character: "◆",
    meaning:
      "Vision, independence, and aspiration.",
  },
  {
    name: "Stag",
    character: "♜",
    meaning:
      "Endurance, dignity, and guardianship.",
  },
  {
    name: "Wolf",
    character: "◇",
    meaning:
      "Loyalty, instinct, and family unity.",
  },
  {
    name: "Bear",
    character: "●",
    meaning:
      "Protection, resilience, and strength.",
  },
];
const valueOptions = [
  "Courage",
  "Honor",
  "Unity",
  "Legacy",
  "Resilience",
  "Service",
];
const jacketViews = [
  {
    name: "Front",
    image:
      "/images/products/studio/jacket-front-clean.png",
  },
  {
    name: "Left ¾",
    image:
      "/images/products/studio/jacket-left-three-quarter-clean.png",
  },
];
const embroideryFinishes = [
  {
    name: "Regiment Gold",
    detail:
      "Black and antique gold for the primary Regiment presentation.",
  },
  {
    name: "Tactical Subdued",
    detail:
      "Black and olive-drab treatment inspired by subdued field insignia.",
  },
  {
    name: "Heritage Ivory",
    detail:
      "Charcoal and warm ivory for a restrained heritage presentation.",
  },
];
function createDefaultComposition(
  _heritage: string,
  animal: string,
  value: string,
): HeraldShieldComposition {
  return {
    layout: "quartered",
    quadrants: [
      {
        id: "I",
        type: "empty",
      },
      createAnimalQuadrant(animal),
      {
        id: "III",
        type: "symbol",
        label: value,
        meaning: value,
      },
      {
        id: "IV",
        type: "empty",
      },
    ],
  };
}
function createAnimalQuadrant(
  animal: string,
): HeraldQuadrant {
  const assetId =
    getAnimalAssetId(animal);
  return {
    id: "II",
    type: "animal",
    label: animal,
    assetId,
    variantId:
      animal === "Lion"
        ? "rampant"
        : undefined,
  };
}
function getAnimalAssetId(
  animal: string,
):
  | "lion"
  | "eagle"
  | "wolf"
  | "bear"
  | "stag"
  | "griffin"
  | "salmon"
  | undefined {
  switch (animal) {
    case "Lion":
      return "lion";
    case "Eagle":
      return "eagle";
    case "Wolf":
      return "wolf";
    case "Bear":
      return "bear";
    case "Stag":
      return "stag";
    case "Griffin":
      return "griffin";
    case "Salmon":
      return "salmon";
    default:
      return undefined;
  }
}
const defaultDraft: BuilderDraft = {
  familyName: "Laurent",
  initials: "LR",
  heritage: "France",
  animal: "Lion",
  shield: "Heater Shield",
  /**
   \* Crown is no longer part of the customer-facing
   \* V1 crest presentation.
   */
  crown: "None",
  value: "Courage",
  motto: "Fortes Fortuna Adiuvat",
  jacketView: "Front",
  embroideryFinish: "Regiment Gold",
  nameTapeText: "Laurent",
  /**
   \* Heritage belongs on the right shoulder.
   */
  rightShoulderHeritage: ["France"],
  /**
   \* V1 has one personal identity zone on the left chest.
   */
  leftChestIdentity: "None",
  additionalIdentityPatches: [],
militaryBranch: "None",
  profession: "None",
  zodiacSign: "None",
  composition:
    createDefaultComposition(
      "France",
      "Lion",
      "Courage",
    ),
};
export default function RegimentBuilder() {
  const router =
    useRouter();
  const [
    currentStep,
    setCurrentStep,
  ] = useState(0);
  const [
    familyName,
    setFamilyName,
  ] = useState(
    defaultDraft.familyName,
  );
  const [
    initials,
    setInitials,
  ] = useState(
    defaultDraft.initials,
  );
  const [
    heritage,
    setHeritage,
  ] = useState(
    defaultDraft.heritage,
  );
  const [
    animal,
    setAnimal,
  ] = useState(
    defaultDraft.animal,
  );
  const [
    shield,
    setShield,
  ] = useState(
    defaultDraft.shield,
  );
  const [
    crown,
    setCrown,
  ] = useState(
    defaultDraft.crown,
  );
  const [
    value,
    setValue,
  ] = useState(
    defaultDraft.value,
  );
  const [
    motto,
    setMotto,
  ] = useState(
    defaultDraft.motto,
  );
  const [
    jacketView,
    setJacketView,
  ] = useState(
    defaultDraft.jacketView,
  );
  const [
    embroideryFinish,
    setEmbroideryFinish,
  ] = useState(
    defaultDraft.embroideryFinish,
  );
  const [
    nameTapeText,
    setNameTapeText,
  ] = useState(
    defaultDraft.nameTapeText,
  );
  const [
    rightShoulderHeritage,
    setRightShoulderHeritage,
  ] = useState(
    defaultDraft.rightShoulderHeritage,
  );
  const [
    leftChestIdentity,
    setLeftChestIdentity,
  ] = useState<IdentityPatchCategory>(
    defaultDraft.leftChestIdentity,
  );
const [
  militaryBranch,
  setMilitaryBranch,
] = useState<MilitaryBranch>(
  defaultDraft.militaryBranch,
);

  const [profession, setProfession] = useState<Profession>(defaultDraft.profession);
  const [
    zodiacSign,
    setZodiacSign,
  ] = useState<ZodiacSign>(
    defaultDraft.zodiacSign,
  );
  const [additionalIdentityPatches, setAdditionalIdentityPatches] =
    useState<InterchangeableIdentityPatch[]>(defaultDraft.additionalIdentityPatches);
  const [
    composition,
    setComposition,
  ] =
    useState<HeraldShieldComposition>(
      () =>
        defaultDraft.composition ??
        createDefaultComposition(
          defaultDraft.heritage,
          defaultDraft.animal,
          defaultDraft.value,
        ),
    );
  const [
    draftLoaded,
    setDraftLoaded,
  ] = useState(false);
  const [
    saveMessage,
    setSaveMessage,
  ] = useState("");
  const [designCreatedAt] =
    useState(
      () =>
        new Date().toISOString(),
    );
      const availableMottos = useMemo(
  () =>
    findMottosByValues(
      [value],
      3,
    ),
  [value],
);

const selectedMotto =
  MOTTO_LIBRARY.find(
    (entry) =>
      entry.latin === motto,
  );
  const regimentTitle =
    familyName.trim()
      ? `The House of ${familyName.trim()}`
      : `The ${heritage} ${animal}`;
  const heraldDesign =
    useMemo<HeraldDesign>(() => {
      const resolvedAnimal =
        normalizeAnimal(animal);
      const resolvedShield =
        normalizeShield(shield);
      const resolvedCrown =
        normalizeCrown(crown);
      const resolvedFinish =
        normalizeEmbroideryFinish(
          embroideryFinish,
        );
      const colors =
        getDesignColors(
          resolvedFinish,
        );
      return {
        version: 1,
        familyName:
          familyName.trim() ||
          "Family",
        shield:
          resolvedShield,
        primaryCharge:
          resolvedAnimal,
        supporters: [],
        crown:
          resolvedCrown,
        wreath: false,
        banner: true,
        motto: {
  latin:
    motto.trim(),
  english:
    selectedMotto?.english ??
    "",
},
        colors,
        composition,
        patch: {
          border:
            "merrow",
          backing:
            "hook-loop",
          size: 4,
        },
        embroidery: {
          finish:
            toEmbroideryFinish(
              resolvedFinish,
            ),
        },
        metadata: {
          createdAt:
            designCreatedAt,
          updatedAt:
            new Date().toISOString(),
          canonVersion:
            "1.0.0",
          approved:
            false,
        },
      };
    }, [
      animal,
      shield,
      crown,
      embroideryFinish,
      familyName,
motto,
selectedMotto,
composition,
designCreatedAt,
    ]);
  function applySharedIdentity(identity: HouseIdentity) {
    setFamilyName(identity.familyName);
    setInitials(identity.initials);
    setAnimal(identity.animal);
    setShield(identity.shield);
    setMotto(identity.motto);
    setComposition((current) => ({
      ...current,
      quadrants: current.quadrants.map((quadrant) =>
        quadrant.id === "II" && quadrant.type === "animal"
          ? createAnimalQuadrant(identity.animal)
          : quadrant,
      ) as HeraldShieldComposition["quadrants"],
    }));
  }

  useEffect(() => {
    const savedDraft =
      window.localStorage.getItem(
        "family-regiment-draft",
      );
    if (savedDraft) {
      try {
        const parsedDraft =
          JSON.parse(
            savedDraft,
          ) as Partial<
            Omit<BuilderDraft, "rightShoulderHeritage">
          > & {
            rightShoulderHeritage?: string | string[];
            symbol?: string;
          };
        const loadedHeritage =
          parsedDraft.heritage ??
          defaultDraft.heritage;
        const loadedAnimal =
          parsedDraft.animal ??
          parsedDraft.symbol ??
          defaultDraft.animal;
        const loadedValue =
          parsedDraft.value ??
          defaultDraft.value;
        setFamilyName(
          parsedDraft.familyName ??
            defaultDraft.familyName,
        );
        setInitials(
          parsedDraft.initials ??
            defaultDraft.initials,
        );
        setHeritage(
          loadedHeritage,
        );
        setAnimal(
          loadedAnimal,
        );
        setShield(
          normalizeLegacyShieldValue(
            parsedDraft.shield ??
              defaultDraft.shield,
          ),
        );
        setCrown(
          normalizeLegacyCrownValue(
            parsedDraft.crown ??
              defaultDraft.crown,
          ),
        );
        setValue(
          loadedValue,
        );
        setMotto(
          parsedDraft.motto ??
            defaultDraft.motto,
        );
        setJacketView(
          "Front",
        );
        setEmbroideryFinish(
          parsedDraft.embroideryFinish ??
            defaultDraft.embroideryFinish,
        );
        /**
         \* JACKET V1 MIGRATION
         \*
         \* Old drafts only stored whether a family name tape
         \* was included. They did not store independent tape
         \* text.
         \*
         \* When no new nameTapeText exists, use the saved
         \* family name. This preserves the old visible result
         \* without interpreting any unrelated field.
         */
        const migratedNameTapeText =
          typeof parsedDraft.nameTapeText ===
            "string"
            ? parsedDraft.nameTapeText
            : parsedDraft.includeNameTape ===
                false
              ? ""
              : parsedDraft.familyName ??
                defaultDraft.familyName;
        setNameTapeText(
          migratedNameTapeText,
        );
        /**
         \* Heritage now has one canonical garment position:
         \* the right shoulder.
         \*
         \* New drafts already store rightShoulderHeritage.
         \*
         \* For legacy drafts, an explicitly selected
         \* right-shoulder heritage remains authoritative.
         \*
         \* If no right-shoulder value existed, an old
         \* leftShoulderHeritage value can safely migrate to
         \* the right shoulder because both fields represent
         \* the same heritage-flag concept; only the garment
         \* position has changed.
         \*
         \* We do NOT interpret old crestPlacement as heritage.
         */
        const migratedRightShoulderHeritage =
          normalizeRightShoulderHeritage(
            parsedDraft.rightShoulderHeritage ??
              parsedDraft.leftShoulderHeritage ??
              (parsedDraft.includeSleevePatch
                ? loadedHeritage
                : defaultDraft.rightShoulderHeritage),
          );
        setRightShoulderHeritage(
          migratedRightShoulderHeritage,
        );
        /**
         \* FOUR-ZONE V1 MIGRATION
         \*
         \* The temporary five-zone build stored two chest identity
         \* fields. Only the former left-pocket identity represents
         \* the same semantic zone as the locked left-chest identity.
         \* The temporary right-pocket identity is intentionally
         \* discarded rather than remapped.
         */
        setLeftChestIdentity(
          normalizeIdentityPatchCategory(
            parsedDraft.leftChestIdentity ??
              parsedDraft.leftPocketIdentity,
          ),
        );
        setAdditionalIdentityPatches(
          normalizeAdditionalIdentityPatches(parsedDraft.additionalIdentityPatches),
        );
        const loadedComposition =
          parsedDraft.composition ??
          createDefaultComposition(
            loadedHeritage,
            loadedAnimal,
            loadedValue,
          );

        setMilitaryBranch(
          normalizeMilitaryBranch(
            parsedDraft.militaryBranch,
          ),
        );

        setProfession(normalizeProfession(parsedDraft.profession));
        setZodiacSign(
          normalizeZodiacSign(
            parsedDraft.zodiacSign,
          ),
        );
        const migratedComposition:
          HeraldShieldComposition = {
          ...loadedComposition,
          quadrants:
            loadedComposition.quadrants.map(
              (quadrant) => {
                /**
                 \* Older Builder drafts automatically
                 \* inserted the selected heritage flag
                 \* into Quadrant I.
                 \*
                 \* Heritage now belongs to the independent
                 \* right-shoulder heritage zone.
                 \*
                 \* Remove only that legacy auto-generated
                 \* heritage field. Other quadrant choices
                 \* remain untouched.
                 */
                if (
                  quadrant.id === "I" &&
                  quadrant.type ===
                    "heritage" &&
                  (
                    quadrant.heritage ===
                      loadedHeritage ||
                    quadrant.assetId ===
                      getHeritageAssetId(
                        loadedHeritage,
                      )
                  )
                ) {
                  return {
                    id: "I",
                    type: "empty",
                  };
                }
                return quadrant;
              },
            ) as HeraldShieldComposition["quadrants"],
        };
        setComposition(
          migratedComposition,
        );
      } catch {
        window.localStorage.removeItem(
          "family-regiment-draft",
        );
      }
    }
    // The shared House identity is authoritative. Existing jacket-only
    // customization is restored above and remains independent.
    applySharedIdentity(readHouseIdentity());
    setDraftLoaded(true);
  }, []);

  useEffect(() => {
    if (!draftLoaded) return;

    function refreshHouseIdentity() {
      const identity = readHouseIdentity();
      // Avoid replacing in-progress edits unless another builder
      // actually changed the shared House record.
      let saved: string | null = null;
      try {
        saved = window.localStorage.getItem(HOUSE_IDENTITY_KEY);
      } catch {
        return;
      }
      if (!saved) return;
      try {
        const parsed = JSON.parse(saved) as Partial<HouseIdentity>;
        if (
          parsed.familyName !== familyName ||
          parsed.initials !== initials ||
          parsed.animal !== animal ||
          parsed.shield !== shield ||
          parsed.motto !== motto
        ) {
          applySharedIdentity(identity);
        }
      } catch {
        // Invalid shared storage is ignored.
      }
    }

    function onStorage(event: StorageEvent) {
      if (event.key === HOUSE_IDENTITY_KEY) refreshHouseIdentity();
    }

    window.addEventListener("focus", refreshHouseIdentity);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("focus", refreshHouseIdentity);
      window.removeEventListener("storage", onStorage);
    };
  }, [draftLoaded, familyName, initials, animal, shield, motto]);
  useEffect(() => {
    if (!draftLoaded) {
      return;
    }
    window.localStorage.setItem(
      "family-regiment-draft",
      JSON.stringify(
        createDraft(),
      ),
    );
    saveHouseIdentity({
      familyName,
      initials,
      motto,
      animal,
      shield: normalizeShield(shield),
    });
  }, [
    draftLoaded,
    familyName,
    initials,
    heritage,
    animal,
    shield,
    crown,
    value,
    motto,
    jacketView,
    embroideryFinish,
    nameTapeText,
    rightShoulderHeritage,
leftChestIdentity,
militaryBranch,
    profession,
    zodiacSign,
    additionalIdentityPatches,
    composition,
  ]);
  function createDraft():
    BuilderDraft {
    return {
      familyName,
      initials,
      heritage,
      animal,
      shield,
      crown,
      value,
      motto,
      jacketView,
      embroideryFinish,
      nameTapeText,
      rightShoulderHeritage,
      leftChestIdentity,
militaryBranch,
        profession,
      zodiacSign,
      additionalIdentityPatches,
      composition,
    };
  }
  function chooseHeritage(
  nextHeritages: string[],
) {
  const normalizedHeritages =
    normalizeRightShoulderHeritage(
      nextHeritages,
    );
  setRightShoulderHeritage(
    normalizedHeritages,
  );
  if (normalizedHeritages[0]) {
    setHeritage(
      normalizedHeritages[0],
    );
  }
}
  function chooseAnimal(
    nextAnimal: string,
  ) {
    setAnimal(
      nextAnimal,
    );
    setComposition(
      (current) => ({
        ...current,
        quadrants:
          current.quadrants.map(
            (quadrant) => {
              if (
                quadrant.id !==
                "II"
              ) {
                return quadrant;
              }
              return createAnimalQuadrant(
                nextAnimal,
              );
            },
          ) as HeraldShieldComposition["quadrants"],
      }),
    );
  }
  function chooseValue(
    nextValue: string,
  ) {
    setValue(
      nextValue,
    );
        setComposition(
      (current) => ({
        ...current,
        quadrants:
          current.quadrants.map(
            (quadrant) => {
              if (
                quadrant.id !==
                "III"
              ) {
                return quadrant;
              }
              return {
                ...quadrant,
                type:
                  "symbol",
                label:
                  nextValue,
                meaning:
                  nextValue,
              };
            },
          ) as HeraldShieldComposition["quadrants"],
      }),
    );
  }
  function nextStep() {
    setCurrentStep(
      (step) =>
        Math.min(
          step + 1,
          steps.length - 1,
        ),
    );
  }
  function previousStep() {
    setCurrentStep(
      (step) =>
        Math.max(
          step - 1,
          0,
        ),
    );
  }
  function saveDraft() {
    window.localStorage.setItem(
      "family-regiment-draft",
      JSON.stringify(
        createDraft(),
      ),
    );
    saveHouseIdentity({
      familyName,
      initials,
      motto,
      animal,
      shield: normalizeShield(shield),
    });
    showMessage(
      "Draft saved",
    );
  }
  function createCrest() {
    saveDraft();
    window.localStorage.setItem(
      "family-regiment-herald-design",
      JSON.stringify(
        heraldDesign,
      ),
    );
    router.push(
      "/studio",
    );
  }
  function resetDraft() {
    const sharedHouse = readHouseIdentity();
    setFamilyName(sharedHouse.familyName);
    setInitials(sharedHouse.initials);
    setHeritage(
      defaultDraft.heritage,
    );
    setAnimal(sharedHouse.animal);
    setShield(sharedHouse.shield);
    setCrown(
      defaultDraft.crown,
    );
    setValue(
      defaultDraft.value,
    );
    setMotto(sharedHouse.motto);
    setJacketView(
      defaultDraft.jacketView,
    );
    setEmbroideryFinish(
      defaultDraft.embroideryFinish,
    );
    setNameTapeText(
      defaultDraft.nameTapeText,
    );
    setRightShoulderHeritage(
      defaultDraft.rightShoulderHeritage,
    );
    setLeftChestIdentity(
      defaultDraft.leftChestIdentity,
    );
setMilitaryBranch(
  defaultDraft.militaryBranch,
);

    setProfession(defaultDraft.profession);
    setZodiacSign(
      defaultDraft.zodiacSign,
    );
    setAdditionalIdentityPatches(defaultDraft.additionalIdentityPatches);
    setComposition(
      createDefaultComposition(
        defaultDraft.heritage,
        sharedHouse.animal,
        defaultDraft.value,
      ),
    );
    setCurrentStep(0);
    window.localStorage.removeItem(
      "family-regiment-draft",
    );
    window.localStorage.removeItem(
      "family-regiment-herald-design",
    );
    showMessage(
      "Builder reset",
    );
  }
  function showMessage(
    message: string,
  ) {
    setSaveMessage(
      message,
    );
    window.setTimeout(
      () => {
        setSaveMessage("");
      },
      2000,
    );
  }
  return (
    <div className="min-h-screen min-w-0 overflow-x-clip bg-[#111213] text-[#F6F2EA]">
      <BuilderHeader
        saveMessage={
          saveMessage
        }
        onSave={
          saveDraft
        }
        onReset={
          resetDraft
        }
      />
      <main className="min-w-0 px-3 pb-10 sm:px-6 md:pb-16">
        <div className="mx-auto min-w-0 max-w-7xl">
          <BuilderStepper
            steps={
              steps
            }
            currentStep={
              currentStep
            }
            onStepChange={
              setCurrentStep
            }
          />
          <div className="grid min-w-0 grid-cols-[minmax(0,1fr)] overflow-hidden rounded-[1.25rem] border border-white/10 bg-[#18191A] sm:rounded-[2rem] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
            <section className="min-w-0 p-4 sm:p-8 md:p-12 lg:min-h-[720px]">
              <p className="text-xs uppercase tracking-[0.35em] text-[#B08D57]">
                Step{" "}
                {
                  steps[
                    currentStep
                  ].number
                }
              </p>
              <h2 className="mt-5 text-4xl md:text-5xl">
                {
                  steps[
                    currentStep
                  ].name
                }
              </h2>
              <p className="mt-4 max-w-xl leading-7 text-[#99958D]">
                {
                  steps[
                    currentStep
                  ].description
                }
              </p>
              <div className="mt-10">
                {currentStep ===
                  0 && (
                  <BuilderIdentity
                    familyName={
                      familyName
                    }
                    initials={
                      initials
                    }
                    regimentTitle={
                      regimentTitle
                    }
                    onFamilyNameChange={
                      setFamilyName
                    }
                    onInitialsChange={
                      setInitials
                    }
                  />
                )}
                {currentStep ===
                  1 && (
                  <BuilderHeritage
                    heritage={
                      rightShoulderHeritage
                    }
                    options={
                      heritageOptions
                    }
                    onHeritageChange={
                      chooseHeritage
                    }
                  />
                )}
                {currentStep ===
                  2 && (
                  <div className="space-y-12">
                    <BuilderHeraldry
                      animal={
                        animal
                      }
                      shield={
                        shield
                      }
                      crown={
                        crown
                      }
                      onAnimalChange={
                        chooseAnimal
                      }
                      onShieldChange={
                        setShield
                      }
                      onCrownChange={
                        setCrown
                      }
                    />
                  </div>
                )}
                {currentStep ===
                  3 && (
                  <BuilderValues
                    value={
                      value
                    }
                    options={
                      valueOptions
                    }
                    onValueChange={
                      chooseValue
                    }
                  />
                )}
                {currentStep ===
                  4 && (
                  <BuilderMotto
                    motto={
                      motto
                    }
                    options={
                      availableMottos
                    }
                    onMottoChange={
                      setMotto
                    }
                  />
                )}
                {currentStep ===
                  5 && (
                  <BuilderJacket
                    jacketView={
                      jacketView
                    }
                    embroideryFinish={
                      embroideryFinish
                    }
                    nameTapeText={
                      nameTapeText
                    }
                    rightShoulderHeritage={
                      rightShoulderHeritage
                    }
                    leftChestIdentity={
                      leftChestIdentity
                    }
militaryBranch={militaryBranch}
onMilitaryBranchChange={setMilitaryBranch}
                    profession={profession}
                    onProfessionChange={setProfession}
                    zodiacSign={zodiacSign}
                      additionalIdentityPatches={additionalIdentityPatches}
                      onAdditionalIdentityPatchesChange={setAdditionalIdentityPatches}
                    onZodiacSignChange={setZodiacSign}
                    heritageOptions={
                      heritageOptions
                    }
                    jacketViews={
                      jacketViews
                    }
                    embroideryFinishes={
                      embroideryFinishes
                    }
                    onJacketViewChange={
                      setJacketView
                    }
                    onEmbroideryFinishChange={
                      setEmbroideryFinish
                    }
                    onNameTapeTextChange={
                      setNameTapeText
                    }
                    onRightShoulderHeritageChange={
                      setRightShoulderHeritage
                    }
                    onLeftChestIdentityChange={
                      setLeftChestIdentity
                    }
                  />
                )}
                {currentStep ===
                  6 && (
                  <BuilderSummary
                    regimentTitle={
                      regimentTitle
                    }
                    familyName={
                      familyName
                    }
                    initials={
                      initials
                    }
                    heritage={
                      heritage
                    }
                    symbol={
                      animal
                    }
                    value={
                      value
                    }
                    motto={
                      motto
                    }
                    /**
                     \* BuilderSummary still uses the
                     \* previous summary contract.
                     \*
                     \* The crest now has one fixed
                     \* physical position.
                     */
                    crestPlacement="Left Shoulder"
                    embroideryFinish={
                      embroideryFinish
                    }
                    /**
                     \* A non-empty tape is equivalent
                     \* to including the name tape for
                     \* the legacy summary contract.
                     */
                    includeNameTape={
                      Boolean(
                        nameTapeText.trim(),
                      )
                    }
                    /**
                     \* The legacy summary only asks
                     \* whether a sleeve patch exists.
                     \* Right-shoulder heritage now
                     \* provides that answer.
                     */
                    includeSleevePatch={
                      rightShoulderHeritage.length > 0
                    }
                    onCreateCrest={
                      createCrest
                    }
                    onSave={
                      saveDraft
                    }
                  />
                )}
              </div>
              <BuilderNavigation
                currentStep={
                  currentStep
                }
                finalStep={
                  steps.length -
                  1
                }
                onPrevious={
                  previousStep
                }
                onNext={
                  nextStep
                }
              />
            </section>
            {/**
             \* BuilderPreview will be migrated in Step 4.
             \*
             \* For this transition we pass the locked four-zone
             \* contract. TypeScript errors here are expected
             \* until BuilderPreview.tsx is replaced next.
             */}
            <BuilderPreview
              familyName={
                familyName
              }
              initials={
                initials
              }
              heritage={
                heritage
              }
              symbol={
                animal
              }
              shield={
                shield
              }
              crown={
                crown
              }
              value={
                value
              }
              motto={
                motto
              }
              jacketView={
                jacketView
              }
              embroideryFinish={
                embroideryFinish
              }
              nameTapeText={
                nameTapeText
              }
              rightShoulderHeritage={
                rightShoulderHeritage
              }
              leftChestIdentity={
                leftChestIdentity
              }
militaryBranch={militaryBranch}
sport="None"
                 profession={profession}
zodiacSign={zodiacSign}
              symbolOptions={
                symbolOptions
              }
              jacketViews={
                jacketViews
              }
              composition={
                composition
              }
            />
          </div>
        </div>
      </main>
    </div>
  );
}
function BuilderNavigation({
  currentStep,
  finalStep,
  onPrevious,
  onNext,
}: {
  currentStep: number;
  finalStep: number;
  onPrevious: () => void;
  onNext: () => void;
}) {
  return (
    <div className="mt-12 flex min-w-0 items-center justify-between gap-2 border-t border-white/10 pt-8 sm:gap-4">
      <button
        type="button"
        onClick={
          onPrevious
        }
        disabled={
          currentStep === 0
        }
        className="min-w-0 rounded-full border border-white/15 px-3 py-3 text-[10px] font-semibold uppercase tracking-[0.1em] transition hover:border-[#B08D57] hover:text-[#B08D57] disabled:cursor-not-allowed disabled:opacity-30 sm:px-6 sm:text-xs sm:tracking-[0.2em]"
      >
        Previous
      </button>
      {currentStep <
        finalStep && (
        <button
          type="button"
          onClick={
            onNext
          }
          className="min-w-0 rounded-full bg-[#B08D57] px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#151515] transition hover:scale-[1.02] sm:px-7 sm:text-xs sm:tracking-[0.2em]"
        >
          Continue
        </button>
      )}
    </div>
  );
}
function normalizeAnimal(
  value: string,
): CrestAnimal {
  if (
    isCrestAnimal(
      value,
    )
  ) {
    return value;
  }
  return "Lion";
}
function normalizeShield(
  value: string,
): BuilderShieldStyle {
  const normalized =
    normalizeLegacyShieldValue(
      value,
    );
  if (
    isBuilderShieldStyle(
      normalized,
    )
  ) {
    return normalized;
  }
  return "Heater Shield";
}
function normalizeCrown(
  value: string,
): CrestCrown {
  const normalized =
    normalizeLegacyCrownValue(
      value,
    );
  if (
    isCrestCrown(
      normalized,
    )
  ) {
    return normalized;
  }
  return "None";
}
/**
 \* Strict legacy normalization.
 \*
 \* Do not invent semantic equivalents.
 */
function normalizeLegacyShieldValue(
  value: string,
): string {
  switch (value) {
    case "Tournament Shield":
      return "Spanish Shield";
    case "Crusader Shield":
      return "Heater Shield";
    default:
      return value;
  }
}
/**
 \* Strict legacy normalization.
 \*
 \* Baron, Count, Ducal and Royal are obsolete V1 values
 \* and therefore normalize to None.
 */
function normalizeLegacyCrownValue(
  value: string,
): string {
  switch (value) {
    case "Baron":
    case "Count":
    case "Ducal":
    case "Royal":
      return "None";
    default:
      return value;
  }
}
function normalizeRightShoulderHeritage(
  value: string | string[] | undefined,
): string[] {
  if (Array.isArray(value)) {
    return Array.from(
      new Set(
        value.filter(
          (item): item is string =>
            typeof item === "string" &&
            item.trim().length > 0,
        ),
      ),
    ).slice(0, 3);
  }
  if (typeof value === "string" && value.trim()) {
    return [value];
  }
  return [];
}
function normalizeIdentityPatchCategory(
  value:
    | IdentityPatchCategory
    | undefined,
): IdentityPatchCategory {
  switch (value) {
    case "Profession":
    case "Military Branch":
    case "Zodiac":
    case "Hometown":
    case "Family Value":
      return value;
    case "None":
    default:
      return "None";
  }
}
function normalizeMilitaryBranch(
  value: MilitaryBranch | undefined,
): MilitaryBranch {
  switch (value) {
    case "Army":
    case "Navy":
    case "Air Force":
    case "Marine Corps":
    case "Coast Guard":
    case "Space Force":
      return value;
    case "None":
    default:
      return "None";
  }
}

function normalizeZodiacSign(
  value: ZodiacSign | undefined,
): ZodiacSign {
  switch (value) {
    case "Aries":
    case "Taurus":
    case "Gemini":
    case "Cancer":
    case "Leo":
    case "Virgo":
    case "Libra":
    case "Scorpio":
    case "Sagittarius":
    case "Capricorn":
    case "Aquarius":
    case "Pisces":
      return value;
    case "None":
    default:
      return "None";
  }
}

function normalizeEmbroideryFinish(
  value: string,
): BuilderEmbroideryFinish {
  if (
    value ===
      "Regiment Gold" ||
    value ===
      "Heritage Ivory" ||
    value ===
      "Tactical Subdued"
  ) {
    return value;
  }
  return "Regiment Gold";
}
function getDesignColors(
  finish: BuilderEmbroideryFinish,
): HeraldDesign["colors"] {
  switch (finish) {
    case "Tactical Subdued":
      return {
        primary:
          "#11120F",
        secondary:
          "#626A3A",
        metallic:
          "gold",
      };
    case "Heritage Ivory":
      return {
        primary:
          "#24251F",
        secondary:
          "#F1E7CF",
        metallic:
          "gold",
      };
    case "Regiment Gold":
    default:
      return {
        primary:
          "#11120F",
        secondary:
          "#D4AF6A",
        metallic:
          "gold",
      };
  }
}

function normalizeProfession(value: unknown): Profession {
  return typeof value === "string" && (PROFESSIONS as readonly string[]).includes(value)
    ? value as Profession : "None";
}

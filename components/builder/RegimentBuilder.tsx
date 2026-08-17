"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import BuilderHeader from "./BuilderHeader";
import BuilderHeraldry from "./BuilderHeraldry";
import BuilderHeritage from "./BuilderHeritage";
import BuilderIdentity from "./BuilderIdentity";
import BuilderJacket from "./BuilderJacket";
import BuilderMotto from "./BuilderMotto";
import BuilderPreview from "./BuilderPreview";
import BuilderStepper from "./BuilderStepper";
import BuilderSummary from "./BuilderSummary";
import BuilderValues from "./BuilderValues";

import ProductionStatus from "@/components/herald/ProductionStatus";

import type { HeraldDesign } from "@/lib/herald/design";

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
  crestPlacement: string;
  embroideryFinish: string;
  includeNameTape: boolean;
  includeSleevePatch: boolean;
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
      "Choose the animal, shield, and crown that define your family crest.",
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
      "Choose how your family identity will appear on the Regiment Jacket.",
  },
  {
    number: "07",
    name: "Regiment",
    description:
      "Review the identity that will guide your finished jacket.",
  },
];

const heritageOptions = [
  "France",
  "United States",
  "Ireland",
  "Italy",
  "England",
  "Scotland",
  "Germany",
  "Spain",
];

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

const mottoOptions: Record<
  string,
  string[]
> = {
  Courage: [
    "Fortis in Familia",
    "Virtus Nos Ducit",
    "Audentes Fortuna Iuvat",
  ],

  Honor: [
    "Honore et Virtute",
    "Fides Ante Omnia",
    "Semper Cum Honore",
  ],

  Unity: [
    "Uniti Fortiores",
    "Una Familia, Una Fortitudo",
    "Concordia Vincimus",
  ],

  Legacy: [
    "Per Saecula",
    "Ad Posteros",
    "Memoria Manet",
  ],

  Resilience: [
    "Per Aspera Fortis",
    "Nunquam Fracti",
    "Fortitudo Permanet",
  ],

  Service: [
    "Servire Cum Honore",
    "Officium Ante Se",
    "Pro Familia et Aliis",
  ],
};

const jacketViews = [
  {
    name: "Front",
    image:
      "/images/products/studio/jacket-front-clean.png",
  },
  {
    name: "Back",
    image:
      "/images/products/studio/jacket-back-clean.png",
  },
];

const embroideryFinishes = [
  {
    name: "Regiment Gold",
    detail:
      "Warm gold and ivory thread with a luxury heritage finish.",
  },
  {
    name: "Tactical Subdued",
    detail:
      "Olive, charcoal, and muted thread for a field-worn appearance.",
  },
  {
    name: "Heritage Ivory",
    detail:
      "Soft ivory lettering with restrained gold accents.",
  },
];

const defaultDraft: BuilderDraft = {
  familyName: "Laurent",
  initials: "LR",
  heritage: "France",
  animal: "Lion",
  shield: "Heater Shield",
  crown: "Ducal",
  value: "Courage",
  motto: "Fortis in Familia",
  jacketView: "Front",
  crestPlacement: "Left Chest",
  embroideryFinish: "Regiment Gold",
  includeNameTape: true,
  includeSleevePatch: true,
};

export default function RegimentBuilder() {
  const router = useRouter();

  const [currentStep, setCurrentStep] =
    useState(0);

  const [familyName, setFamilyName] =
    useState(defaultDraft.familyName);

  const [initials, setInitials] =
    useState(defaultDraft.initials);

  const [heritage, setHeritage] =
    useState(defaultDraft.heritage);

  const [animal, setAnimal] =
    useState(defaultDraft.animal);

  const [shield, setShield] =
    useState(defaultDraft.shield);

  const [crown, setCrown] =
    useState(defaultDraft.crown);

  const [value, setValue] =
    useState(defaultDraft.value);

  const [motto, setMotto] =
    useState(defaultDraft.motto);

  const [jacketView, setJacketView] =
    useState(defaultDraft.jacketView);

  const [
    crestPlacement,
    setCrestPlacement,
  ] = useState(
    defaultDraft.crestPlacement,
  );

  const [
    embroideryFinish,
    setEmbroideryFinish,
  ] = useState(
    defaultDraft.embroideryFinish,
  );

  const [
    includeNameTape,
    setIncludeNameTape,
  ] = useState(
    defaultDraft.includeNameTape,
  );

  const [
    includeSleevePatch,
    setIncludeSleevePatch,
  ] = useState(
    defaultDraft.includeSleevePatch,
  );

  const [
    draftLoaded,
    setDraftLoaded,
  ] = useState(false);

  const [
    saveMessage,
    setSaveMessage,
  ] = useState("");

  /*
   * Keep the design creation timestamp stable
   * during the current builder session.
   */
  const [designCreatedAt] =
    useState(
      () =>
        new Date().toISOString(),
    );

  const availableMottos =
    mottoOptions[value] ??
    mottoOptions.Courage;

  const regimentTitle =
    familyName.trim()
      ? `The House of ${familyName.trim()}`
      : `The ${heritage} ${animal}`;

  /*
   * =========================================================
   * Canonical HeraldDesign
   *
   * The builder UI, production validator, and future
   * vendor export now share the same design model.
   * =========================================================
   */

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

        wreath:
          false,

        banner:
          true,

        motto: {
          latin:
            motto.trim(),

          english: "",
        },

        colors,

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
      designCreatedAt,
    ]);

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
            BuilderDraft & {
              symbol?: string;
            }
          >;

        setFamilyName(
          parsedDraft.familyName ??
            defaultDraft.familyName,
        );

        setInitials(
          parsedDraft.initials ??
            defaultDraft.initials,
        );

        setHeritage(
          parsedDraft.heritage ??
            defaultDraft.heritage,
        );

        setAnimal(
          parsedDraft.animal ??
            parsedDraft.symbol ??
            defaultDraft.animal,
        );

        setShield(
          parsedDraft.shield ??
            defaultDraft.shield,
        );

        setCrown(
          parsedDraft.crown ??
            defaultDraft.crown,
        );

        setValue(
          parsedDraft.value ??
            defaultDraft.value,
        );

        setMotto(
          parsedDraft.motto ??
            defaultDraft.motto,
        );

        setJacketView(
          parsedDraft.jacketView ??
            defaultDraft.jacketView,
        );

        setCrestPlacement(
          parsedDraft.crestPlacement ??
            defaultDraft.crestPlacement,
        );

        setEmbroideryFinish(
          parsedDraft.embroideryFinish ??
            defaultDraft.embroideryFinish,
        );

        setIncludeNameTape(
          parsedDraft.includeNameTape ??
            defaultDraft.includeNameTape,
        );

        setIncludeSleevePatch(
          parsedDraft.includeSleevePatch ??
            defaultDraft.includeSleevePatch,
        );
      } catch {
        window.localStorage.removeItem(
          "family-regiment-draft",
        );
      }
    }

    setDraftLoaded(true);
  }, []);

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
    crestPlacement,
    embroideryFinish,
    includeNameTape,
    includeSleevePatch,
  ]);

  function createDraft(): BuilderDraft {
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
      crestPlacement,
      embroideryFinish,
      includeNameTape,
      includeSleevePatch,
    };
  }

  function chooseValue(
    nextValue: string,
  ) {
    setValue(nextValue);

    setMotto(
      mottoOptions[nextValue]?.[0] ??
        mottoOptions.Courage[0],
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

  function handleCrestPlacementChange(
    nextPlacement: string,
  ) {
    setCrestPlacement(
      nextPlacement,
    );

    if (
      nextPlacement ===
        "Left Chest" ||
      nextPlacement ===
        "Right Chest" ||
      nextPlacement ===
        "Sleeve Patch"
    ) {
      setJacketView("Front");

      return;
    }

    setJacketView("Back");
  }

  function saveDraft() {
    window.localStorage.setItem(
      "family-regiment-draft",
      JSON.stringify(
        createDraft(),
      ),
    );

    showMessage("Draft saved");
  }

  function createCrest() {
    saveDraft();

    /*
     * Persist the canonical design separately
     * from the legacy builder draft.
     *
     * This becomes the bridge to Studio,
     * production validation, and vendor export.
     */
    window.localStorage.setItem(
      "family-regiment-herald-design",
      JSON.stringify(
        heraldDesign,
      ),
    );

    router.push("/studio");
  }

  function resetDraft() {
    setFamilyName(
      defaultDraft.familyName,
    );

    setInitials(
      defaultDraft.initials,
    );

    setHeritage(
      defaultDraft.heritage,
    );

    setAnimal(
      defaultDraft.animal,
    );

    setShield(
      defaultDraft.shield,
    );

    setCrown(
      defaultDraft.crown,
    );

    setValue(
      defaultDraft.value,
    );

    setMotto(
      defaultDraft.motto,
    );

    setJacketView(
      defaultDraft.jacketView,
    );

    setCrestPlacement(
      defaultDraft.crestPlacement,
    );

    setEmbroideryFinish(
      defaultDraft.embroideryFinish,
    );

    setIncludeNameTape(
      defaultDraft.includeNameTape,
    );

    setIncludeSleevePatch(
      defaultDraft.includeSleevePatch,
    );

    setCurrentStep(0);

    window.localStorage.removeItem(
      "family-regiment-draft",
    );

    window.localStorage.removeItem(
      "family-regiment-herald-design",
    );

    showMessage("Builder reset");
  }

  function showMessage(
    message: string,
  ) {
    setSaveMessage(message);

    window.setTimeout(() => {
      setSaveMessage("");
    }, 2000);
  }

  return (
    <div className="min-h-screen bg-[#111213] text-[#F6F2EA]">
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

      <main className="px-6 pb-10 md:pb-16">
        <div className="mx-auto max-w-7xl">
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

          <div className="grid overflow-hidden rounded-[2rem] border border-white/10 bg-[#18191A] lg:grid-cols-[1.05fr_0.95fr]">
            <section className="min-h-[720px] p-8 md:p-12">
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
                      heritage
                    }
                    options={
                      heritageOptions
                    }
                    onHeritageChange={
                      setHeritage
                    }
                  />
                )}

                {currentStep ===
                  2 && (
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
                      setAnimal
                    }
                    onShieldChange={
                      setShield
                    }
                    onCrownChange={
                      setCrown
                    }
                  />
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
                    crestPlacement={
                      crestPlacement
                    }
                    embroideryFinish={
                      embroideryFinish
                    }
                    includeNameTape={
                      includeNameTape
                    }
                    includeSleevePatch={
                      includeSleevePatch
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
                    onCrestPlacementChange={
                      handleCrestPlacementChange
                    }
                    onEmbroideryFinishChange={
                      setEmbroideryFinish
                    }
                    onNameTapeChange={
                      setIncludeNameTape
                    }
                    onSleevePatchChange={
                      setIncludeSleevePatch
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
                    crestPlacement={
                      crestPlacement
                    }
                    embroideryFinish={
                      embroideryFinish
                    }
                    includeNameTape={
                      includeNameTape
                    }
                    includeSleevePatch={
                      includeSleevePatch
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
              crestPlacement={
                crestPlacement
              }
              embroideryFinish={
                embroideryFinish
              }
              includeNameTape={
                includeNameTape
              }
              includeSleevePatch={
                includeSleevePatch
              }
              symbolOptions={
                symbolOptions
              }
              jacketViews={
                jacketViews
              }
            />
          </div>

          {/*
           * ===================================================
           * Live Production Review
           * ===================================================
           *
           * This panel uses the exact same HeraldDesign
           * that is persisted for the Studio and eventual
           * vendor export.
           */}

          <div className="mt-6">
            <ProductionStatus
              design={
                heraldDesign
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
    <div className="mt-12 flex items-center justify-between border-t border-white/10 pt-8">
      <button
        type="button"
        onClick={
          onPrevious
        }
        disabled={
          currentStep === 0
        }
        className="rounded-full border border-white/15 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] transition hover:border-[#B08D57] hover:text-[#B08D57] disabled:cursor-not-allowed disabled:opacity-30"
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
          className="rounded-full bg-[#B08D57] px-7 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#151515] transition hover:scale-[1.02]"
        >
          Continue
        </button>
      )}
    </div>
  );
}

/*
 * ===========================================================
 * HeraldDesign Normalization
 * ===========================================================
 */

function normalizeAnimal(
  value: string,
): CrestAnimal {
  if (
    isCrestAnimal(value)
  ) {
    return value;
  }

  return "Lion";
}

function normalizeShield(
  value: string,
): BuilderShieldStyle {
  if (
    isBuilderShieldStyle(
      value,
    )
  ) {
    return value;
  }

  return "Heater Shield";
}

function normalizeCrown(
  value: string,
): CrestCrown {
  if (
    isCrestCrown(value)
  ) {
    return value;
  }

  return "None";
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
          "#303429",

        secondary:
          "#C1C3B2",

        metallic:
          "silver",
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
          "#20231C",

        secondary:
          "#E8D7AE",

        metallic:
          "gold",
      };
  }
}
"use client";

import { useRouter } from "next/navigation";
import {
  useEffect,
  useMemo,
  useState,
} from "react";

import BuilderComposition from "./BuilderComposition";
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

import type {
  HeraldDesign,
  HeraldQuadrant,
  HeraldShieldComposition,
} from "@/lib/herald/design";

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
  leftShoulderHeritage: string;
  rightShoulderHeritage: string;
  /**
   * Legacy V1 field retained only so older localStorage drafts can migrate.
   */
  includeSleevePatch?: boolean;
  composition?: HeraldShieldComposition;
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
      "Choose the heraldic form, then compose the four fields that tell your family story.",
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
    (candidate) => candidate.countryName === heritage,
  );

  return asset?.id as HeritageFlagVisualCanonAssetId | undefined;
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
      createAnimalQuadrant(
        animal,
      ),
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
    getAnimalAssetId(
      animal,
    );

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
  crown: "Ducal",
  value: "Courage",
  motto: "Fortis in Familia",
  jacketView: "Front",
  crestPlacement:
    "Left Chest",
  embroideryFinish:
    "Regiment Gold",
  includeNameTape: true,
  leftShoulderHeritage: "France",
  rightShoulderHeritage: "",
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
    leftShoulderHeritage,
    setLeftShoulderHeritage,
  ] = useState(
    defaultDraft.leftShoulderHeritage,
  );

  const [
    rightShoulderHeritage,
    setRightShoulderHeritage,
  ] = useState(
    defaultDraft.rightShoulderHeritage,
  );

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

  const availableMottos =
    mottoOptions[value] ??
    mottoOptions.Courage;

  const regimentTitle =
    familyName.trim()
      ? `The House of ${familyName.trim()}`
      : `The ${heritage} ${animal}`;

  const heraldDesign =
    useMemo<HeraldDesign>(() => {
      const resolvedAnimal =
        normalizeAnimal(
          animal,
        );

      const resolvedShield =
        normalizeShield(
          shield,
        );

      const resolvedCrown =
        normalizeCrown(
          crown,
        );

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
          english: "",
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
      composition,
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
          parsedDraft.shield ??
            defaultDraft.shield,
        );

        setCrown(
          parsedDraft.crown ??
            defaultDraft.crown,
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

        const migratedLeftShoulder =
          parsedDraft.leftShoulderHeritage ??
          (parsedDraft.includeSleevePatch
            ? loadedHeritage
            : defaultDraft.leftShoulderHeritage);

        setLeftShoulderHeritage(
          migratedLeftShoulder,
        );

        setRightShoulderHeritage(
          parsedDraft.rightShoulderHeritage ??
            defaultDraft.rightShoulderHeritage,
        );

        const loadedComposition =
          parsedDraft.composition ??
          createDefaultComposition(
            loadedHeritage,
            loadedAnimal,
            loadedValue,
          );

        const migratedComposition: HeraldShieldComposition = {
          ...loadedComposition,
          quadrants: loadedComposition.quadrants.map(
            (quadrant) => {
              /*
               * Phase 2 migration:
               * Older Builder drafts automatically placed the selected
               * heritage flag in Quadrant I. Heritage flags now belong to
               * independent shoulder-patch selections, so remove only that
               * legacy auto-generated Quadrant I heritage field.
               *
               * Other quadrant choices are preserved.
               */
              if (
                quadrant.id === "I" &&
                quadrant.type === "heritage" &&
                (
                  quadrant.heritage === loadedHeritage ||
                  quadrant.assetId ===
                    getHeritageAssetId(loadedHeritage)
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

    setDraftLoaded(
      true,
    );
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
    leftShoulderHeritage,
    rightShoulderHeritage,
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
      crestPlacement,
      embroideryFinish,
      includeNameTape,
      leftShoulderHeritage,
      rightShoulderHeritage,
      composition,
    };
  }

  function chooseHeritage(
    nextHeritage: string,
  ) {
    setHeritage(
      nextHeritage,
    );
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

    setMotto(
      mottoOptions[
        nextValue
      ]?.[0] ??
        mottoOptions.Courage[0],
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

  function handleCompositionChange(
    nextComposition:
      HeraldShieldComposition,
  ) {
    setComposition(
      nextComposition,
    );

    /*
     * Direct quadrant editing now takes precedence.
     *
     * We intentionally do not rewrite the legacy Heritage,
     * Animal, or Value selections from arbitrary quadrant
     * changes. Those fields remain useful recommendations
     * and backward-compatible builder data.
     *
     * The composition itself is the canonical shield layout.
     */
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

    setJacketView(
      "Front",
    );
  }

  function saveDraft() {
    window.localStorage.setItem(
      "family-regiment-draft",
      JSON.stringify(
        createDraft(),
      ),
    );

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
      "Front",
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

    setLeftShoulderHeritage(
      defaultDraft.leftShoulderHeritage,
    );

    setRightShoulderHeritage(
      defaultDraft.rightShoulderHeritage,
    );

    setComposition(
      createDefaultComposition(
        defaultDraft.heritage,
        defaultDraft.animal,
        defaultDraft.value,
      ),
    );

    setCurrentStep(
      0,
    );

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
        setSaveMessage(
          "",
        );
      },
      2000,
    );
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

                    <div className="border-t border-white/10 pt-12">
                      <BuilderComposition
                        composition={
                          composition
                        }
                        onCompositionChange={
                          handleCompositionChange
                        }
                      />
                    </div>
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
                    crestPlacement={
                      crestPlacement
                    }
                    embroideryFinish={
                      embroideryFinish
                    }
                    includeNameTape={
                      includeNameTape
                    }
                    leftShoulderHeritage={
                      leftShoulderHeritage
                    }
                    rightShoulderHeritage={
                      rightShoulderHeritage
                    }
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
                    onCrestPlacementChange={
                      handleCrestPlacementChange
                    }
                    onEmbroideryFinishChange={
                      setEmbroideryFinish
                    }
                    onNameTapeChange={
                      setIncludeNameTape
                    }
                    onLeftShoulderHeritageChange={
                      setLeftShoulderHeritage
                    }
                    onRightShoulderHeritageChange={
                      setRightShoulderHeritage
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
                      Boolean(
                        leftShoulderHeritage ||
                          rightShoulderHeritage,
                      )
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
              leftShoulderHeritage={
                leftShoulderHeritage
              }
              rightShoulderHeritage={
                rightShoulderHeritage
              }
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
    isCrestCrown(
      value,
    )
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
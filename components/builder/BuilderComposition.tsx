"use client";

import { useState } from "react";

import type {
  HeraldQuadrant,
  HeraldQuadrantId,
  HeraldShieldComposition,
} from "@/lib/herald/design";

type BuilderCompositionProps = {
  composition: HeraldShieldComposition;
  onCompositionChange: (
    composition: HeraldShieldComposition,
  ) => void;
};

type QuadrantPreset = {
  type: HeraldQuadrant["type"];
  label: string;
  description: string;
};

const quadrantPresets: QuadrantPreset[] = [
  {
    type: "heritage",
    label: "Heritage",
    description:
      "Country, region, or cultural origin.",
  },
  {
    type: "animal",
    label: "Animal",
    description:
      "A principal heraldic animal or family emblem.",
  },
  {
    type: "symbol",
    label: "Symbol",
    description:
      "A curated symbol representing a family principle.",
  },
  {
    type: "family-branch",
    label: "Family Branch",
    description:
      "Distinguish a maternal, paternal, or regional branch.",
  },
  {
    type: "service",
    label: "Service",
    description:
      "Military, civic, or public service tradition.",
  },
  {
    type: "profession",
    label: "Profession",
    description:
      "A meaningful family trade, craft, or profession.",
  },
  {
    type: "custom",
    label: "Custom",
    description:
      "Reserved for an approved custom family element.",
  },
  {
    type: "empty",
    label: "Leave Open",
    description:
      "Keep this quadrant intentionally unassigned.",
  },
];

export default function BuilderComposition({
  composition,
  onCompositionChange,
}: BuilderCompositionProps) {
  const [
    selectedQuadrantId,
    setSelectedQuadrantId,
  ] = useState<HeraldQuadrantId>(
    "I",
  );

  const selectedQuadrant =
    composition.quadrants.find(
      (quadrant) =>
        quadrant.id ===
        selectedQuadrantId,
    ) ??
    composition.quadrants[0];

  function updateQuadrant(
    nextQuadrant: HeraldQuadrant,
  ) {
    const nextQuadrants =
      composition.quadrants.map(
        (quadrant) =>
          quadrant.id ===
          nextQuadrant.id
            ? nextQuadrant
            : quadrant,
      ) as HeraldShieldComposition["quadrants"];

    onCompositionChange({
      ...composition,
      quadrants:
        nextQuadrants,
    });
  }

  function choosePreset(
    preset: QuadrantPreset,
  ) {
    if (
      preset.type === "empty"
    ) {
      updateQuadrant({
        id:
          selectedQuadrant.id,
        type: "empty",
      });

      return;
    }

    updateQuadrant({
      ...selectedQuadrant,
      type:
        preset.type,

      /*
       * We deliberately preserve an existing label when
       * changing the content class.
       *
       * The actual Visual Canon picker will later replace
       * this temporary editing behavior.
       */

      label:
        selectedQuadrant.label ??
        preset.label,

      assetId:
        selectedQuadrant.assetId,

      variantId:
        selectedQuadrant.variantId,
    });
  }

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#B08D57]">
          Shield Composition
        </p>

        <h3 className="mt-2 text-2xl text-[#F4EFE5]">
          Build the story inside the shield
        </h3>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#8E8A81]">
          Your crest supports four independent
          fields. Each can represent a different
          part of the family story, and none is
          required simply to fill space.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <QuadrantSelector
          composition={
            composition
          }
          selectedQuadrantId={
            selectedQuadrantId
          }
          onSelect={
            setSelectedQuadrantId
          }
        />

        <QuadrantEditor
          quadrant={
            selectedQuadrant
          }
          onUpdate={
            updateQuadrant
          }
          onChoosePreset={
            choosePreset
          }
        />
      </div>

      <div className="rounded-[1.35rem] border border-[#B08D57]/20 bg-[#B08D57]/[0.04] p-5">
        <div className="flex gap-4">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#B08D57]/35 text-xs font-semibold text-[#C8A969]">
            i
          </div>

          <div>
            <p className="text-sm font-medium text-[#E7DED0]">
              Meaning before decoration
            </p>

            <p className="mt-1 text-xs leading-5 text-[#77736A]">
              Four quadrants are available, but
              The Family Regiment should never
              encourage a customer to add a
              meaningless symbol simply because a
              field is empty.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuadrantSelector({
  composition,
  selectedQuadrantId,
  onSelect,
}: {
  composition: HeraldShieldComposition;
  selectedQuadrantId:
    HeraldQuadrantId;
  onSelect: (
    id: HeraldQuadrantId,
  ) => void;
}) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-[#171815] p-5">
      <div className="mb-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#746E63]">
          Four-Part Shield
        </p>

        <p className="mt-2 text-sm text-[#A8A298]">
          Select a quadrant to edit.
        </p>
      </div>

      <div className="mx-auto grid aspect-square max-w-[360px] grid-cols-2 overflow-hidden rounded-[2rem] border-4 border-[#A98950] bg-[#10110F] shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
        {composition.quadrants.map(
          (quadrant) => (
            <QuadrantTile
              key={
                quadrant.id
              }
              quadrant={
                quadrant
              }
              active={
                selectedQuadrantId ===
                quadrant.id
              }
              onClick={() =>
                onSelect(
                  quadrant.id,
                )
              }
            />
          ),
        )}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2">
        {composition.quadrants.map(
          (quadrant) => (
            <button
              key={
                quadrant.id
              }
              type="button"
              onClick={() =>
                onSelect(
                  quadrant.id,
                )
              }
              className={[
                "rounded-xl border px-3 py-3 text-left transition",
                selectedQuadrantId ===
                quadrant.id
                  ? "border-[#B08D57] bg-[#B08D57]/10"
                  : "border-white/8 bg-white/[0.02] hover:border-white/20",
              ].join(" ")}
            >
              <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#B08D57]">
                Quadrant{" "}
                {
                  quadrant.id
                }
              </p>

              <p className="mt-1 truncate text-xs text-[#D9D3C8]">
                {getQuadrantDisplayName(
                  quadrant,
                )}
              </p>
            </button>
          ),
        )}
      </div>
    </div>
  );
}

function QuadrantTile({
  quadrant,
  active,
  onClick,
}: {
  quadrant: HeraldQuadrant;
  active: boolean;
  onClick: () => void;
}) {
  const empty =
    quadrant.type ===
    "empty";

  return (
    <button
      type="button"
      onClick={
        onClick
      }
      aria-pressed={
        active
      }
      className={[
        "relative flex min-h-0 flex-col items-center justify-center border-[#A98950]/45 p-4 text-center transition duration-200",
        quadrant.id ===
          "I" ||
        quadrant.id ===
          "II"
          ? "border-b"
          : "",
        quadrant.id ===
          "I" ||
        quadrant.id ===
          "III"
          ? "border-r"
          : "",
        active
          ? "bg-[#B08D57]/18 shadow-[inset_0_0_30px_rgba(176,141,87,0.12)]"
          : "bg-[#1B1C19] hover:bg-[#20211D]",
      ].join(" ")}
    >
      <span
        className={[
          "absolute left-3 top-3 flex h-6 w-6 items-center justify-center rounded-full border text-[9px] font-bold",
          active
            ? "border-[#D0AE69] bg-[#D0AE69] text-[#151515]"
            : "border-white/15 text-[#746F66]",
        ].join(" ")}
      >
        {
          quadrant.id
        }
      </span>

      <QuadrantGraphic
        quadrant={
          quadrant
        }
      />

      <p
        className={[
          "mt-3 max-w-[110px] truncate text-xs font-medium",
          empty
            ? "text-[#68645D]"
            : "text-[#E8E1D5]",
        ].join(" ")}
      >
        {getQuadrantDisplayName(
          quadrant,
        )}
      </p>

      {!empty && (
        <p className="mt-1 text-[8px] uppercase tracking-[0.18em] text-[#81796D]">
          {formatType(
            quadrant.type,
          )}
        </p>
      )}
    </button>
  );
}

function QuadrantGraphic({
  quadrant,
}: {
  quadrant: HeraldQuadrant;
}) {
  if (
    quadrant.type ===
    "empty"
  ) {
    return (
      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-dashed border-white/15">
        <span className="text-xl text-[#5D5952]">
          +
        </span>
      </div>
    );
  }

  if (
    quadrant.type ===
    "heritage"
  ) {
    return (
      <div className="flex h-16 w-20 items-center justify-center rounded-lg border border-white/10 bg-[#ECE6DA] text-3xl shadow-sm">
        {getHeritageFlag(
          quadrant.heritage ??
            quadrant.label ??
            "",
        )}
      </div>
    );
  }

  if (
    quadrant.type ===
    "animal"
  ) {
    return (
      <AnimalMark
        animal={
          quadrant.label ??
          "Lion"
        }
      />
    );
  }

  return (
    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#A98950]/40 bg-[#A98950]/10">
      <span className="text-2xl font-serif text-[#C6A461]">
        {getTypeMark(
          quadrant.type,
        )}
      </span>
    </div>
  );
}

function QuadrantEditor({
  quadrant,
  onUpdate,
  onChoosePreset,
}: {
  quadrant: HeraldQuadrant;
  onUpdate: (
    quadrant: HeraldQuadrant,
  ) => void;
  onChoosePreset: (
    preset: QuadrantPreset,
  ) => void;
}) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-[#20211F] p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#B08D57]">
            Editing Quadrant{" "}
            {
              quadrant.id
            }
          </p>

          <h4 className="mt-2 text-xl text-[#F4EFE5]">
            {getQuadrantDisplayName(
              quadrant,
            )}
          </h4>
        </div>

        <span className="rounded-full border border-white/10 bg-black/10 px-3 py-1.5 text-[9px] uppercase tracking-[0.18em] text-[#827C72]">
          {formatType(
            quadrant.type,
          )}
        </span>
      </div>

      <div className="mt-7">
        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#746F66]">
          Purpose
        </p>

        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {quadrantPresets.map(
            (preset) => {
              const active =
                quadrant.type ===
                preset.type;

              return (
                <button
                  key={
                    preset.type
                  }
                  type="button"
                  onClick={() =>
                    onChoosePreset(
                      preset,
                    )
                  }
                  className={[
                    "rounded-xl border p-4 text-left transition",
                    active
                      ? "border-[#B08D57] bg-[#B08D57]/10"
                      : "border-white/8 bg-[#181916] hover:border-[#B08D57]/40",
                  ].join(" ")}
                >
                  <p className="text-sm font-medium text-[#E5DED3]">
                    {
                      preset.label
                    }
                  </p>

                  <p className="mt-1 text-[11px] leading-5 text-[#77736A]">
                    {
                      preset.description
                    }
                  </p>
                </button>
              );
            },
          )}
        </div>
      </div>

      {quadrant.type !==
        "empty" && (
        <div className="mt-7">
          <label
            htmlFor={`quadrant-${quadrant.id}-label`}
            className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#746F66]"
          >
            Current Meaning
          </label>

          <input
            id={`quadrant-${quadrant.id}-label`}
            type="text"
            value={
              quadrant.label ??
              ""
            }
            onChange={(
              event,
            ) =>
              onUpdate({
                ...quadrant,
                label:
                  event.target
                    .value,
              })
            }
            placeholder="Family meaning"
            className="mt-3 w-full rounded-xl border border-white/10 bg-[#171815] px-4 py-3 text-sm text-[#EEE8DD] outline-none transition placeholder:text-[#555149] focus:border-[#B08D57]"
          />

          <p className="mt-2 text-[11px] leading-5 text-[#65615A]">
            This field is temporary
            semantic data. Final symbols
            will come from the curated
            Visual Canon rather than free
            text.
          </p>
        </div>
      )}

      {quadrant.assetId && (
        <div className="mt-6 rounded-xl border border-[#B08D57]/20 bg-[#171815] p-4">
          <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#746F66]">
            Visual Canon Reference
          </p>

          <p className="mt-2 text-sm text-[#C8A969]">
            {
              quadrant.assetId
            }
          </p>

          {quadrant.variantId && (
            <p className="mt-1 text-xs text-[#77736A]">
              Variant:{" "}
              {
                quadrant.variantId
              }
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function AnimalMark({
  animal,
}: {
  animal: string;
}) {
  const fill =
    "#C6A461";

  if (
    animal === "Eagle"
  ) {
    return (
      <svg
        viewBox="0 0 100 100"
        className="h-16 w-20"
        aria-hidden="true"
      >
        <path
          d="M49 27 C36 15 21 14 7 22 C21 28 31 37 39 50 C27 45 17 47 7 55 C22 59 34 68 44 82 L50 62 Z"
          fill={
            fill
          }
        />

        <path
          d="M51 27 C64 15 79 14 93 22 C79 28 69 37 61 50 C73 45 83 47 93 55 C78 59 66 68 56 82 L50 62 Z"
          fill={
            fill
          }
        />

        <path
          d="M44 30 C48 23 52 23 56 30 L55 67 L50 82 L45 67 Z"
          fill={
            fill
          }
        />
      </svg>
    );
  }

  if (
    animal === "Wolf"
  ) {
    return (
      <svg
        viewBox="0 0 100 100"
        className="h-16 w-16"
        aria-hidden="true"
      >
        <path
          d="M25 28 L15 8 L32 22 C42 16 58 16 68 22 L85 8 L75 29 C82 37 84 48 80 58 C74 74 61 83 50 84 C37 82 25 74 20 59 C17 48 19 37 25 28 Z"
          fill={
            fill
          }
        />
      </svg>
    );
  }

  if (
    animal === "Bear"
  ) {
    return (
      <svg
        viewBox="0 0 100 100"
        className="h-16 w-16"
        aria-hidden="true"
      >
        <circle
          cx="30"
          cy="26"
          r="12"
          fill={
            fill
          }
        />

        <circle
          cx="70"
          cy="26"
          r="12"
          fill={
            fill
          }
        />

        <path
          d="M24 35 C29 19 41 15 50 15 C59 15 71 19 76 35 C83 56 71 80 50 84 C29 80 17 56 24 35 Z"
          fill={
            fill
          }
        />
      </svg>
    );
  }

  if (
    animal === "Stag"
  ) {
    return (
      <svg
        viewBox="0 0 100 110"
        className="h-16 w-16"
        aria-hidden="true"
      >
        <path
          d="M34 38 C25 45 23 59 29 70 C34 80 43 85 51 84 C61 82 69 72 69 61 C69 49 62 40 53 37 C47 35 40 35 34 38 Z"
          fill={
            fill
          }
        />

        <path
          d="M35 35 C24 25 20 13 23 1 M25 21 L13 14 M27 13 L34 3 M56 35 C67 25 71 13 68 1 M66 21 L78 14 M64 13 L57 3"
          fill="none"
          stroke={
            fill
          }
          strokeWidth="5"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 100 110"
      className="h-16 w-16"
      aria-hidden="true"
    >
      <path
        d="M55 18 C63 12 73 16 77 23 C82 33 76 42 67 46 C72 56 70 67 63 76 C59 81 54 86 51 95 L45 95 C43 87 45 80 49 74 C40 73 33 67 30 59 C27 50 31 41 39 35 C43 32 48 29 53 28 C50 23 51 20 55 18 Z"
        fill={
          fill
        }
      />

      <path
        d="M63 61 C79 59 85 48 82 38 C80 30 85 22 93 20"
        fill="none"
        stroke={
          fill
        }
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function getQuadrantDisplayName(
  quadrant: HeraldQuadrant,
) {
  if (
    quadrant.type ===
    "empty"
  ) {
    return "Open";
  }

  return (
    quadrant.label ??
    formatType(
      quadrant.type,
    )
  );
}

function formatType(
  value: HeraldQuadrant["type"],
) {
  switch (value) {
    case "family-branch":
      return "Family Branch";

    case "empty":
      return "Open";

    default:
      return (
        value
          .charAt(0)
          .toUpperCase() +
        value.slice(1)
      );
  }
}

function getTypeMark(
  type: HeraldQuadrant["type"],
) {
  switch (type) {
    case "symbol":
      return "✦";

    case "family-branch":
      return "Y";

    case "service":
      return "S";

    case "profession":
      return "P";

    case "ordinary":
      return "◇";

    case "custom":
      return "+";

    default:
      return "•";
  }
}

function getHeritageFlag(
  heritage: string,
) {
  const flags: Record<
    string,
    string
  > = {
    France: "🇫🇷",
    "United States": "🇺🇸",
    Ireland: "🇮🇪",
    Italy: "🇮🇹",
    England: "🏴",
    Scotland: "🏴",
    Germany: "🇩🇪",
    Spain: "🇪🇸",
  };

  return (
    flags[heritage] ??
    "⚑"
  );
}
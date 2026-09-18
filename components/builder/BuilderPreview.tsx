"use client";

import Image from "next/image";

import NameTape from "@/components/patches/NameTape";

import type {
  HeraldQuadrant,
  HeraldShieldComposition,
} from "@/lib/herald/design";

import {
  type BuilderShieldStyle,
  type CrestCrown,
} from "@/lib/herald/types";

import { LionRampant } from "@/lib/herald/svg/animals/lion";

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

type CrestPalette = {
  primary: string;
  secondary: string;
  metallic: string;
  ivory: string;
  dark: string;
};

const fallbackJacket: PreviewJacketOption = {
  name: "Front",
  image: "/images/jackets/m65-front.png",
};

const heritageFlags: Record<string, string> = {
  France: "🇫🇷",
  "United States": "🇺🇸",
  Ireland: "🇮🇪",
  Italy: "🇮🇹",
  England: "🏴",
  Scotland: "🏴",
  Germany: "🇩🇪",
  Spain: "🇪🇸",
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
  jacketViews,
  composition,
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
    familyName.trim() ||
    "Family";

  const displayInitials =
    initials.trim() ||
    "FR";

  const displayHeritage =
    heritage.trim() ||
    "Heritage";

  const displaySymbol =
    symbol.trim() ||
    "Lion";

  const displayValue =
    value.trim() ||
    "Legacy";

  const displayMotto =
    motto.trim() ||
    "Fortis in Familia";

  const normalizedShield =
    normalizeShield(
      shield,
    );

  const normalizedCrown =
    normalizeCrown(
      crown,
    );

  const crestLayout =
    crestPlacement ===
    "Right Chest"
      ? jacketLayout.front.crest
          .rightChest
      : jacketLayout.front.crest
          .leftChest;

  const nameTapeLayout =
    crestPlacement ===
    "Right Chest"
      ? jacketLayout.front.nameTape
          .rightChest
      : jacketLayout.front.nameTape
          .leftChest;

  const sleevePatchLayout =
    jacketLayout.front
      .sleevePatch;

  const heritageFlag =
    heritageFlags[
      displayHeritage
    ] ?? "⚑";

  return (
    <aside className="relative min-h-[720px] overflow-hidden border-t border-white/10 bg-[#20211E] lg:border-l lg:border-t-0">
      <div className="sticky top-0 flex min-h-[720px] items-center justify-center p-6 md:p-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(176,141,87,0.18),_transparent_65%)]" />

        <div className="relative w-full">
          <PreviewHeader
            finish={
              embroideryFinish
            }
          />

          <div className="relative mx-auto aspect-[4/5] w-full max-w-[540px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#181916] shadow-[0_35px_80px_rgba(0,0,0,0.35)]">
            <Image
              src={
                selectedJacket.image
              }
              alt="Front view of the customized Regiment Jacket"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />

            {includeNameTape && (
              <div
                style={{
                  left:
                    nameTapeLayout.left,
                  top:
                    nameTapeLayout.top,
                  transform:
                    "translate(-50%, -50%)",
                }}
                className="absolute z-10"
              >
                <NameTape
                  name={
                    displayFamilyName
                  }
                  finish={
                    finish
                  }
                  active
                  className="min-w-[112px] px-3 py-1.5"
                />
              </div>
            )}

            <div
              style={{
                left:
                  crestLayout.left,
                top:
                  crestLayout.top,
                transform:
                  "translate(-50%, -50%)",
              }}
              className="absolute z-20"
            >
              <div className="origin-center scale-[0.42]">
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
                  shield={
                    normalizedShield
                  }
                  crown={
                    normalizedCrown
                  }
                  finish={
                    finish
                  }
                  composition={
                    composition
                  }
                />
              </div>
            </div>

            {includeSleevePatch && (
              <div
                style={{
                  left:
                    sleevePatchLayout.left,
                  top:
                    sleevePatchLayout.top,
                  width: `${sleevePatchLayout.size}px`,
                  height: `${sleevePatchLayout.size}px`,
                  transform:
                    "rotate(-5deg)",
                }}
                className="absolute z-10 flex items-center justify-center rounded-full border-2 border-[#B08D57] bg-[#20231C] shadow-xl"
              >
                <span className="text-[12px]">
                  {heritageFlag}
                </span>
              </div>
            )}

            <div className="absolute bottom-5 left-5 right-5 z-20 flex items-end justify-between rounded-2xl border border-white/10 bg-black/45 px-5 py-4 backdrop-blur-md">
              <div className="min-w-0">
                <p className="text-[9px] uppercase tracking-[0.3em] text-[#B08D57]">
                  Regiment Identity
                </p>

                <p className="mt-2 truncate text-lg text-white">
                  {
                    displayFamilyName
                  }
                </p>
              </div>

              <p className="ml-4 shrink-0 text-xs uppercase tracking-[0.18em] text-[#D7D1C5]">
                {
                  displayInitials
                }
              </p>
            </div>
          </div>

          <div className="mt-5 rounded-[1.5rem] border border-[#B08D57]/20 bg-[#181916] p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#B08D57]">
                  Live Crest
                </p>

                <p className="mt-1 text-sm text-[#D8D3CA]">
                  Four-part family composition
                </p>
              </div>

              <span className="rounded-full border border-[#B08D57]/30 bg-[#B08D57]/5 px-3 py-1.5 text-[9px] uppercase tracking-[0.2em] text-[#C7A767]">
                Quartered
              </span>
            </div>

            <div className="mt-5 flex justify-center overflow-hidden rounded-2xl border border-white/8 bg-[#11120F] py-6">
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
                shield={
                  normalizedShield
                }
                crown={
                  normalizedCrown
                }
                finish={
                  finish
                }
                composition={
                  composition
                }
              />
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {composition.quadrants.map(
              (quadrant) => (
                <PreviewStat
                  key={
                    quadrant.id
                  }
                  label={`Quadrant ${quadrant.id}`}
                  value={
                    getQuadrantDisplayName(
                      quadrant,
                    )
                  }
                />
              ),
            )}
          </div>

          <p className="mt-5 text-center text-[9px] uppercase tracking-[0.28em] text-[#65625D]">
            Live preview follows the saved shield composition
          </p>

          <div className="sr-only">
            {displaySymbol}
            {displayValue}
          </div>
        </div>
      </div>
    </aside>
  );
}

function PreviewHeader({
  finish,
}: {
  finish: string;
}) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div>
        <p className="text-xs uppercase tracking-[0.4em] text-[#B08D57]">
          Regiment Workshop
        </p>

        <p className="mt-2 text-sm text-[#77736A]">
          Front view · {finish}
        </p>
      </div>

      <span className="rounded-full border border-[#B08D57]/30 bg-[#B08D57]/5 px-4 py-2 text-[10px] uppercase tracking-[0.25em] text-[#BDA16F]">
        Live Design
      </span>
    </div>
  );
}

function FamilyCrestPreview({
  familyName,
  initials,
  motto,
  shield,
  crown,
  finish,
  composition,
}: {
  familyName: string;
  initials: string;
  motto: string;
  shield: BuilderShieldStyle;
  crown: CrestCrown;
  finish: SupportedFinish;
  composition: HeraldShieldComposition;
}) {
  const palette =
    getPalette(
      finish,
    );

  return (
    <div className="relative flex w-[220px] flex-col items-center">
      <CrownPreview
        crown={
          crown
        }
        metallic={
          palette.metallic
        }
        ivory={
          palette.ivory
        }
      />

      <div className="relative mt-1 h-[224px] w-[190px]">
        <QuarteredShield
          shield={
            shield
          }
          composition={
            composition
          }
          initials={
            initials
          }
          palette={
            palette
          }
        />
      </div>

      <div className="relative -mt-1 flex min-h-[44px] w-[215px] items-center justify-center">
        <svg
          viewBox="0 0 240 58"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <path
            d="M9 17 C42 4 76 9 120 18 C164 9 198 4 231 17 L218 43 C184 35 157 34 120 42 C83 34 56 35 22 43 Z"
            fill={
              palette.dark
            }
            stroke={
              palette.metallic
            }
            strokeWidth="2.5"
          />
        </svg>

        <p className="relative z-10 max-w-[170px] truncate px-3 text-center text-[9px] font-semibold uppercase tracking-[0.12em] text-[#E8D7AE]">
          {motto}
        </p>
      </div>

      <p className="mt-2 max-w-[190px] truncate text-[8px] font-semibold uppercase tracking-[0.24em] text-[#8D7A58]">
        House of {familyName}
      </p>
    </div>
  );
}

function QuarteredShield({
  shield,
  composition,
  initials,
  palette,
}: {
  shield: BuilderShieldStyle;
  composition: HeraldShieldComposition;
  initials: string;
  palette: CrestPalette;
}) {
  const shieldPath =
    getShieldPath(
      shield,
    );

  const quadrantI =
    composition.quadrants.find(
      (quadrant) =>
        quadrant.id === "I",
    );

  const quadrantII =
    composition.quadrants.find(
      (quadrant) =>
        quadrant.id === "II",
    );

  const quadrantIII =
    composition.quadrants.find(
      (quadrant) =>
        quadrant.id === "III",
    );

  const quadrantIV =
    composition.quadrants.find(
      (quadrant) =>
        quadrant.id === "IV",
    );

  return (
    <svg
      viewBox="0 0 200 235"
      className="h-full w-full drop-shadow-[0_14px_18px_rgba(0,0,0,0.45)]"
      role="img"
      aria-label="Quartered family shield"
    >
      <defs>
        <clipPath id="builder-quarter-shield-clip">
          <path
            d={
              shieldPath
            }
          />
        </clipPath>

        <linearGradient
          id="builder-gold"
          x1="0"
          y1="0"
          x2="1"
          y2="1"
        >
          <stop
            offset="0%"
            stopColor={
              palette.ivory
            }
          />

          <stop
            offset="45%"
            stopColor={
              palette.metallic
            }
          />

          <stop
            offset="100%"
            stopColor="#80652F"
          />
        </linearGradient>
      </defs>

      <g clipPath="url(#builder-quarter-shield-clip)">
        <rect
          width="100"
          height="118"
          fill={
            palette.primary
          }
        />

        <rect
          x="100"
          width="100"
          height="118"
          fill={
            palette.secondary
          }
        />

        <rect
          y="118"
          width="100"
          height="117"
          fill={
            palette.secondary
          }
        />

        <rect
          x="100"
          y="118"
          width="100"
          height="117"
          fill={
            palette.primary
          }
        />

        <line
          x1="100"
          y1="0"
          x2="100"
          y2="235"
          stroke={
            palette.metallic
          }
          strokeWidth="3"
        />

        <line
          x1="0"
          y1="118"
          x2="200"
          y2="118"
          stroke={
            palette.metallic
          }
          strokeWidth="3"
        />

        <QuadrantContent
          quadrant={
            quadrantI
          }
          centerX={50}
          centerY={60}
          palette={
            palette
          }
          initials={
            initials
          }
        />

        <QuadrantContent
          quadrant={
            quadrantII
          }
          centerX={150}
          centerY={60}
          palette={
            palette
          }
          initials={
            initials
          }
        />

        <QuadrantContent
          quadrant={
            quadrantIII
          }
          centerX={50}
          centerY={172}
          palette={
            palette
          }
          initials={
            initials
          }
        />

        <QuadrantContent
          quadrant={
            quadrantIV
          }
          centerX={150}
          centerY={172}
          palette={
            palette
          }
          initials={
            initials
          }
        />
      </g>

      <path
        d={
          shieldPath
        }
        fill="none"
        stroke="url(#builder-gold)"
        strokeWidth="8"
        strokeLinejoin="round"
      />

      <path
        d={
          shieldPath
        }
        fill="none"
        stroke={
          palette.dark
        }
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function QuadrantContent({
  quadrant,
  centerX,
  centerY,
  palette,
  initials,
}: {
  quadrant?: HeraldQuadrant;
  centerX: number;
  centerY: number;
  palette: CrestPalette;
  initials: string;
}) {
  if (
    !quadrant ||
    quadrant.type === "empty"
  ) {
    return (
      <EmptyQuadrantMark
        x={
          centerX
        }
        y={
          centerY
        }
        palette={
          palette
        }
        initials={
          initials
        }
      />
    );
  }

  if (
    quadrant.type ===
    "heritage"
  ) {
    const heritage =
      quadrant.heritage ??
      quadrant.label ??
      "";

    const flag =
      heritageFlags[
        heritage
      ] ?? "⚑";

    return (
      <text
        x={
          centerX
        }
        y={
          centerY
        }
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="34"
      >
        {flag}
      </text>
    );
  }

  if (
    quadrant.type ===
    "animal"
  ) {
    return (
      <AnimalCharge
        animal={
          quadrant.label ??
          assetIdToAnimal(
            quadrant.assetId,
          ) ??
          "Lion"
        }
        x={
          centerX
        }
        y={
          centerY
        }
        fill={
          palette.metallic
        }
        accent={
          palette.dark
        }
      />
    );
  }

  if (
    quadrant.type ===
    "symbol"
  ) {
    return (
      <ValueSymbol
        value={
          quadrant.label ??
          quadrant.meaning ??
          "Legacy"
        }
        x={
          centerX
        }
        y={
          centerY
        }
        fill={
          palette.primary
        }
        metallic={
          palette.metallic
        }
      />
    );
  }

  return (
    <GenericQuadrantMark
      quadrant={
        quadrant
      }
      x={
        centerX
      }
      y={
        centerY
      }
      palette={
        palette
      }
    />
  );
}

function EmptyQuadrantMark({
  x,
  y,
  palette,
  initials,
}: {
  x: number;
  y: number;
  palette: CrestPalette;
  initials: string;
}) {
  return (
    <g opacity="0.28">
      <circle
        cx={
          x
        }
        cy={
          y
        }
        r="25"
        fill="none"
        stroke={
          palette.metallic
        }
        strokeWidth="2"
        strokeDasharray="4 5"
      />

      <text
        x={
          x
        }
        y={
          y + 1
        }
        textAnchor="middle"
        dominantBaseline="middle"
        fill={
          palette.metallic
        }
        fontSize="11"
        fontWeight="700"
        letterSpacing="2"
      >
        {initials
          .slice(0, 2)
          .toUpperCase()}
      </text>
    </g>
  );
}

function GenericQuadrantMark({
  quadrant,
  x,
  y,
  palette,
}: {
  quadrant: HeraldQuadrant;
  x: number;
  y: number;
  palette: CrestPalette;
}) {
  const mark =
    getGenericTypeMark(
      quadrant.type,
    );

  return (
    <g>
      <circle
        cx={
          x
        }
        cy={
          y
        }
        r="27"
        fill="none"
        stroke={
          palette.metallic
        }
        strokeWidth="2"
      />

      <text
        x={
          x
        }
        y={
          y + 1
        }
        textAnchor="middle"
        dominantBaseline="middle"
        fill={
          palette.metallic
        }
        fontSize="21"
        fontWeight="700"
      >
        {mark}
      </text>
    </g>
  );
}

function AnimalCharge({
  animal,
  x,
  y,
  fill,
  accent,
}: {
  animal: string;
  x: number;
  y: number;
  fill: string;
  accent: string;
}) {
  /*
   * =======================================================
   * CANON ASSET
   * =======================================================
   *
   * Lion is now rendered directly from the Visual Canon.
   *
   * The canonical lion uses a 100 x 120 coordinate system.
   * We scale it to 44% and position the resulting artwork
   * around the requested quadrant center.
   *
   * Eagle, Wolf, Bear and Stag remain transitional preview
   * geometry until their canonical SVG modules are created.
   * =======================================================
   */

  if (
    animal === "Lion"
  ) {
    const scale = 0.44;

    const lionWidth =
      100 * scale;

    const lionHeight =
      120 * scale;

    const left =
      x - lionWidth / 2;

    const top =
      y - lionHeight / 2;

    return (
      <LionRampant
        fill={
          fill
        }
        accent={
          accent
        }
        transform={`translate(${left} ${top}) scale(${scale})`}
      />
    );
  }

  if (
    animal === "Eagle"
  ) {
    return (
      <g
        transform={`translate(${x - 27} ${y - 28}) scale(0.7)`}
        fill={fill}
      >
        <path d="M35 22 C20 7 6 10 -8 20 C6 23 17 31 25 42 C12 37 2 40 -8 48 C9 52 22 60 33 74 L39 50 Z" />

        <path d="M43 22 C58 7 72 10 86 20 C72 23 61 31 53 42 C66 37 76 40 86 48 C69 52 56 60 45 74 L39 50 Z" />

        <path d="M32 22 C36 14 42 14 46 22 L45 62 L39 77 L33 62 Z" />
      </g>
    );
  }

  if (
    animal === "Wolf"
  ) {
    return (
      <g
        transform={`translate(${x - 25} ${y - 27}) scale(0.7)`}
        fill={fill}
      >
        <path d="M9 20 L0 0 L17 14 C27 8 42 8 52 14 L69 0 L60 21 C68 31 69 42 65 52 C59 68 47 77 35 78 C22 76 10 68 5 53 C2 42 4 30 9 20 Z" />

        <path
          d="M22 50 C29 45 41 45 48 50 C44 59 39 63 35 63 C31 63 26 59 22 50 Z"
          fill={accent}
        />
      </g>
    );
  }

  if (
    animal === "Bear"
  ) {
    return (
      <g
        transform={`translate(${x - 24} ${y - 27}) scale(0.7)`}
        fill={fill}
      >
        <circle
          cx="13"
          cy="14"
          r="10"
        />

        <circle
          cx="55"
          cy="14"
          r="10"
        />

        <path d="M8 25 C13 10 25 7 34 7 C43 7 55 10 60 25 C67 46 55 69 34 73 C13 69 1 46 8 25 Z" />

        <path
          d="M21 49 C27 44 41 44 47 49 C44 58 39 62 34 62 C29 62 24 58 21 49 Z"
          fill={accent}
        />
      </g>
    );
  }

  if (
    animal === "Stag"
  ) {
    return (
      <g
        transform={`translate(${x - 20} ${y - 27}) scale(0.7)`}
        fill={fill}
        stroke={fill}
        strokeLinecap="round"
      >
        <path
          d="M18 30 C10 38 9 52 15 63 C20 73 29 78 37 77 C47 75 55 65 55 54 C55 42 48 33 39 30 C33 28 24 28 18 30 Z"
          stroke="none"
        />

        <path
          d="M20 28 C9 18 5 8 8 -3 M10 15 L-1 8 M12 7 L19 -3 M38 28 C49 18 53 8 50 -3 M48 15 L59 8 M46 7 L39 -3"
          fill="none"
          strokeWidth="5"
        />
      </g>
    );
  }

  /*
   * Unknown animal values intentionally fall back to the
   * canonical lion rather than creating another unofficial
   * animal shape.
   */

  const scale = 0.44;

  const lionWidth =
    100 * scale;

  const lionHeight =
    120 * scale;

  return (
    <LionRampant
      fill={
        fill
      }
      accent={
        accent
      }
      transform={`translate(${x - lionWidth / 2} ${
        y - lionHeight / 2
      }) scale(${scale})`}
    />
  );
}

function ValueSymbol({
  value,
  x,
  y,
  fill,
  metallic,
}: {
  value: string;
  x: number;
  y: number;
  fill: string;
  metallic: string;
}) {
  if (
    value === "Unity"
  ) {
    return (
      <g
        transform={`translate(${x} ${y})`}
        fill="none"
        stroke={fill}
        strokeWidth="6"
      >
        <circle
          cx="-9"
          cy="0"
          r="17"
        />

        <circle
          cx="9"
          cy="0"
          r="17"
        />
      </g>
    );
  }

  if (
    value === "Honor"
  ) {
    return (
      <g
        transform={`translate(${x} ${y})`}
      >
        <path
          d="M0 -29 L7 -8 L29 -8 L11 5 L18 27 L0 14 L-18 27 L-11 5 L-29 -8 L-7 -8 Z"
          fill={fill}
        />
      </g>
    );
  }

  if (
    value === "Service"
  ) {
    return (
      <g
        transform={`translate(${x} ${y})`}
        fill="none"
        stroke={fill}
        strokeWidth="7"
        strokeLinecap="round"
      >
        <path d="M0 -29 V29 M-21 -8 H21" />
      </g>
    );
  }

  if (
    value ===
    "Resilience"
  ) {
    return (
      <g
        transform={`translate(${x} ${y})`}
        fill="none"
        stroke={fill}
        strokeWidth="5"
        strokeLinecap="round"
      >
        <path d="M0 27 V-25 M0 -9 C-12 -18 -20 -18 -27 -14 M0 2 C13 -7 21 -7 28 -2 M0 14 C-11 7 -19 7 -25 11" />
      </g>
    );
  }

  if (
    value === "Legacy"
  ) {
    return (
      <g
        transform={`translate(${x} ${y})`}
      >
        <circle
          r="28"
          fill="none"
          stroke={fill}
          strokeWidth="4"
        />

        <circle
          r="18"
          fill="none"
          stroke={metallic}
          strokeWidth="3"
        />

        <circle
          r="6"
          fill={fill}
        />
      </g>
    );
  }

  return (
    <g
      transform={`translate(${x} ${y})`}
      fill={fill}
    >
      <path d="M-6 -30 H6 V-7 H24 V5 H6 V30 H-6 V5 H-24 V-7 H-6 Z" />

      <path
        d="M0 -30 L7 -42 L14 -30 Z"
        fill={metallic}
      />
    </g>
  );
}

function CrownPreview({
  crown,
  metallic,
  ivory,
}: {
  crown: CrestCrown;
  metallic: string;
  ivory: string;
}) {
  if (
    crown === "None"
  ) {
    return (
      <div className="h-5" />
    );
  }

  const peak =
    crown === "Royal"
      ? 10
      : crown === "Ducal"
        ? 16
        : crown === "Count"
          ? 21
          : 26;

  return (
    <svg
      viewBox="0 0 100 64"
      className="h-[48px] w-[82px]"
      aria-hidden="true"
    >
      <path
        d={`M14 44 L25 27 L37 41 L50 ${peak} L63 41 L75 27 L86 44 L81 55 H19 Z`}
        fill={
          metallic
        }
        stroke={
          ivory
        }
        strokeWidth="2"
        strokeLinejoin="round"
      />

      <rect
        x="19"
        y="44"
        width="62"
        height="11"
        rx="2"
        fill={
          metallic
        }
        stroke={
          ivory
        }
        strokeWidth="2"
      />

      <circle
        cx="25"
        cy="27"
        r="3"
        fill={
          ivory
        }
      />

      <circle
        cx="50"
        cy={peak}
        r="3"
        fill={
          ivory
        }
      />

      <circle
        cx="75"
        cy="27"
        r="3"
        fill={
          ivory
        }
      />
    </svg>
  );
}

function getQuadrantDisplayName(
  quadrant: HeraldQuadrant,
) {
  if (
    quadrant.type === "empty"
  ) {
    return "Open";
  }

  return (
    quadrant.label ??
    formatQuadrantType(
      quadrant.type,
    )
  );
}

function formatQuadrantType(
  type: HeraldQuadrant["type"],
) {
  switch (type) {
    case "family-branch":
      return "Family Branch";

    case "empty":
      return "Open";

    default:
      return (
        type
          .charAt(0)
          .toUpperCase() +
        type.slice(1)
      );
  }
}

function getGenericTypeMark(
  type: HeraldQuadrant["type"],
) {
  switch (type) {
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
      return "✦";
  }
}

function assetIdToAnimal(
  assetId:
    | HeraldQuadrant["assetId"]
    | undefined,
) {
  switch (assetId) {
    case "lion":
      return "Lion";

    case "eagle":
      return "Eagle";

    case "wolf":
      return "Wolf";

    case "bear":
      return "Bear";

    case "stag":
      return "Stag";

    default:
      return undefined;
  }
}

function getPalette(
  finish: SupportedFinish,
): CrestPalette {
  if (
    finish ===
    "Tactical Subdued"
  ) {
    return {
      primary:
        "#303429",
      secondary:
        "#777B63",
      metallic:
        "#A7AA91",
      ivory:
        "#C1C3B2",
      dark:
        "#181A16",
    };
  }

  if (
    finish ===
    "Heritage Ivory"
  ) {
    return {
      primary:
        "#24251F",
      secondary:
        "#E7D8B4",
      metallic:
        "#B6A47C",
      ivory:
        "#F1E7CF",
      dark:
        "#171815",
    };
  }

  return {
    primary:
      "#20231C",
    secondary:
      "#7A1E24",
    metallic:
      "#C8A969",
    ivory:
      "#E8D7AE",
    dark:
      "#171815",
  };
}

function getShieldPath(
  shield: BuilderShieldStyle,
) {
  switch (shield) {
    case "Norman Shield":
      return "M100 8 C145 8 177 18 184 31 V90 C184 145 148 193 100 225 C52 193 16 145 16 90 V31 C23 18 55 8 100 8 Z";

    case "Tournament Shield":
      return "M24 12 H176 L188 37 L172 154 L100 222 L28 154 L12 37 Z";

    case "Crusader Shield":
      return "M18 12 H182 L190 32 L168 158 L100 224 L32 158 L10 32 Z";

    case "Heater Shield":
    default:
      return "M100 10 C144 10 176 20 184 34 V96 C184 150 152 194 100 224 C48 194 16 150 16 96 V34 C24 20 56 10 100 10 Z";
  }
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

function normalizeShield(
  value: string,
): BuilderShieldStyle {
  if (
    value ===
      "Norman Shield" ||
    value ===
      "Tournament Shield" ||
    value ===
      "Crusader Shield" ||
    value ===
      "Heater Shield"
  ) {
    return value;
  }

  return "Heater Shield";
}

function normalizeCrown(
  value: string,
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

"use client";

import { useId } from "react";

import type {
  BuilderShieldStyle,
  CrestCrown,
} from "@/lib/herald/types";

import { getAnimalReferenceByName } from "@/lib/herald/visualCanon/animalReferences";

import type { SupportedCrestFinish } from "./FamilyCrestPreview";

type Props = {
  familyName: string;
  initials: string;
  motto: string;
  symbol: string;
  shield: BuilderShieldStyle;
  crown: CrestCrown;
  finish: SupportedCrestFinish;
  className?: string;
};

const ANIMALS = [
  "Lion",
  "Eagle",
  "Wolf",
  "Bear",
  "Stag",
  "Griffin",
  "Mako Shark",
  "Salmon",
] as const;

type AnimalName = (typeof ANIMALS)[number];

type AnimalPlacement = {
  x: number;
  y: number;
  width: number;
  height: number;
};

// Master coordinate space: 1341 × 1173.
//
// The shield's usable central region is narrower
// than the full image placement area.
//
// New heraldic animals are fitted conservatively
// to avoid clipping wings, limbs and antlers.
//
// Existing approved animals retain their placements.

const ANIMAL_PLACEMENT: Record<
  AnimalName,
  AnimalPlacement
> = {
  Lion: {
    x: 506,
    y: 450,
    width: 305,
    height: 337,
  },

  Eagle: {
    x: 518,
    y: 461,
    width: 306,
    height: 294,
  },

  Wolf: {
    x: 510,
    y: 457,
    width: 325,
    height: 295,
  },

  Bear: {
    x: 535,
    y: 437,
    width: 275,
    height: 320,
  },

  Stag: {
    x: 510,
    y: 450,
    width: 320,
    height: 330,
  },

  Griffin: {
    x: 503,
    y: 454,
    width: 310,
    height: 322,
  },

  "Mako Shark": {
    x: 461,
    y: 443,
    width: 394,
    height: 370,
  },

  Salmon: {
    x: 493,
    y: 502,
    width: 330,
    height: 228,
  },
};

function clean(value: string, fallback: string) {
  return value.trim().replace(/\s+/g, " ") || fallback;
}

function isAnimal(value: string): value is AnimalName {
  return ANIMALS.some((animal) => animal === value);
}

function nameSize(length: number) {
  if (length > 30) return 29;
  if (length > 24) return 36;
  if (length > 18) return 43;
  if (length > 13) return 50;
  return 61;
}

function mottoSize(length: number) {
  if (length > 40) return 25;
  if (length > 30) return 31;
  if (length > 23) return 37;
  if (length > 17) return 44;
  return 51;
}

export default function HeritageCrestPreview({
  familyName,
  initials: _initials,
  motto,
  symbol,
  shield: _shield,
  crown: _crown,
  finish: _finish,
  className = "",
}: Props) {
  const uid = useId().replace(
    /[^a-zA-Z0-9_-]/g,
    "",
  );

  const namePathId = `heritage-name-${uid}`;
  const mottoPathId = `heritage-motto-${uid}`;
  const animalClipId = `heritage-animal-clip-${uid}`;

  const surname = clean(
    familyName,
    "Family",
  ).toUpperCase();

  const latin = clean(
    motto,
    "Fortis in Familia",
  ).toUpperCase();

  const animal: AnimalName = isAnimal(symbol)
    ? symbol
    : "Lion";

  const animalArtwork =
    getAnimalReferenceByName(animal);

  const placement = ANIMAL_PLACEMENT[animal];

  // Preserve the approved motto-fitting behavior.

  const latinFontSize = mottoSize(latin.length);

  const estimatedTextWidth = [...latin].reduce(
    (width, character) =>
      width +
      (character === " "
        ? 0.32
        : "IÍJL".includes(character)
          ? 0.37
          : "MW".includes(character)
            ? 0.91
            : 0.65) *
        latinFontSize,
    0,
  );

  const fittedMottoLength =
    estimatedTextWidth > 400
      ? 400
      : undefined;

  void _initials;
  void _shield;
  void _crown;
  void _finish;

  return (
    <div className={`w-full ${className}`}>
      <svg
        viewBox="0 0 1341 1173"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label={`${surname} heritage crest with ${animal} and motto ${latin}`}
        className="block h-auto w-full"
        textRendering="geometricPrecision"
      >
        <title>
          {`${surname} — ${latin}`}
        </title>

        <defs>
          {/* Approved surname path. */}
          <path
            id={namePathId}
            d="M 404 219 Q 657 81 909 219"
            fill="none"
          />

          {/* Approved motto path. */}
          <path
            id={mottoPathId}
            d="M 438 882 Q 656 982 874 882"
            fill="none"
          />

          {/* Approved shield clipping region. */}
          <clipPath id={animalClipId}>
            <path d="M 498 457 L 814 457 L 811 646 Q 785 722 657 777 Q 527 721 501 646 Z" />
          </clipPath>
        </defs>

        {/* Approved heritage crest framework. */}
        <image
          href="/images/heritage-blazer/heritage-crest-framework.png"
          x="0"
          y="0"
          width="1341"
          height="1173"
          preserveAspectRatio="xMidYMid meet"
        />

        {/* Selected heraldic animal. */}
        {animalArtwork && (
          <g clipPath={`url(#${animalClipId})`}>
            <image
              href={animalArtwork.transparentSrc}
              x={placement.x}
              y={placement.y}
              width={placement.width}
              height={placement.height}
              preserveAspectRatio="xMidYMid meet"
            />
          </g>
        )}

        {/* Approved surname styling. */}
        <text
          transform="rotate(-2.5 657 170)"
          fill="#F2D69F"
          stroke="#24190E"
          strokeWidth="2.1"
          paintOrder="stroke"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontWeight="bold"
          fontSize={nameSize(surname.length)}
          letterSpacing={
            surname.length > 20 ? 0 : 1
          }
        >
          <textPath
            href={`#${namePathId}`}
            startOffset="52.5%"
            textAnchor="middle"
          >
            {surname}
          </textPath>
        </text>

        {/* Approved motto fitting and alignment. */}
        <text
          transform="translate(10 20) rotate(0.5 657 920)"
          fill="#30200E"
          stroke="#E6C58A"
          strokeWidth="0.6"
          paintOrder="stroke"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontWeight="bold"
          fontStyle="italic"
          fontSize={latinFontSize}
          letterSpacing={
            latin.length > 23 ? 0 : 0.5
          }
          textLength={fittedMottoLength}
          lengthAdjust="spacingAndGlyphs"
        >
          <textPath
            href={`#${mottoPathId}`}
            startOffset="50%"
            textAnchor="middle"
          >
            {latin}
          </textPath>
        </text>
      </svg>
    </div>
  );
}

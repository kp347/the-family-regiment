
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

// Master image coordinate space: 1341 × 1173.
// Preserve the existing animal placements.
// Mako Shark uses a wider composition to accommodate
// its curved body, tail, and restrained wave accents.
const ANIMAL_PLACEMENT: Record<
  AnimalName,
  {
    x: number;
    y: number;
    width: number;
    height: number;
  }
> = {
  Lion: {
    x: 506,
    y: 450,
    width: 305,
    height: 337,
  },

  Eagle: {
    x: 500,
    y: 468,
    width: 316,
    height: 302,
  },

  Wolf: {
    x: 505,
    y: 465,
    width: 308,
    height: 304,
  },

  Bear: {
    x: 502,
    y: 464,
    width: 312,
    height: 309,
  },

  Stag: {
    x: 506,
    y: 453,
    width: 304,
    height: 326,
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

  // Legacy placement for previously saved designs.
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
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");

  const namePathId = `heritage-name-${uid}`;
  const mottoPathId = `heritage-motto-${uid}`;
  const animalClipId = `heritage-animal-clip-${uid}`;

  const surname = clean(familyName, "Family").toUpperCase();
  const latin = clean(motto, "Fortis in Familia").toUpperCase();

  const animal: AnimalName = isAnimal(symbol)
    ? symbol
    : "Lion";

  const animalArtwork = getAnimalReferenceByName(animal);
  const placement = ANIMAL_PLACEMENT[animal];

  // The ornamental PNG has a fixed crown,
  // shield outline, and gold finish.
  // Preserve the shared builder interface.
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
        <title>{`${surname} — ${latin}`}</title>

        <defs>
          {/* Approved upper banner lettering path. */}
          <path
            id={namePathId}
            d="M 404 219 Q 657 81 909 219"
            fill="none"
          />

          {/* Approved lower motto ribbon path. */}
          <path
            id={mottoPathId}
            d="M 438 882 Q 656 982 874 882"
            fill="none"
          />

          {/* Lower shield only: excludes crown and gold perimeter. */}
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

        {/* Selected animal artwork inside the shield. */}
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

        {/* Approved surname alignment — unchanged. */}
        <text
          transform="rotate(-2.5 657 170)"
          fill="#F2D69F"
          stroke="#24190E"
          strokeWidth="2.1"
          paintOrder="stroke"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontWeight="bold"
          fontSize={nameSize(surname.length)}
          letterSpacing={surname.length > 20 ? 0 : 1}
        >
          <textPath
            href={`#${namePathId}`}
            startOffset="52.5%"
            textAnchor="middle"
          >
            {surname}
          </textPath>
        </text>

        {/* Approved motto alignment — unchanged. */}
        <text
          transform="translate(10 20) rotate(0.5 657 920)"
          fill="#30200E"
          stroke="#E6C58A"
          strokeWidth="0.6"
          paintOrder="stroke"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontWeight="bold"
          fontStyle="italic"
          fontSize={mottoSize(latin.length)}
          letterSpacing={latin.length > 23 ? 0 : 0.5}
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

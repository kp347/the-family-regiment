
"use client";

import { useId } from "react";

import type {
  BuilderShieldStyle,
  CrestCrown,
} from "@/lib/herald/types";

import { isCrestAnimal } from "@/lib/herald/types";

import { HEATER_SHIELD_PATH } from "@/lib/herald/svg/shields/heater";
import { FRENCH_SHIELD_PATH } from "@/lib/herald/svg/shields/french";
import { NORMAN_SHIELD_PATH } from "@/lib/herald/svg/shields/norman";
import { SPANISH_SHIELD_PATH } from "@/lib/herald/svg/shields/spanish";
import { TARGE_SHIELD_PATH } from "@/lib/herald/svg/shields/targe";

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

const PALETTES = {
  "Regiment Gold": {
    field: "#11120F",
    thread: "#D4AF6A",
  },
  "Tactical Subdued": {
    field: "#11120F",
    thread: "#626A3A",
  },
  "Heritage Ivory": {
    field: "#24251F",
    thread: "#F1E7CF",
  },
} as const;

const SHIELDS: Record<BuilderShieldStyle, string> = {
  "Heater Shield": HEATER_SHIELD_PATH,
  "French Shield": FRENCH_SHIELD_PATH,
  "Norman Shield": NORMAN_SHIELD_PATH,
  "Spanish Shield": SPANISH_SHIELD_PATH,
  Targe: TARGE_SHIELD_PATH,
};

const CALIBRATION: Record<
  string,
  { scale: number; x: number; y: number }
> = {
  Lion: { scale: 1, x: 0, y: -10 },
  Eagle: { scale: 0.88, x: 0, y: -28 },
  Wolf: { scale: 0.82, x: -3, y: -26 },
  Bear: { scale: 0.82, x: -4, y: -20 },
  Stag: { scale: 0.86, x: 0, y: -28 },
  Griffin: { scale: 0.76, x: 0, y: -29 },
  Salmon: { scale: 0.72, x: 2, y: -25 },
};

function normalize(value: string, fallback: string) {
  return value.trim().replace(/\s+/g, " ") || fallback;
}

function rgb(hex: string) {
  const value = hex.replace("#", "");

  return {
    r: parseInt(value.slice(0, 2), 16) / 255,
    g: parseInt(value.slice(2, 4), 16) / 255,
    b: parseInt(value.slice(4, 6), 16) / 255,
  };
}

function getHouseFontSize(length: number): number {
  if (length > 30) return 6.2;
  if (length > 24) return 7.2;
  if (length > 18) return 8.3;
  if (length > 13) return 9.4;
  return 10.8;
}

function getMottoFontSize(length: number): number {
  if (length > 34) return 6.2;
  if (length > 25) return 7.2;
  if (length > 17) return 8.5;
  return 10;
}

export default function HeritageCrestPreview({
  familyName,
  initials: _initials,
  motto,
  symbol,
  shield,
  crown: _crown,
  finish,
  className = "",
}: Props) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, "");

  const palette =
    PALETTES[finish] ?? PALETTES["Regiment Gold"];

  const house = normalize(
    familyName,
    "Family",
  ).toUpperCase();

  const houseText = `HOUSE OF ${house}`;

  const latin = normalize(
    motto,
    "Fortis in Familia",
  ).toUpperCase();

  const animal = isCrestAnimal(symbol)
    ? symbol
    : "Lion";

  const artwork = getAnimalReferenceByName(animal);

  const calibration = CALIBRATION[animal] ?? {
    scale: 1,
    x: 0,
    y: 0,
  };

  const scale =
    (artwork?.scale ?? 1) * calibration.scale;

  const imageWidth = 106 * scale;
  const imageHeight = 116 * scale;

  const imageX =
    100 - imageWidth / 2 + calibration.x;

  const imageY =
    105 -
    (imageHeight - 96) / 2 +
    calibration.y -
    29;

  const shieldPath =
    SHIELDS[shield] ?? HEATER_SHIELD_PATH;

  const clipId = `heritage-clip-${id}`;
  const colorId = `heritage-color-${id}`;
  const housePathId = `heritage-house-${id}`;
  const mottoPathId = `heritage-motto-${id}`;

  const { r, g, b } = rgb(palette.thread);

  const useOriginalAnimalColor =
    finish === "Regiment Gold";

  const houseFontSize = getHouseFontSize(
    houseText.length,
  );

  const mottoFontSize = getMottoFontSize(
    latin.length,
  );

  void _initials;
  void _crown;

  const title =
    `${houseText}, ${animal} crest, ${latin}`;

  return (
    <div className={`w-full ${className}`}>
      <svg
        viewBox="0 0 200 205"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label={title}
        className="block h-auto w-full overflow-visible"
        shapeRendering="geometricPrecision"
        textRendering="geometricPrecision"
      >
        <title>{title}</title>

        <defs>
          {/* Shield clipping */}
          <clipPath id={clipId}>
            <path
              d={shieldPath}
              transform="translate(50 35)"
            />
          </clipPath>

          {/*
            Wide House Name arc.

            The path extends almost across the entire
            crest width to prevent clipping of longer
            House Names.
          */}
          <path
            id={housePathId}
            d="M12 43 Q100 0 188 43"
            fill="none"
          />

          {/* Curved motto text path */}
          <path
            id={mottoPathId}
            d="M40 169 Q100 180 160 169"
            fill="none"
          />

          {/* Thread color treatment */}
          <filter
            id={colorId}
            x="-10%"
            y="-10%"
            width="120%"
            height="120%"
            colorInterpolationFilters="sRGB"
          >
            <feColorMatrix
              type="matrix"
              values="
                0.299 0.587 0.114 0 0
                0.299 0.587 0.114 0 0
                0.299 0.587 0.114 0 0
                0 0 0 1 0
              "
              result="luminance"
            />

            <feColorMatrix
              in="luminance"
              type="matrix"
              values={`
                ${r} 0 0 0 0
                0 ${g} 0 0 0
                0 0 ${b} 0 0
                0 0 0 1 0
              `}
            />
          </filter>
        </defs>

        {/* ARCHED HOUSE NAME */}
        <text
          fill={palette.thread}
          fontFamily="Georgia, serif"
          fontSize={houseFontSize}
          fontWeight="bold"
          letterSpacing={
            houseText.length > 18 ? 0.1 : 0.3
          }
        >
          <textPath
            href={`#${housePathId}`}
            startOffset="50%"
            textAnchor="middle"
          >
            {houseText}
          </textPath>
        </text>

        {/* MAIN HERALDIC SHIELD */}
        <path
          d={shieldPath}
          transform="translate(50 35)"
          fill={palette.field}
          stroke={palette.thread}
          strokeWidth="4.5"
          strokeLinejoin="round"
        />

        {/* INNER SHIELD DETAIL */}
        <path
          d={shieldPath}
          transform="translate(50 35) scale(0.9) translate(5 6)"
          fill="none"
          stroke={palette.thread}
          strokeWidth="1.4"
          strokeLinejoin="round"
          opacity="0.65"
        />

        {/* APPROVED VISUAL CANON ANIMAL */}
        <g clipPath={`url(#${clipId})`}>
          {artwork && (
            <image
              href={artwork.transparentSrc}
              x={imageX}
              y={imageY}
              width={imageWidth}
              height={imageHeight}
              preserveAspectRatio="xMidYMid meet"
              filter={
                useOriginalAnimalColor
                  ? undefined
                  : `url(#${colorId})`
              }
            />
          )}
        </g>

        {/* LEFT SCROLL TAIL */}
        <path
          d="
            M39 155
            L20 163
            L34 174
            L25 187
            L53 180
          "
          fill={palette.field}
          stroke={palette.thread}
          strokeWidth="1.8"
          strokeLinejoin="round"
        />

        {/* RIGHT SCROLL TAIL */}
        <path
          d="
            M161 155
            L180 163
            L166 174
            L175 187
            L147 180
          "
          fill={palette.field}
          stroke={palette.thread}
          strokeWidth="1.8"
          strokeLinejoin="round"
        />

        {/* MAIN HERALDIC MOTTO SCROLL */}
        <path
          d="
            M35 153
            Q100 165 165 153
            L160 181
            Q100 194 40 181
            Z
          "
          fill={palette.field}
          stroke={palette.thread}
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* INNER SCROLL STITCH DETAIL */}
        <path
          d="M42 158 Q100 169 158 158"
          fill="none"
          stroke={palette.thread}
          strokeWidth="0.7"
          opacity="0.45"
        />

        {/* CURVED LATIN MOTTO */}
        <text
          fill={palette.thread}
          fontFamily="Georgia, serif"
          fontSize={mottoFontSize}
          fontWeight="bold"
          fontStyle="italic"
          letterSpacing={
            latin.length > 24 ? 0 : 0.15
          }
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


"use client";

import { useId } from "react";

import type {
  BuilderCrestSpec,
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

type HeritageCrestPreviewProps = {
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

const ANIMAL_CALIBRATION: Record<
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

function cleanText(value: string, fallback: string) {
  return value.trim().replace(/\s+/g, " ") || fallback;
}

function colorChannels(hex: string) {
  const value = hex.replace("#", "");

  return {
    r: parseInt(value.slice(0, 2), 16) / 255,
    g: parseInt(value.slice(2, 4), 16) / 255,
    b: parseInt(value.slice(4, 6), 16) / 255,
  };
}

export default function HeritageCrestPreview({
  familyName,
  initials,
  motto,
  symbol,
  shield,
  crown: _crown,
  finish,
  className = "",
}: HeritageCrestPreviewProps) {
  const instanceId = useId().replace(/[^a-zA-Z0-9_-]/g, "");

  const palette = PALETTES[finish] ?? PALETTES["Regiment Gold"];

  const houseName = cleanText(familyName, "Family");
  const houseInitials = cleanText(initials, "FR");
  const latinMotto = cleanText(motto, "Fortis in Familia");

  const animal = isCrestAnimal(symbol) ? symbol : "Lion";

  const shieldPath = SHIELDS[shield] ?? HEATER_SHIELD_PATH;
  const artwork = getAnimalReferenceByName(animal);

  const calibration = ANIMAL_CALIBRATION[animal] ?? {
    scale: 1,
    x: 0,
    y: 0,
  };

  const scale = (artwork?.scale ?? 1) * calibration.scale;

  const width = 106 * scale;
  const height = 116 * scale;

  const imageX = 100 - width / 2 + calibration.x;
  const imageY =
    105 - (height - 96) / 2 + calibration.y;

  const clipId = `heritage-clip-${instanceId}`;
  const filterId = `heritage-charge-${instanceId}`;
  const shadowId = `heritage-shadow-${instanceId}`;

  const { r, g, b } = colorChannels(palette.thread);

  // Retained for compatibility with the shared heraldic identity.
  // Initials are not displayed in the Heritage Crest.
  void houseInitials;

  return (
    <div
      className={`relative mx-auto w-full max-w-[340px] ${className}`}
    >
      <svg
        viewBox="0 0 200 270"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label={`Heritage crest for ${houseName}, featuring a ${animal} and the motto ${latinMotto}`}
        className="h-auto w-full overflow-visible"
      >
        <title>{`House of ${houseName} — Heritage Crest`}</title>

        <defs>
          <clipPath id={clipId}>
            <path
              d={shieldPath}
              transform="translate(50 64)"
            />
          </clipPath>

          <filter
            id={shadowId}
            x="-30%"
            y="-30%"
            width="160%"
            height="170%"
          >
            <feDropShadow
              dx="0"
              dy="3"
              stdDeviation="3"
              floodColor="#000000"
              floodOpacity="0.35"
            />
          </filter>

          <filter
            id={filterId}
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
                0     0     0     1 0
              "
              result="luminance"
            />

            <feComponentTransfer
              in="luminance"
              result="contrast"
            >
              <feFuncR
                type="gamma"
                amplitude="1.28"
                exponent="0.82"
                offset="0"
              />
              <feFuncG
                type="gamma"
                amplitude="1.28"
                exponent="0.82"
                offset="0"
              />
              <feFuncB
                type="gamma"
                amplitude="1.28"
                exponent="0.82"
                offset="0"
              />
            </feComponentTransfer>

            <feColorMatrix
              in="contrast"
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

        <g filter={`url(#${shadowId})`}>
          {/* House name: traditional heraldic heading */}
          <text
            x="100"
            y="34"
            textAnchor="middle"
            fill={palette.thread}
            fontFamily="Georgia, 'Times New Roman', serif"
            fontSize={
              houseName.length > 18
                ? 9
                : houseName.length > 12
                  ? 11
                  : 13
            }
            fontWeight="bold"
            letterSpacing="0.6"
            textLength={
              houseName.length > 22 ? 166 : undefined
            }
            lengthAdjust="spacingAndGlyphs"
          >
            {`HOUSE OF ${houseName.toUpperCase()}`}
          </text>

          {/* Decorative heading rule */}
          <path
            d="M55 44 H145"
            stroke={palette.thread}
            strokeWidth="1"
            opacity="0.8"
          />

          <path
            d="M92 44 L100 40 L108 44 L100 48 Z"
            fill={palette.thread}
          />

          {/* Traditional heraldic shield */}
          <path
            d={shieldPath}
            transform="translate(50 64)"
            fill={palette.field}
            stroke={palette.thread}
            strokeWidth="5"
            strokeLinejoin="round"
          />

          <path
            d={shieldPath}
            transform="translate(50 64) scale(0.9) translate(5 6)"
            fill="none"
            stroke={palette.thread}
            strokeWidth="1.8"
            strokeLinejoin="round"
            opacity="0.62"
          />

          {/* Approved Visual Canon animal */}
          <g clipPath={`url(#${clipId})`}>
            {artwork && (
              <image
                href={artwork.transparentSrc}
                x={imageX}
                y={imageY}
                width={width}
                height={height}
                preserveAspectRatio="xMidYMid meet"
                filter={`url(#${filterId})`}
              />
            )}
          </g>

          {/* Traditional heraldic motto scroll */}
          <path
            d="
              M22 201
              Q100 215 178 201
              L171 230
              Q100 242 29 230
              Z
            "
            fill={palette.field}
            stroke={palette.thread}
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          <path
            d="M22 201 L10 209 L22 221 L15 235 L38 231"
            fill={palette.field}
            stroke={palette.thread}
            strokeWidth="1.8"
          />

          <path
            d="M178 201 L190 209 L178 221 L185 235 L162 231"
            fill={palette.field}
            stroke={palette.thread}
            strokeWidth="1.8"
          />

          <text
            x="100"
            y="223"
            textAnchor="middle"
            fill={palette.thread}
            fontFamily="Georgia, 'Times New Roman', serif"
            fontSize={
              latinMotto.length > 24
                ? 7.2
                : latinMotto.length > 17
                  ? 8.5
                  : 10
            }
            fontWeight="bold"
            fontStyle="italic"
            letterSpacing="0.25"
            textLength={
              latinMotto.length > 24 ? 135 : undefined
            }
            lengthAdjust="spacingAndGlyphs"
          >
            {latinMotto.toUpperCase()}
          </text>
        </g>
      </svg>
    </div>
  );
}

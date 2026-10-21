
"use client";

import { useId } from "react";

import type { BuilderCrestSpec } from "@/lib/herald/types";

import { HEATER_SHIELD_PATH } from "./shields/heater";
import { FRENCH_SHIELD_PATH } from "./shields/french";
import { NORMAN_SHIELD_PATH } from "./shields/norman";
import { SPANISH_SHIELD_PATH } from "./shields/spanish";
import { TARGE_SHIELD_PATH } from "./shields/targe";

import {
  getAnimalReferenceByName,
} from "@/lib/herald/visualCanon/animalReferences";

/*
 * =========================================================
 * The Family Regiment
 * Customer-Facing Crest Renderer
 * =========================================================
 *
 * V1 PRESENTATION CANON
 *
 * TOP:
 * Compact fitted surname rocker with pronounced curved text
 *
 * CENTER:
 * Shield + one dominant approved Canon animal
 *
 * BOTTOM:
 * Compact fitted motto rocker
 *
 * The three elements are intentionally composed as one
 * unified military-inspired insignia.
 *
 * Crowns and initials are not rendered in the customer-facing
 * V1 crest.
 *
 * This renderer DOES NOT replace the controlled SVG animal
 * masters used by the production/export pipeline.
 * =========================================================
 */

type CrestRendererProps = {
  crest: BuilderCrestSpec;
  className?: string;
  title?: string;
  chargeColor?: string;
};

const DEFAULT_FIELD = "#11120F";
const DEFAULT_IVORY = "#E8D7AE";
const DEFAULT_GOLD = "#D4AF6A";

const shieldPaths: Record<
  BuilderCrestSpec["shield"],
  string
> = {
  "Heater Shield": HEATER_SHIELD_PATH,
  "French Shield": FRENCH_SHIELD_PATH,
  "Norman Shield": NORMAN_SHIELD_PATH,
  "Spanish Shield": SPANISH_SHIELD_PATH,
  Targe: TARGE_SHIELD_PATH,
};

function getShieldPath(
  shield: BuilderCrestSpec["shield"],
): string {
  return shieldPaths[shield];
}

function resolveFieldColor(
  value: string | undefined,
): string {
  return value?.trim() || DEFAULT_FIELD;
}

function resolveSecondaryColor(
  value: string | undefined,
): string {
  return value?.trim() || DEFAULT_IVORY;
}

function resolveMetallicColor(
  value: string | undefined,
): string {
  if (value === "silver") {
    return "#D8DCE2";
  }

  return DEFAULT_GOLD;
}

function hexToRgb01(hex: string) {
  const normalized = hex.replace("#", "").trim();

  const expanded =
    normalized.length === 3
      ? normalized
          .split("")
          .map((value) => value + value)
          .join("")
      : normalized;

  const numeric = Number.parseInt(expanded, 16);

  if (
    Number.isNaN(numeric) ||
    expanded.length !== 6
  ) {
    return {
      r: 0.83,
      g: 0.69,
      b: 0.42,
    };
  }

  return {
    r: ((numeric >> 16) & 255) / 255,
    g: ((numeric >> 8) & 255) / 255,
    b: (numeric & 255) / 255,
  };
}

function normalizeRockerText(
  value: string | undefined,
  fallback: string,
  maxLength: number,
): string {
  const normalized = value
    ?.trim()
    .replace(/\s+/g, " ");

  return (normalized || fallback)
    .slice(0, maxLength)
    .toUpperCase();
}

export default function CrestRenderer({
  crest,
  className = "",
  title,
  chargeColor,
}: CrestRendererProps) {
  const instanceId = useId().replace(
    /[^a-zA-Z0-9_-]/g,
    "",
  );

  const primary = resolveFieldColor(
    crest.colors?.primary,
  );

  const metallic = resolveMetallicColor(
    crest.colors?.metallic,
  );

  const presentationColor =
    chargeColor?.trim() || metallic;

  const familyName = normalizeRockerText(
    crest.heritage,
    "FAMILY",
    18,
  );

  const motto = normalizeRockerText(
    crest.motto,
    "FORTIS IN FAMILIA",
    28,
  );

  const accessibleTitle =
    title ??
    `${familyName} family crest featuring a ${crest.animal}`;

  const shieldPath = getShieldPath(crest.shield);

  const shadowId = `crest-shadow-${instanceId}`;
  const clipId = `crest-shield-clip-${instanceId}`;
  const chargeFilterId = `crest-charge-filter-${instanceId}`;
  const topTextPathId = `crest-top-text-${instanceId}`;
  const bottomTextPathId = `crest-bottom-text-${instanceId}`;

  return (
    <svg
      viewBox="0 0 200 250"
      role="img"
      aria-label={accessibleTitle}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
    >
      <title>{accessibleTitle}</title>

      <defs>
        <filter
          id={shadowId}
          x="-20%"
          y="-20%"
          width="140%"
          height="150%"
        >
          <feDropShadow
            dx="0"
            dy="3"
            stdDeviation="3"
            floodColor="#000000"
            floodOpacity="0.38"
          />
        </filter>

        <clipPath id={clipId}>
          <path
            d={shieldPath}
            transform="translate(50 64)"
          />
        </clipPath>

        <CanonChargeFilter
          id={chargeFilterId}
          color={presentationColor}
        />

        {/*
         * TOP TEXT PATH
         *
         * Pronounced curved surname lettering.
         * Approved V1 rocker geometry is unchanged.
         */}
        <path
          id={topTextPathId}
          d="M63 64 Q100 52 137 64"
          fill="none"
        />

        {/*
         * BOTTOM MOTTO PATH
         *
         * Approved V1 motto curvature is unchanged.
         */}
        <path
          id={bottomTextPathId}
          d="M59 193 Q100 203 141 193"
          fill="none"
        />
      </defs>

      <g filter={`url(#${shadowId})`}>
        <TopRocker
          surname={familyName}
          fill={primary}
          stroke={presentationColor}
          textColor={presentationColor}
          textPathId={topTextPathId}
        />

        <Shield
          path={shieldPath}
          primary={primary}
          secondary={presentationColor}
        />

        <g clipPath={`url(#${clipId})`}>
          <CanonAnimalCharge
            animal={crest.animal}
            filterId={chargeFilterId}
          />
        </g>

        <BottomRocker
          motto={motto}
          fill={primary}
          stroke={presentationColor}
          textColor={presentationColor}
          textPathId={bottomTextPathId}
        />
      </g>
    </svg>
  );
}

/*
 * =========================================================
 * SHIELD
 * =========================================================
 */

function Shield({
  path,
  primary,
  secondary,
}: {
  path: string;
  primary: string;
  secondary: string;
}) {
  return (
    <g transform="translate(0 2)">
      <path
        d={path}
        transform="translate(50 64)"
        fill={primary}
        stroke={secondary}
        strokeWidth="5"
        strokeLinejoin="round"
      />

      <path
        d={path}
        transform="translate(50 64) scale(0.9) translate(5 6)"
        fill="none"
        stroke={secondary}
        strokeWidth="1.8"
        strokeLinejoin="round"
        opacity="0.62"
      />
    </g>
  );
}

/*
 * =========================================================
 * TOP SURNAME ROCKER
 * =========================================================
 */

function TopRocker({
  surname,
  fill,
  stroke,
  textColor,
  textPathId,
}: {
  surname: string;
  fill: string;
  stroke: string;
  textColor: string;
  textPathId: string;
}) {
  const fontSize =
    surname.length > 14
      ? 7.8
      : surname.length > 10
        ? 8.6
        : 9.4;

  const letterSpacing =
    surname.length > 14
      ? 0.35
      : surname.length > 10
        ? 0.65
        : 0.95;

  return (
    <g>
      <path
        d="
          M57 54
          Q100 42 143 54
          L140 68
          Q100 58 60 68
          Z
        "
        fill={fill}
        stroke={stroke}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      <text
        fontSize={fontSize}
        fontWeight="900"
        letterSpacing={letterSpacing}
        fill={textColor}
      >
        <textPath
          href={`#${textPathId}`}
          startOffset="50%"
          textAnchor="middle"
        >
          {surname}
        </textPath>
      </text>
    </g>
  );
}

/*
 * =========================================================
 * BOTTOM MOTTO ROCKER
 * =========================================================
 */

function BottomRocker({
  motto,
  fill,
  stroke,
  textColor,
  textPathId,
}: {
  motto: string;
  fill: string;
  stroke: string;
  textColor: string;
  textPathId: string;
}) {
  const fontSize =
    motto.length > 22
      ? 6.1
      : motto.length > 16
        ? 6.8
        : 7.8;

  const letterSpacing =
    motto.length > 22
      ? 0.15
      : motto.length > 16
        ? 0.35
        : 0.65;

  return (
    <g>
      <path
        d="
          M54 181
          Q100 193 146 181
          L150 197
          Q100 211 50 197
          Z
        "
        fill={fill}
        stroke={stroke}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      <text
        fontSize={fontSize}
        fontWeight="900"
        letterSpacing={letterSpacing}
        fill={textColor}
      >
        <textPath
          href={`#${textPathId}`}
          startOffset="50%"
          textAnchor="middle"
        >
          {motto}
        </textPath>
      </text>
    </g>
  );
}

/*
 * =========================================================
 * CANON CHARGE COLOR TREATMENT
 * =========================================================
 */

function CanonChargeFilter({
  id,
  color,
}: {
  id: string;
  color: string;
}) {
  const { r, g, b } = hexToRgb01(color);

  return (
    <filter
      id={id}
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

        <feFuncA type="identity" />
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
  );
}

/*
 * =========================================================
 * VISUAL CANON PRIMARY CHARGE
 * =========================================================
 */

type AnimalPresentationCalibration = {
  scale: number;
  x: number;
  y: number;
};

const animalPresentationCalibration: Partial<
  Record<
    BuilderCrestSpec["animal"],
    AnimalPresentationCalibration
  >
> = {
  Lion: {
    scale: 1,
    x: 0,
    y: -10,
  },

  Eagle: {
    scale: 0.88,
    x: 0,
    y: -28,
  },

  Wolf: {
    scale: 0.82,
    x: -3,
    y: -26,
  },

  Bear: {
    scale: 0.82,
    x: -4,
    y: -20,
  },

  Stag: {
    scale: 0.86,
    x: 0,
    y: -28,
  },

  Griffin: {
    scale: 0.76,
    x: 0,
    y: -29,
  },

  "Mako Shark": {
    scale: 0.9,
    x: 0,
    y: -20,
  },
};

function CanonAnimalCharge({
  animal,
  filterId,
}: {
  animal: BuilderCrestSpec["animal"];
  filterId: string;
}) {
  const artwork = getAnimalReferenceByName(animal);

  if (!artwork) {
    return null;
  }

  const calibration =
    animalPresentationCalibration[animal] ?? {
      scale: 1,
      x: 0,
      y: 0,
    };

  const sourceScale = artwork.scale ?? 1;

  const scale = sourceScale * calibration.scale;

  const width = 106 * scale;
  const height = 116 * scale;

  const x =
    100 -
    width / 2 +
    calibration.x;

  const y =
    105 -
    (height - 96) / 2 +
    calibration.y;

  return (
    <image
      href={artwork.transparentSrc}
      x={x}
      y={y}
      width={width}
      height={height}
      preserveAspectRatio="xMidYMid meet"
      filter={`url(#${filterId})`}
      opacity="1"
      style={{
        imageRendering: "auto",
      }}
    />
  );
}

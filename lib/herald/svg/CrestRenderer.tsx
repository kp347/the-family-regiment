"use client";

import type { BuilderCrestSpec } from "@/lib/herald/types";

type CrestRendererProps = {
  crest: BuilderCrestSpec;
  className?: string;
  title?: string;
};

type Point = readonly [number, number];

const shieldPaths: Record<BuilderCrestSpec["shield"], string> = {
  "Heater Shield":
    "M50 8 C72 8 88 13 92 18 V48 C92 72 76 91 50 106 C24 91 8 72 8 48 V18 C12 13 28 8 50 8 Z",
  "Norman Shield":
    "M50 7 C72 7 88 12 92 18 V43 C92 70 74 94 50 110 C26 94 8 70 8 43 V18 C12 12 28 7 50 7 Z",
  "Tournament Shield":
    "M12 10 H88 L94 24 L86 76 L50 108 L14 76 L6 24 Z",
  "Crusader Shield":
    "M9 10 H91 L95 22 L84 78 L50 109 L16 78 L5 22 Z",
};

const crownLabels: Record<Exclude<BuilderCrestSpec["crown"], "None">, string> = {
  Baron: "BARON",
  Count: "COUNT",
  Ducal: "DUCAL",
  Royal: "ROYAL",
};

export default function CrestRenderer({
  crest,
  className = "",
  title,
}: CrestRendererProps) {
  const primary = crest.colors.primary;
  const secondary = crest.colors.secondary;
  const metallic =
    crest.colors.metallic === "silver" ? "#D8DCE2" : "#D4AF6A";

  const accessibleTitle =
    title ??
    `${crest.animal} crest with ${crest.shield} and ${crest.crown} crown`;

  return (
    <svg
      viewBox="0 0 200 250"
      role="img"
      aria-label={accessibleTitle}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{accessibleTitle}</title>

      <defs>
        <filter id="crest-shadow" x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow
            dx="0"
            dy="3"
            stdDeviation="3"
            floodColor="#000000"
            floodOpacity="0.45"
          />
        </filter>

        <clipPath id="crest-shield-clip">
          <path d={shieldPaths[crest.shield]} transform="translate(50 64)" />
        </clipPath>
      </defs>

      <g filter="url(#crest-shadow)">
        {crest.crown !== "None" && (
          <Crown
            style={crest.crown}
            fill={metallic}
            stroke={secondary}
          />
        )}

        <g transform="translate(0 2)">
          <path
            d={shieldPaths[crest.shield]}
            transform="translate(50 64)"
            fill={primary}
            stroke={metallic}
            strokeWidth="5"
            strokeLinejoin="round"
          />

          <path
            d={shieldPaths[crest.shield]}
            transform="translate(50 64) scale(0.9) translate(5 6)"
            fill="none"
            stroke={secondary}
            strokeWidth="1.8"
            strokeLinejoin="round"
            opacity="0.82"
          />

          <g clipPath="url(#crest-shield-clip)">
            <path
              d="M55 123 L145 79 L145 182 L55 226 Z"
              fill={secondary}
              opacity="0.12"
            />

            <AnimalCharge
              animal={crest.animal}
              fill={metallic}
              accent={secondary}
            />
          </g>
        </g>

        {crest.banner && (
          <Banner
            motto={crest.motto}
            fill={secondary}
            stroke={metallic}
            textColor={primary}
          />
        )}

        <Initials
          value={crest.initials}
          fill={secondary}
        />
      </g>
    </svg>
  );
}

function Crown({
  style,
  fill,
  stroke,
}: {
  style: Exclude<BuilderCrestSpec["crown"], "None">;
  fill: string;
  stroke: string;
}) {
  const pointsByStyle: Record<typeof style, Point[]> = {
    Baron: [
      [68, 54],
      [78, 38],
      [88, 54],
      [100, 34],
      [112, 54],
      [122, 38],
      [132, 54],
    ],
    Count: [
      [66, 54],
      [76, 34],
      [88, 51],
      [100, 25],
      [112, 51],
      [124, 34],
      [134, 54],
    ],
    Ducal: [
      [64, 54],
      [75, 31],
      [87, 49],
      [100, 20],
      [113, 49],
      [125, 31],
      [136, 54],
    ],
    Royal: [
      [62, 55],
      [73, 29],
      [86, 48],
      [100, 16],
      [114, 48],
      [127, 29],
      [138, 55],
    ],
  };

  const polygon = pointsByStyle[style]
    .map(([x, y]) => `${x},${y}`)
    .join(" ");

  return (
    <g>
      <polygon
        points={`${polygon} 132,64 68,64`}
        fill={fill}
        stroke={stroke}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      <rect
        x="68"
        y="55"
        width="64"
        height="12"
        rx="3"
        fill={fill}
        stroke={stroke}
        strokeWidth="2.5"
      />

      <circle cx="100" cy="21" r="3.5" fill={stroke} />
      <circle cx="75" cy="33" r="3" fill={stroke} />
      <circle cx="125" cy="33" r="3" fill={stroke} />

      <text
        x="100"
        y="62.5"
        textAnchor="middle"
        fontSize="5.5"
        fontWeight="700"
        letterSpacing="1.2"
        fill="#1B1B18"
      >
        {crownLabels[style]}
      </text>
    </g>
  );
}

function AnimalCharge({
  animal,
  fill,
  accent,
}: {
  animal: BuilderCrestSpec["animal"];
  fill: string;
  accent: string;
}) {
  switch (animal) {
    case "Eagle":
      return <Eagle fill={fill} accent={accent} />;

    case "Wolf":
      return <Wolf fill={fill} accent={accent} />;

    case "Bear":
      return <Bear fill={fill} accent={accent} />;

    case "Stag":
      return <Stag fill={fill} accent={accent} />;

    case "Lion":
    default:
      return <Lion fill={fill} accent={accent} />;
  }
}

function Lion({ fill, accent }: ChargeProps) {
  return (
    <g
      transform="translate(74 92) scale(0.78)"
      fill={fill}
      stroke={accent}
      strokeWidth="2.3"
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      <path d="M43 21 C33 12 18 18 18 31 C18 39 23 44 29 47 C20 51 15 60 16 71 C18 90 34 101 51 94 C62 89 66 77 62 66 C71 66 79 61 83 53 C87 43 84 32 75 26 C67 20 56 20 49 25 C48 23 46 22 43 21 Z" />
      <path d="M48 34 C54 31 62 32 67 37 C62 39 59 43 58 49 C54 45 50 40 48 34 Z" fill={accent} />
      <path d="M25 34 L12 21 L29 25 Z" />
      <path d="M72 31 L88 20 L78 39 Z" />
      <path d="M51 93 C57 108 72 117 88 114 C77 105 74 95 77 84" fill="none" strokeWidth="5" />
      <path d="M31 84 L20 108 M46 91 L41 114 M61 83 L69 108" fill="none" strokeWidth="5" />
      <circle cx="60" cy="36" r="2.4" fill={accent} stroke="none" />
    </g>
  );
}

function Eagle({ fill, accent }: ChargeProps) {
  return (
    <g
      transform="translate(66 102)"
      fill={fill}
      stroke={accent}
      strokeWidth="2.1"
      strokeLinejoin="round"
    >
      <path d="M34 9 C22 4 10 7 2 17 C15 18 24 24 31 35 C20 30 10 32 1 40 C14 41 25 48 33 59 L39 43 L34 9 Z" />
      <path d="M66 9 C78 4 90 7 98 17 C85 18 76 24 69 35 C80 30 90 32 99 40 C86 41 75 48 67 59 L61 43 L66 9 Z" />
      <path d="M38 14 C45 8 55 8 62 14 L61 49 C58 60 53 70 50 78 C47 70 42 60 39 49 Z" />
      <path d="M42 12 L50 2 L58 12 Z" />
      <path d="M42 74 L30 91 L45 84 L50 95 L55 84 L70 91 L58 74 Z" />
      <circle cx="53" cy="15" r="2" fill={accent} stroke="none" />
    </g>
  );
}

function Wolf({ fill, accent }: ChargeProps) {
  return (
    <g
      transform="translate(72 104)"
      fill={fill}
      stroke={accent}
      strokeWidth="2.2"
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      <path d="M22 14 L10 2 L12 28 C5 36 4 49 10 60 C16 71 29 77 41 73 C55 69 63 56 60 42 C58 32 51 24 42 21 L39 5 L31 17 Z" />
      <path d="M19 39 C28 34 39 34 48 39 C43 44 42 50 43 57 C35 53 27 48 19 39 Z" fill={accent} />
      <path d="M15 69 C8 83 10 94 21 103 C19 89 26 81 38 77" fill="none" strokeWidth="5" />
      <circle cx="38" cy="28" r="2.3" fill={accent} stroke="none" />
    </g>
  );
}

function Bear({ fill, accent }: ChargeProps) {
  return (
    <g
      transform="translate(72 102)"
      fill={fill}
      stroke={accent}
      strokeWidth="2.2"
      strokeLinejoin="round"
    >
      <circle cx="23" cy="17" r="9" />
      <circle cx="55" cy="17" r="9" />
      <path d="M14 30 C17 16 30 10 39 10 C48 10 61 16 64 30 C69 51 60 73 39 79 C18 73 9 51 14 30 Z" />
      <path d="M24 47 C31 42 47 42 54 47 C50 57 45 62 39 63 C33 62 28 57 24 47 Z" fill={accent} />
      <path d="M20 70 L12 101 M35 77 L32 105 M52 75 L60 102" fill="none" strokeWidth="6" strokeLinecap="round" />
      <circle cx="31" cy="31" r="2.2" fill={accent} stroke="none" />
      <circle cx="48" cy="31" r="2.2" fill={accent} stroke="none" />
    </g>
  );
}

function Stag({ fill, accent }: ChargeProps) {
  return (
    <g
      transform="translate(74 94)"
      fill={fill}
      stroke={accent}
      strokeWidth="2.2"
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      <path d="M30 30 C18 37 14 52 20 66 C25 77 35 83 46 81 C58 79 67 68 67 55 C67 43 60 33 50 29 C45 27 36 27 30 30 Z" />
      <path d="M28 34 L17 20 L30 24 Z M52 32 L66 19 L59 38 Z" />
      <path d="M31 24 C21 15 18 5 22 -5 M24 13 L14 7 M24 7 L29 -2" fill="none" strokeWidth="5" />
      <path d="M54 24 C64 15 67 5 63 -5 M61 13 L71 7 M61 7 L56 -2" fill="none" strokeWidth="5" />
      <path d="M31 78 L22 105 M46 81 L46 108 M59 73 L68 101" fill="none" strokeWidth="5" />
      <path d="M33 51 C39 47 48 47 53 51 C48 57 43 59 38 57 Z" fill={accent} />
      <circle cx="45" cy="39" r="2.2" fill={accent} stroke="none" />
    </g>
  );
}

function Banner({
  motto,
  fill,
  stroke,
  textColor,
}: {
  motto: string;
  fill: string;
  stroke: string;
  textColor: string;
}) {
  const displayMotto = motto.trim() || "FORTIS IN FAMILIA";

  return (
    <g transform="translate(0 2)">
      <path
        d="M28 205 C52 196 148 196 172 205 L163 231 C135 225 65 225 37 231 Z"
        fill={fill}
        stroke={stroke}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      <path
        d="M28 205 L11 214 L30 220 M172 205 L189 214 L170 220"
        fill={fill}
        stroke={stroke}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      <text
        x="100"
        y="218"
        textAnchor="middle"
        fontSize="8.5"
        fontWeight="800"
        letterSpacing="1.1"
        fill={textColor}
      >
        {displayMotto.slice(0, 28).toUpperCase()}
      </text>
    </g>
  );
}

function Initials({
  value,
  fill,
}: {
  value: string;
  fill: string;
}) {
  const initials = value.trim() || "FR";

  return (
    <text
      x="100"
      y="193"
      textAnchor="middle"
      fontSize="8"
      fontWeight="800"
      letterSpacing="2.2"
      fill={fill}
      opacity="0.9"
    >
      {initials.slice(0, 5).toUpperCase()}
    </text>
  );
}

type ChargeProps = {
  fill: string;
  accent: string;
};
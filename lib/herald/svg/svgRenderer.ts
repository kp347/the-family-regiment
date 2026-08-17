// lib/herald/svg/svgRenderer.ts

import type {
  HeraldDesign,
} from "../design";

/*
 * =========================================================
 * SVG Renderer
 *
 * Converts a HeraldDesign into a complete SVG string.
 *
 * This first version intentionally stays simple:
 * - Shield
 * - Primary charge label
 * - Crown
 * - Motto banner
 *
 * We will replace the placeholder charge text with
 * real vector charge artwork in the next steps.
 * =========================================================
 */

function escapeXml(
  value: string,
): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function renderShield(
  design: HeraldDesign,
): string {
  const fill =
    design.colors.primary;

  const stroke =
    design.colors.metallic === "gold"
      ? "#C8A969"
      : "#D8D8D8";

  switch (design.shield) {
    case "Norman Shield":
      return `
        <path
          d="M150 40
             C220 40 270 70 270 130
             C270 250 220 330 150 380
             C80 330 30 250 30 130
             C30 70 80 40 150 40Z"
          fill="${fill}"
          stroke="${stroke}"
          stroke-width="8"
        />
      `;

    case "Tournament Shield":
      return `
        <path
          d="M45 55
             H255
             V210
             C255 285 215 340 150 380
             C85 340 45 285 45 210Z"
          fill="${fill}"
          stroke="${stroke}"
          stroke-width="8"
        />
      `;

    case "Crusader Shield":
      return `
        <path
          d="M55 45
             H245
             V210
             C245 285 205 340 150 375
             C95 340 55 285 55 210Z"
          fill="${fill}"
          stroke="${stroke}"
          stroke-width="8"
        />
      `;

    case "Heater Shield":
    default:
      return `
        <path
          d="M45 50
             H255
             V190
             C255 285 210 345 150 385
             C90 345 45 285 45 190Z"
          fill="${fill}"
          stroke="${stroke}"
          stroke-width="8"
        />
      `;
  }
}

function renderCharge(
  design: HeraldDesign,
): string {
  const chargeColor =
    design.colors.secondary;

  return `
    <g>
      <circle
        cx="150"
        cy="190"
        r="68"
        fill="none"
        stroke="${chargeColor}"
        stroke-width="4"
        opacity="0.35"
      />

      <text
        x="150"
        y="200"
        text-anchor="middle"
        font-size="30"
        font-family="serif"
        font-weight="700"
        fill="${chargeColor}"
      >
        ${escapeXml(
          design.primaryCharge,
        )}
      </text>
    </g>
  `;
}

function renderCrown(
  design: HeraldDesign,
): string {
  if (
    design.crown === "None"
  ) {
    return "";
  }

  const crownColor =
    design.colors.metallic === "gold"
      ? "#C8A969"
      : "#D8D8D8";

  return `
    <g transform="translate(85 0)">
      <path
        d="M0 45
           L20 15
           L40 45
           L65 5
           L90 45
           L110 15
           L130 45
           L120 70
           H10Z"
        fill="${crownColor}"
        stroke="#171815"
        stroke-width="4"
      />

      <text
        x="65"
        y="92"
        text-anchor="middle"
        font-size="12"
        font-family="sans-serif"
        fill="${crownColor}"
      >
        ${escapeXml(
          design.crown,
        )}
      </text>
    </g>
  `;
}

function renderBanner(
  design: HeraldDesign,
): string {
  if (
    !design.banner ||
    !design.motto.latin.trim()
  ) {
    return "";
  }

  return `
    <g transform="translate(20 405)">
      <path
        d="M0 25
           C50 0 230 0 260 25
           C230 55 50 55 0 25Z"
        fill="#E8D7AE"
        stroke="#171815"
        stroke-width="4"
      />

      <text
        x="130"
        y="31"
        text-anchor="middle"
        font-size="16"
        font-family="serif"
        font-weight="700"
        fill="#171815"
      >
        ${escapeXml(
          design.motto.latin,
        )}
      </text>
    </g>
  `;
}

export function renderHeraldDesign(
  design: HeraldDesign,
): string {
  return `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 300 470"
      role="img"
      aria-label="${escapeXml(
        `${design.familyName} heraldic design`,
      )}"
    >
      ${renderCrown(design)}

      ${renderShield(design)}

      ${renderCharge(design)}

      ${renderBanner(design)}
    </svg>
  `.trim();
}
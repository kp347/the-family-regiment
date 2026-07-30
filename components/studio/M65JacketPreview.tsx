"use client";

import CrestRenderer from "@/lib/herald/svg/CrestRenderer";
import type { BuilderCrestSpec } from "@/lib/herald/types";

export type JacketView = "front" | "back";

export type JacketPatchZone =
  | "left-chest"
  | "right-chest"
  | "left-sleeve"
  | "right-sleeve"
  | "back";

type M65JacketPreviewProps = {
  crest: BuilderCrestSpec;
  familyName: string;
  initials: string;

  view?: JacketView;
  selectedZone?: JacketPatchZone;

  crestScale?: number;
  crestX?: number;
  crestY?: number;
  crestRotation?: number;

  onViewChange?: (view: JacketView) => void;
  onZoneChange?: (zone: JacketPatchZone) => void;
};

type PatchZoneButtonProps = {
  zone: JacketPatchZone;
  label: string;
  selected: boolean;
  className: string;
  onSelect: (zone: JacketPatchZone) => void;
};

export default function M65JacketPreview({
  crest,
  familyName,
  initials,
  view = "front",
  selectedZone = "left-chest",
  crestScale = 100,
  crestX = 0,
  crestY = 0,
  crestRotation = 0,
  onViewChange,
  onZoneChange,
}: M65JacketPreviewProps) {
  const houseName =
    familyName.trim() || "Family";

  const houseInitials =
    initials.trim() || "FR";

  function selectZone(zone: JacketPatchZone) {
    onZoneChange?.(zone);
  }

  return (
    <section className="relative flex min-h-[720px] flex-col overflow-hidden bg-[#CFC6B5]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_32%,rgba(255,253,247,0.95),rgba(233,225,210,0.68)_38%,rgba(177,169,151,0.92)_100%)]" />

      <div
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(46,59,45,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(46,59,45,0.14) 1px, transparent 1px)",
          backgroundSize: "38px 38px",
        }}
      />

      <div className="relative z-20 flex flex-wrap items-center justify-between gap-4 border-b border-[#2E3B2D]/15 bg-[#F5F1E8]/85 px-5 py-4 backdrop-blur-md md:px-7">
        <div>
          <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#B08D57]">
            M65 Field Jacket
          </p>

          <p className="mt-1 font-serif text-xl font-semibold text-[#1F2A20]">
            Garment placement preview
          </p>
        </div>

        <div className="flex border border-[#2E3B2D]/20 bg-[#FFFDF7]">
          <ViewButton
            label="Front"
            active={view === "front"}
            onClick={() => onViewChange?.("front")}
          />

          <ViewButton
            label="Back"
            active={view === "back"}
            onClick={() => onViewChange?.("back")}
          />
        </div>
      </div>

      <div className="relative z-10 flex flex-1 items-center justify-center overflow-hidden px-3 py-8 sm:px-8 md:py-10">
        <div className="relative mx-auto w-full max-w-[700px]">
          {view === "front" ? (
            <FrontJacket
              crest={crest}
              houseName={houseName}
              houseInitials={houseInitials}
              selectedZone={selectedZone}
              crestScale={crestScale}
              crestX={crestX}
              crestY={crestY}
              crestRotation={crestRotation}
              onZoneChange={selectZone}
            />
          ) : (
            <BackJacket
              crest={crest}
              houseName={houseName}
              selectedZone={selectedZone}
              crestScale={crestScale}
              crestX={crestX}
              crestY={crestY}
              crestRotation={crestRotation}
              onZoneChange={selectZone}
            />
          )}
        </div>
      </div>

      <div className="relative z-20 border-t border-[#F5F1E8]/10 bg-[#1F2A20]/96 px-5 py-5 text-[#F5F1E8] backdrop-blur-md md:px-7">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#B08D57]">
              Selected Placement
            </p>

            <p className="mt-2 font-serif text-2xl">
              {getZoneLabel(selectedZone)}
            </p>
          </div>

          <div className="max-w-md">
            <p className="text-xs leading-5 text-[#E9E1D2]/55">
              Select a highlighted garment zone to
              position the family crest. Final sizing
              will be checked against embroidery and
              seam-clearance requirements.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FrontJacket({
  crest,
  houseName,
  houseInitials,
  selectedZone,
  crestScale,
  crestX,
  crestY,
  crestRotation,
  onZoneChange,
}: {
  crest: BuilderCrestSpec;
  houseName: string;
  houseInitials: string;
  selectedZone: JacketPatchZone;
  crestScale: number;
  crestX: number;
  crestY: number;
  crestRotation: number;
  onZoneChange: (zone: JacketPatchZone) => void;
}) {
  return (
    <div className="relative aspect-[0.82] w-full">
      <JacketShadow />

      <svg
        viewBox="0 0 820 1000"
        className="absolute inset-0 h-full w-full"
        role="img"
        aria-label="Front view of an olive M65 field jacket"
      >
        <defs>
          <linearGradient
            id="front-jacket-body"
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop offset="0%" stopColor="#505744" />
            <stop offset="45%" stopColor="#384030" />
            <stop offset="100%" stopColor="#252C22" />
          </linearGradient>

          <linearGradient
            id="front-jacket-sleeve"
            x1="0"
            y1="0"
            x2="0.8"
            y2="1"
          >
            <stop offset="0%" stopColor="#59604B" />
            <stop offset="100%" stopColor="#2B3227" />
          </linearGradient>

          <linearGradient
            id="front-pocket"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="0%" stopColor="#4B533F" />
            <stop offset="100%" stopColor="#343B2E" />
          </linearGradient>

          <filter
            id="front-garment-shadow"
            x="-30%"
            y="-30%"
            width="160%"
            height="160%"
          >
            <feDropShadow
              dx="0"
              dy="20"
              stdDeviation="18"
              floodColor="#182018"
              floodOpacity="0.35"
            />
          </filter>
        </defs>

        <g filter="url(#front-garment-shadow)">
          <path
            d="M285 135 L215 174 L132 316 L72 612 L166 650 L230 461 L218 920 L602 920 L590 461 L654 650 L748 612 L688 316 L605 174 L535 135 L488 105 L332 105 Z"
            fill="url(#front-jacket-body)"
            stroke="#1E251C"
            strokeWidth="8"
            strokeLinejoin="round"
          />

          <path
            d="M284 139 L216 176 L132 317 L72 612 L166 650 L231 456 L239 280 Z"
            fill="url(#front-jacket-sleeve)"
            stroke="#252C22"
            strokeWidth="5"
          />

          <path
            d="M536 139 L604 176 L688 317 L748 612 L654 650 L589 456 L581 280 Z"
            fill="url(#front-jacket-sleeve)"
            stroke="#252C22"
            strokeWidth="5"
          />

          <path
            d="M332 105 L410 202 L488 105 L456 84 L364 84 Z"
            fill="#30382B"
            stroke="#20271E"
            strokeWidth="7"
            strokeLinejoin="round"
          />

          <path
            d="M332 106 L410 202 L364 237 L283 142 Z"
            fill="#454D3A"
            stroke="#252C22"
            strokeWidth="5"
          />

          <path
            d="M488 106 L410 202 L456 237 L537 142 Z"
            fill="#414936"
            stroke="#252C22"
            strokeWidth="5"
          />

          <path
            d="M410 202 L410 918"
            fill="none"
            stroke="#20271E"
            strokeWidth="10"
          />

          <path
            d="M399 210 L399 908"
            fill="none"
            stroke="#59604A"
            strokeWidth="3"
            strokeDasharray="7 12"
          />

          <path
            d="M421 210 L421 908"
            fill="none"
            stroke="#1A2119"
            strokeWidth="3"
            strokeDasharray="7 12"
          />

          <FrontPocket x={246} y={322} />
          <FrontPocket x={438} y={322} />
          <FrontPocket x={246} y={598} />
          <FrontPocket x={438} y={598} />

          <path
            d="M219 517 C317 548 503 548 601 517"
            fill="none"
            stroke="#242B21"
            strokeWidth="10"
          />

          <path
            d="M226 520 C319 539 501 539 594 520"
            fill="none"
            stroke="#5D644F"
            strokeWidth="3"
            strokeDasharray="8 11"
          />

          <path
            d="M218 868 C323 888 497 888 602 868"
            fill="none"
            stroke="#20271E"
            strokeWidth="9"
          />

          <path
            d="M88 593 L169 621 L155 680 L72 650 Z"
            fill="#31382B"
            stroke="#20271E"
            strokeWidth="6"
          />

          <path
            d="M732 593 L651 621 L665 680 L748 650 Z"
            fill="#31382B"
            stroke="#20271E"
            strokeWidth="6"
          />

          <path
            d="M280 172 C247 273 236 367 231 456"
            fill="none"
            stroke="#6B725B"
            strokeWidth="3"
            opacity="0.55"
          />

          <path
            d="M540 172 C573 273 584 367 589 456"
            fill="none"
            stroke="#171D16"
            strokeWidth="3"
            opacity="0.7"
          />

          <path
            d="M350 270 C378 287 442 287 470 270"
            fill="none"
            stroke="#697158"
            strokeWidth="3"
            opacity="0.35"
          />
        </g>
      </svg>

      <PatchZoneButton
        zone="left-chest"
        label="Crest"
        selected={selectedZone === "left-chest"}
        className="left-[28.5%] top-[25.5%] h-[17%] w-[18%]"
        onSelect={onZoneChange}
      />

      <PatchZoneButton
        zone="right-chest"
        label="Name Tape"
        selected={selectedZone === "right-chest"}
        className="left-[53.5%] top-[27%] h-[9%] w-[18%]"
        onSelect={onZoneChange}
      />

      <PatchZoneButton
        zone="left-sleeve"
        label="Left Sleeve"
        selected={selectedZone === "left-sleeve"}
        className="left-[9%] top-[31%] h-[17%] w-[13%] -rotate-[12deg]"
        onSelect={onZoneChange}
      />

      <PatchZoneButton
        zone="right-sleeve"
        label="Right Sleeve"
        selected={selectedZone === "right-sleeve"}
        className="right-[9%] top-[31%] h-[17%] w-[13%] rotate-[12deg]"
        onSelect={onZoneChange}
      />

      <div className="pointer-events-none absolute left-[29.7%] top-[27%] z-20 flex h-[14.5%] w-[15.5%] items-center justify-center">
        <div
          className="w-full transition-transform duration-200"
          style={{
            transform: [
              `translate(${crestX * 0.13}px, ${crestY * 0.13}px)`,
              `scale(${Math.min(
                Math.max(crestScale, 70),
                125,
              ) / 100})`,
              `rotate(${crestRotation}deg)`,
            ].join(" "),
          }}
        >
          <div className="rounded-[10%] border border-[#C4A96A]/75 bg-[#20271E]/95 p-[7%] shadow-[0_8px_16px_rgba(0,0,0,0.35)]">
            <CrestRenderer
              crest={crest}
              className="h-auto w-full"
              title={`${houseName} crest on left chest`}
            />
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute left-[54.8%] top-[29.4%] z-20 flex h-[5.5%] w-[15%] items-center justify-center border border-[#C1B28C]/70 bg-[#252B22] px-[2%] shadow-[0_4px_9px_rgba(0,0,0,0.28)]">
        <span className="truncate text-[clamp(5px,1vw,10px)] font-bold uppercase tracking-[0.13em] text-[#DED2AF]">
          {houseName}
        </span>
      </div>

      <div className="pointer-events-none absolute left-[12.2%] top-[35.4%] z-20 grid h-[7%] w-[7.5%] place-items-center rounded-full border border-[#B69A59]/80 bg-[#242B22] shadow-[0_5px_10px_rgba(0,0,0,0.28)]">
        <span className="font-serif text-[clamp(7px,1.6vw,16px)] font-semibold text-[#D7BF7B]">
          {houseInitials}
        </span>
      </div>
    </div>
  );
}

function BackJacket({
  crest,
  houseName,
  selectedZone,
  crestScale,
  crestX,
  crestY,
  crestRotation,
  onZoneChange,
}: {
  crest: BuilderCrestSpec;
  houseName: string;
  selectedZone: JacketPatchZone;
  crestScale: number;
  crestX: number;
  crestY: number;
  crestRotation: number;
  onZoneChange: (zone: JacketPatchZone) => void;
}) {
  return (
    <div className="relative aspect-[0.82] w-full">
      <JacketShadow />

      <svg
        viewBox="0 0 820 1000"
        className="absolute inset-0 h-full w-full"
        role="img"
        aria-label="Back view of an olive M65 field jacket"
      >
        <defs>
          <linearGradient
            id="back-jacket-body"
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop offset="0%" stopColor="#535A46" />
            <stop offset="48%" stopColor="#3B4233" />
            <stop offset="100%" stopColor="#272E24" />
          </linearGradient>

          <linearGradient
            id="back-jacket-sleeve"
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop offset="0%" stopColor="#5B624D" />
            <stop offset="100%" stopColor="#2D3429" />
          </linearGradient>

          <filter
            id="back-garment-shadow"
            x="-30%"
            y="-30%"
            width="160%"
            height="160%"
          >
            <feDropShadow
              dx="0"
              dy="20"
              stdDeviation="18"
              floodColor="#182018"
              floodOpacity="0.35"
            />
          </filter>
        </defs>

        <g filter="url(#back-garment-shadow)">
          <path
            d="M285 135 L215 174 L132 316 L72 612 L166 650 L230 461 L218 920 L602 920 L590 461 L654 650 L748 612 L688 316 L605 174 L535 135 L488 105 L332 105 Z"
            fill="url(#back-jacket-body)"
            stroke="#1E251C"
            strokeWidth="8"
            strokeLinejoin="round"
          />

          <path
            d="M284 139 L216 176 L132 317 L72 612 L166 650 L231 456 L239 280 Z"
            fill="url(#back-jacket-sleeve)"
            stroke="#252C22"
            strokeWidth="5"
          />

          <path
            d="M536 139 L604 176 L688 317 L748 612 L654 650 L589 456 L581 280 Z"
            fill="url(#back-jacket-sleeve)"
            stroke="#252C22"
            strokeWidth="5"
          />

          <path
            d="M332 105 L410 171 L488 105 L458 86 L362 86 Z"
            fill="#30372B"
            stroke="#20271E"
            strokeWidth="7"
          />

          <path
            d="M410 171 L410 910"
            fill="none"
            stroke="#31392C"
            strokeWidth="4"
            opacity="0.5"
          />

          <path
            d="M289 150 C316 228 504 228 531 150"
            fill="none"
            stroke="#656D55"
            strokeWidth="4"
            opacity="0.55"
          />

          <path
            d="M246 280 C332 316 488 316 574 280"
            fill="none"
            stroke="#252C22"
            strokeWidth="9"
          />

          <path
            d="M250 284 C336 309 484 309 570 284"
            fill="none"
            stroke="#697159"
            strokeWidth="3"
            strokeDasharray="8 11"
          />

          <path
            d="M218 520 C321 550 499 550 602 520"
            fill="none"
            stroke="#242B21"
            strokeWidth="10"
          />

          <path
            d="M226 523 C321 542 499 542 594 523"
            fill="none"
            stroke="#626A52"
            strokeWidth="3"
            strokeDasharray="8 11"
          />

          <path
            d="M218 868 C323 888 497 888 602 868"
            fill="none"
            stroke="#20271E"
            strokeWidth="9"
          />

          <path
            d="M88 593 L169 621 L155 680 L72 650 Z"
            fill="#31382B"
            stroke="#20271E"
            strokeWidth="6"
          />

          <path
            d="M732 593 L651 621 L665 680 L748 650 Z"
            fill="#31382B"
            stroke="#20271E"
            strokeWidth="6"
          />

          <path
            d="M280 172 C247 273 236 367 231 456"
            fill="none"
            stroke="#6B725B"
            strokeWidth="3"
            opacity="0.55"
          />

          <path
            d="M540 172 C573 273 584 367 589 456"
            fill="none"
            stroke="#171D16"
            strokeWidth="3"
            opacity="0.7"
          />
        </g>
      </svg>

      <PatchZoneButton
        zone="back"
        label="Back Crest"
        selected={selectedZone === "back"}
        className="left-[31%] top-[25%] h-[38%] w-[38%]"
        onSelect={onZoneChange}
      />

      <PatchZoneButton
        zone="left-sleeve"
        label="Left Sleeve"
        selected={selectedZone === "left-sleeve"}
        className="left-[9%] top-[31%] h-[17%] w-[13%] -rotate-[12deg]"
        onSelect={onZoneChange}
      />

      <PatchZoneButton
        zone="right-sleeve"
        label="Right Sleeve"
        selected={selectedZone === "right-sleeve"}
        className="right-[9%] top-[31%] h-[17%] w-[13%] rotate-[12deg]"
        onSelect={onZoneChange}
      />

      <div className="pointer-events-none absolute left-[34%] top-[29%] z-20 flex h-[31%] w-[32%] items-center justify-center">
        <div
          className="w-full transition-transform duration-200"
          style={{
            transform: [
              `translate(${crestX * 0.2}px, ${crestY * 0.2}px)`,
              `scale(${Math.min(
                Math.max(crestScale, 70),
                125,
              ) / 100})`,
              `rotate(${crestRotation}deg)`,
            ].join(" "),
          }}
        >
          <div className="rounded-[8%] border-2 border-[#C4A96A]/75 bg-[#20271E]/95 p-[7%] shadow-[0_14px_28px_rgba(0,0,0,0.38)]">
            <CrestRenderer
              crest={crest}
              className="h-auto w-full"
              title={`${houseName} crest on jacket back`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function FrontPocket({
  x,
  y,
}: {
  x: number;
  y: number;
}) {
  return (
    <g>
      <path
        d={`M${x} ${y} L${x + 136} ${y} L${x + 126} ${y + 155} L${x + 10} ${y + 155} Z`}
        fill="url(#front-pocket)"
        stroke="#252C22"
        strokeWidth="6"
      />

      <path
        d={`M${x - 4} ${y} L${x + 140} ${y} L${x + 124} ${y + 42} L${x + 13} ${y + 42} Z`}
        fill="#555C47"
        stroke="#252C22"
        strokeWidth="6"
      />

      <circle
        cx={x + 68}
        cy={y + 22}
        r="7"
        fill="#21271F"
        stroke="#70765F"
        strokeWidth="2"
      />

      <path
        d={`M${x + 17} ${y + 56} L${x + 119} ${y + 56}`}
        fill="none"
        stroke="#697058"
        strokeWidth="2"
        strokeDasharray="6 8"
        opacity="0.55"
      />
    </g>
  );
}

function PatchZoneButton({
  zone,
  label,
  selected,
  className,
  onSelect,
}: PatchZoneButtonProps) {
  return (
    <button
      type="button"
      aria-label={`Select ${label} placement`}
      aria-pressed={selected}
      onClick={() => onSelect(zone)}
      className={`group absolute z-30 border transition-all duration-200 ${className} ${
        selected
          ? "border-[#D4B66C] bg-[#D4B66C]/18 shadow-[0_0_0_2px_rgba(31,42,32,0.55),0_0_25px_rgba(212,182,108,0.35)]"
          : "border-[#F5F1E8]/28 bg-[#F5F1E8]/5 hover:border-[#D4B66C]/80 hover:bg-[#D4B66C]/10"
      }`}
    >
      <span
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap border px-2 py-1 text-[clamp(5px,0.8vw,8px)] font-bold uppercase tracking-[0.14em] transition ${
          selected
            ? "border-[#D4B66C] bg-[#1F2A20] text-[#D4B66C]"
            : "border-[#F5F1E8]/30 bg-[#1F2A20]/80 text-[#F5F1E8]/65 opacity-0 group-hover:opacity-100"
        }`}
      >
        {label}
      </span>
    </button>
  );
}

function ViewButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-5 py-3 text-[9px] font-bold uppercase tracking-[0.2em] transition ${
        active
          ? "bg-[#1F2A20] text-[#B08D57]"
          : "text-[#5F6258] hover:bg-[#E9E1D2]"
      }`}
    >
      {label}
    </button>
  );
}

function JacketShadow() {
  return (
    <div className="pointer-events-none absolute bottom-[3%] left-1/2 h-[10%] w-[66%] -translate-x-1/2 rounded-[50%] bg-[#1F2A20]/25 blur-2xl" />
  );
}

function getZoneLabel(
  zone: JacketPatchZone,
): string {
  if (zone === "left-chest") {
    return "Left Chest Crest";
  }

  if (zone === "right-chest") {
    return "Right Chest Name Tape";
  }

  if (zone === "left-sleeve") {
    return "Left Sleeve Insignia";
  }

  if (zone === "right-sleeve") {
    return "Right Sleeve Insignia";
  }

  return "Full Back Crest";
}
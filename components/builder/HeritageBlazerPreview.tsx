
"use client";

import HeritageCrestPreview from "./HeritageCrestPreview";

import type {
  BuilderShieldStyle,
  CrestCrown,
} from "@/lib/herald/types";

import type { SupportedCrestFinish } from "./FamilyCrestPreview";

type Props = {
  familyName: string;
  initials: string;
  motto: string;
  symbol: string;
  shield: BuilderShieldStyle;
  crown: CrestCrown;
  finish: SupportedCrestFinish;
};

export default function HeritageBlazerPreview({
  familyName,
  initials,
  motto,
  symbol,
  shield,
  crown,
  finish,
}: Props) {
  return (
    <div className="relative mx-auto w-full max-w-[520px] overflow-hidden rounded-sm border border-[#b08d57]/25 bg-[#151b27]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,#33415a_0%,#151b27_60%,#0c111b_100%)]" />

      <div className="relative aspect-[4/5]">
        <svg
          viewBox="0 0 400 500"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          {/* Shoulder silhouette */}
          <path
            d="M130 75 Q95 90 42 128 L0 205 V500 H400 V205 L358 128 Q305 90 270 75 Z"
            fill="#202d42"
            stroke="#39475b"
            strokeWidth="2"
          />

          {/* Shirt */}
          <path
            d="M155 77 L200 260 L245 77 L230 65 H170 Z"
            fill="#eee9df"
          />

          {/* Left and right jacket fronts */}
          <path
            d="M130 75 L200 280 L176 500 H0 V205 L42 128 Z"
            fill="#233149"
          />

          <path
            d="M270 75 L200 280 L224 500 H400 V205 L358 128 Z"
            fill="#1c293e"
          />

          {/* Lapels */}
          <path
            d="M130 75 L174 175 L145 192 L200 280 L155 78 Z"
            fill="#34425a"
            stroke="#47556a"
            strokeWidth="1.5"
          />

          <path
            d="M270 75 L226 175 L255 192 L200 280 L245 78 Z"
            fill="#2d3b52"
            stroke="#47556a"
            strokeWidth="1.5"
          />

          {/* Buttons */}
          <circle cx="212" cy="333" r="5" fill="#a18b65" />
          <circle cx="214" cy="408" r="5" fill="#a18b65" />

          {/* Breast pocket */}
          <path
            d="M242 218 L326 213"
            stroke="#617086"
            strokeWidth="3"
          />
        </svg>

        {/* Wearer's left chest: viewer's right */}
        <div className="absolute left-[65%] top-[31%] w-[23%] -translate-x-1/2">
          <HeritageCrestPreview
            familyName={familyName}
            initials={initials}
            motto={motto}
            symbol={symbol}
            shield={shield}
            crown={crown}
            finish={finish}
          />
        </div>

        <div className="absolute bottom-5 left-5 right-5 flex justify-between gap-3 text-[10px] uppercase tracking-[0.16em] text-[#d7c8aa]">
          <span>Heritage Blazer</span>
          <span>Left-Chest Crest</span>
        </div>
      </div>
    </div>
  );
}


"use client";

import Image from "next/image";

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
  const crestProps = {
    familyName,
    initials,
    motto,
    symbol,
    shield,
    crown,
    finish,
  };

  return (
    <div className="w-full space-y-5">
      {/* Realistic garment preview */}
      <div className="relative mx-auto w-full overflow-hidden border border-[#b08d57]/25 bg-[#151b27]">
        <div className="relative aspect-[1343/1119] w-full">
          <Image
            src="/images/heritage-blazer/heritage-blazer-builder.png"
            alt="Tailored navy Heritage Blazer with brass buttons displayed on a mannequin"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover"
          />

          {/* Wearer's left chest */}
          <div
            className="pointer-events-none absolute z-10"
            style={{
              left: "64%",
              top: "41%",
              width: "16%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <HeritageCrestPreview {...crestProps} />
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0b0d0c]/80 to-transparent" />

          <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between gap-3 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#eee6d6] sm:text-[10px]">
            <span>Heritage Blazer</span>
            <span>Personalized Left-Chest Crest</span>
          </div>
        </div>
      </div>

      {/* Enlarged crest detail */}
      <div className="border border-[#b08d57]/25 bg-[#20221b] p-6 sm:p-8">
        <div className="mb-7 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#c5a16a]">
              Heritage Crest
            </p>

            <h3 className="font-display mt-3 text-2xl text-[#eee6d6] sm:text-3xl">
              The Details of Your House
            </h3>
          </div>

          <span className="border border-[#b08d57]/35 px-3 py-2 text-[10px] uppercase tracking-[0.12em] text-[#bba47c]">
            Enlarged Detail
          </span>
        </div>

        <div className="relative flex min-h-[310px] items-center justify-center overflow-hidden border border-[#b08d57]/15 bg-[radial-gradient(ellipse_at_center,#30332a_0%,#151712_75%)] px-5 py-8">
          <div className="w-full max-w-[285px]">
            <HeritageCrestPreview {...crestProps} />
          </div>
        </div>

        <div className="mt-6 grid gap-5 border-t border-[#b08d57]/20 pt-6 sm:grid-cols-2">
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-[#c5a16a]">
              House
            </p>

            <p className="font-display mt-2 text-xl text-[#eee6d6]">
              {familyName.trim() || "Family"}
            </p>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-[#c5a16a]">
              Latin Motto
            </p>

            <p className="font-display mt-2 text-xl italic text-[#e0d2bc]">
              {motto.trim() || "Fortis in Familia"}
            </p>
          </div>
        </div>

        <p className="mt-6 text-xs leading-6 text-[#a99e8c]">
          Enlarged digital artwork for design review. The
          blazer preview illustrates crest placement; final
          embroidery dimensions and production artwork
          remain subject to validation.
        </p>
      </div>
    </div>
  );
}

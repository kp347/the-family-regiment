// components/builder/BuilderPreview.tsx

import Image from "next/image";
import { jacketLayout } from "@/lib/jacketLayout";

export type PreviewSymbolOption = {
  name: string;
  character: string;
};

export type PreviewJacketOption = {
  name: string;
  image: string;
};

type BuilderPreviewProps = {
  familyName: string;
  initials: string;
  heritage: string;
  symbol: string;
  value: string;
  motto: string;
  jacketView: string;
  crestPlacement: string;
  embroideryFinish: string;
  includeNameTape: boolean;
  includeSleevePatch: boolean;
  symbolOptions: PreviewSymbolOption[];
  jacketViews: PreviewJacketOption[];
};

type PreviewStatProps = {
  label: string;
  value: string;
};

const fallbackSymbol: PreviewSymbolOption = {
  name: "Regiment",
  character: "◆",
};

const fallbackJacket: PreviewJacketOption = {
  name: "Front",
  image: "/images/jackets/m65-front.png",
};

export default function BuilderPreview({
  familyName,
  initials,
  heritage,
  symbol,
  value,
  motto,
  jacketView,
  crestPlacement,
  embroideryFinish,
  includeNameTape,
  includeSleevePatch,
  symbolOptions,
  jacketViews,
}: BuilderPreviewProps) {
  const selectedSymbol =
    symbolOptions.find((option) => option.name === symbol) ??
    symbolOptions[0] ??
    fallbackSymbol;

  const selectedJacket =
    jacketViews.find((option) => option.name === jacketView) ??
    jacketViews[0] ??
    fallbackJacket;

  const isFrontView = jacketView === "Front";

  const crestLayout =
    crestPlacement === "Left Chest"
      ? jacketLayout.front.crest.leftChest
      : jacketLayout.front.crest.rightChest;

  const nameTapeLayout =
    crestPlacement === "Left Chest"
      ? jacketLayout.front.nameTape.leftChest
      : jacketLayout.front.nameTape.rightChest;

  const sleevePatchLayout = jacketLayout.front.sleevePatch;
  const backLayout = jacketLayout.back;

  const finishClasses =
    embroideryFinish === "Tactical Subdued"
      ? {
          border: "border-[#777B63]",
          text: "text-[#A7AA91]",
          background: "bg-[#303429]",
        }
      : embroideryFinish === "Heritage Ivory"
        ? {
            border: "border-[#E7D8B4]",
            text: "text-[#E7D8B4]",
            background: "bg-[#24251F]",
          }
        : {
            border: "border-[#B08D57]",
            text: "text-[#B08D57]",
            background: "bg-[#20231C]",
          };

  const displayFamilyName = familyName.trim() || "Family";
  const displayInitials = initials.trim() || "FR";
  const displayHeritage = heritage.trim() || "Heritage";
  const displaySymbol = symbol.trim() || selectedSymbol.name;
  const displayValue = value.trim() || "Legacy";
  const displayMotto = motto.trim() || "Fortis in Familia";

  const sleevePatchText =
    heritage.trim().length >= 2
      ? heritage.trim().slice(0, 2).toUpperCase()
      : displayInitials.slice(0, 2).toUpperCase();

  return (
    <aside className="relative min-h-[720px] overflow-hidden border-t border-white/10 bg-[#20211E] lg:border-l lg:border-t-0">
      <div className="sticky top-0 flex min-h-[720px] items-center justify-center p-6 md:p-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(176,141,87,0.18),_transparent_65%)]" />

        <div className="relative w-full">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-[#B08D57]">
                Live Jacket Preview
              </p>

              <p className="mt-2 text-sm text-[#77736A]">
                {jacketView} view · {embroideryFinish}
              </p>
            </div>

            <span className="rounded-full border border-white/10 px-4 py-2 text-[10px] uppercase tracking-[0.25em] text-[#8F8B82]">
              Preview
            </span>
          </div>

          <div className="relative mx-auto aspect-[4/5] w-full max-w-[540px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#181916]">
            <Image
              src={selectedJacket.image}
              alt={`${jacketView} view of the customized Regiment Jacket`}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10" />

            {isFrontView && (
              <>
                {includeNameTape && (
                  <div
                    style={{
                      left: nameTapeLayout.left,
                      top: nameTapeLayout.top,
                    }}
                    className={`absolute z-10 rounded-sm border px-3 py-1.5 shadow-xl transition-all duration-300 ${finishClasses.border} ${finishClasses.background}`}
                  >
                    <p
                      className={`max-w-[120px] truncate text-[9px] font-bold uppercase tracking-[0.14em] ${finishClasses.text}`}
                    >
                      {displayFamilyName}
                    </p>
                  </div>
                )}

                <div
                  style={{
                    left: crestLayout.left,
                    top: crestLayout.top,
                    width: `${crestLayout.width}px`,
                    height: `${crestLayout.height}px`,
                    transform: "translate(-50%, -50%)",
                  }}
                  className={`absolute z-10 flex flex-col items-center justify-center rounded-t-[45%] border-[3px] shadow-2xl transition-all duration-300 ${finishClasses.border} ${finishClasses.background}`}
                >
                  <span
                    className={`text-3xl leading-none ${finishClasses.text}`}
                    aria-hidden="true"
                  >
                    {selectedSymbol.character}
                  </span>

                  <span
                    className={`mt-1 text-[7px] font-bold uppercase tracking-[0.12em] ${finishClasses.text}`}
                  >
                    {displayInitials}
                  </span>
                </div>

                {includeSleevePatch && (
                  <div
                    style={{
                      left: sleevePatchLayout.left,
                      top: sleevePatchLayout.top,
                      width: `${sleevePatchLayout.size}px`,
                      height: `${sleevePatchLayout.size}px`,
                      transform: "rotate(-5deg)",
                    }}
                    className={`absolute z-10 flex items-center justify-center rounded-full border-2 shadow-xl transition-all duration-300 ${finishClasses.border} ${finishClasses.background}`}
                  >
                    <span
                      className={`text-[9px] font-bold uppercase tracking-[0.12em] ${finishClasses.text}`}
                    >
                      {sleevePatchText}
                    </span>
                  </div>
                )}
              </>
            )}

            {!isFrontView && (
              <>
                <div
                  style={{
                    left: backLayout.topRocker.left,
                    top: backLayout.topRocker.top,
                    width: `${backLayout.topRocker.width}px`,
                    height: `${backLayout.topRocker.height}px`,
                    transform: "translate(-50%, -50%)",
                    borderRadius: "55% 55% 25% 25% / 75% 75% 30% 30%",
                  }}
                  className={`absolute z-10 flex items-center justify-center border-2 px-2 shadow-xl ${finishClasses.border} ${finishClasses.background}`}
                >
                  <p
                    className={`max-w-full truncate text-center text-[6px] font-bold uppercase tracking-[0.14em] ${finishClasses.text}`}
                  >
                    {displayMotto}
                  </p>
                </div>

                <div
                  style={{
                    left: backLayout.centerPatch.left,
                    top: backLayout.centerPatch.top,
                    width: `${backLayout.centerPatch.width}px`,
                    height: `${backLayout.centerPatch.height}px`,
                    transform: "translate(-50%, -50%)",
                  }}
                  className={`absolute z-10 flex flex-col items-center justify-center rounded-t-[42%] border-2 shadow-xl ${finishClasses.border} ${finishClasses.background}`}
                >
                  <span
                    className={`text-lg leading-none ${finishClasses.text}`}
                    aria-hidden="true"
                  >
                    {selectedSymbol.character}
                  </span>

                  <span
                    className={`mt-1 text-[6px] font-bold uppercase tracking-[0.1em] ${finishClasses.text}`}
                  >
                    {displayInitials}
                  </span>
                </div>

                <div
                  style={{
                    left: backLayout.bottomRocker.left,
                    top: backLayout.bottomRocker.top,
                    width: `${backLayout.bottomRocker.width}px`,
                    height: `${backLayout.bottomRocker.height}px`,
                    transform: "translate(-50%, -50%)",
                    borderRadius: "25% 25% 55% 55% / 30% 30% 75% 75%",
                  }}
                  className={`absolute z-10 flex items-center justify-center border-2 px-2 shadow-xl ${finishClasses.border} ${finishClasses.background}`}
                >
                  <p
                    className={`max-w-full truncate text-center text-[5px] font-bold uppercase tracking-[0.1em] ${finishClasses.text}`}
                  >
                    {displayFamilyName} Regiment
                  </p>
                </div>
              </>
            )}

            <div className="absolute bottom-5 left-5 right-5 z-20 flex items-end justify-between rounded-2xl border border-white/10 bg-black/40 px-5 py-4 backdrop-blur-md">
              <div className="min-w-0">
                <p className="text-[9px] uppercase tracking-[0.3em] text-[#B08D57]">
                  Regiment Identity
                </p>

                <p className="mt-2 truncate text-lg text-white">
                  {displayFamilyName}
                </p>
              </div>

              <p className="ml-4 shrink-0 text-xs uppercase tracking-[0.18em] text-[#D7D1C5]">
                {displayInitials}
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <PreviewStat label="Heritage" value={displayHeritage} />
            <PreviewStat label="Symbol" value={displaySymbol} />
            <PreviewStat label="Principle" value={displayValue} />
          </div>

          <p className="mt-6 text-center text-[10px] uppercase tracking-[0.3em] text-[#65625D]">
            Concept preview · Final placement refined for production
          </p>
        </div>
      </div>
    </aside>
  );
}

function PreviewStat({ label, value }: PreviewStatProps) {
  return (
    <div className="min-w-0 rounded-xl border border-white/10 bg-white/[0.025] p-4">
      <p className="text-[8px] uppercase tracking-[0.25em] text-[#65625D]">
        {label}
      </p>

      <p className="mt-2 truncate text-xs text-[#D8D3CA]">{value}</p>
    </div>
  );
}
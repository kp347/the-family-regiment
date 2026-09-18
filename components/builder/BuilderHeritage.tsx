// components/builder/BuilderHeritage.tsx

import {
  getHeritageFlagComponent,
  type HeritageFlagComponent,
} from "@/lib/herald/svg/flags/registry";

import type { HeritageFlagVisualCanonAssetId } from "@/lib/herald/visualCanon/references";

type BuilderHeritageProps = {
  heritage: string;
  options: string[];
  onHeritageChange: (value: string) => void;
};

type HeritageVisual = {
  assetId: HeritageFlagVisualCanonAssetId;
  code: string;
  subtitle: string;
};

const heritageVisuals: Record<string, HeritageVisual> = {
  "United States": {
    assetId: "united-states",
    code: "US",
    subtitle: "American heritage",
  },

  Canada: {
    assetId: "canada",
    code: "CA",
    subtitle: "Canadian heritage",
  },

  Mexico: {
    assetId: "mexico",
    code: "MX",
    subtitle: "Mexican heritage",
  },

  Brazil: {
    assetId: "brazil",
    code: "BR",
    subtitle: "Brazilian heritage",
  },

  France: {
    assetId: "france",
    code: "FR",
    subtitle: "French heritage",
  },

  "United Kingdom": {
    assetId: "united-kingdom",
    code: "GB",
    subtitle: "British heritage",
  },

  England: {
    assetId: "england",
    code: "ENG",
    subtitle: "English heritage",
  },

  Scotland: {
    assetId: "scotland",
    code: "SCO",
    subtitle: "Scottish heritage",
  },

  Ireland: {
    assetId: "ireland",
    code: "IE",
    subtitle: "Irish heritage",
  },

  Italy: {
    assetId: "italy",
    code: "IT",
    subtitle: "Italian heritage",
  },

  Germany: {
    assetId: "germany",
    code: "DE",
    subtitle: "German heritage",
  },

  Spain: {
    assetId: "spain",
    code: "ES",
    subtitle: "Spanish heritage",
  },

  Portugal: {
    assetId: "portugal",
    code: "PT",
    subtitle: "Portuguese heritage",
  },

  Netherlands: {
    assetId: "netherlands",
    code: "NL",
    subtitle: "Dutch heritage",
  },

  Belgium: {
    assetId: "belgium",
    code: "BE",
    subtitle: "Belgian heritage",
  },

  Switzerland: {
    assetId: "switzerland",
    code: "CH",
    subtitle: "Swiss heritage",
  },

  Sweden: {
    assetId: "sweden",
    code: "SE",
    subtitle: "Swedish heritage",
  },

  Norway: {
    assetId: "norway",
    code: "NO",
    subtitle: "Norwegian heritage",
  },

  Poland: {
    assetId: "poland",
    code: "PL",
    subtitle: "Polish heritage",
  },

  Greece: {
    assetId: "greece",
    code: "GR",
    subtitle: "Greek heritage",
  },

  Japan: {
    assetId: "japan",
    code: "JP",
    subtitle: "Japanese heritage",
  },

  "South Korea": {
    assetId: "south-korea",
    code: "KR",
    subtitle: "South Korean heritage",
  },

  Nigeria: {
    assetId: "nigeria",
    code: "NG",
    subtitle: "Nigerian heritage",
  },

  Ghana: {
    assetId: "ghana",
    code: "GH",
    subtitle: "Ghanaian heritage",
  },

  "South Africa": {
    assetId: "south-africa",
    code: "ZA",
    subtitle: "South African heritage",
  },

  Egypt: {
    assetId: "egypt",
    code: "EG",
    subtitle: "Egyptian heritage",
  },

  Kenya: {
    assetId: "kenya",
    code: "KE",
    subtitle: "Kenyan heritage",
  },
};

function getFlagComponent(
  visual: HeritageVisual | undefined,
): HeritageFlagComponent | undefined {
  if (!visual) {
    return undefined;
  }

  return getHeritageFlagComponent(visual.assetId);
}

export default function BuilderHeritage({
  heritage,
  options,
  onHeritageChange,
}: BuilderHeritageProps) {
  return (
    <div>
      <div className="mb-6 flex items-end justify-between gap-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#B08D57]">
            Heritage Library
          </p>

          <h3 className="mt-2 text-2xl text-[#F4EFE5]">
            Choose your primary heritage
          </h3>

          <p className="mt-2 max-w-xl text-sm leading-6 text-[#8E8A81]">
            This selection becomes the first visual anchor of
            the shield and will later guide recommended flags,
            symbols, colors, and regional motifs.
          </p>
        </div>

        <div className="hidden rounded-full border border-[#B08D57]/30 bg-[#B08D57]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#D5B77A] sm:block">
          Quadrant I
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {options.map((option) => {
          const active = heritage === option;
          const visual = heritageVisuals[option];
          const Flag = getFlagComponent(visual);

          return (
            <button
              key={option}
              type="button"
              onClick={() => onHeritageChange(option)}
              aria-pressed={active}
              className={[
                "group relative min-h-[150px] overflow-hidden rounded-[1.35rem] border p-5 text-left transition duration-200",
                active
                  ? "border-[#C6A15B] bg-[#C6A15B]/10 shadow-[inset_0_0_0_1px_rgba(198,161,91,0.18)]"
                  : "border-white/10 bg-[#20211F] hover:-translate-y-0.5 hover:border-[#B08D57]/55 hover:bg-[#232420]",
              ].join(" ")}
            >
              {active && (
                <div className="absolute right-4 top-4 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-[#C6A15B] bg-[#C6A15B] text-[11px] font-bold text-[#151515]">
                  ✓
                </div>
              )}

              <div className="flex items-start gap-4">
                <div
                  className={[
                    "flex h-[58px] w-[76px] shrink-0 items-center justify-center overflow-hidden rounded-xl border bg-[#777777] p-1.5 shadow-sm transition",
                    active
                      ? "border-[#C6A15B]/60"
                      : "border-white/10",
                  ].join(" ")}
                >
                  {Flag ? (
                    <Flag
                      width="100%"
                      height="100%"
                      title={`Flag of ${option}`}
                    />
                  ) : (
                    <span
                      className="text-xl text-[#D8D0C3]"
                      aria-hidden="true"
                    >
                      ⚑
                    </span>
                  )}
                </div>

                <div className="min-w-0 pt-1">
                  <div className="flex items-center gap-2">
                    <p className="text-lg font-medium text-[#F4EFE5]">
                      {option}
                    </p>

                    {visual?.code && (
                      <span className="rounded-full border border-white/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#8E8A81]">
                        {visual.code}
                      </span>
                    )}
                  </div>

                  <p className="mt-1 text-sm text-[#8E8A81]">
                    {visual?.subtitle ?? "Family heritage"}
                  </p>
                </div>
              </div>

              <div className="mt-5 border-t border-white/8 pt-4">
                <p
                  className={[
                    "text-xs font-semibold uppercase tracking-[0.18em] transition",
                    active
                      ? "text-[#D0AE69]"
                      : "text-[#6F6B63] group-hover:text-[#B08D57]",
                  ].join(" ")}
                >
                  {active
                    ? "Selected heritage"
                    : "Select heritage"}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-5 rounded-xl border border-white/8 bg-black/10 px-4 py-3">
        <p className="text-xs leading-5 text-[#77736A]">
          Heritage selections use controlled Family Regiment
          Visual Canon artwork. Country codes remain secondary;
          the approved flag asset is the primary visual cue.
        </p>
      </div>
    </div>
  );
}
// components/builder/BuilderHeritage.tsx
// components/builder/BuilderHeritage.tsx

import {
  getHeritageFlagComponent,
  type HeritageFlagComponent,
} from "@/lib/herald/svg/flags/registry";

import type { HeritageFlagVisualCanonAssetId } from "@/lib/herald/visualCanon/references";

type BuilderHeritageProps = {
  heritage: string[];
  options: string[];
  onHeritageChange: (value: string[]) => void;
};

type HeritageVisual = {
  assetId: HeritageFlagVisualCanonAssetId;
  code: string;
  subtitle: string;
};

const MAX_HERITAGE_SELECTIONS = 3;

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
  const selectedHeritage = heritage.slice(
    0,
    MAX_HERITAGE_SELECTIONS,
  );

  const selectionLimitReached =
    selectedHeritage.length >= MAX_HERITAGE_SELECTIONS;

  function toggleHeritage(option: string) {
    const alreadySelected =
      selectedHeritage.includes(option);

    if (alreadySelected) {
      onHeritageChange(
        selectedHeritage.filter(
          (item) => item !== option,
        ),
      );

      return;
    }

    if (selectionLimitReached) {
      return;
    }

    onHeritageChange([
      ...selectedHeritage,
      option,
    ]);
  }

  return (
    <div>
      <div className="mb-6 flex items-end justify-between gap-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#B08D57]">
            Heritage Library
          </p>

          <h3 className="mt-2 text-2xl text-[#F4EFE5]">
            Choose your heritage
          </h3>

          <p className="mt-2 max-w-xl text-sm leading-6 text-[#8E8A81]">
            Select up to three places that represent your
            family&apos;s geographic or ancestral heritage.
            Each selection becomes an individual flag patch
            on the Regiment Jacket&apos;s right shoulder.
          </p>
        </div>

        <div className="hidden rounded-full border border-[#B08D57]/30 bg-[#B08D57]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#D5B77A] sm:block">
          {selectedHeritage.length} / {MAX_HERITAGE_SELECTIONS}
        </div>
      </div>

      {selectedHeritage.length > 0 && (
        <div className="mb-6 rounded-[1.25rem] border border-[#B08D57]/20 bg-[#B08D57]/5 px-5 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#B08D57]">
                Right Shoulder Heritage
              </p>

              <p className="mt-1 text-sm text-[#8E8A81]">
                {selectedHeritage.length === 1
                  ? "1 individual flag patch selected"
                  : `${selectedHeritage.length} individual flag patches selected`}
              </p>
            </div>

            <button
              type="button"
              onClick={() => onHeritageChange([])}
              className="rounded-full border border-white/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8E8A81] transition hover:border-[#B08D57]/45 hover:text-[#D0AE69]"
            >
              Clear
            </button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {selectedHeritage.map(
              (item, index) => {
                const visual =
                  heritageVisuals[item];

                const Flag =
                  getFlagComponent(visual);

                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() =>
                      toggleHeritage(item)
                    }
                    className="flex items-center gap-2 rounded-full border border-[#B08D57]/30 bg-[#171815] py-1.5 pl-1.5 pr-3 transition hover:border-[#B08D57]/60"
                    title={`Remove ${item}`}
                  >
                    <span className="flex h-7 w-9 items-center justify-center overflow-hidden rounded-md border border-white/10 bg-[#777777] p-0.5">
                      {Flag ? (
                        <Flag
                          width="100%"
                          height="100%"
                          title={`Flag of ${item}`}
                        />
                      ) : (
                        <span
                          className="text-xs text-[#D8D0C3]"
                          aria-hidden="true"
                        >
                          ⚑
                        </span>
                      )}
                    </span>

                    <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#D8D3CA]">
                      {index + 1}. {item}
                    </span>

                    <span
                      className="text-[#77736A]"
                      aria-hidden="true"
                    >
                      ×
                    </span>
                  </button>
                );
              },
            )}
          </div>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {options.map((option) => {
          const selectedIndex =
            selectedHeritage.indexOf(option);

          const active =
            selectedIndex !== -1;

          const disabled =
            !active &&
            selectionLimitReached;

          const visual =
            heritageVisuals[option];

          const Flag =
            getFlagComponent(visual);

          return (
            <button
              key={option}
              type="button"
              onClick={() =>
                toggleHeritage(option)
              }
              disabled={disabled}
              aria-pressed={active}
              aria-disabled={disabled}
              className={[
                "group relative min-h-[150px] overflow-hidden rounded-[1.35rem] border p-5 text-left transition duration-200",
                active
                  ? "border-[#C6A15B] bg-[#C6A15B]/10 shadow-[inset_0_0_0_1px_rgba(198,161,91,0.18)]"
                  : disabled
                    ? "cursor-not-allowed border-white/5 bg-[#1B1C1A] opacity-45"
                    : "border-white/10 bg-[#20211F] hover:-translate-y-0.5 hover:border-[#B08D57]/55 hover:bg-[#232420]",
              ].join(" ")}
            >
              {active && (
                <div className="absolute right-4 top-4 z-10 flex h-7 min-w-7 items-center justify-center rounded-full border border-[#C6A15B] bg-[#C6A15B] px-2 text-[10px] font-bold text-[#151515]">
                  {selectedIndex + 1}
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
                    {visual?.subtitle ??
                      "Family heritage"}
                  </p>
                </div>
              </div>

              <div className="mt-5 border-t border-white/8 pt-4">
                <p
                  className={[
                    "text-xs font-semibold uppercase tracking-[0.18em] transition",
                    active
                      ? "text-[#D0AE69]"
                      : disabled
                        ? "text-[#55524D]"
                        : "text-[#6F6B63] group-hover:text-[#B08D57]",
                  ].join(" ")}
                >
                  {active
                    ? `Heritage slot ${selectedIndex + 1}`
                    : disabled
                      ? "3 heritage flags selected"
                      : "Add heritage"}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-5 rounded-xl border border-white/8 bg-black/10 px-4 py-3">
        <p className="text-xs leading-5 text-[#77736A]">
          Each selection remains an independent Family
          Regiment Visual Canon flag asset. Up to three
          individual patches may be assigned to the right
          shoulder; combined multi-flag artwork is not used.
        </p>
      </div>
    </div>
  );
}

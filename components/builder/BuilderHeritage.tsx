// components/builder/BuilderHeritage.tsx

type BuilderHeritageProps = {
  heritage: string;
  options: string[];
  onHeritageChange: (value: string) => void;
};

type HeritageVisual = {
  flag: string;
  code: string;
  subtitle: string;
};

const heritageVisuals: Record<string, HeritageVisual> = {
  France: {
    flag: "🇫🇷",
    code: "FR",
    subtitle: "French heritage",
  },
  "United States": {
    flag: "🇺🇸",
    code: "US",
    subtitle: "American heritage",
  },
  Ireland: {
    flag: "🇮🇪",
    code: "IE",
    subtitle: "Irish heritage",
  },
  Italy: {
    flag: "🇮🇹",
    code: "IT",
    subtitle: "Italian heritage",
  },
  England: {
    flag: "🏴",
    code: "ENG",
    subtitle: "English heritage",
  },
  Scotland: {
    flag: "🏴",
    code: "SCO",
    subtitle: "Scottish heritage",
  },
  Germany: {
    flag: "🇩🇪",
    code: "DE",
    subtitle: "German heritage",
  },
  Spain: {
    flag: "🇪🇸",
    code: "ES",
    subtitle: "Spanish heritage",
  },
};

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
          const active =
            heritage === option;

          const visual =
            heritageVisuals[option] ?? {
              flag: "⚑",
              code: "",
              subtitle: "Family heritage",
            };

          return (
            <button
              key={option}
              type="button"
              onClick={() =>
                onHeritageChange(option)
              }
              aria-pressed={active}
              className={[
                "group relative min-h-[150px] overflow-hidden rounded-[1.35rem] border p-5 text-left transition duration-200",
                active
                  ? "border-[#C6A15B] bg-[#C6A15B]/10 shadow-[inset_0_0_0_1px_rgba(198,161,91,0.18)]"
                  : "border-white/10 bg-[#20211F] hover:-translate-y-0.5 hover:border-[#B08D57]/55 hover:bg-[#232420]",
              ].join(" ")}
            >
              {active && (
                <div className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full border border-[#C6A15B] bg-[#C6A15B] text-[11px] font-bold text-[#151515]">
                  ✓
                </div>
              )}

              <div className="flex items-start gap-4">
                <div
                  className={[
                    "flex h-[58px] w-[76px] shrink-0 items-center justify-center rounded-xl border text-[2rem] shadow-sm transition",
                    active
                      ? "border-[#C6A15B]/60 bg-[#F5F0E6]"
                      : "border-white/10 bg-[#ECE7DD]",
                  ].join(" ")}
                  aria-hidden="true"
                >
                  {visual.flag}
                </div>

                <div className="min-w-0 pt-1">
                  <div className="flex items-center gap-2">
                    <p className="text-lg font-medium text-[#F4EFE5]">
                      {option}
                    </p>

                    {visual.code && (
                      <span className="rounded-full border border-white/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#8E8A81]">
                        {visual.code}
                      </span>
                    )}
                  </div>

                  <p className="mt-1 text-sm text-[#8E8A81]">
                    {visual.subtitle}
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
          This is the beginning of the new visual Builder system.
          The small country code is now secondary; the flag is the
          primary visual cue.
        </p>
      </div>
    </div>
  );
}
// components/builder/BuilderSymbol.tsx

export type BuilderSymbolOption = {
  name: string;
  meaning: string;
  character: string;
};

type BuilderSymbolProps = {
  symbol: string;
  options: BuilderSymbolOption[];
  onSymbolChange: (value: string) => void;
};

export default function BuilderSymbol({
  symbol,
  options,
  onSymbolChange,
}: BuilderSymbolProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {options.map((option) => {
        const active = symbol === option.name;

        return (
          <button
            key={option.name}
            type="button"
            onClick={() => onSymbolChange(option.name)}
            className={`min-h-32 rounded-2xl border p-6 text-left transition ${
              active
                ? "border-[#B08D57] bg-[#B08D57]/10"
                : "border-white/10 bg-white/[0.02] hover:border-white/25"
            }`}
          >
            <span className="text-4xl text-[#B08D57]">
              {option.character}
            </span>

            <p className="mt-5 text-xl">{option.name}</p>

            <p className="mt-2 text-sm leading-6 text-[#77736A]">
              {option.meaning}
            </p>
          </button>
        );
      })}
    </div>
  );
}
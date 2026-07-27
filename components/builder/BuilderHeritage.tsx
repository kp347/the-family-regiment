// components/builder/BuilderHeritage.tsx

type BuilderHeritageProps = {
  heritage: string;
  options: string[];
  onHeritageChange: (value: string) => void;
};

export default function BuilderHeritage({
  heritage,
  options,
  onHeritageChange,
}: BuilderHeritageProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {options.map((option) => {
        const active = heritage === option;

        return (
          <button
            key={option}
            type="button"
            onClick={() => onHeritageChange(option)}
            className={`min-h-32 rounded-2xl border p-6 text-left transition ${
              active
                ? "border-[#B08D57] bg-[#B08D57]/10"
                : "border-white/10 bg-white/[0.02] hover:border-white/25"
            }`}
          >
            <p className="text-xl">{option}</p>

            <p className="mt-2 text-sm leading-6 text-[#77736A]">
              Primary heritage
            </p>
          </button>
        );
      })}
    </div>
  );
}
// components/builder/BuilderValues.tsx

type BuilderValuesProps = {
  value: string;
  options: string[];
  onValueChange: (value: string) => void;
};

export default function BuilderValues({
  value,
  options,
  onValueChange,
}: BuilderValuesProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {options.map((option) => {
        const active = value === option;

        return (
          <button
            key={option}
            type="button"
            onClick={() => onValueChange(option)}
            className={`min-h-32 rounded-2xl border p-6 text-left transition ${
              active
                ? "border-[#B08D57] bg-[#B08D57]/10"
                : "border-white/10 bg-white/[0.02] hover:border-white/25"
            }`}
          >
            <p className="text-xl">{option}</p>

            <p className="mt-2 text-sm leading-6 text-[#77736A]">
              Family principle
            </p>
          </button>
        );
      })}
    </div>
  );
}
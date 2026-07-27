// components/builder/BuilderMotto.tsx

type BuilderMottoProps = {
  motto: string;
  options: string[];
  onMottoChange: (value: string) => void;
};

export default function BuilderMotto({
  motto,
  options,
  onMottoChange,
}: BuilderMottoProps) {
  return (
    <div className="space-y-4">
      {options.map((option) => {
        const active = motto === option;

        return (
          <button
            key={option}
            type="button"
            onClick={() => onMottoChange(option)}
            className={`flex w-full items-center justify-between gap-6 rounded-2xl border p-6 text-left transition ${
              active
                ? "border-[#B08D57] bg-[#B08D57]/10"
                : "border-white/10 bg-white/[0.02] hover:border-white/25"
            }`}
          >
            <div>
              <p className="text-xl text-[#F6F2EA]">{option}</p>

              <p className="mt-2 text-xs uppercase tracking-[0.25em] text-[#77736A]">
                Latin motto
              </p>
            </div>

            <span className="text-xs uppercase tracking-[0.2em] text-[#B08D57]">
              {active ? "Selected" : "Choose"}
            </span>
          </button>
        );
      })}
    </div>
  );
}
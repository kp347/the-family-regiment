import type {
  Motto,
} from "@/lib/herald/motto";

type BuilderMottoProps = {
  motto: string;
  options: Motto[];
  onMottoChange: (value: string) => void;
};

function getFitLabel(
  fit: Motto["fit"],
): string {
  switch (fit) {
    case "short":
      return "Short fit";

    case "medium":
      return "Medium fit";

    case "long":
      return "Long fit";

    default:
      return "Approved fit";
  }
}

export default function BuilderMotto({
  motto,
  options,
  onMottoChange,
}: BuilderMottoProps) {
  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-[#B08D57]/25 bg-[#B08D57]/5 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#B08D57]">
          Recommended for your family
        </p>

        <p className="mt-3 max-w-xl text-sm leading-6 text-[#99958D]">
          These Latin mottos are selected from the approved
          Regiment library based on the family value you chose.
          Each option is sized to work within the crest rocker.
        </p>
      </div>

      <div className="space-y-4">
        {options.map((option, index) => {
          const active =
            motto === option.latin;

          return (
            <button
              key={option.id}
              type="button"
              onClick={() =>
                onMottoChange(
                  option.latin,
                )
              }
              className={`flex w-full items-center justify-between gap-6 rounded-2xl border p-6 text-left transition ${
                active
                  ? "border-[#B08D57] bg-[#B08D57]/10"
                  : "border-white/10 bg-white/[0.02] hover:border-white/25"
              }`}
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-3">
                  <p className="text-xl text-[#F6F2EA]">
                    {option.latin}
                  </p>

                  {index === 0 && (
                    <span className="rounded-full border border-[#B08D57]/30 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#B08D57]">
                      Recommended
                    </span>
                  )}
                </div>

                <p className="mt-2 text-sm text-[#C9C4B9]">
                  {option.english}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#77736A]">
                  <span>
                    Latin motto
                  </span>

                  <span
                    aria-hidden="true"
                    className="text-white/20"
                  >
                    •
                  </span>

                  <span>
                    {getFitLabel(
                      option.fit,
                    )}
                  </span>
                </div>
              </div>

              <span className="shrink-0 text-xs font-semibold uppercase tracking-[0.2em] text-[#B08D57]">
                {active
                  ? "Selected"
                  : "Choose"}
              </span>
            </button>
          );
        })}
      </div>

      {options.length === 0 && (
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
          <p className="text-sm leading-6 text-[#99958D]">
            No approved motto recommendations are available
            for this selection yet.
          </p>
        </div>
      )}
    </div>
  );
}
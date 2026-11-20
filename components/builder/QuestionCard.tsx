
import type { ReactNode } from "react";

type QuestionCardProps = {
  label: string;
  description?: string;
  required?: boolean;
  children: ReactNode;
};

export default function QuestionCard({
  label,
  description,
  required = false,
  children,
}: QuestionCardProps) {
  return (
    <section className="border border-[#d8c9b3] bg-white/70 p-6 sm:p-8">
      <div className="mb-5">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <h2 className="font-display text-2xl text-[#2d2822]">
            {label}
          </h2>

          <span
            className={`text-[0.65rem] font-semibold uppercase tracking-[0.16em] ${
              required
                ? "text-[#8b542f]"
                : "text-[#817366]"
            }`}
          >
            {required ? "Required" : "Optional"}
          </span>
        </div>

        {description && (
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#6b6055]">
            {description}
          </p>
        )}
      </div>

      {children}
    </section>
  );
}

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
        <div className="flex items-center gap-2">
          <h2 className="font-display text-2xl text-[#2d2822]">
            {label}
          </h2>

          {required && (
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8b542f]">
              Required
            </span>
          )}
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
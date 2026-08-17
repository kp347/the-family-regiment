interface IdentitySummaryProps {
  familyName: string;
  summary: string;
}

export default function IdentitySummary({
  familyName,
  summary,
}: IdentitySummaryProps) {
  return (
    <section className="rounded-2xl border border-stone-200 bg-white p-8 shadow-sm">
      <div className="mb-6">
        <p className="text-sm uppercase tracking-[0.3em] text-stone-500">
          Family Identity
        </p>

        <h2 className="mt-2 text-3xl font-serif">
          {familyName}
        </h2>
      </div>

      <div className="prose prose-stone max-w-none">
        {summary
          .split("\n")
          .filter(Boolean)
          .map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
      </div>
    </section>
  );
}
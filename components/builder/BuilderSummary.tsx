// components/builder/BuilderSummary.tsx

type BuilderSummaryProps = {
  regimentTitle: string;
  familyName: string;
  initials: string;
  heritage: string;
  symbol: string;
  value: string;
  motto: string;
  crestPlacement: string;
  embroideryFinish: string;
  includeNameTape: boolean;
  includeSleevePatch: boolean;
  onCreateCrest: () => void;
  onSave: () => void;
};

export default function BuilderSummary({
  regimentTitle,
  familyName,
  initials,
  heritage,
  symbol,
  value,
  motto,
  crestPlacement,
  embroideryFinish,
  includeNameTape,
  includeSleevePatch,
  onCreateCrest,
  onSave,
}: BuilderSummaryProps) {
  return (
    <div className="rounded-[2rem] border border-[#B08D57]/35 bg-[#20211E] p-8 md:p-10">
      <p className="text-xs uppercase tracking-[0.35em] text-[#B08D57]">
        Regiment Summary
      </p>

      <h3 className="mt-6 text-4xl">{regimentTitle}</h3>

      <div className="mt-8 space-y-5 border-y border-white/10 py-7">
        <SummaryRow
          label="Family"
          value={familyName || "Not provided"}
        />

        <SummaryRow
          label="Monogram"
          value={initials || "Not provided"}
        />

        <SummaryRow label="Heritage" value={heritage} />

        <SummaryRow label="Symbol" value={symbol} />

        <SummaryRow label="Principle" value={value} />

        <SummaryRow label="Motto" value={motto} />

        <SummaryRow
          label="Crest placement"
          value={crestPlacement}
        />

        <SummaryRow
          label="Embroidery"
          value={embroideryFinish}
        />

        <SummaryRow
          label="Name tape"
          value={includeNameTape ? "Included" : "Not included"}
        />

        <SummaryRow
          label="Sleeve patch"
          value={includeSleevePatch ? "Included" : "Not included"}
        />
      </div>

      <p className="mt-7 leading-7 text-[#99958D]">
        This identity will become the foundation for your custom crest,
        embroidery palette, jacket placement, and chapter patches.
      </p>

      <button
        type="button"
        onClick={onCreateCrest}
        className="mt-8 w-full rounded-full bg-[#B08D57] px-8 py-4 text-sm font-semibold uppercase tracking-widest text-[#151515] transition hover:scale-[1.01]"
      >
        Create My Crest
      </button>

      <button
        type="button"
        onClick={onSave}
        className="mt-4 w-full rounded-full border border-white/15 px-8 py-4 text-sm font-semibold uppercase tracking-widest text-[#F6F2EA] transition hover:border-[#B08D57] hover:text-[#B08D57]"
      >
        Save for Later
      </button>
    </div>
  );
}

function SummaryRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start justify-between gap-8">
      <span className="text-xs uppercase tracking-[0.25em] text-[#77736A]">
        {label}
      </span>

      <span className="max-w-[60%] text-right text-sm text-[#F6F2EA]">
        {value}
      </span>
    </div>
  );
}
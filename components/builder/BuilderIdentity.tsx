// components/builder/BuilderIdentity.tsx

type BuilderIdentityProps = {
  familyName: string;
  initials: string;
  regimentTitle: string;
  onFamilyNameChange: (value: string) => void;
  onInitialsChange: (value: string) => void;
};

export default function BuilderIdentity({
  familyName,
  initials,
  regimentTitle,
  onFamilyNameChange,
  onInitialsChange,
}: BuilderIdentityProps) {
  return (
    <div className="max-w-2xl space-y-8">
      <div className="rounded-2xl border border-[#B08D57]/25 bg-[#B08D57]/5 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#B08D57]">
          First, establish your House
        </p>
        <p className="mt-3 text-sm leading-7 text-[#BDB7AC]">
          Your House Name represents your family legacy. It appears on your
          family crest and carries across your House collection. Later, when
          customizing your jacket, you can choose a different name, nickname,
          or callsign for the chest name tape.
        </p>
      </div>

      <InputField
        id="family-name"
        label="House Name"
        value={familyName}
        placeholder="e.g. Fitzgerald"
        maxLength={30}
        helper="Your family's name on the crest. This is separate from the jacket's personal name tape."
        onChange={onFamilyNameChange}
      />

      <InputField
        id="family-initials"
        label="Regiment Initials"
        value={initials}
        placeholder="e.g. FZ"
        maxLength={4}
        helper="Your chosen House monogram or initials."
        onChange={(nextValue) => onInitialsChange(nextValue.toUpperCase())}
      />

      <div className="rounded-2xl border border-[#B08D57]/25 bg-[#B08D57]/5 p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-[#B08D57]">
          House Identity Preview
        </p>
        <p className="mt-4 text-3xl">{regimentTitle}</p>
        <p className="mt-3 text-sm leading-6 text-[#8F8B82]">
          This is your shared family identity, not your jacket name tape.
          You'll personalize the chest name tape separately in the Jacket step.
        </p>
      </div>
    </div>
  );
}

function InputField({
  id,
  label,
  value,
  placeholder,
  maxLength,
  helper,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  maxLength: number;
  helper: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-xs uppercase tracking-[0.3em] text-[#B08D57]">
        {label}
      </label>
      <input
        id={id}
        type="text"
        value={value}
        maxLength={maxLength}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="mt-4 w-full border-b border-white/20 bg-transparent px-0 py-4 text-3xl text-[#F6F2EA] outline-none transition placeholder:text-[#4F4D49] focus:border-[#B08D57]"
      />
      <div className="mt-3 flex items-start justify-between gap-4 text-xs text-[#8F8B82]">
        <span>{helper}</span>
        <span className="shrink-0 text-[#65625D]">{value.length}/{maxLength}</span>
      </div>
    </div>
  );
}

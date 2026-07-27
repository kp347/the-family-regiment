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
      <InputField
        id="family-name"
        label="Family name"
        value={familyName}
        placeholder="Laurent"
        maxLength={30}
        onChange={onFamilyNameChange}
      />

      <InputField
        id="family-initials"
        label="Regiment initials"
        value={initials}
        placeholder="LR"
        maxLength={4}
        onChange={(nextValue) =>
          onInitialsChange(nextValue.toUpperCase())
        }
      />

      <div className="rounded-2xl border border-[#B08D57]/25 bg-[#B08D57]/5 p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-[#B08D57]">
          Identity Preview
        </p>

        <p className="mt-4 text-3xl">{regimentTitle}</p>

        <p className="mt-3 text-sm leading-6 text-[#8F8B82]">
          Your name and initials can appear on the crest, interior label,
          monogram patch, and family record card.
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
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  maxLength: number;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="text-xs uppercase tracking-[0.3em] text-[#B08D57]"
      >
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

      <div className="mt-3 flex justify-between text-xs text-[#65625D]">
        <span>Used throughout your custom identity.</span>

        <span>
          {value.length}/{maxLength}
        </span>
      </div>
    </div>
  );
}
type RegistryCardProps = {
  familyName: string;
  registryNumber: string;
  country: string;
 state: string;
 established: string;
 motto: string;
 steward: string;
 status: string;
};

export default function RegistryCard({
  familyName,
  registryNumber,
  country,
  state,
  established,
  motto,
  steward,
  status,
}: RegistryCardProps) {
  return (
    <div className="mx-auto max-w-3xl overflow-hidden rounded-sm border border-[#b89d6a] bg-[#f7f2e8] shadow-[0_25px_70px_rgba(30,24,18,0.18)]">
      <div className="border-b border-[#d8ccb9] bg-[#efe6d8] px-10 py-8">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8b542f]">
          The Family Regiment
        </p>

        <h3 className="font-display mt-4 text-4xl text-[#2d2822]">
          Family Registry
        </h3>

        <p className="mt-3 text-sm uppercase tracking-[0.22em] text-[#7b6e60]">
          Registry No. {registryNumber}
        </p>
      </div>

      <div className="grid gap-y-8 p-10 md:grid-cols-2 md:gap-x-16">
        <Field label="Family">{familyName}</Field>

        <Field label="Steward">{steward}</Field>

        <Field label="Country of Origin">{country}</Field>

        <Field label="State">{state}</Field>

        <Field label="Established">{established}</Field>

        <Field label="Status">{status}</Field>

        <Field label="Family Motto" full>
          {motto}
        </Field>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
  full,
}: {
  label: string;
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <div className={full ? "md:col-span-2" : ""}>
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8b542f]">
        {label}
      </p>

      <p className="mt-2 text-xl text-[#2d2822]">
        {children}
      </p>
    </div>
  );
}
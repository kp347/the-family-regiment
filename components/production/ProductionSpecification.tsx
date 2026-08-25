import type { PatchProductionSpec } from "@/lib/production/types";

type ProductionSpecificationProps = {
  spec: PatchProductionSpec;
};

export default function ProductionSpecification({
  spec,
}: ProductionSpecificationProps) {
  return (
    <section className="rounded-2xl border border-[#8a7453]/30 bg-[#efe6d6] p-8 text-[#2c2721] shadow-[0_25px_70px_rgba(45,32,20,0.12)]">
      <div className="flex flex-col gap-6 border-b border-[#9f8866]/35 pb-7 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8b542f]">
            Production Specification
          </p>

          <h2 className="font-display mt-3 text-4xl">
            Patch Manufacturing Review
          </h2>

          <p className="mt-3 text-sm text-[#6e6255]">
            {spec.productionSpecId} · Version {spec.version}
          </p>
        </div>

        <div className="w-fit border border-[#8b542f]/30 bg-[#8b542f]/10 px-4 py-2">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6f4328]">
            {formatLabel(spec.status)}
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Metric
          label="Finished Size"
          value={`${spec.dimensions.widthInches}" × ${spec.dimensions.heightInches}"`}
        />

        <Metric
          label="Construction"
          value={formatLabel(spec.construction)}
        />

        <Metric
          label="Placement"
          value={formatLabel(spec.garment.placementId)}
        />

        <Metric
          label="Production Qty"
          value={spec.quantity.productionQuantity.toString()}
        />
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <SpecificationGroup title="Garment">
          <SpecificationRow
            label="Silhouette"
            value={formatLabel(spec.garment.silhouetteId)}
          />

          <SpecificationRow
            label="Placement"
            value={formatLabel(spec.garment.placementId)}
          />

          <SpecificationRow
            label="Manufacturer"
            value={spec.garment.manufacturer ?? "Pending"}
          />

          <SpecificationRow
            label="Style Number"
            value={spec.garment.manufacturerStyleNumber ?? "Pending"}
          />

          <SpecificationRow
            label="Color"
            value={spec.garment.color ?? "Pending"}
          />
        </SpecificationGroup>

        <SpecificationGroup title="Materials">
          <SpecificationRow
            label="Base Material"
            value={spec.materials.baseMaterial}
          />

          <SpecificationRow
            label="Embroidery Finish"
            value={formatLabel(spec.materials.embroideryFinish)}
          />

          <SpecificationRow
            label="Border"
            value={formatLabel(spec.finishing.border)}
          />

          <SpecificationRow
            label="Backing"
            value={formatLabel(spec.finishing.backing)}
          />
        </SpecificationGroup>
      </div>

      <div className="mt-10">
        <SpecificationGroup title="Order">
          <SpecificationRow
            label="Sample Quantity"
            value={spec.quantity.sampleQuantity.toString()}
          />

          <SpecificationRow
            label="Target Date"
            value={
              spec.deadline.requestedCompletionDate ??
              spec.deadline.notes ??
              "To be confirmed"
            }
          />

          <SpecificationRow
            label="Artwork Version"
            value={spec.artwork.artworkVersion}
          />

          <SpecificationRow
            label="Master Format"
            value={
              spec.artwork.masterFormat
                ? spec.artwork.masterFormat.toUpperCase()
                : "Pending"
            }
          />
        </SpecificationGroup>
      </div>

      <div className="mt-10">
        <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8b542f]">
          Color References
        </h3>

        <div className="mt-4 overflow-hidden border border-[#a99577]/40">
          {spec.materials.colors.map((color, index) => (
            <div
              key={`${color.role}-${index}`}
              className="grid gap-3 border-b border-[#a99577]/30 px-5 py-4 last:border-b-0 sm:grid-cols-[1fr_1fr_1fr]"
            >
              <p className="font-semibold">{color.role}</p>

              <p className="text-[#6e6255]">
                {color.hex ?? "No digital color reference"}
              </p>

              <p className="text-[#6e6255]">
                {color.threadSystem && color.threadCode
                  ? `${color.threadSystem}: ${color.threadCode}`
                  : "Vendor thread match required"}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8b542f]">
          Production Notes
        </h3>

        <p className="mt-4 max-w-5xl leading-8 text-[#5f554a]">
          {spec.productionNotes ?? "No production notes recorded."}
        </p>
      </div>

      <div className="mt-10 border-t border-[#9f8866]/35 pt-6">
        <p className="text-[10px] uppercase tracking-[0.22em] text-[#8d806f]">
          Preliminary specification · Final placement and production subject
          to physical sampling
        </p>
      </div>
    </section>
  );
}

function Metric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="border border-[#a99577]/40 bg-[#e8ddcb] p-5">
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8c7961]">
        {label}
      </p>

      <p className="font-display mt-3 text-2xl">{value}</p>
    </div>
  );
}

function SpecificationGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8b542f]">
        {title}
      </h3>

      <div className="mt-4 border border-[#a99577]/40">{children}</div>
    </div>
  );
}

function SpecificationRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-6 border-b border-[#a99577]/30 px-5 py-4 last:border-b-0">
      <p className="text-sm text-[#756959]">{label}</p>

      <p className="text-right font-semibold">{value}</p>
    </div>
  );
}

function formatLabel(value: string) {
  return value
    .split("-")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() +
        word.slice(1),
    )
    .join(" ");
}
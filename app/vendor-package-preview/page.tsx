import DownloadProductionExportButton from "@/components/production/DownloadProductionExportButton";

import type {
  VendorProductionPackage,
} from "@/lib/production/buildProductionPackage";

const samplePackage: VendorProductionPackage = {
  packageId: "FR-VENDOR-0001",

  productionSpecId: "FR-PATCH-0001",

  productionSpecVersion: 1,

  status: "ready-to-send",

  createdAt: new Date().toISOString(),

  updatedAt: new Date().toISOString(),

  artwork: {
    masterFormat: "svg",

    artworkVersion: "1.0",

    referenceLabel:
      "Approved Family Regiment Crest Reference",

    notes:
      "Final production artwork remains subject to manufacturer digitization and physical sample approval.",
  },

  approval: {
    currentStage: "quote-review",

    records: [
      {
        stage: "quote-review",

        approved: false,

        notes:
          "Awaiting manufacturer quote and feasibility review.",
      },
    ],
  },

  garment: {
    silhouette:
      "Open Right Chest Field Jacket",

    placement:
      "Right Upper Chest",

    manufacturer:
      "Pending Vendor Selection",

    styleNumber:
      "TBD",

    color:
      "Army Green / Olive",
  },

  dimensions: {
    widthInches: 3.75,

    heightInches: 4.25,
  },

  construction:
    "Embroidered",

  materials: {
    baseMaterial:
      "Embroidery twill",

    embroideryFinish:
      "Regiment Gold",

    border:
      "Merrow",

    backing:
      "Hook Loop",

    colors: [
      {
        role:
          "Shield Field",

        hex:
          "#1F2A1F",
      },

      {
        role:
          "Secondary",

        hex:
          "#E8D7AE",
      },

      {
        role:
          "Metallic Accent",

        threadSystem:
          "Vendor selection required",

        threadCode:
          "gold",
      },
    ],
  },

  quantity: {
    sampleQuantity: 1,

    productionQuantity: 25,
  },

  productionNotes:
    "Any proposed artwork simplification must preserve the approved heraldic identity and must be submitted for approval before production. Final thread codes, stitch density, digitization, and garment placement remain subject to physical sampling.",

  vendor: {
    vendorName:
      "Sample Manufacturing Partner",

    contactName:
      "Production Team",

    contactEmail:
      "production@example.com",
  },
};

const approvalStages = [
  "quote-review",
  "sample-required",
  "sample-approved",
  "production-authorized",
] as const;

export default function VendorPackagePreviewPage() {
  return (
    <main className="min-h-screen bg-[#171813] px-6 py-16 text-[#2c2721]">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#b89559]">
              The Family Regiment
            </p>

            <h1 className="font-display mt-4 text-5xl text-[#f3eadc]">
              Vendor Production Package
            </h1>

            <p className="mt-4 max-w-3xl leading-7 text-[#aaa194]">
              Manufacturer review package for quoting,
              sampling, and production feasibility.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <DownloadProductionExportButton
              packageData={samplePackage}
              exportType="traveler"
              label="Download PDF Traveler"
            />

            <DownloadProductionExportButton
              packageData={samplePackage}
              exportType="manifest"
              label="Download Manifest"
            />

            <DownloadProductionExportButton
              packageData={samplePackage}
              exportType="package"
              label="Download Vendor Package"
            />
          </div>
        </div>

        <section className="rounded-2xl border border-[#8a7453]/30 bg-[#efe6d6] p-8 shadow-[0_25px_70px_rgba(0,0,0,0.25)]">
          <div className="flex flex-col gap-6 border-b border-[#9f8866]/35 pb-7 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#8b542f]">
                Manufacturing Package
              </p>

              <h2 className="font-display mt-3 text-4xl">
                Family Crest Patch
              </h2>

              <p className="mt-3 text-sm text-[#6e6255]">
                {samplePackage.packageId}
                {" · "}
                Production Spec{" "}
                {samplePackage.productionSpecId}
                {" · "}
                Version{" "}
                {samplePackage.productionSpecVersion}
              </p>
            </div>

            <div className="border border-[#8b542f]/30 bg-[#8b542f]/10 px-4 py-2">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6f4328]">
                Ready To Send
              </p>
            </div>
          </div>

          <ArtworkReference />

          <ApprovalStatus />

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <Metric
              label="Finished Size"
              value={`${samplePackage.dimensions.widthInches}" × ${samplePackage.dimensions.heightInches}"`}
            />

            <Metric
              label="Construction"
              value={samplePackage.construction}
            />

            <Metric
              label="Placement"
              value={samplePackage.garment.placement}
            />

            <Metric
              label="Production Qty"
              value={samplePackage.quantity.productionQuantity.toString()}
            />
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <Group title="Vendor">
              <Row
                label="Company"
                value={
                  samplePackage.vendor?.vendorName ??
                  "Pending"
                }
              />

              <Row
                label="Contact"
                value={
                  samplePackage.vendor?.contactName ??
                  "Pending"
                }
              />

              <Row
                label="Email"
                value={
                  samplePackage.vendor?.contactEmail ??
                  "Pending"
                }
              />
            </Group>

            <Group title="Garment">
              <Row
                label="Silhouette"
                value={
                  samplePackage.garment.silhouette
                }
              />

              <Row
                label="Placement"
                value={
                  samplePackage.garment.placement
                }
              />

              <Row
                label="Manufacturer"
                value={
                  samplePackage.garment.manufacturer ??
                  "Pending"
                }
              />

              <Row
                label="Style Number"
                value={
                  samplePackage.garment.styleNumber ??
                  "Pending"
                }
              />

              <Row
                label="Color"
                value={
                  samplePackage.garment.color ??
                  "Pending"
                }
              />
            </Group>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <Group title="Construction">
              <Row
                label="Base Material"
                value={
                  samplePackage.materials.baseMaterial
                }
              />

              <Row
                label="Embroidery Finish"
                value={
                  samplePackage.materials
                    .embroideryFinish
                }
              />

              <Row
                label="Border"
                value={
                  samplePackage.materials.border
                }
              />

              <Row
                label="Backing"
                value={
                  samplePackage.materials.backing
                }
              />
            </Group>

            <Group title="Order">
              <Row
                label="Sample Quantity"
                value={
                  samplePackage.quantity.sampleQuantity.toString()
                }
              />

              <Row
                label="Production Quantity"
                value={
                  samplePackage.quantity.productionQuantity.toString()
                }
              />

              <Row
                label="Requested Completion"
                value={
                  samplePackage.requestedCompletionDate ??
                  "To be confirmed"
                }
              />

              <Row
                label="Artwork Version"
                value={
                  samplePackage.artwork.artworkVersion
                }
              />

              <Row
                label="Master Format"
                value={
                  samplePackage.artwork.masterFormat?.toUpperCase() ??
                  "Pending"
                }
              />
            </Group>
          </div>

          <div className="mt-10">
            <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8b542f]">
              Color References
            </h3>

            <div className="mt-4 overflow-hidden border border-[#a99577]/40">
              {samplePackage.materials.colors.map(
                (color, index) => (
                  <div
                    key={`${color.role}-${index}`}
                    className="grid gap-3 border-b border-[#a99577]/30 px-5 py-4 last:border-b-0 md:grid-cols-[1fr_1fr_1.5fr]"
                  >
                    <p className="font-semibold">
                      {color.role}
                    </p>

                    <p className="text-[#6e6255]">
                      {color.hex ??
                        "No digital reference"}
                    </p>

                    <p className="text-[#6e6255]">
                      {color.threadSystem &&
                      color.threadCode
                        ? `${color.threadSystem}: ${color.threadCode}`
                        : "Vendor thread match required"}
                    </p>
                  </div>
                ),
              )}
            </div>
          </div>

          <div className="mt-10">
            <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8b542f]">
              Production Notes
            </h3>

            <p className="mt-4 max-w-5xl leading-8 text-[#5f554a]">
              {samplePackage.productionNotes ??
                "No production notes recorded."}
            </p>
          </div>

          <div className="mt-10 border-t border-[#9f8866]/35 pt-6">
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#8d806f]">
              Manufacturer review package · Final
              production requires recorded sample approval
              and production authorization
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

function ArtworkReference() {
  const artwork =
    samplePackage.artwork;

  return (
    <div className="mt-10">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8b542f]">
            Artwork Reference
          </h3>

          <p className="mt-2 text-sm text-[#756959]">
            Visual reference for manufacturer comparison,
            sampling, and production review.
          </p>
        </div>

        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8c7961]">
          Artwork Version {artwork.artworkVersion}
        </p>
      </div>

      <div className="mt-4 grid overflow-hidden border border-[#a99577]/40 lg:grid-cols-[minmax(0,1.25fr)_minmax(300px,0.75fr)]">
        <div className="flex min-h-[360px] items-center justify-center bg-[#e3d7c4] p-8">
          {artwork.referenceImageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={artwork.referenceImageUrl}
              alt={
                artwork.referenceLabel ??
                "Family crest production reference"
              }
              className="max-h-[420px] max-w-full object-contain"
            />
          ) : (
            <div className="flex min-h-[280px] w-full max-w-lg flex-col items-center justify-center border border-dashed border-[#8c7961]/60 bg-[#efe6d6]/60 p-10 text-center">
              <div className="flex h-24 w-20 items-center justify-center border-2 border-[#8b542f]/60">
                <span className="font-display text-3xl text-[#8b542f]">
                  FR
                </span>
              </div>

              <p className="mt-6 font-display text-2xl">
                Crest Artwork Reference
              </p>

              <p className="mt-3 max-w-sm text-sm leading-6 text-[#756959]">
                Production reference image will appear here
                when approved crest artwork is attached to
                the production specification.
              </p>
            </div>
          )}
        </div>

        <div className="border-t border-[#a99577]/40 p-6 lg:border-l lg:border-t-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8c7961]">
            Reference
          </p>

          <p className="mt-2 font-semibold">
            {artwork.referenceLabel ??
              "Approved Family Regiment Crest Reference"}
          </p>

          <div className="mt-6 space-y-5">
            <ArtworkDetail
              label="Master Format"
              value={
                artwork.masterFormat?.toUpperCase() ??
                "Pending"
              }
            />

            <ArtworkDetail
              label="Artwork Version"
              value={artwork.artworkVersion}
            />

            <ArtworkDetail
              label="Master Artwork"
              value={
                artwork.masterArtworkUrl
                  ? "Attached"
                  : "Pending"
              }
            />

            <ArtworkDetail
              label="Reference Image"
              value={
                artwork.referenceImageUrl
                  ? "Attached"
                  : "Pending"
              }
            />
          </div>

          {artwork.notes && (
            <p className="mt-7 border-t border-[#a99577]/30 pt-5 text-sm leading-6 text-[#6e6255]">
              {artwork.notes}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function ApprovalStatus() {
  const approval =
    samplePackage.approval;

  return (
    <div className="mt-10">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8b542f]">
            Production Approval
          </h3>

          <p className="mt-2 text-sm text-[#756959]">
            Manufacturing authority is tracked separately
            from operational production status.
          </p>
        </div>

        <div className="border border-[#8b542f]/30 bg-[#8b542f]/10 px-4 py-2">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#6f4328]">
            Current Stage:{" "}
            {formatApprovalStage(
              approval.currentStage,
            )}
          </p>
        </div>
      </div>

      <div className="mt-4 grid gap-px overflow-hidden border border-[#a99577]/40 bg-[#a99577]/40 md:grid-cols-2 xl:grid-cols-4">
        {approvalStages.map(
          (stage, index) => {
            const record =
              approval.records.find(
                (item) =>
                  item.stage === stage,
              );

            const isApproved =
              record?.approved ?? false;

            const isCurrent =
              approval.currentStage ===
              stage;

            return (
              <div
                key={stage}
                className="bg-[#efe6d6] p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8c7961]">
                      Stage {index + 1}
                    </p>

                    <p className="mt-2 font-semibold">
                      {formatApprovalStage(
                        stage,
                      )}
                    </p>
                  </div>

                  <ApprovalBadge
                    approved={isApproved}
                    current={isCurrent}
                  />
                </div>

                <p className="mt-5 text-sm leading-6 text-[#6e6255]">
                  {record?.notes ??
                    approvalStageDescription(
                      stage,
                    )}
                </p>

                {record?.approvedAt && (
                  <p className="mt-4 text-xs text-[#8c7961]">
                    Approved{" "}
                    {formatDate(
                      record.approvedAt,
                    )}
                    {record.approvedBy
                      ? ` · ${record.approvedBy}`
                      : ""}
                  </p>
                )}
              </div>
            );
          },
        )}
      </div>
    </div>
  );
}

function ApprovalBadge({
  approved,
  current,
}: {
  approved: boolean;
  current: boolean;
}) {
  if (approved) {
    return (
      <span className="border border-[#53664b]/35 bg-[#53664b]/10 px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-[#42513c]">
        Approved
      </span>
    );
  }

  if (current) {
    return (
      <span className="border border-[#8b542f]/35 bg-[#8b542f]/10 px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-[#6f4328]">
        Current
      </span>
    );
  }

  return (
    <span className="border border-[#9b8c79]/35 px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-[#8c7961]">
      Pending
    </span>
  );
}

function ArtworkDetail({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8c7961]">
        {label}
      </p>

      <p className="mt-1 font-semibold">
        {value}
      </p>
    </div>
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

      <p className="font-display mt-3 text-2xl">
        {value}
      </p>
    </div>
  );
}

function Group({
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

      <div className="mt-4 border border-[#a99577]/40">
        {children}
      </div>
    </div>
  );
}

function Row({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-6 border-b border-[#a99577]/30 px-5 py-4 last:border-b-0">
      <p className="text-sm text-[#756959]">
        {label}
      </p>

      <p className="text-right font-semibold">
        {value}
      </p>
    </div>
  );
}

function formatApprovalStage(
  value: string,
): string {
  return value
    .split("-")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() +
        word.slice(1),
    )
    .join(" ");
}

function approvalStageDescription(
  stage: string,
): string {
  switch (stage) {
    case "quote-review":
      return "Manufacturer quote and production feasibility have not yet been accepted.";

    case "sample-required":
      return "A physical production sample is required before approval.";

    case "sample-approved":
      return "Physical sample must be reviewed and formally approved.";

    case "production-authorized":
      return "Final manufacturing authorization has not yet been issued.";

    default:
      return "Approval pending.";
  }
}

function formatDate(
  value: string,
): string {
  const date =
    new Date(value);

  if (
    Number.isNaN(
      date.getTime(),
    )
  ) {
    return value;
  }

  return date.toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    },
  );
}
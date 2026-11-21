// Replace the page containing the sample manufacturing specification.
import ProductionSpecification from "@/components/production/ProductionSpecification";
import type { PatchProductionSpec } from "@/lib/production/types";

const sampleSpec: PatchProductionSpec = {
  productionSpecId: "FR-PATCH-0001",
  version: 2,
  status: "ready-for-quote",
  approval: {
    currentStage: "quote-review",
    records: [
      {
        stage: "quote-review",
        approved: false,
        notes: "Awaiting manufacturer quote and feasibility review. Revised to the approved left-shoulder crest position; dimensions remain provisional.",
      },
    ],
  },
  artwork: {
    masterFormat: "svg",
    artworkVersion: "1.0",
    referenceLabel: "Family Regiment Crest — Production Reference (Unapproved)",
    notes: "Final production artwork remains subject to manufacturer digitization and physical sample approval.",
  },
  garment: {
    silhouetteId: "open-right-chest-field-jacket",
    placementId: "left-shoulder-crest",
    manufacturer: "Pending Vendor Selection",
    manufacturerStyleNumber: "TBD",
    color: "Army Green / Olive",
  },
  dimensions: {
    widthInches: 3,
    heightInches: 3.5,
  },
  quantity: {
    sampleQuantity: 1,
    productionQuantity: 25,
  },
  construction: "embroidered",
  materials: {
    baseMaterial: "Embroidery twill",
    embroideryFinish: "regiment-gold",
    colors: [
      { role: "Shield Field", hex: "#1F2A1F" },
      { role: "Secondary", hex: "#E8D7AE" },
      {
        role: "Metallic Accent",
        threadSystem: "Vendor selection required",
        threadCode: "gold",
      },
    ],
  },
  finishing: {
    border: "merrow",
    backing: "hook-loop",
  },
  deadline: {
    notes: "Target completion date to be confirmed after quote and physical sampling.",
  },
  productionNotes:
    "Internal demonstration specification only; not a vendor authorization. House crest is placed on the wearer's left shoulder. Heritage flags belong on the right shoulder and require a separate specification. Name tape belongs above the chest pocket. Preliminary patch dimensions must be checked against actual garment sizes, shoulder seams, curvature, and physical embroidery samples. Manufacturer must approve digitization, thread codes, stitch density, border, backing, and seam clearance. No production is authorized without documented sample approval.",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export default function ProductionPreviewPage() {
  return (
    <main className="min-h-screen bg-[#171813] px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#b89559]">
            Internal Production Preview
          </p>
          <h1 className="font-display mt-4 text-5xl text-[#f3eadc]">
            Manufacturing Specification
          </h1>
          <p className="mt-4 max-w-2xl leading-7 text-[#aaa194]">
            This internal preview demonstrates how a House design is translated
            into a draft manufacturing specification for vendor feasibility review.
            It is not an approved production order.
          </p>
        </div>
        <ProductionSpecification spec={sampleSpec} />
      </div>
    </main>
  );
}

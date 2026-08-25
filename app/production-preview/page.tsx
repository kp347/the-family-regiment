import ProductionSpecification from "@/components/production/ProductionSpecification";
import type { PatchProductionSpec } from "@/lib/production/types";

const sampleSpec: PatchProductionSpec = {
  productionSpecId: "FR-PATCH-0001",

  version: 1,

  status: "ready-for-quote",

  artwork: {
    masterFormat: "svg",

    artworkVersion: "1.0",
  },

  garment: {
    silhouetteId:
      "open-right-chest-field-jacket",

    placementId:
      "right-upper-chest",

    manufacturer:
      "Pending Vendor Selection",

    manufacturerStyleNumber:
      "TBD",

    color:
      "Army Green / Olive",
  },

  dimensions: {
    widthInches: 3.75,

    heightInches: 4.25,
  },

  quantity: {
    sampleQuantity: 1,

    productionQuantity: 25,
  },

  construction: "embroidered",

  materials: {
    baseMaterial:
      "Embroidery twill",

    embroideryFinish:
      "regiment-gold",

    colors: [
      {
        role: "Shield Field",

        hex: "#1F2A1F",
      },

      {
        role: "Secondary",

        hex: "#E8D7AE",
      },

      {
        role: "Metallic Accent",

        threadSystem:
          "Vendor selection required",

        threadCode:
          "gold",
      },
    ],
  },

  finishing: {
    border: "merrow",

    backing: "hook-loop",
  },

  deadline: {
    notes:
      "Target date to be confirmed after sampling.",
  },

  productionNotes:
    "Production specification generated from an approved Family Regiment design. Garment placement and finished crest dimensions must be verified against the actual production garment before final sample authorization. Any proposed simplification must preserve the approved heraldic identity and be submitted for approval before production.",

  createdAt:
    new Date().toISOString(),

  updatedAt:
    new Date().toISOString(),
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
            This internal preview demonstrates how an approved House design is
            translated into a manufacturer-ready production specification.
          </p>
        </div>

        <ProductionSpecification
          spec={sampleSpec}
        />
      </div>
    </main>
  );
}
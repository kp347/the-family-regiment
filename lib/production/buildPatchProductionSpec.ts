// lib/production/buildPatchProductionSpec.ts

import type {
  CrestColors,
  RegimentProject,
} from "@/lib/herald/types";

import {
  fitsGarmentPlacement,
  getGarmentPlacement,
  type GarmentPlacementId,
  type GarmentSilhouetteId,
} from "./garmentStandards";

import type {
  PatchProductionSpec,
  ProductionArtworkFormat,
  ProductionColor,
  ProductionDimensions,
} from "./types";

type BuildPatchProductionSpecOptions = {
  productionSpecId: string;

  productionQuantity: number;

  garmentId: GarmentSilhouetteId;

  garmentPlacementId: GarmentPlacementId;

  dimensions: ProductionDimensions;

  sampleQuantity?: number;

  requestedCompletionDate?: string;

  productionNotes?: string;

  garment?: {
    manufacturer?: string;

    manufacturerStyleNumber?: string;

    color?: string;
  };

  artwork?: {
    masterArtworkUrl?: string;

    referenceImageUrl?: string;

    masterFormat?: ProductionArtworkFormat;

    artworkVersion?: string;

    referenceLabel?: string;

    notes?: string;
  };
};

export function buildPatchProductionSpec(
  project: RegimentProject,
  options: BuildPatchProductionSpecOptions,
): PatchProductionSpec {
  const now = new Date().toISOString();

  const placement = getGarmentPlacement(
    options.garmentId,
    options.garmentPlacementId,
  );

  const fitsPlacement = fitsGarmentPlacement(
    options.garmentId,
    options.garmentPlacementId,
    options.dimensions.widthInches,
    options.dimensions.heightInches,
  );

  if (!fitsPlacement) {
    throw new Error(
      `Patch dimensions ${options.dimensions.widthInches}" × ${options.dimensions.heightInches}" exceed the maximum usable area for ${placement.label}: ${placement.maxWidthInches}" × ${placement.maxHeightInches}".`,
    );
  }

  const colors = buildProductionColors(
    project.crest.structuredColors,
    project.crest.colors,
  );

  return {
    productionSpecId:
      options.productionSpecId,

    version: 1,

    status: "ready-for-quote",

    approval: {
      currentStage:
        "quote-review",

      records: [
        {
          stage:
            "quote-review",

          approved:
            false,

          notes:
            "Awaiting manufacturer quote and feasibility review.",
        },
      ],
    },

    artwork: {
      masterArtworkUrl:
        options.artwork?.masterArtworkUrl,

      referenceImageUrl:
        options.artwork?.referenceImageUrl,

      masterFormat:
        options.artwork?.masterFormat,

      artworkVersion:
        options.artwork?.artworkVersion ??
        "1.0",

      referenceLabel:
        options.artwork?.referenceLabel ??
        "Approved Family Regiment Crest Reference",

      notes:
        options.artwork?.notes ??
        "Final production artwork remains subject to manufacturer digitization and physical sample approval.",
    },

    garment: {
      silhouetteId:
        options.garmentId,

      placementId:
        options.garmentPlacementId,

      manufacturer:
        options.garment?.manufacturer,

      manufacturerStyleNumber:
        options.garment?.manufacturerStyleNumber,

      color:
        options.garment?.color,
    },

    dimensions: {
      widthInches:
        options.dimensions.widthInches,

      heightInches:
        options.dimensions.heightInches,
    },

    quantity: {
      sampleQuantity:
        Math.max(
          1,
          options.sampleQuantity ?? 1,
        ),

      productionQuantity:
        Math.max(
          1,
          options.productionQuantity,
        ),
    },

    construction:
      "embroidered",

    materials: {
      baseMaterial:
        "Embroidery twill",

      embroideryFinish:
        project.crest.embroideryFinish,

      colors,
    },

    finishing: {
      border:
        project.patch.border,

      backing:
        project.patch.backing,
    },

    deadline: {
      requestedCompletionDate:
        options.requestedCompletionDate,
    },

    productionNotes:
      buildProductionNotes(
        project,
        options,
        placement.label,
      ),

    createdAt:
      now,

    updatedAt:
      now,
  };
}

function buildProductionColors(
  structuredColors:
    | CrestColors
    | undefined,
  legacyColors: string[],
): ProductionColor[] {
  if (structuredColors) {
    return [
      {
        role:
          "Primary",

        hex:
          structuredColors.primary,
      },

      {
        role:
          "Secondary",

        hex:
          structuredColors.secondary,
      },

      {
        role:
          "Metallic Accent",

        threadSystem:
          "Vendor selection required",

        threadCode:
          structuredColors.metallic,
      },
    ];
  }

  return legacyColors.map(
    (color, index) => ({
      role:
        `Color ${index + 1}`,

      hex:
        normalizeHex(color),
    }),
  );
}

function buildProductionNotes(
  project: RegimentProject,
  options: BuildPatchProductionSpecOptions,
  placementLabel: string,
): string {
  const notes: string[] = [];

  notes.push(
    "Production specification generated from an approved Family Regiment design.",
  );

  notes.push(
    `Garment standard: ${options.garmentId}.`,
  );

  notes.push(
    `Approved placement: ${placementLabel}.`,
  );

  notes.push(
    `Finished crest dimensions: ${options.dimensions.widthInches}" × ${options.dimensions.heightInches}".`,
  );

  if (
    options.garment?.manufacturer
  ) {
    notes.push(
      `Garment manufacturer: ${options.garment.manufacturer}.`,
    );
  }

  if (
    options.garment
      ?.manufacturerStyleNumber
  ) {
    notes.push(
      `Garment style: ${options.garment.manufacturerStyleNumber}.`,
    );
  }

  if (
    options.garment?.color
  ) {
    notes.push(
      `Garment color: ${options.garment.color}.`,
    );
  }

  notes.push(
    `Estimated stitch count: ${project.validation.stitchCount.toLocaleString()}.`,
  );

  notes.push(
    `Estimated thread colors: ${project.validation.threadColors}.`,
  );

  if (
    project.validation.issues.length >
    0
  ) {
    notes.push(
      "Current validation issues must be reviewed before final manufacturing approval.",
    );
  }

  notes.push(
    "Any proposed artwork simplification must preserve the approved heraldic identity and must be submitted for approval before production.",
  );

  notes.push(
    "Final thread codes, stitch density, digitization, border execution, and construction details remain subject to physical sampling and manufacturer approval.",
  );

  notes.push(
    "Garment placement must be verified against the actual production garment and full size run before final authorization.",
  );

  notes.push(
    "Production may not advance beyond the current approval stage until the required authorization has been recorded.",
  );

  if (
    options.productionNotes?.trim()
  ) {
    notes.push(
      options.productionNotes.trim(),
    );
  }

  return notes.join(" ");
}

function normalizeHex(
  value: string,
): string | undefined {
  const trimmed =
    value.trim();

  if (
    /^#[0-9A-Fa-f]{6}$/.test(
      trimmed,
    )
  ) {
    return trimmed;
  }

  return undefined;
}
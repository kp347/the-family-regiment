// lib/production/types.ts

import type {
  BorderStyle,
  EmbroideryFinish,
  PatchBacking,
} from "@/lib/herald/types";

import type {
  GarmentPlacementId,
  GarmentSilhouetteId,
} from "./garmentStandards";

/*
 * =========================================================
 * The Family Regiment
 * Production Specification Types
 * =========================================================
 *
 * Heraldry describes WHAT was designed.
 * Production describes HOW the approved design becomes
 * a physical product.
 */

export type ProductionStatus =
  | "draft"
  | "ready-for-quote"
  | "quoted"
  | "sample-requested"
  | "sample-in-production"
  | "sample-review"
  | "approved"
  | "production"
  | "completed";

export type PatchConstruction =
  | "embroidered"
  | "woven";

export type ProductionArtworkFormat =
  | "svg"
  | "ai"
  | "eps"
  | "pdf"
  | "png";

export interface ProductionDimensions {
  widthInches: number;

  heightInches: number;
}

export interface ProductionArtwork {
  masterArtworkUrl?: string;

  referenceImageUrl?: string;

  masterFormat?: ProductionArtworkFormat;

  artworkVersion: string;
}

export interface ProductionColor {
  role: string;

  hex?: string;

  threadCode?: string;

  threadSystem?: string;
}

export interface ProductionMaterials {
  baseMaterial: string;

  embroideryFinish: EmbroideryFinish;

  colors: ProductionColor[];
}

export interface ProductionFinishing {
  border: BorderStyle;

  backing: PatchBacking;
}

export interface ProductionQuantity {
  sampleQuantity: number;

  productionQuantity: number;
}

export interface ProductionDeadline {
  requestedCompletionDate?: string;

  notes?: string;
}

export interface ProductionGarment {
  /*
   * Permanent reference to the garment standard used
   * when the production specification was generated.
   */

  silhouetteId: GarmentSilhouetteId;

  placementId: GarmentPlacementId;

  /*
   * Manufacturer information remains optional until
   * an actual garment vendor/style has been selected.
   */

  manufacturer?: string;

  manufacturerStyleNumber?: string;

  color?: string;
}

export interface PatchProductionSpec {
  productionSpecId: string;

  version: number;

  status: ProductionStatus;

  artwork: ProductionArtwork;

  garment: ProductionGarment;

  dimensions: ProductionDimensions;

  quantity: ProductionQuantity;

  construction: PatchConstruction;

  materials: ProductionMaterials;

  finishing: ProductionFinishing;

  deadline: ProductionDeadline;

  productionNotes?: string;

  createdAt: string;

  updatedAt: string;
}
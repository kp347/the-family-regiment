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
 *
 * Production describes HOW the approved design becomes
 * a physical product.
 *
 * Approval records describe WHAT has actually been
 * authorized to proceed.
 */

/*
 * =========================================================
 * Production Status
 * =========================================================
 *
 * Operational state of the manufacturing job.
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

/*
 * =========================================================
 * Production Approval
 * =========================================================
 *
 * Approval state is intentionally separate from
 * ProductionStatus.
 *
 * This prevents operational progress from being confused
 * with actual authorization.
 */

export type ProductionApprovalStage =
  | "quote-review"
  | "sample-required"
  | "sample-approved"
  | "production-authorized";

export interface ProductionApprovalRecord {
  stage: ProductionApprovalStage;

  approved: boolean;

  /*
   * ISO timestamp.
   *
   * Example:
   * 2026-09-03T15:30:00.000Z
   */

  approvedAt?: string;

  /*
   * Internal name or identifier of the person who
   * authorized the stage.
   *
   * We should not expose unnecessary customer PII
   * in vendor-facing exports.
   */

  approvedBy?: string;

  notes?: string;
}

export interface ProductionApproval {
  currentStage: ProductionApprovalStage;

  records: ProductionApprovalRecord[];
}

/*
 * =========================================================
 * Patch Construction
 * =========================================================
 */

export type PatchConstruction =
  | "embroidered"
  | "woven";

/*
 * =========================================================
 * Artwork
 * =========================================================
 */

export type ProductionArtworkFormat =
  | "svg"
  | "ai"
  | "eps"
  | "pdf"
  | "png";

export interface ProductionArtwork {
  /*
   * Production master.
   *
   * Ideally SVG, AI, EPS, or another approved
   * manufacturing-ready vector format.
   */

  masterArtworkUrl?: string;

  /*
   * Human-readable rendered reference.
   *
   * This is what the vendor should be able to visually
   * compare against the sample.
   */

  referenceImageUrl?: string;

  masterFormat?: ProductionArtworkFormat;

  artworkVersion: string;

  /*
   * Optional title shown in vendor-facing production
   * packages.
   */

  referenceLabel?: string;

  /*
   * Useful when artwork is not yet finalized.
   */

  notes?: string;
}

/*
 * =========================================================
 * Dimensions
 * =========================================================
 */

export interface ProductionDimensions {
  widthInches: number;

  heightInches: number;
}

/*
 * =========================================================
 * Color
 * =========================================================
 */

export interface ProductionColor {
  role: string;

  /*
   * Digital design reference.
   *
   * This is not automatically treated as the final
   * embroidery thread specification.
   */

  hex?: string;

  threadCode?: string;

  threadSystem?: string;
}

/*
 * =========================================================
 * Materials
 * =========================================================
 */

export interface ProductionMaterials {
  baseMaterial: string;

  embroideryFinish: EmbroideryFinish;

  colors: ProductionColor[];
}

/*
 * =========================================================
 * Finishing
 * =========================================================
 */

export interface ProductionFinishing {
  border: BorderStyle;

  backing: PatchBacking;
}

/*
 * =========================================================
 * Quantity
 * =========================================================
 */

export interface ProductionQuantity {
  sampleQuantity: number;

  productionQuantity: number;
}

/*
 * =========================================================
 * Deadline
 * =========================================================
 */

export interface ProductionDeadline {
  requestedCompletionDate?: string;

  notes?: string;
}

/*
 * =========================================================
 * Garment
 * =========================================================
 */

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

/*
 * =========================================================
 * Patch Production Specification
 * =========================================================
 */

export interface PatchProductionSpec {
  /*
   * Permanent internal production identifier.
   */

  productionSpecId: string;

  /*
   * Increment when manufacturing-critical specifications
   * change.
   *
   * Previous versions should remain recoverable.
   */

  version: number;

  status: ProductionStatus;

  /*
   * Approval history travels with the specification so
   * we can determine exactly what was authorized.
   */

  approval: ProductionApproval;

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
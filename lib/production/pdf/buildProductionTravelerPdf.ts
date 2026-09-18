// lib/production/pdf/buildProductionTravelerPdf.ts

import {
  PDFDocument,
  StandardFonts,
  rgb,
  type PDFFont,
  type PDFPage,
} from "pdf-lib";

import type {
  VendorPackageApprovalRecord,
  VendorProductionPackage,
} from "../buildProductionPackage";

/*
 * =========================================================
 * The Family Regiment
 * Production Traveler PDF
 * =========================================================
 *
 * This file converts a VendorProductionPackage into a
 * manufacturer-facing PDF traveler.
 *
 * IMPORTANT:
 *
 * The VendorProductionPackage remains the source of truth.
 * The PDF is only an export representation of that data.
 *
 * This keeps the future PDF, JSON manifest, artwork assets,
 * and ZIP package synchronized.
 */

const PAGE_WIDTH = 612;
const PAGE_HEIGHT = 792;

const MARGIN_X = 48;
const MARGIN_TOP = 52;
const MARGIN_BOTTOM = 48;

const CONTENT_WIDTH =
  PAGE_WIDTH - MARGIN_X * 2;

const COLORS = {
  ink: rgb(0.16, 0.14, 0.12),

  muted: rgb(0.42, 0.38, 0.33),

  accent: rgb(0.55, 0.33, 0.18),

  gold: rgb(0.65, 0.51, 0.31),

  rule: rgb(0.75, 0.69, 0.61),

  paper: rgb(0.96, 0.93, 0.87),

  panel: rgb(0.92, 0.88, 0.8),

  approved: rgb(0.25, 0.36, 0.23),

  pending: rgb(0.48, 0.43, 0.37),
};

type TravelerFonts = {
  regular: PDFFont;

  bold: PDFFont;

  serif: PDFFont;

  serifBold: PDFFont;
};

type TravelerContext = {
  pdf: PDFDocument;

  page: PDFPage;

  fonts: TravelerFonts;

  y: number;

  pageNumber: number;

  packageData: VendorProductionPackage;
};

/*
 * =========================================================
 * Public Builder
 * =========================================================
 */

export async function buildProductionTravelerPdf(
  packageData: VendorProductionPackage,
): Promise<Uint8Array> {
  const pdf =
    await PDFDocument.create();

  const fonts: TravelerFonts = {
    regular:
      await pdf.embedFont(
        StandardFonts.Helvetica,
      ),

    bold:
      await pdf.embedFont(
        StandardFonts.HelveticaBold,
      ),

    serif:
      await pdf.embedFont(
        StandardFonts.TimesRoman,
      ),

    serifBold:
      await pdf.embedFont(
        StandardFonts.TimesRomanBold,
      ),
  };

  const page =
    pdf.addPage([
      PAGE_WIDTH,
      PAGE_HEIGHT,
    ]);

  const context: TravelerContext = {
    pdf,

    page,

    fonts,

    y:
      PAGE_HEIGHT -
      MARGIN_TOP,

    pageNumber:
      1,

    packageData,
  };

  drawPageBackground(
    context.page,
  );

  drawDocumentHeader(
    context,
  );

  drawPackageIdentity(
    context,
  );

  drawArtworkReference(
    context,
  );

  drawApprovalSection(
    context,
  );

  drawPrimarySpecifications(
    context,
  );

  drawGarmentSection(
    context,
  );

  drawConstructionSection(
    context,
  );

  drawColorSection(
    context,
  );

  drawProductionNotes(
    context,
  );

  drawAuthorizationWarning(
    context,
  );

  addPageNumbers(
    pdf,
    fonts,
    packageData,
  );

  pdf.setTitle(
    `The Family Regiment - Production Traveler - ${packageData.packageId}`,
  );

  pdf.setSubject(
    "Manufacturer production traveler",
  );

  pdf.setAuthor(
    "The Family Regiment",
  );

  pdf.setCreator(
    "The Family Regiment Production System",
  );

  return pdf.save();
}

/*
 * =========================================================
 * Header
 * =========================================================
 */

function drawDocumentHeader(
  context: TravelerContext,
): void {
  ensureSpace(
    context,
    105,
  );

  drawText(
    context,
    "THE FAMILY REGIMENT",
    MARGIN_X,
    context.y,
    9,
    context.fonts.bold,
    COLORS.gold,
  );

  context.y -= 27;

  drawText(
    context,
    "Vendor Production Traveler",
    MARGIN_X,
    context.y,
    26,
    context.fonts.serif,
    COLORS.ink,
  );

  context.y -= 20;

  drawText(
    context,
    "Manufacturer review, sampling, and production control document",
    MARGIN_X,
    context.y,
    9,
    context.fonts.regular,
    COLORS.muted,
  );

  context.y -= 22;

  drawRule(
    context,
  );

  context.y -= 18;
}

/*
 * =========================================================
 * Package Identity
 * =========================================================
 */

function drawPackageIdentity(
  context: TravelerContext,
): void {
  ensureSpace(
    context,
    118,
  );

  drawSectionLabel(
    context,
    "MANUFACTURING PACKAGE",
  );

  context.y -= 20;

  drawText(
    context,
    "Family Crest Patch",
    MARGIN_X,
    context.y,
    21,
    context.fonts.serif,
    COLORS.ink,
  );

  context.y -= 25;

  const identityLine =
    `${context.packageData.packageId} · ` +
    `Production Spec ${context.packageData.productionSpecId} · ` +
    `Version ${context.packageData.productionSpecVersion}`;

  drawWrappedText(
    context,
    identityLine,
    MARGIN_X,
    context.y,
    CONTENT_WIDTH,
    8,
    12,
    context.fonts.regular,
    COLORS.muted,
  );

  context.y -= 18;

  drawStatusBlock(
    context,
    "PACKAGE STATUS",
    formatLabel(
      context.packageData.status,
    ),
  );

  context.y -= 22;

  drawRule(
    context,
  );

  context.y -= 20;
}

/*
 * =========================================================
 * Artwork
 * =========================================================
 */

function drawArtworkReference(
  context: TravelerContext,
): void {
  ensureSpace(
    context,
    150,
  );

  drawSectionHeading(
    context,
    "Artwork Reference",
  );

  context.y -= 18;

  const boxHeight =
    92;

  context.page.drawRectangle({
    x:
      MARGIN_X,

    y:
      context.y -
      boxHeight,

    width:
      CONTENT_WIDTH,

    height:
      boxHeight,

    borderColor:
      COLORS.rule,

    borderWidth:
      0.75,

    color:
      COLORS.panel,
  });

  const artwork =
    context.packageData.artwork;

  drawText(
    context,
    artwork.referenceLabel ??
      "Approved Family Regiment Crest Reference",
    MARGIN_X + 14,
    context.y - 21,
    10,
    context.fonts.bold,
    COLORS.ink,
  );

  drawText(
    context,
    `Artwork Version: ${artwork.artworkVersion}`,
    MARGIN_X + 14,
    context.y - 42,
    8,
    context.fonts.regular,
    COLORS.muted,
  );

  drawText(
    context,
    `Master Format: ${
      artwork.masterFormat?.toUpperCase() ??
      "Pending"
    }`,
    MARGIN_X + 14,
    context.y - 57,
    8,
    context.fonts.regular,
    COLORS.muted,
  );

  drawText(
    context,
    `Master Artwork: ${
      artwork.masterArtworkUrl
        ? "Attached"
        : "Pending"
    }`,
    MARGIN_X + 265,
    context.y - 42,
    8,
    context.fonts.regular,
    COLORS.muted,
  );

  drawText(
    context,
    `Reference Image: ${
      artwork.referenceImageUrl
        ? "Attached"
        : "Pending"
    }`,
    MARGIN_X + 265,
    context.y - 57,
    8,
    context.fonts.regular,
    COLORS.muted,
  );

  context.y -=
    boxHeight + 10;

  if (
    artwork.notes
  ) {
    const used =
      drawWrappedText(
        context,
        artwork.notes,
        MARGIN_X,
        context.y,
        CONTENT_WIDTH,
        8,
        12,
        context.fonts.regular,
        COLORS.muted,
      );

    context.y -=
      used + 10;
  }

  context.y -= 8;
}

/*
 * =========================================================
 * Approval
 * =========================================================
 */

function drawApprovalSection(
  context: TravelerContext,
): void {
  ensureSpace(
    context,
    185,
  );

  drawSectionHeading(
    context,
    "Production Approval",
  );

  context.y -= 17;

  drawText(
    context,
    `Current Stage: ${formatLabel(
      context.packageData.approval.currentStage,
    )}`,
    MARGIN_X,
    context.y,
    9,
    context.fonts.bold,
    COLORS.accent,
  );

  context.y -= 20;

  const stages = [
    "quote-review",
    "sample-required",
    "sample-approved",
    "production-authorized",
  ] as const;

  for (
    const [index, stage] of
      stages.entries()
  ) {
    const record =
      context.packageData.approval.records.find(
        (item) =>
          item.stage ===
          stage,
      );

    drawApprovalRow(
      context,
      index + 1,
      stage,
      record,
    );
  }

  context.y -= 12;

  drawRule(
    context,
  );

  context.y -= 20;
}

function drawApprovalRow(
  context: TravelerContext,
  stageNumber: number,
  stage: string,
  record:
    | VendorPackageApprovalRecord
    | undefined,
): void {
  const approved =
    record?.approved ??
    false;

  const current =
    context.packageData.approval.currentStage ===
    stage;

  const status =
    approved
      ? "APPROVED"
      : current
        ? "CURRENT"
        : "PENDING";

  const statusColor =
    approved
      ? COLORS.approved
      : current
        ? COLORS.accent
        : COLORS.pending;

  drawText(
    context,
    `STAGE ${stageNumber}`,
    MARGIN_X,
    context.y,
    7,
    context.fonts.bold,
    COLORS.gold,
  );

  drawText(
    context,
    formatLabel(
      stage,
    ),
    MARGIN_X + 68,
    context.y,
    9,
    context.fonts.bold,
    COLORS.ink,
  );

  drawText(
    context,
    status,
    PAGE_WIDTH -
      MARGIN_X -
      66,
    context.y,
    7,
    context.fonts.bold,
    statusColor,
  );

  context.y -= 14;

  const notes =
    record?.notes ??
    approvalStageDescription(
      stage,
    );

  const used =
    drawWrappedText(
      context,
      notes,
      MARGIN_X + 68,
      context.y,
      CONTENT_WIDTH - 68,
      7.5,
      10,
      context.fonts.regular,
      COLORS.muted,
    );

  context.y -=
    used + 8;
}

/*
 * =========================================================
 * Primary Specifications
 * =========================================================
 */

function drawPrimarySpecifications(
  context: TravelerContext,
): void {
  ensureSpace(
    context,
    150,
  );

  drawSectionHeading(
    context,
    "Primary Production Specifications",
  );

  context.y -= 22;

  drawKeyValue(
    context,
    "Finished Size",
    `${context.packageData.dimensions.widthInches}" × ${context.packageData.dimensions.heightInches}"`,
  );

  drawKeyValue(
    context,
    "Construction",
    context.packageData.construction,
  );

  drawKeyValue(
    context,
    "Sample Quantity",
    context.packageData.quantity.sampleQuantity.toString(),
  );

  drawKeyValue(
    context,
    "Production Quantity",
    context.packageData.quantity.productionQuantity.toString(),
  );

  drawKeyValue(
    context,
    "Requested Completion",
    context.packageData.requestedCompletionDate ??
      "To be confirmed",
  );

  context.y -= 8;

  drawRule(
    context,
  );

  context.y -= 20;
}

/*
 * =========================================================
 * Garment
 * =========================================================
 */

function drawGarmentSection(
  context: TravelerContext,
): void {
  ensureSpace(
    context,
    165,
  );

  drawSectionHeading(
    context,
    "Garment & Placement",
  );

  context.y -= 22;

  drawKeyValue(
    context,
    "Silhouette",
    context.packageData.garment.silhouette,
  );

  drawKeyValue(
    context,
    "Placement",
    context.packageData.garment.placement,
  );

  drawKeyValue(
    context,
    "Manufacturer",
    context.packageData.garment.manufacturer ??
      "Pending Vendor Selection",
  );

  drawKeyValue(
    context,
    "Style Number",
    context.packageData.garment.styleNumber ??
      "TBD",
  );

  drawKeyValue(
    context,
    "Garment Color",
    context.packageData.garment.color ??
      "Pending",
  );

  context.y -= 8;

  drawRule(
    context,
  );

  context.y -= 20;
}

/*
 * =========================================================
 * Construction
 * =========================================================
 */

function drawConstructionSection(
  context: TravelerContext,
): void {
  ensureSpace(
    context,
    150,
  );

  drawSectionHeading(
    context,
    "Construction & Finishing",
  );

  context.y -= 22;

  drawKeyValue(
    context,
    "Base Material",
    context.packageData.materials.baseMaterial,
  );

  drawKeyValue(
    context,
    "Embroidery Finish",
    context.packageData.materials.embroideryFinish,
  );

  drawKeyValue(
    context,
    "Border",
    context.packageData.materials.border,
  );

  drawKeyValue(
    context,
    "Backing",
    context.packageData.materials.backing,
  );

  context.y -= 8;

  drawRule(
    context,
  );

  context.y -= 20;
}

/*
 * =========================================================
 * Colors
 * =========================================================
 */

function drawColorSection(
  context: TravelerContext,
): void {
  ensureSpace(
    context,
    100,
  );

  drawSectionHeading(
    context,
    "Color References",
  );

  context.y -= 22;

  for (
    const color of
      context.packageData.materials.colors
  ) {
    ensureSpace(
      context,
      48,
    );

    drawText(
      context,
      color.role,
      MARGIN_X,
      context.y,
      8,
      context.fonts.bold,
      COLORS.ink,
    );

    drawText(
      context,
      color.hex ??
        "No digital reference",
      MARGIN_X + 150,
      context.y,
      8,
      context.fonts.regular,
      COLORS.muted,
    );

    const threadReference =
      color.threadSystem &&
      color.threadCode
        ? `${color.threadSystem}: ${color.threadCode}`
        : "Vendor thread match required";

    drawWrappedText(
      context,
      threadReference,
      MARGIN_X + 275,
      context.y,
      CONTENT_WIDTH - 275,
      7.5,
      10,
      context.fonts.regular,
      COLORS.muted,
    );

    context.y -= 22;
  }

  context.y -= 5;

  drawRule(
    context,
  );

  context.y -= 20;
}

/*
 * =========================================================
 * Production Notes
 * =========================================================
 */

function drawProductionNotes(
  context: TravelerContext,
): void {
  ensureSpace(
    context,
    110,
  );

  drawSectionHeading(
    context,
    "Production Notes",
  );

  context.y -= 20;

  const notes =
    context.packageData.productionNotes ??
    "No production notes recorded.";

  const lines =
    wrapText(
      notes,
      context.fonts.regular,
      8,
      CONTENT_WIDTH,
    );

  for (
    const line of lines
  ) {
    ensureSpace(
      context,
      16,
    );

    drawText(
      context,
      line,
      MARGIN_X,
      context.y,
      8,
      context.fonts.regular,
      COLORS.muted,
    );

    context.y -= 12;
  }

  context.y -= 12;
}

/*
 * =========================================================
 * Authorization Warning
 * =========================================================
 */

function drawAuthorizationWarning(
  context: TravelerContext,
): void {
  ensureSpace(
    context,
    105,
  );

  const isAuthorized =
    context.packageData.approval.records.some(
      (record) =>
        record.stage ===
          "production-authorized" &&
        record.approved,
    );

  context.page.drawRectangle({
    x:
      MARGIN_X,

    y:
      context.y - 62,

    width:
      CONTENT_WIDTH,

    height:
      62,

    borderColor:
      isAuthorized
        ? COLORS.approved
        : COLORS.accent,

    borderWidth:
      1,

    color:
      COLORS.paper,
  });

  drawText(
    context,
    isAuthorized
      ? "PRODUCTION AUTHORIZED"
      : "PRODUCTION NOT YET AUTHORIZED",
    MARGIN_X + 14,
    context.y - 21,
    9,
    context.fonts.bold,
    isAuthorized
      ? COLORS.approved
      : COLORS.accent,
  );

  const warning =
    isAuthorized
      ? "Recorded authorization permits manufacturing to proceed according to this production specification and its approved version."
      : "This traveler does not authorize bulk manufacturing. Physical sample approval and recorded production authorization are required before production.";

  drawWrappedText(
    context,
    warning,
    MARGIN_X + 14,
    context.y - 39,
    CONTENT_WIDTH - 28,
    7.5,
    10,
    context.fonts.regular,
    COLORS.muted,
  );

  context.y -= 78;
}

/*
 * =========================================================
 * Generic Drawing Helpers
 * =========================================================
 */

function drawSectionLabel(
  context: TravelerContext,
  text: string,
): void {
  drawText(
    context,
    text,
    MARGIN_X,
    context.y,
    7,
    context.fonts.bold,
    COLORS.accent,
  );
}

function drawSectionHeading(
  context: TravelerContext,
  text: string,
): void {
  drawText(
    context,
    text,
    MARGIN_X,
    context.y,
    14,
    context.fonts.serifBold,
    COLORS.ink,
  );
}

function drawKeyValue(
  context: TravelerContext,
  label: string,
  value: string,
): void {
  ensureSpace(
    context,
    28,
  );

  drawText(
    context,
    label,
    MARGIN_X,
    context.y,
    8,
    context.fonts.bold,
    COLORS.muted,
  );

  const used =
    drawWrappedText(
      context,
      value,
      MARGIN_X + 170,
      context.y,
      CONTENT_WIDTH - 170,
      8,
      11,
      context.fonts.regular,
      COLORS.ink,
    );

  context.y -=
    Math.max(
      22,
      used + 7,
    );
}

function drawStatusBlock(
  context: TravelerContext,
  label: string,
  value: string,
): void {
  drawText(
    context,
    label,
    MARGIN_X,
    context.y,
    7,
    context.fonts.bold,
    COLORS.gold,
  );

  drawText(
    context,
    value,
    MARGIN_X + 105,
    context.y,
    8,
    context.fonts.bold,
    COLORS.accent,
  );
}

function drawRule(
  context: TravelerContext,
): void {
  context.page.drawLine({
    start: {
      x:
        MARGIN_X,

      y:
        context.y,
    },

    end: {
      x:
        PAGE_WIDTH -
        MARGIN_X,

      y:
        context.y,
    },

    thickness:
      0.5,

    color:
      COLORS.rule,
  });
}

function drawText(
  context: TravelerContext,
  text: string,
  x: number,
  y: number,
  size: number,
  font: PDFFont,
  color = COLORS.ink,
): void {
  context.page.drawText(
    sanitizePdfText(
      text,
    ),
    {
      x,

      y,

      size,

      font,

      color,
    },
  );
}

function drawWrappedText(
  context: TravelerContext,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  fontSize: number,
  lineHeight: number,
  font: PDFFont,
  color = COLORS.ink,
): number {
  const lines =
    wrapText(
      sanitizePdfText(
        text,
      ),
      font,
      fontSize,
      maxWidth,
    );

  lines.forEach(
    (line, index) => {
      context.page.drawText(
        line,
        {
          x,

          y:
            y -
            index *
              lineHeight,

          size:
            fontSize,

          font,

          color,
        },
      );
    },
  );

  return Math.max(
    lineHeight,
    lines.length *
      lineHeight,
  );
}

/*
 * =========================================================
 * Pagination
 * =========================================================
 */

function ensureSpace(
  context: TravelerContext,
  requiredHeight: number,
): void {
  if (
    context.y -
      requiredHeight >=
    MARGIN_BOTTOM
  ) {
    return;
  }

  const page =
    context.pdf.addPage([
      PAGE_WIDTH,
      PAGE_HEIGHT,
    ]);

  context.page =
    page;

  context.pageNumber +=
    1;

  context.y =
    PAGE_HEIGHT -
    MARGIN_TOP;

  drawPageBackground(
    page,
  );

  drawContinuationHeader(
    context,
  );
}

function drawContinuationHeader(
  context: TravelerContext,
): void {
  drawText(
    context,
    "THE FAMILY REGIMENT",
    MARGIN_X,
    context.y,
    8,
    context.fonts.bold,
    COLORS.gold,
  );

  drawText(
    context,
    context.packageData.packageId,
    PAGE_WIDTH -
      MARGIN_X -
      110,
    context.y,
    8,
    context.fonts.regular,
    COLORS.muted,
  );

  context.y -= 18;

  drawRule(
    context,
  );

  context.y -= 22;
}

function drawPageBackground(
  page: PDFPage,
): void {
  page.drawRectangle({
    x:
      0,

    y:
      0,

    width:
      PAGE_WIDTH,

    height:
      PAGE_HEIGHT,

    color:
      COLORS.paper,
  });
}

function addPageNumbers(
  pdf: PDFDocument,
  fonts: TravelerFonts,
  packageData: VendorProductionPackage,
): void {
  const pages =
    pdf.getPages();

  pages.forEach(
    (page, index) => {
      const label =
        `${packageData.packageId} · ` +
        `Page ${index + 1} of ${pages.length}`;

      page.drawText(
        sanitizePdfText(
          label,
        ),
        {
          x:
            MARGIN_X,

          y:
            24,

          size:
            7,

          font:
            fonts.regular,

          color:
            COLORS.muted,
        },
      );

      page.drawText(
        "MANUFACTURER REVIEW DOCUMENT",
        {
          x:
            PAGE_WIDTH -
            MARGIN_X -
            155,

          y:
            24,

          size:
            6.5,

          font:
            fonts.bold,

          color:
            COLORS.gold,
        },
      );
    },
  );
}

/*
 * =========================================================
 * Text Utilities
 * =========================================================
 */

function wrapText(
  text: string,
  font: PDFFont,
  fontSize: number,
  maxWidth: number,
): string[] {
  const paragraphs =
    text.split(/\r?\n/);

  const lines: string[] =
    [];

  for (
    const paragraph of
      paragraphs
  ) {
    const words =
      paragraph
        .trim()
        .split(/\s+/)
        .filter(Boolean);

    if (
      words.length ===
      0
    ) {
      lines.push("");

      continue;
    }

    let currentLine =
      words[0];

    for (
      let index = 1;
      index <
      words.length;
      index += 1
    ) {
      const candidate =
        `${currentLine} ${words[index]}`;

      const candidateWidth =
        font.widthOfTextAtSize(
          candidate,
          fontSize,
        );

      if (
        candidateWidth <=
        maxWidth
      ) {
        currentLine =
          candidate;
      } else {
        lines.push(
          currentLine,
        );

        currentLine =
          words[index];
      }
    }

    lines.push(
      currentLine,
    );
  }

  return lines;
}

/*
 * pdf-lib StandardFonts use WinAnsi encoding.
 *
 * Manufacturing data can contain typographic punctuation
 * entered by browsers or copied from other systems.
 *
 * Normalize unsupported Unicode punctuation so document
 * generation does not fail unexpectedly.
 */

function sanitizePdfText(
  value: string,
): string {
  return value
    .replace(
      /[\u2018\u2019]/g,
      "'",
    )
    .replace(
      /[\u201C\u201D]/g,
      '"',
    )
    .replace(
      /\u2013/g,
      "-",
    )
    .replace(
      /\u2014/g,
      "-",
    )
    .replace(
      /\u2022/g,
      "-",
    )
    .replace(
      /\u00D7/g,
      "x",
    )
    .replace(
      /[^\x20-\x7E]/g,
      "",
    );
}

function formatLabel(
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
  switch (
    stage
  ) {
    case "quote-review":
      return "Manufacturer quote and production feasibility remain under review.";

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
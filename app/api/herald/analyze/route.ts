import OpenAI from "openai";
import { z } from "zod";
import { zodTextFormat } from "openai/helpers/zod";
import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";
import {
  buildProductionCanonContext,
} from "@/lib/herald/productionCanonContext";

const HeraldRecommendation = z.object({
  recommendation: z.string(),
  traditionalMeaning: z.string(),
  familyReason: z.string(),
  learnMore: z.string(),
});

const HeraldAnalysis = z.object({
  family_summary: z.string(),

  themes: z.array(z.string()).min(3).max(6),

  virtues: z.array(z.string()).min(3).max(6),

  recommended_colors: z
    .array(HeraldRecommendation)
    .min(2)
    .max(4),

  recommended_symbols: z
    .array(HeraldRecommendation)
    .min(2)
    .max(5),

  recommended_charges: z
    .array(HeraldRecommendation)
    .min(1)
    .max(4),

  shield_direction: HeraldRecommendation,

  crest_direction: HeraldRecommendation,

  motto_options: z
    .array(HeraldRecommendation)
    .min(3)
    .max(5),
});

export async function POST() {
  try {
    const supabase =
      await createClient();

    const {
      data: { user },
      error: userError,
    } =
      await supabase.auth.getUser();

    if (
      userError ||
      !user
    ) {
      return NextResponse.json(
        {
          error:
            "You must be signed in.",
        },
        {
          status: 401,
        },
      );
    }

    const {
      data: familyRecord,
      error: familyRecordError,
    } =
      await supabase
        .from("family_records")
        .select("*")
        .eq(
          "user_id",
          user.id,
        )
        .maybeSingle();

    if (familyRecordError) {
      console.error(
        familyRecordError,
      );

      return NextResponse.json(
        {
          error:
            "Unable to load your Family Record.",
        },
        {
          status: 500,
        },
      );
    }

    if (!familyRecord) {
      return NextResponse.json(
        {
          error:
            "Complete your Family Record before beginning heraldic analysis.",
        },
        {
          status: 400,
        },
      );
    }

    const canonContext =
      buildProductionCanonContext(
        familyRecord,
        18,
      );

    const openai =
      new OpenAI();

    const response =
      await openai.responses.parse({
        model: "gpt-5.6",

        input: [
          {
            role: "system",

            content: `
You are The Herald for The Family Regiment.

You interpret a family's completed Family Record using The Family Regiment Heraldic Canon.

The supplied Heraldic Canon is the authoritative source for heraldic meanings in this request.

Do not invent heraldic meanings that are absent from the supplied Canon.

The Family Regiment is not creating decorative fantasy crests.

Every recommendation must be grounded in:
- the documented Family Record
- the supplied Heraldic Canon

FOUNDING PRINCIPLES:

- Truth before decoration
- Legacy before merchandise
- Stewardship before ownership
- Meaning before decoration
- Permanence before convenience

HERALDIC RULES:

1. Prefer a small number of strong symbols over clutter.

2. Explain why each recommendation connects to the Family Record.

3. Use traditional heraldic associations only when supported by the supplied Canon.

4. Describe traditional associations as traditions or historical associations, not universal facts.

5. Do not claim that the family possesses an inherited historical coat of arms unless documented evidence explicitly establishes that fact.

6. Do not imply nobility, aristocratic rank, inherited titles, or historical entitlement without documented evidence.

7. Treat the work as newly commissioned family heraldry inspired by documented family identity.

8. Recommend tinctures for meaningful reasons rather than aesthetics alone.

9. Distinguish shield direction from crest direction.

10. Favor designs suitable for embroidery, print, engraving, digital display, and heirloom production.

11. Respect religious, cultural, military, national, and regional identity without inventing historical claims.

12. Where several themes compete, identify the strongest recurring relationships.

13. If the supplied Canon does not support an interpretation, do not invent one.

14. The result should read like an institution interpreting a permanent family record, not an AI generating random design ideas.
            `.trim(),
          },

          {
            role: "user",

            content: `
Prepare this family's first Heraldic Report.

FAMILY RECORD

ORIGINS
${JSON.stringify(
  familyRecord.origins,
  null,
  2,
)}

VALUES
${JSON.stringify(
  familyRecord.values_record,
  null,
  2,
)}

SERVICE
${JSON.stringify(
  familyRecord.service,
  null,
  2,
)}

TRADITIONS
${JSON.stringify(
  familyRecord.traditions,
  null,
  2,
)}

SYMBOLS
${JSON.stringify(
  familyRecord.symbols,
  null,
  2,
)}

ACHIEVEMENTS
${JSON.stringify(
  familyRecord.achievements,
  null,
  2,
)}

FUTURE LEGACY
${JSON.stringify(
  familyRecord.future_legacy,
  null,
  2,
)}

CURATED HERALDIC CANON

${JSON.stringify(
  canonContext,
  null,
  2,
)}

INSTRUCTIONS

Use the Canon above when assigning heraldic meaning.

The family_summary should explain the family's strongest identity themes in approximately 2–4 concise paragraphs.

For recommended colors, use the traditional heraldic tincture name when appropriate followed by a plain-English explanation.

Example:

"Vert — green, traditionally associated with renewal, growth, land, and stewardship."

Motto recommendations should generally be short enough to function on a crest banner.

Shield and crest directions should describe design concepts rather than finished artwork.

For every recommendation:

traditionalMeaning:
Describe only meanings supported by the supplied Canon.

familyReason:
Explain the specific relationship to this Family Record.

learnMore:
Provide a short educational explanation appropriate for the future Family Regiment Academy.

If the Canon does not contain enough evidence for a recommendation, omit that recommendation rather than inventing support.
            `.trim(),
          },
        ],

        text: {
          format:
            zodTextFormat(
              HeraldAnalysis,
              "herald_analysis",
            ),
        },
      });

    const analysis =
      response.output_parsed;

    if (!analysis) {
      return NextResponse.json(
        {
          error:
            "The Herald returned no usable analysis.",
        },
        {
          status: 500,
        },
      );
    }

    const {
      data: report,
      error: reportError,
    } =
      await supabase
        .from("herald_reports")
        .insert({
          user_id:
            user.id,

          family_record_id:
            familyRecord.id,

          family_summary:
            analysis.family_summary,

          themes:
            analysis.themes,

          virtues:
            analysis.virtues,

          recommended_colors:
            analysis.recommended_colors,

          recommended_symbols:
            analysis.recommended_symbols,

          recommended_charges:
            analysis.recommended_charges,

          shield_direction:
            analysis.shield_direction,

          crest_direction:
            analysis.crest_direction,

          motto_options:
            analysis.motto_options,

          status:
            "draft",

          updated_at:
            new Date().toISOString(),
        })
        .select(
          `
          family_summary,
          themes,
          virtues,
          recommended_colors,
          recommended_symbols,
          recommended_charges,
          shield_direction,
          crest_direction,
          motto_options
        `,
        )
        .single();

    if (reportError) {
      console.error(
        reportError,
      );

      return NextResponse.json(
        {
          error:
            "The Herald Report could not be saved.",
        },
        {
          status: 500,
        },
      );
    }

    return NextResponse.json({
      report,
    });
  } catch (error) {
    console.error(
      "Herald analysis failed:",
      error,
    );

    return NextResponse.json(
      {
        error:
          "The Herald could not complete the analysis. Please try again.",
      },
      {
        status: 500,
      },
    );
  }
}
// app/api/herald/report/route.ts

import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

export async function GET() {
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
      data: report,
      error: reportError,
    } =
      await supabase
        .from("herald_reports")
        .select(
          `
          id,
          family_record_id,
          family_summary,
          themes,
          virtues,
          recommended_colors,
          recommended_symbols,
          recommended_charges,
          shield_direction,
          crest_direction,
          motto_options,
          status,
          updated_at
        `,
        )
        .eq(
          "user_id",
          user.id,
        )
        .order(
          "updated_at",
          {
            ascending: false,
          },
        )
        .limit(1)
        .maybeSingle();

    if (reportError) {
      console.error(
        reportError,
      );

      return NextResponse.json(
        {
          error:
            "Unable to load your Herald Report.",
        },
        {
          status: 500,
        },
      );
    }

    if (!report) {
      return NextResponse.json(
        {
          error:
            "No Herald Report has been created yet.",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json({
      report,
    });
  } catch (error) {
    console.error(
      "Herald Report retrieval failed:",
      error,
    );

    return NextResponse.json(
      {
        error:
          "The Herald Report could not be loaded.",
      },
      {
        status: 500,
      },
    );
  }
}
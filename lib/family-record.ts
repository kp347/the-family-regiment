import { createClient } from "@/lib/supabase/client";

export type FamilyRecordArticle =
  | "origins"
  | "values_record"
  | "service"
  | "traditions"
  | "symbols"
  | "achievements"
  | "future_legacy";

export async function getFamilyRecord() {
  const supabase = createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("You must be signed in.");
  }

  const { data, error } = await supabase
    .from("family_records")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}

export async function saveFamilyRecordArticle(
  article: FamilyRecordArticle,
  values: Record<string, string>,
  currentArticle: string,
  completionPercent: number
) {
  const supabase = createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("You must be signed in.");
  }

  const payload = {
    user_id: user.id,
    [article]: values,
    current_article: currentArticle,
    completion_percent: completionPercent,
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase
    .from("family_records")
    .upsert(payload, {
      onConflict: "user_id",
    });

  if (error) {
    throw error;
  }
}
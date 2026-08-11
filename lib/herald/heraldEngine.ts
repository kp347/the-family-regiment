// lib/herald/heraldEngine.ts

import type {
  FamilyInterview,
} from "./types";

import type {
  Motto,
} from "./motto";

import {
  buildFamilyRecord,
} from "./familyRecord";

import {
  recommendCanonEntries,
} from "./recommendationEngine";

import {
  buildHeraldAIContext,
} from "./aiContextBuilder";

import {
  buildHeraldReport,
} from "./heraldReport";

import {
  buildCrestPrompt,
} from "./promptBuilder";

export interface HeraldEngineResult {
  familyRecord: ReturnType<
    typeof buildFamilyRecord
  >;

  recommendations: ReturnType<
    typeof recommendCanonEntries
  >;

  aiContext: ReturnType<
    typeof buildHeraldAIContext
  >;

  report: ReturnType<
    typeof buildHeraldReport
  >;

  prompt: ReturnType<
    typeof buildCrestPrompt
  >;
}

export function runHeraldEngine(
  interview: FamilyInterview,
  motto: Motto,
): HeraldEngineResult {
  const familyRecord =
    buildFamilyRecord(
      interview,
    );

  const recommendations =
    recommendCanonEntries(
      familyRecord,
    );

  const aiContext =
    buildHeraldAIContext(
      familyRecord,
      recommendations,
      12,
    );

  const report =
    buildHeraldReport(
      familyRecord,
      recommendations,
    );

  const prompt =
    buildCrestPrompt(
      interview,
      motto,
    );

  return {
    familyRecord,
    recommendations,
    aiContext,
    report,
    prompt,
  };
}
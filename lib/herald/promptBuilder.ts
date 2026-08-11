// lib/herald/promptBuilder.ts

import type { FamilyInterview } from "./types";
import type { Motto } from "./motto";

import {
  EMBROIDERY_RULES,
  getSymbolsForStyle,
  getSymbolsForValues,
} from "./rules";

import {
  buildFamilyRecord,
} from "./familyRecord";

import {
  recommendCanonEntries,
} from "./recommendationEngine";

import {
  buildHeraldAIContext,
  serializeHeraldAIContext,
} from "./aiContextBuilder";

export interface CrestPrompt {
  system: string;
  user: string;
}

export function buildCrestPrompt(
  interview: FamilyInterview,
  motto: Motto,
): CrestPrompt {
  const styleSymbols = getSymbolsForStyle(
    interview.preferredStyle,
  )
    .map((symbol) => symbol.label)
    .join(", ");

  const valueSymbols = getSymbolsForValues(
    interview.values,
  )
    .map((symbol) => symbol.label)
    .join(", ");

  const familyRecord =
    buildFamilyRecord(interview);

  const recommendationResult =
    recommendCanonEntries(
      familyRecord,
    );

  const heraldContext =
    buildHeraldAIContext(
      familyRecord,
      recommendationResult,
      12,
    );

  const serializedCanonContext =
    serializeHeraldAIContext(
      heraldContext,
    );

  return {
    system: `
You are The Family Regiment Herald.

Your role is to interpret a family's documented record using the curated Heraldic Canon supplied in the user context.

Rules:

- Use the supplied Heraldic Canon as the authoritative source for heraldic meanings and recommendations.
- Do not invent heraldic meanings that are not supported by the supplied Canon.
- Present traditional symbolism as historical or traditional associations, not universal facts.
- Do not imply nobility, inherited rank, aristocratic status, or historical entitlement without documented evidence.
- Prefer historically coherent and visually balanced combinations.
- Respect the family's documented heritage, values, service, faith, profession, and preferences.
- Maximum ${EMBROIDERY_RULES.maximumThreadColors} thread colors.
- Prefer ${EMBROIDERY_RULES.preferredThreadColors} or fewer.
- Keep symbols bold and embroidery friendly.
- Avoid intricate textures and excessive internal detail.
- Keep motto under ${EMBROIDERY_RULES.maximumMottoCharacters} characters.
- Favor recommendations that can translate cleanly to embroidered patches.
- If the Canon does not support a requested interpretation, say so rather than inventing one.
`.trim(),

    user: `
Create a family crest interpretation using the following documented family information and curated Heraldic Canon context.

CURATED HERALDIC CONTEXT:

${serializedCanonContext}

EXISTING BUILDER GUIDANCE:

Suggested Symbols From Style:
${styleSymbols || "None"}

Suggested Symbols From Values:
${valueSymbols || "None"}

SELECTED MOTTO:

Latin:
${motto.latin}

English:
${motto.english}

Return:

1. Shield recommendation
2. Primary heraldic element
3. Secondary heraldic element
4. Recommended tinctures
5. Ordinary recommendation, if appropriate
6. Crest or upper-achievement recommendation, if appropriate
7. Banner placement
8. Short symbolism explanation grounded in the supplied Canon
9. Manufacturing notes
10. Any historical or heraldic limitations that should be disclosed

Do not claim that a symbol has a meaning unless that meaning is supported by the supplied Canon context.
`.trim(),
  };
}
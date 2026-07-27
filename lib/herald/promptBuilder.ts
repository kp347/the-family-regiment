// lib/herald/promptBuilder.ts

import type { FamilyInterview } from "./types";
import type { Motto } from "./motto";

import {
  EMBROIDERY_RULES,
  getSymbolsForStyle,
  getSymbolsForValues,
} from "./rules";

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

  const heritage =
    interview.heritage.length > 0
      ? interview.heritage.join(", ")
      : "Not specified";

  return {
    system: `
You are an expert heraldic designer and embroidery production specialist.

Your task is to design authentic family crests that are historically inspired,
visually balanced, and manufacturable as embroidered patches.

Rules:

• Maximum ${EMBROIDERY_RULES.maximumThreadColors} thread colors
• Prefer ${EMBROIDERY_RULES.preferredThreadColors} or fewer
• Keep symbols bold and embroidery friendly
• Avoid intricate textures
• Keep motto under ${EMBROIDERY_RULES.maximumMottoCharacters} characters
• Use heraldic symbolism whenever possible
• Design should look premium and timeless
`.trim(),

    user: `
Create a family crest using these details.

Family Name:
${interview.familyName}

Heritage:
${heritage}

Military Service:
${interview.militaryService || "None"}

Profession:
${interview.profession || "Not specified"}

Core Values:
${interview.values.join(", ")}

Faith:
${interview.faith || "Not specified"}

Zodiac:
${interview.zodiac || "Not specified"}

Favorite Animal:
${interview.favoriteAnimal || "Not specified"}

Preferred Style:
${interview.preferredStyle}

Suggested Symbols From Style:
${styleSymbols || "None"}

Suggested Symbols From Values:
${valueSymbols || "None"}

Preferred Motto:

Latin:
${motto.latin}

English:
${motto.english}

Return:

1. Shield recommendation
2. Primary symbol
3. Secondary symbol
4. Heraldic colors
5. Crown recommendation
6. Banner placement
7. Short symbolism explanation
8. Manufacturing notes
`.trim(),
  };
}
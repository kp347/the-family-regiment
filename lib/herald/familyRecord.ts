// lib/herald/familyRecord.ts

import type { FamilyInterview } from "./types";

export interface FamilyRecord {
  familyName: string;

  heritage: string[];

  virtues: string[];

  militaryService: string[];

  professions: string[];

  faith?: string;

  zodiac?: string;

  favoriteAnimal?: string;

  preferredStyle: string;
}

function cleanArray(
  values: (string | undefined)[],
): string[] {
  return Array.from(
    new Set(
      values
        .filter(
          (value): value is string =>
            Boolean(value?.trim()),
        )
        .map((value) => value.trim()),
    ),
  );
}

export function buildFamilyRecord(
  interview: FamilyInterview,
): FamilyRecord {
  return {
    familyName:
      interview.familyName.trim(),

    heritage: cleanArray(
      interview.heritage,
    ),

    virtues: cleanArray(
      interview.values,
    ),

    militaryService: cleanArray([
      interview.militaryService,
    ]),

    professions: cleanArray([
      interview.profession,
    ]),

    faith: interview.faith?.trim(),

    zodiac: interview.zodiac?.trim(),

    favoriteAnimal:
      interview.favoriteAnimal?.trim(),

    preferredStyle:
      interview.preferredStyle,
  };
}
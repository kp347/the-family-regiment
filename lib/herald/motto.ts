// lib/herald/motto.ts

export interface Motto {
  latin: string;
  english: string;
  values: string[];
}

export const MOTTO_LIBRARY: Motto[] = [
  {
    latin: "Virtus Per Familiam",
    english: "Strength Through Family",
    values: ["family", "strength", "legacy"],
  },
  {
    latin: "Honor Supra Omnia",
    english: "Honor Above All",
    values: ["honor", "service", "integrity"],
  },
  {
    latin: "Fortes Fortuna Adiuvat",
    english: "Fortune Favors the Bold",
    values: ["courage", "leadership", "bravery"],
  },
  {
    latin: "Semper Fidelis",
    english: "Always Faithful",
    values: ["loyalty", "faith", "service"],
  },
  {
    latin: "Lux In Tenebris",
    english: "Light in Darkness",
    values: ["hope", "guidance", "faith"],
  },
  {
    latin: "Perseverantia Vincit",
    english: "Perseverance Conquers",
    values: ["perseverance", "endurance", "resilience"],
  },
  {
    latin: "Ex Unitate Vis",
    english: "From Unity Comes Strength",
    values: ["family", "unity", "strength"],
  },
  {
    latin: "Fide et Fortitudine",
    english: "With Faith and Courage",
    values: ["faith", "courage", "service"],
  },
];

export function findBestMotto(values: string[]): Motto {
  const normalized = values.map((v) => v.toLowerCase());

  let best = MOTTO_LIBRARY[0];
  let bestScore = -1;

  for (const motto of MOTTO_LIBRARY) {
    const score = motto.values.filter((value) =>
      normalized.includes(value.toLowerCase()),
    ).length;

    if (score > bestScore) {
      best = motto;
      bestScore = score;
    }
  }

  return best;
}

export function getRandomMotto(): Motto {
  return MOTTO_LIBRARY[
    Math.floor(Math.random() * MOTTO_LIBRARY.length)
  ];
}
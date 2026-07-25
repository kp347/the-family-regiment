export type HeritageInterviewInput = {
  familyName: string;
  familyStory: string;

  heritageLocations: string[];
  occupations: string[];

  familyValues: string[];

  stylePreference: string;

  preferredSymbols: string[];
  preferredColors: string[];
};

export type HeraldicSymbol = {
  name: string;
  role: "primary" | "secondary" | "supporting";
  meaning: string;
};

export type HeraldicColor = {
  name: string;
  hex: string;
  meaning: string;
};

export type HeritageProfile = {
  familyName: string;

  profileSummary: string;

  heritageThemes: string[];

  familyValues: string[];

  recommendedStyle: string;

  shieldStyle: string;

  symbols: HeraldicSymbol[];

  colors: HeraldicColor[];

  motto: {
    latin: string;
    english: string;
    reasoning: string;
  };

  composition: {
    centralElement: string;
    upperSection: string;
    sideElements: string;
    lowerBanner: string;
  };

  embroideryRules: {
    maximumThreadColors: number;
    minimumOutlineWeight: string;
    prohibitedDetails: string[];
    productionNotes: string[];
  };

  imagePrompt: string;
};
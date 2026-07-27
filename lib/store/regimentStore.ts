// lib/store/regimentStore.ts

import { create } from "zustand";
import { persist } from "zustand/middleware";

import type {
  CrestSpec,
  FamilyInterview,
  PatchSettings,
  RegimentProject,
  ValidationResult,
} from "../herald/types";

const defaultFamily: FamilyInterview = {
  familyName: "",
  heritage: [],
  militaryService: "",
  profession: "",
  values: [],
  faith: "",
  zodiac: "",
  favoriteAnimal: "",
  preferredStyle: "traditional",
};

const defaultCrest: CrestSpec = {
  shield: "heater",
  primarySymbol: "lion",
  secondarySymbol: undefined,
  crown: false,
  supporters: [],
  bannerTop: "",
  bannerBottom: "",
  colors: ["gold", "black", "red"],
  mottoLatin: "Virtus Per Familiam",
  mottoEnglish: "Strength Through Family",
  embroideryFinish: "regiment-gold",
};

const defaultPatch: PatchSettings = {
  shape: "heater",
  border: "merrow",
  backing: "sew-on",
  size: 4,
};

const defaultValidation: ValidationResult = {
  valid: true,
  stitchCount: 0,
  threadColors: defaultCrest.colors.length,
  issues: [],
};

export const defaultRegimentProject: RegimentProject = {
  family: defaultFamily,
  crest: defaultCrest,
  patch: defaultPatch,
  validation: defaultValidation,
};

interface RegimentStore {
  project: RegimentProject;
  lastSavedAt: string | null;

  updateFamily: (updates: Partial<FamilyInterview>) => void;
  updateCrest: (updates: Partial<CrestSpec>) => void;
  updatePatch: (updates: Partial<PatchSettings>) => void;
  setValidation: (validation: ValidationResult) => void;

  replaceProject: (project: RegimentProject) => void;
  resetProject: () => void;
}

function createFreshProject(): RegimentProject {
  return {
    family: {
      ...defaultRegimentProject.family,
      heritage: [...defaultRegimentProject.family.heritage],
      values: [...defaultRegimentProject.family.values],
    },

    crest: {
      ...defaultRegimentProject.crest,
      supporters: [
        ...(defaultRegimentProject.crest.supporters ?? []),
      ],
      colors: [...defaultRegimentProject.crest.colors],
    },

    patch: {
      ...defaultRegimentProject.patch,
    },

    validation: {
      ...defaultRegimentProject.validation,
      issues: [...defaultRegimentProject.validation.issues],
    },
  };
}

function getSaveTimestamp(): string {
  return new Date().toISOString();
}

export const useRegimentStore = create<RegimentStore>()(
  persist(
    (set) => ({
      project: createFreshProject(),
      lastSavedAt: null,

      updateFamily: (updates) =>
        set((state) => ({
          project: {
            ...state.project,
            family: {
              ...state.project.family,
              ...updates,
            },
          },
          lastSavedAt: getSaveTimestamp(),
        })),

      updateCrest: (updates) =>
        set((state) => ({
          project: {
            ...state.project,
            crest: {
              ...state.project.crest,
              ...updates,
            },
          },
          lastSavedAt: getSaveTimestamp(),
        })),

      updatePatch: (updates) =>
        set((state) => ({
          project: {
            ...state.project,
            patch: {
              ...state.project.patch,
              ...updates,
            },
          },
          lastSavedAt: getSaveTimestamp(),
        })),

      setValidation: (validation) =>
        set((state) => ({
          project: {
            ...state.project,
            validation,
          },
          lastSavedAt: getSaveTimestamp(),
        })),

      replaceProject: (project) =>
        set({
          project,
          lastSavedAt: getSaveTimestamp(),
        }),

      resetProject: () =>
        set({
          project: createFreshProject(),
          lastSavedAt: null,
        }),
    }),
    {
      name: "the-family-regiment-project",
      version: 1,
      partialize: (state) => ({
        project: state.project,
        lastSavedAt: state.lastSavedAt,
      }),
    },
  ),
);
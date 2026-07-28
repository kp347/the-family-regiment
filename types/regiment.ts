export interface RegimentProfile {
  familyName: string;
  heritage: string[];
  values: string[];
  animal: string;
  profession: string;
  militaryService: string;
  primaryColor: string;
  secondaryColor: string;
  motto: string;
  legacy: string;
}

export const emptyRegimentProfile: RegimentProfile = {
  familyName: "",
  heritage: [],
  values: [],
  animal: "",
  profession: "",
  militaryService: "",
  primaryColor: "",
  secondaryColor: "",
  motto: "",
  legacy: "",
};
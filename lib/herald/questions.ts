import type { RegimentProfile } from "@/types/regiment";

export type HeraldQuestion = {
  id: keyof RegimentProfile;
  title: string;
  description?: string;
  type: "text" | "textarea" | "single" | "multi";
  placeholder?: string;
  optional?: boolean;
  maxSelections?: number;
  options?: string[];
};

export const heraldQuestions: HeraldQuestion[] = [
  {
    id: "familyName",
    title: "What family name will your Regiment carry?",
    description:
      "This name will appear on your regimental charter, crest, and jacket.",
    type: "text",
    placeholder: "Enter your family name",
  },
  {
    id: "heritage",
    title: "What nations shaped your family?",
    description: "Choose every country that forms part of your family story.",
    type: "multi",
    options: [
      "United States",
      "France",
      "Mexico",
      "Canada",
      "England",
      "Scotland",
      "Ireland",
      "Germany",
      "Italy",
      "Spain",
      "Nigeria",
      "Ghana",
      "Jamaica",
      "Haiti",
      "Puerto Rico",
      "Dominican Republic",
    ],
  },
  {
    id: "values",
    title: "Which virtues define your family?",
    description: "Choose up to three values for future generations to inherit.",
    type: "multi",
    maxSelections: 3,
    options: [
      "Honor",
      "Courage",
      "Faith",
      "Duty",
      "Service",
      "Loyalty",
      "Compassion",
      "Wisdom",
      "Resilience",
      "Liberty",
      "Discipline",
      "Unity",
    ],
  },
  {
    id: "animal",
    title: "Which creature best represents your family?",
    description:
      "The Herald may use this creature as the central symbol of your crest.",
    type: "single",
    options: [
      "Lion",
      "Eagle",
      "Wolf",
      "Bear",
      "Stag",
      "Horse",
      "Falcon",
      "Dragon",
    ],
  },
  {
    id: "profession",
    title: "What calling best represents your family?",
    description:
      "This may be a profession, trade, craft, or tradition shared across generations.",
    type: "text",
    placeholder: "For example: military service, teaching, medicine, construction",
  },
  {
    id: "militaryService",
    title: "Has your family served?",
    description:
      "Include military units, public service, first responders, or community service.",
    type: "text",
    placeholder: "For example: 101st Airborne Division",
    optional: true,
  },
  {
    id: "primaryColor",
    title: "Choose your primary regimental color.",
    description: "This will become the dominant color within your crest.",
    type: "single",
    options: [
      "Regimental Gold",
      "Heritage Navy",
      "Field Olive",
      "Crimson",
      "Royal Purple",
      "Black",
      "Ivory",
      "Forest Green",
    ],
  },
  {
    id: "secondaryColor",
    title: "Choose your secondary regimental color.",
    description:
      "This color will support the primary color in your crest and patches.",
    type: "single",
    options: [
      "Regimental Gold",
      "Heritage Navy",
      "Field Olive",
      "Crimson",
      "Royal Purple",
      "Black",
      "Ivory",
      "Forest Green",
    ],
  },
  {
    id: "motto",
    title: "Does your family already have a motto?",
    description:
      "You may enter it now, or leave this blank and allow the Herald to create one later.",
    type: "text",
    placeholder: "Enter a phrase or family saying",
    optional: true,
  },
  {
    id: "legacy",
    title: "What should future generations never forget?",
    description:
      "Write the belief, lesson, or responsibility you want your descendants to carry forward.",
    type: "textarea",
    placeholder: "Leave every generation stronger than you found it.",
  },
];
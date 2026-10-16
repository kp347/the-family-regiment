export type ZodiacCanonId =
  | "aries"
  | "taurus"
  | "gemini"
  | "cancer"
  | "leo"
  | "virgo"
  | "libra"
  | "scorpio"
  | "sagittarius"
  | "capricorn"
  | "aquarius"
  | "pisces";

export type ZodiacCanonStatus =
  | "prototype"
  | "approved"
  | "production";

export type ZodiacCanonAsset = {
  id: ZodiacCanonId;
  label: string;
  src: string;
  previewScale: number;
  status: ZodiacCanonStatus;
};

export const zodiacCanonAssets: ZodiacCanonAsset[] = [
  {
    id: "aries",
    label: "Aries",
    src: "/canon/zodiac/aries.svg",
    previewScale: 0.82,
    status: "prototype",
  },
  {
    id: "taurus",
    label: "Taurus",
    src: "/canon/zodiac/taurus.svg",
    previewScale: 0.82,
    status: "prototype",
  },
  {
    id: "gemini",
    label: "Gemini",
    src: "/canon/zodiac/gemini.svg",
    previewScale: 0.82,
    status: "prototype",
  },
  {
    id: "cancer",
    label: "Cancer",
    src: "/canon/zodiac/cancer.svg",
    previewScale: 0.82,
    status: "prototype",
  },
  {
    id: "leo",
    label: "Leo",
    src: "/canon/zodiac/leo.svg",
    previewScale: 0.82,
    status: "prototype",
  },
  {
    id: "virgo",
    label: "Virgo",
    src: "/canon/zodiac/virgo.svg",
    previewScale: 0.82,
    status: "prototype",
  },
  {
    id: "libra",
    label: "Libra",
    src: "/canon/zodiac/libra.svg",
    previewScale: 0.82,
    status: "prototype",
  },
  {
    id: "scorpio",
    label: "Scorpio",
    src: "/canon/zodiac/scorpio.svg",
    previewScale: 0.82,
    status: "prototype",
  },
  {
    id: "sagittarius",
    label: "Sagittarius",
    src: "/canon/zodiac/sagittarius.svg",
    previewScale: 0.82,
    status: "prototype",
  },
  {
    id: "capricorn",
    label: "Capricorn",
    src: "/canon/zodiac/capricorn.svg",
    previewScale: 0.82,
    status: "prototype",
  },
  {
    id: "aquarius",
    label: "Aquarius",
    src: "/canon/zodiac/aquarius.svg",
    previewScale: 0.82,
    status: "prototype",
  },
  {
    id: "pisces",
    label: "Pisces",
    src: "/canon/zodiac/pisces.svg",
    previewScale: 0.82,
    status: "prototype",
  },
];

export function getZodiacCanonAsset(
  zodiacSign: string,
): ZodiacCanonAsset | undefined {
  return zodiacCanonAssets.find(
    (asset) => asset.label === zodiacSign,
  );
}
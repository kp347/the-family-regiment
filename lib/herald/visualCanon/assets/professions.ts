
/**
 * The Family Regiment
 * Professional Identity Visual Canon V1
 *
 * Approved embroidered-style PNG artwork.
 * Files live in public/canon/professions/
 */

export const professionCanonAssets = {
  Medical: {
    label: "Medical",
    artworkSrc: "/canon/professions/medical.png",
  },
  Nursing: {
    label: "Nursing",
    artworkSrc: "/canon/professions/nursing.png",
  },
  Law: {
    label: "Law",
    artworkSrc: "/canon/professions/law.png",
  },
  Education: {
    label: "Education",
    artworkSrc: "/canon/professions/education.png",
  },
  Engineering: {
    label: "Engineering",
    artworkSrc: "/canon/professions/engineering.png",
  },
  Firefighting: {
    label: "Firefighting",
    artworkSrc: "/canon/professions/firefighting.png",
  },
  "Law Enforcement": {
    label: "Law Enforcement",
    artworkSrc: "/canon/professions/law-enforcement.png",
  },
  Aviation: {
    label: "Aviation",
    artworkSrc: "/canon/professions/aviation.png",
  },
  "Skilled Trades": {
    label: "Skilled Trades",
    artworkSrc: "/canon/professions/skilled-trades.png",
  },
  Architecture: {
    label: "Architecture",
    artworkSrc: "/canon/professions/architecture.png",
  },
  "Culinary Arts": {
    label: "Culinary Arts",
    artworkSrc: "/canon/professions/culinary-arts.png",
  },
  Technology: {
    label: "Technology",
    artworkSrc: "/canon/professions/technology.png",
  },
} as const;

export function getProfessionCanonAsset(label: string) {
  return Object.prototype.hasOwnProperty.call(
    professionCanonAssets,
    label
  )
    ? professionCanonAssets[
        label as keyof typeof professionCanonAssets
      ]
    : undefined;
}

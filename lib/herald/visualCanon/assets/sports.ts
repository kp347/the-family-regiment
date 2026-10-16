export type SportCanonId =
  | "american-football"
  | "association-football"
  | "baseball"
  | "basketball"
  | "hockey"
  | "tennis"
  | "golf"
  | "running"
  | "boxing"
  | "martial-arts"
  | "swimming";

export type SportCanonStatus =
  | "prototype"
  | "approved"
  | "production";

export type SportCanonAsset = {
  id: SportCanonId;

  label:
    | "American Football"
    | "Football (Soccer)"
    | "Baseball"
    | "Basketball"
    | "Hockey"
    | "Tennis"
    | "Golf"
    | "Running"
    | "Boxing"
    | "Martial Arts"
    | "Swimming";

  shortLabel: string;

  artworkSrc: string;

  /**
   * Presentation-only optical correction.
   *
   * This allows differently proportioned Canon SVG masters
   * to occupy the same jacket patch envelope without
   * changing the locked jacket coordinates or modifying
   * the SVG masters themselves.
   */
  previewScale: number;

  productionSrc?: string;

  status: SportCanonStatus;

  productionNotes: string;
};

export const sportCanonAssets: SportCanonAsset[] = [
  {
    id: "american-football",
    label: "American Football",
    shortLabel: "AMERICAN FOOTBALL",
    artworkSrc:
      "/canon/sports/american-football.svg",
    previewScale: 0.82,
    status: "prototype",
    productionNotes:
      "Generic American football identity artwork. Preserve the primary football silhouette and major internal details during embroidery reduction.",
  },
  {
    id: "association-football",
    label: "Football (Soccer)",
    shortLabel: "FOOTBALL",
    artworkSrc:
      "/canon/sports/association-football.svg",
    previewScale: 0.82,
    status: "prototype",
    productionNotes:
      "Generic association football identity artwork. Preserve the recognizable ball silhouette and primary panel structure during embroidery reduction.",
  },
  {
    id: "baseball",
    label: "Baseball",
    shortLabel: "BASEBALL",
    artworkSrc:
      "/canon/sports/baseball.svg",
    previewScale: 0.82,
    status: "prototype",
    productionNotes:
      "Generic baseball identity artwork. Preserve the circular ball silhouette and primary seam treatment during embroidery reduction.",
  },
  {
    id: "basketball",
    label: "Basketball",
    shortLabel: "BASKETBALL",
    artworkSrc:
      "/canon/sports/basketball.svg",
    previewScale: 0.82,
    status: "prototype",
    productionNotes:
      "Generic basketball identity artwork. Preserve the ball silhouette and major channel lines during embroidery reduction.",
  },
  {
    id: "hockey",
    label: "Hockey",
    shortLabel: "HOCKEY",
    artworkSrc:
      "/canon/sports/hockey.svg",
    previewScale: 0.82,
    status: "prototype",
    productionNotes:
      "Generic hockey identity artwork. Preserve the primary stick and puck forms during embroidery reduction.",
  },
  {
    id: "tennis",
    label: "Tennis",
    shortLabel: "TENNIS",
    artworkSrc:
      "/canon/sports/tennis.svg",
    previewScale: 0.82,
    status: "prototype",
    productionNotes:
      "Generic tennis identity artwork. Preserve the racket and ball relationship while simplifying fine string detail as required for embroidery.",
  },
  {
    id: "golf",
    label: "Golf",
    shortLabel: "GOLF",
    artworkSrc:
      "/canon/sports/golf.svg",
    previewScale: 0.82,
    status: "prototype",
    productionNotes:
      "Generic golf identity artwork. Preserve the primary golf symbol and major silhouette during embroidery reduction.",
  },
  {
    id: "running",
    label: "Running",
    shortLabel: "RUNNING",
    artworkSrc:
      "/canon/sports/running.svg",
    previewScale: 0.82,
    status: "prototype",
    productionNotes:
      "Generic running identity artwork. Preserve the dominant motion and running silhouette during embroidery reduction.",
  },
  {
    id: "boxing",
    label: "Boxing",
    shortLabel: "BOXING",
    artworkSrc:
      "/canon/sports/boxing.svg",
    previewScale: 0.82,
    status: "prototype",
    productionNotes:
      "Generic boxing identity artwork. Preserve the dominant glove silhouette and major forms during embroidery reduction.",
  },
  {
    id: "martial-arts",
    label: "Martial Arts",
    shortLabel: "MARTIAL ARTS",
    artworkSrc:
      "/canon/sports/martial-arts.svg",
    previewScale: 0.82,
    status: "prototype",
    productionNotes:
      "Generic martial-arts identity artwork. Preserve the dominant belt or martial-arts silhouette without introducing discipline-specific branding.",
  },
  {
    id: "swimming",
    label: "Swimming",
    shortLabel: "SWIMMING",
    artworkSrc:
      "/canon/sports/swimming.svg",
    previewScale: 0.82,
    status: "prototype",
    productionNotes:
      "Generic swimming identity artwork. Preserve the swimmer and primary water or motion forms during embroidery reduction.",
  },
];

export function getSportCanonAsset(
  sport:
    | "None"
    | "American Football"
    | "Football (Soccer)"
    | "Baseball"
    | "Basketball"
    | "Hockey"
    | "Tennis"
    | "Golf"
    | "Running"
    | "Boxing"
    | "Martial Arts"
    | "Swimming",
): SportCanonAsset | undefined {
  if (sport === "None") {
    return undefined;
  }

  return sportCanonAssets.find(
    (asset) =>
      asset.label === sport,
  );
}
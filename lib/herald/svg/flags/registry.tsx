// lib/herald/svg/flags/registry.tsx

import type { ComponentType } from "react";

import { BelgiumFlag } from "./belgium";
import { BrazilFlag } from "./brazil";
import { CanadaFlag } from "./canada";
import { EgyptFlag } from "./egypt";
import { EnglandFlag } from "./england";
import { FranceFlag } from "./france";
import { GermanyFlag } from "./germany";
import { GhanaFlag } from "./ghana";
import { GreeceFlag } from "./greece";
import { IrelandFlag } from "./ireland";
import { ItalyFlag } from "./italy";
import { JapanFlag } from "./japan";
import { KenyaFlag } from "./kenya";
import { MexicoFlag } from "./mexico";
import { NetherlandsFlag } from "./netherlands";
import { NigeriaFlag } from "./nigeria";
import { NorwayFlag } from "./norway";
import { PolandFlag } from "./poland";
import { PortugalFlag } from "./portugal";
import { ScotlandFlag } from "./scotland";
import { SouthAfricaFlag } from "./south-africa";
import { SouthKoreaFlag } from "./south-korea";
import { SpainFlag } from "./spain";
import { SwedenFlag } from "./sweden";
import { SwitzerlandFlag } from "./switzerland";
import { UnitedKingdomFlag } from "./united-kingdom";
import { UnitedStatesFlag } from "./united-states";

import type { HeritageFlagVisualCanonAssetId } from "../../visualCanon/references";

export interface HeritageFlagComponentProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  title?: string;
}

export type HeritageFlagComponent =
  ComponentType<HeritageFlagComponentProps>;

export const heritageFlagComponentRegistry: Record<
  HeritageFlagVisualCanonAssetId,
  HeritageFlagComponent
> = {
  "united-states": UnitedStatesFlag,
  canada: CanadaFlag,
  mexico: MexicoFlag,
  brazil: BrazilFlag,

  france: FranceFlag,
  "united-kingdom": UnitedKingdomFlag,
  england: EnglandFlag,
  scotland: ScotlandFlag,
  ireland: IrelandFlag,
  italy: ItalyFlag,
  germany: GermanyFlag,
  spain: SpainFlag,
  portugal: PortugalFlag,
  netherlands: NetherlandsFlag,
  belgium: BelgiumFlag,
  switzerland: SwitzerlandFlag,
  sweden: SwedenFlag,
  norway: NorwayFlag,
  poland: PolandFlag,
  greece: GreeceFlag,

  japan: JapanFlag,
  "south-korea": SouthKoreaFlag,

  nigeria: NigeriaFlag,
  ghana: GhanaFlag,
  "south-africa": SouthAfricaFlag,
  egypt: EgyptFlag,
  kenya: KenyaFlag,
};

export function getHeritageFlagComponent(
  assetId: HeritageFlagVisualCanonAssetId,
): HeritageFlagComponent {
  return heritageFlagComponentRegistry[assetId];
}

export function hasHeritageFlagComponent(
  assetId: string,
): assetId is HeritageFlagVisualCanonAssetId {
  return Object.prototype.hasOwnProperty.call(
    heritageFlagComponentRegistry,
    assetId,
  );
}
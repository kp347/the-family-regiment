// lib/herald/svg/flags/registry.tsx
import type { ComponentType } from "react";
import { UnitedStatesFlag } from "./united-states";
import { CanadaFlag } from "./canada";
import { MexicoFlag } from "./mexico";
import { BrazilFlag } from "./brazil";
import { FranceFlag } from "./france";
import { UnitedKingdomFlag } from "./united-kingdom";
import { EnglandFlag } from "./england";
import { ScotlandFlag } from "./scotland";
import { IrelandFlag } from "./ireland";
import { ItalyFlag } from "./italy";
import { GermanyFlag } from "./germany";
import { SpainFlag } from "./spain";
import { PortugalFlag } from "./portugal";
import { NetherlandsFlag } from "./netherlands";
import { BelgiumFlag } from "./belgium";
import { SwitzerlandFlag } from "./switzerland";
import { SwedenFlag } from "./sweden";
import { NorwayFlag } from "./norway";
import { PolandFlag } from "./poland";
import { GreeceFlag } from "./greece";
import { JapanFlag } from "./japan";
import { SouthKoreaFlag } from "./south-korea";
import { NigeriaFlag } from "./nigeria";
import { GhanaFlag } from "./ghana";
import { SouthAfricaFlag } from "./south-africa";
import { EgyptFlag } from "./egypt";
import { KenyaFlag } from "./kenya";
import { PuertoRicoFlag } from "./puerto-rico";
import { DominicanRepublicFlag } from "./dominican-republic";
import { HaitiFlag } from "./haiti";
import { JamaicaFlag } from "./jamaica";
import { CubaFlag } from "./cuba";
import { TrinidadAndTobagoFlag } from "./trinidad-and-tobago";
import { MartiniqueFlag } from "./martinique";
import { GuadeloupeFlag } from "./guadeloupe";
import { PhilippinesFlag } from "./philippines";
import { ChinaFlag } from "./china";
import type { HeritageFlagVisualCanonAssetId } from "../../visualCanon/references";
export interface HeritageFlagComponentProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  title?: string;
}
export type HeritageFlagComponent = ComponentType<HeritageFlagComponentProps>;
export const heritageFlagComponentRegistry: Record<HeritageFlagVisualCanonAssetId, HeritageFlagComponent> = {
  "united-states": UnitedStatesFlag,
  "canada": CanadaFlag,
  "mexico": MexicoFlag,
  "brazil": BrazilFlag,
  "france": FranceFlag,
  "united-kingdom": UnitedKingdomFlag,
  "england": EnglandFlag,
  "scotland": ScotlandFlag,
  "ireland": IrelandFlag,
  "italy": ItalyFlag,
  "germany": GermanyFlag,
  "spain": SpainFlag,
  "portugal": PortugalFlag,
  "netherlands": NetherlandsFlag,
  "belgium": BelgiumFlag,
  "switzerland": SwitzerlandFlag,
  "sweden": SwedenFlag,
  "norway": NorwayFlag,
  "poland": PolandFlag,
  "greece": GreeceFlag,
  "japan": JapanFlag,
  "south-korea": SouthKoreaFlag,
  "nigeria": NigeriaFlag,
  "ghana": GhanaFlag,
  "south-africa": SouthAfricaFlag,
  "egypt": EgyptFlag,
  "kenya": KenyaFlag,
  "puerto-rico": PuertoRicoFlag,
  "dominican-republic": DominicanRepublicFlag,
  "haiti": HaitiFlag,
  "jamaica": JamaicaFlag,
  "cuba": CubaFlag,
  "trinidad-and-tobago": TrinidadAndTobagoFlag,
  "martinique": MartiniqueFlag,
  "guadeloupe": GuadeloupeFlag,
  "philippines": PhilippinesFlag,
  "china": ChinaFlag,
};
export function getHeritageFlagComponent(assetId: HeritageFlagVisualCanonAssetId): HeritageFlagComponent {
  return heritageFlagComponentRegistry[assetId];
}
export function hasHeritageFlagComponent(assetId: string): assetId is HeritageFlagVisualCanonAssetId {
  return Object.prototype.hasOwnProperty.call(heritageFlagComponentRegistry, assetId);
}

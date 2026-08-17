// lib/herald/designAdapter.ts

import type { HeraldDesign } from "./design";

import type { BuilderCrestSpec } from "./types";

/*
 * ============================================================
 * Herald Design Adapter
 *
 * Converts the canonical HeraldDesign into the BuilderCrestSpec
 * consumed by CrestRenderer and CrestPatch.
 *
 * This is the ONLY place these two models should know
 * about each other.
 * ============================================================
 */

export function toBuilderCrestSpec(
  design: HeraldDesign,
): BuilderCrestSpec {
  return {
    animal: design.primaryCharge,

    shield: design.shield,

    crown: design.crown,

    heritage: "",

    motto: design.motto.latin,

    initials:
      design.familyName
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 4)
        .toUpperCase(),

    colors: design.colors,

    supporters: design.supporters,

    wreath: design.wreath,

    banner: design.banner,
  };
}
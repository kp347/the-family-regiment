// app/flag-canon-preview/page.tsx

import type { ComponentType } from "react";

import { BelgiumFlag } from "@/lib/herald/svg/flags/belgium";
import { BrazilFlag } from "@/lib/herald/svg/flags/brazil";
import { CanadaFlag } from "@/lib/herald/svg/flags/canada";
import { EgyptFlag } from "@/lib/herald/svg/flags/egypt";
import { EnglandFlag } from "@/lib/herald/svg/flags/england";
import { FranceFlag } from "@/lib/herald/svg/flags/france";
import { GermanyFlag } from "@/lib/herald/svg/flags/germany";
import { GhanaFlag } from "@/lib/herald/svg/flags/ghana";
import { GreeceFlag } from "@/lib/herald/svg/flags/greece";
import { IrelandFlag } from "@/lib/herald/svg/flags/ireland";
import { ItalyFlag } from "@/lib/herald/svg/flags/italy";
import { JapanFlag } from "@/lib/herald/svg/flags/japan";
import { KenyaFlag } from "@/lib/herald/svg/flags/kenya";
import { MexicoFlag } from "@/lib/herald/svg/flags/mexico";
import { NetherlandsFlag } from "@/lib/herald/svg/flags/netherlands";
import { NigeriaFlag } from "@/lib/herald/svg/flags/nigeria";
import { NorwayFlag } from "@/lib/herald/svg/flags/norway";
import { PolandFlag } from "@/lib/herald/svg/flags/poland";
import { PortugalFlag } from "@/lib/herald/svg/flags/portugal";
import { ScotlandFlag } from "@/lib/herald/svg/flags/scotland";
import { SouthAfricaFlag } from "@/lib/herald/svg/flags/south-africa";
import { SouthKoreaFlag } from "@/lib/herald/svg/flags/south-korea";
import { SpainFlag } from "@/lib/herald/svg/flags/spain";
import { SwedenFlag } from "@/lib/herald/svg/flags/sweden";
import { SwitzerlandFlag } from "@/lib/herald/svg/flags/switzerland";
import { UnitedKingdomFlag } from "@/lib/herald/svg/flags/united-kingdom";
import { UnitedStatesFlag } from "@/lib/herald/svg/flags/united-states";

type FlagComponent = ComponentType<{
  width?: number | string;
  height?: number | string;
  className?: string;
  title?: string;
}>;

interface FlagPreview {
  name: string;
  ratio: string;
  component: FlagComponent;
}

const flags: FlagPreview[] = [
  {
    name: "United States",
    ratio: "19:10",
    component: UnitedStatesFlag,
  },
  {
    name: "Canada",
    ratio: "2:1",
    component: CanadaFlag,
  },
  {
    name: "Mexico",
    ratio: "7:4",
    component: MexicoFlag,
  },
  {
    name: "Brazil",
    ratio: "10:7",
    component: BrazilFlag,
  },
  {
    name: "France",
    ratio: "3:2",
    component: FranceFlag,
  },
  {
    name: "United Kingdom",
    ratio: "5:3",
    component: UnitedKingdomFlag,
  },
  {
    name: "England",
    ratio: "5:3",
    component: EnglandFlag,
  },
  {
    name: "Scotland",
    ratio: "5:3",
    component: ScotlandFlag,
  },
  {
    name: "Ireland",
    ratio: "2:1",
    component: IrelandFlag,
  },
  {
    name: "Italy",
    ratio: "3:2",
    component: ItalyFlag,
  },
  {
    name: "Germany",
    ratio: "5:3",
    component: GermanyFlag,
  },
  {
    name: "Spain",
    ratio: "3:2",
    component: SpainFlag,
  },
  {
    name: "Portugal",
    ratio: "3:2",
    component: PortugalFlag,
  },
  {
    name: "Netherlands",
    ratio: "3:2",
    component: NetherlandsFlag,
  },
  {
    name: "Belgium",
    ratio: "15:13",
    component: BelgiumFlag,
  },
  {
    name: "Switzerland",
    ratio: "1:1",
    component: SwitzerlandFlag,
  },
  {
    name: "Sweden",
    ratio: "8:5",
    component: SwedenFlag,
  },
  {
    name: "Norway",
    ratio: "22:16",
    component: NorwayFlag,
  },
  {
    name: "Poland",
    ratio: "8:5",
    component: PolandFlag,
  },
  {
    name: "Greece",
    ratio: "3:2",
    component: GreeceFlag,
  },
  {
    name: "Japan",
    ratio: "3:2",
    component: JapanFlag,
  },
  {
    name: "South Korea",
    ratio: "3:2",
    component: SouthKoreaFlag,
  },
  {
    name: "Nigeria",
    ratio: "2:1",
    component: NigeriaFlag,
  },
  {
    name: "Ghana",
    ratio: "3:2",
    component: GhanaFlag,
  },
  {
    name: "South Africa",
    ratio: "3:2",
    component: SouthAfricaFlag,
  },
  {
    name: "Egypt",
    ratio: "3:2",
    component: EgyptFlag,
  },
  {
    name: "Kenya",
    ratio: "3:2",
    component: KenyaFlag,
  },
];

export default function FlagCanonPreviewPage() {
  return (
    <main className="min-h-screen bg-[#090806] text-[#f3ead8]">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <header className="mb-12 border-b border-[#7f6844]/40 pb-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.32em] text-[#b79a68]">
            The Family Regiment
          </p>

          <h1 className="font-serif text-4xl font-semibold tracking-tight text-[#f3ead8] md:text-5xl">
            Heritage Flag Canon
          </h1>

          <p className="mt-5 max-w-3xl text-sm leading-7 text-[#bdb4a5] md:text-base">
            Internal visual-quality review surface for controlled heritage flag
            artwork. These assets remain draft until visual review, production
            validation, and the required Family Regiment Canon approval process
            are complete.
          </p>
        </header>

        <section className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-[#7f6844]/30 bg-[#12100d] p-5">
            <p className="text-xs uppercase tracking-[0.22em] text-[#8f8578]">
              Current Assets
            </p>

            <p className="mt-2 text-3xl font-semibold text-[#d4af6a]">
              {flags.length}
            </p>
          </div>

          <div className="rounded-xl border border-[#7f6844]/30 bg-[#12100d] p-5">
            <p className="text-xs uppercase tracking-[0.22em] text-[#8f8578]">
              Canon Status
            </p>

            <p className="mt-2 text-lg font-semibold text-[#f3ead8]">
              Draft
            </p>
          </div>

          <div className="rounded-xl border border-[#7f6844]/30 bg-[#12100d] p-5">
            <p className="text-xs uppercase tracking-[0.22em] text-[#8f8578]">
              Rendering
            </p>

            <p className="mt-2 text-lg font-semibold text-[#f3ead8]">
              Controlled SVG
            </p>
          </div>

          <div className="rounded-xl border border-[#7f6844]/30 bg-[#12100d] p-5">
            <p className="text-xs uppercase tracking-[0.22em] text-[#8f8578]">
              Production
            </p>

            <p className="mt-2 text-lg font-semibold text-[#f3ead8]">
              Not Yet Certified
            </p>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {flags.map((flag) => {
            const Flag = flag.component;

            return (
              <article
                key={flag.name}
                className="overflow-hidden rounded-2xl border border-[#7f6844]/30 bg-[#12100d]"
              >
                <div className="flex min-h-52 items-center justify-center rounded-xl border border-[#5f5f5f] bg-[#777777] p-6">
                  <div className="flex h-40 w-full items-center justify-center">
                    <Flag
                      width="100%"
                      height="100%"
                      title={`Flag of ${flag.name}`}
                    />
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9d8a69]">
                        Heritage Flag
                      </p>

                      <h2 className="mt-2 text-xl font-semibold text-[#f3ead8]">
                        {flag.name}
                      </h2>
                    </div>

                    <span className="rounded-full border border-[#7f6844]/40 bg-[#1b1712] px-3 py-1 text-xs font-medium text-[#cdb98f]">
                      Draft
                    </span>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-[#7f6844]/20 pt-4 text-sm">
                    <span className="text-[#8f8578]">
                      Canon proportion
                    </span>

                    <span className="font-medium text-[#d8d0c3]">
                      {flag.ratio}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        <section className="mt-12 rounded-2xl border border-[#7f6844]/30 bg-[#12100d] p-6 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#b79a68]">
            QA Standard
          </p>

          <h2 className="mt-3 font-serif text-2xl font-semibold text-[#f3ead8]">
            Visual inspection before Canon promotion
          </h2>

          <p className="mt-4 max-w-4xl text-sm leading-7 text-[#aaa195]">
            The neutral gray inspection field is intentional. It allows white,
            black, dark blue, red, and other flag elements to remain visible
            without the Family Regiment brand background interfering with the
            review. Assets displayed here should not be considered
            production-authorized merely because they render successfully.
          </p>
        </section>
      </div>
    </main>
  );
}
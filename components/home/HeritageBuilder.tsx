"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const heritageOptions = [
  { name: "France", code: "FR" },
  { name: "United States", code: "US" },
  { name: "Italy", code: "IT" },
  { name: "Ireland", code: "IE" },
];

const symbolOptions = ["Lion", "Eagle", "Stag", "Wolf"];

const valueOptions = [
  { name: "Courage", motto: "Fortis in Familia" },
  { name: "Honor", motto: "Honore et Virtute" },
  { name: "Unity", motto: "Uniti Fortiores" },
  { name: "Legacy", motto: "Per Saecula" },
];

const symbolCharacters: Record<string, string> = {
  Lion: "♌",
  Eagle: "◆",
  Stag: "♜",
  Wolf: "◇",
};

export default function HeritageBuilder() {
  const [heritage, setHeritage] = useState("France");
  const [symbol, setSymbol] = useState("Lion");
  const [value, setValue] = useState("Courage");

  const selectedHeritage =
    heritageOptions.find((option) => option.name === heritage) ??
    heritageOptions[0];

  const selectedValue =
    valueOptions.find((option) => option.name === value) ?? valueOptions[0];

  return (
    <section className="bg-[#111213] px-6 py-20 text-[#F6F2EA] md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid overflow-hidden rounded-[2rem] border border-white/10 bg-[#18191A] lg:grid-cols-[0.95fr_1.05fr]">
          <div className="p-8 md:p-12 lg:p-14">
            <p className="text-xs uppercase tracking-[0.4em] text-[#B08D57]">
              Heritage Identity Preview
            </p>

            <h2 className="mt-5 max-w-xl text-4xl font-semibold tracking-[-0.04em] md:text-5xl">
              Turn your family story into a regiment identity.
            </h2>

            <p className="mt-5 max-w-xl leading-7 text-[#99958D]">
              Choose a heritage, symbol, and guiding value to preview the
              visual language that will shape your crest, patches, and jacket.
            </p>

            <div className="mt-10 space-y-8">
              <BuilderGroup
                number="01"
                title="Heritage"
                description="Choose the primary heritage represented in this preview."
              >
                <div className="grid grid-cols-2 gap-3">
                  {heritageOptions.map((option) => {
                    const active = heritage === option.name;

                    return (
                      <button
                        key={option.name}
                        type="button"
                        onClick={() => setHeritage(option.name)}
                        className={`rounded-2xl border p-4 text-left transition ${
                          active
                            ? "border-[#B08D57] bg-[#B08D57]/10"
                            : "border-white/10 bg-white/[0.02] hover:border-white/25"
                        }`}
                      >
                        <span className="text-[10px] uppercase tracking-[0.25em] text-[#B08D57]">
                          {option.code}
                        </span>
                        <p className="mt-2 text-sm">{option.name}</p>
                      </button>
                    );
                  })}
                </div>
              </BuilderGroup>

              <BuilderGroup
                number="02"
                title="Symbol"
                description="Select the emblem that anchors the family crest."
              >
                <div className="grid grid-cols-2 gap-3">
                  {symbolOptions.map((option) => {
                    const active = symbol === option;

                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setSymbol(option)}
                        className={`rounded-2xl border p-4 text-left transition ${
                          active
                            ? "border-[#B08D57] bg-[#B08D57]/10"
                            : "border-white/10 bg-white/[0.02] hover:border-white/25"
                        }`}
                      >
                        <span className="text-2xl text-[#B08D57]">
                          {symbolCharacters[option]}
                        </span>
                        <p className="mt-2 text-sm">{option}</p>
                      </button>
                    );
                  })}
                </div>
              </BuilderGroup>

              <BuilderGroup
                number="03"
                title="Principle"
                description="Choose the value that guides the regiment."
                last
              >
                <div className="grid grid-cols-2 gap-3">
                  {valueOptions.map((option) => {
                    const active = value === option.name;

                    return (
                      <button
                        key={option.name}
                        type="button"
                        onClick={() => setValue(option.name)}
                        className={`rounded-2xl border p-4 text-left transition ${
                          active
                            ? "border-[#B08D57] bg-[#B08D57]/10"
                            : "border-white/10 bg-white/[0.02] hover:border-white/25"
                        }`}
                      >
                        <p className="text-sm">{option.name}</p>
                        <p className="mt-2 text-xs text-[#77736A]">
                          {option.motto}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </BuilderGroup>
            </div>
          </div>

          <div className="border-t border-white/10 bg-[#20211E] p-8 md:p-12 lg:border-l lg:border-t-0">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-[#B08D57]">
                  Live Concept
                </p>
                <p className="mt-2 text-sm text-[#77736A]">
                  Regiment Gold · Front View
                </p>
              </div>

              <span className="rounded-full border border-white/10 px-4 py-2 text-[10px] uppercase tracking-[0.25em] text-[#8F8B82]">
                Preview
              </span>
            </div>

            <div className="relative mt-8 aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 bg-[#151612]">
              <Image
                src="/images/products/studio/jacket-front-clean.png"
                alt="Family Regiment jacket preview"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />

              <div className="absolute left-[25%] top-[31%] rounded-sm border border-[#B08D57] bg-[#20231C] px-3 py-1.5 shadow-xl">
                <p className="max-w-[110px] truncate text-[9px] font-bold uppercase tracking-[0.14em] text-[#B08D57]">
                  Laurent
                </p>
              </div>

              <div className="absolute right-[30%] top-[34%] flex h-[90px] w-[74px] flex-col items-center justify-center rounded-t-[45%] border-[3px] border-[#B08D57] bg-[#20231C] shadow-2xl">
                <span className="text-3xl text-[#B08D57]">
                  {symbolCharacters[symbol]}
                </span>
                <span className="mt-1 text-[7px] font-bold uppercase tracking-[0.12em] text-[#B08D57]">
                  LR
                </span>
              </div>

              <div className="absolute right-[3%] top-[23%] flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#B08D57] bg-[#20231C] shadow-xl">
                <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#B08D57]">
                  {selectedHeritage.code}
                </span>
              </div>

              <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/10 bg-black/75 p-5 backdrop-blur-sm">
                <p className="text-[9px] uppercase tracking-[0.3em] text-[#B08D57]">
                  Current Regiment
                </p>
                <p className="mt-3 text-2xl text-[#F6F2EA]">
                  The {heritage} {symbol}
                </p>
                <p className="mt-2 text-sm text-[#99958D]">
                  A crest representing {value.toLowerCase()}, heritage, and
                  family continuity.
                </p>

                <div className="mt-5 border-t border-white/10 pt-4">
                  <p className="text-[9px] uppercase tracking-[0.28em] text-[#77736A]">
                    Motto
                  </p>
                  <p className="mt-2 text-sm text-[#D8D3CA]">
                    {selectedValue.motto}
                  </p>
                </div>
              </div>
            </div>

            <Link
              href="/builder"
              className="mt-8 flex w-full items-center justify-center rounded-full bg-[#B08D57] px-8 py-4 text-sm font-semibold uppercase tracking-widest text-[#151515] transition hover:scale-[1.01] hover:bg-[#C19A61]"
            >
              Continue Building
            </Link>

            <p className="mt-4 text-center text-xs leading-5 text-[#77736A]">
              Continue to the full seven-step Heritage Identity Workshop.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

type BuilderGroupProps = {
  number: string;
  title: string;
  description: string;
  children: React.ReactNode;
  last?: boolean;
};

function BuilderGroup({
  number,
  title,
  description,
  children,
  last = false,
}: BuilderGroupProps) {
  return (
    <div className={last ? "" : "border-b border-white/10 pb-8"}>
      <div className="mb-5 flex items-start gap-4">
        <span className="mt-1 text-[10px] uppercase tracking-[0.25em] text-[#B08D57]">
          {number}
        </span>

        <div>
          <h3 className="text-lg">{title}</h3>
          <p className="mt-1 text-sm leading-6 text-[#77736A]">
            {description}
          </p>
        </div>
      </div>

      {children}
    </div>
  );
}
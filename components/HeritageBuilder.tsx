"use client";

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
    <section
      id="builder"
      className="border-b border-white/10 bg-[#1B1C1D] px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 max-w-3xl">
          <p className="text-xs uppercase tracking-[0.45em] text-[#B08D57]">
            Begin Your Story
          </p>

          <h2 className="mt-6 text-5xl font-semibold leading-[0.98] tracking-[-0.04em] md:text-7xl">
            Build the symbols
            <br />
            of your regiment.
          </h2>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-[#AAA69E]">
            Choose the places, creatures, and principles that represent your
            family. This preview will become the foundation of your custom
            embroidered crest.
          </p>
        </div>

        <div className="grid overflow-hidden rounded-[2rem] border border-white/10 bg-[#151617] lg:grid-cols-[1fr_0.9fr]">
          {/* Controls */}
          <div className="p-8 md:p-12">
            <BuilderGroup
              number="01"
              title="Choose your heritage"
              description="Select the place that anchors this first crest concept."
            >
              <div className="grid grid-cols-2 gap-3">
                {heritageOptions.map((option) => (
                  <ChoiceButton
                    key={option.name}
                    active={heritage === option.name}
                    onClick={() => setHeritage(option.name)}
                  >
                    <span className="text-xs text-[#B08D57]">
                      {option.code}
                    </span>

                    <span>{option.name}</span>
                  </ChoiceButton>
                ))}
              </div>
            </BuilderGroup>

            <BuilderGroup
              number="02"
              title="Choose your symbol"
              description="Select a heraldic animal to represent your family."
            >
              <div className="grid grid-cols-2 gap-3">
                {symbolOptions.map((option) => (
                  <ChoiceButton
                    key={option}
                    active={symbol === option}
                    onClick={() => setSymbol(option)}
                  >
                    {option}
                  </ChoiceButton>
                ))}
              </div>
            </BuilderGroup>

            <BuilderGroup
              number="03"
              title="Choose your principle"
              description="Select the value that will guide your Latin motto."
              last
            >
              <div className="grid grid-cols-2 gap-3">
                {valueOptions.map((option) => (
                  <ChoiceButton
                    key={option.name}
                    active={value === option.name}
                    onClick={() => setValue(option.name)}
                  >
                    {option.name}
                  </ChoiceButton>
                ))}
              </div>
            </BuilderGroup>
          </div>

          {/* Crest preview */}
          <div className="relative flex min-h-[650px] items-center justify-center overflow-hidden border-t border-white/10 bg-[#23241F] p-8 lg:border-l lg:border-t-0 md:p-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(176,141,87,0.18),_transparent_60%)]" />

            <div className="relative w-full max-w-md text-center">
              <p className="text-xs uppercase tracking-[0.4em] text-[#B08D57]">
                Live Crest Preview
              </p>

              <div className="relative mx-auto mt-10 flex aspect-[4/5] max-w-[340px] items-center justify-center">
                <div className="absolute inset-x-10 top-0 h-16 border-x-[18px] border-b-[14px] border-[#B08D57] border-x-transparent" />

                <div className="relative flex h-[340px] w-[270px] flex-col items-center overflow-hidden rounded-t-[48%] border-4 border-[#B08D57] bg-[#34382A] shadow-2xl">
                  <div className="flex h-20 w-full items-center justify-center border-b-2 border-[#B08D57] bg-[#20231C]">
                    <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#E7D8B4]">
                      {selectedHeritage.code}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col items-center justify-center px-8">
                    <CrestSymbol symbol={symbol} />

                    <p className="mt-6 text-xs uppercase tracking-[0.3em] text-[#E7D8B4]">
                      {heritage}
                    </p>
                  </div>

                  <div className="h-20 w-full border-t-2 border-[#B08D57] bg-[#20231C]" />
                </div>

                <div className="absolute bottom-8 left-1/2 w-[320px] -translate-x-1/2">
                  <div className="rounded-full border-2 border-[#B08D57] bg-[#161714] px-6 py-4 shadow-xl">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#E7D8B4]">
                      {selectedValue.motto}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-white/10 pt-8">
                <p className="text-xs uppercase tracking-[0.35em] text-[#B08D57]">
                  Current Regiment
                </p>

                <p className="mt-4 text-2xl text-[#F6F2EA]">
                  The {heritage} {symbol}
                </p>

                <p className="mt-2 text-sm text-[#99958D]">
                  A crest representing {value.toLowerCase()}, heritage, and
                  family continuity.
                </p>
              </div>

              <button
                type="button"
                className="mt-8 w-full rounded-full bg-[#B08D57] px-8 py-4 text-sm font-semibold uppercase tracking-widest text-[#151515] transition hover:scale-[1.02]"
              >
                Continue Building
              </button>
            </div>
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
    <div className={last ? "" : "mb-10 border-b border-white/10 pb-10"}>
      <div className="mb-6 flex items-start gap-5">
        <span className="mt-1 text-xs tracking-[0.25em] text-[#B08D57]">
          {number}
        </span>

        <div>
          <h3 className="text-2xl text-[#F6F2EA]">{title}</h3>

          <p className="mt-2 max-w-md text-sm leading-6 text-[#88857E]">
            {description}
          </p>
        </div>
      </div>

      {children}
    </div>
  );
}

type ChoiceButtonProps = {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

function ChoiceButton({
  active,
  onClick,
  children,
}: ChoiceButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex min-h-14 items-center justify-center gap-3 rounded-xl border px-4 text-sm transition ${
        active
          ? "border-[#B08D57] bg-[#B08D57]/10 text-[#F6F2EA]"
          : "border-white/10 bg-white/[0.02] text-[#AAA69E] hover:border-white/25 hover:text-[#F6F2EA]"
      }`}
    >
      {children}
    </button>
  );
}

function CrestSymbol({ symbol }: { symbol: string }) {
  const symbols: Record<string, string> = {
    Lion: "♌",
    Eagle: "◆",
    Stag: "♜",
    Wolf: "◇",
  };

  return (
    <div className="flex h-32 w-32 items-center justify-center rounded-full border-2 border-[#B08D57] bg-[#20231C]">
      <span
        className="text-7xl text-[#B08D57]"
        aria-label={`${symbol} crest symbol`}
      >
        {symbols[symbol]}
      </span>
    </div>
  );
}
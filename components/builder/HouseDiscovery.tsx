"use client";

import { useState } from "react";
import FamilyCrestPreview from "./FamilyCrestPreview";

type HouseValue = "Courage" | "Honor" | "Unity" | "Legacy" | "Resilience" | "Service";
type Animal = "Lion" | "Eagle" | "Wolf" | "Bear" | "Stag";

export type DiscoverySelection = {
  familyName: string;
  value: HouseValue;
  animal: Animal;
  motto: string;
};

type Props = {
  onComplete: (selection: DiscoverySelection) => void;
  onSkip: () => void;
};

const values: { label: string; value: HouseValue; description: string }[] = [
  { label: "We stand together", value: "Unity", description: "Family above all" },
  { label: "We meet challenges head-on", value: "Courage", description: "Courage and conviction" },
  { label: "We honor those before us", value: "Honor", description: "Respect for our roots" },
  { label: "We build for generations", value: "Legacy", description: "Something that lasts" },
  { label: "We rise after every setback", value: "Resilience", description: "Strength through adversity" },
  { label: "We lead by giving back", value: "Service", description: "A life of purpose" },
];

const animals: { name: Animal; meaning: string }[] = [
  { name: "Lion", meaning: "Courage and leadership" },
  { name: "Eagle", meaning: "Vision and freedom" },
  { name: "Wolf", meaning: "Loyalty and unity" },
  { name: "Bear", meaning: "Strength and protection" },
  { name: "Stag", meaning: "Dignity and renewal" },
];

// Curated short phrases; the full motto library remains available in the builder.
const mottos = [
  { latin: "Virtus et Honor", english: "Virtue and honor", values: ["Honor", "Service"] },
  { latin: "Per Aspera ad Astra", english: "Through hardships to the stars", values: ["Resilience", "Legacy"] },
  { latin: "Semper Fidelis", english: "Always faithful", values: ["Unity", "Service"] },
  { latin: "Fortes Fortuna Adiuvat", english: "Fortune favors the brave", values: ["Courage", "Resilience"] },
  { latin: "Concordia Crescimus", english: "Through harmony we grow", values: ["Unity", "Legacy"] },
] as const;

const headings = [
  ["Every family stands for something.", "What will yours be remembered for?"],
  ["Give your House a name.", "A name worth carrying forward."],
  ["Choose your House’s symbol.", "A visual expression of your family’s character."],
  ["Give your House a voice.", "A few words can carry a promise across generations."],
  ["Your House is taking shape.", "The first expression of a legacy you can make your own."],
] as const;

export default function HouseDiscovery({ onComplete, onSkip }: Props) {
  const [step, setStep] = useState(0);
  const [value, setValue] = useState<HouseValue | null>(null);
  const [familyName, setFamilyName] = useState("");
  const [animal, setAnimal] = useState<Animal | null>(null);
  const [motto, setMotto] = useState("");
  const name = familyName.trim();
  const selection: DiscoverySelection | null = value && name && animal && motto
    ? { value, familyName: name, animal, motto }
    : null;
  const orderedMottos = [...mottos].sort((a, b) =>
    Number(b.values.some((item: string) => item === value)) -
    Number(a.values.some((item: string) => item === value)),
  );
  const canContinue = [Boolean(value), Boolean(name), Boolean(animal), Boolean(motto), Boolean(selection)][step];

  function advance() {
    if (!canContinue) return;
    if (step === 4 && selection) onComplete(selection);
    else setStep((current) => Math.min(4, current + 1));
  }

  return (
    <section className="mx-auto max-w-6xl overflow-hidden rounded-[1.5rem] border border-[#B08D57]/30 bg-[#18191A] lg:grid lg:min-h-[660px] lg:grid-cols-2" aria-label="Discover your House">
      <div className="p-6 sm:p-10 lg:p-14">
        <div className="flex items-center justify-between gap-4">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF6A]">House Discovery · {String(step + 1).padStart(2, "0")} / 05</p>
          <button type="button" onClick={onSkip} className="text-xs text-[#C7C1B6] underline-offset-4 hover:text-white hover:underline">Go directly to builder</button>
        </div>
        <div className="mt-6 flex gap-2" aria-label={`Discovery stage ${step + 1} of 5`}>
          {[0, 1, 2, 3, 4].map((index) => <span key={index} className={`h-[2px] flex-1 ${index <= step ? "bg-[#D4AF6A]" : "bg-white/15"}`} />)}
        </div>
        <h1 className="mt-12 font-serif text-3xl leading-tight text-[#F6F2EA] sm:text-4xl">{headings[step][0]}</h1>
        <p className="mt-4 text-sm leading-7 text-[#B5AFA4]">{headings[step][1]}</p>

        {step === 0 && <div className="mt-9 space-y-2" role="group" aria-label="Choose a guiding value">
          {values.map((item) => <button key={item.value} type="button" aria-pressed={value === item.value} onClick={() => setValue(item.value)} className={`w-full rounded-xl border p-4 text-left transition ${value === item.value ? "border-[#D4AF6A] bg-[#D4AF6A]/10" : "border-white/15 bg-white/[0.025] hover:border-[#D4AF6A]/50"}`}>
            <span className="block text-sm font-medium text-[#F6F2EA]">{item.label}</span>
            <span className="mt-1 block text-xs text-[#AFA99E]">{item.description}</span>
          </button>)}
        </div>}

        {step === 1 && <div className="mt-10">
          <label htmlFor="discovery-house-name" className="block text-xs uppercase tracking-[0.16em] text-[#D4AF6A]">House or family name</label>
          <input id="discovery-house-name" autoComplete="family-name" maxLength={40} value={familyName} onChange={(event) => setFamilyName(event.target.value)} placeholder="e.g. Laurent" className="mt-3 w-full rounded-xl border border-white/20 bg-[#11120F] px-4 py-4 text-lg text-white outline-none focus:border-[#D4AF6A]" />
          <p className="mt-3 text-xs leading-6 text-[#AAA498]">A surname or chosen House name. You can refine this later.</p>
        </div>}

        {step === 2 && <div className="mt-9 grid grid-cols-2 gap-3">
          {animals.map((item) => <button key={item.name} type="button" aria-pressed={animal === item.name} onClick={() => setAnimal(item.name)} className={`rounded-xl border p-5 text-left transition ${animal === item.name ? "border-[#D4AF6A] bg-[#D4AF6A]/10" : "border-white/15 hover:border-[#D4AF6A]/50"}`}>
            <span className="block font-serif text-xl text-[#F6F2EA]">{item.name}</span>
            <span className="mt-2 block text-xs text-[#AFA99E]">{item.meaning}</span>
          </button>)}
        </div>}

        {step === 3 && <div className="mt-9 space-y-3" role="group" aria-label="Choose a Latin motto">
          {orderedMottos.map((item) => <button key={item.latin} type="button" aria-pressed={motto === item.latin} onClick={() => setMotto(item.latin)} className={`w-full rounded-xl border p-4 text-left transition ${motto === item.latin ? "border-[#D4AF6A] bg-[#D4AF6A]/10" : "border-white/15 bg-white/[0.025] hover:border-[#D4AF6A]/50"}`}>
            <span className="block font-serif text-base text-[#F6F2EA]">{item.latin}</span>
            <span className="mt-1 block text-xs text-[#AFA99E]">{item.english}</span>
          </button>)}
          <p className="text-xs leading-6 text-[#AAA498]">Explore additional mottos and refine your choice in the builder.</p>
        </div>}

        {step === 4 && <div className="mt-10 rounded-xl border border-[#D4AF6A]/25 bg-[#D4AF6A]/5 p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-[#D4AF6A]">House of {name}</p>
          <p className="mt-3 font-serif text-xl text-[#F6F2EA]">{motto}</p>
          <p className="mt-2 text-xs text-[#B5AFA4]">{mottos.find((item) => item.latin === motto)?.english}</p>
          <p className="mt-5 text-sm leading-7 text-[#E1DACC]">Guided by {value?.toLowerCase()}, represented by the {animal?.toLowerCase()}. Your heritage, colors and final composition are yours to define.</p>
          <p className="mt-4 text-xs leading-6 text-[#AAA498]">Your symbols express your choices; they are not claims of inherited or historically granted arms.</p>
        </div>}

        <div className="mt-10 flex items-center justify-between gap-3">
          <button type="button" onClick={() => step > 0 ? setStep(step - 1) : onSkip()} className="rounded-full border border-white/20 px-5 py-3 text-xs uppercase tracking-[0.12em] text-white hover:border-[#D4AF6A]">{step > 0 ? "Back" : "Skip"}</button>
          <button type="button" disabled={!canContinue} onClick={advance} className="rounded-full bg-[#D4AF6A] px-6 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#11120F] hover:bg-[#E5C88F] disabled:cursor-not-allowed disabled:opacity-35">{step === 4 ? "Refine My Crest" : step === 3 ? "Reveal My House" : "Continue"}</button>
        </div>
      </div>
      <aside className="flex min-h-[320px] flex-col items-center justify-center border-t border-[#D4AF6A]/15 bg-[#11120F] p-6 lg:border-l lg:border-t-0" aria-live="polite">
        <p className="text-center text-[10px] uppercase tracking-[0.32em] text-[#D4AF6A]">{name ? `House of ${name}` : "Your House Awaits"}</p>
        <div className="my-7 flex min-h-[240px] w-full items-center justify-center motion-safe:transition-all motion-safe:duration-500">
          {name && animal ? <div className="origin-center scale-90 sm:scale-100"><FamilyCrestPreview familyName={name} initials={name[0].toUpperCase()} motto={motto} symbol={animal} shield="Heater Shield" crown="None" finish="Regiment Gold" /></div> :
            <svg viewBox="0 0 220 260" width="210" height="250" role="img" aria-label="An unadorned shield awaiting your House identity">
              <path d="M20 20 H200 V140 Q196 200 110 245 Q24 200 20 140 Z" fill="#191B17" stroke="#D4AF6A" strokeWidth="3" />
              <path d="M30 30 H190 V139 Q186 192 110 233 Q34 192 30 139 Z" fill="none" stroke="#D4AF6A" strokeWidth="1" opacity="0.45" />
            </svg>}
        </div>
        <p className="max-w-xs text-center text-sm leading-6 text-[#AAA498]">{motto || (animal ? `${animal} · ${animals.find((item) => item.name === animal)?.meaning}` : value ? `${value} · Your first defining principle` : "Every legacy begins with a choice.")}</p>
        <p className="mt-5 text-center text-[10px] uppercase tracking-[0.16em] text-[#7F7C73]">Concept preview · Refine in the builder</p>
      </aside>
    </section>
  );
}

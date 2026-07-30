"use client";

type BuilderHeraldryProps = {
  animal: string;
  shield: string;
  crown: string;
  onAnimalChange: (value: string) => void;
  onShieldChange: (value: string) => void;
  onCrownChange: (value: string) => void;
};

const animals = [
  {
    name: "Lion",
    icon: "🦁",
    meaning: "Leadership, courage, and nobility",
  },
  {
    name: "Eagle",
    icon: "🦅",
    meaning: "Freedom, vision, and strength",
  },
  {
    name: "Wolf",
    icon: "🐺",
    meaning: "Loyalty, family, and perseverance",
  },
  {
    name: "Bear",
    icon: "🐻",
    meaning: "Protection and resilience",
  },
  {
    name: "Stag",
    icon: "🦌",
    meaning: "Honor and wisdom",
  },
];

const shields = [
  "Heater Shield",
  "Norman Shield",
  "Tournament Shield",
  "Crusader Shield",
];

const crowns = [
  "None",
  "Baron",
  "Count",
  "Ducal",
  "Royal",
];

export default function BuilderHeraldry({
  animal,
  shield,
  crown,
  onAnimalChange,
  onShieldChange,
  onCrownChange,
}: BuilderHeraldryProps) {
  return (
    <div className="space-y-10">

      <div>
        <h3 className="text-lg font-semibold text-white">
          Primary Heraldic Animal
        </h3>

        <p className="mt-2 text-sm text-[#8B867D]">
          Choose the figure that best represents your family's identity.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {animals.map((option) => (
            <button
              key={option.name}
              type="button"
              onClick={() => onAnimalChange(option.name)}
              className={`rounded-2xl border p-5 text-left transition-all duration-200 ${
                animal === option.name
                  ? "border-[#B08D57] bg-[#2B261D]"
                  : "border-white/10 bg-[#1A1B1C] hover:border-[#B08D57]/50"
              }`}
            >
              <div className="text-4xl">{option.icon}</div>

              <div className="mt-4 text-lg font-semibold">
                {option.name}
              </div>

              <div className="mt-2 text-xs text-[#9A958B]">
                {option.meaning}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2">

        <div>
          <label className="mb-3 block text-xs uppercase tracking-[0.25em] text-[#B08D57]">
            Shield Style
          </label>

          <select
            value={shield}
            onChange={(e) => onShieldChange(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-[#1B1C1D] px-4 py-3"
          >
            {shields.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-3 block text-xs uppercase tracking-[0.25em] text-[#B08D57]">
            Crown
          </label>

          <select
            value={crown}
            onChange={(e) => onCrownChange(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-[#1B1C1D] px-4 py-3"
          >
            {crowns.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>

      </div>

    </div>
  );
}
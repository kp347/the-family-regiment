
"use client";

import { getAnimalReferenceByName } from "@/lib/herald/visualCanon/animalReferences";
import { getShieldReferenceByName } from "@/lib/herald/visualCanon/shieldReferences";

type BuilderHeraldryProps = {
  animal: string;
  shield: string;
  crown: string;
  onAnimalChange: (value: string) => void;
  onShieldChange: (value: string) => void;
  onCrownChange: (value: string) => void;
};

type AnimalOption = {
  name: string;
  meaning: string;
};

type ShieldOption = {
  name: string;
  description: string;
};

const animals: AnimalOption[] = [
  {
    name: "Lion",
    meaning:
      "Courage, leadership, strength, and protection",
  },
  {
    name: "Eagle",
    meaning:
      "Vision, vigilance, authority, and resolve",
  },
  {
    name: "Wolf",
    meaning:
      "Loyalty, family bonds, guardianship, and endurance",
  },
  {
    name: "Bear",
    meaning:
      "Strength, protection, steadfastness, and courage",
  },
  {
    name: "Stag",
    meaning:
      "Dignity, stewardship, renewal, and heritage",
  },
  {
    name: "Griffin",
    meaning:
      "Guardianship, vigilance, courage, and strength",
  },
  {
    name: "Mako Shark",
    meaning:
      "Speed, precision, determination, adaptability, and protection",
  },
];

const shields: ShieldOption[] = [
  {
    name: "Heater Shield",
    description:
      "Classic, balanced, and traditionally heraldic",
  },
  {
    name: "French Shield",
    description:
      "Broad, formal, and continental in character",
  },
  {
    name: "Norman Shield",
    description:
      "Elongated, medieval, and strongly vertical",
  },
  {
    name: "Spanish Shield",
    description:
      "Balanced with a softer rounded lower field",
  },
  {
    name: "Targe",
    description:
      "Circular, distinctive, and strongly geometric",
  },
];

function normalizeSelectedAnimal(value: string): string {
  if (
    value === "Salmon" ||
    value === "Shark" ||
    value === "mako-shark"
  ) {
    return "Mako Shark";
  }

  return value;
}

export default function BuilderHeraldry({
  animal,
  shield,
  crown: _crown,
  onAnimalChange,
  onShieldChange,
  onCrownChange: _onCrownChange,
}: BuilderHeraldryProps) {
  const selectedAnimal = normalizeSelectedAnimal(animal);

  void _crown;
  void _onCrownChange;

  return (
    <div className="space-y-12">
      <section>
        <SectionHeader
          eyebrow="Shield Library"
          title="Choose the foundation"
          description="Select one of the five controlled Family Regiment shield families as the foundation of your crest."
        />

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {shields.map((option) => {
            const active = shield === option.name;

            return (
              <button
                key={option.name}
                type="button"
                onClick={() => onShieldChange(option.name)}
                aria-pressed={active}
                className={[
                  "group relative overflow-hidden rounded-[1.35rem] border p-4 text-center transition duration-200",
                  active
                    ? "border-[#C8A969] bg-[#C8A969]/10 shadow-[inset_0_0_0_1px_rgba(200,169,105,0.16)]"
                    : "border-white/10 bg-[#20211F] hover:-translate-y-0.5 hover:border-[#B08D57]/55",
                ].join(" ")}
              >
                {active && <SelectedMark />}

                <div className="relative flex h-36 items-center justify-center overflow-hidden rounded-xl border border-white/8 bg-[#171815]">
                  <ShieldReferencePreview name={option.name} />
                </div>

                <p className="mt-4 text-sm font-semibold text-[#F3EEE4]">
                  {option.name}
                </p>

                <p className="mt-2 text-xs leading-5 text-[#89847A]">
                  {option.description}
                </p>
              </button>
            );
          })}
        </div>

        <div className="mt-5 rounded-xl border border-[#B08D57]/20 bg-[#B08D57]/5 px-5 py-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B08D57]">
            Shield Visual Canon
          </p>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-[#8E8A81]">
            These shield images are controlled presentation
            references. Production masters remain subject to
            Family Regiment design review, manufacturing
            validation, and physical sample approval.
            Decorative details shown in reference artwork are
            not automatically structural shield geometry.
          </p>
        </div>
      </section>

      <section>
        <SectionHeader
          eyebrow="Primary Charge"
          title="Choose your heraldic figure"
          description="Choose one dominant figure from the controlled Family Regiment Visual Canon. This figure becomes the primary symbol at the center of your crest."
        />

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {animals.map((option) => {
            const active = selectedAnimal === option.name;

            return (
              <button
                key={option.name}
                type="button"
                onClick={() => onAnimalChange(option.name)}
                aria-pressed={active}
                className={[
                  "group relative min-h-[220px] overflow-hidden rounded-[1.35rem] border p-5 text-left transition duration-200",
                  active
                    ? "border-[#C8A969] bg-[#C8A969]/10"
                    : "border-white/10 bg-[#20211F] hover:-translate-y-0.5 hover:border-[#B08D57]/55",
                ].join(" ")}
              >
                {active && <SelectedMark />}

                <div className="relative flex h-28 items-center justify-center overflow-hidden rounded-xl border border-white/8 bg-[#171815]">
                  <AnimalReferencePreview name={option.name} />
                </div>

                <div className="mt-5">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-lg font-semibold text-[#F3EEE4]">
                      {option.name}
                    </p>
                  </div>

                  <p className="mt-2 text-sm leading-6 text-[#89847A]">
                    {option.meaning}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-5 rounded-xl border border-[#B08D57]/20 bg-[#B08D57]/5 px-5 py-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B08D57]">
            Family Regiment Visual Canon
          </p>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-[#8E8A81]">
            Standard crests are assembled from the controlled
            Family Regiment Visual Canon. One dominant heraldic
            figure carries the primary family identity.
            Optional subordinate family-story elements may
            support that figure without competing with it.
            Production artwork remains subject to design review,
            manufacturing validation, and physical sample approval.
          </p>
        </div>
      </section>
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#B08D57]">
        {eyebrow}
      </p>

      <h3 className="mt-2 text-2xl text-[#F4EFE5]">
        {title}
      </h3>

      <p className="mt-2 max-w-2xl text-sm leading-6 text-[#8E8A81]">
        {description}
      </p>
    </div>
  );
}

function SelectedMark() {
  return (
    <div className="absolute right-4 top-4 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-[#C8A969] text-[11px] font-bold text-[#151515]">
      ✓
    </div>
  );
}

function ShieldReferencePreview({
  name,
}: {
  name: string;
}) {
  const artwork = getShieldReferenceByName(name);

  if (!artwork) {
    return (
      <div className="flex h-full w-full items-center justify-center px-5 text-center">
        <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#756E61]">
          Reference unavailable
        </span>
      </div>
    );
  }

  const scale = artwork.scale ?? 1;

  return (
    <img
      src={artwork.src}
      alt={artwork.alt}
      className="h-full w-full object-contain"
      style={{
        objectPosition: artwork.objectPosition ?? "center",
        transform: `scale(${scale})`,
      }}
    />
  );
}

function AnimalReferencePreview({
  name,
}: {
  name: string;
}) {
  const artwork = getAnimalReferenceByName(name);

  if (!artwork) {
    return (
      <div className="flex h-full w-full items-center justify-center px-5 text-center">
        <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#756E61]">
          Reference unavailable
        </span>
      </div>
    );
  }

  const scale = artwork.scale ?? 1.22;

  return (
    <img
      src={artwork.src}
      alt={artwork.alt}
      className="h-full w-full object-contain"
      style={{
        objectPosition: artwork.objectPosition ?? "center",
        transform: `scale(${scale})`,
      }}
    />
  );
}

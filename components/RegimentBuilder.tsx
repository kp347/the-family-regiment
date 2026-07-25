"use client";

import { useEffect, useState } from "react";

type BuilderDraft = {
  familyName: string;
  initials: string;
  heritage: string;
  symbol: string;
  value: string;
  motto: string;
};

const steps = [
  {
    number: "01",
    name: "Identity",
    description: "Add the family name and monogram carried by your regiment.",
  },
  {
    number: "02",
    name: "Heritage",
    description: "Choose the place or culture that anchors your family story.",
  },
  {
    number: "03",
    name: "Symbol",
    description: "Choose the heraldic figure that leads your crest.",
  },
  {
    number: "04",
    name: "Values",
    description: "Choose the principle your family stands behind.",
  },
  {
    number: "05",
    name: "Motto",
    description: "Select the phrase carried beneath your crest.",
  },
  {
    number: "06",
    name: "Regiment",
    description: "Review the identity that will guide your jacket.",
  },
];

const heritageOptions = [
  "France",
  "United States",
  "Ireland",
  "Italy",
  "England",
  "Scotland",
  "Germany",
  "Spain",
];

const symbolOptions = [
  {
    name: "Lion",
    character: "♌",
    meaning: "Courage, leadership, and noble strength.",
  },
  {
    name: "Eagle",
    character: "◆",
    meaning: "Vision, independence, and aspiration.",
  },
  {
    name: "Stag",
    character: "♜",
    meaning: "Endurance, dignity, and guardianship.",
  },
  {
    name: "Wolf",
    character: "◇",
    meaning: "Loyalty, instinct, and family unity.",
  },
];

const valueOptions = [
  "Courage",
  "Honor",
  "Unity",
  "Legacy",
  "Resilience",
  "Service",
];

const mottoOptions: Record<string, string[]> = {
  Courage: [
    "Fortis in Familia",
    "Virtus Nos Ducit",
    "Audentes Fortuna Iuvat",
  ],
  Honor: [
    "Honore et Virtute",
    "Fides Ante Omnia",
    "Semper Cum Honore",
  ],
  Unity: [
    "Uniti Fortiores",
    "Una Familia, Una Fortitudo",
    "Concordia Vincimus",
  ],
  Legacy: [
    "Per Saecula",
    "Ad Posteros",
    "Memoria Manet",
  ],
  Resilience: [
    "Per Aspera Fortis",
    "Nunquam Fracti",
    "Fortitudo Permanet",
  ],
  Service: [
    "Servire Cum Honore",
    "Officium Ante Se",
    "Pro Familia et Aliis",
  ],
};

const defaultDraft: BuilderDraft = {
  familyName: "Laurent",
  initials: "LR",
  heritage: "France",
  symbol: "Lion",
  value: "Courage",
  motto: "Fortis in Familia",
};

export default function RegimentBuilder() {
  const [currentStep, setCurrentStep] = useState(0);
  const [familyName, setFamilyName] = useState(defaultDraft.familyName);
  const [initials, setInitials] = useState(defaultDraft.initials);
  const [heritage, setHeritage] = useState(defaultDraft.heritage);
  const [symbol, setSymbol] = useState(defaultDraft.symbol);
  const [value, setValue] = useState(defaultDraft.value);
  const [motto, setMotto] = useState(defaultDraft.motto);
  const [draftLoaded, setDraftLoaded] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  const selectedSymbol =
    symbolOptions.find((option) => option.name === symbol) ?? symbolOptions[0];

  const availableMottos = mottoOptions[value] ?? mottoOptions.Courage;

  const regimentTitle = familyName.trim()
    ? `The House of ${familyName.trim()}`
    : `The ${heritage} ${symbol}`;

  useEffect(() => {
    const savedDraft = window.localStorage.getItem("family-regiment-draft");

    if (savedDraft) {
      try {
        const parsedDraft = JSON.parse(savedDraft) as Partial<BuilderDraft>;

        setFamilyName(parsedDraft.familyName ?? defaultDraft.familyName);
        setInitials(parsedDraft.initials ?? defaultDraft.initials);
        setHeritage(parsedDraft.heritage ?? defaultDraft.heritage);
        setSymbol(parsedDraft.symbol ?? defaultDraft.symbol);
        setValue(parsedDraft.value ?? defaultDraft.value);
        setMotto(parsedDraft.motto ?? defaultDraft.motto);
      } catch {
        window.localStorage.removeItem("family-regiment-draft");
      }
    }

    setDraftLoaded(true);
  }, []);

  useEffect(() => {
    if (!draftLoaded) {
      return;
    }

    const draft: BuilderDraft = {
      familyName,
      initials,
      heritage,
      symbol,
      value,
      motto,
    };

    window.localStorage.setItem(
      "family-regiment-draft",
      JSON.stringify(draft),
    );
  }, [
    draftLoaded,
    familyName,
    initials,
    heritage,
    symbol,
    value,
    motto,
  ]);

  function chooseValue(nextValue: string) {
    setValue(nextValue);
    setMotto(mottoOptions[nextValue][0]);
  }

  function nextStep() {
    setCurrentStep((step) => Math.min(step + 1, steps.length - 1));
  }

  function previousStep() {
    setCurrentStep((step) => Math.max(step - 1, 0));
  }

  function saveDraft() {
    const draft: BuilderDraft = {
      familyName,
      initials,
      heritage,
      symbol,
      value,
      motto,
    };

    window.localStorage.setItem(
      "family-regiment-draft",
      JSON.stringify(draft),
    );

    setSaveMessage("Draft saved");

    window.setTimeout(() => {
      setSaveMessage("");
    }, 2000);
  }

  function resetDraft() {
    setFamilyName(defaultDraft.familyName);
    setInitials(defaultDraft.initials);
    setHeritage(defaultDraft.heritage);
    setSymbol(defaultDraft.symbol);
    setValue(defaultDraft.value);
    setMotto(defaultDraft.motto);
    setCurrentStep(0);
    setSaveMessage("Builder reset");

    window.localStorage.removeItem("family-regiment-draft");

    window.setTimeout(() => {
      setSaveMessage("");
    }, 2000);
  }

  return (
    <div className="min-h-screen bg-[#111213] text-[#F6F2EA]">
      <header className="border-b border-white/10 px-6 py-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6">
          <a
            href="/"
            className="text-sm font-semibold uppercase tracking-[0.22em]"
          >
            The Family Regiment
          </a>

          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={saveDraft}
              className="hidden text-xs uppercase tracking-[0.25em] text-[#B08D57] transition hover:text-[#F6F2EA] sm:block"
            >
              Save Draft
            </button>

            <a
              href="/"
              className="text-xs uppercase tracking-[0.25em] text-[#8F8B82] transition hover:text-[#B08D57]"
            >
              Exit Builder
            </a>
          </div>
        </div>
      </header>

      <main className="px-6 py-10 md:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.45em] text-[#B08D57]">
                Heritage Identity Workshop
              </p>

              <h1 className="mt-5 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
                Build your family regiment.
              </h1>

              <p className="mt-5 max-w-2xl leading-7 text-[#8F8B82]">
                Create the identity that will guide your crest, motto,
                embroidery, patches, and Regiment Jacket.
              </p>
            </div>

            <div className="flex items-center gap-5">
              {saveMessage && (
                <p className="text-xs uppercase tracking-[0.25em] text-[#B08D57]">
                  {saveMessage}
                </p>
              )}

              <button
                type="button"
                onClick={resetDraft}
                className="text-xs uppercase tracking-[0.25em] text-[#65625D] transition hover:text-[#F6F2EA]"
              >
                Reset
              </button>
            </div>
          </div>

          <div className="mb-10 grid gap-2 sm:grid-cols-2 lg:grid-cols-6">
            {steps.map((step, index) => {
              const active = index === currentStep;
              const complete = index < currentStep;

              return (
                <button
                  key={step.name}
                  type="button"
                  onClick={() => setCurrentStep(index)}
                  className={`rounded-2xl border p-4 text-left transition ${
                    active
                      ? "border-[#B08D57] bg-[#B08D57]/10"
                      : complete
                        ? "border-white/20 bg-white/[0.04]"
                        : "border-white/10 bg-white/[0.02]"
                  }`}
                >
                  <p
                    className={`text-[10px] uppercase tracking-[0.3em] ${
                      active || complete
                        ? "text-[#B08D57]"
                        : "text-[#615E58]"
                    }`}
                  >
                    {complete ? "Complete" : step.number}
                  </p>

                  <p className="mt-3 text-sm">{step.name}</p>
                </button>
              );
            })}
          </div>

          <div className="grid overflow-hidden rounded-[2rem] border border-white/10 bg-[#18191A] lg:grid-cols-[1.15fr_0.85fr]">
            <section className="min-h-[650px] p-8 md:p-12">
              <p className="text-xs uppercase tracking-[0.35em] text-[#B08D57]">
                Step {steps[currentStep].number}
              </p>

              <h2 className="mt-5 text-4xl md:text-5xl">
                {steps[currentStep].name}
              </h2>

              <p className="mt-4 max-w-xl leading-7 text-[#99958D]">
                {steps[currentStep].description}
              </p>

              <div className="mt-10">
                {currentStep === 0 && (
                  <div className="max-w-2xl space-y-8">
                    <InputField
                      id="family-name"
                      label="Family name"
                      value={familyName}
                      placeholder="Laurent"
                      maxLength={30}
                      onChange={setFamilyName}
                    />

                    <InputField
                      id="family-initials"
                      label="Regiment initials"
                      value={initials}
                      placeholder="LR"
                      maxLength={4}
                      onChange={(nextValue) =>
                        setInitials(nextValue.toUpperCase())
                      }
                    />

                    <div className="rounded-2xl border border-[#B08D57]/25 bg-[#B08D57]/5 p-6">
                      <p className="text-xs uppercase tracking-[0.3em] text-[#B08D57]">
                        Identity Preview
                      </p>

                      <p className="mt-4 text-3xl">{regimentTitle}</p>

                      <p className="mt-3 text-sm leading-6 text-[#8F8B82]">
                        Your name and initials can appear on the crest, interior
                        label, monogram patch, and family record card.
                      </p>
                    </div>
                  </div>
                )}

                {currentStep === 1 && (
                  <OptionGrid>
                    {heritageOptions.map((option) => (
                      <OptionButton
                        key={option}
                        active={heritage === option}
                        onClick={() => setHeritage(option)}
                        title={option}
                        detail="Primary heritage"
                      />
                    ))}
                  </OptionGrid>
                )}

                {currentStep === 2 && (
                  <OptionGrid>
                    {symbolOptions.map((option) => (
                      <OptionButton
                        key={option.name}
                        active={symbol === option.name}
                        onClick={() => setSymbol(option.name)}
                        title={option.name}
                        detail={option.meaning}
                        symbol={option.character}
                      />
                    ))}
                  </OptionGrid>
                )}

                {currentStep === 3 && (
                  <OptionGrid>
                    {valueOptions.map((option) => (
                      <OptionButton
                        key={option}
                        active={value === option}
                        onClick={() => chooseValue(option)}
                        title={option}
                        detail="Family principle"
                      />
                    ))}
                  </OptionGrid>
                )}

                {currentStep === 4 && (
                  <div className="space-y-4">
                    {availableMottos.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setMotto(option)}
                        className={`flex w-full items-center justify-between gap-6 rounded-2xl border p-6 text-left transition ${
                          motto === option
                            ? "border-[#B08D57] bg-[#B08D57]/10"
                            : "border-white/10 bg-white/[0.02] hover:border-white/25"
                        }`}
                      >
                        <div>
                          <p className="text-xl text-[#F6F2EA]">{option}</p>

                          <p className="mt-2 text-xs uppercase tracking-[0.25em] text-[#77736A]">
                            Latin motto
                          </p>
                        </div>

                        <span className="text-xs uppercase tracking-[0.2em] text-[#B08D57]">
                          {motto === option ? "Selected" : "Choose"}
                        </span>
                      </button>
                    ))}
                  </div>
                )}

                {currentStep === 5 && (
                  <div className="rounded-[2rem] border border-[#B08D57]/35 bg-[#20211E] p-8 md:p-10">
                    <p className="text-xs uppercase tracking-[0.35em] text-[#B08D57]">
                      Regiment Summary
                    </p>

                    <h3 className="mt-6 text-4xl">{regimentTitle}</h3>

                    <div className="mt-8 space-y-5 border-y border-white/10 py-7">
                      <SummaryRow
                        label="Family"
                        value={familyName || "Not provided"}
                      />

                      <SummaryRow
                        label="Monogram"
                        value={initials || "Not provided"}
                      />

                      <SummaryRow label="Heritage" value={heritage} />

                      <SummaryRow label="Symbol" value={symbol} />

                      <SummaryRow label="Principle" value={value} />

                      <SummaryRow label="Motto" value={motto} />
                    </div>

                    <p className="mt-7 leading-7 text-[#99958D]">
                      This identity will become the foundation for your custom
                      crest, embroidery palette, jacket placement, and chapter
                      patches.
                    </p>

                    <button
                      type="button"
                      className="mt-8 w-full rounded-full bg-[#B08D57] px-8 py-4 text-sm font-semibold uppercase tracking-widest text-[#151515] transition hover:scale-[1.01]"
                    >
                      Create My Crest
                    </button>

                    <button
                      type="button"
                      onClick={saveDraft}
                      className="mt-4 w-full rounded-full border border-white/15 px-8 py-4 text-sm font-semibold uppercase tracking-widest text-[#F6F2EA] transition hover:border-[#B08D57] hover:text-[#B08D57]"
                    >
                      Save for Later
                    </button>
                  </div>
                )}
              </div>

              <div className="mt-12 flex items-center justify-between border-t border-white/10 pt-8">
                <button
                  type="button"
                  onClick={previousStep}
                  disabled={currentStep === 0}
                  className="rounded-full border border-white/15 px-6 py-3 text-xs font-semibold uppercase tracking-widest transition hover:border-[#B08D57] disabled:cursor-not-allowed disabled:opacity-30"
                >
                  Previous
                </button>

                {currentStep < steps.length - 1 && (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="rounded-full bg-[#B08D57] px-7 py-3 text-xs font-semibold uppercase tracking-widest text-[#151515] transition hover:scale-105"
                  >
                    Continue
                  </button>
                )}
              </div>
            </section>

            <aside className="relative flex min-h-[650px] items-center justify-center overflow-hidden border-t border-white/10 bg-[#23241F] p-8 lg:border-l lg:border-t-0">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(176,141,87,0.2),_transparent_62%)]" />

              <div className="relative w-full max-w-sm text-center">
                <p className="text-xs uppercase tracking-[0.4em] text-[#B08D57]">
                  Live Identity
                </p>

                <div className="mx-auto mt-10 flex h-[390px] w-[290px] flex-col items-center overflow-hidden rounded-t-[48%] border-4 border-[#B08D57] bg-[#34382A] shadow-2xl">
                  <div className="flex h-20 w-full items-center justify-between border-b-2 border-[#B08D57] bg-[#20231C] px-7">
                    <span className="text-xs uppercase tracking-[0.28em] text-[#E7D8B4]">
                      {heritage}
                    </span>

                    <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#B08D57]">
                      {initials || "FR"}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col items-center justify-center">
                    <div className="flex h-36 w-36 items-center justify-center rounded-full border-2 border-[#B08D57] bg-[#20231C]">
                      <span className="text-7xl text-[#B08D57]">
                        {selectedSymbol.character}
                      </span>
                    </div>

                    <p className="mt-6 text-xs uppercase tracking-[0.3em] text-[#E7D8B4]">
                      {value}
                    </p>

                    <p className="mt-3 max-w-[210px] truncate text-lg text-[#F6F2EA]">
                      {familyName || "Family Name"}
                    </p>
                  </div>

                  <div className="flex h-20 w-full items-center justify-center border-t-2 border-[#B08D57] bg-[#20231C] px-5">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-[#E7D8B4]">
                      {motto}
                    </p>
                  </div>
                </div>

                <h3 className="mt-8 text-3xl">{regimentTitle}</h3>

                <p className="mt-3 text-sm leading-6 text-[#8F8B82]">
                  A family identity centered on {value.toLowerCase()},
                  continuity, and {heritage} heritage.
                </p>

                <p className="mt-5 text-[10px] uppercase tracking-[0.3em] text-[#65625D]">
                  Changes save automatically
                </p>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}

function InputField({
  id,
  label,
  value,
  placeholder,
  maxLength,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  maxLength: number;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="text-xs uppercase tracking-[0.3em] text-[#B08D57]"
      >
        {label}
      </label>

      <input
        id={id}
        type="text"
        value={value}
        maxLength={maxLength}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="mt-4 w-full border-b border-white/20 bg-transparent px-0 py-4 text-3xl text-[#F6F2EA] outline-none transition placeholder:text-[#4F4D49] focus:border-[#B08D57]"
      />

      <div className="mt-3 flex justify-between text-xs text-[#65625D]">
        <span>Used throughout your custom identity.</span>
        <span>
          {value.length}/{maxLength}
        </span>
      </div>
    </div>
  );
}

function OptionGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-4 sm:grid-cols-2">{children}</div>;
}

function OptionButton({
  active,
  onClick,
  title,
  detail,
  symbol,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  detail: string;
  symbol?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`min-h-32 rounded-2xl border p-6 text-left transition ${
        active
          ? "border-[#B08D57] bg-[#B08D57]/10"
          : "border-white/10 bg-white/[0.02] hover:border-white/25"
      }`}
    >
      {symbol && <span className="text-4xl text-[#B08D57]">{symbol}</span>}

      <p className={symbol ? "mt-5 text-xl" : "text-xl"}>{title}</p>

      <p className="mt-2 text-sm leading-6 text-[#77736A]">{detail}</p>
    </button>
  );
}

function SummaryRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start justify-between gap-8">
      <p className="text-xs uppercase tracking-[0.25em] text-[#77736A]">
        {label}
      </p>

      <p className="text-right text-[#F6F2EA]">{value}</p>
    </div>
  );
}
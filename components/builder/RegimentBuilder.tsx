"use client";
import { jacketLayout } from "@/lib/jacketLayout";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type BuilderDraft = {
  familyName: string;
  initials: string;
  heritage: string;
  symbol: string;
  value: string;
  motto: string;
  jacketView: string;
  crestPlacement: string;
  embroideryFinish: string;
  includeNameTape: boolean;
  includeSleevePatch: boolean;
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
    name: "Jacket",
    description:
      "Choose how your family identity will appear on the Regiment Jacket.",
  },
  {
    number: "07",
    name: "Regiment",
    description: "Review the identity that will guide your finished jacket.",
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
  Legacy: ["Per Saecula", "Ad Posteros", "Memoria Manet"],
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

const jacketViews = [
  {
    name: "Front",
    image: "/images/products/studio/jacket-front-clean.png",
  },
  {
    name: "Back",
    image: "/images/products/studio/jacket-back-clean.png",
  },
];

const embroideryFinishes = [
  {
    name: "Regiment Gold",
    detail: "Warm gold and ivory thread with a luxury heritage finish.",
  },
  {
    name: "Tactical Subdued",
    detail: "Olive, charcoal, and muted thread for a field-worn appearance.",
  },
  {
    name: "Heritage Ivory",
    detail: "Soft ivory lettering with restrained gold accents.",
  },
];

const defaultDraft: BuilderDraft = {
  familyName: "Laurent",
  initials: "LR",
  heritage: "France",
  symbol: "Lion",
  value: "Courage",
  motto: "Fortis in Familia",
  jacketView: "Front",
  crestPlacement: "Left Chest",
  embroideryFinish: "Regiment Gold",
  includeNameTape: true,
  includeSleevePatch: true,
};

export default function RegimentBuilder() {
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(0);
  const [familyName, setFamilyName] = useState(defaultDraft.familyName);
  const [initials, setInitials] = useState(defaultDraft.initials);
  const [heritage, setHeritage] = useState(defaultDraft.heritage);
  const [symbol, setSymbol] = useState(defaultDraft.symbol);
  const [value, setValue] = useState(defaultDraft.value);
  const [motto, setMotto] = useState(defaultDraft.motto);

  const [jacketView, setJacketView] = useState(defaultDraft.jacketView);
  const [crestPlacement, setCrestPlacement] = useState(
    defaultDraft.crestPlacement,
  );
  const [embroideryFinish, setEmbroideryFinish] = useState(
    defaultDraft.embroideryFinish,
  );
  const [includeNameTape, setIncludeNameTape] = useState(
    defaultDraft.includeNameTape,
  );
  const [includeSleevePatch, setIncludeSleevePatch] = useState(
    defaultDraft.includeSleevePatch,
  );

  const [draftLoaded, setDraftLoaded] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  const selectedSymbol =
    symbolOptions.find((option) => option.name === symbol) ?? symbolOptions[0];

  const selectedJacket =
    jacketViews.find((option) => option.name === jacketView) ?? jacketViews[0];

  const availableMottos = mottoOptions[value] ?? mottoOptions.Courage;

  const regimentTitle = familyName.trim()
    ? `The House of ${familyName.trim()}`
    : `The ${heritage} ${symbol}`;

  const finishClasses =
    embroideryFinish === "Tactical Subdued"
      ? {
          border: "border-[#777B63]",
          text: "text-[#A7AA91]",
          background: "bg-[#303429]",
        }
      : embroideryFinish === "Heritage Ivory"
        ? {
            border: "border-[#E7D8B4]",
            text: "text-[#E7D8B4]",
            background: "bg-[#24251F]",
          }
        : {
            border: "border-[#B08D57]",
            text: "text-[#B08D57]",
            background: "bg-[#20231C]",
          };

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

        setJacketView(parsedDraft.jacketView ?? defaultDraft.jacketView);
        setCrestPlacement(
          parsedDraft.crestPlacement ?? defaultDraft.crestPlacement,
        );
        setEmbroideryFinish(
          parsedDraft.embroideryFinish ?? defaultDraft.embroideryFinish,
        );
        setIncludeNameTape(
          parsedDraft.includeNameTape ?? defaultDraft.includeNameTape,
        );
        setIncludeSleevePatch(
          parsedDraft.includeSleevePatch ?? defaultDraft.includeSleevePatch,
        );
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
      jacketView,
      crestPlacement,
      embroideryFinish,
      includeNameTape,
      includeSleevePatch,
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
    jacketView,
    crestPlacement,
    embroideryFinish,
    includeNameTape,
    includeSleevePatch,
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
      jacketView,
      crestPlacement,
      embroideryFinish,
      includeNameTape,
      includeSleevePatch,
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

  function createCrest() {
    saveDraft();
    router.push("/studio");
  }

  function resetDraft() {
    setFamilyName(defaultDraft.familyName);
    setInitials(defaultDraft.initials);
    setHeritage(defaultDraft.heritage);
    setSymbol(defaultDraft.symbol);
    setValue(defaultDraft.value);
    setMotto(defaultDraft.motto);

    setJacketView(defaultDraft.jacketView);
    setCrestPlacement(defaultDraft.crestPlacement);
    setEmbroideryFinish(defaultDraft.embroideryFinish);
    setIncludeNameTape(defaultDraft.includeNameTape);
    setIncludeSleevePatch(defaultDraft.includeSleevePatch);

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

          <div className="mb-10 grid gap-2 sm:grid-cols-2 lg:grid-cols-7">
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

          <div className="grid overflow-hidden rounded-[2rem] border border-white/10 bg-[#18191A] lg:grid-cols-[1.05fr_0.95fr]">
            <section className="min-h-[720px] p-8 md:p-12">
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
                  <div className="space-y-10">
                    <BuilderGroup title="Jacket view">
                      <OptionGrid>
                        {jacketViews.map((option) => (
                          <OptionButton
                            key={option.name}
                            active={jacketView === option.name}
                            onClick={() => setJacketView(option.name)}
                            title={`${option.name} view`}
                            detail={
                              option.name === "Front"
                                ? "Preview chest and sleeve placement."
                                : "Preview the restrained rear treatment."
                            }
                          />
                        ))}
                      </OptionGrid>
                    </BuilderGroup>

                    <BuilderGroup title="Crest placement">
                      <OptionGrid>
                        {["Left Chest", "Right Chest"].map((option) => (
                          <OptionButton
                            key={option}
                            active={crestPlacement === option}
                            onClick={() => setCrestPlacement(option)}
                            title={option}
                            detail="Primary embroidered family crest."
                          />
                        ))}
                      </OptionGrid>
                    </BuilderGroup>

                    <BuilderGroup title="Embroidery finish">
                      <div className="space-y-4">
                        {embroideryFinishes.map((option) => (
                          <button
                            key={option.name}
                            type="button"
                            onClick={() =>
                              setEmbroideryFinish(option.name)
                            }
                            className={`w-full rounded-2xl border p-6 text-left transition ${
                              embroideryFinish === option.name
                                ? "border-[#B08D57] bg-[#B08D57]/10"
                                : "border-white/10 bg-white/[0.02] hover:border-white/25"
                            }`}
                          >
                            <div className="flex items-center justify-between gap-6">
                              <div>
                                <p className="text-xl">{option.name}</p>

                                <p className="mt-2 text-sm leading-6 text-[#77736A]">
                                  {option.detail}
                                </p>
                              </div>

                              <span className="text-xs uppercase tracking-[0.2em] text-[#B08D57]">
                                {embroideryFinish === option.name
                                  ? "Selected"
                                  : "Choose"}
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </BuilderGroup>

                    <BuilderGroup title="Additional patches">
                      <div className="space-y-4">
                        <ToggleOption
                          title="Family name tape"
                          detail="Displays the family name above the chest pocket."
                          active={includeNameTape}
                          onClick={() =>
                            setIncludeNameTape((current) => !current)
                          }
                        />

                        <ToggleOption
                          title="Heritage sleeve patch"
                          detail="Adds a restrained heritage identifier to the sleeve."
                          active={includeSleevePatch}
                          onClick={() =>
                            setIncludeSleevePatch((current) => !current)
                          }
                        />
                      </div>
                    </BuilderGroup>
                  </div>
                )}

                {currentStep === 6 && (
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

                      <SummaryRow
                        label="Crest placement"
                        value={crestPlacement}
                      />

                      <SummaryRow
                        label="Embroidery"
                        value={embroideryFinish}
                      />

                      <SummaryRow
                        label="Name tape"
                        value={includeNameTape ? "Included" : "Not included"}
                      />

                      <SummaryRow
                        label="Sleeve patch"
                        value={
                          includeSleevePatch ? "Included" : "Not included"
                        }
                      />
                    </div>

                    <p className="mt-7 leading-7 text-[#99958D]">
                      This identity will become the foundation for your custom
                      crest, embroidery palette, jacket placement, and chapter
                      patches.
                    </p>

                    <button
                      type="button"
                      onClick={createCrest}
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

            <aside className="relative min-h-[720px] overflow-hidden border-t border-white/10 bg-[#20211E] lg:border-l lg:border-t-0">
              <div className="sticky top-0 flex min-h-[720px] items-center justify-center p-6 md:p-10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(176,141,87,0.18),_transparent_65%)]" />

                <div className="relative w-full">
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.4em] text-[#B08D57]">
                        Live Jacket Preview
                      </p>

                      <p className="mt-2 text-sm text-[#77736A]">
                        {jacketView} view · {embroideryFinish}
                      </p>
                    </div>

                    <span className="rounded-full border border-white/10 px-4 py-2 text-[10px] uppercase tracking-[0.25em] text-[#8F8B82]">
                      Preview
                    </span>
                  </div>

                  <div className="relative mx-auto aspect-[4/5] w-full max-w-[540px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#181916]">
                    <Image
                      src={selectedJacket.image}
                      alt={`${jacketView} view of the customized Regiment Jacket`}
                      fill
                      priority
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 45vw"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10" />

                    {jacketView === "Front" && (
  <>
    {includeNameTape && (
      <div
        style={{
          left: jacketLayout.nameTape.left,
          top: jacketLayout.nameTape.top,
        }}
        className={`absolute rounded-sm border px-3 py-1.5 shadow-xl ${finishClasses.border} ${finishClasses.background}`}
      >
        <p
          className={`max-w-[120px] truncate text-[9px] font-bold uppercase tracking-[0.14em] ${finishClasses.text}`}
        >
          {familyName || "Family"}
        </p>
      </div>
    )}

    <div
      className={`absolute top-[34%] flex h-[90px] w-[74px] flex-col items-center justify-center rounded-t-[45%] border-[3px] shadow-2xl ${
        crestPlacement === "Left Chest"
          ? "right-[30%]"
          : "left-[24%]"
      } ${finishClasses.border} ${finishClasses.background}`}
    >
                        
                          <span
                            className={`text-3xl ${finishClasses.text}`}
                          >
                            {selectedSymbol.character}
                          </span>

                          <span
                            className={`mt-1 text-[7px] font-bold uppercase tracking-[0.12em] ${finishClasses.text}`}
                          >
                            {initials || "FR"}
                          </span>
                        </div>

                        {includeSleevePatch && (
                          <div
                            className={`absolute right-[16%] top-[23%] flex h-14 w-14 items-center justify-center rounded-full border-2 shadow-xl ${finishClasses.border} ${finishClasses.background}`}
                          >
                            <span
                              className={`text-[9px] font-bold uppercase tracking-[0.12em] ${finishClasses.text}`}
                            >
                              {heritage.slice(0, 2)}
                            </span>
                          </div>
                        )}
                      </>
                    )}

                    {jacketView === "Back" && (
                      <div className="absolute left-1/2 top-[19%] -translate-x-1/2 text-center">
                        <div
                          className={`mx-auto flex h-12 min-w-40 items-center justify-center rounded-full border-2 px-5 shadow-xl ${finishClasses.border} ${finishClasses.background}`}
                        >
                          <p
                            className={`text-[9px] font-bold uppercase tracking-[0.2em] ${finishClasses.text}`}
                          >
                            {motto}
                          </p>
                        </div>

                        <div
                          className={`mx-auto mt-3 flex h-16 w-14 items-center justify-center rounded-t-[45%] border-2 shadow-xl ${finishClasses.border} ${finishClasses.background}`}
                        >
                          <span
                            className={`text-xl ${finishClasses.text}`}
                          >
                            {selectedSymbol.character}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between rounded-2xl border border-white/10 bg-black/40 px-5 py-4 backdrop-blur-md">
                      <div>
                        <p className="text-[9px] uppercase tracking-[0.3em] text-[#B08D57]">
                          Regiment Identity
                        </p>

                        <p className="mt-2 text-lg">
                          {familyName || "Family"}
                        </p>
                      </div>

                      <p className="text-xs uppercase tracking-[0.18em] text-[#D7D1C5]">
                        {initials || "FR"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-3 gap-3">
                    <PreviewStat label="Heritage" value={heritage} />
                    <PreviewStat label="Symbol" value={symbol} />
                    <PreviewStat label="Principle" value={value} />
                  </div>

                  <p className="mt-6 text-center text-[10px] uppercase tracking-[0.3em] text-[#65625D]">
                    Concept preview · Final placement refined for production
                  </p>
                </div>
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

function BuilderGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-5 text-xs uppercase tracking-[0.32em] text-[#B08D57]">
        {title}
      </p>

      {children}
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

function ToggleOption({
  title,
  detail,
  active,
  onClick,
}: {
  title: string;
  detail: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center justify-between gap-6 rounded-2xl border p-6 text-left transition ${
        active
          ? "border-[#B08D57] bg-[#B08D57]/10"
          : "border-white/10 bg-white/[0.02] hover:border-white/25"
      }`}
    >
      <div>
        <p className="text-lg">{title}</p>

        <p className="mt-2 text-sm leading-6 text-[#77736A]">{detail}</p>
      </div>

      <span
        className={`relative h-7 w-12 shrink-0 rounded-full transition ${
          active ? "bg-[#B08D57]" : "bg-white/10"
        }`}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-[#F6F2EA] transition ${
            active ? "left-6" : "left-1"
          }`}
        />
      </span>
    </button>
  );
}

function PreviewStat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.025] p-4">
      <p className="text-[8px] uppercase tracking-[0.25em] text-[#65625D]">
        {label}
      </p>

      <p className="mt-2 truncate text-xs text-[#D8D3CA]">{value}</p>
    </div>
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
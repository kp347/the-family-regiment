"use client";

import Link from "next/link";
import {
  useEffect,
  useMemo,
  useState,
} from "react";

import M65JacketPreview, {
  type JacketPatchZone,
  type JacketView,
} from "@/components/studio/M65JacketPreview";

import {
  builderShieldStyles,
  crestAnimals,
  crestCrowns,
  isBuilderShieldStyle,
  isCrestAnimal,
  isCrestCrown,
  normalizeBuilderCrestSpec,
  type BuilderCrestSpec,
  type BuilderEmbroideryFinish,
  type BuilderShieldStyle,
  type CrestAnimal,
  type CrestCrown,
} from "@/lib/herald/types";

type LegacyBuilderDraft = {
  familyName?: string;
  initials?: string;
  heritage?: string;
  symbol?: string;
  animal?: string;
  shield?: string;
  crown?: string;
  value?: string;
  motto?: string;
  embroideryFinish?: string;
  crest?: Partial<BuilderCrestSpec>;
};

type StudioDraft = {
  familyName: string;
  initials: string;
  heritage: string;
  value: string;
  motto: string;

  animal: CrestAnimal;
  shield: BuilderShieldStyle;
  crown: CrestCrown;

  banner: boolean;
  wreath: boolean;

  crestScale: number;
  crestX: number;
  crestY: number;
  crestRotation: number;

  palette: BuilderEmbroideryFinish;

  jacketView: JacketView;
  selectedZone: JacketPatchZone;
};

type StudioStep = {
  number: string;
  title: string;
  description: string;
};

type PaletteDetails = {
  panel: string;
  border: string;
  accent: string;
  softAccent: string;
  label: string;
  primary: string;
  secondary: string;
  metallic: "gold" | "silver";
};

const defaultDraft: StudioDraft = {
  familyName: "Laurent",
  initials: "LR",
  heritage: "France",
  value: "Courage",
  motto: "Fortis in Familia",

  animal: "Lion",
  shield: "Heater Shield",
  crown: "Ducal",

  banner: true,
  wreath: false,

  crestScale: 100,
  crestX: 0,
  crestY: 0,
  crestRotation: 0,

  palette: "Regiment Gold",

  jacketView: "front",
  selectedZone: "left-chest",
};

const paletteClasses: Record<
  BuilderEmbroideryFinish,
  PaletteDetails
> = {
  "Regiment Gold": {
    panel: "bg-[#20231C]",
    border: "border-[#B08D57]",
    accent: "#B08D57",
    softAccent: "rgba(176, 141, 87, 0.18)",
    label: "Ceremonial",
    primary: "#1F2A1F",
    secondary: "#E8D7AE",
    metallic: "gold",
  },

  "Tactical Subdued": {
    panel: "bg-[#303429]",
    border: "border-[#777B63]",
    accent: "#777B63",
    softAccent: "rgba(119, 123, 99, 0.18)",
    label: "Field",
    primary: "#303429",
    secondary: "#A7AA91",
    metallic: "silver",
  },

  "Heritage Ivory": {
    panel: "bg-[#24251F]",
    border: "border-[#E7D8B4]",
    accent: "#E7D8B4",
    softAccent: "rgba(231, 216, 180, 0.16)",
    label: "Archive",
    primary: "#24251F",
    secondary: "#E7D8B4",
    metallic: "gold",
  },
};

const studioSteps: StudioStep[] = [
  {
    number: "01",
    title: "Your House",
    description: "Name, heritage, values, and identity.",
  },
  {
    number: "02",
    title: "Heraldry",
    description: "Animal, shield, crown, and motto.",
  },
  {
    number: "03",
    title: "The Jacket",
    description: "Placement, finish, and production.",
  },
];

export default function CrestStudio() {
  const [draft, setDraft] =
    useState<StudioDraft>(defaultDraft);

  const [loaded, setLoaded] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const savedBuilderDraft =
      window.localStorage.getItem(
        "family-regiment-draft",
      );

    const savedStudioDraft =
      window.localStorage.getItem(
        "family-regiment-studio",
      );

    try {
      const parsedBuilder = savedBuilderDraft
        ? (JSON.parse(
            savedBuilderDraft,
          ) as LegacyBuilderDraft)
        : {};

      const parsedStudio = savedStudioDraft
        ? (JSON.parse(
            savedStudioDraft,
          ) as Partial<StudioDraft>)
        : {};

      const builderAnimal =
        resolveAnimal(
          parsedBuilder.crest?.animal,
          parsedBuilder.animal,
          parsedBuilder.symbol,
        );

      const studioAnimal = resolveAnimal(
        parsedStudio.animal,
      );

      const builderShield = resolveShield(
        parsedBuilder.crest?.shield,
        parsedBuilder.shield,
      );

      const studioShield = resolveShield(
        parsedStudio.shield,
      );

      const builderCrown = resolveCrown(
        parsedBuilder.crest?.crown,
        parsedBuilder.crown,
      );

      const studioCrown = resolveCrown(
        parsedStudio.crown,
      );

      const builderFinish =
        resolvePalette(
          parsedBuilder.embroideryFinish,
        );

      const studioFinish = resolvePalette(
        parsedStudio.palette,
      );

      const jacketView = resolveJacketView(
        parsedStudio.jacketView,
      );

      const selectedZone = resolvePatchZone(
        parsedStudio.selectedZone,
      );

      setDraft({
        ...defaultDraft,
        ...parsedStudio,

        familyName:
          parsedBuilder.familyName ??
          parsedStudio.familyName ??
          defaultDraft.familyName,

        initials:
          parsedBuilder.initials ??
          parsedBuilder.crest?.initials ??
          parsedStudio.initials ??
          defaultDraft.initials,

        heritage:
          parsedBuilder.heritage ??
          parsedBuilder.crest?.heritage ??
          parsedStudio.heritage ??
          defaultDraft.heritage,

        value:
          parsedBuilder.value ??
          parsedStudio.value ??
          defaultDraft.value,

        motto:
          parsedBuilder.motto ??
          parsedBuilder.crest?.motto ??
          parsedStudio.motto ??
          defaultDraft.motto,

        animal:
          builderAnimal ??
          studioAnimal ??
          defaultDraft.animal,

        shield:
          builderShield ??
          studioShield ??
          defaultDraft.shield,

        crown:
          builderCrown ??
          studioCrown ??
          defaultDraft.crown,

        banner:
          parsedBuilder.crest?.banner ??
          parsedStudio.banner ??
          defaultDraft.banner,

        wreath:
          parsedBuilder.crest?.wreath ??
          parsedStudio.wreath ??
          defaultDraft.wreath,

        palette:
          builderFinish ??
          studioFinish ??
          defaultDraft.palette,

        jacketView:
          jacketView ??
          defaultDraft.jacketView,

        selectedZone:
          selectedZone ??
          defaultDraft.selectedZone,
      });
    } catch {
      window.localStorage.removeItem(
        "family-regiment-studio",
      );
    }

    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) {
      return;
    }

    window.localStorage.setItem(
      "family-regiment-studio",
      JSON.stringify(draft),
    );
  }, [draft, loaded]);

  const familyName =
    draft.familyName.trim() || "Family";

  const heritage =
    draft.heritage.trim() || "Heritage";

  const initials =
    draft.initials.trim() ||
    createInitials(familyName);

  const palette =
    paletteClasses[draft.palette];

  const crestSpec = useMemo(
    () =>
      normalizeBuilderCrestSpec({
        animal: draft.animal,
        shield: draft.shield,
        crown: draft.crown,
        heritage,
        motto: draft.motto,
        initials,

        colors: {
          primary: palette.primary,
          secondary: palette.secondary,
          metallic: palette.metallic,
        },

        supporters: [],
        wreath: draft.wreath,
        banner: draft.banner,
      }),
    [
      draft.animal,
      draft.shield,
      draft.crown,
      draft.motto,
      draft.wreath,
      draft.banner,
      heritage,
      initials,
      palette.primary,
      palette.secondary,
      palette.metallic,
    ],
  );

  function update<K extends keyof StudioDraft>(
    key: K,
    value: StudioDraft[K],
  ) {
    setDraft((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function showMessage(nextMessage: string) {
    setMessage(nextMessage);

    window.setTimeout(() => {
      setMessage("");
    }, 1800);
  }

  function saveStudio() {
    window.localStorage.setItem(
      "family-regiment-studio",
      JSON.stringify(draft),
    );

    showMessage("House saved");
  }

  function resetPlacement() {
    setDraft((current) => ({
      ...current,
      crestScale: 100,
      crestX: 0,
      crestY: 0,
      crestRotation: 0,
    }));

    showMessage("Placement reset");
  }

  function handleJacketViewChange(
    view: JacketView,
  ) {
    setDraft((current) => {
      const nextSelectedZone =
        view === "back"
          ? "back"
          : current.selectedZone === "back"
            ? "left-chest"
            : current.selectedZone;

      return {
        ...current,
        jacketView: view,
        selectedZone: nextSelectedZone,
      };
    });
  }

  function handleZoneChange(
    zone: JacketPatchZone,
  ) {
    setDraft((current) => ({
      ...current,
      selectedZone: zone,
      jacketView:
        zone === "back"
          ? "back"
          : current.jacketView,
    }));
  }

  if (!loaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#1F2A20] text-[#F5F1E8]">
        <div className="text-center">
          <p className="font-serif text-3xl">
            The Family Regiment
          </p>

          <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#B08D57]">
            Opening the Family Studio
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#E9E1D2] text-[#1E1E1E]">
      <header className="border-b border-[#F5F1E8]/10 bg-[#1F2A20] text-[#F5F1E8]">
        <div className="mx-auto flex min-h-20 max-w-[1600px] items-center justify-between gap-6 px-5 md:px-8">
          <Link href="/" className="group">
            <p className="font-serif text-lg font-semibold uppercase tracking-[0.1em] md:text-xl">
              The Family Regiment
            </p>

            <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.24em] text-[#B08D57]">
              Modern Heraldry
            </p>
          </Link>

          <div className="flex items-center gap-4 md:gap-7">
            {message && (
              <span className="hidden text-[10px] font-bold uppercase tracking-[0.22em] text-[#B08D57] sm:inline">
                {message}
              </span>
            )}

            <button
              type="button"
              onClick={saveStudio}
              className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#E9E1D2] transition hover:text-[#B08D57]"
            >
              Save House
            </button>

            <Link
              href="/builder"
              className="border border-[#B08D57] px-4 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#B08D57] transition hover:bg-[#B08D57] hover:text-[#1E1E1E]"
            >
              Edit Identity
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden bg-[#1F2A20] text-[#F5F1E8]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_15%,rgba(176,141,87,0.22),transparent_32%)]" />

          <div className="relative mx-auto max-w-[1600px] px-5 py-14 md:px-8 md:py-20">
            <div className="grid gap-10 xl:grid-cols-[minmax(0,1.25fr)_minmax(360px,0.75fr)] xl:items-end">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#B08D57]">
                  The Family Studio
                </p>

                <h1 className="mt-5 max-w-4xl font-serif text-5xl font-semibold leading-[0.92] tracking-[-0.035em] md:text-7xl xl:text-[88px]">
                  Welcome to the House of{" "}
                  {familyName}.
                </h1>

                <p className="mt-7 max-w-2xl text-base leading-8 text-[#E9E1D2]/70 md:text-lg">
                  Every family carries a story. Here,
                  that story becomes a symbol designed
                  to be worn, preserved, and passed
                  forward.
                </p>
              </div>

              <div className="border-l border-[#F5F1E8]/15 pl-6 md:pl-8">
                <p className="font-serif text-2xl italic text-[#E9E1D2]">
                  “
                  {draft.motto.trim() ||
                    "Fortis in Familia"}
                  ”
                </p>

                <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.25em] text-[#B08D57]">
                  House Motto
                </p>

                <div className="mt-8 grid grid-cols-3 gap-3">
                  {studioSteps.map((step) => (
                    <div
                      key={step.number}
                      className="border-t border-[#F5F1E8]/15 pt-4"
                    >
                      <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#B08D57]">
                        {step.number}
                      </p>

                      <p className="mt-2 text-sm font-semibold">
                        {step.title}
                      </p>

                      <p className="mt-2 hidden text-xs leading-5 text-[#E9E1D2]/50 md:block">
                        {step.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1600px] px-5 py-8 md:px-8 md:py-12">
          <div className="grid gap-6 xl:grid-cols-[340px_minmax(0,1fr)_340px]">
            <aside className="border border-[#2E3B2D]/15 bg-[#F5F1E8] shadow-[0_20px_55px_rgba(30,30,30,0.07)]">
              <PanelHeader
                number="01"
                eyebrow="The House"
                title="Define your identity"
                description="Refine the details that give the crest its meaning."
              />

              <div className="space-y-6 px-6 pb-7">
                <StudioInput
                  label="Family Name"
                  value={draft.familyName}
                  onChange={(value) =>
                    update("familyName", value)
                  }
                />

                <StudioInput
                  label="Initials"
                  value={draft.initials}
                  maxLength={5}
                  onChange={(value) =>
                    update(
                      "initials",
                      value.toUpperCase(),
                    )
                  }
                />

                <StudioInput
                  label="Heritage"
                  value={draft.heritage}
                  onChange={(value) =>
                    update("heritage", value)
                  }
                />

                <StudioInput
                  label="Family Principle"
                  value={draft.value}
                  onChange={(value) =>
                    update("value", value)
                  }
                />

                <StudioInput
                  label="House Motto"
                  value={draft.motto}
                  maxLength={48}
                  onChange={(value) =>
                    update("motto", value)
                  }
                />
              </div>

              <div className="border-t border-[#2E3B2D]/15 bg-[#E9E1D2]/55 p-6">
                <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#B08D57]">
                  The Regimental Herald
                </p>

                <p className="mt-4 font-serif text-2xl leading-7 text-[#1F2A20]">
                  Your house begins with the story
                  behind its name.
                </p>

                <p className="mt-4 text-sm leading-6 text-[#6A685F]">
                  The guided family interview will
                  develop these details into heraldic
                  recommendations, symbolic meaning,
                  and motto language.
                </p>

                <button
                  type="button"
                  disabled
                  className="mt-5 w-full cursor-not-allowed border border-[#2E3B2D]/20 px-4 py-3 text-[9px] font-bold uppercase tracking-[0.2em] text-[#2E3B2D]/45"
                >
                  Guided Interview Coming Next
                </button>
              </div>
            </aside>

            <section className="overflow-hidden border border-[#2E3B2D]/15 bg-[#F5F1E8] shadow-[0_24px_65px_rgba(30,30,30,0.1)]">
              <div className="flex flex-col gap-5 border-b border-[#2E3B2D]/15 px-6 py-6 sm:flex-row sm:items-center sm:justify-between md:px-8">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#B08D57]">
                    Jacket Configurator
                  </p>

                  <h2 className="mt-2 font-serif text-3xl font-semibold text-[#1F2A20]">
                    The House of {familyName}
                  </h2>

                  <p className="mt-2 text-sm text-[#6A685F]">
                    {crestSpec.animal} ·{" "}
                    {crestSpec.shield} ·{" "}
                    {crestSpec.crown}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={resetPlacement}
                  className="self-start border border-[#2E3B2D]/20 px-4 py-3 text-[9px] font-bold uppercase tracking-[0.2em] text-[#2E3B2D] transition hover:border-[#B08D57] hover:text-[#B08D57]"
                >
                  Reset Placement
                </button>
              </div>

              <M65JacketPreview
                crest={crestSpec}
                familyName={familyName}
                initials={initials}
                view={draft.jacketView}
                selectedZone={draft.selectedZone}
                crestScale={draft.crestScale}
                crestX={draft.crestX}
                crestY={draft.crestY}
                crestRotation={draft.crestRotation}
                onViewChange={handleJacketViewChange}
                onZoneChange={handleZoneChange}
              />
            </section>

            <aside className="border border-[#2E3B2D]/15 bg-[#F5F1E8] shadow-[0_20px_55px_rgba(30,30,30,0.07)]">
              <PanelHeader
                number="02"
                eyebrow="Heraldry"
                title="Shape the crest"
                description="Choose its central animal, shield tradition, crown, and material finish."
              />

              <div className="space-y-6 px-6">
                <StudioSelect
                  label="Primary Animal"
                  value={draft.animal}
                  options={crestAnimals}
                  onChange={(value) =>
                    update("animal", value)
                  }
                />

                <StudioSelect
                  label="Shield Style"
                  value={draft.shield}
                  options={builderShieldStyles}
                  onChange={(value) =>
                    update("shield", value)
                  }
                />

                <StudioSelect
                  label="Crown Style"
                  value={draft.crown}
                  options={crestCrowns}
                  onChange={(value) =>
                    update("crown", value)
                  }
                />

                <ToggleControl
                  label="Motto Banner"
                  description="Display the house motto beneath the shield."
                  checked={draft.banner}
                  onChange={(checked) =>
                    update("banner", checked)
                  }
                />

                <ToggleControl
                  label="Laurel Wreath"
                  description="Add a ceremonial wreath around the shield."
                  checked={draft.wreath}
                  onChange={(checked) =>
                    update("wreath", checked)
                  }
                />
              </div>

              <div className="mt-8 border-t border-[#2E3B2D]/15 px-6 pt-7">
                <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#B08D57]">
                  Jacket Placement
                </p>

                <p className="mt-3 text-xs leading-5 text-[#6A685F]">
                  Click a highlighted area on the
                  jacket, then refine the crest
                  position below.
                </p>

                <div className="mt-5 space-y-6">
                  <RangeControl
                    label="Scale"
                    value={draft.crestScale}
                    min={70}
                    max={125}
                    suffix="%"
                    onChange={(value) =>
                      update("crestScale", value)
                    }
                  />

                  <RangeControl
                    label="Horizontal"
                    value={draft.crestX}
                    min={-140}
                    max={140}
                    suffix="px"
                    onChange={(value) =>
                      update("crestX", value)
                    }
                  />

                  <RangeControl
                    label="Vertical"
                    value={draft.crestY}
                    min={-120}
                    max={120}
                    suffix="px"
                    onChange={(value) =>
                      update("crestY", value)
                    }
                  />

                  <RangeControl
                    label="Rotation"
                    value={draft.crestRotation}
                    min={-12}
                    max={12}
                    suffix="°"
                    onChange={(value) =>
                      update(
                        "crestRotation",
                        value,
                      )
                    }
                  />
                </div>
              </div>

              <div className="mt-8 border-t border-[#2E3B2D]/15 px-6 pt-7">
                <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#B08D57]">
                  Craft Finish
                </p>

                <div className="mt-4 space-y-3">
                  {(
                    Object.keys(
                      paletteClasses,
                    ) as BuilderEmbroideryFinish[]
                  ).map((option) => {
                    const optionDetails =
                      paletteClasses[option];

                    const active =
                      draft.palette === option;

                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() =>
                          update(
                            "palette",
                            option,
                          )
                        }
                        className={`w-full border p-4 text-left transition ${
                          active
                            ? "border-[#B08D57] bg-[#B08D57]/10"
                            : "border-[#2E3B2D]/15 bg-white/45 hover:border-[#B08D57]/55"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <span className="text-sm font-semibold text-[#1F2A20]">
                              {option}
                            </span>

                            <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.18em] text-[#6A685F]">
                              {
                                optionDetails.label
                              }
                            </p>
                          </div>

                          <span
                            className="h-5 w-5 rounded-full border border-[#1E1E1E]/15"
                            style={{
                              backgroundColor:
                                optionDetails.accent,

                              boxShadow: active
                                ? `0 0 0 5px ${optionDetails.softAccent}`
                                : "none",
                            }}
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-8 border-t border-[#2E3B2D]/15 p-6">
                <button
                  type="button"
                  onClick={saveStudio}
                  className="w-full border border-[#B08D57] bg-[#B08D57] px-5 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#1E1E1E] transition hover:bg-transparent hover:text-[#B08D57]"
                >
                  Save Jacket Design
                </button>

                <Link
                  href="/patches"
                  onClick={saveStudio}
                  className="mt-3 flex w-full items-center justify-center border border-[#2E3B2D] px-5 py-4 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-[#2E3B2D] transition hover:bg-[#2E3B2D] hover:text-[#F5F1E8]"
                >
                  Continue to Patch Preview
                </Link>

                <div className="mt-5 border-l-2 border-[#B08D57] bg-[#E9E1D2]/65 p-4">
                  <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#B08D57]">
                    Production Standard
                  </p>

                  <p className="mt-3 text-xs leading-5 text-[#6A685F]">
                    Final embroidery requires vendor
                    digitization, thread mapping, seam
                    clearance, and approval of a
                    physical stitch sample.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>
    </div>
  );
}

function PanelHeader({
  number,
  eyebrow,
  title,
  description,
}: {
  number: string;
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between gap-4">
        <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#B08D57]">
          {eyebrow}
        </p>

        <span className="font-serif text-lg text-[#B08D57]">
          {number}
        </span>
      </div>

      <h2 className="mt-4 font-serif text-3xl font-semibold leading-none text-[#1F2A20]">
        {title}
      </h2>

      <p className="mt-3 text-sm leading-6 text-[#6A685F]">
        {description}
      </p>
    </div>
  );
}

function StudioInput({
  label,
  value,
  onChange,
  maxLength = 40,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
}) {
  return (
    <label className="block">
      <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#6A685F]">
        {label}
      </span>

      <input
        type="text"
        value={value}
        maxLength={maxLength}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="mt-2 w-full border-0 border-b border-[#2E3B2D]/20 bg-transparent px-0 py-3 font-serif text-xl text-[#1F2A20] outline-none transition placeholder:text-[#6A685F]/40 focus:border-[#B08D57]"
      />
    </label>
  );
}

function StudioSelect<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: readonly T[];
  onChange: (value: T) => void;
}) {
  return (
    <label className="block">
      <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#6A685F]">
        {label}
      </span>

      <div className="relative mt-2">
        <select
          value={value}
          onChange={(event) =>
            onChange(event.target.value as T)
          }
          className="w-full appearance-none border border-[#2E3B2D]/20 bg-[#FFFDF7] px-4 py-4 pr-10 font-serif text-lg text-[#1F2A20] outline-none transition focus:border-[#B08D57]"
        >
          {options.map((option) => (
            <option
              key={option}
              value={option}
            >
              {option}
            </option>
          ))}
        </select>

        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#B08D57]">
          ▼
        </span>
      </div>
    </label>
  );
}

function ToggleControl({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-start justify-between gap-5 border border-[#2E3B2D]/15 bg-[#FFFDF7]/70 p-4">
      <span>
        <span className="block text-sm font-semibold text-[#1F2A20]">
          {label}
        </span>

        <span className="mt-1 block text-xs leading-5 text-[#6A685F]">
          {description}
        </span>
      </span>

      <span className="relative mt-1 inline-flex">
        <input
          type="checkbox"
          checked={checked}
          onChange={(event) =>
            onChange(event.target.checked)
          }
          className="peer sr-only"
        />

        <span className="h-6 w-11 rounded-full bg-[#CFC8B9] transition peer-checked:bg-[#B08D57]" />

        <span className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow-sm transition peer-checked:translate-x-5" />
      </span>
    </label>
  );
}

function RangeControl({
  label,
  value,
  min,
  max,
  suffix,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  suffix: string;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block">
      <div className="mb-3 flex items-center justify-between gap-4">
        <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#6A685F]">
          {label}
        </span>

        <span className="font-serif text-lg text-[#B08D57]">
          {value}
          {suffix}
        </span>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) =>
          onChange(
            Number(event.target.value),
          )
        }
        className="w-full accent-[#B08D57]"
      />
    </label>
  );
}

function resolveAnimal(
  ...values: Array<string | undefined>
): CrestAnimal | undefined {
  for (const value of values) {
    if (value && isCrestAnimal(value)) {
      return value;
    }
  }

  return undefined;
}

function resolveShield(
  ...values: Array<string | undefined>
): BuilderShieldStyle | undefined {
  for (const value of values) {
    if (
      value &&
      isBuilderShieldStyle(value)
    ) {
      return value;
    }
  }

  return undefined;
}

function resolveCrown(
  ...values: Array<string | undefined>
): CrestCrown | undefined {
  for (const value of values) {
    if (value && isCrestCrown(value)) {
      return value;
    }
  }

  return undefined;
}

function resolvePalette(
  value: string | undefined,
): BuilderEmbroideryFinish | undefined {
  if (
    value === "Regiment Gold" ||
    value === "regiment-gold"
  ) {
    return "Regiment Gold";
  }

  if (
    value === "Heritage Ivory" ||
    value === "heritage-ivory"
  ) {
    return "Heritage Ivory";
  }

  if (
    value === "Tactical Subdued" ||
    value === "tactical-subdued"
  ) {
    return "Tactical Subdued";
  }

  return undefined;
}

function resolveJacketView(
  value: string | undefined,
): JacketView | undefined {
  if (
    value === "front" ||
    value === "back"
  ) {
    return value;
  }

  return undefined;
}

function resolvePatchZone(
  value: string | undefined,
): JacketPatchZone | undefined {
  if (
    value === "left-chest" ||
    value === "right-chest" ||
    value === "left-sleeve" ||
    value === "right-sleeve" ||
    value === "back"
  ) {
    return value;
  }

  return undefined;
}

function createInitials(
  familyName: string,
): string {
  const words = familyName
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (words.length === 0) {
    return "FR";
  }

  if (words.length === 1) {
    return words[0]
      .slice(0, 2)
      .toUpperCase();
  }

  return words
    .slice(0, 3)
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();
}
"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { createCrestSvg } from "@/lib/crest";

type BuilderDraft = {
  familyName: string;
  initials: string;
  heritage: string;
  symbol: string;
  value: string;
  motto: string;

  embroideryFinish?: string;
};

type StudioDraft = BuilderDraft & {
  crestScale: number;
  crestX: number;
  crestY: number;
  crestRotation: number;
  palette: "Regiment Gold" | "Tactical Subdued" | "Heritage Ivory";
};

const defaultDraft: StudioDraft = {
  familyName: "Laurent",
  initials: "LR",
  heritage: "France",
  symbol: "Lion",
  value: "Courage",
  motto: "Fortis in Familia",
  crestScale: 100,
  crestX: 0,
  crestY: 0,
  crestRotation: 0,
  palette: "Regiment Gold",
};

const symbolCharacters: Record<string, string> = {
  Lion: "♌",
  Eagle: "◆",
  Stag: "♜",
  Wolf: "◇",
};

const heritageCodes: Record<string, string> = {
  France: "FR",
  "United States": "US",
  Ireland: "IE",
  Italy: "IT",
  England: "EN",
  Scotland: "SC",
  Germany: "DE",
  Spain: "ES",
};

const paletteClasses = {
  "Regiment Gold": {
    panel: "bg-[#20231C]",
    border: "border-[#B08D57]",
    text: "text-[#B08D57]",
    accent: "#B08D57",
  },
  "Tactical Subdued": {
    panel: "bg-[#303429]",
    border: "border-[#777B63]",
    text: "text-[#A7AA91]",
    accent: "#777B63",
  },
  "Heritage Ivory": {
    panel: "bg-[#24251F]",
    border: "border-[#E7D8B4]",
    text: "text-[#E7D8B4]",
    accent: "#E7D8B4",
  },
} as const;

export default function CrestStudio() {
  const [draft, setDraft] = useState<StudioDraft>(defaultDraft);
  const [loaded, setLoaded] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const savedDraft = window.localStorage.getItem("family-regiment-draft");
    const savedStudio = window.localStorage.getItem("family-regiment-studio");

    try {
      const parsedBuilder = savedDraft
        ? (JSON.parse(savedDraft) as Partial<BuilderDraft>)
        : {};

      const parsedStudio = savedStudio
        ? (JSON.parse(savedStudio) as Partial<StudioDraft>)
        : {};

      setDraft({
  ...defaultDraft,
  ...parsedStudio,

  familyName:
    parsedBuilder.familyName ??
    parsedStudio.familyName ??
    defaultDraft.familyName,

  initials:
    parsedBuilder.initials ??
    parsedStudio.initials ??
    defaultDraft.initials,

  heritage:
    parsedBuilder.heritage ??
    parsedStudio.heritage ??
    defaultDraft.heritage,

  symbol:
    parsedBuilder.symbol ??
    parsedStudio.symbol ??
    defaultDraft.symbol,

  value:
    parsedBuilder.value ??
    parsedStudio.value ??
    defaultDraft.value,

  motto:
    parsedBuilder.motto ??
    parsedStudio.motto ??
    defaultDraft.motto,

  palette:
    parsedBuilder.embroideryFinish === "Tactical Subdued"
      ? "Tactical Subdued"
      : parsedBuilder.embroideryFinish === "Heritage Ivory"
        ? "Heritage Ivory"
        : parsedStudio.palette ?? defaultDraft.palette,
});
    } catch {
      window.localStorage.removeItem("family-regiment-studio");
    }

    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;

    window.localStorage.setItem(
      "family-regiment-studio",
      JSON.stringify(draft),
    );
  }, [draft, loaded]);

  const symbolCharacter =
    symbolCharacters[draft.symbol] ?? symbolCharacters.Lion;

  const heritageCode =
    heritageCodes[draft.heritage] ??
    draft.heritage.slice(0, 2).toUpperCase();

  const familyName = draft.familyName.trim() || "Family";
  const initials = draft.initials.trim() || heritageCode;

  const svgMarkup = useMemo(() => {
    return createCrestSvg({
      familyName,
      initials,
      heritage: draft.heritage,
      symbol: symbolCharacter,
      value: draft.value,
      motto: draft.motto,
    });
  }, [
    familyName,
    initials,
    heritageCode,
    draft.heritage,
    symbolCharacter,
    draft.value,
    draft.motto,
  ]);

  const palette = paletteClasses[draft.palette];

  function update<K extends keyof StudioDraft>(
    key: K,
    value: StudioDraft[K],
  ) {
    setDraft((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function saveStudio() {
    window.localStorage.setItem(
      "family-regiment-studio",
      JSON.stringify(draft),
    );

    setMessage("Studio saved");

    window.setTimeout(() => {
      setMessage("");
    }, 1800);
  }

  function resetPlacement() {
    setDraft((current) => ({
      ...current,
      crestScale: 100,
      crestX: 0,
      crestY: 0,
      crestRotation: 0,
    }));
  }

  function downloadCrest() {
    const blob = new Blob([svgMarkup], {
      type: "image/svg+xml;charset=utf-8",
    });

    const fileUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = fileUrl;
    link.download = `${familyName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")}-crest.svg`;

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(fileUrl);

    setMessage("SVG downloaded");

    window.setTimeout(() => {
      setMessage("");
    }, 1800);
  }

  if (!loaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#111213] text-[#F6F2EA]">
        <p className="text-xs uppercase tracking-[0.35em] text-[#B08D57]">
          Opening the crest studio
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111213] text-[#F6F2EA]">
      <header className="border-b border-white/10 px-6 py-5">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-6">
          <Link
            href="/"
            className="text-sm font-semibold uppercase tracking-[0.22em]"
          >
            The Family Regiment
          </Link>

          <div className="flex items-center gap-5">
            {message && (
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#B08D57]">
                {message}
              </span>
            )}

            <button
              type="button"
              onClick={saveStudio}
              className="text-xs uppercase tracking-[0.25em] text-[#B08D57] transition hover:text-[#F6F2EA]"
            >
              Save Studio
            </button>

            <Link
              href="/builder"
              className="text-xs uppercase tracking-[0.25em] text-[#8F8B82] transition hover:text-[#B08D57]"
            >
              Edit Identity
            </Link>
          </div>
        </div>
      </header>

      <main className="px-5 py-8 md:px-8">
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.45em] text-[#B08D57]">
              Family Crest Studio
            </p>

            <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
              Refine the mark of your house.
            </h1>

            <p className="mt-4 max-w-2xl leading-7 text-[#8F8B82]">
              Adjust the crest identity, scale, placement, rotation, and
              embroidery finish before moving into patch production.
            </p>
          </div>

          <div className="grid gap-6 xl:grid-cols-[360px_minmax(0,1fr)_330px]">
            <aside className="rounded-[2rem] border border-white/10 bg-[#18191A] p-6">
              <PanelTitle number="01" title="Identity" />

              <div className="mt-6 space-y-5">
                <StudioInput
                  label="Family name"
                  value={draft.familyName}
                  onChange={(value) => update("familyName", value)}
                />

                <StudioInput
                  label="Initials"
                  value={draft.initials}
                  maxLength={4}
                  onChange={(value) => update("initials", value)}
                />

                <StudioInput
                  label="Heritage"
                  value={draft.heritage}
                  onChange={(value) => update("heritage", value)}
                />

                <StudioInput
                  label="Symbol"
                  value={draft.symbol}
                  onChange={(value) => update("symbol", value)}
                />

                <StudioInput
                  label="Principle"
                  value={draft.value}
                  onChange={(value) => update("value", value)}
                />

                <StudioInput
                  label="Motto"
                  value={draft.motto}
                  onChange={(value) => update("motto", value)}
                />
              </div>
            </aside>

            <section className="rounded-[2rem] border border-white/10 bg-[#20211E] p-5 md:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-[#B08D57]">
                    Live Crest Canvas
                  </p>
                  <p className="mt-2 text-sm text-[#77736A]">
                    {familyName} · {draft.palette}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={resetPlacement}
                  className="rounded-full border border-white/10 px-4 py-2 text-[10px] uppercase tracking-[0.25em] text-[#8F8B82] transition hover:border-[#B08D57] hover:text-[#B08D57]"
                >
                  Reset Placement
                </button>
              </div>

              <div className="relative mt-6 min-h-[690px] overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#151612]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(176,141,87,0.18),_transparent_65%)]" />

                <div className="absolute inset-0 grid place-items-center p-8">
                  <div
                    className="w-full max-w-[520px] transition-transform duration-200"
                    style={{
                      transform: `translate(${draft.crestX}px, ${draft.crestY}px) scale(${draft.crestScale / 100}) rotate(${draft.crestRotation}deg)`,
                    }}
                  >
                    <div
                      className={`rounded-[2rem] border p-5 shadow-2xl ${palette.panel} ${palette.border}`}
                    >
                      <div dangerouslySetInnerHTML={{ __html: svgMarkup }} />
                    </div>
                  </div>
                </div>

                <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/10 bg-black/75 p-5 backdrop-blur-sm">
                  <div className="flex items-end justify-between gap-6">
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.3em] text-[#B08D57]">
                        Current House
                      </p>
                      <p className="mt-2 text-xl">
                        The House of {familyName}
                      </p>
                    </div>

                    <p className="text-right text-xs uppercase tracking-[0.22em] text-[#8F8B82]">
                      {initials}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <aside className="rounded-[2rem] border border-white/10 bg-[#18191A] p-6">
              <PanelTitle number="02" title="Placement" />

              <div className="mt-6 space-y-6">
                <RangeControl
                  label="Scale"
                  value={draft.crestScale}
                  min={70}
                  max={125}
                  suffix="%"
                  onChange={(value) => update("crestScale", value)}
                />

                <RangeControl
                  label="Horizontal"
                  value={draft.crestX}
                  min={-140}
                  max={140}
                  suffix="px"
                  onChange={(value) => update("crestX", value)}
                />

                <RangeControl
                  label="Vertical"
                  value={draft.crestY}
                  min={-120}
                  max={120}
                  suffix="px"
                  onChange={(value) => update("crestY", value)}
                />

                <RangeControl
                  label="Rotation"
                  value={draft.crestRotation}
                  min={-12}
                  max={12}
                  suffix="°"
                  onChange={(value) => update("crestRotation", value)}
                />
              </div>

              <div className="mt-10 border-t border-white/10 pt-8">
                <PanelTitle number="03" title="Embroidery Finish" />

                <div className="mt-5 space-y-3">
                  {(Object.keys(paletteClasses) as StudioDraft["palette"][]).map(
                    (option) => {
                      const active = draft.palette === option;

                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => update("palette", option)}
                          className={`w-full rounded-2xl border p-4 text-left transition ${
                            active
                              ? "border-[#B08D57] bg-[#B08D57]/10"
                              : "border-white/10 bg-white/[0.02] hover:border-white/25"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-4">
                            <span className="text-sm">{option}</span>
                            <span
                              className="h-4 w-4 rounded-full border border-white/20"
                              style={{
                                backgroundColor: paletteClasses[option].accent,
                              }}
                            />
                          </div>
                        </button>
                      );
                    },
                  )}
                </div>
              </div>

              <div className="mt-10 space-y-3">
                <button
                  type="button"
                  onClick={downloadCrest}
                  className="w-full rounded-full bg-[#B08D57] px-6 py-4 text-sm font-semibold uppercase tracking-widest text-[#151515] transition hover:scale-[1.01]"
                >
                  Download Crest SVG
                </button>

                <Link
                  href="/patches"
                  onClick={saveStudio}
                  className="flex w-full items-center justify-center rounded-full border border-white/15 px-6 py-4 text-sm font-semibold uppercase tracking-widest transition hover:border-[#B08D57] hover:text-[#B08D57]"
                >
                  Continue to Patch Preview
                </Link>
              </div>

              <div className="mt-8 rounded-2xl border border-[#B08D57]/25 bg-[#B08D57]/5 p-5">
                <p className="text-[10px] uppercase tracking-[0.28em] text-[#B08D57]">
                  Production Note
                </p>
                <p className="mt-3 text-sm leading-6 text-[#99958D]">
                  This studio controls the digital concept. Final embroidery
                  still requires vendor digitization and a physical stitch
                  sample.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}

function PanelTitle({
  number,
  title,
}: {
  number: string;
  title: string;
}) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.3em] text-[#B08D57]">
        {number}
      </p>
      <h2 className="mt-2 text-2xl">{title}</h2>
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
      <span className="text-[10px] uppercase tracking-[0.28em] text-[#77736A]">
        {label}
      </span>
      <input
        type="text"
        value={value}
        maxLength={maxLength}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full border-b border-white/15 bg-transparent py-3 text-lg outline-none transition focus:border-[#B08D57]"
      />
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
        <span className="text-[10px] uppercase tracking-[0.28em] text-[#77736A]">
          {label}
        </span>
        <span className="text-xs text-[#B08D57]">
          {value}
          {suffix}
        </span>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full accent-[#B08D57]"
      />
    </label>
  );
}
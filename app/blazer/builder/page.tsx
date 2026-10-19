
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import Navigation from "@/components/layout/Navigation";
import HeritageBlazerPreview from "@/components/builder/HeritageBlazerPreview";

import type {
  BuilderShieldStyle,
  CrestCrown,
} from "@/lib/herald/types";

import type { SupportedCrestFinish } from "@/components/builder/FamilyCrestPreview";

type BlazerDraft = {
  familyName: string;
  initials: string;
  motto: string;
  symbol: string;
  shield: BuilderShieldStyle;
  crown: CrestCrown;
  finish: SupportedCrestFinish;
};

const STORAGE_KEY = "family-regiment-blazer-draft";

const DEFAULT_DRAFT: BlazerDraft = {
  familyName: "Laurent",
  initials: "L",
  motto: "Fortis in Familia",
  symbol: "Lion",
  shield: "Heater Shield",
  crown: "None",
  finish: "Regiment Gold",
};

const SHIELDS: BuilderShieldStyle[] = [
  "Heater Shield",
  "French Shield",
  "Norman Shield",
  "Spanish Shield",
  "Targe",
];

const ANIMALS = [
  "Lion",
  "Eagle",
  "Wolf",
  "Bear",
  "Stag",
];

const FINISHES: SupportedCrestFinish[] = [
  "Regiment Gold",
  "Tactical Subdued",
  "Heritage Ivory",
];

function isShield(value: unknown): value is BuilderShieldStyle {
  return (
    typeof value === "string" &&
    SHIELDS.includes(value as BuilderShieldStyle)
  );
}

function isFinish(value: unknown): value is SupportedCrestFinish {
  return (
    typeof value === "string" &&
    FINISHES.includes(value as SupportedCrestFinish)
  );
}

function readInitialDraft(): BlazerDraft {
  try {
    const blazerSaved = localStorage.getItem(STORAGE_KEY);

    if (blazerSaved) {
      const parsed = JSON.parse(blazerSaved) as Partial<BlazerDraft>;

      return {
        ...DEFAULT_DRAFT,
        familyName:
          typeof parsed.familyName === "string"
            ? parsed.familyName
            : DEFAULT_DRAFT.familyName,
        initials:
          typeof parsed.initials === "string"
            ? parsed.initials
            : DEFAULT_DRAFT.initials,
        motto:
          typeof parsed.motto === "string"
            ? parsed.motto
            : DEFAULT_DRAFT.motto,
        symbol:
          typeof parsed.symbol === "string" &&
          ANIMALS.includes(parsed.symbol)
            ? parsed.symbol
            : DEFAULT_DRAFT.symbol,
        shield: isShield(parsed.shield)
          ? parsed.shield
          : DEFAULT_DRAFT.shield,
        crown: "None",
        finish: isFinish(parsed.finish)
          ? parsed.finish
          : DEFAULT_DRAFT.finish,
      };
    }

    const regimentSaved = localStorage.getItem(
      "family-regiment-draft",
    );

    if (regimentSaved) {
      const parsed = JSON.parse(regimentSaved) as Record<
        string,
        unknown
      >;

      const familyName =
        typeof parsed.familyName === "string"
          ? parsed.familyName
          : DEFAULT_DRAFT.familyName;

      return {
        ...DEFAULT_DRAFT,
        familyName,
        initials:
          typeof parsed.initials === "string"
            ? parsed.initials
            : familyName.trim().charAt(0).toUpperCase(),
        motto:
          typeof parsed.motto === "string"
            ? parsed.motto
            : DEFAULT_DRAFT.motto,
        symbol:
          typeof parsed.animal === "string" &&
          ANIMALS.includes(parsed.animal)
            ? parsed.animal
            : DEFAULT_DRAFT.symbol,
        shield: isShield(parsed.shield)
          ? parsed.shield
          : DEFAULT_DRAFT.shield,
        finish: isFinish(parsed.embroideryFinish)
          ? parsed.embroideryFinish
          : DEFAULT_DRAFT.finish,
      };
    }
  } catch {
    // Invalid or unavailable browser storage falls back to defaults.
  }

  return DEFAULT_DRAFT;
}

export default function HeritageBlazerBuilderPage() {
  const [draft, setDraft] = useState<BlazerDraft>(
    DEFAULT_DRAFT,
  );
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const initial = readInitialDraft();
    // Load saved customer data once after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDraft(initial);
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(draft),
      );
    } catch {
      // Preview remains usable if storage is unavailable.
    }
  }, [draft, loaded]);

  function update<K extends keyof BlazerDraft>(
    key: K,
    value: BlazerDraft[K],
  ) {
    setDraft((current) => ({
      ...current,
      [key]: value,
    }));
  }

  return (
    <>
      <Navigation />

      <main className="min-h-screen bg-[#171914] text-[#eee6d6]">
        <section className="mx-auto max-w-[1440px] px-6 py-12 sm:px-8 lg:px-12">
          <Link
            href="/blazer"
            className="text-xs uppercase tracking-[0.16em] text-[#bba47c] hover:text-[#eee6d6]"
          >
            ← Heritage Blazer
          </Link>

          <div className="mt-10 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#c5a16a]">
              The Founding Collection
            </p>

            <h1 className="font-display mt-5 text-4xl leading-tight sm:text-6xl">
              Design Your
              <span className="block italic text-[#c7aa78]">
                Heritage Crest.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-[#b9b1a2]">
              One House identity, expressed through traditional
              heraldry. Customize the crest that will sit over
              the heart of your Heritage Blazer.
            </p>
          </div>

          <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
            {/* Controls */}
            <div className="space-y-8">
              <Field label="House Name">
                <input
                  value={draft.familyName}
                  maxLength={40}
                  onChange={(event) =>
                    update("familyName", event.target.value)
                  }
                  className={inputClass}
                  placeholder="Enter your House Name"
                />
              </Field>

              <Field label="Latin Motto">
                <input
                  value={draft.motto}
                  maxLength={60}
                  onChange={(event) =>
                    update("motto", event.target.value)
                  }
                  className={inputClass}
                  placeholder="Fortis in Familia"
                />
              </Field>

              <Field label="Heraldic Symbol">
                <select
                  value={draft.symbol}
                  onChange={(event) =>
                    update("symbol", event.target.value)
                  }
                  className={inputClass}
                >
                  {ANIMALS.map((animal) => (
                    <option key={animal} value={animal}>
                      {animal}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Shield Shape">
                <select
                  value={draft.shield}
                  onChange={(event) =>
                    update(
                      "shield",
                      event.target.value as BuilderShieldStyle,
                    )
                  }
                  className={inputClass}
                >
                  {SHIELDS.map((shape) => (
                    <option key={shape} value={shape}>
                      {shape}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Embroidery Finish">
                <div className="grid gap-3 sm:grid-cols-3">
                  {FINISHES.map((finish) => (
                    <button
                      key={finish}
                      type="button"
                      onClick={() => update("finish", finish)}
                      aria-pressed={draft.finish === finish}
                      className={`min-h-16 border px-3 py-3 text-xs leading-5 transition-colors ${
                        draft.finish === finish
                          ? "border-[#c7aa78] bg-[#b08d57]/15 text-[#eee6d6]"
                          : "border-[#5b5549] text-[#aaa08f] hover:border-[#b08d57]"
                      }`}
                    >
                      {finish}
                    </button>
                  ))}
                </div>
              </Field>

              <div className="border-t border-[#b08d57]/20 pt-7">
                <p className="text-sm leading-7 text-[#b9b1a2]">
                  Your blazer features one embroidered Heritage
                  Crest on the left chest. Military rockers,
                  name tapes, and additional identity patches
                  remain exclusive to the Regiment Jacket.
                </p>

                <Link
                  href="/builder"
                  className="mt-6 inline-flex min-h-11 items-center border border-[#b08d57]/60 px-5 py-3 text-xs font-semibold uppercase tracking-[0.13em] text-[#e1cfaf] hover:bg-[#b08d57]/10"
                >
                  Explore the Regiment Jacket Builder
                </Link>
              </div>
            </div>

            {/* Live preview */}
            <div className="lg:sticky lg:top-8 lg:self-start">
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.24em] text-[#c5a16a]">
                Live Garment Preview
              </p>

              <HeritageBlazerPreview
                familyName={draft.familyName}
                initials={draft.initials}
                motto={draft.motto}
                symbol={draft.symbol}
                shield={draft.shield}
                crown={draft.crown}
                finish={draft.finish}
              />

              <div className="mt-6 border border-[#b08d57]/20 bg-[#20221b] p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-[#c5a16a]">
                  Your House Identity
                </p>

                <p className="font-display mt-3 text-2xl">
                  House of {draft.familyName || "Family"}
                </p>

                <p className="mt-2 font-display italic text-[#c7aa78]">
                  {draft.motto || "Fortis in Familia"}
                </p>

                <p className="mt-4 text-xs leading-6 text-[#a99e8c]">
                  Design preview only. Final crest dimensions,
                  fabric, and embroidery specifications are
                  subject to production validation.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

const inputClass =
  "w-full min-h-12 border border-[#5b5549] bg-[#20221b] px-4 py-3 text-sm text-[#eee6d6] outline-none transition-colors focus:border-[#c7aa78]";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.17em] text-[#c5a16a]">
        {label}
      </span>
      {children}
    </label>
  );
}

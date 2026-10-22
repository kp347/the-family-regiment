"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import Navigation from "@/components/layout/Navigation";
import HeritageBlazerPreview from "@/components/builder/HeritageBlazerPreview";
import { MOTTO_LIBRARY } from "@/lib/herald/motto";

import type { SupportedCrestFinish } from "@/components/builder/FamilyCrestPreview";

import {
  BLAZER_DRAFT_KEY,
  DEFAULT_HOUSE_IDENTITY,
  HOUSE_ANIMALS,
  HOUSE_IDENTITY_KEY,
  HOUSE_SHIELDS,
  readHouseIdentity,
  saveHouseIdentity,
  type HouseIdentity,
} from "@/lib/houseIdentity";

const FINISHES: SupportedCrestFinish[] = [
  "Regiment Gold",
  "Tactical Subdued",
  "Heritage Ivory",
];

type BlazerConfiguration = {
  finish: SupportedCrestFinish;
};

const DEFAULT_CONFIGURATION: BlazerConfiguration = {
  finish: "Regiment Gold",
};

function readBlazerConfiguration(): BlazerConfiguration {
  try {
    const saved = window.localStorage.getItem(
      BLAZER_DRAFT_KEY,
    );

    if (!saved) return DEFAULT_CONFIGURATION;

    const parsed: unknown = JSON.parse(saved);

    if (
      typeof parsed !== "object" ||
      parsed === null ||
      !("finish" in parsed)
    ) {
      return DEFAULT_CONFIGURATION;
    }

    const finish = parsed.finish;

    if (
      typeof finish === "string" &&
      FINISHES.some((item) => item === finish)
    ) {
      return {
        finish: finish as SupportedCrestFinish,
      };
    }
  } catch {
    // Invalid saved data falls back to defaults.
  }

  return DEFAULT_CONFIGURATION;
}

function saveBlazerConfiguration(
  configuration: BlazerConfiguration,
) {
  try {
    window.localStorage.setItem(
      BLAZER_DRAFT_KEY,
      JSON.stringify(configuration),
    );

    return true;
  } catch {
    return false;
  }
}

export default function HeritageBlazerBuilderPage() {
  const [house, setHouse] = useState<HouseIdentity>(
    DEFAULT_HOUSE_IDENTITY,
  );

  const [configuration, setConfiguration] =
    useState<BlazerConfiguration>(
      DEFAULT_CONFIGURATION,
    );

  const [loaded, setLoaded] = useState(false);
  const [saveStatus, setSaveStatus] = useState<
    "saved" | "unavailable"
  >("saved");

  useEffect(() => {
    const initialHouse = readHouseIdentity();
    const initialConfiguration = readBlazerConfiguration();

    // Hydrate saved customer data after the initial render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHouse(initialHouse);
    setConfiguration(initialConfiguration);
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;

    const houseSaved = saveHouseIdentity(house);

    const blazerSaved = saveBlazerConfiguration(
      configuration,
    );

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSaveStatus(
      houseSaved && blazerSaved
        ? "saved"
        : "unavailable",
    );
  }, [house, configuration, loaded]);

  // Reflect House identity changes made in another tab.
  useEffect(() => {
    function handleStorage(event: StorageEvent) {
      if (
        event.key === HOUSE_IDENTITY_KEY ||
        event.key === null
      ) {
        setHouse(readHouseIdentity());
      }
    }

    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener(
        "storage",
        handleStorage,
      );
    };
  }, []);

  function updateHouse<K extends keyof HouseIdentity>(
    key: K,
    value: HouseIdentity[K],
  ) {
    setHouse((current) => {
      const next = {
        ...current,
        [key]: value,
      };

      // Keep initials aligned when the House Name changes.
      // Garment-specific name tapes are never modified.
      if (key === "familyName") {
        next.initials =
          String(value).trim().charAt(0).toUpperCase() ||
          "FR";
      }

      return next;
    });
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

            <p
              className="mt-5 text-xs tracking-[0.08em] text-[#bba47c]"
              role="status"
            >
              {loaded
                ? saveStatus === "saved"
                  ? "House identity and blazer preferences saved in this browser."
                  : "Browser storage unavailable. Your changes may not persist."
                : "Loading your House identity..."}
            </p>
          </div>

          <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
            <div className="space-y-8">
              <Field label="House Name">
                <input
                  value={house.familyName}
                  maxLength={40}
                  onChange={(event) =>
                    updateHouse(
                      "familyName",
                      event.target.value,
                    )
                  }
                  className={inputClass}
                  placeholder="Enter your House Name"
                  disabled={!loaded}
                />
              </Field>

              <Field label="Latin Motto">
                <div className="space-y-3">
                  <select
                    value={MOTTO_LIBRARY.some((entry) => entry.latin === house.motto) ? house.motto : "custom"}
                    onChange={(event) => {
                      if (event.target.value !== "custom") {
                        updateHouse("motto", event.target.value);
                      }
                    }}
                    className={inputClass}
                    disabled={!loaded}
                    aria-label="Choose a Latin motto"
                  >
                    {!MOTTO_LIBRARY.some((entry) => entry.latin === house.motto) && (
                      <option value="custom">Custom motto</option>
                    )}
                    {MOTTO_LIBRARY.map((entry) => (
                      <option key={entry.latin} value={entry.latin}>
                        {entry.latin} — {entry.english}
                      </option>
                    ))}
                  </select>
                  <input
                    value={house.motto}
                    maxLength={60}
                    onChange={(event) => updateHouse("motto", event.target.value)}
                    className={inputClass}
                    placeholder="Or enter your own Latin motto"
                    aria-label="Edit or enter a custom Latin motto"
                    disabled={!loaded}
                  />
                  <p className="text-xs leading-5 text-[#a99e8c]">
                    Select a motto above or write your own. Your crest updates automatically.
                  </p>
                </div>
              </Field>

              <Field label="Heraldic Symbol">
                <select
                  value={house.animal}
                  onChange={(event) =>
                    updateHouse(
                      "animal",
                      event.target.value,
                    )
                  }
                  className={inputClass}
                  disabled={!loaded}
                >
                  {HOUSE_ANIMALS.map((animal) => (
                    <option key={animal} value={animal}>
                      {animal}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Shield Shape">
                <select
                  value={house.shield}
                  onChange={(event) =>
                    updateHouse(
                      "shield",
                      event.target.value as HouseIdentity["shield"],
                    )
                  }
                  className={inputClass}
                  disabled={!loaded}
                >
                  {HOUSE_SHIELDS.map((shape) => (
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
                      disabled={!loaded}
                      onClick={() =>
                        setConfiguration((current) => ({
                          ...current,
                          finish,
                        }))
                      }
                      aria-pressed={
                        configuration.finish === finish
                      }
                      className={`min-h-16 border px-3 py-3 text-xs leading-5 transition-colors disabled:opacity-50 ${
                        configuration.finish === finish
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

            <div className="lg:sticky lg:top-8 lg:self-start">
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.24em] text-[#c5a16a]">
                Live Garment Preview
              </p>

              <HeritageBlazerPreview
                familyName={house.familyName}
                initials={house.initials}
                motto={house.motto}
                symbol={house.animal}
                shield={house.shield}
                crown="None"
                finish={configuration.finish}
              />

              <div className="mt-6 border border-[#b08d57]/20 bg-[#20221b] p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-[#c5a16a]">
                  Your House Identity
                </p>

                <p className="font-display mt-3 text-2xl">
                  House of {house.familyName || "Family"}
                </p>

                <p className="mt-2 font-display italic text-[#c7aa78]">
                  {house.motto || "Fortis in Familia"}
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
  "w-full min-h-12 border border-[#5b5549] bg-[#20221b] px-4 py-3 text-sm text-[#eee6d6] outline-none transition-colors focus:border-[#c7aa78] disabled:opacity-50";

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

"use client";

import { useRouter } from "next/navigation";

import { HERALDIC_STYLES } from "@/lib/herald/rules";
import type { HeraldicStyle } from "@/lib/herald/types";
import { useRegimentStore } from "@/lib/store/regimentStore";

const VALUE_OPTIONS = [
  "Family",
  "Honor",
  "Courage",
  "Faith",
  "Loyalty",
  "Strength",
  "Service",
  "Leadership",
  "Resilience",
  "Unity",
  "Legacy",
  "Integrity",
];

export default function FamilyInterview() {
  const router = useRouter();

  const family = useRegimentStore(
    (state) => state.project.family,
  );

  const lastSavedAt = useRegimentStore(
    (state) => state.lastSavedAt,
  );

  const updateFamily = useRegimentStore(
    (state) => state.updateFamily,
  );

  function toggleValue(value: string) {
    const alreadySelected = family.values.includes(value);

    if (alreadySelected) {
      updateFamily({
        values: family.values.filter(
          (selectedValue) => selectedValue !== value,
        ),
      });

      return;
    }

    if (family.values.length >= 3) {
      return;
    }

    updateFamily({
      values: [...family.values, value],
    });
  }

  function handleContinue() {
    if (!family.familyName.trim()) {
      window.alert("Please enter your family name.");
      return;
    }

    if (family.values.length === 0) {
      window.alert("Please select at least one family value.");
      return;
    }

    router.push("/builder");
  }

  const savedTime = lastSavedAt
    ? new Date(lastSavedAt).toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      })
    : null;

  return (
    <main className="min-h-screen bg-[#11130f] px-5 py-10 text-[#f1eadb] md:px-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 border-b border-[#6f745f]/40 pb-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-[#c3a86b]">
            The Family Regiment
          </p>

          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <h1 className="max-w-3xl text-4xl font-semibold leading-tight md:text-6xl">
                Begin your family commission.
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-7 text-[#b8b5a8]">
                Tell us about your heritage, identity, and
                values. These details will guide your crest,
                motto, patch, and jacket.
              </p>
            </div>

            <div className="text-sm text-[#8f9382]">
              {savedTime
                ? `Saved automatically at ${savedTime}`
                : "Your answers save automatically"}
            </div>
          </div>
        </header>

        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <section className="space-y-8">
            <InterviewSection
              number="01"
              title="Your Family"
              description="The name and places that shaped your family story."
            >
              <div className="grid gap-5 md:grid-cols-2">
                <Field label="Family name">
                  <input
                    value={family.familyName}
                    onChange={(event) =>
                      updateFamily({
                        familyName: event.target.value,
                      })
                    }
                    placeholder="Laurent"
                    className={inputClassName}
                  />
                </Field>

                <Field label="Heritage">
                  <input
                    value={family.heritage.join(", ")}
                    onChange={(event) =>
                      updateFamily({
                        heritage: event.target.value
                          .split(",")
                          .map((item) => item.trim())
                          .filter(Boolean),
                      })
                    }
                    placeholder="France, United States"
                    className={inputClassName}
                  />
                </Field>
              </div>
            </InterviewSection>

            <InterviewSection
              number="02"
              title="Service and Identity"
              description="Optional details that can inspire symbols and visual language."
            >
              <div className="grid gap-5 md:grid-cols-2">
                <Field label="Military service">
                  <input
                    value={family.militaryService ?? ""}
                    onChange={(event) =>
                      updateFamily({
                        militaryService: event.target.value,
                      })
                    }
                    placeholder="U.S. Army, 101st Airborne"
                    className={inputClassName}
                  />
                </Field>

                <Field label="Profession">
                  <input
                    value={family.profession ?? ""}
                    onChange={(event) =>
                      updateFamily({
                        profession: event.target.value,
                      })
                    }
                    placeholder="Teacher, firefighter, engineer"
                    className={inputClassName}
                  />
                </Field>

                <Field label="Faith or tradition">
                  <input
                    value={family.faith ?? ""}
                    onChange={(event) =>
                      updateFamily({
                        faith: event.target.value,
                      })
                    }
                    placeholder="Optional"
                    className={inputClassName}
                  />
                </Field>

                <Field label="Zodiac">
                  <input
                    value={family.zodiac ?? ""}
                    onChange={(event) =>
                      updateFamily({
                        zodiac: event.target.value,
                      })
                    }
                    placeholder="Leo"
                    className={inputClassName}
                  />
                </Field>
              </div>
            </InterviewSection>

            <InterviewSection
              number="03"
              title="Family Values"
              description="Choose up to three values that should define the crest."
            >
              <div className="flex flex-wrap gap-3">
                {VALUE_OPTIONS.map((value) => {
                  const selected =
                    family.values.includes(value);

                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => toggleValue(value)}
                      className={`rounded-full border px-4 py-2 text-sm transition ${
                        selected
                          ? "border-[#c3a86b] bg-[#c3a86b] text-[#11130f]"
                          : "border-[#656957] bg-transparent text-[#d6d1c4] hover:border-[#c3a86b]"
                      }`}
                    >
                      {value}
                    </button>
                  );
                })}
              </div>

              <p className="mt-4 text-sm text-[#8f9382]">
                {family.values.length}/3 selected
              </p>
            </InterviewSection>

            <InterviewSection
              number="04"
              title="Symbols and Style"
              description="Choose the visual tradition that best represents your family."
            >
              <div className="grid gap-5 md:grid-cols-2">
                <Field label="Favorite animal or symbol">
                  <input
                    value={family.favoriteAnimal ?? ""}
                    onChange={(event) =>
                      updateFamily({
                        favoriteAnimal: event.target.value,
                      })
                    }
                    placeholder="Lion, eagle, oak tree"
                    className={inputClassName}
                  />
                </Field>

                <Field label="Preferred heraldic style">
                  <select
                    value={family.preferredStyle}
                    onChange={(event) =>
                      updateFamily({
                        preferredStyle: event.target
                          .value as HeraldicStyle,
                      })
                    }
                    className={inputClassName}
                  >
                    {HERALDIC_STYLES.map((style) => (
                      <option
                        key={style.value}
                        value={style.value}
                      >
                        {style.label}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <div className="mt-5 rounded-sm border border-[#5f6353]/50 bg-[#171a15] p-5">
                <p className="text-sm font-semibold text-[#d5c6a4]">
                  {
                    HERALDIC_STYLES.find(
                      (style) =>
                        style.value ===
                        family.preferredStyle,
                    )?.label
                  }
                </p>

                <p className="mt-2 text-sm leading-6 text-[#999d8d]">
                  {
                    HERALDIC_STYLES.find(
                      (style) =>
                        style.value ===
                        family.preferredStyle,
                    )?.description
                  }
                </p>
              </div>
            </InterviewSection>

            <button
              type="button"
              onClick={handleContinue}
              className="w-full bg-[#c3a86b] px-6 py-4 text-sm font-bold uppercase tracking-[0.22em] text-[#11130f] transition hover:bg-[#d4bc84]"
            >
              Continue to Crest Builder
            </button>
          </section>

          <aside className="h-fit border border-[#5f6353]/50 bg-[#171a15] p-6 lg:sticky lg:top-8">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#c3a86b]">
              Commission Summary
            </p>

            <h2 className="mt-5 text-2xl font-semibold">
              {family.familyName.trim()
                ? `House ${family.familyName}`
                : "Your Family House"}
            </h2>

            <SummaryItem
              label="Heritage"
              value={
                family.heritage.length
                  ? family.heritage.join(" · ")
                  : "Not selected"
              }
            />

            <SummaryItem
              label="Values"
              value={
                family.values.length
                  ? family.values.join(" · ")
                  : "Not selected"
              }
            />

            <SummaryItem
              label="Style"
              value={
                HERALDIC_STYLES.find(
                  (style) =>
                    style.value === family.preferredStyle,
                )?.label ?? "Traditional Heraldry"
              }
            />

            <SummaryItem
              label="Symbol"
              value={
                family.favoriteAnimal || "To be determined"
              }
            />

            <div className="mt-8 border-t border-[#5f6353]/40 pt-5">
              <p className="text-xs uppercase tracking-[0.2em] text-[#777c6b]">
                Progress
              </p>

              <div className="mt-4 space-y-3 text-sm">
                <ProgressItem
                  complete={Boolean(family.familyName.trim())}
                  label="Family identity"
                />

                <ProgressItem
                  complete={family.heritage.length > 0}
                  label="Heritage"
                />

                <ProgressItem
                  complete={family.values.length > 0}
                  label="Core values"
                />

                <ProgressItem
                  complete={Boolean(
                    family.preferredStyle,
                  )}
                  label="Heraldic style"
                />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

const inputClassName =
  "w-full rounded-sm border border-[#606452] bg-[#11130f] px-4 py-3 text-[#f1eadb] outline-none transition placeholder:text-[#686c5d] focus:border-[#c3a86b]";

function InterviewSection({
  number,
  title,
  description,
  children,
}: {
  number: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border border-[#5f6353]/50 bg-[#171a15] p-6 md:p-8">
      <div className="mb-7 flex gap-5">
        <span className="text-sm font-semibold text-[#c3a86b]">
          {number}
        </span>

        <div>
          <h2 className="text-2xl font-semibold">{title}</h2>
          <p className="mt-2 text-sm leading-6 text-[#929686]">
            {description}
          </p>
        </div>
      </div>

      {children}
    </section>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-[#a7aa9c]">
        {label}
      </span>

      {children}
    </label>
  );
}

function SummaryItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="mt-6">
      <p className="text-xs uppercase tracking-[0.18em] text-[#777c6b]">
        {label}
      </p>

      <p className="mt-2 text-sm leading-6 text-[#d7d2c5]">
        {value}
      </p>
    </div>
  );
}

function ProgressItem({
  complete,
  label,
}: {
  complete: boolean;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span
        className={`flex h-5 w-5 items-center justify-center rounded-full border text-xs ${
          complete
            ? "border-[#c3a86b] bg-[#c3a86b] text-[#11130f]"
            : "border-[#626655] text-transparent"
        }`}
      >
        ✓
      </span>

      <span
        className={
          complete ? "text-[#d8d3c6]" : "text-[#777c6b]"
        }
      >
        {label}
      </span>
    </div>
  );
}
"use client";

import { useState } from "react";

type Chapter = {
  id: string;
  numeral: string;
  name: string;
  description: string;
  patches: {
    symbol: string;
    name: string;
    detail: string;
  }[];
};

const chapters: Chapter[] = [
  {
    id: "heritage",
    numeral: "I",
    name: "Heritage",
    description:
      "The places, cultures, and traditions that shaped your family story.",
    patches: [
      {
        symbol: "⚜",
        name: "Ancestral Origin",
        detail: "Country, region, or cultural heritage",
      },
      {
        symbol: "✦",
        name: "Family Crest",
        detail: "Your custom heraldic emblem",
      },
      {
        symbol: "⌂",
        name: "Hometown",
        detail: "The place your family calls home",
      },
    ],
  },
  {
    id: "service",
    numeral: "II",
    name: "Service",
    description:
      "Military, civic, medical, educational, and community service.",
    patches: [
      {
        symbol: "★",
        name: "Military Service",
        detail: "Branch, role, or family service history",
      },
      {
        symbol: "✚",
        name: "Public Service",
        detail: "Medical, emergency, or civic duty",
      },
      {
        symbol: "⚖",
        name: "Community",
        detail: "Leadership and service to others",
      },
    ],
  },
  {
    id: "achievement",
    numeral: "III",
    name: "Achievement",
    description:
      "Education, profession, craftsmanship, and personal milestones.",
    patches: [
      {
        symbol: "◆",
        name: "Profession",
        detail: "The work and craft that define you",
      },
      {
        symbol: "✎",
        name: "Education",
        detail: "Schools, degrees, and scholarship",
      },
      {
        symbol: "▲",
        name: "Milestone",
        detail: "A defining personal accomplishment",
      },
    ],
  },
  {
    id: "adventure",
    numeral: "IV",
    name: "Adventure",
    description:
      "The journeys, passions, and experiences that become family stories.",
    patches: [
      {
        symbol: "⌖",
        name: "Travel",
        detail: "Cities, countries, and meaningful journeys",
      },
      {
        symbol: "≈",
        name: "Outdoors",
        detail: "Mountains, water, trails, and exploration",
      },
      {
        symbol: "✧",
        name: "Passion",
        detail: "Sports, hobbies, and lifelong interests",
      },
    ],
  },
  {
    id: "legacy",
    numeral: "V",
    name: "Legacy",
    description:
      "The names, values, and traditions intended to outlive one generation.",
    patches: [
      {
        symbol: "∞",
        name: "Family Motto",
        detail: "A guiding phrase rendered in Latin",
      },
      {
        symbol: "♛",
        name: "Birth Order",
        detail: "Firstborn, youngest, or family role",
      },
      {
        symbol: "◇",
        name: "Future Heirloom",
        detail: "A symbol created for generations ahead",
      },
    ],
  },
];

export default function PatchChapters() {
  const [selectedId, setSelectedId] = useState("heritage");

  const selectedChapter =
    chapters.find((chapter) => chapter.id === selectedId) ?? chapters[0];

  return (
    <section
      id="patches"
      className="border-b border-white/10 bg-[#131415] px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="text-xs uppercase tracking-[0.45em] text-[#B08D57]">
              The Patch Library
            </p>

            <h2 className="mt-6 text-5xl font-semibold leading-[0.95] tracking-[-0.04em] md:text-7xl">
              Every story has chapters.
            </h2>

            <p className="mt-8 max-w-xl text-lg leading-8 text-[#AAA69E]">
              Build your jacket through five collections of embroidered symbols.
              Each chapter records a different part of your family identity.
            </p>

            <div className="mt-12 space-y-2">
              {chapters.map((chapter) => {
                const active = selectedId === chapter.id;

                return (
                  <button
                    key={chapter.id}
                    type="button"
                    onClick={() => setSelectedId(chapter.id)}
                    className={`group flex w-full items-center justify-between border-b px-1 py-5 text-left transition ${
                      active
                        ? "border-[#B08D57] text-[#F6F2EA]"
                        : "border-white/10 text-[#77746E] hover:border-white/30 hover:text-[#F6F2EA]"
                    }`}
                  >
                    <span className="flex items-center gap-6">
                      <span
                        className={`text-xs tracking-[0.3em] ${
                          active ? "text-[#B08D57]" : "text-[#65625D]"
                        }`}
                      >
                        {chapter.numeral}
                      </span>

                      <span className="text-2xl md:text-3xl">
                        {chapter.name}
                      </span>
                    </span>

                    <span
                      className={`text-xl transition-transform ${
                        active
                          ? "translate-x-0 text-[#B08D57]"
                          : "-translate-x-2 text-[#55534F] group-hover:translate-x-0"
                      }`}
                    >
                      →
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#1D1E1F]">
            <div className="border-b border-white/10 px-8 py-8 md:px-12">
              <div className="flex items-end justify-between gap-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-[#B08D57]">
                    Chapter {selectedChapter.numeral}
                  </p>

                  <h3 className="mt-4 text-4xl md:text-5xl">
                    {selectedChapter.name}
                  </h3>
                </div>

                <p className="hidden max-w-xs text-right text-sm leading-6 text-[#88857E] md:block">
                  {selectedChapter.description}
                </p>
              </div>
            </div>

            <div className="grid gap-px bg-white/10 md:grid-cols-3">
              {selectedChapter.patches.map((patch) => (
                <article
                  key={patch.name}
                  className="group bg-[#1D1E1F] p-8 transition hover:bg-[#232421] md:min-h-[420px]"
                >
                  <div className="flex h-52 items-center justify-center">
                    <div className="relative flex h-40 w-40 items-center justify-center rounded-full border border-[#B08D57]/60 bg-[#292C22] shadow-[0_20px_50px_rgba(0,0,0,0.35)] transition duration-500 group-hover:scale-105 group-hover:border-[#B08D57]">
                      <div className="absolute inset-3 rounded-full border border-dashed border-[#B08D57]/50" />

                      <span className="relative text-6xl text-[#B08D57]">
                        {patch.symbol}
                      </span>
                    </div>
                  </div>

                  <p className="mt-8 text-xs uppercase tracking-[0.3em] text-[#B08D57]">
                    Embroidered Patch
                  </p>

                  <h4 className="mt-4 text-2xl text-[#F6F2EA]">
                    {patch.name}
                  </h4>

                  <p className="mt-3 text-sm leading-6 text-[#88857E]">
                    {patch.detail}
                  </p>

                  <button
                    type="button"
                    className="mt-8 text-xs uppercase tracking-[0.25em] text-[#D5D0C5] transition hover:text-[#B08D57]"
                  >
                    Add to Regiment +
                  </button>
                </article>
              ))}
            </div>

            <div className="flex flex-col gap-5 border-t border-white/10 px-8 py-8 sm:flex-row sm:items-center sm:justify-between md:px-12">
              <p className="max-w-xl text-sm leading-6 text-[#88857E]">
                Final artwork will be simplified, digitized, and reviewed for
                embroidery production before manufacturing.
              </p>

              <a
                href="#builder"
                className="shrink-0 rounded-full border border-[#B08D57] px-6 py-3 text-center text-xs font-semibold uppercase tracking-widest text-[#B08D57] transition hover:bg-[#B08D57] hover:text-[#151515]"
              >
                Build Your Set
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
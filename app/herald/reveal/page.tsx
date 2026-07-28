"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { RegimentProfile } from "@/types/regiment";

const STORAGE_KEY = "family-regiment-profile";

export default function HeraldRevealPage() {
  const [profile, setProfile] = useState<RegimentProfile | null>(null);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);

    if (!saved) return;

    setProfile(JSON.parse(saved));
  }, []);

  if (!profile) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#171815] text-[#F2EBDD]">
        <p className="uppercase tracking-[0.3em] text-[#B08D57]">
          Preparing Your Regiment...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#171815] text-[#F2EBDD]">
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 py-20 text-center">

        <p className="text-xs uppercase tracking-[0.45em] text-[#B08D57]">
          The Herald Has Recorded Your Story
        </p>

        <h1 className="mt-6 font-serif text-6xl md:text-7xl">
          The {profile.familyName} Regiment
        </h1>

        <div className="mt-12 h-px w-28 bg-[#B08D57]" />

        <div className="mt-12 max-w-3xl space-y-6 text-lg leading-9 text-[#BEB7AA]">

          <p>
            Founded in <strong>2026</strong>.
          </p>

          <p>
            Your Regiment draws strength from{" "}
            <strong>{profile.heritage.join(", ")}</strong>.
          </p>

          <p>
            Its guiding virtues are{" "}
            <strong>{profile.values.join(", ")}</strong>.
          </p>

          <p>
            The <strong>{profile.animal}</strong> stands as the symbol of
            your family's character.
          </p>

          <p className="font-serif text-2xl italic text-[#E9DFC9]">
            "{profile.legacy}"
          </p>

        </div>

        <div className="mt-16 rounded-full border border-[#B08D57]/40 px-10 py-5">
          <p className="text-xs uppercase tracking-[0.4em] text-[#B08D57]">
            Crest Coming Soon
          </p>
        </div>

        <Link
          href="/builder"
          className="mt-20 border border-[#C8A969] bg-[#C8A969] px-10 py-4 text-xs font-bold uppercase tracking-[0.25em] text-[#181914] transition hover:bg-[#DFC07D]"
        >
          Continue to Regiment Workshop →
        </Link>

      </section>
    </main>
  );
}
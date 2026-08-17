"use client";

import Link from "next/link";

export default function ReportActions() {
  return (
    <section className="rounded-2xl border border-stone-200 bg-white p-8 shadow-sm">
      <div className="mb-6">
        <p className="text-sm uppercase tracking-[0.3em] text-stone-500">
          Next Step
        </p>

        <h2 className="mt-2 text-3xl font-serif">
          Continue the Heraldic Process
        </h2>

        <p className="mt-3 max-w-3xl leading-7 text-stone-600">
          Review the Herald's recommendations before moving into design.
          The report should remain the foundation for every visual decision
          that follows.
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
        <Link
          href="/builder"
          className="inline-flex items-center justify-center rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-stone-800"
        >
          Open Crest Builder
        </Link>

        <Link
          href="/herald"
          className="inline-flex items-center justify-center rounded-full border border-stone-300 px-6 py-3 text-sm font-semibold text-stone-800 transition hover:bg-stone-50"
        >
          Return to Herald Chamber
        </Link>

        <Link
          href="/begin/review"
          className="inline-flex items-center justify-center rounded-full border border-stone-300 px-6 py-3 text-sm font-semibold text-stone-800 transition hover:bg-stone-50"
        >
          Review Family Record
        </Link>
      </div>
    </section>
  );
}
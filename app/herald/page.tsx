// app/herald/page.tsx

import Link from "next/link";

export default function HeraldPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#171815] text-[#F2EBDD]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(176,141,87,0.16),_transparent_55%)]" />

      <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:48px_48px]" />

      <header className="relative z-10 flex items-center justify-between border-b border-white/10 px-6 py-5 md:px-10">
        <Link
          href="/"
          className="text-sm font-semibold uppercase tracking-[0.3em] text-[#E8E0D0] transition hover:text-white"
        >
          The Family Regiment
        </Link>

        <Link
          href="/"
          className="text-xs uppercase tracking-[0.25em] text-[#8F8B82] transition hover:text-[#D3B477]"
        >
          Return Home
        </Link>
      </header>

      <section className="relative z-10 flex min-h-[calc(100vh-77px)] items-center justify-center px-6 py-16">
        <div className="mx-auto w-full max-w-4xl text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#B08D57]/50 bg-[#20211D] shadow-[0_0_50px_rgba(176,141,87,0.15)]">
            <span
              className="text-2xl text-[#C6A66B]"
              aria-hidden="true"
            >
              ✦
            </span>
          </div>

          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.5em] text-[#B08D57]">
            The Herald
          </p>

          <h1 className="mx-auto mt-7 max-w-3xl font-serif text-5xl leading-[0.95] tracking-[-0.04em] text-[#F4EDDE] sm:text-6xl md:text-8xl">
            Every family carries a story.
          </h1>

          <div className="mx-auto mt-10 h-px w-24 bg-[#B08D57]/60" />

          <div className="mx-auto mt-10 max-w-2xl space-y-5 text-base leading-8 text-[#AAA59B] sm:text-lg">
            <p>
              For centuries, heralds preserved the histories of noble houses
              and military regiments.
            </p>

            <p className="font-serif text-xl italic text-[#DED5C4] sm:text-2xl">
              Today, I will record yours.
            </p>
          </div>

          <Link
            href="/herald/interview"
            className="group mt-12 inline-flex min-h-14 items-center justify-center border border-[#C8A969] bg-[#C8A969] px-9 text-xs font-bold uppercase tracking-[0.28em] text-[#181914] transition duration-300 hover:bg-[#E0C383]"
          >
            Begin Your Regiment
            <span
              className="ml-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            >
              →
            </span>
          </Link>

          <p className="mt-6 text-[10px] uppercase tracking-[0.28em] text-[#68655F]">
            Your answers will shape your regimental story and crest
          </p>
        </div>
      </section>

      <div className="pointer-events-none absolute bottom-0 left-1/2 h-64 w-[46rem] -translate-x-1/2 rounded-full bg-[#B08D57]/[0.04] blur-3xl" />
    </main>
  );
}

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#171914] text-[#eee6d6]">
      {/* Atmospheric heritage background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_78%_40%,rgba(176,141,87,0.14),transparent_45%),linear-gradient(115deg,#171914_0%,#20231c_50%,#151611_100%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.025)_1px,transparent_1px)] [background-size:48px_48px]"
      />

      <div className="relative mx-auto grid min-h-[90vh] max-w-[1500px] items-center gap-12 px-6 py-16 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14 lg:px-12 lg:py-24">
        {/* Hero copy */}
        <div className="relative z-10 max-w-2xl">
          <div className="mb-7 flex items-center gap-4">
            <span
              aria-hidden="true"
              className="h-px w-10 shrink-0 bg-[#b08d57]"
            />

            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#c5a16a] sm:text-xs">
              Establish Your House
            </p>
          </div>

          <h1 className="font-display text-[clamp(3.1rem,5.3vw,5.7rem)] leading-[1.02] tracking-[-0.035em] text-[#f0e7d7]">
            Every Legacy
            <span className="mt-2 block text-[#c7aa78]">
              Begins With a House.
            </span>
          </h1>

          <div className="mt-8 h-px w-20 bg-[#a9824b]/70" />

          <p className="mt-8 max-w-xl text-base leading-8 text-[#c5bdad] sm:text-lg">
            Found your House through heraldry, craftsmanship, and
            enduring tradition. Create a meaningful family crest,
            express your heritage through the Regiment Jacket,
            and preserve a story worthy of generations.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <Link
              href="/begin"
              className="inline-flex min-h-12 items-center justify-center border border-[#b08d57] bg-[#b08d57] px-7 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-[#171914] transition-colors duration-300 hover:border-[#d0ac75] hover:bg-[#d0ac75] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d0ac75]"
            >
              Establish Your House
            </Link>

            <Link
              href="#founding-journey"
              className="inline-flex min-h-12 items-center justify-center border border-[#756c5c] px-7 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-[#eee4d3] transition-colors duration-300 hover:border-[#c09a60] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d0ac75]"
            >
              Explore the Regiment
            </Link>
          </div>

          {/* Brand philosophy */}
          <div className="mt-12 max-w-lg border-t border-[#6e624f]/50 pt-7 lg:mt-16">
            <p className="font-serif text-base italic leading-7 text-[#b2a48e]">
              One Heritage. Every Generation.
            </p>

            <p className="mt-3 text-xs leading-6 tracking-[0.04em] text-[#928a7a]">
              Heritage interpreted through heraldry. Identity made
              tangible through craftsmanship.
            </p>
          </div>
        </div>

        {/* Cinematic hero artwork */}
        <div className="relative min-w-0 lg:py-6">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-8 bg-[radial-gradient(circle,rgba(176,141,87,0.12),transparent_65%)]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-3 -top-3 hidden h-[75%] w-[75%] border border-[#a9824b]/30 sm:block"
          />

          <div className="relative overflow-hidden border border-[#85704e]/60 bg-[#211f19] shadow-[0_35px_90px_rgba(0,0,0,0.5)]">

            {/* Image frame: consistent landscape presentation */}
            <div className="relative aspect-[16/9] overflow-hidden bg-[#171914]">

              <Image
                src="/images/family-regiment-hero-v4.png"
                alt="Cinematic Family Regiment heritage scene featuring an olive-green customized field jacket with embroidered family crest, heritage flags, name tape, and professional insignia"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-contain object-center"
              />

              {/* Subtle editorial shading */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#11130f]/65 via-transparent to-transparent"
              />

              {/* Editorial image caption */}
              <div className="absolute bottom-0 left-0 right-0 px-5 pb-6 pt-14 sm:px-8">
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#e0bd82]">
                  The Regiment Collection
                </p>

                <p className="mt-2 font-serif text-lg text-[#f0e7d7] sm:text-xl">
                  Heritage Meets Honor
                </p>
              </div>
            </div>

            {/* Image footer */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#6e624f]/50 bg-[#181914] px-5 py-4 sm:px-7">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#c5a16a]">
                The Family Regiment
              </p>

              <p className="text-[10px] uppercase tracking-[0.2em] text-[#9b9181]">
                Crafted for Legacy
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

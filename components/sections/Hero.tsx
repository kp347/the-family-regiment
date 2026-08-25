import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] overflow-hidden bg-[#171914] text-[#eee6d6]">
      {/* Warm atmospheric background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_40%,rgba(176,141,87,0.14),transparent_34%),linear-gradient(115deg,#171914_0%,#20231c_48%,#151611_100%)]" />

      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.025)_1px,transparent_1px)] [background-size:48px_48px]" />

      <div className="relative mx-auto grid min-h-[92vh] max-w-[1500px] items-center gap-14 px-7 py-20 lg:grid-cols-[0.85fr_1.15fr] lg:px-12 lg:py-24">
        {/* Copy */}
        <div className="relative z-10 max-w-2xl">
          <div className="mb-8 flex items-center gap-4">
            <span className="h-px w-12 bg-[#a9824b]" />

            <p className="text-xs font-semibold uppercase tracking-[0.38em] text-[#c09a60]">
              Establish Your House
            </p>
          </div>

          <h1 className="font-display text-5xl leading-[0.96] tracking-[-0.035em] text-[#f0e7d7] sm:text-6xl lg:text-7xl xl:text-[5.6rem]">
            Every Legacy
            <span className="block text-[#c7aa78]">Begins With a House.</span>
          </h1>

          <p className="mt-8 max-w-xl text-base leading-8 text-[#b9b09f] sm:text-lg">
            Found your House through heraldry, craftsmanship, and enduring
            tradition. Create a meaningful crest, commission your Regiment
            Jacket, and preserve a story worthy of generations.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/begin"
              className="inline-flex min-h-12 items-center justify-center border border-[#a9824b] bg-[#a9824b] px-7 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#171914] transition duration-300 hover:bg-[#c09a60]"
            >
              Establish Your House
            </Link>

            <Link
              href="#founding-journey"
              className="inline-flex min-h-12 items-center justify-center border border-[#756c5c] px-7 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#ddd3c1] transition duration-300 hover:border-[#b08d57] hover:text-[#f0e7d7]"
            >
              Explore the Regiment
            </Link>
          </div>

          <div className="mt-14 border-t border-[#6e624f]/50 pt-7">
            <p className="max-w-lg font-serif text-sm italic leading-6 text-[#918878]">
              Heritage interpreted through heraldry. Identity made tangible
              through craftsmanship.
            </p>
          </div>
        </div>

        {/* Hero artwork */}
        <div className="relative lg:min-h-[650px]">
          <div className="absolute -inset-10 bg-[radial-gradient(circle,rgba(176,141,87,0.13),transparent_65%)]" />

          <div className="relative overflow-hidden border border-[#7a6749]/50 bg-[#211f19] shadow-[0_40px_100px_rgba(0,0,0,0.55)]">
            <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#171914]/35 via-transparent to-transparent" />

            {/*
              VDR-1 ARTWORK:
              Place the approved Family Regiment hero image at:
              public/images/family-regiment-hero.png
            */}
            <div className="relative aspect-[4/3]">
              <Image
                src="/images/family-regiment-hero.png"
                alt="The Family Regiment heritage jacket displayed with heraldic and legacy artifacts"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover"
              />
            </div>

            <div className="relative z-20 flex items-center justify-between border-t border-[#6e624f]/50 bg-[#181914]/95 px-5 py-4 sm:px-7">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#9f7d4b]">
                  The Family Regiment
                </p>

                <p className="mt-1 font-serif text-sm text-[#d8cebc]">
                  Heritage Meets Honor
                </p>
              </div>

              <p className="hidden text-[10px] uppercase tracking-[0.25em] text-[#766e61] sm:block">
                Built to Endure
              </p>
            </div>
          </div>

          {/* Small material detail */}
          <div className="absolute -bottom-6 -left-6 hidden border border-[#776344]/50 bg-[#242119]/95 px-6 py-5 shadow-2xl xl:block">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#a9824b]">
              The Regiment Standard
            </p>

            <p className="mt-2 font-serif text-sm text-[#cfc4b1]">
              Heraldry · Canvas · Brass · Embroidery
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
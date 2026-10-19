
import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/layout/Navigation";

const details = [
  {
    number: "01",
    title: "The Field Jacket",
    description:
      "A military-inspired olive-drab field jacket selected as the foundation for a personal collection of family insignia, heritage symbols, and achievements.",
  },
  {
    number: "02",
    title: "Your Family Crest",
    description:
      "A heraldic identity shaped by your family's history, values, and aspirations. Designed with the proportions and limitations of embroidered patches in mind.",
  },
  {
    number: "03",
    title: "The Regiment Insignia",
    description:
      "Personalize your jacket with heritage flags, a family name tape, professional symbols, and other meaningful insignia arranged across designated placements.",
  },
];

const steps = [
  {
    number: "I",
    title: "Establish Your Identity",
    description:
      "Begin with your family's story or proceed directly to the jacket workshop.",
  },
  {
    number: "II",
    title: "Compose Your Regiment",
    description:
      "Explore crest treatments, patch combinations, and the visual arrangement of your jacket.",
  },
  {
    number: "III",
    title: "Prepare for Production",
    description:
      "Final garment specifications, patch construction, pricing, and fulfillment options will be confirmed before commercial ordering opens.",
  },
];

export default function JacketPage() {
  return (
    <>
      <Navigation />

      <main className="bg-[#171914] text-[#eee6d6]">
        <section className="relative overflow-hidden border-b border-[#65583d]/40">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(116,108,66,0.18),transparent_48%)]"
          />

          <div className="relative mx-auto grid max-w-[1500px] items-center gap-12 px-6 py-20 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-12 lg:py-28">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#c5a16a]">
                The Regiment Collection
              </p>

              <h1 className="font-display mt-7 text-[clamp(3.5rem,6vw,6.5rem)] leading-[1.02] tracking-[-0.035em]">
                The Regiment
                <span className="block text-[#c7aa78]">
                  Jacket.
                </span>
              </h1>

              <div className="mt-8 h-px w-20 bg-[#b08d57]" />

              <p className="mt-8 max-w-xl text-xl leading-9 text-[#ddd2bf]">
                One jacket. A lifetime of meaning.
              </p>

              <p className="mt-5 max-w-xl text-base leading-8 text-[#b9b1a2]">
                Inspired by the enduring utility of the military
                field jacket, The Regiment Jacket is envisioned
                as a wearable expression of family heritage,
                personal achievement, and the stories worth
                carrying forward.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/builder"
                  className="inline-flex min-h-12 items-center justify-center bg-[#b08d57] px-7 py-3 text-center text-xs font-semibold uppercase tracking-[0.16em] text-[#171914] transition-colors hover:bg-[#d0b17c]"
                >
                  Enter the Jacket Workshop
                </Link>

                <Link
                  href="/begin"
                  className="inline-flex min-h-12 items-center justify-center border border-[#b08d57]/70 px-7 py-3 text-center text-xs font-semibold uppercase tracking-[0.16em] text-[#eee6d6] transition-colors hover:bg-[#b08d57]/10"
                >
                  Establish Your House
                </Link>
              </div>

              <p className="mt-7 text-xs leading-6 text-[#a79e8d]">
                Product concept in development. Final garment,
                customization options, pricing, and ordering
                availability are subject to production validation.
              </p>
            </div>

            <div>
              <div className="relative overflow-hidden border border-[#7e6b4c]/60 bg-[#24251e] shadow-[0_30px_90px_rgba(0,0,0,0.35)]">
                <div className="relative aspect-[16/10]">
                  <Image
                    src="/images/family-regiment-hero-v4.png"
                    alt="Concept visualization of the olive Regiment Jacket with family crest, heritage flags, name tape, and professional insignia"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="object-contain"
                  />
                </div>

                <div className="flex flex-col gap-2 border-t border-[#7e6b4c]/40 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs uppercase tracking-[0.18em] text-[#d7c29d]">
                    The Regiment Jacket
                  </p>

                  <p className="text-xs italic text-[#aaa08d]">
                    Conceptual product visualization
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#f4ede1] py-24 text-[#2d2822] sm:py-28">
          <div className="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-12">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8b542f]">
                The Anatomy of a Regiment
              </p>

              <h2 className="font-display mt-6 text-4xl leading-tight sm:text-5xl lg:text-6xl">
                Every Detail Has Meaning.
              </h2>

              <p className="mt-7 text-lg leading-8 text-[#655a4f]">
                The jacket is the canvas. The insignia tell
                the story. Together, they create an identity
                that is distinctly your own.
              </p>
            </div>

            <div className="mt-14 grid gap-8 border-t border-[#cdb690] pt-10 md:grid-cols-3">
              {details.map((detail) => (
                <div key={detail.number}>
                  <p className="text-xs tracking-[0.25em] text-[#8b542f]">
                    {detail.number}
                  </p>

                  <h3 className="font-display mt-6 text-2xl">
                    {detail.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-[#6b6053]">
                    {detail.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#20221b] py-24 sm:py-28">
          <div className="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-12">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#c5a16a]">
                From Identity to Insignia
              </p>

              <h2 className="font-display mt-6 text-4xl leading-tight sm:text-5xl lg:text-6xl">
                Your Story.
                <span className="block text-[#c7aa78]">
                  Your Regiment.
                </span>
              </h2>
            </div>

            <div className="mt-14 grid gap-10 border-t border-[#65583d]/60 pt-10 md:grid-cols-3">
              {steps.map((step) => (
                <div key={step.number}>
                  <p className="font-display text-4xl text-[#c7aa78]">
                    {step.number}
                  </p>

                  <h3 className="font-display mt-6 text-2xl">
                    {step.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-[#b9b1a2]">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-16 flex flex-col items-start justify-between gap-8 border-t border-[#65583d]/60 pt-10 sm:flex-row sm:items-center">
              <div>
                <p className="font-display text-3xl text-[#eee6d6]">
                  Begin with what matters.
                </p>

                <p className="mt-3 text-sm leading-7 text-[#b9b1a2]">
                  Explore your jacket configuration in the
                  Regiment Workshop.
                </p>
              </div>

              <Link
                href="/builder"
                className="inline-flex min-h-12 items-center justify-center border border-[#b08d57] px-7 py-3 text-center text-xs font-semibold uppercase tracking-[0.16em] text-[#eee6d6] transition-colors hover:bg-[#b08d57] hover:text-[#171914]"
              >
                Customize Your Regiment Jacket
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

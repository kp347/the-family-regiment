
import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/layout/Navigation";

const heritageEditorials = [
  {
    number: "01",
    title: "A Mark of Distinction",
    category: "The Heritage Blazer",
    description:
      "A refined expression of personal heritage. Classic navy tailoring and a restrained family crest worn over the heart.",
    image:
      "/images/heritage-blazer/heritage-gentleman-grey-beard.webp",
    alt: "Distinguished mature gentleman wearing a navy heritage blazer with a gold crest and white trousers",
  },
  {
    number: "02",
    title: "The Language of Tradition",
    category: "Classic Tailoring",
    description:
      "Timeless proportions, warm neutrals, and understated heraldry bring family identity into a more formal setting.",
    image:
      "/images/heritage-blazer/heritage-gentleman-khaki.webp",
    alt: "Mature gentleman in a navy heritage blazer with a gold family crest and khaki trousers",
  },
  {
    number: "03",
    title: "A Legacy Shared",
    category: "The Next Generation",
    description:
      "A mother and her two sons carry the same family emblem, expressing a shared heritage across generations.",
    image:
      "/images/heritage-blazer/heritage-family-mother-two-sons.webp",
    alt: "Mother and two young sons wearing coordinated navy blazers with understated gold family crests",
  },
];

export default function CollectionPage() {
  return (
    <>
      <Navigation />

      <main className="bg-[#171914] text-[#eee6d6]">
        {/* Collection introduction */}
        <section className="relative overflow-hidden border-b border-[#756445]/40 py-24 sm:py-28 lg:py-32">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(135,116,74,0.15),transparent_45%)]"
          />

          <div className="relative mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#c5a16a]">
              The Family Regiment · The Collection
            </p>

            <h1 className="font-display mt-8 max-w-5xl text-[clamp(3.5rem,7vw,7rem)] leading-[1.03] tracking-[-0.035em]">
              A Heritage
              <span className="block text-[#c7aa78]">
                Worn Forward.
              </span>
            </h1>

            <div className="mt-10 h-px w-24 bg-[#b08d57]" />

            <p className="mt-9 max-w-3xl text-xl leading-9 text-[#d3c9b9]">
              What we inherit, build, and stand for deserves
              to be carried with intention.
            </p>

            <p className="mt-5 max-w-3xl text-base leading-8 text-[#aaa191]">
              Our collection brings family heraldry into
              everyday life through garments and artifacts
              designed to express identity and connect generations.
            </p>
          </div>
        </section>

        {/* Founding garment */}
        <section className="bg-[#f3ecdf] py-24 text-[#2d2822] sm:py-28">
          <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12">
            <div className="mb-12">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8b542f]">
                Collection No. 001 · Founding Garment
              </p>

              <h2 className="font-display mt-5 text-4xl sm:text-5xl lg:text-6xl">
                The Regiment Jacket
              </h2>
            </div>

            <div className="grid overflow-hidden border border-[#c8b592] bg-[#e8dece] lg:grid-cols-[1.25fr_.75fr]">
              <div className="relative min-h-[320px] bg-[#282820] sm:min-h-[450px] lg:min-h-[580px]">
                <Image
                  src="/images/family-regiment-hero-v4.png"
                  alt="Concept visualization of an olive field jacket with personalized heritage insignia"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 65vw"
                  className="object-cover"
                />

                <span className="absolute bottom-5 left-5 bg-[#171914]/85 px-4 py-2 text-[10px] uppercase tracking-[0.14em] text-[#eee6d6]">
                  Concept Visualization
                </span>
              </div>

              <div className="flex flex-col justify-center px-8 py-12 sm:px-12 lg:px-14">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8b542f]">
                  The Founding Garment
                </p>

                <h3 className="font-display mt-6 text-4xl leading-tight">
                  The Jacket That
                  <span className="block italic text-[#8b6a45]">
                    Tells Your Story.
                  </span>
                </h3>

                <p className="mt-7 text-base leading-8 text-[#655a4f]">
                  Heritage flags, a family crest, name tapes,
                  and personal insignia come together on
                  an olive-drab field jacket inspired by
                  military tradition.
                </p>

                <p className="mt-5 text-sm leading-7 text-[#817362]">
                  The jacket and patch system are being prepared
                  for production validation. Final specifications
                  and ordering details will be confirmed before launch.
                </p>

                <div className="mt-9 flex flex-col gap-4">
                  <Link
                    href="/jacket"
                    className="inline-flex min-h-12 items-center justify-center bg-[#8b542f] px-6 py-3 text-center text-xs font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#653b23]"
                  >
                    Explore the Regiment Jacket
                  </Link>

                  <Link
                    href="/builder"
                    className="inline-flex min-h-12 items-center justify-center border border-[#8b542f] px-6 py-3 text-center text-xs font-semibold uppercase tracking-[0.14em] text-[#653b23] transition-colors hover:bg-[#8b542f] hover:text-white"
                  >
                    Enter the Jacket Workshop
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Future collection editorial gallery */}
        <section className="bg-[#20221b] py-24 sm:py-28">
          <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12">
            <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
              <div className="max-w-3xl">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#c5a16a]">
                  The Collection Ahead
                </p>

                <h2 className="font-display mt-6 text-4xl leading-tight sm:text-5xl lg:text-6xl">
                  Beyond the
                  <span className="block text-[#c7aa78]">
                    Founding Garment.
                  </span>
                </h2>

                <p className="mt-7 text-lg leading-8 text-[#b9b1a2]">
                  The Regiment Jacket is only the beginning.
                  Our future collections envision a more formal
                  expression of family heritage, shared across
                  generations.
                </p>
              </div>

              <span className="self-start border border-[#8a744e]/60 px-4 py-2 text-[10px] uppercase tracking-[0.16em] text-[#c7b28d] lg:self-end">
                Future Collection · Concept Preview
              </span>
            </div>

            <div className="mt-14 grid gap-8 md:grid-cols-3">
              {heritageEditorials.map((item) => (
                <article
                  key={item.number}
                  className="flex flex-col overflow-hidden border border-[#756445]/50 bg-[#25271f]"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-[#34362d]">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 hover:scale-[1.025]"
                    />

                    <span className="absolute left-4 top-4 bg-[#171914]/90 px-3 py-2 text-[10px] uppercase tracking-[0.14em] text-[#eee6d6]">
                      Editorial Concept
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-7">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-xs uppercase tracking-[0.16em] text-[#c5a16a]">
                        {item.category}
                      </p>

                      <span className="text-xs text-[#9c907b]">
                        {item.number}
                      </span>
                    </div>

                    <h3 className="font-display mt-5 text-2xl leading-tight lg:text-3xl">
                      {item.title}
                    </h3>

                    <p className="mt-5 flex-1 text-sm leading-7 text-[#b9b1a2]">
                      {item.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-12 flex flex-col items-start justify-between gap-7 border-t border-[#756445]/50 pt-9 sm:flex-row sm:items-center">
              <p className="max-w-2xl text-xs leading-6 text-[#a99e8c]">
                These photographs are conceptual visualizations
                of future apparel. The Heritage Blazer, women's
                apparel, and children's apparel are not currently
                available for purchase.
              </p>

              <Link
                href="/blazer"
                className="inline-flex min-h-12 shrink-0 items-center justify-center border border-[#b08d57] px-6 py-3 text-center text-xs font-semibold uppercase tracking-[0.14em] text-[#eee6d6] transition-colors hover:bg-[#b08d57]/10"
              >
                Explore the Heritage Blazer
              </Link>
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="bg-[#171914] py-20 text-center sm:py-24">
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="font-display text-3xl leading-tight sm:text-4xl">
              Every House Has a Beginning.
            </h2>

            <p className="mt-5 text-base leading-8 text-[#b9b1a2]">
              Discover the heritage behind your family
              identity, or begin composing your Regiment Jacket.
            </p>

            <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/begin"
                className="inline-flex min-h-12 items-center justify-center bg-[#b08d57] px-7 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#171914] transition-colors hover:bg-[#d0b17c]"
              >
                Establish Your House
              </Link>

              <Link
                href="/jacket"
                className="inline-flex min-h-12 items-center justify-center border border-[#b08d57] px-7 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#eee6d6] transition-colors hover:bg-[#b08d57]/10"
              >
                Explore the Jacket
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

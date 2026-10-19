
import Image from "next/image";
import Link from "next/link";

import Navigation from "@/components/layout/Navigation";

const gallery = [
  {
    src: "/images/heritage-blazer/heritage-gentleman-grey-beard.webp",
    alt: "Gentleman wearing a navy heritage blazer with a gold family crest",
    title: "A Mark of Distinction",
    description:
      "A personal emblem, worn with confidence and restraint.",
  },
  {
    src: "/images/heritage-blazer/heritage-gentleman-khaki.webp",
    alt: "Gentleman wearing a navy crest blazer with khaki trousers",
    title: "The Language of Tradition",
    description:
      "Classic tailoring meets a modern expression of family heritage.",
  },
  {
    src: "/images/heritage-blazer/heritage-family-mother-two-sons.webp",
    alt: "Mother and two sons wearing coordinated navy blazers with family crests",
    title: "A Legacy Shared",
    description:
      "One family identity, carried by different generations.",
  },
];

export default function BlazerPage() {
  return (
    <>
      <Navigation />

      <main className="bg-[#171914] text-[#eee6d6]">
        {/* HERO */}
        <section className="relative overflow-hidden">
          <div className="grid min-h-[680px] lg:grid-cols-2">
            <div className="relative z-10 flex flex-col justify-center px-6 py-20 sm:px-10 lg:px-16 xl:px-24">
              <div className="flex flex-wrap items-center gap-4">
                <p className="text-xs font-semibold uppercase tracking-[0.27em] text-[#c5a16a]">
                  The Founding Collection
                </p>

                <span className="border border-[#8a744e] px-3 py-1.5 text-[10px] uppercase tracking-[0.12em] text-[#c7b28d]">
                  Heritage Blazer
                </span>
              </div>

              <h1 className="font-display mt-10 text-[clamp(3.5rem,6vw,6.5rem)] leading-[1.05] tracking-[-0.035em]">
                The Heritage
                <span className="block text-[#c7aa78]">
                  Blazer.
                </span>
              </h1>

              <div className="mt-9 h-px w-20 bg-[#b08d57]" />

              <p className="font-display mt-8 max-w-xl text-2xl italic leading-relaxed text-[#e0d2bc]">
                A quieter expression of an enduring identity.
              </p>

              <p className="mt-7 max-w-xl text-base leading-8 text-[#b9b1a2]">
                The Heritage Blazer brings classic tailoring
                together with the personal heraldry of your
                House. A larger, traditionally styled family
                crest is worn over the heart, carrying your
                House Name, chosen symbols, and Latin motto.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/blazer/builder"
                  className="inline-flex min-h-12 items-center justify-center bg-[#b08d57] px-7 py-3 text-center text-xs font-semibold uppercase tracking-[0.15em] text-[#171914] transition-colors hover:bg-[#d0b17c]"
                >
                  Design Your Heritage Crest
                </Link>

                <Link
                  href="/collection"
                  className="inline-flex min-h-12 items-center justify-center border border-[#b08d57] px-7 py-3 text-center text-xs font-semibold uppercase tracking-[0.15em] text-[#eee6d6] transition-colors hover:bg-[#b08d57]/10"
                >
                  Explore the Collection
                </Link>
              </div>

              <p className="mt-6 text-xs leading-6 text-[#8f887b]">
                Founding collection in development. Orders
                will open following production validation.
              </p>
            </div>

            <div className="relative min-h-[500px] bg-[#292a22] lg:min-h-[680px]">
              <Image
                src={gallery[0].src}
                alt={gallery[0].alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />

              <div className="absolute bottom-6 left-6 bg-[#171914]/85 px-4 py-2 text-[10px] uppercase tracking-[0.14em] text-[#eee6d6]">
                Editorial Concept Visualization
              </div>
            </div>
          </div>
        </section>

        {/* PRODUCT DISTINCTION */}
        <section className="border-y border-[#b08d57]/15 bg-[#20221b]">
          <div className="mx-auto grid max-w-[1440px] gap-8 px-6 py-12 sm:px-8 md:grid-cols-3 lg:px-12">
            <Feature
              number="01"
              title="Your House Name"
              description="Your surname or chosen House identity, integrated into the crest."
            />

            <Feature
              number="02"
              title="Your Heraldry"
              description="A personal shield and symbol drawn from the Family Regiment's heraldic design system."
            />

            <Feature
              number="03"
              title="Your Latin Motto"
              description="The words that define your House, presented on a traditional heraldic scroll."
            />
          </div>
        </section>

        {/* DESIGN PHILOSOPHY */}
        <section className="bg-[#f3ecdf] py-24 text-[#2d2822] sm:py-28">
          <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8b542f]">
                The Design Philosophy
              </p>

              <h2 className="font-display mt-6 text-4xl leading-tight sm:text-5xl lg:text-6xl">
                Distinction
                <span className="block italic text-[#8b6a45]">
                  Without Excess.
                </span>
              </h2>

              <p className="mt-7 text-lg leading-8 text-[#655a4f]">
                Where the Regiment Jacket tells a layered
                story through multiple insignia, the Heritage
                Blazer distills that identity into one
                deliberate emblem.
              </p>

              <p className="mt-5 max-w-2xl text-base leading-8 text-[#655a4f]">
                Its larger left-chest crest brings together
                your House Name, heraldic shield, family
                symbol, and Latin motto. No additional patches
                or name tape are required.
              </p>
            </div>

            <div className="mt-14 grid gap-8 md:grid-cols-2">
              {gallery.slice(1).map((item, index) => (
                <article key={item.src}>
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#d7c8af]">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>

                  <p className="mt-7 text-xs uppercase tracking-[0.2em] text-[#8b542f]">
                    Editorial Study 0{index + 1}
                  </p>

                  <h3 className="font-display mt-3 text-3xl">
                    {item.title}
                  </h3>

                  <p className="mt-4 max-w-lg text-sm leading-7 text-[#6b6053]">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* TWO GARMENTS, ONE HOUSE */}
        <section className="bg-[#20221b] py-24 sm:py-28">
          <div className="mx-auto grid max-w-[1440px] gap-12 px-6 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:px-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#c5a16a]">
                The Founding Collection
              </p>

              <h2 className="font-display mt-6 text-4xl leading-tight sm:text-5xl">
                One Heritage.
                <span className="block text-[#c7aa78]">
                  Two Expressions.
                </span>
              </h2>
            </div>

            <div>
              <p className="text-lg leading-9 text-[#c7bdad]">
                The Family Regiment begins with two
                complementary garments: the Regiment Jacket
                and the Heritage Blazer.
              </p>

              <p className="mt-6 text-sm leading-7 text-[#a99e8c]">
                Both carry the identity of your House. The
                Regiment Jacket offers layered personalization
                through its crest, heritage patches, identity
                insignia, and name tape. The Heritage Blazer
                offers a single, refined heraldic crest over
                the heart.
              </p>

              <p className="mt-6 text-sm leading-7 text-[#a99e8c]">
                Both garments are being prepared for a
                coordinated launch, subject to sourcing,
                production, and fulfillment readiness.
                Photography illustrates the design direction
                rather than finalized production garments.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/blazer/builder"
                  className="inline-flex min-h-12 items-center justify-center bg-[#b08d57] px-7 py-3 text-center text-xs font-semibold uppercase tracking-[0.14em] text-[#171914] transition-colors hover:bg-[#d0b17c]"
                >
                  Create Your Heritage Crest
                </Link>

                <Link
                  href="/jacket"
                  className="inline-flex min-h-12 items-center justify-center border border-[#b08d57] px-7 py-3 text-center text-xs font-semibold uppercase tracking-[0.14em] text-[#eee6d6] transition-colors hover:bg-[#b08d57]/10"
                >
                  Explore the Regiment Jacket
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

function Feature({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="border-l border-[#b08d57]/35 pl-6">
      <p className="text-xs font-semibold tracking-[0.2em] text-[#b08d57]">
        {number}
      </p>

      <h3 className="font-display mt-3 text-2xl text-[#eee6d6]">
        {title}
      </h3>

      <p className="mt-3 max-w-sm text-sm leading-7 text-[#a99e8c]">
        {description}
      </p>
    </div>
  );
}

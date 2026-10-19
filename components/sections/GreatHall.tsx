
import Image from "next/image";
import Link from "next/link";

const families = [
  {
    name: "The Anderson Family",
    motto: "Fortitude Through Service",
    description: "A legacy shaped by service and resilience.",
  },
  {
    name: "The Harrison Family",
    motto: "Honor Before Self",
    description: "A house guided by duty and conviction.",
  },
  {
    name: "The Morales Family",
    motto: "Faith • Courage • Stewardship",
    description: "A heritage grounded in enduring values.",
  },
];

export default function GreatHall() {
  return (
    <section
      id="great-hall"
      className="scroll-mt-20 bg-[#f5efe4] py-24 text-[#2d2822] sm:py-28"
    >
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <div className="mb-16 max-w-3xl lg:mb-20">
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[#8b542f]">
            Article V · The Great Hall
          </p>

          <h2 className="font-display mt-6 text-5xl leading-tight lg:text-6xl">
            The Great Hall
          </h2>

          <div className="mt-8 h-px w-20 bg-[#b68b47]" />

          <p className="mt-8 max-w-2xl text-lg leading-8 text-[#655a4f]">
            Every family has a story worth preserving. The Great Hall
            is envisioned as a gathering place for the houses of
            The Family Regiment — a collection of family identities,
            heraldic symbols, mottos, and the histories behind them.
          </p>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-[#817362]">
            As the Regiment grows, this space is intended to celebrate
            the families who choose to share their heritage and
            carry their stories forward.
          </p>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_.9fr] lg:gap-20">
          <div className="relative">
            <div className="absolute -left-3 top-4 h-full w-full border border-[#cdb690] sm:-left-6 sm:top-6" />

            <div className="relative overflow-hidden border border-[#c7ae86] bg-[#efe6d6] shadow-[0_35px_80px_rgba(40,28,18,.15)]">
              <Image
                src="/images/patch-closeup.png"
                alt="Illustrative heraldic crest representing the Family Regiment vision"
                width={1200}
                height={1400}
                className="h-auto w-full object-cover"
              />
            </div>

            <p className="relative mt-5 text-xs italic leading-6 text-[#817362]">
              Conceptual heraldic artwork illustrating the Great Hall vision.
            </p>
          </div>

          <div>
            <p className="text-sm uppercase tracking-[0.30em] text-[#8b542f]">
              An Illustration of the Vision
            </p>

            <h3 className="font-display mt-5 text-4xl leading-tight">
              The Founding Regiment
            </h3>

            <p className="mt-4 text-xl italic text-[#705b48]">
              &ldquo;Fortis Fortuna Adiuvat&rdquo;
            </p>

            <p className="mt-8 leading-8 text-[#665b50]">
              A crest is more than an arrangement of symbols.
              It can express a family&apos;s convictions,
              sacrifices, traditions, and aspirations —
              a visual identity intended to endure beyond
              a single generation.
            </p>

            <div className="mt-12 border-t border-[#d7c5aa] pt-6">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8b542f]">
                Illustrative Houses
              </p>

              <p className="mt-3 text-sm leading-7 text-[#817362]">
                The following fictional families demonstrate how
                different values and traditions might be represented
                within the Great Hall. They are not customer records
                or registered houses.
              </p>
            </div>

            <div className="mt-6 space-y-6">
              {families.map((family) => (
                <div
                  key={family.name}
                  className="border-t border-[#d7c5aa] pt-6"
                >
                  <h4 className="font-display text-2xl">
                    {family.name}
                  </h4>

                  <p className="mt-2 italic text-[#7b664d]">
                    {family.motto}
                  </p>

                  <p className="mt-2 text-sm leading-6 text-[#817362]">
                    {family.description}
                  </p>
                </div>
              ))}
            </div>

            <Link
              href="/great-hall"
              className="mt-12 inline-flex border-b border-[#8b542f] pb-1 text-sm font-semibold text-[#653b23] transition-colors hover:text-[#9b683d]"
            >
              Explore the Great Hall
              <span aria-hidden="true" className="ml-2">
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";

const families = [
  {
    name: "The Anderson Family",
    motto: "Fortitude Through Service",
    year: "Founded 2026",
  },
  {
    name: "The Harrison Family",
    motto: "Honor Before Self",
    year: "Founded 2026",
  },
  {
    name: "The Morales Family",
    motto: "Faith • Courage • Stewardship",
    year: "Founded 2026",
  },
];

export default function GreatHall() {
  return (
    <section
      id="great-hall"
      className="scroll-mt-20 bg-[#f5efe4] py-28 text-[#2d2822]"
    >
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <div className="mb-20 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[#8b542f]">
            Article IV
          </p>

          <h2 className="font-display mt-6 text-5xl leading-tight lg:text-6xl">
            The Great Hall
          </h2>

          <div className="mt-8 h-px w-20 bg-[#b68b47]" />

          <p className="mt-8 max-w-2xl text-lg leading-8 text-[#655a4f]">
            Every family that completes its heraldic journey becomes part of a
            permanent collection. The Great Hall is a living archive where
            stories, symbols, mottos, and legacies are preserved for future
            generations.
          </p>
        </div>

        <div className="grid items-center gap-20 lg:grid-cols-[1.1fr_.9fr]">
          <div className="relative">
            <div className="absolute -left-6 top-6 h-full w-full border border-[#cdb690]" />

            <div className="relative overflow-hidden border border-[#c7ae86] bg-[#efe6d6] shadow-[0_35px_80px_rgba(40,28,18,.15)]">
              <Image
                src="/images/patch-closeup.png"
                alt="Featured Family Regiment heraldic crest"
                width={1200}
                height={1400}
                className="w-full object-cover"
              />
            </div>
          </div>

          <div>
            <p className="text-sm uppercase tracking-[0.30em] text-[#8b542f]">
              Featured Family
            </p>

            <h3 className="font-display mt-5 text-4xl">
              The Founding Regiment
            </h3>

            <p className="mt-4 text-xl italic text-[#705b48]">
              &ldquo;Fortis Fortuna Adiuvat&rdquo;
            </p>

            <p className="mt-8 leading-8 text-[#665b50]">
              Every crest displayed within the Great Hall represents more than
              artwork. It represents a family&apos;s convictions, sacrifices,
              traditions, and commitment to carrying their story forward.
            </p>

            <div className="mt-14 space-y-6">
              {families.map((family) => (
                <div
                  key={family.name}
                  className="border-t border-[#d7c5aa] pt-6"
                >
                  <h4 className="font-display text-2xl">{family.name}</h4>

                  <p className="mt-2 italic text-[#7b664d]">
                    {family.motto}
                  </p>

                  <p className="mt-1 text-sm uppercase tracking-[0.18em] text-[#9a8667]">
                    {family.year}
                  </p>
                </div>
              ))}
            </div>

            <Link
              href="/great-hall"
              className="mt-14 inline-flex border-b border-[#8b542f] pb-1 text-sm font-semibold text-[#653b23]"
            >
              Explore the Great Hall
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
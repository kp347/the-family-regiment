const principles = [
  {
    number: "01",
    title: "Discover",
    description:
      "Understand the people, places, convictions, and traditions that formed your family.",
  },
  {
    number: "02",
    title: "Preserve",
    description:
      "Create a lasting record of the identity your family chooses to carry forward.",
  },
  {
    number: "03",
    title: "Express",
    description:
      "Translate that identity into heraldry, language, and meaningful heirloom objects.",
  },
];

export default function Mission() {
  return (
    <section
      id="mission"
      className="relative scroll-mt-20 overflow-hidden bg-[#171813] py-24 text-[#f3eadc] lg:py-32"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(184,149,89,0.12),transparent_30%)]" />

      <div className="pointer-events-none absolute inset-5 border border-[#b89559]/15 sm:inset-8" />

      <div className="relative mx-auto max-w-[1440px] px-7 lg:px-12">
        <div className="grid gap-14 lg:grid-cols-[0.58fr_1.42fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[#c8a86b]">
              Article II
            </p>

            <div className="mt-6 h-px w-16 bg-[#b89559]" />

            <p className="mt-6 max-w-xs text-sm uppercase leading-7 tracking-[0.18em] text-[#8f877a]">
              The purpose of the institution
            </p>
          </div>

          <div>
            <h2 className="font-display max-w-5xl text-4xl font-medium leading-[1.04] tracking-[-0.02em] sm:text-5xl lg:text-6xl">
              Family identity should be understood before it is designed.
            </h2>

            <div className="mt-10 grid gap-8 border-t border-[#b89559]/25 pt-10 lg:grid-cols-[1fr_0.8fr]">
              <p className="max-w-2xl text-lg leading-8 text-[#cbc2b4]">
                The Family Regiment guides families through a deliberate
                process of discovery before a crest, motto, patch, or artifact
                is created. The goal is not decoration. It is the faithful
                expression of an identity the family recognizes as its own.
              </p>

              <blockquote className="border-l border-[#b89559] pl-7">
                <p className="font-display text-2xl italic leading-9 text-[#e8dac3]">
                  “The family comes before the crest. Meaning comes before
                  ornament.”
                </p>
              </blockquote>
            </div>
          </div>
        </div>

        <div className="mt-20 grid border-l border-t border-[#b89559]/25 md:grid-cols-3">
          {principles.map((principle) => (
            <article
              key={principle.number}
              className="min-h-[285px] border-b border-r border-[#b89559]/25 p-8 transition-colors duration-300 hover:bg-white/[0.025] lg:p-10"
            >
              <p className="text-xs font-semibold tracking-[0.25em] text-[#b89559]">
                {principle.number}
              </p>

              <h3 className="font-display mt-14 text-3xl font-medium text-[#f3eadc]">
                {principle.title}
              </h3>

              <p className="mt-5 max-w-sm leading-7 text-[#aaa194]">
                {principle.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
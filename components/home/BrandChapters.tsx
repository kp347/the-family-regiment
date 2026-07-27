const chapters = [
  {
    number: "01",
    title: "Heritage",
    description:
      "The countries, cultures, traditions, and family origins that shaped who you are.",
  },
  {
    number: "02",
    title: "Service",
    description:
      "Military, civic, medical, educational, and community service carried across generations.",
  },
  {
    number: "03",
    title: "Achievement",
    description:
      "The professions, milestones, education, and craftsmanship that define your family story.",
  },
  {
    number: "04",
    title: "Adventure",
    description:
      "The journeys, passions, and experiences that became stories worth preserving.",
  },
  {
    number: "05",
    title: "Legacy",
    description:
      "The names, principles, symbols, and traditions intended to outlive one generation.",
  },
];

export default function BrandChapters() {
  return (
    <section className="border-b border-white/10 bg-[#171819] px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="text-xs uppercase tracking-[0.45em] text-[#B08D57]">
              The Regiment System
            </p>

            <h2 className="mt-6 max-w-xl text-5xl font-semibold leading-[0.95] tracking-[-0.04em] md:text-7xl">
              A family story,
              <br />
              told in chapters.
            </h2>

            <p className="mt-8 max-w-xl text-lg leading-8 text-[#AAA69E]">
              Every jacket is built from five parts of identity. Together, they
              create a modern record of where a family came from, what it has
              accomplished, and what it intends to carry forward.
            </p>
          </div>

          <div className="border-t border-white/10">
            {chapters.map((chapter) => (
              <article
                key={chapter.number}
                className="grid gap-5 border-b border-white/10 py-8 md:grid-cols-[90px_1fr] md:py-10"
              >
                <p className="text-xs tracking-[0.35em] text-[#B08D57]">
                  {chapter.number}
                </p>

                <div>
                  <h3 className="text-3xl text-[#F6F2EA] md:text-4xl">
                    {chapter.title}
                  </h3>

                  <p className="mt-4 max-w-2xl text-base leading-7 text-[#96928B]">
                    {chapter.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
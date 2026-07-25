export default function BrandStory() {
  return (
    <section
      id="about"
      className="border-b border-white/10 bg-[#1A1B1C] px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="lg:sticky lg:top-32">
            <p className="text-xs uppercase tracking-[0.45em] text-[#B08D57]">
              The House
            </p>

            <h2 className="mt-6 max-w-xl text-5xl font-semibold leading-[0.95] tracking-[-0.04em] md:text-7xl">
              What we inherit.
              <br />
              What we become.
            </h2>

            <p className="mt-8 max-w-lg text-lg leading-8 text-[#AAA69E]">
              The Family Regiment creates modern heirlooms from the places,
              principles, achievements, and stories that shape a family.
            </p>
          </div>

          <div className="space-y-6">
            <StoryChapter
              number="01"
              title="Identity deserves form"
              text="Most family stories live in photographs, names, and memories. We translate them into symbols that can be worn, displayed, and passed forward."
            />

            <StoryChapter
              number="02"
              title="Heritage without costume"
              text="The Regiment Jacket draws from military fieldwear, heraldry, and traditional embroidery without becoming a replica of the past. It is designed for modern life."
            />

            <StoryChapter
              number="03"
              title="Personal, not mass-produced"
              text="Each jacket begins with a shared silhouette but becomes distinct through its crest, motto, colors, monogram, and selected chapter patches."
            />

            <StoryChapter
              number="04"
              title="Built for generations"
              text="Every element is developed with embroidery production in mind, allowing the finished garment to feel considered, durable, and worthy of becoming an heirloom."
            />

            <div className="rounded-[2rem] border border-[#B08D57]/40 bg-[#20211E] p-8 md:p-10">
              <p className="text-xs uppercase tracking-[0.35em] text-[#B08D57]">
                Our Purpose
              </p>

              <blockquote className="mt-6 text-3xl leading-tight text-[#F6F2EA] md:text-4xl">
                “To give families a new way to wear where they come from and
                what they stand for.”
              </blockquote>

              <div className="mt-10 flex items-center gap-4">
                <div className="h-px w-12 bg-[#B08D57]" />

                <p className="text-xs uppercase tracking-[0.3em] text-[#8F8B82]">
                  The Family Regiment
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

type StoryChapterProps = {
  number: string;
  title: string;
  text: string;
};

function StoryChapter({
  number,
  title,
  text,
}: StoryChapterProps) {
  return (
    <article className="rounded-[2rem] border border-white/10 bg-[#202122] p-8 transition hover:border-white/20 md:p-10">
      <div className="flex flex-col gap-8 md:flex-row md:items-start">
        <p className="shrink-0 text-xs tracking-[0.35em] text-[#B08D57]">
          {number}
        </p>

        <div>
          <h3 className="text-3xl text-[#F6F2EA] md:text-4xl">
            {title}
          </h3>

          <p className="mt-5 max-w-2xl text-base leading-8 text-[#99958D] md:text-lg">
            {text}
          </p>
        </div>
      </div>
    </article>
  );
}
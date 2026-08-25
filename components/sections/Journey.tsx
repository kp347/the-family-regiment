import Image from "next/image";

type JourneyStage = {
  number: string;
  title: string;
  subtitle: string;
  body: string;
  image: string | null;
  alt: string;
  position: string;
};

const stages: JourneyStage[] = [
  {
    number: "01",
    title: "Discovery",
    subtitle: "Every family’s story begins with listening.",
    body:
      "We begin by uncovering the people, values, traditions, places, and defining moments that shaped your family. Before a symbol is drawn, the identity behind it must be understood.",
    image: "/images/family-charter-desk.png",
    alt: "A family interview with photographs, notes, and journals",
    position: "object-center",
  },
  {
    number: "02",
    title: "Research",
    subtitle: "History deserves careful stewardship.",
    body:
      "Documents, photographs, service records, migration stories, heirlooms, and oral traditions become the foundation of a living family record.",
    image: "/images/heritage-map.png",
    alt: "An antique heritage map with archival family research materials",
    position: "object-center",
  },
  {
    number: "03",
    title: "Heraldry",
    subtitle: "Symbols are earned—not invented.",
    body:
      "The family story is translated into a disciplined visual language. Every animal, color, motto, border, flag, and emblem must carry meaning.",
    image: "/images/crest-sketchbook.png",
    alt: "A heraldic sketchbook with crest studies and design tools",
    position: "object-center",
  },
  {
    number: "04",
    title: "Craftsmanship",
    subtitle: "Identity becomes something you can carry.",
    body:
      "The approved heraldry is adapted for embroidery, print, archival records, garments, and other expressions while preserving clarity and dignity.",
    image: "/images/thread-and-embroidery.png",
    alt: "Embroidery thread and tools used to create a heraldic patch",
    position: "object-center",
  },
  {
    number: "05",
    title: "Presentation",
    subtitle: "A family institution is formally established.",
    body:
      "The completed identity, crest, motto, registry, and first heirloom pieces are presented as the beginning of a tradition—not the end of a design project.",
    image: "/images/family-regiment-design-system.png",
    alt: "A finished family charter, registry, and presentation box",
    position: "object-center",
  },
  {
    number: "06",
    title: "Legacy",
    subtitle: "Every generation adds another chapter.",
    body:
      "Future generations inherit more than an image. They inherit a record they can understand, preserve, expand, and carry forward with purpose.",
    image: "/images/jacket-hanging.png",
    alt: "A Family Regiment jacket displayed in a heritage study",
    position: "object-center",
  },
];

export default function Journey() {
  return (
    <section
      id="founding-journey"
      className="scroll-mt-20 overflow-hidden bg-[#f4ede1] py-24 text-[#2d2822] lg:py-32"
    >
      <div className="mx-auto max-w-[1440px] px-7 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[0.62fr_1.38fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[#8b542f]">
              Article III
            </p>

            <div className="mt-6 h-px w-16 bg-[#a18450]" />

            <p className="mt-6 text-sm uppercase leading-7 tracking-[0.18em] text-[#8a7d6d]">
              The path from memory to legacy
            </p>
          </div>

          <div>
            <h2 className="font-display max-w-5xl text-5xl font-medium leading-[1.02] tracking-[-0.025em] sm:text-6xl lg:text-7xl">
              Every heirloom begins with a story.
            </h2>

            <p className="mt-8 max-w-3xl text-xl leading-9 text-[#6d6257]">
              Building a family identity is not a transaction. It is a
              deliberate journey through discovery, preservation,
              craftsmanship, and stewardship.
            </p>
          </div>
        </div>

        <div className="mt-24 space-y-24 lg:mt-32 lg:space-y-32">
          {stages.map((stage, index) => {
            const imageFirst = index % 2 === 0;

            return (
              <article
                key={stage.number}
                id={stage.title === "Heraldry" ? "heraldry" : undefined}
                className={`grid scroll-mt-24 items-center gap-12 lg:grid-cols-2 lg:gap-20`}
              >
                <div className={imageFirst ? "lg:order-1" : "lg:order-2"}>
                  <div className="relative">
                    <div className="absolute -left-4 top-4 h-full w-full border border-[#a98f69]/35 bg-[#d8c7ad]" />

                    <div className="relative aspect-[5/4] overflow-hidden border border-[#9d835f] bg-[#1a1b16] shadow-[0_25px_70px_rgba(62,46,30,0.2)]">
                      {stage.image ? (
                        <Image
                          src={stage.image}
                          alt={stage.alt}
                          fill
                          sizes="(min-width: 1024px) 50vw, 100vw"
                          className={`object-cover ${stage.position}`}
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center px-10 text-center">
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#c8a86b]">
                              Archival image in development
                            </p>

                            <p className="font-display mt-4 text-3xl text-[#efe5d6]">
                              {stage.title}
                            </p>
                          </div>
                        </div>
                      )}

                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/5" />

                      <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 bg-black/35 px-5 py-4 backdrop-blur-sm">
                        <p className="text-[0.62rem] font-semibold uppercase tracking-[0.27em] text-[#d3b77f]">
                          The Founding Journey · {stage.number}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={imageFirst ? "lg:order-2" : "lg:order-1"}>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8b542f]">
                    {stage.number}
                  </p>

                  <h3 className="font-display mt-5 text-5xl font-medium leading-none sm:text-6xl">
                    {stage.title}
                  </h3>

                  <p className="font-display mt-6 text-2xl italic leading-9 text-[#4d4035]">
                    {stage.subtitle}
                  </p>

                  <div className="mt-7 h-px w-20 bg-[#a18450]" />

                  <p className="mt-7 max-w-xl text-lg leading-8 text-[#665c51]">
                    {stage.body}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-28 border-y border-[#b8a68a] py-10 text-center">
          <p className="font-display text-3xl italic text-[#46392e] sm:text-4xl">
            The crest is not where the journey begins.
          </p>

          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#8b542f]">
            It is the visible result of everything discovered along the way.
          </p>
        </div>
      </div>
    </section>
  );
}
import Image from "next/image";
import Link from "next/link";

const details = [
  {
    number: "01",
    title: "The Embroidery",
    image: "/images/craftsmanship/crest.webp",
    alt: "Concept visualization of an antique-gold embroidered lion family crest on an olive field jacket",
    description:
      "Heraldic artwork considered for physical thread, with attention to stitch density, legibility, restrained color, and recognizable silhouettes.",
  },
  {
    number: "02",
    title: "The Fabric",
    image: "/images/craftsmanship/fabric.webp",
    alt: "Concept visualization of a Montgomery name tape and textured olive-drab jacket fabric",
    description:
      "A military-inspired field jacket envisioned with textured olive fabric, functional pockets, and an enduring silhouette.",
  },
  {
    number: "03",
    title: "The Placement",
    image: "/images/craftsmanship/insignia.webp",
    alt: "Concept visualization of an antique-gold embroidered medical insignia on olive jacket fabric",
    description:
      "Every insignia has its place. Family heraldry, heritage flags, name tapes, and personal achievements form a coherent visual identity.",
  },
];

export default function Craftsmanship() {
  return (
    <section
      id="craftsmanship"
      aria-labelledby="craftsmanship-heading"
      className="relative overflow-hidden bg-[#171914] py-20 text-[#eee6d6] sm:py-28"
    >
      <div className="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-12">
        <div className="grid gap-9 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-16">
          <div>
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#c5a16a]">
              Article IV · The Craft
            </p>
            <h2
              id="craftsmanship-heading"
              className="font-serif text-[clamp(3rem,5.5vw,5.6rem)] leading-[1.04] tracking-[-0.035em]"
            >
              Heritage Made
              <span className="block text-[#c7aa78]">Tangible.</span>
            </h2>
          </div>
          <div className="lg:border-l lg:border-[#756445]/60 lg:pl-12">
            <p className="max-w-xl font-serif text-xl leading-relaxed text-[#eee6d6] sm:text-2xl">
              A family crest should not exist only on a screen. It should become
              something you can hold, wear, preserve, and eventually pass forward.
            </p>
            <p className="mt-4 max-w-xl text-sm leading-7 text-[#b6ad9e]">
              Our design philosophy begins with the finished object: the weight
              of the fabric, the texture of embroidery, and the clarity of every symbol.
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-7 md:grid-cols-3 md:gap-3 lg:mt-16">
          {details.map((detail) => (
            <article key={detail.number} className="min-w-0">
              <div className="relative aspect-[1.27] overflow-hidden border border-[#776447]/60 bg-[#25271f]">
                <Image
                  src={detail.image}
                  alt={detail.alt}
                  fill
                  sizes="(max-width: 767px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="flex gap-4 pt-5 sm:pt-6">
                <span className="shrink-0 pt-1 text-sm tracking-[0.15em] text-[#c5a16a]">
                  {detail.number}
                </span>
                <div>
                  <h3 className="font-serif text-xl text-[#eee6d6] sm:text-2xl">
                    {detail.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[#b6ad9e]">
                    {detail.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-7 text-xs leading-5 text-[#a99e8c]">
          Conceptual product visualizations. Final fabrics, embroidery, and
          construction are subject to vendor sampling and approval.
        </p>

        <div className="mt-12 flex flex-col items-start justify-between gap-8 border-t border-[#756445]/60 pt-9 sm:flex-row sm:items-center">
          <div>
            <p className="font-serif text-2xl italic text-[#d6c09a] sm:text-3xl">
              Designed with meaning. Made to endure.
            </p>
            <p className="mt-2 text-sm text-[#a99e8c]">
              Explore how your family identity takes shape on the Regiment Jacket.
            </p>
          </div>
          <Link
            href="/jacket"
            className="inline-flex min-h-12 shrink-0 items-center justify-center bg-[#c4a36b] px-7 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-[#171914] transition-colors hover:bg-[#e0c28c]"
          >
            Explore the Regiment Jacket <span aria-hidden="true" className="ml-3">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

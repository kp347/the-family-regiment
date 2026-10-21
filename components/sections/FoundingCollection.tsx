
import Image from "next/image";
import Link from "next/link";

const garments = [
  {
    number: "01",
    name: "The Regiment Jacket",
    subtitle: "A legacy carried in service.",
    description:
      "An olive field jacket shaped by military tradition. Carry your House crest, heritage flags, and personal insignia in a garment built to tell your story.",
    image:
      "/images/products/studio/jacket-front-clean.png",
    imageAlt:
      "Olive Regiment Jacket from The Family Regiment",
    productHref: "/jacket",
    builderHref: "/builder",
    productLabel: "Explore the Jacket",
    builderLabel: "Customize Your Jacket",
    isBlazer: false,
  },
  {
    number: "02",
    name: "The Heritage Blazer",
    subtitle: "A legacy worn with distinction.",
    description:
      "A tailored navy blazer carrying your traditional House crest over the heart. An expression of lineage, identity, and enduring personal style.",
    image:
      "/images/heritage-blazer/heritage-blazer-builder.png",
    imageAlt:
      "Navy Heritage Blazer displayed in a heritage study",
    productHref: "/blazer",
    builderHref: "/blazer/builder",
    productLabel: "Explore the Blazer",
    builderLabel: "Customize Your Blazer",
    isBlazer: true,
  },
];

export default function FoundingCollection() {
  return (
    <section
      id="founding-collection"
      aria-labelledby="founding-collection-title"
      className="bg-[#171914] px-6 py-24 text-[#eee6d6] sm:px-8 lg:px-12 lg:py-32"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#c5a16a]">
            The Family Regiment
          </p>

          <h2
            id="founding-collection-title"
            className="font-display mt-5 text-4xl leading-tight sm:text-5xl lg:text-6xl"
          >
            The Founding
            <span className="block italic text-[#c7aa78]">
              Collection.
            </span>
          </h2>

          <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-[#b9b1a2]">
            Two expressions of one House. From the traditions
            of military service to the refinement of
            classical heraldry, discover the garment that
            carries your family&apos;s story.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:mt-20 lg:grid-cols-2 lg:gap-10">
          {garments.map((garment) => (
            <article
              key={garment.name}
              className="group min-w-0 border border-[#b08d57]/20 bg-[#20221b]"
            >
              <Link
                href={garment.productHref}
                aria-label={garment.productLabel}
                className="relative block aspect-[4/5] overflow-hidden bg-[#292c25] sm:aspect-[5/4] lg:aspect-[4/5]"
              >
                <Image
                  src={garment.image}
                  alt={garment.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  
className={
  garment.isBlazer
    ? "object-contain scale-[1.16] transition-transform duration-700 group-hover:scale-[1.19]"
    : "object-contain p-5 transition-transform duration-700 group-hover:scale-[1.035]"
}

                />

                <span className="absolute left-6 top-6 text-xs font-semibold tracking-[0.22em] text-[#eee6d6]">
                  {garment.number}
                </span>
              </Link>

              <div className="p-7 sm:p-9">
                <p className="text-xs uppercase tracking-[0.22em] text-[#c5a16a]">
                  {garment.subtitle}
                </p>

                <h3 className="font-display mt-4 text-3xl sm:text-4xl">
                  {garment.name}
                </h3>

                <p className="mt-5 max-w-lg text-sm leading-7 text-[#b9b1a2]">
                  {garment.description}
                </p>

                <div className="mt-9 flex flex-wrap items-center gap-4">
                  <Link
                    href={garment.productHref}
                    className="inline-flex min-h-12 items-center justify-center border border-[#c7aa78] px-6 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#eee6d6] transition-colors hover:bg-[#c7aa78] hover:text-[#171914]"
                  >
                    {garment.productLabel}
                  </Link>

                  <Link
                    href={garment.builderHref}
                    className="inline-flex min-h-12 items-center justify-center px-2 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#c7aa78] underline decoration-[#c7aa78]/50 underline-offset-8 transition-colors hover:text-[#eee6d6]"
                  >
                    {garment.builderLabel} →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="mx-auto mt-12 max-w-2xl text-center text-xs leading-6 text-[#99958d]">
          Your House identity connects both garments.
          Each garment retains its own customization and
          embroidery preferences.
        </p>
      </div>
    </section>
  );
}

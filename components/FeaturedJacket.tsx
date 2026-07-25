import Image from "next/image";

export default function FeaturedJacket() {
  return (
    <section
      id="jackets"
      className="border-y border-white/10 bg-[#141516] px-6 py-24 md:py-32"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#1D1E1F]">
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src="/images/regiment-jacket.png"
              alt="Olive Regiment Jacket with custom embroidered family patches"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
          </div>

          <div className="flex items-end justify-between border-t border-white/10 px-8 py-7">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-[#B08D57]">
                Signature No. 01
              </p>

              <p className="mt-2 text-sm text-[#AAA69E]">
                Olive field cloth
              </p>
            </div>

            <p className="text-xs uppercase tracking-[0.3em] text-[#F6F2EA]">
              Front View
            </p>
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-[#B08D57]">
            The Signature Piece
          </p>

          <h2 className="mt-6 max-w-xl text-5xl font-semibold leading-[0.95] tracking-[-0.04em] md:text-7xl">
            The Regiment Jacket
          </h2>

          <p className="mt-8 max-w-xl text-lg leading-8 text-[#B9B5AC]">
            A modern field jacket transformed into a personal record of family,
            place, service, achievement, and tradition.
          </p>

          <div className="mt-10 space-y-6 border-y border-white/10 py-8">
            <div className="flex items-start justify-between gap-8">
              <p className="text-sm uppercase tracking-[0.22em] text-[#F6F2EA]">
                Material
              </p>

              <p className="max-w-xs text-right text-[#99958D]">
                Structured olive cotton with a substantial heritage feel.
              </p>
            </div>

            <div className="flex items-start justify-between gap-8">
              <p className="text-sm uppercase tracking-[0.22em] text-[#F6F2EA]">
                Personalization
              </p>

              <p className="max-w-xs text-right text-[#99958D]">
                Custom crest, motto, monogram, and chapter patches.
              </p>
            </div>

            <div className="flex items-start justify-between gap-8">
              <p className="text-sm uppercase tracking-[0.22em] text-[#F6F2EA]">
                Construction
              </p>

              <p className="max-w-xs text-right text-[#99958D]">
                Designed around embroidery-safe placement and production.
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#builder"
              className="rounded-full bg-[#B08D57] px-8 py-4 text-center text-sm font-semibold uppercase tracking-widest text-[#151515] transition hover:scale-105"
            >
              Customize the Jacket
            </a>

            <a
              href="#details"
              className="rounded-full border border-white/20 px-8 py-4 text-center text-sm font-semibold uppercase tracking-widest transition hover:border-[#B08D57] hover:text-[#B08D57]"
            >
              View Details
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
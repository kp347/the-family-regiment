import Image from "next/image";

export default function DesignStandard() {
  return (
    <section
      id="the-standard"
      className="border-y border-white/10 bg-[#151615] px-6 py-24 text-[#F6F2EA] md:px-10 lg:px-16"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 max-w-3xl">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.38em] text-[#B98D57]">
            The Standard
          </p>

          <h2 className="text-4xl font-semibold leading-tight tracking-[-0.03em] md:text-6xl">
            Every regiment begins with a standard.
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-8 text-[#B8B5AE] md:text-lg">
            Every Family Regiment is created through a disciplined system that
            combines heraldic tradition, military insignia, and
            embroidery-first craftsmanship.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <article className="group overflow-hidden rounded-[28px] border border-white/10 bg-[#1D1E1C]">
            <div className="overflow-hidden">
              <Image
                src="/images/design/family-regiment-standard-guide.png"
                alt="The Family Regiment design standards and embroidery guide"
                width={1536}
                height={1024}
                className="h-auto w-full transition duration-700 group-hover:scale-[1.03]"
              />
            </div>

            <div className="p-7 md:p-9">
              <p className="text-xs uppercase tracking-[0.32em] text-[#B98D57]">
                Field Manual 01
              </p>

              <h3 className="mt-4 text-2xl font-medium md:text-3xl">
                Heraldry meets military clarity.
              </h3>

              <p className="mt-4 leading-7 text-[#AAA79F]">
                Our visual system strips away excessive ornament and preserves
                the strongest symbols, silhouettes, and traditions.
              </p>
            </div>
          </article>

          <article className="group overflow-hidden rounded-[28px] border border-white/10 bg-[#1D1E1C]">
            <div className="overflow-hidden">
              <Image
                src="/images/design/family-regiment-standard-guide.png"
                alt="The Family Regiment design standards and embroidery guide"
                width={1536}
                height={1024}
                className="h-auto w-full transition duration-700 group-hover:scale-[1.03]"
              />
            </div>

            <div className="p-7 md:p-9">
              <p className="text-xs uppercase tracking-[0.32em] text-[#B98D57]">
                Field Manual 02
              </p>

              <h3 className="mt-4 text-2xl font-medium md:text-3xl">
                Designed before it is stitched.
              </h3>

              <p className="mt-4 leading-7 text-[#AAA79F]">
                Color, typography, composition, and symbol detail are controlled
                so each crest remains distinctive, balanced, and manufacturable.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
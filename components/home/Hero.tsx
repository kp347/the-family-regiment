export default function Hero() {
  return (
    <section className="relative overflow-hidden px-6 py-28 md:py-40">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(176,141,87,0.18),_transparent_45%)]" />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center text-center">
        <p className="mb-6 text-xs uppercase tracking-[0.45em] text-[#B08D57] md:text-sm">
          The Family Regiment
        </p>

        <h2 className="max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.04em] md:text-8xl">
          Wear the story
          <br />
          your family built.
        </h2>

        <p className="mt-8 max-w-2xl text-base leading-8 text-[#C9C5BC] md:text-lg">
          Create a personalized regiment jacket shaped by heritage, service,
          tradition, and the symbols that define your family.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href="#builder"
            className="rounded-full bg-[#B08D57] px-8 py-4 text-sm font-semibold uppercase tracking-widest text-[#151515] transition hover:scale-105"
          >
            Build Your Regiment
          </a>

          <a
            href="#jackets"
            className="rounded-full border border-white/20 px-8 py-4 text-sm font-semibold uppercase tracking-widest transition hover:border-[#B08D57] hover:text-[#B08D57]"
          >
            Explore the Jacket
          </a>
        </div>
      </div>
    </section>
  );
}
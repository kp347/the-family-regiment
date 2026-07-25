const footerLinks = [
  {
    title: "The House",
    links: ["Our Story", "Craftsmanship", "Journal", "Contact"],
  },
  {
    title: "The Regiment",
    links: ["The Jacket", "Heritage Builder", "Patch Library", "Sizing"],
  },
  {
    title: "Client Services",
    links: ["Production Process", "Shipping", "Returns", "Care Guide"],
  },
];

export default function SiteFooter() {
  return (
    <footer className="bg-[#0F1011] text-[#F6F2EA]">
      <section className="border-b border-white/10 px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] border border-[#B08D57]/35 bg-[#1B1C19]">
          <div className="relative px-8 py-20 text-center md:px-16 md:py-28">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(176,141,87,0.18),_transparent_65%)]" />

            <div className="relative mx-auto max-w-4xl">
              <p className="text-xs uppercase tracking-[0.45em] text-[#B08D57]">
                Your Regiment Begins Here
              </p>

              <h2 className="mt-7 text-5xl font-semibold leading-[0.92] tracking-[-0.05em] md:text-8xl">
                Wear the story
                <br />
                only your family can tell.
              </h2>

              <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-[#AAA69E]">
                Build a custom crest, select the symbols of your family story,
                and begin designing a jacket intended to become an heirloom.
              </p>

              <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                <a
                  href="#builder"
                  className="rounded-full bg-[#B08D57] px-9 py-4 text-sm font-semibold uppercase tracking-widest text-[#151515] transition hover:scale-105"
                >
                  Begin Your Regiment
                </a>

                <a
                  href="#about"
                  className="rounded-full border border-white/20 px-9 py-4 text-sm font-semibold uppercase tracking-widest transition hover:border-[#B08D57] hover:text-[#B08D57]"
                >
                  Discover the House
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-14 border-b border-white/10 pb-16 lg:grid-cols-[1.2fr_1.8fr]">
            <div>
              <a
                href="#top"
                className="inline-block text-2xl font-semibold tracking-[0.08em]"
              >
                THE FAMILY REGIMENT
              </a>

              <p className="mt-6 max-w-md text-sm leading-7 text-[#88857E]">
                Luxury heritage apparel and personalized family identity,
                created through symbolism, embroidery, and enduring design.
              </p>

              <div className="mt-8">
                <p className="text-xs uppercase tracking-[0.3em] text-[#B08D57]">
                  Private Dispatches
                </p>

                <form className="mt-4 flex max-w-md border-b border-white/20">
                  <label htmlFor="footer-email" className="sr-only">
                    Email address
                  </label>

                  <input
                    id="footer-email"
                    type="email"
                    placeholder="Email address"
                    className="min-w-0 flex-1 bg-transparent py-4 text-sm text-[#F6F2EA] outline-none placeholder:text-[#65625D]"
                  />

                  <button
                    type="submit"
                    className="px-4 text-xs font-semibold uppercase tracking-[0.25em] text-[#B08D57] transition hover:text-[#F6F2EA]"
                  >
                    Join
                  </button>
                </form>
              </div>
            </div>

            <div className="grid gap-10 sm:grid-cols-3">
              {footerLinks.map((group) => (
                <div key={group.title}>
                  <p className="text-xs uppercase tracking-[0.3em] text-[#B08D57]">
                    {group.title}
                  </p>

                  <ul className="mt-6 space-y-4">
                    {group.links.map((link) => (
                      <li key={link}>
                        <a
                          href="#top"
                          className="text-sm text-[#99958D] transition hover:text-[#F6F2EA]"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-5 pt-8 text-xs uppercase tracking-[0.2em] text-[#625F59] md:flex-row md:items-center md:justify-between">
            <p>
              © {new Date().getFullYear()} The Family Regiment. All rights
              reserved.
            </p>

            <div className="flex flex-wrap gap-6">
              <a href="#top" className="transition hover:text-[#F6F2EA]">
                Privacy
              </a>

              <a href="#top" className="transition hover:text-[#F6F2EA]">
                Terms
              </a>

              <a href="#top" className="transition hover:text-[#F6F2EA]">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
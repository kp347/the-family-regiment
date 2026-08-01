import Link from "next/link";
import Navigation from "@/components/layout/Navigation";

const journeySteps = [
  {
    number: "01",
    title: "Discover",
    description:
      "Gather the people, places, traditions, and convictions that shaped your family.",
  },
  {
    number: "02",
    title: "Define",
    description:
      "Identify the enduring values and expressions that belong within your family identity.",
  },
  {
    number: "03",
    title: "Design",
    description:
      "Translate your story into heraldry, language, symbols, and a coherent visual identity.",
  },
  {
    number: "04",
    title: "Preserve",
    description:
      "Safeguard the approved identity and carry it forward through meaningful expressions.",
  },
];

const expressions = [
  {
    title: "Heritage",
    description: "Countries, states, regions, and cultural traditions.",
  },
  {
    title: "Faith",
    description: "Symbols, sacred text, scripture, or guiding mottos.",
  },
  {
    title: "Service",
    description: "Military, civic, public, and community service.",
  },
  {
    title: "Profession",
    description: "Vocations and craftsmanship central to the family story.",
  },
  {
    title: "Nature",
    description: "Animals, trees, landscapes, and meaningful natural forms.",
  },
  {
    title: "Values",
    description: "Virtues intended to guide generations.",
  },
];

function FamilyIdentityRecord() {
  return (
    <div className="relative mx-auto w-full max-w-[460px]">
      <div className="absolute -left-4 top-5 h-full w-full rotate-[-2deg] border border-[#b2a184]/50 bg-[#ddd2bf]" />
      <div className="absolute -right-3 top-2 h-full w-full rotate-[1deg] border border-[#baa98d]/50 bg-[#eee5d7]" />

      <article className="relative overflow-hidden border border-[#9e8c70] bg-[#faf5eb] shadow-[0_24px_70px_rgba(51,40,29,0.18)]">
        <header className="flex items-start justify-between gap-6 border-b border-[#b8a68a] px-7 py-5">
          <div>
            <p className="text-[0.58rem] font-semibold uppercase tracking-[0.3em] text-[#705f4c]">
              The Family Regiment
            </p>

            <h2 className="font-display mt-2 text-2xl font-medium text-[#302820]">
              Family Identity Record
            </h2>
          </div>

          <div className="border border-[#a89474] px-3 py-2 text-right">
            <p className="text-[0.5rem] uppercase tracking-[0.22em] text-[#796b59]">
              Registry
            </p>

            <p className="font-display mt-1 text-base text-[#653b23]">
              FIR-000001
            </p>
          </div>
        </header>

        <div className="grid gap-7 px-7 py-7 sm:grid-cols-[0.9fr_1.1fr]">
          <div className="flex items-center justify-center">
            <svg
              viewBox="0 0 240 290"
              role="img"
              aria-label="Sample heraldic shield"
              className="h-auto w-full max-w-[170px]"
            >
              <path
                d="M120 12 218 46v83c0 70-39 118-98 146-59-28-98-76-98-146V46L120 12Z"
                fill="#f8f1e6"
                stroke="#653b23"
                strokeWidth="4"
              />

              <path d="M120 14v256" stroke="#a18450" strokeWidth="3" />
              <path d="M25 105h190" stroke="#a18450" strokeWidth="3" />
              <path d="M58 61h124" stroke="#38483d" strokeWidth="22" />

              <circle
                cx="120"
                cy="160"
                r="35"
                fill="none"
                stroke="#653b23"
                strokeWidth="4"
              />

              <path
                d="M98 160h44M120 138v44"
                stroke="#653b23"
                strokeWidth="4"
              />

              <path
                d="M70 224c30 16 70 16 100 0"
                fill="none"
                stroke="#38483d"
                strokeWidth="5"
              />
            </svg>
          </div>

          <div>
            <p className="text-[0.55rem] font-semibold uppercase tracking-[0.28em] text-[#7b6c59]">
              Family Name
            </p>

            <p className="font-display mt-1 text-2xl font-medium text-[#302820]">
              The Example Family
            </p>

            <div className="mt-5 border-t border-[#c6b79f] pt-4">
              <p className="text-[0.55rem] font-semibold uppercase tracking-[0.28em] text-[#7b6c59]">
                Guiding Motto
              </p>

              <p className="font-display mt-2 text-xl italic leading-snug text-[#653b23]">
                “Faithful Through Generations”
              </p>
            </div>

            <div className="mt-5 border-t border-[#c6b79f] pt-4">
              <p className="text-[0.55rem] font-semibold uppercase tracking-[0.28em] text-[#7b6c59]">
                Expressions
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                {["Heritage", "Faith", "Service", "Values"].map((item) => (
                  <span
                    key={item}
                    className="border border-[#b8a68a] bg-[#eee4d4] px-2.5 py-1 text-[0.7rem] font-semibold text-[#564a3c]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <footer className="grid grid-cols-3 border-t border-[#b8a68a]">
          <div className="border-r border-[#b8a68a] px-4 py-4">
            <p className="text-[0.48rem] uppercase tracking-[0.2em] text-[#7b6c59]">
              Origin
            </p>

            <p className="font-display mt-1 text-sm text-[#302820]">
              United States
            </p>
          </div>

          <div className="border-r border-[#b8a68a] px-4 py-4">
            <p className="text-[0.48rem] uppercase tracking-[0.2em] text-[#7b6c59]">
              Established
            </p>

            <p className="font-display mt-1 text-sm text-[#302820]">
              MMXXVI
            </p>
          </div>

          <div className="px-4 py-4">
            <p className="text-[0.48rem] uppercase tracking-[0.2em] text-[#7b6c59]">
              Status
            </p>

            <p className="font-display mt-1 text-sm text-[#38483d]">
              Active
            </p>
          </div>
        </footer>
      </article>

      <div className="absolute -bottom-5 -right-4 flex h-20 w-20 items-center justify-center rounded-full border-4 border-[#713b3b] bg-[#783d39] shadow-[0_10px_24px_rgba(72,35,33,0.3)]">
        <div className="flex h-13 w-13 items-center justify-center rounded-full border border-[#d2ab82]">
          <span className="font-display text-base font-semibold text-[#f3dfc5]">
            TFR
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Navigation />

      <main>
        <section className="relative overflow-hidden bg-[#f1eadf]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(161,132,80,0.12),transparent_34%)]" />

          <div className="relative mx-auto grid max-w-[1440px] items-center gap-16 px-6 py-20 lg:min-h-[720px] lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:py-16">
            <div className="max-w-[700px]">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#8b542f]">
                Identity • Stewardship • Legacy
              </p>

              <h1 className="font-display mt-7 max-w-[680px] text-[3.4rem] font-medium leading-[0.98] tracking-[-0.03em] text-[#24211d] sm:text-[4.5rem] lg:text-[5.2rem]">
                Every family has a story worth preserving.
              </h1>

              <p className="mt-7 max-w-[620px] text-lg leading-8 text-[#625c53]">
                Discover the people, values, traditions, and convictions
                that define your family—and give them enduring form for
                generations to come.
              </p>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/begin"
                  className="inline-flex items-center justify-center bg-[#653b23] px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#8b542f]"
                >
                  Begin Your Journey
                </Link>

                <Link
                  href="/mission"
                  className="inline-flex items-center justify-center border border-[#aa9b84] bg-transparent px-7 py-3.5 text-sm font-semibold text-[#302820] transition-colors hover:border-[#653b23] hover:bg-[#fbf8f1]"
                >
                  Discover Our Mission
                </Link>
              </div>

              <div className="mt-12 flex items-center gap-4">
                <div className="h-px w-14 bg-[#a18450]" />

                <p className="text-[0.7rem] uppercase tracking-[0.24em] text-[#756a5c]">
                  Design is stewardship made visible
                </p>
              </div>
            </div>

            <FamilyIdentityRecord />
          </div>
        </section>

        <section className="border-y border-[#d4cab9] bg-[#fbf8f1]">
          <div className="mx-auto grid max-w-[1440px] gap-12 px-6 py-20 lg:grid-cols-[0.65fr_1.35fr] lg:px-10 lg:py-24">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8b542f]">
              Our Mission
            </p>

            <div>
              <h2 className="font-display max-w-4xl text-4xl font-medium leading-[1.08] text-[#24211d] sm:text-5xl">
                To help families understand what has shaped them, give
                those truths enduring form, and steward that identity
                for those who follow.
              </h2>

              <Link
                href="/mission"
                className="mt-9 inline-flex border-b border-[#8b542f] pb-1 text-sm font-semibold text-[#653b23]"
              >
                Read our mission
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-[#38483d] py-24 text-[#fbf8f1]">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
            <div className="grid gap-10 lg:grid-cols-[0.65fr_1.35fr]">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d0b98e]">
                The Journey
              </p>

              <div>
                <h2 className="font-display max-w-4xl text-4xl font-medium leading-[1.08] sm:text-5xl">
                  From family story to enduring identity.
                </h2>

                <p className="mt-6 max-w-2xl text-lg leading-8 text-[#d4ddd6]">
                  The crest is not the beginning of the journey. It is
                  the visual expression of what the family discovers
                  along the way.
                </p>
              </div>
            </div>

            <div className="mt-16 grid border-l border-t border-white/15 sm:grid-cols-2 xl:grid-cols-4">
              {journeySteps.map((step) => (
                <article
                  key={step.number}
                  className="min-h-[290px] border-b border-r border-white/15 p-8 transition-colors hover:bg-white/[0.04]"
                >
                  <p className="text-xs font-semibold tracking-[0.22em] text-[#d0b98e]">
                    {step.number}
                  </p>

                  <h3 className="font-display mt-12 text-3xl font-medium">
                    {step.title}
                  </h3>

                  <p className="mt-5 leading-7 text-[#d4ddd6]">
                    {step.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f2ece1] py-24">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
            <div className="grid gap-12 lg:grid-cols-[0.65fr_1.35fr]">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8b542f]">
                Expressions of Identity
              </p>

              <div>
                <h2 className="font-display max-w-4xl text-4xl font-medium leading-[1.08] text-[#24211d] sm:text-5xl">
                  The institution provides the framework. Each family
                  defines its identity within it.
                </h2>

                <p className="mt-6 max-w-3xl text-lg leading-8 text-[#666057]">
                  Families may express the enduring parts of their story
                  through heritage, faith, service, profession, nature,
                  values, mottos, and meaningful milestones.
                </p>
              </div>
            </div>

            <div className="mt-16 grid border-l border-t border-[#cfc3b1] sm:grid-cols-2 lg:grid-cols-3">
              {expressions.map((expression) => (
                <article
                  key={expression.title}
                  className="min-h-[190px] border-b border-r border-[#cfc3b1] bg-[#fbf8f1] p-8 transition-colors hover:bg-[#eee5d7]"
                >
                  <h3 className="font-display text-3xl font-medium text-[#302820]">
                    {expression.title}
                  </h3>

                  <p className="mt-5 max-w-sm leading-7 text-[#666057]">
                    {expression.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#273847] py-24 text-white">
          <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d0b98e]">
              Begin
            </p>

            <h2 className="font-display mt-7 text-4xl font-medium leading-[1.05] sm:text-6xl">
              Your family&apos;s story deserves to endure.
            </h2>

            <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-[#d5dde3]">
              Begin building a family identity that can be understood,
              preserved, and proudly carried forward.
            </p>

            <Link
              href="/begin"
              className="mt-10 inline-flex bg-[#8b542f] px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-[#a66537]"
            >
              Begin Your Journey
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#4a4138] bg-[#302820] text-[#ece4d8]">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-6 py-14 md:grid-cols-[1.2fr_0.8fr] lg:px-10">
          <div>
            <p className="font-display text-2xl font-medium uppercase tracking-[0.14em]">
              The Family Regiment
            </p>

            <p className="mt-4 max-w-xl leading-7 text-[#beb4a7]">
              Helping families discover, preserve, and express
              identities worthy of being carried forward.
            </p>
          </div>

          <div className="flex flex-col gap-3 text-sm text-[#beb4a7] md:items-end">
            <Link href="/mission" className="hover:text-white">
              Mission
            </Link>

            <Link href="/journey" className="hover:text-white">
              Journey
            </Link>

            <Link href="/heraldry" className="hover:text-white">
              Heraldry
            </Link>

            <p className="mt-4">© 2026 The Family Regiment</p>
          </div>
        </div>
      </footer>
    </>
  );
}
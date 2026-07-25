export default function FeaturedJacket() {
  return (
    <section
      id="jackets"
      className="border-y border-white/10 bg-[#171819] px-6 py-24 md:py-32"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
        {/* Jacket visual */}
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#232622] p-8 md:p-14">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(176,141,87,0.14),_transparent_60%)]" />

          <div className="relative flex min-h-[520px] items-center justify-center">
            <svg
              viewBox="0 0 500 600"
              className="h-auto w-full max-w-[420px]"
              role="img"
              aria-label="Illustration of The Regiment Jacket"
            >
              <path
                d="M150 105L205 68H295L350 105L420 165L377 256L350 237V520H150V237L123 256L80 165L150 105Z"
                fill="#4D513E"
                stroke="#B08D57"
                strokeWidth="4"
              />

              <path
                d="M205 68L250 130L295 68"
                fill="none"
                stroke="#B08D57"
                strokeWidth="4"
              />

              <path
                d="M250 130V520"
                stroke="#B08D57"
                strokeWidth="3"
              />

              <rect
                x="174"
                y="180"
                width="60"
                height="78"
                rx="5"
                fill="#3B3E31"
                stroke="#B08D57"
                strokeWidth="3"
              />

              <rect
                x="266"
                y="180"
                width="60"
                height="78"
                rx="5"
                fill="#3B3E31"
                stroke="#B08D57"
                strokeWidth="3"
              />

              <rect
                x="174"
                y="350"
                width="68"
                height="92"
                rx="5"
                fill="#3B3E31"
                stroke="#B08D57"
                strokeWidth="3"
              />

              <rect
                x="258"
                y="350"
                width="68"
                height="92"
                rx="5"
                fill="#3B3E31"
                stroke="#B08D57"
                strokeWidth="3"
              />

              <circle
                cx="205"
                cy="220"
                r="20"
                fill="#B08D57"
              />

              <path
                d="M196 220L205 207L214 220L205 232Z"
                fill="#1E1F20"
              />

              <path
                d="M150 285H350"
                stroke="#B08D57"
                strokeWidth="3"
                strokeDasharray="8 8"
              />
            </svg>
          </div>

          <div className="relative mt-6 flex items-center justify-between border-t border-white/10 pt-6">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[#B08D57]">
                Signature No. 01
              </p>
              <p className="mt-2 text-sm text-[#AAA69E]">
                Olive field cloth
              </p>
            </div>

            <p className="text-sm uppercase tracking-[0.2em] text-[#F6F2EA]">
              Front View
            </p>
          </div>
        </div>

        {/* Product copy */}
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
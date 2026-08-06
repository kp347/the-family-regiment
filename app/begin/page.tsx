import Link from "next/link";

const chapters = [
  {
    number: "01",
    title: "Origins",
    description: "Where your family's story begins.",
  },
  {
    number: "02",
    title: "Values",
    description: "The principles passed from generation to generation.",
  },
  {
    number: "03",
    title: "Service",
    description: "Military, civic, religious, and community service.",
  },
  {
    number: "04",
    title: "Traditions",
    description: "Customs, celebrations, faith, and family culture.",
  },
  {
    number: "05",
    title: "Symbols",
    description: "Animals, places, occupations, landscapes, and heirlooms.",
  },
  {
    number: "06",
    title: "Achievements",
    description: "Stories worth preserving for future generations.",
  },
  {
    number: "07",
    title: "Future Legacy",
    description: "What your descendants should remember about your family.",
  },
  {
    number: "08",
    title: "Review",
    description: "Prepare your Family Record for heraldic development.",
  },
];

export default function BeginJourneyPage() {
  return (
    <main className="min-h-screen bg-[#f4efe7] text-[#2d2822]">
      <section className="mx-auto max-w-7xl px-8 py-24">

        <div className="max-w-4xl">

          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[#8b542f]">
            The Family Record
          </p>

          <h1 className="font-display mt-6 text-6xl leading-none lg:text-7xl">
            Every family's story deserves to be preserved.
          </h1>

          <div className="mt-8 h-px w-24 bg-[#b89559]" />

          <p className="mt-10 max-w-3xl text-xl leading-9 text-[#665b50]">
            Over the next eight chapters, The Family Regiment will help you
            document the people, values, traditions, and defining moments that
            shaped your family. This record becomes the foundation for every
            crest, charter, registry, and heirloom we create together.
          </p>

        </div>

        <div className="mt-20 grid gap-8 lg:grid-cols-[1fr_420px]">

          <div className="grid gap-6">

            {chapters.map((chapter) => (

              <div
                key={chapter.number}
                className="border border-[#d8c9b3] bg-white/60 p-8 transition hover:bg-white"
              >
                <div className="flex gap-6">

                  <div className="text-[#8b542f] text-sm font-semibold tracking-[0.2em]">
                    {chapter.number}
                  </div>

                  <div>

                    <h2 className="font-display text-3xl">
                      {chapter.title}
                    </h2>

                    <p className="mt-3 text-[#665b50] leading-7">
                      {chapter.description}
                    </p>

                  </div>

                </div>

              </div>

            ))}

          </div>

          <aside className="h-fit border border-[#cdb690] bg-[#efe6d8] p-10">

            <p className="text-xs uppercase tracking-[0.28em] text-[#8b542f]">
              Before You Begin
            </p>

            <ul className="mt-8 space-y-5 text-[#5d5247] leading-7">
              <li>• Estimated time: 45–60 minutes</li>
              <li>• Your progress is saved automatically</li>
              <li>• Return at any time</li>
              <li>• Upload documents and photographs later</li>
            </ul>

            <Link
              href="/begin/origins"
              className="mt-12 inline-flex w-full justify-center bg-[#6f4328] px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-[#875235]"
            >
              Begin Chapter I
            </Link>

          </aside>

        </div>

      </section>
    </main>
  );
}
import Link from "next/link";
import type { ReactNode } from "react";

type BuilderLayoutProps = {
  children: ReactNode;
};

const chapters = [
  {
    number: "01",
    title: "Origins",
    href: "/begin/origins",
  },
  {
    number: "02",
    title: "Values",
    href: "/begin/values",
  },
  {
    number: "03",
    title: "Service",
    href: "/begin/service",
  },
  {
    number: "04",
    title: "Traditions",
    href: "/begin/traditions",
  },
  {
    number: "05",
    title: "Symbols",
    href: "/begin/symbols",
  },
  {
    number: "06",
    title: "Achievements",
    href: "/begin/achievements",
  },
  {
    number: "07",
    title: "Future Legacy",
    href: "/begin/future",
  },
  {
    number: "08",
    title: "Review",
    href: "/begin/review",
  },
];

export default function BuilderLayout({
  children,
}: BuilderLayoutProps) {
  return (
    <div className="min-h-screen bg-[#f4efe7] text-[#2d2822]">
      <header className="border-b border-[#3a342c] bg-[#141510] text-[#f2e9da]">
        <div className="mx-auto flex min-h-20 max-w-[1600px] items-center justify-between px-6 lg:px-10">
          <Link
            href="/"
            className="font-display text-lg font-semibold uppercase tracking-[0.18em]"
          >
            The Family Regiment
          </Link>

          <div className="text-right">
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-[#b99a62]">
              The Family Record
            </p>

            <p className="mt-1 text-xs text-[#aaa094]">
              Progress saved automatically
            </p>
          </div>
        </div>
      </header>

      <div className="mx-auto grid min-h-[calc(100vh-80px)] max-w-[1600px] lg:grid-cols-[290px_minmax(0,1fr)]">
        <aside className="border-b border-[#cdbda5] bg-[#ebe1d2] lg:border-b-0 lg:border-r">
          <div className="sticky top-0 p-6 lg:p-8">
            <div>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-[#8b542f]">
                Eight Chapters
              </p>

              <h2 className="font-display mt-3 text-3xl">
                Your Family Record
              </h2>

              <p className="mt-4 text-sm leading-6 text-[#6b6055]">
                Complete each chapter at your own pace. You may return and
                revise your answers before final review.
              </p>
            </div>

            <nav
              aria-label="Family Record chapters"
              className="mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-1"
            >
              {chapters.map((chapter) => (
                <Link
                  key={chapter.href}
                  href={chapter.href}
                  className="group flex items-center gap-4 border border-transparent px-3 py-3 transition hover:border-[#c4ad88] hover:bg-[#f5eee3]"
                >
                  <span className="w-8 text-[0.65rem] font-semibold tracking-[0.22em] text-[#9a7448]">
                    {chapter.number}
                  </span>

                  <span className="font-display text-lg text-[#40372f] transition group-hover:text-[#6f4328]">
                    {chapter.title}
                  </span>
                </Link>
              ))}
            </nav>

            <div className="mt-8 border-t border-[#cdbda5] pt-6">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-[#786b5e]">
                <span>Overall progress</span>
                <span>0%</span>
              </div>

              <div className="mt-3 h-1.5 overflow-hidden bg-[#d7c9b5]">
                <div className="h-full w-0 bg-[#8b542f]" />
              </div>
            </div>
          </div>
        </aside>

        <main className="min-w-0">
          <div className="mx-auto max-w-5xl px-6 py-14 sm:px-10 lg:px-14 lg:py-20">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
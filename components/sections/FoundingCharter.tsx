import Image from "next/image";
import Link from "next/link";

export default function FoundingCharter() {
  return (
    <section className="bg-[#efe5d6] py-24 text-[#2d2822]">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <div className="grid items-center gap-14 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="relative">
            <div className="absolute -left-5 top-5 h-full w-full border border-[#b29a75]/40 bg-[#d8c7ad]" />

            <div className="relative overflow-hidden border border-[#a98f69] shadow-[0_25px_70px_rgba(62,46,30,0.18)]">
              <Image
                src="/images/jacket-hanging.png"
                alt="A family charter resting on a wooden desk beside ink, books, and a wax seal"
                width={1536}
                height={1024}
                className="h-full min-h-[520px] w-full object-cover"
              />
            </div>
          </div>

          <div className="max-w-[620px] lg:pl-8">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#8b542f]">
              Article I
            </p>

            <h2 className="font-display mt-6 text-4xl font-medium leading-[1.04] sm:text-5xl lg:text-6xl">
              The Founding Charter
            </h2>

            <div className="mt-8 h-px w-20 bg-[#a18450]" />

            <blockquote className="font-display mt-8 text-3xl font-medium italic leading-[1.25] text-[#46392e]">
              “We do not merely inherit the legacy of our ancestors. We become
              its stewards for those who will follow.”
            </blockquote>

            <p className="mt-8 text-lg leading-8 text-[#6a5f54]">
              The Family Regiment exists to help families discover what has
              shaped them, preserve those truths with dignity, and express
              their identity through enduring symbols, records, and acts of
              stewardship.
            </p>

            <p className="mt-5 text-lg leading-8 text-[#6a5f54]">
              The institution comes before commerce. The family comes before
              the crest. Every expression must earn its place by representing
              something worthy of being carried forward.
            </p>

            <Link
              href="/mission"
              className="mt-10 inline-flex border-b border-[#8b542f] pb-1 text-sm font-semibold text-[#653b23]"
            >
              Read the complete charter
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
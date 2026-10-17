
import Link from "next/link";
import RegistryCard from "@/components/registry/RegistryCard";

export default function FamilyRegistry() {
  return (
    <section
      id="registry"
      className="relative scroll-mt-20 overflow-hidden bg-[#efe5d6] py-28 text-[#2d2822]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(184,149,89,0.12),transparent_32%)]" />

      <div className="relative mx-auto max-w-[1500px] px-7 lg:px-12">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[#8b542f]">
            Article V
          </p>

          <h2 className="font-display mt-6 text-5xl leading-none sm:text-6xl lg:text-7xl">
            The Family Registry
          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-xl leading-9 text-[#675d52]">
            Every family entrusted to The Family Regiment receives a permanent
            registry record. Every future heirloom begins here.
          </p>
        </div>

        <div className="mt-20">
          <RegistryCard
            familyName="Hamilton"
            registryNumber="FR-000001"
            country="Scotland"
            state="Virginia"
            established="2027"
            motto="Fortitudine et Honore"
            steward="James Hamilton"
            status="Active"
          />
        </div>

        <div className="mx-auto mt-14 max-w-3xl text-center">
          <p className="text-lg leading-8 text-[#6a5f54]">
            Every crest, charter, jacket, and future family artifact originates
            from this permanent record. The registry becomes the official
            historical foundation from which each generation continues the
            family&apos;s story.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-5 sm:flex-row">
            <Link
              href="/begin"
              className="inline-flex min-h-12 items-center justify-center border border-[#8b542f] px-7 py-3 text-center text-xs font-semibold uppercase tracking-[0.16em] text-[#653b23] transition-colors hover:bg-[#8b542f] hover:text-white"
            >
              Establish Your House
            </Link>

            <Link
              href="/builder"
              className="inline-flex min-h-12 items-center justify-center bg-[#8b542f] px-7 py-3 text-center text-xs font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#653b23]"
            >
              Customize Your Regiment Jacket
            </Link>
          </div>

          <p className="mt-6 text-sm text-[#786d60]">
            Already know your family story? Explore the jacket builder directly.
          </p>
        </div>
      </div>
    </section>
  );
}

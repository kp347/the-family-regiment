import Link from "next/link";
import RegistryCard from "@/components/registry/RegistryCard";

export default function FamilyRegistry() {
  return (
    <section className="relative overflow-hidden bg-[#efe5d6] py-28 text-[#2d2822]">
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
            family's story.
          </p>

          <Link
            href="/registry"
            className="mt-10 inline-flex items-center border-b border-[#8b542f] pb-1 text-sm font-semibold uppercase tracking-[0.18em] text-[#653b23]"
          >
            Explore the Registry
          </Link>
        </div>
      </div>
    </section>
  );
}
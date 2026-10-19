
import Link from "next/link";
import RegistryCard from "@/components/registry/RegistryCard";

export default function FamilyRegistry() {
  return (
    <section
      id="registry"
      className="relative scroll-mt-20 overflow-hidden bg-[#efe5d6] py-24 text-[#2d2822] sm:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(184,149,89,0.12),transparent_32%)]"
      />

      <div className="relative mx-auto max-w-[1500px] px-6 sm:px-7 lg:px-12">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[#8b542f]">
            Article VI · The Registry
          </p>

          <h2 className="font-display mt-6 text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
            The Family Registry
          </h2>

          <div className="mx-auto mt-8 h-px w-20 bg-[#b68b47]" />

          <p className="mx-auto mt-8 max-w-3xl text-xl leading-9 text-[#675d52]">
            A family&apos;s heritage deserves more than a single
            moment of recognition. The Family Registry is
            envisioned as the enduring record of each house —
            its identity, heraldry, values, and evolving story.
          </p>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#817362]">
            Our long-term vision is to connect the family crest,
            heritage documents, and future heirlooms through
            a shared record that successive generations can
            build upon.
          </p>
        </div>

        <div className="mt-16 sm:mt-20">
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8b542f]">
              Illustrative Registry Record
            </p>

            <p className="text-xs italic text-[#817362]">
              Demonstration entry · Not an active family
              registration
            </p>
          </div>

          <RegistryCard
            familyName="Hamilton"
            registryNumber="FR-000001"
            country="Scotland"
            state="Virginia"
            established="2027"
            motto="Fortitudine et Honore"
            steward="James Hamilton"
            status="Active"
            demonstration
          />

          <p className="mt-5 text-center text-xs leading-6 text-[#817362]">
            The Hamilton family, registry number, steward,
            and registration details above are fictional
            examples shown to illustrate the proposed
            Family Registry experience.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-3xl text-center">
          <p className="font-display text-3xl leading-tight text-[#3e3328] sm:text-4xl">
            A record of where you began.
            <span className="mt-2 block italic text-[#8b6a45]">
              A foundation for what comes next.
            </span>
          </p>

          <p className="mt-7 text-lg leading-8 text-[#6a5f54]">
            The vision extends beyond the jacket. Family
            charters, digital heritage documents, framed
            crest artwork, and physical heritage collections
            may one day become connected expressions of
            the same family identity.
          </p>

          <p className="mt-5 text-sm leading-7 text-[#817362]">
            Registry services and additional heritage
            offerings remain part of our developing
            collection. Their availability and details
            will be confirmed as they are introduced.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-5 sm:flex-row">
            <Link
              href="/begin"
              className="inline-flex min-h-12 w-full items-center justify-center border border-[#8b542f] px-7 py-3 text-center text-xs font-semibold uppercase tracking-[0.16em] text-[#653b23] transition-colors hover:bg-[#8b542f] hover:text-white sm:w-auto"
            >
              Establish Your House
            </Link>

            <Link
              href="/builder"
              className="inline-flex min-h-12 w-full items-center justify-center bg-[#8b542f] px-7 py-3 text-center text-xs font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#653b23] sm:w-auto"
            >
              Customize Your Regiment Jacket
            </Link>
          </div>

          <p className="mt-6 text-sm text-[#786d60]">
            Already know your family story? Explore the jacket
            builder directly.
          </p>
        </div>
      </div>
    </section>
  );
}

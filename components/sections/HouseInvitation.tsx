import Link from "next/link";

export default function HouseInvitation() {
  return <section aria-labelledby="house-invitation-title" className="border-y border-[#b89559]/25 bg-[#25251e] px-6 py-20 text-[#eee6d6] sm:px-8 lg:px-12 lg:py-28">
    <div className="mx-auto grid max-w-[1440px] items-center gap-9 lg:grid-cols-[1fr_auto]">
      <div><p className="text-xs font-semibold uppercase tracking-[.3em] text-[#c5a16a]">Your next chapter</p><h2 id="house-invitation-title" className="font-display mt-5 text-4xl sm:text-5xl">Every House has a story.</h2><p className="mt-6 max-w-2xl text-base leading-8 text-[#b9b1a2]">Discover the traditions, values, and experiences that define your family. Establish one House identity, then carry its heraldry across the Regiment Jacket and Heritage Blazer.</p></div>
      <Link href="/begin" className="inline-flex min-h-12 items-center justify-center border border-[#b89559] px-8 py-3 text-center text-xs font-semibold uppercase tracking-[.15em] text-[#eee6d6] hover:bg-[#b89559]/15">Discover Your House</Link>
    </div>
  </section>;
}

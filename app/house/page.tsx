import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/layout/Navigation";

export const metadata = {
  title: "The House Experience | The Family Regiment",
  description: "Discover your family's story, establish your House identity, and carry its heraldry across the Regiment Jacket and Heritage Blazer.",
};

const chapters = [
  { number: "I", title: "Discover", eyebrow: "The story behind the symbol", copy: "Begin with the people, places, traditions, and values that shaped your family. Your story can start with what you know today; a complete family tree is never required." },
  { number: "II", title: "Preserve", eyebrow: "An identity worth carrying forward", copy: "Bring your chosen House name, values, and motto into a coherent family identity. A future House Charter can preserve these choices as a keepsake; no historical grant of arms is implied." },
  { number: "III", title: "Express", eyebrow: "One House. Two expressions.", copy: "Carry the same family heraldry on the Regiment Jacket or Heritage Blazer, with artwork adapted to the placement and scale of each garment." },
];

export default function HousePage() {
  return <>
    <Navigation />
    <main className="bg-[#171914] text-[#eee6d6]">
      <section className="relative overflow-hidden border-b border-[#a18450]/30 px-6 py-24 sm:px-8 lg:px-12 lg:py-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,rgba(185,149,89,.18),transparent_48%)]" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-[1440px] items-center gap-14 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.3em] text-[#c5a16a]">The House Experience</p>
            <h1 className="font-display mt-7 text-[clamp(3.6rem,7vw,7rem)] leading-[1.02]">A family is more <span className="block italic text-[#c7aa78]">than a name.</span></h1>
            <p className="mt-9 max-w-xl text-lg leading-9 text-[#c9bfaf]">Your House begins with the story you choose to honor—and the values you choose to pass on. Discover it. Preserve it. Wear it forward.</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/begin" className="inline-flex min-h-12 items-center justify-center bg-[#b89559] px-7 py-3 text-xs font-semibold uppercase tracking-[.15em] text-[#171914] hover:bg-[#d0b17c]">Establish Your House</Link>
              <Link href="/house/dashboard" className="inline-flex min-h-12 items-center justify-center border border-[#b89559] px-7 py-3 text-xs font-semibold uppercase tracking-[.15em] text-[#eee6d6] hover:bg-[#b89559]/10">Your House Dashboard</Link>
              <Link href="/collection" className="inline-flex min-h-12 items-center justify-center border border-[#b89559] px-7 py-3 text-xs font-semibold uppercase tracking-[.15em] text-[#eee6d6] hover:bg-[#b89559]/10">Explore the Collection</Link>
            </div>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden border border-[#b89559]/35 bg-[#25251f]">
            <Image src="/images/heritage-blazer/heritage-family-mother-two-sons.webp" alt="A mother and her two sons wearing coordinated heritage blazers" fill sizes="(max-width:1024px) 100vw, 42vw" className="object-cover" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#171914] to-transparent px-7 pb-7 pt-24 text-xs uppercase tracking-[.18em] text-[#eee6d6]">A legacy shared across generations</div>
          </div>
        </div>
      </section>
      <section className="bg-[#f3ecdf] px-6 py-24 text-[#2d2822] sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1440px]">
          <p className="text-xs font-semibold uppercase tracking-[.3em] text-[#8b542f]">The Founding Journey</p>
          <h2 className="font-display mt-5 max-w-3xl text-5xl leading-tight sm:text-6xl">Discover. Preserve. Express.</h2>
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {chapters.map(chapter => <article key={chapter.number} className="border border-[#c8b592] bg-[#fbf8f1] p-8 sm:p-10">
              <span className="font-display text-5xl italic text-[#a18450]">{chapter.number}</span>
              <p className="mt-8 text-[11px] font-semibold uppercase tracking-[.2em] text-[#8b542f]">{chapter.eyebrow}</p>
              <h3 className="font-display mt-3 text-4xl">{chapter.title}</h3>
              <p className="mt-5 text-base leading-8 text-[#655a4f]">{chapter.copy}</p>
            </article>)}
          </div>
          <div className="mt-12 flex flex-wrap items-center gap-5"><Link href="/begin" className="inline-flex min-h-12 items-center bg-[#8b542f] px-7 text-xs font-semibold uppercase tracking-[.14em] text-white hover:bg-[#653b23]">Begin Your Story</Link><p className="max-w-xl text-sm leading-7 text-[#655a4f]">Family stories may include adoption, blended households, chosen traditions, and distinct branches sharing a surname. You decide what to share.</p></div>
        </div>
      </section>
      <section className="px-6 py-24 sm:px-8 lg:px-12"><div className="mx-auto max-w-[1440px]">
        <p className="text-xs font-semibold uppercase tracking-[.3em] text-[#c5a16a]">The Founding Collection</p>
        <h2 className="font-display mt-5 text-5xl sm:text-6xl">One House. <span className="italic text-[#c7aa78]">Two expressions.</span></h2>
        <p className="mt-6 max-w-2xl text-base leading-8 text-[#b9b1a2]">A single heraldic identity, thoughtfully adapted to two different garments. Final embroidery specifications are being validated with production partners.</p>
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <article className="border border-[#b89559]/25 bg-[#20221b]"><div className="relative aspect-[4/3]"><Image src="/images/products/studio/jacket-front-clean.png" alt="Olive Regiment Jacket" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-contain p-5" /></div><div className="border-t border-[#b89559]/25 p-8"><p className="text-xs uppercase tracking-[.2em] text-[#c5a16a]">The Regiment Jacket</p><h3 className="font-display mt-3 text-4xl">Heritage in service.</h3><p className="mt-4 leading-8 text-[#b9b1a2]">Family crest on the wearer’s left shoulder; heritage flags on the right; an independent personalized name tape above the chest pocket.</p><Link href="/builder" className="mt-7 inline-block border-b border-[#c5a16a] pb-2 text-xs font-semibold uppercase tracking-[.15em]">Explore Jacket Customization</Link></div></article>
          <article className="border border-[#b89559]/25 bg-[#20221b]"><div className="relative aspect-[4/3]"><Image src="/images/heritage-blazer/heritage-blazer-builder.png" alt="Navy Heritage Blazer" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-contain p-5" /></div><div className="border-t border-[#b89559]/25 p-8"><p className="text-xs uppercase tracking-[.2em] text-[#c5a16a]">The Heritage Blazer</p><h3 className="font-display mt-3 text-4xl">Heritage with distinction.</h3><p className="mt-4 leading-8 text-[#b9b1a2]">A larger House crest on the wearer’s left chest, including the chosen House name and Latin motto. No additional patches.</p><Link href="/blazer/builder" className="mt-7 inline-block border-b border-[#c5a16a] pb-2 text-xs font-semibold uppercase tracking-[.15em]">Explore Blazer Customization</Link></div></article>
        </div>
      </div></section>
      <section className="border-t border-[#b89559]/25 bg-[#25251e] px-6 py-20 text-center sm:px-8"><div className="mx-auto max-w-2xl"><p className="text-xs uppercase tracking-[.25em] text-[#c5a16a]">The next generation</p><h2 className="font-display mt-5 text-5xl">Your story starts here.</h2><p className="mt-6 leading-8 text-[#b9b1a2]">You don&apos;t need to know every ancestor or have a formal family coat of arms. Begin with the values and memories that matter to your House today.</p><Link href="/begin" className="mt-9 inline-flex min-h-12 items-center bg-[#b89559] px-8 text-xs font-semibold uppercase tracking-[.15em] text-[#171914]">Establish Your House</Link></div></section>
    </main>
  </>;
}

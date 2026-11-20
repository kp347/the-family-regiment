import Image from "next/image";
import Link from "next/link";
export default function FounderInvitation() {
 return <section id="our-story" aria-labelledby="founder-title" className="scroll-mt-20 border-y border-[#8e754d]/30 bg-[#171813] px-6 py-20 text-[#eee6d6] lg:py-28">
  <div className="mx-auto grid max-w-[1200px] items-center gap-12 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
   <div className="relative mx-auto w-full max-w-[390px] overflow-hidden border border-[#a98a56]/50 bg-black"><Image src="/images/founder-portrait.png" alt="Black-and-white portrait of the founder of The Family Regiment" width={1024} height={1480} sizes="(max-width: 768px) 90vw, 390px" className="h-auto w-full" /></div>
   <div><p className="text-xs font-semibold uppercase tracking-[.27em] text-[#c5a16a]">The person behind the purpose</p><h2 id="founder-title" className="font-display mt-5 text-4xl leading-tight sm:text-5xl">A Letter From the Founder</h2><p className="mt-7 font-serif text-xl italic leading-relaxed text-[#d4bd96]">“A family's story deserves to be carried with the same pride as the symbols we serve under.”</p><p className="mt-6 max-w-xl text-base leading-8 text-[#c5bdad]">Born in America to French parents and shaped by service in the U.S. Army, I came to see how a symbol can represent belonging, values, and a history greater than one person. The Family Regiment began with a question: what if every family could create a symbol of its own?</p><p className="mt-5 text-sm text-[#c6ae83]">Kenneth · Founder, The Family Regiment</p><Link href="/founder" className="mt-8 inline-block border-b border-[#b89559] pb-2 text-xs font-semibold uppercase tracking-[.15em] text-[#e4d1af] hover:text-white">Read the Founder’s Story</Link></div>
  </div>
 </section>;
}

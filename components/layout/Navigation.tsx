"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { label: "Our Story", href: "/#our-story" },
  { label: "The Collection", href: "/collection" },
  { label: "Your House", href: "/house" },
];
export default function Navigation() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return <header className="relative z-50 border-b border-[#9d8257]/30 bg-[#171813] text-[#eee4d4]">
    <div className="mx-auto flex min-h-20 max-w-[1440px] items-center justify-between gap-5 px-5 lg:px-12">
      <Link href="/" onClick={() => setOpen(false)} className="font-display shrink-0 text-base font-semibold uppercase tracking-[.12em] text-[#f3eadc] sm:text-xl sm:tracking-[.17em]">The Family Regiment</Link>
      <nav aria-label="Primary navigation" className="hidden items-center gap-7 lg:flex">{links.map(x=><Link key={x.href} href={x.href} className={`text-xs font-semibold uppercase tracking-[.12em] hover:text-[#d4af6a] ${pathname === x.href ? "text-[#d4af6a]" : "text-[#bdb4a5]"}`}>{x.label}</Link>)}</nav>
      <div className="flex items-center gap-3"><Link href="/begin" className="hidden min-h-11 items-center justify-center bg-[#b89559] px-5 py-3 text-center text-[11px] font-semibold uppercase tracking-[.13em] text-[#171813] hover:bg-[#d0ac75] sm:inline-flex">Discover Your House</Link>
      <button type="button" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="regiment-mobile-nav" onClick={()=>setOpen(!open)} className="flex h-11 w-11 items-center justify-center border border-[#9d8257]/50 text-xl lg:hidden">{open ? "×" : "☰"}</button></div>
    </div>
    {open && <nav id="regiment-mobile-nav" aria-label="Mobile navigation" className="border-t border-[#9d8257]/30 bg-[#171813] px-6 pb-6 lg:hidden">{links.map(x=><Link onClick={()=>setOpen(false)} key={x.href} href={x.href} className="block border-b border-[#9d8257]/20 py-4 text-xs font-semibold uppercase tracking-[.13em]">{x.label}</Link>)}<Link href="/begin" onClick={()=>setOpen(false)} className="mt-5 block bg-[#b89559] px-5 py-4 text-center text-xs font-semibold uppercase tracking-[.12em] text-[#171813] sm:hidden">Discover Your House</Link></nav>}
  </header>;
}

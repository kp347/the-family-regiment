
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigationItems = [
  { label: "Mission", href: "/#mission" },
  { label: "The Journey", href: "/#founding-journey" },
  { label: "Heraldry", href: "/#heraldry" },
  { label: "The Great Hall", href: "/#great-hall" },
  { label: "Registry", href: "/#registry" },
  { label: "Customize Jacket", href: "/builder" },
];

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="relative z-50 border-b border-[#9d8257]/30 bg-[#171813] text-[#eee4d4]">
      <div className="mx-auto flex min-h-20 max-w-[1440px] items-center justify-between gap-4 px-5 lg:px-12">
        <Link
          href="/"
          onClick={closeMobileMenu}
          className="font-display shrink-0 text-base font-semibold uppercase tracking-[0.12em] text-[#f3eadc] sm:text-xl sm:tracking-[0.17em]"
        >
          The Family Regiment
        </Link>

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-6 lg:flex"
        >
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`group relative py-2 text-[11px] font-semibold uppercase tracking-[0.13em] transition-colors duration-300 hover:text-[#f2e6d2] ${
                pathname === item.href
                  ? "text-[#d4af6a]"
                  : "text-[#bdb4a5]"
              }`}
            >
              {item.label}
              <span className="absolute bottom-0 left-0 h-px w-0 bg-[#b89559] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <Link
            href="/begin"
            onClick={closeMobileMenu}
            className="hidden items-center justify-center border border-[#a9824b] bg-[#a9824b] px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#171813] transition-colors duration-300 hover:bg-[#c09a60] sm:inline-flex"
          >
            Establish Your House
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="family-regiment-mobile-menu"
            className="inline-flex h-11 w-11 flex-col items-center justify-center gap-1.5 border border-[#9d8257]/50 text-[#eee4d4] lg:hidden"
          >
            <span
              className={`h-px w-5 bg-current transition-transform ${
                mobileMenuOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-px w-5 bg-current transition-opacity ${
                mobileMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-px w-5 bg-current transition-transform ${
                mobileMenuOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav
          id="family-regiment-mobile-menu"
          aria-label="Mobile navigation"
          className="border-t border-[#9d8257]/30 bg-[#171813] px-5 pb-6 pt-3 lg:hidden"
        >
          <div className="mx-auto flex max-w-[1440px] flex-col">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMobileMenu}
                className="border-b border-[#9d8257]/20 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#eee4d4] transition-colors hover:text-[#d4af6a]"
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/begin"
              onClick={closeMobileMenu}
              className="mt-5 inline-flex min-h-12 items-center justify-center bg-[#a9824b] px-5 py-3 text-center text-xs font-semibold uppercase tracking-[0.14em] text-[#171813] sm:hidden"
            >
              Establish Your House
            </Link>

            <Link
              href="/builder"
              onClick={closeMobileMenu}
              className="mt-3 inline-flex min-h-12 items-center justify-center border border-[#b89559] px-5 py-3 text-center text-xs font-semibold uppercase tracking-[0.14em] text-[#d4af6a]"
            >
              Enter the Jacket Builder
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}


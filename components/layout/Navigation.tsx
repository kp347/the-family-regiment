
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
];

const collectionItems = [
  {
    label: "Collection Overview",
    href: "/collection",
    description: "Explore the Regiment collection",
  },
  {
    label: "The Regiment Jacket",
    href: "/jacket",
    description: "The founding garment",
  },
  {
    label: "The Heritage Blazer",
    href: "/blazer",
    description: "Future collection",
  },
];

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [collectionOpen, setCollectionOpen] = useState(false);

  const pathname = usePathname();

  const closeMenus = () => {
    setMobileMenuOpen(false);
    setCollectionOpen(false);
  };

  const collectionActive =
    pathname === "/collection" ||
    pathname === "/jacket" ||
    pathname === "/blazer";

  return (
    <header className="relative z-50 border-b border-[#9d8257]/30 bg-[#171813] text-[#eee4d4]">
      <div className="mx-auto flex min-h-20 max-w-[1440px] items-center justify-between gap-4 px-5 lg:px-12">
        <Link
          href="/"
          onClick={closeMenus}
          className="font-display shrink-0 text-base font-semibold uppercase tracking-[0.12em] text-[#f3eadc] sm:text-xl sm:tracking-[0.17em]"
        >
          The Family Regiment
        </Link>

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-5 lg:flex"
        >
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMenus}
              className="group relative py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#bdb4a5] transition-colors duration-300 hover:text-[#f2e6d2]"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 h-px w-0 bg-[#b89559] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}

          <div className="relative">
            <button
              type="button"
              onClick={() => setCollectionOpen((open) => !open)}
              aria-expanded={collectionOpen}
              aria-haspopup="true"
              aria-controls="regiment-collection-menu"
              className={`flex items-center gap-2 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors ${
                collectionActive || collectionOpen
                  ? "text-[#d4af6a]"
                  : "text-[#bdb4a5] hover:text-[#f2e6d2]"
              }`}
            >
              The Collection

              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className={`transition-transform ${
                  collectionOpen ? "rotate-180" : ""
                }`}
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>

            {collectionOpen && (
              <div
                id="regiment-collection-menu"
                className="absolute right-0 top-full z-50 mt-4 w-72 border border-[#8d744b]/50 bg-[#1d1e18] p-3 shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
              >
                {collectionItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMenus}
                    className="block border-b border-[#8d744b]/20 px-4 py-4 transition-colors last:border-b-0 hover:bg-[#a9824b]/10"
                  >
                    <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-[#eee4d4]">
                      {item.label}
                    </span>

                    <span className="mt-2 block text-xs text-[#a99c86]">
                      {item.description}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/builder"
            onClick={closeMenus}
            className={`py-2 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors hover:text-[#f2e6d2] ${
              pathname.startsWith("/builder")
                ? "text-[#d4af6a]"
                : "text-[#bdb4a5]"
            }`}
          >
            Customize Jacket
          </Link>
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <Link
            href="/begin"
            onClick={closeMenus}
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
                onClick={closeMenus}
                className="border-b border-[#9d8257]/20 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#eee4d4] transition-colors hover:text-[#d4af6a]"
              >
                {item.label}
              </Link>
            ))}

            <div className="border-b border-[#9d8257]/20 py-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#d4af6a]">
                The Collection
              </p>

              <div className="mt-3 flex flex-col">
                {collectionItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMenus}
                    className="py-3 pl-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#eee4d4] transition-colors hover:text-[#d4af6a]"
                  >
                    {item.label}

                    {item.href === "/blazer" && (
                      <span className="ml-2 text-[10px] normal-case tracking-normal text-[#a99c86]">
                        (Future)
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/builder"
              onClick={closeMenus}
              className="border-b border-[#9d8257]/20 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#eee4d4]"
            >
              Customize Jacket
            </Link>

            <Link
              href="/begin"
              onClick={closeMenus}
              className="mt-5 inline-flex min-h-12 items-center justify-center bg-[#a9824b] px-5 py-3 text-center text-xs font-semibold uppercase tracking-[0.14em] text-[#171813] sm:hidden"
            >
              Establish Your House
            </Link>

            <Link
              href="/builder"
              onClick={closeMenus}
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

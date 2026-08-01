import Link from "next/link";

const navigationItems = [
  { label: "Mission", href: "/mission" },
  { label: "Journey", href: "/journey" },
  { label: "Heraldry", href: "/heraldry" },
  { label: "Great Hall", href: "/great-hall" },
  { label: "Resources", href: "/resources" },
];

export default function Navigation() {
  return (
    <header className="relative z-50 border-b border-[#d4cab9] bg-[#fbf8f1]">
      <div className="mx-auto flex min-h-20 max-w-[1440px] items-center justify-between gap-8 px-6 lg:px-10">
        <Link
          href="/"
          className="font-display shrink-0 text-xl font-semibold uppercase tracking-[0.16em] text-[#302820]"
        >
          The Family Regiment
        </Link>

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-7 md:flex"
        >
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[0.92rem] font-medium text-[#625c53] transition-colors duration-200 hover:text-[#653b23]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/begin"
          className="inline-flex shrink-0 items-center justify-center border border-[#653b23] bg-[#653b23] px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#8b542f]"
        >
          Begin
          <span className="hidden sm:inline">&nbsp;Your Journey</span>
        </Link>
      </div>
    </header>
  );
}
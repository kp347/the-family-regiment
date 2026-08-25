import Link from "next/link";

const navigationItems = [
  { label: "Mission", href: "/#mission" },
  { label: "The Journey", href: "/#founding-journey" },
  { label: "Heraldry", href: "/#heraldry" },
  { label: "The Great Hall", href: "/#great-hall" },
  { label: "Registry", href: "/#registry" },
];

export default function Navigation() {
  return (
    <header className="relative z-50 border-b border-[#9d8257]/30 bg-[#171813] text-[#eee4d4]">
      <div className="mx-auto flex min-h-20 max-w-[1440px] items-center justify-between gap-8 px-6 lg:px-12">
        <Link
          href="/"
          className="font-display shrink-0 text-xl font-semibold uppercase tracking-[0.17em] text-[#f3eadc]"
        >
          The Family Regiment
        </Link>

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-7 lg:flex"
        >
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#bdb4a5] transition-colors duration-300 hover:text-[#f2e6d2]"
            >
              {item.label}

              <span className="absolute bottom-0 left-0 h-px w-0 bg-[#b89559] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <Link
          href="/begin"
          className="inline-flex shrink-0 items-center justify-center border border-[#a9824b] bg-[#a9824b] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#171813] transition-colors duration-300 hover:bg-[#c09a60]"
        >
          Establish
          <span className="hidden sm:inline">&nbsp;Your House</span>
        </Link>
      </div>
    </header>
  );
}
const navigation = [
  {
    label: "Jackets",
    href: "/#jackets",
  },
  {
    label: "Heritage Builder",
    href: "/builder",
  },
  {
    label: "Patches",
    href: "/#patches",
  },
  {
    label: "Journal",
    href: "/#about",
  },
  {
    label: "About",
    href: "/#about",
  },
];

export default function Navbar() {
  return (
    <header className="relative z-50 border-b border-white/10 bg-[#1E1F20]/95 px-6 backdrop-blur">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between">
        <a
          href="/"
          className="text-sm font-semibold uppercase tracking-[0.22em] text-[#F6F2EA] md:text-base"
        >
          The Family Regiment
        </a>

        <div className="hidden items-center gap-8 lg:flex">
          {navigation.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-xs uppercase tracking-[0.22em] text-[#AAA69E] transition hover:text-[#B08D57]"
            >
              {item.label}
            </a>
          ))}
        </div>

        <a
          href="/builder"
          className="rounded-full border border-[#B08D57] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#B08D57] transition hover:bg-[#B08D57] hover:text-[#151515] md:text-xs"
        >
          Begin
        </a>
      </nav>
    </header>
  );
}
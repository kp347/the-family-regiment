import Link from "next/link";

const navigation = [
  { name: "Mission", href: "/mission" },
  { name: "Journey", href: "/journey" },
  { name: "Heraldry", href: "/heraldry" },
  { name: "Great Hall", href: "/great-hall" },
  { name: "Resources", href: "/resources" },
];

export default function Navigation() {
  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        <Link
          href="/"
          className="text-lg font-semibold tracking-[0.18em] uppercase"
        >
          The Family Regiment
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-neutral-700 transition hover:text-black"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <Link
          href="/begin"
          className="rounded-md bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-700"
        >
          Begin Your Journey
        </Link>

      </div>
    </header>
  );
}

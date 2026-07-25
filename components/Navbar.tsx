export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-6 border-b border-white/10">
      <h1 className="text-2xl font-bold tracking-[0.25em] uppercase text-[#F6F2EA]">
        The Family Regiment
      </h1>

      <div className="hidden md:flex items-center gap-8 text-sm uppercase tracking-widest text-[#F6F2EA]">
        <a href="#" className="hover:text-[#B08D57] transition-colors">
          Jackets
        </a>

        <a href="#" className="hover:text-[#B08D57] transition-colors">
          Heritage Builder
        </a>

        <a href="#" className="hover:text-[#B08D57] transition-colors">
          Patches
        </a>

        <a href="#" className="hover:text-[#B08D57] transition-colors">
          Journal
        </a>

        <a href="#" className="hover:text-[#B08D57] transition-colors">
          About
        </a>
      </div>
    </nav>
  );
}
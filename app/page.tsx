export default function Home() {
  return (
    <main className="min-h-screen bg-[#1E1F20] text-[#F6F2EA]">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-10 py-6 border-b border-white/10">
        <h1 className="text-2xl font-bold tracking-[0.25em] uppercase">
          The Family Regiment
        </h1>

        <div className="hidden md:flex gap-8 text-sm uppercase tracking-widest">
          <a href="#">Jackets</a>
          <a href="#">Build Your Regiment</a>
          <a href="#">Patches</a>
          <a href="#">Journal</a>
          <a href="#">About</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-32">

        <p className="uppercase tracking-[0.4em] text-[#B08D57] text-sm mb-6">
          Luxury Heritage Apparel
        </p>

        <h2 className="text-6xl md:text-8xl font-bold leading-tight max-w-5xl">
          Every Family
          <br />
          Has a Regiment.
        </h2>

        <p className="mt-8 max-w-2xl text-lg text-gray-300 leading-8">
          Design a modern heirloom inspired by your family's heritage,
          traditions, service, and legacy.
        </p>

        <div className="flex gap-6 mt-12 flex-wrap justify-center">

          <button className="bg-[#B08D57] text-black px-8 py-4 rounded-full font-semibold hover:scale-105 transition">
            Build Your Regiment
          </button>

          <button className="border border-[#B08D57] px-8 py-4 rounded-full hover:bg-[#B08D57] hover:text-black transition">
            Explore Jackets
          </button>

        </div>

      </section>

      {/* Preview Section */}

      <section className="grid md:grid-cols-3 gap-10 px-10 pb-32">

        <div className="rounded-3xl bg-[#2B2C2D] p-10">
          <h3 className="text-2xl mb-4">Heritage</h3>
          <p className="text-gray-300">
            Build a crest inspired by your family's story and traditions.
          </p>
        </div>

        <div className="rounded-3xl bg-[#2B2C2D] p-10">
          <h3 className="text-2xl mb-4">Regiment Jacket</h3>
          <p className="text-gray-300">
            Customize a premium field jacket with meaningful patches.
          </p>
        </div>

        <div className="rounded-3xl bg-[#2B2C2D] p-10">
          <h3 className="text-2xl mb-4">Legacy</h3>
          <p className="text-gray-300">
            Create something your children and grandchildren can inherit.
          </p>
        </div>

      </section>
    </main>
  );
}
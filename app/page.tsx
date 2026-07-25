import FeaturedJacket from "@/components/FeaturedJacket";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#1E1F20] text-[#F6F2EA]">
      <Navbar />
      <Hero />

      <section className="mx-auto grid max-w-7xl gap-6 px-6 pb-24 md:grid-cols-3">
        <article className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
          <p className="mb-8 text-xs uppercase tracking-[0.35em] text-[#B08D57]">
            Chapter I
          </p>

          <h3 className="text-3xl">Heritage</h3>

          <p className="mt-4 leading-7 text-[#AAA69E]">
            Turn ancestry, places, symbols, and traditions into a family crest.
          </p>
        </article>

        <article className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
          <p className="mb-8 text-xs uppercase tracking-[0.35em] text-[#B08D57]">
            Chapter II
          </p>

          <h3 className="text-3xl">The Jacket</h3>

          <p className="mt-4 leading-7 text-[#AAA69E]">
            Build a premium field jacket with patches chosen around your story.
          </p>
        </article>

        <article className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
          <p className="mb-8 text-xs uppercase tracking-[0.35em] text-[#B08D57]">
            Chapter III
          </p>

          <h3 className="text-3xl">Legacy</h3>

          <p className="mt-4 leading-7 text-[#AAA69E]">
            Create a modern heirloom designed to be worn, remembered, and passed
            down.
          </p>
        </article>
      </section>

      <FeaturedJacket />
    </main>
  );
}
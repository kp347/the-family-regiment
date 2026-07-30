export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <section className="mx-auto max-w-4xl text-center">
        <p className="mb-6 text-sm font-semibold uppercase tracking-[0.3em]">
          The Family Regiment
        </p>

        <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
          Every Family Has a Story Worth Preserving.
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-neutral-600">
          Discover your heritage. Preserve your identity. Carry your legacy
          forward.
        </p>

        <div className="mt-10">
          <a
            href="/begin"
            className="inline-flex items-center justify-center rounded-md bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-700"
          >
            Begin Your Journey
          </a>
        </div>
      </section>
    </main>
  );
}
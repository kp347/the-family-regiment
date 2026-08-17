export default function ManufacturingCard() {
  return (
    <section className="rounded-2xl border border-stone-200 bg-stone-50 p-8">
      <div className="mb-6">
        <p className="text-sm uppercase tracking-[0.3em] text-stone-500">
          Production Guidance
        </p>

        <h2 className="mt-2 text-3xl font-serif">
          Manufacturing Notes
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <h3 className="text-lg font-semibold">
            Embroidery
          </h3>

          <p className="mt-2 leading-7 text-stone-600">
            Final artwork should favor bold silhouettes,
            simplified internal detail, strong contrast,
            and a limited thread palette for reliable
            embroidery production.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold">
            Patch Scale
          </h3>

          <p className="mt-2 leading-7 text-stone-600">
            Small details should be reviewed before
            production. Complex heraldic elements may
            require simplification or a larger patch size
            to preserve clarity.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold">
            Color Discipline
          </h3>

          <p className="mt-2 leading-7 text-stone-600">
            Tinctures should be translated into practical
            thread colors while preserving the intended
            heraldic contrast and meaning.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold">
            Final Review
          </h3>

          <p className="mt-2 leading-7 text-stone-600">
            The approved design should undergo a production
            validation pass before manufacturing assets are
            released.
          </p>
        </div>
      </div>
    </section>
  );
}
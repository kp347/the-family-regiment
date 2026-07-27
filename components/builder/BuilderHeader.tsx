// components/builder/BuilderHeader.tsx

type BuilderHeaderProps = {
  saveMessage: string;
  onSave: () => void;
  onReset: () => void;
};

export default function BuilderHeader({
  saveMessage,
  onSave,
  onReset,
}: BuilderHeaderProps) {
  return (
    <>
      <header className="border-b border-white/10 px-6 py-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6">
          <a
            href="/"
            className="text-sm font-semibold uppercase tracking-[0.22em]"
          >
            The Family Regiment
          </a>

          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={onSave}
              className="hidden text-xs uppercase tracking-[0.25em] text-[#B08D57] transition hover:text-[#F6F2EA] sm:block"
            >
              Save Draft
            </button>

            <a
              href="/"
              className="text-xs uppercase tracking-[0.25em] text-[#8F8B82] transition hover:text-[#B08D57]"
            >
              Exit Builder
            </a>
          </div>
        </div>
      </header>

      <div className="mx-auto mb-12 flex max-w-7xl flex-col gap-8 px-6 pt-10 md:pt-16 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.45em] text-[#B08D57]">
            Heritage Identity Workshop
          </p>

          <h1 className="mt-5 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
            Build your family regiment.
          </h1>

          <p className="mt-5 max-w-2xl leading-7 text-[#8F8B82]">
            Create the identity that will guide your crest, motto,
            embroidery, patches, and Regiment Jacket.
          </p>
        </div>

        <div className="flex items-center gap-5">
          {saveMessage && (
            <p className="text-xs uppercase tracking-[0.25em] text-[#B08D57]">
              {saveMessage}
            </p>
          )}

          <button
            type="button"
            onClick={onReset}
            className="text-xs uppercase tracking-[0.25em] text-[#65625D] transition hover:text-[#F6F2EA]"
          >
            Reset
          </button>
        </div>
      </div>
    </>
  );
}
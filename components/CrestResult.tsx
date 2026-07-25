"use client";

import { useEffect, useMemo, useState } from "react";

type BuilderDraft = {
  familyName: string;
  initials: string;
  heritage: string;
  symbol: string;
  value: string;
  motto: string;
};

const defaultDraft: BuilderDraft = {
  familyName: "Laurent",
  initials: "LR",
  heritage: "France",
  symbol: "Lion",
  value: "Courage",
  motto: "Fortis in Familia",
};

const symbolCharacters: Record<string, string> = {
  Lion: "♌",
  Eagle: "◆",
  Stag: "♜",
  Wolf: "◇",
};

const heritageCodes: Record<string, string> = {
  France: "FR",
  "United States": "US",
  Ireland: "IE",
  Italy: "IT",
  England: "EN",
  Scotland: "SC",
  Germany: "DE",
  Spain: "ES",
};

export default function CrestResult() {
  const [draft, setDraft] = useState<BuilderDraft>(defaultDraft);
  const [loaded, setLoaded] = useState(false);
  const [downloadMessage, setDownloadMessage] = useState("");

  useEffect(() => {
    const savedDraft = window.localStorage.getItem("family-regiment-draft");

    if (savedDraft) {
      try {
        const parsedDraft = JSON.parse(savedDraft) as Partial<BuilderDraft>;

        setDraft({
          familyName: parsedDraft.familyName ?? defaultDraft.familyName,
          initials: parsedDraft.initials ?? defaultDraft.initials,
          heritage: parsedDraft.heritage ?? defaultDraft.heritage,
          symbol: parsedDraft.symbol ?? defaultDraft.symbol,
          value: parsedDraft.value ?? defaultDraft.value,
          motto: parsedDraft.motto ?? defaultDraft.motto,
        });
      } catch {
        window.localStorage.removeItem("family-regiment-draft");
      }
    }

    setLoaded(true);
  }, []);

  const symbolCharacter =
    symbolCharacters[draft.symbol] ?? symbolCharacters.Lion;

  const heritageCode =
    heritageCodes[draft.heritage] ??
    draft.heritage.slice(0, 2).toUpperCase();

  const familyName = draft.familyName.trim() || "Family";
  const initials = draft.initials.trim() || heritageCode;

  const svgMarkup = useMemo(() => {
    return createCrestSvg({
      familyName,
      initials,
      heritageCode,
      heritage: draft.heritage,
      symbol: symbolCharacter,
      value: draft.value,
      motto: draft.motto,
    });
  }, [
    familyName,
    initials,
    heritageCode,
    draft.heritage,
    symbolCharacter,
    draft.value,
    draft.motto,
  ]);

  function downloadCrest() {
    const blob = new Blob([svgMarkup], {
      type: "image/svg+xml;charset=utf-8",
    });

    const fileUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = fileUrl;
    link.download = `${familyName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")}-family-crest.svg`;

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(fileUrl);

    setDownloadMessage("Crest downloaded");

    window.setTimeout(() => {
      setDownloadMessage("");
    }, 2500);
  }

  if (!loaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#111213] text-[#F6F2EA]">
        <p className="text-xs uppercase tracking-[0.35em] text-[#B08D57]">
          Preparing your crest
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111213] text-[#F6F2EA]">
      <header className="border-b border-white/10 px-6 py-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6">
          <a
            href="/"
            className="text-sm font-semibold uppercase tracking-[0.22em]"
          >
            The Family Regiment
          </a>

          <a
            href="/builder"
            className="text-xs uppercase tracking-[0.25em] text-[#8F8B82] transition hover:text-[#B08D57]"
          >
            Edit Regiment
          </a>
        </div>
      </header>

      <main className="px-6 py-12 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-4xl">
            <p className="text-xs uppercase tracking-[0.45em] text-[#B08D57]">
              Crest Concept No. 01
            </p>

            <h1 className="mt-6 text-5xl font-semibold leading-[0.95] tracking-[-0.05em] md:text-7xl">
              The House of {familyName}
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#99958D]">
              A first heraldic concept based on your family identity, heritage,
              guiding value, and selected motto.
            </p>
          </div>

          <div className="grid overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#18191A] lg:grid-cols-[1.1fr_0.9fr]">
            <section className="relative flex min-h-[760px] items-center justify-center overflow-hidden bg-[#24251F] p-8 md:p-14">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(176,141,87,0.22),_transparent_65%)]" />

              <div className="relative w-full max-w-xl">
                <div
                  className="mx-auto w-full max-w-[520px]"
                  dangerouslySetInnerHTML={{ __html: svgMarkup }}
                />

                <p className="mt-10 text-center text-[10px] uppercase tracking-[0.35em] text-[#77736A]">
                  Digital concept · Production refinement required
                </p>
              </div>
            </section>

            <aside className="p-8 md:p-12">
              <p className="text-xs uppercase tracking-[0.4em] text-[#B08D57]">
                Regiment Record
              </p>

              <h2 className="mt-5 text-4xl">
                {familyName} Family Crest
              </h2>

              <div className="mt-10 space-y-6 border-y border-white/10 py-8">
                <RecordRow label="Family" value={familyName} />
                <RecordRow label="Monogram" value={initials} />
                <RecordRow label="Heritage" value={draft.heritage} />
                <RecordRow label="Symbol" value={draft.symbol} />
                <RecordRow label="Principle" value={draft.value} />
                <RecordRow label="Motto" value={draft.motto} />
              </div>

              <div className="mt-10">
                <p className="text-xs uppercase tracking-[0.35em] text-[#B08D57]">
                  Embroidery Palette
                </p>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <PaletteCard
                    name="Regiment Gold"
                    hex="#B08D57"
                    className="bg-[#B08D57]"
                  />

                  <PaletteCard
                    name="Field Olive"
                    hex="#34382A"
                    className="bg-[#34382A]"
                  />

                  <PaletteCard
                    name="Deep Charcoal"
                    hex="#20231C"
                    className="bg-[#20231C]"
                  />

                  <PaletteCard
                    name="Heritage Ivory"
                    hex="#E7D8B4"
                    className="bg-[#E7D8B4]"
                    darkText
                  />
                </div>
              </div>

              <div className="mt-10 rounded-2xl border border-[#B08D57]/25 bg-[#B08D57]/5 p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-[#B08D57]">
                  Production Standard
                </p>

                <p className="mt-4 text-sm leading-7 text-[#99958D]">
                  The crest uses four principal colors, broad shapes, strong
                  borders, and limited small lettering. A patch vendor would
                  still digitize and test the design before embroidery.
                </p>
              </div>

              <div className="mt-10 space-y-4">
                <button
                  type="button"
                  onClick={downloadCrest}
                  className="w-full rounded-full bg-[#B08D57] px-8 py-4 text-sm font-semibold uppercase tracking-widest text-[#151515] transition hover:scale-[1.01]"
                >
                  Download Crest SVG
                </button>

                <a
                  href="/builder"
                  className="block w-full rounded-full border border-white/15 px-8 py-4 text-center text-sm font-semibold uppercase tracking-widest transition hover:border-[#B08D57] hover:text-[#B08D57]"
                >
                  Refine My Identity
                </a>

                {downloadMessage && (
                  <p className="text-center text-xs uppercase tracking-[0.25em] text-[#B08D57]">
                    {downloadMessage}
                  </p>
                )}
              </div>
            </aside>
          </div>

          <section className="mt-10 grid gap-5 md:grid-cols-3">
            <ProcessCard
              number="01"
              title="Concept"
              description="Your builder answers establish the crest structure, symbols, and palette."
            />

            <ProcessCard
              number="02"
              title="Refinement"
              description="The design is simplified and balanced for embroidery production."
            />

            <ProcessCard
              number="03"
              title="Sampling"
              description="A physical stitch sample confirms scale, legibility, and thread choices."
            />
          </section>
        </div>
      </main>
    </div>
  );
}

function RecordRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start justify-between gap-8">
      <p className="text-xs uppercase tracking-[0.25em] text-[#77736A]">
        {label}
      </p>

      <p className="max-w-xs text-right text-[#F6F2EA]">{value}</p>
    </div>
  );
}

function PaletteCard({
  name,
  hex,
  className,
  darkText = false,
}: {
  name: string;
  hex: string;
  className: string;
  darkText?: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10">
      <div className={`h-20 ${className}`} />

      <div className="bg-white/[0.03] p-4">
        <p className={darkText ? "text-sm text-[#F6F2EA]" : "text-sm"}>
          {name}
        </p>

        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-[#77736A]">
          {hex}
        </p>
      </div>
    </div>
  );
}

function ProcessCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <article className="rounded-3xl border border-white/10 bg-white/[0.025] p-7">
      <p className="text-xs tracking-[0.3em] text-[#B08D57]">{number}</p>

      <h3 className="mt-8 text-2xl">{title}</h3>

      <p className="mt-4 text-sm leading-7 text-[#88857E]">
        {description}
      </p>
    </article>
  );
}

function createCrestSvg({
  familyName,
  initials,
  heritageCode,
  heritage,
  symbol,
  value,
  motto,
}: {
  familyName: string;
  initials: string;
  heritageCode: string;
  heritage: string;
  symbol: string;
  value: string;
  motto: string;
}) {
  const safeFamilyName = escapeXml(familyName);
  const safeInitials = escapeXml(initials);
  const safeHeritageCode = escapeXml(heritageCode);
  const safeHeritage = escapeXml(heritage);
  const safeSymbol = escapeXml(symbol);
  const safeValue = escapeXml(value);
  const safeMotto = escapeXml(motto);

  return `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 600 760"
      role="img"
      aria-label="${safeFamilyName} family crest"
      style="display:block;width:100%;height:auto"
    >
      <defs>
        <filter id="crest-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow
            dx="0"
            dy="18"
            stdDeviation="18"
            flood-color="#000000"
            flood-opacity="0.38"
          />
        </filter>

        <linearGradient id="shield-field" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#3E4331" />
          <stop offset="100%" stop-color="#292D22" />
        </linearGradient>
      </defs>

      <g filter="url(#crest-shadow)">
        <path
          d="M300 54 L344 90 L391 76 L382 126 L425 152 L378 170 L365 220 L300 185 L235 220 L222 170 L175 152 L218 126 L209 76 L256 90 Z"
          fill="#B08D57"
          stroke="#E7D8B4"
          stroke-width="5"
          stroke-linejoin="round"
        />

        <circle
          cx="300"
          cy="138"
          r="28"
          fill="#20231C"
          stroke="#E7D8B4"
          stroke-width="4"
        />

        <text
          x="300"
          y="148"
          text-anchor="middle"
          fill="#E7D8B4"
          font-family="Georgia, serif"
          font-size="25"
          font-weight="700"
          letter-spacing="3"
        >
          ${safeInitials}
        </text>

        <path
          d="M150 198
             Q300 130 450 198
             L430 440
             Q412 570 300 632
             Q188 570 170 440
             Z"
          fill="url(#shield-field)"
          stroke="#B08D57"
          stroke-width="12"
          stroke-linejoin="round"
        />

        <path
          d="M300 166
             L300 622"
          stroke="#B08D57"
          stroke-width="7"
        />

        <path
          d="M166 337
             L434 337"
          stroke="#B08D57"
          stroke-width="7"
        />

        <path
          d="M176 212
             Q232 180 292 174
             L292 329
             L168 329
             Z"
          fill="#20231C"
        />

        <path
          d="M308 174
             Q368 180 424 212
             L432 329
             L308 329
             Z"
          fill="#34382A"
        />

        <path
          d="M174 345
             L292 345
             L292 607
             Q214 556 190 458
             Z"
          fill="#34382A"
        />

        <path
          d="M308 345
             L426 345
             L410 458
             Q386 556 308 607
             Z"
          fill="#20231C"
        />

        <circle
          cx="300"
          cy="350"
          r="108"
          fill="#20231C"
          stroke="#B08D57"
          stroke-width="8"
        />

        <circle
          cx="300"
          cy="350"
          r="88"
          fill="none"
          stroke="#B08D57"
          stroke-width="3"
          stroke-dasharray="7 8"
        />

        <text
          x="300"
          y="384"
          text-anchor="middle"
          fill="#B08D57"
          font-family="Georgia, serif"
          font-size="112"
        >
          ${safeSymbol}
        </text>

        <text
          x="231"
          y="268"
          text-anchor="middle"
          fill="#E7D8B4"
          font-family="Arial, sans-serif"
          font-size="18"
          font-weight="700"
          letter-spacing="4"
        >
          ${safeHeritageCode}
        </text>

        <text
          x="369"
          y="268"
          text-anchor="middle"
          fill="#E7D8B4"
          font-family="Arial, sans-serif"
          font-size="15"
          font-weight="700"
          letter-spacing="2"
        >
          ${safeValue.toUpperCase()}
        </text>

        <text
          x="232"
          y="490"
          text-anchor="middle"
          fill="#E7D8B4"
          font-family="Arial, sans-serif"
          font-size="14"
          font-weight="700"
          letter-spacing="2"
        >
          ${safeHeritage.toUpperCase()}
        </text>

        <text
          x="368"
          y="490"
          text-anchor="middle"
          fill="#B08D57"
          font-family="Georgia, serif"
          font-size="30"
          font-weight="700"
          letter-spacing="3"
        >
          ${safeInitials}
        </text>

        <path
          d="M102 602
             Q300 552 498 602
             L466 680
             Q300 640 134 680
             Z"
          fill="#20231C"
          stroke="#B08D57"
          stroke-width="7"
          stroke-linejoin="round"
        />

        <text
          x="300"
          y="632"
          text-anchor="middle"
          fill="#F6F2EA"
          font-family="Georgia, serif"
          font-size="24"
          font-weight="700"
          letter-spacing="3"
        >
          ${safeFamilyName.toUpperCase()}
        </text>

        <text
          x="300"
          y="665"
          text-anchor="middle"
          fill="#B08D57"
          font-family="Arial, sans-serif"
          font-size="14"
          font-weight="700"
          letter-spacing="3"
        >
          ${safeMotto.toUpperCase()}
        </text>
      </g>
    </svg>
  `;
}

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}
"use client";

type BuilderHeraldryProps = {
  animal: string;
  shield: string;
  crown: string;
  onAnimalChange: (value: string) => void;
  onShieldChange: (value: string) => void;
  onCrownChange: (value: string) => void;
};

type AnimalOption = {
  name: string;
  meaning: string;
  artworkPending?: boolean;
};

type ShieldOption = {
  name: string;
  path: string;
};

type CrownOption = {
  name: string;
};

const animals: AnimalOption[] = [
  {
    name: "Lion",
    meaning: "Courage, leadership, strength, and protection",
  },
  {
    name: "Eagle",
    meaning: "Vision, vigilance, authority, and resolve",
  },
  {
    name: "Wolf",
    meaning: "Loyalty, family bonds, guardianship, and endurance",
  },
  {
    name: "Bear",
    meaning: "Strength, protection, steadfastness, and courage",
  },
  {
    name: "Stag",
    meaning: "Dignity, stewardship, renewal, and heritage",
  },
  {
    name: "Griffin",
    meaning: "Guardianship, vigilance, courage, and strength",
    artworkPending: true,
  },
  {
    name: "Salmon",
    meaning: "Perseverance, return, journey, and continuity",
    artworkPending: true,
  },
];

const shields: ShieldOption[] = [
  {
    name: "Heater Shield",
    path:
      "M50 8 C72 8 88 13 92 18 V48 C92 72 76 91 50 106 C24 91 8 72 8 48 V18 C12 13 28 8 50 8 Z",
  },
  {
    name: "Norman Shield",
    path:
      "M50 7 C72 7 88 12 92 18 V43 C92 70 74 94 50 110 C26 94 8 70 8 43 V18 C12 12 28 7 50 7 Z",
  },
  {
    name: "Tournament Shield",
    path:
      "M12 10 H88 L94 24 L86 76 L50 108 L14 76 L6 24 Z",
  },
  {
    name: "Crusader Shield",
    path:
      "M9 10 H91 L95 22 L84 78 L50 109 L16 78 L5 22 Z",
  },
];

const crowns: CrownOption[] = [
  {
    name: "None",
  },
  {
    name: "Baron",
  },
  {
    name: "Count",
  },
  {
    name: "Ducal",
  },
  {
    name: "Royal",
  },
];

export default function BuilderHeraldry({
  animal,
  shield,
  crown,
  onAnimalChange,
  onShieldChange,
  onCrownChange,
}: BuilderHeraldryProps) {
  return (
    <div className="space-y-12">
      <section>
        <SectionHeader
          eyebrow="Shield Library"
          title="Choose the foundation"
          description="Select the shield silhouette that will carry the four-part family composition."
        />

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {shields.map((option) => {
            const active = shield === option.name;

            return (
              <button
                key={option.name}
                type="button"
                onClick={() =>
                  onShieldChange(option.name)
                }
                aria-pressed={active}
                className={[
                  "group relative rounded-[1.35rem] border p-5 text-center transition duration-200",
                  active
                    ? "border-[#C8A969] bg-[#C8A969]/10 shadow-[inset_0_0_0_1px_rgba(200,169,105,0.16)]"
                    : "border-white/10 bg-[#20211F] hover:-translate-y-0.5 hover:border-[#B08D57]/55",
                ].join(" ")}
              >
                {active && <SelectedMark />}

                <div className="flex h-32 items-center justify-center">
                  <svg
                    viewBox="0 0 100 114"
                    className="h-28 w-24"
                    aria-hidden="true"
                  >
                    <path
                      d={option.path}
                      fill={
                        active
                          ? "#20231C"
                          : "#181917"
                      }
                      stroke={
                        active
                          ? "#D0AE69"
                          : "#8C7A58"
                      }
                      strokeWidth="4"
                      strokeLinejoin="round"
                    />

                    <path
                      d={option.path}
                      transform="translate(5 6) scale(0.9)"
                      fill="none"
                      stroke={
                        active
                          ? "#E8D7AE"
                          : "#5D584D"
                      }
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <p className="mt-3 text-sm font-semibold text-[#F3EEE4]">
                  {option.name}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      <section>
        <SectionHeader
          eyebrow="Primary Charge"
          title="Choose your heraldic figure"
          description="The Family Regiment uses a deliberately limited Canon of approved heraldic figures. Your selected figure initially occupies Quadrant II."
        />

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {animals.map((option) => {
            const active = animal === option.name;

            return (
              <button
                key={option.name}
                type="button"
                onClick={() =>
                  onAnimalChange(option.name)
                }
                aria-pressed={active}
                className={[
                  "group relative min-h-[220px] overflow-hidden rounded-[1.35rem] border p-5 text-left transition duration-200",
                  active
                    ? "border-[#C8A969] bg-[#C8A969]/10"
                    : "border-white/10 bg-[#20211F] hover:-translate-y-0.5 hover:border-[#B08D57]/55",
                ].join(" ")}
              >
                {active && <SelectedMark />}

                <div className="relative flex h-28 items-center justify-center rounded-xl border border-white/8 bg-[#171815]">
                  {option.artworkPending ? (
                    <PendingCanonArtwork
                      name={option.name}
                      active={active}
                    />
                  ) : (
                    <AnimalPreview
                      name={option.name}
                      active={active}
                    />
                  )}
                </div>

                <div className="mt-5">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-lg font-semibold text-[#F3EEE4]">
                      {option.name}
                    </p>

                    {option.artworkPending && (
                      <span className="rounded-full border border-[#B08D57]/35 bg-[#B08D57]/10 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#BFA46D]">
                        Art Pending
                      </span>
                    )}
                  </div>

                  <p className="mt-2 text-sm leading-6 text-[#89847A]">
                    {option.meaning}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-5 rounded-xl border border-[#B08D57]/20 bg-[#B08D57]/5 px-5 py-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B08D57]">
            Family Regiment Visual Canon
          </p>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-[#8E8A81]">
            Standard crests are assembled exclusively from curated
            Family Regiment Canon artwork. Additional animals are not
            generated on demand. New artwork enters the collection only
            through the Family Regiment design and approval process.
          </p>
        </div>
      </section>

      <section>
        <SectionHeader
          eyebrow="Crown & Coronet"
          title="Choose an upper ornament"
          description="Optional crown and coronet treatments sit above the shield rather than inside a quadrant."
        />

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {crowns.map((option) => {
            const active = crown === option.name;

            return (
              <button
                key={option.name}
                type="button"
                onClick={() =>
                  onCrownChange(option.name)
                }
                aria-pressed={active}
                className={[
                  "group relative rounded-[1.35rem] border p-4 text-center transition duration-200",
                  active
                    ? "border-[#C8A969] bg-[#C8A969]/10"
                    : "border-white/10 bg-[#20211F] hover:-translate-y-0.5 hover:border-[#B08D57]/55",
                ].join(" ")}
              >
                {active && <SelectedMark />}

                <div className="flex h-24 items-center justify-center rounded-xl border border-white/8 bg-[#171815]">
                  <CrownPreview
                    name={option.name}
                    active={active}
                  />
                </div>

                <p className="mt-3 text-sm font-semibold text-[#F3EEE4]">
                  {option.name}
                </p>
              </button>
            );
          })}
        </div>

        <p className="mt-4 text-xs leading-5 text-[#6F6A62]">
          Current crown names are working labels only. Before public launch,
          we should revise title-sensitive names so the interface does not
          imply inherited rank or noble entitlement.
        </p>
      </section>
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#B08D57]">
        {eyebrow}
      </p>

      <h3 className="mt-2 text-2xl text-[#F4EFE5]">
        {title}
      </h3>

      <p className="mt-2 max-w-2xl text-sm leading-6 text-[#8E8A81]">
        {description}
      </p>
    </div>
  );
}

function SelectedMark() {
  return (
    <div className="absolute right-4 top-4 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-[#C8A969] text-[11px] font-bold text-[#151515]">
      ✓
    </div>
  );
}

function PendingCanonArtwork({
  name,
  active,
}: {
  name: string;
  active: boolean;
}) {
  return (
    <div className="flex flex-col items-center justify-center px-5 text-center">
      <div
        className={[
          "flex h-12 w-12 items-center justify-center rounded-full border",
          active
            ? "border-[#C8A969]/60 bg-[#C8A969]/10"
            : "border-[#806C4A]/40 bg-[#806C4A]/5",
        ].join(" ")}
      >
        <span
          className={[
            "font-serif text-xl",
            active
              ? "text-[#D7B66E]"
              : "text-[#806C4A]",
          ].join(" ")}
        >
          {name.charAt(0)}
        </span>
      </div>

      <p className="mt-3 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#756E61]">
        Canon Artwork Pending
      </p>
    </div>
  );
}

function AnimalPreview({
  name,
  active,
}: {
  name: string;
  active: boolean;
}) {
  const stroke =
    active
      ? "#D7B66E"
      : "#9C845A";

  const fill =
    active
      ? "#C8A969"
      : "#806C4A";

  switch (name) {
    case "Lion":
      return (
        <svg
          viewBox="0 0 100 120"
          className="h-24 w-20"
          aria-hidden="true"
        >
          <path
            d="M55 26 C63 20 73 24 77 31 C82 41 76 50 67 54 C72 64 70 75 63 84 C59 89 54 94 51 103 L45 103 C43 95 45 88 49 82 C40 81 33 75 30 67 C27 58 31 49 39 43 C43 40 48 37 53 36 C50 31 51 28 55 26 Z"
            fill={fill}
            stroke={stroke}
            strokeWidth="2"
          />

          <path
            d="M41 50 L26 35 L20 29 M42 58 L22 57 L14 53 M61 77 L78 91 L85 99"
            fill="none"
            stroke={stroke}
            strokeWidth="4"
            strokeLinecap="round"
          />

          <path
            d="M63 69 C79 67 85 56 82 46 C80 38 85 30 93 28"
            fill="none"
            stroke={stroke}
            strokeWidth="5"
            strokeLinecap="round"
          />

          <circle
            cx="67"
            cy="36"
            r="2"
            fill="#171815"
          />
        </svg>
      );

    case "Eagle":
      return (
        <svg
          viewBox="0 0 100 100"
          className="h-20 w-24"
          aria-hidden="true"
        >
          <path
            d="M49 27 C36 15 21 14 7 22 C21 28 31 37 39 50 C27 45 17 47 7 55 C22 59 34 68 44 82 L50 62 Z"
            fill={fill}
            stroke={stroke}
            strokeWidth="2"
          />

          <path
            d="M51 27 C64 15 79 14 93 22 C79 28 69 37 61 50 C73 45 83 47 93 55 C78 59 66 68 56 82 L50 62 Z"
            fill={fill}
            stroke={stroke}
            strokeWidth="2"
          />

          <path
            d="M44 30 C48 23 52 23 56 30 L55 67 L50 82 L45 67 Z"
            fill={fill}
            stroke={stroke}
            strokeWidth="2"
          />
        </svg>
      );

    case "Wolf":
      return (
        <svg
          viewBox="0 0 100 100"
          className="h-20 w-20"
          aria-hidden="true"
        >
          <path
            d="M25 28 L15 8 L32 22 C42 16 58 16 68 22 L85 8 L75 29 C82 37 84 48 80 58 C74 74 61 83 50 84 C37 82 25 74 20 59 C17 48 19 37 25 28 Z"
            fill={fill}
            stroke={stroke}
            strokeWidth="2"
          />

          <path
            d="M37 55 C44 50 56 50 63 55 C59 64 54 68 50 68 C46 68 41 64 37 55 Z"
            fill="#171815"
          />
        </svg>
      );

    case "Bear":
      return (
        <svg
          viewBox="0 0 100 100"
          className="h-20 w-20"
          aria-hidden="true"
        >
          <circle
            cx="30"
            cy="26"
            r="12"
            fill={fill}
            stroke={stroke}
            strokeWidth="2"
          />

          <circle
            cx="70"
            cy="26"
            r="12"
            fill={fill}
            stroke={stroke}
            strokeWidth="2"
          />

          <path
            d="M24 35 C29 19 41 15 50 15 C59 15 71 19 76 35 C83 56 71 80 50 84 C29 80 17 56 24 35 Z"
            fill={fill}
            stroke={stroke}
            strokeWidth="2"
          />

          <path
            d="M37 57 C43 52 57 52 63 57 C60 66 55 70 50 70 C45 70 40 66 37 57 Z"
            fill="#171815"
          />
        </svg>
      );

    case "Stag":
    default:
      return (
        <svg
          viewBox="0 0 100 110"
          className="h-24 w-20"
          aria-hidden="true"
        >
          <path
            d="M34 38 C25 45 23 59 29 70 C34 80 43 85 51 84 C61 82 69 72 69 61 C69 49 62 40 53 37 C47 35 40 35 34 38 Z"
            fill={fill}
            stroke={stroke}
            strokeWidth="2"
          />

          <path
            d="M35 35 C24 25 20 13 23 1 M25 21 L13 14 M27 13 L34 3"
            fill="none"
            stroke={stroke}
            strokeWidth="5"
            strokeLinecap="round"
          />

          <path
            d="M56 35 C67 25 71 13 68 1 M66 21 L78 14 M64 13 L57 3"
            fill="none"
            stroke={stroke}
            strokeWidth="5"
            strokeLinecap="round"
          />
        </svg>
      );
  }
}

function CrownPreview({
  name,
  active,
}: {
  name: string;
  active: boolean;
}) {
  if (name === "None") {
    return (
      <div className="flex flex-col items-center gap-2">
        <div className="h-px w-12 bg-white/20" />

        <span className="text-[10px] uppercase tracking-[0.18em] text-[#77736A]">
          No ornament
        </span>
      </div>
    );
  }

  const fill =
    active
      ? "#C8A969"
      : "#856F49";

  const stroke =
    active
      ? "#E8D7AE"
      : "#A58B5A";

  const peak =
    name === "Royal"
      ? 12
      : name === "Ducal"
        ? 17
        : name === "Count"
          ? 22
          : 27;

  return (
    <svg
      viewBox="0 0 100 70"
      className="h-16 w-24"
      aria-hidden="true"
    >
      <path
        d={`M14 48 L25 28 L37 45 L50 ${peak} L63 45 L75 28 L86 48 L81 58 H19 Z`}
        fill={fill}
        stroke={stroke}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      <rect
        x="19"
        y="48"
        width="62"
        height="10"
        rx="2"
        fill={fill}
        stroke={stroke}
        strokeWidth="2"
      />

      <circle
        cx="25"
        cy="28"
        r="3"
        fill={stroke}
      />

      <circle
        cx="50"
        cy={peak}
        r="3.2"
        fill={stroke}
      />

      <circle
        cx="75"
        cy="28"
        r="3"
        fill={stroke}
      />
    </svg>
  );
}
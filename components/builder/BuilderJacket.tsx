// components/builder/BuilderJacket.tsx

export type JacketViewOption = {
  name: string;
  image: string;
};

export type EmbroideryFinishOption = {
  name: string;
  detail: string;
};

type BuilderJacketProps = {
  jacketView: string;
  crestPlacement: string;
  embroideryFinish: string;
  includeNameTape: boolean;
  includeSleevePatch: boolean;
  jacketViews: JacketViewOption[];
  embroideryFinishes: EmbroideryFinishOption[];
  onJacketViewChange: (value: string) => void;
  onCrestPlacementChange: (value: string) => void;
  onEmbroideryFinishChange: (value: string) => void;
  onNameTapeChange: (value: boolean) => void;
  onSleevePatchChange: (value: boolean) => void;
};

const crestPlacements = ["Left Chest", "Right Chest"];

export default function BuilderJacket({
  jacketView,
  crestPlacement,
  embroideryFinish,
  includeNameTape,
  includeSleevePatch,
  jacketViews,
  embroideryFinishes,
  onJacketViewChange,
  onCrestPlacementChange,
  onEmbroideryFinishChange,
  onNameTapeChange,
  onSleevePatchChange,
}: BuilderJacketProps) {
  return (
    <div className="space-y-10">
      <BuilderGroup title="Jacket view">
        <OptionGrid>
          {jacketViews.map((option) => (
            <OptionButton
              key={option.name}
              active={jacketView === option.name}
              onClick={() => onJacketViewChange(option.name)}
              title={`${option.name} view`}
              detail={
                option.name === "Front"
                  ? "Preview chest and sleeve placement."
                  : "Preview the restrained rear treatment."
              }
            />
          ))}
        </OptionGrid>
      </BuilderGroup>

      <BuilderGroup title="Crest placement">
        <OptionGrid>
          {crestPlacements.map((option) => (
            <OptionButton
              key={option}
              active={crestPlacement === option}
              onClick={() => onCrestPlacementChange(option)}
              title={option}
              detail="Primary embroidered family crest."
            />
          ))}
        </OptionGrid>
      </BuilderGroup>

      <BuilderGroup title="Embroidery finish">
        <div className="space-y-4">
          {embroideryFinishes.map((option) => {
            const active = embroideryFinish === option.name;

            return (
              <button
                key={option.name}
                type="button"
                onClick={() => onEmbroideryFinishChange(option.name)}
                className={`w-full rounded-2xl border p-6 text-left transition ${
                  active
                    ? "border-[#B08D57] bg-[#B08D57]/10"
                    : "border-white/10 bg-white/[0.02] hover:border-white/25"
                }`}
              >
                <div className="flex items-center justify-between gap-6">
                  <div>
                    <p className="text-xl">{option.name}</p>

                    <p className="mt-2 text-sm leading-6 text-[#77736A]">
                      {option.detail}
                    </p>
                  </div>

                  <span className="shrink-0 text-xs uppercase tracking-[0.2em] text-[#B08D57]">
                    {active ? "Selected" : "Choose"}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </BuilderGroup>

      <BuilderGroup title="Additional patches">
        <div className="space-y-4">
          <ToggleOption
            title="Family name tape"
            detail="Displays the family name above the chest pocket."
            active={includeNameTape}
            onClick={() => onNameTapeChange(!includeNameTape)}
          />

          <ToggleOption
            title="Heritage sleeve patch"
            detail="Adds a restrained heritage identifier to the sleeve."
            active={includeSleevePatch}
            onClick={() => onSleevePatchChange(!includeSleevePatch)}
          />
        </div>
      </BuilderGroup>
    </div>
  );
}

function BuilderGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-5 text-xs uppercase tracking-[0.3em] text-[#B08D57]">
        {title}
      </p>

      {children}
    </div>
  );
}

function OptionGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-4 sm:grid-cols-2">{children}</div>;
}

function OptionButton({
  active,
  onClick,
  title,
  detail,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  detail: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`min-h-32 rounded-2xl border p-6 text-left transition ${
        active
          ? "border-[#B08D57] bg-[#B08D57]/10"
          : "border-white/10 bg-white/[0.02] hover:border-white/25"
      }`}
    >
      <p className="text-xl">{title}</p>

      <p className="mt-2 text-sm leading-6 text-[#77736A]">{detail}</p>
    </button>
  );
}

function ToggleOption({
  title,
  detail,
  active,
  onClick,
}: {
  title: string;
  detail: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex w-full items-center justify-between gap-6 rounded-2xl border p-6 text-left transition ${
        active
          ? "border-[#B08D57] bg-[#B08D57]/10"
          : "border-white/10 bg-white/[0.02] hover:border-white/25"
      }`}
    >
      <div>
        <p className="text-xl">{title}</p>

        <p className="mt-2 text-sm leading-6 text-[#77736A]">{detail}</p>
      </div>

      <span
        className={`relative h-7 w-12 shrink-0 rounded-full border transition ${
          active
            ? "border-[#B08D57] bg-[#B08D57]"
            : "border-white/20 bg-[#252624]"
        }`}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-[#F6F2EA] transition ${
            active ? "left-6" : "left-1"
          }`}
        />
      </span>
    </button>
  );
}
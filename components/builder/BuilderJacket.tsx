"use client";

import {
  getHeritageFlagComponent,
  type HeritageFlagComponent,
} from "@/lib/herald/svg/flags/registry";
import { heritageFlagAssets } from "@/lib/herald/visualCanon/assets/heritageFlags";
import type { HeritageFlagVisualCanonAssetId } from "@/lib/herald/visualCanon/references";

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
  leftShoulderHeritage: string;
  rightShoulderHeritage: string;
  heritageOptions: string[];
  jacketViews: JacketViewOption[];
  embroideryFinishes: EmbroideryFinishOption[];
  onJacketViewChange: (value: string) => void;
  onCrestPlacementChange: (value: string) => void;
  onEmbroideryFinishChange: (value: string) => void;
  onNameTapeChange: (value: boolean) => void;
  onLeftShoulderHeritageChange: (value: string) => void;
  onRightShoulderHeritageChange: (value: string) => void;
};

const crestPlacements = ["Left Chest", "Right Chest"];

export default function BuilderJacket({
  jacketView,
  crestPlacement,
  embroideryFinish,
  includeNameTape,
  leftShoulderHeritage,
  rightShoulderHeritage,
  heritageOptions,
  jacketViews,
  embroideryFinishes,
  onJacketViewChange,
  onCrestPlacementChange,
  onEmbroideryFinishChange,
  onNameTapeChange,
  onLeftShoulderHeritageChange,
  onRightShoulderHeritageChange,
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
                  ? "Preview chest and visible shoulder placement."
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
        </div>
      </BuilderGroup>

      <BuilderGroup title="Heritage shoulder patches">
        <div className="rounded-2xl border border-[#B08D57]/20 bg-[#B08D57]/5 p-5">
          <p className="text-sm leading-6 text-[#BDB7AC]">
            Shoulder flags are independent from the family crest. Choose one,
            two, or none. Heritage remains part of the family record without
            automatically occupying a shield quadrant.
          </p>
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-2">
          <ShoulderFlagSelector
            title="Left shoulder"
            value={leftShoulderHeritage}
            options={heritageOptions}
            onChange={onLeftShoulderHeritageChange}
          />

          <ShoulderFlagSelector
            title="Right shoulder"
            value={rightShoulderHeritage}
            options={heritageOptions}
            onChange={onRightShoulderHeritageChange}
          />
        </div>
      </BuilderGroup>
    </div>
  );
}

function ShoulderFlagSelector({
  title,
  value,
  options,
  onChange,
}: {
  title: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-[#B08D57]">
            {title}
          </p>
          <p className="mt-2 text-sm text-[#77736A]">
            {value || "No heritage patch selected"}
          </p>
        </div>

        {value ? (
          <button
            type="button"
            onClick={() => onChange("")}
            className="shrink-0 rounded-full border border-white/15 px-3 py-1.5 text-[9px] uppercase tracking-[0.18em] text-[#BDB7AC] transition hover:border-[#B08D57] hover:text-[#B08D57]"
          >
            None
          </button>
        ) : (
          <span className="rounded-full border border-white/10 px-3 py-1.5 text-[9px] uppercase tracking-[0.18em] text-[#77736A]">
            None
          </span>
        )}
      </div>

      <div className="mt-5 grid max-h-[420px] grid-cols-2 gap-3 overflow-y-auto pr-1">
        {options.map((option) => {
          const active = value === option;
          const Flag = getFlagComponent(option);

          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(active ? "" : option)}
              aria-pressed={active}
              className={`rounded-xl border p-3 text-left transition ${
                active
                  ? "border-[#B08D57] bg-[#B08D57]/10"
                  : "border-white/10 bg-[#151614] hover:border-white/25"
              }`}
            >
              <div className="flex h-14 items-center justify-center overflow-hidden rounded-lg bg-[#777777] p-2">
                {Flag ? (
                  <Flag
                    width="100%"
                    height="100%"
                    title={`Flag of ${option}`}
                  />
                ) : (
                  <span className="text-[10px] uppercase tracking-[0.18em] text-white/70">
                    Flag
                  </span>
                )}
              </div>

              <p className="mt-3 truncate text-xs text-[#E4DED3]">{option}</p>

              <p className="mt-1 text-[8px] uppercase tracking-[0.18em] text-[#77736A]">
                {active ? "Selected" : "Choose"}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function getFlagComponent(
  heritage: string,
): HeritageFlagComponent | undefined {
  const asset = heritageFlagAssets.find(
    (candidate) => candidate.countryName === heritage,
  );

  if (!asset) {
    return undefined;
  }

  return getHeritageFlagComponent(
    asset.id as HeritageFlagVisualCanonAssetId,
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

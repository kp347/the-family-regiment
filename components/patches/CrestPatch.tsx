"use client";

import PatchBase from "./PatchBase";

export type CrestPatchFinish =
  | "Regiment Gold"
  | "Tactical Subdued"
  | "Heritage Ivory";

type CrestPatchProps = {
  symbol?: string;
  initials?: string;
  finish?: CrestPatchFinish;
  active?: boolean;
  className?: string;
};

const finishStyles: Record<
  CrestPatchFinish,
  {
    symbol: string;
    initials: string;
    accent: string;
  }
> = {
  "Regiment Gold": {
    symbol: "text-[#D4AF6A]",
    initials: "text-[#E8D7AE]",
    accent: "border-[#B08D57]",
  },
  "Tactical Subdued": {
    symbol: "text-[#A7AA91]",
    initials: "text-[#C1C3B2]",
    accent: "border-[#777B63]",
  },
  "Heritage Ivory": {
    symbol: "text-[#E7D8B4]",
    initials: "text-[#F1E7CF]",
    accent: "border-[#D7C49C]",
  },
};

export default function CrestPatch({
  symbol = "◆",
  initials = "FR",
  finish = "Regiment Gold",
  active = false,
  className = "",
}: CrestPatchProps) {
  const styles = finishStyles[finish];

  return (
    <PatchBase
      shape="shield"
      active={active}
      className={`min-h-[88px] min-w-[78px] px-4 py-3 ${styles.accent} ${className}`}
    >
      <div className="flex flex-col items-center justify-center text-center">
        <span
          aria-hidden="true"
          className={`text-3xl leading-none drop-shadow-[0_1px_1px_rgba(0,0,0,0.65)] ${styles.symbol}`}
        >
          {symbol}
        </span>

        <div className="my-2 h-px w-8 bg-current opacity-35" />

        <span
          className={`max-w-[64px] truncate text-[9px] font-bold uppercase tracking-[0.18em] ${styles.initials}`}
        >
          {initials.trim() || "FR"}
        </span>
      </div>
    </PatchBase>
  );
}
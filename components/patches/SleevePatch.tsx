"use client";

import PatchBase from "./PatchBase";

export type SleevePatchFinish =
  | "Regiment Gold"
  | "Tactical Subdued"
  | "Heritage Ivory";

type SleevePatchProps = {
  text?: string;
  finish?: SleevePatchFinish;
  active?: boolean;
  className?: string;
};

const finishStyles: Record<
  SleevePatchFinish,
  {
    text: string;
    border: string;
  }
> = {
  "Regiment Gold": {
    text: "text-[#E8D7AE]",
    border: "border-[#B08D57]",
  },
  "Tactical Subdued": {
    text: "text-[#C1C3B2]",
    border: "border-[#777B63]",
  },
  "Heritage Ivory": {
    text: "text-[#F1E7CF]",
    border: "border-[#D7C49C]",
  },
};

export default function SleevePatch({
  text = "FR",
  finish = "Regiment Gold",
  active = false,
  className = "",
}: SleevePatchProps) {
  const styles = finishStyles[finish];
  const displayText = text.trim().slice(0, 3).toUpperCase() || "FR";

  return (
    <PatchBase
      shape="circle"
      active={active}
      className={`h-14 w-14 ${styles.border} ${className}`}
    >
      <div className="flex h-full w-full flex-col items-center justify-center">
        <span
          className={`text-[10px] font-black uppercase tracking-[0.12em] drop-shadow-[0_1px_1px_rgba(0,0,0,0.7)] ${styles.text}`}
        >
          {displayText}
        </span>

        <span
          className={`mt-1 h-px w-5 opacity-60 ${styles.text.replace(
            "text-",
            "bg-",
          )}`}
        />

        <span
          className={`mt-1 text-[5px] font-bold uppercase tracking-[0.2em] opacity-75 ${styles.text}`}
        >
          Regiment
        </span>
      </div>
    </PatchBase>
  );
}
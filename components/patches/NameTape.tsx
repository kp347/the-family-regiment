"use client";

import PatchBase from "./PatchBase";

export type NameTapeFinish =
  | "Regiment Gold"
  | "Tactical Subdued"
  | "Heritage Ivory";

type NameTapeProps = {
  name?: string;
  finish?: NameTapeFinish;
  active?: boolean;
  className?: string;
};

const finishStyles: Record<
  NameTapeFinish,
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

export default function NameTape({
  name = "LAURENT",
  finish = "Regiment Gold",
  active = false,
  className = "",
}: NameTapeProps) {
  const styles = finishStyles[finish];

  return (
    <PatchBase
      shape="rectangle"
      active={active}
      className={`min-w-[120px] px-4 py-2 ${styles.border} ${className}`}
    >
      <span
        className={`block text-center text-[10px] font-bold uppercase tracking-[0.28em] ${styles.text}`}
      >
        {name.trim() || "LAURENT"}
      </span>
    </PatchBase>
  );
}
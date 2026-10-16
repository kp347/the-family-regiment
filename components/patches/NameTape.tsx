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

const finishText: Record<NameTapeFinish, string> = {
  "Regiment Gold": "text-[#E8D7AE]",
  "Tactical Subdued": "text-[#626A3A]",
  "Heritage Ivory": "text-[#F1E7CF]",
};

export default function NameTape({
  name = "LAURENT",
  finish = "Regiment Gold",
  active = false,
  className = "",
}: NameTapeProps) {
  return (
    <PatchBase
      shape="rectangle"
      finish={finish}
      active={active}
      className={`min-w-[120px] px-4 py-2 ${className}`}
    >
      <span
        className={`block text-center text-[10px] font-bold uppercase tracking-[0.28em] ${finishText[finish]}`}
      >
        {name.trim() || "LAURENT"}
      </span>
    </PatchBase>
  );
}

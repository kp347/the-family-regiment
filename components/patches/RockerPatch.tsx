"use client";

import PatchBase from "./PatchBase";

export type RockerPatchFinish =
  | "Regiment Gold"
  | "Tactical Subdued"
  | "Heritage Ivory";

type RockerPatchProps = {
  text?: string;
  position?: "top" | "bottom";
  finish?: RockerPatchFinish;
  active?: boolean;
  className?: string;
};

const finishStyles: Record<
  RockerPatchFinish,
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

export default function RockerPatch({
  text = "FORTIS IN FAMILIA",
  position = "top",
  finish = "Regiment Gold",
  active = false,
  className = "",
}: RockerPatchProps) {
  const styles = finishStyles[finish];

  const curveClass =
    position === "top"
      ? "rounded-t-[60%] rounded-b-[22%]"
      : "rounded-t-[22%] rounded-b-[60%]";

  return (
    <PatchBase
      shape="rocker"
      active={active}
      className={`min-w-[170px] px-5 py-2.5 ${curveClass} ${styles.border} ${className}`}
    >
      <span
        className={`block max-w-[150px] truncate text-center text-[8px] font-bold uppercase tracking-[0.18em] ${styles.text}`}
      >
        {text.trim() || "FORTIS IN FAMILIA"}
      </span>
    </PatchBase>
  );
}
"use client";

import { ReactNode } from "react";

type PatchBaseProps = {
  children: ReactNode;
  className?: string;
  active?: boolean;
  shape?: "shield" | "rectangle" | "rocker" | "circle";
};

export default function PatchBase({
  children,
  className = "",
  active = false,
  shape = "shield",
}: PatchBaseProps) {
  const shapeClass = {
    shield: "rounded-t-[42%] rounded-b-xl",
    rectangle: "rounded-md",
    rocker: "rounded-[999px]",
    circle: "rounded-full",
  }[shape];

  return (
    <div
      className={`
        relative
        flex
        items-center
        justify-center
        overflow-hidden
        border-2
        border-[#B08D57]
        bg-[#25261F]
        text-[#E8D7AE]
        shadow-[0_8px_18px_rgba(0,0,0,0.45)]
        transition-all
        duration-300
        ${shapeClass}
        ${active ? "scale-105 ring-2 ring-[#D4AF6A]" : ""}
        ${className}
      `}
    >
      {/* Embroidery texture */}
      <div
        className="
          absolute
          inset-0
          opacity-20
          bg-[repeating-linear-gradient(45deg,transparent_0px,transparent_3px,rgba(255,255,255,0.08)_4px)]
        "
      />

      {/* Patch content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
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

        ${shapeClass}
        ${className}

        shadow-[0_10px_22px_rgba(0,0,0,0.55)]

        before:absolute
        before:inset-0
        before:bg-[repeating-linear-gradient(45deg,rgba(255,255,255,.05)_0px,rgba(255,255,255,.05)_2px,transparent_2px,transparent_6px)]
        before:opacity-40

        after:absolute
        after:inset-[2px]
        after:rounded-[inherit]
        after:shadow-[inset_0_1px_1px_rgba(255,255,255,.18),inset_0_-2px_5px_rgba(0,0,0,.45)]

        transition-all
        duration-300

        ${
          active
            ? "scale-[1.04] ring-2 ring-[#D4AF6A] ring-offset-2 ring-offset-transparent shadow-[0_0_20px_rgba(212,175,106,.45)]"
            : ""
        }
      `}
    >
      {/* Twill fabric */}
      <div
        className="
          absolute
          inset-0
          opacity-30
          bg-[linear-gradient(135deg,transparent_25%,rgba(255,255,255,.04)_25%,rgba(255,255,255,.04)_50%,transparent_50%,transparent_75%,rgba(255,255,255,.04)_75%)]
          bg-[length:8px_8px]
        "
      />

      {/* Thread sheen */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-br
          from-white/12
          via-transparent
          to-black/20
        "
      />

      {/* Merrow edge highlight */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          rounded-[inherit]
          border
          border-white/10
        "
      />

      {/* Embroidery content */}
      <div className="relative z-10 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
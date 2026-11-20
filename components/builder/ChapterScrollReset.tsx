
"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ChapterScrollReset() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname.startsWith("/begin/")) return;

    const resetScroll = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });
    };

    resetScroll();

    const frame = requestAnimationFrame(resetScroll);

    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}

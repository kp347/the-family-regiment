
"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import BuilderLayout from "@/components/builder/BuilderLayout";
import ChapterScrollReset from "@/components/builder/ChapterScrollReset";

type BeginLayoutProps = {
  children: ReactNode;
};

export default function BeginLayout({
  children,
}: BeginLayoutProps) {
  const pathname = usePathname();

  const isWelcomePage =
    pathname === "/begin" || pathname === "/begin/";

  if (isWelcomePage) {
    return (
      <div className="min-h-screen bg-[#171914]">
        {children}
      </div>
    );
  }

  return (
    <>
      <ChapterScrollReset />
      <BuilderLayout>{children}</BuilderLayout>
    </>
  );
}

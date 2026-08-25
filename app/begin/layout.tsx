import type { ReactNode } from "react";
import BuilderLayout from "@/components/builder/BuilderLayout";

type BeginLayoutProps = {
  children: ReactNode;
};

export default function BeginLayout({
  children,
}: BeginLayoutProps) {
  return <BuilderLayout>{children}</BuilderLayout>;
}
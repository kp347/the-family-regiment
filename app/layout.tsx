import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Family Regiment",
  description:
    "Luxury heritage apparel, custom family crests, and personalized regiment jackets.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
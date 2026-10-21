
"use client";

import { getProfessionCanonAsset } from "@/lib/herald/visualCanon/assets/professions";

export const PROFESSIONS = [
  "Medical",
  "Nursing",
  "Law",
  "Education",
  "Engineering",
  "Firefighting",
  "Law Enforcement",
  "Aviation",
  "Skilled Trades",
  "Architecture",
  "Culinary Arts",
  "Technology",
] as const;

export type Profession = "None" | (typeof PROFESSIONS)[number];

export type IdentityPatchFinish =
  | "Regiment Gold"
  | "Tactical Subdued"
  | "Heritage Ivory";

/**
 * The Family Regiment
 * Professional Identity Patch — Visual Canon V1
 *
 * Displays the complete approved embroidered artwork.
 *
 * The artwork already includes:
 * - Profession name banner
 * - Black shield
 * - Gold embroidered border
 * - Professional insignia
 * - Heraldic detailing
 *
 * No additional SVG shield or color filter is applied.
 *
 * Production note:
 * These PNGs are visual previews, not embroidery machine files.
 */
export default function IdentityShieldPatch({
  label,
  artworkSrc,
  className = "",
  finish = "Regiment Gold",
}: {
  label: string;
  artworkSrc?: string;
  className?: string;
  finish?: IdentityPatchFinish;
}) {
  const canonArtworkSrc = getProfessionCanonAsset(label)?.artworkSrc;
  const resolvedArtworkSrc = canonArtworkSrc ?? artworkSrc;

  return (
    <div
      role="img"
      aria-label={`${label} professional identity patch`}
      data-finish={finish}
      className={`relative block h-full w-full ${className}`}
    >
      {resolvedArtworkSrc ? (
        <img
          src={resolvedArtworkSrc}
          alt=""
          draggable={false}
          className="block h-full w-full object-contain drop-shadow-[0_3px_3px_rgba(0,0,0,0.6)]"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center rounded-md border border-[#80683F] bg-[#0D0E0C] px-1 text-center text-[9px] text-[#D4AF6A]">
          {label}
        </div>
      )}
    </div>
  );
}

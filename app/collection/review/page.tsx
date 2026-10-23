"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Navigation from "@/components/layout/Navigation";
import HeritageBlazerPreview from "@/components/builder/HeritageBlazerPreview";
import BuilderPreview from "@/components/builder/BuilderPreview";
import type { IdentityPatchCategory, MilitaryBranch, Profession, ZodiacSign } from "@/components/builder/BuilderJacket";
import type { HeraldShieldComposition } from "@/lib/herald/design";
import { DEFAULT_HOUSE_IDENTITY, BLAZER_DRAFT_KEY, REGIMENT_DRAFT_KEY, readHouseIdentity, type HouseIdentity } from "@/lib/houseIdentity";
import type { SupportedCrestFinish } from "@/components/builder/FamilyCrestPreview";

type JacketPreviewDraft = {
  heritage: string;
  value: string;
  jacketView: string;
  embroideryFinish: string;
  nameTapeText: string;
  rightShoulderHeritage: string[];
  leftChestIdentity: IdentityPatchCategory;
  militaryBranch: MilitaryBranch;
  profession: Profession;
  zodiacSign: ZodiacSign;
  composition: HeraldShieldComposition;
};
const JACKET_VIEWS = [
  { name: "Front", image: "/images/products/studio/jacket-front-clean.png" },
  { name: "Left ¾", image: "/images/products/studio/jacket-left-three-quarter-clean.png" },
];
const PREVIEW_SYMBOLS = [
  { name: "Lion", character: "♌" },
  { name: "Eagle", character: "◆" },
  { name: "Stag", character: "♜" },
  { name: "Wolf", character: "◇" },
  { name: "Bear", character: "●" },
];
function getJacketPreview(value: unknown): JacketPreviewDraft | null {
  if (!value || typeof value !== "object") return null;
  const draft = value as Record<string, unknown>;
  const str = (key: string, fallback: string) => typeof draft[key] === "string" ? draft[key] as string : fallback;
  const heritage = str("heritage", "France");
  const valueName = str("value", "Courage");
  const animal = str("animal", "Lion");
  const composition: HeraldShieldComposition = draft.composition && typeof draft.composition === "object" &&
    Array.isArray((draft.composition as { quadrants?: unknown }).quadrants) &&
    (draft.composition as { quadrants: unknown[] }).quadrants.length === 4
    ? draft.composition as HeraldShieldComposition
    : { layout: "quartered", quadrants: [
      { id: "I", type: "empty" },
      { id: "II", type: "animal", label: animal },
      { id: "III", type: "symbol", label: valueName, meaning: valueName },
      { id: "IV", type: "empty" },
    ] } as HeraldShieldComposition;
  const category = str("leftChestIdentity", "None");
  const categories = ["None", "Profession", "Military Branch", "Zodiac", "Hometown", "Family Value"];
  return {
    heritage,
    value: valueName,
    jacketView: JACKET_VIEWS.some(v => v.name === draft.jacketView) ? str("jacketView", "Front") : "Front",
    embroideryFinish: str("embroideryFinish", "Regiment Gold"),
    nameTapeText: str("nameTapeText", ""),
    rightShoulderHeritage: Array.isArray(draft.rightShoulderHeritage)
      ? draft.rightShoulderHeritage.filter((x): x is string => typeof x === "string").slice(0, 3) : [],
    leftChestIdentity: (categories.includes(category) ? category : "None") as IdentityPatchCategory,
    militaryBranch: str("militaryBranch", "None") as MilitaryBranch,
    profession: str("profession", "None") as Profession,
    zodiacSign: str("zodiacSign", "None") as ZodiacSign,
    composition,
  };
}

type Product = "jacket" | "blazer";
type SizeLine = { size: string; quantity: number };
type JacketGroup = { id: string; nameTape: string; sizes: SizeLine[] };
type OrderDraft = { jacketSelected: boolean; blazerSelected: boolean; jacketGroups: JacketGroup[]; blazerSizes: SizeLine[] };
const ORDER_KEY = "family-regiment-collection-order-v1";
const MAX_GROUPS = 20;
const MAX_TOTAL_GARMENTS = 99;
type OrderLine = { product: Product; size: string; quantity: number; nameTape?: string; groupId?: string };
function buildOrderLines(order: OrderDraft): OrderLine[] {
  const jackets: OrderLine[] = order.jacketSelected
    ? order.jacketGroups.flatMap(group => group.sizes.filter(line => line.quantity > 0).map(line => ({
        product: "jacket" as const, size: line.size, quantity: line.quantity,
        nameTape: group.nameTape.trim(), groupId: group.id,
      }))) : [];
  const blazers: OrderLine[] = order.blazerSelected
    ? order.blazerSizes.filter(line => line.quantity > 0).map(line => ({ product: "blazer" as const, size: line.size, quantity: line.quantity })) : [];
  return [...jackets, ...blazers];
}
function validateOrder(order: OrderDraft): string[] {
  const issues: string[] = [];
  if (!order.jacketSelected && !order.blazerSelected) issues.push("Select at least one garment.");
  if (order.jacketSelected && !order.jacketGroups.some(group => quantity(group.sizes) > 0)) issues.push("Choose a jacket size and quantity, or deselect the jacket.");
  if (order.blazerSelected && quantity(order.blazerSizes) === 0) issues.push("Choose a blazer size and quantity, or deselect the blazer.");
  if (order.jacketSelected) {
    order.jacketGroups.forEach((group, index) => {
      if (quantity(group.sizes) === 0) issues.push(`Jacket personalization ${index + 1} has no quantity. Add a size or remove this group.`);
      if (group.nameTape.length > 30) issues.push(`Jacket personalization ${index + 1} has a name tape longer than 30 characters.`);
      if (group.sizes.some(line => !SIZE_OPTIONS.jacket.includes(line.size))) issues.push(`Jacket personalization ${index + 1} contains an unsupported size. Remove the flagged size.`);
    });
  }
  if (order.blazerSelected && order.blazerSizes.some(line => !SIZE_OPTIONS.blazer.includes(line.size))) issues.push("The blazer contains an unsupported size. Remove the flagged size.");
  const lines = buildOrderLines(order);
  if (lines.some(line => !Number.isInteger(line.quantity) || line.quantity < 1 || line.quantity > 99)) issues.push("One or more quantities are invalid.");
  if (lines.reduce((sum, line) => sum + line.quantity, 0) > MAX_TOTAL_GARMENTS) issues.push(`Limit this draft to ${MAX_TOTAL_GARMENTS} garments.`);
  if (order.jacketGroups.length > MAX_GROUPS) issues.push(`Limit jacket personalizations to ${MAX_GROUPS} groups.`);
  return issues;
}
// Provisional display options only. Replace with vendor SKU/size-chart data before accepting orders.
const SIZE_OPTIONS: Record<Product, readonly string[]> = {
  jacket: ["S", "M", "L", "XL", "XXL"],
  blazer: ["38S", "38R", "40S", "40R", "42R", "42L", "44R", "44L", "46R", "46L"],
};
const DEFAULT_ORDER: OrderDraft = {
  jacketSelected: true,
  blazerSelected: false,
  jacketGroups: [{ id: "jacket-1", nameTape: "", sizes: [] }],
  blazerSizes: [],
};
function validLines(value: unknown, _product: Product): SizeLine[] {
  if (!Array.isArray(value)) return [];
  return value.filter((v): v is SizeLine => Boolean(v && typeof v === "object" && typeof v.size === "string" && v.size.trim().length > 0 && v.size.length <= 20 && Number.isInteger(v.quantity) && v.quantity > 0 && v.quantity <= 99));
}
function readOrder(tape: string): OrderDraft {
  try {
    const raw = window.localStorage.getItem(ORDER_KEY);
    if (!raw) return { ...DEFAULT_ORDER, jacketGroups: [{ id: "jacket-1", nameTape: tape, sizes: [] }] };
    const data: unknown = JSON.parse(raw);
    if (!data || typeof data !== "object") throw Error("Invalid order");
    const record = data as Partial<OrderDraft>;
    const groups = Array.isArray(record.jacketGroups) ? record.jacketGroups.filter((g): g is JacketGroup => Boolean(g && typeof g.id === "string" && typeof g.nameTape === "string")).slice(0, 20).map(g => ({ id: g.id, nameTape: g.nameTape.slice(0, 30), sizes: validLines(g.sizes, "jacket") })) : [];
    return {
      jacketSelected: record.jacketSelected === true,
      blazerSelected: record.blazerSelected === true,
      jacketGroups: groups.length ? groups : [{ id: "jacket-1", nameTape: tape, sizes: [] }],
      blazerSizes: validLines(record.blazerSizes, "blazer"),
    };
  } catch { return { ...DEFAULT_ORDER, jacketGroups: [{ id: "jacket-1", nameTape: tape, sizes: [] }] }; }
}
function updateSize(lines: SizeLine[], size: string, delta: number): SizeLine[] {
  const current = lines.find(line => line.size === size)?.quantity ?? 0;
  const next = Math.max(0, Math.min(99, current + delta));
  return [...lines.filter(line => line.size !== size), ...(next ? [{ size, quantity: next }] : [])];
}
function quantity(lines: SizeLine[]) { return lines.reduce((sum, line) => sum + line.quantity, 0); }
function SizePicker({ product, lines, onChange }: { product: Product; lines: SizeLine[]; onChange: (next: SizeLine[]) => void }) {
  const legacy = lines.filter(line => !SIZE_OPTIONS[product].includes(line.size));
  return <div>
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
    {SIZE_OPTIONS[product].map(size => {
      const count = lines.find(line => line.size === size)?.quantity ?? 0;
      return <div key={size} className="rounded-lg border border-[#b08d57]/25 bg-[#1d201b] p-3">
        <div className="mb-3 text-sm font-semibold">{size}</div>
        <div className="flex items-center justify-between gap-2">
          <button type="button" aria-label={`Remove one ${product} size ${size}`} disabled={!count} onClick={() => onChange(updateSize(lines, size, -1))} className="h-9 w-9 rounded-full border border-[#b08d57]/50 disabled:opacity-30">−</button>
          <span className="text-sm tabular-nums">{count}</span>
          <button type="button" aria-label={`Add one ${product} size ${size}`} onClick={() => onChange(updateSize(lines, size, 1))} className="h-9 w-9 rounded-full border border-[#b08d57]/50">+</button>
        </div>
      </div>;
    })}
    </div>
    {legacy.length > 0 && (
      <div className="mt-4 border border-amber-400/40 bg-amber-400/5 p-4 text-xs leading-6 text-amber-200" role="alert">
        <p className="font-semibold">Previously saved sizes need review</p>
        <p>These sizes are no longer offered for the {product}. Select an available size above, then remove each old selection.</p>
        {legacy.map(line => (
          <div key={line.size} className="mt-2 flex items-center justify-between gap-3">
            <span>{line.size} — quantity {line.quantity}</span>
            <button type="button" className="underline" onClick={() => onChange(lines.filter(item => item.size !== line.size))}>Remove old size</button>
          </div>
        ))}
      </div>
    )}
  </div>;
}
export default function CollectionReviewPage() {
  const [loaded, setLoaded] = useState(false);
  const [house, setHouse] = useState<HouseIdentity>(DEFAULT_HOUSE_IDENTITY);
  const [order, setOrder] = useState<OrderDraft>(DEFAULT_ORDER);
  const [finish, setFinish] = useState<SupportedCrestFinish>("Regiment Gold");
  const [jacketFinish, setJacketFinish] = useState("Regiment Gold");
  const [jacketPreview, setJacketPreview] = useState<JacketPreviewDraft | null>(null);
  const [jacketDescription, setJacketDescription] = useState("Your saved jacket configuration");
  const [saveError, setSaveError] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  useEffect(() => {
    let tape = "";
    try {
      const rawJacket = window.localStorage.getItem(REGIMENT_DRAFT_KEY);
      if (rawJacket) {
        const jacket = JSON.parse(rawJacket) as { nameTapeText?: unknown; embroideryFinish?: unknown; rightShoulderHeritage?: unknown };
        setJacketPreview(getJacketPreview(jacket));
        if (typeof jacket.nameTapeText === "string") tape = jacket.nameTapeText;
        if (typeof jacket.embroideryFinish === "string") setJacketFinish(jacket.embroideryFinish);
        if (Array.isArray(jacket.rightShoulderHeritage)) setJacketDescription(`Heritage: ${jacket.rightShoulderHeritage.join(", ") || "None"}`);
      }
      const rawBlazer = window.localStorage.getItem(BLAZER_DRAFT_KEY);
      if (rawBlazer) {
        const blazer = JSON.parse(rawBlazer) as { finish?: unknown };
        if (blazer.finish === "Regiment Gold" || blazer.finish === "Tactical Subdued" || blazer.finish === "Heritage Ivory") setFinish(blazer.finish);
      }
    } catch { /* Retain safe defaults. */ }
    setHouse(readHouseIdentity());
    setOrder(readOrder(tape));
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (!loaded) return;
    try { window.localStorage.setItem(ORDER_KEY, JSON.stringify(order)); setSaveError(false); } catch { setSaveError(true); }
  }, [loaded, order]);
  const jacketCount = useMemo(() => order.jacketSelected ? order.jacketGroups.reduce((n, group) => n + quantity(group.sizes), 0) : 0, [order]);
  const blazerCount = order.blazerSelected ? quantity(order.blazerSizes) : 0;
  const orderLines = useMemo(() => buildOrderLines(order), [order]);
  const validationIssues = useMemo(() => validateOrder(order), [order]);
  const canContinue = loaded && validationIssues.length === 0;
  function saveValidatedDraft() {
    if (!canContinue) return;
    try {
      window.localStorage.setItem(ORDER_KEY, JSON.stringify(order));
      setSaveError(false);
      setSaveMessage("Your validated collection draft is saved in this browser. No order has been placed.");
    } catch {
      setSaveError(true);
      setSaveMessage("");
    }
  }
  function updateGroup(id: string, changes: Partial<JacketGroup>) {
    setOrder(current => ({ ...current, jacketGroups: current.jacketGroups.map(group => group.id === id ? { ...group, ...changes } : group) }));
  }
  return <>
    <Navigation />
    <main className="min-h-screen bg-[#171914] px-5 py-12 text-[#eee6d6] sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#c5a16a]">The Founding Collection</p>
        <h1 className="font-display mt-4 text-4xl sm:text-6xl">Review Your <span className="italic text-[#c7aa78]">Collection</span></h1>
        <p className="mt-5 max-w-3xl text-sm leading-7 text-[#b9b1a2]">One House crest, two distinct garments. Select either garment or both, then assign sizes and quantities. Your selections are saved in this browser.</p>
        <div className="mt-6 border border-[#b08d57]/25 bg-[#20221b] p-5">
          <p className="text-xs uppercase tracking-[0.17em] text-[#c5a16a]">Shared House Identity</p>
          <h2 className="font-display mt-2 text-2xl">House of {house.familyName || "Family"}</h2>
          <p className="mt-2 font-display italic text-[#c7aa78]">{house.motto}</p>
          <p className="mt-2 text-xs text-[#b9b1a2]">{house.animal} · {house.shield}</p>
        </div>
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <section className="min-w-0 border border-[#b08d57]/30 bg-[#20221b] p-5 sm:p-7">
            <div className="flex items-start justify-between gap-3">
              <div><p className="text-xs uppercase tracking-[0.18em] text-[#c5a16a]">Regiment Jacket</p><h2 className="font-display mt-2 text-2xl">Your Custom Jacket</h2></div>
              <label className="flex items-center gap-2 text-xs"><input type="checkbox" checked={order.jacketSelected} onChange={e => setOrder(o => ({ ...o, jacketSelected: e.target.checked }))} /> Include</label>
            </div>
            {/* Presentation-only crop: retain the canonical jacket renderer while
                excluding its separate identity and live-crest panels from review. */}
            <div className="relative mt-5 h-[440px] overflow-hidden rounded-lg bg-[#111213] sm:h-[490px]">
              <div className="pointer-events-none select-none" aria-label="Saved Regiment Jacket design preview">
              {loaded && jacketPreview ? (
                <BuilderPreview
                  familyName={house.familyName}
                  initials={house.initials}
                  heritage={jacketPreview.heritage}
                  symbol={house.animal}
                  shield={house.shield}
                  crown="None"
                  value={jacketPreview.value}
                  motto={house.motto}
                  jacketView={jacketPreview.jacketView}
                  embroideryFinish={jacketPreview.embroideryFinish}
                  nameTapeText={jacketPreview.nameTapeText}
                  rightShoulderHeritage={jacketPreview.rightShoulderHeritage}
                  leftChestIdentity={jacketPreview.leftChestIdentity}
                  militaryBranch={jacketPreview.militaryBranch}
                  sport="None"
                  profession={jacketPreview.profession}
                  zodiacSign={jacketPreview.zodiacSign}
                  symbolOptions={PREVIEW_SYMBOLS}
                  jacketViews={JACKET_VIEWS}
                  composition={jacketPreview.composition}
                />
              ) : (
                <div className="flex h-[440px] items-center justify-center p-4 sm:h-[490px]"><img src="/images/products/studio/jacket-front-clean.png" alt="Uncustomized Regiment Jacket reference" className="h-full w-full object-contain" /></div>
              )}
              </div>
              <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#111213] to-transparent" />
            </div>
            <p className="mt-3 text-xs leading-6 text-[#b9b1a2]">{jacketDescription} · {jacketFinish} finish. {jacketPreview ? "Your saved jacket design is shown above; open the builder for the complete crest detail." : "No saved jacket customization found; this is a reference garment."} <Link href="/builder" className="text-[#c7aa78] underline">Edit or inspect your jacket design</Link>.</p>
            <Link href="/builder" className="mt-4 inline-block text-xs font-semibold uppercase tracking-[0.1em] text-[#c7aa78] underline">Edit Jacket Design →</Link>
            {order.jacketSelected && <div className="mt-7 space-y-7">
              {order.jacketGroups.map((group, index) => <div key={group.id} className="border-t border-[#b08d57]/20 pt-5">
                <div className="mb-3 flex items-center justify-between"><h3 className="text-sm font-semibold">Personalization {index + 1}</h3>{order.jacketGroups.length > 1 && <button type="button" className="text-xs text-[#c7aa78] underline" onClick={() => setOrder(o => ({ ...o, jacketGroups: o.jacketGroups.filter(g => g.id !== group.id) }))}>Remove</button>}</div>
                <label className="mb-5 block text-xs text-[#b9b1a2]">Name tape for this group<input maxLength={30} value={group.nameTape} onChange={e => updateGroup(group.id, { nameTape: e.target.value })} placeholder="Optional name or callsign" className="mt-2 w-full border border-[#5b5549] bg-[#171914] p-3 text-sm text-[#eee6d6]" /></label>
                <p className="mb-3 text-xs uppercase tracking-[0.12em] text-[#c5a16a]">Sizes & quantities</p>
                <SizePicker product="jacket" lines={group.sizes} onChange={sizes => updateGroup(group.id, { sizes })} />
              </div>)}
              <button type="button" onClick={() => setOrder(o => ({ ...o, jacketGroups: o.jacketGroups.length >= MAX_GROUPS ? o.jacketGroups : [...o.jacketGroups, { id: `jacket-${Date.now()}-${o.jacketGroups.length}`, nameTape: "", sizes: [] }] }))} className="border border-[#b08d57]/60 px-4 py-3 text-xs uppercase tracking-[0.1em] text-[#e1cfaf]">+ Add Different Name Tape</button>
            </div>}
          </section>
          <section className="min-w-0 border border-[#b08d57]/30 bg-[#20221b] p-5 sm:p-7">
            <div className="flex items-start justify-between gap-3"><div><p className="text-xs uppercase tracking-[0.18em] text-[#c5a16a]">Heritage Blazer</p><h2 className="font-display mt-2 text-2xl">Your Matching Blazer</h2></div><label className="flex items-center gap-2 text-xs"><input type="checkbox" checked={order.blazerSelected} onChange={e => setOrder(o => ({ ...o, blazerSelected: e.target.checked }))} /> Include</label></div>
            <div className="mt-5"><HeritageBlazerPreview familyName={house.familyName} initials={house.initials} motto={house.motto} symbol={house.animal} shield={house.shield} crown="None" finish={finish} /></div>
            <p className="mt-3 text-xs leading-6 text-[#b9b1a2]">Same House crest · {finish} finish · Larger left-chest placement. <Link href="/blazer/builder" className="text-[#c7aa78] underline">Change the blazer finish or House crest</Link>.</p>
            {order.blazerSelected && <div className="mt-7 border-t border-[#b08d57]/20 pt-5"><p className="mb-3 text-xs uppercase tracking-[0.12em] text-[#c5a16a]">Sizes & quantities</p><SizePicker product="blazer" lines={order.blazerSizes} onChange={blazerSizes => setOrder(o => ({ ...o, blazerSizes }))} /></div>}
          </section>
        </div>
        <div className="mt-9 border border-[#b08d57]/35 bg-[#20221b] p-6">
          <div className="flex flex-wrap items-center justify-between gap-4"><div><h2 className="font-display text-2xl">Order Summary</h2><p className="mt-2 text-sm text-[#b9b1a2]">{jacketCount} jacket{jacketCount === 1 ? "" : "s"} · {blazerCount} blazer{blazerCount === 1 ? "" : "s"} · {jacketCount + blazerCount} total garments</p></div><span className="text-xs uppercase tracking-[0.12em] text-[#c5a16a]">Draft · No payment collected</span></div>
          <div className="mt-6 border-t border-[#b08d57]/25 pt-5">
            <h3 className="font-display text-xl">Garment Order Lines</h3>
            {orderLines.length ? (
              <div className="mt-3 overflow-x-auto">
                <table className="w-full min-w-[420px] text-left text-sm">
                  <thead className="border-b border-[#b08d57]/30 text-xs uppercase tracking-[0.1em] text-[#c5a16a]"><tr><th className="py-3 pr-3">Garment</th><th className="py-3 pr-3">Size</th><th className="py-3 pr-3">Personalization</th><th className="py-3 text-right">Qty</th></tr></thead>
                  <tbody>{orderLines.map((line, index) => <tr key={`${line.product}-${line.groupId ?? "blazer"}-${line.size}-${index}`} className="border-b border-[#b08d57]/15">
                    <td className="py-3 pr-3">{line.product === "jacket" ? "Regiment Jacket" : "Heritage Blazer"}</td>
                    <td className="py-3 pr-3">{line.size}</td>
                    <td className="py-3 pr-3">{line.product === "jacket" ? (line.nameTape || "No name tape") : "Shared House crest"}</td>
                    <td className="py-3 text-right tabular-nums">{line.quantity}</td>
                  </tr>)}</tbody>
                </table>
              </div>
            ) : <p className="mt-3 text-sm text-[#b9b1a2]">No garment quantities selected yet.</p>}
          </div>
          {validationIssues.length > 0 && <div role="alert" className="mt-5 border border-amber-400/40 bg-amber-400/5 p-4 text-sm text-amber-200">
            <p className="font-semibold">Complete your collection before saving a validated draft</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">{validationIssues.map(issue => <li key={issue}>{issue}</li>)}</ul>
          </div>}
          <p className="mt-5 text-xs leading-6 text-[#b9b1a2]">Sizing shown is provisional, not verified supplier availability. Jacket and blazer may use different sizing systems. Vendor size charts, exact SKU mapping, pricing, and checkout must be confirmed before orders can be placed.</p>
          {saveError && <p role="alert" className="mt-3 text-sm text-amber-300">Browser storage unavailable. Your selections may not be saved.</p>}
          {saveMessage && <p role="status" className="mt-4 text-sm text-[#e1cfaf]">{saveMessage}</p>}
          <button type="button" disabled={!canContinue} onClick={saveValidatedDraft} className="mt-6 bg-[#b08d57] px-6 py-3 text-xs font-semibold uppercase tracking-[0.13em] text-[#171914] disabled:cursor-not-allowed disabled:opacity-40">Save Validated Collection Draft</button>
        </div>
      </div>
    </main>
  </>;
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navigation from "@/components/layout/Navigation";
import FamilyCrestPreview from "@/components/builder/FamilyCrestPreview";
import HeritageCrestPreview from "@/components/builder/HeritageCrestPreview";
import { createClient } from "@/lib/supabase/client";
import { readHouseIdentity, HOUSE_IDENTITY_KEY, REGIMENT_DRAFT_KEY, BLAZER_DRAFT_KEY, type HouseIdentity } from "@/lib/houseIdentity";

type OriginsRecord = { familyStory?: string; countryOfOrigin?: string; regionOfOrigin?: string };
type TraditionsRecord = { traditionsToPreserve?: string; customs?: string };
type ValuesRecord = { coreValues?: string; familyPrinciples?: string; admiredQualities?: string; lessonsToCarryForward?: string };
const valueFields: { key: keyof ValuesRecord; title: string }[] = [
  { key: "coreValues", title: "Our Values" },
  { key: "familyPrinciples", title: "Our Principles" },
  { key: "admiredQualities", title: "Qualities We Honor" },
  { key: "lessonsToCarryForward", title: "What We Carry Forward" },
];

export default function HouseCharterPage() {
  const [identity, setIdentity] = useState<HouseIdentity | null>(null);
  const [crestStyle, setCrestStyle] = useState<"heritage" | "regiment">("heritage");
  const [values, setValues] = useState<ValuesRecord | null>(null);
  const [origins, setOrigins] = useState<OriginsRecord | null>(null);
  const [traditions, setTraditions] = useState<TraditionsRecord | null>(null);
  const [recordStatus, setRecordStatus] = useState<"loading" | "signed-out" | "ready" | "error">("loading");

  useEffect(() => {
    let mounted = true;
    const refresh = () => {
      try {
        const exists = [HOUSE_IDENTITY_KEY, REGIMENT_DRAFT_KEY, BLAZER_DRAFT_KEY].some(k => localStorage.getItem(k) !== null);
        if (mounted) setIdentity(exists ? readHouseIdentity() : null);
      } catch { if (mounted) setIdentity(null); }
    };
    refresh();
    const storage = (event: StorageEvent) => { if (!event.key || [HOUSE_IDENTITY_KEY, REGIMENT_DRAFT_KEY, BLAZER_DRAFT_KEY].includes(event.key)) refresh(); };
    window.addEventListener("focus", refresh);
    window.addEventListener("storage", storage);
    const load = async () => {
      try {
        const supabase = createClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (!mounted) return;
        if (authError || !user) { setRecordStatus("signed-out"); return; }
        const { data, error } = await supabase.from("family_records").select("values_record, origins, traditions").eq("user_id", user.id).maybeSingle();
        if (!mounted) return;
        if (error) { setRecordStatus("error"); return; }
        const raw: unknown = data?.values_record;
        setValues(raw && typeof raw === "object" && !Array.isArray(raw) ? raw as ValuesRecord : {});
        const originData: unknown = data?.origins;
        const traditionData: unknown = data?.traditions;
        setOrigins(originData && typeof originData === "object" && !Array.isArray(originData) ? originData as OriginsRecord : {});
        setTraditions(traditionData && typeof traditionData === "object" && !Array.isArray(traditionData) ? traditionData as TraditionsRecord : {});
        setRecordStatus("ready");
      } catch { if (mounted) setRecordStatus("error"); }
    };
    void load();
    return () => { mounted = false; window.removeEventListener("focus", refresh); window.removeEventListener("storage", storage); };
  }, []);

  const hasValues = valueFields.some(({ key }) => typeof values?.[key] === "string" && !!values[key]?.trim());
  return <>
    <div className="charter-screen"><Navigation /></div>
    <main className="charter-page min-h-screen bg-[#171914] px-5 py-14 text-[#eee6d6] sm:px-10">
      <div className="charter-screen mx-auto mb-8 flex max-w-4xl flex-wrap items-center justify-between gap-4">
        <div><p className="text-xs uppercase tracking-[.25em] text-[#c5a16a]">The Family Regiment · House Archive</p><h1 className="mt-2 font-display text-4xl">The House Charter</h1></div>
        <div className="flex flex-wrap gap-3"><Link href="/house/dashboard" className="border border-[#b89559] px-5 py-3 text-xs uppercase tracking-widest">Back to Dashboard</Link><button type="button" onClick={() => window.print()} className="bg-[#b89559] px-5 py-3 text-xs font-bold uppercase tracking-widest text-[#171914]">Print / Save as PDF</button></div>
      </div>
      {identity && <div className="charter-screen mx-auto mb-6 max-w-4xl border border-[#b89559]/35 px-5 py-4"><p className="mb-3 text-center text-[11px] uppercase tracking-[.2em] text-[#c7a773]">Choose the crest for your printed charter</p><div className="flex flex-wrap items-center justify-center gap-2" role="group" aria-label="Choose crest presentation">
              <button type="button" onClick={() => setCrestStyle("heritage")} aria-pressed={crestStyle === "heritage"} className={`border px-4 py-2 text-[10px] uppercase tracking-widest ${crestStyle === "heritage" ? "border-[#d4af6a] bg-[#b89559] text-[#171914]" : "border-[#b89559]/60 text-[#e8d5b5]"}`}>Traditional Heritage Crest</button>
              <button type="button" onClick={() => setCrestStyle("regiment")} aria-pressed={crestStyle === "regiment"} className={`border px-4 py-2 text-[10px] uppercase tracking-widest ${crestStyle === "regiment" ? "border-[#d4af6a] bg-[#b89559] text-[#171914]" : "border-[#b89559]/60 text-[#e8d5b5]"}`}>Regiment Crest</button>
            </div></div>}
      <article className="charter-sheet mx-auto max-w-4xl border border-[#b89559]/60 bg-[#20221c] px-6 py-12 text-center shadow-2xl sm:px-14 sm:py-16">
        <div className="border border-[#b89559]/35 px-5 py-12 sm:px-12">
          <p className="text-[11px] uppercase tracking-[.32em] text-[#c7a773]">The Family Regiment</p>
          <div className="mx-auto mt-7 h-px w-24 bg-[#b89559]" />
          <p className="mt-8 text-xs uppercase tracking-[.27em] text-[#c7a773]">Charter of Heritage & Legacy</p>
          <h2 className="font-display mt-6 break-words text-[clamp(2.5rem,6vw,4.5rem)] leading-tight">{identity?.familyName?.trim() ? `House of ${identity.familyName}` : "Your House"}</h2>
          {identity ? <>
            <div className="mx-auto my-8 flex w-full max-w-[520px] justify-center">
              {crestStyle === "heritage" ? <HeritageCrestPreview familyName={identity.familyName} initials={identity.initials} motto={identity.motto} symbol={identity.animal} shield={identity.shield} crown="None" finish="Regiment Gold" className="max-w-full" /> : <FamilyCrestPreview familyName={identity.familyName} initials={identity.initials} motto={identity.motto} symbol={identity.animal} shield={identity.shield} crown="None" finish="Regiment Gold" showPresentationLabel={false} className="!w-[440px] max-w-full" />}
            </div>
          </> : <p className="mx-auto my-12 max-w-md text-sm text-[#c6bba8]">Create your family crest in the builder to personalize this charter.</p>}
          {identity?.motto?.trim() && <p className="font-display text-2xl italic text-[#d4af6a]">“{identity.motto}”</p>}
          <div className="mx-auto my-10 h-px w-36 bg-[#b89559]/65" />
          <p className="mx-auto max-w-xl text-sm leading-8 text-[#d7cbbb]">A record of the values, principles, and legacy that this House chooses to honor and carry forward.</p>
          {recordStatus === "ready" && hasValues ? <div className="mx-auto mt-10 max-w-xl space-y-8 text-left">{valueFields.map(({ key, title }) => { const value = values?.[key]; return typeof value === "string" && value.trim() ? <section key={key}><h3 className="text-xs font-semibold uppercase tracking-[.2em] text-[#d4af6a]">{title}</h3><p className="mt-3 whitespace-pre-wrap break-words text-sm leading-7 text-[#eee6d6]">{value}</p></section> : null; })}</div> : <div className="charter-screen mt-8 text-sm leading-7 text-[#bfb3a2]">{recordStatus === "signed-out" ? "Sign in to include the values from your private Family Record." : recordStatus === "loading" ? "Loading your Family Record…" : recordStatus === "error" ? "Family Record unavailable. Your saved values have not been changed." : "No values recorded yet. Add your values in the Family Discovery journey."}</div>}
          {recordStatus === "ready" && (origins?.familyStory?.trim() || traditions?.traditionsToPreserve?.trim()) && <div className="mx-auto mt-10 max-w-xl space-y-8 text-left">
            {origins?.familyStory?.trim() && <section><h3 className="text-xs font-semibold uppercase tracking-[.2em] text-[#d4af6a]">Our Family Story</h3><p className="mt-3 whitespace-pre-wrap break-words text-sm leading-7 text-[#eee6d6]">{origins.familyStory}</p></section>}
            {traditions?.traditionsToPreserve?.trim() && <section><h3 className="text-xs font-semibold uppercase tracking-[.2em] text-[#d4af6a]">Traditions We Preserve</h3><p className="mt-3 whitespace-pre-wrap break-words text-sm leading-7 text-[#eee6d6]">{traditions.traditionsToPreserve}</p></section>}
          </div>}
          <p className="mt-14 text-[10px] uppercase tracking-[.2em] text-[#bba780]">Preserved for the House · The Family Regiment</p>
        </div>
      </article>
      <div className="charter-screen mx-auto mt-7 max-w-4xl text-sm leading-7 text-[#bfb3a2]"><p>This is a personal heritage keepsake, not a legal certificate or proof of ancestry. Your crest is loaded from this browser; family values and optional heritage details are loaded from your signed-in Family Record. Nothing is published or ordered by printing.</p><div className="mt-4 flex gap-5"><Link href="/begin/values" className="text-[#d4af6a] underline">Edit family values</Link><Link href="/begin/origins" className="text-[#d4af6a] underline">Edit family story</Link><Link href="/begin/traditions" className="text-[#d4af6a] underline">Edit traditions</Link><Link href="/builder" className="text-[#d4af6a] underline">Edit crest</Link></div></div>
    </main>
    <style jsx global>{`@media print { @page { size: letter; margin: .35in; } html,body { background:#20221c !important; -webkit-print-color-adjust:exact; print-color-adjust:exact; } .charter-screen { display:none !important; } .charter-page { min-height:0 !important; padding:0 !important; background:#20221c !important; } .charter-sheet { width:100% !important; max-width:none !important; padding:0 !important; border:1px solid #b89559 !important; box-shadow:none !important; break-inside:avoid; } .charter-sheet > div { padding:20px !important; } }`}</style>
  </>;
}

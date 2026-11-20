"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navigation from "@/components/layout/Navigation";
import FamilyCrestPreview, { type SupportedCrestFinish } from "@/components/builder/FamilyCrestPreview";
import { createClient } from "@/lib/supabase/client";
import { readHouseIdentity, HOUSE_IDENTITY_KEY, BLAZER_DRAFT_KEY, REGIMENT_DRAFT_KEY, type HouseIdentity } from "@/lib/houseIdentity";

type Chapter = { title: string; key: string; route: string; description: string };
const chapters: Chapter[] = [
  { title: "Origins", key: "origins", route: "/begin/origins", description: "Where your story begins" },
  { title: "Values", key: "values_record", route: "/begin/values", description: "What your House stands for" },
  { title: "Service", key: "service", route: "/begin/service", description: "The ways your family serves" },
  { title: "Traditions", key: "traditions", route: "/begin/traditions", description: "What you carry forward" },
  { title: "Symbols", key: "symbols", route: "/begin/symbols", description: "The meaning behind your heraldry" },
  { title: "Achievements", key: "achievements", route: "/begin/achievements", description: "Milestones worth honoring" },
  { title: "Future Legacy", key: "future_legacy", route: "/begin/future", description: "What the next generation inherits" },
];

type RecordData = Record<string, Record<string, unknown> | null>;
const hasContent = (value: unknown): boolean => {
  if (typeof value === "string") return value.trim().length > 0;
  if (Array.isArray(value)) return value.some(hasContent);
  if (value && typeof value === "object") return Object.values(value).some(hasContent);
  return false;
};

export default function HouseDashboard() {
  const [identity, setIdentity] = useState<HouseIdentity | null>(null);
  const [crestFinish, setCrestFinish] = useState<SupportedCrestFinish>("Regiment Gold");
  const [jacketSaved, setJacketSaved] = useState(false);
  const [blazerSaved, setBlazerSaved] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [record, setRecord] = useState<RecordData | null>(null);
  const [status, setStatus] = useState<"loading" | "signed-out" | "ready" | "error">("loading");

  useEffect(() => {
    let active = true;
    // Both garment builders already write the same shared House identity.
    // Re-read on focus and cross-tab changes so the dashboard cannot remain
    // stuck showing a crest that was changed in another builder.
    function refreshBrowserIdentity() {
      try {
        const hasIdentity = [HOUSE_IDENTITY_KEY, BLAZER_DRAFT_KEY, REGIMENT_DRAFT_KEY]
          .some(key => window.localStorage.getItem(key) !== null);
        setIdentity(hasIdentity ? readHouseIdentity() : null);
        setJacketSaved(window.localStorage.getItem(REGIMENT_DRAFT_KEY) !== null);
        setBlazerSaved(window.localStorage.getItem(BLAZER_DRAFT_KEY) !== null);
        setLastUpdated(new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }));
      } catch {
        // Private browsing or disabled storage should not block the dashboard.
        setIdentity(null);
        setJacketSaved(false);
        setBlazerSaved(false);
      }
    }
    refreshBrowserIdentity();
    function onStorage(event: StorageEvent) {
      if (event.key === null || [HOUSE_IDENTITY_KEY, BLAZER_DRAFT_KEY, REGIMENT_DRAFT_KEY].includes(event.key)) {
        refreshBrowserIdentity();
      }
    }
    window.addEventListener("focus", refreshBrowserIdentity);
    window.addEventListener("pageshow", refreshBrowserIdentity);
    window.addEventListener("storage", onStorage);
    async function load() {
      try {
        const client = createClient();
        const { data: { user }, error: authError } = await client.auth.getUser();
        if (!active) return;
        if (authError || !user) { setStatus("signed-out"); return; }
        const { data, error } = await client.from("family_records")
          .select("origins, values_record, service, traditions, symbols, achievements, future_legacy")
          .eq("user_id", user.id).maybeSingle();
        if (!active) return;
        if (error) { setStatus("error"); return; }
        setRecord((data ?? {}) as RecordData);
        setStatus("ready");
      } catch { if (active) setStatus("error"); }
    }
    void load();
    return () => {
      active = false;
      window.removeEventListener("focus", refreshBrowserIdentity);
      window.removeEventListener("pageshow", refreshBrowserIdentity);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const completed = chapters.filter(ch => hasContent(record?.[ch.key])).length;
  const panel = "border border-[#9f875b]/30 bg-[#22241d] p-7 sm:p-9";
  const action = "inline-flex min-h-11 items-center justify-center bg-[#b89559] px-6 py-3 text-xs font-semibold uppercase tracking-[.14em] text-[#171914] transition hover:bg-[#d0b17c]";
  const secondary = "inline-flex min-h-11 items-center justify-center border border-[#b89559]/70 px-6 py-3 text-xs font-semibold uppercase tracking-[.14em] text-[#eee6d6] transition hover:bg-[#b89559]/10";
  return <>
    <Navigation />
    <main className="min-h-screen bg-[#171914] text-[#eee6d6]">
      <section className="border-b border-[#9f875b]/30 bg-[radial-gradient(ellipse_at_75%_15%,rgba(177,143,83,.16),transparent_55%)] px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1360px]">
          <p className="text-xs font-semibold uppercase tracking-[.3em] text-[#c5a16a]">The Family Regiment · Your House</p>
          <h1 className="font-display mt-6 text-[clamp(3.5rem,7vw,6.5rem)] leading-[1.05]">{identity?.familyName?.trim() ? `House of ${identity.familyName}` : "Your House, Your Legacy"}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#c9bfaf]">Your private starting point for preserving a family story and carrying its identity across the collection.</p>
          {identity?.motto?.trim() && <p className="mt-7 font-display text-2xl italic text-[#c7aa78]">“{identity.motto}”</p>}
          <div className="mt-9 flex flex-wrap gap-3"><Link href="/begin" className={action}>Continue Your Story</Link><Link href="/house/charter" className={secondary}>View House Charter</Link><Link href="/herald" className={secondary}>Explore Heraldry</Link></div>
        </div>
      </section>
      <div className="mx-auto max-w-[1360px] space-y-14 px-6 py-16 sm:px-8 lg:px-12">
        <section aria-labelledby="identity-title" className="grid gap-6 lg:grid-cols-2">
          <div className={panel}>
            <p className="text-xs uppercase tracking-[.22em] text-[#c5a16a]">01 · House Identity</p>
            <h2 id="identity-title" className="font-display mt-4 text-4xl">The family standard</h2>
            {identity ? <dl className="mt-7 space-y-5 text-sm">
              <div><dt className="uppercase tracking-widest text-[#9f9889]">House name</dt><dd className="mt-1 text-lg">{identity.familyName || "Not yet named"}</dd></div>
              <div><dt className="uppercase tracking-widest text-[#9f9889]">Heraldic symbol</dt><dd className="mt-1 text-lg">{identity.animal}</dd></div>
              <div><dt className="uppercase tracking-widest text-[#9f9889]">Shield</dt><dd className="mt-1 text-lg">{identity.shield}</dd></div>
              <div><dt className="uppercase tracking-widest text-[#9f9889]">Motto</dt><dd className="mt-1 text-lg">{identity.motto || "Not yet chosen"}</dd></div>
            </dl> : <p className="mt-6 leading-7 text-[#b9b1a2]">No saved House identity was found in this browser. Begin a design to establish your House.</p>}
            {identity && <p className="mt-6 text-xs leading-6 text-[#a9a193]">Shared across the House Dashboard and both garment builders. Jacket name tape, shoulder flags, optional patches, and garment finishes remain independent.</p>}
            <Link href="/builder" className="mt-8 inline-block border-b border-[#b89559] pb-1 text-sm text-[#d6ba85]">{identity ? "Refine your heraldry" : "Create your House crest"}</Link>
          </div>
          <div className={panel}>
            <p className="text-xs uppercase tracking-[.22em] text-[#c5a16a]">02 · Live House Crest</p>
            <h2 className="font-display mt-4 text-4xl">Your family heraldry</h2>
            {identity ? (
              <>
                <div className="mt-6" aria-label="Crest presentation finish">
                  <p className="mb-3 text-xs uppercase tracking-[.16em] text-[#b9b1a2]">Preview finish</p>
                  <div className="flex flex-wrap gap-2" role="group" aria-label="Preview crest in a different finish">
                    {(["Regiment Gold", "Tactical Subdued", "Heritage Ivory"] as const).map((finish) => (
                      <button
                        key={finish}
                        type="button"
                        onClick={() => setCrestFinish(finish)}
                        aria-pressed={crestFinish === finish}
                        className={`min-h-10 border px-3 py-2 text-xs transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d6ba85] ${crestFinish === finish ? "border-[#d6ba85] bg-[#b89559]/20 text-[#f4e4c5]" : "border-[#9f875b]/35 text-[#b9b1a2] hover:border-[#b89559]"}`}
                      >{finish}</button>
                    ))}
                  </div>
                </div>
                <div className="mt-5 flex min-h-[350px] items-center justify-center border border-[#9f875b]/20 bg-[#171914] px-5 py-8">
                  <FamilyCrestPreview
                    familyName={identity.familyName}
                    initials={identity.initials}
                    motto={identity.motto}
                    symbol={identity.animal}
                    shield={identity.shield}
                    crown="None"
                    finish={crestFinish}
                    showPresentationLabel={false}
                    className="max-w-full"
                  />
                </div>
                <p aria-live="polite" className="mt-4 text-xs text-[#c5a16a]">{lastUpdated ? `House identity checked at ${lastUpdated}` : "Checking browser-saved House identity"}</p>
                <p className="mt-5 text-sm leading-7 text-[#b9b1a2]">Live preview of your browser-saved House identity, using the same heraldry renderer as the garment builder. Finish changes here are visual comparisons only; they do not change your saved design or create a production embroidery file.</p>
                <Link href="/builder" className="mt-5 inline-block border-b border-[#b89559] pb-1 text-sm text-[#d6ba85]">Refine your crest</Link>
              </>
            ) : (
              <>
                <p className="mt-6 leading-7 text-[#b9b1a2]">No saved House crest was found in this browser. Create a crest to see it here.</p>
                <Link href="/builder" className={`${secondary} mt-6`}>Create Your Crest</Link>
              </>
            )}
          </div>
          <div className={panel}>
            <p className="text-xs uppercase tracking-[.22em] text-[#c5a16a]">03 · Family Record</p>
            <div className="mt-4 flex flex-wrap items-end justify-between gap-4"><h2 className="font-display text-4xl">The story behind the crest</h2>{status === "ready" && <span className="text-sm text-[#c9bfaf]">{completed} of {chapters.length} chapters started</span>}</div>
            {status === "loading" && <p className="mt-6 text-[#b9b1a2]">Checking your Family Record…</p>}
            {status === "signed-out" && <div className="mt-6"><p className="mb-5 leading-7 text-[#b9b1a2]">Sign in to view your private Family Record. Designs saved in this browser are shown separately.</p><Link href="/auth/sign-in" className={secondary}>Sign In</Link></div>}
            {status === "error" && <p className="mt-6 text-[#b9b1a2]">Your Family Record could not be loaded right now. Your existing entries have not been changed.</p>}
            {status === "ready" && <div className="mt-7 grid gap-3 sm:grid-cols-2">{chapters.map(ch => <Link key={ch.key} href={ch.route} className="border border-[#9f875b]/25 bg-[#191b16] p-4 transition hover:border-[#b89559]"><div className="flex items-center justify-between gap-3"><h3 className="font-display text-2xl">{ch.title}</h3><span className="text-[10px] uppercase tracking-widest text-[#c5a16a]">{hasContent(record?.[ch.key]) ? "Started" : "Not started"}</span></div><p className="mt-2 text-sm text-[#a9a193]">{ch.description}</p></Link>)}</div>}
            <Link href="/begin/review" className="mt-8 inline-block border-b border-[#b89559] pb-1 text-sm text-[#d6ba85]">Review your Family Record</Link>
          </div>
        </section>
        <section aria-labelledby="garments-title"><p className="text-xs uppercase tracking-[.22em] text-[#c5a16a]">04 · The Founding Collection</p><h2 id="garments-title" className="font-display mt-4 text-5xl">One House. Two expressions.</h2><p className="mt-4 max-w-3xl leading-8 text-[#b9b1a2]">The same family heraldry, adapted to each garment. Garment-specific choices remain independent; the jacket name tape is not tied to the House name.</p>
          <div className="mt-8 grid gap-6 md:grid-cols-2"><article className={panel}><p className="text-xs uppercase tracking-[.2em] text-[#c5a16a]">Regiment Jacket</p><h3 className="font-display mt-4 text-4xl">Heritage in service</h3><p className="mt-4 leading-8 text-[#b9b1a2]">Crest on the wearer’s left shoulder, flags on the right shoulder, and a separate personalized name tape above the chest pocket.</p><p className="mt-5 text-xs uppercase tracking-widest text-[#c5a16a]">{jacketSaved ? "Browser draft found" : "No browser draft found"}</p><Link href="/builder" className={`${action} mt-7`}>{jacketSaved ? "Continue Jacket Design" : "Customize Jacket"}</Link></article>
          <article className={panel}><p className="text-xs uppercase tracking-[.2em] text-[#c5a16a]">Heritage Blazer</p><h3 className="font-display mt-4 text-4xl">Heritage with distinction</h3><p className="mt-4 leading-8 text-[#b9b1a2]">A larger family crest on the wearer’s left chest with House name and Latin motto. No additional patches.</p><p className="mt-5 text-xs uppercase tracking-widest text-[#c5a16a]">{blazerSaved ? "Browser draft found" : "No browser draft found"}</p><Link href="/blazer/builder" className={`${action} mt-7`}>{blazerSaved ? "Continue Blazer Design" : "Customize Blazer"}</Link></article></div>
        </section>
        <p className="border-t border-[#9f875b]/25 pt-8 text-sm leading-7 text-[#a9a193]">Privacy note: Your Family Record is loaded from your signed-in account. House identity and garment draft indicators on this page come from this browser; they are not proof of account synchronization. This dashboard does not publish your family information or place an order.</p>
      </div>
    </main>
  </>;
}

import Link from "next/link";
import Navigation from "@/components/layout/Navigation";

const gold = "text-[#c8a66d]";

const garments = [
  {
    eyebrow: "01 / Custom field garment",
    title: "The Regiment Jacket",
    image: "/images/products/studio/jacket-front-clean.png",
    alt: "Regiment Jacket reference garment; final blanks and placement are subject to sampling",
    details: [
      "Military-inspired OD green field jacket; final blank, sizing and construction pending supplier approval.",
      "Family crest patch: wearer's left shoulder, with House name and Latin motto rockers.",
      "Heritage flags: wearer's right shoulder. Optional identity patch: left chest.",
      "Independently personalized name tape positioned above the chest pocket.",
      "Variable configurations by customer, including multiple sizes and name tapes in one order.",
    ],
  },
  {
    eyebrow: "02 / Tailored heritage garment",
    title: "The Heritage Blazer",
    image: null,
    alt: "",
    details: [
      "Classic heritage blazer; fabric, color, lining, blank supplier and size range require validation.",
      "Larger rendition of the same House crest on the wearer's left chest.",
      "Crest includes House name and Latin motto; no additional patches on the blazer.",
      "Crest finish can be selected independently of the Regiment Jacket.",
      "Application method must preserve tailoring, lining and garment structure.",
    ],
  },
];

const capabilities = [
  ["Inventory custody", "Receive and store brand-owned blank garments, track stock by product/size/SKU, report stock levels and losses."],
  ["Patch development", "Digitize artwork, provide stitch-outs, manufacture repeatable embroidered crests, rockers, flags and name tapes."],
  ["Garment assembly", "Accurately attach specified patches and tapes to each garment, including lined blazers if qualified."],
  ["Order personalization", "Process one-off customer configurations and multiple personalization groups within a single order."],
  ["Quality assurance", "Check garment condition, correct patch design, placement, stitching, names and quantities before dispatch."],
  ["White-label fulfillment", "Use approved packaging, ship directly to customers, return tracking and handle exceptions/returns."],
];

const questions = [
  "Which services are performed in-house, and which are subcontracted?",
  "Can you hold inventory owned by our brand? What are receiving, storage and minimum-volume charges?",
  "Can you produce patches and sew them on demand, including one-piece orders?",
  "Do you have documented experience sewing crests onto lined, tailored blazers?",
  "What artwork formats, minimum text sizes, stitch limits and sample approvals do you require?",
  "What are the setup, digitizing, sample, embroidery, sewing, pick/pack and shipping charges?",
  "What are the minimum order quantities, replenishment requirements and production lead times?",
  "How do you receive variable orders (portal, CSV, API), report inventory and return tracking?",
  "How are incorrect personalization, defects, lost inventory and customer returns handled?",
  "Can you provide relevant work samples and current business references?",
];

export default function ProductionPartnersPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-[#171914] text-[#eee6d6]">
        <section className="border-b border-[#b08d57]/25 bg-[#11130f] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
          <div className="mx-auto max-w-6xl">
            <p className="text-xs font-semibold uppercase tracking-[0.27em] text-[#c8a66d]">The Family Regiment / Production Partnerships</p>
            <h1 className="mt-5 max-w-4xl font-display text-4xl leading-tight sm:text-6xl">Crafted for a House. <span className="italic text-[#c8a66d]">Built to Last.</span></h1>
            <p className="mt-7 max-w-3xl text-base leading-8 text-[#c4bdaf]">We are evaluating U.S.-based production and fulfillment partners for a premium, personalized heritage apparel collection. This brief outlines the capabilities we seek and the questions we would like qualified suppliers to address.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#requirements" className="border border-[#b08d57] bg-[#b08d57] px-5 py-3 text-xs font-semibold uppercase tracking-[0.13em] text-[#171914]">Review requirements</a>
              <a href="#inquiry" className="border border-[#b08d57]/60 px-5 py-3 text-xs font-semibold uppercase tracking-[0.13em] text-[#e1cfaf]">Supplier inquiry checklist</a>
            </div>
            <p className="mt-8 max-w-3xl text-xs leading-6 text-[#a9a295]">Status: pre-production sourcing. Images and digital previews are design references, not manufactured samples or finalized technical drawings. No vendor, materials, dimensions, SKUs or order volumes have been approved.</p>
          </div>
        </section>

        <section className="px-5 py-14 sm:px-8 lg:px-12" id="garments">
          <div className="mx-auto max-w-6xl">
            <p className={`text-xs uppercase tracking-[0.2em] ${gold}`}>Collection scope</p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl">Two garments. One shared House identity.</h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-[#b9b1a2]">The customer's family crest is shared across both garments. Garment-specific placement, sizing and finishing differ. The jacket's personal name tape is separate from the House name on the crest.</p>
            <div className="mt-9 grid gap-6 lg:grid-cols-2">
              {garments.map((garment) => (
                <article key={garment.title} className="min-w-0 border border-[#b08d57]/30 bg-[#20221b] p-6 sm:p-8">
                  <p className={`text-xs uppercase tracking-[0.17em] ${gold}`}>{garment.eyebrow}</p>
                  <h3 className="mt-3 font-display text-2xl">{garment.title}</h3>
                  {garment.image ? (
                    <div className="mt-5 flex h-64 items-center justify-center overflow-hidden rounded bg-[#111213] p-4">
                      {/* Reference image only; not a production-approved specification. */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={garment.image} alt={garment.alt} className="h-full w-full object-contain" />
                    </div>
                  ) : (
                    <div className="mt-5 flex h-64 flex-col items-center justify-center rounded border border-[#b08d57]/15 bg-[#111213] px-6 text-center">
                      <span className="font-display text-xl italic text-[#c8a66d]">Heritage Blazer</span>
                      <span className="mt-3 text-xs leading-6 text-[#aaa292]">Tailored sample and manufacturing artwork to be approved with the selected supplier.</span>
                    </div>
                  )}
                  <ul className="mt-6 space-y-3 text-sm leading-6 text-[#c4bdaf]">
                    {garment.details.map((detail) => <li key={detail} className="flex gap-3"><span aria-hidden="true" className="text-[#c8a66d]">—</span><span>{detail}</span></li>)}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="requirements" className="border-y border-[#b08d57]/20 bg-[#1c1e18] px-5 py-14 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-6xl">
            <p className={`text-xs uppercase tracking-[0.2em] ${gold}`}>Operating model</p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl">Preferred: one integrated partner.</h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-[#b9b1a2]">Our preferred arrangement is brand-owned inventory held by a partner that can manufacture patches, apply personalization, inspect finished goods and ship directly to customers. We are also open to clearly disclosed subcontracting or a phased service model.</p>
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {capabilities.map(([name, detail]) => (
                <div key={name} className="border border-[#b08d57]/25 bg-[#20221b] p-5">
                  <h3 className="font-display text-xl text-[#e8d4b2]">{name}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#b9b1a2]">{detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-14 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-6xl">
            <p className={`text-xs uppercase tracking-[0.2em] ${gold}`}>Heraldry and decoration</p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl">Design intent and sampling criteria</h2>
            <div className="mt-7 grid gap-6 lg:grid-cols-2">
              <div className="border border-[#b08d57]/25 bg-[#20221b] p-6">
                <h3 className="font-display text-xl">Approved visual finish directions</h3>
                <div className="mt-5 space-y-4 text-sm">
                  <div><strong className="text-[#e8d4b2]">Regiment Gold</strong><p className="mt-1 text-[#b9b1a2]">Near-black field #11120F; antique-gold charge/details #D4AF6A.</p></div>
                  <div><strong className="text-[#e8d4b2]">Tactical Subdued</strong><p className="mt-1 text-[#b9b1a2]">Near-black field #11120F; OD-green charge/details #626A3A.</p></div>
                  <div><strong className="text-[#e8d4b2]">Heritage Ivory</strong><p className="mt-1 text-[#b9b1a2]">Charcoal field #24251F; warm-ivory charge/details #F1E7CF.</p></div>
                </div>
                <p className="mt-5 text-xs leading-6 text-[#a9a295]">Digital hex values are design references, not approved thread-color specifications. Thread books, materials and stitch-outs must be matched and approved physically.</p>
              </div>
              <div className="border border-[#b08d57]/25 bg-[#20221b] p-6">
                <h3 className="font-display text-xl">Sample approval requirements</h3>
                <ul className="mt-5 space-y-3 text-sm leading-6 text-[#b9b1a2]">
                  <li>Legible curved House name and Latin motto rockers at production scale.</li>
                  <li>Consistent heraldic detail, stitch density, edges and backing.</li>
                  <li>Supplier-recommended patch dimensions and minimum lettering size.</li>
                  <li>Verified placement using actual garment measurements and physical samples.</li>
                  <li>Wash/care compatibility, colorfastness and attachment durability.</li>
                  <li>One fully finished sample jacket and one finished sample blazer before production approval.</li>
                </ul>
                <p className="mt-5 text-xs leading-6 text-[#a9a295]">Final dimensions, thread codes, backing types, tolerance ranges and artwork files will be established jointly after technical review.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="inquiry" className="border-t border-[#b08d57]/20 bg-[#11130f] px-5 py-14 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-6xl">
            <p className={`text-xs uppercase tracking-[0.2em] ${gold}`}>Supplier qualification</p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl">Information requested from prospective partners</h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-[#b9b1a2]">Please address the following when responding to our initial inquiry. We welcome a phased pilot proposal if you cannot provide every service in-house.</p>
            <ol className="mt-7 grid gap-3 md:grid-cols-2">
              {questions.map((question, index) => <li key={question} className="flex gap-4 border border-[#b08d57]/20 bg-[#20221b] p-4 text-sm leading-6 text-[#c4bdaf]"><span className="shrink-0 font-semibold text-[#c8a66d]">{String(index + 1).padStart(2, "0")}</span><span>{question}</span></li>)}
            </ol>
            <div className="mt-9 border-l-2 border-[#b08d57] bg-[#20221b] p-6">
              <h3 className="font-display text-xl">Suggested pilot engagement</h3>
              <p className="mt-3 text-sm leading-7 text-[#b9b1a2]">Technical consultation → artwork and blank-garment assessment → paid embroidery stitch-outs → one completed jacket and one completed blazer → quality and unit-economics review → small controlled production pilot. No volume commitment is implied by this brief.</p>
            </div>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <Link href="/" className="text-sm text-[#c8a66d] underline underline-offset-4">Explore The Family Regiment website</Link>
              <Link href="/builder" className="text-sm text-[#c8a66d] underline underline-offset-4">View jacket customization experience</Link>
              <Link href="/blazer/builder" className="text-sm text-[#c8a66d] underline underline-offset-4">View blazer customization experience</Link>
            </div>
            <p className="mt-8 text-xs leading-6 text-[#a9a295]">This is an introductory sourcing brief, not a purchase order, binding request for quotation, or release of production artwork. Commercial terms, intellectual property treatment and sample ownership will be agreed separately.</p>
          </div>
        </section>
      </main>
    </>
  );
}

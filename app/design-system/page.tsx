import type { CSSProperties, ReactNode } from "react";

type ColorSwatchProps = {
  name: string;
  hex: string;
  textColor?: string;
  description: string;
};

type SectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
};

const colors = {
  regimentalGreen: "#2E3B2D",
  deepRegimentalGreen: "#1F2A20",
  brass: "#B08D57",
  parchment: "#F5F1E8",
  warmParchment: "#E9E1D2",
  charcoal: "#1E1E1E",
  softCharcoal: "#363633",
  burgundy: "#5B1F27",
  navy: "#20334D",
  ivory: "#FFFDF7",
  white: "#FFFFFF",
  border: "rgba(46, 59, 45, 0.18)",
  mutedText: "#6A685F",
};

const pageStyle: CSSProperties = {
  minHeight: "100vh",
  background: colors.parchment,
  color: colors.charcoal,
  fontFamily:
    'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
};

const containerStyle: CSSProperties = {
  width: "min(1180px, calc(100% - 40px))",
  margin: "0 auto",
};

const serifStyle: CSSProperties = {
  fontFamily:
    '"Cormorant Garamond", Georgia, "Times New Roman", serif',
};

const sectionGridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: "20px",
};

const cardStyle: CSSProperties = {
  border: `1px solid ${colors.border}`,
  background: colors.ivory,
  borderRadius: "2px",
  boxShadow: "0 14px 40px rgba(30, 30, 30, 0.07)",
};

function Section({
  eyebrow,
  title,
  description,
  children,
}: SectionProps) {
  return (
    <section
      style={{
        padding: "72px 0",
        borderBottom: `1px solid ${colors.border}`,
      }}
    >
      <div style={{ marginBottom: "36px", maxWidth: "760px" }}>
        <p
          style={{
            margin: "0 0 12px",
            color: colors.brass,
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          {eyebrow}
        </p>

        <h2
          style={{
            ...serifStyle,
            margin: "0 0 14px",
            color: colors.deepRegimentalGreen,
            fontSize: "clamp(36px, 5vw, 54px)",
            fontWeight: 600,
            lineHeight: 0.98,
            letterSpacing: "-0.025em",
          }}
        >
          {title}
        </h2>

        <p
          style={{
            margin: 0,
            maxWidth: "680px",
            color: colors.mutedText,
            fontSize: "16px",
            lineHeight: 1.75,
          }}
        >
          {description}
        </p>
      </div>

      {children}
    </section>
  );
}

function ColorSwatch({
  name,
  hex,
  textColor = colors.ivory,
  description,
}: ColorSwatchProps) {
  return (
    <article
      style={{
        ...cardStyle,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          minHeight: "150px",
          alignItems: "flex-end",
          padding: "22px",
          background: hex,
          color: textColor,
        }}
      >
        <div>
          <p
            style={{
              margin: "0 0 4px",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            {name}
          </p>

          <p
            style={{
              margin: 0,
              fontFamily: "monospace",
              fontSize: "13px",
              opacity: 0.86,
            }}
          >
            {hex}
          </p>
        </div>
      </div>

      <div style={{ padding: "18px 20px 22px" }}>
        <p
          style={{
            margin: 0,
            color: colors.mutedText,
            fontSize: "14px",
            lineHeight: 1.65,
          }}
        >
          {description}
        </p>
      </div>
    </article>
  );
}

function PrimaryButton({ children }: { children: ReactNode }) {
  return (
    <button
      type="button"
      style={{
        minHeight: "50px",
        padding: "0 26px",
        border: `1px solid ${colors.regimentalGreen}`,
        borderRadius: "2px",
        background: colors.regimentalGreen,
        color: colors.ivory,
        cursor: "pointer",
        font: "inherit",
        fontSize: "12px",
        fontWeight: 700,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
      }}
    >
      {children}
    </button>
  );
}

function SecondaryButton({ children }: { children: ReactNode }) {
  return (
    <button
      type="button"
      style={{
        minHeight: "50px",
        padding: "0 26px",
        border: `1px solid ${colors.regimentalGreen}`,
        borderRadius: "2px",
        background: "transparent",
        color: colors.regimentalGreen,
        cursor: "pointer",
        font: "inherit",
        fontSize: "12px",
        fontWeight: 700,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
      }}
    >
      {children}
    </button>
  );
}

function BrassButton({ children }: { children: ReactNode }) {
  return (
    <button
      type="button"
      style={{
        minHeight: "50px",
        padding: "0 26px",
        border: `1px solid ${colors.brass}`,
        borderRadius: "2px",
        background: colors.brass,
        color: colors.charcoal,
        cursor: "pointer",
        font: "inherit",
        fontSize: "12px",
        fontWeight: 800,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
      }}
    >
      {children}
    </button>
  );
}

function TextInput({
  label,
  placeholder,
}: {
  label: string;
  placeholder: string;
}) {
  return (
    <label style={{ display: "grid", gap: "9px" }}>
      <span
        style={{
          color: colors.deepRegimentalGreen,
          fontSize: "11px",
          fontWeight: 800,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>

      <input
        type="text"
        placeholder={placeholder}
        style={{
          width: "100%",
          minHeight: "50px",
          boxSizing: "border-box",
          border: `1px solid ${colors.border}`,
          borderRadius: "2px",
          background: colors.white,
          color: colors.charcoal,
          padding: "0 15px",
          font: "inherit",
          fontSize: "15px",
          outline: "none",
        }}
      />
    </label>
  );
}

export default function DesignSystemPage() {
  return (
    <main style={pageStyle}>
      <header
        style={{
          position: "relative",
          overflow: "hidden",
          background: colors.deepRegimentalGreen,
          color: colors.ivory,
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 82% 18%, rgba(176, 141, 87, 0.22), transparent 34%), linear-gradient(135deg, rgba(255,255,255,0.04), transparent 55%)",
          }}
        />

        <div
          style={{
            ...containerStyle,
            position: "relative",
            padding: "28px 0 96px",
          }}
        >
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "24px",
              paddingBottom: "72px",
            }}
          >
            <div>
              <p
                style={{
                  ...serifStyle,
                  margin: 0,
                  fontSize: "22px",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                The Family Regiment
              </p>

              <p
                style={{
                  margin: "5px 0 0",
                  color: colors.brass,
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.24em",
                  textTransform: "uppercase",
                }}
              >
                Internal Design Standard
              </p>
            </div>

            <span
              style={{
                border: "1px solid rgba(245, 241, 232, 0.28)",
                padding: "9px 13px",
                color: colors.warmParchment,
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              Version 1.1
            </span>
          </nav>

          <div style={{ maxWidth: "850px" }}>
            <p
              style={{
                margin: "0 0 18px",
                color: colors.brass,
                fontSize: "12px",
                fontWeight: 800,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
              }}
            >
              The Family Studio
            </p>

            <h1
              style={{
                ...serifStyle,
                margin: "0 0 24px",
                maxWidth: "800px",
                fontSize: "clamp(54px, 8vw, 96px)",
                fontWeight: 600,
                lineHeight: 0.9,
                letterSpacing: "-0.04em",
              }}
            >
              A design language built for modern heirlooms.
            </h1>

            <p
              style={{
                margin: 0,
                maxWidth: "680px",
                color: "rgba(245, 241, 232, 0.76)",
                fontSize: "17px",
                lineHeight: 1.8,
              }}
            >
              This page defines the visual foundation for The Family
              Regiment: restrained color, editorial typography, deliberate
              spacing, and details inspired by military utility and traditional
              craftsmanship.
            </p>
          </div>
        </div>
      </header>

      <div style={containerStyle}>
        <Section
          eyebrow="01 — Foundation"
          title="Official color palette"
          description="The palette combines military utility with the warmth of heritage materials. Regimental green and parchment form the foundation, while brass, burgundy, and navy provide disciplined accents."
        >
          <div style={sectionGridStyle}>
            <ColorSwatch
              name="Regimental Green"
              hex={colors.regimentalGreen}
              description="Primary brand color for navigation, major actions, panels, and product framing."
            />

            <ColorSwatch
              name="Brass"
              hex={colors.brass}
              textColor={colors.charcoal}
              description="Premium accent for heraldic details, dividers, badges, and moments of ceremony."
            />

            <ColorSwatch
              name="Parchment"
              hex={colors.parchment}
              textColor={colors.charcoal}
              description="Primary page background, inspired by archival documents and natural canvas."
            />

            <ColorSwatch
              name="Charcoal"
              hex={colors.charcoal}
              description="Primary text and dark neutral for maximum clarity without using absolute black."
            />

            <ColorSwatch
              name="Burgundy"
              hex={colors.burgundy}
              description="A selective heritage accent suited to seals, warnings, ribbons, and ceremonial details."
            />

            <ColorSwatch
              name="Navy"
              hex={colors.navy}
              description="A secondary institutional tone for service references, alternate collections, and depth."
            />
          </div>
        </Section>

        <Section
          eyebrow="02 — Typography"
          title="Editorial, confident, and restrained"
          description="Display typography should feel established and ceremonial. Interface typography should remain practical, direct, and easy to read."
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "24px",
            }}
          >
            <article style={{ ...cardStyle, padding: "34px" }}>
              <p
                style={{
                  margin: "0 0 30px",
                  color: colors.brass,
                  fontSize: "11px",
                  fontWeight: 800,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                }}
              >
                Display — Cormorant Garamond
              </p>

              <p
                style={{
                  ...serifStyle,
                  margin: "0 0 14px",
                  color: colors.deepRegimentalGreen,
                  fontSize: "54px",
                  fontWeight: 600,
                  lineHeight: 0.95,
                  letterSpacing: "-0.035em",
                }}
              >
                Wear Your Legacy.
              </p>

              <p
                style={{
                  ...serifStyle,
                  margin: 0,
                  color: colors.mutedText,
                  fontSize: "25px",
                  fontStyle: "italic",
                  lineHeight: 1.25,
                }}
              >
                Every family has a story. Every house deserves a crest.
              </p>
            </article>

            <article style={{ ...cardStyle, padding: "34px" }}>
              <p
                style={{
                  margin: "0 0 30px",
                  color: colors.brass,
                  fontSize: "11px",
                  fontWeight: 800,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                }}
              >
                Interface — Inter
              </p>

              <h3
                style={{
                  margin: "0 0 12px",
                  color: colors.deepRegimentalGreen,
                  fontSize: "22px",
                  lineHeight: 1.3,
                }}
              >
                Build your family crest
              </h3>

              <p
                style={{
                  margin: "0 0 22px",
                  color: colors.mutedText,
                  fontSize: "15px",
                  lineHeight: 1.75,
                }}
              >
                Share the history, values, and symbols that define your
                family. The Studio will translate those details into a
                meaningful heraldic design.
              </p>

              <p
                style={{
                  margin: 0,
                  color: colors.regimentalGreen,
                  fontSize: "11px",
                  fontWeight: 800,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                }}
              >
                Interface labels use disciplined spacing
              </p>
            </article>
          </div>
        </Section>

        <Section
          eyebrow="03 — Actions"
          title="Buttons with purpose"
          description="Primary actions should feel deliberate rather than playful. Buttons use compact uppercase labels, restrained corners, and clear visual hierarchy."
        >
          <div
            style={{
              ...cardStyle,
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "14px",
              padding: "30px",
            }}
          >
            <PrimaryButton>Build Your House</PrimaryButton>
            <SecondaryButton>Explore the Collection</SecondaryButton>
            <BrassButton>Commission Your Crest</BrassButton>

            <button
              type="button"
              disabled
              style={{
                minHeight: "50px",
                padding: "0 26px",
                border: `1px solid ${colors.border}`,
                borderRadius: "2px",
                background: "#E4E0D7",
                color: "#99958A",
                cursor: "not-allowed",
                font: "inherit",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
              }}
            >
              Unavailable
            </button>
          </div>
        </Section>

        <Section
          eyebrow="04 — Forms"
          title="Quiet controls, clear decisions"
          description="Form elements should support storytelling without making the experience feel administrative. Labels are compact, fields are generous, and visual noise is kept low."
        >
          <div
            style={{
              ...cardStyle,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "22px",
              padding: "32px",
            }}
          >
            <TextInput
              label="Family Name"
              placeholder="Enter your family name"
            />

            <TextInput
              label="Heritage"
              placeholder="France, Italy, Ghana..."
            />

            <label style={{ display: "grid", gap: "9px" }}>
              <span
                style={{
                  color: colors.deepRegimentalGreen,
                  fontSize: "11px",
                  fontWeight: 800,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                }}
              >
                Primary Symbol
              </span>

              <select
                defaultValue="lion"
                style={{
                  width: "100%",
                  minHeight: "50px",
                  boxSizing: "border-box",
                  border: `1px solid ${colors.border}`,
                  borderRadius: "2px",
                  background: colors.white,
                  color: colors.charcoal,
                  padding: "0 15px",
                  font: "inherit",
                  fontSize: "15px",
                  outline: "none",
                }}
              >
                <option value="lion">Lion</option>
                <option value="eagle">Eagle</option>
                <option value="wolf">Wolf</option>
                <option value="bear">Bear</option>
                <option value="stag">Stag</option>
              </select>
            </label>

            <label
              style={{
                display: "grid",
                gridColumn: "1 / -1",
                gap: "9px",
              }}
            >
              <span
                style={{
                  color: colors.deepRegimentalGreen,
                  fontSize: "11px",
                  fontWeight: 800,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                }}
              >
                Family Story
              </span>

              <textarea
                placeholder="Tell us where your family comes from, what it values, and the legacy you want the crest to represent."
                rows={6}
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  resize: "vertical",
                  border: `1px solid ${colors.border}`,
                  borderRadius: "2px",
                  background: colors.white,
                  color: colors.charcoal,
                  padding: "15px",
                  font: "inherit",
                  fontSize: "15px",
                  lineHeight: 1.65,
                  outline: "none",
                }}
              />
            </label>
          </div>
        </Section>

        <Section
          eyebrow="05 — Surfaces"
          title="Panels for the Family Studio"
          description="Studio surfaces should create structure without looking like generic software cards. Each panel has a clear role and an understated material quality."
        >
          <div style={sectionGridStyle}>
            <article style={{ ...cardStyle, padding: "28px" }}>
              <span
                style={{
                  display: "inline-block",
                  marginBottom: "38px",
                  border: `1px solid ${colors.brass}`,
                  padding: "7px 10px",
                  color: colors.brass,
                  fontSize: "10px",
                  fontWeight: 800,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                }}
              >
                House Story
              </span>

              <h3
                style={{
                  ...serifStyle,
                  margin: "0 0 10px",
                  color: colors.deepRegimentalGreen,
                  fontSize: "34px",
                  fontWeight: 600,
                }}
              >
                Define the legacy
              </h3>

              <p
                style={{
                  margin: 0,
                  color: colors.mutedText,
                  fontSize: "14px",
                  lineHeight: 1.75,
                }}
              >
                Heritage, service, traditions, values, and the story the family
                wants future generations to remember.
              </p>
            </article>

            <article
              style={{
                ...cardStyle,
                padding: "28px",
                background: colors.regimentalGreen,
                color: colors.ivory,
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  marginBottom: "38px",
                  border: "1px solid rgba(245, 241, 232, 0.28)",
                  padding: "7px 10px",
                  color: colors.warmParchment,
                  fontSize: "10px",
                  fontWeight: 800,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                }}
              >
                Heraldry
              </span>

              <h3
                style={{
                  ...serifStyle,
                  margin: "0 0 10px",
                  fontSize: "34px",
                  fontWeight: 600,
                }}
              >
                Shape the crest
              </h3>

              <p
                style={{
                  margin: 0,
                  color: "rgba(245, 241, 232, 0.72)",
                  fontSize: "14px",
                  lineHeight: 1.75,
                }}
              >
                Select the shield, charge, crown, colors, and motto while the
                live crest responds in real time.
              </p>
            </article>

            <article
              style={{
                ...cardStyle,
                padding: "28px",
                background:
                  "linear-gradient(145deg, #D4C19E 0%, #B08D57 100%)",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  marginBottom: "38px",
                  border: "1px solid rgba(30, 30, 30, 0.35)",
                  padding: "7px 10px",
                  color: colors.charcoal,
                  fontSize: "10px",
                  fontWeight: 800,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                }}
              >
                Production
              </span>

              <h3
                style={{
                  ...serifStyle,
                  margin: "0 0 10px",
                  color: colors.charcoal,
                  fontSize: "34px",
                  fontWeight: 600,
                }}
              >
                Ready for craft
              </h3>

              <p
                style={{
                  margin: 0,
                  color: "rgba(30, 30, 30, 0.7)",
                  fontSize: "14px",
                  lineHeight: 1.75,
                }}
              >
                Confirm materials, dimensions, thread colors, placement, and
                the final manufacturing proof.
              </p>
            </article>
          </div>
        </Section>

        <Section
          eyebrow="06 — Studio Preview"
          title="The flagship workspace"
          description="The Studio will combine story, heraldry, and product visualization into one composed environment. This preview establishes its intended hierarchy."
        >
          <div
            style={{
              overflow: "hidden",
              border: `1px solid ${colors.border}`,
              borderRadius: "2px",
              boxShadow: "0 26px 70px rgba(30, 30, 30, 0.12)",
              background: colors.ivory,
            }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "20px",
                borderBottom: `1px solid ${colors.border}`,
                padding: "22px 26px",
              }}
            >
              <div>
                <p
                  style={{
                    margin: "0 0 4px",
                    color: colors.brass,
                    fontSize: "10px",
                    fontWeight: 800,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                  }}
                >
                  The Family Studio
                </p>

                <h3
                  style={{
                    ...serifStyle,
                    margin: 0,
                    color: colors.deepRegimentalGreen,
                    fontSize: "28px",
                    fontWeight: 600,
                  }}
                >
                  House of Laurent
                </h3>
              </div>

              <PrimaryButton>Review Your House</PrimaryButton>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "minmax(220px, 0.8fr) minmax(300px, 1.35fr) minmax(240px, 0.95fr)",
                minHeight: "500px",
              }}
            >
              <aside
                style={{
                  borderRight: `1px solid ${colors.border}`,
                  padding: "28px",
                }}
              >
                <p
                  style={{
                    margin: "0 0 24px",
                    color: colors.regimentalGreen,
                    fontSize: "11px",
                    fontWeight: 800,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                  }}
                >
                  House Details
                </p>

                {[
                  "Family Story",
                  "Heritage",
                  "Values",
                  "Service",
                  "Motto",
                ].map((item, index) => (
                  <div
                    key={item}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      borderBottom: `1px solid ${colors.border}`,
                      padding: "15px 0",
                      color:
                        index === 0
                          ? colors.deepRegimentalGreen
                          : colors.mutedText,
                      fontSize: "14px",
                      fontWeight: index === 0 ? 700 : 500,
                    }}
                  >
                    <span
                      style={{
                        display: "grid",
                        width: "24px",
                        height: "24px",
                        placeItems: "center",
                        border:
                          index === 0
                            ? `1px solid ${colors.brass}`
                            : `1px solid ${colors.border}`,
                        borderRadius: "50%",
                        color:
                          index === 0 ? colors.brass : colors.mutedText,
                        fontSize: "10px",
                      }}
                    >
                      {index + 1}
                    </span>

                    {item}
                  </div>
                ))}
              </aside>

              <section
                style={{
                  display: "grid",
                  placeItems: "center",
                  minHeight: "500px",
                  padding: "38px",
                  background:
                    "radial-gradient(circle at center, #FFFFFF 0%, #F1EBDD 72%, #E6DECE 100%)",
                  textAlign: "center",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "grid",
                      width: "230px",
                      height: "280px",
                      margin: "0 auto 30px",
                      placeItems: "center",
                      border: `8px double ${colors.brass}`,
                      borderRadius: "46% 46% 52% 52% / 26% 26% 74% 74%",
                      background: colors.regimentalGreen,
                      boxShadow:
                        "0 22px 44px rgba(31, 42, 32, 0.22), inset 0 0 0 4px rgba(245, 241, 232, 0.18)",
                      color: colors.brass,
                    }}
                  >
                    <span
                      style={{
                        ...serifStyle,
                        fontSize: "96px",
                        fontWeight: 700,
                      }}
                    >
                      L
                    </span>
                  </div>

                  <p
                    style={{
                      ...serifStyle,
                      margin: "0 0 4px",
                      color: colors.deepRegimentalGreen,
                      fontSize: "28px",
                      fontWeight: 600,
                    }}
                  >
                    Fortis in Familia
                  </p>

                  <p
                    style={{
                      margin: 0,
                      color: colors.mutedText,
                      fontSize: "12px",
                      fontWeight: 700,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                    }}
                  >
                    Strength in Family
                  </p>
                </div>
              </section>

              <aside
                style={{
                  borderLeft: `1px solid ${colors.border}`,
                  padding: "28px",
                  background: "#F2EEE5",
                }}
              >
                <p
                  style={{
                    margin: "0 0 24px",
                    color: colors.regimentalGreen,
                    fontSize: "11px",
                    fontWeight: 800,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                  }}
                >
                  Product Preview
                </p>

                <div
                  style={{
                    display: "grid",
                    minHeight: "270px",
                    marginBottom: "24px",
                    placeItems: "center",
                    border: `1px solid ${colors.border}`,
                    background: colors.regimentalGreen,
                    color: colors.warmParchment,
                  }}
                >
                  <div style={{ textAlign: "center" }}>
                    <p
                      style={{
                        ...serifStyle,
                        margin: "0 0 8px",
                        fontSize: "30px",
                        fontWeight: 600,
                      }}
                    >
                      M65 Jacket
                    </p>

                    <p
                      style={{
                        margin: 0,
                        fontSize: "10px",
                        fontWeight: 700,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                      }}
                    >
                      Live placement preview
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "10px",
                  }}
                >
                  {["Embroidered", "Woven", "Leather", "PVC"].map(
                    (material, index) => (
                      <div
                        key={material}
                        style={{
                          border:
                            index === 0
                              ? `1px solid ${colors.brass}`
                              : `1px solid ${colors.border}`,
                          background:
                            index === 0 ? colors.ivory : "transparent",
                          padding: "13px 10px",
                          color:
                            index === 0
                              ? colors.deepRegimentalGreen
                              : colors.mutedText,
                          textAlign: "center",
                          fontSize: "10px",
                          fontWeight: 800,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                        }}
                      >
                        {material}
                      </div>
                    ),
                  )}
                </div>
              </aside>
            </div>
          </div>
        </Section>
      </div>

      <footer
        style={{
          background: colors.charcoal,
          color: colors.ivory,
        }}
      >
        <div
          style={{
            ...containerStyle,
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "24px",
            padding: "38px 0",
          }}
        >
          <div>
            <p
              style={{
                ...serifStyle,
                margin: "0 0 5px",
                fontSize: "21px",
                fontWeight: 600,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              The Family Regiment
            </p>

            <p
              style={{
                margin: 0,
                color: "rgba(245, 241, 232, 0.58)",
                fontSize: "12px",
              }}
            >
              Product Design System · Version 1.1
            </p>
          </div>

          <p
            style={{
              margin: 0,
              color: colors.brass,
              fontSize: "10px",
              fontWeight: 800,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            Create Your House. Wear Your Legacy.
          </p>
        </div>
      </footer>
    </main>
  );
}
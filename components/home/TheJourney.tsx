"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type JourneyStep = {
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
};

const journeySteps: JourneyStep[] = [
  {
    number: "01",
    eyebrow: "Discover",
    title: "Tell us where your story begins.",
    description:
      "We explore your family’s heritage, migration, service, professions, traditions, values, and the places that shaped your identity.",
    image: "/images/editorial/heritage-map.png",
    imageAlt:
      "Antique world map surrounded by family photographs, books, and a compass",
  },
  {
    number: "02",
    eyebrow: "Design",
    title: "Your history becomes a regimental identity.",
    description:
      "Heraldic animals, flags, colors, symbols, and a Latin motto are composed into a crest that reflects both where your family came from and what it stands for today.",
    image: "/images/editorial/crest-sketchbook.png",
    imageAlt:
      "Open sketchbook containing hand-drawn family crest concepts",
  },
  {
    number: "03",
    eyebrow: "Craft",
    title: "Every detail is prepared for embroidery.",
    description:
      "Your approved crest is simplified, balanced, and validated for thread. Strong outlines, controlled colors, and intentional spacing ensure the finished patch can be manufactured beautifully.",
    image: "/images/editorial/thread-and-embroidery.png",
    imageAlt:
      "Embroidered family crest surrounded by thread, fabric, and tailoring tools",
  },
  {
    number: "04",
    eyebrow: "Receive",
    title: "A family standard made to endure.",
    description:
      "Your finished regiment can include an embroidered crest, personalized jacket, family charter, and a digital identity that can grow with future generations.",
    image: "/images/editorial/family-charter-desk.png",
    imageAlt:
      "Family charter displayed on an antique desk with a wax seal and fountain pen",
  },
];

export default function TheJourney() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const stepElements = Array.from(
      section.querySelectorAll<HTMLElement>("[data-journey-step]")
    );

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio - a.intersectionRatio
          );

        const mostVisible = visibleEntries[0];

        if (!mostVisible) {
          return;
        }

        const index = Number(
          mostVisible.target.getAttribute("data-step-index")
        );

        if (!Number.isNaN(index)) {
          setActiveStep(index);
        }
      },
      {
        rootMargin: "-25% 0px -45% 0px",
        threshold: [0.2, 0.4, 0.6, 0.8],
      }
    );

    stepElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="journey">
      <div className="journeyHeader">
        <p className="chapterLabel">Chapter III</p>

        <div className="headerRule" />

        <h2>The Journey</h2>

        <p className="headerStatement">
          Every regiment begins with a story.
        </p>

        <p className="headerDescription">
          A guided process transforms your family&apos;s history into a
          modern heraldic identity—designed with meaning and prepared
          for the craft of embroidery.
        </p>
      </div>

      <div className="journeyBody">
        <aside className="timeline" aria-label="Journey progress">
          <div className="timelineTrack">
            <div
              className="timelineProgress"
              style={{
                height: `${
                  journeySteps.length > 1
                    ? (activeStep / (journeySteps.length - 1)) * 100
                    : 0
                }%`,
              }}
            />
          </div>

          <div className="timelineItems">
            {journeySteps.map((step, index) => (
              <button
                key={step.number}
                type="button"
                className={`timelineItem ${
                  activeStep === index ? "isActive" : ""
                }`}
                onClick={() => {
                  const target = sectionRef.current?.querySelector(
                    `[data-step-index="${index}"]`
                  );

                  target?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  });
                }}
                aria-label={`Go to ${step.eyebrow}`}
              >
                <span className="timelineDot" />

                <span className="timelineNumber">
                  {step.number}
                </span>

                <span className="timelineName">
                  {step.eyebrow}
                </span>
              </button>
            ))}
          </div>
        </aside>

        <div className="steps">
          {journeySteps.map((step, index) => (
            <article
              key={step.number}
              className={`step ${
                activeStep === index ? "isActive" : ""
              }`}
              data-journey-step
              data-step-index={index}
            >
              <div className="stepImageWrapper">
                <Image
                  src={step.image}
                  alt={step.imageAlt}
                  fill
                  sizes="(max-width: 900px) 100vw, 58vw"
                  className="stepImage"
                />

                <div className="imageOverlay" />

                <span className="imageNumber">
                  {step.number}
                </span>
              </div>

              <div className="stepContent">
                <p className="stepEyebrow">{step.eyebrow}</p>

                <h3>{step.title}</h3>

                <p className="stepDescription">
                  {step.description}
                </p>

                <div className="stepRule" />
              </div>
            </article>
          ))}
        </div>
      </div>

      <style jsx>{`
        .journey {
          --ink: #171812;
          --olive: #343a2b;
          --olive-dark: #22261d;
          --cream: #eee8dc;
          --paper: #f4f0e7;
          --gold: #a9884c;
          --muted: #777466;

          position: relative;
          overflow: clip;
          background: var(--paper);
          color: var(--ink);
          padding: 140px 24px 160px;
        }

        .journeyHeader {
          width: min(1180px, 100%);
          margin: 0 auto 130px;
          text-align: center;
        }

        .chapterLabel,
        .stepEyebrow {
          margin: 0;
          color: var(--gold);
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.28em;
          text-transform: uppercase;
        }

        .headerRule {
          width: 72px;
          height: 1px;
          margin: 24px auto 31px;
          background: var(--gold);
        }

        .journeyHeader h2 {
          margin: 0;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(3.5rem, 9vw, 8rem);
          font-weight: 400;
          letter-spacing: -0.055em;
          line-height: 0.88;
          text-transform: uppercase;
        }

        .headerStatement {
          margin: 38px 0 0;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(1.3rem, 2.3vw, 2.1rem);
          font-style: italic;
          line-height: 1.35;
        }

        .headerDescription {
          width: min(650px, 100%);
          margin: 28px auto 0;
          color: var(--muted);
          font-size: 1rem;
          line-height: 1.85;
        }

        .journeyBody {
          position: relative;
          display: grid;
          grid-template-columns: 190px minmax(0, 1fr);
          gap: 68px;
          width: min(1380px, 100%);
          margin: 0 auto;
        }

        .timeline {
          position: sticky;
          top: 120px;
          align-self: start;
          height: 440px;
        }

        .timelineTrack {
          position: absolute;
          top: 12px;
          bottom: 12px;
          left: 7px;
          width: 1px;
          overflow: hidden;
          background: rgba(23, 24, 18, 0.18);
        }

        .timelineProgress {
          width: 100%;
          min-height: 0;
          background: var(--gold);
          transition: height 650ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .timelineItems {
          position: relative;
          z-index: 2;
          display: flex;
          height: 100%;
          flex-direction: column;
          justify-content: space-between;
        }

        .timelineItem {
          display: grid;
          grid-template-columns: 16px 35px 1fr;
          align-items: center;
          gap: 14px;
          width: 100%;
          border: 0;
          padding: 0;
          background: transparent;
          color: var(--muted);
          cursor: pointer;
          text-align: left;
          transition:
            color 300ms ease,
            transform 300ms ease;
        }

        .timelineItem:hover,
        .timelineItem.isActive {
          color: var(--ink);
          transform: translateX(5px);
        }

        .timelineDot {
          width: 15px;
          height: 15px;
          border: 1px solid rgba(23, 24, 18, 0.35);
          border-radius: 999px;
          background: var(--paper);
          transition:
            background 300ms ease,
            border-color 300ms ease,
            transform 300ms ease;
        }

        .timelineItem.isActive .timelineDot {
          border-color: var(--gold);
          background: var(--gold);
          transform: scale(1.2);
        }

        .timelineNumber {
          font-family: Georgia, "Times New Roman", serif;
          font-size: 0.82rem;
        }

        .timelineName {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .steps {
          display: flex;
          min-width: 0;
          flex-direction: column;
          gap: 170px;
        }

        .step {
          display: grid;
          grid-template-columns: minmax(0, 1.38fr) minmax(280px, 0.72fr);
          align-items: center;
          gap: clamp(42px, 6vw, 100px);
          min-height: 680px;
          opacity: 0.56;
          transform: translateY(28px);
          transition:
            opacity 700ms ease,
            transform 700ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .step:nth-child(even) {
          grid-template-columns: minmax(280px, 0.72fr) minmax(
              0,
              1.38fr
            );
        }

        .step:nth-child(even) .stepImageWrapper {
          grid-column: 2;
        }

        .step:nth-child(even) .stepContent {
          grid-column: 1;
          grid-row: 1;
        }

        .step.isActive {
          opacity: 1;
          transform: translateY(0);
        }

        .stepImageWrapper {
          position: relative;
          min-height: 590px;
          overflow: hidden;
          background: var(--olive-dark);
        }

        .stepImage {
          object-fit: cover;
          transition: transform 1.4s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .step.isActive .stepImage {
          transform: scale(1.025);
        }

        .imageOverlay {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(
              180deg,
              rgba(11, 12, 9, 0.04),
              rgba(11, 12, 9, 0.3)
            );
          pointer-events: none;
        }

        .imageNumber {
          position: absolute;
          right: 28px;
          bottom: 18px;
          color: rgba(238, 232, 220, 0.8);
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(3.7rem, 7vw, 7rem);
          line-height: 1;
        }

        .stepContent {
          max-width: 440px;
        }

        .stepContent h3 {
          margin: 22px 0 26px;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(2.6rem, 4.8vw, 5.3rem);
          font-weight: 400;
          letter-spacing: -0.045em;
          line-height: 0.98;
        }

        .stepDescription {
          margin: 0;
          color: var(--muted);
          font-size: 1rem;
          line-height: 1.9;
        }

        .stepRule {
          width: 76px;
          height: 1px;
          margin-top: 38px;
          background: var(--gold);
        }

        @media (max-width: 1000px) {
          .journey {
            padding: 110px 22px 130px;
          }

          .journeyHeader {
            margin-bottom: 90px;
          }

          .journeyBody {
            display: block;
          }

          .timeline {
            display: none;
          }

          .steps {
            gap: 110px;
          }

          .step,
          .step:nth-child(even) {
            display: flex;
            min-height: 0;
            flex-direction: column;
            align-items: stretch;
            gap: 38px;
          }

          .step:nth-child(even) .stepImageWrapper,
          .step:nth-child(even) .stepContent {
            grid-column: auto;
            grid-row: auto;
          }

          .step:nth-child(even) {
            flex-direction: column;
          }

          .stepImageWrapper {
            width: 100%;
            min-height: clamp(380px, 68vw, 620px);
          }

          .stepContent {
            max-width: 670px;
          }
        }

        @media (max-width: 600px) {
          .journey {
            padding: 86px 16px 100px;
          }

          .journeyHeader {
            margin-bottom: 72px;
          }

          .headerDescription {
            font-size: 0.94rem;
            line-height: 1.75;
          }

          .steps {
            gap: 86px;
          }

          .step {
            opacity: 1;
            transform: none;
          }

          .stepImageWrapper {
            min-height: 330px;
          }

          .stepContent h3 {
            margin-top: 18px;
          }

          .stepDescription {
            font-size: 0.94rem;
            line-height: 1.75;
          }

          .imageNumber {
            right: 18px;
            bottom: 12px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .timelineProgress,
          .timelineItem,
          .timelineDot,
          .step,
          .stepImage {
            transition: none;
          }

          .step {
            opacity: 1;
            transform: none;
          }

          .step.isActive .stepImage {
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}
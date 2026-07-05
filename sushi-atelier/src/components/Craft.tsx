"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { NigiriSalmon, EnsoCircle } from "./SushiArt";

const STEPS = [
  { jp: "米", title: "The Rice", text: "Shari seasoned with aged red vinegar, served at 37° — the temperature of the hand that shaped it." },
  { jp: "魚", title: "The Fish", text: "Never merely fresh. Cured, rested, aged — because flavour is a decision, not an accident." },
  { jp: "刃", title: "The Knife", text: "A single-bevel yanagiba, sharpened every morning. One draw of the blade. Never a second." },
  { jp: "手", title: "The Hand", text: "Nine grams of rice, one heartbeat of pressure. The piece exists for eight seconds. Then it is yours." },
];

export default function Craft() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const steps = gsap.utils.toArray<HTMLElement>("[data-craft-step]");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=380%",
          pin: true,
          scrub: 0.7,
        },
      });

      // panel blooms open from a small card into a full frame
      tl.fromTo(
        "[data-craft-panel]",
        {
          scale: 0.62,
          clipPath: "inset(18% 24% 18% 24% round 40px)",
          filter: "brightness(0.6)",
        },
        {
          scale: 1,
          clipPath: "inset(0% 0% 0% 0% round 0px)",
          filter: "brightness(1)",
          duration: 3,
          ease: "power2.inOut",
        },
        0
      );
      tl.fromTo(
        "[data-craft-art]",
        { scale: 1.5, yPercent: 12, rotate: -6 },
        { scale: 1, yPercent: 0, rotate: 0, duration: 3, ease: "power2.inOut" },
        0
      );
      tl.to(
        "[data-craft-enso]",
        { rotate: 360, duration: 12, ease: "none" },
        0
      );

      // steps cycle on the left
      steps.forEach((s, i) => {
        const at = 2.2 + i * 2.4;
        tl.fromTo(
          s,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" },
          at
        );
        if (i < steps.length - 1) {
          tl.to(s, { opacity: 0, y: -50, duration: 0.8, ease: "power2.in" }, at + 1.6);
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="craft"
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-ink"
    >
      {/* full-bleed panel that scales open */}
      <div
        data-craft-panel
        className="absolute inset-0 will-change-transform"
        style={{
          background:
            "radial-gradient(120% 90% at 70% 30%, #1d1622 0%, #12101a 34%, #0a0a0e 72%)",
        }}
      >
        <div data-craft-art className="absolute inset-0 will-change-transform">
          {/* rotating enso */}
          <div
            data-craft-enso
            className="absolute left-1/2 top-1/2 h-[68vmin] w-[68vmin] -translate-x-1/2 -translate-y-1/2 text-gold/15"
          >
            <EnsoCircle className="h-full w-full" />
          </div>
          {/* hero nigiri */}
          <div className="absolute left-1/2 top-1/2 w-[46vmin] -translate-x-1/2 -translate-y-1/2">
            <NigiriSalmon className="h-auto w-full drop-shadow-[0_40px_80px_rgba(0,0,0,0.7)]" />
          </div>
          {/* floating glass chips */}
          <div className="glass absolute left-[12%] top-[20%] hidden rounded-2xl px-5 py-3 md:block">
            <p className="text-[10px] uppercase tracking-[0.3em] text-cream-dim">
              Rice temp
            </p>
            <p className="font-display text-2xl text-gold">37.0&deg;C</p>
          </div>
          <div className="glass absolute bottom-[18%] right-[12%] hidden rounded-2xl px-5 py-3 md:block">
            <p className="text-[10px] uppercase tracking-[0.3em] text-cream-dim">
              Aged akami
            </p>
            <p className="font-display text-2xl text-salmon">11 days</p>
          </div>
        </div>
        <div className="vignette absolute inset-0" />
      </div>

      {/* header */}
      <div className="absolute left-6 top-24 z-10 md:left-14 md:top-14">
        <p className="text-[11px] font-medium uppercase tracking-[0.5em] text-gold">
          The Craft
        </p>
        <h2 className="mt-3 font-display text-4xl font-light text-cream md:text-6xl">
          Four disciplines
        </h2>
      </div>

      {/* cycling steps */}
      <div className="absolute bottom-16 left-6 z-10 h-44 w-[min(85vw,26rem)] md:bottom-24 md:left-14">
        {STEPS.map((s, i) => (
          <div key={i} data-craft-step className="absolute inset-0 opacity-0">
            <div className="glass rounded-3xl p-6 md:p-7">
              <div className="flex items-center gap-4">
                <span className="font-jp text-4xl font-light text-gold">
                  {s.jp}
                </span>
                <h3 className="font-display text-2xl font-light text-cream">
                  {s.title}
                </h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-cream-dim">
                {s.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

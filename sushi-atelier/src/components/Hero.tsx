"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "@/lib/gsap";
import ParticleField from "./ParticleField";

const TITLE = "ENSŌ";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // scrub the whole hero out as you scroll past it — cinematic exit
      gsap.to("[data-hero-content]", {
        yPercent: -28,
        opacity: 0,
        scale: 0.94,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to("[data-hero-kanji]", {
        yPercent: 46,
        rotate: 6,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to("[data-hero-glow]", {
        yPercent: 30,
        scale: 1.3,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative flex h-[100svh] items-center justify-center overflow-hidden"
    >
      {/* deep glow */}
      <div
        data-hero-glow
        className="absolute left-1/2 top-1/2 h-[80vmin] w-[80vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60"
        style={{
          background:
            "radial-gradient(circle, rgba(240,131,108,0.14) 0%, rgba(217,181,124,0.07) 40%, transparent 70%)",
        }}
      />

      {/* giant kanji behind — parallax layer */}
      <div
        data-hero-kanji
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <span className="font-jp text-[62vmin] font-extralight leading-none text-cream/[0.035] select-none">
          鮨
        </span>
      </div>

      <ParticleField className="absolute inset-0" />

      {/* content */}
      <div data-hero-content className="relative z-10 flex flex-col items-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.3, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 text-[11px] font-medium uppercase tracking-[0.5em] text-gold"
        >
          Omakase &middot; Twenty Seats &middot; One Story
        </motion.p>

        <h1 className="font-display text-[clamp(4.5rem,18vw,15rem)] font-light leading-[0.9] tracking-[0.06em] text-cream">
          {TITLE.split("").map((ch, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={{ opacity: 0, y: 90, rotateX: -70, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
              transition={{
                duration: 1.3,
                delay: 1.9 + i * 0.09,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {ch}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 2.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 max-w-md font-display text-lg font-light italic leading-relaxed text-cream-dim md:text-2xl"
        >
          A sushi atelier where every course
          <br className="hidden md:block" /> is a single, deliberate brushstroke.
        </motion.p>
      </div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 3.1 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <span className="text-[10px] uppercase tracking-[0.4em] text-cream-dim">
          Scroll
        </span>
        <div className="h-14 w-px overflow-hidden bg-cream/10">
          <div className="scroll-cue-bar h-full w-full bg-gold" />
        </div>
      </motion.div>

      <div className="vignette pointer-events-none absolute inset-0" />
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const PHRASES = [
  {
    kanji: "旬",
    word: "Shun",
    text: "We follow shun — the fleeting days when an ingredient reaches its absolute peak. Nothing before. Nothing after.",
  },
  {
    kanji: "職人",
    word: "Shokunin",
    text: "Twenty seats. Two hands. Ten thousand hours behind every motion you will never notice.",
  },
  {
    kanji: "円相",
    word: "Ensō",
    text: "Sushi is not assembled. It is composed — one imperfect, unrepeatable circle at a time.",
  },
];

export default function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const phrases = gsap.utils.toArray<HTMLElement>("[data-phrase]");
      const kanjis = gsap.utils.toArray<HTMLElement>("[data-phrase-kanji]");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=" + PHRASES.length * 110 + "%",
          pin: true,
          scrub: 0.6,
        },
      });

      phrases.forEach((p, i) => {
        const at = i * 3;
        tl.fromTo(
          p,
          { opacity: 0, y: 80, filter: "blur(14px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.1, ease: "power2.out" },
          at
        );
        tl.fromTo(
          kanjis[i],
          { opacity: 0, scale: 1.35 },
          { opacity: 1, scale: 1, duration: 1.3, ease: "power2.out" },
          at
        );
        if (i < phrases.length - 1) {
          tl.to(
            p,
            { opacity: 0, y: -80, filter: "blur(14px)", duration: 1, ease: "power2.in" },
            at + 1.9
          );
          tl.to(
            kanjis[i],
            { opacity: 0, scale: 0.8, duration: 1, ease: "power2.in" },
            at + 1.9
          );
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      className="relative flex h-screen items-center justify-center overflow-hidden bg-ink"
    >
      {/* kanji backdrops */}
      {PHRASES.map((p, i) => (
        <div
          key={i}
          data-phrase-kanji
          className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0"
        >
          <span className="font-jp text-[70vmin] font-extralight leading-none text-gold/[0.05] select-none">
            {p.kanji}
          </span>
        </div>
      ))}

      {/* phrases stacked */}
      <div className="relative z-10 mx-auto w-full max-w-4xl px-6">
        {PHRASES.map((p, i) => (
          <div
            key={i}
            data-phrase
            className="absolute inset-x-6 top-1/2 -translate-y-1/2 text-center opacity-0"
          >
            <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.5em] text-gold">
              {p.word}
            </p>
            <p className="font-display text-3xl font-light leading-snug text-cream md:text-6xl">
              {p.text}
            </p>
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute bottom-10 left-1/2 flex -translate-x-1/2 gap-2">
        {PHRASES.map((_, i) => (
          <span key={i} className="h-1 w-8 rounded-full bg-cream/10" />
        ))}
      </div>
    </section>
  );
}

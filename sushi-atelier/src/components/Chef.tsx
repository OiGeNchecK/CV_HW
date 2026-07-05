"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const QUOTE =
  "Taste is memory. I am not inventing anything tonight — I am only arranging yours.";

export default function Chef() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // word-by-word ink reveal, scrubbed
      gsap.fromTo(
        "[data-quote-word]",
        { opacity: 0.08, y: 8 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.06,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-quote]",
            start: "top 78%",
            end: "top 30%",
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        cardRef.current,
        { y: 90, rotateY: -8, rotateX: 4, opacity: 0 },
        {
          y: 0,
          rotateY: 0,
          rotateX: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 95%",
            end: "top 45%",
            scrub: true,
          },
        }
      );

      gsap.to("[data-chef-kanji]", {
        yPercent: -35,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // subtle 3D tilt on pointer
  const onMove = (e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card || !window.matchMedia("(pointer: fine)").matches) return;
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(card, {
      rotateY: px * 10,
      rotateX: -py * 8,
      duration: 0.6,
      ease: "power2.out",
    });
  };
  const onLeave = () => {
    if (cardRef.current)
      gsap.to(cardRef.current, { rotateY: 0, rotateX: 0, duration: 0.9, ease: "elastic.out(1,0.5)" });
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-ink-2 py-32 md:py-48"
    >
      <div
        data-chef-kanji
        className="pointer-events-none absolute -right-10 top-1/4 select-none"
      >
        <span className="font-jp text-[50vmin] font-extralight leading-none text-cream/[0.03]">
          匠
        </span>
      </div>

      <div className="relative z-10 mx-auto grid max-w-6xl gap-16 px-6 md:grid-cols-[1.2fr_1fr] md:gap-20 md:px-10">
        <div data-quote className="flex flex-col justify-center">
          <p className="mb-8 text-[11px] font-medium uppercase tracking-[0.5em] text-gold">
            The Chef
          </p>
          <blockquote className="font-display text-3xl font-light leading-snug text-cream md:text-5xl">
            {QUOTE.split(" ").map((w, i) => (
              <span key={i} data-quote-word className="inline-block">
                {w}&nbsp;
              </span>
            ))}
          </blockquote>
          <p className="mt-10 text-sm uppercase tracking-[0.3em] text-cream-dim">
            Arata Mori &middot; Chef &amp; Owner
          </p>
        </div>

        <div style={{ perspective: "1200px" }}>
          <div
            ref={cardRef}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            className="glass relative aspect-[3/4] overflow-hidden rounded-3xl will-change-transform"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* stylised portrait: silhouette in lamplight */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(90% 70% at 50% 18%, rgba(217,181,124,0.22) 0%, rgba(20,18,26,0.2) 45%, transparent 70%), linear-gradient(180deg, #17141d 0%, #0c0b10 100%)",
              }}
            />
            <svg
              viewBox="0 0 300 400"
              className="absolute inset-0 h-full w-full"
              aria-hidden
            >
              <ellipse cx="150" cy="118" rx="46" ry="52" fill="#0a0910" />
              <path
                d="M150 168 C 92 172 62 214 56 292 L 56 400 L 244 400 L 244 292 C 238 214 208 172 150 168 Z"
                fill="#0a0910"
              />
              <path
                d="M104 70 Q 150 40 196 70 L 190 96 Q 150 76 110 96 Z"
                fill="#1f1b28"
              />
              <path
                d="M120 250 L 180 250 L 176 330 L 124 330 Z"
                fill="#141119"
              />
            </svg>
            <div className="absolute inset-x-0 bottom-0 p-6" style={{ transform: "translateZ(40px)" }}>
              <div className="glass rounded-2xl px-5 py-4">
                <p className="font-jp text-lg text-gold">森 新</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.25em] text-cream-dim">
                  Tokyo &rarr; Kyiv &middot; 23 years at the counter
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

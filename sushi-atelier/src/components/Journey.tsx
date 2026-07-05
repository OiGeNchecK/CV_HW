"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import {
  MakiRoll,
  Sashimi,
  NigiriSalmon,
  NigiriTuna,
  Gunkan,
  Tamago,
} from "./SushiArt";

const COURSES = [
  {
    no: "01",
    jp: "先付",
    name: "Sakizuke",
    desc: "The first whisper. A single bite that sets the temperature of the whole evening — sea, salt, season.",
    Art: MakiRoll,
    accent: "text-salmon",
  },
  {
    no: "02",
    jp: "御造り",
    name: "Otsukuri",
    desc: "Sashimi cut against the grain of habit. Fish aged for days so that time itself becomes an ingredient.",
    Art: Sashimi,
    accent: "text-gold",
  },
  {
    no: "03",
    jp: "握り",
    name: "Nigiri",
    desc: "Nine grams of rice at body temperature. One motion of the hand. Nothing to hide behind.",
    Art: NigiriSalmon,
    accent: "text-salmon",
  },
  {
    no: "04",
    jp: "強肴",
    name: "Shiizakana",
    desc: "The quiet climax — charcoal, smoke, and a cut of akami that has waited eleven days for this minute.",
    Art: NigiriTuna,
    accent: "text-gold",
  },
  {
    no: "05",
    jp: "軍艦",
    name: "Gunkan",
    desc: "Uni from Hokkaidō, cold as the strait it came from, wrapped in nori toasted seconds ago.",
    Art: Gunkan,
    accent: "text-gold",
  },
  {
    no: "06",
    jp: "水物",
    name: "Mizumono",
    desc: "The circle closes. Tamago like castella cake, yuzu ice, and the silence after the last note.",
    Art: Tamago,
    accent: "text-salmon",
  },
];

export default function Journey() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const track = trackRef.current!;
        const distance = () => track.scrollWidth - window.innerWidth;

        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => "+=" + distance(),
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });

        // progress bar
        gsap.to("[data-journey-progress]", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => "+=" + distance(),
            scrub: true,
          },
        });

        // per-card float-in while the track slides
        gsap.utils.toArray<HTMLElement>("[data-course-card]").forEach((card) => {
          gsap.fromTo(
            card,
            { y: 60, rotateZ: 1.5, opacity: 0.4 },
            {
              y: 0,
              rotateZ: 0,
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                containerAnimation: tween,
                start: "left 90%",
                end: "left 45%",
                scrub: true,
              },
            }
          );
        });

        return () => {
          ScrollTrigger.getAll().forEach((st) => st.kill());
        };
      });

      mm.add("(max-width: 767px)", () => {
        gsap.utils.toArray<HTMLElement>("[data-course-card]").forEach((card) => {
          gsap.fromTo(
            card,
            { y: 60, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: { trigger: card, start: "top 85%" },
            }
          );
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="relative overflow-hidden bg-ink-2 md:h-screen"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-end justify-between px-6 pt-24 md:px-14 md:pt-10">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.5em] text-gold">
            The Omakase Journey
          </p>
          <h2 className="mt-3 font-display text-4xl font-light text-cream md:text-6xl">
            Six acts, one evening
          </h2>
        </div>
        <span className="hidden font-jp text-5xl font-extralight text-cream/10 md:block">
          献立
        </span>
      </div>

      {/* horizontal track */}
      <div
        ref={trackRef}
        className="flex flex-col gap-8 px-6 pb-16 pt-52 will-change-transform md:h-screen md:flex-row md:items-center md:gap-[6vw] md:px-[10vw] md:pb-0 md:pt-0"
      >
        {COURSES.map((c) => (
          <article
            key={c.no}
            data-course-card
            className="glass group relative flex w-full shrink-0 flex-col justify-between rounded-3xl p-8 md:mt-24 md:h-[62vh] md:w-[38vw] md:min-w-[420px] md:p-10"
          >
            <div className="flex items-start justify-between">
              <span className="font-display text-6xl font-light text-cream/15 transition-colors duration-500 group-hover:text-gold/40 md:text-7xl">
                {c.no}
              </span>
              <span className="font-jp text-2xl font-light text-cream/25">
                {c.jp}
              </span>
            </div>

            <div className="pointer-events-none mx-auto -my-2 w-44 transition-transform duration-700 ease-out group-hover:-translate-y-2 group-hover:scale-105 md:w-56">
              <c.Art className="h-auto w-full drop-shadow-[0_18px_30px_rgba(0,0,0,0.5)]" />
            </div>

            <div>
              <h3
                className={`font-display text-3xl font-light md:text-4xl ${c.accent}`}
              >
                {c.name}
              </h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-cream-dim md:text-base">
                {c.desc}
              </p>
            </div>
          </article>
        ))}

        {/* end card */}
        <div className="hidden shrink-0 items-center md:flex md:w-[30vw]">
          <p className="font-display text-4xl font-light italic leading-snug text-cream/60">
            &ldquo;The menu is a river.
            <br />
            You only step in once.&rdquo;
          </p>
        </div>
      </div>

      {/* progress */}
      <div className="absolute bottom-8 left-1/2 z-20 hidden h-px w-[30vw] -translate-x-1/2 bg-cream/10 md:block">
        <div
          data-journey-progress
          className="h-full w-full origin-left scale-x-0 bg-gold"
        />
      </div>
    </section>
  );
}

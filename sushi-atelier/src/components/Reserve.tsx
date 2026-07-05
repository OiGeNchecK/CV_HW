"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const MARQUEE = "OMAKASE · ENSŌ · 円相 · SUSHI ATELIER · 鮨 · ";

export default function Reserve() {
  const sectionRef = useRef<HTMLElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-reserve-inner]",
        { scale: 0.9, opacity: 0, y: 80 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            end: "top 30%",
            scrub: true,
          },
        }
      );
      gsap.to("[data-reserve-glow]", {
        scale: 1.4,
        opacity: 0.9,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom bottom",
          scrub: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // magnetic button
  useEffect(() => {
    const btn = btnRef.current;
    if (!btn || !window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: MouseEvent) => {
      const r = btn.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const dist = Math.hypot(dx, dy);
      if (dist < 160) {
        gsap.to(btn, { x: dx * 0.28, y: dy * 0.28, duration: 0.5, ease: "power3.out" });
      } else {
        gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1,0.5)" });
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      id="reserve"
      ref={sectionRef}
      className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-ink-2"
    >
      {/* marquee */}
      <div className="relative overflow-hidden border-y border-cream/5 py-5">
        <div className="marquee-track flex w-max whitespace-nowrap">
          {[0, 1].map((k) => (
            <span
              key={k}
              className="font-display text-2xl font-light tracking-[0.3em] text-cream/20 md:text-3xl"
            >
              {MARQUEE.repeat(3)}
            </span>
          ))}
        </div>
      </div>

      <div className="relative flex flex-1 items-center justify-center px-6 py-24">
        <div
          data-reserve-glow
          className="pointer-events-none absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50"
          style={{
            background:
              "radial-gradient(circle, rgba(217,181,124,0.16) 0%, rgba(240,131,108,0.06) 45%, transparent 70%)",
          }}
        />

        <div data-reserve-inner className="relative z-10 text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.5em] text-gold">
            Reservations
          </p>
          <h2 className="mt-6 font-display text-5xl font-light leading-[1.05] text-cream md:text-8xl">
            Twenty seats.
            <br />
            <em className="text-gold">One</em> evening.
          </h2>
          <p className="mx-auto mt-8 max-w-md text-sm leading-relaxed text-cream-dim md:text-base">
            Two seatings nightly, 18:00 and 21:00. The counter books out roughly
            six weeks ahead — the river waits for no one.
          </p>

          <div className="mt-14 flex justify-center">
            <a
              ref={btnRef}
              href="#"
              onClick={(e) => e.preventDefault()}
              className="glass group relative inline-flex items-center gap-4 rounded-full px-10 py-5 will-change-transform"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-cream transition-colors duration-300 group-hover:text-gold">
                Reserve your seat
              </span>
              <span className="font-jp text-lg text-gold transition-transform duration-500 group-hover:translate-x-1.5">
                →
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* footer */}
      <footer className="relative border-t border-cream/5">
        <div className="mx-auto grid max-w-[1600px] gap-10 px-6 py-14 md:grid-cols-4 md:px-14">
          <div>
            <p className="font-display text-2xl tracking-[0.18em] text-cream">
              ENSŌ <span className="font-jp text-sm text-gold">円相</span>
            </p>
            <p className="mt-3 text-xs leading-relaxed text-cream-dim">
              A sushi atelier.
              <br />
              Omakase as cinema.
            </p>
          </div>
          <div>
            <p className="mb-4 text-[10px] uppercase tracking-[0.3em] text-cream-dim">
              Find us
            </p>
            <p className="text-sm leading-relaxed text-cream/70">
              12 Yaroslaviv Val St.
              <br />
              Kyiv, Ukraine
            </p>
          </div>
          <div>
            <p className="mb-4 text-[10px] uppercase tracking-[0.3em] text-cream-dim">
              Hours
            </p>
            <p className="text-sm leading-relaxed text-cream/70">
              Tue — Sun
              <br />
              18:00 &amp; 21:00 seatings
            </p>
          </div>
          <div>
            <p className="mb-4 text-[10px] uppercase tracking-[0.3em] text-cream-dim">
              Follow
            </p>
            <div className="flex flex-col gap-2 text-sm text-cream/70">
              <a href="#" onClick={(e) => e.preventDefault()} className="w-fit transition-colors hover:text-gold">Instagram</a>
              <a href="#" onClick={(e) => e.preventDefault()} className="w-fit transition-colors hover:text-gold">Telegram</a>
            </div>
          </div>
        </div>
        <div className="border-t border-cream/5 py-5 text-center text-[10px] uppercase tracking-[0.3em] text-cream-dim/60">
          © {new Date().getFullYear()} Ensō Sushi Atelier — crafted like nigiri: by hand
        </div>
      </footer>
    </section>
  );
}

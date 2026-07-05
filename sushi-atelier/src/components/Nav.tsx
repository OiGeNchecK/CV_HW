"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const LINKS = [
  { href: "#philosophy", label: "Philosophy" },
  { href: "#journey", label: "The Journey" },
  { href: "#craft", label: "Craft" },
  { href: "#menu", label: "Menu" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (!el) return;
    if (window.__lenis) {
      window.__lenis.scrollTo(el as HTMLElement, { duration: 1.6 });
    } else {
      (el as HTMLElement).scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 2.2, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-[100]"
    >
      <div
        className={`mx-auto flex max-w-[1600px] items-center justify-between px-6 py-4 transition-all duration-700 md:px-10 ${
          scrolled ? "md:py-3" : "md:py-6"
        }`}
      >
        <a
          href="#top"
          onClick={(e) => go(e, "#top")}
          className="group flex items-baseline gap-2"
        >
          <span className="font-display text-2xl tracking-[0.18em] text-cream">
            ENSŌ
          </span>
          <span className="font-jp text-xs text-gold/80 transition-colors group-hover:text-gold">
            円相
          </span>
        </a>

        <nav
          className={`hidden items-center gap-1 rounded-full px-2 py-1.5 transition-all duration-700 md:flex ${
            scrolled ? "glass" : ""
          }`}
        >
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => go(e, l.href)}
              className="rounded-full px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-cream-dim transition-colors duration-300 hover:text-cream"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#reserve"
          onClick={(e) => go(e, "#reserve")}
          className="glass rounded-full px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold transition-colors duration-300 hover:text-cream"
        >
          Reserve
        </a>
      </div>
    </motion.header>
  );
}

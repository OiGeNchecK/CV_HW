"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/** Cinematic intro: an ensō circle draws itself, then the curtain lifts. */
export default function Loader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    const t = setTimeout(() => {
      setDone(true);
      document.documentElement.style.overflow = "";
    }, 2100);
    return () => {
      clearTimeout(t);
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[300] flex items-center justify-center bg-ink"
          exit={{ y: "-100%" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="relative flex flex-col items-center gap-6">
            <svg viewBox="0 0 200 200" className="h-28 w-28 text-gold">
              <motion.path
                d="M154 55 A 72 72 0 1 0 168 118"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0.4 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
              />
            </svg>
            <motion.p
              initial={{ opacity: 0, letterSpacing: "0.6em" }}
              animate={{ opacity: 1, letterSpacing: "0.35em" }}
              transition={{ duration: 1.2, delay: 0.4 }}
              className="text-[11px] font-medium uppercase text-cream-dim"
            >
              Sushi Atelier
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

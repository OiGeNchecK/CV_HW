"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

const ITEMS = [
  { name: "Chūtoro", jp: "中とろ", note: "medium-fatty bluefin, 11-day age", price: "₴ 420" },
  { name: "Uni", jp: "雲丹", note: "Hokkaidō sea urchin, cold strait", price: "₴ 560" },
  { name: "Anago", jp: "穴子", note: "sea eel, warm, brushed with tsume", price: "₴ 340" },
  { name: "Hotate", jp: "帆立", note: "scallop, yuzu zest, sea salt", price: "₴ 300" },
  { name: "A5 Wagyu", jp: "和牛", note: "seared over binchōtan, one slice", price: "₴ 640" },
  { name: "Tamago", jp: "玉子", note: "the chef's signature — dessert as proof", price: "₴ 180" },
];

const rowVariants = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function Menu() {
  const ref = useRef<HTMLElement>(null);

  return (
    <section id="menu" ref={ref} className="relative bg-ink py-32 md:py-44">
      <div className="mx-auto max-w-5xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 flex items-end justify-between"
        >
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.5em] text-gold">
              Beyond the Omakase
            </p>
            <h2 className="mt-3 font-display text-4xl font-light text-cream md:text-6xl">
              A la carte, after midnight
            </h2>
          </div>
          <span className="hidden font-jp text-5xl font-extralight text-cream/10 md:block">
            品書
          </span>
        </motion.div>

        <div>
          {ITEMS.map((item, i) => (
            <motion.div
              key={item.name}
              custom={i}
              variants={rowVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-10%" }}
              data-hover
              className="group flex items-baseline justify-between gap-6 border-t border-cream/10 py-7 transition-colors duration-500 last:border-b hover:border-gold/40 md:py-8"
            >
              <div className="flex min-w-0 items-baseline gap-4 md:gap-8">
                <span className="font-jp text-sm text-cream/30 transition-colors duration-500 group-hover:text-gold md:text-lg">
                  {item.jp}
                </span>
                <h3 className="font-display text-2xl font-light text-cream transition-transform duration-500 group-hover:translate-x-2 md:text-4xl">
                  {item.name}
                </h3>
                <span className="hidden truncate text-sm text-cream-dim opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:inline">
                  {item.note}
                </span>
              </div>
              <span className="shrink-0 font-display text-xl text-gold/70 transition-colors duration-500 group-hover:text-gold md:text-2xl">
                {item.price}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

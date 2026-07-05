# ENSŌ — Sushi Atelier

A cinematic scrollytelling website for a fictional omakase sushi atelier,
inspired by [atelier-of-taste.de](https://atelier-of-taste.de/).
Dark, premium, Apple-keynote pacing — the page is an interactive movie
driven by the user's scroll.

## Experience

- **Loader** — an ensō circle draws itself, then the curtain lifts
- **Hero** — WebGL (Three.js) gold-dust particle field, giant kanji parallax,
  3D letter-by-letter title reveal, scroll-scrubbed cinematic exit
- **Philosophy** — pinned section; three statements (shun / shokunin / ensō)
  blur-fade in and out as you scroll, each with its own kanji backdrop
- **The Omakase Journey** — pinned horizontal scroll through six courses in
  glassmorphism cards with hand-drawn SVG sushi art (vertical stack on mobile)
- **The Craft** — pinned "bloom" reveal: a small card scales open into a
  full-bleed frame (animated `clip-path`), rotating ensō, cycling discipline steps
- **The Chef** — quote revealed word-by-word on scrub, 3D-tilt portrait card
- **Menu** — staggered a-la-carte rows with hover micro-interactions
- **Reserve** — marquee, scroll-scrubbed CTA, magnetic button, footer

Plus: custom cursor (dot + easing ring), film grain, vignette, smooth
scrolling everywhere, `prefers-reduced-motion` respected.

## Stack

- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS v4
- GSAP + ScrollTrigger — pinning, scrubbing, horizontal scroll, matchMedia
- Lenis — smooth scrolling, driven by the GSAP ticker
- Framer Motion — entrance choreography, loader, in-view reveals
- Three.js — hero particle field (pauses off-screen via IntersectionObserver)

All artwork is hand-written inline SVG — zero external assets.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

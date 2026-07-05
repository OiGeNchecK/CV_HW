# Verify: ENSŌ sushi scrollytelling site

## Build & launch

```bash
cd sushi-atelier
npm install
npm run build
npm run start -- -p 3111   # prod server; curl -s -o /dev/null -w "%{http_code}" http://localhost:3111 → 200
```

## Drive (Playwright, headless Chromium)

Chromium is preinstalled at `/opt/pw-browsers/chromium-*/chrome-linux/chrome`;
install only `playwright-core` (never `playwright install`). Launch with
`--no-sandbox --use-gl=swiftshader --enable-webgl` so the Three.js hero renders.

Gotchas that matter for this page:

- Wait ~3.5s after `goto` — the loader curtain runs ~2.1s and hero letters
  animate in after it.
- ScrollTrigger pins inflate the page to ~16000px at 1440×900. Scroll in small
  steps (120px / 8ms) once through the whole page first so scrubbed timelines
  have fired, then jump to positions for screenshots.
- Pinned sections (Philosophy, Journey, Craft) show different content at
  different scroll depths — screenshot at several y offsets, not just section top.
- Check: nav anchor click (`a[href="#menu"]`) must change `window.scrollY`
  (Lenis scrollTo path); mobile viewport (390×844) must have zero horizontal
  overflow (`scrollWidth - innerWidth === 0`) and Journey falls back to a
  vertical card stack.
- Collect `console` errors and `pageerror` — the page should produce none.

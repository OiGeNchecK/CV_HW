(function () {
  "use strict";
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  gsap.registerPlugin(ScrollTrigger);

  /* Lenis — native-feel on touch, smooth on wheel */
  var lenis = null;
  if (!reduced && typeof Lenis !== "undefined") {
    lenis = new Lenis({ lerp: 0.1, smoothWheel: true, syncTouch: false });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
    gsap.ticker.lagSmoothing(0);
  }

  /* loader + hero intro */
  var loader = $("#loader"), lpath = $("#loader-path");
  var heroLines = $$("#hero h1 .line > span");

  if (reduced) {
    loader.remove();
    gsap.set(heroLines, { y: 0 });
    gsap.set(["#hero-mark", "#hero-tag", "#hero-loc", "#hero-cue", "#bar"], { opacity: 1 });
  } else {
    var plen = lpath.getTotalLength();
    lpath.style.strokeDasharray = plen;
    lpath.style.strokeDashoffset = plen;
    document.documentElement.style.overflow = "hidden";

    gsap.timeline()
      .to(lpath, { strokeDashoffset: 0, duration: 1.1, ease: "power2.inOut" }, 0)
      .to("#loader p", { opacity: 1, letterSpacing: "0.34em", duration: 0.9 }, 0.3)
      .to(loader, {
        yPercent: -100, duration: 0.85, ease: "power4.inOut",
        onStart: function () { document.documentElement.style.overflow = ""; },
        onComplete: function () { loader.remove(); }
      }, 1.4)
      .to("#hero-mark", { opacity: 1, duration: 0.8 }, 1.65)
      .to(heroLines, { y: 0, duration: 1.1, stagger: 0.12, ease: "power4.out" }, 1.7)
      .to("#hero-tag", { opacity: 1, duration: 0.9 }, 2.25)
      .to("#hero-loc", { opacity: 1, duration: 0.9 }, 2.45)
      .to("#bar", { opacity: 1, duration: 0.9 }, 2.5)
      .to("#hero-cue", { opacity: 1, duration: 0.9 }, 2.75);
  }

  /* top bar backdrop after hero */
  var bar = $("#bar");
  function onScrollBar() {
    bar.classList.toggle("scrolled", window.scrollY > window.innerHeight * 0.7);
  }
  window.addEventListener("scroll", onScrollBar, { passive: true });
  onScrollBar();

  /* hero scrub-out + parallax */
  gsap.to("#hero h1, #hero-tag, #hero-loc, #hero-mark", {
    yPercent: -40, opacity: 0, ease: "none",
    scrollTrigger: { trigger: "#hero", start: "top top", end: "80% top", scrub: true }
  });
  gsap.to("#hero-glow", {
    yPercent: 26, scale: 1.35, ease: "none",
    scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: true }
  });

  /* hero particles (canvas 2D) */
  (function () {
    if (reduced) return;
    var wrap = $("#hero-canvas");
    var canvas = document.createElement("canvas");
    wrap.appendChild(canvas);
    var ctx = canvas.getContext("2d");
    var dpr = Math.min(window.devicePixelRatio || 1, 2), W = 0, H = 0;
    function resize() {
      W = wrap.clientWidth; H = wrap.clientHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);
    var parts = [];
    function layer(n, rMin, rMax, c, alpha, d) {
      for (var i = 0; i < n; i++) parts.push({
        x: Math.random(), y: Math.random(),
        r: rMin + Math.random() * (rMax - rMin),
        a: alpha * (0.4 + Math.random() * 0.6),
        v: 0.00013 + Math.random() * 0.0004,
        dr: (Math.random() - 0.5) * 0.00008,
        tw: Math.random() * 6.283, c: c, d: d
      });
    }
    layer(140, 0.6, 1.5, "217,181,124", 0.75, 1);
    layer(36, 1.6, 2.8, "240,131,108", 0.4, 1.7);
    var running = true, raf = 0, t = 0;
    function tick() {
      if (!running) return;
      raf = requestAnimationFrame(tick);
      t += 0.016;
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = "lighter";
      var sc = window.scrollY / Math.max(window.innerHeight, 1);
      for (var i = 0; i < parts.length; i++) {
        var p = parts[i];
        p.y -= p.v; p.x += p.dr;
        if (p.y < -0.05) p.y = 1.05;
        if (p.x < -0.05) p.x = 1.05; else if (p.x > 1.05) p.x = -0.05;
        var a = p.a * (0.65 + 0.35 * Math.sin(t * 1.4 + p.tw));
        ctx.beginPath();
        ctx.fillStyle = "rgba(" + p.c + "," + a.toFixed(3) + ")";
        ctx.arc(p.x * W, (p.y + sc * 0.2 * p.d) * H, p.r, 0, 6.2832);
        ctx.fill();
      }
    }
    tick();
    new IntersectionObserver(function (e) {
      var vis = e[0].isIntersecting;
      if (vis && !running) { running = true; tick(); }
      else if (!vis && running) { running = false; cancelAnimationFrame(raf); }
    }).observe(wrap);
  })();

  /* intro statement reveal */
  gsap.fromTo("#intro p.big", { opacity: 0, y: 40, filter: "blur(8px)" }, {
    opacity: 1, y: 0, filter: "blur(0px)", ease: "none",
    scrollTrigger: { trigger: "#intro", start: "top 80%", end: "top 40%", scrub: true }
  });

  /* deck head */
  gsap.fromTo("#deck-head", { opacity: 0, y: 40 }, {
    opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
    scrollTrigger: { trigger: "#deck-head", start: "top 85%", once: true }
  });

  /* signature deck: each next panel covers the previous; previous shrinks+dims */
  var panels = $$(".deck-panel");
  panels.forEach(function (panel, i) {
    var inner = $(".deck-inner", panel);
    // entrance of the panel's own content
    gsap.fromTo([$(".deck-art", panel), $(".deck-name", panel), $(".deck-desc", panel), $(".deck-price", panel)],
      { opacity: 0, y: 46 },
      {
        opacity: 1, y: 0, stagger: 0.07, ease: "none",
        scrollTrigger: { trigger: panel, start: "top 70%", end: "top 12%", scrub: true }
      });
    // shrink when the next panel slides over
    if (i < panels.length - 1) {
      gsap.to(inner, {
        scale: 0.9, opacity: 0.25, filter: "blur(4px)", ease: "none",
        scrollTrigger: { trigger: panels[i + 1], start: "top bottom", end: "top top", scrub: true }
      });
    }
    // slow rotation of the roll art while panel is in view
    gsap.fromTo($(".deck-art svg", panel), { rotate: -7 }, {
      rotate: 7, ease: "none",
      scrollTrigger: { trigger: panel, start: "top bottom", end: "bottom top", scrub: true }
    });
  });

  /* dragons */
  gsap.fromTo("#dragons .hd", { opacity: 0, y: 40 }, {
    opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
    scrollTrigger: { trigger: "#dragons", start: "top 78%", once: true }
  });
  $$(".dragon").forEach(function (card, i) {
    gsap.fromTo(card, { opacity: 0, y: 60 }, {
      opacity: 1, y: 0, duration: 0.9, delay: i * 0.12, ease: "power3.out",
      scrollTrigger: { trigger: "#drag-rail", start: "top 85%", once: true }
    });
  });

  /* maki rows */
  $$(".mrow").forEach(function (row) {
    gsap.fromTo(row, { opacity: 0, x: -28 }, {
      opacity: 1, x: 0, duration: 0.7, ease: "power3.out",
      scrollTrigger: { trigger: row, start: "top 92%", once: true }
    });
  });

  /* info cards */
  $$(".icard").forEach(function (c, i) {
    gsap.fromTo(c, { opacity: 0, y: 40 }, {
      opacity: 1, y: 0, duration: 0.8, delay: i * 0.08, ease: "power3.out",
      scrollTrigger: { trigger: c, start: "top 92%", once: true }
    });
  });

  /* cta */
  gsap.fromTo("#cta h2, #cta .sub, #cta-btn, #cta .links", { opacity: 0, y: 50 }, {
    opacity: 1, y: 0, stagger: 0.1, ease: "none",
    scrollTrigger: { trigger: "#cta", start: "top 75%", end: "top 30%", scrub: true }
  });
  gsap.to("#cta-glow", {
    scale: 1.35, opacity: 0.85, ease: "none",
    scrollTrigger: { trigger: "#cta", start: "top bottom", end: "bottom bottom", scrub: true }
  });
})();

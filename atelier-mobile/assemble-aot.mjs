import { readFileSync, writeFileSync } from "fs";

const dir = "/tmp/claude-0/-home-user-CV-HW/1d2b0a04-7288-50e7-b2ce-ee8dd8e86720/scratchpad/";
const nm = "/home/user/CV_HW/sushi-atelier/node_modules/";

let html = readFileSync(dir + "aot-src.html", "utf8");
const clean = (s) => s.replace(/\/\/#\s*sourceMappingURL=.*$/gm, "");

html = html
  .replace("/*__FONTS__*/", () => readFileSync(dir + "fonts.css", "utf8"))
  .replace("/*__GSAP__*/", () => clean(readFileSync(nm + "gsap/dist/gsap.min.js", "utf8")))
  .replace("/*__SCROLLTRIGGER__*/", () => clean(readFileSync(nm + "gsap/dist/ScrollTrigger.min.js", "utf8")))
  .replace("/*__LENIS__*/", () => clean(readFileSync(nm + "lenis/dist/lenis.min.js", "utf8")))
  .replace("/*__APP__*/", () => readFileSync(dir + "aot-app.js", "utf8"));

writeFileSync(dir + "atelier-of-taste-mobile.html", html);
console.log("assembled:", (html.length / 1024).toFixed(0) + "KB");

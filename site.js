/* ===== EDIT YOUR LINKS HERE =====
   Paste a URL between the quotes. Empty = the button shows "Coming soon". */
const LINKS = {
  calendly:           "https://calendly.com/edwardjohn-gt/discoverycall",   // your Calendly link, e.g. https://calendly.com/your-name/30min
  productivityGuide:  "",   // 9-to-5 Productivity Guide
  communicationGuide: "",   // Communication Workout guide
  figureItOutLoud:    "https://figureitoutloud.netlify.app",
  kingsClub:          "https://www.danmartell.com/kingsclub/#eventlist"
};

document.querySelectorAll("[data-link]").forEach(a => {
  const url = LINKS[a.dataset.link];
  if (url) {
    a.href = url; a.target = "_blank"; a.rel = "noopener";
  } else {
    a.removeAttribute("href");
    a.setAttribute("aria-disabled", "true");
    a.title = "Link coming soon";
    if (a.dataset.link !== "calendly") a.textContent = "Coming soon";
  }
});

/* Resource video previews: show a labelled placeholder until the video file exists */
document.querySelectorAll(".card-media video").forEach(v => {
  const miss = () => v.parentNode.classList.add("empty");
  v.addEventListener("error", miss);
  if (v.error || v.networkState === 3) miss();
});

/* Time-lapse countdown: runs from the full time to 00:00 across one loop of the video, so it matches the clip's pace */
document.querySelectorAll(".card-media[data-countdown]").forEach(box => {
  const v = box.querySelector("video"), out = box.querySelector(".timer b");
  const total = +box.dataset.countdown;
  if (!v || !out) return;
  const tick = () => {
    if (v.duration) {
      const left = Math.max(0, Math.round(total * (1 - v.currentTime / v.duration)));
      out.textContent = String(Math.floor(left / 60)).padStart(2, "0") + ":" + String(left % 60).padStart(2, "0");
    }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
});

/* Highlight the current page in the nav */
const here = (location.pathname.split("/").pop() || "index.html").replace(".html", "") || "index";
document.querySelectorAll(".nav-links a[data-page]").forEach(a => {
  if (a.dataset.page === here) a.setAttribute("aria-current", "page");
});

/* Gallery tiles: show a labelled placeholder until the image file exists */
document.querySelectorAll(".tile img").forEach(img => {
  const miss = () => { img.parentNode.classList.add("empty"); img.remove(); };
  if (img.complete && img.naturalWidth === 0) miss(); else img.addEventListener("error", miss);
});

/* Live Instagram stats from /api/stats (Vercel). Falls back to the numbers already on the page. */
(async () => {
  const el = document.getElementById("ig-followers");
  if (!el) return;
  try {
    const r = await fetch("/api/stats", { headers: { accept: "application/json" } });
    if (!r.ok) return;
    const d = await r.json();
    const fmt = n => n >= 1e6 ? (n / 1e6).toFixed(1).replace(/\.0$/, "") + "M"
                  : n >= 1e3 ? (n / 1e3).toFixed(1).replace(/\.0$/, "") + "K" : String(n);
    const ig = (d && d.instagram) || {};
    if (ig.followers != null) { el.textContent = fmt(ig.followers); document.getElementById("ig-live").hidden = false; }
  } catch (e) { /* keep fallback */ }
})();

"use client";

import { useEffect } from "react";

// Every interactive detail on the page, wired once after hydration. The page renders and reads fine without it.
export default function Enhance() {
  useEffect(() => {
    const ac = new AbortController();
    const on = <K extends keyof HTMLElementEventMap>(el: EventTarget | null, type: K | string, fn: (e: Event) => void, opts: AddEventListenerOptions = {}) =>
      el?.addEventListener(type, fn, { ...opts, signal: ac.signal });
    const $ = <T extends Element = HTMLElement>(s: string, root: ParentNode = document) => root.querySelector<T & Element>(s) as T | null;
    const $$ = <T extends Element = HTMLElement>(s: string, root: ParentNode = document) => Array.from(root.querySelectorAll(s)) as T[];
    const observers: IntersectionObserver[] = [];
    const timers: number[] = [];
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hasIO = "IntersectionObserver" in window;

    const play = (el: Element) => {
      el.classList.remove("play");
      void (el as HTMLElement).offsetWidth;
      el.classList.remove("pre");
      el.classList.add("play");
    };

    // Plates, the route and the ledger draw themselves the first time they scroll into view.
    if (!reduce && hasIO) {
      const io = new IntersectionObserver((es) => es.forEach((e) => {
        if (e.isIntersecting) { play(e.target); io.unobserve(e.target); }
      }), { threshold: 0.3 });
      observers.push(io);
      $$(".work .plate,.tl,.lg-svg").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.height && r.top > innerHeight * 0.7) { el.classList.add("pre"); io.observe(el); }
      });
    }
    // Opening a system replays its plate.
    $$<HTMLDetailsElement>(".work").forEach((d) => on(d, "toggle", () => {
      if (!d.open || reduce) return;
      const p = $(".plate", d);
      if (p && !p.classList.contains("pre")) play(p);
    }));

    // Point at a stop and the caption says what it does.
    $$(".work .plate").forEach((plate) => {
      const cap = $(".cap", plate), live = $(".cap-live", plate), strip = $(".strip", plate);
      if (!cap || !live || !strip) return;
      const show = (e: Event) => {
        const b = (e.target as Element).closest(".stop");
        if (!b) return;
        const t = document.createElement("span");
        t.className = "it";
        t.textContent = $(".lab", b)?.textContent + ". ";
        live.replaceChildren(t, $(".note", b)?.textContent ?? "");
        cap.classList.add("live");
      };
      const hide = () => cap.classList.remove("live");
      on(strip, "pointerover", show);
      on(strip, "focusin", show);
      on(strip, "pointerleave", hide);
      on(strip, "focusout", hide);
    });

    // On narrow screens the route opens at the 2024 junction, and the ledger at this week.
    const pan = $(".route .pan");
    const routeSvg = pan?.querySelector("svg");
    if (pan && routeSvg && pan.scrollWidth > pan.clientWidth + 4) pan.scrollLeft = routeSvg.clientWidth * Number(pan.dataset.focus || 0);
    const lpan = $(".lg-pan");
    if (lpan) lpan.scrollLeft = lpan.scrollWidth;

    // The "today" marker pings only while the route is on screen.
    const tl = $(".tl");
    if (tl && !reduce && hasIO) {
      const io = new IntersectionObserver((es) => tl.classList.toggle("live", es[0].isIntersecting));
      io.observe(tl);
      observers.push(io);
    }

    // Hovering a role lights its stretch of the route, and the other way round.
    const exp = $(".exp");
    if (exp && tl) {
      const segs = $$("[data-seg]", tl), rows = $$(".job[data-seg]");
      const hl = (k: string | null) => {
        segs.forEach((g) => g.classList.toggle("on", !!k && ` ${g.getAttribute("data-seg")} `.includes(` ${k} `)));
        rows.forEach((r) => r.classList.toggle("on", r.dataset.seg === k));
        exp.classList.toggle("dim", !!k);
      };
      rows.forEach((r) => { on(r, "mouseenter", () => hl(r.dataset.seg ?? null)); on(r, "mouseleave", () => hl(null)); });
      segs.forEach((g) => {
        const k = (g.getAttribute("data-seg") ?? "").split(" ")[0];
        on(g, "mouseenter", () => hl(k));
        on(g, "mouseleave", () => hl(null));
      });
    }

    // Underline the section in view.
    const links: Record<string, HTMLElement> = {};
    $$(".nav a").forEach((a) => { links[(a.getAttribute("href") ?? "").slice(1)] = a; });
    if (hasIO) {
      const io = new IntersectionObserver((es) => es.forEach((e) => {
        if (!e.isIntersecting) return;
        Object.values(links).forEach((a) => a.removeAttribute("aria-current"));
        links[e.target.id]?.setAttribute("aria-current", "location");
      }), { rootMargin: "-45% 0px -50% 0px" });
      $$("main > section").forEach((s) => io.observe(s));
      observers.push(io);
    }

    // A stop rides the header rule as you read down the page.
    const trk = $(".trk"), dot = trk && $("i", trk);
    let raf = 0;
    const ride = () => {
      raf = 0;
      if (!trk || !dot) return;
      const max = document.documentElement.scrollHeight - innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0;
      dot.style.setProperty("--x", `${(p * (trk.clientWidth - 7)).toFixed(1)}px`);
      trk.classList.toggle("on", scrollY > 40);
    };
    const queue = () => { if (!raf) raf = requestAnimationFrame(ride); };
    on(window, "scroll", queue, { passive: true });
    on(window, "resize", queue);
    ride();

    // Toast, copy email, local time.
    const toast = $("#toast");
    let tt = 0;
    const say = (msg: string) => {
      if (!toast) return;
      toast.textContent = msg;
      toast.hidden = false;
      clearTimeout(tt);
      tt = window.setTimeout(() => { toast.hidden = true; }, 3400);
    };
    const mail = $("#mail");
    on($("#copy"), "click", () => {
      if (!mail) return;
      const text = (mail.getAttribute("href") ?? "").replace("mailto:", "");
      const pick = () => {
        const r = document.createRange();
        r.selectNodeContents(mail);
        const s = getSelection();
        s?.removeAllRanges();
        s?.addRange(r);
        say("Email selected. Press Ctrl+C or Cmd+C to copy it.");
      };
      if (navigator.clipboard?.writeText) navigator.clipboard.writeText(text).then(() => say(`Email copied: ${text}`), pick);
      else pick();
    });
    const clock = $("#clock");
    if (clock) {
      const fmt = new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", hour: "numeric", minute: "2-digit", hour12: true });
      const tick = () => { clock.textContent = `It’s ${fmt.format(new Date()).replace(/\s*([ap])\.?m\.?/i, (_, x) => ` ${x.toLowerCase()}m`)} in New Delhi.`; };
      tick();
      timers.push(window.setInterval(tick, 30000));
    }

    // The form posts to Web3Forms in the background and says what happened.
    const form = $<HTMLFormElement>("#msg"), note = $("#form-note");
    on(form, "submit", async (e) => {
      if (!form || !note) return;
      e.preventDefault();
      const btn = $<HTMLButtonElement>(".send", form);
      if (btn) btn.disabled = true;
      note.textContent = "Sending…";
      try {
        const res = await fetch(form.action, { method: "POST", headers: { Accept: "application/json" }, body: new FormData(form) });
        const j = (await res.json().catch(() => ({}))) as { success?: boolean; message?: string };
        if (res.ok && j.success) {
          form.reset();
          note.textContent = "Sent. I’ll reply by email.";
        } else {
          note.textContent = `That didn’t send${j.message ? ` (${j.message})` : ""}. Please email me instead.`;
        }
      } catch {
        note.textContent = "That didn’t send because the network failed. Please email me instead.";
      } finally {
        if (btn) btn.disabled = false;
      }
    });

    // The GitHub ledger names the day under the pointer.
    const svg = $<SVGSVGElement>(".lg-svg");
    const lfig = svg?.closest(".lg-fig"), tip = lfig && $(".tip", lfig);
    if (svg && lfig && tip) {
      const counts = (svg.dataset.counts ?? "").split(",").map(Number);
      const start = Date.parse(`${svg.dataset.start}T00:00:00Z`);
      const rects = $$("rect", svg);
      const dfmt = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
      on(svg, "pointerover", (e) => {
        const r = e.target as Element;
        const i = rects.indexOf(r as HTMLElement);
        if (i < 0) return;
        const n = counts[i] ?? 0;
        tip.textContent = `${n === 0 ? "No" : n} contribution${n === 1 ? "" : "s"} on ${dfmt.format(new Date(start + i * 864e5))}`;
        tip.hidden = false;
        const fb = lfig.getBoundingClientRect(), rb = r.getBoundingClientRect(), w = tip.offsetWidth;
        const x = Math.min(Math.max(rb.left - fb.left + rb.width / 2, w / 2), fb.width - w / 2);
        tip.style.left = `${x}px`;
        tip.style.top = `${rb.top - fb.top}px`;
      });
      on(svg, "pointerleave", () => { tip.hidden = true; });
    }

    return () => {
      ac.abort();
      observers.forEach((o) => o.disconnect());
      timers.forEach((t) => { clearTimeout(t); clearInterval(t); });
      cancelAnimationFrame(raf);
      clearTimeout(tt);
    };
  }, []);

  return null;
}

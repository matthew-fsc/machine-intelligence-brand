/* peplomer. Minimal vanilla JS, no dependencies.
   Four small behaviours: hero cycler, research filter, toc scrollspy, reveals. */
(function () {
  "use strict";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* -- 1. Hero correspondence cycler ------------------------------------- */
  var corr = document.querySelector("[data-corr]");
  if (corr) {
    // Real correspondences drawn from the five essays. Fidelity is honest.
    var pairs = [
      { bio: "predictive processing", comp: "next-token prediction", fid: "analogy",   note: "both minimise a prediction error, but for different reasons" },
      { bio: "dopaminergic RPE",      comp: "temporal-difference error", fid: "mechanism", note: "the algorithm matches; the objective does not" },
      { bio: "hippocampal replay",    comp: "trajectory distillation",  fid: "analogy",   note: "offline reuse of experience, without reconsolidation" },
      { bio: "System 2 control",      comp: "chain-of-thought trace",   fid: "metaphor",  note: "the trace is not a separate deliberative system" },
      { bio: "anchoring effect",      comp: "position bias",            fid: "metaphor",  note: "similar surface, almost certainly unrelated causes" }
    ];
    var bioEl  = corr.querySelector("[data-corr-bio]");
    var compEl = corr.querySelector("[data-corr-comp]");
    var pairEl = corr.querySelector("[data-corr-note]");
    var fidEl  = corr.querySelector("[data-corr-fid]");
    var i = 0;
    function fidClass(f) { return "fidelity fidelity--" + f; }
    function render(p) {
      if (bioEl) bioEl.textContent = p.bio;
      if (compEl) compEl.textContent = p.comp;
      if (pairEl) pairEl.textContent = p.note;
      if (fidEl) { fidEl.textContent = p.fid; fidEl.className = fidClass(p.fid); }
    }
    var bridge = corr.querySelector(".corr__bridge-path");
    function redrawBridge() {
      if (!bridge) return;
      bridge.style.animation = "none";
      // force reflow so the draw animation restarts cleanly on each swap
      void bridge.getBoundingClientRect();
      bridge.style.animation = "";
    }
    render(pairs[0]);
    if (!reduce) {
      setInterval(function () {
        corr.classList.add("is-swapping");
        setTimeout(function () {
          i = (i + 1) % pairs.length;
          render(pairs[i]);
          redrawBridge();
          corr.classList.remove("is-swapping");
        }, 300);
      }, 3600);
    }
  }

  /* -- 2. Research filter: two dimensions, side and depth (AND logic) ------ */
  var filter = document.querySelector("[data-filter]");
  if (filter) {
    var sideButtons = filter.querySelectorAll("button[data-side]");
    var depthButtons = filter.querySelectorAll("button[data-depth]");
    var entries = document.querySelectorAll("[data-entry]");
    var groups = document.querySelectorAll("[data-group]");
    var empty = document.querySelector("[data-empty]");
    var state = { side: "all", depth: "all" };
    function apply() {
      var shown = 0;
      entries.forEach(function (el) {
        var okSide = state.side === "all" || el.getAttribute("data-side") === state.side;
        var okDepth = state.depth === "all" || el.getAttribute("data-depth") === state.depth;
        var match = okSide && okDepth;
        el.hidden = !match;
        if (match) shown++;
      });
      sideButtons.forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-side") === state.side)); });
      depthButtons.forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-depth") === state.depth)); });
      // hide a group subhead when it has no visible entries under it
      groups.forEach(function (h) {
        var d = h.getAttribute("data-group");
        var any = Array.prototype.some.call(entries, function (el) {
          return !el.hidden && el.getAttribute("data-depth") === d;
        });
        h.hidden = !any;
      });
      if (empty) empty.classList.toggle("on", shown === 0);
    }
    sideButtons.forEach(function (b) {
      b.addEventListener("click", function () { state.side = b.getAttribute("data-side"); apply(); });
    });
    depthButtons.forEach(function (b) {
      b.addEventListener("click", function () { state.depth = b.getAttribute("data-depth"); apply(); });
    });
    apply();
  }

  /* -- 3. TOC scrollspy --------------------------------------------------- */
  var toc = document.querySelector("[data-toc]");
  if (toc && "IntersectionObserver" in window) {
    var links = {};
    toc.querySelectorAll("a[href^='#']").forEach(function (a) {
      links[a.getAttribute("href").slice(1)] = a;
    });
    var headings = document.querySelectorAll(".prose h2[id]");
    var current = null;
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (e) {
        if (e.isIntersecting) {
          if (current) current.classList.remove("active");
          var link = links[e.target.id];
          if (link) { link.classList.add("active"); current = link; }
        }
      });
    }, { rootMargin: "-15% 0px -70% 0px", threshold: 0 });
    headings.forEach(function (h) { io.observe(h); });
  }

  /* -- 4. Scroll reveals -------------------------------------------------- */
  var reveals = document.querySelectorAll(".reveal");
  if (reveals.length && !reduce && "IntersectionObserver" in window) {
    var ro = new IntersectionObserver(function (ents, obs) {
      ents.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { ro.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }
})();

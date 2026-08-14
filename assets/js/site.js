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

  /* -- 5. Atlas: search + fidelity + side filter -------------------------- */
  var atlas = document.querySelector("[data-atlas]");
  if (atlas) {
    var rows = atlas.querySelectorAll("[data-row]");
    var aSearch = document.querySelector("[data-atlas-search]");
    var aCount = document.querySelector("[data-atlas-count]");
    var aEmpty = document.querySelector("[data-atlas-empty]");
    var fidBtns = document.querySelectorAll("button[data-fid]");
    var sideBtns = document.querySelectorAll("button[data-side]");
    var aState = { q: "", fid: "all", side: "all" };
    function atlasApply() {
      var shown = 0;
      rows.forEach(function (r) {
        var okQ = !aState.q || r.getAttribute("data-text").indexOf(aState.q) !== -1;
        var okF = aState.fid === "all" || r.getAttribute("data-fid") === aState.fid;
        var okS = aState.side === "all" || r.getAttribute("data-side") === aState.side;
        var match = okQ && okF && okS;
        r.hidden = !match;
        if (match) shown++;
      });
      fidBtns.forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-fid") === aState.fid)); });
      sideBtns.forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-side") === aState.side)); });
      if (aCount) aCount.textContent = shown + " of " + rows.length;
      if (aEmpty) aEmpty.classList.toggle("on", shown === 0);
    }
    if (aSearch) aSearch.addEventListener("input", function () { aState.q = aSearch.value.trim().toLowerCase(); atlasApply(); });
    fidBtns.forEach(function (b) { b.addEventListener("click", function () { aState.fid = b.getAttribute("data-fid"); atlasApply(); }); });
    sideBtns.forEach(function (b) { b.addEventListener("click", function () { aState.side = b.getAttribute("data-side"); atlasApply(); }); });
    atlasApply();
  }

  /* -- 6. Search: over an inlined index (works from the filesystem) -------- */
  var searchInput = document.querySelector("[data-search-input]");
  var searchData = document.getElementById("search-data");
  if (searchInput && searchData) {
    var docs = [];
    try { docs = JSON.parse(searchData.textContent); } catch (e) { docs = []; }
    var out = document.querySelector("[data-search-results]");
    var sCount = document.querySelector("[data-search-count]");
    var sEmpty = document.querySelector("[data-search-empty]");
    var depthLabel = { primer: "primer", core: "core", deep: "deep dive" };
    function esc(s) { return s.replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
    function snippet(text, terms) {
      var i = -1;
      for (var t = 0; t < terms.length; t++) { var p = text.indexOf(terms[t]); if (p !== -1 && (i === -1 || p < i)) i = p; }
      if (i === -1) i = 0;
      var start = Math.max(0, i - 60);
      var frag = (start > 0 ? "\u2026" : "") + text.slice(start, start + 200) + "\u2026";
      terms.forEach(function (t) {
        if (!t) return;
        frag = frag.replace(new RegExp("(" + t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "ig"), "\u0001$1\u0002");
      });
      return esc(frag).replace(/\u0001/g, "<mark>").replace(/\u0002/g, "</mark>");
    }
    function runSearch() {
      var q = searchInput.value.trim().toLowerCase();
      if (!q) { out.innerHTML = ""; if (sCount) sCount.textContent = ""; if (sEmpty) sEmpty.classList.remove("on"); return; }
      var terms = q.split(/\s+/).filter(Boolean);
      var scored = [];
      docs.forEach(function (d) {
        var score = 0;
        terms.forEach(function (t) {
          if (d.title.toLowerCase().indexOf(t) !== -1) score += 10;
          var m = d.text.split(t).length - 1;
          score += m;
        });
        if (score > 0) scored.push({ d: d, score: score });
      });
      scored.sort(function (a, b) { return b.score - a.score; });
      if (sCount) sCount.textContent = scored.length + (scored.length === 1 ? " result" : " results");
      if (sEmpty) sEmpty.classList.toggle("on", scored.length === 0);
      out.innerHTML = scored.map(function (s) {
        var d = s.d;
        return '<a class="result" href="' + d.url + '">'
          + '<span class="result__eyebrow"><span>' + esc(d.kicker) + '</span><span>' + d.mins + ' min</span>'
          + '<span class="depth depth--' + d.depth + '"><span class="depth__meter" aria-hidden="true"><i></i><i></i><i></i></span> ' + depthLabel[d.depth] + '</span></span>'
          + '<span class="result__title">' + esc(d.title) + '</span>'
          + '<span class="result__snippet">' + snippet(d.text, terms) + '</span></a>';
      }).join("");
    }
    searchInput.addEventListener("input", runSearch);
    // allow ?q= deep links
    var qp = new URLSearchParams(location.search).get("q");
    if (qp) { searchInput.value = qp; runSearch(); }
  }

  /* -- 7. Glossary filter ------------------------------------------------- */
  var glossaryFilter = document.querySelector("[data-glossary-filter]");
  if (glossaryFilter) {
    var dts = document.querySelectorAll(".glossary dt");
    var gCount = document.querySelector("[data-glossary-count]");
    var gEmpty = document.querySelector("[data-glossary-empty]");
    glossaryFilter.addEventListener("input", function () {
      var q = glossaryFilter.value.trim().toLowerCase();
      var shown = 0;
      dts.forEach(function (dt) {
        var dd = dt.nextElementSibling;
        var text = (dt.textContent + " " + (dd ? dd.textContent : "")).toLowerCase();
        var match = !q || text.indexOf(q) !== -1;
        dt.hidden = !match; if (dd) dd.hidden = !match;
        if (match) shown++;
      });
      if (gCount) gCount.textContent = shown + " term" + (shown === 1 ? "" : "s");
      if (gEmpty) gEmpty.classList.toggle("on", shown === 0);
    });
  }

  /* -- 8. Subscribe guard: no backend wired yet --------------------------- */
  var subForm = document.querySelector("[data-subscribe]");
  if (subForm && subForm.getAttribute("action") === "#") {
    subForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var note = document.querySelector("[data-subscribe-note]");
      if (note) { note.textContent = "Email is not connected yet. Grab the RSS feed above, and this form will work once a provider is wired in."; note.style.color = "var(--red-ink)"; }
    });
  }
})();

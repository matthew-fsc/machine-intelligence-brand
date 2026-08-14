#!/usr/bin/env python3
"""Build the tool pages (atlas, search, glossary, subscribe) and data files
(search-index.json, feed.xml, sitemap.xml, robots.txt) for peplomer."""
import os, re, json, html

ROOT = "/home/user/machine-intelligence-brand"
BASE = "https://matthew-fsc.github.io/machine-intelligence-brand"

MARK = '''<svg class="brand__mark" viewBox="0 0 64 64" aria-hidden="true">
          <g fill="currentColor" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">
            <circle cx="32" cy="32" r="11" fill="none"/><circle cx="32" cy="32" r="4" stroke="none"/>
            <line x1="32" y1="18.5" x2="32" y2="9.1"/><circle cx="32" cy="6" r="2.6" stroke="none"/>
            <line x1="38.75" y1="20.31" x2="43.45" y2="12.17"/><circle cx="45" cy="9.48" r="2.6" stroke="none"/>
            <line x1="43.69" y1="25.25" x2="51.83" y2="20.55"/><circle cx="54.52" cy="19" r="2.6" stroke="none"/>
            <line x1="45.5" y1="32" x2="54.9" y2="32"/><circle cx="58" cy="32" r="2.6" stroke="none"/>
            <line x1="43.69" y1="38.75" x2="51.83" y2="43.45"/><circle cx="54.52" cy="45" r="2.6" stroke="none"/>
            <line x1="38.75" y1="43.69" x2="43.45" y2="51.83"/><circle cx="45" cy="54.52" r="2.6" stroke="none"/>
            <line x1="32" y1="45.5" x2="32" y2="54.9"/><circle cx="32" cy="58" r="2.6" stroke="none"/>
            <line x1="25.25" y1="43.69" x2="20.55" y2="51.83"/><circle cx="19" cy="54.52" r="2.6" stroke="none"/>
            <line x1="20.31" y1="38.75" x2="12.17" y2="43.45"/><circle cx="9.48" cy="45" r="2.6" stroke="none"/>
            <line x1="18.5" y1="32" x2="9.1" y2="32"/><circle cx="6" cy="32" r="2.6" stroke="none"/>
            <line x1="20.31" y1="25.25" x2="12.17" y2="20.55"/><circle cx="9.48" cy="19" r="2.6" stroke="none"/>
            <line x1="25.25" y1="20.31" x2="20.55" y2="12.17"/><circle cx="19" cy="9.48" r="2.6" stroke="none"/>
          </g>
        </svg>'''
FONTS = '<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,340;0,9..144,360;0,9..144,400;0,9..144,500;1,9..144,360&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">'

def masthead(active):
    def cur(name): return ' aria-current="page"' if name == active else ''
    return f'''  <header class="masthead">
    <div class="masthead__row">
      <a class="brand" href="index.html" aria-label="peplomer, home">
        {MARK}
        <span class="wordmark">peplomer</span>
      </a>
      <nav class="nav" aria-label="primary">
        <a href="research/index.html"{cur('research')}>research</a>
        <a href="atlas.html"{cur('atlas')}>atlas</a>
        <a href="search.html"{cur('search')}>search</a>
        <a href="about.html"{cur('about')}>about</a>
      </nav>
    </div>
  </header>'''

FOOTER = f'''  <footer class="site-foot">
    <div class="site-foot__row">
      <div class="site-foot__brand">
        {MARK}
        <p><span class="wordmark" style="font-size:1.2rem;">peplomer</span><br>Research at the seam between behavioral science, neuroscience, and machine learning. The name is a working title, swappable.</p>
      </div>
      <div>
        <h3>read</h3>
        <ul>
          <li><a href="research/index.html">all research</a></li>
          <li><a href="atlas.html">correspondence atlas</a></li>
          <li><a href="glossary.html">glossary</a></li>
          <li><a href="about.html">about the method</a></li>
        </ul>
      </div>
      <div>
        <h3>follow</h3>
        <ul>
          <li><a href="subscribe.html">subscribe</a></li>
          <li><a href="feed.xml">rss feed</a></li>
          <li><a href="search.html">search</a></li>
        </ul>
      </div>
    </div>
    <div class="site-foot__legal">
      <span>© 2026 peplomer. Text set in Fraunces, Newsreader, and IBM Plex Mono.</span>
      <span>Prose licensed CC BY 4.0. No trackers.</span>
    </div>
  </footer>'''

def page(fname, title, desc, active, main_html, og_image="assets/og/default.png"):
    html_doc = f'''<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{title} · peplomer</title>
  <meta name="description" content="{desc}">
  <meta name="color-scheme" content="light">
  <link rel="icon" href="favicon.svg" type="image/svg+xml">
  <link rel="alternate" type="application/rss+xml" title="peplomer" href="feed.xml">
  <meta property="og:type" content="website">
  <meta property="og:title" content="{title} · peplomer">
  <meta property="og:description" content="{desc}">
  <meta property="og:site_name" content="peplomer">
  <meta property="og:image" content="{BASE}/{og_image}">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  {FONTS}
  <link rel="stylesheet" href="assets/css/site.css">
</head>
<body>
  <a class="skip" href="#main">skip to content</a>

{masthead(active)}

  <main id="main">
{main_html}
  </main>

{FOOTER}

  <script src="assets/js/site.js"></script>
</body>
</html>
'''
    with open(os.path.join(ROOT, fname), "w") as f:
        f.write(html_doc)
    print("wrote", fname, len(html_doc), "bytes")

# ---------------------------------------------------------------- page metadata
PAGES = [
    ("research/what-is-peplomer.html", "bridge", "primer", "the bridge · start here", 4),
    ("research/the-three-sides.html", "bridge", "primer", "the bridge · start here", 5),
    ("research/how-to-read-a-correspondence.html", "bridge", "primer", "the bridge · start here", 4),
    ("research/the-predicting-brain.html", "bio", "primer", "biological · the brain", 5),
    ("research/how-a-model-learns.html", "comp", "primer", "computational · the machine", 5),
    ("research/predictive-processing.html", "bio", "core", "biological · predictive coding", 14),
    ("research/dual-process-reasoning.html", "comp", "core", "computational · reasoning traces", 16),
    ("research/consolidation-replay-memory.html", "bio", "core", "biological · memory systems", 15),
    ("research/reward-prediction-error.html", "bridge", "deep", "the bridge · reinforcement learning", 17),
    ("research/framing-anchoring-prompt.html", "comp", "core", "computational · prompt behavior", 13),
]
SIDE_LABEL = {"bio": "biological", "comp": "computational", "bridge": "the bridge"}
DEPTH_LABEL = {"primer": "primer", "core": "core", "deep": "deep dive"}

def strip_tags(s):
    s = re.sub(r"<[^>]+>", " ", s)
    s = html.unescape(s)
    return re.sub(r"\s+", " ", s).strip()

# ---------------------------------------------------------------- search index
def build_search_index():
    items = []
    for url, side, depth, kicker, mins in PAGES:
        raw = open(os.path.join(ROOT, url)).read()
        title = re.search(r"<title>(.*?) · peplomer</title>", raw).group(1)
        desc = re.search(r'<meta name="description" content="(.*?)">', raw).group(1)
        stand = re.search(r'<p class="standfirst">(.*?)</p>', raw, re.S)
        stand = strip_tags(stand.group(1)) if stand else ""
        # body: prefer the prose column
        prose = re.search(r'<div class="prose[^"]*">(.*?)</div>\s*</div>\s*</article>', raw, re.S)
        body = strip_tags(prose.group(1)) if prose else strip_tags(raw)
        text = (title + " " + stand + " " + body).lower()
        items.append({
            "url": url, "title": html.unescape(title), "side": side, "depth": depth,
            "kicker": kicker, "mins": mins,
            "summary": html.unescape(stand or desc),
            "text": text[:6000],
        })
    with open(os.path.join(ROOT, "assets/search-index.json"), "w") as f:
        json.dump(items, f, ensure_ascii=False)
    print("wrote assets/search-index.json:", len(items), "docs")
    return items

# ---------------------------------------------------------------- glossary
def build_glossary():
    pat = re.compile(r'<span class="term"[^>]*>(.*?)<span class="term__def">(.*?)</span>\s*</span>', re.S)
    terms = {}
    for url, side, depth, kicker, mins in PAGES:
        raw = open(os.path.join(ROOT, url)).read()
        title = re.search(r"<title>(.*?) · peplomer</title>", raw).group(1)
        for m in pat.finditer(raw):
            term = strip_tags(m.group(1))
            definition = strip_tags(m.group(2))
            key = term.lower()
            if key not in terms:
                terms[key] = {"term": term, "def": definition, "src": url, "src_title": title, "side": side}
    rows = sorted(terms.values(), key=lambda t: t["term"].lower())
    dl = []
    for t in rows:
        anchor = re.sub(r"[^a-z0-9]+", "-", t["term"].lower()).strip("-")
        dl.append(
            f'          <dt id="{anchor}">{html.escape(t["term"])}</dt>\n'
            f'          <dd>{html.escape(t["def"])}'
            f'<span class="glossary__src">from <a href="{t["src"]}">{html.escape(t["src_title"])}</a></span></dd>'
        )
    body = f'''    <section class="section wrap">
      <div class="section-head">
        <h1 style="font-family:var(--display);font-size:var(--step-h1);font-weight:360;letter-spacing:-.018em;">glossary</h1>
        <p>{len(rows)} key terms · defined once, linked to source</p>
      </div>
      <div class="toolbar">
        <label class="searchbox">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.5" y2="16.5"/></svg>
          <input type="search" data-glossary-filter placeholder="filter terms" aria-label="filter glossary terms">
        </label>
        <span class="result-count" data-glossary-count>{len(rows)} terms</span>
      </div>
      <div class="glossary">
        <dl>
{chr(10).join(dl)}
        </dl>
        <p class="tools-empty" data-glossary-empty>No term matches that. Clear the filter to see all {len(rows)}.</p>
      </div>
    </section>'''
    page("glossary.html", "glossary", f"{len(rows)} key terms from the peplomer essays, each defined once and linked to its source.", "", body)
    return rows

# ---------------------------------------------------------------- atlas
ATLAS = [
    ("bio","Prediction-error minimisation","Cross-entropy / next-token loss","analogy","research/predictive-processing.html","Predictive processing"),
    ("bio","Precision weighting of errors","Self-attention weights","analogy","research/predictive-processing.html","Predictive processing"),
    ("bio","Hierarchical generative model","Learned deep representations","analogy","research/predictive-processing.html","Predictive processing"),
    ("bio","Active inference on the world","Tool use and environment edits","metaphor","research/predictive-processing.html","Predictive processing"),
    ("bio","Free-energy minimisation as an imperative","Loss chosen for differentiability","metaphor","research/predictive-processing.html","Predictive processing"),
    ("comp","System 2, effortful serial reasoning","Chain-of-thought trace","metaphor","research/dual-process-reasoning.html","Dual-process theory"),
    ("comp","Effort allocation / recruitment","Reasoning / token budget","analogy","research/dual-process-reasoning.html","Dual-process theory"),
    ("comp","Metacognitive monitoring","Verbalised self-confidence","metaphor","research/dual-process-reasoning.html","Dual-process theory"),
    ("comp","Metacognitive control","Self-critique / revise loops","analogy","research/dual-process-reasoning.html","Dual-process theory"),
    ("comp","Object level vs meta level split","Separate verifier model","analogy","research/dual-process-reasoning.html","Dual-process theory"),
    ("bio","Hippocampus, fast one-shot store","Context window","analogy","research/consolidation-replay-memory.html","Consolidation and memory"),
    ("bio","Neocortex, slow integrated store","Model weights","analogy","research/consolidation-replay-memory.html","Consolidation and memory"),
    ("bio","Sharp-wave ripple replay","Experience replay / trajectory distillation","mechanism","research/consolidation-replay-memory.html","Consolidation and memory"),
    ("bio","Cued recall","Vector retrieval","metaphor","research/consolidation-replay-memory.html","Consolidation and memory"),
    ("bio","Reconsolidation on retrieval","(no counterpart)","metaphor","research/consolidation-replay-memory.html","Consolidation and memory"),
    ("bridge","Dopaminergic reward prediction error","Temporal-difference error","mechanism","research/reward-prediction-error.html","Reward prediction error"),
    ("bridge","Basal-ganglia actor and value pathways","Actor-critic architecture","mechanism","research/reward-prediction-error.html","Reward prediction error"),
    ("bridge","Innate and homeostatic reward","Learned reward model","metaphor","research/reward-prediction-error.html","Reward prediction error"),
    ("bridge","Incentive misdesign in organisms","Reward hacking / Goodhart","analogy","research/reward-prediction-error.html","Reward prediction error"),
    ("bridge","Approval-seeking behaviour","Trained sycophancy","analogy","research/reward-prediction-error.html","Reward prediction error"),
    ("comp","Framing effects","Prompt / formatting sensitivity","metaphor","research/framing-anchoring-prompt.html","Framing and anchoring"),
    ("comp","Anchoring","Numeric priming in prompts","metaphor","research/framing-anchoring-prompt.html","Framing and anchoring"),
    ("comp","Serial-position (primacy / recency)","Lost-in-the-middle position bias","analogy","research/framing-anchoring-prompt.html","Framing and anchoring"),
    ("comp","Order effects","Few-shot example ordering","analogy","research/framing-anchoring-prompt.html","Framing and anchoring"),
    ("comp","Demand characteristics","Leading eval prompts","analogy","research/framing-anchoring-prompt.html","Framing and anchoring"),
]

def build_atlas():
    rows = []
    for side, neuro, ml, fid, src, srctitle in ATLAS:
        blob = f"{neuro} {ml} {fid} {side} {srctitle}".lower()
        rows.append(f'''          <tr data-row data-side="{side}" data-fid="{fid}" data-text="{html.escape(blob, quote=True)}">
            <td class="c-bio">{html.escape(neuro)}</td>
            <td class="c-comp">{html.escape(ml)}</td>
            <td><span class="fid fid--{fid}">{fid}</span></td>
            <td><span class="atlas__side s-{side}"><i></i> {SIDE_LABEL[side]}</span></td>
            <td><a class="atlas__src" href="{src}#table">{html.escape(srctitle)}</a></td>
          </tr>''')
    counts = {"mechanism":0,"analogy":0,"metaphor":0}
    for r in ATLAS: counts[r[3]]+=1
    body = f'''    <section class="section wrap">
      <div class="section-head">
        <h1 style="font-family:var(--display);font-size:var(--step-h1);font-weight:360;letter-spacing:-.018em;">correspondence atlas</h1>
        <p>{len(ATLAS)} mappings · {counts['mechanism']} mechanism · {counts['analogy']} analogy · {counts['metaphor']} metaphor</p>
      </div>

      <p style="max-width:60ch;color:var(--muted);font-size:1.08rem;line-height:1.55;margin-bottom:2.25rem;">Every brain-to-machine mapping asserted across the essays, in one place. Each row is rated for fidelity and links to the essay that argues it. Search the table, or filter by fidelity and side.</p>

      <div class="filters" role="group" aria-label="filter the atlas">
        <div class="filter-group" style="flex:1 1 22rem;">
          <span class="filter-group__label">search</span>
          <label class="searchbox">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.5" y2="16.5"/></svg>
            <input type="search" data-atlas-search placeholder="e.g. attention, replay, reward" aria-label="search correspondences">
          </label>
        </div>
        <div class="filter-group">
          <span class="filter-group__label">fidelity</span>
          <div class="filter" role="group">
            <button type="button" data-fid="all" aria-pressed="true">all</button>
            <button type="button" data-fid="mechanism" aria-pressed="false">mechanism</button>
            <button type="button" data-fid="analogy" aria-pressed="false">analogy</button>
            <button type="button" data-fid="metaphor" aria-pressed="false">metaphor</button>
          </div>
        </div>
        <div class="filter-group">
          <span class="filter-group__label">side</span>
          <div class="filter" role="group">
            <button type="button" data-side="all" aria-pressed="true">all</button>
            <button type="button" class="f-bio" data-side="bio" aria-pressed="false"><i></i> biological</button>
            <button type="button" class="f-comp" data-side="comp" aria-pressed="false"><i></i> computational</button>
            <button type="button" class="f-bridge" data-side="bridge" aria-pressed="false"><i></i> the bridge</button>
          </div>
        </div>
      </div>

      <div class="toolbar" style="margin-bottom:1rem;">
        <span class="result-count" data-atlas-count>{len(ATLAS)} of {len(ATLAS)}</span>
      </div>

      <div class="atlas-wrap" data-atlas>
        <table class="atlas">
          <thead>
            <tr>
              <th class="col-bio" scope="col">Neuroscience</th>
              <th class="col-comp" scope="col">Machine learning</th>
              <th scope="col">Fidelity</th>
              <th scope="col">Side</th>
              <th scope="col">Source</th>
            </tr>
          </thead>
          <tbody>
{chr(10).join(rows)}
          </tbody>
        </table>
      </div>
      <p class="tools-empty" data-atlas-empty>No correspondence matches that. Clear the search, or widen the fidelity and side filters.</p>
    </section>'''
    page("atlas.html", "correspondence atlas",
         f"All {len(ATLAS)} brain-to-machine correspondences from the peplomer essays in one searchable table, each rated mechanism, analogy, or metaphor.",
         "atlas", body)

# ---------------------------------------------------------------- search page
def build_search_page(index):
    # Inline the index so search works from the filesystem (file:// blocks fetch).
    data = json.dumps(index, ensure_ascii=False).replace("</", "<\\/")
    body = f'''    <script id="search-data" type="application/json">{data}</script>
    <section class="section wrap">
      <div class="section-head">
        <h1 style="font-family:var(--display);font-size:var(--step-h1);font-weight:360;letter-spacing:-.018em;">search</h1>
        <p>ten pieces · titles, summaries, and full text</p>
      </div>
      <div class="toolbar">
        <label class="searchbox">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.5" y2="16.5"/></svg>
          <input type="search" data-search-input placeholder="search the essays and primers" aria-label="search" autofocus>
        </label>
        <span class="result-count" data-search-count></span>
      </div>
      <div class="results" data-search-results></div>
      <p class="tools-empty" data-search-empty>Nothing matches that. Try a broader word, like memory, reward, attention, or bias.</p>
    </section>'''
    page("search.html", "search",
         "Search every peplomer essay and primer by title, summary, and full text.",
         "search", body)

# ---------------------------------------------------------------- subscribe
def build_subscribe():
    body = '''    <section class="section wrap">
      <div class="prose-page">
        <h1>Subscribe</h1>
        <p class="lead">New pieces land every few weeks. Follow along however you read.</p>

        <div class="sub-card">
          <h2>RSS</h2>
          <p style="margin:0;color:var(--muted);">The feed works now, in any reader, with no signup. Point your reader at the address below.</p>
          <p class="mono" style="margin-top:1rem;font-size:.95rem;word-break:break-all;"><a href="feed.xml">/feed.xml</a></p>
        </div>

        <div class="sub-card">
          <h2>Email</h2>
          <p style="margin:0;color:var(--muted);">One message per new piece. No other mail.</p>
          <!-- Wire this form to your provider (Buttondown, Listmonk, Mailchimp, etc.).
               Set the action URL and the field name your provider expects, then remove this note. -->
          <form class="sub-form" action="#" method="post" data-subscribe>
            <input type="email" name="email" placeholder="you@example.com" aria-label="email address" required>
            <button type="submit">Subscribe</button>
          </form>
          <p class="sub-note" data-subscribe-note>Email delivery is not connected yet. Use RSS for now, or check back soon.</p>
        </div>
      </div>
    </section>'''
    page("subscribe.html", "subscribe",
         "Subscribe to peplomer by RSS now, or by email once delivery is connected.",
         "", body)

# ---------------------------------------------------------------- feed / sitemap / robots
def build_feed(index):
    date = "Thu, 13 Aug 2026 12:00:00 GMT"
    items = []
    for it in index:
        link = f"{BASE}/{it['url']}"
        items.append(f'''    <item>
      <title>{html.escape(it['title'])}</title>
      <link>{link}</link>
      <guid isPermaLink="true">{link}</guid>
      <description>{html.escape(it['summary'])}</description>
      <category>{SIDE_LABEL[it['side']]}</category>
      <category>{DEPTH_LABEL[it['depth']]}</category>
      <pubDate>{date}</pubDate>
    </item>''')
    feed = f'''<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>peplomer</title>
    <link>{BASE}/</link>
    <atom:link href="{BASE}/feed.xml" rel="self" type="application/rss+xml"/>
    <description>Research at the seam between neuroscience and machine learning. Every analogy rated, every mapping's limits stated.</description>
    <language>en</language>
    <lastBuildDate>{date}</lastBuildDate>
{chr(10).join(items)}
  </channel>
</rss>
'''
    open(os.path.join(ROOT, "feed.xml"), "w").write(feed)
    print("wrote feed.xml")

def build_sitemap(index):
    urls = ["index.html", "research/index.html", "atlas.html", "search.html",
            "glossary.html", "subscribe.html", "about.html"] + [it["url"] for it in index]
    seen, u = set(), []
    for x in urls:
        if x not in seen:
            seen.add(x); u.append(x)
    entries = "\n".join(
        f"  <url><loc>{BASE}/{x}</loc><lastmod>2026-08-13</lastmod></url>" for x in u)
    sm = f'''<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
{entries}
</urlset>
'''
    open(os.path.join(ROOT, "sitemap.xml"), "w").write(sm)
    open(os.path.join(ROOT, "robots.txt"), "w").write(
        f"User-agent: *\nAllow: /\n\nSitemap: {BASE}/sitemap.xml\n")
    print("wrote sitemap.xml, robots.txt:", len(u), "urls")

if __name__ == "__main__":
    idx = build_search_index()
    build_glossary()
    build_atlas()
    build_search_page(idx)
    build_subscribe()
    build_feed(idx)
    build_sitemap(idx)
    print("done")

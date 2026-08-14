# peplomer

A research and learning publication at the seam between behavioral science,
neuroscience, and machine learning, prompt engineering, and agentic
architecture. Long, technical essays that map the brain onto the model, rate
the fidelity of every analogy, and state where each mapping breaks.

`peplomer` is a working brand name, swappable. See `about.html` for the two
alternatives and the one-line swap.

## Structure

```
index.html                         home: thesis hero + reading index
research/index.html                filterable research index
research/predictive-processing.html
research/dual-process-reasoning.html
research/consolidation-replay-memory.html
research/reward-prediction-error.html
research/framing-anchoring-prompt.html
about.html                         the method, the legend, the name
assets/css/site.css                one stylesheet, every value a token
assets/js/site.js                  vanilla JS: hero cycler, filter, scrollspy
favicon.svg                        the virus mark, flat single colour
```

## The device

One structural choice runs site-wide: a fixed accent legend.

- **blue**: the biological side (neuroscience, behavior, the brain)
- **red**: the computational side (models, training, architecture)
- **yellow**: the bridge, appearing only where a correspondence is asserted

Every essay carries a correspondence table rating each mapping `Mechanism`,
`Analogy`, or `Metaphor`, and a required "where the mapping breaks" section.

## Running locally

It is a static site with no build step. Open `index.html` by double-clicking,
or serve the folder:

```
python3 -m http.server
```

All paths are relative, so it works from the filesystem and from a project
subpath such as GitHub Pages.

## Hosting

Deployed to GitHub Pages by `.github/workflows/static.yml`, which uploads the
repository root and publishes on every push to `main` (or on manual dispatch).
Pages is already enabled for this repository (**Settings → Pages → Source:
GitHub Actions**), so no further setup is needed. The site is live at
<https://matthew-fsc.github.io/machine-intelligence-brand/>.

## Dependencies

None beyond three Google Fonts (Fraunces, Newsreader, IBM Plex Mono). Every
diagram is inline, hand-written SVG. No trackers.

## Tools and distribution

Beyond the reading pages, the site now includes:

- `atlas.html`: the Correspondence Atlas: every brain-to-machine mapping from
  all essays in one searchable table, filterable by fidelity and side.
- `search.html`: client-side full-text search over every piece. The index is
  inlined, so it works from the filesystem with no server.
- `glossary.html`: every key term, defined once and linked to its source.
- `subscribe.html`: RSS now, plus an email form ready to wire to a provider.
- `feed.xml`, `sitemap.xml`, `robots.txt`, feed and crawler basics.
- `assets/og/default.png`, the Open Graph share image, referenced site-wide.

Rebuild the generated tool pages and data files after editing content:

```
python3 scripts/site_build.py   # if you keep the builder in the repo
```

## Analytics (optional, off by default)

No analytics ship by default and there are no trackers. To add privacy-friendly
analytics, put a Plausible (or similar) snippet before `</head>`. For Plausible:

```html
<script defer data-domain="YOUR_DOMAIN" src="https://plausible.io/js/script.js"></script>
```

## Licensing

Prose and content are licensed CC BY 4.0 (see `LICENSE-CONTENT.md`). The source
code is separate.

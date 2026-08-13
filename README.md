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

- **blue**: the biological side (neuroscience, behavior, wetware)
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

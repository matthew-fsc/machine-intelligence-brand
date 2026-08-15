const { chromium } = require('playwright-core');
const fs = require('fs');

const OUT = '/home/user/machine-intelligence-brand/assets/og';
const SIDE = {
  bio:    { name:'biological',    dot:'#9DBFE0', ink:'#35597F' },
  comp:   { name:'computational', dot:'#E4A9A2', ink:'#A63A30' },
  bridge: { name:'the bridge',    dot:'#E6CE83', ink:'#7A5E10' },
};
const DEPTH = { primer:'primer', core:'core', deep:'deep dive' };
const DEPTHFILL = { primer:1, core:2, deep:3 };

// slug, side, depth, eyebrow, title, mins
const ITEMS = [
  ['what-is-peplomer','bridge','primer','the bridge · start here','What peplomer is',4],
  ['the-three-sides','bridge','primer','the bridge · start here','The three sides: biological, computational, and the bridge',5],
  ['how-to-read-a-correspondence','bridge','primer','the bridge · start here','How to read a correspondence',4],
  ['the-predicting-brain','bio','primer','biological · the brain','The predicting brain, in plain terms',5],
  ['how-a-model-learns','comp','primer','computational · the machine','How a language model learns, in plain terms',5],
  ['predictive-processing','bio','core','biological · predictive coding','Predictive processing and the prediction objective',14],
  ['dual-process-reasoning','comp','core','computational · reasoning traces','Dual-process theory, metacognition, and the reasoning trace',16],
  ['consolidation-replay-memory','bio','core','biological · memory systems','Consolidation, replay, and agent memory architecture',15],
  ['reward-prediction-error','bridge','deep','the bridge · reinforcement learning','Reward prediction error, actor-critic, and the alignment of objectives',17],
  ['framing-anchoring-prompt','comp','core','computational · prompt behavior','Framing, anchoring, and the behavioral economics of the prompt',13],
  ['atlas','bridge','core','reference','Correspondence atlas',null],
];

function markSVG(cls, w) {
  return `<svg class="${cls}" style="width:${w}px" viewBox="0 0 64 64" aria-hidden="true"><g fill="none" stroke-width="1.4" stroke-linecap="round">
    <circle cx="32" cy="32" r="11" stroke="#BFBEB6"/><circle cx="32" cy="32" r="4" fill="#BFBEB6" stroke="none"/>
    <g stroke="#E6CE83" fill="#E6CE83"><line x1="32" y1="18.5" x2="32" y2="9.1"/><circle cx="32" cy="6" r="2.4" stroke="none"/></g>
    <g stroke="#D3D2CB" fill="#D3D2CB"><line x1="38.75" y1="20.31" x2="43.45" y2="12.17"/><circle cx="45" cy="9.48" r="2.4" stroke="none"/></g>
    <g stroke="#E4A9A2" fill="#E4A9A2"><line x1="43.69" y1="25.25" x2="51.83" y2="20.55"/><circle cx="54.52" cy="19" r="2.4" stroke="none"/></g>
    <g stroke="#E4A9A2" fill="#E4A9A2"><line x1="45.5" y1="32" x2="54.9" y2="32"/><circle cx="58" cy="32" r="2.4" stroke="none"/></g>
    <g stroke="#E4A9A2" fill="#E4A9A2"><line x1="43.69" y1="38.75" x2="51.83" y2="43.45"/><circle cx="54.52" cy="45" r="2.4" stroke="none"/></g>
    <g stroke="#D3D2CB" fill="#D3D2CB"><line x1="38.75" y1="43.69" x2="43.45" y2="51.83"/><circle cx="45" cy="54.52" r="2.4" stroke="none"/></g>
    <g stroke="#D3D2CB" fill="#D3D2CB"><line x1="32" y1="45.5" x2="32" y2="54.9"/><circle cx="32" cy="58" r="2.4" stroke="none"/></g>
    <g stroke="#D3D2CB" fill="#D3D2CB"><line x1="25.25" y1="43.69" x2="20.55" y2="51.83"/><circle cx="19" cy="54.52" r="2.4" stroke="none"/></g>
    <g stroke="#9DBFE0" fill="#9DBFE0"><line x1="20.31" y1="38.75" x2="12.17" y2="43.45"/><circle cx="9.48" cy="45" r="2.4" stroke="none"/></g>
    <g stroke="#9DBFE0" fill="#9DBFE0"><line x1="18.5" y1="32" x2="9.1" y2="32"/><circle cx="6" cy="32" r="2.4" stroke="none"/></g>
    <g stroke="#9DBFE0" fill="#9DBFE0"><line x1="20.31" y1="25.25" x2="12.17" y2="20.55"/><circle cx="9.48" cy="19" r="2.4" stroke="none"/></g>
    <g stroke="#D3D2CB" fill="#D3D2CB"><line x1="25.25" y1="20.31" x2="20.55" y2="12.17"/><circle cx="19" cy="9.48" r="2.4" stroke="none"/></g>
  </g></svg>`;
}

function meter(fill) {
  let bars = '';
  for (let i=1;i<=3;i++) bars += `<i style="height:${[0,5,9,13][i]}px;background:${i<=fill?'#1B1B22':'#BFBEB6'}"></i>`;
  return `<span class="meter">${bars}</span>`;
}

function html(it) {
  const [slug, side, depth, eyebrow, title, mins] = it;
  const s = SIDE[side];
  const size = title.length > 46 ? 58 : (title.length > 30 ? 68 : 82);
  const footer = mins === null
    ? `<span class="chip">${meter(2)} 25 mappings, rated</span>`
    : `<span class="chip">${meter(DEPTHFILL[depth])} ${DEPTH[depth]}</span><span class="dot">·</span><span class="mins">${mins} min read</span>`;
  return `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,340;1,9..144,340&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
*{margin:0;box-sizing:border-box}html,body{width:1200px;height:630px}
body{background:#F5F5F5;position:relative;overflow:hidden;font-family:"Newsreader",serif;
 background-image:linear-gradient(rgba(27,27,34,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(27,27,34,.045) 1px,transparent 1px);background-size:48px 48px}
.frame{position:absolute;inset:36px;border:1px solid #D7D6D0}
.accent{position:absolute;left:36px;top:36px;bottom:36px;width:8px;background:${s.dot}}
.mark{position:absolute;right:-90px;top:130px;opacity:.85}
.pad{position:absolute;inset:88px 84px 84px 104px;display:flex;flex-direction:column;justify-content:space-between}
.top{display:flex;align-items:center;gap:16px}
.top svg{width:44px;height:44px}
.word{font-family:"Fraunces",serif;font-weight:500;font-size:40px;letter-spacing:-.035em;color:#1B1B22}
.eyebrow{font-family:"IBM Plex Mono",monospace;font-size:22px;color:${s.ink};margin-bottom:18px}
h1{font-family:"Fraunces",serif;font-weight:340;font-size:${size}px;line-height:1.04;letter-spacing:-.02em;color:#1B1B22;max-width:19ch}
.foot{display:flex;align-items:center;gap:16px;font-family:"IBM Plex Mono",monospace;font-size:22px;color:#6C6C74}
.chip{display:inline-flex;align-items:center;gap:10px;text-transform:uppercase;letter-spacing:.05em;font-size:20px}
.meter{display:inline-flex;align-items:flex-end;gap:3px;height:13px}
.meter i{width:4px;border-radius:1px;display:inline-block}
.dot{color:#BFBEB6}
</style></head><body>
<div class="frame"></div><div class="accent"></div>
${markSVG('mark', 520)}
<div class="pad">
  <div class="top">${markSVG('', 44).replace('style="width:44px"','style="width:44px;height:44px"').replace(/#D3D2CB|#9DBFE0|#E4A9A2|#E6CE83|#BFBEB6/g,'#1B1B22')}<span class="word">peplomer</span></div>
  <div><div class="eyebrow">${eyebrow}</div><h1>${title}</h1></div>
  <div class="foot">${footer}</div>
</div></body></html>`;
}

(async () => {
  const b = await chromium.launch({ executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args:['--no-sandbox'] });
  const p = await b.newPage({ viewport:{width:1200,height:630}, deviceScaleFactor:1 });
  for (const it of ITEMS) {
    await p.setContent(html(it), { waitUntil:'networkidle' });
    await p.waitForTimeout(500);
    await p.screenshot({ path:`${OUT}/${it[0]}.png` });
    console.log('rendered', it[0]);
  }
  await b.close();
})();

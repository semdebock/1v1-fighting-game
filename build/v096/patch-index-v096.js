const fs=require('fs');
const path=require('path');
const file=path.resolve(__dirname,'../../index.html');
const ASSET='0962';
let h=fs.readFileSync(file,'utf8');
/* v0.9.6.2 rebuilds the iPad fight layout and gives El Primo a real movement-based super. */
h=h.replaceAll('Multiverse Arena v0.9.6.1 — Fight UI Polish','Multiverse Arena v0.9.6.2 — Fullscreen Fight + Primo Super');
h=h.replaceAll('Multiverse Arena v0.9.6 — Premium Presentation','Multiverse Arena v0.9.6.2 — Fullscreen Fight + Primo Super');
h=h.replaceAll('MULTIVERSE ARENA <span class="tag">v0.9.6.1</span>','MULTIVERSE ARENA <span class="tag">v0.9.6.2</span>');
h=h.replaceAll('MULTIVERSE ARENA <span class="tag">v0.9.6</span>','MULTIVERSE ARENA <span class="tag">v0.9.6.2</span>');
h=h.replaceAll('UPDATE LOG  •  v0.9.6.1','UPDATE LOG  •  v0.9.6.2');
h=h.replaceAll('UPDATE LOG  •  v0.9.6','UPDATE LOG  •  v0.9.6.2');
h=h.replaceAll('<div class="dash-stat latest-stat"><small>LATEST UPDATE</small><b>v0.9.6.1</b><span>Fight UI Polish • Primo Smash • HUD Cleanup</span></div>','<div class="dash-stat latest-stat"><small>LATEST UPDATE</small><b>v0.9.6.2</b><span>Fullscreen Fight • True Primo Super • Bigger Preview</span></div>');
h=h.replaceAll('<div class="dash-stat latest-stat"><small>LATEST UPDATE</small><b>v0.9.6</b><span>Premium Presentation • Full Interface Refit</span></div>','<div class="dash-stat latest-stat"><small>LATEST UPDATE</small><b>v0.9.6.2</b><span>Fullscreen Fight • True Primo Super • Bigger Preview</span></div>');
h=h.replaceAll('v0.9.6.1 • FIGHT UI POLISH','v0.9.6.2 • FULLSCREEN FIGHT POLISH');
h=h.replaceAll('PREMIUM PRESENTATION • v0.9.6','v0.9.6.2 • FULLSCREEN FIGHT POLISH');
h=h.replaceAll('MULTIVERSE ARENA • v0.9.6.1','MULTIVERSE ARENA • v0.9.6.2');
h=h.replaceAll('MULTIVERSE ARENA • v0.9.6','MULTIVERSE ARENA • v0.9.6.2');
/* Normalize every previous v0.9.6-family cache token. Exact query-token matching keeps repeated CI runs idempotent. */
h=h.replace(/\?v=(?:096|096f1|096f2|0961)(?=["'])/g,`?v=${ASSET}`);
fs.writeFileSync(file,h);
for(const marker of ['Multiverse Arena v0.9.6.2 — Fullscreen Fight + Primo Super','MULTIVERSE ARENA <span class="tag">v0.9.6.2</span>','Fullscreen Fight • True Primo Super • Bigger Preview',`premium-v096.css?v=${ASSET}`,`app/core/bootstrap-v096.js?v=${ASSET}`,'VILLAIN GAUNTLET'])if(!h.includes(marker))throw new Error('v0.9.6.2 index marker missing: '+marker);
for(const forbidden of [`app/core/bootstrap-v0958.js?v=${ASSET}`,`qa-v0957.js?v=${ASSET}`,`qa-v09571.js?v=${ASSET}`,`qa-v095722.js?v=${ASSET}`,`build/v094/transform-v094.js?v=${ASSET}`])if(h.includes(forbidden))throw new Error('v0.9.6.2 production index contains forbidden legacy runtime: '+forbidden);
console.log('v0.9.6.2 fullscreen fight index guard passed with asset '+ASSET);

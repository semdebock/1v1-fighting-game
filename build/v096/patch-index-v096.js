const fs=require('fs');
const path=require('path');
const file=path.resolve(__dirname,'../../index.html');
const ASSET='0961';
let h=fs.readFileSync(file,'utf8');
/* v0.9.6.1 is a focused presentation/animation patch on the protected v0.9.6 combat release. */
h=h.replaceAll('Multiverse Arena v0.9.6 — Premium Presentation','Multiverse Arena v0.9.6.1 — Fight UI Polish');
h=h.replaceAll('MULTIVERSE ARENA <span class="tag">v0.9.6</span>','MULTIVERSE ARENA <span class="tag">v0.9.6.1</span>');
h=h.replaceAll('UPDATE LOG  •  v0.9.6','UPDATE LOG  •  v0.9.6.1');
h=h.replaceAll('<div class="dash-stat latest-stat"><small>LATEST UPDATE</small><b>v0.9.6</b><span>Premium Presentation • Full Interface Refit</span></div>','<div class="dash-stat latest-stat"><small>LATEST UPDATE</small><b>v0.9.6.1</b><span>Fight UI Polish • Primo Smash • HUD Cleanup</span></div>');
h=h.replaceAll('PREMIUM PRESENTATION • v0.9.6','v0.9.6.1 • FIGHT UI POLISH');
h=h.replaceAll('MULTIVERSE ARENA • v0.9.6','MULTIVERSE ARENA • v0.9.6.1');
/* Normalize old v0.9.6 cache tokens. Complete-token regex keeps repeat CI runs idempotent. */
h=h.replace(/\?v=(?:096|096f1|096f2)(?=["'])/g,`?v=${ASSET}`);
fs.writeFileSync(file,h);
for(const marker of ['Multiverse Arena v0.9.6.1 — Fight UI Polish','MULTIVERSE ARENA <span class="tag">v0.9.6.1</span>','Fight UI Polish • Primo Smash • HUD Cleanup',`premium-v096.css?v=${ASSET}`,`app/core/bootstrap-v096.js?v=${ASSET}`,'VILLAIN GAUNTLET'])if(!h.includes(marker))throw new Error('v0.9.6.1 index marker missing: '+marker);
for(const forbidden of [`app/core/bootstrap-v0958.js?v=${ASSET}`,`qa-v0957.js?v=${ASSET}`,`qa-v09571.js?v=${ASSET}`,`qa-v095722.js?v=${ASSET}`,`build/v094/transform-v094.js?v=${ASSET}`])if(h.includes(forbidden))throw new Error('v0.9.6.1 production index contains forbidden legacy runtime: '+forbidden);
console.log('v0.9.6.1 fight UI polish index guard passed with asset '+ASSET);

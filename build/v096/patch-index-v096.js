const fs=require('fs');
const path=require('path');
const file=path.resolve(__dirname,'../../index.html');
const ASSET='0962';
let h=fs.readFileSync(file,'utf8');
/* v0.9.6.2 branding normalization. These regexes deliberately consume the whole v0.9.6.x family
   so running this patch repeatedly can never create version strings such as v0.9.6.2.2. */
h=h.replace(/Multiverse Arena v0\.9\.6(?:\.\d+)* — (?:Premium Presentation|Fight UI Polish|Fullscreen Fight \+ Primo Super)/g,'Multiverse Arena v0.9.6.2 — Fullscreen Fight + Primo Super');
h=h.replace(/MULTIVERSE ARENA <span class="tag">v0\.9\.6(?:\.\d+)*<\/span>/g,'MULTIVERSE ARENA <span class="tag">v0.9.6.2</span>');
h=h.replace(/UPDATE LOG  •  v0\.9\.6(?:\.\d+)*/g,'UPDATE LOG  •  v0.9.6.2');
h=h.replace(/<div class="dash-stat latest-stat"><small>LATEST UPDATE<\/small><b>v0\.9\.6(?:\.\d+)*<\/b><span>[^<]*<\/span><\/div>/g,'<div class="dash-stat latest-stat"><small>LATEST UPDATE</small><b>v0.9.6.2</b><span>Fullscreen Fight • True Primo Super • Bigger Preview</span></div>');
h=h.replace(/<div class="build-health"><span>◆ BUILD HEALTH<\/span><b>[^<]*<\/b><\/div>/g,'<div class="build-health"><span>◆ BUILD HEALTH</span><b>v0.9.6.2 • FULLSCREEN FIGHT POLISH</b></div>');
h=h.replace(/MULTIVERSE ARENA • v0\.9\.6(?:\.\d+)*/g,'MULTIVERSE ARENA • v0.9.6.2');
/* Normalize previous v0.9.6-family cache tokens. Exact query-token matching keeps repeat CI runs idempotent. */
h=h.replace(/\?v=(?:096|096f1|096f2|0961)(?=["'])/g,`?v=${ASSET}`);
fs.writeFileSync(file,h);
for(const marker of ['Multiverse Arena v0.9.6.2 — Fullscreen Fight + Primo Super','MULTIVERSE ARENA <span class="tag">v0.9.6.2</span>','UPDATE LOG  •  v0.9.6.2','Fullscreen Fight • True Primo Super • Bigger Preview',`premium-v096.css?v=${ASSET}`,`app/core/bootstrap-v096.js?v=${ASSET}`,'VILLAIN GAUNTLET'])if(!h.includes(marker))throw new Error('v0.9.6.2 index marker missing: '+marker);
for(const forbidden of ['v0.9.6.2.2','v0.9.6.2.1',`app/core/bootstrap-v0958.js?v=${ASSET}`,`qa-v0957.js?v=${ASSET}`,`qa-v09571.js?v=${ASSET}`,`qa-v095722.js?v=${ASSET}`,`build/v094/transform-v094.js?v=${ASSET}`])if(h.includes(forbidden))throw new Error('v0.9.6.2 index contains malformed or legacy marker: '+forbidden);
console.log('v0.9.6.2 fullscreen fight index guard passed with asset '+ASSET);

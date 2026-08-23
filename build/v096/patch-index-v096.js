const fs=require('fs');
const path=require('path');
const file=path.resolve(__dirname,'../../index.html');
const ASSET='0965';
let h=fs.readFileSync(file,'utf8');
/* v0.9.6.5 branding normalization. Consume the full v0.9.6.x family so repeated CI runs stay idempotent. */
h=h.replace(/Multiverse Arena v0\.9\.6(?:\.\d+)* — (?:Premium Presentation|Fight UI Polish|Fullscreen Fight \+ Primo Super|Combat Header \+ Log Cleanup|iPad Control Fit \+ UI Audit|Villain Gauntlet Focus)/g,'Multiverse Arena v0.9.6.5 — Villain Gauntlet Focus');
h=h.replace(/MULTIVERSE ARENA <span class="tag">v0\.9\.6(?:\.\d+)*<\/span>/g,'MULTIVERSE ARENA <span class="tag">v0.9.6.5</span>');
h=h.replace(/UPDATE LOG  •  v0\.9\.6(?:\.\d+)*/g,'UPDATE LOG  •  v0.9.6.5');
h=h.replace(/<div class="dash-stat latest-stat"><small>LATEST UPDATE<\/small><b>v0\.9\.6(?:\.\d+)*<\/b><span>[^<]*<\/span><\/div>/g,'<div class="dash-stat latest-stat"><small>LATEST UPDATE</small><b>v0.9.6.5</b><span>Gauntlet Focus • Camera Slides • Classified Threats</span></div>');
h=h.replace(/<div class="build-health"><span>◆ BUILD HEALTH<\/span><b>[^<]*<\/b><\/div>/g,'<div class="build-health"><span>◆ BUILD HEALTH</span><b>v0.9.6.5 • GAUNTLET CLARITY • STABLE</b></div>');
h=h.replace(/MULTIVERSE ARENA • v0\.9\.6(?:\.\d+)*/g,'MULTIVERSE ARENA • v0.9.6.5');
/* Normalize previous v0.9.6-family cache tokens. */
h=h.replace(/\?v=(?:096|096f1|096f2|0961|0962|0963|0964)(?=["'])/g,`?v=${ASSET}`);
fs.writeFileSync(file,h);
for(const marker of ['Multiverse Arena v0.9.6.5 — Villain Gauntlet Focus','MULTIVERSE ARENA <span class="tag">v0.9.6.5</span>','UPDATE LOG  •  v0.9.6.5','Gauntlet Focus • Camera Slides • Classified Threats',`premium-v096.css?v=${ASSET}`,`app/core/bootstrap-v096.js?v=${ASSET}`,'VILLAIN GAUNTLET'])if(!h.includes(marker))throw new Error('v0.9.6.5 index marker missing: '+marker);
for(const forbidden of ['v0.9.6.5.5','v0.9.6.5.4',`app/core/bootstrap-v0958.js?v=${ASSET}`,`qa-v0957.js?v=${ASSET}`,`qa-v09571.js?v=${ASSET}`,`qa-v095722.js?v=${ASSET}`,`build/v094/transform-v094.js?v=${ASSET}`])if(h.includes(forbidden))throw new Error('v0.9.6.5 index contains malformed or legacy marker: '+forbidden);
console.log('v0.9.6.5 Gauntlet Focus index guard passed with asset '+ASSET);

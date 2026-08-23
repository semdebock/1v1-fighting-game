const fs=require('fs');
const path=require('path');
const file=path.resolve(__dirname,'../../index.html');
const ASSET='0963';
let h=fs.readFileSync(file,'utf8');
/* v0.9.6.3 branding normalization. Consume the full v0.9.6.x family so repeated CI runs stay idempotent. */
h=h.replace(/Multiverse Arena v0\.9\.6(?:\.\d+)* — (?:Premium Presentation|Fight UI Polish|Fullscreen Fight \+ Primo Super|Combat Header \+ Log Cleanup)/g,'Multiverse Arena v0.9.6.3 — Combat Header + Log Cleanup');
h=h.replace(/MULTIVERSE ARENA <span class="tag">v0\.9\.6(?:\.\d+)*<\/span>/g,'MULTIVERSE ARENA <span class="tag">v0.9.6.3</span>');
h=h.replace(/UPDATE LOG  •  v0\.9\.6(?:\.\d+)*/g,'UPDATE LOG  •  v0.9.6.3');
h=h.replace(/<div class="dash-stat latest-stat"><small>LATEST UPDATE<\/small><b>v0\.9\.6(?:\.\d+)*<\/b><span>[^<]*<\/span><\/div>/g,'<div class="dash-stat latest-stat"><small>LATEST UPDATE</small><b>v0.9.6.3</b><span>Combat Header • Clean Logs • Fullscreen Fight</span></div>');
h=h.replace(/<div class="build-health"><span>◆ BUILD HEALTH<\/span><b>[^<]*<\/b><\/div>/g,'<div class="build-health"><span>◆ BUILD HEALTH</span><b>v0.9.6.3 • COMBAT HEADER POLISH</b></div>');
h=h.replace(/MULTIVERSE ARENA • v0\.9\.6(?:\.\d+)*/g,'MULTIVERSE ARENA • v0.9.6.3');
/* Normalize previous v0.9.6-family cache tokens. */
h=h.replace(/\?v=(?:096|096f1|096f2|0961|0962)(?=["'])/g,`?v=${ASSET}`);
fs.writeFileSync(file,h);
for(const marker of ['Multiverse Arena v0.9.6.3 — Combat Header + Log Cleanup','MULTIVERSE ARENA <span class="tag">v0.9.6.3</span>','UPDATE LOG  •  v0.9.6.3','Combat Header • Clean Logs • Fullscreen Fight',`premium-v096.css?v=${ASSET}`,`app/core/bootstrap-v096.js?v=${ASSET}`,'VILLAIN GAUNTLET'])if(!h.includes(marker))throw new Error('v0.9.6.3 index marker missing: '+marker);
for(const forbidden of ['v0.9.6.3.3','v0.9.6.3.2',`app/core/bootstrap-v0958.js?v=${ASSET}`,`qa-v0957.js?v=${ASSET}`,`qa-v09571.js?v=${ASSET}`,`qa-v095722.js?v=${ASSET}`,`build/v094/transform-v094.js?v=${ASSET}`])if(h.includes(forbidden))throw new Error('v0.9.6.3 index contains malformed or legacy marker: '+forbidden);
console.log('v0.9.6.3 combat header index guard passed with asset '+ASSET);

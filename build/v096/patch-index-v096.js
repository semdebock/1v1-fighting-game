const fs=require('fs');
const path=require('path');
const file=path.resolve(__dirname,'../../index.html');
const ASSET='097';
let h=fs.readFileSync(file,'utf8');
/* v0.9.7 branding normalization. Keep this idempotent across repeated CI runs. */
h=h.replace(/<title>[^<]*Multiverse Arena[^<]*<\/title>/,'<title>Multiverse Arena v0.9.7 — Mutant Uprising</title>');
h=h.replace(/MULTIVERSE ARENA <span class="tag">v0\.9\.(?:6(?:\.\d+)*|7)<\/span>/g,'MULTIVERSE ARENA <span class="tag">v0.9.7</span>');
h=h.replace(/UPDATE LOG  •  v0\.9\.(?:6(?:\.\d+)*|7)/g,'UPDATE LOG  •  v0.9.7');
h=h.replace(/<div class="dash-stat latest-stat"><small>LATEST UPDATE<\/small><b>v0\.9\.(?:6(?:\.\d+)*|7)<\/b><span>[^<]*<\/span><\/div>/g,'<div class="dash-stat latest-stat"><small>LATEST UPDATE</small><b>v0.9.7</b><span>Phase 3 • Mutant Uprising • 5 New Villains</span></div>');
h=h.replace(/<div class="build-health"><span>◆ BUILD HEALTH<\/span><b>[^<]*<\/b><\/div>/g,'<div class="build-health"><span>◆ BUILD HEALTH</span><b>v0.9.7 • MUTANT UPRISING • STABLE</b></div>');
h=h.replace(/MULTIVERSE ARENA • v0\.9\.(?:6(?:\.\d+)*|7)/g,'MULTIVERSE ARENA • v0.9.7');
h=h.replace('<span class="tag">PHASE 2 • MASTER PLAN</span><h1>THE ARMS<br>ARE THINKING.</h1><p>Doctor Octopus closes Phase 2 as a brutal tactical boss. Read four intelligent tentacles, survive escalating phases and strike only when Otto overextends.</p>','<span class="tag">PHASE 3 • MUTANT UPRISING</span><h1>THE MUTANTS<br>HAVE ARRIVED.</h1><p>Survive Sabretooth, outsmart Mystique, move the Juggernaut, finish Deadpool twice and face Magneto — Master of Magnetism.</p>');
/* Normalize all older 0.9.6 family and current 0.9.7 cache tokens. */
h=h.replace(/\?v=(?:096|096f1|096f2|0961|0962|0963|0964|0965|0966|097)(?=["'])/g,`?v=${ASSET}`);
fs.writeFileSync(file,h);
for(const marker of ['Multiverse Arena v0.9.7 — Mutant Uprising','MULTIVERSE ARENA <span class="tag">v0.9.7</span>','UPDATE LOG  •  v0.9.7','Phase 3 • Mutant Uprising • 5 New Villains','PHASE 3 • MUTANT UPRISING','THE MUTANTS<br>HAVE ARRIVED.',`premium-v096.css?v=${ASSET}`,`app/core/bootstrap-v096.js?v=${ASSET}`,'VILLAIN GAUNTLET'])if(!h.includes(marker))throw new Error('v0.9.7 index marker missing: '+marker);
for(const forbidden of ['v0.9.7.7','v0.9.6.6 — Gauntlet Navigator',`app/core/bootstrap-v0958.js?v=${ASSET}`,`qa-v0957.js?v=${ASSET}`,`qa-v09571.js?v=${ASSET}`,`qa-v095722.js?v=${ASSET}`,`build/v094/transform-v094.js?v=${ASSET}`])if(h.includes(forbidden))throw new Error('v0.9.7 index contains malformed or legacy marker: '+forbidden);
console.log('v0.9.7 Mutant Uprising index guard passed with asset '+ASSET);

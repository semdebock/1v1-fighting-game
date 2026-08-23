const fs=require('fs');
const path=require('path');
const file=path.resolve(__dirname,'../../index.html');
const ASSET='0972';
let h=fs.readFileSync(file,'utf8');
/* v0.9.7.2 branding normalization. Keep this idempotent across repeated CI runs. */
h=h.replace(/<title>[^<]*Multiverse Arena[^<]*<\/title>/,'<title>Multiverse Arena v0.9.7.2 — Combat Balance + Phase 3 Polish</title>');
h=h.replace(/MULTIVERSE ARENA <span class="tag">v0\.9\.(?:6(?:\.\d+)*|7(?:\.\d+)*)<\/span>/g,'MULTIVERSE ARENA <span class="tag">v0.9.7.2</span>');
h=h.replace(/UPDATE LOG  •  v0\.9\.(?:6(?:\.\d+)*|7(?:\.\d+)*)/g,'UPDATE LOG  •  v0.9.7.2');
h=h.replace(/<div class="dash-stat latest-stat"><small>LATEST UPDATE<\/small><b>v0\.9\.(?:6(?:\.\d+)*|7(?:\.\d+)*)<\/b><span>[^<]*<\/span><\/div>/g,'<div class="dash-stat latest-stat"><small>LATEST UPDATE</small><b>v0.9.7.2</b><span>Fighter Buffs • Phase 3 Nerfs • Combat Polish</span></div>');
h=h.replace(/<div class="build-health"><span>◆ BUILD HEALTH<\/span><b>[^<]*<\/b><\/div>/g,'<div class="build-health"><span>◆ BUILD HEALTH</span><b>v0.9.7.2 • BALANCE + PHASE 3 POLISH • STABLE</b></div>');
h=h.replace(/MULTIVERSE ARENA • v0\.9\.(?:6(?:\.\d+)*|7(?:\.\d+)*)/g,'MULTIVERSE ARENA • v0.9.7.2');
h=h.replace(/<span class="tag">PHASE 3 • [^<]*<\/span><h1>[^<]*(?:<br>[^<]*)?<\/h1><p>[^<]*<\/p>/,'<span class="tag">PHASE 3 • BALANCE PASS</span><h1>FIGHT SMARTER.<br>HIT HARDER.</h1><p>Rookie, Captain America and Daredevil step up while Juggernaut, Deadpool and Magneto keep their identities with fairer health, damage and attack pacing.</p>');
/* Normalize older v0.9.6/v0.9.7 cache tokens. Leave 0972 untouched on repeat runs. */
h=h.replace(/\?v=(?:096|096f1|096f2|0961|0962|0963|0964|0965|0966|097|0971)(?=["'])/g,`?v=${ASSET}`);
fs.writeFileSync(file,h);
for(const marker of ['Multiverse Arena v0.9.7.2 — Combat Balance + Phase 3 Polish','MULTIVERSE ARENA <span class="tag">v0.9.7.2</span>','UPDATE LOG  •  v0.9.7.2','Fighter Buffs • Phase 3 Nerfs • Combat Polish','PHASE 3 • BALANCE PASS','FIGHT SMARTER.<br>HIT HARDER.',`premium-v096.css?v=${ASSET}`,`app/core/bootstrap-v096.js?v=${ASSET}`,'VILLAIN GAUNTLET'])if(!h.includes(marker))throw new Error('v0.9.7.2 index marker missing: '+marker);
for(const forbidden of ['v0.9.7.2.2','v0.9.7.7',`app/core/bootstrap-v0958.js?v=${ASSET}`,`qa-v0957.js?v=${ASSET}`,`qa-v09571.js?v=${ASSET}`,`qa-v095722.js?v=${ASSET}`,`build/v094/transform-v094.js?v=${ASSET}`])if(h.includes(forbidden))throw new Error('v0.9.7.2 index contains malformed or legacy marker: '+forbidden);
console.log('v0.9.7.2 balance + polish index guard passed with asset '+ASSET);

const fs=require('fs');
const path=require('path');
const file=path.resolve(__dirname,'../../index.html');
const ASSET='0974';
let h=fs.readFileSync(file,'utf8');
/* v0.9.7.4 branding normalization. Keep this idempotent across repeated CI runs. */
h=h.replace(/<title>[^<]*Multiverse Arena[^<]*<\/title>/,'<title>Multiverse Arena v0.9.7.4 — Hulkbuster Premium Variant</title>');
h=h.replace(/MULTIVERSE ARENA <span class="tag">v0\.9\.(?:6(?:\.\d+)*|7(?:\.\d+)*)<\/span>/g,'MULTIVERSE ARENA <span class="tag">v0.9.7.4</span>');
h=h.replace(/UPDATE LOG  •  v0\.9\.(?:6(?:\.\d+)*|7(?:\.\d+)*)/g,'UPDATE LOG  •  v0.9.7.4');
h=h.replace(/<div class="dash-stat latest-stat"><small>LATEST UPDATE<\/small><b>v0\.9\.(?:6(?:\.\d+)*|7(?:\.\d+)*)<\/b><span>[^<]*<\/span><\/div>/g,'<div class="dash-stat latest-stat"><small>LATEST UPDATE</small><b>v0.9.7.4</b><span>Hulkbuster • 250 Diamonds • Veronica Crashdown</span></div>');
h=h.replace(/<div class="build-health"><span>◆ BUILD HEALTH<\/span><b>[^<]*<\/b><\/div>/g,'<div class="build-health"><span>◆ BUILD HEALTH</span><b>v0.9.7.4 • HULKBUSTER PREMIUM VARIANT • STABLE</b></div>');
h=h.replace(/MULTIVERSE ARENA • v0\.9\.(?:6(?:\.\d+)*|7(?:\.\d+)*)/g,'MULTIVERSE ARENA • v0.9.7.4');
h=h.replace(/<span class="tag">(?:PHASE 3|COLLECTION|MYTHIC ARMOR) • [^<]*<\/span><h1>[^<]*(?:<br>[^<]*)?<\/h1><p>[^<]*<\/p>/,'<span class="tag">MYTHIC ARMOR • HULKBUSTER</span><h1>BUILT TO<br>BREAK GIANTS.</h1><p>Iron Man receives an oversized 250-diamond Hulkbuster Ability Variant with 175 HP, Heavy Armor, devastating artillery and Veronica Crashdown.</p>');
/* Normalize older release cache tokens. Leave 0974 untouched on repeat runs. */
h=h.replace(/\?v=(?:096|096f1|096f2|0961|0962|0963|0964|0965|0966|097|0971|0972|0973)(?=["'])/g,`?v=${ASSET}`);
fs.writeFileSync(file,h);
for(const marker of ['Multiverse Arena v0.9.7.4 — Hulkbuster Premium Variant','MULTIVERSE ARENA <span class="tag">v0.9.7.4</span>','UPDATE LOG  •  v0.9.7.4','Hulkbuster • 250 Diamonds • Veronica Crashdown','MYTHIC ARMOR • HULKBUSTER','BUILT TO<br>BREAK GIANTS.',`premium-v096.css?v=${ASSET}`,`app/core/bootstrap-v096.js?v=${ASSET}`,'VILLAIN GAUNTLET'])if(!h.includes(marker))throw new Error('v0.9.7.4 index marker missing: '+marker);
for(const forbidden of ['v0.9.7.4.4','v0.9.7.7',`app/core/bootstrap-v0958.js?v=${ASSET}`,`qa-v0957.js?v=${ASSET}`,`qa-v09571.js?v=${ASSET}`,`qa-v095722.js?v=${ASSET}`,`build/v094/transform-v094.js?v=${ASSET}`])if(h.includes(forbidden))throw new Error('v0.9.7.4 index contains malformed or legacy marker: '+forbidden);
console.log('v0.9.7.4 Hulkbuster index guard passed with asset '+ASSET);

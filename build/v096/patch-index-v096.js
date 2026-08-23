const fs=require('fs');
const path=require('path');
const file=path.resolve(__dirname,'../../index.html');
let h=fs.readFileSync(file,'utf8');
if(!h.includes('Multiverse Arena v0.9.6 — Premium Presentation')){
 if(!h.includes('Multiverse Arena v0.9.5.8 — Core Cleanup'))throw new Error('v0.9.6 base marker missing');
 h=h.replaceAll('?v=0958','?v=096');
 h=h.replace('<title>Multiverse Arena v0.9.5.8 — Core Cleanup</title>','<title>Multiverse Arena v0.9.6 — Premium Presentation</title>');
 h=h.replace('MULTIVERSE ARENA <span class="tag">v0.9.5.8</span>','MULTIVERSE ARENA <span class="tag">v0.9.6</span>');
 h=h.replace('📋 UPDATE LOG • v0.9.5.8','UPDATE LOG  •  v0.9.6');
 h=h.replace('<div class="dash-stat latest-stat"><small>LATEST UPDATE</small><b>v0.9.5.8</b><span>Core Cleanup • Clean Bootstrap • Stability</span></div>','<div class="dash-stat latest-stat"><small>LATEST UPDATE</small><b>v0.9.6</b><span>Premium Presentation • Full Interface Refit</span></div>');
 h=h.replace('CLEAN CORE • v0.9.5.8','PREMIUM PRESENTATION • v0.9.6');
 h=h.replace('MULTIVERSE ARENA v0.9.5.8','MULTIVERSE ARENA • v0.9.6');
 h=h.replace('<link rel="stylesheet" href="stability-v095722.css?v=096">','<link rel="stylesheet" href="stability-v095722.css?v=096">\n<link rel="stylesheet" href="premium-v096.css?v=096">');
 h=h.replace('<script src="app/core/bootstrap-v0958.js?v=096"></script>','<script src="app/core/bootstrap-v096.js?v=096"></script>');
 fs.writeFileSync(file,h);
}
for(const marker of ['Multiverse Arena v0.9.6 — Premium Presentation','MULTIVERSE ARENA <span class="tag">v0.9.6</span>','Premium Presentation • Full Interface Refit','premium-v096.css?v=096','app/core/bootstrap-v096.js?v=096','VILLAIN GAUNTLET'])if(!h.includes(marker))throw new Error('v0.9.6 index marker missing: '+marker);
for(const forbidden of ['app/core/bootstrap-v0958.js?v=096','qa-v0957.js?v=096','qa-v09571.js?v=096','qa-v095722.js?v=096','build/v094/transform-v094.js?v=096'])if(h.includes(forbidden))throw new Error('v0.9.6 production index contains forbidden legacy runtime: '+forbidden);
console.log('v0.9.6 premium presentation index guard passed');

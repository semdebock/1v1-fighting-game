const fs=require('fs');
const path=require('path');
const file=path.resolve(__dirname,'../../index.html');
let h=fs.readFileSync(file,'utf8');
if(!h.includes('Multiverse Arena v0.9.5.8 — Core Cleanup')){
 if(!h.includes('Multiverse Arena v0.9.5.7.2.2 — Fight Stability Hotfix'))throw new Error('v0.9.5.8 base marker missing');
 h=h.replaceAll('?v=095722','?v=0958');
 h=h.replace('<title>Multiverse Arena v0.9.5.7.2.2 — Fight Stability Hotfix</title>','<title>Multiverse Arena v0.9.5.8 — Core Cleanup</title>');
 h=h.replace('MULTIVERSE ARENA <span class="tag">v0.9.5.7.2.2</span>','MULTIVERSE ARENA <span class="tag">v0.9.5.8</span>');
 h=h.replace('📋 UPDATE LOG • v0.9.5.7.2.2','📋 UPDATE LOG • v0.9.5.8');
 h=h.replace('<div class="dash-stat latest-stat"><small>LATEST UPDATE</small><b>v0.9.5.7.2.1</b><span>Fight Freeze Hotfix • Performance Stability</span></div>','<div class="dash-stat latest-stat"><small>LATEST UPDATE</small><b>v0.9.5.8</b><span>Core Cleanup • Clean Bootstrap • Stability</span></div>');
 h=h.replace('STABLE IMMERSION CORE • v0.9.5.7.2.1','CLEAN CORE • v0.9.5.8');
 h=h.replace('MULTIVERSE ARENA v0.9.5.7.1','MULTIVERSE ARENA v0.9.5.8');
 const scripts=/<script src="build\/v094\/transform-v094\.js\?v=0958"><\/script>[\s\S]*?<script src="qa-v095722\.js\?v=0958"><\/script>/;
 if(!scripts.test(h))throw new Error('v0.9.5.8 legacy production script block missing');
 h=h.replace(scripts,'<script src="app/core/bootstrap-v0958.js?v=0958"></script>');
 fs.writeFileSync(file,h);
}
for(const marker of ['Multiverse Arena v0.9.5.8 — Core Cleanup','MULTIVERSE ARENA <span class="tag">v0.9.5.8</span>','Core Cleanup • Clean Bootstrap • Stability','app/core/bootstrap-v0958.js?v=0958','VILLAIN GAUNTLET'])if(!h.includes(marker))throw new Error('v0.9.5.8 index marker missing: '+marker);
for(const forbidden of ['build/v094/transform-v094.js?v=0958','qa-v0957.js?v=0958','qa-v09571.js?v=0958','qa-v095722.js?v=0958'])if(h.includes(forbidden))throw new Error('v0.9.5.8 production index still loads legacy dev script: '+forbidden);
console.log('v0.9.5.8 index cleanup guard passed');

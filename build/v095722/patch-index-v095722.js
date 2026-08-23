const fs=require('fs');const path=require('path');const file=path.resolve(__dirname,'../../index.html');let h=fs.readFileSync(file,'utf8');
if(!h.includes('Multiverse Arena v0.9.5.7.2.2 — Fight Stability Hotfix')){
 if(!h.includes('Multiverse Arena v0.9.5.7.2.1 — Fight Freeze Hotfix'))throw new Error('v095722 base marker missing');
 h=h.replaceAll('?v=095721','?v=095722');
 h=h.replace('<title>Multiverse Arena v0.9.5.7.2.1 — Fight Freeze Hotfix</title>','<title>Multiverse Arena v0.9.5.7.2.2 — Fight Stability Hotfix</title>');
 h=h.replace('MULTIVERSE ARENA <span class="tag">v0.9.5.7.2.1</span>','MULTIVERSE ARENA <span class="tag">v0.9.5.7.2.2</span>');
 h=h.replace('📋 UPDATE LOG • v0.9.5.7.2.1','📋 UPDATE LOG • v0.9.5.7.2.2');
 h=h.replace('<div class="dash-stat latest-stat"><small>LATEST UPDATE</small><b>v0.9.5.7.2.1</b><span>Fight Freeze Hotfix • Villain Gauntlet</span></div>','<div class="dash-stat latest-stat"><small>LATEST UPDATE</small><b>v0.9.5.7.2.2</b><span>Fight Stability • Villain Gauntlet • Immersion</span></div>');
 h=h.replace('FIGHT FREEZE HOTFIX • v0.9.5.7.2.1','FIGHT STABILITY • v0.9.5.7.2.2');
 h=h.replace('<link rel="stylesheet" href="polish-v09572.css?v=095722">','<link rel="stylesheet" href="polish-v09572.css?v=095722">\n<link rel="stylesheet" href="stability-v095722.css?v=095722">');
 h=h.replace('<script src="qa-v09572.js?v=095722"></script>','<script src="qa-v095722.js?v=095722"></script>');
 fs.writeFileSync(file,h);
}
for(const m of ['Multiverse Arena v0.9.5.7.2.2 — Fight Stability Hotfix','stability-v095722.css?v=095722','polish-v09572.js?v=095722','qa-v095722.js?v=095722','VILLAIN GAUNTLET'])if(!h.includes(m))throw new Error('v095722 index marker missing: '+m);
if(h.includes('qa-v09572.js?v=095722'))throw new Error('old v09572 runtime QA still loaded');
console.log('v0.9.5.7.2.2 index guard passed');

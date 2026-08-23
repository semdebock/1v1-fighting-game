const fs=require('fs');const path=require('path');const file=path.resolve(__dirname,'../../index.html');let h=fs.readFileSync(file,'utf8');
if(!h.includes('Multiverse Arena v0.9.5.7.2.1 — Fight Freeze Hotfix')){
 if(!h.includes('Multiverse Arena v0.9.5.7.2 — Combat Polish & Immersion'))throw new Error('v095721 base marker missing');
 h=h.replaceAll('?v=09572','?v=095721');
 h=h.replace('<title>Multiverse Arena v0.9.5.7.2 — Combat Polish & Immersion</title>','<title>Multiverse Arena v0.9.5.7.2.1 — Fight Freeze Hotfix</title>');
 h=h.replaceAll('v0.9.5.7.2</span>','v0.9.5.7.2.1</span>');
 h=h.replaceAll('📋 UPDATE LOG • v0.9.5.7.2','📋 UPDATE LOG • v0.9.5.7.2.1');
 h=h.replace('<div class="dash-stat latest-stat"><small>LATEST UPDATE</small><b>v0.9.5.7.2</b><span>Villain Gauntlet • Combat Polish • Immersion</span></div>','<div class="dash-stat latest-stat"><small>LATEST UPDATE</small><b>v0.9.5.7.2.1</b><span>Fight Freeze Hotfix • Performance Stability</span></div>');
 h=h.replace('IMMERSION CORE • v0.9.5.7.2','STABLE IMMERSION CORE • v0.9.5.7.2.1');
 fs.writeFileSync(file,h);
}
for(const m of ['Multiverse Arena v0.9.5.7.2.1 — Fight Freeze Hotfix','polish-v09572.js?v=095721','VILLAIN GAUNTLET','Fight Freeze Hotfix • Performance Stability'])if(!h.includes(m))throw new Error('v095721 marker missing: '+m);console.log('v0.9.5.7.2.1 hotfix index guard passed');
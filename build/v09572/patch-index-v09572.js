const fs=require('fs');const path=require('path');const file=path.resolve(__dirname,'../../index.html');let h=fs.readFileSync(file,'utf8');
if(!h.includes('Multiverse Arena v0.9.5.7.2 — Combat Polish & Immersion')){
 if(!h.includes('Multiverse Arena v0.9.5.7.1 — UI Revamp'))throw new Error('v09572 base marker missing');
 h=h.replaceAll('?v=09571','?v=09572');
 h=h.replace('<title>Multiverse Arena v0.9.5.7.1 — UI Revamp</title>','<title>Multiverse Arena v0.9.5.7.2 — Combat Polish & Immersion</title>');
 h=h.replace('<link rel="stylesheet" href="ui-v09571.css?v=09572">','<link rel="stylesheet" href="ui-v09571.css?v=09572">\n<link rel="stylesheet" href="polish-v09572.css?v=09572">');
 h=h.replace('MULTIVERSE ARENA <span class="tag">v0.9.5.7.1</span>','MULTIVERSE ARENA <span class="tag">v0.9.5.7.2</span>');
 h=h.replace('⚔️ PLAY CAMPAIGN','⚔️ VILLAIN GAUNTLET');
 h=h.replace('📋 UPDATE LOG • v0.9.5.7.1','📋 UPDATE LOG • v0.9.5.7.2');
 h=h.replace('<div class="dash-stat latest-stat"><small>LATEST UPDATE</small><b>v0.9.5.7.1</b><span>Premium UI Revamp • UI Sounds • Polish</span></div>','<div class="dash-stat latest-stat"><small>LATEST UPDATE</small><b>v0.9.5.7.2</b><span>Villain Gauntlet • Combat Polish • Immersion</span></div>');
 h=h.replace('UI REVAMP • v0.9.5.7.1','IMMERSION CORE • v0.9.5.7.2');
 h=h.replace('</head>','<link rel="stylesheet" href="polish-v09572.css?v=09572">\n</head>').replace('<link rel="stylesheet" href="polish-v09572.css?v=09572">\n<link rel="stylesheet" href="polish-v09572.css?v=09572">','<link rel="stylesheet" href="polish-v09572.css?v=09572">');
 h=h.replace('</body>','<script src="polish-v09572.js?v=09572"></script>\n<script src="qa-v09572.js?v=09572"></script>\n</body>');
 fs.writeFileSync(file,h);
}
for(const m of ['Multiverse Arena v0.9.5.7.2 — Combat Polish & Immersion','polish-v09572.css','polish-v09572.js','qa-v09572.js','VILLAIN GAUNTLET'])if(!h.includes(m))throw new Error('v09572 index marker missing: '+m);console.log('v0.9.5.7.2 index guard passed');
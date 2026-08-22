const fs=require('fs');
const path=require('path');
const file=path.resolve(__dirname,'../../index.html');
let html=fs.readFileSync(file,'utf8');
const rep=(from,to,label)=>{if(!html.includes(from))throw new Error('v0.9.5.3 index marker missing: '+label);html=html.replace(from,to)};
if(html.includes('v0.9.5.2')){
 html=html.replaceAll('?v=0952','?v=0953');
 rep('<title>Fight Arena v0.9.5.2 — Street War</title>','<title>Fight Arena v0.9.5.3 — Vigilante Line</title>','title');
 rep('<link rel="stylesheet" href="street-v0952.css?v=0953">','<link rel="stylesheet" href="street-v0952.css?v=0953">\n<link rel="stylesheet" href="vigilante-v0953.css?v=0953">','vigilante css');
 rep('<div class="brand">FIGHT ARENA <span class="tag">v0.9.5.2</span></div>','<div class="brand">FIGHT ARENA <span class="tag">v0.9.5.3</span></div>','brand');
 rep('<div class="hero-copy"><span class="tag">PHASE 1 • STREET WAR</span><h1>THE TRAINING IS OVER.<br>ENTER THE STREETS.</h1><p>Crossbones and Bullseye open Phase 1 with two premium Marvel encounters built around tactical pressure and precision control.</p>','<div class="hero-copy"><span class="tag">PHASE 1 • VIGILANTE LINE</span><h1>THE STREETS FIGHT BACK.<br>ADAPT OR FALL.</h1><p>Punisher and Taskmaster complete Section 2 with a Campaign fighter unlock, multi-weapon combat and cleaner fight flow.</p>','hero');
 rep('📋 UPDATE LOG • v0.9.5.2','📋 UPDATE LOG • v0.9.5.3','update button');
 rep('<div class="dash-stat latest-stat"><small>LATEST UPDATE</small><b>v0.9.5.2</b><span>Crossbones • Bullseye • Street War</span></div>','<div class="dash-stat latest-stat"><small>LATEST UPDATE</small><b>v0.9.5.3</b><span>Punisher • Taskmaster • Rematch • Intro Pause</span></div>','latest');
 rep('<div class="build-health"><span>◆ BUILD HEALTH</span><b>STREET WAR CORE • v0.9.5.2</b></div>','<div class="build-health"><span>◆ BUILD HEALTH</span><b>VIGILANTE CORE • v0.9.5.3</b></div>','health');
 rep('<span class="tag">v0.9.5.2 • STREET WAR</span><h2>PHASE 1 HAS BEGUN.</h2><div class="changelog">','<span class="tag">v0.9.5.3 • VIGILANTE LINE</span><h2>SECTION 2 IS LIVE.</h2><div class="changelog">\n<div class="log-item"><div class="log-icon">💀</div><div><b>Punisher — Fight 3 + Fighter Unlock</b><p>Iconic skull tactical build with Rifle Burst, Frag Grenade, Combat Roll and War Zone. Defeat him to unlock Punisher in the Collection.</p></div></div>\n<div class="log-item"><div class="log-icon">🛡️</div><div><b>Taskmaster — Fight 4</b><p>Classic skull-mask, blue hood and orange-white combat build with shield, sword, bow and Combat Masterclass.</p></div></div>\n<div class="log-item"><div class="log-icon">↻</div><div><b>REMATCH</b><p>Fight the same target again directly from the results screen.</p></div></div>\n<div class="log-item"><div class="log-icon">⏱️</div><div><b>Readable Fight Intros</b><p>Campaign fights now wait 2.6 seconds before movement, attacks, AI and the timer begin.</p></div></div>','update log');
 rep('<button class="primary" id="continue">CONTINUE</button><button id="menu">MAIN MENU</button>','<button class="primary" id="continue">CONTINUE</button><button id="rematch">↻ REMATCH</button><button id="menu">MAIN MENU</button>','rematch button');
 rep('FIGHT ARENA v0.9.5.2</div><h2>CHOOSE YOUR DEVICE','FIGHT ARENA v0.9.5.3</div><h2>CHOOSE YOUR DEVICE','device version');
 rep('<script src="build/v0952/transform-v0952.js?v=0953"></script>','<script src="build/v0952/transform-v0952.js?v=0953"></script>\n<script src="build/v0953/transform-v0953.js?v=0953"></script>','transform');
 rep('<script src="core-v0952.js?v=0953"></script>','<script src="core-v0953.js?v=0953"></script>','core');
 rep('<script src="campaign-v0952.js?v=0953"></script>','<script src="campaign-v0953.js?v=0953"></script>','campaign');
 rep('<script src="qa-v0952.js?v=0953"></script>','<script src="qa-v0953.js?v=0953"></script>','qa');
 fs.writeFileSync(file,html);
}
for(const marker of ['v0.9.5.3','PHASE 1 • VIGILANTE LINE','vigilante-v0953.css','id="rematch"','build/v0953/transform-v0953.js','core-v0953.js','campaign-v0953.js','qa-v0953.js'])if(!html.includes(marker))throw new Error('v0.9.5.3 index release marker missing: '+marker);
console.log('v0.9.5.3 index release guard passed');

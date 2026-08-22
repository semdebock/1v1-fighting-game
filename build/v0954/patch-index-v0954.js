const fs=require('fs');
const path=require('path');
const file=path.resolve(__dirname,'../../index.html');
let html=fs.readFileSync(file,'utf8');
if(!html.includes('Fight Arena v0.9.5.4 — Raw Power')){
 if(!html.includes('Fight Arena v0.9.5.3.1 — Result Flow Polish'))throw new Error('v0.9.5.4 index base marker missing');
 html=html.replaceAll('?v=09531','?v=0954');
 html=html.replace('<title>Fight Arena v0.9.5.3.1 — Result Flow Polish</title>','<title>Fight Arena v0.9.5.4 — Raw Power</title>');
 html=html.replace('<link rel="stylesheet" href="results-v09531.css?v=0954">','<link rel="stylesheet" href="results-v09531.css?v=0954">\n<link rel="stylesheet" href="sinister-v0954.css?v=0954">');
 html=html.replace('<div class="brand">FIGHT ARENA <span class="tag">v0.9.5.3.1</span></div>','<div class="brand">FIGHT ARENA <span class="tag">v0.9.5.4</span></div>');
 html=html.replace('<div class="hero-copy"><span class="tag">PHASE 1 • VIGILANTE LINE</span><h1>THE STREETS FIGHT BACK.<br>ADAPT OR FALL.</h1><p>Punisher and Taskmaster complete Section 2 with a Campaign fighter unlock, multi-weapon combat and cleaner fight flow.</p>','<div class="hero-copy"><span class="tag">PHASE 2 • RAW POWER</span><h1>THE SINISTER THREAT<br>HITS HARD.</h1><p>Rhino and Electro launch Phase 2 with cinematic armor, living electricity and two radically different combat styles.</p>');
 html=html.replace('📋 UPDATE LOG • v0.9.5.3.1','📋 UPDATE LOG • v0.9.5.4');
 html=html.replace('<div class="dash-stat latest-stat"><small>LATEST UPDATE</small><b>v0.9.5.3.1</b><span>Results Flow • Punisher Unlock • Next Fight</span></div>','<div class="dash-stat latest-stat"><small>LATEST UPDATE</small><b>v0.9.5.4</b><span>Rhino • Electro • Raw Power</span></div>');
 html=html.replace('RESULT FLOW CORE • v0.9.5.3.1','RAW POWER CORE • v0.9.5.4');
 html=html.replace('<div id="deviceChooser" class="device-overlay hidden" role="dialog" aria-modal="true" aria-label="Choose device layout"><div class="device-modal"><div class="eyebrow">FIGHT ARENA v0.9.5.3.1</div>','<div id="deviceChooser" class="device-overlay hidden" role="dialog" aria-modal="true" aria-label="Choose device layout"><div class="device-modal"><div class="eyebrow">FIGHT ARENA v0.9.5.4</div>');
 html=html.replace('<span class="tag">v0.9.5.3.1 • RESULT FLOW POLISH</span><h2>FIGHTS NOW END CLEANLY.</h2><div class="changelog">','<span class="tag">v0.9.5.4 • RAW POWER</span><h2>PHASE 2 HAS BEGUN.</h2><div class="changelog"><div class="log-item"><div class="log-icon">🦏</div><div><b>Rhino — Phase 2 Fight 1</b><p>A cinematic mechanized juggernaut with Rhino Charge, Horn Toss, Ground Quake and Stampede. His fight is built around readable momentum and brutal punish windows.</p></div></div><div class="log-item"><div class="log-icon">⚡</div><div><b>Electro — Phase 2 Fight 2</b><p>No Way Home-inspired yellow electricity, tactical detailing, Arc Bolt, Volt Blink, Chain Lightning and Power Grid. Below 45% HP he enters Overcharge.</p></div></div><div class="log-item"><div class="log-icon">🕷️</div><div><b>Sinister Threat • Raw Power</b><p>Defeat Kingpin to open Phase 2. Rhino unlocks first, Electro follows, while Mysterio and Green Goblin remain preserved for the next Section.</p></div></div><div class="log-item"><div class="log-icon">🏁</div><div><b>v0.9.5.3.1 Result Flow retained</b><p>Centered results, NEXT FIGHT, REMATCH, MAIN MENU, one-time Punisher unlock reveal and the 2.6 second fight-intro pause all remain intact.</p></div></div>');
 html=html.replace('<script src="build/v09531/transform-v09531.js?v=0954"></script>','<script src="build/v09531/transform-v09531.js?v=0954"></script>\n<script src="build/v0954/transform-v0954.js?v=0954"></script>');
 html=html.replace('core-v09531.js?v=0954','core-v0954.js?v=0954');
 html=html.replace('campaign-v09531.js?v=0954','campaign-v0954.js?v=0954');
 html=html.replace('qa-v09531.js?v=0954','qa-v0954.js?v=0954');
 fs.writeFileSync(file,html);
}
for(const marker of ['Fight Arena v0.9.5.4 — Raw Power','PHASE 2 • RAW POWER','sinister-v0954.css','build/v0954/transform-v0954.js','core-v0954.js','campaign-v0954.js','qa-v0954.js','Rhino • Electro • Raw Power','id="rematch"','id="continue">NEXT FIGHT'])if(!html.includes(marker))throw new Error('v0.9.5.4 index marker missing: '+marker);
console.log('v0.9.5.4 index release guard passed');

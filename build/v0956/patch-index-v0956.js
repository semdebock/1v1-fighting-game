const fs=require('fs');
const path=require('path');
const file=path.resolve(__dirname,'../../index.html');
let html=fs.readFileSync(file,'utf8');
if(!html.includes('Fight Arena v0.9.5.6 — Goblin Rework & Training Lab')){
 if(!html.includes('Fight Arena v0.9.5.5 — Smoke & Chaos'))throw new Error('v0.9.5.6 index base marker missing');
 html=html.replaceAll('?v=0955','?v=0956');
 html=html.replace('<title>Fight Arena v0.9.5.5 — Smoke & Chaos</title>','<title>Fight Arena v0.9.5.6 — Goblin Rework & Training Lab</title>');
 html=html.replace('<link rel="stylesheet" href="smoke-v0955.css?v=0956">','<link rel="stylesheet" href="smoke-v0955.css?v=0956">\n<link rel="stylesheet" href="goblin-v0956.css?v=0956">');
 html=html.replace('<div class="brand">FIGHT ARENA <span class="tag">v0.9.5.5</span></div>','<div class="brand">FIGHT ARENA <span class="tag">v0.9.5.6</span></div>');
 html=html.replace('<div class="hero-copy"><span class="tag">PHASE 2 • SMOKE & CHAOS</span><h1>TRUST NOTHING.<br>EXPECT CHAOS.</h1><p>Mysterio and Green Goblin return from the preserved Fight Arena roster as fully playable Phase 2 encounters.</p>','<div class="hero-copy"><span class="tag">PHASE 2 • SMOKE & CHAOS</span><h1>THE GOBLIN<br>TAKES FLIGHT.</h1><p>Green Goblin now has a premium armored rebuild, an iconic Goblin Glider and a true aerial combat kit. Training Lab also received a deeper reliability pass.</p>');
 html=html.replace('📋 UPDATE LOG • v0.9.5.5','📋 UPDATE LOG • v0.9.5.6');
 html=html.replace('<div class="dash-stat latest-stat"><small>LATEST UPDATE</small><b>v0.9.5.5</b><span>Mysterio • Green Goblin • Training Fix</span></div>','<div class="dash-stat latest-stat"><small>LATEST UPDATE</small><b>v0.9.5.6</b><span>Green Goblin Rework • Training Lab Fix</span></div>');
 html=html.replace('SMOKE & CHAOS CORE • v0.9.5.5','GOBLIN REWORK CORE • v0.9.5.6');
 html=html.replace('<div id="deviceChooser" class="device-overlay hidden" role="dialog" aria-modal="true" aria-label="Choose device layout"><div class="device-modal"><div class="eyebrow">FIGHT ARENA v0.9.5.5</div>','<div id="deviceChooser" class="device-overlay hidden" role="dialog" aria-modal="true" aria-label="Choose device layout"><div class="device-modal"><div class="eyebrow">FIGHT ARENA v0.9.5.6</div>');
 html=html.replace('<span class="tag">v0.9.5.5 • SMOKE & CHAOS</span><h2>SECTION 2 IS LIVE.</h2><div class="changelog">','<span class="tag">v0.9.5.6 • GOBLIN REWORK + TRAINING LAB</span><h2>THE GOBLIN TAKES FLIGHT.</h2><div class="changelog"><div class="log-item"><div class="log-icon">🛸</div><div><b>Green Goblin — Premium Rebuild</b><p>Norman now has layered green armor, purple hood and gear, a more sinister Goblin face and his iconic metallic Goblin Glider in combat and previews.</p></div></div><div class="log-item"><div class="log-icon">🎃</div><div><b>True Goblin Combat Kit</b><p>Pumpkin Bomb is joined by Glider Rush, Bomb Barrage and Razor Bat so Green Goblin finally fights like an aerial chaos villain instead of a basic ground enemy.</p></div></div><div class="log-item"><div class="log-icon">🎯</div><div><b>Training Lab Reliability Pass</b><p>FILL SPECIAL now hard-syncs internal charge, the visible bar, percentage text and Special button. Black Panther also receives 100% Kinetic Energy.</p></div></div><div class="log-item"><div class="log-icon">🧹</div><div><b>True Training Reset</b><p>RESET now clears running projectiles/effects and restores health, positions, movement, busy states, cooldowns, Special, hero systems and fighter visuals in one clean reset.</p></div></div>');
 html=html.replace('<script src="build/v0955/transform-v0955.js?v=0956"></script>','<script src="build/v0955/transform-v0955.js?v=0956"></script>\n<script src="build/v0956/transform-v0956.js?v=0956"></script>');
 html=html.replace('core-v0955.js?v=0956','core-v0956.js?v=0956');
 html=html.replace('campaign-v0955.js?v=0956','campaign-v0956.js?v=0956');
 html=html.replace('qa-v0955.js?v=0956','qa-v0956.js?v=0956');
 fs.writeFileSync(file,html);
}
for(const marker of ['Fight Arena v0.9.5.6 — Goblin Rework & Training Lab','THE GOBLIN<br>TAKES FLIGHT.','goblin-v0956.css','build/v0956/transform-v0956.js','core-v0956.js','campaign-v0956.js','qa-v0956.js','Green Goblin Rework • Training Lab Fix','id="trainingSpecial"','id="trainingReset"','id="rematch"'])if(!html.includes(marker))throw new Error('v0.9.5.6 index marker missing: '+marker);
console.log('v0.9.5.6 index release guard passed');

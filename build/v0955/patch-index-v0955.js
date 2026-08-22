const fs=require('fs');
const path=require('path');
const file=path.resolve(__dirname,'../../index.html');
let html=fs.readFileSync(file,'utf8');
if(!html.includes('Fight Arena v0.9.5.5 — Smoke & Chaos')){
 if(!html.includes('Fight Arena v0.9.5.4 — Raw Power'))throw new Error('v0.9.5.5 index base marker missing');
 html=html.replaceAll('?v=0954','?v=0955');
 html=html.replace('<title>Fight Arena v0.9.5.4 — Raw Power</title>','<title>Fight Arena v0.9.5.5 — Smoke & Chaos</title>');
 html=html.replace('<link rel="stylesheet" href="sinister-v0954.css?v=0955">','<link rel="stylesheet" href="sinister-v0954.css?v=0955">\n<link rel="stylesheet" href="smoke-v0955.css?v=0955">');
 html=html.replace('<div class="brand">FIGHT ARENA <span class="tag">v0.9.5.4</span></div>','<div class="brand">FIGHT ARENA <span class="tag">v0.9.5.5</span></div>');
 html=html.replace('<div class="hero-copy"><span class="tag">PHASE 2 • RAW POWER</span><h1>THE SINISTER THREAT<br>HITS HARD.</h1><p>Rhino and Electro launch Phase 2 with cinematic armor, living electricity and two radically different combat styles.</p>','<div class="hero-copy"><span class="tag">PHASE 2 • SMOKE & CHAOS</span><h1>TRUST NOTHING.<br>EXPECT CHAOS.</h1><p>Mysterio and Green Goblin return from the preserved Fight Arena roster as fully playable Phase 2 encounters.</p>');
 html=html.replace('📋 UPDATE LOG • v0.9.5.4','📋 UPDATE LOG • v0.9.5.5');
 html=html.replace('<div class="dash-stat latest-stat"><small>LATEST UPDATE</small><b>v0.9.5.4</b><span>Rhino • Electro • Raw Power</span></div>','<div class="dash-stat latest-stat"><small>LATEST UPDATE</small><b>v0.9.5.5</b><span>Mysterio • Green Goblin • Training Fix</span></div>');
 html=html.replace('RAW POWER CORE • v0.9.5.4','SMOKE & CHAOS CORE • v0.9.5.5');
 html=html.replace('<div id="deviceChooser" class="device-overlay hidden" role="dialog" aria-modal="true" aria-label="Choose device layout"><div class="device-modal"><div class="eyebrow">FIGHT ARENA v0.9.5.4</div>','<div id="deviceChooser" class="device-overlay hidden" role="dialog" aria-modal="true" aria-label="Choose device layout"><div class="device-modal"><div class="eyebrow">FIGHT ARENA v0.9.5.5</div>');
 html=html.replace('<span class="tag">v0.9.5.4 • RAW POWER</span><h2>PHASE 2 HAS BEGUN.</h2><div class="changelog">','<span class="tag">v0.9.5.5 • SMOKE & CHAOS</span><h2>SECTION 2 IS LIVE.</h2><div class="changelog"><div class="log-item"><div class="log-icon">🔮</div><div><b>Mysterio — Phase 2 Fight 3</b><p>The preserved illusion-controller returns with Mystic Orbs, Illusion Clone and Smoke Teleport, now rebalanced for Phase 2 progression.</p></div></div><div class="log-item"><div class="log-icon">🎃</div><div><b>Green Goblin — Phase 2 Fight 4</b><p>The preserved Goblin bomber is live after Mysterio with stronger Phase 2 health, damage and rewards while keeping his established Pumpkin Bomb combat identity.</p></div></div><div class="log-item"><div class="log-icon">🎯</div><div><b>Training Lab Fix</b><p>FILL SPECIAL now force-syncs the special meter for every fighter and fills Black Panther’s Kinetic Energy too. RESET also restores health, positions, cooldowns, special charge and temporary hero states.</p></div></div><div class="log-item"><div class="log-icon">🧹</div><div><b>Stable systems retained</b><p>Centered results, NEXT FIGHT, REMATCH, Punisher unlock, 2.6 second fight intros and Mysterio clone cleanup remain intact.</p></div></div>');
 html=html.replace('<script src="build/v0954/transform-v0954.js?v=0955"></script>','<script src="build/v0954/transform-v0954.js?v=0955"></script>\n<script src="build/v0955/transform-v0955.js?v=0955"></script>');
 html=html.replace('core-v0954.js?v=0955','core-v0955.js?v=0955');
 html=html.replace('campaign-v0954.js?v=0955','campaign-v0955.js?v=0955');
 html=html.replace('qa-v0954.js?v=0955','qa-v0955.js?v=0955');
 fs.writeFileSync(file,html);
}
for(const marker of ['Fight Arena v0.9.5.5 — Smoke & Chaos','PHASE 2 • SMOKE & CHAOS','smoke-v0955.css','build/v0955/transform-v0955.js','core-v0955.js','campaign-v0955.js','qa-v0955.js','Mysterio • Green Goblin • Training Fix','id="trainingSpecial"','id="rematch"','id="continue">NEXT FIGHT'])if(!html.includes(marker))throw new Error('v0.9.5.5 index marker missing: '+marker);
console.log('v0.9.5.5 index release guard passed');

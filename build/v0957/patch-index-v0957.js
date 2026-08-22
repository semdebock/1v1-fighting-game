const fs=require('fs');
const path=require('path');
const file=path.resolve(__dirname,'../../index.html');
let html=fs.readFileSync(file,'utf8');
if(!html.includes('Multiverse Arena v0.9.5.7 — Master Plan')){
 if(!html.includes('v0.9.5.6 — Goblin Rework & Training Lab'))throw new Error('v0.9.5.7 index base marker missing');
 html=html.replaceAll('?v=0956','?v=0957');
 html=html.replace('<title>Fight Arena v0.9.5.6 — Goblin Rework & Training Lab</title>','<title>Multiverse Arena v0.9.5.7 — Master Plan</title>');
 html=html.replace('<title>Multiverse Arena v0.9.5.6 — Goblin Rework & Training Lab</title>','<title>Multiverse Arena v0.9.5.7 — Master Plan</title>');
 html=html.replace('<link rel="stylesheet" href="goblin-v0956.css?v=0957">','<link rel="stylesheet" href="goblin-v0956.css?v=0957">\n<link rel="stylesheet" href="masterplan-v0957.css?v=0957">');
 html=html.replace('<div class="brand">FIGHT ARENA <span class="tag">v0.9.5.6</span></div>','<div class="brand">MULTIVERSE ARENA <span class="tag">v0.9.5.7</span></div>');
 html=html.replace('<div class="brand">MULTIVERSE ARENA <span class="tag">v0.9.5.6</span></div>','<div class="brand">MULTIVERSE ARENA <span class="tag">v0.9.5.7</span></div>');
 html=html.replace('<div class="hero-copy"><span class="tag">PHASE 2 • SMOKE & CHAOS</span><h1>THE GOBLIN<br>TAKES FLIGHT.</h1><p>Green Goblin now has a premium armored rebuild, an iconic Goblin Glider and a true aerial combat kit. Training Lab also received a deeper reliability pass.</p>','<div class="hero-copy"><span class="tag">PHASE 2 • MASTER PLAN</span><h1>THE ARMS<br>ARE THINKING.</h1><p>Doctor Octopus closes Phase 2 as a brutal tactical boss. Read four intelligent tentacles, survive escalating phases and strike only when Otto overextends.</p>');
 html=html.replace('📋 UPDATE LOG • v0.9.5.6','📋 UPDATE LOG • v0.9.5.7');
 html=html.replace('<div class="dash-stat latest-stat"><small>LATEST UPDATE</small><b>v0.9.5.6</b><span>Green Goblin Rework • Training Lab Fix</span></div>','<div class="dash-stat latest-stat"><small>LATEST UPDATE</small><b>v0.9.5.7</b><span>Doctor Octopus • Master Plan • Rewards</span></div>');
 html=html.replace('GOBLIN REWORK CORE • v0.9.5.6','MASTER PLAN CORE • v0.9.5.7');
 html=html.replace('FIGHT ARENA v0.9.5.6','MULTIVERSE ARENA v0.9.5.7');
 html=html.replace('MULTIVERSE ARENA v0.9.5.6','MULTIVERSE ARENA v0.9.5.7');
 html=html.replace('<span class="tag">v0.9.5.6 • GOBLIN REWORK + TRAINING LAB</span><h2>THE GOBLIN TAKES FLIGHT.</h2><div class="changelog">','<span class="tag">v0.9.5.7 • MASTER PLAN</span><h2>THE ARMS ARE THINKING.</h2><div class="changelog"><div class="log-item"><div class="log-icon">🐙</div><div><b>Doctor Octopus — Phase 2 Boss</b><p>A premium Otto Octavius build with four articulated mechanical arms, escalating AI phases and a difficult tactical boss encounter.</p></div></div><div class="log-item"><div class="log-icon">🦾</div><div><b>Intelligent Tentacle Combat</b><p>Tentacle Jab, Arm Sweep, Pincer Lock, Tentacle Grab and Four-Arm Crossfire force you to jump, reposition and wait for recovery windows instead of button-mashing.</p></div></div><div class="log-item"><div class="log-icon">🎁</div><div><b>Visible Villain Rewards</b><p>Every Campaign villain now shows the coins, XP, gems or fighter unlock available for defeating them. Match Results also clearly show exactly what you earned.</p></div></div><div class="log-item"><div class="log-icon">🏆</div><div><b>Master Plan Reward</b><p>Defeat Doctor Octopus for 1,400 coins, 260 XP and 10 gems and complete the five-fight Sinister Threat phase.</p></div></div>');
 html=html.replace('<script src="build/v0956/transform-v0956.js?v=0957"></script>','<script src="build/v0956/transform-v0956.js?v=0957"></script>\n<script src="build/v0957/transform-v0957.js?v=0957"></script>');
 html=html.replace('core-v0956.js?v=0957','core-v0957.js?v=0957');
 html=html.replace('campaign-v0956.js?v=0957','campaign-v0957.js?v=0957');
 html=html.replace('qa-v0956.js?v=0957','qa-v0957.js?v=0957');
 fs.writeFileSync(file,html);
}
for(const marker of ['Multiverse Arena v0.9.5.7 — Master Plan','PHASE 2 • MASTER PLAN','THE ARMS<br>ARE THINKING.','masterplan-v0957.css','build/v0957/transform-v0957.js','core-v0957.js','campaign-v0957.js','qa-v0957.js','Doctor Octopus • Master Plan • Rewards','id="trainingSpecial"','id="rematch"','id="continue">NEXT FIGHT'])if(!html.includes(marker))throw new Error('v0.9.5.7 index marker missing: '+marker);
console.log('v0.9.5.7 index release guard passed');

/* Fight Arena v0.9.5.5 — Smoke & Chaos campaign */
(async()=>{
'use strict';
try{
 const r=await fetch('campaign-v0954.js?v=0955',{cache:'no-store'});if(!r.ok)throw new Error(`campaign-v0954.js HTTP ${r.status}`);
 let code=await r.text();
 const rep=(from,to,label)=>{if(!code.includes(from))throw new Error('v0.9.5.5 campaign marker missing: '+label);code=code.replace(from,to)};
 rep(" Electro:{lesson:'MOBILITY UNDER FIRE',tip:'Yellow lightning owns the range. Keep moving through Arc Bolts and escape the target marker before Power Grid lands.',abilities:['Arc Bolt','Volt Blink','Chain Lightning','Power Grid'],reward:'800 🪙 • 165 XP'}\n};"," Electro:{lesson:'MOBILITY UNDER FIRE',tip:'Yellow lightning owns the range. Keep moving through Arc Bolts and escape the target marker before Power Grid lands.',abilities:['Arc Bolt','Volt Blink','Chain Lightning','Power Grid'],reward:'800 🪙 • 165 XP'},\n Mysterio:{lesson:'ILLUSION CONTROL',tip:'Ignore the clone bait, track the real body and punish the smoke teleport recovery.',abilities:['Mystic Orb','Illusion Clone','Smoke Teleport'],reward:'900 🪙 • 180 XP'},\n 'Green Goblin':{lesson:'CHAOS MANAGEMENT',tip:'Stay unpredictable through Pumpkin Bomb pressure and counter when Norman overcommits.',abilities:['Pumpkin Bomb','Goblin Pressure','Aerial Assault'],reward:'1000 🪙 • 195 XP'}\n};",'details');
 rep("fights:[{name:'Mysterio',slot:3,built:true,assigned:true},{name:'Green Goblin',slot:4,built:true,assigned:true}]","fights:[{name:'Mysterio',slot:3,built:true},{name:'Green Goblin',slot:4,built:true}]",'live smoke chaos fights');
 rep("phase2Order=['Rhino','Electro'];","phase2Order=['Rhino','Electro','Mysterio','Green Goblin'];",'phase2 order');
 rep("function rawPowerComplete(){return phase2Order.every(won)}","function rawPowerComplete(){return ['Rhino','Electro'].every(won)}function smokeChaosComplete(){return ['Mysterio','Green Goblin'].every(won)}",'section completion');
 rep("!rawPowerComplete()?'PHASE 2 — SINISTER THREAT':'RAW POWER CLEARED'","!smokeChaosComplete()?'PHASE 2 — SINISTER THREAT':'SMOKE & CHAOS CLEARED'",'phase title');
 rep("!rawPowerComplete()?'Rhino and Electro open Sinister Threat with two completely different power fights.':'Mysterio and Green Goblin are preserved as the next Section while Doctor Octopus remains the planned Phase Boss.'","!rawPowerComplete()?'Rhino and Electro open Sinister Threat with two completely different power fights.':!smokeChaosComplete()?'Mysterio and Green Goblin are now live in Smoke & Chaos.':'Doctor Octopus remains the planned Phase Boss.'",'phase description');
 rep("<div><small>RAW POWER</small>${phase2Order.filter(won).length}/2</div>","<div><small>PHASE 2</small>${phase2Order.filter(won).length}/4</div>",'phase stats');
 rep("`${cleared}/2 RAW POWER`","`${cleared}/4 CLEARED`",'phase label');
 rep("phase.id==='phase2'&&section.name==='RAW POWER'?'<span class=\"raw-power-live\">● NEW • v0.9.5.4</span>':phase.id==='phase1'&&section.name==='VIGILANTE LINE'?","phase.id==='phase2'&&section.name==='RAW POWER'?'<span class=\"raw-power-live\">✓ LIVE</span>':phase.id==='phase2'&&section.name==='SMOKE & CHAOS'?'<span class=\"smoke-chaos-live\">● NEW • v0.9.5.5</span>':phase.id==='phase1'&&section.name==='VIGILANTE LINE'?",'section badge');
 rep("!rawPowerComplete()?`Phase 2 • ${phase2Order.indexOf(n)+1}/5`:'Phase 2 • Smoke & Chaos'","!smokeChaosComplete()?`Phase 2 • ${phase2Order.indexOf(n)+1}/5`:'Phase 2 • Master Plan'",'dashboard phase');
 rep("latest.querySelector('b').textContent='v0.9.5.4';latest.querySelector('span').textContent='Rhino • Electro • Raw Power'","latest.querySelector('b').textContent='v0.9.5.5';latest.querySelector('span').textContent='Mysterio • Green Goblin • Training Fix'",'latest update');
 rep("document.title='Fight Arena v0.9.5.4 — Raw Power'","document.title='Fight Arena v0.9.5.5 — Smoke & Chaos'",'title');
 rep("x.textContent='v0.9.5.4'","x.textContent='v0.9.5.5'",'brand version');
 rep("hero.querySelector('.tag').textContent='PHASE 2 • RAW POWER';hero.querySelector('h1').innerHTML='THE SINISTER THREAT<br>HITS HARD.';hero.querySelector('p').textContent='Rhino and Electro launch Phase 2 with cinematic armor, living electricity and two radically different combat styles.'","hero.querySelector('.tag').textContent='PHASE 2 • SMOKE & CHAOS';hero.querySelector('h1').innerHTML='TRUST NOTHING.<br>EXPECT CHAOS.';hero.querySelector('p').textContent='Mysterio and Green Goblin return from the preserved Fight Arena roster as fully playable Phase 2 encounters.'",'home hero');
 rep("$('updates').textContent='📋 UPDATE LOG • v0.9.5.4'","$('updates').textContent='📋 UPDATE LOG • v0.9.5.5'",'updates label');
 rep("health.textContent='RAW POWER CORE • v0.9.5.4'","health.textContent='SMOKE & CHAOS CORE • v0.9.5.5'",'health label');
 rep("chooser.textContent='FIGHT ARENA v0.9.5.4'","chooser.textContent='FIGHT ARENA v0.9.5.5'",'chooser');
 rep("window.FightArenaCampaignV0954={ok:true,phases:PHASES,standby:[...STANDBY],render,prologueComplete,phase1Complete,rawPowerComplete}","window.FightArenaCampaignV0955={ok:true,phases:PHASES,standby:[...STANDBY],render,prologueComplete,phase1Complete,rawPowerComplete,smokeChaosComplete}",'campaign api');
 rep("window.FightArena?.version==='0.9.5.4'","window.FightArena?.version==='0.9.5.5'",'init version');
 code=code.replace("$('diff').textContent='v0.9.5.4 • RAW POWER'","$('diff').textContent='v0.9.5.5 • SMOKE & CHAOS'");
 (0,eval)(code);
}catch(err){
 console.error('[Fight Arena v0.9.5.5 campaign]',err);
 const h=document.querySelector('.build-health b');if(h)h.textContent='v0.9.5.5 • CAMPAIGN LOAD ERROR';
}
})();

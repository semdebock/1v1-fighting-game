/* Multiverse Arena v0.9.5.7 — Master Plan campaign */
(async()=>{
'use strict';
try{
 const r=await fetch('campaign-v0954.js?v=0957',{cache:'no-store'});if(!r.ok)throw new Error(`campaign-v0954.js HTTP ${r.status}`);
 let code=await r.text();
 const rep=(from,to,label)=>{if(!code.includes(from))throw new Error('v0.9.5.7 campaign marker missing: '+label);code=code.replace(from,to)};
 rep(" Electro:{lesson:'MOBILITY UNDER FIRE',tip:'Yellow lightning owns the range. Keep moving through Arc Bolts and escape the target marker before Power Grid lands.',abilities:['Arc Bolt','Volt Blink','Chain Lightning','Power Grid'],reward:'800 🪙 • 165 XP'}\n};"," Electro:{lesson:'MOBILITY UNDER FIRE',tip:'Yellow lightning owns the range. Keep moving through Arc Bolts and escape the target marker before Power Grid lands.',abilities:['Arc Bolt','Volt Blink','Chain Lightning','Power Grid'],reward:'800 🪙 • 165 XP'},\n Mysterio:{lesson:'ILLUSION CONTROL',tip:'Ignore the clone bait, track the real body and punish the smoke teleport recovery.',abilities:['Mystic Orb','Illusion Clone','Smoke Teleport'],reward:'900 🪙 • 180 XP'},\n 'Green Goblin':{lesson:'AERIAL CHAOS',tip:'Norman fights from his Goblin Glider. Read the rush line, dodge the bomb patterns and punish the end of his aerial pressure.',abilities:['Pumpkin Bomb','Glider Rush','Bomb Barrage','Razor Bat'],reward:'1000 🪙 • 195 XP'},\n 'Doctor Octopus':{lesson:'TENTACLE DISCIPLINE',tip:'The arms punish panic. Jump the sweep, move out of Pincer Lock, respect the grab and attack during the green recovery window after an overextension.',abilities:['Tentacle Jab','Arm Sweep','Pincer Lock','Tentacle Grab','Four-Arm Crossfire'],reward:'1400 🪙 • 260 XP • 10 💎'}\n};",'phase2 details');
 rep("fights:[{name:'Mysterio',slot:3,built:true,assigned:true},{name:'Green Goblin',slot:4,built:true,assigned:true}]","fights:[{name:'Mysterio',slot:3,built:true},{name:'Green Goblin',slot:4,built:true}]",'live smoke chaos');
 rep("fights:[{name:'Doctor Octopus',slot:5,boss:true}]","fights:[{name:'Doctor Octopus',slot:5,built:true,boss:true}]",'doctor octopus live');
 rep("phase2Order=['Rhino','Electro'];","phase2Order=['Rhino','Electro','Mysterio','Green Goblin','Doctor Octopus'];",'phase2 order');
 rep("function rawPowerComplete(){return phase2Order.every(won)}","function rawPowerComplete(){return ['Rhino','Electro'].every(won)}function smokeChaosComplete(){return ['Mysterio','Green Goblin'].every(won)}function phase2Complete(){return phase2Order.every(won)}",'phase2 completion');
 rep("!rawPowerComplete()?'PHASE 2 — SINISTER THREAT':'RAW POWER CLEARED'","!phase2Complete()?'PHASE 2 — SINISTER THREAT':'SINISTER THREAT CLEARED'",'phase title');
 rep("!rawPowerComplete()?'Rhino and Electro open Sinister Threat with two completely different power fights.':'Mysterio and Green Goblin are preserved as the next Section while Doctor Octopus remains the planned Phase Boss.'","!rawPowerComplete()?'Rhino and Electro open Sinister Threat with two completely different power fights.':!smokeChaosComplete()?'Mysterio and Green Goblin control Smoke & Chaos.':'Doctor Octopus is live as the Master Plan Phase Boss. Survive the intelligent tentacle patterns and punish his recovery windows.'",'phase description');
 rep("<div><small>RAW POWER</small>${phase2Order.filter(won).length}/2</div>","<div><small>PHASE 2</small>${phase2Order.filter(won).length}/5</div>",'phase stats');
 rep("`${cleared}/2 RAW POWER`","`${cleared}/5 CLEARED`",'phase label');
 rep("phase.id==='phase2'&&section.name==='RAW POWER'?'<span class=\"raw-power-live\">● NEW • v0.9.5.4</span>':phase.id==='phase1'&&section.name==='VIGILANTE LINE'?","phase.id==='phase2'&&section.name==='RAW POWER'?'<span class=\"raw-power-live\">✓ LIVE</span>':phase.id==='phase2'&&section.name==='SMOKE & CHAOS'?'<span class=\"smoke-chaos-live\">✓ LIVE</span>':phase.id==='phase2'&&section.name==='MASTER PLAN'?'<span class=\"master-plan-live\">● BOSS LIVE • v0.9.5.7</span>':phase.id==='phase1'&&section.name==='VIGILANTE LINE'?",'section badges');
 rep("!rawPowerComplete()?`Phase 2 • ${phase2Order.indexOf(n)+1}/5`:'Phase 2 • Smoke & Chaos'","!phase2Complete()?`Phase 2 • ${phase2Order.indexOf(n)+1}/5`:'Phase 2 • COMPLETE'",'dashboard phase');
 rep("latest.querySelector('b').textContent='v0.9.5.4';latest.querySelector('span').textContent='Rhino • Electro • Raw Power'","latest.querySelector('b').textContent='v0.9.5.7';latest.querySelector('span').textContent='Doctor Octopus • Master Plan • Rewards'",'latest update');
 rep("document.title='Fight Arena v0.9.5.4 — Raw Power'","document.title='Multiverse Arena v0.9.5.7 — Master Plan'",'title');
 rep("x.textContent='v0.9.5.4'","x.textContent='v0.9.5.7'",'brand version');
 rep("hero.querySelector('.tag').textContent='PHASE 2 • RAW POWER';hero.querySelector('h1').innerHTML='THE SINISTER THREAT<br>HITS HARD.';hero.querySelector('p').textContent='Rhino and Electro launch Phase 2 with cinematic armor, living electricity and two radically different combat styles.'","hero.querySelector('.tag').textContent='PHASE 2 • MASTER PLAN';hero.querySelector('h1').innerHTML='THE ARMS<br>ARE THINKING.';hero.querySelector('p').textContent='Doctor Octopus closes Phase 2 as a brutal tactical boss. Read four intelligent tentacles, survive escalating phases and strike only when Otto overextends.'",'home hero');
 rep("$('updates').textContent='📋 UPDATE LOG • v0.9.5.4'","$('updates').textContent='📋 UPDATE LOG • v0.9.5.7'",'updates label');
 rep("health.textContent='RAW POWER CORE • v0.9.5.4'","health.textContent='MASTER PLAN CORE • v0.9.5.7'",'health label');
 rep("chooser.textContent='FIGHT ARENA v0.9.5.4'","chooser.textContent='MULTIVERSE ARENA v0.9.5.7'",'chooser');
 rep("window.FightArenaCampaignV0954={ok:true,phases:PHASES,standby:[...STANDBY],render,prologueComplete,phase1Complete,rawPowerComplete}","window.FightArenaCampaignV0957={ok:true,phases:PHASES,standby:[...STANDBY],render,prologueComplete,phase1Complete,rawPowerComplete,smokeChaosComplete,phase2Complete}",'campaign api');
 rep("window.FightArena?.version==='0.9.5.4'","window.FightArena?.version==='0.9.5.7'",'init version');
 code=code.replace("$('diff').textContent='v0.9.5.4 • RAW POWER'","$('diff').textContent='v0.9.5.7 • MASTER PLAN'");
 (0,eval)(code);
 const resources={Nightfang:'150 🪙 • 25 XP',Voltage:'200 🪙 • 35 XP',Razor:'250 🪙 • 45 XP',Titan:'300 🪙 • 60 XP','Arena Champion':'500 🪙 • 100 XP • 5 💎',Crossbones:'350 🪙 • 75 XP',Bullseye:'450 🪙 • 90 XP',Punisher:'550 🪙 • 110 XP • 🔓 PUNISHER',Taskmaster:'650 🪙 • 130 XP',Kingpin:'600 🪙 • 150 XP • 5 💎',Rhino:'750 🪙 • 150 XP',Electro:'800 🪙 • 165 XP',Mysterio:'900 🪙 • 180 XP','Green Goblin':'1000 🪙 • 195 XP','Doctor Octopus':'1400 🪙 • 260 XP • 10 💎'};
 function decorateRewards(){document.querySelectorAll('.campaign-node').forEach(node=>{const name=node.querySelector('strong')?.textContent?.trim().replace(/\s+/g,' ');if(!name)return;const key=Object.keys(resources).find(k=>k.toUpperCase()===name.toUpperCase());if(!key||node.querySelector('.node-resource'))return;const badge=document.createElement('span');badge.className='node-resource';badge.textContent='🎁 '+resources[key];node.appendChild(badge)})}
 decorateRewards();const cards=document.getElementById('levelCards');if(cards)new MutationObserver(decorateRewards).observe(cards,{childList:true,subtree:true});
 document.title='Multiverse Arena v0.9.5.7 — Master Plan';
 const brand=document.querySelector('.brand');if(brand)brand.innerHTML='MULTIVERSE ARENA <span class="tag">v0.9.5.7</span>';
 const chooser=document.querySelector('#deviceChooser .eyebrow');if(chooser)chooser.textContent='MULTIVERSE ARENA v0.9.5.7';
 const pause=document.querySelector('#pauseOverlay .eyebrow');if(pause)pause.textContent='MULTIVERSE ARENA';
}catch(err){
 console.error('[Multiverse Arena v0.9.5.7 campaign]',err);
 const h=document.querySelector('.build-health b');if(h)h.textContent='v0.9.5.7 • CAMPAIGN LOAD ERROR';
}
})();

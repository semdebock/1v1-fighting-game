/* Multiverse Arena v0.9.7 — Phase 3: Mutant Uprising campaign */
(()=>{
'use strict';
const $=id=>document.getElementById(id),controls=()=>window.FightArenaCampaignControls;
const STANDBY=['Ultron','Prowler'];
const DETAILS={
 Nightfang:{lesson:'BASICS',tip:'Move, Punch, Kick and build your Special meter.',abilities:['Shadow Jab','Quick Rush'],reward:'150 🪙 • 25 XP'},
 Voltage:{lesson:'RANGED AWARENESS',tip:'Close distance through Spark Shots and punish his Static Dash.',abilities:['Spark Shot','Static Dash','Shock Pulse'],reward:'200 🪙 • 35 XP'},
 Razor:{lesson:'BLOCK & TIMING',tip:'His pressure is fast. Block the rush, then counter before he resets.',abilities:['Twin Slash','Razor Leap','Spin Cut'],reward:'250 🪙 • 45 XP'},
 Titan:{lesson:'SPACING & PATIENCE',tip:'Titan is slow but dangerous. Bait his heavy attacks and punish recovery.',abilities:['Heavy Smash','Armored Charge','Ground Slam'],reward:'300 🪙 • 60 XP'},
 'Arena Champion':{lesson:'FINAL EXAM',tip:'Use everything you learned. At 45% HP he activates Champion Mode.',abilities:['Champion Strike','Victory Rush','Shockwave Kick','Crown of the Arena'],reward:'500 🪙 • 100 XP • 5 💎'},
 Crossbones:{lesson:'TACTICAL PRESSURE',tip:'Rumlow mixes heavy rushes with gunfire. Stay mobile at range and punish committed melee attacks.',abilities:['Skull Breaker','Tactical Burst','Blade Gauntlet','Bones of War'],reward:'350 🪙 • 75 XP'},
 Bullseye:{lesson:'PRECISION CONTROL',tip:'Bullseye wants you predictable. Change your rhythm, close distance carefully and punish Assassin Step.',abilities:['Deadeye Throw','Ricochet Trick','Assassin Step','Perfect Aim'],reward:'450 🪙 • 90 XP'},
 Punisher:{lesson:'ARSENAL MANAGEMENT',tip:'Castle mixes sustained fire, explosives and sudden close-range pressure. Defeat him to unlock Punisher in your Collection.',abilities:['Rifle Burst','Frag Grenade','Combat Roll','War Zone'],reward:'550 🪙 • 110 XP • 🔓 PUNISHER'},
 Taskmaster:{lesson:'ADAPTATION',tip:'Read the weapon in his hands. Shield, sword and bow each demand a different answer.',abilities:['Shield Throw','Sword Rush','Hawkeye Shot','Combat Masterclass'],reward:'650 🪙 • 130 XP'},
 Kingpin:{lesson:'PHASE BOSS',tip:'Survive Kingpin’s raw pressure and Rage phase to open the Sinister Threat.',abilities:['Heavy Punch','Charge Rush','Ground Smash','Kingpin Rage'],reward:'600 🪙 • 150 XP • 5 💎'},
 Rhino:{lesson:'MOMENTUM CONTROL',tip:'Do not trade head-on. Read the charge lane, move out of the line and punish Rhino after his armor commits.',abilities:['Rhino Charge','Horn Toss','Ground Quake','Stampede'],reward:'750 🪙 • 150 XP'},
 Electro:{lesson:'MOBILITY UNDER FIRE',tip:'Yellow lightning owns the range. Keep moving through Arc Bolts and escape the target marker before Power Grid lands.',abilities:['Arc Bolt','Volt Blink','Chain Lightning','Power Grid'],reward:'800 🪙 • 165 XP'},
 Mysterio:{lesson:'ILLUSION CONTROL',tip:'Ignore the clone bait, track the real body and punish the smoke teleport recovery.',abilities:['Mystic Orb','Illusion Clone','Smoke Teleport'],reward:'900 🪙 • 180 XP'},
 'Green Goblin':{lesson:'AERIAL CHAOS',tip:'Read the rush line, dodge the bomb patterns and punish the end of Norman’s aerial pressure.',abilities:['Pumpkin Bomb','Glider Rush','Bomb Barrage','Razor Bat'],reward:'1000 🪙 • 195 XP'},
 'Doctor Octopus':{lesson:'TENTACLE DISCIPLINE',tip:'Jump the sweep, move out of Pincer Lock, respect the grab and punish the green recovery window.',abilities:['Tentacle Jab','Arm Sweep','Pincer Lock','Tentacle Grab','Four-Arm Crossfire'],reward:'1400 🪙 • 260 XP • 10 💎'},
 Sabretooth:{lesson:'SURVIVE THE HUNT',tip:'Creed will stay on top of you. Break his feral pressure and keep attacking often enough that his capped regeneration cannot undo your work.',abilities:['Feral Slash','Predator Leap','Savage Rush','Apex Hunter','Healing Factor'],reward:'950 🪙 • 185 XP • 3 💎'},
 Mystique:{lesson:'FIGHT YOUR OWN SHADOW',tip:'Raven starts in her iconic blue form, then transforms into your selected fighter around mid-health. Adapt when your own strengths come back at you.',abilities:['Pistol Burst','Acrobatic Strike','Identity Shift','Mirror Attack','Identity Theft'],reward:'1100 🪙 • 210 XP • 4 💎'},
 Juggernaut:{lesson:'MOVE THE MOUNTAIN',tip:'Juggernaut is enormous and armored. Step out of the charge lane; his armor briefly opens after committed attacks and missed momentum.',abilities:['Helmet Bash','Unstoppable Charge','Ground Breaker','I’m the Juggernaut'],reward:'1300 🪙 • 240 XP • 5 💎'},
 Deadpool:{lesson:'FINISH HIM TWICE',tip:'Wade heals whenever you give him breathing room and has one guaranteed Last Stand. Stay composed through the chaos and finish the second health push.',abilities:['Dual Pistols','Katana Rush','Combat Roll','Healing Factor','Maximum Effort'],reward:'1450 🪙 • 260 XP • 6 💎'},
 Magneto:{lesson:'CONTROL THE FIELD',tip:'Push, pull, shields and falling metal control where you are allowed to stand. His third phase unlocks Master of Magnetism and removes every comfortable rhythm.',abilities:['Metal Shards','Magnetic Push','Magnetic Pull','Metal Shield','Levitation Strike','Arena Debris','Magnetized Barrage','Master of Magnetism'],reward:'1900 🪙 • 340 XP • 15 💎'}
};
const PHASES=[
 {id:'prologue',eyebrow:'PROLOGUE',title:'NEO CITY ARENA',subtitle:'Five original Fight Arena encounters • beginner journey',theme:'prologue',sections:[{name:'FIRST BLOOD',fights:[{name:'Nightfang',slot:1,built:true}]},{name:'ARENA TRIALS',fights:[{name:'Voltage',slot:2,built:true},{name:'Razor',slot:3,built:true}]},{name:'FINAL QUALIFIERS',final:true,fights:[{name:'Titan',slot:4,built:true},{name:'Arena Champion',slot:5,built:true,boss:true}]}]},
 {id:'phase1',eyebrow:'PHASE 1',title:'STREET CRIMINALS',subtitle:'Grounded criminals, mercenaries and vigilantes',theme:'street',sections:[{name:'STREET WAR',fights:[{name:'Crossbones',slot:1,built:true},{name:'Bullseye',slot:2,built:true}]},{name:'VIGILANTE LINE',fights:[{name:'Punisher',slot:3,built:true,reward:'PLAYABLE FIGHTER UNLOCK'},{name:'Taskmaster',slot:4,built:true}]},{name:'CRIMINAL EMPIRE',final:true,fights:[{name:'Kingpin',slot:5,built:true,boss:true}]}]},
 {id:'phase2',eyebrow:'PHASE 2',title:'SINISTER THREAT',subtitle:'Spider-Man villains escalate from raw power to illusion and chaos',theme:'sinister',sections:[{name:'RAW POWER',fights:[{name:'Rhino',slot:1,built:true},{name:'Electro',slot:2,built:true}]},{name:'SMOKE & CHAOS',fights:[{name:'Mysterio',slot:3,built:true},{name:'Green Goblin',slot:4,built:true}]},{name:'MASTER PLAN',final:true,fights:[{name:'Doctor Octopus',slot:5,built:true,boss:true}]}]},
 {id:'phase3',eyebrow:'PHASE 3',title:'MUTANT UPRISING',subtitle:'Feral mutants, shapeshifters, unstoppable power and magnetic domination',theme:'mutant',sections:[{name:'FERAL BLOOD',fights:[{name:'Sabretooth',slot:1,built:true},{name:'Mystique',slot:2,built:true}]},{name:'UNSTOPPABLE CHAOS',fights:[{name:'Juggernaut',slot:3,built:true},{name:'Deadpool',slot:4,built:true}]},{name:'MASTER OF MAGNETISM',final:true,fights:[{name:'Magneto',slot:5,built:true,boss:true}]}]}
];
const ORDER=PHASES.flatMap(p=>p.sections.flatMap(s=>s.fights.map(f=>f.name)));
let selected=null,ready=false;
const won=n=>!!controls()?.won?.(n);
function fightAvailable(name){const i=ORDER.indexOf(name);if(i<0)return false;if(won(name))return true;return i===0||won(ORDER[i-1])}
function phaseComplete(id){const p=PHASES.find(x=>x.id===id);return !!p&&p.sections.flatMap(s=>s.fights).every(f=>won(f.name))}
function nextTarget(){return ORDER.find(n=>!won(n))||ORDER[ORDER.length-1]}
function statusFor(f){if(won(f.name))return'CLEARED';return fightAvailable(f.name)?'READY':'LOCKED'}
function canFight(f){return !!f.built&&fightAvailable(f.name)}
function allFights(){return PHASES.flatMap(phase=>phase.sections.flatMap(section=>section.fights.map(f=>({...f,phase,section}))))}
function targetFight(){const n=nextTarget();return allFights().find(f=>f.name===n)||allFights()[0]}
function setProfile(f=null){
 const start=$('start');if(!f){f=targetFight();if(!f)return}
 const d=DETAILS[f.name],status=statusFor(f),phaseList=f.phase.sections.flatMap(s=>s.fights),phaseWins=phaseList.filter(x=>won(x.name)).length;
 if($('diff'))$('diff').textContent=`${f.phase.eyebrow} • ${f.section.name}`;
 if($('levelTitle'))$('levelTitle').textContent=`FIGHT ${f.slot} — ${f.name.toUpperCase()}`;
 if($('levelDesc'))$('levelDesc').textContent=d?.tip||'Read the encounter and choose your moment.';
 if($('levelStats'))$('levelStats').innerHTML=`<div><small>LESSON</small>${d?.lesson||'COMBAT'}</div><div><small>STATUS</small>${status}</div><div><small>REWARD</small>${d?.reward||'—'}</div><div><small>PHASE PROGRESS</small>${phaseWins}/${phaseList.length}</div>`;
 if(start){const go=canFight(f);start.disabled=!go;start.textContent=go?(won(f.name)?`REPLAY ${f.name.toUpperCase()}`:`FIGHT ${f.name.toUpperCase()}`):'BEAT PREVIOUS FIGHT';start.onclick=()=>{if(go)controls()?.start?.(f.name)}}
 let extra=$('campaignLessonPanel');if(!extra){extra=document.createElement('div');extra.id='campaignLessonPanel';extra.className='campaign-lesson-panel';$('levelStats')?.insertAdjacentElement('afterend',extra)}
 if(extra&&d)extra.innerHTML=`<small>ENCOUNTER KIT</small><div>${d.abilities.map(a=>`<span>${a}</span>`).join('')}</div>${f.name==='Mystique'?'<b>🧬 MID-FIGHT • COPIES YOUR SELECTED FIGHTER</b>':f.name==='Juggernaut'?'<b>🪨 OVERSIZED ARMOR • PUNISH MISSED CHARGES</b>':f.name==='Deadpool'?'<b>♻ HEALING FACTOR • ONE GUARANTEED LAST STAND</b>':f.name==='Magneto'?'<b>🧲 THREE BOSS PHASES • MASTER OF MAGNETISM</b>':f.name==='Sabretooth'?'<b>🐾 FERAL PRESSURE • CAPPED REGENERATION</b>':f.boss?'<b>🏆 PHASE BOSS</b>':''}`;
}
function render(){
 const box=$('levelCards');if(!box)return;box.innerHTML='';box.className='campaign-phase-list';
 PHASES.forEach((phase,pi)=>{const phaseF=phase.sections.flatMap(s=>s.fights),wins=phaseF.filter(f=>won(f.name)).length,access=pi===0||PHASES.slice(0,pi).every(p=>phaseComplete(p.id)),article=document.createElement('article');article.className=`campaign-phase phase-${phase.theme} ${access?'':'future-phase'}`;article.innerHTML=`<div class="phase-head"><div><small>${phase.eyebrow}</small><h3>${phase.title}</h3></div><div class="phase-meta"><b>${access?`${wins}/${phaseF.length} CLEARED`:'LOCKED'}</b><span>${access?phase.subtitle:'Complete the previous phase'}</span></div></div>`;
 phase.sections.forEach((section,si)=>{const sec=document.createElement('section');sec.className=`phase-section ${section.final?'final-section':''}`;sec.innerHTML=`<div class="section-title"><div><small>SECTION ${String(si+1).padStart(2,'0')}</small><b>${section.name}</b></div><span>${section.final?'FINAL THREAT':section.fights.length+' FIGHTS'}</span></div><div class="phase-fights"></div>`;const grid=sec.querySelector('.phase-fights');section.fights.forEach(base=>{const f={...base,phase,section},status=statusFor(f),d=DETAILS[f.name],b=document.createElement('button');b.type='button';b.className=`campaign-node ${f.boss?'boss ':''}${status==='READY'?'ready ':''}${status==='CLEARED'?'cleared ':''}${status==='LOCKED'?'locked ':''}${selected===f.name?'selected ':''}`;b.innerHTML=`<div class="node-top"><span class="node-number">FIGHT ${f.slot}</span><span class="node-state">${status}</span></div><strong>${f.name.toUpperCase()}</strong><p>${d?`${d.lesson} • ${d.abilities.slice(0,2).join(' + ')}`:'Encounter intel'}</p><span class="node-resource">🎁 ${d?.reward||'—'}</span>`;b.onclick=()=>{selected=f.name;render();setProfile(f)};grid.appendChild(b)});article.appendChild(sec)});box.appendChild(article)});updateDashboard()
}
function updateDashboard(){const f=targetFight();if(!f)return;if($('dashTarget'))$('dashTarget').textContent=f.name.toUpperCase();if($('dashLevel'))$('dashLevel').textContent=`${f.phase.eyebrow} • ${f.slot}/5`}
function refreshAfterNav(){setTimeout(()=>{selected=null;render();setProfile()},0)}
function init(){if(ready)return;ready=true;render();setProfile();$('play')?.addEventListener('click',refreshAfterNav);$('continue')?.addEventListener('click',refreshAfterNav);const api={ok:true,version:'0.9.7',phases:PHASES,order:[...ORDER],standby:[...STANDBY],details:DETAILS,render,setProfile,nextTarget,phaseComplete,phase3Complete:()=>phaseComplete('phase3')};window.FightArenaCampaignV097=api;window.FightArenaCampaignV0957=api}
if(window.FightArenaCampaignControls)setTimeout(init,0);else addEventListener('fightarena-controls-ready',()=>setTimeout(init,0),{once:true});
})();

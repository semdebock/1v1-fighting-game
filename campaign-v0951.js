/* Fight Arena v0.9.5.1 — Neo City Arena campaign progression */
(()=>{
'use strict';
const $=id=>document.getElementById(id),controls=()=>window.FightArenaCampaignControls;
const STANDBY=['Ultron','Prowler'];
const DETAILS={
 Nightfang:{lesson:'BASICS',tip:'Move, Punch, Kick and build your Special meter.',abilities:['Shadow Jab','Quick Rush'],reward:'150 🪙 • 25 XP'},
 Voltage:{lesson:'RANGED AWARENESS',tip:'Close distance through Spark Shots and punish his Static Dash.',abilities:['Spark Shot','Static Dash','Shock Pulse'],reward:'200 🪙 • 35 XP'},
 Razor:{lesson:'BLOCK & TIMING',tip:'His pressure is fast. Block the rush, then counter before he resets.',abilities:['Twin Slash','Razor Leap','Spin Cut'],reward:'250 🪙 • 45 XP'},
 Titan:{lesson:'SPACING & PATIENCE',tip:'Titan is slow but dangerous. Bait his heavy attacks and punish recovery.',abilities:['Heavy Smash','Armored Charge','Ground Slam'],reward:'300 🪙 • 60 XP'},
 'Arena Champion':{lesson:'FINAL EXAM',tip:'Use everything you learned. At 45% HP he activates Champion Mode.',abilities:['Champion Strike','Victory Rush','Shockwave Kick','Crown of the Arena'],reward:'500 🪙 • 100 XP • 5 💎 + Phase Reward'}
};
const PHASES=[
 {id:'prologue',eyebrow:'PROLOGUE',title:'NEO CITY ARENA',subtitle:'Five original Fight Arena encounters • beginner journey',theme:'prologue',sections:[
  {name:'FIRST BLOOD',fights:[{name:'Nightfang',slot:1,built:true}]},
  {name:'ARENA TRIALS',fights:[{name:'Voltage',slot:2,built:true},{name:'Razor',slot:3,built:true}]},
  {name:'FINAL QUALIFIERS',final:true,fights:[{name:'Titan',slot:4,built:true},{name:'Arena Champion',slot:5,built:true,boss:true}]}
 ]},
 {id:'phase1',eyebrow:'PHASE 1',title:'STREET CRIMINALS',subtitle:'Grounded criminals, mercenaries and vigilantes',theme:'street',sections:[
  {name:'STREET WAR',fights:[{name:'Crossbones',slot:1},{name:'Bullseye',slot:2}]},
  {name:'VIGILANTE LINE',fights:[{name:'Punisher',slot:3,reward:'PLAYABLE FIGHTER UNLOCK'},{name:'Taskmaster',slot:4}]},
  {name:'CRIMINAL EMPIRE',final:true,fights:[{name:'Kingpin',slot:5,built:true,boss:true,assigned:true}]}
 ]},
 {id:'phase2',eyebrow:'PHASE 2',title:'SINISTER THREAT',subtitle:'One concentrated Spider-Man villain phase',theme:'sinister',sections:[
  {name:'RAW POWER',fights:[{name:'Rhino',slot:1},{name:'Electro',slot:2}]},
  {name:'SMOKE & CHAOS',fights:[{name:'Mysterio',slot:3,built:true,assigned:true},{name:'Green Goblin',slot:4,built:true,assigned:true}]},
  {name:'MASTER PLAN',final:true,fights:[{name:'Doctor Octopus',slot:5,boss:true}]}
 ]}
];
let selected=null,ready=false;
const won=n=>!!controls()?.won?.(n);
const prologueOrder=['Nightfang','Voltage','Razor','Titan','Arena Champion'];
function prologueAvailable(name){const i=prologueOrder.indexOf(name);if(i<0)return false;return i===0||won(prologueOrder[i-1])}
function prologueComplete(){return prologueOrder.every(won)}
function nextTarget(){return prologueOrder.find(n=>!won(n))||'Crossbones'}
function findFight(name){for(const phase of PHASES)for(const section of phase.sections)for(const fight of section.fights)if(fight.name===name)return{...fight,phase,section};return null}
function statusFor(f){
 if(f.phase.id==='prologue'){if(won(f.name))return'CLEARED';return prologueAvailable(f.name)?'READY':'LOCKED'}
 if(f.assigned)return'ASSIGNED';return'COMING SOON'
}
function canFight(f){return f.phase.id==='prologue'&&f.built&&prologueAvailable(f.name)}
function setProfile(f=null){const start=$('start');if(!f){$('diff').textContent='v0.9.5.1 • NEO CITY ARENA';$('levelTitle').textContent='PROLOGUE — 5 FIGHTS';$('levelDesc').textContent='The opening Arena now teaches the combat loop through five distinct opponents. Clear them in order to complete the Prologue.';$('levelStats').innerHTML=`<div><small>PROGRESS</small>${prologueOrder.filter(won).length}/5</div><div><small>PHASE REWARD</small>750 🪙 + 5 💎</div><div><small>NEXT</small>${nextTarget().toUpperCase()}</div><div><small>STANDBY</small>${STANDBY.length} PRESERVED</div>`;if(start){start.disabled=true;start.textContent='SELECT A FIGHT'}return}
 const d=DETAILS[f.name],status=statusFor(f);$('diff').textContent=`${f.phase.eyebrow} • ${f.section.name}`;$('levelTitle').textContent=`FIGHT ${f.slot} — ${f.name.toUpperCase()}`;
 if(d){$('levelDesc').textContent=d.tip;$('levelStats').innerHTML=`<div><small>LESSON</small>${d.lesson}</div><div><small>STATUS</small>${status}</div><div><small>REWARD</small>${d.reward}</div><div><small>${f.boss?'BOSS PHASE':'ABILITIES'}</small>${f.boss?'45% HP':d.abilities.length+' MOVES'}</div>`}
 else{$('levelDesc').textContent=f.reward?`${f.name} is reserved for a future update. Defeating him will unlock him as a playable fighter.`:f.assigned?`${f.name} already exists in Fight Arena and is safely assigned to this future Phase, but remains locked until the preceding encounters are built.`:'This encounter is reserved for a future v0.9.5.x build.';$('levelStats').innerHTML=`<div><small>PHASE</small>${f.phase.eyebrow}</div><div><small>SLOT</small>${f.slot}/5</div><div><small>TYPE</small>${f.boss?'PHASE BOSS':f.reward?'FIGHTER REWARD':'STANDARD'}</div><div><small>STATUS</small>${status}</div>`}
 if(start){const go=canFight(f);start.disabled=!go;start.textContent=go?(won(f.name)?`REPLAY ${f.name.toUpperCase()}`:`FIGHT ${f.name.toUpperCase()}`):status==='CLEARED'?`REPLAY ${f.name.toUpperCase()}`:status==='LOCKED'?'BEAT PREVIOUS FIGHT':'COMING SOON';if(status==='CLEARED'&&f.phase.id==='prologue')start.disabled=false;start.onclick=()=>{if(f.phase.id==='prologue'&&f.built&&prologueAvailable(f.name)){controls()?.start?.(f.name)}}}
 let extra=$('campaignLessonPanel');if(!extra){extra=document.createElement('div');extra.id='campaignLessonPanel';extra.className='campaign-lesson-panel';$('levelStats')?.insertAdjacentElement('afterend',extra)}
 if(d)extra.innerHTML=`<small>ENCOUNTER KIT</small><div>${d.abilities.map(a=>`<span>${a}</span>`).join('')}</div>${f.boss?'<b>🏆 PROLOGUE BOSS • CHAMPION MODE BELOW 45%</b>':''}`;else extra.innerHTML='<small>ROADMAP SLOT</small><div><span>Build pending</span><span>Existing data preserved</span></div>'
}
function render(){const box=$('levelCards');if(!box)return;box.innerHTML='';box.className='campaign-phase-list';PHASES.forEach(phase=>{const all=phase.sections.flatMap(s=>s.fights),cleared=phase.id==='prologue'?all.filter(f=>won(f.name)).length:0,article=document.createElement('article');article.className=`campaign-phase phase-${phase.theme} ${phase.id!=='prologue'?'future-phase':''}`;article.innerHTML=`<div class="phase-head"><div><small>${phase.eyebrow}</small><h3>${phase.title}</h3></div><div class="phase-meta"><b>${phase.id==='prologue'?`${cleared}/5 CLEARED`:'ROADMAP LOCKED'}</b><span>${phase.subtitle}</span></div></div>`;
 phase.sections.forEach((section,si)=>{const sec=document.createElement('section');sec.className=`phase-section ${section.final?'final-section':''}`;sec.innerHTML=`<div class="section-title"><div><small>SECTION ${String(si+1).padStart(2,'0')}</small><b>${section.name}</b></div><span>${section.fights.length} FIGHT${section.fights.length===1?'':'S'}</span></div><div class="phase-fights"></div>`;const grid=sec.querySelector('.phase-fights');section.fights.forEach(base=>{const f={...base,phase,section},status=statusFor(f),d=DETAILS[f.name],b=document.createElement('button');b.type='button';b.className=`campaign-node ${f.boss?'boss ':''}${status==='READY'?'ready ':''}${status==='CLEARED'?'cleared ':''}${status==='LOCKED'?'locked ':''}${f.assigned?'assigned ':''}${selected===f.name?'selected ':''}`;b.innerHTML=`<div class="node-top"><span class="node-number">FIGHT ${f.slot}</span><span class="node-state">${status}</span></div><strong>${f.name.toUpperCase()}</strong><p>${d?`${d.lesson} • ${d.abilities.slice(0,2).join(' + ')}`:f.assigned?'Existing encounter preserved for this Phase':'Reserved roadmap encounter'}</p>${f.reward?`<span class="node-reward">🔓 ${f.reward}</span>`:''}${f.boss&&f.phase.id==='prologue'?'<span class="node-reward">🏆 +750 🪙 +5 💎 PHASE CLEAR</span>':''}`;b.onclick=()=>{selected=f.name;render();setProfile(f)};grid.appendChild(b)});article.appendChild(sec)});box.appendChild(article)});updateDashboard()}
function updateDashboard(){const n=nextTarget();if($('dashTarget'))$('dashTarget').textContent=n.toUpperCase();if($('dashLevel'))$('dashLevel').textContent=prologueComplete()?'Phase 1 • Build In Progress':`Prologue • ${prologueOrder.indexOf(n)+1}/5`;const latest=document.querySelector('.latest-stat');if(latest){latest.querySelector('b').textContent='v0.9.5.1';latest.querySelector('span').textContent='Voltage • Razor • Titan • Arena Champion'}}
function versionUI(){document.title='Fight Arena v0.9.5.1 — Neo City Arena Expansion';document.querySelectorAll('.brand .tag').forEach(x=>x.textContent='v0.9.5.1');const hero=document.querySelector('#home .hero-copy');if(hero){hero.querySelector('.tag').textContent='NEO CITY ARENA EXPANSION';hero.querySelector('h1').innerHTML='EARN YOUR PLACE.<br>BEAT THE ARENA.';hero.querySelector('p').textContent='Four new original opponents complete the beginner Prologue with ranged pressure, rushdown, tank combat and the first true Arena Champion boss.'}if($('updates'))$('updates').textContent='📋 UPDATE LOG • v0.9.5.1';const health=document.querySelector('.build-health b');if(health)health.textContent='NEO ARENA CORE • v0.9.5.1';const chooser=document.querySelector('#deviceChooser .eyebrow');if(chooser)chooser.textContent='FIGHT ARENA v0.9.5.1'}
function refreshAfterNav(){setTimeout(()=>{selected=null;render();setProfile()},0)}
function init(){if(ready)return;ready=true;versionUI();render();setProfile();$('play')?.addEventListener('click',refreshAfterNav);$('continue')?.addEventListener('click',refreshAfterNav);window.FightArenaCampaignV0951={ok:true,phases:PHASES,standby:[...STANDBY],render,prologueComplete}}
if(window.FightArena?.version==='0.9.5.1')setTimeout(init,0);else addEventListener('fightarena-ready',()=>setTimeout(init,0),{once:true});
})();

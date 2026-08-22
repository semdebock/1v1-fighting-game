/* Fight Arena v0.9.5.2 — Phase 1 Street War progression */
(()=>{
'use strict';
const $=id=>document.getElementById(id),controls=()=>window.FightArenaCampaignControls;
const STANDBY=['Ultron','Prowler'];
const DETAILS={
 Nightfang:{lesson:'BASICS',tip:'Move, Punch, Kick and build your Special meter.',abilities:['Shadow Jab','Quick Rush'],reward:'150 🪙 • 25 XP'},
 Voltage:{lesson:'RANGED AWARENESS',tip:'Close distance through Spark Shots and punish his Static Dash.',abilities:['Spark Shot','Static Dash','Shock Pulse'],reward:'200 🪙 • 35 XP'},
 Razor:{lesson:'BLOCK & TIMING',tip:'His pressure is fast. Block the rush, then counter before he resets.',abilities:['Twin Slash','Razor Leap','Spin Cut'],reward:'250 🪙 • 45 XP'},
 Titan:{lesson:'SPACING & PATIENCE',tip:'Titan is slow but dangerous. Bait his heavy attacks and punish recovery.',abilities:['Heavy Smash','Armored Charge','Ground Slam'],reward:'300 🪙 • 60 XP'},
 'Arena Champion':{lesson:'FINAL EXAM',tip:'Use everything you learned. At 45% HP he activates Champion Mode.',abilities:['Champion Strike','Victory Rush','Shockwave Kick','Crown of the Arena'],reward:'500 🪙 • 100 XP • 5 💎 + Phase Reward'},
 Crossbones:{lesson:'TACTICAL PRESSURE',tip:'Rumlow mixes heavy rushes with gunfire. Stay mobile at range and punish his committed melee attacks.',abilities:['Skull Breaker','Tactical Burst','Blade Gauntlet','Bones of War'],reward:'350 🪙 • 75 XP'},
 Bullseye:{lesson:'PRECISION CONTROL',tip:'Bullseye wants you predictable. Change your rhythm, close distance carefully and punish Assassin Step.',abilities:['Deadeye Throw','Ricochet Trick','Assassin Step','Perfect Aim'],reward:'450 🪙 • 90 XP'}
};
const PHASES=[
 {id:'prologue',eyebrow:'PROLOGUE',title:'NEO CITY ARENA',subtitle:'Five original Fight Arena encounters • beginner journey',theme:'prologue',sections:[
  {name:'FIRST BLOOD',fights:[{name:'Nightfang',slot:1,built:true}]},
  {name:'ARENA TRIALS',fights:[{name:'Voltage',slot:2,built:true},{name:'Razor',slot:3,built:true}]},
  {name:'FINAL QUALIFIERS',final:true,fights:[{name:'Titan',slot:4,built:true},{name:'Arena Champion',slot:5,built:true,boss:true}]}
 ]},
 {id:'phase1',eyebrow:'PHASE 1',title:'STREET CRIMINALS',subtitle:'Grounded criminals, mercenaries and vigilantes',theme:'street',sections:[
  {name:'STREET WAR',fights:[{name:'Crossbones',slot:1,built:true},{name:'Bullseye',slot:2,built:true}]},
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
const streetOrder=['Crossbones','Bullseye'];
function prologueAvailable(name){const i=prologueOrder.indexOf(name);return i>=0&&(i===0||won(prologueOrder[i-1]))}
function prologueComplete(){return prologueOrder.every(won)}
function streetAvailable(name){const i=streetOrder.indexOf(name);if(i<0||!prologueComplete())return false;return i===0||won(streetOrder[i-1])}
function streetComplete(){return streetOrder.every(won)}
function nextTarget(){const p=prologueOrder.find(n=>!won(n));if(p)return p;const s=streetOrder.find(n=>!won(n));return s||'Punisher'}
function statusFor(f){
 if(f.phase.id==='prologue'){if(won(f.name))return'CLEARED';return prologueAvailable(f.name)?'READY':'LOCKED'}
 if(f.phase.id==='phase1'&&f.built&&!f.assigned){if(won(f.name))return'CLEARED';return streetAvailable(f.name)?'READY':'LOCKED'}
 if(f.assigned)return'ASSIGNED';return'COMING SOON'
}
function canFight(f){if(!f.built||f.assigned)return false;if(f.phase.id==='prologue')return prologueAvailable(f.name);if(f.phase.id==='phase1')return streetAvailable(f.name);return false}
function setProfile(f=null){
 const start=$('start');
 if(!f){const n=nextTarget();$('diff').textContent='v0.9.5.2 • STREET WAR';$('levelTitle').textContent=prologueComplete()?'PHASE 1 — STREET CRIMINALS':'PROLOGUE — NEO CITY ARENA';$('levelDesc').textContent=prologueComplete()?'The first Marvel section is live. Crossbones tests tactical pressure, then Bullseye turns the street into a precision kill-zone.':'Complete the five-fight Neo City Arena Prologue to unlock Phase 1.';$('levelStats').innerHTML=`<div><small>PROLOGUE</small>${prologueOrder.filter(won).length}/5</div><div><small>STREET WAR</small>${streetOrder.filter(won).length}/2</div><div><small>NEXT</small>${n.toUpperCase()}</div><div><small>STANDBY</small>${STANDBY.length} PRESERVED</div>`;if(start){start.disabled=true;start.textContent='SELECT A FIGHT'}return
 }
 const d=DETAILS[f.name],status=statusFor(f);$('diff').textContent=`${f.phase.eyebrow} • ${f.section.name}`;$('levelTitle').textContent=`FIGHT ${f.slot} — ${f.name.toUpperCase()}`;
 if(d){$('levelDesc').textContent=d.tip;$('levelStats').innerHTML=`<div><small>LESSON</small>${d.lesson}</div><div><small>STATUS</small>${status}</div><div><small>REWARD</small>${d.reward}</div><div><small>${f.boss?'BOSS PHASE':'ABILITIES'}</small>${f.boss?'45% HP':d.abilities.length+' MOVES'}</div>`}
 else{$('levelDesc').textContent=f.reward?`${f.name} is reserved for the next Phase 1 update. Defeating him will unlock him as a playable fighter.`:f.assigned?`${f.name} already exists in Fight Arena and remains safely assigned to this future slot, but is locked until the preceding encounters are built.`:'This encounter is reserved for a future v0.9.5.x build.';$('levelStats').innerHTML=`<div><small>PHASE</small>${f.phase.eyebrow}</div><div><small>SLOT</small>${f.slot}/5</div><div><small>TYPE</small>${f.boss?'PHASE BOSS':f.reward?'FIGHTER REWARD':'STANDARD'}</div><div><small>STATUS</small>${status}</div>`}
 if(start){const go=canFight(f);start.disabled=!go;start.textContent=go?(won(f.name)?`REPLAY ${f.name.toUpperCase()}`:`FIGHT ${f.name.toUpperCase()}`):status==='LOCKED'?'BEAT PREVIOUS FIGHT':status==='CLEARED'?`REPLAY ${f.name.toUpperCase()}`:status==='ASSIGNED'?'FUTURE PHASE SLOT':'COMING SOON';if(status==='CLEARED'&&f.built&&!f.assigned)start.disabled=false;start.onclick=()=>{if(f.built&&!f.assigned&&canFight(f))controls()?.start?.(f.name)}}
 let extra=$('campaignLessonPanel');if(!extra){extra=document.createElement('div');extra.id='campaignLessonPanel';extra.className='campaign-lesson-panel';$('levelStats')?.insertAdjacentElement('afterend',extra)}
 if(d)extra.innerHTML=`<small>ENCOUNTER KIT</small><div>${d.abilities.map(a=>`<span>${a}</span>`).join('')}</div>${f.name==='Crossbones'?'<b>☠ TACTICAL BRUISER • MELEE + FIREARMS</b>':f.name==='Bullseye'?'<b>🎯 PRECISION ASSASSIN • RANGE + REPOSITION</b>':f.boss?'<b>🏆 PROLOGUE BOSS • CHAMPION MODE BELOW 45%</b>':''}`;else extra.innerHTML='<small>ROADMAP SLOT</small><div><span>Build pending</span><span>Existing data preserved</span></div>'
}
function render(){
 const box=$('levelCards');if(!box)return;box.innerHTML='';box.className='campaign-phase-list';
 PHASES.forEach(phase=>{const all=phase.sections.flatMap(s=>s.fights),cleared=phase.id==='prologue'?all.filter(f=>won(f.name)).length:phase.id==='phase1'?streetOrder.filter(won).length:0,article=document.createElement('article');article.className=`campaign-phase phase-${phase.theme} ${phase.id==='phase2'?'future-phase':''}`;const phaseLabel=phase.id==='prologue'?`${cleared}/5 CLEARED`:phase.id==='phase1'?`STREET WAR ${cleared}/2`:'ROADMAP LOCKED';article.innerHTML=`<div class="phase-head"><div><small>${phase.eyebrow}</small><h3>${phase.title}</h3></div><div class="phase-meta"><b>${phaseLabel}</b><span>${phase.subtitle}</span></div></div>`;
 phase.sections.forEach((section,si)=>{const sec=document.createElement('section');sec.className=`phase-section ${section.final?'final-section':''}`;const live=phase.id==='phase1'&&section.name==='STREET WAR'?'<span class="street-war-live">● LIVE IN v0.9.5.2</span>':`<span>${section.fights.length} FIGHT${section.fights.length===1?'':'S'}</span>`;sec.innerHTML=`<div class="section-title"><div><small>SECTION ${String(si+1).padStart(2,'0')}</small><b>${section.name}</b></div>${live}</div><div class="phase-fights"></div>`;const grid=sec.querySelector('.phase-fights');section.fights.forEach(base=>{const f={...base,phase,section},status=statusFor(f),d=DETAILS[f.name],b=document.createElement('button');b.type='button';b.className=`campaign-node ${f.boss?'boss ':''}${status==='READY'?'ready ':''}${status==='CLEARED'?'cleared ':''}${status==='LOCKED'?'locked ':''}${f.assigned?'assigned ':''}${selected===f.name?'selected ':''}`;b.innerHTML=`<div class="node-top"><span class="node-number">FIGHT ${f.slot}</span><span class="node-state">${status}</span></div><strong>${f.name.toUpperCase()}</strong><p>${d?`${d.lesson} • ${d.abilities.slice(0,2).join(' + ')}`:f.assigned?'Existing encounter preserved for this Phase':'Reserved roadmap encounter'}</p>${f.reward?`<span class="node-reward">🔓 ${f.reward}</span>`:''}${f.boss&&f.phase.id==='prologue'?'<span class="node-reward">🏆 +750 🪙 +5 💎 PHASE CLEAR</span>':''}`;b.onclick=()=>{selected=f.name;render();setProfile(f)};grid.appendChild(b)});article.appendChild(sec)});box.appendChild(article)
 });updateDashboard()
}
function updateDashboard(){const n=nextTarget();if($('dashTarget'))$('dashTarget').textContent=n.toUpperCase();if($('dashLevel'))$('dashLevel').textContent=!prologueComplete()?`Prologue • ${prologueOrder.indexOf(n)+1}/5`:!streetComplete()?`Phase 1 • Street War ${streetOrder.indexOf(n)+1}/2`:'Phase 1 • Section 02 Coming Soon';const latest=document.querySelector('.latest-stat');if(latest){latest.querySelector('b').textContent='v0.9.5.2';latest.querySelector('span').textContent='Crossbones • Bullseye • Street War'}}
function versionUI(){
 document.title='Fight Arena v0.9.5.2 — Street War';document.querySelectorAll('.brand .tag').forEach(x=>x.textContent='v0.9.5.2');const hero=document.querySelector('#home .hero-copy');if(hero){hero.querySelector('.tag').textContent='PHASE 1 • STREET WAR';hero.querySelector('h1').innerHTML='THE TRAINING IS OVER.<br>ENTER THE STREETS.';hero.querySelector('p').textContent='Crossbones and Bullseye open Phase 1 with two premium Marvel encounters built around tactical pressure and precision control.'}if($('updates'))$('updates').textContent='📋 UPDATE LOG • v0.9.5.2';const health=document.querySelector('.build-health b');if(health)health.textContent='STREET WAR CORE • v0.9.5.2';const chooser=document.querySelector('#deviceChooser .eyebrow');if(chooser)chooser.textContent='FIGHT ARENA v0.9.5.2';
 const panel=$('updatesScreen')?.querySelector('.panel');if(panel){const tag=panel.querySelector(':scope > .tag'),h=panel.querySelector(':scope > h2');if(tag)tag.textContent='v0.9.5.2 • STREET WAR';if(h)h.textContent='PHASE 1 HAS BEGUN.';const log=panel.querySelector('.changelog');if(log&&!$('update0952')){const holder=document.createElement('div');holder.id='update0952';holder.innerHTML='<div class="log-item"><div class="log-icon">☠️</div><div><b>Crossbones — Phase 1 Fight 1</b><p>Premium skull-mask tactical model with Skull Breaker, Tactical Burst, Blade Gauntlet and the Bones of War combo.</p></div></div><div class="log-item"><div class="log-icon">🎯</div><div><b>Bullseye — Phase 1 Fight 2</b><p>Classic precision-assassin model with Deadeye Throw, Ricochet Trick, Assassin Step and the Perfect Aim multi-projectile special.</p></div></div><div class="log-item"><div class="log-icon">🏙️</div><div><b>Street War is playable</b><p>Finish the Neo City Prologue to unlock Crossbones. Beat him to unlock Bullseye. Punisher remains the next planned encounter.</p></div></div>';while(holder.firstChild)log.insertBefore(holder.lastChild,log.firstChild)}}
}
function refreshAfterNav(){setTimeout(()=>{selected=null;render();setProfile()},0)}
function init(){if(ready)return;ready=true;versionUI();render();setProfile();$('play')?.addEventListener('click',refreshAfterNav);$('continue')?.addEventListener('click',refreshAfterNav);window.FightArenaCampaignV0952={ok:true,phases:PHASES,standby:[...STANDBY],render,prologueComplete,streetComplete}}
if(window.FightArena?.version==='0.9.5.2')setTimeout(init,0);else addEventListener('fightarena-ready',()=>setTimeout(init,0),{once:true});
})();

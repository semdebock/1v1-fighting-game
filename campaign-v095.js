/* Fight Arena v0.9.5 — Campaign Phases Foundation UI */
(()=>{
'use strict';
const $=id=>document.getElementById(id);
const STANDBY=['Ultron','Prowler'];
const PHASES=[
 {id:'prologue',eyebrow:'PROLOGUE',title:'NEO CITY ARENA',subtitle:'Fight Arena original characters only',theme:'prologue',sections:[
  {name:'FIRST BLOOD',fights:[{name:'Nightfang',existing:true,slot:1}]},
  {name:'ARENA TRIALS',fights:[{name:'Voltage',slot:2},{name:'Razor',slot:3}]},
  {name:'FINAL QUALIFIERS',final:true,fights:[{name:'Titan',slot:4},{name:'Arena Champion',slot:5,boss:true}]}
 ]},
 {id:'phase1',eyebrow:'PHASE 1',title:'STREET CRIMINALS',subtitle:'Grounded criminals, mercenaries and vigilantes',theme:'street',sections:[
  {name:'STREET WAR',fights:[{name:'Crossbones',slot:1},{name:'Bullseye',slot:2}]},
  {name:'VIGILANTE LINE',fights:[{name:'Punisher',slot:3,reward:'FUTURE PLAYABLE FIGHTER UNLOCK'},{name:'Taskmaster',slot:4}]},
  {name:'CRIMINAL EMPIRE',final:true,fights:[{name:'Kingpin',existing:true,slot:5,boss:true}]}
 ]},
 {id:'phase2',eyebrow:'PHASE 2',title:'SINISTER THREAT',subtitle:'One concentrated Spider-Man villain phase',theme:'sinister',sections:[
  {name:'RAW POWER',fights:[{name:'Rhino',slot:1},{name:'Electro',slot:2}]},
  {name:'SMOKE & CHAOS',fights:[{name:'Mysterio',existing:true,slot:3},{name:'Green Goblin',existing:true,slot:4}]},
  {name:'MASTER PLAN',final:true,fights:[{name:'Doctor Octopus',slot:5,boss:true}]}
 ]}
];
let legacy=new Map(),selected=null,initialized=false;
function toast(text){const t=$('toast');if(!t)return;t.textContent=text;t.classList.remove('hidden');setTimeout(()=>t.classList.add('hidden'),1500)}
function flatFights(){return PHASES.flatMap(p=>p.sections.flatMap(s=>s.fights.map(f=>({...f,phase:p,section:s}))))}
function builtNames(){return new Set((window.FightArena?.levels||[]).map(l=>l.name))}
function captureLegacy(){
 const box=$('levelCards'),levels=window.FightArena?.levels||[];if(!box||!levels.length)return;
 const cards=[...box.children].filter(x=>x.tagName==='BUTTON'&&x.classList.contains('card'));
 if(cards.length!==levels.length)return;
 legacy=new Map();levels.forEach((l,i)=>legacy.set(l.name,{button:cards[i],unlocked:!cards[i].classList.contains('locked'),level:l}));
}
function setProfile(fight=null){
 const panel=$('levels')?.querySelector('.panel.profile'),start=$('start');if(panel)panel.classList.add('campaign-profile');
 if(!fight){
  $('diff').textContent='v0.9.5 • PHASE FOUNDATION';$('levelTitle').textContent='SELECT A CAMPAIGN FIGHT';$('levelDesc').textContent='The Campaign is now organized into a Prologue and numbered Phases. New villain builds will be added into these fixed slots in later v0.9.5.x updates.';
  $('levelStats').innerHTML='<div><small>STRUCTURE</small>3 PHASES</div><div><small>PLANNED FIGHTS</small>15</div><div><small>NEW VILLAINS</small>NOT YET</div><div><small>STANDBY</small>PRESERVED</div>';
  if(start){start.disabled=true;start.textContent='SELECT A LIVE ENCOUNTER'}return;
 }
 const entry=fight.existing?legacy.get(fight.name):null,live=!!entry,unlocked=!!entry?.unlocked,l=entry?.level;
 $('diff').textContent=`${fight.phase.eyebrow} • ${fight.section.name}`;$('levelTitle').textContent=`FIGHT ${fight.slot} — ${fight.name.toUpperCase()}`;
 if(fight.existing){$('levelDesc').textContent=l?.desc||`${fight.name} is an existing Fight Arena encounter, now assigned to its permanent Campaign Phase.`}
 else if(fight.reward){$('levelDesc').textContent=`Planned encounter. Defeating ${fight.name} in a future update will also unlock him as a playable fighter.`}
 else{$('levelDesc').textContent=`Planned v0.9.5.x encounter. This slot is reserved now; the villain itself has not been built yet.`}
 const type=fight.boss?'PHASE BOSS':fight.reward?'FIGHTER REWARD':'STANDARD FIGHT';
 $('levelStats').innerHTML=`<div><small>PHASE</small>${fight.phase.eyebrow}</div><div><small>SLOT</small>${fight.slot}/5</div><div><small>TYPE</small>${type}</div><div><small>STATUS</small>${live?(unlocked?'LIVE':'LEGACY LOCKED'):'COMING SOON'}</div>`;
 if(start){start.disabled=!live||!unlocked;start.textContent=live?(unlocked?`FIGHT ${fight.name.toUpperCase()}`:'LEGACY ENCOUNTER LOCKED'):'COMING IN v0.9.5.x'}
}
function selectFight(fight){
 selected=fight.name;
 if(!fight.existing){renderCampaign();setProfile(fight);toast(`${fight.name.toUpperCase()} — COMING SOON`);return}
 const entry=legacy.get(fight.name);if(!entry){renderCampaign();setProfile(fight);toast('ENCOUNTER DATA IS ON STANDBY');return}
 if(!entry.unlocked){renderCampaign();setProfile(fight);toast(`${fight.name.toUpperCase()} IS LOCKED IN YOUR LEGACY SAVE`);return}
 entry.button.onclick?.();
 captureLegacy();
 renderCampaign();setProfile(fight)
}
function renderCampaign(){
 const box=$('levelCards');if(!box)return;box.innerHTML='';box.className='campaign-phase-list';
 const built=builtNames();
 PHASES.forEach(phase=>{
  const all=phase.sections.flatMap(s=>s.fights),liveCount=all.filter(f=>f.existing&&built.has(f.name)).length;
  const article=document.createElement('article');article.className=`campaign-phase phase-${phase.theme}`;
  article.innerHTML=`<div class="phase-head"><div><small>${phase.eyebrow}</small><h3>${phase.title}</h3></div><div class="phase-meta"><b>${liveCount}/5 ENCOUNTERS BUILT</b><span>${phase.subtitle}</span></div></div>`;
  phase.sections.forEach((section,si)=>{
   const sec=document.createElement('section');sec.className=`phase-section ${section.final?'final-section':''}`;
   sec.innerHTML=`<div class="section-title"><div><small>SECTION ${String(si+1).padStart(2,'0')}</small><b>${section.name}</b></div><span>${section.fights.length} FIGHT${section.fights.length===1?'':'S'}</span></div><div class="phase-fights"></div>`;
   const grid=sec.querySelector('.phase-fights');section.fights.forEach(f=>{const fight={...f,phase,section},entry=f.existing?legacy.get(f.name):null,live=!!entry,unlocked=!!entry?.unlocked,b=document.createElement('button');b.type='button';b.className=`campaign-node ${f.boss?'boss ':''}${f.existing?(unlocked?'ready ':''):'planned '}${selected===f.name?'selected ':''}`;b.innerHTML=`<div class="node-top"><span class="node-number">FIGHT ${f.slot}</span><span class="node-state">${f.existing?(live?(unlocked?'LIVE':'LOCKED'):'STANDBY'):'COMING SOON'}</span></div><strong>${f.name.toUpperCase()}</strong><p>${f.existing?'Existing encounter • assigned to permanent Phase slot':'Reserved slot • villain build follows in v0.9.5.x'}</p>${f.reward?`<span class="node-reward">🔓 ${f.reward}</span>`:''}`;b.onclick=()=>selectFight(fight);grid.appendChild(b)});
   article.appendChild(sec)
  });box.appendChild(article)
 });
}
function addBanner(){if($('campaignFoundationBanner'))return;const box=$('levelCards');if(!box)return;const d=document.createElement('div');d.id='campaignFoundationBanner';d.className='campaign-foundation-banner';d.innerHTML='<div><small>CAMPAIGN REBUILT • v0.9.5</small><b>PHASES & SECTIONS FOUNDATION</b></div><span>No new villains are built in this release. Existing unassigned villains are preserved off-screen in standby.</span>';box.parentNode.insertBefore(d,box)}
function updateVersionUI(){
 document.title='Fight Arena v0.9.5 — Campaign Phases Foundation';
 document.querySelectorAll('.brand .tag').forEach(x=>x.textContent='v0.9.5');
 const hero=document.querySelector('#home .hero-copy');if(hero){hero.querySelector('.tag').textContent='CAMPAIGN REBORN';hero.querySelector('h1').innerHTML='PHASES ARE HERE.<br>THE ROAD IS SET.';hero.querySelector('p').textContent='The Campaign now has a permanent Prologue, Phase 1 and Phase 2 structure. Fifteen villain slots are mapped before we build the next enemies.'}
 const updates=$('updates');if(updates)updates.textContent='📋 UPDATE LOG • v0.9.5';
 const latest=document.querySelector('.latest-stat');if(latest){latest.querySelector('b').textContent='v0.9.5';latest.querySelector('span').textContent='Campaign Phases • 15 Planned Slots • Standby Vault'}
 const health=document.querySelector('.build-health b');if(health)health.textContent='CAMPAIGN CORE • v0.9.5';
 const chooser=document.querySelector('#deviceChooser .eyebrow');if(chooser)chooser.textContent='FIGHT ARENA v0.9.5';
 if($('dashTarget'))$('dashTarget').textContent='NIGHTFANG';if($('dashLevel'))$('dashLevel').textContent='Prologue • Section 01';
 const updatePanel=$('updatesScreen')?.querySelector('.panel');if(updatePanel&&!$('#update095')){const oldTag=updatePanel.querySelector(':scope > .tag'),oldH=updatePanel.querySelector(':scope > h2');if(oldTag)oldTag.textContent='v0.9.5 • CAMPAIGN PHASES FOUNDATION';if(oldH)oldH.textContent='THE CAMPAIGN NOW HAS A ROADMAP.';const log=updatePanel.querySelector('.changelog');if(log){const wrap=document.createElement('div');wrap.id='update095';wrap.innerHTML='<div class="log-item"><div class="log-icon">🗺️</div><div><b>Phases & Sections</b><p>Campaign is now divided into a five-fight Prologue, five-fight Phase 1 and five-fight Phase 2, each split into named Sections.</p></div></div><div class="log-item"><div class="log-icon">🥊</div><div><b>Prologue — Neo City Arena</b><p>Nightfang stays as the opening fight. Voltage, Razor, Titan and Arena Champion are reserved as original Fight Arena characters for later builds.</p></div></div><div class="log-item"><div class="log-icon">🏙️</div><div><b>Phase 1 — Street Criminals</b><p>Crossbones, Bullseye, Punisher, Taskmaster and Kingpin are locked in as the permanent five-fight lineup. Punisher is planned as a future Campaign fighter unlock.</p></div></div><div class="log-item"><div class="log-icon">🐙</div><div><b>Phase 2 — Sinister Threat</b><p>Rhino, Electro, Mysterio, Green Goblin and Doctor Octopus form the single Spider-Man villain Phase, with Doctor Octopus reserved as the Phase Boss.</p></div></div><div class="log-item"><div class="log-icon">📦</div><div><b>Standby Vault</b><p>Existing villains without an assigned Phase are hidden from Campaign but remain fully preserved in the game source for easy return later. Nothing was deleted.</p></div></div>';while(wrap.firstChild)log.insertBefore(wrap.firstChild,log.firstChild)}}
}
function campaignOpenRefresh(){setTimeout(()=>{captureLegacy();selected=null;addBanner();renderCampaign();setProfile()},0)}
function init(){if(initialized)return;initialized=true;captureLegacy();addBanner();updateVersionUI();renderCampaign();setProfile();$('play')?.addEventListener('click',campaignOpenRefresh);$('continue')?.addEventListener('click',campaignOpenRefresh);window.FightArenaCampaignV095={ok:true,phases:PHASES,standby:[...STANDBY],render:renderCampaign}}
if(window.FightArena?.version==='0.9.5')setTimeout(init,0);else addEventListener('fightarena-ready',()=>setTimeout(init,0),{once:true});
})();

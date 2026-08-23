/* Multiverse Arena v0.9.6.6 — Swipeable Gauntlet Navigator */
(()=>{
'use strict';
const BUILD='0.9.6.6',ASSET='0966';
const $=(s,r=document)=>r.querySelector(s);
const REWARDS={Nightfang:'150 🪙 • 25 XP',Voltage:'200 🪙 • 35 XP',Razor:'250 🪙 • 45 XP',Titan:'300 🪙 • 60 XP','Arena Champion':'500 🪙 • 100 XP • 5 💎',Crossbones:'350 🪙 • 75 XP',Bullseye:'450 🪙 • 90 XP',Punisher:'550 🪙 • 110 XP • 🔓 PUNISHER',Taskmaster:'650 🪙 • 130 XP',Kingpin:'600 🪙 • 150 XP • 5 💎',Rhino:'750 🪙 • 150 XP',Electro:'800 🪙 • 165 XP',Mysterio:'900 🪙 • 180 XP','Green Goblin':'1000 🪙 • 195 XP','Doctor Octopus':'1400 🪙 • 260 XP • 10 💎'};
let wired=false,rendering=false,scrollTimer=0,selectedPhaseId=null,selectedIndexByPhase=new Map(),legacyNodes=new Map();
function style(){if($('#update0966Style'))return;const l=document.createElement('link');l.id='update0966Style';l.rel='stylesheet';l.href=`update-v0966.css?v=${ASSET}`;document.head.appendChild(l)}
function brand(){
 document.title='Multiverse Arena v0.9.6.6 — Gauntlet Navigator';
 document.querySelectorAll('.brand .tag').forEach(x=>x.textContent='v0.9.6.6');
 const updates=$('#updates');if(updates)updates.textContent='UPDATE LOG  •  v0.9.6.6';
 const latest=$('.latest-stat');if(latest){const b=$('b',latest),s=$('span',latest);if(b)b.textContent='v0.9.6.6';if(s)s.textContent='Phase Tabs • Swipe Villains • Smart Target Focus'}
 const health=$('.build-health b');if(health)health.textContent='v0.9.6.6 • GAUNTLET NAVIGATION • STABLE';
 const chooser=$('#deviceChooser .eyebrow');if(chooser)chooser.textContent='MULTIVERSE ARENA • v0.9.6.6';
 if(window.MultiverseArenaRuntime){window.MultiverseArenaRuntime.version=BUILD;window.MultiverseArenaRuntime.asset=ASSET}
}
function campaign(){return window.FightArenaCampaignV0957}
function controls(){return window.FightArenaCampaignControls}
function won(name){try{return !!controls()?.won?.(name)}catch{return false}}
function phases(){return campaign()?.phases||[]}
function phaseFights(phase){return phase.sections.flatMap(section=>section.fights.map(f=>({...f,phase,section})))}
function flatten(){return phases().flatMap(phase=>phaseFights(phase))}
function legacyMap(box){const map=new Map();box.querySelectorAll('.campaign-node').forEach(node=>{const name=node.querySelector('strong')?.textContent?.trim()?.toUpperCase();if(name)map.set(name,node)});return map}
function globalProgress(){
 const fights=flatten();if(!fights.length)return null;
 let index=fights.findIndex(f=>!won(f.name)),complete=false;if(index<0){complete=true;index=fights.length-1}
 return{fights,index,current:fights[index],complete};
}
function phaseAccessible(phase){
 const list=phases(),idx=list.findIndex(p=>p.id===phase.id);if(idx<=0)return true;
 for(let i=0;i<idx;i++)if(phaseFights(list[i]).some(f=>!won(f.name)))return false;
 return true;
}
function revealed(f,progress){return won(f.name)||progress?.complete||progress?.current?.name===f.name}
function defaultIndex(phase,progress){
 const fights=phaseFights(phase),stored=selectedIndexByPhase.get(phase.id);
 if(Number.isInteger(stored)&&stored>=0&&stored<fights.length)return stored;
 const current=fights.findIndex(f=>progress?.current?.name===f.name);if(current>=0)return current;
 const firstOpen=fights.findIndex(f=>!won(f.name));if(firstOpen>=0)return Math.max(0,firstOpen);
 return Math.max(0,fights.length-1);
}
function compactLesson(node){const text=node?.querySelector('p')?.textContent?.trim()||'';return text.split('•')[0]?.trim()||'READ THE FIGHT. PICK YOUR MOMENT.'}
function setClassifiedProfile(phase,slot){
 const diff=$('#diff'),title=$('#levelTitle'),desc=$('#levelDesc'),stats=$('#levelStats'),start=$('#start'),lesson=$('#campaignLessonPanel');
 if(diff)diff.textContent=`${phase.eyebrow} • CLASSIFIED`;
 if(title)title.textContent='CLASSIFIED THREAT';
 if(desc)desc.textContent='Progress through the Villain Gauntlet to reveal this opponent.';
 if(stats)stats.innerHTML=`<div><small>PHASE</small>${phase.eyebrow}</div><div><small>SLOT</small>${slot}/5</div><div><small>INTEL</small>CLASSIFIED</div><div><small>STATUS</small>LOCKED</div>`;
 if(start){start.disabled=true;start.textContent='THREAT CLASSIFIED';start.onclick=null}
 if(lesson)lesson.innerHTML='<small>LOCKED INTEL</small><div><span>Identity hidden</span><span>Win previous fight to reveal</span></div>';
}
function setLockedPhaseProfile(phase){
 const diff=$('#diff'),title=$('#levelTitle'),desc=$('#levelDesc'),stats=$('#levelStats'),start=$('#start'),lesson=$('#campaignLessonPanel');
 if(diff)diff.textContent=`${phase.eyebrow} • LOCKED`;
 if(title)title.textContent=`${phase.title} — LOCKED`;
 if(desc)desc.textContent='Complete the previous phase to unlock this category.';
 if(stats)stats.innerHTML='<div><small>STATUS</small>PHASE LOCKED</div><div><small>INTEL</small>CLASSIFIED</div>';
 if(start){start.disabled=true;start.textContent='COMPLETE PREVIOUS PHASE';start.onclick=null}
 if(lesson)lesson.innerHTML='<small>PROGRESSION REQUIRED</small><div><span>Finish the previous phase</span></div>';
}
function phaseTab(phase,active){
 const fights=phaseFights(phase),wins=fights.filter(f=>won(f.name)).length,access=phaseAccessible(phase);
 return `<button type="button" class="gauntlet-phase-tab-v0966 ${active?'active ':''}${access?'':'locked '}" data-phase-id="${phase.id}" aria-pressed="${active?'true':'false'}"><span>${access?phase.eyebrow:'◇ '+phase.eyebrow}</span><small>${access?`${wins}/${fights.length} CLEARED`:'LOCKED'}</small></button>`
}
function villainCard(f,index,isSelected,progress,node,access){
 const open=access&&revealed(f,progress),cleared=open&&won(f.name),current=open&&progress?.current?.name===f.name;
 if(!open)return `<button type="button" class="gauntlet-villain-card-v0966 classified ${isSelected?'selected':''}" data-villain-index="${index}" aria-label="Classified fight ${f.slot}"><span class="gauntlet-card-state-v0966">FIGHT ${f.slot}</span><strong>???</strong><small>CLASSIFIED THREAT</small><p>Win the previous fight to reveal this opponent.</p><span class="gauntlet-card-foot-v0966">◇ LOCKED INTEL</span></button>`;
 const state=cleared?'✓ CLEARED':current?'● CURRENT TARGET':'AVAILABLE';
 const lesson=compactLesson(node),reward=REWARDS[f.name]||'';
 return `<button type="button" class="gauntlet-villain-card-v0966 revealed ${isSelected?'selected':''}" data-villain-index="${index}" data-villain-name="${f.name.replace(/"/g,'&quot;')}"><span class="gauntlet-card-state-v0966">${state}</span><strong>${f.name.toUpperCase()}</strong><small>${f.section.name} • FIGHT ${f.slot}/5</small><p>${lesson}</p><span class="gauntlet-card-foot-v0966">${reward||'REPLAY AVAILABLE'}</span></button>`
}
function scrollToSelected(behavior='auto'){
 const viewport=$('.gauntlet-carousel-v0966'),card=$('.gauntlet-villain-card-v0966.selected');if(!viewport||!card)return;
 const left=card.offsetLeft-(viewport.clientWidth-card.offsetWidth)/2;viewport.scrollTo({left:Math.max(0,left),behavior});
}
function nearestIndex(viewport){
 const cards=[...viewport.querySelectorAll('.gauntlet-villain-card-v0966')];if(!cards.length)return 0;
 const center=viewport.scrollLeft+viewport.clientWidth/2;let best=0,dist=Infinity;
 cards.forEach((card,i)=>{const c=card.offsetLeft+card.offsetWidth/2,d=Math.abs(c-center);if(d<dist){dist=d;best=i}});return best;
}
function selectIndex(index,{smooth=false}={}){
 const phase=phases().find(p=>p.id===selectedPhaseId);if(!phase)return;
 const fights=phaseFights(phase),next=Math.max(0,Math.min(fights.length-1,index));
 if(next===selectedIndexByPhase.get(phase.id)&&$('.gauntlet-villain-card-v0966.selected')){if(smooth)scrollToSelected('smooth');return}
 selectedIndexByPhase.set(phase.id,next);renderNavigator({phaseId:phase.id,index:next,scrollBehavior:smooth?'smooth':'auto'});
}
function bindNavigator(box){
 box.querySelectorAll('[data-phase-id]').forEach(tab=>tab.addEventListener('click',()=>{
  selectedPhaseId=tab.dataset.phaseId;renderNavigator({phaseId:selectedPhaseId,index:null,scrollBehavior:'auto'});
 }));
 box.querySelectorAll('[data-villain-index]').forEach(card=>card.addEventListener('click',()=>selectIndex(Number(card.dataset.villainIndex),{smooth:true})));
 $('#gauntletPrev0966',box)?.addEventListener('click',()=>{const i=selectedIndexByPhase.get(selectedPhaseId)||0;selectIndex(i-1,{smooth:true})});
 $('#gauntletNext0966',box)?.addEventListener('click',()=>{const i=selectedIndexByPhase.get(selectedPhaseId)||0;selectIndex(i+1,{smooth:true})});
 const viewport=$('.gauntlet-carousel-v0966',box);if(viewport)viewport.addEventListener('scroll',()=>{
  clearTimeout(scrollTimer);scrollTimer=setTimeout(()=>{const i=nearestIndex(viewport);if(i!==selectedIndexByPhase.get(selectedPhaseId))selectIndex(i,{smooth:false})},110);
 },{passive:true});
}
function renderNavigator({phaseId=null,index=null,scrollBehavior='auto',autoTarget=false}={}){
 if(rendering)return;const api=campaign(),box=$('#levelCards');if(!api||!box)return;
 rendering=true;
 try{
  api.render?.();let map=legacyMap(box),progress=globalProgress();if(!progress)return;
  if(autoTarget||!phaseId){selectedPhaseId=progress.current.phase.id}else selectedPhaseId=phaseId;
  const phase=phases().find(p=>p.id===selectedPhaseId)||progress.current.phase,access=phaseAccessible(phase),fights=phaseFights(phase);
  const selected=Number.isInteger(index)?Math.max(0,Math.min(fights.length-1,index)):defaultIndex(phase,progress);selectedIndexByPhase.set(phase.id,selected);
  const chosen=fights[selected],open=access&&revealed(chosen,progress);
  if(open){const node=map.get(chosen.name.toUpperCase());if(node){node.click();map=legacyMap(box)}}else if(access)setClassifiedProfile(phase,chosen.slot);else setLockedPhaseProfile(phase);
  legacyNodes=map;
  const wins=fights.filter(f=>won(f.name)).length,phaseProgress=fights.length?Math.round(wins/fights.length*100):0;
  box.className='gauntlet-navigator-v0966';
  box.innerHTML=`<section class="gauntlet-nav-shell-v0966" aria-label="Villain Gauntlet navigator">
   <div class="gauntlet-phase-tabs-v0966" role="tablist" aria-label="Campaign phases">${phases().map(p=>phaseTab(p,p.id===phase.id)).join('')}</div>
   <div class="gauntlet-nav-heading-v0966"><div><span>VILLAIN GAUNTLET</span><h3>${phase.title}</h3></div><div><b>${access?`${wins}/${fights.length}`:'LOCKED'}</b><small>${access?'THREATS CLEARED':'COMPLETE PREVIOUS PHASE'}</small></div></div>
   <div class="gauntlet-nav-progress-v0966"><i style="width:${access?phaseProgress:0}%"></i></div>
   ${access?`<div class="gauntlet-carousel-shell-v0966"><button id="gauntletPrev0966" class="gauntlet-arrow-v0966" type="button" aria-label="Previous villain" ${selected<=0?'disabled':''}>‹</button><div class="gauntlet-carousel-v0966">${fights.map((f,i)=>villainCard(f,i,i===selected,progress,map.get(f.name.toUpperCase()),access)).join('')}</div><button id="gauntletNext0966" class="gauntlet-arrow-v0966" type="button" aria-label="Next villain" ${selected>=fights.length-1?'disabled':''}>›</button></div>`:`<div class="gauntlet-phase-locked-v0966"><span>◇ CLASSIFIED PHASE</span><strong>${phase.title}</strong><p>Complete the previous phase to unlock this category and its threats.</p></div>`}
   <footer class="gauntlet-nav-guide-v0966"><span>SWIPE TO CHOOSE</span><p>${access?'Swipe left or right between revealed fights. Unreached villains stay classified until campaign progression reveals them.':'This phase stays classified until the previous phase is cleared.'}</p></footer>
  </section>`;
  document.documentElement.classList.remove('gauntlet-focus-active-v0965');document.documentElement.classList.add('gauntlet-navigation-active-v0966');
  bindNavigator(box);brand();if(access)setTimeout(()=>scrollToSelected(scrollBehavior),0);
 }finally{rendering=false}
}
function cleanUpdateLog(){
 const box=$('#updatesScreen .changelog');if(!box)return;
 const releases=[
  ['↔','v0.9.6.6 — Swipeable Villain Selection','Each phase now has a calm horizontal villain carousel. Swipe naturally on iPad or use the subtle arrow controls to move between fights.'],
  ['▤','v0.9.6.6 — Phase Categories','PROLOGUE, PHASE 1 and PHASE 2 live in a clean tab bar above the Gauntlet. The navigator is data-driven so future phases can plug into the same layout.'],
  ['🎯','v0.9.6.6 — Smart Target Focus','Opening the Gauntlet automatically lands on your current campaign target. You can then freely return to any previously unlocked villain for a replay.'],
  ['◇','v0.9.6.6 — Progression Privacy','Unreached opponents remain ??? / CLASSIFIED. Navigation gives freedom without spoiling future fights or bypassing campaign progression.'],
  ['🎥','v0.9.6.5 — Gauntlet Focus','The campaign was simplified around clear targets, restrained motion and classified future threats.'],
  ['📐','v0.9.6.4 — iPad Control Fit + UI Audit','Combat controls, home preview alignment and release-version reliability were polished for iPad.']
 ];
 box.dataset.cleaned0966='1';delete box.dataset.cleaned0965;delete box.dataset.cleaned0964;
 box.innerHTML=releases.map(([icon,title,text])=>`<div class="log-item recent-release-v0966"><div class="log-icon">${icon}</div><div><b>${title}</b><p>${text}</p></div></div>`).join('');
 const tag=$('#updatesScreen .panel>.tag');if(tag)tag.textContent='v0.9.6.6 • GAUNTLET NAVIGATOR';
 const title=$('#updatesScreen .panel>h2');if(title)title.textContent='CHOOSE YOUR PHASE. CHOOSE YOUR FIGHT.';
}
function leave(){document.documentElement.classList.remove('gauntlet-navigation-active-v0966')}
function wire(){
 if(wired)return;wired=true;
 $('#play')?.addEventListener('click',()=>setTimeout(()=>renderNavigator({autoTarget:true}),65));
 $('#continue')?.addEventListener('click',()=>setTimeout(()=>renderNavigator({autoTarget:true}),85));
 $('#pauseMenu')?.addEventListener('click',leave);
 document.querySelectorAll('#levels .back').forEach(b=>b.addEventListener('click',leave));
}
function refresh(){style();brand();cleanUpdateLog();wire()}
function init(){refresh();window.MultiverseArenaUpdate0966={version:BUILD,refresh,renderNavigator,cleanUpdateLog}}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
addEventListener('fightarena-ready',()=>setTimeout(()=>{refresh();if($('#levels')?.classList.contains('active'))renderNavigator({autoTarget:true})},230),{once:true});
})();

/* Multiverse Arena v0.9.6.5 — Villain Gauntlet Focus + Camera Clarity */
(()=>{
'use strict';
const BUILD='0.9.6.5',ASSET='0965',INDEX_KEY='multiverseArenaGauntletFocusIndex';
const $=(s,r=document)=>r.querySelector(s);
const REWARDS={Nightfang:'150 🪙 • 25 XP',Voltage:'200 🪙 • 35 XP',Razor:'250 🪙 • 45 XP',Titan:'300 🪙 • 60 XP','Arena Champion':'500 🪙 • 100 XP • 5 💎',Crossbones:'350 🪙 • 75 XP',Bullseye:'450 🪙 • 90 XP',Punisher:'550 🪙 • 110 XP • 🔓 PUNISHER',Taskmaster:'650 🪙 • 130 XP',Kingpin:'600 🪙 • 150 XP • 5 💎',Rhino:'750 🪙 • 150 XP',Electro:'800 🪙 • 165 XP',Mysterio:'900 🪙 • 180 XP','Green Goblin':'1000 🪙 • 195 XP','Doctor Octopus':'1400 🪙 • 260 XP • 10 💎'};
let wired=false,rendering=false,lastLegacyNodes=new Map();
function style(){if($('#update0965Style'))return;const l=document.createElement('link');l.id='update0965Style';l.rel='stylesheet';l.href=`update-v0965.css?v=${ASSET}`;document.head.appendChild(l)}
function brand(){
 document.title='Multiverse Arena v0.9.6.5 — Villain Gauntlet Focus';
 document.querySelectorAll('.brand .tag').forEach(x=>x.textContent='v0.9.6.5');
 const updates=$('#updates');if(updates)updates.textContent='UPDATE LOG  •  v0.9.6.5';
 const latest=$('.latest-stat');if(latest){const b=$('b',latest),s=$('span',latest);if(b)b.textContent='v0.9.6.5';if(s)s.textContent='Gauntlet Focus • Camera Slides • Classified Threats'}
 const health=$('.build-health b');if(health)health.textContent='v0.9.6.5 • GAUNTLET CLARITY • STABLE';
 const chooser=$('#deviceChooser .eyebrow');if(chooser)chooser.textContent='MULTIVERSE ARENA • v0.9.6.5';
 if(window.MultiverseArenaRuntime){window.MultiverseArenaRuntime.version=BUILD;window.MultiverseArenaRuntime.asset=ASSET}
}
function campaign(){return window.FightArenaCampaignV0957}
function controls(){return window.FightArenaCampaignControls}
function won(name){try{return !!controls()?.won?.(name)}catch{return false}}
function flatten(){const api=campaign();if(!api?.phases)return[];return api.phases.flatMap(phase=>phase.sections.flatMap(section=>section.fights.map(f=>({...f,phase,section}))))}
function legacyMap(box){const map=new Map();box.querySelectorAll('.campaign-node').forEach(node=>{const name=node.querySelector('strong')?.textContent?.trim()?.toUpperCase();if(name)map.set(name,node)});return map}
function progression(){
 const fights=flatten();if(!fights.length)return null;
 let index=fights.findIndex(f=>!won(f.name)),complete=false;if(index<0){complete=true;index=fights.length-1}
 const current=fights[index],previous=index>0&&won(fights[index-1].name)?fights[index-1]:null,next=!complete&&index<fights.length-1?fights[index+1]:null;
 const phaseFights=fights.filter(f=>f.phase.id===current.phase.id),phaseWins=phaseFights.filter(f=>won(f.name)).length;
 return{fights,index,current,previous,next,complete,phaseFights,phaseWins,totalWins:fights.filter(f=>won(f.name)).length}
}
function cameraDirection(index){let before=null;try{const raw=sessionStorage.getItem(INDEX_KEY);if(raw!==null)before=Number(raw)}catch{}try{sessionStorage.setItem(INDEX_KEY,String(index))}catch{}return Number.isFinite(before)&&index>before?'forward':Number.isFinite(before)&&index<before?'back':'settled'}
function compactLesson(node){const text=node?.querySelector('p')?.textContent?.trim()||'';return text.split('•')[0]?.trim()||'READ THE FIGHT. PICK YOUR MOMENT.'}
function focusCard(kind,f,node,complete=false){
 if(kind==='next')return `<button type="button" class="gauntlet-threat-v0965 gauntlet-next-v0965" disabled aria-label="Classified next threat"><span class="gauntlet-role-v0965">NEXT THREAT</span><strong>???</strong><small>CLASSIFIED</small><p>Defeat the current target to reveal this encounter.</p><span class="gauntlet-lock-v0965">◇ LOCKED INTEL</span></button>`;
 if(!f)return `<div class="gauntlet-threat-v0965 gauntlet-empty-v0965" aria-hidden="true"></div>`;
 const current=kind==='current',cleared=won(f.name),label=current?(complete?'FINAL TARGET CLEARED':'CURRENT TARGET'):'PREVIOUS FIGHT',state=cleared?'✓ CLEARED':'● READY';
 const lesson=compactLesson(node),reward=REWARDS[f.name]||'';
 return `<button type="button" class="gauntlet-threat-v0965 ${current?'gauntlet-current-v0965':'gauntlet-previous-v0965'}" data-gauntlet-name="${f.name.replace(/"/g,'&quot;')}"><span class="gauntlet-role-v0965">${label}</span><strong>${f.name.toUpperCase()}</strong><small>${f.phase.eyebrow} • FIGHT ${f.slot}/5</small>${current?`<p>${lesson}</p><span class="gauntlet-reward-v0965">${reward}</span>`:`<p>${state}</p><span class="gauntlet-replay-v0965">TAP TO VIEW / REPLAY</span>`}</button>`
}
function bindFocusedCards(box){
 box.querySelectorAll('[data-gauntlet-name]').forEach(card=>card.addEventListener('click',()=>{
  const name=card.dataset.gauntletName?.toUpperCase(),legacy=lastLegacyNodes.get(name);if(!legacy)return;
  legacy.click();setTimeout(()=>renderFocus({selectCurrent:false,preserveDirection:true}),0);
 }))
}
function renderFocus({selectCurrent=true,preserveDirection=false}={}){
 if(rendering)return;const api=campaign(),box=$('#levelCards');if(!api||!box)return;
 rendering=true;
 try{
  api.render?.();
  let map=legacyMap(box),p=progression();if(!p)return;
  if(selectCurrent){const currentNode=map.get(p.current.name.toUpperCase());if(currentNode){currentNode.click();map=legacyMap(box);p=progression()||p}}
  lastLegacyNodes=map;
  const direction=preserveDirection?'settled':cameraDirection(p.index),phaseCount=p.phaseFights.length||5,progress=Math.round((p.phaseWins/phaseCount)*100);
  const phaseState=p.complete?'CAMPAIGN COMPLETE':`${p.phaseWins}/${phaseCount} THREATS DEFEATED`;
  const currentNode=map.get(p.current.name.toUpperCase()),previousNode=p.previous?map.get(p.previous.name.toUpperCase()):null;
  box.className='gauntlet-focus-v0965';
  box.innerHTML=`<section class="gauntlet-shell-v0965" data-camera="${direction}" aria-label="Focused Villain Gauntlet">
   <header class="gauntlet-head-v0965"><div><span>VILLAIN GAUNTLET</span><h3>${p.current.phase.title}</h3></div><div class="gauntlet-phase-state-v0965"><b>${p.current.phase.eyebrow}</b><small>${phaseState}</small></div></header>
   <div class="gauntlet-progress-v0965"><i style="width:${progress}%"></i></div>
   <div class="gauntlet-camera-window-v0965"><div class="gauntlet-camera-v0965">
    ${focusCard('previous',p.previous,previousNode,p.complete)}
    ${focusCard('current',p.current,currentNode,p.complete)}
    ${p.next?focusCard('next',p.next,null,false):'<div class="gauntlet-threat-v0965 gauntlet-finish-v0965"><span class="gauntlet-role-v0965">GAUNTLET STATUS</span><strong>COMPLETE</strong><small>ALL CURRENT THREATS CLEARED</small></div>'}
   </div></div>
   <footer class="gauntlet-guidance-v0965"><span>ONE THREAT AT A TIME</span><p>${p.complete?'Current Villain Gauntlet complete. The arena is ready for the next expansion.':'Win the current fight to reveal the next threat. Future villains stay classified until you reach them.'}</p></footer>
  </section>`;
  document.documentElement.classList.add('gauntlet-focus-active-v0965');
  bindFocusedCards(box);brand();
 }finally{rendering=false}
}
function cleanUpdateLog(){
 const box=$('#updatesScreen .changelog');if(!box)return;
 const releases=[
  ['🎯','v0.9.6.5 — Focused Villain Gauntlet','The campaign now shows one clear target at a time: one previous fight, the current encounter and one classified future threat instead of the entire roadmap.'],
  ['🎥','v0.9.6.5 — Camera Slide Progression','After a victory the Gauntlet calmly slides forward to the newly revealed target. Motion is short, CSS-only and disabled automatically for reduced-motion users.'],
  ['◇','v0.9.6.5 — Classified Future Threats','Upcoming villain names and bosses stay hidden as ??? until progression reveals them, making each win feel like a real step forward.'],
  ['📐','v0.9.6.4 — iPad Control Fit + UI Audit','Combat controls were fitted above the fold, the home fighter was centered and version/UI races were cleaned up.'],
  ['💥','v0.9.6.2 — Fullscreen Fight + True Primo Super','El Primo gained his true leap-and-smash Super and the combat layout became viewport-based.'],
  ['✨','v0.9.6 — Premium Presentation','The premium obsidian-and-gold presentation remains the visual foundation of Multiverse Arena.']
 ];
 box.dataset.cleaned0965='1';delete box.dataset.cleaned0964;delete box.dataset.cleaned0963;
 box.innerHTML=releases.map(([icon,title,text])=>`<div class="log-item recent-release-v0965"><div class="log-icon">${icon}</div><div><b>${title}</b><p>${text}</p></div></div>`).join('');
 const tag=$('#updatesScreen .panel>.tag');if(tag)tag.textContent='v0.9.6.5 • GAUNTLET FOCUS';
 const title=$('#updatesScreen .panel>h2');if(title)title.textContent='ONE THREAT. ONE CLEAR NEXT STEP.';
}
function wire(){
 if(wired)return;wired=true;
 $('#play')?.addEventListener('click',()=>setTimeout(()=>renderFocus({selectCurrent:true}),50));
 $('#continue')?.addEventListener('click',()=>setTimeout(()=>renderFocus({selectCurrent:true}),70));
 $('#pauseMenu')?.addEventListener('click',()=>document.documentElement.classList.remove('gauntlet-focus-active-v0965'));
 document.querySelectorAll('#levels .back').forEach(b=>b.addEventListener('click',()=>document.documentElement.classList.remove('gauntlet-focus-active-v0965')));
}
function refresh(){style();brand();cleanUpdateLog();wire()}
function init(){refresh();window.MultiverseArenaUpdate0965={version:BUILD,refresh,renderFocus,cleanUpdateLog}}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
addEventListener('fightarena-ready',()=>setTimeout(()=>{refresh();if($('#levels')?.classList.contains('active'))renderFocus({selectCurrent:true})},190),{once:true});
})();

/* Multiverse Arena v0.9.7.4.1 — Hulkbuster Heavy Mech + Rematch Hotfix */
(()=>{
'use strict';
const BUILD='0.9.7.4.1',ASSET='09741';
const $=(s,r=document)=>r.querySelector(s);
const ownsRelease=()=>{const v=window.MultiverseArenaRuntime?.version;return !v||v===BUILD};
let wired=false;
function style(){if($('#update09741Style'))return;const l=document.createElement('link');l.id='update09741Style';l.rel='stylesheet';l.href=`update-v09741.css?v=${window.MultiverseArenaRuntime?.asset||ASSET}`;document.head.appendChild(l)}
function brand(){
 if(!ownsRelease())return;
 document.title='Multiverse Arena v0.9.7.4.1 — Hulkbuster Rework + Rematch Fix';
 document.querySelectorAll('.brand .tag').forEach(x=>x.textContent='v0.9.7.4.1');
 const u=$('#updates');if(u)u.textContent='UPDATE LOG  •  v0.9.7.4.1';
 const latest=$('.latest-stat');if(latest){const b=$('b',latest),s=$('span',latest);if(b)b.textContent='v0.9.7.4.1';if(s)s.textContent='Hulkbuster Heavy Mech Rework • Rematch Restored'}
 const health=$('.build-health b');if(health)health.textContent='v0.9.7.4.1 • HULKBUSTER + REMATCH • STABLE';
 const chooser=$('#deviceChooser .eyebrow');if(chooser)chooser.textContent='MULTIVERSE ARENA • v0.9.7.4.1';
 document.documentElement.dataset.multiverseRelease=BUILD;
 if(window.MultiverseArenaRuntime){window.MultiverseArenaRuntime.version=BUILD;window.MultiverseArenaRuntime.asset=ASSET}
}
function decorateHulkbuster(){
 document.querySelectorAll('.skin-card').forEach(card=>{if(card.querySelector('h3')?.textContent?.trim()==='HULKBUSTER'){card.classList.add('hulkbuster-premium-card','hulkbuster-rework-v09741');const desc=$('.skin-card-desc',card);if(desc)desc.textContent='MYTHIC Ability Variant • Heavy Mech Rework • 175 HP • 98 Power';}});
}
function restoreRematch(){
 const btn=$('#rematch');if(!btn)return false;
 btn.classList.add('rematch-fixed-v09741');btn.setAttribute('aria-label','Rematch current campaign fight');
 if(btn.dataset.rematchWired09741==='1')return true;
 btn.dataset.rematchWired09741='1';
 btn.onclick=e=>{
  e?.preventDefault?.();e?.stopPropagation?.();
  if(btn.dataset.rematchBusy09741==='1')return false;
  const controls=window.FightArenaCampaignControls,result=controls?.lastResult?.()||window.__FightArenaLastResult;
  if(!controls?.last?.()&&result?.name)window.__FightArenaLastCampaignFight=result.name;
  btn.dataset.rematchBusy09741='1';btn.disabled=true;
  const started=!!controls?.rematch?.();
  if(!started){delete btn.dataset.rematchBusy09741;btn.disabled=false;return false}
  setTimeout(()=>{delete btn.dataset.rematchBusy09741;btn.disabled=false;brand()},720);
  return true;
 };
 return true;
}
function cleanUpdateLog(){
 if(!ownsRelease())return;
 const box=$('#updatesScreen .changelog');if(!box)return;
 const releases=[
  ['🦾','v0.9.7.4.1 — Hulkbuster Heavy Mech Rework','Hulkbuster now has a smaller recessed helmet, much wider layered chest, giant shoulder pods, oversized gauntlets, heavier legs and a brighter compact arc reactor for a true heavy-mech silhouette.'],
  ['↻','v0.9.7.4.1 — Rematch Restored','The Results REMATCH button is wired back to the existing campaign rematch controller with a double-tap lock, so the same opponent reliably restarts in a clean fight state.'],
  ['☄️','v0.9.7.4 — Hulkbuster','The 250-Diamond Mythic Iron Man Ability Variant retains 175 HP, 98 Power, Heavy Armor, Hulkbuster Slam, Micro Missile Swarm, Repulsor Barrage and Veronica Crashdown.'],
  ['🗂️','v0.9.7.3 — Collection UX','Quick fighter stats, one-tap equip and the true 24-hour 1,250 coin Daily Reward remain intact.'],
  ['⚖️','v0.9.7.2 — Combat Balance','Rookie, Captain America and Daredevil buffs plus Phase 3 fairness tuning remain active.'],
  ['🐾','v0.9.7.1 — Sabretooth + Stability','Sabretooth visual rework and Result-flow stability remain protected.']
 ];
 box.innerHTML=releases.map(([icon,title,text])=>`<div class="log-item recent-release-v09741"><div class="log-icon">${icon}</div><div><b>${title}</b><p>${text}</p></div></div>`).join('');
 const tag=$('#updatesScreen .panel>.tag');if(tag)tag.textContent='v0.9.7.4.1 • HULKBUSTER REWORK + REMATCH';const title=$('#updatesScreen .panel>h2');if(title)title.textContent='BIGGER ARMOR. CLEANER RUNBACK.';
}
function wire(){if(wired)return;wired=true;restoreRematch();$('#gallery')?.addEventListener('click',()=>setTimeout(()=>{brand();decorateHulkbuster()},90));$('#updates')?.addEventListener('click',()=>setTimeout(()=>{brand();cleanUpdateLog()},30));addEventListener('pageshow',()=>setTimeout(refresh,0));document.addEventListener('visibilitychange',()=>{if(!document.hidden)setTimeout(refresh,0)});}
function refresh(){style();brand();decorateHulkbuster();restoreRematch();cleanUpdateLog();wire()}
function init(){refresh();window.MultiverseArenaUpdate09741={version:BUILD,refresh,brand,restoreRematch,decorateHulkbuster}}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
addEventListener('fightarena-ready',()=>setTimeout(refresh,480),{once:true});
})();

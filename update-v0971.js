/* Multiverse Arena v0.9.7.1 — Sabretooth Rework + Result/Version Stability */
(()=>{
'use strict';
const BUILD='0.9.7.1',ASSET='0971';
const $=(s,r=document)=>r.querySelector(s);
let wired=false;
function style(){if($('#mutant0971Style'))return;const l=document.createElement('link');l.id='mutant0971Style';l.rel='stylesheet';l.href=`mutant-v0971.css?v=${ASSET}`;document.head.appendChild(l)}
function brand(){
 document.title='Multiverse Arena v0.9.7.1 — Sabretooth Rework + Stability';
 document.querySelectorAll('.brand .tag').forEach(x=>x.textContent='v0.9.7.1');
 const updates=$('#updates');if(updates)updates.textContent='UPDATE LOG  •  v0.9.7.1';
 const latest=$('.latest-stat');if(latest){const b=$('b',latest),s=$('span',latest);if(b)b.textContent='v0.9.7.1';if(s)s.textContent='Sabretooth Rework • Result Flow • Version Sync'}
 const health=$('.build-health b');if(health)health.textContent='v0.9.7.1 • SABRETOOTH + RESULT STABILITY • STABLE';
 const chooser=$('#deviceChooser .eyebrow');if(chooser)chooser.textContent='MULTIVERSE ARENA • v0.9.7.1';
 const hero=$('#home .hero-copy');if(hero){const tag=$('.tag',hero),h=$('h1',hero),p=$('p',hero);if(tag)tag.textContent='PHASE 3 • MUTANT UPRISING';if(h)h.innerHTML='THE MUTANTS<br>HAVE ARRIVED.';if(p)p.textContent='Sabretooth has been rebuilt in his classic feral style while Result flow and release versioning are stabilized across the Arena.'}
 document.documentElement.dataset.multiverseRelease='0.9.7.1';
 if(window.MultiverseArenaRuntime){window.MultiverseArenaRuntime.version=BUILD;window.MultiverseArenaRuntime.asset=ASSET}
}
function cleanUpdateLog(){
 const box=$('#updatesScreen .changelog');if(!box)return;
 const releases=[
  ['🐾','v0.9.7.1 — Sabretooth Visual Rework','Sabretooth now has a sharper classic feral silhouette with a huge blond mane, fanged face, fur collar, gold-brown suit and oversized clawed hands.'],
  ['▶','v0.9.7.1 — NEXT FIGHT Stability','Result actions now live in one scroll-safe stack. The Gauntlet only re-renders after Continue when the player actually returns to the Campaign screen, preventing fight-transition state collisions.'],
  ['◆','v0.9.7.1 — Release Number Sync','The current release owns every visible version label and update-log headline. Older presentation layers are prevented from downgrading the UI after navigation.'],
  ['🧬','v0.9.7 — Mutant Uprising','Phase 3 introduced Sabretooth, Mystique, Juggernaut, Deadpool and Magneto with unique premium combat identities.'],
  ['↔','v0.9.6.6 — Gauntlet Navigator','Phase tabs and native swipe selection made every unlocked villain easy to revisit without spoiling future fights.'],
  ['🎥','v0.9.6.5 — Gauntlet Focus','The campaign was simplified around clear targets, restrained motion and classified future threats.']
 ];
 box.dataset.cleaned0971='1';delete box.dataset.cleaned097;
 box.innerHTML=releases.map(([icon,title,text])=>`<div class="log-item recent-release-v0971"><div class="log-icon">${icon}</div><div><b>${title}</b><p>${text}</p></div></div>`).join('');
 const tag=$('#updatesScreen .panel>.tag');if(tag)tag.textContent='v0.9.7.1 • SABRETOOTH + STABILITY';
 const title=$('#updatesScreen .panel>h2');if(title)title.textContent='FERAL LOOK. CLEANER FLOW.';
}
function stabilizeResultActions(){
 const host=$('#results'),next=$('#continue'),rematch=$('#rematch'),menu=$('#menu');if(!host||!next||!rematch||!menu)return false;
 let stack=$('.result-action-stack-v0971',host);if(!stack){stack=document.createElement('div');stack.className='result-action-stack-v0971';host.appendChild(stack)}
 for(const b of [next,rematch,menu])if(b.parentElement!==stack)stack.appendChild(b);
 next.setAttribute('aria-label','Next campaign fight');rematch.setAttribute('aria-label','Rematch current fight');menu.setAttribute('aria-label','Return to main menu');
 return true;
}
function releaseTransitionLock(){const next=$('#continue');if(!next)return;delete next.dataset.transitioning;if(!$('#results')?.classList.contains('active'))next.disabled=false}
function wire(){
 if(wired)return;wired=true;stabilizeResultActions();
 $('#continue')?.addEventListener('click',()=>{const next=$('#continue');if(next)next.dataset.transitioning='1';setTimeout(()=>{releaseTransitionLock();if($('#levels')?.classList.contains('active'))window.MultiverseArenaUpdate097?.renderNavigator?.({autoTarget:true});brand();cleanUpdateLog()},460)});
 $('#rematch')?.addEventListener('click',()=>setTimeout(()=>{releaseTransitionLock();brand()},380));
 $('#menu')?.addEventListener('click',()=>setTimeout(()=>{releaseTransitionLock();brand()},80));
 $('#play')?.addEventListener('click',()=>setTimeout(()=>{brand();cleanUpdateLog()},180));
 $('#updates')?.addEventListener('click',()=>setTimeout(()=>{brand();cleanUpdateLog()},30));
 addEventListener('pageshow',()=>setTimeout(()=>{brand();cleanUpdateLog();stabilizeResultActions()},0));
 document.addEventListener('visibilitychange',()=>{if(!document.hidden)setTimeout(()=>{brand();cleanUpdateLog()},0)});
}
function refresh(){style();brand();cleanUpdateLog();stabilizeResultActions();wire()}
function init(){refresh();window.MultiverseArenaUpdate0971={version:BUILD,refresh,brand,cleanUpdateLog,stabilizeResultActions}}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
addEventListener('fightarena-ready',()=>setTimeout(refresh,300),{once:true});
})();

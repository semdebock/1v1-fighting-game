/* Fight Arena v0.9.4.1 — Combat Stability & Collection Polish */
(()=>{
'use strict';
const $=id=>document.getElementById(id);
const fight=$('fight'),arena=$('arena');
let ready=false;

function fightActive(){return !!fight?.classList.contains('active')}
function cleanupArena(){
  if(!arena)return;
  arena.querySelectorAll('#mystClone,.illusion,.smoke,.impact,.blockfx,.ko-banner,.boss-intro,.fighter-intro,.khonshu-flash,.berserker-rage,.kinetic-overdrive,.kinetic-release,.bp-clawfx,.wolverine-slash').forEach(el=>{
    if(el.id==='pF'||el.id==='eF')return;
    el.remove();
  });
  $('eF')?.classList.remove('cloaked','rage');
}

/* Safari game-zone: browser gestures never own combat touches. Pointer events still reach game handlers. */
function stopBrowserGesture(e){if(!fightActive())return;e.preventDefault()}
['touchstart','touchmove','touchend','touchcancel'].forEach(type=>fight?.addEventListener(type,stopBrowserGesture,{passive:false,capture:true}));
['gesturestart','gesturechange','gestureend'].forEach(type=>document.addEventListener(type,stopBrowserGesture,{passive:false,capture:true}));
fight?.addEventListener('pointerdown',e=>{if(!fightActive()||e.pointerType==='mouse')return;e.preventDefault()},{passive:false,capture:true});
fight?.addEventListener('dblclick',e=>{if(fightActive())e.preventDefault()},{capture:true});

/* Hard cleanup whenever the fight screen is left or a fresh battle replaces it. */
if(fight){new MutationObserver(()=>{if(!fightActive())cleanupArena()}).observe(fight,{attributes:true,attributeFilter:['class']})}
['quit','pauseMenu','continue','menu','start','trainingStart','pauseRestart'].forEach(id=>$(id)?.addEventListener('click',()=>setTimeout(cleanupArena,0),true));
window.addEventListener('pagehide',cleanupArena);

function polishFighters(){
 const box=$('charCards');if(!box)return;
 box.classList.add('rank-groups');
}
function polishSkins(){
 const box=$('skinCards');if(!box||box.dataset.grouped==='1')return;
 const cards=[...box.children].filter(x=>x.classList?.contains('skin-card'));if(!cards.length)return;
 const order=[];const groups=new Map();
 cards.forEach(card=>{
   const eyebrow=card.querySelector('.eyebrow')?.textContent||'';
   const hero=(eyebrow.split('•')[1]||'OTHER').trim();
   if(!groups.has(hero)){groups.set(hero,[]);order.push(hero)}
   const variant=card.classList.contains('ability-variant-card');
   if(!card.querySelector('.skin-type-badge')){const badge=document.createElement('div');badge.className='skin-type-badge';badge.textContent=variant?'⚡ ABILITY VARIANT':'COSMETIC SUIT';card.querySelector('h3')?.before(badge)}
   groups.get(hero).push(card);
 });
 box.innerHTML='';box.classList.add('skin-hero-groups');box.dataset.grouped='1';
 order.forEach(hero=>{
   const section=document.createElement('section');section.className='skin-hero-group';
   const list=groups.get(hero),variants=list.filter(c=>c.classList.contains('ability-variant-card')).length;
   section.innerHTML=`<div class="skin-hero-head"><div><strong>${hero}</strong><small>SUIT COLLECTION</small></div><span>${list.length} SUIT${list.length===1?'':'S'}${variants?` • ${variants} VARIANT${variants===1?'':'S'}`:''}</span></div><div class="skin-hero-grid"></div>`;
   const grid=section.querySelector('.skin-hero-grid');list.forEach(c=>grid.appendChild(c));box.appendChild(section);
 });
}
function observeCollections(){
 const f=$('charCards'),s=$('skinCards');
 if(f)new MutationObserver(()=>polishFighters()).observe(f,{childList:true,subtree:true});
 if(s)new MutationObserver(()=>{if(s.dataset.grouped!=='1')polishSkins()}).observe(s,{childList:true});
 polishFighters();polishSkins();
 document.querySelectorAll('[data-collection-tab="skins"]').forEach(b=>b.addEventListener('click',()=>{const s=$('skinCards');if(s)s.dataset.grouped='';setTimeout(polishSkins,0)}));
}
function versionUI(){
 document.title='Fight Arena v0.9.4.1 — Combat Stability & Collection';
 document.querySelectorAll('.brand .tag').forEach(x=>x.textContent='v0.9.4.1');
 const update=$('updates');if(update)update.textContent='📋 UPDATE LOG • v0.9.4.1';
 const latest=document.querySelector('.latest-stat');if(latest){latest.querySelector('b').textContent='v0.9.4.1';latest.querySelector('span').textContent='Combat Stability • Safari Touch • Collection Polish'}
 const health=document.querySelector('.build-health b');if(health)health.textContent='STABILITY CORE • v0.9.4.1';
}
function init(){if(ready)return;ready=true;cleanupArena();observeCollections();versionUI();window.__FightArenaV0941={ok:true,cleanupArena}}
window.addEventListener('fightarena-ready',init,{once:true});
setTimeout(()=>{if(window.FightArenaControls)init()},1200);
})();

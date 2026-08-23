/* Fight Arena v0.9.4.1+ — transient arena cleanup safety net */
(() => {
 'use strict';
 const fight=document.getElementById('fight'),arena=document.getElementById('arena');
 if(!fight||!arena){window.__FightArenaStabilityV0941={ok:false};return}
 const selector='#mystClone,.projectile,.impact,.blockfx,.ko-banner,.callout,.smoke,.wave,.divine-nova,.omni-warp,.absolute-decree,.dd-grapple,.khonshu-flash,.nano-arsenal,.bp-clawfx,.wolverine-slash,.berserker-rage,.kinetic-release,.kinetic-overdrive,.fighter-intro,.boss-intro,.neo-intro,.voltage-pulse,.razor-slashfx,.razor-spinfx,.titan-wave,.champion-crown,.masterplan-intro,.ock-jab-line,.ock-sweepfx,.ock-target,.ock-pincerfx,.ock-grabfx,.crossbones-bladefx,.crossbones-warfx,.bullseye-ricochet,.bullseye-perfectfx,.punisher-grenade,.punisher-blast,.punisher-warzonefx,.taskmaster-slash,.taskmaster-masterfx,.rhino-charge-line,.rhino-hornfx,.rhino-quakefx,.rhino-stampedefx,.electro-blinkfx,.electro-target,.electro-gridbolt,.primo-smash-impact';
 const cleanup=()=>{arena.querySelectorAll(selector).forEach(n=>n.remove());arena.classList.remove('primo-super-impact');const e=document.getElementById('eF'),p=document.getElementById('pF');e?.classList.remove('voltage-dash','razor-combo','razor-leap','titan-smash','titan-charge','champion-strike','champion-rush','champion-mode','ock-jab','ock-sweep','ock-pincer','ock-grab','ock-crossfire','ock-phase2','ock-phase3','ock-open');p?.classList.remove('primo-super-leap');p?.style.removeProperty('--primo-smash-x')};
 const observer=new MutationObserver(()=>{if(!fight.classList.contains('active'))cleanup()});
 observer.observe(fight,{attributes:true,attributeFilter:['class']});
 ['start','trainingStart','pauseRestart','quit','pauseMenu','menu','continue'].forEach(id=>document.getElementById(id)?.addEventListener('pointerdown',()=>{if(id==='start'||id==='trainingStart'||id==='pauseRestart'||id==='quit'||id==='pauseMenu')cleanup()},{capture:true}));
 addEventListener('pagehide',cleanup);
 window.__FightArenaStabilityV0941={ok:true,cleanup};
})();

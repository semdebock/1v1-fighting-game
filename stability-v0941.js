/* Fight Arena v0.9.4.1+ — transient arena cleanup safety net */
(() => {
 'use strict';
 const fight=document.getElementById('fight'),arena=document.getElementById('arena');
 if(!fight||!arena){window.__FightArenaStabilityV0941={ok:false};return}
 const selector='#mystClone,.projectile,.impact,.blockfx,.ko-banner,.callout,.smoke,.wave,.divine-nova,.omni-warp,.absolute-decree,.dd-grapple,.khonshu-flash,.nano-arsenal,.bp-clawfx,.wolverine-slash,.berserker-rage,.kinetic-release,.kinetic-overdrive,.fighter-intro,.boss-intro,.neo-intro,.voltage-pulse,.razor-slashfx,.razor-spinfx,.titan-wave,.champion-crown';
 const cleanup=()=>{arena.querySelectorAll(selector).forEach(n=>n.remove());document.getElementById('eF')?.classList.remove('voltage-dash','razor-combo','razor-leap','titan-smash','titan-charge','champion-strike','champion-rush','champion-mode')};
 const observer=new MutationObserver(()=>{if(!fight.classList.contains('active'))cleanup()});
 observer.observe(fight,{attributes:true,attributeFilter:['class']});
 ['start','trainingStart','pauseRestart','quit','pauseMenu','menu','continue'].forEach(id=>document.getElementById(id)?.addEventListener('pointerdown',()=>{if(id==='start'||id==='trainingStart'||id==='pauseRestart'||id==='quit'||id==='pauseMenu')cleanup()},{capture:true}));
 addEventListener('pagehide',cleanup);
 window.__FightArenaStabilityV0941={ok:true,cleanup};
})();

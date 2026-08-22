/* Fight Arena v0.9.5.1 — Neo City transient cleanup extension */
(()=>{
 'use strict';
 const fight=document.getElementById('fight'),arena=document.getElementById('arena');
 function cleanup(){if(!arena)return;arena.querySelectorAll('.neo-intro,.voltage-pulse,.razor-slashfx,.razor-spinfx,.titan-wave,.champion-crown').forEach(n=>n.remove());const e=document.getElementById('eF');e?.classList.remove('voltage-dash','razor-combo','razor-leap','titan-smash','titan-charge','champion-strike','champion-rush','champion-mode')}
 if(fight)new MutationObserver(()=>{if(!fight.classList.contains('active'))cleanup()}).observe(fight,{attributes:true,attributeFilter:['class']});
 ['quit','pauseMenu','continue','menu','start','trainingStart','pauseRestart'].forEach(id=>document.getElementById(id)?.addEventListener('click',()=>setTimeout(cleanup,0),true));
 window.addEventListener('pagehide',cleanup);
 window.__FightArenaStabilityV0951={ok:true,cleanup};
})();

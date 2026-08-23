/* Multiverse Arena v0.9.7.6 — Boss Presentation core transform */
(function(root,factory){
 const transform=factory();
 if(typeof module==='object'&&module.exports)module.exports=transform;
 root.FightArenaTransformV0976=transform;
})(typeof window!=='undefined'?window:globalThis,function(){
'use strict';
return function transformV0976(code){
 const rep=(from,to,label)=>{if(!code.includes(from))throw new Error('v0.9.7.6 transform marker missing: '+label);code=code.replace(from,to)};

 rep("function callout(text){const d=fx('callout',50,0);d.style.left='50%';d.textContent=text;later(()=>d.remove(),850)}", "function callout(text){const d=fx('callout',50,0);d.style.left='50%';d.textContent=text;later(()=>d.remove(),850)}\nfunction updateBossPhaseV0976(label,step,total=3){const host=$('arena');if(!host)return;let d=$('bossPhaseIndicatorV0976');if(!d){d=document.createElement('div');d.id='bossPhaseIndicatorV0976';d.className='boss-phase-indicator-v0976';host.appendChild(d)}d.innerHTML=`<small>BOSS PHASE</small><b>${label}</b><span>${step}/${total}</span>`}", 'boss phase indicator helper');
 rep("function ockPhaseShift(phase){if(!F||F.level?.name!=='Doctor Octopus'||F.ockPhase>=phase)return;F.ockPhase=phase;", "function ockPhaseShift(phase){if(!F||F.level?.name!=='Doctor Octopus'||F.ockPhase>=phase)return;F.ockPhase=phase;updateBossPhaseV0976(phase===3?'FINAL PROTOCOL':'AI ARMS',phase,3);", 'Doctor Octopus phase indicator');
 rep("function magnetoPhaseShift(phase){if(!F||F.level?.name!=='Magneto'||F.magnetoPhase>=phase)return;F.magnetoPhase=phase;", "function magnetoPhaseShift(phase){if(!F||F.level?.name!=='Magneto'||F.magnetoPhase>=phase)return;F.magnetoPhase=phase;updateBossPhaseV0976(phase===3?'MASTER OF MAGNETISM':'MAGNETIC ASCENSION',phase,3);", 'Magneto phase indicator');
 rep("if(l.boss){const intro=document.createElement('div');intro.className='boss-intro';intro.innerHTML=`<div><small>LEVEL ${l.n} • BOSS ENCOUNTER</small><strong>${l.name.toUpperCase()}</strong><span>DEFEAT THE BOSS • 💎 ${l.gems}</span></div>`;$('arena').appendChild(intro);later(()=>intro.remove(),1400)}", "if(l.boss){$('bossPhaseIndicatorV0976')?.remove();const intro=document.createElement('div');intro.className='boss-intro boss-intro-v0976';intro.innerHTML=`<div><small>◆ BOSS ENCOUNTER • LEVEL ${l.n}</small><strong>${l.name.toUpperCase()}</strong><span>BOSS REWARD • 🪙 ${l.coins} • ⭐ ${l.xp} XP • 💎 ${l.gems}</span></div>`;$('arena').appendChild(intro);if(l.name==='Doctor Octopus'||l.name==='Magneto')updateBossPhaseV0976('PHASE 1',1,3);later(()=>intro.remove(),1650)}", 'premium boss intro and phase start');
 rep("${win&&level.boss?' <div class=\"boss-clear-reward\">🏆 BOSS CLEARED • REWARDS CLAIMED</div>':''}", "${win&&level.boss?`<div class=\"boss-clear-reward boss-chest-v0976\"><small>◆ BOSS CHEST</small><b>VICTORY CACHE UNLOCKED</b><span>🪙 ${coins} &nbsp; ⭐ ${xp} XP &nbsp; 💎 ${gems}</span></div>`:''}", 'boss chest result presentation');

 return code;
};
});

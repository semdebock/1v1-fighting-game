/* Multiverse Arena v0.9.6.3 — Combat Header + Log Cleanup */
(()=>{
'use strict';
const BUILD='0.9.6.3',ASSET='0963';
const $=(s,r=document)=>r.querySelector(s);
function style(){if($('#update0963Style'))return;const l=document.createElement('link');l.id='update0963Style';l.rel='stylesheet';l.href=`update-v0963.css?v=${ASSET}`;document.head.appendChild(l)}
function brand(){
 document.title='Multiverse Arena v0.9.6.3 — Combat Header + Log Cleanup';
 document.querySelectorAll('.brand .tag').forEach(x=>x.textContent='v0.9.6.3');
 const updates=$('#updates');if(updates)updates.textContent='UPDATE LOG  •  v0.9.6.3';
 const latest=$('.latest-stat');if(latest){const b=$('b',latest),s=$('span',latest);if(b)b.textContent='v0.9.6.3';if(s)s.textContent='Combat Header • Clean Logs • Fullscreen Fight'}
 const health=$('.build-health b');if(health)health.textContent='v0.9.6.3 • COMBAT HEADER POLISH • STABLE';
 const chooser=$('#deviceChooser .eyebrow');if(chooser)chooser.textContent='MULTIVERSE ARENA • v0.9.6.3';
 if(window.MultiverseArenaRuntime){window.MultiverseArenaRuntime.version=BUILD;window.MultiverseArenaRuntime.asset=ASSET}
}
function relocateFightControls(){
 const fight=$('#fight'),head=$('#fight .fighthead'),quit=$('#quit'),pause=$('#pauseBtn');
 if(!fight||!head||!quit||!pause)return;
 let row=$('.fight-control-row-v0963',fight);
 if(!row){row=document.createElement('div');row.className='fight-control-row-v0963';row.setAttribute('aria-label','Fight controls');fight.insertBefore(row,head)}
 if(quit.parentElement!==row)row.appendChild(quit);
 if(pause.parentElement!==row)row.appendChild(pause);
 if(!row.querySelector('.fight-control-label-v0963')){const label=document.createElement('span');label.className='fight-control-label-v0963';label.textContent='LIVE COMBAT';row.appendChild(label)}
}
function cleanUpdateLog(){
 const box=$('#updatesScreen .changelog');if(!box||box.dataset.cleaned0963==='1')return;
 box.dataset.cleaned0963='1';
 const releases=[
  ['🧭','v0.9.6.3 — Combat Header Cleanup','QUIT and PAUSE now live in their own top control row above the combat HUD, so they can never cover fighter names or health bars on iPad.'],
  ['🧹','v0.9.6.3 — Update Log Cleanup','Old duplicate battle/update entries were archived. The in-game log now keeps only the recent release history that is still useful.'],
  ['💥','v0.9.6.2 — Fullscreen Fight + True Primo Super','The full iPad fight fits in one viewport and El Primo physically leaps to the opponent before crashing down with Primo Smash.'],
  ['🎯','v0.9.6.1 — Fight UI Polish','First combat-UI polish pass: boss HUD cleanup, larger fighter showcase and the first Primo Smash presentation work.'],
  ['✨','v0.9.6 — Premium Presentation','Premium obsidian-and-gold interface, cleaner menus, responsive iPad presentation and the stability-focused UI rebuild.'],
  ['🐙','v0.9.5.7 — Master Plan','Doctor Octopus completed Phase 2 with the tactical tentacle boss encounter, visible campaign rewards and the current Villain Gauntlet milestone.']
 ];
 box.innerHTML=releases.map(([icon,title,text])=>`<div class="log-item recent-release-v0963"><div class="log-icon">${icon}</div><div><b>${title}</b><p>${text}</p></div></div>`).join('');
 const tag=$('#updatesScreen .panel>.tag');if(tag)tag.textContent='v0.9.6.3 • RECENT RELEASES';
 const title=$('#updatesScreen .panel>h2');if(title)title.textContent='CLEAN HISTORY. CLEANER COMBAT.';
}
function refresh(){style();brand();relocateFightControls();cleanUpdateLog()}
function init(){refresh();window.MultiverseArenaUpdate0963={version:BUILD,refresh,relocateFightControls,cleanUpdateLog}}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
addEventListener('fightarena-ready',()=>setTimeout(refresh,100),{once:true});
})();

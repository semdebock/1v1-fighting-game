/* Multiverse Arena v0.9.6.4 — iPad Control Fit + Preview Alignment + Release Audit */
(()=>{
'use strict';
const BUILD='0.9.6.4',ASSET='0964';
const $=(s,r=document)=>r.querySelector(s);
const ownsRelease=()=>{const v=window.MultiverseArenaRuntime?.version;return !v||v===BUILD};
let wired=false,fitTimer=0;
function style(){if($('#update0964Style'))return;const l=document.createElement('link');l.id='update0964Style';l.rel='stylesheet';l.href=`update-v0964.css?v=${ASSET}`;document.head.appendChild(l)}
function brand(){
 if(!ownsRelease())return;
 document.title='Multiverse Arena v0.9.6.4 — iPad Control Fit + UI Audit';
 document.querySelectorAll('.brand .tag').forEach(x=>x.textContent='v0.9.6.4');
 const updates=$('#updates');if(updates)updates.textContent='UPDATE LOG  •  v0.9.6.4';
 const latest=$('.latest-stat');if(latest){const b=$('b',latest),s=$('span',latest);if(b)b.textContent='v0.9.6.4';if(s)s.textContent='iPad Control Fit • Centered Preview • UI Audit'}
 const health=$('.build-health b');if(health)health.textContent='v0.9.6.4 • IPAD FIT + UI AUDIT • STABLE';
 const chooser=$('#deviceChooser .eyebrow');if(chooser)chooser.textContent='MULTIVERSE ARENA • v0.9.6.4';
 if(window.MultiverseArenaRuntime){window.MultiverseArenaRuntime.version=BUILD;window.MultiverseArenaRuntime.asset=ASSET}
}
function composeFightTopbar(){
 const fight=$('#fight'),head=$('#fight .fighthead'),quit=$('#quit'),pause=$('#pauseBtn'),timer=$('#timer'),tag=$('#fightTag');
 if(!fight||!head||!quit||!pause||!timer||!tag)return;
 let row=$('.fight-control-row-v0963',fight)||$('.fight-control-row-v0964',fight);
 if(!row){row=document.createElement('div');fight.insertBefore(row,head)}
 row.classList.add('fight-control-row-v0963','fight-control-row-v0964');row.dataset.combatBar='0964';row.setAttribute('aria-label','Fight controls and status');
 row.querySelector('.fight-control-label-v0963')?.remove();
 let left=$('.fight-controls-left-v0964',row);if(!left){left=document.createElement('div');left.className='fight-controls-left-v0964';row.prepend(left)}
 let label=$('.fight-control-label-v0964',row);if(!label){label=document.createElement('span');label.className='fight-control-label-v0964';label.textContent='LIVE COMBAT';row.appendChild(label)}
 let status=$('.fight-status-v0964',row);if(!status){status=document.createElement('div');status.className='fight-status-v0964';row.appendChild(status)}
 if(quit.parentElement!==left)left.appendChild(quit);if(pause.parentElement!==left)left.appendChild(pause);
 if(timer.parentElement!==status)status.appendChild(timer);if(tag.parentElement!==status)status.appendChild(tag);
 head.classList.add('fighthead-emptied-v0964');
}
function fitFightViewport(){
 clearTimeout(fitTimer);fitTimer=0;
 const root=document.documentElement,top=$('.top');if(!root||!top)return;
 const viewportHeight=Math.round(window.visualViewport?.height||window.innerHeight||0);
 if(!viewportHeight)return;
 const topBottom=Math.max(0,Math.round(top.getBoundingClientRect().bottom));
 const available=Math.max(520,viewportHeight-topBottom-4);
 root.style.setProperty('--fight-viewport-v0964',available+'px');
}
function queueFit(delay=0){clearTimeout(fitTimer);fitTimer=setTimeout(fitFightViewport,delay)}
function wireFit(){
 if(wired)return;wired=true;
 addEventListener('resize',()=>queueFit(20),{passive:true});
 addEventListener('orientationchange',()=>queueFit(140),{passive:true});
 window.visualViewport?.addEventListener('resize',()=>queueFit(20),{passive:true});
 ['start','trainingStart','pauseRestart','rematch','continue','devicePill','deviceModeBtn'].forEach(id=>document.getElementById(id)?.addEventListener('click',()=>queueFit(40),{passive:true}));
 document.querySelectorAll('[data-device-mode]').forEach(b=>b.addEventListener('click',()=>queueFit(80),{passive:true}));
}
function cleanUpdateLog(){
 if(!ownsRelease())return;
 const box=$('#updatesScreen .changelog');if(!box)return;
 const releases=[
  ['📐','v0.9.6.4 — Controls Above The Fold','Safari visual-viewport sizing now reserves space for every combat button first. The arena shrinks when needed, so hero abilities no longer fall below the iPad screen.'],
  ['🎯','v0.9.6.4 — Perfect Fighter Showcase','The home preview now centers the actual fighter inside the showcase and scales it up again, fixing the old left-offset caused by the preview container.'],
  ['🧪','v0.9.6.4 — UI Audit + Version Sync','Duplicate LIVE COMBAT labels were removed and older presentation layers can no longer overwrite LATEST UPDATE or inject old changelog cards after a newer release loads.'],
  ['🧭','v0.9.6.3 — Combat Header Cleanup','QUIT and PAUSE moved above the health bars and the long historical update archive was cleaned up.'],
  ['💥','v0.9.6.2 — Fullscreen Fight + True Primo Super','El Primo physically leaps to the opponent before landing Primo Smash, while the iPad fight layout became viewport-based.'],
  ['✨','v0.9.6 — Premium Presentation','The premium obsidian-and-gold UI, responsive presentation system and stability-focused polish remain the foundation of the current build.']
 ];
 box.dataset.cleaned0964='1';delete box.dataset.cleaned0963;
 box.innerHTML=releases.map(([icon,title,text])=>`<div class="log-item recent-release-v0964"><div class="log-icon">${icon}</div><div><b>${title}</b><p>${text}</p></div></div>`).join('');
 const releaseTag=$('#updatesScreen .panel>.tag');if(releaseTag)releaseTag.textContent='v0.9.6.4 • RECENT RELEASES';
 const title=$('#updatesScreen .panel>h2');if(title)title.textContent='EVERYTHING WHERE IT BELONGS.';
}
function refresh(){style();brand();composeFightTopbar();cleanUpdateLog();wireFit();queueFit(0)}
function init(){refresh();window.MultiverseArenaUpdate0964={version:BUILD,refresh,fitFightViewport,composeFightTopbar,cleanUpdateLog}}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
addEventListener('fightarena-ready',()=>setTimeout(refresh,150),{once:true});
})();

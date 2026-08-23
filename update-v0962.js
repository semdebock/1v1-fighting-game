/* Multiverse Arena v0.9.6.2 — Fullscreen Fight + Primo Super */
(()=>{
'use strict';
const BUILD='0.9.6.2',ASSET='0962';
const $=(s,r=document)=>r.querySelector(s);
function style(){if($('#update0962Style'))return;const l=document.createElement('link');l.id='update0962Style';l.rel='stylesheet';l.href=`update-v0962.css?v=${ASSET}`;document.head.appendChild(l)}
function brand(){
 document.title='Multiverse Arena v0.9.6.2 — Fullscreen Fight + Primo Super';
 document.querySelectorAll('.brand .tag').forEach(x=>x.textContent='v0.9.6.2');
 const updates=$('#updates');if(updates)updates.textContent='UPDATE LOG  •  v0.9.6.2';
 const latest=$('.latest-stat');if(latest){const b=$('b',latest),s=$('span',latest);if(b)b.textContent='v0.9.6.2';if(s)s.textContent='Fullscreen Fight • True Primo Super • Bigger Preview'}
 const health=$('.build-health b');if(health)health.textContent='v0.9.6.2 • FULLSCREEN FIGHT POLISH • STABLE';
 const chooser=$('#deviceChooser .eyebrow');if(chooser)chooser.textContent='MULTIVERSE ARENA • v0.9.6.2';
 if(window.MultiverseArenaRuntime){window.MultiverseArenaRuntime.version=BUILD;window.MultiverseArenaRuntime.asset=ASSET}
}
function addLogItem(box,cls,icon,title,text){if(box.querySelector('.'+cls))return;const d=document.createElement('div');d.className='log-item '+cls;d.innerHTML=`<div class="log-icon">${icon}</div><div><b>${title}</b><p>${text}</p></div>`;box.prepend(d)}
function updateLog(){
 const box=$('#updatesScreen .changelog');if(!box)return;
 addLogItem(box,'update-0962-preview','👤','Much Larger Fighter Preview','The selected fighter on the home screen is significantly larger, especially on iPad, so the character finally fills the showcase card properly.');
 addLogItem(box,'update-0962-fit','📱','Full Fight Fits On One Screen','The iPad combat layout now compresses the header, HUD, special meter and controls so the entire fight stays inside one viewport without scrolling down for buttons.');
 addLogItem(box,'update-0962-primo','💥','True Primo Smash Super','El Primo now actually launches toward the opponent, arcs through the air and crashes down on them with an impact burst. The super also moves Primo to the opponent instead of playing a stationary effect.');
 if(!box.querySelector('.history-0961')){const d=document.createElement('div');d.className='log-item history-0961';d.innerHTML='<div class="log-icon">↻</div><div><b>v0.9.6.1 — Fight UI Polish</b><p>The first fight-polish pass introduced the initial Primo animation, boss HUD cleanup and a larger home preview. v0.9.6.2 rebuilds those ideas more aggressively based on iPad testing.</p></div>';box.appendChild(d)}
 const tag=$('#updatesScreen .panel>.tag');if(tag)tag.textContent='v0.9.6.2 • FULLSCREEN FIGHT + PRIMO SUPER';
 const title=$('#updatesScreen .panel>h2');if(title)title.textContent='EVERYTHING IN FRAME. EVERY HIT COUNTS.';
}
function refresh(){style();brand();updateLog()}
function init(){refresh();window.MultiverseArenaUpdate0962={version:BUILD,refresh}}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
addEventListener('fightarena-ready',()=>setTimeout(refresh,100),{once:true});
})();

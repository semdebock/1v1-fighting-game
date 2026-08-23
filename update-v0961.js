/* Multiverse Arena v0.9.6.1 — Fight UI Polish */
(()=>{
'use strict';
const BUILD='0.9.6.1',ASSET='0961';
const $=(s,r=document)=>r.querySelector(s);
let bound=false;
function style(){if($('#update0961Style'))return;const l=document.createElement('link');l.id='update0961Style';l.rel='stylesheet';l.href=`update-v0961.css?v=${ASSET}`;document.head.appendChild(l)}
function brand(){
 document.title='Multiverse Arena v0.9.6.1 — Fight UI Polish';
 document.querySelectorAll('.brand .tag').forEach(x=>x.textContent='v0.9.6.1');
 const updates=$('#updates');if(updates)updates.textContent='UPDATE LOG  •  v0.9.6.1';
 const latest=$('.latest-stat');if(latest){const b=$('b',latest),s=$('span',latest);if(b)b.textContent='v0.9.6.1';if(s)s.textContent='Fight UI Polish • Primo Smash • HUD Cleanup'}
 const health=$('.build-health b');if(health)health.textContent='v0.9.6.1 • FIGHT UI POLISH • STABLE';
 const chooser=$('#deviceChooser .eyebrow');if(chooser)chooser.textContent='MULTIVERSE ARENA • v0.9.6.1';
 if(window.MultiverseArenaRuntime){window.MultiverseArenaRuntime.version=BUILD;window.MultiverseArenaRuntime.asset=ASSET}
}
function updateLog(){
 const box=$('#updatesScreen .changelog');if(!box||box.querySelector('.update-0961'))return;
 const items=[
  ['💥','El Primo Smash Animation','Primo Smash now has a dedicated wind-up, double-arm slam, golden impact ring and arena flash while keeping the existing special damage and balance unchanged.'],
  ['🎯','Cleaner Boss Phase HUD','On iPad/tablet the boss phase display is now a compact badge at the upper-right instead of a wide panel hanging underneath PAUSE and covering the center of the fight.'],
  ['👤','Larger Main Menu Fighter','The selected fighter showcase on the home screen is larger and more readable, with extra scale on iPad while keeping phone layouts safe.']
 ];
 for(const [icon,title,text] of items.reverse()){const d=document.createElement('div');d.className='log-item update-0961';d.innerHTML=`<div class="log-icon">${icon}</div><div><b>${title}</b><p>${text}</p></div>`;box.prepend(d)}
 const tag=$('#updatesScreen .panel>.tag');if(tag)tag.textContent='v0.9.6.1 • FIGHT UI POLISH';
 const title=$('#updatesScreen .panel>h2');if(title)title.textContent='HITS HARDER. READS CLEANER.';
}
function animatePrimoSmash(){
 const fighter=$('#pF'),arena=$('#arena'),special=$('#special'),fight=$('#fight'),pause=$('#pauseOverlay');
 if(!fighter||!arena||!special||!fight?.classList.contains('active')||special.disabled||!fighter.classList.contains('primo'))return;
 if(pause&&!pause.classList.contains('hidden'))return;
 fighter.classList.remove('v0961-primo-smash');void fighter.offsetWidth;fighter.classList.add('v0961-primo-smash');
 arena.classList.remove('primo-impact-v0961');void arena.offsetWidth;arena.classList.add('primo-impact-v0961');
 const fr=fighter.getBoundingClientRect(),ar=arena.getBoundingClientRect(),fx=document.createElement('div');
 fx.className='primo-smash-v0961';fx.style.left=`${fr.left-ar.left+fr.width*.52}px`;fx.style.top=`${fr.bottom-ar.top-14}px`;arena.appendChild(fx);
 setTimeout(()=>{fighter.classList.remove('v0961-primo-smash');arena.classList.remove('primo-impact-v0961');fx.remove()},680)
}
function bind(){if(bound)return;const special=$('#special');if(!special)return;bound=true;special.addEventListener('pointerdown',animatePrimoSmash,{capture:true,passive:true})}
function refresh(){style();brand();updateLog();bind()}
function init(){refresh();window.MultiverseArenaUpdate0961={version:BUILD,refresh,animatePrimoSmash}}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
addEventListener('fightarena-ready',()=>setTimeout(refresh,100),{once:true});
})();

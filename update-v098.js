/* Multiverse Arena v0.9.8-dev.1 — Main Menu & Header UX Rework */
(()=>{
'use strict';
const VERSION='0.9.8-dev.1';
const LABEL='GAMEPLAY & UX UPDATE';
const $=(s,r=document)=>r.querySelector(s);
function injectStyle(){if($('#v098Css'))return;const l=document.createElement('link');l.id='v098Css';l.rel='stylesheet';l.href=`update-v098.css?v=${encodeURIComponent(window.MultiverseArenaRuntime?.asset||Date.now())}`;document.head.appendChild(l)}
function brand(){
  document.title=`Multiverse Arena ${VERSION} — ${LABEL}`;
  document.querySelectorAll('.brand .tag').forEach(x=>{if(x.textContent!==VERSION)x.textContent=VERSION});
  const update=$('#updates');if(update&&update.textContent!==`UPDATE LOG  •  ${VERSION}`)update.textContent=`UPDATE LOG  •  ${VERSION}`;
  const latest=$('.latest-stat');if(latest){const b=$('b',latest),s=$('span',latest);if(b&&b.textContent!==VERSION)b.textContent=VERSION;if(s&&s.textContent!=='Gameplay & UX • Main Menu Rework • iPad Polish')s.textContent='Gameplay & UX • Main Menu Rework • iPad Polish'}
  const health=$('.build-health b');if(health&&health.textContent!==`${VERSION} • DEV • UX PASS`)health.textContent=`${VERSION} • DEV • UX PASS`;
  const chooser=$('#deviceChooser .eyebrow');if(chooser&&chooser.textContent!==`MULTIVERSE ARENA • ${VERSION}`)chooser.textContent=`MULTIVERSE ARENA • ${VERSION}`;
  const dock=$('#ownerBoardDock small');if(dock&&dock.textContent!==VERSION)dock.textContent=VERSION;
  const ownerSetting=$('#ownerBoardLaunch')?.closest?.('.setting-row')?.querySelector('b');if(ownerSetting&&ownerSetting.textContent!==`👑 OWNER BOARD • ${VERSION}`)ownerSetting.textContent=`👑 OWNER BOARD • ${VERSION}`;
}
function refreshHome(){
  const copy=$('#home .hero-copy');
  if(copy){const tag=$('.tag',copy),h=$('h1',copy),p=$('p',copy);if(tag&&tag.textContent!=='v0.9.8 • GAMEPLAY & UX')tag.textContent='v0.9.8 • GAMEPLAY & UX';if(h&&h.innerHTML!=='FIGHT.<br>COLLECT.<br>CONQUER.')h.innerHTML='FIGHT.<br>COLLECT.<br>CONQUER.';if(p&&p.textContent!=='Choose your fighter, jump into the Villain Gauntlet and manage your roster with a faster, cleaner iPad-first interface.')p.textContent='Choose your fighter, jump into the Villain Gauntlet and manage your roster with a faster, cleaner iPad-first interface.'}
  const dashTitle=$('#home .hero-dashboard .dash-title strong');if(dashTitle&&dashTitle.textContent!=='READY FOR BATTLE')dashTitle.textContent='READY FOR BATTLE';
}
function updateLog(){
  const box=$('#updatesScreen .changelog');if(!box||box.dataset.v098Log==='1')return;
  const rows=[
    ['✨','Main Menu Rework','A tighter hero layout, faster access to the main actions and cleaner spacing make the home screen easier to scan on iPad and mobile.'],
    ['📱','iPad-First Header','The sticky header is more compact, touch-friendly and keeps level, coins and diamonds readable without dominating the screen.'],
    ['🎮','Gameplay & UX Foundation','v0.9.8 starts the full gameplay and usability pass that will continue through Collection, combat HUD, touch controls and game feel.'],
    ['👑','Owner Dock Safety','Owner access stays available for development but the floating dock is smaller, safe-area aware and no longer covers important UI.'],
    ['🧭','Consistent Build Identity','All visible update labels now use one dev version so screenshots and bug reports clearly identify the build being tested.']
  ];
  box.innerHTML=rows.map(([i,t,p])=>`<div class="log-item"><div class="log-icon">${i}</div><div><b>${t}</b><p>${p}</p></div></div>`).join('');box.dataset.v098Log='1';
  const tag=$('#updatesScreen .panel>.tag');if(tag)tag.textContent=`${VERSION} • ${LABEL}`;
  const title=$('#updatesScreen .panel>h2');if(title)title.textContent='THE UX PASS HAS BEGUN.';
}
function audit(){injectStyle();brand();refreshHome();updateLog();}
function init(){audit();window.MultiverseArenaUpdate098={version:VERSION,audit};}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
addEventListener('fightarena-ready',()=>setTimeout(audit,650));
addEventListener('pageshow',()=>setTimeout(audit,80));
const mo=new MutationObserver(mutations=>{const added=mutations.some(m=>[...m.addedNodes].some(n=>n.nodeType===1&&(n.id==='ownerBoardDock'||n.querySelector?.('#ownerBoardDock'))));if(added)brand()});
if(document.body)mo.observe(document.body,{childList:true,subtree:true});
})();

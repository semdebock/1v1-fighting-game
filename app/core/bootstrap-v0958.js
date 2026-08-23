/* Multiverse Arena v0.9.5.8 — Clean Core Bootstrap */
(()=>{
'use strict';
const BUILD='0.9.5.8';
const ASSET='0958';
const SAVE_KEY='fightArenaV08';
const CORE='app/core/core-runtime-v0958.js';
const RUNTIME=['device-v092.js','touch-v0941.js','stability-v0941.js','campaign-v0957.js','ui-v09571.js','polish-v09572.js'];
const state={version:BUILD,asset:ASSET,saveKey:SAVE_KEY,coreArtifact:CORE,status:'booting',loaded:[],failed:[],runtime:RUNTIME.slice()};
window.MultiverseArenaRuntime=state;
const src=path=>`${path}?v=${ASSET}`;
function script(path){return new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=src(path);s.async=false;s.dataset.coreBoot=BUILD;s.onload=()=>{state.loaded.push(path);resolve(path)};s.onerror=()=>{state.failed.push(path);reject(new Error('Failed to load '+path))};document.body.appendChild(s)})}
function waitFor(test,timeout,label){return new Promise((resolve,reject)=>{const started=Date.now();const check=()=>{let value=false;try{value=test()}catch{}if(value)return resolve(value);if(Date.now()-started>=timeout)return reject(new Error(label+' readiness timeout'));setTimeout(check,30)};check()})}
function brand(){document.title='Multiverse Arena v0.9.5.8 — Core Cleanup';document.querySelectorAll('.brand .tag').forEach(x=>x.textContent='v0.9.5.8');const updates=document.getElementById('updates');if(updates)updates.textContent='📋 UPDATE LOG • v0.9.5.8';const latest=document.querySelector('.latest-stat');if(latest){const b=latest.querySelector('b'),s=latest.querySelector('span');if(b)b.textContent='v0.9.5.8';if(s)s.textContent='Core Cleanup • Canonical Core • Stability'}const health=document.querySelector('.build-health b');if(health)health.textContent='CLEAN CORE • v0.9.5.8';const chooser=document.querySelector('#deviceChooser .eyebrow');if(chooser)chooser.textContent='MULTIVERSE ARENA v0.9.5.8';const pause=document.querySelector('#pauseOverlay .eyebrow');if(pause)pause.textContent='MULTIVERSE ARENA'}
function updateLog(){const box=document.querySelector('#updatesScreen .changelog');if(!box||box.querySelector('.core-cleanup-0958'))return;const items=[['🧹','Core Cleanup','The live page now boots through one controlled runtime entry point instead of a long chain of production script tags.'],['📦','Canonical Combat Core','The historical transform chain is now compiled during release into one generated combat-core artifact. Players no longer download or execute eleven transform scripts plus a runtime eval loader.'],['⚡','Lean Production Runtime','Development QA scripts stay in CI instead of loading for every player, while device, touch, stability, Villain Gauntlet and presentation systems keep their proven behavior.'],['🛡️','Compatibility Protected','The fightArenaV08 save, v0.9.5.7.2.2 freeze fix, Doctor Octopus, rewards, Punisher unlock and mobile controls are covered by release guards.']];for(const [icon,title,text] of items.reverse()){const d=document.createElement('div');d.className='log-item core-cleanup-0958';d.innerHTML=`<div class="log-icon">${icon}</div><div><b>${title}</b><p>${text}</p></div>`;box.prepend(d)}const tag=document.querySelector('#updatesScreen .panel>.tag');if(tag)tag.textContent='v0.9.5.8 • CORE CLEANUP';const title=document.querySelector('#updatesScreen .panel>h2');if(title)title.textContent='CLEANER CORE. SAME FIGHT.'}
function fatal(err){state.status='error';console.error('[Multiverse Arena v0.9.5.8 bootstrap]',err);const h=document.querySelector('.build-health b');if(h)h.textContent='v0.9.5.8 • CORE LOAD ERROR';const t=document.getElementById('toast');if(t){t.textContent='CORE LOAD ERROR — REFRESH';t.classList.remove('hidden')}}
function validateReady(){const missing=[];if(window.FightArena?.version!=='0.9.5.7')missing.push('FightArena core');if(!window.FightArenaControls)missing.push('controls');if(!window.FightArenaCampaignV0957)missing.push('Villain Gauntlet');if(!window.MultiverseArenaUI)missing.push('UI');if(!window.MultiverseArenaPolish)missing.push('polish');if(missing.length){state.status='warning';state.missing=missing;console.warn('[Multiverse Arena v0.9.5.8] runtime warning',missing)}else state.status='ready';setTimeout(()=>{brand();updateLog()},220)}
window.addEventListener('fightarena-ready',validateReady,{once:true});
async function boot(){try{
 brand();
 await script(CORE);
 if(window.FightArena?.version!=='0.9.5.7')throw new Error('canonical core version mismatch');
 await script('device-v092.js');
 await script('touch-v0941.js');
 await script('stability-v0941.js');
 await script('campaign-v0957.js');
 await waitFor(()=>window.FightArenaCampaignV0957,7000,'Villain Gauntlet');
 await script('ui-v09571.js');
 await waitFor(()=>window.MultiverseArenaUI,2500,'premium UI');
 await script('polish-v09572.js');
 await waitFor(()=>window.MultiverseArenaPolish,2500,'combat polish');
 window.dispatchEvent(new Event('fightarena-ready'));
 setTimeout(()=>{if(state.status==='booting')validateReady()},300);
}catch(err){fatal(err)}}
boot();
})();

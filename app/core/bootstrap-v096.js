/* Multiverse Arena v0.9.7 — Mutant Uprising Bootstrap */
(()=>{
'use strict';
const BUILD='0.9.7';
const ASSET='097';
const SAVE_KEY='fightArenaV08';
const CORE='app/core/core-runtime-v0958.js';
const RUNTIME=['device-v092.js','touch-v0941.js','stability-v0941.js','campaign-v097.js','ui-v09571.js','polish-v09572.js','premium-v096.js','update-v0962.js','update-v0963.js','update-v0964.js','update-v097.js'];
const state={version:BUILD,asset:ASSET,saveKey:SAVE_KEY,coreArtifact:CORE,status:'booting',loaded:[],failed:[],runtime:RUNTIME.slice()};
window.MultiverseArenaRuntime=state;
const src=path=>`${path}?v=${ASSET}`;
function script(path){return new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=src(path);s.async=false;s.dataset.coreBoot=BUILD;s.onload=()=>{state.loaded.push(path);resolve(path)};s.onerror=()=>{state.failed.push(path);reject(new Error('Failed to load '+path))};document.body.appendChild(s)})}
function waitFor(test,timeout,label){return new Promise((resolve,reject)=>{const started=Date.now();const check=()=>{let value=false;try{value=test()}catch{}if(value)return resolve(value);if(Date.now()-started>=timeout)return reject(new Error(label+' readiness timeout'));setTimeout(check,30)};check()})}
function brand(){document.title='Multiverse Arena v0.9.7 — Mutant Uprising';document.querySelectorAll('.brand .tag').forEach(x=>x.textContent='v0.9.7');const updates=document.getElementById('updates');if(updates)updates.textContent='UPDATE LOG  •  v0.9.7';const latest=document.querySelector('.latest-stat');if(latest){const b=latest.querySelector('b'),s=latest.querySelector('span');if(b)b.textContent='v0.9.7';if(s)s.textContent='Phase 3 • Mutant Uprising • 5 New Villains'}const health=document.querySelector('.build-health b');if(health)health.textContent='v0.9.7 • MUTANT UPRISING • STABLE';const chooser=document.querySelector('#deviceChooser .eyebrow');if(chooser)chooser.textContent='MULTIVERSE ARENA • v0.9.7';const pause=document.querySelector('#pauseOverlay .eyebrow');if(pause)pause.textContent='MULTIVERSE ARENA'}
function fatal(err){state.status='error';console.error('[Multiverse Arena v0.9.7 bootstrap]',err);const h=document.querySelector('.build-health b');if(h)h.textContent='v0.9.7 • CORE LOAD ERROR';const t=document.getElementById('toast');if(t){t.textContent='CORE LOAD ERROR — REFRESH';t.classList.remove('hidden')}}
function validateReady(){const missing=[];if(window.FightArena?.version!=='0.9.5.7')missing.push('FightArena core');if(!window.FightArenaControls)missing.push('controls');if(!window.FightArenaCampaignV097)missing.push('Mutant Uprising campaign');if(!window.MultiverseArenaUI)missing.push('UI');if(!window.MultiverseArenaPolish)missing.push('combat polish');if(!window.MultiverseArenaPremium)missing.push('premium presentation');if(!window.MultiverseArenaUpdate0962)missing.push('v0.9.6.2 update');if(!window.MultiverseArenaUpdate0963)missing.push('v0.9.6.3 update');if(!window.MultiverseArenaUpdate0964)missing.push('v0.9.6.4 update');if(!window.MultiverseArenaUpdate097)missing.push('v0.9.7 update');if(missing.length){state.status='warning';state.missing=missing;console.warn('[Multiverse Arena v0.9.7] runtime warning',missing)}else state.status='ready';setTimeout(brand,260)}
window.addEventListener('fightarena-ready',validateReady,{once:true});
async function boot(){try{
 brand();
 await script(CORE);
 if(window.FightArena?.version!=='0.9.5.7')throw new Error('canonical core version mismatch');
 await script('device-v092.js');
 await script('touch-v0941.js');
 await script('stability-v0941.js');
 await script('campaign-v097.js');
 await waitFor(()=>window.FightArenaCampaignV097,7000,'Mutant Uprising campaign');
 await script('ui-v09571.js');
 await waitFor(()=>window.MultiverseArenaUI,2500,'UI');
 await script('polish-v09572.js');
 await waitFor(()=>window.MultiverseArenaPolish,2500,'combat polish');
 await script('premium-v096.js');
 await waitFor(()=>window.MultiverseArenaPremium,2500,'premium presentation');
 await script('update-v0962.js');
 await waitFor(()=>window.MultiverseArenaUpdate0962,2500,'v0.9.6.2 update');
 await script('update-v0963.js');
 await waitFor(()=>window.MultiverseArenaUpdate0963,2500,'v0.9.6.3 update');
 await script('update-v0964.js');
 await waitFor(()=>window.MultiverseArenaUpdate0964,2500,'v0.9.6.4 update');
 await script('update-v097.js');
 await waitFor(()=>window.MultiverseArenaUpdate097,3000,'v0.9.7 update');
 window.dispatchEvent(new Event('fightarena-ready'));
 setTimeout(()=>{if(state.status==='booting')validateReady()},360);
}catch(err){fatal(err)}}
boot();
})();

/* Multiverse Arena v0.9.6 — Premium Presentation Bootstrap */
(()=>{
'use strict';
const BUILD='0.9.6';
const ASSET='096f2';
const SAVE_KEY='fightArenaV08';
const CORE='app/core/core-runtime-v0958.js';
const RUNTIME=['device-v092.js','touch-v0941.js','stability-v0941.js','campaign-v0957.js','ui-v09571.js','polish-v09572.js','premium-v096.js'];
const state={version:BUILD,asset:ASSET,saveKey:SAVE_KEY,coreArtifact:CORE,status:'booting',loaded:[],failed:[],runtime:RUNTIME.slice()};
window.MultiverseArenaRuntime=state;
const src=path=>`${path}?v=${ASSET}`;
function script(path){return new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=src(path);s.async=false;s.dataset.coreBoot=BUILD;s.onload=()=>{state.loaded.push(path);resolve(path)};s.onerror=()=>{state.failed.push(path);reject(new Error('Failed to load '+path))};document.body.appendChild(s)})}
function waitFor(test,timeout,label){return new Promise((resolve,reject)=>{const started=Date.now();const check=()=>{let value=false;try{value=test()}catch{}if(value)return resolve(value);if(Date.now()-started>=timeout)return reject(new Error(label+' readiness timeout'));setTimeout(check,30)};check()})}
function brand(){document.title='Multiverse Arena v0.9.6 — Premium Presentation';document.querySelectorAll('.brand .tag').forEach(x=>x.textContent='v0.9.6');const updates=document.getElementById('updates');if(updates)updates.textContent='UPDATE LOG  •  v0.9.6';const latest=document.querySelector('.latest-stat');if(latest){const b=latest.querySelector('b'),s=latest.querySelector('span');if(b)b.textContent='v0.9.6';if(s)s.textContent='Premium Presentation • Full Interface Refit'}const health=document.querySelector('.build-health b');if(health)health.textContent='PREMIUM PRESENTATION • v0.9.6';const chooser=document.querySelector('#deviceChooser .eyebrow');if(chooser)chooser.textContent='MULTIVERSE ARENA • v0.9.6';const pause=document.querySelector('#pauseOverlay .eyebrow');if(pause)pause.textContent='MULTIVERSE ARENA'}
function fatal(err){state.status='error';console.error('[Multiverse Arena v0.9.6 bootstrap]',err);const h=document.querySelector('.build-health b');if(h)h.textContent='v0.9.6 • CORE LOAD ERROR';const t=document.getElementById('toast');if(t){t.textContent='CORE LOAD ERROR — REFRESH';t.classList.remove('hidden')}}
function validateReady(){const missing=[];if(window.FightArena?.version!=='0.9.5.7')missing.push('FightArena core');if(!window.FightArenaControls)missing.push('controls');if(!window.FightArenaCampaignV0957)missing.push('Villain Gauntlet');if(!window.MultiverseArenaUI)missing.push('UI');if(!window.MultiverseArenaPolish)missing.push('combat polish');if(!window.MultiverseArenaPremium)missing.push('premium presentation');if(missing.length){state.status='warning';state.missing=missing;console.warn('[Multiverse Arena v0.9.6] runtime warning',missing)}else state.status='ready';setTimeout(brand,120)}
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
 await waitFor(()=>window.MultiverseArenaUI,2500,'UI');
 await script('polish-v09572.js');
 await waitFor(()=>window.MultiverseArenaPolish,2500,'combat polish');
 await script('premium-v096.js');
 await waitFor(()=>window.MultiverseArenaPremium,2500,'premium presentation');
 window.dispatchEvent(new Event('fightarena-ready'));
 setTimeout(()=>{if(state.status==='booting')validateReady()},300);
}catch(err){fatal(err)}}
boot();
})();

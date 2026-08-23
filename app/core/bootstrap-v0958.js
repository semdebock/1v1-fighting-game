/* Multiverse Arena v0.9.5.8 — Clean Core Bootstrap */
(()=>{
'use strict';
const BUILD='0.9.5.8';
const ASSET='0958';
const SAVE_KEY='fightArenaV08';
const TRANSFORMS=[
 'build/v094/transform-v094.js',
 'build/v0941/transform-v0941.js',
 'build/v095/transform-v095.js',
 'build/v0951/transform-v0951.js',
 'build/v0952/transform-v0952.js',
 'build/v0953/transform-v0953.js',
 'build/v09531/transform-v09531.js',
 'build/v0954/transform-v0954.js',
 'build/v0955/transform-v0955.js',
 'build/v0956/transform-v0956.js',
 'build/v0957/transform-v0957.js'
];
const RUNTIME=[
 'core-v0957.js',
 'device-v092.js',
 'touch-v0941.js',
 'stability-v0941.js',
 'campaign-v0957.js',
 'ui-v09571.js',
 'polish-v09572.js'
];
const state={version:BUILD,asset:ASSET,saveKey:SAVE_KEY,status:'booting',loaded:[],failed:[],legacyTransforms:TRANSFORMS.slice(),runtime:RUNTIME.slice()};
window.MultiverseArenaRuntime=state;
function src(path){return `${path}?v=${ASSET}`}
function script(path,ordered=false){return new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=src(path);s.async=!ordered;s.dataset.coreBoot=BUILD;s.onload=()=>{state.loaded.push(path);resolve(path)};s.onerror=()=>{state.failed.push(path);reject(new Error('Failed to load '+path))};document.body.appendChild(s)})}
async function loadTransforms(){for(const path of TRANSFORMS)await script(path,false)}
function queueRuntime(){for(const path of RUNTIME){const s=document.createElement('script');s.src=src(path);s.async=false;s.dataset.coreBoot=BUILD;s.onload=()=>state.loaded.push(path);s.onerror=()=>{state.failed.push(path);fatal(new Error('Failed to load '+path))};document.body.appendChild(s)}}
function brand(){document.title='Multiverse Arena v0.9.5.8 — Core Cleanup';document.querySelectorAll('.brand .tag').forEach(x=>x.textContent='v0.9.5.8');const updates=document.getElementById('updates');if(updates)updates.textContent='📋 UPDATE LOG • v0.9.5.8';const latest=document.querySelector('.latest-stat');if(latest){const b=latest.querySelector('b'),s=latest.querySelector('span');if(b)b.textContent='v0.9.5.8';if(s)s.textContent='Core Cleanup • Clean Bootstrap • Stability'}const health=document.querySelector('.build-health b');if(health)health.textContent='CLEAN CORE • v0.9.5.8';const chooser=document.querySelector('#deviceChooser .eyebrow');if(chooser)chooser.textContent='MULTIVERSE ARENA v0.9.5.8';const pause=document.querySelector('#pauseOverlay .eyebrow');if(pause)pause.textContent='MULTIVERSE ARENA'}
function updateLog(){const box=document.querySelector('#updatesScreen .changelog');if(!box||box.querySelector('.core-cleanup-0958'))return;const items=[['🧹','Core Cleanup','The live page now boots through one controlled runtime entry point instead of a long chain of production script tags.'],['🧩','Compatibility Layer','Older transforms stay isolated behind the bootstrap so working combat and save behavior remain unchanged while the architecture is cleaned safely.'],['⚡','Lean Production Runtime','Development QA scripts are no longer loaded for every player. They stay in CI where they can validate releases without adding live runtime work.'],['🛡️','Stability First','The v0.9.5.7.2.2 fight-freeze fix, touch controls, saves, Doctor Octopus and Villain Gauntlet are preserved as protected compatibility systems.']];for(const [icon,title,text] of items.reverse()){const d=document.createElement('div');d.className='log-item core-cleanup-0958';d.innerHTML=`<div class="log-icon">${icon}</div><div><b>${title}</b><p>${text}</p></div>`;box.prepend(d)}const tag=document.querySelector('#updatesScreen .panel>.tag');if(tag)tag.textContent='v0.9.5.8 • CORE CLEANUP';const title=document.querySelector('#updatesScreen .panel>h2');if(title)title.textContent='CLEANER CORE. SAME FIGHT.'}
function fatal(err){state.status='error';console.error('[Multiverse Arena v0.9.5.8 bootstrap]',err);const h=document.querySelector('.build-health b');if(h)h.textContent='v0.9.5.8 • CORE LOAD ERROR';const t=document.getElementById('toast');if(t){t.textContent='CORE LOAD ERROR — REFRESH';t.classList.remove('hidden')}}
function validateReady(){const missing=[];if(window.FightArena?.version!=='0.9.5.7')missing.push('FightArena core');if(!window.FightArenaControls)missing.push('controls');if(!window.FightArenaCampaignV0957)missing.push('Villain Gauntlet');if(!window.MultiverseArenaUI)missing.push('UI');if(!window.MultiverseArenaPolish)missing.push('polish');if(missing.length){state.status='warning';state.missing=missing;console.warn('[Multiverse Arena v0.9.5.8] runtime warning',missing)}else state.status='ready';setTimeout(()=>{brand();updateLog()},220)}
window.addEventListener('fightarena-ready',validateReady,{once:true});
brand();
loadTransforms().then(()=>{queueRuntime();setTimeout(()=>{if(state.status==='booting')fatal(new Error('fightarena-ready timeout'))},9000)}).catch(fatal);
})();

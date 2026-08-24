/* Multiverse Arena — visible build identity */
(()=>{
'use strict';
const root=window.MultiverseArenaModules=window.MultiverseArenaModules||{};
const isDev=location.pathname.includes('/dev/');
const info={branch:isDev?'dev':'main',version:window.MultiverseArenaRuntime?.moduleFoundation||window.MultiverseArenaRuntime?.version||'unknown',commit:'unknown',deployedAt:null};
async function load(){try{const res=await fetch(`build-meta.json?t=${Date.now()}`,{cache:'no-store'});if(res.ok)Object.assign(info,await res.json())}catch{}paint();return info}
function paint(){let badge=document.getElementById('maBuildBadge');if(!badge){badge=document.createElement('div');badge.id='maBuildBadge';badge.style.cssText='position:fixed;right:8px;bottom:8px;z-index:99999;padding:6px 9px;border-radius:8px;background:rgba(0,0,0,.72);color:#fff;font:600 11px/1.2 system-ui;pointer-events:none;opacity:.82';document.body.appendChild(badge)}badge.textContent=`${String(info.branch).toUpperCase()} • ${info.version} • ${String(info.commit||'').slice(0,7)}`;badge.hidden=!isDev}
root.buildInfo={info,load,paint};if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',load,{once:true});else load();
})();
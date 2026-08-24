/* Multiverse Arena dev debug panel v0.9.7.7.6-dev */
(()=>{
'use strict';
const root=window.MultiverseArenaModules=window.MultiverseArenaModules||{};
let panel=null,visible=false,timer=null;
const $=s=>document.querySelector(s);
function state(){const rt=window.MultiverseArenaRuntime||{};const gs=root.state?.data||{};const p=$('#pF'),e=$('#eF');return {build:rt.version,foundation:rt.moduleFoundation,status:rt.status,screen:$('.screen.active')?.id||gs.screen||null,player:{name:$('#pname')?.textContent||gs.player?.character||null,hp:$('#php')?.style?.width||null,x:p?.style?.left||null},enemy:{name:$('#ename')?.textContent||gs.enemy?.character||null,hp:$('#ehp')?.style?.width||null,x:e?.style?.left||null},modules:Object.keys(root),loaded:rt.loaded||[],failed:rt.failed||[],errors:root.errorLogger?.list?.().slice(-8)||[]}}
function ensure(){if(panel)return panel;panel=document.createElement('aside');panel.id='maDebugPanel';panel.style.cssText='position:fixed;right:10px;bottom:10px;z-index:99999;width:min(430px,92vw);max-height:70vh;overflow:auto;background:#070b16;color:#fff;border:1px solid #334155;border-radius:14px;padding:12px;font:12px/1.4 ui-monospace,SFMono-Regular,Menlo,monospace;box-shadow:0 18px 50px rgba(0,0,0,.45);display:none';document.body.appendChild(panel);return panel}
function render(){if(!visible)return;const s=state();ensure().innerHTML=`<div style="display:flex;justify-content:space-between;gap:8px;align-items:center"><b>DEV DEBUG • ${s.foundation||s.build||'unknown'}</b><button id="maDebugClose" style="font:inherit">CLOSE</button></div><hr><div><b>STATUS</b> ${s.status||'n/a'} • <b>SCREEN</b> ${s.screen||'n/a'}</div><div><b>PLAYER</b> ${s.player.name||'—'} • HP ${s.player.hp||'—'} • X ${s.player.x||'—'}</div><div><b>ENEMY</b> ${s.enemy.name||'—'} • HP ${s.enemy.hp||'—'} • X ${s.enemy.x||'—'}</div><div><b>MODULES</b> ${s.modules.join(', ')}</div><div><b>FAILED LOADS</b> ${s.failed.length?s.failed.join(', '):'none'}</div><hr><b>RECENT ERRORS</b><pre style="white-space:pre-wrap;margin:6px 0 0">${s.errors.length?s.errors.map(x=>`[${x.level}] ${x.message}`).join('\n'):'none'}</pre>`;$('#maDebugClose').onclick=hide}
function show(){visible=true;ensure().style.display='block';render();if(!timer)timer=setInterval(render,500)}
function hide(){visible=false;if(panel)panel.style.display='none';if(timer){clearInterval(timer);timer=null}}
function toggle(){visible?hide():show()}
function snapshot(){return state()}
function copy(){const text=JSON.stringify(state(),null,2);return navigator.clipboard?.writeText(text).then(()=>true).catch(()=>false)}
root.debug={show,hide,toggle,snapshot,copy,isVisible:()=>visible};
})();
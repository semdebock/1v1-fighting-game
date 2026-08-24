/* Multiverse Arena modular core — UI service v0.9.7.7.3 */
(()=>{
'use strict';
const root=window.MultiverseArenaModules=window.MultiverseArenaModules||{};
function showScreen(id){const target=document.getElementById(id);if(!target)return false;document.querySelectorAll('.screen').forEach(el=>el.classList.toggle('active',el===target));root.state?.set?.('screen',id);return true}
function setText(selector,value){const el=document.querySelector(selector);if(!el)return false;el.textContent=value;return true}
function emit(name,detail={}){window.dispatchEvent(new CustomEvent('ma:'+name,{detail}))}
root.ui={showScreen,setText,emit};
})();
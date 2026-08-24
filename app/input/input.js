/* Multiverse Arena modular core — normalized input state v0.9.7.7.3 */
(()=>{
'use strict';
const root=window.MultiverseArenaModules=window.MultiverseArenaModules||{};
const input={left:false,right:false,up:false,down:false,attack:false,block:false,ability1:false,ability2:false,special:false};
function set(action,value){if(!(action in input))return false;input[action]=!!value;return true}
function reset(){for(const key of Object.keys(input))input[key]=false}
root.input={state:input,set,reset,snapshot:()=>({...input})};
})();
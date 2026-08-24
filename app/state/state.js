/* Multiverse Arena modular core — state facade v0.9.7.7.3 */
(()=>{
'use strict';
const root=window.MultiverseArenaModules=window.MultiverseArenaModules||{};
const listeners=new Set();
const state={
  build:'0.9.7.7.3',
  screen:'boot',
  match:{active:false,paused:false,timer:0},
  player:{character:null},
  enemy:{character:null},
  ownerMode:false
};
function emit(change){for(const fn of listeners){try{fn(state,change)}catch(err){console.error('[MA state listener]',err)}}}
function set(path,value){const parts=String(path).split('.');let target=state;for(let i=0;i<parts.length-1;i++){target=target[parts[i]]??=( {} )}target[parts.at(-1)]=value;emit({path,value});return value}
function get(path){return String(path).split('.').reduce((v,key)=>v?.[key],state)}
function subscribe(fn){listeners.add(fn);return()=>listeners.delete(fn)}
root.state={data:state,get,set,subscribe,snapshot:()=>structuredClone?structuredClone(state):JSON.parse(JSON.stringify(state))};
})();
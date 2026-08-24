/* Multiverse Arena modular core — combat service facade v0.9.7.7.3 */
(()=>{
'use strict';
const root=window.MultiverseArenaModules=window.MultiverseArenaModules||{};
const adapters={};
function register(name,fn){if(typeof fn!=='function')throw new TypeError(name+' combat adapter must be a function');adapters[name]=fn;return fn}
function call(name,...args){if(adapters[name])return adapters[name](...args);const core=window.FightArena;if(core&&typeof core[name]==='function')return core[name](...args);console.warn('[MA combat] unavailable action:',name);return undefined}
root.combat={
  register,
  attack:(...a)=>call('attack',...a),
  damage:(...a)=>call('damage',...a),
  block:(...a)=>call('block',...a),
  special:(...a)=>call('special',...a),
  clearEffects:(...a)=>call('clearEffects',...a),
  call
};
})();
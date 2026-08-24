/* Multiverse Arena modular core — combat service v0.9.7.7.5-dev */
(()=>{
'use strict';
const root=window.MultiverseArenaModules=window.MultiverseArenaModules||{};
const adapters={};
function register(name,fn){if(typeof fn!=='function')throw new TypeError(name+' combat adapter must be a function');adapters[name]=fn;root.combatAPI?.register?.(name,fn);return fn}
function call(name,...args){if(adapters[name])return adapters[name](...args);if(root.combatAPI?.invoke)return root.combatAPI.invoke(name,...args);const core=window.FightArena;if(core&&typeof core[name]==='function')return core[name](...args);console.warn('[MA combat] unavailable action:',name);return undefined}
root.combat={
  register,
  attack:(...a)=>call('attack',...a),
  damage:(target,amount,meta)=>root.combatAPI?.dealDamage?.(target,amount,meta)??call('damage',target,amount,meta),
  heal:(target,amount,meta)=>root.combatAPI?.heal?.(target,amount,meta)??call('heal',target,amount,meta),
  stun:(target,duration,meta)=>root.combatAPI?.stun?.(target,duration,meta)??call('stun',target,duration,meta),
  knockback:(target,force,meta)=>root.combatAPI?.knockback?.(target,force,meta)??call('knockback',target,force,meta),
  useAbility:(user,id,target,meta)=>root.combatAPI?.useAbility?.(user,id,target,meta)??call('useAbility',user,id,target,meta),
  endMatch:(result)=>root.combatAPI?.endMatch?.(result)??call('endMatch',result),
  block:(...a)=>call('block',...a),
  special:(...a)=>call('special',...a),
  clearEffects:(...a)=>call('clearEffects',...a),
  call
};
})();
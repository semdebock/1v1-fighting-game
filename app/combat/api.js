/* Multiverse Arena — central combat API v0.9.7.7.5-dev */
(()=>{
'use strict';
const root=window.MultiverseArenaModules=window.MultiverseArenaModules||{};
const hooks={};
function register(name,fn){if(typeof fn!=='function')throw new TypeError(name+' combat hook must be a function');hooks[name]=fn;return fn}
function legacy(name,...args){const core=window.FightArena;if(core&&typeof core[name]==='function')return core[name](...args);return undefined}
function invoke(name,...args){if(hooks[name])return hooks[name](...args);return legacy(name,...args)}
function dealDamage(target,amount,meta={}){
  const value=Math.max(0,Number(amount)||0);
  if(hooks.dealDamage)return hooks.dealDamage(target,value,meta);
  if(target&&typeof target==='object'&&Number.isFinite(Number(target.hp))){target.hp=Math.max(0,Number(target.hp)-value);return target.hp}
  return invoke('damage',target,value,meta);
}
function heal(target,amount,meta={}){
  const value=Math.max(0,Number(amount)||0);
  if(hooks.heal)return hooks.heal(target,value,meta);
  if(target&&typeof target==='object'&&Number.isFinite(Number(target.hp))){const max=Number(target.maxHp??target.maxHealth??Infinity);target.hp=Math.min(max,Number(target.hp)+value);return target.hp}
  return invoke('heal',target,value,meta);
}
function stun(target,duration,meta={}){return hooks.stun?hooks.stun(target,duration,meta):invoke('stun',target,duration,meta)}
function knockback(target,force,meta={}){return hooks.knockback?hooks.knockback(target,force,meta):invoke('knockback',target,force,meta)}
function useAbility(user,abilityId,target,meta={}){return hooks.useAbility?hooks.useAbility(user,abilityId,target,meta):invoke('useAbility',user,abilityId,target,meta)}
function endMatch(result={}){return hooks.endMatch?hooks.endMatch(result):invoke('endMatch',result)}
function reset(){return hooks.reset?hooks.reset():invoke('resetMatch')}
root.combatAPI={register,invoke,dealDamage,heal,stun,knockback,useAbility,endMatch,reset};
})();
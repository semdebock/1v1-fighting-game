/* Multiverse Arena — central character database v0.9.7.7.5-dev */
(()=>{
'use strict';
const root=window.MultiverseArenaModules=window.MultiverseArenaModules||{};
const db={};
function normalize(name,data={}){
  return {
    id:String(data.id||name),
    name:String(data.name||name),
    hp:Number(data.hp??data.health??100),
    speed:Number(data.speed??1),
    damage:Number(data.damage??data.attackDamage??10),
    abilities:Array.isArray(data.abilities)?data.abilities.slice():[],
    unlock:data.unlock??null,
    meta:{source:data.meta?.source||'legacy',...(data.meta||{})},
    legacy:{...data}
  };
}
function importLegacy(){const legacy=window.FightArena?.chars||{};for(const [name,data] of Object.entries(legacy))db[name]=normalize(name,data)}
function register(name,data){db[name]=normalize(name,data);return db[name]}
function get(name){return db[name]||null}
function all(){return {...db}}
function names(){return Object.keys(db)}
function refresh(){importLegacy();return all()}
root.characterDB={register,get,all,names,refresh,normalize,importLegacy};
})();
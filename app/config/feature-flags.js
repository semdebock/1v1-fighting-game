/* Multiverse Arena — centralized feature flags */
(()=>{
'use strict';
const root=window.MultiverseArenaModules=window.MultiverseArenaModules||{};
const defaults={
  modularCharacters:true,
  modularCombat:true,
  debugPanel:true,
  errorLogger:true,
  saveMigrations:true,
  combatInvariants:true,
  characterValidation:true,
  legacyOwnerCompatibility:true,
  experimentalAbilities:false,
  experimentalModes:false
};
const KEY='multiverseArenaFeatureFlags';
function read(){try{return {...defaults,...JSON.parse(localStorage.getItem(KEY)||'{}')}}catch{return {...defaults}}}
function write(next){const flags={...defaults,...next};localStorage.setItem(KEY,JSON.stringify(flags));return flags}
function enabled(name){return !!read()[name]}
function set(name,value){const flags=read();flags[name]=!!value;return write(flags)}
function reset(){localStorage.removeItem(KEY);return read()}
root.features={defaults:{...defaults},read,write,enabled,set,reset};
})();
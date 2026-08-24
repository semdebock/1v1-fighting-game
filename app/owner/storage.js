/* Multiverse Arena Owner storage service v0.9.7.7.4 */
(()=>{
'use strict';
const root=window.MultiverseArenaModules=window.MultiverseArenaModules||{};
const SAVE_KEY='fightArenaV08';
const SLOTS_KEY='fightArenaOwnerSlotsV09772';
const FLAGS_KEY='fightArenaOwnerFlagsV09772';
const parse=(key,fallback={})=>{try{return JSON.parse(localStorage.getItem(key)||JSON.stringify(fallback))||fallback}catch{return fallback}};
const write=(key,value)=>{localStorage.setItem(key,JSON.stringify(value));return value};
const api={
 readSave:()=>parse(SAVE_KEY,{}),
 writeSave:value=>write(SAVE_KEY,value),
 readFlags:()=>parse(FLAGS_KEY,{}),
 writeFlags:value=>{write(FLAGS_KEY,value);window.MultiverseArenaOwnerFlags={...value};window.dispatchEvent(new CustomEvent('ma:owner-flags',{detail:value}));return value},
 readSlots:()=>parse(SLOTS_KEY,{}),
 writeSlots:value=>write(SLOTS_KEY,value),
 saveKey:SAVE_KEY,flagsKey:FLAGS_KEY,slotsKey:SLOTS_KEY
};
root.ownerStorage=api;
})();
/* Multiverse Arena modular core — character registry facade v0.9.7.7.3 */
(()=>{
'use strict';
const root=window.MultiverseArenaModules=window.MultiverseArenaModules||{};
const local={};
function source(){return window.FightArena?.chars||{}}
function register(id,data){local[id]={...data,id};return local[id]}
function get(id){return local[id]||source()[id]||null}
function all(){return {...source(),...local}}
function has(id){return !!get(id)}
root.characters={register,get,all,has};
})();
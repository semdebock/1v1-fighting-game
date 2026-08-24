/* Multiverse Arena modular core — character registry v0.9.7.7.5-dev */
(()=>{
'use strict';
const root=window.MultiverseArenaModules=window.MultiverseArenaModules||{};
const local={};
function legacy(){return window.FightArena?.chars||{}}
function db(){return root.characterDB}
function register(id,data){const entry=db()?.register?.(id,data)||{...data,id};local[id]=entry;return entry}
function get(id){return local[id]||db()?.get?.(id)||legacy()[id]||null}
function all(){return {...legacy(),...(db()?.all?.()||{}),...local}}
function has(id){return !!get(id)}
function refresh(){db()?.refresh?.();return all()}
root.characters={register,get,all,has,refresh};
})();
/* Multiverse Arena modular core — save service v0.9.7.7.3 */
(()=>{
'use strict';
const root=window.MultiverseArenaModules=window.MultiverseArenaModules||{};
const DEFAULT_KEY='fightArenaV08';
function key(){return window.MultiverseArenaRuntime?.saveKey||DEFAULT_KEY}
function read(){try{const raw=localStorage.getItem(key());return raw?JSON.parse(raw):null}catch(err){console.error('[MA save] read failed',err);return null}}
function write(data){try{localStorage.setItem(key(),JSON.stringify(data));window.dispatchEvent(new CustomEvent('ma:save',{detail:{key:key()}}));return true}catch(err){console.error('[MA save] write failed',err);return false}}
function remove(){try{localStorage.removeItem(key());return true}catch{return false}}
root.save={key,read,write,remove};
})();
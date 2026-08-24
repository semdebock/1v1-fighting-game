/* Multiverse Arena modular core — save service with migration safety */
(()=>{
'use strict';
const root=window.MultiverseArenaModules=window.MultiverseArenaModules||{};
const DEFAULT_KEY='fightArenaV08';
function key(){return window.MultiverseArenaRuntime?.saveKey||DEFAULT_KEY}
function readRaw(){try{const raw=localStorage.getItem(key());return raw?JSON.parse(raw):null}catch(err){root.errorLogger?.capture?.(err,{scope:'save.read'});console.error('[MA save] read failed',err);return null}}
function read(){const raw=readRaw();if(!raw)return null;if(root.features?.enabled?.('saveMigrations')!==false&&root.saveMigrations){const result=root.saveMigrations.migrate(raw);if(result.changed){try{localStorage.setItem(key(),JSON.stringify(result.save))}catch{}}return result.save}return raw}
function write(data){try{const migrated=root.saveMigrations?root.saveMigrations.migrate(data).save:data;localStorage.setItem(key(),JSON.stringify(migrated));window.dispatchEvent(new CustomEvent('ma:save',{detail:{key:key(),saveVersion:migrated?.saveVersion||null}}));return true}catch(err){root.errorLogger?.capture?.(err,{scope:'save.write'});console.error('[MA save] write failed',err);return false}}
function backup(){const data=readRaw();return root.saveMigrations?.backup?.(data)||false}
function restoreBackup(){const data=root.saveMigrations?.restoreBackup?.();if(!data)return false;return write(data)}
function remove(){try{localStorage.removeItem(key());return true}catch{return false}}
root.save={key,read,readRaw,write,backup,restoreBackup,remove};
})();
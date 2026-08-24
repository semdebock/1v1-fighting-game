/* Multiverse Arena — versioned save migrations + backup */
(()=>{
'use strict';
const root=window.MultiverseArenaModules=window.MultiverseArenaModules||{};
const CURRENT=3;
const BACKUP_KEY='fightArenaV08_backup';
function clone(x){return x==null?x:JSON.parse(JSON.stringify(x))}
function backup(save){try{localStorage.setItem(BACKUP_KEY,JSON.stringify({savedAt:new Date().toISOString(),save:clone(save)}));return true}catch{return false}}
const migrations={
  1:s=>({...s,saveVersion:1}),
  2:s=>({...s,saveVersion:2,settings:s.settings||{}}),
  3:s=>({...s,saveVersion:3,owned:s.owned||{},campaignWins:s.campaignWins||{}})
};
function migrate(input){let save=clone(input||{});let version=Number(save.saveVersion)||0;if(version>CURRENT)return {save,changed:false,from:version,to:version};const original=clone(save);while(version<CURRENT){const next=version+1;save=migrations[next]?migrations[next](save):{...save,saveVersion:next};version=next}const changed=JSON.stringify(original)!==JSON.stringify(save);if(changed)backup(original);return {save,changed,from:Number(original?.saveVersion)||0,to:version}}
function restoreBackup(){try{const raw=JSON.parse(localStorage.getItem(BACKUP_KEY)||'null');return raw?.save||null}catch{return null}}
root.saveMigrations={currentVersion:CURRENT,backupKey:BACKUP_KEY,migrate,backup,restoreBackup};
})();
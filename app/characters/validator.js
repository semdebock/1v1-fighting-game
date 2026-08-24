/* Multiverse Arena — character schema validation */
(()=>{
'use strict';
const root=window.MultiverseArenaModules=window.MultiverseArenaModules||{};
function validateCharacter(id,data){const errors=[];if(!data||typeof data!=='object')return {ok:false,errors:['character data missing']};if(!String(data.name||id||'').trim())errors.push('name missing');for(const key of ['hp','speed','damage']){const n=Number(data[key]);if(!Number.isFinite(n)||n<=0)errors.push(`${key} must be > 0`)}if(!Array.isArray(data.abilities))errors.push('abilities must be an array');return {ok:errors.length===0,errors}}
function validateAll(){const db=root.characterDB?.all?.()||root.characters?.all?.()||{};const results={};let ok=true;for(const [id,data] of Object.entries(db)){results[id]=validateCharacter(id,data);if(!results[id].ok)ok=false}return {ok,results,count:Object.keys(results).length}}
root.characterValidator={validateCharacter,validateAll};
})();
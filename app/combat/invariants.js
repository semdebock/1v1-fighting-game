/* Multiverse Arena — combat invariants / safety guards */
(()=>{
'use strict';
const root=window.MultiverseArenaModules=window.MultiverseArenaModules||{};
const clamp=(n,min,max)=>Math.min(max,Math.max(min,Number(n)||0));
function normalizeFighter(f){if(!f||typeof f!=='object')return f;if('hp'in f)f.hp=Math.max(0,Number(f.hp)||0);if('maxHp'in f)f.maxHp=Math.max(1,Number(f.maxHp)||1);if('special'in f)f.special=clamp(f.special,0,100);if('specialCharge'in f)f.specialCharge=clamp(f.specialCharge,0,100);return f}
function canCombat(){const screen=document.querySelector('.screen.active')?.id;return !screen||screen==='fight'}
function safeDamage(amount){const n=Number(amount);return Number.isFinite(n)&&n>0?n:0}
function assertState(player,enemy){const errors=[];if(!player)errors.push('player missing');if(!enemy)errors.push('enemy missing');for(const [name,f] of [['player',player],['enemy',enemy]])if(f){if(!Number.isFinite(Number(f.hp)))errors.push(name+' hp invalid');if(Number(f.hp)<0)errors.push(name+' hp below zero')}return {ok:errors.length===0,errors}}
root.combatInvariants={clamp,normalizeFighter,canCombat,safeDamage,assertState};
})();
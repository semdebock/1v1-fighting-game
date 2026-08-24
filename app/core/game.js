/* Multiverse Arena modular core — game controller facade v0.9.7.7.3 */
(()=>{
'use strict';
const root=window.MultiverseArenaModules=window.MultiverseArenaModules||{};
const adapters={};
function register(name,fn){if(typeof fn!=='function')throw new TypeError(name+' adapter must be a function');adapters[name]=fn;return fn}
function call(name,...args){if(adapters[name])return adapters[name](...args);const core=window.FightArena;if(core&&typeof core[name]==='function')return core[name](...args);console.warn('[MA game] unavailable action:',name);return undefined}
root.game={
  register,
  start:(...a)=>call('startGame',...a),
  pause:(...a)=>call('pauseGame',...a),
  resume:(...a)=>call('resumeGame',...a),
  reset:(...a)=>call('resetMatch',...a),
  end:(...a)=>call('endMatch',...a),
  loadCharacter:(...a)=>call('loadCharacter',...a),
  spawnEnemy:(...a)=>call('spawnEnemy',...a),
  call
};
})();
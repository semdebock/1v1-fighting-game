/* Multiverse Arena modular core — ownerboard bridge v0.9.7.7.3 */
(()=>{
'use strict';
const root=window.MultiverseArenaModules=window.MultiverseArenaModules||{};
const commands={};
function register(name,fn){if(typeof fn!=='function')throw new TypeError(name+' owner command must be a function');commands[name]=fn;return fn}
function run(name,...args){if(commands[name])return commands[name](...args);const dev=window.MultiverseArenaOwnerDevTools;if(dev&&typeof dev[name]==='function')return dev[name](...args);console.warn('[MA ownerboard] unavailable command:',name);return undefined}
function available(){return Object.keys(commands)}
root.ownerboard={register,run,available};
})();
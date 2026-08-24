/* Multiverse Arena modular core — ownerboard controller v0.9.7.7.6-dev */
(()=>{
'use strict';
const root=window.MultiverseArenaModules=window.MultiverseArenaModules||{};
const commands={};
function register(name,fn){if(typeof fn!=='function')throw new TypeError(name+' owner command must be a function');commands[name]=fn;return fn}
function run(name,...args){if(commands[name])return commands[name](...args);const service=root.ownerCommands;if(service&&typeof service[name]==='function')return service[name](...args);const legacy=window.MultiverseArenaOwnerDevTools;if(legacy&&typeof legacy[name]==='function')return legacy[name](...args);root.errorLogger?.warn?.('Owner command unavailable',{name});console.warn('[MA ownerboard] unavailable command:',name);return undefined}
function available(){return [...new Set([...Object.keys(root.ownerCommands||{}),...Object.keys(commands)])].filter(k=>typeof (commands[k]||root.ownerCommands?.[k])==='function')}
function mount(){return window.MultiverseArenaOwnerDevTools?.mount?.()}
function debug(){return root.debug}
register('toggleDebug',()=>root.debug?.toggle?.());
register('copyDebugSnapshot',()=>root.debug?.copy?.());
register('clearErrors',()=>root.errorLogger?.clear?.());
root.ownerboard={register,run,available,mount,debug,storage:()=>root.ownerStorage,commands:()=>root.ownerCommands};
})();
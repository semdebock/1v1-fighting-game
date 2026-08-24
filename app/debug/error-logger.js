/* Multiverse Arena dev error logger v0.9.7.7.6-dev */
(()=>{
'use strict';
const root=window.MultiverseArenaModules=window.MultiverseArenaModules||{};
const MAX=100,entries=[];
function push(level,message,meta={}){const item={time:new Date().toISOString(),level,message:String(message??''),meta};entries.push(item);if(entries.length>MAX)entries.shift();window.dispatchEvent(new CustomEvent('ma:log',{detail:item}));return item}
function error(message,meta){return push('error',message,meta)}
function warn(message,meta){return push('warn',message,meta)}
function info(message,meta){return push('info',message,meta)}
function clear(){entries.length=0}
function list(){return entries.slice()}
window.addEventListener('error',e=>error(e.message,{source:e.filename,line:e.lineno,column:e.colno,stack:e.error?.stack||null}));
window.addEventListener('unhandledrejection',e=>error('Unhandled promise rejection',{reason:String(e.reason),stack:e.reason?.stack||null}));
root.errorLogger={push,error,warn,info,clear,list};
})();
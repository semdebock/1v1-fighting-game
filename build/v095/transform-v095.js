/* Fight Arena v0.9.5 — Campaign Phases Foundation transform */
(function(root,factory){
  const transform=factory();
  if(typeof module==='object'&&module.exports)module.exports=transform;
  root.FightArenaTransformV095=transform;
})(typeof window!=='undefined'?window:globalThis,function(){
'use strict';
return function transformV095(code){
  const rep=(from,to,label)=>{if(!code.includes(from))throw new Error('v0.9.5 transform marker missing: '+label);code=code.replace(from,to)};
  rep('/* Fight Arena v0.9.4.1 — Combat Stability & Collection UI */','/* Fight Arena v0.9.5 — Campaign Phases Foundation */','header');
  rep("window.FightArena={version:'0.9.4.1'","window.FightArena={version:'0.9.5'",'version');
  rep("s.coreVersion='0.9.4.1'","s.coreVersion='0.9.5'",'save version');
  rep('// v0.9.4.1 public control bridge','// v0.9.5 public control bridge','control bridge comment');
  return code;
};
});

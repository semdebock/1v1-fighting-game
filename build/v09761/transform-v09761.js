/* Multiverse Arena v0.9.7.6.1 — Result progression cleanup */
(function(root,factory){const transform=factory();if(typeof module==='object'&&module.exports)module.exports=transform;root.FightArenaTransformV09761=transform})(typeof window!=='undefined'?window:globalThis,function(){
'use strict';
return function transformV09761(code){
 const from="$('unlock').textContent=(unlocked?`🔓 LEVEL ${save.unlocked} UNLOCKED — ${LEVELS[save.unlocked-1].name.toUpperCase()}!`:'')+";
 const to="const campaignUnlockName=win?campaignNextName(l.name):null;$('unlock').textContent=(unlocked&&campaignUnlockName?`🔓 NEXT FIGHT UNLOCKED — ${campaignUnlockName.toUpperCase()}!`:'')+";
 if(!code.includes(from))throw new Error('v0.9.7.6.1 legacy result unlock marker missing');
 code=code.replace(from,to);
 return code;
};
});

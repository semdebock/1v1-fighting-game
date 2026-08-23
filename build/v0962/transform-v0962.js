/* Multiverse Arena v0.9.6.2 — Fullscreen Fight + Primo Super */
(function(root,factory){
 const transform=factory();
 if(typeof module==='object'&&module.exports)module.exports=transform;
 root.FightArenaTransformV0962=transform;
})(typeof window!=='undefined'?window:globalThis,function(){
'use strict';
return function transformV0962(code){
 const rep=(from,to,label)=>{if(!code.includes(from))throw new Error('v0.9.6.2 transform marker missing: '+label);code=code.replace(from,to)};
 const owner=` else if(name===OWNER){const decree=fx('absolute-decree',0,0);later(()=>damageEnemy(9999,18,true),180);later(()=>decree.remove(),760);toast('ABSOLUTE DECREE!')}`;
 const primo=` else if(name==='El Primo'){const start=F.px,target=clamp(F.ex-9,3,F.ex-7),arena=$('arena'),dx=((arena?.clientWidth||0)*(target-start))/100;F.invulnerable=true;p.style.setProperty('--primo-smash-x',dx+'px');p.classList.add('primo-super-leap');toast('PRIMO SMASH!');later(()=>{if(!F||F.over)return;const ring=fx('primo-smash-impact',F.ex-8,24);damageEnemy(c.special,12,true);arena?.classList.add('primo-super-impact');later(()=>ring.remove(),520)},430);later(()=>{if(!F)return;F.px=target;F.invulnerable=false;draw();p?.classList.remove('primo-super-leap');p?.style.removeProperty('--primo-smash-x');arena?.classList.remove('primo-super-impact')},650)}`;
 rep(owner,primo+owner,'El Primo super branch');
 rep(".absolute-decree,.dd-grapple,",".absolute-decree,.primo-smash-impact,.dd-grapple,",'Primo impact cleanup');
 rep("p?.classList.remove('hurt','specialing','kicking','punching',","p?.classList.remove('hurt','specialing','kicking','punching','primo-super-leap',",'Primo leap cleanup');
 return code;
};
});

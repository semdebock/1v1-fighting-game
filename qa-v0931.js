/* Fight Arena v0.9.3.1 — redeem patch QA */
(() => {
 function run(){
  const failures=[],data=window.FightArena,chars=data?.chars||{},skins=data?.skins||[];
  if(data?.version!=='0.9.3.1')failures.push('version');
  const expected={Rookie:'B','El Primo':'A','Daredevil':'A','Captain America':'A+','Moon Knight':'A+','Spider-Man':'S','Iron Man':'S'};
  Object.entries(expected).forEach(([h,r])=>{if(chars[h]?.arenaRank!==r)failures.push('rank:'+h)});
  const nano=skins.find(s=>s.id==='iron-nano');if(!nano||nano.price!==100||nano.variant!=='ABILITY VARIANT')failures.push('nanotech-variant');
  ['trainingLast','trainingCombo','trainingDps','charCards','skinCards','redeemBtn','redeemInput'].forEach(id=>{if(!document.getElementById(id))failures.push('dom:'+id)});
  ['setMove','punch','kick','special','jump','block','ability','pause'].forEach(k=>{if(typeof window.FightArenaControls?.[k]!=='function')failures.push('control:'+k)});
  if(!window.FightArenaDevice)failures.push('device-api');
  window.__FightArenaV0931QA={ok:failures.length===0,failures};
  const h=document.querySelector('.build-health b');if(h)h.textContent=failures.length?'v0.9.3.1 • QA WARNING':'v0.9.3.1 • REDEEM PATCH READY';
  if(failures.length)console.error('[Fight Arena v0.9.3.1 QA]',failures);
 }
 if(window.FightArena?.version==='0.9.3.1')run();else addEventListener('fightarena-ready',run,{once:true});
})();

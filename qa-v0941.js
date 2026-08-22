/* Fight Arena v0.9.4.1 — Combat Stability & Collection UI QA */
(() => {
 function run(){
  const failures=[],data=window.FightArena,chars=data?.chars||{},skins=data?.skins||[];
  if(data?.version!=='0.9.4.1')failures.push('version');
  const expected={Rookie:'B','El Primo':'A','Daredevil':'A','Captain America':'A+','Moon Knight':'A+','Black Panther':'A+','Spider-Man':'S','Wolverine':'S','Iron Man':'S'};
  Object.entries(expected).forEach(([h,r])=>{if(chars[h]?.arenaRank!==r)failures.push('rank:'+h)});
  if(chars['Black Panther']?.price!==3200)failures.push('price:black-panther');if(chars.Wolverine?.price!==4000)failures.push('price:wolverine');
  const kinetic=skins.find(s=>s.id==='bp-kinetic');if(!kinetic||kinetic.price!==80||kinetic.variant!=='ABILITY VARIANT')failures.push('kinetic-panther');
  ['charCards','skinCards','fighterKitPanel','skinTypeInfo','redeemBtn','heroActions'].forEach(id=>{if(!document.getElementById(id))failures.push('dom:'+id)});
  ['setMove','punch','kick','special','jump','block','ability','pause'].forEach(k=>{if(typeof window.FightArenaControls?.[k]!=='function')failures.push('control:'+k)});
  if(!window.FightArenaDevice)failures.push('device-api');
  if((navigator.maxTouchPoints||0)>0&&!window.__FightArenaTouchV0941?.ok)failures.push('touch-guard');
  if(!window.__FightArenaStabilityV0941?.ok)failures.push('stability-guard');
  if(!document.querySelector('.skin-hero-group'))failures.push('skin-groups');
  window.__FightArenaV0941QA={ok:failures.length===0,failures};
  const h=document.querySelector('.build-health b');if(h)h.textContent=failures.length?'v0.9.4.1 • QA WARNING':'v0.9.4.1 • STABILITY READY';
  if(failures.length)console.error('[Fight Arena v0.9.4.1 QA]',failures);
 }
 if(window.FightArena?.version==='0.9.4.1')setTimeout(run,0);else addEventListener('fightarena-ready',()=>setTimeout(run,0),{once:true});
})();

/* Fight Arena v0.9.4 — Wakanda & Weapon X QA */
(() => {
 function run(){
  const failures=[],data=window.FightArena,chars=data?.chars||{},skins=data?.skins||[];
  if(data?.version!=='0.9.4')failures.push('version');
  const expected={Rookie:'B','El Primo':'A','Daredevil':'A','Captain America':'A+','Moon Knight':'A+','Black Panther':'A+','Spider-Man':'S','Wolverine':'S','Iron Man':'S'};
  Object.entries(expected).forEach(([h,r])=>{if(chars[h]?.arenaRank!==r)failures.push('rank:'+h)});
  if(chars['Black Panther']?.price!==3200)failures.push('price:black-panther');
  if(chars.Wolverine?.price!==4000)failures.push('price:wolverine');
  const kinetic=skins.find(s=>s.id==='bp-kinetic');
  if(!kinetic||kinetic.price!==80||kinetic.variant!=='ABILITY VARIANT')failures.push('kinetic-panther');
  if(!skins.find(s=>s.id==='bp-default'))failures.push('bp-default');
  if(!skins.find(s=>s.id==='wolverine-default'))failures.push('wolverine-default');
  if(skins.filter(s=>s.hero==='Wolverine').length!==1)failures.push('wolverine-extra-skin');
  ['trainingHeroStat','trainingHeroStatLabel','charCards','skinCards','redeemBtn','redeemInput','heroActions'].forEach(id=>{if(!document.getElementById(id))failures.push('dom:'+id)});
  ['setMove','punch','kick','special','jump','block','ability','pause'].forEach(k=>{if(typeof window.FightArenaControls?.[k]!=='function')failures.push('control:'+k)});
  if(!window.FightArenaDevice)failures.push('device-api');
  if((navigator.maxTouchPoints||0)>0&&!window.__FightArenaTouchV0932?.ok)failures.push('touch-guard');
  window.__FightArenaV094QA={ok:failures.length===0,failures};
  const h=document.querySelector('.build-health b');if(h)h.textContent=failures.length?'v0.9.4 • QA WARNING':'v0.9.4 • WAKANDA / WEAPON X READY';
  if(failures.length)console.error('[Fight Arena v0.9.4 QA]',failures);
 }
 if(window.FightArena?.version==='0.9.4')run();else addEventListener('fightarena-ready',run,{once:true});
})();

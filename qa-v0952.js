/* Fight Arena v0.9.5.2 — Street War QA */
(()=>{
 function run(){
  const failures=[],data=window.FightArena,levels=data?.levels||[],by=n=>levels.find(l=>l.name===n);
  if(data?.version!=='0.9.5.2')failures.push('version');
  const expected={Crossbones:{hp:175,coins:350,xp:75},Bullseye:{hp:155,coins:450,xp:90}};
  Object.entries(expected).forEach(([n,e])=>{const l=by(n);if(!l)failures.push('level:'+n);else{if(l.hp!==e.hp)failures.push('hp:'+n);if(l.coins!==e.coins)failures.push('coins:'+n);if(l.xp!==e.xp)failures.push('xp:'+n)}});
  ['Voltage','Razor','Titan','Arena Champion','Ultron','Prowler','Kingpin','Mysterio','Green Goblin'].forEach(n=>{if(!by(n))failures.push('preserved:'+n)});
  ['start','won','phaseRewarded','has','get'].forEach(k=>{if(typeof window.FightArenaCampaignControls?.[k]!=='function')failures.push('campaign-control:'+k)});
  if(!window.FightArenaCampaignV0952?.ok)failures.push('campaign-ui');
  if(!document.querySelector('.phase-street'))failures.push('street-phase-ui');
  if(![...document.querySelectorAll('.campaign-node strong')].some(x=>x.textContent==='CROSSBONES'))failures.push('crossbones-node');
  if(![...document.querySelectorAll('.campaign-node strong')].some(x=>x.textContent==='BULLSEYE'))failures.push('bullseye-node');
  if(!window.__FightArenaTouchV0941?.ok&&(navigator.maxTouchPoints||0)>0)failures.push('touch');
  if(!window.__FightArenaStabilityV0941?.ok)failures.push('stability');
  window.__FightArenaV0952QA={ok:failures.length===0,failures};
  const h=document.querySelector('.build-health b');if(h)h.textContent=failures.length?'v0.9.5.2 • QA WARNING':'v0.9.5.2 • STREET WAR READY';
  if(failures.length)console.error('[Fight Arena v0.9.5.2 QA]',failures)
 }
 if(window.FightArena?.version==='0.9.5.2')setTimeout(run,100);else addEventListener('fightarena-ready',()=>setTimeout(run,100),{once:true});
})();

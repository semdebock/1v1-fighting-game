/* Fight Arena v0.9.5.1 — Neo City Arena Expansion QA */
(()=>{
 function run(){
  const failures=[],data=window.FightArena,levels=data?.levels||[],by=n=>levels.find(l=>l.name===n);
  if(data?.version!=='0.9.5.1')failures.push('version');
  const expected={Voltage:{hp:110,coins:200},Razor:{hp:120,coins:250},Titan:{hp:160,coins:300},'Arena Champion':{hp:210,coins:500}};
  Object.entries(expected).forEach(([n,e])=>{const l=by(n);if(!l)failures.push('level:'+n);else{if(l.hp!==e.hp)failures.push('hp:'+n);if(l.coins!==e.coins)failures.push('reward:'+n)}});
  if(!by('Arena Champion')?.boss||by('Arena Champion')?.gems!==5)failures.push('champion-boss');
  ['Ultron','Prowler','Kingpin','Mysterio','Green Goblin'].forEach(n=>{if(!by(n))failures.push('preserved:'+n)});
  ['start','won','phaseRewarded','has','get'].forEach(k=>{if(typeof window.FightArenaCampaignControls?.[k]!=='function')failures.push('campaign-control:'+k)});
  if(!window.FightArenaCampaignV0951?.ok)failures.push('campaign-ui');
  if(!window.__FightArenaTouchV0941?.ok&&(navigator.maxTouchPoints||0)>0)failures.push('touch');
  if(!window.__FightArenaStabilityV0941?.ok)failures.push('stability');
  if(!document.querySelector('.phase-prologue'))failures.push('prologue-ui');
  if(!document.querySelector('.campaign-node strong'))failures.push('campaign-nodes');
  window.__FightArenaV0951QA={ok:failures.length===0,failures};
  const h=document.querySelector('.build-health b');if(h)h.textContent=failures.length?'v0.9.5.1 • QA WARNING':'v0.9.5.1 • NEO ARENA READY';
  if(failures.length)console.error('[Fight Arena v0.9.5.1 QA]',failures)
 }
 if(window.FightArena?.version==='0.9.5.1')setTimeout(run,80);else addEventListener('fightarena-ready',()=>setTimeout(run,80),{once:true});
})();

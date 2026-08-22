/* Fight Arena v0.9.5.3.1 — Result Flow & Unlock Polish QA */
(()=>{
 'use strict';
 let attempts=0;
 function run(){
  const failures=[],data=window.FightArena,levels=data?.levels||[],by=n=>levels.find(l=>l.name===n);
  if(data?.version!=='0.9.5.3.1')failures.push('version');
  ['Punisher','Taskmaster','Crossbones','Bullseye','Kingpin','Ultron','Prowler'].forEach(n=>{if(!by(n))failures.push('preserved:'+n)});
  ['start','won','rematch','next','last','lastResult'].forEach(k=>{if(typeof window.FightArenaCampaignControls?.[k]!=='function')failures.push('campaign-control:'+k)});
  if(!document.getElementById('rematch'))failures.push('rematch-button');
  if(!document.getElementById('continue'))failures.push('next-button');
  if(!document.getElementById('results'))failures.push('results-screen');
  if(!window.__FightArenaTouchV0941?.ok&&(navigator.maxTouchPoints||0)>0)failures.push('touch');
  if(!window.__FightArenaStabilityV0941?.ok)failures.push('stability');
  if(!window.FightArenaCampaignV09531?.ok&&attempts<12){attempts++;setTimeout(run,120);return}
  if(!window.FightArenaCampaignV09531?.ok)failures.push('campaign-ui');
  window.__FightArenaV09531QA={ok:failures.length===0,failures};
  const h=document.querySelector('.build-health b');if(h)h.textContent=failures.length?'v0.9.5.3.1 • QA WARNING':'v0.9.5.3.1 • RESULT FLOW READY';
  if(failures.length)console.error('[Fight Arena v0.9.5.3.1 QA]',failures)
 }
 if(window.FightArena?.version==='0.9.5.3.1')setTimeout(run,180);else addEventListener('fightarena-ready',()=>setTimeout(run,180),{once:true});
})();

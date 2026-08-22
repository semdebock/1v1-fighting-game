/* Fight Arena v0.9.5.3.1 — campaign compatibility wrapper */
(async()=>{
 'use strict';
 try{
  const r=await fetch('campaign-v0953.js?v=09531',{cache:'no-store'});if(!r.ok)throw new Error(`campaign-v0953.js HTTP ${r.status}`);
  let code=await r.text();
  code=code.replaceAll('v0.9.5.3','v0.9.5.3.1');
  code=code.replaceAll('FightArenaCampaignV0953','FightArenaCampaignV09531');
  code=code.replace('Punisher • Taskmaster • Rematch • Intro Pause','Results Flow • Punisher Unlock • Next Fight');
  (0,eval)(code);
 }catch(err){
  console.error('[Fight Arena v0.9.5.3.1 campaign]',err);
  const h=document.querySelector('.build-health b');if(h)h.textContent='v0.9.5.3.1 • CAMPAIGN LOAD ERROR';
 }
})();

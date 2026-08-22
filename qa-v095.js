/* Fight Arena v0.9.5 — Campaign Phases Foundation QA */
(()=>{
'use strict';
function run(){
 const failures=[],data=window.FightArena,campaign=window.FightArenaCampaignV095,levels=data?.levels||[];
 if(data?.version!=='0.9.5')failures.push('version');
 if(!campaign?.ok)failures.push('campaign-api');
 if(campaign?.phases?.length!==3)failures.push('phase-count');
 const fights=campaign?.phases?.flatMap(p=>p.sections.flatMap(s=>s.fights))||[];
 if(fights.length!==15)failures.push('fight-slots');
 const expected=['Nightfang','Voltage','Razor','Titan','Arena Champion','Crossbones','Bullseye','Punisher','Taskmaster','Kingpin','Rhino','Electro','Mysterio','Green Goblin','Doctor Octopus'];
 expected.forEach(n=>{if(!fights.some(f=>f.name===n))failures.push('slot:'+n)});
 const punisher=fights.find(f=>f.name==='Punisher');if(!punisher?.reward?.includes('PLAYABLE'))failures.push('punisher-reward');
 const doc=fights.find(f=>f.name==='Doctor Octopus');if(!doc?.boss)failures.push('doc-ock-boss');
 ['Ultron','Prowler'].forEach(n=>{if(!levels.some(l=>l.name===n))failures.push('standby-source:'+n);if(!campaign?.standby?.includes(n))failures.push('standby-manifest:'+n)});
 if(document.querySelector('.campaign-node strong')?.textContent==='ULTRON'||[...document.querySelectorAll('.campaign-node strong')].some(x=>x.textContent==='PROWLER'))failures.push('standby-visible');
 if(!document.querySelector('.campaign-phase'))failures.push('phase-ui');
 if(!document.querySelector('.phase-section'))failures.push('section-ui');
 if(!window.__FightArenaStabilityV0941?.ok)failures.push('stability-guard');
 if((navigator.maxTouchPoints||0)>0&&!window.__FightArenaTouchV0941?.ok)failures.push('touch-guard');
 window.__FightArenaV095QA={ok:failures.length===0,failures};
 const h=document.querySelector('.build-health b');if(h)h.textContent=failures.length?'v0.9.5 • QA WARNING':'v0.9.5 • PHASE FOUNDATION READY';
 if(failures.length)console.error('[Fight Arena v0.9.5 QA]',failures);
}
function wait(){if(window.FightArena?.version==='0.9.5'&&window.FightArenaCampaignV095?.ok)setTimeout(run,40);else setTimeout(wait,80)}
wait();
})();

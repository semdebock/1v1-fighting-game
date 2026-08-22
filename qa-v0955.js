/* Fight Arena v0.9.5.5 — Smoke & Chaos QA */
(()=>{
'use strict';let attempts=0;
function run(){const failures=[],data=window.FightArena,levels=data?.levels||[],by=n=>levels.find(l=>l.name===n);
 if(data?.version!=='0.9.5.5')failures.push('version');
 const expected={Mysterio:{hp:205,coins:900,xp:180},'Green Goblin':{hp:220,coins:1000,xp:195},Rhino:{hp:235},Electro:{hp:190}};
 Object.entries(expected).forEach(([n,e])=>{const l=by(n);if(!l)failures.push('level:'+n);else Object.entries(e).forEach(([k,v])=>{if(l[k]!==v)failures.push(k+':'+n)})});
 ['Punisher','Taskmaster','Crossbones','Bullseye','Kingpin','Ultron','Prowler','Arena Champion'].forEach(n=>{if(!by(n))failures.push('preserved:'+n)});
 ['start','won','rematch','next','last','lastResult'].forEach(k=>{if(typeof window.FightArenaCampaignControls?.[k]!=='function')failures.push('campaign-control:'+k)});
 if(!document.getElementById('trainingSpecial'))failures.push('training-fill-button');
 if(!document.getElementById('trainingReset'))failures.push('training-reset-button');
 if(!document.getElementById('rematch'))failures.push('rematch-button');
 if(!window.__FightArenaTouchV0941?.ok&&(navigator.maxTouchPoints||0)>0)failures.push('touch');
 if(!window.__FightArenaStabilityV0941?.ok)failures.push('stability');
 if(!window.FightArenaCampaignV0955?.ok&&attempts<14){attempts++;setTimeout(run,120);return}
 if(!window.FightArenaCampaignV0955?.ok)failures.push('campaign-ui');
 const nodes=[...document.querySelectorAll('.campaign-node strong')].map(x=>x.textContent);
 if(!nodes.includes('MYSTERIO'))failures.push('mysterio-node');
 if(!nodes.includes('GREEN GOBLIN'))failures.push('goblin-node');
 window.__FightArenaV0955QA={ok:failures.length===0,failures};const h=document.querySelector('.build-health b');if(h)h.textContent=failures.length?'v0.9.5.5 • QA WARNING':'v0.9.5.5 • SMOKE & CHAOS READY';if(failures.length)console.error('[Fight Arena v0.9.5.5 QA]',failures)}
if(window.FightArena?.version==='0.9.5.5')setTimeout(run,180);else addEventListener('fightarena-ready',()=>setTimeout(run,180),{once:true});
})();

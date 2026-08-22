/* Fight Arena v0.9.5.6 — Goblin Rework & Training Lab QA */
(()=>{
'use strict';let attempts=0;
function run(){const failures=[],data=window.FightArena,levels=data?.levels||[],by=n=>levels.find(l=>l.name===n),goblin=by('Green Goblin');
 if(data?.version!=='0.9.5.6')failures.push('version');
 if(!goblin)failures.push('green-goblin');else{if(goblin.role!=='ARMORED GLIDER BOMBER')failures.push('goblin-role');if(goblin.hp!==220)failures.push('goblin-hp');if(goblin.coins!==1000)failures.push('goblin-reward')}
 ['Mysterio','Rhino','Electro','Punisher','Taskmaster','Crossbones','Bullseye','Kingpin','Ultron','Prowler','Arena Champion'].forEach(n=>{if(!by(n))failures.push('preserved:'+n)});
 ['start','won','rematch','next','last','lastResult'].forEach(k=>{if(typeof window.FightArenaCampaignControls?.[k]!=='function')failures.push('campaign-control:'+k)});
 ['fill','reset','active','snapshot'].forEach(k=>{if(typeof window.FightArenaTrainingControls?.[k]!=='function')failures.push('training-control:'+k)});
 if(!document.getElementById('trainingSpecial'))failures.push('training-fill-button');
 if(!document.getElementById('trainingReset'))failures.push('training-reset-button');
 if(!document.getElementById('rematch'))failures.push('rematch-button');
 if(!window.__FightArenaTouchV0941?.ok&&(navigator.maxTouchPoints||0)>0)failures.push('touch');
 if(!window.__FightArenaStabilityV0941?.ok)failures.push('stability');
 if(!window.FightArenaCampaignV0956?.ok&&attempts<16){attempts++;setTimeout(run,120);return}
 if(!window.FightArenaCampaignV0956?.ok)failures.push('campaign-ui');
 const nodes=[...document.querySelectorAll('.campaign-node strong')].map(x=>x.textContent);
 if(!nodes.includes('GREEN GOBLIN'))failures.push('goblin-node');
 if(!nodes.includes('MYSTERIO'))failures.push('mysterio-node');
 window.__FightArenaV0956QA={ok:failures.length===0,failures};const h=document.querySelector('.build-health b');if(h)h.textContent=failures.length?'v0.9.5.6 • QA WARNING':'v0.9.5.6 • GOBLIN + TRAINING READY';if(failures.length)console.error('[Fight Arena v0.9.5.6 QA]',failures)}
if(window.FightArena?.version==='0.9.5.6')setTimeout(run,220);else addEventListener('fightarena-ready',()=>setTimeout(run,220),{once:true});
})();

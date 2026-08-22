/* Multiverse Arena v0.9.5.7 — Master Plan QA */
(()=>{
'use strict';let attempts=0;
function run(){const failures=[],data=window.FightArena,levels=data?.levels||[],by=n=>levels.find(l=>l.name===n);
 if(data?.version!=='0.9.5.7')failures.push('version');
 const ock=by('Doctor Octopus');if(!ock)failures.push('doctor-octopus-level');else{if(!ock.boss)failures.push('doctor-octopus-boss');if(ock.hp!==310)failures.push('doctor-octopus-hp');if(ock.coins!==1400)failures.push('doctor-octopus-coins');if(ock.xp!==260)failures.push('doctor-octopus-xp');if(ock.gems!==10)failures.push('doctor-octopus-gems')}
 ['Green Goblin','Mysterio','Rhino','Electro','Punisher','Taskmaster','Crossbones','Bullseye','Kingpin','Ultron','Prowler','Arena Champion'].forEach(n=>{if(!by(n))failures.push('preserved:'+n)});
 ['start','won','rematch','next','last','lastResult'].forEach(k=>{if(typeof window.FightArenaCampaignControls?.[k]!=='function')failures.push('campaign-control:'+k)});
 if(!window.FightArenaCampaignV0957?.ok&&attempts<18){attempts++;setTimeout(run,120);return}
 if(!window.FightArenaCampaignV0957?.ok)failures.push('campaign-ui');
 const nodes=[...document.querySelectorAll('.campaign-node strong')].map(x=>x.textContent);if(!nodes.includes('DOCTOR OCTOPUS'))failures.push('doctor-octopus-node');
 const docNode=[...document.querySelectorAll('.campaign-node')].find(n=>n.querySelector('strong')?.textContent==='DOCTOR OCTOPUS');if(docNode&&!docNode.querySelector('.node-resource'))failures.push('doctor-octopus-resource');
 if(!document.querySelector('link[href*="masterplan-v0957.css"]'))failures.push('masterplan-css');
 if(!document.getElementById('trainingSpecial'))failures.push('training-fill-button');if(!document.getElementById('rematch'))failures.push('rematch-button');
 if(!window.__FightArenaStabilityV0941?.ok)failures.push('stability');
 window.__FightArenaV0957QA={ok:failures.length===0,failures};const h=document.querySelector('.build-health b');if(h)h.textContent=failures.length?'v0.9.5.7 • QA WARNING':'v0.9.5.7 • MASTER PLAN READY';if(failures.length)console.error('[Multiverse Arena v0.9.5.7 QA]',failures)}
if(window.FightArena?.version==='0.9.5.7')setTimeout(run,220);else addEventListener('fightarena-ready',()=>setTimeout(run,220),{once:true});
})();

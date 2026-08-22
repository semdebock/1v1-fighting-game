/* Multiverse Arena v0.9.5.7 — Master Plan */
(function(root,factory){
 const transform=factory();
 if(typeof module==='object'&&module.exports)module.exports=transform;
 root.FightArenaTransformV0957=transform;
})(typeof window!=='undefined'?window:globalThis,function(){
'use strict';
return function transformV0957(code){
 const rep=(from,to,label)=>{if(!code.includes(from))throw new Error('v0.9.5.7 transform marker missing: '+label);code=code.replace(from,to)};
 rep('/* Fight Arena v0.9.5.6 — Goblin Rework & Training Lab Fix */','/* Multiverse Arena v0.9.5.7 — Master Plan */','header');
 rep("window.FightArena={version:'0.9.5.6'","window.FightArena={version:'0.9.5.7'",'version');
 rep("s.coreVersion='0.9.5.6'","s.coreVersion='0.9.5.7'",'save version');

 const ockLevel=`{n:17,name:'Doctor Octopus',cls:'dococtopus',diff:'PHASE 2 BOSS',role:'TACTICAL TENTACLE MASTER',boss:true,hp:310,dmg:1.46,coins:1400,xp:260,gems:10,desc:'Otto Octavius controls the entire arena with four intelligent mechanical arms. His armor is strongest while the tentacles are active; survive the patterns and punish the short recovery windows.'}`;
 rep('];\nconst TRAINING_DUMMY=',','+ockLevel+'\n];\nconst TRAINING_DUMMY=','doctor octopus level');

 const ockHelpers=`\nconst MASTER_PLAN_INTROS={
 'Doctor Octopus':['THE ARMS THINK FASTER THAN YOU','Do not mash into the tentacles. Jump the sweep, escape the target locks and punish Otto only when his arms overextend.']
};
function masterPlanIntro(name){const data=MASTER_PLAN_INTROS[name];if(!data||!F)return;const d=document.createElement('div');d.className='masterplan-intro';d.innerHTML=\`<small>PHASE 2 • MASTER PLAN • BOSS</small><strong>\${data[0]}</strong><span>\${data[1]}</span>\`;$('arena')?.appendChild(d);later(()=>d.remove(),2500)}
function ockExpose(ms=760){if(!F||F.level?.name!=='Doctor Octopus')return;F.ockOpen=true;$('eF')?.classList.add('ock-open');later(()=>{if(F?.level?.name==='Doctor Octopus'){F.ockOpen=false;$('eF')?.classList.remove('ock-open')}},ms)}
function ockTentacleJab(){if(!F)return;callout('TENTACLE JAB');const e=$('eF');e?.classList.add('ock-jab');const line=fx('ock-jab-line',F.ex-17,43);later(()=>{line.remove();if(F&&F.ex-F.px<31)damagePlayer(F.ockPhase>=2?18:15,true,true)},210);later(()=>{e?.classList.remove('ock-jab');ockExpose(520)},430)}
function ockSweep(){if(!F)return;callout('ARM SWEEP • JUMP');const e=$('eF');e?.classList.add('ock-sweep');const wave=fx('ock-sweepfx',F.ex-34,63);later(()=>{if(F&&!F.over&&F.ex-F.px<44&&F.jump<22)damagePlayer(F.ockPhase>=2?21:18,true,true)},480);later(()=>{wave.remove();e?.classList.remove('ock-sweep');ockExpose(720)},760)}
function ockPincer(){if(!F)return;callout('PINCER LOCK • MOVE');const e=$('eF'),target=F.px;e?.classList.add('ock-pincer');const mark=fx('ock-target',target-4,29);later(()=>{if(!F||F.over)return;const slam=fx('ock-pincerfx',target-5,31);if(Math.abs(F.px-target)<10)damagePlayer(F.ockPhase>=3?27:23,true,true);later(()=>slam.remove(),420)},560);later(()=>{mark.remove();e?.classList.remove('ock-pincer');ockExpose(860)},850)}
function ockGrab(){if(!F)return;callout('TENTACLE GRAB');const e=$('eF');e?.classList.add('ock-grab');const claw=fx('ock-grabfx',F.ex-18,37);later(()=>{if(!F||F.over)return;if(F.ex-F.px<24){damagePlayer(F.ockPhase>=2?24:20,true,true);F.px=clamp(F.px-7,3,F.ex-7);draw()}},330);later(()=>{claw.remove();e?.classList.remove('ock-grab');ockExpose(900)},700)}
function ockCrossfire(){if(!F)return;callout('FOUR-ARM CROSSFIRE');const e=$('eF');e?.classList.add('ock-crossfire');const targets=[F.px,clamp(F.px+13,4,88),clamp(F.px-12,4,88)];targets.forEach((target,i)=>later(()=>{if(!F||F.over)return;const mark=fx('ock-target mini',target-3,29);later(()=>{if(!F||F.over){mark.remove();return}const slam=fx('ock-pincerfx',target-4,31);if(Math.abs(F.px-target)<8)damagePlayer(i===2?17:14,true,true);mark.remove();later(()=>slam.remove(),360)},350)},i*240));later(()=>{e?.classList.remove('ock-crossfire');ockExpose(980)},1280)}
function ockPhaseShift(phase){if(!F||F.level?.name!=='Doctor Octopus'||F.ockPhase>=phase)return;F.ockPhase=phase;const e=$('eF');e?.classList.toggle('ock-phase2',phase>=2);e?.classList.toggle('ock-phase3',phase>=3);callout(phase===2?'AI ARMS • AGGRESSIVE MODE':'SUPERIOR ARMS • FINAL PROTOCOL');toast(phase===2?'DOC OCK • TENTACLES ACCELERATING!':'BOSS FINAL PHASE • NO SAFE ZONE!');F.ai1=.35;F.ai2=.8}
function showRewardSummary(level,coins,xp,gems,win){const host=$('results');if(!host)return;let panel=$('rewardSummary');if(!panel){panel=document.createElement('div');panel.id='rewardSummary';panel.className='reward-summary';const cards=host.querySelector('.resultcards');(cards||host.querySelector('p')||host).insertAdjacentElement(cards?'afterend':'beforebegin',panel)}const first=win&&!save.campaignWins?.[level.name];panel.classList.toggle('defeat-reward',!win);panel.innerHTML=\`<small>\${win?'VICTORY REWARDS':'CONSOLATION REWARDS'}</small><strong>\${level.name.toUpperCase()}</strong><div class="reward-summary-grid"><span>🪙 <b>+\${coins}</b><em>COINS</em></span><span>⭐ <b>+\${xp}</b><em>XP</em></span>\${gems?\`<span>💎 <b>+\${gems}</b><em>GEMS</em></span>\`:''}</div>\${win&&level.boss?' <div class="boss-clear-reward">🏆 BOSS CLEARED • REWARDS CLAIMED</div>':''}\`}
`;
 rep('function mysterioClone(){',ockHelpers+'function mysterioClone(){','doctor octopus helpers');

 rep("const approach={1:9,2:8.2,3:10.2,4:8.8,5:7.2,6:11.2,7:10.5,8:12,9:6.5,10:9.5,11:8.4,12:18.5,13:12.5,14:10.8,15:5.8,16:14.8}[l.n]||9","const approach={1:9,2:8.2,3:10.2,4:8.8,5:7.2,6:11.2,7:10.5,8:12,9:6.5,10:9.5,11:8.4,12:18.5,13:12.5,14:10.8,15:5.8,16:14.8,17:4.8}[l.n]||9",'doctor octopus movement');
 const ockAI=`\n if(l.name==='Doctor Octopus'){if(!F.ockPhase)F.ockPhase=1;if(F.eh/F.em<=.52)ockPhaseShift(2);if(F.eh/F.em<=.24)ockPhaseShift(3);if(F.ai1<=0){const r=Math.random();if(gap>29)r<.45?ockTentacleJab():ockPincer();else if(gap<15)r<.5?ockGrab():ockSweep();else r<.28?ockSweep():r<.58?ockPincer():ockTentacleJab();F.ai1=(F.ockPhase>=3?1.05:F.ockPhase>=2?1.45:1.9)+Math.random()*.55}if(F.ai2<=0){F.ockPhase>=3?ockCrossfire():(Math.random()<.55?ockPincer():ockSweep());F.ai2=(F.ockPhase>=3?3.1:F.ockPhase>=2?4.1:5.1)+Math.random()*.9}}`;
 rep('\n}\n\nconst RESULT_CAMPAIGN_ORDER=',ockAI+'\n}\n\nconst RESULT_CAMPAIGN_ORDER=','doctor octopus ai');
 rep("const RESULT_CAMPAIGN_ORDER=['Nightfang','Voltage','Razor','Titan','Arena Champion','Crossbones','Bullseye','Punisher','Taskmaster','Kingpin','Rhino','Electro','Mysterio','Green Goblin'];","const RESULT_CAMPAIGN_ORDER=['Nightfang','Voltage','Razor','Titan','Arena Champion','Crossbones','Bullseye','Punisher','Taskmaster','Kingpin','Rhino','Electro','Mysterio','Green Goblin','Doctor Octopus'];",'campaign result order');
 rep("if(VIGILANTE_INTROS[l.name])vigilanteIntro(l.name);if(SINISTER_INTROS[l.name])sinisterIntro(l.name);later(()=>{if(F){F.introLocked=false;F.last=performance.now();toast('FIGHT!')}},2600)","if(VIGILANTE_INTROS[l.name])vigilanteIntro(l.name);if(SINISTER_INTROS[l.name])sinisterIntro(l.name);if(MASTER_PLAN_INTROS[l.name])masterPlanIntro(l.name);later(()=>{if(F){F.introLocked=false;F.last=performance.now();toast('FIGHT!')}},2600)",'boss intro trigger');
 rep("$('rGemsWrap').classList.toggle('hidden',gems===0);","$('rGemsWrap').classList.toggle('hidden',gems===0);showRewardSummary(l,coins,xp,gems,win);",'result reward summary');
 rep(".fighter-intro,.boss-intro,.street-intro,.vigilante-intro,.sinister-intro,",".fighter-intro,.boss-intro,.street-intro,.vigilante-intro,.sinister-intro,.masterplan-intro,.ock-jab-line,.ock-sweepfx,.ock-target,.ock-pincerfx,.ock-grabfx,",'cleanup doctor octopus fx');
 rep("'goblin-bomb-cast','goblin-razor-cast','goblin-barrage','goblin-glider-rush');","'goblin-bomb-cast','goblin-razor-cast','goblin-barrage','goblin-glider-rush','ock-jab','ock-sweep','ock-pincer','ock-grab','ock-crossfire','ock-phase2','ock-phase3','ock-open');",'cleanup doctor octopus classes');
 rep('// v0.9.5.6 public control bridge','// v0.9.5.7 public control bridge','control bridge comment');
 return code;
};
});

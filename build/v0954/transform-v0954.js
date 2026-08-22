/* Fight Arena v0.9.5.4 — Raw Power transform */
(function(root,factory){
 const transform=factory();
 if(typeof module==='object'&&module.exports)module.exports=transform;
 root.FightArenaTransformV0954=transform;
})(typeof window!=='undefined'?window:globalThis,function(){
'use strict';
return function transformV0954(code){
 const rep=(from,to,label)=>{if(!code.includes(from))throw new Error('v0.9.5.4 transform marker missing: '+label);code=code.replace(from,to)};
 rep('/* Fight Arena v0.9.5.3.1 — Result Flow & Unlock Polish */','/* Fight Arena v0.9.5.4 — Raw Power */','header');
 rep("window.FightArena={version:'0.9.5.3.1'","window.FightArena={version:'0.9.5.4'",'version');
 rep("s.coreVersion='0.9.5.3.1'","s.coreVersion='0.9.5.4'",'save version');

 const rawPowerLevels=`{n:15,name:'Rhino',cls:'rhino',diff:'PHASE 2 HEAVY',role:'ARMORED JUGGERNAUT',hp:235,dmg:1.32,coins:750,xp:150,gems:0,desc:'Aleksei Sytsevich is a walking battering ram. His reinforced Rhino armor turns momentum, horn strikes and ground-shaking force into relentless pressure.'},\n{n:16,name:'Electro',cls:'electro',diff:'PHASE 2 ELITE',role:'LIVING ELECTRICITY',hp:190,dmg:1.29,coins:800,xp:165,gems:0,desc:'Max Dillon weaponizes yellow high-voltage energy with lightning bolts, blink movement, chain attacks and a dangerous overcharged power-grid state.'}`;
 rep('];\nconst TRAINING_DUMMY=',','+rawPowerLevels+'\n];\nconst TRAINING_DUMMY=','raw power levels');

 const rawPowerHelpers=`\nconst SINISTER_INTROS={
 Rhino:['THE WALL IS MOVING','Rhino is slow until he commits. Read the horn, step out of the charge line and punish the recovery.'],
 Electro:['THE GRID IS ALIVE','Max Dillon owns the range. Keep changing position, respect the yellow lightning and strike before he fully overcharges.']
};
function sinisterIntro(name){const data=SINISTER_INTROS[name];if(!data||!F)return;const d=document.createElement('div');d.className='sinister-intro';d.innerHTML=\`<small>PHASE 2 • SINISTER THREAT</small><strong>\${data[0]}</strong><span>\${data[1]}</span>\`;$('arena')?.appendChild(d);later(()=>d.remove(),2450)}
function rhinoCharge(){if(!F)return;callout('RHINO CHARGE');const e=$('eF');e?.classList.add('rhino-charge');const tele=fx('rhino-charge-line',F.px+4,61);later(()=>{tele.remove();if(!F||F.over)return;const start=F.ex,target=clamp(F.px+8,F.px+7,91);let n=0;const id=every(()=>{if(!F||F.over){clearInterval(id);intervalSet.delete(id);return}if(F.paused)return;n++;F.ex=start+(target-start)*(n/9);draw();if(F.ex-F.px<10||n>=9){clearInterval(id);intervalSet.delete(id);if(F&&F.ex-F.px<13)damagePlayer(18,true,true);e?.classList.remove('rhino-charge')}},30)},290)}
function rhinoHorn(){if(!F)return;callout('HORN TOSS');const e=$('eF');e?.classList.add('rhino-horn');const h=fx('rhino-hornfx',F.ex-5,35);later(()=>{if(F&&F.ex-F.px<17)damagePlayer(16,true,true)},210);later(()=>{h.remove();e?.classList.remove('rhino-horn')},500)}
function rhinoQuake(){if(!F)return;callout('GROUND QUAKE');const e=$('eF');e?.classList.add('rhino-quake');const q=fx('rhino-quakefx',F.ex-8,58);later(()=>{if(F&&!F.over)enemyProjectile('rhino-groundwave',13,3.35,58)},175);later(()=>{q.remove();e?.classList.remove('rhino-quake')},620)}
function rhinoStampede(){if(!F)return;callout('STAMPEDE');const e=$('eF');e?.classList.add('rhino-stampede');const aura=fx('rhino-stampedefx',F.ex-8,31);const start=F.ex,target=clamp(F.px+8,F.px+7,91);let n=0;const id=every(()=>{if(!F||F.over){clearInterval(id);intervalSet.delete(id);aura.remove();return}if(F.paused)return;n++;F.ex=start+(target-start)*(n/8);draw();if(n>=8){clearInterval(id);intervalSet.delete(id);if(F&&F.ex-F.px<14)damagePlayer(13,true,true);later(()=>{if(F&&F.ex-F.px<20)damagePlayer(11,true,true);const q=fx('rhino-quakefx',F.ex-7,58);later(()=>q.remove(),500)},180);later(()=>{aura.remove();e?.classList.remove('rhino-stampede')},650)}},32)}
function electroArc(){if(!F)return;callout('ARC BOLT');const e=$('eF');e?.classList.add('electro-cast');enemyProjectile('electro-arc',11,4.25,43);later(()=>e?.classList.remove('electro-cast'),380)}
function electroBlink(){if(!F)return;callout('VOLT BLINK');const e=$('eF'),old=F.ex;e?.classList.add('electro-blink');const a=fx('electro-blinkfx',old-3,34);later(()=>{if(!F)return;F.ex=clamp(F.px+24+Math.random()*25,F.px+10,92);draw();const b=fx('electro-blinkfx',F.ex-3,34);later(()=>b.remove(),420)},130);later(()=>{a.remove();e?.classList.remove('electro-blink')},480)}
function electroChain(){if(!F)return;callout('CHAIN LIGHTNING');const e=$('eF');e?.classList.add('electro-chain');[0,130,260].forEach((ms,i)=>later(()=>{if(F&&!F.over)enemyProjectile('electro-chainbolt',6+(i===2?2:0),4.05+i*.18,38+i*7)},ms));later(()=>e?.classList.remove('electro-chain'),560)}
function electroGrid(){if(!F)return;callout('POWER GRID');const e=$('eF');e?.classList.add('electro-grid');const target=F.px,mark=fx('electro-target',target-3,29);later(()=>{if(!F||F.over)return;const bolt=fx('electro-gridbolt',target-2,15);if(Math.abs(F.px-target)<11)damagePlayer(F.electroOvercharge?18:15,true,true);later(()=>bolt.remove(),420)},360);later(()=>{mark.remove();e?.classList.remove('electro-grid')},820)}\n`;
 rep('function mysterioClone(){',rawPowerHelpers+'function mysterioClone(){','raw power helpers');
 rep("const approach={1:9,2:8.2,3:10.2,4:8.8,5:7.2,6:11.2,7:10.5,8:12,9:6.5,10:9.5,11:8.4,12:18.5,13:12.5,14:10.8}[l.n]||9","const approach={1:9,2:8.2,3:10.2,4:8.8,5:7.2,6:11.2,7:10.5,8:12,9:6.5,10:9.5,11:8.4,12:18.5,13:12.5,14:10.8,15:5.8,16:14.8}[l.n]||9",'raw power movement');
 const rawPowerAI=`
 if(l.name==='Rhino'){if(F.ai1<=0){gap>20?rhinoCharge():(Math.random()<.55?rhinoHorn():rhinoQuake());F.ai1=2.75+Math.random()*1.15}if(F.ai2<=0){gap>16?rhinoStampede():rhinoQuake();F.ai2=5.8+Math.random()*1.5}}
 if(l.name==='Electro'){if(!F.electroOvercharge&&F.eh/F.em<=.45){F.electroOvercharge=true;$('eF')?.classList.add('electro-overcharge');callout('OVERCHARGED');toast('ELECTRO • POWER SURGE!');F.ai1=.55;F.ai2=1.2}if(F.ai1<=0){gap<14?electroBlink():(Math.random()<.52?electroArc():electroChain());F.ai1=(F.electroOvercharge?1.45:2.15)+Math.random()*.9}if(F.ai2<=0){Math.random()<.58?electroGrid():electroBlink();F.ai2=(F.electroOvercharge?3.3:4.8)+Math.random()*1.2}}
`;
 rep('\n}\nfunction stopFightTimers(){',rawPowerAI+'\n}\nfunction stopFightTimers(){','raw power ai');
 rep("if(VIGILANTE_INTROS[l.name])vigilanteIntro(l.name);later(()=>{if(F){F.introLocked=false;F.last=performance.now();toast('FIGHT!')}},2600)","if(VIGILANTE_INTROS[l.name])vigilanteIntro(l.name);if(SINISTER_INTROS[l.name])sinisterIntro(l.name);later(()=>{if(F){F.introLocked=false;F.last=performance.now();toast('FIGHT!')}},2600)",'sinister intro trigger');
 rep("const RESULT_CAMPAIGN_ORDER=['Nightfang','Voltage','Razor','Titan','Arena Champion','Crossbones','Bullseye','Punisher','Taskmaster','Kingpin'];","const RESULT_CAMPAIGN_ORDER=['Nightfang','Voltage','Razor','Titan','Arena Champion','Crossbones','Bullseye','Punisher','Taskmaster','Kingpin','Rhino','Electro'];",'result campaign order');
 rep(".fighter-intro,.boss-intro,.street-intro,.vigilante-intro,.crossbones-bladefx,.crossbones-warfx,.bullseye-ricochet,.bullseye-perfectfx,.punisher-grenade,.punisher-blast,.punisher-warzonefx,.taskmaster-slash,.taskmaster-masterfx').forEach(n=>n.remove());",".fighter-intro,.boss-intro,.street-intro,.vigilante-intro,.sinister-intro,.crossbones-bladefx,.crossbones-warfx,.bullseye-ricochet,.bullseye-perfectfx,.punisher-grenade,.punisher-blast,.punisher-warzonefx,.taskmaster-slash,.taskmaster-masterfx,.rhino-charge-line,.rhino-hornfx,.rhino-quakefx,.rhino-stampedefx,.electro-blinkfx,.electro-target,.electro-gridbolt').forEach(n=>n.remove());",'cleanup raw power fx');
 rep("'punisher-rifle','punisher-roll','punisher-warzone','taskmaster-shield','taskmaster-sword','taskmaster-bow','taskmaster-counter','taskmaster-masterclass');","'punisher-rifle','punisher-roll','punisher-warzone','taskmaster-shield','taskmaster-sword','taskmaster-bow','taskmaster-counter','taskmaster-masterclass','rhino-charge','rhino-horn','rhino-quake','rhino-stampede','electro-cast','electro-blink','electro-chain','electro-grid','electro-overcharge');",'cleanup raw power classes');
 rep('// v0.9.5.3.1 public control bridge','// v0.9.5.4 public control bridge','control bridge comment');
 return code;
};
});

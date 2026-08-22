/* Fight Arena v0.9.5.2 — Street War transform */
(function(root,factory){
 const transform=factory();
 if(typeof module==='object'&&module.exports)module.exports=transform;
 root.FightArenaTransformV0952=transform;
})(typeof window!=='undefined'?window:globalThis,function(){
'use strict';
return function transformV0952(code){
 const rep=(from,to,label)=>{if(!code.includes(from))throw new Error('v0.9.5.2 transform marker missing: '+label);code=code.replace(from,to)};
 rep('/* Fight Arena v0.9.5.1 — Neo City Arena Expansion */','/* Fight Arena v0.9.5.2 — Street War */','header');
 rep("window.FightArena={version:'0.9.5.1'","window.FightArena={version:'0.9.5.2'",'version');
 rep("s.coreVersion='0.9.5.1'","s.coreVersion='0.9.5.2'",'save version');

 const streetLevels=`{n:11,name:'Crossbones',cls:'crossbones',diff:'PHASE 1',role:'TACTICAL BRUISER',hp:175,dmg:1.16,coins:350,xp:75,gems:0,desc:'Brock Rumlow brings elite close-quarters skill, firearms and a retractable gauntlet blade into the Street War.'},
{n:12,name:'Bullseye',cls:'bullseye',diff:'PHASE 1+',role:'PRECISION ASSASSIN',hp:155,dmg:1.20,coins:450,xp:90,gems:0,desc:'A surgical assassin who turns cards, blades and almost anything in reach into a precision weapon.'}`;
 rep('];\nconst TRAINING_DUMMY=',','+streetLevels+'\n];\nconst TRAINING_DUMMY=','street levels');

 const streetHelpers=`\nconst STREET_INTROS={
 Crossbones:['STREET WAR BEGINS','The Arena was training. This is a contract killer. Break his pressure before he controls the fight.'],
 Bullseye:['EVERYTHING IS A WEAPON','Do not stand still. Bullseye studies your rhythm, creates distance and punishes predictable movement.']
};
function streetIntro(name){const data=STREET_INTROS[name];if(!data||!F)return;F.enemyAtk=Math.max(F.enemyAtk,1.9);F.ai1=Math.max(F.ai1,2.5);F.ai2=Math.max(F.ai2,3.4);const d=document.createElement('div');d.className='street-intro';d.innerHTML=\`<small>PHASE 1 • STREET CRIMINALS</small><strong>\${data[0]}</strong><span>\${data[1]}</span>\`;$('arena')?.appendChild(d);later(()=>d.remove(),2200)}
function crossbonesBreaker(){if(!F)return;callout('SKULL BREAKER');const e=$('eF');e?.classList.add('crossbones-breaker');const start=F.ex,target=clamp(F.px+9,F.px+8,91);let n=0;const id=every(()=>{if(!F||F.over){clearInterval(id);intervalSet.delete(id);return}if(F.paused)return;n++;F.ex=start+(target-start)*(n/7);draw();if(F.ex-F.px<11||n>=7){clearInterval(id);intervalSet.delete(id);if(F&&F.ex-F.px<14)damagePlayer(14,true,true);e?.classList.remove('crossbones-breaker')}},38)}
function crossbonesBurst(){if(!F)return;callout('TACTICAL BURST');const e=$('eF');e?.classList.add('crossbones-fire');[0,135,270].forEach((ms,i)=>later(()=>{if(!F||F.over)return;enemyProjectile('crossbones-round',5+(i===2?1:0),3.75,44)},ms));later(()=>e?.classList.remove('crossbones-fire'),520)}
function crossbonesBlade(){if(!F)return;callout('BLADE GAUNTLET');const e=$('eF');e?.classList.add('crossbones-blade');const s=fx('crossbones-bladefx',F.ex-3,38);later(()=>{if(F&&F.ex-F.px<17)damagePlayer(15,true,true)},185);later(()=>{s.remove();e?.classList.remove('crossbones-blade')},480)}
function crossbonesWar(){if(!F)return;callout('BONES OF WAR');const e=$('eF');e?.classList.add('crossbones-war');const aura=fx('crossbones-warfx',F.ex-6,34);[90,235,390].forEach((ms,i)=>later(()=>{if(!F||F.over)return;if(i===1){enemyProjectile('crossbones-round',7,4.05,44);return}if(F.ex-F.px<19)damagePlayer(i===2?14:8,i===2,true)},ms));later(()=>{aura.remove();e?.classList.remove('crossbones-war')},720)}
function bullseyeThrow(){if(!F)return;callout('DEADEYE THROW');$('eF')?.classList.add('bullseye-throw');enemyProjectile('bullseye-card',10,4.15,43);later(()=>$('eF')?.classList.remove('bullseye-throw'),320)}
function bullseyeRicochet(){if(!F)return;callout('RICOCHET TRICK');const r=fx('bullseye-ricochet',F.ex-3,32);enemyProjectile('bullseye-disc',7,3.55,38);later(()=>{if(!F||F.over)return;enemyProjectile('bullseye-disc return-shot',8,4.35,49)},360);later(()=>r.remove(),760)}
function bullseyeStep(){if(!F)return;callout('ASSASSIN STEP');const e=$('eF');e?.classList.add('bullseye-step');const dir=F.ex-F.px<24?1:-1;F.ex=clamp(F.ex+dir*16,F.px+8,92);draw();later(()=>{if(F&&!F.over)bullseyeThrow();e?.classList.remove('bullseye-step')},180)}
function bullseyePerfect(){if(!F)return;callout('PERFECT AIM');const e=$('eF');e?.classList.add('bullseye-perfect');const mark=fx('bullseye-perfectfx',F.px-2,27);[70,210,350].forEach((ms,i)=>later(()=>{if(!F||F.over)return;enemyProjectile(i===2?'bullseye-knife':'bullseye-card',i===2?12:7,4.55+i*.18,40+i*3)},ms));later(()=>{if(F&&F.ex-F.px<17)damagePlayer(10,true,true)},510);later(()=>{mark.remove();e?.classList.remove('bullseye-perfect')},760)}\n`;
 rep('function mysterioClone(){',streetHelpers+'function mysterioClone(){','street helpers');

 rep("const approach={1:9,2:8.2,3:10.2,4:8.8,5:7.2,6:11.2,7:10.5,8:12,9:6.5,10:9.5}[l.n]||9","const approach={1:9,2:8.2,3:10.2,4:8.8,5:7.2,6:11.2,7:10.5,8:12,9:6.5,10:9.5,11:8.4,12:18.5}[l.n]||9",'street movement');
 const streetAI=`
 if(l.name==='Crossbones'){if(F.ai1<=0){gap>19?(Math.random()<.5?crossbonesBurst():crossbonesBreaker()):(Math.random()<.55?crossbonesBlade():crossbonesBreaker());F.ai1=2.15+Math.random()*1.05}if(F.ai2<=0){gap<21?crossbonesWar():crossbonesBurst();F.ai2=5.1+Math.random()*1.4}}
 if(l.name==='Bullseye'){if(F.ai1<=0){gap<15?bullseyeStep():(Math.random()<.58?bullseyeThrow():bullseyeRicochet());F.ai1=1.9+Math.random()*.95}if(F.ai2<=0){Math.random()<.62?bullseyePerfect():bullseyeStep();F.ai2=4.6+Math.random()*1.35}}
`;
 rep('\n}\nfunction stopFightTimers(){',streetAI+'\n}\nfunction stopFightTimers(){','street ai');
 rep("screen('fight');draw();renderHeroActions();if(!training&&NEO_INTROS[l.name])neoIntro(l.name);","screen('fight');draw();renderHeroActions();if(!training&&NEO_INTROS[l.name])neoIntro(l.name);if(!training&&STREET_INTROS[l.name])streetIntro(l.name);",'street intro trigger');

 rep(".fighter-intro,.boss-intro').forEach(n=>n.remove());",".fighter-intro,.boss-intro,.street-intro,.crossbones-bladefx,.crossbones-warfx,.bullseye-ricochet,.bullseye-perfectfx').forEach(n=>n.remove());",'cleanup street fx');
 rep("e?.classList.remove('cloaked','rage','hurt','enemy-punch','illusion');","e?.classList.remove('cloaked','rage','hurt','enemy-punch','illusion','crossbones-breaker','crossbones-fire','crossbones-blade','crossbones-war','bullseye-throw','bullseye-step','bullseye-perfect');",'cleanup street classes');
 rep('// v0.9.5.1 public control bridge','// v0.9.5.2 public control bridge','control bridge comment');
 return code;
};
});

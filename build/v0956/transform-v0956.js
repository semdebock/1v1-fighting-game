/* Fight Arena v0.9.5.6 — Goblin Rework & Training Lab Fix */
(function(root,factory){
 const transform=factory();
 if(typeof module==='object'&&module.exports)module.exports=transform;
 root.FightArenaTransformV0956=transform;
})(typeof window!=='undefined'?window:globalThis,function(){
'use strict';
return function transformV0956(code){
 const rep=(from,to,label)=>{if(!code.includes(from))throw new Error('v0.9.5.6 transform marker missing: '+label);code=code.replace(from,to)};
 rep('/* Fight Arena v0.9.5.5 — Smoke & Chaos */','/* Fight Arena v0.9.5.6 — Goblin Rework & Training Lab Fix */','header');
 rep("window.FightArena={version:'0.9.5.5'","window.FightArena={version:'0.9.5.6'",'version');
 rep("s.coreVersion='0.9.5.5'","s.coreVersion='0.9.5.6'",'save version');
 rep("{n:3,name:'Green Goblin',cls:'greengoblin',diff:'PHASE 2 ELITE+',role:'GOBLIN BOMBER',hp:220,dmg:1.34,coins:1000,xp:195,gems:0,desc:'Norman Osborn turns the arena into chaos with relentless pressure and explosive Pumpkin Bombs. His classic Fight Arena combat kit is preserved, now rebalanced for Phase 2.'}","{n:3,name:'Green Goblin',cls:'greengoblin',diff:'PHASE 2 ELITE+',role:'ARMORED GLIDER BOMBER',hp:220,dmg:1.34,coins:1000,xp:195,gems:0,desc:'Norman Osborn attacks from his iconic Goblin Glider with Pumpkin Bombs, razor projectiles and vicious aerial rushes. Premium armor and glider combat make him one of Phase 2’s most mobile threats.'}",'goblin identity');

 const goblinHelpers=`\nfunction goblinPumpkin(){if(!F)return;callout('PUMPKIN BOMB');const e=$('eF');e?.classList.add('goblin-bomb-cast');enemyProjectile('pumpkin goblin-pumpkin',15,3.25,41);later(()=>e?.classList.remove('goblin-bomb-cast'),420)}
function goblinRazorBat(){if(!F)return;callout('RAZOR BAT');const e=$('eF');e?.classList.add('goblin-razor-cast');enemyProjectile('goblin-razorbat',12,4.45,38);later(()=>e?.classList.remove('goblin-razor-cast'),420)}
function goblinBombBarrage(){if(!F)return;callout('BOMB BARRAGE');const e=$('eF');e?.classList.add('goblin-barrage');[0,145,290].forEach((ms,i)=>later(()=>{if(F&&!F.over)enemyProjectile('pumpkin goblin-pumpkin barrage-'+i,7+(i===2?2:0),3.3+i*.2,36+i*6)},ms));later(()=>e?.classList.remove('goblin-barrage'),650)}
function goblinGliderRush(){if(!F)return;callout('GLIDER RUSH');const e=$('eF');e?.classList.add('goblin-glider-rush');const start=F.ex,target=clamp(F.px+9,F.px+8,91);let n=0;const id=every(()=>{if(!F||F.over){clearInterval(id);intervalSet.delete(id);return}if(F.paused)return;n++;F.ex=start+(target-start)*(n/10);draw();if(F.ex-F.px<11||n>=10){clearInterval(id);intervalSet.delete(id);if(F&&F.ex-F.px<14)damagePlayer(17,true,true);later(()=>e?.classList.remove('goblin-glider-rush'),360)}},28)}\n`;
 rep('function mysterioClone(){',goblinHelpers+'function mysterioClone(){','goblin combat helpers');
 rep("if(l.n===3&&F.ai1<=0&&gap>=11){callout('PUMPKIN BOMB');enemyProjectile('pumpkin',14,2.8,43);F.ai1=4.3+Math.random()*2}","if(l.name==='Green Goblin'){if(F.ai1<=0){if(gap>22){Math.random()<.62?goblinPumpkin():goblinRazorBat()}else{Math.random()<.52?goblinGliderRush():goblinBombBarrage()}F.ai1=1.9+Math.random()*1.15}if(F.ai2<=0){Math.random()<.56?goblinBombBarrage():goblinGliderRush();F.ai2=4.6+Math.random()*1.35}}",'goblin ai');

 const oldFill="function fillTrainingSpecial(){if(!F?.training)return;F.sp=100;if(F.hero==='Black Panther')F.kinetic=100;draw();renderHeroActions();const bar=$('sp'),txt=$('spText'),btn=$('special');if(bar)bar.style.width='100%';if(txt)txt.textContent='100%';if(btn)btn.disabled=false;toast(F.hero==='Black Panther'?'SPECIAL + KINETIC READY':'SPECIAL READY')}";
 const trainingLab=`function cleanupTrainingArena(){const arena=$('arena');if(!arena)return;[...arena.children].forEach(n=>{if(n.id==='pF'||n.id==='eF'||n.classList.contains('city')||n.classList.contains('floor'))return;n.remove()})}
function resetTrainingLab(){if(!F?.training)return false;clearTracked();cleanupTrainingArena();const hero=F.hero;F.ph=F.pm;F.eh=F.em;F.px=12;F.ex=80;F.move=0;F.sp=0;F.block=false;F.jump=0;F.jv=0;F.busy=false;F.cooldowns=[0,0,0];F.flying=false;F.rage=false;F.cloaked=false;F.invulnerable=false;F.counter=false;F.moonGuard=false;F.kinetic=0;F.kineticGuard=false;F.kineticVariant=hero==='Black Panther'&&save.equippedSkins['Black Panther']==='bp-kinetic';F.healRecovered=0;F.lastDamageAt=performance.now();F.healTickAt=performance.now();F.totalDamage=0;F.hits=0;F.trainingKos=0;F.lastHit=0;F.comboDamage=0;F.comboAt=0;F.trainingStarted=performance.now();setSprite($('pF'),hero,'player',save.equippedSkins[hero]);setSprite($('eF'),'Training Dummy','enemy');if($('knob'))$('knob').style.transform='translateX(0)';draw();renderHeroActions();requestAnimationFrame(()=>{if(F?.training){draw();renderHeroActions()}});toast('TRAINING RESET');return true}
function fillTrainingSpecial(){if(!F?.training)return false;F.sp=100;F.busy=false;if(F.hero==='Black Panther')F.kinetic=100;draw();renderHeroActions();const sync=()=>{if(!F?.training)return;const bar=$('sp'),txt=$('spText'),btn=$('special');if(bar)bar.style.width='100%';if(txt)txt.textContent='100%';if(btn)btn.disabled=false;if(F.hero==='Black Panther'){const hl=$('trainingHeroStatLabel'),hv=$('trainingHeroStat');if(hl)hl.textContent='KINETIC ENERGY';if(hv)hv.textContent='100%'}renderHeroActions()};sync();requestAnimationFrame(sync);later(sync,40);toast(F.hero==='Black Panther'?'SPECIAL + KINETIC READY':'SPECIAL READY');return true}`;
 rep(oldFill,trainingLab,'training lab helpers');
 rep("$('trainingReset').onclick=()=>{if(F?.training){","$('trainingReset').onclick=()=>{if(F?.training){resetTrainingLab();return;",'training reset override');
 rep("'electro-cast','electro-blink','electro-chain','electro-grid','electro-overcharge');","'electro-cast','electro-blink','electro-chain','electro-grid','electro-overcharge','goblin-bomb-cast','goblin-razor-cast','goblin-barrage','goblin-glider-rush');",'goblin cleanup classes');
 const trainingBridge=`window.FightArenaTrainingControls={
 fill(){return fillTrainingSpecial()},
 reset(){return resetTrainingLab()},
 active(){return !!F?.training},
 snapshot(){return F?.training?{hero:F.hero,hp:F.ph,maxHp:F.pm,dummyHp:F.eh,special:F.sp,kinetic:F.kinetic||0,cooldowns:[...F.cooldowns],busy:!!F.busy,flying:!!F.flying}:null}
};
`;
 rep('// v0.9.5.5 public control bridge',trainingBridge+'// v0.9.5.6 public control bridge','training public bridge');
 return code;
};
});

/* Fight Arena v0.9.5.5 — Smoke & Chaos transform */
(function(root,factory){
 const transform=factory();
 if(typeof module==='object'&&module.exports)module.exports=transform;
 root.FightArenaTransformV0955=transform;
})(typeof window!=='undefined'?window:globalThis,function(){
'use strict';
return function transformV0955(code){
 const rep=(from,to,label)=>{if(!code.includes(from))throw new Error('v0.9.5.5 transform marker missing: '+label);code=code.replace(from,to)};
 rep('/* Fight Arena v0.9.5.4 — Raw Power */','/* Fight Arena v0.9.5.5 — Smoke & Chaos */','header');
 rep("window.FightArena={version:'0.9.5.4'","window.FightArena={version:'0.9.5.5'",'version');
 rep("s.coreVersion='0.9.5.4'","s.coreVersion='0.9.5.5'",'save version');

 // Promote the preserved legacy Sinister encounters into their real Phase 2 positions.
 rep("{n:3,name:'Green Goblin',cls:'greengoblin',diff:'Hard',role:'GOBLIN BOMBER',hp:150,dmg:1.18,coins:250,xp:60,gems:0,desc:'Aggressive aerial menace with faster pressure and explosive Pumpkin Bombs.'}","{n:3,name:'Green Goblin',cls:'greengoblin',diff:'PHASE 2 ELITE+',role:'GOBLIN BOMBER',hp:220,dmg:1.34,coins:1000,xp:195,gems:0,desc:'Norman Osborn turns the arena into chaos with relentless pressure and explosive Pumpkin Bombs. His classic Fight Arena combat kit is preserved, now rebalanced for Phase 2.'}",'green goblin phase balance');
 rep("{n:4,name:'Mysterio',cls:'mysterio',diff:'Hard+',role:'ILLUSION CONTROLLER',hp:165,dmg:1.22,coins:350,xp:80,gems:0,desc:'Master of misdirection. Mystic Orbs, illusion clones and smoke teleports control the arena.'}","{n:4,name:'Mysterio',cls:'mysterio',diff:'PHASE 2 ELITE',role:'ILLUSION CONTROLLER',hp:205,dmg:1.30,coins:900,xp:180,gems:0,desc:'Quentin Beck controls space through Mystic Orbs, illusion clones and smoke teleports. His proven Fight Arena kit returns as Phase 2 Fight 3.'}",'mysterio phase balance');

 rep(" Electro:['THE GRID IS ALIVE','Max Dillon owns the range. Keep changing position, respect the yellow lightning and strike before he fully overcharges.']\n};"," Electro:['THE GRID IS ALIVE','Max Dillon owns the range. Keep changing position, respect the yellow lightning and strike before he fully overcharges.'],\n Mysterio:['NOTHING HERE IS REAL','Quentin Beck controls what you see. Track the real body, survive the clone pressure and punish his smoke teleport.'],\n 'Green Goblin':['CHAOS FROM ABOVE','Norman attacks without rhythm. Respect the Pumpkin Bomb, stay mobile and punish him when his pressure finally breaks.']\n};",'smoke chaos intros');
 rep("const RESULT_CAMPAIGN_ORDER=['Nightfang','Voltage','Razor','Titan','Arena Champion','Crossbones','Bullseye','Punisher','Taskmaster','Kingpin','Rhino','Electro'];","const RESULT_CAMPAIGN_ORDER=['Nightfang','Voltage','Razor','Titan','Arena Champion','Crossbones','Bullseye','Punisher','Taskmaster','Kingpin','Rhino','Electro','Mysterio','Green Goblin'];",'campaign result order');

 // Training Lab reliability pass. FILL SPECIAL now hard-syncs the UI and hero-specific power systems.
 rep("$('trainingSpecial').onclick=()=>{if(F?.training){F.sp=100;draw();toast('SPECIAL READY')}};",`function fillTrainingSpecial(){if(!F?.training)return;F.sp=100;if(F.hero==='Black Panther')F.kinetic=100;draw();renderHeroActions();const bar=$('sp'),txt=$('spText'),btn=$('special');if(bar)bar.style.width='100%';if(txt)txt.textContent='100%';if(btn)btn.disabled=false;toast(F.hero==='Black Panther'?'SPECIAL + KINETIC READY':'SPECIAL READY')}\n$('trainingSpecial').onclick=fillTrainingSpecial;`,'training fill special');
 rep("F.trainingStarted=performance.now();F.kinetic=0;F.healRecovered=0;F.lastDamageAt=performance.now();F.healTickAt=performance.now();draw();toast('TRAINING RESET')",`F.trainingStarted=performance.now();F.ph=F.pm;F.px=12;F.ex=80;F.sp=0;F.cooldowns=[0,0,0];F.flying=false;F.block=false;F.invulnerable=false;F.counter=false;F.moonGuard=false;F.kinetic=0;F.kineticGuard=false;F.healRecovered=0;F.lastDamageAt=performance.now();F.healTickAt=performance.now();$('pF')?.classList.remove('flying','nano-flight','blocking','guard','radar-ready','moon-guard','kinetic-guard','perfect-absorb','berserker','healing-surge','punisher-roll');draw();renderHeroActions();toast('TRAINING RESET')`,'training reset state');

 rep('// v0.9.5.4 public control bridge','// v0.9.5.5 public control bridge','control bridge comment');
 return code;
};
});

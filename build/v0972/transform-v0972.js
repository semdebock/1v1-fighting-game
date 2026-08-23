/* Multiverse Arena v0.9.7.2 — Combat Balance + Phase 3 Polish */
(function(root,factory){
 const transform=factory();
 if(typeof module==='object'&&module.exports)module.exports=transform;
 root.FightArenaTransformV0972=transform;
})(typeof window!=='undefined'?window:globalThis,function(){
'use strict';
return function transformV0972(code){
 const rep=(from,to,label)=>{if(!code.includes(from))throw new Error('v0.9.7.2 transform marker missing: '+label);code=code.replace(from,to)};

 /* Public fighter buffs: modest improvements without changing role identity. */
 rep("'Rookie':{cls:'rookie',rank:'B RANK • STREET',arenaRank:'B',powerClass:'STREET',role:'BALANCED',hp:100,power:55,speed:60,price:0,punch:8,kick:13,special:25", "'Rookie':{cls:'rookie',rank:'B RANK • STREET',arenaRank:'B',powerClass:'STREET',role:'BALANCED',hp:105,power:60,speed:64,price:0,punch:9,kick:14,special:28", 'Rookie buff');
 rep("'Captain America':{cls:'captain',rank:'A+ RANK • ENHANCED',arenaRank:'A+',powerClass:'ENHANCED',role:'TACTICAL',hp:120,power:80,speed:62,price:2600,punch:10,kick:14,special:27", "'Captain America':{cls:'captain',rank:'A+ RANK • ENHANCED',arenaRank:'A+',powerClass:'ENHANCED',role:'TACTICAL',hp:120,power:82,speed:68,price:2600,punch:11,kick:15,special:30", 'Captain America buff');
 rep("'Daredevil':{cls:'daredevil',rank:'A RANK • STREET',arenaRank:'A',powerClass:'STREET',role:'COUNTER',hp:100,power:66,speed:88,price:1800,punch:9,kick:13,special:32", "'Daredevil':{cls:'daredevil',rank:'A RANK • STREET',arenaRank:'A',powerClass:'STREET',role:'COUNTER',hp:100,power:70,speed:90,price:1800,punch:10,kick:14,special:34", 'Daredevil buff');
 rep("playerProjectile('shieldshot',12,4,4,true", "playerProjectile('shieldshot',13,4,4,true", 'Captain shield throw');
 rep("if(F&&F.ex-F.px<17)damageEnemy(14,5)", "if(F&&F.ex-F.px<17)damageEnemy(16,5)", 'Captain shield bash');
 rep("later(()=>damageEnemy(12,5,true),70)", "later(()=>damageEnemy(14,5,true),70)", 'Daredevil radar counter');
 rep("playerProjectile('billyclub',11,4.25,4,true)", "playerProjectile('billyclub',12,4.25,4,true)", 'Daredevil billy club');
 rep("if(F&&F.ex-F.px<15)damageEnemy(9,3)", "if(F&&F.ex-F.px<15)damageEnemy(10,3)", 'Daredevil grapple rush');
 rep("damageEnemy(i===3?14:6,i===3?8:1,i===3)", "damageEnemy(i===3?16:6,i===3?8:1,i===3)", 'Daredevil combo finisher');

 /* Phase 3 fairness tuning: keep identities, reduce unnecessary sponge/spam. */
 rep("{n:20,name:'Juggernaut',cls:'juggernaut',diff:'PHASE 3 HEAVY+',role:'UNSTOPPABLE MUTANT-CLASS BRUISER',hp:360,dmg:1.52", "{n:20,name:'Juggernaut',cls:'juggernaut',diff:'PHASE 3 HEAVY+',role:'UNSTOPPABLE MUTANT-CLASS BRUISER',hp:345,dmg:1.47", 'Juggernaut stats');
 rep("{n:21,name:'Deadpool',cls:'deadpool',diff:'PHASE 3 WILDCARD',role:'REGENERATING MERCENARY',hp:285,dmg:1.40", "{n:21,name:'Deadpool',cls:'deadpool',diff:'PHASE 3 WILDCARD',role:'REGENERATING MERCENARY',hp:270,dmg:1.36", 'Deadpool stats');
 rep("{n:22,name:'Magneto',cls:'magneto',diff:'PHASE 3 BOSS',role:'MASTER OF MAGNETISM • BOSS',boss:true,hp:380,dmg:1.58", "{n:22,name:'Magneto',cls:'magneto',diff:'PHASE 3 BOSS',role:'MASTER OF MAGNETISM • BOSS',boss:true,hp:365,dmg:1.53", 'Magneto stats');
 rep("if(F.level?.name==='Juggernaut'&&!F.juggOpen)n=Math.max(1,Math.round(n*.72));", "if(F.level?.name==='Juggernaut'&&!F.juggOpen)n=Math.max(1,Math.round(n*.80));", 'Juggernaut armor fairness');
 rep("F.eh=42;deadpoolLastStand();", "F.eh=36;deadpoolLastStand();", 'Deadpool Last Stand health');
 rep("toast('DEADPOOL • LAST STAND • 42 HP')", "toast('DEADPOOL • LAST STAND • 36 HP')", 'Deadpool Last Stand label');

 rep("later(()=>{if(F&&F.ex-F.px<19)damagePlayer(22,true,true)},260)", "later(()=>{if(F&&F.ex-F.px<19)damagePlayer(20,true,true)},260)", 'Juggernaut Helmet Bash damage');
 rep("later(()=>{if(F&&F.ex-F.px<43&&F.jump<22)damagePlayer(24,true,true)},430)", "later(()=>{if(F&&F.ex-F.px<43&&F.jump<22)damagePlayer(22,true,true)},430)", 'Juggernaut Ground Breaker damage');
 rep("function juggCharge(power=29,label='UNSTOPPABLE CHARGE')", "function juggCharge(power=27,label='UNSTOPPABLE CHARGE')", 'Juggernaut charge damage');
 rep("juggCharge(34,'I’M THE JUGGERNAUT')", "juggCharge(31,'I’M THE JUGGERNAUT')", 'Juggernaut super charge');
 rep("if(F.ex-F.px<28&&F.jump<20)damagePlayer(12,true,true)", "if(F.ex-F.px<28&&F.jump<20)damagePlayer(10,true,true)", 'Juggernaut super quake');
 rep("F.ai1=2.4+Math.random()*1.0}if(F.ai2<=0){juggUnstoppable();F.ai2=6.6+Math.random()*1.45", "F.ai1=2.65+Math.random()*1.05}if(F.ai2<=0){juggUnstoppable();F.ai2=7.2+Math.random()*1.5", 'Juggernaut attack cadence');

 rep("enemyProjectile('deadpool-shot shot-'+i,8+(i===2?2:0),4.05,45)", "enemyProjectile('deadpool-shot shot-'+i,7+(i===2?2:0),4.05,45)", 'Deadpool pistols');
 rep("damagePlayer(i===2?12:7,i===2,true)", "damagePlayer(i===2?11:6,i===2,true)", 'Deadpool katana');
 rep("enemyProjectile('deadpool-shot finisher',13,4.3,42)", "enemyProjectile('deadpool-shot finisher',11,4.3,42)", 'Deadpool Maximum Effort finisher');
 rep("F.deadpoolRecovered<105&&t-(F.enemyLastDamageAt||0)>950&&t-F.deadpoolHealAt>760){const heal=Math.min(3,F.em-F.eh,105-F.deadpoolRecovered)", "F.deadpoolRecovered<78&&t-(F.enemyLastDamageAt||0)>1200&&t-F.deadpoolHealAt>900){const heal=Math.min(3,F.em-F.eh,78-F.deadpoolRecovered)", 'Deadpool regeneration cap');
 rep("F.ai1=1.1+Math.random()*.75}if(F.ai2<=0){Math.random()<.68?deadpoolMaximum():deadpoolRoll();F.ai2=4.6+Math.random()*1.25", "F.ai1=1.2+Math.random()*.8}if(F.ai2<=0){Math.random()<.64?deadpoolMaximum():deadpoolRoll();F.ai2=5.1+Math.random()*1.3", 'Deadpool attack cadence');

 rep("enemyProjectile('mag-shard shard-'+i,10+(i===2?3:0),3.35+i*.2,38+i*5)", "enemyProjectile('mag-shard shard-'+i,9+(i===2?3:0),3.35+i*.2,38+i*5)", 'Magneto shards');
 rep("damagePlayer(F.magnetoPhase>=3?23:F.magnetoPhase>=2?20:17,true,true)", "damagePlayer(F.magnetoPhase>=3?21:F.magnetoPhase>=2?18:16,true,true)", 'Magneto push');
 rep("damagePlayer(F.magnetoPhase>=2?14:11,false,true)", "damagePlayer(F.magnetoPhase>=2?13:10,false,true)", 'Magneto pull');
 rep("enemyProjectile('mag-shard levitate',16,4.25,32)", "enemyProjectile('mag-shard levitate',15,4.25,32)", 'Magneto levitation');
 rep("damagePlayer(i===2?20:15,true,true)", "damagePlayer(i===2?18:14,true,true)", 'Magneto debris');
 rep("enemyProjectile('mag-shard barrage-'+i,9+(i===3?5:0),3.5+i*.18,32+i*7)", "enemyProjectile('mag-shard barrage-'+i,8+(i===3?5:0),3.5+i*.18,32+i*7)", 'Magneto barrage');
 rep("},F.magnetoPhase>=3?760:980)", "},F.magnetoPhase>=3?700:880)", 'Magneto shield duration');
 rep("F.ai1=(F.magnetoPhase>=3?1.05:F.magnetoPhase>=2?1.4:1.8)+Math.random()*.6", "F.ai1=(F.magnetoPhase>=3?1.15:F.magnetoPhase>=2?1.5:1.9)+Math.random()*.65", 'Magneto primary cadence');
 rep("F.ai2=(F.magnetoPhase>=3?3.0:F.magnetoPhase>=2?3.8:4.8)+Math.random()*1.05", "F.ai2=(F.magnetoPhase>=3?3.35:F.magnetoPhase>=2?4.0:5.0)+Math.random()*1.1", 'Magneto special cadence');
 rep("performance.now()-F.magUltimateAt>8200", "performance.now()-F.magUltimateAt>9400", 'Magneto ultimate cadence');

 return code;
};
});

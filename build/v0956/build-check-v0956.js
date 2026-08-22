const fs=require('fs');
const path=require('path');
const t94=require('../v094/transform-v094.js');
const t941=require('../v0941/transform-v0941.js');
const t95=require('../v095/transform-v095.js');
const t951=require('../v0951/transform-v0951.js');
const t952=require('../v0952/transform-v0952.js');
const t953=require('../v0953/transform-v0953.js');
const t9531=require('../v09531/transform-v09531.js');
const t954=require('../v0954/transform-v0954.js');
const t955=require('../v0955/transform-v0955.js');
const t956=require('./transform-v0956.js');
const root=path.resolve(__dirname,'../..');
const files=['core-v093-part1.txt','core-v093-part2.txt','core-v093-part3.txt','core-v093-part4.txt'];
let code='';for(const file of files)code+=fs.readFileSync(path.join(root,'build/v093',file),'utf8');
const built=t956(t955(t954(t9531(t953(t952(t951(t95(t941(t94(code))))))))));
fs.writeFileSync('/tmp/core-v0956-built.js',built);
for(const marker of [
 "version:'0.9.5.6'","name:'Green Goblin'",'ARMORED GLIDER BOMBER','goblinPumpkin','goblinRazorBat','goblinBombBarrage','goblinGliderRush',"l.name==='Green Goblin'",'goblin-glider-rush','goblin-barrage',
 'cleanupTrainingArena','resetTrainingLab','fillTrainingSpecial','FightArenaTrainingControls','snapshot(){','F.sp=100','F.kinetic=100','F.cooldowns=[0,0,0]','F.busy=false','setSprite($(\'pF\'),hero','setSprite($(\'eF\'),\'Training Dummy\'',
 'punisherUnlockShown','showPunisherUnlock','rematch(){','next(){','screen(\'results\')','clearFightTouchLock',"name:'Mysterio'","name:'Rhino'","name:'Electro'","name:'Ultron'","name:'Prowler'","code==='DIAMONDS'"
])if(!built.includes(marker))throw new Error('v0.9.5.6 marker missing: '+marker);
console.log('v0.9.5.6 transformed bytes:',Buffer.byteLength(built));

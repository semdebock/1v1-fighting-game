const fs=require('fs'),path=require('path');const root=path.resolve(__dirname,'../..');
const core=fs.readFileSync(path.join(root,'app/core/core-runtime-v0958.js'),'utf8'),boot=fs.readFileSync(path.join(root,'app/core/bootstrap-v096.js'),'utf8'),js=fs.readFileSync(path.join(root,'update-v09771.js'),'utf8'),css=fs.readFileSync(path.join(root,'update-v09771.css'),'utf8'),index=fs.readFileSync(path.join(root,'index.html'),'utf8');
for(const m of ["classList.add('thor-cast','mjolnir-away')","classList.remove('thor-cast','mjolnir-away')",'FightArenaTrainingControls','DAILY_REWARD_COINS=1250','VERONICA CRASHDOWN','mystiqueTransform','deadpoolLastStand','magnetoMaster','gems=win&&l.boss?(l.gems||0):0','campaignUnlockName=win?campaignNextName(l.name):null'])if(!core.includes(m))throw new Error('core marker missing '+m);
for(const m of ["const BUILD='0.9.7.7.1'","const ASSET='09771'","'update-v09771.js'",'MultiverseArenaUpdate09771'])if(!boot.includes(m))throw new Error('bootstrap marker missing '+m);
for(const m of ['replaceButton','FightArenaTrainingControls','snapshot','START TRAINING FIRST','SPECIAL 100%','✓ RESET'])if(!js.includes(m))throw new Error('training repair marker missing '+m);
for(const m of ['.fighter.thor.mjolnir-away .arm.r:after','.fighter.doctorstrange','.fighter.starlord','@keyframes mjolnirSpin'])if(!css.includes(m))throw new Error('visual marker missing '+m);
for(const m of ['v0.9.7.7.1','app/core/bootstrap-v096.js?v=09771'])if(!index.includes(m))throw new Error('index marker missing '+m);
console.log('v0.9.7.7.1 Hero Revamp release checks passed');

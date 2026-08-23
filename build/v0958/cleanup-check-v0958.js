const fs=require('fs');
const path=require('path');
const root=path.resolve(__dirname,'../..');
const boot=fs.readFileSync(path.join(root,'app/core/bootstrap-v0958.js'),'utf8');
const polish=fs.readFileSync(path.join(root,'polish-v09572.js'),'utf8');
const corePath=path.join(root,'app/core/core-runtime-v0958.js');
const metaPath=path.join(root,'app/core/core-runtime-v0958.meta.json');
if(!fs.existsSync(corePath)||!fs.existsSync(metaPath))throw new Error('canonical v0.9.5.8 core artifact missing');
const core=fs.readFileSync(corePath,'utf8');
const meta=JSON.parse(fs.readFileSync(metaPath,'utf8'));
const required=[
 "const BUILD='0.9.5.8'",
 "const SAVE_KEY='fightArenaV08'",
 "const CORE='app/core/core-runtime-v0958.js'",
 "'device-v092.js'",
 "'touch-v0941.js'",
 "'stability-v0941.js'",
 "'campaign-v0957.js'",
 "'ui-v09571.js'",
 "'polish-v09572.js'",
 'window.MultiverseArenaRuntime=state',
 "window.addEventListener('fightarena-ready'",
 "window.dispatchEvent(new Event('fightarena-ready'))"
];
for(const marker of required)if(!boot.includes(marker))throw new Error('v0.9.5.8 bootstrap marker missing: '+marker);
for(const forbidden of ['build/v094/transform-v094.js',"'core-v0957.js'","'qa-v0957.js'","'qa-v09571.js'","'qa-v095722.js'",'requestAnimationFrame(loop)','new MutationObserver'])if(boot.includes(forbidden))throw new Error('production bootstrap contains forbidden legacy/runtime pattern: '+forbidden);
for(const marker of ['GENERATED FILE',"version:'0.9.5.7'","name:'Doctor Octopus'",'coins:1400,xp:260,gems:10','showRewardSummary','FightArenaTrainingControls','punisherUnlockShown'])if(!core.includes(marker))throw new Error('canonical core marker missing: '+marker);
if(meta.release!=='0.9.5.8'||meta.sourceCore!=='0.9.5.7'||!meta.generated||!meta.sha256)throw new Error('canonical core metadata invalid');
if(polish.includes('new MutationObserver'))throw new Error('fight stability regression: polish MutationObserver returned');
if(polish.includes("classList.add('impact-pop')"))throw new Error('fight stability regression: recursive impact class returned');
console.log('v0.9.5.8 canonical core cleanup checks passed');

const fs=require('fs');
const path=require('path');
const root=path.resolve(__dirname,'../..');
const boot=fs.readFileSync(path.join(root,'app/core/bootstrap-v0958.js'),'utf8');
const polish=fs.readFileSync(path.join(root,'polish-v09572.js'),'utf8');
const required=[
 "const BUILD='0.9.5.8'",
 "const SAVE_KEY='fightArenaV08'",
 "'core-v0957.js'",
 "'device-v092.js'",
 "'touch-v0941.js'",
 "'stability-v0941.js'",
 "'campaign-v0957.js'",
 "'ui-v09571.js'",
 "'polish-v09572.js'",
 'window.MultiverseArenaRuntime=state',
 "window.addEventListener('fightarena-ready'"
];
for(const marker of required)if(!boot.includes(marker))throw new Error('v0.9.5.8 bootstrap marker missing: '+marker);
for(const forbidden of ["'qa-v0957.js'","'qa-v09571.js'","'qa-v095722.js'",'requestAnimationFrame(loop)','new MutationObserver'])if(boot.includes(forbidden))throw new Error('production bootstrap contains forbidden runtime pattern: '+forbidden);
if(polish.includes('new MutationObserver'))throw new Error('fight stability regression: polish MutationObserver returned');
if(polish.includes("classList.add('impact-pop')"))throw new Error('fight stability regression: recursive impact class returned');
console.log('v0.9.5.8 core cleanup checks passed');

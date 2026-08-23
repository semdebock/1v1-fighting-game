const fs=require('fs');
const path=require('path');
const root=path.resolve(__dirname,'../..');
const boot=fs.readFileSync(path.join(root,'app/core/bootstrap-v096.js'),'utf8');
const core=fs.readFileSync(path.join(root,'app/core/core-runtime-v0958.js'),'utf8');
const css=fs.readFileSync(path.join(root,'update-v0964.css'),'utf8');
const ui=fs.readFileSync(path.join(root,'update-v0964.js'),'utf8');
const premium=fs.readFileSync(path.join(root,'premium-v096.js'),'utf8');
const update62=fs.readFileSync(path.join(root,'update-v0962.js'),'utf8');
const update63=fs.readFileSync(path.join(root,'update-v0963.js'),'utf8');
/* v0.9.6.4 is now a retained compatibility layer. Do not require the current bootstrap itself to still be 0.9.6.4. */
for(const marker of ["const SAVE_KEY='fightArenaV08'","'update-v0964.js'",'core-runtime-v0958.js'])if(!boot.includes(marker))throw new Error('v0.9.6.4 compatibility bootstrap marker missing: '+marker);
for(const marker of ['visualViewport','--fight-viewport-v0964','composeFightTopbar','fighthead-emptied-v0964','fight-control-label-v0963','v0.9.6.4','iPad Control Fit • Centered Preview • UI Audit','cleanUpdateLog','const ownsRelease='])if(!ui.includes(marker))throw new Error('v0.9.6.4 runtime marker missing: '+marker);
for(const marker of ['#fight[data-premium-label]:before{display:none!important}','transform:translate(-50%,-50%) scale(2.12)','justify-content:center!important','var(--fight-viewport-v0964','height:37px!important','fighthead-emptied-v0964'])if(!css.includes(marker))throw new Error('v0.9.6.4 CSS marker missing: '+marker);
for(const legacy of [premium,update62,update63])if(!legacy.includes('const ownsRelease='))throw new Error('legacy presentation layer can overwrite latest release');
for(const forbidden of ['new MutationObserver','setInterval(','requestAnimationFrame(loop)','localStorage.removeItem(\'fightArenaV08\')','fightArenaV0964'])if(ui.includes(forbidden)||css.includes(forbidden))throw new Error('v0.9.6.4 unsafe marker: '+forbidden);
for(const stable of ["name:'Doctor Octopus'",'FightArenaTrainingControls','punisherUnlockShown',"name:'Ultron'", "name:'Prowler'",'primo-super-leap','PRIMO SMASH!'])if(!core.includes(stable))throw new Error('protected combat marker missing: '+stable);
console.log('v0.9.6.4 compatibility checks passed inside current release');

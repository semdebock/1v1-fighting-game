const fs=require('fs'),path=require('path');const root=path.resolve(__dirname,'../..');
const boot=fs.readFileSync(path.join(root,'app/core/bootstrap-v096.js'),'utf8'),ui=fs.readFileSync(path.join(root,'update-v09772.js'),'utf8'),css=fs.readFileSync(path.join(root,'update-v09772.css'),'utf8'),index=fs.readFileSync(path.join(root,'index.html'),'utf8'),core=fs.readFileSync(path.join(root,'app/core/core-runtime-v0958.js'),'utf8');
for(const m of ["const BUILD='0.9.7.7.2'","const ASSET='09772'","'update-v09772.js'",'owner board'])if(!boot.toLowerCase().includes(m.toLowerCase()))throw new Error('bootstrap marker missing '+m);
for(const m of ["CODE='OWNERBOARD'",'ownerBoardUnlocked','OWNER COMMAND CENTER','UNLOCK ALL FIGHTERS','UNLOCK ALL SKINS','UNLOCK THE ONE ABOVE ALL','UNLOCK ALL FIGHTS','MARK ALL CLEARED','ownerSaveBox','fightArenaV08','stopImmediatePropagation'])if(!ui.includes(m))throw new Error('owner runtime marker missing '+m);
for(const m of ['owner-board-overlay','owner-board-shell','owner-setting-row','owner-grid'])if(!css.includes(m))throw new Error('owner CSS marker missing '+m);
for(const m of ['v0.9.7.7.2','app/core/bootstrap-v096.js?v=09772'])if(!index.includes(m))throw new Error('index marker missing '+m);
for(const m of ['FightArenaTrainingControls','DAILY_REWARD_COINS=1250','VERONICA CRASHDOWN','gems=win&&l.boss?(l.gems||0):0','campaignUnlockName=win?campaignNextName(l.name):null'])if(!core.includes(m))throw new Error('protected system missing '+m);
if(ui.includes("localStorage.removeItem('fightArenaV08')"))throw new Error('owner board may not silently delete save');
console.log('v0.9.7.7.2 Owner Board checks passed');

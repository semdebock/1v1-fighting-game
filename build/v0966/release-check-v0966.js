const fs=require('fs');
const path=require('path');
const root=path.resolve(__dirname,'../..');
const boot=fs.readFileSync(path.join(root,'app/core/bootstrap-v096.js'),'utf8');
const core=fs.readFileSync(path.join(root,'app/core/core-runtime-v0958.js'),'utf8');
const campaign=fs.readFileSync(path.join(root,'campaign-v0957.js'),'utf8');
const ui=fs.readFileSync(path.join(root,'update-v0966.js'),'utf8');
const css=fs.readFileSync(path.join(root,'update-v0966.css'),'utf8');
/* v0.9.6.6 is retained as the proven navigator design; current releases may replace its runtime. */
for(const marker of ["const SAVE_KEY='fightArenaV08'",'core-runtime-v0958.js'])if(!boot.includes(marker))throw new Error('v0.9.6.6 compatibility bootstrap marker missing: '+marker);
for(const marker of ['function phaseAccessible','function renderNavigator','function nearestIndex','Phase Tabs • Swipe Villains • Smart Target Focus','SWIPE TO CHOOSE','CLASSIFIED THREAT','window.MultiverseArenaUpdate0966'])if(!ui.includes(marker))throw new Error('v0.9.6.6 navigator marker missing: '+marker);
for(const marker of ['gauntlet-phase-tabs-v0966','gauntlet-carousel-v0966','scroll-snap-type:x mandatory','-webkit-overflow-scrolling:touch','gauntlet-villain-card-v0966.selected','prefers-reduced-motion'])if(!css.includes(marker))throw new Error('v0.9.6.6 CSS marker missing: '+marker);
for(const forbidden of ['new MutationObserver','setInterval(','requestAnimationFrame(loop)','localStorage.removeItem(\'fightArenaV08\')','fightArenaV0966'])if(ui.includes(forbidden)||css.includes(forbidden))throw new Error('v0.9.6.6 unsafe marker: '+forbidden);
for(const stable of ["name:'Doctor Octopus'",'FightArenaTrainingControls','punisherUnlockShown',"name:'Ultron'", "name:'Prowler'",'primo-super-leap','PRIMO SMASH!'])if(!core.includes(stable))throw new Error('protected combat marker missing: '+stable);
for(const stable of ["phase2Order=['Rhino','Electro','Mysterio','Green Goblin','Doctor Octopus']",'phase2Complete','window.FightArenaCampaignV0957'])if(!campaign.includes(stable))throw new Error('protected campaign progression missing: '+stable);
console.log('v0.9.6.6 navigator compatibility checks passed inside current release');

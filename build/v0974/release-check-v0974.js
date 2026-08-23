const fs=require('fs');
const path=require('path');
const root=path.resolve(__dirname,'../..');
const boot=fs.readFileSync(path.join(root,'app/core/bootstrap-v096.js'),'utf8');
const core=fs.readFileSync(path.join(root,'app/core/core-runtime-v0958.js'),'utf8');
const buildCore=fs.readFileSync(path.join(root,'build/v0958/build-core-v0958.js'),'utf8');
const transform=fs.readFileSync(path.join(root,'build/v0974/transform-v0974.js'),'utf8');
const update=fs.readFileSync(path.join(root,'update-v0974.js'),'utf8');
const css=fs.readFileSync(path.join(root,'update-v0974.css'),'utf8');

for(const marker of ["const BUILD='0.9.7.4'","const ASSET='0974'","const SAVE_KEY='fightArenaV08'","'update-v0973.js'","'update-v0974.js'",'core-runtime-v0958.js'])if(!boot.includes(marker))throw new Error('v0.9.7.4 bootstrap marker missing: '+marker);
for(const marker of ["const t974=require('../v0974/transform-v0974.js')",'t974(t973(','patch:\'0.9.7.4\''])if(!buildCore.includes(marker))throw new Error('v0.9.7.4 core-build marker missing: '+marker);

for(const marker of ["id:'iron-hulkbuster'","name:'Hulkbuster'","rarity:'MYTHIC',price:250","cls:'skin-iron-hulkbuster'","hp:175,power:98,speed:48,punch:16,kick:23,special:68","specialName:'Veronica Crashdown'",'HEAVY ARMOR • 18% DAMAGE REDUCTION','activeStats:name=>activeFighterStats(name)',"Math.round(n*.82)",'HULKBUSTER SLAM','MICRO MISSILE SWARM','REPULSOR BARRAGE','VERONICA CRASHDOWN!','hulkbuster-slamfx','veronica-crashfx'])if(!core.includes(marker))throw new Error('Hulkbuster generated-core marker missing: '+marker);
for(const marker of ['Hulkbuster kit + variant stats','Hulkbuster skin','active variant stats API','Combat active stats','Hulkbuster Heavy Armor','Hulkbuster abilities','Veronica Crashdown special','Hulkbuster transient cleanup'])if(!transform.includes(marker))throw new Error('v0.9.7.4 transform marker missing: '+marker);
for(const marker of ['window.MultiverseArenaUpdate0974','Hulkbuster • 250 Diamonds • Veronica Crashdown','decorateHulkbuster','updateFighterStats','BUY & EQUIP • 250 💎','VERONICA IS ONLINE.'])if(!update.includes(marker))throw new Error('v0.9.7.4 runtime marker missing: '+marker);
for(const marker of ['.fighter.ironman.skin-iron-hulkbuster','width:132px;height:190px','hulkbuster-slamfx','projectile.hulkbuster-missile','projectile.hulkbuster-repulsor','veronica-target','veronica-crashfx','hulkbuster-card-v0974','prefers-reduced-motion'])if(!css.includes(marker))throw new Error('v0.9.7.4 premium CSS marker missing: '+marker);

for(const stable of ["version:'0.9.5.7'","name:'Doctor Octopus'",'FightArenaTrainingControls','FightArenaDailyControls','DAILY_REWARD_COINS=1250','DAILY_COOLDOWN_MS=24*60*60*1000','punisherUnlockShown','primo-super-leap','PRIMO SMASH!','mystiqueTransform','sabreApex','deadpoolLastStand','magnetoMaster',"hp:105,power:60,speed:64",'hp:345,dmg:1.47','F.deadpoolRecovered<78'])if(!core.includes(stable))throw new Error('protected gameplay marker missing: '+stable);
for(const forbidden of ['localStorage.removeItem(\'fightArenaV08\')','fightArenaV0974','new MutationObserver','requestAnimationFrame(loop)','setInterval('])if(update.includes(forbidden)||transform.includes(forbidden))throw new Error('unsafe v0.9.7.4 runtime marker: '+forbidden);
console.log('v0.9.7.4 Hulkbuster Premium Variant checks passed');

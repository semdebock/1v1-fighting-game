const fs=require('fs');
const path=require('path');
const root=path.resolve(__dirname,'../..');
const boot=fs.readFileSync(path.join(root,'app/core/bootstrap-v096.js'),'utf8');
const core=fs.readFileSync(path.join(root,'app/core/core-runtime-v0958.js'),'utf8');
const buildCore=fs.readFileSync(path.join(root,'build/v0958/build-core-v0958.js'),'utf8');
const transform=fs.readFileSync(path.join(root,'build/v0972/transform-v0972.js'),'utf8');
const update97=fs.readFileSync(path.join(root,'update-v097.js'),'utf8');
const update971=fs.readFileSync(path.join(root,'update-v0971.js'),'utf8');
const update972=fs.readFileSync(path.join(root,'update-v0972.js'),'utf8');
const css972=fs.readFileSync(path.join(root,'update-v0972.css'),'utf8');
const campaign=fs.readFileSync(path.join(root,'campaign-v097.js'),'utf8');

for(const marker of ["const BUILD='0.9.7.2'","const ASSET='0972'","const SAVE_KEY='fightArenaV08'","'campaign-v097.js'","'update-v0971.js'","'update-v0972.js'",'core-runtime-v0958.js'])if(!boot.includes(marker))throw new Error('v0.9.7.2 bootstrap marker missing: '+marker);
for(const marker of ["const t972=require('../v0972/transform-v0972.js')",'t972(t97(','patch:\'0.9.7.2\''])if(!buildCore.includes(marker))throw new Error('v0.9.7.2 core-build marker missing: '+marker);

/* Buffed fighters. */
for(const marker of ["'Rookie':{cls:'rookie',rank:'B RANK • STREET',arenaRank:'B',powerClass:'STREET',role:'BALANCED',hp:105,power:60,speed:64,price:0,punch:9,kick:14,special:28", "'Captain America':{cls:'captain',rank:'A+ RANK • ENHANCED',arenaRank:'A+',powerClass:'ENHANCED',role:'TACTICAL',hp:120,power:82,speed:68,price:2600,punch:11,kick:15,special:30", "'Daredevil':{cls:'daredevil',rank:'A RANK • STREET',arenaRank:'A',powerClass:'STREET',role:'COUNTER',hp:100,power:70,speed:90,price:1800,punch:10,kick:14,special:34", "playerProjectile('shieldshot',13,4,4,true", "damageEnemy(16,5)", "playerProjectile('billyclub',12,4.25,4,true)", "damageEnemy(14,5,true)", "damageEnemy(i===3?16:6"])if(!core.includes(marker))throw new Error('fighter buff missing from generated core: '+marker);

/* Phase 3 fairness tuning. */
for(const marker of ["name:'Juggernaut'",'hp:345,dmg:1.47',"Math.round(n*.80)","function juggCharge(power=27", "juggCharge(31,'I’M THE JUGGERNAUT')", "F.ai1=2.65+Math.random()*1.05", "name:'Deadpool'",'hp:270,dmg:1.36','F.eh=36;deadpoolLastStand()','LAST STAND • 36 HP','F.deadpoolRecovered<78','t-(F.enemyLastDamageAt||0)>1200','F.ai2=5.1+Math.random()*1.3',"name:'Magneto'",'hp:365,dmg:1.53','F.magnetoPhase>=3?21:F.magnetoPhase>=2?18:16','F.magnetoPhase>=3?700:880','performance.now()-F.magUltimateAt>9400'])if(!core.includes(marker))throw new Error('Phase 3 balance marker missing from generated core: '+marker);

for(const marker of ['Rookie buff','Captain America buff','Daredevil buff','Juggernaut armor fairness','Deadpool regeneration cap','Magneto ultimate cadence'])if(!transform.includes(marker))throw new Error('v0.9.7.2 transform marker missing: '+marker);
for(const legacy of [update97,update971])if(!legacy.includes('const ownsRelease='))throw new Error('older v0.9.7 layer can overwrite v0.9.7.2');
for(const marker of ['window.MultiverseArenaUpdate0972','Fighter Buffs • Phase 3 Nerfs • Combat Polish','balance:BALANCE','SAME IDENTITIES. CLEANER BALANCE.','dataset.balanceRelease'])if(!update972.includes(marker))throw new Error('v0.9.7.2 UI marker missing: '+marker);
for(const marker of ['font-variant-numeric:tabular-nums','max-width:min(72vw,340px)','transition:width .11s linear','result-action-stack-v0971','prefers-reduced-motion'])if(!css972.includes(marker))throw new Error('v0.9.7.2 polish CSS marker missing: '+marker);
for(const marker of ["id:'phase3'",'Sabretooth','Mystique','Juggernaut','Deadpool','Magneto','window.FightArenaCampaignV097'])if(!campaign.includes(marker))throw new Error('Phase 3 campaign marker missing: '+marker);
for(const stable of ["version:'0.9.5.7'","name:'Doctor Octopus'",'FightArenaTrainingControls','punisherUnlockShown',"name:'Ultron'","name:'Prowler'",'primo-super-leap','PRIMO SMASH!','mystiqueTransform','sabreApex','deadpoolLastStand','magnetoMaster'])if(!core.includes(stable))throw new Error('protected gameplay marker missing: '+stable);
for(const forbidden of ['new MutationObserver','setInterval(','requestAnimationFrame(loop)','localStorage.removeItem(\'fightArenaV08\')','fightArenaV0972'])if(update972.includes(forbidden)||css972.includes(forbidden))throw new Error('v0.9.7.2 unsafe runtime marker: '+forbidden);
console.log('v0.9.7.2 combat balance + Phase 3 polish checks passed');

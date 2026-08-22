const fs=require('fs');
const path=require('path');
const src=fs.readFileSync(path.resolve(__dirname,'../../campaign-v0954.js'),'utf8');
for(const marker of [
 "Electro:{lesson:'MOBILITY UNDER FIRE'",
 "fights:[{name:'Mysterio',slot:3,built:true,assigned:true},{name:'Green Goblin',slot:4,built:true,assigned:true}]",
 "phase2Order=['Rhino','Electro'];",
 "function rawPowerComplete(){return phase2Order.every(won)}",
 "`${cleared}/2 RAW POWER`",
 "section.name==='RAW POWER'",
 "window.FightArenaCampaignV0954={ok:true",
 "window.FightArena?.version==='0.9.5.4'"
])if(!src.includes(marker))throw new Error('v0.9.5.6 campaign base marker missing: '+marker);
const wrapper=fs.readFileSync(path.resolve(__dirname,'../../campaign-v0956.js'),'utf8');
for(const marker of [
 "phase2Order=['Rhino','Electro','Mysterio','Green Goblin']",'smokeChaosComplete',"Mysterio:{lesson:'ILLUSION CONTROL'","'Green Goblin':{lesson:'AERIAL CHAOS'",'Glider Rush','Bomb Barrage','Razor Bat','FightArenaCampaignV0956','v0.9.5.6','GOBLIN REWORK'
])if(!wrapper.includes(marker))throw new Error('v0.9.5.6 wrapper marker missing: '+marker);
console.log('v0.9.5.6 campaign adapter markers ready');

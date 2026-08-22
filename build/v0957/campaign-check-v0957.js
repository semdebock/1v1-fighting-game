const fs=require('fs');
const path=require('path');
const src=fs.readFileSync(path.resolve(__dirname,'../../campaign-v0957.js'),'utf8');
for(const marker of [
 "'Doctor Octopus':{lesson:'TENTACLE DISCIPLINE'",
 "fights:[{name:'Doctor Octopus',slot:5,built:true,boss:true}]",
 "phase2Order=['Rhino','Electro','Mysterio','Green Goblin','Doctor Octopus']",
 'phase2Complete(){return phase2Order.every(won)}',
 "'Doctor Octopus':'1400 🪙 • 260 XP • 10 💎'",
 'node-resource','MASTER PLAN','FightArenaCampaignV0957','MULTIVERSE ARENA v0.9.5.7'
])if(!src.includes(marker))throw new Error('v0.9.5.7 campaign marker missing: '+marker);
console.log('v0.9.5.7 campaign markers ready');

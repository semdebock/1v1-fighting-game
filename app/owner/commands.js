/* Multiverse Arena Owner command service v0.9.7.7.4 */
(()=>{
'use strict';
const root=window.MultiverseArenaModules=window.MultiverseArenaModules||{};
const storage=()=>root.ownerStorage;
const campaign=()=>window.FightArenaCampaignV097||window.FightArenaCampaignV0957;
const controls=()=>window.FightArenaCampaignControls;
const fighters=()=>Object.keys(window.FightArena?.chars||{}).filter(Boolean);
const villains=()=>campaign()?.order||[];
function unlockOwner(){const s=storage().readSave();s.ownerBoardUnlocked=true;s.redeemedOwnerBoard=true;storage().writeSave(s);return s}
function setSelectedHero(name){const s=storage().readSave();s.selected=name;s.selectedFighter=name;s.selectedChar=name;s.ownerBoardUnlocked=true;storage().writeSave(s);window.FightArena?.selectChar?.(name);window.FightArena?.selectFighter?.(name);return name}
function launchFight(hero,villain){if(!villain)return false;if(hero)setSelectedHero(hero);controls()?.start?.(villain);return true}
function toggleFlag(key){const f=storage().readFlags();f[key]=!f[key];storage().writeFlags(f);return f[key]}
function setFlag(key,value){const f=storage().readFlags();f[key]=value;storage().writeFlags(f);return value}
function saveSlot(n){const all=storage().readSlots();all[n]={savedAt:new Date().toISOString(),save:storage().readSave()};storage().writeSlots(all);return all[n]}
function loadSlot(n){const x=storage().readSlots()[n];if(!x?.save)return false;const s=typeof structuredClone==='function'?structuredClone(x.save):JSON.parse(JSON.stringify(x.save));s.ownerBoardUnlocked=true;storage().writeSave(s);return true}
function deleteSlot(n){const all=storage().readSlots();delete all[n];storage().writeSlots(all);return true}
function preset(kind){const s=storage().readSave();if(kind==='fresh')return storage().writeSave({ownerBoardUnlocked:true,redeemedOwnerBoard:true});if(kind==='mid'){s.lv=Math.max(10,Number(s.lv)||1);s.coins=Math.max(7500,Number(s.coins)||0);s.gems=Math.max(50,Number(s.gems)||0);s.unlocked=Math.max(10,Number(s.unlocked)||1)}else if(kind==='complete'){s.lv=Math.max(50,Number(s.lv)||1);s.coins=Math.max(50000,Number(s.coins)||0);s.gems=Math.max(500,Number(s.gems)||0);s.unlocked=20;s.owned=s.owned||{};fighters().forEach(n=>s.owned[n]=true);s.campaignWins=s.campaignWins||{};villains().forEach(n=>s.campaignWins[n]=true)}s.ownerBoardUnlocked=true;return storage().writeSave(s)}
function dailyReset(){const s=storage().readSave();for(const k of Object.keys(s))if(/daily|reward.*time|last.*claim/i.test(k))delete s[k];s.ownerBoardUnlocked=true;return storage().writeSave(s)}
root.ownerCommands={unlockOwner,setSelectedHero,launchFight,toggleFlag,setFlag,saveSlot,loadSlot,deleteSlot,preset,dailyReset,fighters,villains};
})();
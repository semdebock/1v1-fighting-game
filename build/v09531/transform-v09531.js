/* Fight Arena v0.9.5.3.1 — Result Flow & Unlock Polish transform */
(function(root,factory){
 const transform=factory();
 if(typeof module==='object'&&module.exports)module.exports=transform;
 root.FightArenaTransformV09531=transform;
})(typeof window!=='undefined'?window:globalThis,function(){
'use strict';
return function transformV09531(code){
 const rep=(from,to,label)=>{if(!code.includes(from))throw new Error('v0.9.5.3.1 transform marker missing: '+label);code=code.replace(from,to)};
 rep('/* Fight Arena v0.9.5.3 — Vigilante Line */','/* Fight Arena v0.9.5.3.1 — Result Flow & Unlock Polish */','header');
 rep("window.FightArena={version:'0.9.5.3'","window.FightArena={version:'0.9.5.3.1'",'version');
 rep("s.coreVersion='0.9.5.3'","s.coreVersion='0.9.5.3.1'",'save version');
 rep('redeemedDiamonds:false,campaignWins:{},campaignPhaseRewards:{prologue:false},ownerGodUnlocked:false','redeemedDiamonds:false,campaignWins:{},campaignPhaseRewards:{prologue:false},punisherUnlockShown:false,ownerGodUnlocked:false','unlock animation save flag');
 rep("if(s.campaignWins.Punisher){s.owned.Punisher=true;s.skinsOwned['punisher-default']=true;s.equippedSkins.Punisher='punisher-default'}","if(s.campaignWins.Punisher){s.owned.Punisher=true;s.skinsOwned['punisher-default']=true;s.equippedSkins.Punisher='punisher-default'}if((raw.campaignWins?.Punisher||raw.owned?.Punisher)&&raw.punisherUnlockShown===undefined)s.punisherUnlockShown=true",'unlock animation migration');

 const resultHelpers=`\nconst RESULT_CAMPAIGN_ORDER=['Nightfang','Voltage','Razor','Titan','Arena Champion','Crossbones','Bullseye','Punisher','Taskmaster','Kingpin'];
function campaignNextName(name){const i=RESULT_CAMPAIGN_ORDER.indexOf(name);return i>=0&&i<RESULT_CAMPAIGN_ORDER.length-1?RESULT_CAMPAIGN_ORDER[i+1]:null}
function showPunisherUnlock(){
 const host=$('results');if(!host||host.querySelector('.fighter-unlock-reveal'))return;
 const d=document.createElement('div');d.className='fighter-unlock-reveal';
 d.innerHTML='<div class="unlock-sparks">'+('<i></i>'.repeat(10))+'</div><div class="fighter-unlock-card"><small>COLLECTION UPDATED</small><div class="unlock-portrait">'+previewMarkup('Punisher')+'</div><strong>PUNISHER UNLOCKED</strong><span>Frank Castle is now playable in your Collection.</span><b>🔓 CAMPAIGN FIGHTER</b></div>';
 host.appendChild(d);requestAnimationFrame(()=>d.classList.add('show'));setTimeout(()=>{d.classList.add('leaving');setTimeout(()=>d.remove(),420)},2600)
}
function clearFightTouchLock(){document.documentElement.classList.remove('fight-touch-lock');document.body?.classList.remove('fight-touch-lock')}
`;
 rep('function stopFightTimers(){',resultHelpers+'function stopFightTimers(){','result helpers');
 rep("let phaseBonusText='',fighterUnlockText='';save.coins+=coins;","let phaseBonusText='',fighterUnlockText='',punisherFirstUnlock=false;save.coins+=coins;",'unlock state');
 rep("if(win&&l.name==='Punisher'&&!save.owned.Punisher){save.owned.Punisher=true;save.skinsOwned['punisher-default']=true;save.equippedSkins.Punisher='punisher-default';fighterUnlockText=' • 🔓 PUNISHER UNLOCKED'}","if(win&&l.name==='Punisher'&&!save.owned.Punisher){save.owned.Punisher=true;save.skinsOwned['punisher-default']=true;save.equippedSkins.Punisher='punisher-default';punisherFirstUnlock=!save.punisherUnlockShown;save.punisherUnlockShown=true;fighterUnlockText=' • 🔓 PUNISHER UNLOCKED'}",'one time punisher reveal');
 rep("$('results').className='screen result active '+(win?'victory':'defeat');","screen('results');$('results').className='screen result active '+(win?'victory':'defeat');clearFightTouchLock();",'clean result screen transition');
 rep("+phaseBonusText+fighterUnlockText;F=null","+phaseBonusText+fighterUnlockText;if(punisherFirstUnlock)showPunisherUnlock();window.__FightArenaLastResult={name:l.name,win:!!win};const resultNext=campaignNextName(l.name);if($('continue')){$('continue').textContent=win&&resultNext?'NEXT FIGHT':'CAMPAIGN';$('continue').disabled=false}F=null",'result state and reveal');
 rep("$('continue').onclick=()=>{chosenLevel=clamp(save.unlocked,1,LEVELS.length);renderLevels();renderLevelInfo();screen('levels')};$('menu').onclick=()=>screen('home');","$('continue').onclick=()=>{const moved=window.__FightArenaLastResult?.win&&window.FightArenaCampaignControls?.next?.();if(!moved){chosenLevel=clamp(save.unlocked,1,LEVELS.length);renderLevels();renderLevelInfo();screen('levels')}};$('menu').onclick=()=>{document.querySelector('.fighter-unlock-reveal')?.remove();clearFightTouchLock();screen('home')};",'result buttons');
 rep("rematch(){const name=window.__FightArenaLastCampaignFight,idx=LEVELS.findIndex(l=>l.name===name);if(!name||idx<0||F&&!F.over)return false;chosenLevel=idx+1;startFight(false,save.selected);return true},\n last(){return window.__FightArenaLastCampaignFight||null},","rematch(){const name=window.__FightArenaLastCampaignFight,idx=LEVELS.findIndex(l=>l.name===name);if(!name||idx<0||F&&!F.over)return false;document.querySelector('.fighter-unlock-reveal')?.remove();chosenLevel=idx+1;startFight(false,save.selected);return true},\n next(){const current=window.__FightArenaLastCampaignFight,name=campaignNextName(current),idx=LEVELS.findIndex(l=>l.name===name);if(!window.__FightArenaLastResult?.win||!name||idx<0||F&&!F.over)return false;window.__FightArenaLastCampaignFight=name;chosenLevel=idx+1;startFight(false,save.selected);return true},\n last(){return window.__FightArenaLastCampaignFight||null},\n lastResult(){return window.__FightArenaLastResult?{...window.__FightArenaLastResult}:null},",'next fight campaign bridge');
 rep('// v0.9.5.3 public control bridge','// v0.9.5.3.1 public control bridge','control bridge comment');
 return code;
};
});

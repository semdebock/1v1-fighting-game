/* Multiverse Arena v0.9.7.3 — Collection UX + True 24H Daily Reward */
(function(root,factory){
 const transform=factory();
 if(typeof module==='object'&&module.exports)module.exports=transform;
 root.FightArenaTransformV0973=transform;
})(typeof window!=='undefined'?window:globalThis,function(){
'use strict';
return function transformV0973(code){
 const rep=(from,to,label)=>{if(!code.includes(from))throw new Error('v0.9.7.3 transform marker missing: '+label);code=code.replace(from,to)};

 /* Save migration: retain the legacy calendar field, but move enforcement to a real timestamp. */
 rep('dailyClaimDate:null,redeemedBrandNewDay:false','dailyClaimDate:null,dailyClaimAt:0,redeemedBrandNewDay:false','daily timestamp save field');
 rep("s.unlocked=clamp(Number.isFinite(+s.unlocked)?Math.floor(+s.unlocked):1,1,LEVELS.length);s.ownerGodUnlocked=!!s.ownerGodUnlocked;", "s.dailyClaimAt=Number.isFinite(+s.dailyClaimAt)?Math.max(0,Math.floor(+s.dailyClaimAt)):0;if(!s.dailyClaimAt&&s.dailyClaimDate===localDay()){s.dailyClaimAt=Date.now();try{localStorage.setItem(SAVE_KEY,JSON.stringify({...raw,dailyClaimAt:s.dailyClaimAt}))}catch{}}s.unlocked=clamp(Number.isFinite(+s.unlocked)?Math.floor(+s.unlocked):1,1,LEVELS.length);s.ownerGodUnlocked=!!s.ownerGodUnlocked;", 'legacy daily migration');

 const dailyHelpers=`
const DAILY_REWARD_COINS=1250,DAILY_COOLDOWN_MS=24*60*60*1000;
function dailyRemainingMs(){const stamp=Number(save.dailyClaimAt)||0;return stamp?Math.max(0,DAILY_COOLDOWN_MS-(Date.now()-stamp)):0}
function dailyTimeText(ms){const total=Math.max(0,Math.ceil(ms/1000)),h=Math.floor(total/3600),m=Math.floor((total%3600)/60),s=total%60;return String(h).padStart(2,'0')+':'+String(m).padStart(2,'0')+':'+String(s).padStart(2,'0')}
function claimDailyReward(){const left=dailyRemainingMs();if(left>0)return toast('DAILY REWARD READY IN '+dailyTimeText(left));save.dailyClaimAt=Date.now();save.dailyClaimDate=localDay();save.coins+=DAILY_REWARD_COINS;persist();window.dispatchEvent(new Event('fightarena-daily-updated'));toast('+1,250 COINS 🪙 • NEXT IN 24H')}
`;
 rep("function bindClick(id,fn){const el=$(id);if(!el){console.warn('[v0.9.1] missing button',id);return}el.onclick=fn}", dailyHelpers+"function bindClick(id,fn){const el=$(id);if(!el){console.warn('[v0.9.1] missing button',id);return}el.onclick=fn}", 'daily helpers');

 rep("$('daily').onclick=()=>{const day=localDay();if(save.dailyClaimDate===day)return toast('Daily reward already claimed today');save.dailyClaimDate=day;save.coins+=250;persist();toast('+250 coins 🪙')};", "$('daily').onclick=claimDailyReward;", '24 hour daily claim handler');

 rep("window.FightArenaTrainingControls={", "window.FightArenaDailyControls={reward:DAILY_REWARD_COINS,cooldownMs:DAILY_COOLDOWN_MS,snapshot(){const remainingMs=dailyRemainingMs();return{reward:DAILY_REWARD_COINS,cooldownMs:DAILY_COOLDOWN_MS,remainingMs,ready:remainingMs<=0,lastClaimAt:Number(save.dailyClaimAt)||0,nextClaimAt:(Number(save.dailyClaimAt)||0)+DAILY_COOLDOWN_MS,timeText:dailyTimeText(remainingMs)}}};\nwindow.FightArenaTrainingControls={", 'daily public control bridge');

 return code;
};
});

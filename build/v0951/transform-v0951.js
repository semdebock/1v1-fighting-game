/* Fight Arena v0.9.5.1 — Neo City Arena Expansion transform */
(function(root,factory){
 const transform=factory();
 if(typeof module==='object'&&module.exports)module.exports=transform;
 root.FightArenaTransformV0951=transform;
})(typeof window!=='undefined'?window:globalThis,function(){
'use strict';
return function transformV0951(code){
 const rep=(from,to,label)=>{if(!code.includes(from))throw new Error('v0.9.5.1 transform marker missing: '+label);code=code.replace(from,to)};
 rep('/* Fight Arena v0.9.5 — Campaign Phases Foundation */','/* Fight Arena v0.9.5.1 — Neo City Arena Expansion */','header');
 rep("window.FightArena={version:'0.9.5'","window.FightArena={version:'0.9.5.1'",'version');
 rep("s.coreVersion='0.9.5'","s.coreVersion='0.9.5.1'",'save version');
 rep('redeemedDiamonds:false,ownerGodUnlocked:false','redeemedDiamonds:false,campaignWins:{},campaignPhaseRewards:{prologue:false},ownerGodUnlocked:false','campaign save defaults');
 rep("s.equippedSkins={...DEFAULT_SKIN_BY_HERO,...(raw.equippedSkins||{})};","s.equippedSkins={...DEFAULT_SKIN_BY_HERO,...(raw.equippedSkins||{})};s.campaignWins={...(raw.campaignWins||{})};s.campaignPhaseRewards={prologue:false,...(raw.campaignPhaseRewards||{})};if((+raw.unlocked||1)>1)s.campaignWins.Nightfang=true;",'campaign save merge');
 rep('coins:100,xp:25,gems:0','coins:150,xp:25,gems:0','nightfang reward');
 const neoLevels=`{n:7,name:'Voltage',cls:'voltage',diff:'Easy+',role:'NEON TECH RUNNER',hp:110,dmg:.92,coins:200,xp:35,gems:0,desc:'A fast Neo City show-off using stolen capacitor gauntlets. Learn to close distance while dodging Spark Shots.'},
{n:8,name:'Razor',cls:'razor',diff:'Rookie+',role:'BLADE RUSHDOWN',hp:120,dmg:1,coins:250,xp:45,gems:0,desc:'A crimson underground duelist who pressures with twin blades, leap attacks and fast close-range strings.'},
{n:9,name:'Titan',cls:'titan',diff:'Challenger',role:'ARMORED BRUISER',hp:160,dmg:1.05,coins:300,xp:60,gems:0,desc:'The Arena wall. Titan is slow and readable, but his reinforced gauntlets, charge and ground slam punish impatience.'},
{n:10,name:'Arena Champion',cls:'arenachampion',diff:'PROLOGUE BOSS',role:'REIGNING CHAMPION • BOSS',hp:210,dmg:1.12,coins:500,xp:100,gems:5,boss:true,desc:'Neo City’s reigning champion combines speed, power and ranged pressure. Survive Champion Mode to clear the Prologue.'}`;
 rep('];\nconst TRAINING_DUMMY=',','+neoLevels+'\n];\nconst TRAINING_DUMMY=','neo levels');
 const neoHelpers=`\nconst NEO_INTROS={
 Nightfang:['FIRST BLOOD','Move, strike and learn the rhythm. Your first Arena win starts here.'],
 Voltage:['READ THE RANGE','Not every rival fights up close. Move through the sparks and punish the opening.'],
 Razor:['CONTROL THE PRESSURE','Razor attacks fast. Block, create space and answer when his rush ends.'],
 Titan:['PATIENCE BEATS POWER','Titan hits hard but commits to every swing. Make him miss, then counter.'],
 'Arena Champion':['FINAL EXAM','Everything you learned matters now. Beat the Champion and earn your place in Neo City.']
};
function neoIntro(name){const data=NEO_INTROS[name];if(!data||!F)return;F.enemyAtk=Math.max(F.enemyAtk,2.15);F.ai1=Math.max(F.ai1,2.8);F.ai2=Math.max(F.ai2,3.8);const d=document.createElement('div');d.className='neo-intro';d.innerHTML=\`<small>NEO CITY ARENA • PROLOGUE</small><strong>\${data[0]}</strong><span>\${data[1]}</span>\`;$('arena')?.appendChild(d);later(()=>d.remove(),2100)}
function voltageShot(){callout('SPARK SHOT');enemyProjectile('voltage-bolt',8,3.25,45)}
function voltageDash(){if(!F)return;callout('STATIC DASH');$('eF')?.classList.add('voltage-dash');F.ex=clamp(F.px+10,F.px+8,91);draw();later(()=>{if(F&&F.ex-F.px<14)damagePlayer(9,true,true);$('eF')?.classList.remove('voltage-dash')},150)}
function voltagePulse(){if(!F)return;callout('SHOCK PULSE');const p=fx('voltage-pulse',F.ex-4,40);later(()=>{if(F&&F.ex-F.px<23)damagePlayer(9,true,true)},130);later(()=>p.remove(),430)}
function razorTwin(){callout('TWIN SLASH');$('eF')?.classList.add('razor-combo');[80,190].forEach((ms,i)=>later(()=>{if(F&&F.ex-F.px<15)damagePlayer(i?6:5,i===1,true)},ms));later(()=>$('eF')?.classList.remove('razor-combo'),360)}
function razorLeap(){if(!F)return;callout('RAZOR LEAP');$('eF')?.classList.add('razor-leap');F.ex=clamp(F.px+9,F.px+8,91);draw();const s=fx('razor-slashfx',F.ex-2,37);later(()=>{if(F&&F.ex-F.px<14)damagePlayer(11,true,true)},150);later(()=>{s.remove();$('eF')?.classList.remove('razor-leap')},360)}
function razorSpin(){if(!F)return;callout('SPIN CUT');const s=fx('razor-spinfx',F.ex-3,38);later(()=>{if(F&&F.ex-F.px<18)damagePlayer(10,true,true)},130);later(()=>s.remove(),420)}
function titanHeavy(){callout('HEAVY SMASH');$('eF')?.classList.add('titan-smash');later(()=>{if(F&&F.ex-F.px<17)damagePlayer(13,true,true)},290);later(()=>$('eF')?.classList.remove('titan-smash'),450)}
function titanCharge(){if(!F)return;callout('ARMORED CHARGE');$('eF')?.classList.add('titan-charge');const start=F.ex,target=clamp(F.px+8,F.px+7,90);let n=0;const id=every(()=>{if(!F||F.over){clearInterval(id);intervalSet.delete(id);return}if(F.paused)return;n++;F.ex=start+(target-start)*(n/9);draw();if(F.ex-F.px<10){clearInterval(id);intervalSet.delete(id);damagePlayer(14,true,true);$('eF')?.classList.remove('titan-charge')}else if(n>=9){clearInterval(id);intervalSet.delete(id);$('eF')?.classList.remove('titan-charge')}},38)}
function titanGround(){if(!F)return;callout('GROUND SLAM');const w=fx('titan-wave',F.ex-8,61);later(()=>{if(F&&F.ex-F.px<29)damagePlayer(12,true,true)},190);later(()=>w.remove(),560)}
function championStrike(){callout('CHAMPION STRIKE');$('eF')?.classList.add('champion-strike');[90,220].forEach((ms,i)=>later(()=>{if(F&&F.ex-F.px<16)damagePlayer(i?9:6,i===1,true)},ms));later(()=>$('eF')?.classList.remove('champion-strike'),390)}
function championRush(){if(!F)return;callout('VICTORY RUSH');$('eF')?.classList.add('champion-rush');F.ex=clamp(F.px+9,F.px+8,91);draw();later(()=>{if(F&&F.ex-F.px<14)damagePlayer(F.championMode?15:12,true,true);$('eF')?.classList.remove('champion-rush')},180)}
function championWave(){callout('SHOCKWAVE KICK');enemyProjectile('champion-wave',F?.championMode?12:10,3.45,46)}
function championCrown(){if(!F)return;callout('CROWN OF THE ARENA');const c=fx('champion-crown',F.ex-5,34);[100,220,370].forEach((ms,i)=>later(()=>{if(F&&F.ex-F.px<21)damagePlayer(i===2?13:6,i===2,true,true)},ms));later(()=>c.remove(),650)}\n`;
 rep('function mysterioClone(){',neoHelpers+'function mysterioClone(){','neo helpers');
 rep("const approach={1:9,2:8.2,3:10.2,4:8.8,5:7.2,6:11.2}[l.n]||9","const approach={1:9,2:8.2,3:10.2,4:8.8,5:7.2,6:11.2,7:10.5,8:12,9:6.5,10:9.5}[l.n]||9",'neo movement');
 const neoAI=`
 if(l.name==='Voltage'){if(F.ai1<=0){gap>16?voltageShot():voltageDash();F.ai1=2.5+Math.random()*1.4}if(F.ai2<=0&&gap<20){voltagePulse();F.ai2=5.5+Math.random()*1.5}}
 if(l.name==='Razor'){if(F.ai1<=0){gap>18?razorLeap():razorTwin();F.ai1=2.25+Math.random()*1.1}if(F.ai2<=0&&gap<18){razorSpin();F.ai2=5+Math.random()*1.4}}
 if(l.name==='Titan'){if(F.ai1<=0){gap>22?titanCharge():(Math.random()<.55?titanHeavy():titanGround());F.ai1=3.1+Math.random()*1.2}if(F.ai2<=0&&gap<27){titanGround();F.ai2=6+Math.random()*1.8}}
 if(l.name==='Arena Champion'){if(!F.championMode&&F.eh/F.em<=.45){F.championMode=true;$('eF')?.classList.add('champion-mode');callout('CHAMPION MODE');toast('BOSS PHASE 2 — CHAMPION MODE!');F.enemyAtk=.35;F.ai1=.7;F.ai2=1.4}if(F.ai1<=0){gap>20?championWave():(Math.random()<.52?championRush():championStrike());F.ai1=(F.championMode?1.55:2.35)+Math.random()*.9}if(F.ai2<=0){gap<23?championCrown():championWave();F.ai2=(F.championMode?3.5:5.2)+Math.random()*1.2}}
`;
 rep('\n}\nfunction stopFightTimers(){',neoAI+'\n}\nfunction stopFightTimers(){','neo ai');
 rep("screen('fight');draw();renderHeroActions();\n if(!training){","screen('fight');draw();renderHeroActions();if(!training&&NEO_INTROS[l.name])neoIntro(l.name);\n if(!training){",'neo intro trigger');
 rep('save.coins+=coins;save.gems+=gems;save.xp+=xp;','let phaseBonusText=\'\';save.coins+=coins;save.gems+=gems;save.xp+=xp;save.campaignWins=save.campaignWins||{};if(win)save.campaignWins[l.name]=true;save.campaignPhaseRewards=save.campaignPhaseRewards||{prologue:false};if(win&&l.name===\'Arena Champion\'&&!save.campaignPhaseRewards.prologue){save.campaignPhaseRewards.prologue=true;save.coins+=750;save.gems+=5;phaseBonusText=\' • 🏆 PROLOGUE COMPLETE +750 🪙 +5 💎\';}','campaign win rewards');
 rep("+(gems?` ${unlocked?'• ':''}💎 +${gems} BOSS DIAMONDS`:'');F=null","+(gems?` ${unlocked?'• ':''}💎 +${gems} BOSS DIAMONDS`:'')+phaseBonusText;F=null",'phase bonus result');
 const api=`\nwindow.FightArenaCampaignControls={
 start(name){const idx=LEVELS.findIndex(l=>l.name===name);if(idx<0||F&&!F.over)return false;chosenLevel=idx+1;startFight(false,save.selected);return true},
 won(name){return !!save.campaignWins?.[name]},
 phaseRewarded(id){return !!save.campaignPhaseRewards?.[id]},
 has(name){return LEVELS.some(l=>l.name===name)},
 get(name){const l=LEVELS.find(x=>x.name===name);return l?{...l}:null}
};\n`;
 rep("window.dispatchEvent(new Event('fightarena-controls-ready'));",api+"window.dispatchEvent(new Event('fightarena-controls-ready'));",'campaign controls');
 rep('// v0.9.5 public control bridge','// v0.9.5.1 public control bridge','control bridge comment');
 return code;
};
});

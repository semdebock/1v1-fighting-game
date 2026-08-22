/* Fight Arena v0.9.4 — Wakanda & Weapon X source transform */
(function(root,factory){
  const transform=factory();
  if(typeof module==='object'&&module.exports)module.exports=transform;
  root.FightArenaTransformV094=transform;
})(typeof window!=='undefined'?window:globalThis,function(){
'use strict';
return function transformV094(code){
  const rep=(from,to,label)=>{if(!code.includes(from))throw new Error('v0.9.4 transform marker missing: '+label);code=code.replace(from,to)};

  rep('/* Fight Arena v0.9.3 — Power & Balance Update */','/* Fight Arena v0.9.4 — Wakanda & Weapon X */','header');
  rep("window.FightArena={version:'0.9.3'","window.FightArena={version:'0.9.4'",'version');
  rep("s.coreVersion='0.9.3'","s.coreVersion='0.9.4'",'save version');

  rep("\n[OWNER]:{cls:'toaa'",
`\n'Black Panther':{cls:'blackpanther',rank:'A+ RANK • ENHANCED',arenaRank:'A+',powerClass:'ENHANCED',role:'KINETIC',hp:115,power:82,speed:86,price:3200,punch:11,kick:15,special:30,specialName:'Kinetic Release',desc:'Wakandan king and kinetic specialist. Fast vibranium melee, explosive pounces and an absorb-and-release combat loop reward precise defense.'},\n'Wolverine':{cls:'wolverine',rank:'S RANK • SUPERHUMAN',arenaRank:'S',powerClass:'SUPERHUMAN',role:'REGEN / BERSERKER',hp:135,power:88,speed:75,price:4000,punch:12,kick:16,special:40,specialName:'Berserker Rage',desc:'Relentless adamantium brawler in his classic yellow-and-blue comic suit. Healing Factor rewards survival while claws dominate close range.'},\n[OWNER]:{cls:'toaa'`,'new heroes');

  rep("\n];\nconst DEFAULT_SKIN_BY_HERO=",
`\n,{id:'bp-default',hero:'Black Panther',name:'Vibranium Panther',rarity:'COMMON',price:0,cls:'',desc:'T’Challa’s sleek black-and-silver vibranium suit with panther mask, silver necklace and claw detailing.'},\n{id:'bp-kinetic',hero:'Black Panther',name:'Kinetic Panther',rarity:'LEGENDARY',price:80,cls:'skin-bp-kinetic',variant:'ABILITY VARIANT',desc:'A charged Wakandan Ability Variant with purple kinetic channels. Equipping it upgrades Black Panther to Kinetic Claw Wave, Vibranium Rush, Perfect Absorb and Kinetic Overdrive.'},\n{id:'wolverine-default',hero:'Wolverine',name:'Classic Yellow & Blue',rarity:'COMMON',price:0,cls:'',desc:'The iconic comic-inspired Wolverine look: bright yellow armor, blue shoulders and boots, pointed black mask and adamantium claws.'}\n];\nconst DEFAULT_SKIN_BY_HERO=`,'new skins');

  rep("'Moon Knight':'mk-default'}","'Moon Knight':'mk-default','Black Panther':'bp-default','Wolverine':'wolverine-default'}",'default skins');
  rep("'Daredevil':false,'Moon Knight':false,[OWNER]:false","'Daredevil':false,'Moon Knight':false,'Black Panther':false,'Wolverine':false,[OWNER]:false",'owned heroes');
  rep('redeemedBrandNewDay:false,ownerGodUnlocked:false','redeemedBrandNewDay:false,redeemedDiamonds:false,ownerGodUnlocked:false','diamond save flag');

  const godMarker=" if(code==='GODLIKE'){";
  if(!code.includes(godMarker))throw new Error('v0.9.4 transform marker missing: redeem');
  code=code.replace(godMarker," if(code==='DIAMONDS'){if(save.redeemedDiamonds){status.textContent='✓ CODE ALREADY REDEEMED';status.className='redeem-status used';return}save.gems+=100;save.redeemedDiamonds=true;persist();input.value='';status.textContent='✓ +100 DIAMONDS ADDED';status.className='redeem-status good';toast('+100 DIAMONDS 💎');return}\n"+godMarker);

  rep("chosen==='Iron Man'&&save.equippedSkins['Iron Man']==='iron-nano'?'Nanotech Arsenal':c.specialName",
      "chosen==='Iron Man'&&save.equippedSkins['Iron Man']==='iron-nano'?'Nanotech Arsenal':chosen==='Black Panther'&&save.equippedSkins['Black Panther']==='bp-kinetic'?'Kinetic Overdrive':c.specialName",'profile special');
  rep("trainingChosen==='Iron Man'&&save.equippedSkins['Iron Man']==='iron-nano'?'Nanotech Arsenal':c.specialName",
      "trainingChosen==='Iron Man'&&save.equippedSkins['Iron Man']==='iron-nano'?'Nanotech Arsenal':trainingChosen==='Black Panther'&&save.equippedSkins['Black Panther']==='bp-kinetic'?'Kinetic Overdrive':c.specialName",'training special');
  rep("h==='Iron Man'&&save.equippedSkins['Iron Man']==='iron-nano'?'Nanotech Arsenal':c.specialName",
      "h==='Iron Man'&&save.equippedSkins['Iron Man']==='iron-nano'?'Nanotech Arsenal':h==='Black Panther'&&save.equippedSkins['Black Panther']==='bp-kinetic'?'Kinetic Overdrive':c.specialName",'fight special');

  rep("const name=F.hero,nano=name==='Iron Man'&&save.equippedSkins['Iron Man']==='iron-nano',defs=",
      "const name=F.hero,nano=name==='Iron Man'&&save.equippedSkins['Iron Man']==='iron-nano',pantherKinetic=name==='Black Panther'&&save.equippedSkins['Black Panther']==='bp-kinetic',defs=",'ability variant flag');
  rep(":name==='Moon Knight'?[['🌙 CRESCENT DART'],['🦅 CAPE DIVE'],['🛡 MOON GUARD']]:name===OWNER?",
      ":name==='Moon Knight'?[['🌙 CRESCENT DART'],['🦅 CAPE DIVE'],['🛡 MOON GUARD']]:name==='Black Panther'?(pantherKinetic?[['💜 KINETIC CLAW WAVE'],['🐾 VIBRANIUM RUSH'],['◈ PERFECT ABSORB']]:[['🐾 VIBRANIUM CLAWS'],['⚡ PANTHER POUNCE'],['◈ KINETIC ABSORB']]):name==='Wolverine'?[['🗡 ADAMANTIUM SLASH'],['🐺 FERAL LUNGE'],['❤️ HEALING SURGE']]:name===OWNER?",'ability labels');

  rep("if(F.hero===OWNER)n=Math.max(1,Math.round(n*.12));",
`if(F.hero==='Black Panther'&&F.kineticGuard){const rate=F.kineticVariant?.25:.45,after=Math.max(1,Math.round(n*rate)),absorbed=Math.max(0,n-after);F.kinetic=clamp((F.kinetic||0)+absorbed*(F.kineticVariant?5:4),0,100);n=after;blockFx(F.px+3);$('pF')?.classList.add('kinetic-hit');later(()=>$('pF')?.classList.remove('kinetic-hit'),220)}\nif(F.hero===OWNER)n=Math.max(1,Math.round(n*.12));`,'kinetic absorb damage');
  rep("F.ph=clamp((Number.isFinite(F.ph)?F.ph:F.pm)-n,0,F.pm);floatDamage(n,'player');",
      "F.ph=clamp((Number.isFinite(F.ph)?F.ph:F.pm)-n,0,F.pm);F.lastDamageAt=performance.now();floatDamage(n,'player');",'damage timestamp');

  rep("else if(name==='Moon Knight'){if(i===0)",
`else if(name==='Black Panther'){const kinetic=save.equippedSkins['Black Panther']==='bp-kinetic';if(i===0){if(kinetic){setCd(0,1.45);playerProjectile('kinetic-claw-wave',14,4.9,4);F.kinetic=clamp(F.kinetic+5,0,100);toast('KINETIC CLAW WAVE!')}else{setCd(0,1.7);const slash=fx('bp-clawfx',F.px+6,39);[55,125,205].forEach((ms,j)=>later(()=>{if(F&&F.ex-F.px<17)damageEnemy(j===2?8:5,j===2?4:1,j===2)},ms));later(()=>slash.remove(),360);toast('VIBRANIUM CLAWS!')}}if(i===1){setCd(1,kinetic?3.4:3.8);if(F.ex-F.px>46)return toast('TOO FAR');F.invulnerable=true;$('pF').classList.add(kinetic?'vibranium-rush':'panther-pounce');F.px=clamp(F.ex-9,3,F.ex-7);F.jump=kinetic?28:22;draw();later(()=>{if(F){F.jump=0;F.invulnerable=false;if(F.ex-F.px<15){const bonus=kinetic?Math.min(5,Math.floor((F.kinetic||0)/20)):0;damageEnemy((kinetic?17:15)+bonus,7,true);if(kinetic)F.kinetic=clamp(F.kinetic-20,0,100)}}$('pF')?.classList.remove('vibranium-rush','panther-pounce')},270);toast(kinetic?'VIBRANIUM RUSH!':'PANTHER POUNCE!')}if(i===2){setCd(2,kinetic?5.5:6);F.kineticGuard=true;F.kineticVariant=kinetic;$('pF').classList.add(kinetic?'perfect-absorb':'kinetic-guard','blocking');later(()=>{if(F){F.kineticGuard=false;F.kineticVariant=false}$('pF')?.classList.remove('perfect-absorb','kinetic-guard','blocking')},kinetic?1750:1550);toast(kinetic?'PERFECT ABSORB!':'KINETIC ABSORB!')}}\n else if(name==='Wolverine'){if(i===0){setCd(0,1.5);const slash=fx('wolverine-slash',F.px+6,40);later(()=>{if(F&&F.ex-F.px<17)damageEnemy(14,4)},80);later(()=>slash.remove(),300);toast('ADAMANTIUM SLASH!')}if(i===1){setCd(1,4);if(F.ex-F.px>48)return toast('TOO FAR');$('pF').classList.add('feral-lunge');F.px=clamp(F.ex-9,3,F.ex-7);F.jump=24;draw();later(()=>{if(F){F.jump=0;if(F.ex-F.px<15)damageEnemy(18,8,true)}$('pF')?.classList.remove('feral-lunge')},260);toast('FERAL LUNGE!')}if(i===2){setCd(2,10);const heal=Math.min(12,F.pm-F.ph);if(heal<=0)return toast('HEALTH FULL');F.ph+=heal;F.healRecovered=(F.healRecovered||0)+heal;floatDamage(heal,'player',true);$('pF').classList.add('healing-surge');later(()=>$('pF')?.classList.remove('healing-surge'),700);draw();toast('HEALING SURGE!')}}\n else if(name==='Moon Knight'){if(i===0)`,'new hero abilities');

  rep("else if(name==='Moon Knight'){const moon=fx('khonshu-flash',0,0);",
`else if(name==='Black Panther'){const kinetic=save.equippedSkins['Black Panther']==='bp-kinetic',stored=clamp(F.kinetic||0,0,100),dmg=(kinetic?34:30)+Math.round(stored*(kinetic?.14:.10)),pulse=fx(kinetic?'kinetic-overdrive':'kinetic-release',F.px+5,35);F.kinetic=0;$('pF').classList.add(kinetic?'overdrive-cast':'release-cast');if(F.ex-F.px<43)later(()=>damageEnemy(dmg,11,true),150);else toast('GET CLOSER');later(()=>{pulse.remove();$('pF')?.classList.remove('overdrive-cast','release-cast')},650);toast(kinetic?'KINETIC OVERDRIVE!':'KINETIC RELEASE!')}\n else if(name==='Wolverine'){if(F.ex-F.px>34){F.px=clamp(F.ex-11,3,F.ex-7);draw()}const rage=fx('berserker-rage',F.px+4,35);$('pF').classList.add('berserker');[70,145,235,350].forEach((ms,j)=>later(()=>{if(F&&F.ex-F.px<18)damageEnemy(j===3?16:j===2?10:7,j===3?9:1,j===3)},ms));later(()=>{rage.remove();$('pF')?.classList.remove('berserker')},720);toast('BERSERKER RAGE!')}\n else if(name==='Moon Knight'){const moon=fx('khonshu-flash',0,0);`,'new hero specials');

  rep("counter:false,moonGuard:false,totalDamage:0",
      "counter:false,moonGuard:false,kinetic:0,kineticGuard:false,kineticVariant:h==='Black Panther'&&save.equippedSkins['Black Panther']==='bp-kinetic',healRecovered:0,lastDamageAt:performance.now(),healTickAt:performance.now(),totalDamage:0",'fight state');

  rep("screen('fight');draw();renderHeroActions();\n if(l.boss)",
`screen('fight');draw();renderHeroActions();\n if(!training){const introHero=document.createElement('div');introHero.className='fighter-intro';introHero.innerHTML=\`<small>\${c.arenaRank} RANK • \${c.powerClass}</small><strong>\${h.toUpperCase()}</strong><span>\${c.role}</span>\`;$('arena').appendChild(introHero);later(()=>introHero.remove(),1050)}\n if(l.boss)`,'fighter intro');

  rep("enemyLogic(dt);if(F.jump>0||F.jv>0)",
`enemyLogic(dt);if(F.hero==='Wolverine'&&F.ph<F.pm&&(F.healRecovered||0)<30&&performance.now()-(F.lastDamageAt||0)>3000&&performance.now()-(F.healTickAt||0)>900){F.ph=Math.min(F.pm,F.ph+1);F.healRecovered=(F.healRecovered||0)+1;F.healTickAt=performance.now();floatDamage(1,'player',true)}if(F.jump>0||F.jv>0)`,'wolverine passive');

  rep("$('trainingDps').textContent=(F.totalDamage/elapsed).toFixed(1)}}",
      "$('trainingDps').textContent=(F.totalDamage/elapsed).toFixed(1);const hl=$('trainingHeroStatLabel'),hv=$('trainingHeroStat');if(hl&&hv){if(F.hero==='Black Panther'){hl.textContent='KINETIC ENERGY';hv.textContent=Math.round(F.kinetic||0)+'%'}else if(F.hero==='Wolverine'){hl.textContent='HEALING RECOVERED';hv.textContent=Math.round(F.healRecovered||0)}else{hl.textContent='HERO SYSTEM';hv.textContent='—'}}}}",'training hero stat');

  rep("F.trainingStarted=performance.now();draw();toast('TRAINING RESET')",
      "F.trainingStarted=performance.now();F.kinetic=0;F.healRecovered=0;F.lastDamageAt=performance.now();F.healTickAt=performance.now();draw();toast('TRAINING RESET')",'training reset');

  const jumpOld="F.hero==='El Primo'?350:F.hero==='Spider-Man'?470:F.hero==='Daredevil'?450:F.hero==='Moon Knight'?410:F.hero===OWNER?520:390";
  const jumpNew="F.hero==='El Primo'?350:F.hero==='Spider-Man'?470:F.hero==='Daredevil'?450:F.hero==='Black Panther'?440:F.hero==='Moon Knight'?410:F.hero==='Wolverine'?400:F.hero===OWNER?520:390";
  if(code.split(jumpOld).length-1<2)throw new Error('v0.9.4 transform marker missing: jump controls');
  code=code.split(jumpOld).join(jumpNew);

  rep("// v0.9.3 public control bridge","// v0.9.4 public control bridge",'control bridge comment');

  return code;
};
});

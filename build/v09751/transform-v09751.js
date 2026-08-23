/* Multiverse Arena v0.9.7.5.1 — Skin Identity + True Boss Rewards */
(function(root,factory){
 const transform=factory();
 if(typeof module==='object'&&module.exports)module.exports=transform;
 root.FightArenaTransformV09751=transform;
})(typeof window!=='undefined'?window:globalThis,function(){
'use strict';
return function transformV09751(code){
 const rep=(from,to,label)=>{if(!code.includes(from))throw new Error('v0.9.7.5.1 transform marker missing: '+label);code=code.replace(from,to)};

 /* Every playable fighter always has a default suit equipped internally. Only a non-default equipped skin replaces the public fighter name. */
 rep("function previewMarkup(name,skinId=null){", "function equippedDisplaySkin(name){const id=save.equippedSkins[name],s=skinById(id),defaultId=DEFAULT_SKIN_BY_HERO[name];return s&&s.hero===name&&save.skinsOwned[id]&&defaultId&&id!==defaultId?s:null}\nfunction fighterDisplayName(name){return equippedDisplaySkin(name)?.name||name}\nwindow.FightArenaNameControls={display:name=>fighterDisplayName(name),skin:name=>equippedDisplaySkin(name)?.name||null,stats:name=>({...fighterStatsFor(name)})};\nfunction previewMarkup(name,skinId=null){", 'equipped skin display-name helper');
 rep("$('selectedName').textContent=save.selected.toUpperCase()", "$('selectedName').textContent=fighterDisplayName(save.selected).toUpperCase()", 'home selected skin name');
 rep("$('dashHero').textContent=save.selected.toUpperCase()", "$('dashHero').textContent=fighterDisplayName(save.selected).toUpperCase()", 'dashboard selected skin name');
 rep("${save.selected.toUpperCase()} SELECTED", "${fighterDisplayName(save.selected).toUpperCase()} SELECTED", 'Collection selected skin label');
 rep("fighters.sort((a,b)=>b[1].price-a[1].price).forEach(([name,c])=>{const b=document.createElement('button');b.className=", "fighters.sort((a,b)=>b[1].price-a[1].price).forEach(([name,c])=>{const b=document.createElement('button');b.dataset.fighterName=name;b.className=", 'fighter card base hero id');
 rep("<h3>${name.toUpperCase()}</h3><div class=\"fighter-role\">", "<h3>${fighterDisplayName(name).toUpperCase()}</h3><div class=\"fighter-role\">", 'fighter card equipped skin name');
 rep("$('charTitle').textContent=chosen.toUpperCase();", "$('charTitle').textContent=fighterDisplayName(chosen).toUpperCase();", 'fighter profile equipped skin name');
 rep("<h3>${name.toUpperCase()}</h3><small>READY TO TRAIN</small>", "<h3>${fighterDisplayName(name).toUpperCase()}</h3><small>READY TO TRAIN</small>", 'training card equipped skin name');
 rep("$('trainingHero').textContent=trainingChosen.toUpperCase()", "$('trainingHero').textContent=fighterDisplayName(trainingChosen).toUpperCase()", 'training selected skin name');
 rep("$('pname').textContent=h.toUpperCase();", "$('pname').textContent=fighterDisplayName(h).toUpperCase();", 'fight HUD skin name');
 rep("$('tagfighter').textContent=h.toUpperCase();", "$('tagfighter').textContent=fighterDisplayName(h).toUpperCase();", 'fight tag skin name');
 rep("<strong>${h.toUpperCase()}</strong><span>${c.role}</span>", "<strong>${fighterDisplayName(h).toUpperCase()}</strong><span>${c.role}</span>", 'fighter intro skin name');
 rep("$('ename').textContent='MYSTIQUE • '+F.hero.toUpperCase();", "$('ename').textContent='MYSTIQUE • '+fighterDisplayName(F.hero).toUpperCase();", 'Mystique mirrors equipped skin name');

 /* Premium currency is earned from boss fights only. Normalize legacy non-boss gem values and remove level-up gem grants. */
 rep("\n];\nconst TRAINING_DUMMY=", "\n];\nLEVELS.forEach(l=>{if(!l.boss)l.gems=0});\nconst TRAINING_DUMMY=", 'boss-only level gem normalization');
 rep("gems=win?(l.gems||0):0", "gems=win&&l.boss?(l.gems||0):0", 'boss-only fight gem payout');
 rep("while(save.xp>=100){save.xp-=100;save.lv++;save.coins+=150;save.gems+=5}", "while(save.xp>=100){save.xp-=100;save.lv++;save.coins+=150}", 'remove non-boss level-up gem grants');

 return code;
};
});

/* Fight Arena v0.9.4.1 — Combat Stability & Collection UI transform */
(function(root,factory){
  const transform=factory();
  if(typeof module==='object'&&module.exports)module.exports=transform;
  root.FightArenaTransformV0941=transform;
})(typeof window!=='undefined'?window:globalThis,function(){
'use strict';
return function transformV0941(code){
  const rep=(from,to,label)=>{if(!code.includes(from))throw new Error('v0.9.4.1 transform marker missing: '+label);code=code.replace(from,to)};
  rep('/* Fight Arena v0.9.4 — Wakanda & Weapon X */','/* Fight Arena v0.9.4.1 — Combat Stability & Collection UI */','header');
  rep("window.FightArena={version:'0.9.4'","window.FightArena={version:'0.9.4.1'",'version');
  rep("s.coreVersion='0.9.4'","s.coreVersion='0.9.4.1'",'save version');

  // Data used by the redesigned fighter profile. It is presentation-only and does not alter combat balance.
  const kits=`\nconst FIGHTER_KITS={
'Rookie':{abilities:['BALANCED FUNDAMENTALS','RELIABLE MELEE'],passive:'NO SPECIAL PASSIVE',special:'Arena Burst'},
'El Primo':{abilities:['HEAVY MELEE','TANK PRESSURE'],passive:'HIGH HEALTH POOL',special:'Primo Smash'},
'Spider-Man':{abilities:['Web Shot','Web Pull','Web Dodge'],passive:'ELITE MOBILITY',special:'Web Burst'},
'Captain America':{abilities:['Shield Throw','Shield Bash','Guard'],passive:'TACTICAL DEFENSE',special:'Avenger Strike'},
'Iron Man':{abilities:['Repulsor','Missile','Flight'],passive:'ARMORED RANGED CONTROL',special:'Unibeam'},
'Daredevil':{abilities:['Billy Club','Grapple Rush','Radar Counter'],passive:'COUNTER SPECIALIST',special:"Devil's Combo"},
'Moon Knight':{abilities:['Crescent Dart','Cape Dive','Moon Guard'],passive:'MYSTIC BRAWLER',special:'Vengeance of Khonshu'},
'Black Panther':{abilities:['Vibranium Claws','Panther Pounce','Kinetic Absorb'],passive:'KINETIC ENERGY',special:'Kinetic Release'},
'Wolverine':{abilities:['Adamantium Slash','Feral Lunge','Healing Surge'],passive:'HEALING FACTOR',special:'Berserker Rage'}
};
const VARIANT_KITS={
'iron-nano':{abilities:['Nano Cannon','Shoulder Barrage','Nano Wings'],passive:'WEAPONIZED NANOTECH',special:'Nanotech Arsenal'},
'bp-kinetic':{abilities:['Kinetic Claw Wave','Vibranium Rush','Perfect Absorb'],passive:'ENHANCED KINETIC STORAGE',special:'Kinetic Overdrive'}
};
function activeFighterKit(name){const skin=save?.equippedSkins?.[name],variant=VARIANT_KITS[skin];return variant||FIGHTER_KITS[name]||{abilities:['STANDARD COMBAT'],passive:'—',special:CHARS[name]?.specialName||'—'}}\n`;
  rep('const SKINS=[',kits+'const SKINS=[','fighter kit data');

  // Central arena cleanup: every fight starts and ends with a clean transient layer.
  const cleanup=`function cleanupArenaTransient(){
 const arena=$('arena');if(!arena)return;
 arena.querySelectorAll('#mystClone,.projectile,.impact,.blockfx,.ko-banner,.callout,.smoke,.wave,.divine-nova,.omni-warp,.absolute-decree,.dd-grapple,.khonshu-flash,.nano-arsenal,.bp-clawfx,.wolverine-slash,.berserker-rage,.kinetic-release,.kinetic-overdrive,.fighter-intro,.boss-intro').forEach(n=>n.remove());
 const e=$('eF'),p=$('pF');e?.classList.remove('cloaked','rage','hurt','enemy-punch','illusion');p?.classList.remove('hurt','specialing','kicking','punching','grapple-rush','cape-dive','kinetic-hit','perfect-absorb','kinetic-guard','vibranium-rush','panther-pounce','feral-lunge','healing-surge','berserker','overdrive-cast','release-cast');
}\n`;
  rep('function buzz(ms=20)',cleanup+'function buzz(ms=20)','arena cleanup');
  rep('function startFight(training=false,hero=null){stopFightTimers();closePause();','function startFight(training=false,hero=null){stopFightTimers();cleanupArenaTransient();closePause();','cleanup on start');
  rep('clearInterval(uiId);clearTracked();const l=F.level','clearInterval(uiId);clearTracked();cleanupArenaTransient();const l=F.level','cleanup on finish');
  rep("function leaveFight(dest='home'){stopFightTimers();F=null;closePause();","function leaveFight(dest='home'){stopFightTimers();cleanupArenaTransient();F=null;closePause();",'cleanup on leave');

  // Rich fighter profile with kit, passive, special and suit ownership count.
  const charStart=code.indexOf('function renderCharInfo(){');
  const charEnd=code.indexOf('function showCollectionTab',charStart);
  if(charStart<0||charEnd<0)throw new Error('v0.9.4.1 transform marker missing: fighter profile');
  const renderCharInfo=`function renderCharInfo(){
 const c=CHARS[chosen],kit=activeFighterKit(chosen),heroSkins=SKINS.filter(s=>s.hero===chosen),ownedSkins=heroSkins.filter(s=>save.skinsOwned[s.id]).length;
 $('charTitle').textContent=chosen.toUpperCase();$('charDesc').textContent=c.desc;
 $('charStats').innerHTML=\`<div><small>ARENA RANK</small>\${c.arenaRank}</div><div><small>POWER CLASS</small>\${c.powerClass}</div><div><small>ROLE</small>\${c.role}</div><div><small>PRICE</small>\${c.price?c.price.toLocaleString()+' 🪙':'STARTER'}</div><div><small>HEALTH</small>\${c.hp}</div><div><small>POWER</small>\${c.power}</div><div><small>SPEED</small>\${c.speed}</div><div><small>SUITS</small>\${ownedSkins}/\${heroSkins.length}</div>\`;
 let panel=$('fighterKitPanel');if(!panel){panel=document.createElement('div');panel.id='fighterKitPanel';panel.className='fighter-kit-panel';$('charStats').insertAdjacentElement('afterend',panel)}
 panel.innerHTML=\`<div class="kit-title"><div><small>COMBAT IDENTITY</small><b>\${c.role}</b></div><span>\${c.arenaRank} RANK • \${c.powerClass}</span></div><div class="kit-section"><small>ABILITIES</small><div class="kit-chips">\${kit.abilities.map(a=>\`<span>\${a}</span>\`).join('')}</div></div><div class="kit-bottom"><div><small>PASSIVE</small><b>\${kit.passive}</b></div><div><small>SPECIAL</small><b>\${kit.special}</b></div></div>\`;
 $('charAction').textContent=!save.owned[chosen]?\`BUY • \${c.price.toLocaleString()} 🪙\`:save.selected===chosen?'SELECTED':'SELECT';$('charAction').disabled=save.selected===chosen
}`;
  code=code.slice(0,charStart)+renderCharInfo+code.slice(charEnd);

  // Skins are grouped per hero instead of being one long list.
  const skinStart=code.indexOf('function renderSkins(){');
  const skinEnd=code.indexOf('function renderSkinInfo(){',skinStart);
  if(skinStart<0||skinEnd<0)throw new Error('v0.9.4.1 transform marker missing: skin groups');
  const renderSkins=`function renderSkins(){
 const box=$('skinCards');if(!box)return;box.innerHTML='';box.classList.add('skin-hero-groups');
 const heroes=[];RANK_ORDER.forEach(rank=>visibleChars().filter(([name,c])=>c.arenaRank===rank&&SKINS.some(s=>s.hero===name)).sort((a,b)=>b[1].price-a[1].price).forEach(([name])=>heroes.push(name)));
 heroes.forEach(hero=>{const list=SKINS.filter(s=>s.hero===hero),c=CHARS[hero],ownedCount=list.filter(s=>save.skinsOwned[s.id]).length,group=document.createElement('section');group.className='skin-hero-group';group.innerHTML=\`<div class="skin-hero-head"><div><small>\${c.arenaRank} RANK • \${c.role}</small><b>\${hero.toUpperCase()}</b></div><span>\${ownedCount}/\${list.length} SUITS OWNED</span></div><div class="skin-hero-grid"></div>\`;const grid=group.querySelector('.skin-hero-grid');
 list.forEach(s=>{const heroOwned=!!save.owned[s.hero],owned=!!save.skinsOwned[s.id],equipped=save.equippedSkins[s.hero]===s.id,type=s.variant?'ABILITY VARIANT':s.price===0?'DEFAULT SUIT':'COSMETIC SKIN',b=document.createElement('button');b.className=\`card skin-card rarity-\${s.rarity.toLowerCase()} \${skinChosen===s.id?'active ':''}\${!heroOwned?'hero-locked ':''}\${equipped?'equipped-skin ':''}\${s.variant?'ability-variant-card ':''}\`;b.innerHTML=\`<div class="skin-card-head"><span class="skin-type-chip \${s.variant?'variant':''}">\${s.variant?'⚡ ':''}\${type}</span><span class="skin-rarity-chip">\${s.rarity}</span></div><div class="portrait skin-portrait">\${previewMarkup(s.hero,s.id)}</div><h3>\${s.name.toUpperCase()}</h3><p class="skin-card-desc">\${s.variant?'Changes suit + abilities + special':s.price===0?'Included base appearance':'Appearance-only cosmetic'}</p><small>\${!heroOwned?'🔒 OWN HERO FIRST':equipped?'✓ EQUIPPED':owned?'OWNED':\`💎 \${s.price}\`}</small>\`;b.onclick=()=>{skinChosen=s.id;renderSkins();renderSkinInfo()};grid.appendChild(b)});
 box.appendChild(group)
 })
}`;
  code=code.slice(0,skinStart)+renderSkins+code.slice(skinEnd);

  const infoStart=code.indexOf('function renderSkinInfo(){');
  const infoEnd=code.indexOf('function renderTraining(){',infoStart);
  if(infoStart<0||infoEnd<0)throw new Error('v0.9.4.1 transform marker missing: skin profile');
  const renderSkinInfo=`function renderSkinInfo(){
 const s=skinById(skinChosen)||SKINS[0],heroOwned=!!save.owned[s.hero],owned=!!save.skinsOwned[s.id],equipped=save.equippedSkins[s.hero]===s.id,type=s.variant?'ABILITY VARIANT':s.price===0?'DEFAULT SUIT':'COSMETIC SKIN';
 $('skinTitle').textContent=s.name.toUpperCase();$('skinHero').textContent=s.hero.toUpperCase();$('skinRarity').textContent=\`\${s.rarity} • \${type}\`;$('skinDesc').textContent=s.desc;$('skinPreview').innerHTML=previewMarkup(s.hero,s.id);$('skinPrice').textContent=s.price?\`\${s.price} 💎\`:'INCLUDED';
 let info=$('skinTypeInfo');if(!info){info=document.createElement('div');info.id='skinTypeInfo';info.className='skin-type-info';$('skinDesc').insertAdjacentElement('afterend',info)}
 info.innerHTML=s.variant?'<b>⚡ ABILITY VARIANT</b><span>Changes appearance, hero abilities and Special.</span>':s.price===0?'<b>✓ DEFAULT SUIT</b><span>Included with the fighter. Original combat kit.</span>':'<b>◆ COSMETIC SKIN</b><span>Appearance only. Combat stats and abilities stay unchanged.</span>';
 const a=$('skinAction');a.disabled=!heroOwned||equipped;a.textContent=!heroOwned?'OWN HERO FIRST':equipped?'EQUIPPED':owned?'EQUIP':\`BUY • \${s.price} 💎\`
}`;
  code=code.slice(0,infoStart)+renderSkinInfo+code.slice(infoEnd);

  rep('// v0.9.4 public control bridge','// v0.9.4.1 public control bridge','control bridge comment');
  return code;
};
});

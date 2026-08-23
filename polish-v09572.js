/* Multiverse Arena v0.9.5.7.2.2 — Fight Stability Hotfix */
(()=>{
'use strict';
const BUILD='0.9.5.7.2.2';
const HERO_INTROS={
 'SPIDER-MAN':['WEB-SLINGER ONLINE','Spidey lands light, fast and ready to move.'],
 'IRON MAN':['SYSTEMS ONLINE','Repulsors charged. Flight systems standing by.'],
 'WOLVERINE':['CLAWS OUT','Regeneration active. Berserker pressure incoming.'],
 'BLACK PANTHER':['WAKANDA FOREVER','Kinetic weave armed. Precision before power.'],
 'CAPTAIN AMERICA':['I CAN DO THIS ALL DAY','Shield ready. Hold the line.'],
 'DAREDEVIL':['THE DEVIL IS LISTENING','Radar sense locked onto every movement.'],
 'MOON KNIGHT':['VENGEANCE ARRIVES','Khonshu watches the arena.'],
 'PUNISHER':['NO SECOND CHANCES','Frank Castle enters fully loaded.'],
 'EL PRIMO':['SHOWTIME','The arena is about to get loud.'],
 'ROOKIE':['PROVE YOURSELF','Every legend starts somewhere.']
};
const $=(s,r=document)=>r.querySelector(s),all=(s,r=document)=>[...r.querySelectorAll(s)];
const cleanName=(t='')=>t.trim().toUpperCase();
const sfx=kind=>window.MultiverseArenaUI?.click?.(kind||'tap');
let lastScreen='',lastFightKey='',lastBossPhase=0,lastProfileName='',timer=0,introTimer=0;

function renameGauntlet(){
 const play=$('#play');if(play&&play.textContent!=='⚔️ VILLAIN GAUNTLET')play.textContent='⚔️ VILLAIN GAUNTLET';
 const title=$('#levels .sectionhead h2');if(title&&title.textContent!=='VILLAIN GAUNTLET')title.textContent='VILLAIN GAUNTLET';
 const eye=$('#levels .sectionhead .eyebrow');if(eye&&eye.textContent!=='PATH OF THE MULTIVERSE')eye.textContent='PATH OF THE MULTIVERSE';
}
function brand(){
 document.title='Multiverse Arena v0.9.5.7.2.2 — Fight Stability Hotfix';
 all('.brand .tag').forEach(x=>x.textContent='v0.9.5.7.2.2');
 const u=$('#updates');if(u)u.textContent='📋 UPDATE LOG • v0.9.5.7.2.2';
 const l=$('.latest-stat');if(l){const b=$('b',l),s=$('span',l);if(b)b.textContent='v0.9.5.7.2.2';if(s)s.textContent='Fight Stability • Villain Gauntlet • Immersion';}
 const h=$('.build-health b');if(h)h.textContent='FIGHT STABILITY • v0.9.5.7.2.2';
}
function arenaAtmosphere(){
 const arena=$('#arena');if(!arena||arena.querySelector('.arena-atmosphere'))return;
 const layer=document.createElement('div');layer.className='arena-atmosphere';
 layer.innerHTML='<i class="amb amb-a"></i><i class="amb amb-b"></i><i class="amb amb-c"></i><i class="amb amb-d"></i><span class="arena-haze"></span>';
 arena.prepend(layer);
}
function clearIntro(){if(introTimer){clearTimeout(introTimer);introTimer=0}document.querySelector('.versus-sequence')?.remove();}
function versusIntro(){
 const fight=$('#fight');if(!fight?.classList.contains('active'))return;
 const hero=cleanName($('#pname')?.textContent),enemy=cleanName($('#ename')?.textContent);if(!hero||!enemy)return;
 const key=hero+'|'+enemy;if(key===lastFightKey)return;lastFightKey=key;clearIntro();
 const intro=HERO_INTROS[hero]||['FIGHTER READY','Enter the arena.'];
 const d=document.createElement('div');d.className='versus-sequence';
 d.innerHTML=`<div class="vs-top">VILLAIN GAUNTLET</div><div class="vs-row"><div class="vs-side player"><small>CHALLENGER</small><strong>${hero}</strong><span>${intro[0]}</span></div><b class="vs-mark">VS</b><div class="vs-side enemy"><small>${fight.classList.contains('boss-mode')?'BOSS ENCOUNTER':'TARGET'}</small><strong>${enemy}</strong><span>${fight.classList.contains('boss-mode')?'FINAL THREAT':'STAND YOUR GROUND'}</span></div></div><div class="vs-tip">${intro[1]}</div>`;
 document.body.appendChild(d);setTimeout(()=>d.classList.add('show'),16);setTimeout(()=>d.classList.add('leave'),1000);introTimer=setTimeout(()=>{d.remove();introTimer=0},1320);
}
function bossHud(){
 const fight=$('#fight');let hud=$('#bossPhaseHud');
 if(!fight?.classList.contains('active')||!fight.classList.contains('boss-mode')){hud?.remove();lastBossPhase=0;return;}
 const enemy=cleanName($('#ename')?.textContent);
 if(!hud){hud=document.createElement('div');hud.id='bossPhaseHud';hud.className='boss-phase-hud';hud.innerHTML='<small>BOSS PROTOCOL</small><strong></strong><div class="boss-phase-track"><i></i><i></i><i></i></div><span></span>';fight.appendChild(hud);}
 const strong=$('strong',hud);if(strong&&strong.textContent!==enemy)strong.textContent=enemy;
 const width=parseFloat($('#ehp')?.style.width),hp=Number.isFinite(width)?width:100,phase=hp<=24?3:hp<=52?2:1;
 if(+hud.dataset.phase===phase)return;
 hud.dataset.phase=String(phase);const label=$('span',hud);if(label)label.textContent=phase===1?'PHASE I • ANALYZE':phase===2?'PHASE II • AGGRESSIVE':'FINAL PROTOCOL';
 all('.boss-phase-track i',hud).forEach((x,i)=>x.classList.toggle('active',i<phase));
 if(phase>lastBossPhase&&lastBossPhase){hud.classList.add('phase-shift');sfx('reward');setTimeout(()=>hud?.classList.remove('phase-shift'),700)}lastBossPhase=phase;
}
function profileDetails(){
 if(!$('#chars')?.classList.contains('active'))return;
 const profile=$('.profile'),title=$('#charTitle');if(!profile||!title)return;const name=cleanName(title.textContent);if(name===lastProfileName)return;lastProfileName=name;
 let box=$('#fighterDetailGrid');if(!box){box=document.createElement('div');box.id='fighterDetailGrid';box.className='fighter-detail-grid';profile.appendChild(box)}
 if(!name){box.replaceChildren();return}
 const map={'SPIDER-MAN':['S','ACROBAT','Mobility','Web control','Fast evasive pressure'],'IRON MAN':['S','TECH','Range','Armor systems','Repulsor zoning'],'WOLVERINE':['S','BERSERKER','Sustain','Regeneration','Relentless close range'],'BLACK PANTHER':['A+','KINETIC','Precision','Energy storage','Counter-pressure'],'CAPTAIN AMERICA':['A+','TACTICAL','Defense','Shield mastery','Reliable all-rounder'],'MOON KNIGHT':['A+','MYSTIC','Burst','Moon Guard','High-risk pressure'],'DAREDEVIL':['A','RADAR','Counter','Mobility','Technical fighter'],'PUNISHER':['A','ARSENAL','Range','Explosives','Campaign unlock'],'EL PRIMO':['A','BRAWLER','Power','Durability','Close-range bruiser'],'ROOKIE':['B','BALANCED','Basics','Learning curve','Beginner friendly']};
 const d=map[name]||['—','FIGHTER','Combat','Unique kit','Multiverse combatant'];
 box.innerHTML=`<span><small>RANK</small><b>${d[0]}</b></span><span><small>CLASS</small><b>${d[1]}</b></span><span><small>STRENGTH</small><b>${d[2]}</b></span><span><small>SIGNATURE</small><b>${d[3]}</b></span><p>${d[4]}</p>`;
}
function quality(){
 if($('#levels')?.classList.contains('active'))all('.campaign-node.ready').forEach(n=>{if(!n.querySelector('.quality-pulse')){const i=document.createElement('i');i.className='quality-pulse';n.appendChild(i)}});
 if($('#chars')?.classList.contains('active'))all('.card,.skin-card').forEach(c=>c.toggleAttribute('aria-current',c.classList.contains('active')));
}
function gauntletCompletion(){
 if(!$('#levels')?.classList.contains('active')||document.querySelector('.gauntlet-complete'))return;const cards=$('#levelCards');if(!cards)return;
 const nodes=all('.campaign-node',cards).filter(x=>!x.classList.contains('assigned'));if(!nodes.length||nodes.some(x=>!x.classList.contains('cleared')))return;
 const d=document.createElement('div');d.className='gauntlet-complete';d.innerHTML='<small>VILLAIN GAUNTLET</small><strong>GAUNTLET COMPLETE</strong><span>Every available threat has been defeated.</span><b>🏆 MULTIVERSE CONQUERED</b><button type="button">CONTINUE</button>';
 document.body.appendChild(d);d.querySelector('button').onclick=()=>d.remove();setTimeout(()=>d.classList.add('show'),16);sfx('reward');
}
function resultCinematic(){
 const r=$('#results');if(!r?.classList.contains('active'))return;const win=r.classList.contains('victory');
 document.body.classList.remove('victory-cinematic','defeat-cinematic');document.body.classList.add(win?'victory-cinematic':'defeat-cinematic');setTimeout(()=>document.body.classList.remove('victory-cinematic','defeat-cinematic'),1000);
 const title=$('#resultTitle');if(title&&title.animate)title.animate([{opacity:0,transform:'scale(1.2)'},{opacity:1,transform:'scale(1)'}],{duration:430,easing:'cubic-bezier(.2,.9,.3,1)'});
}
function enterScreen(id){
 renameGauntlet();
 if(id==='fight'){arenaAtmosphere();lastFightKey='';setTimeout(versusIntro,40);bossHud();}
 else {clearIntro();lastFightKey='';lastBossPhase=0;$('#bossPhaseHud')?.remove();}
 if(id==='chars'){lastProfileName='';profileDetails();quality();}
 if(id==='levels'){quality();gauntletCompletion();}
 if(id==='results')resultCinematic();
}
function tick(){
 const active=$('.screen.active'),id=active?.id||'';
 if(id!==lastScreen){lastScreen=id;enterScreen(id)}
 if(id==='fight')bossHud();
 else if(id==='chars')profileDetails();
}
function updateLog(){
 const box=$('#updatesScreen .changelog');if(!box||box.querySelector('.stability-95722'))return;
 const d=document.createElement('div');d.className='log-item polish-9572 stability-95722';d.innerHTML='<div class="log-icon">🛠️</div><div><b>Fight Stability Hotfix</b><p>Removed the self-triggering combat class observer and all fight-path MutationObservers. Hit feedback is now CSS-driven and the polish layer uses one lightweight timer.</p></div>';box.prepend(d);
}
function init(){
 brand();renameGauntlet();updateLog();
 if(timer)clearInterval(timer);timer=setInterval(tick,150);tick();
 document.addEventListener('click',e=>{if(e.target.closest?.('#levelCards,#charCards,.collection-tabs'))setTimeout(()=>{quality();profileDetails();gauntletCompletion()},0)},{passive:true});
 document.documentElement.dataset.polishBuild=BUILD;window.MultiverseArenaPolish={version:BUILD,refresh:tick};
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(init,0),{once:true});else setTimeout(init,0);
addEventListener('fightarena-ready',()=>setTimeout(()=>{brand();renameGauntlet();tick()},100));
})();

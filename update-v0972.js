/* Multiverse Arena v0.9.7.2 — Combat Balance + Phase 3 Polish */
(()=>{
'use strict';
const BUILD='0.9.7.2',ASSET='0972';
const $=(s,r=document)=>r.querySelector(s);
const BALANCE={
 buffs:{Rookie:'105 HP • 9/14 basics • 28 Special',CaptainAmerica:'82 Power • 68 Speed • 11/15 basics • stronger shield kit',Daredevil:'70 Power • 90 Speed • stronger counter/billy club/combo'},
 nerfs:{Juggernaut:'345 HP • lighter armor • slower special cadence',Deadpool:'270 HP • 78 max regen • 36 HP Last Stand • slower Maximum Effort',Magneto:'365 HP • lower burst • shorter shield • slower final-phase storm'}
};
let wired=false;
function style(){if($('#update0972Style'))return;const l=document.createElement('link');l.id='update0972Style';l.rel='stylesheet';l.href=`update-v0972.css?v=${ASSET}`;document.head.appendChild(l)}
function brand(){
 document.title='Multiverse Arena v0.9.7.2 — Combat Balance + Phase 3 Polish';
 document.querySelectorAll('.brand .tag').forEach(x=>x.textContent='v0.9.7.2');
 const updates=$('#updates');if(updates)updates.textContent='UPDATE LOG  •  v0.9.7.2';
 const latest=$('.latest-stat');if(latest){const b=$('b',latest),s=$('span',latest);if(b)b.textContent='v0.9.7.2';if(s)s.textContent='Fighter Buffs • Phase 3 Nerfs • Combat Polish'}
 const health=$('.build-health b');if(health)health.textContent='v0.9.7.2 • BALANCE + PHASE 3 POLISH • STABLE';
 const chooser=$('#deviceChooser .eyebrow');if(chooser)chooser.textContent='MULTIVERSE ARENA • v0.9.7.2';
 const hero=$('#home .hero-copy');if(hero){const tag=$('.tag',hero),h=$('h1',hero),p=$('p',hero);if(tag)tag.textContent='PHASE 3 • BALANCE PASS';if(h)h.innerHTML='FIGHT SMARTER.<br>HIT HARDER.';if(p)p.textContent='Rookie, Captain America and Daredevil step up while Juggernaut, Deadpool and Magneto keep their identities with fairer health, damage and attack pacing.'}
 document.documentElement.dataset.multiverseRelease='0.9.7.2';
 document.documentElement.dataset.balanceRelease='0972';
 if(window.MultiverseArenaRuntime){window.MultiverseArenaRuntime.version=BUILD;window.MultiverseArenaRuntime.asset=ASSET}
}
function cleanUpdateLog(){
 const box=$('#updatesScreen .changelog');if(!box)return;
 const releases=[
  ['⚖️','v0.9.7.2 — Combat Balance Pass','Targeted tuning improves weaker public fighters and removes unnecessary Phase 3 sponge/spam without deleting any signature mechanics.'],
  ['🥊','Rookie Buff','105 HP, 60 Power, 64 Speed, 9 Punch, 14 Kick and a 28-damage Arena Burst make the starter more viable throughout the campaign.'],
  ['🛡️','Captain America Buff','Power rises to 82, Speed to 68, basics to 11/15, Avenger Strike to 30 and both Shield Throw and Shield Bash hit harder.'],
  ['😈','Daredevil Buff','Power rises to 70, Speed to 90 and his Billy Club, Grapple Rush, Radar Counter and Devil’s Combo all receive small damage improvements.'],
  ['🪨','Juggernaut + Deadpool Fairness','Juggernaut keeps his huge model and armor but loses some health, armor reduction and attack frequency. Deadpool keeps healing and Last Stand with lower regen and a 36 HP revival.'],
  ['🧲','Magneto Boss Polish','Magneto keeps all three phases and every special attack, but has slightly less health/burst, shorter shields and more breathing room before Master of Magnetism.']
 ];
 box.dataset.cleaned0972='1';delete box.dataset.cleaned0971;delete box.dataset.cleaned097;
 box.innerHTML=releases.map(([icon,title,text])=>`<div class="log-item recent-release-v0972"><div class="log-icon">${icon}</div><div><b>${title}</b><p>${text}</p></div></div>`).join('');
 const tag=$('#updatesScreen .panel>.tag');if(tag)tag.textContent='v0.9.7.2 • COMBAT BALANCE + POLISH';
 const title=$('#updatesScreen .panel>h2');if(title)title.textContent='SAME IDENTITIES. CLEANER BALANCE.';
}
function wire(){if(wired)return;wired=true;$('#play')?.addEventListener('click',()=>setTimeout(()=>{brand();cleanUpdateLog()},160));$('#updates')?.addEventListener('click',()=>setTimeout(()=>{brand();cleanUpdateLog()},30));addEventListener('pageshow',()=>setTimeout(()=>{brand();cleanUpdateLog()},0));document.addEventListener('visibilitychange',()=>{if(!document.hidden)setTimeout(()=>{brand();cleanUpdateLog()},0)})}
function refresh(){style();brand();cleanUpdateLog();wire()}
function init(){refresh();window.MultiverseArenaUpdate0972={version:BUILD,refresh,brand,cleanUpdateLog,balance:BALANCE}}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
addEventListener('fightarena-ready',()=>setTimeout(refresh,340),{once:true});
})();

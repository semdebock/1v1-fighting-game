/* Multiverse Arena v0.9.7.4 — Hulkbuster Premium Variant */
(()=>{
'use strict';
const BUILD='0.9.7.4',ASSET='0974';
const $=(s,r=document)=>r.querySelector(s);
let wired=false;
function style(){if($('#update0974Style'))return;const l=document.createElement('link');l.id='update0974Style';l.rel='stylesheet';l.href=`update-v0974.css?v=${ASSET}`;document.head.appendChild(l)}
function brand(){
 document.title='Multiverse Arena v0.9.7.4 — Hulkbuster Premium Variant';
 document.querySelectorAll('.brand .tag').forEach(x=>x.textContent='v0.9.7.4');
 const updates=$('#updates');if(updates)updates.textContent='UPDATE LOG  •  v0.9.7.4';
 const latest=$('.latest-stat');if(latest){const b=$('b',latest),s=$('span',latest);if(b)b.textContent='v0.9.7.4';if(s)s.textContent='Hulkbuster • 250 Diamonds • Veronica Crashdown'}
 const health=$('.build-health b');if(health)health.textContent='v0.9.7.4 • HULKBUSTER PREMIUM VARIANT • STABLE';
 const chooser=$('#deviceChooser .eyebrow');if(chooser)chooser.textContent='MULTIVERSE ARENA • v0.9.7.4';
 const hero=$('#home .hero-copy');if(hero){const tag=$('.tag',hero),h=$('h1',hero),p=$('p',hero);if(tag)tag.textContent='MYTHIC ARMOR • HULKBUSTER';if(h)h.innerHTML='BUILT TO<br>BREAK GIANTS.';if(p)p.textContent='Iron Man receives an oversized 250-diamond Hulkbuster Ability Variant with 175 HP, Heavy Armor, devastating artillery and Veronica Crashdown.'}
 document.documentElement.dataset.multiverseRelease=BUILD;document.documentElement.dataset.hulkbusterRelease=ASSET;
 if(window.MultiverseArenaRuntime){window.MultiverseArenaRuntime.version=BUILD;window.MultiverseArenaRuntime.asset=ASSET}
}
function updateFighterStats(){
 window.MultiverseArenaUpdate0973?.decorateCards?.();
 document.querySelectorAll('#charCards .fighter-card-v0973').forEach(card=>{
  const name=card.dataset.fighterName,active=window.FightArena?.activeStats?.(name);if(!active)return;
  const vals=card.querySelectorAll('.fighter-quick-stats-v0973 b');if(vals.length>=3){vals[0].textContent=active.hp;vals[1].textContent=active.power;vals[2].textContent=active.speed}
  const isHulk=name==='Iron Man'&&active.specialName==='Veronica Crashdown';card.classList.toggle('hulkbuster-active-v0974',isHulk);
  let badge=$('.hulkbuster-active-badge-v0974',card);if(isHulk&&!badge){badge=document.createElement('span');badge.className='hulkbuster-active-badge-v0974';badge.textContent='⚙ HULKBUSTER ACTIVE • 175 HP';$('.fighter-role',card)?.insertAdjacentElement('afterend',badge)}else if(!isHulk&&badge)badge.remove();
 })
}
function hulkbusterCard(){return [...document.querySelectorAll('#skinCards .skin-card')].find(card=>$('h3',card)?.textContent?.trim()==='HULKBUSTER')||null}
function decorateHulkbuster(){
 const card=hulkbusterCard();if(!card)return;card.classList.add('hulkbuster-card-v0974');
 const status=[...card.children].find(n=>n.tagName==='SMALL')?.textContent||'';const equipped=/EQUIPPED/.test(status),owned=/OWNED|EQUIPPED/.test(status),heroLocked=/OWN HERO/.test(status);
 let action=$('.hulkbuster-quick-action-v0974',card);if(!action){action=document.createElement('span');action.className='hulkbuster-quick-action-v0974';action.setAttribute('role','button');action.tabIndex=0;card.appendChild(action)}
 action.className='hulkbuster-quick-action-v0974 '+(equipped?'equipped':heroLocked?'locked':'');action.dataset.hulkbusterQuick='1';action.setAttribute('aria-disabled',equipped||heroLocked?'true':'false');action.textContent=heroLocked?'🔒 OWN IRON MAN FIRST':equipped?'✓ HULKBUSTER EQUIPPED':owned?'EQUIP HULKBUSTER':'BUY & EQUIP • 250 💎';
}
function decorateDetail(){
 if($('#skinTitle')?.textContent?.trim()!=='HULKBUSTER')return;const info=$('#skinTypeInfo');if(info){info.classList.add('hulkbuster-detail-v0974');info.innerHTML='<b>⚙ MYTHIC ABILITY VARIANT</b><span>175 HP • 98 POWER • 48 SPEED • 18% HEAVY ARMOR • VERONICA CRASHDOWN</span>'}
 const price=$('#skinPrice');if(price)price.textContent='250 💎';const action=$('#skinAction');if(action&&!action.disabled&&!/EQUIP/.test(action.textContent))action.textContent='BUY HULKBUSTER • 250 💎';
}
function quickHulkbuster(card){const action=$('.hulkbuster-quick-action-v0974',card);if(!card||action?.getAttribute('aria-disabled')==='true')return;card.click();setTimeout(()=>{$('#skinAction')?.click();setTimeout(()=>{updateFighterStats();decorateHulkbuster();decorateDetail();brand()},50)},0)}
function cleanUpdateLog(){
 const box=$('#updatesScreen .changelog');if(!box)return;
 const releases=[
  ['🦾','v0.9.7.4 — Hulkbuster','Iron Man receives an enormous MYTHIC Hulkbuster Ability Variant for 250 Diamonds with a completely rebuilt red-and-gold heavy armor model.'],
  ['📊','True Variant Stats','Hulkbuster fights with 175 HP, 98 Power and 48 Speed. These are real combat stats, not cosmetic labels, turning Iron Man into a slow super-heavy powerhouse.'],
  ['🛡️','Heavy Armor','Hulkbuster passively reduces incoming damage by 18%, giving the massive armor the durability expected from its size and premium cost.'],
  ['💥','Hulkbuster Combat Kit','Hulkbuster Slam crushes close range, Micro Missile Swarm floods mid-range and Repulsor Barrage delivers high-output armored firepower.'],
  ['☄️','Veronica Crashdown','Hulkbuster launches into a protected crash sequence, closes the gap and detonates a huge impact for its signature cinematic Special.'],
  ['🗂️','v0.9.7.3 — Collection + Daily Reward','Quick fighter stats, one-tap fighter equip and the true 24-hour 1,250-coin Daily Reward remain fully active.'],
  ['⚖️','v0.9.7.2 — Combat Balance','Rookie, Captain America and Daredevil buffs plus Phase 3 fairness tuning remain intact.']
 ];
 box.dataset.cleaned0974='1';delete box.dataset.cleaned0973;delete box.dataset.cleaned0972;delete box.dataset.cleaned0971;delete box.dataset.cleaned097;
 box.innerHTML=releases.map(([icon,title,text])=>`<div class="log-item recent-release-v0974"><div class="log-icon">${icon}</div><div><b>${title}</b><p>${text}</p></div></div>`).join('');
 const tag=$('#updatesScreen .panel>.tag');if(tag)tag.textContent='v0.9.7.4 • HULKBUSTER PREMIUM VARIANT';const title=$('#updatesScreen .panel>h2');if(title)title.textContent='VERONICA IS ONLINE.';
}
function wire(){if(wired)return;wired=true;
 $('#gallery')?.addEventListener('click',()=>setTimeout(()=>{updateFighterStats();decorateHulkbuster();decorateDetail();brand()},110));
 $('#skinCards')?.addEventListener('click',e=>{const action=e.target.closest?.('.hulkbuster-quick-action-v0974');if(action){e.preventDefault();e.stopPropagation();quickHulkbuster(action.closest('.skin-card'));return}setTimeout(()=>{decorateHulkbuster();decorateDetail()},25)},true);
 $('#skinCards')?.addEventListener('keydown',e=>{const action=e.target.closest?.('.hulkbuster-quick-action-v0974');if(action&&(e.key==='Enter'||e.key===' ')){e.preventDefault();e.stopPropagation();quickHulkbuster(action.closest('.skin-card'))}},true);
 $('#skinAction')?.addEventListener('click',()=>setTimeout(()=>{updateFighterStats();decorateHulkbuster();decorateDetail()},50));
 $('#charAction')?.addEventListener('click',()=>setTimeout(updateFighterStats,40));
 $('#updates')?.addEventListener('click',()=>setTimeout(()=>{brand();cleanUpdateLog()},30));
 addEventListener('pageshow',()=>setTimeout(refresh,0));document.addEventListener('visibilitychange',()=>{if(!document.hidden)setTimeout(()=>{brand();updateFighterStats();decorateHulkbuster()},0)})
}
function refresh(){style();brand();updateFighterStats();decorateHulkbuster();decorateDetail();cleanUpdateLog();wire()}
function init(){refresh();window.MultiverseArenaUpdate0974={version:BUILD,refresh,brand,updateFighterStats,decorateHulkbuster,cleanUpdateLog}}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
addEventListener('fightarena-ready',()=>setTimeout(refresh,440),{once:true});
})();

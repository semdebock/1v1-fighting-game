/* Multiverse Arena v0.9.7.5.1 — Skin Identity + Boss Rewards */
(()=>{
'use strict';
const BUILD='0.9.7.5.1',ASSET='09751';
const $=(s,r=document)=>r.querySelector(s);
const ownsRelease=()=>{const v=window.MultiverseArenaRuntime?.version;return !v||v===BUILD};
let wired=false;
function style(){if($('#update09751Style'))return;const l=document.createElement('link');l.id='update09751Style';l.rel='stylesheet';l.href=`update-v09751.css?v=${window.MultiverseArenaRuntime?.asset||ASSET}`;document.head.appendChild(l)}
function brand(){
 if(!ownsRelease())return;
 document.title='Multiverse Arena v0.9.7.5.1 — Skin Identity + Boss Rewards';
 document.querySelectorAll('.brand .tag').forEach(x=>x.textContent='v0.9.7.5.1');
 const u=$('#updates');if(u)u.textContent='UPDATE LOG  •  v0.9.7.5.1';
 const latest=$('.latest-stat');if(latest){const b=$('b',latest),s=$('span',latest);if(b)b.textContent='v0.9.7.5.1';if(s)s.textContent='Moon Knight Revamp • Skin Names • Boss Gems'}
 const health=$('.build-health b');if(health)health.textContent='v0.9.7.5.1 • SKIN IDENTITY + REWARDS • STABLE';
 const chooser=$('#deviceChooser .eyebrow');if(chooser)chooser.textContent='MULTIVERSE ARENA • v0.9.7.5.1';
 const hero=$('#home .hero-copy');if(hero){const tag=$('.tag',hero),h=$('h1',hero),p=$('p',hero);if(tag)tag.textContent='IDENTITY • REWARDS • POLISH';if(h)h.innerHTML='WEAR THE SUIT.<br>OWN THE NAME.';if(p)p.textContent='Equipped premium skins now carry their own identity across the arena, Moon Knight has a new visual build and Diamonds are reserved for true boss victories.'}
 document.documentElement.dataset.multiverseRelease=BUILD;
 if(window.MultiverseArenaRuntime){window.MultiverseArenaRuntime.version=BUILD;window.MultiverseArenaRuntime.asset=ASSET}
}
function polishCollection(){
 $('#chars')?.classList.add('collection-audit-v09751');
 const note=$('.collection-diamond-note');if(note)note.innerHTML='<b>💎 PREMIUM CURRENCY.</b> Skins and Ability Variants use Diamonds. Fight rewards now drop Diamonds from <b>BOSS FIGHTS ONLY</b>.';
 document.querySelectorAll('.skin-card').forEach(card=>{const title=$('h3',card)?.textContent?.trim();if(title==='HULKBUSTER')card.classList.add('hulkbuster-frame-fixed-v09751')});
}
function cleanUpdateLog(){
 if(!ownsRelease())return;
 const box=$('#updatesScreen .changelog');if(!box)return;
 const releases=[
  ['🌙','v0.9.7.5.1 — Moon Knight Revamp','Moon Knight now has a stronger hooded silhouette, shadowed mask, glowing eyes, crescent chest mark, layered white armor and a fuller cape so he reads much more clearly as Moon Knight.'],
  ['🦾','v0.9.7.5.1 — Hulkbuster Framing','Hulkbuster’s arc reactor is locked to the true center of his chest and his Collection, skin-preview, training and purchase-confirmation scales are reduced so the full heavy armor stays inside its frame.'],
  ['💎','v0.9.7.5.1 — True Boss Rewards','Diamonds are now fight rewards from bosses only. Non-boss encounters give coins and XP, and normal level-ups no longer create extra Diamonds.'],
  ['🏷️','v0.9.7.5.1 — Skin Identity System','When a non-default skin is equipped, active-fighter labels use the skin name — for example HULKBUSTER, NANOTECH SUIT or SYMBIOTE SUIT — instead of the base hero name.'],
  ['📱','v0.9.7.5.1 — iPhone Collection Audit','Fixed long fighter names and power-class chips forcing horizontal Collection scrolling on narrow iPhone layouts.'],
  ['🛒','v0.9.7.5 — Collection Shop','Direct fighter/skin shopping and mandatory CONFIRM / CANCEL purchase safety remain intact.'],
  ['↻','v0.9.7.4.1 — Hulkbuster + Rematch','Heavy-mech Hulkbuster and the restored Results REMATCH flow remain protected.']
 ];
 box.innerHTML=releases.map(([icon,title,text])=>`<div class="log-item recent-release-v09751"><div class="log-icon">${icon}</div><div><b>${title}</b><p>${text}</p></div></div>`).join('');
 const tag=$('#updatesScreen .panel>.tag');if(tag)tag.textContent='v0.9.7.5.1 • SKIN IDENTITY + BOSS REWARDS';const title=$('#updatesScreen .panel>h2');if(title)title.textContent='BETTER IDENTITIES. CLEANER REWARDS.';
}
function wire(){if(wired)return;wired=true;$('#gallery')?.addEventListener('click',()=>setTimeout(()=>{brand();polishCollection()},100));document.querySelectorAll('[data-collection-tab]').forEach(b=>b.addEventListener('click',()=>setTimeout(polishCollection,70)));$('#updates')?.addEventListener('click',()=>setTimeout(()=>{brand();cleanUpdateLog()},30));addEventListener('pageshow',()=>setTimeout(refresh,0));document.addEventListener('visibilitychange',()=>{if(!document.hidden)setTimeout(refresh,0)})}
function refresh(){style();brand();polishCollection();cleanUpdateLog();wire()}
function init(){refresh();window.MultiverseArenaUpdate09751={version:BUILD,refresh,brand,polishCollection,cleanUpdateLog}}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
addEventListener('fightarena-ready',()=>setTimeout(refresh,560),{once:true});
})();

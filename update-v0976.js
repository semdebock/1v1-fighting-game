/* Multiverse Arena v0.9.7.6 — Combat & Collection Overhaul */
(()=>{
'use strict';
const BUILD='0.9.7.6',ASSET='0976';
const $=(s,r=document)=>r.querySelector(s);
const ownsRelease=()=>{const v=window.MultiverseArenaRuntime?.version;return !v||v===BUILD};
let wired=false,fighterFilter='all',skinFilter='all',gauntletTimer=0;
const BOSS_REWARDS={
 'Arena Champion':'500 🪙 • 100 XP • 5 💎',
 Kingpin:'600 🪙 • 150 XP • 5 💎',
 'Doctor Octopus':'1400 🪙 • 260 XP • 10 💎',
 Magneto:'1900 🪙 • 340 XP • 15 💎'
};
const MUTANT_NON_BOSS={Sabretooth:'950 🪙 • 185 XP',Mystique:'1100 🪙 • 210 XP',Juggernaut:'1300 🪙 • 240 XP',Deadpool:'1450 🪙 • 260 XP'};
function style(){if($('#update0976Style'))return;const l=document.createElement('link');l.id='update0976Style';l.rel='stylesheet';l.href=`update-v0976.css?v=${window.MultiverseArenaRuntime?.asset||ASSET}`;document.head.appendChild(l)}
function campaign(){return window.FightArenaCampaignV097||window.FightArenaCampaignV0957}
function controls(){return window.FightArenaCampaignControls}
function won(name){try{return !!controls()?.won?.(name)}catch{return false}}
function phaseFights(phase){return phase?.sections?.flatMap(s=>s.fights)||[]}
function brand(){
 if(!ownsRelease())return;
 document.title='Multiverse Arena v0.9.7.6 — Combat & Collection Overhaul';
 document.querySelectorAll('.brand .tag').forEach(x=>x.textContent='v0.9.7.6');
 const u=$('#updates');if(u)u.textContent='UPDATE LOG  •  v0.9.7.6';
 const latest=$('.latest-stat');if(latest){const b=$('b',latest),s=$('span',latest);if(b)b.textContent='v0.9.7.6';if(s)s.textContent='Collection Overhaul • Boss Mastery • Captain America Revamp'}
 const health=$('.build-health b');if(health)health.textContent='v0.9.7.6 • COMBAT + COLLECTION • STABLE';
 const chooser=$('#deviceChooser .eyebrow');if(chooser)chooser.textContent='MULTIVERSE ARENA • v0.9.7.6';
 const hero=$('#home .hero-copy');if(hero){const tag=$('.tag',hero),h=$('h1',hero),p=$('p',hero);if(tag)tag.textContent='COMBAT • COLLECTION • MASTERY';if(h)h.innerHTML='BUILD THE ROSTER.<br>MASTER THE GAUNTLET.';if(p)p.textContent='A major quality upgrade for Collection browsing, boss rewards, phase mastery, Captain America, combat clarity and mobile play.'}
 document.documentElement.dataset.multiverseRelease=BUILD;
 if(window.MultiverseArenaRuntime){window.MultiverseArenaRuntime.version=BUILD;window.MultiverseArenaRuntime.asset=ASSET}
}
function normalizeRewards(){
 const api=campaign(),details=api?.details;if(!details)return;
 Object.entries(MUTANT_NON_BOSS).forEach(([name,reward])=>{if(details[name])details[name].reward=reward});
 Object.entries(BOSS_REWARDS).forEach(([name,reward])=>{if(details[name])details[name].reward=reward});
}
function rewardFor(name){return campaign()?.details?.[name]?.reward||BOSS_REWARDS[name]||MUTANT_NON_BOSS[name]||''}
function bossNames(){const set=new Set();campaign()?.phases?.forEach(p=>p.sections.forEach(s=>s.fights.forEach(f=>{if(f.boss)set.add(f.name)})));return set}
function decorateGauntlet(){
 normalizeRewards();const box=$('#levelCards');if(!box)return;
 const bosses=bossNames();
 box.querySelectorAll('.gauntlet-villain-card-v0966[data-villain-name]').forEach(card=>{const name=card.dataset.villainName,foot=$('.gauntlet-card-foot-v0966',card),reward=rewardFor(name);if(foot&&reward)foot.textContent=reward;card.classList.toggle('boss-card-v0976',bosses.has(name));let badge=$('.boss-badge-v0976',card);if(bosses.has(name)&&!badge){badge=document.createElement('span');badge.className='boss-badge-v0976';badge.textContent='◆ BOSS • DIAMOND REWARD';card.appendChild(badge)}if(!bosses.has(name))badge?.remove()});
 const active=$('.gauntlet-phase-tab-v0966.active',box),phase=campaign()?.phases?.find(p=>p.id===active?.dataset.phaseId);if(!phase)return;const fights=phaseFights(phase),wins=fights.filter(f=>won(f.name)).length,complete=wins===fights.length;
 let mastery=$('.phase-mastery-v0976',box);if(!mastery){mastery=document.createElement('div');mastery.className='phase-mastery-v0976';const progress=$('.gauntlet-nav-progress-v0966',box);progress?.insertAdjacentElement('afterend',mastery)}
 mastery.classList.toggle('complete',complete);mastery.innerHTML=`<div class="phase-mastery-head-v0976"><div><small>PHASE MASTERY</small><b>${phase.eyebrow} • ${phase.title}</b></div><strong>${complete?'MASTERED':wins+'/'+fights.length+' CLEARED'}</strong></div><div class="phase-mastery-track-v0976">${fights.map(f=>`<i class="${won(f.name)?'cleared':''}" title="${won(f.name)?'Cleared':'Uncleared'}"></i>`).join('')}</div>`;
}
function tabButtons(){const tabs=$('#chars .collection-tabs');if(!tabs)return;tabs.classList.remove('hidden');tabs.style.display='grid';const f=$('[data-collection-tab="fighters"]',tabs),s=$('[data-collection-tab="skins"]',tabs);if(f)f.innerHTML='🥊 FIGHTERS';if(s)s.innerHTML='💎 SKINS'}
function statusText(card){return [...card.children].find(n=>n.tagName==='SMALL')?.textContent?.trim()?.toUpperCase()||''}
function ensureFilter(pane,type){if(!pane)return null;let bar=$(`.collection-filter-v0976[data-filter-type="${type}"]`,pane);if(!bar){bar=document.createElement('div');bar.className='collection-filter-v0976';bar.dataset.filterType=type;const defs=type==='fighters'?[['all','ALL'],['owned','OWNED'],['locked','LOCKED']]:[['all','ALL'],['owned','OWNED'],['locked','LOCKED'],['variants','ABILITY VARIANTS']];bar.innerHTML=defs.map(([k,l])=>`<button type="button" data-filter="${k}">${l}</button>`).join('')+'<span class="collection-filter-count-v0976"></span>';const toolbar=$('.shop-toolbar-v0975',pane);toolbar?.insertAdjacentElement('afterend',bar)||pane.insertBefore(bar,pane.firstChild);bar.addEventListener('click',e=>{const b=e.target.closest('[data-filter]');if(!b)return;if(type==='fighters')fighterFilter=b.dataset.filter;else skinFilter=b.dataset.filter;applyFilters()})}return bar}
function ensureSkinJump(){const pane=$('#skinsPane');if(!pane)return;let nav=$('.skin-jump-v0976',pane);const groups=[...pane.querySelectorAll('.skin-hero-group')];if(!groups.length)return;if(!nav){nav=document.createElement('div');nav.className='skin-jump-v0976';const filters=$('.collection-filter-v0976',pane);filters?.insertAdjacentElement('afterend',nav)||pane.insertBefore(nav,pane.firstChild)}nav.innerHTML=groups.map((g,i)=>`<button type="button" data-skin-jump="${i}">${$('.skin-hero-head b',g)?.textContent||'HERO'}</button>`).join('');nav.querySelectorAll('[data-skin-jump]').forEach(b=>b.onclick=()=>groups[+b.dataset.skinJump]?.scrollIntoView({behavior:'smooth',block:'start'}))}
function filterFighters(){const cards=[...document.querySelectorAll('#charCards .rank-fighters-grid>.card')];let visible=0;cards.forEach(card=>{const t=statusText(card),owned=/OWNED|SELECTED|EQUIPPED/.test(t),show=fighterFilter==='all'||fighterFilter==='owned'&&owned||fighterFilter==='locked'&&!owned;card.classList.toggle('filter-hidden-v0976',!show);if(show)visible++});const bar=$('.collection-filter-v0976[data-filter-type="fighters"]');bar?.querySelectorAll('[data-filter]').forEach(b=>b.classList.toggle('active',b.dataset.filter===fighterFilter));const c=$('.collection-filter-count-v0976',bar);if(c)c.textContent=`${visible}/${cards.length}`}
function filterSkins(){const cards=[...document.querySelectorAll('#skinCards .skin-card')];let visible=0;cards.forEach(card=>{const t=statusText(card),owned=/OWNED|EQUIPPED/.test(t),variant=card.classList.contains('ability-variant-card'),show=skinFilter==='all'||skinFilter==='owned'&&owned||skinFilter==='locked'&&!owned||skinFilter==='variants'&&variant;card.classList.toggle('filter-hidden-v0976',!show);if(show)visible++});document.querySelectorAll('#skinCards .skin-hero-group').forEach(group=>group.classList.toggle('filter-hidden-v0976',![...group.querySelectorAll('.skin-card')].some(c=>!c.classList.contains('filter-hidden-v0976'))));const bar=$('.collection-filter-v0976[data-filter-type="skins"]');bar?.querySelectorAll('[data-filter]').forEach(b=>b.classList.toggle('active',b.dataset.filter===skinFilter));const c=$('.collection-filter-count-v0976',bar);if(c)c.textContent=`${visible}/${cards.length}`}
function applyFilters(){filterFighters();filterSkins()}
function decorateCollection(){tabButtons();ensureFilter($('#fightersPane'),'fighters');ensureFilter($('#skinsPane'),'skins');ensureSkinJump();applyFilters()}
function cleanUpdateLog(){if(!ownsRelease())return;const box=$('#updatesScreen .changelog');if(!box)return;const releases=[
 ['🗂️','v0.9.7.6 — Collection Overhaul','FIGHTERS / SKINS navigation is now sticky and always visible, with fast ALL / OWNED / LOCKED filters and an Ability Variant filter for skins.'],
 ['🛡️','v0.9.7.6 — Captain America Revamp','Captain America has a rebuilt classic silhouette with stronger helmet, star-spangled armor and a much clearer circular shield.'],
 ['🐍','v0.9.7.6 — Hydra Suit Revamp','Hydra Suit now has its own dark green tactical identity, corrupted helmet, red insignia and redesigned Hydra shield instead of reading as a simple recolor.'],
 ['💎','v0.9.7.6 — True Boss Diamonds','Only real bosses display and pay fight Diamonds. Sabretooth, Mystique, Juggernaut and Deadpool no longer show the stale Phase 3 Diamond rewards.'],
 ['🏆','v0.9.7.6 — Boss Reward System','Bosses now receive stronger intros, boss health presentation and a dedicated Boss Chest on victory. Doctor Octopus and Magneto also show live phase indicators.'],
 ['⭐','v0.9.7.6 — Phase Mastery','Every Gauntlet category now displays a five-step mastery track and a MASTERED state when all fights in that phase are cleared.'],
 ['⚔️','v0.9.7.6 — Combat Clarity','Cooldowns, ready Specials, hit feedback, boss callouts and mobile Gauntlet controls received a readability pass.'],
 ['📱','v0.9.7.6 — Mobile Audit','Collection, purchase confirmation, long labels, Gauntlet tabs and narrow iPhone layouts were audited for clipping and horizontal overflow.']
 ];box.innerHTML=releases.map(([i,t,p])=>`<div class="log-item recent-release-v0976"><div class="log-icon">${i}</div><div><b>${t}</b><p>${p}</p></div></div>`).join('');const tag=$('#updatesScreen .panel>.tag');if(tag)tag.textContent='v0.9.7.6 • COMBAT + COLLECTION OVERHAUL';const title=$('#updatesScreen .panel>h2');if(title)title.textContent='MASTER THE COLLECTION. MASTER THE BOSS.'}
function audit(){normalizeRewards();decorateCollection();if($('#levels')?.classList.contains('active'))decorateGauntlet();brand()}
function wire(){if(wired)return;wired=true;
 $('#gallery')?.addEventListener('click',()=>setTimeout(()=>{decorateCollection();brand()},150));
 document.querySelectorAll('[data-collection-tab]').forEach(b=>b.addEventListener('click',()=>setTimeout(decorateCollection,90)));
 $('#charCards')?.addEventListener('click',()=>setTimeout(decorateCollection,100));$('#skinCards')?.addEventListener('click',()=>setTimeout(decorateCollection,100));$('#charAction')?.addEventListener('click',()=>setTimeout(decorateCollection,120));$('#skinAction')?.addEventListener('click',()=>setTimeout(decorateCollection,120));
 $('#play')?.addEventListener('click',()=>setTimeout(decorateGauntlet,160));$('#continue')?.addEventListener('click',()=>setTimeout(decorateGauntlet,180));$('#levelCards')?.addEventListener('click',()=>setTimeout(decorateGauntlet,80));$('#levelCards')?.addEventListener('scroll',()=>{clearTimeout(gauntletTimer);gauntletTimer=setTimeout(decorateGauntlet,150)},true);
 $('#updates')?.addEventListener('click',()=>setTimeout(()=>{brand();cleanUpdateLog()},40));
 addEventListener('pageshow',()=>setTimeout(audit,0));document.addEventListener('visibilitychange',()=>{if(!document.hidden)setTimeout(audit,0)});
}
function refresh(){style();normalizeRewards();brand();decorateCollection();decorateGauntlet();cleanUpdateLog();wire()}
function init(){refresh();window.MultiverseArenaUpdate0976={version:BUILD,refresh,decorateCollection,decorateGauntlet,applyFilters,normalizeRewards}}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
addEventListener('fightarena-ready',()=>setTimeout(refresh,650),{once:true});
})();

/* Multiverse Arena v0.9.6 — Premium Presentation Revamp */
(()=>{
'use strict';
const BUILD='0.9.6';
const FINAL_STYLE='premium-v096-final.css?v=096f2';
const $=(s,r=document)=>r.querySelector(s);
const all=(s,r=document)=>[...r.querySelectorAll(s)];

function finalStyle(){
 if($('#premium096FinalStyle'))return;
 const link=document.createElement('link');
 link.id='premium096FinalStyle';link.rel='stylesheet';link.href=FINAL_STYLE;
 document.head.appendChild(link);
}
function environment(){
 if($('.premium-environment'))return;
 const d=document.createElement('div');
 d.className='premium-environment';d.setAttribute('aria-hidden','true');
 d.innerHTML='<i class="premium-orb premium-orb-a"></i><i class="premium-orb premium-orb-b"></i><i class="premium-grid"></i><i class="premium-vignette"></i>';
 document.body.prepend(d);
}
function roles(){
 const role=(sel,name)=>all(sel).forEach(x=>x.dataset.premiumRole=name);
 role('button.primary','primary');role('.back','back');role('#play','hero');role('#daily','reward');role('#gallery','collection');role('#training','training');role('#settings','settings');role('#updates','secondary');
 role('#continue','continue');role('#rematch','rematch');role('#menu','menu');role('#special','special');role('#punch,#kick','combat');role('#jump,#block','utility');
 all('.sectionhead').forEach(h=>{if(h.querySelector('.premium-section-rule'))return;const r=document.createElement('span');r.className='premium-section-rule';r.setAttribute('aria-hidden','true');h.appendChild(r)});
 all('.panel,.hero-dashboard,.hero-card,.training-header,.campaign-phase,.profile,.skin-profile').forEach(x=>x.classList.add('premium-surface'));
}
function homeDetails(){
 const copy=$('#home .hero-copy');if(copy&&!copy.querySelector('.premium-featureline')){
  const line=document.createElement('div');line.className='premium-featureline';line.innerHTML='<span>◆ CINEMATIC 1V1</span><span>◆ TOUCH READY</span><span>◆ VILLAIN GAUNTLET</span>';const p=$('p',copy);p?.insertAdjacentElement('afterend',line);
 }
 const dash=$('.hero-dashboard');if(dash&&!dash.querySelector('.premium-dashboard-mark')){const m=document.createElement('span');m.className='premium-dashboard-mark';m.textContent='MULTIVERSE COMBAT SYSTEM';dash.appendChild(m)}
}
function screenLabels(){
 const labels={updatesScreen:'LIVE SERVICE ARCHIVE',settingsScreen:'SYSTEM CONFIGURATION',trainingScreen:'COMBAT SIMULATION',chars:'FIGHTER ARCHIVE',levels:'THREAT NETWORK',fight:'LIVE COMBAT',results:'MATCH RESOLUTION'};
 for(const [id,label] of Object.entries(labels)){const s=$('#'+id);if(!s||s.dataset.premiumLabel)continue;s.dataset.premiumLabel=label}
}
function updateLog(){
 const box=$('#updatesScreen .changelog');if(!box||box.querySelector('.premium-096'))return;
 const items=[
  ['◈','Premium Design System','Every major screen now shares one cinematic design language: obsidian surfaces, champagne-metal accents, sharper hierarchy and consistent spacing.'],
  ['⌁','Executive Home Screen','Home now reads like a flagship game dashboard with stronger hero framing, refined command-center cards and premium primary actions.'],
  ['⚔','Combat HUD Refit','Health, special meter, boss protocol, action buttons and touch controls have been visually rebuilt without changing combat behavior.'],
  ['◇','Collection & Profiles','Fighter cards, skins, stats and profile surfaces now use higher-end archive styling with clearer ownership and selection states.'],
  ['▣','Villain Gauntlet Refit','Phase panels, fight nodes, rewards, boss states and selected encounters now read as a unified threat-network interface.'],
  ['✦','Victory & Rewards','Results, reward summaries, unlock moments and continuation buttons now receive a more cinematic premium finish.'],
  ['⌘','Settings & Training','Utility screens now match the rest of the game instead of feeling like secondary menus.'],
  ['◎','Performance-Safe Polish','The presentation pass is CSS-first and introduces no fight-path observers, animation loops or combat-state rewrites.'],
  ['✓','Final Stability Pass','Touch hover movement, tablet combat blur and redundant screen-observer work were reduced for a cleaner iPad and mobile experience.']
 ];
 for(const [icon,title,text] of items.reverse()){const d=document.createElement('div');d.className='log-item premium-096';d.innerHTML=`<div class="log-icon">${icon}</div><div><b>${title}</b><p>${text}</p></div>`;box.prepend(d)}
 const tag=$('#updatesScreen .panel>.tag');if(tag)tag.textContent='v0.9.6 • PREMIUM PRESENTATION';
 const title=$('#updatesScreen .panel>h2');if(title)title.textContent='BUILT TO FEEL EXPENSIVE.';
}
function brand(){
 document.documentElement.dataset.presentation='premium-v096';
 document.title='Multiverse Arena v0.9.6 — Premium Presentation';
 all('.brand .tag').forEach(x=>x.textContent='v0.9.6');
 const updates=$('#updates');if(updates)updates.textContent='UPDATE LOG  •  v0.9.6';
 const latest=$('.latest-stat');if(latest){const b=$('b',latest),s=$('span',latest);if(b)b.textContent='v0.9.6';if(s)s.textContent='Premium Presentation • Final Stability Pass'}
 const health=$('.build-health b');if(health)health.textContent='PREMIUM PRESENTATION • v0.9.6 • STABLE';
 const chooser=$('#deviceChooser .eyebrow');if(chooser)chooser.textContent='MULTIVERSE ARENA • v0.9.6';
 const pause=$('#pauseOverlay .eyebrow');if(pause)pause.textContent='MULTIVERSE ARENA';
}
function refresh(){finalStyle();brand();roles();homeDetails();screenLabels();updateLog()}
function init(){environment();refresh();window.MultiverseArenaPremium={version:BUILD,refresh}}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
addEventListener('fightarena-ready',()=>setTimeout(()=>window.MultiverseArenaPremium?.refresh(),80),{once:true});
})();

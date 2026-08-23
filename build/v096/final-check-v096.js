const fs=require('fs');
const path=require('path');
const root=path.resolve(__dirname,'../..');
const premium=fs.readFileSync(path.join(root,'premium-v096.js'),'utf8');
const ui=fs.readFileSync(path.join(root,'ui-v09571.js'),'utf8');
const css=fs.readFileSync(path.join(root,'premium-v096-final.css'),'utf8');
const boot=fs.readFileSync(path.join(root,'app/core/bootstrap-v096.js'),'utf8');

for(const marker of [
 "const BUILD='0.9.6'",
 "const FINAL_STYLE='premium-v096-final.css?v=096f'",
 "if(!s||s.dataset.premiumLabel)continue",
 'Final Stability Pass',
 'window.MultiverseArenaPremium={version:BUILD,refresh}'
])if(!premium.includes(marker))throw new Error('v0.9.6 final premium marker missing: '+marker);

for(const forbidden of ['new MutationObserver','setInterval(','requestAnimationFrame(loop)','screenWatch('])if(premium.includes(forbidden))throw new Error('v0.9.6 premium final runtime contains risky pattern: '+forbidden);

if(ui.includes('function screenWatch'))throw new Error('redundant broad UI screen observer returned');
if(!ui.includes("dataset.uiMotion='css'"))throw new Error('CSS screen-motion marker missing');
if(!ui.includes('function rewardWatch'))throw new Error('victory reward feedback missing');
const observerCount=(ui.match(/new MutationObserver/g)||[]).length;
if(observerCount!==1)throw new Error('UI observer count must stay at one narrow results observer, got '+observerCount);

for(const marker of [
 'Touch devices should never keep a translated desktop hover state',
 '.device-tablet #fight .fighthead',
 '.device-iphone #fight .fighthead',
 '@media (hover:none),(pointer:coarse)',
 '@media (prefers-reduced-motion:reduce)'
])if(!css.includes(marker))throw new Error('v0.9.6 final CSS marker missing: '+marker);

for(const forbidden of ['#fight .fighter{','#fight.active .fighter{','animation: safeHit','requestAnimationFrame'])if(css.includes(forbidden))throw new Error('v0.9.6 final CSS must stay presentation-only: '+forbidden);

for(const stable of ["const SAVE_KEY='fightArenaV08'","'touch-v0941.js'","'stability-v0941.js'","'campaign-v0957.js'","'polish-v09572.js'","'premium-v096.js'"])if(!boot.includes(stable))throw new Error('v0.9.6 stable bootstrap marker missing: '+stable);

console.log('v0.9.6 final premium polish checks passed');

const fs=require('fs');
const path=require('path');
const root=path.resolve(__dirname,'../..');
const premium=fs.readFileSync(path.join(root,'premium-v096.js'),'utf8');
const ui=fs.readFileSync(path.join(root,'ui-v09571.js'),'utf8');
const css=fs.readFileSync(path.join(root,'premium-v096-final.css'),'utf8');
const boot=fs.readFileSync(path.join(root,'app/core/bootstrap-v096.js'),'utf8');
const update62=fs.readFileSync(path.join(root,'update-v0962.js'),'utf8');
const update63=fs.readFileSync(path.join(root,'update-v0963.js'),'utf8');
const update64=fs.readFileSync(path.join(root,'update-v0964.js'),'utf8');

for(const marker of [
 "const BUILD='0.9.6'",
 "const FINAL_STYLE='premium-v096-final.css?v=096f2'",
 "if(!s||s.dataset.premiumLabel)continue",
 'Final Stability Pass',
 'window.MultiverseArenaPremium={version:BUILD,refresh}',
 'const ownsRelease='
])if(!premium.includes(marker))throw new Error('v0.9.6 premium marker missing: '+marker);
for(const forbidden of ['new MutationObserver','setInterval(','requestAnimationFrame(loop)','screenWatch('])if(premium.includes(forbidden))throw new Error('v0.9.6 premium runtime contains risky pattern: '+forbidden);
if(ui.includes('function screenWatch'))throw new Error('redundant broad UI screen observer returned');
if(!ui.includes("dataset.uiMotion='css'"))throw new Error('CSS screen-motion marker missing');
const observerCount=(ui.match(/new MutationObserver/g)||[]).length;if(observerCount!==1)throw new Error('UI observer count must stay at one narrow results observer, got '+observerCount);
for(const marker of ['Touch devices should never keep a translated desktop hover state','.buttons #training{grid-column:3!important}','.buttons #settings{grid-column:1!important}','.device-tablet .buttons #training','@media (hover:none),(pointer:coarse)','@media (prefers-reduced-motion:reduce)'])if(!css.includes(marker))throw new Error('premium CSS marker missing: '+marker);
for(const forbidden of ['#fight .fighter{','#fight.active .fighter{','animation: safeHit','requestAnimationFrame','.device-tablet .buttons>#training','.device-tablet .buttons>#settings'])if(css.includes(forbidden))throw new Error('premium CSS contains unsafe or ineffective selector: '+forbidden);
for(const legacy of [update62,update63,update64])if(!legacy.includes('const ownsRelease='))throw new Error('legacy release layer can overwrite newer branding');
for(const stable of ["const BUILD='0.9.6.6'","const ASSET='0966'","const SAVE_KEY='fightArenaV08'","'touch-v0941.js'","'stability-v0941.js'","'campaign-v0957.js'","'polish-v09572.js'","'premium-v096.js'","'update-v0962.js'","'update-v0963.js'","'update-v0964.js'","'update-v0966.js'"])if(!boot.includes(stable))throw new Error('v0.9.6.6 stable bootstrap marker missing: '+stable);
if(boot.includes("'update-v0965.js'"))throw new Error('v0.9.6.5 UI runtime must not double-render under v0.9.6.6');
console.log('v0.9.6.6 premium compatibility checks passed');

const fs=require('fs');const path=require('path');
const root=path.resolve(__dirname,'../..');
const js=fs.readFileSync(path.join(root,'polish-v09572.js'),'utf8');
for(const marker of ["const BUILD='0.9.5.7.2.2'",'setInterval(tick,150)','function bossHud()','function versusIntro()','function profileDetails()','function gauntletCompletion()'])if(!js.includes(marker))throw new Error('v095722 marker missing: '+marker);
for(const forbidden of ['new MutationObserver','requestAnimationFrame(loop)','classList.add(\'impact-pop\')','classList.remove(\'impact-pop\')','setInterval(bossHud,120)'])if(js.includes(forbidden))throw new Error('v095722 forbidden fight-freeze pattern: '+forbidden);
const css=fs.readFileSync(path.join(root,'stability-v095722.css'),'utf8');
for(const marker of ['.fighter.hurt','safeHit95722','backdrop-filter:none'])if(!css.includes(marker))throw new Error('v095722 CSS marker missing: '+marker);
console.log('v0.9.5.7.2.2 fight stability guard passed');

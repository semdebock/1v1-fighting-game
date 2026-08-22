/* Fight Arena v0.9.2 — Device & Controls QA */
(() => {
  function run(){
    const failures=[];
    const required=['deviceChooser','deviceModeBtn','devicePill','portraitHint','desktopControlsHint','gallery','play','start'];
    if(window.FightArena?.version!=='0.9.2')failures.push('version');
    required.forEach(id=>{if(!document.getElementById(id))failures.push('dom:'+id)});
    const api=window.FightArenaControls;
    ['setMove','punch','kick','special','jump','block','ability','pause'].forEach(k=>{if(typeof api?.[k]!=='function')failures.push('control:'+k)});
    if(!window.FightArenaDevice)failures.push('device-api');
    const mode=window.FightArenaDevice?.resolved;
    if(mode&&!['iphone','tablet','desktop'].includes(mode))failures.push('device-mode');
    window.__FightArenaV092QA={ok:failures.length===0,failures,mode};
    const h=document.querySelector('.build-health b');if(h)h.textContent=failures.length?'v0.9.2 • QA WARNING':`v0.9.2 • ${String(mode||'DEVICE').toUpperCase()} READY`;
    if(failures.length)console.error('[Fight Arena v0.9.2 QA]',failures);
  }
  if(window.FightArena?.version==='0.9.2'&&window.FightArenaControls)run();
  else addEventListener('fightarena-ready',run,{once:true});
})();
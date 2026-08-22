// Fight Arena v0.8.7 — release alignment / compatibility guard
(() => {
  const $=id=>document.getElementById(id);
  // Restore campaign progress captured before the older v0.8.6 compatibility layer runs.
  const backedUp=Number(window.__v087UnlockedBackup)||1;
  if(typeof levels!=='undefined'&&levels.length>=6){
    save.unlocked=clamp(Math.max(Number(save.unlocked)||1,backedUp),1,levels.length);
    persist();
    try{renderLevels();renderLevelInfo()}catch{}
  }
  function stamp(){
    document.title='Fight Arena v0.8.7';
    document.querySelectorAll('.brand .tag').forEach(x=>x.textContent='v0.8.7');
    const u=$('updates');if(u)u.textContent='📋 UPDATE LOG • v0.8.7';
    const t=document.querySelector('#home .hero-copy .tag');if(t)t.textContent='VILLAIN EXPANSION';
    const p=document.querySelector('#home .hero-copy p');if(p)p.textContent='Three premium villains enter Neo City: Mysterio, Kingpin and Prowler. Every fifth level is now a Boss Encounter.';
    const hubs=document.querySelectorAll('.hub-card');
    if(hubs[2]){const a=hubs[2].querySelector('strong'),b=hubs[2].querySelector('span');if(a)a.textContent='v0.8.7';if(b)b.textContent='Villain Expansion • Boss System'}
    const dash=document.querySelector('.hero-dashboard');
    if(dash){const stats=dash.querySelectorAll('.dash-stat b'),n=clamp(Number(save.unlocked)||1,1,levels.length);if(stats[2])stats[2].textContent=levels[n-1].name.toUpperCase();const h=dash.querySelector('.build-health b');if(h)h.textContent='STABLE • v0.8.7'}
  }
  stamp();
  // Older compatibility scripts still own periodic UI refreshers; keep the current release label authoritative.
  setInterval(stamp,180);
})();
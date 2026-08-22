// Fight Arena v0.8.6 — Stability & Combat Rebuild
(() => {
  const $ = id => document.getElementById(id);
  document.title='Fight Arena v0.8.6';

  // --- Canonical fighter data: every playable fighter gets complete combat stats. ---
  Object.assign(chars.Rookie,{punch:8,kick:13,power:55,speed:60});
  Object.assign(chars['El Primo'],{punch:11,kick:16,power:82,speed:42});
  Object.assign(chars['Spider-Man'],{punch:9,kick:14,power:68,speed:88});
  Object.assign(chars['Captain America'],{punch:10,kick:14,power:76,speed:58,price:2200,special:'Avenger Strike'});
  Object.assign(chars['Iron Man'],{punch:10,kick:15,power:88,speed:76,price:3200,special:'Unibeam'});

  // --- Save repair / data guards. ---
  save.coins=Number.isFinite(Number(save.coins))?Math.max(0,Math.floor(Number(save.coins))):1250;
  save.gems=Number.isFinite(Number(save.gems))?Math.max(0,Math.floor(Number(save.gems))):50;
  save.lv=Number.isFinite(Number(save.lv))?Math.max(1,Math.floor(Number(save.lv))):1;
  save.xp=Number.isFinite(Number(save.xp))?Math.max(0,Math.floor(Number(save.xp))):0;
  save.unlocked=Number.isFinite(Number(save.unlocked))?clamp(Math.floor(Number(save.unlocked)),1,levels.length):1;
  if(!chars[save.selected]||!save.owned?.[save.selected]) save.selected='Rookie';
  save.owned={Rookie:true,'El Primo':false,'Spider-Man':false,'Captain America':false,'Iron Man':false,...(save.owned||{})};
  persist();

  // --- Damage safety layer. Missing/invalid attack data can no longer poison enemy HP with NaN. ---
  const oldDamageEnemy=damageEnemy;
  damageEnemy=function(amount,push=2,big=false){
    let n=Number(amount);
    if(!Number.isFinite(n)||n<=0){console.warn('[v0.8.6] Blocked invalid damage value:',amount);return;}
    if(F){if(!Number.isFinite(F.eh))F.eh=F.em;if(!Number.isFinite(F.em)||F.em<=0)F.em=100;}
    return oldDamageEnemy(n,push,big);
  };

  // --- Reliable normal combat. ---
  function stableAttack(kind){
    if(!F||F.over||F.busy)return;
    const c=chars[save.selected]||chars.Rookie;
    const dmg=Number(kind==='kick'?c.kick:c.punch);
    if(!Number.isFinite(dmg)||dmg<=0){toast('ATTACK DATA ERROR');return;}
    F.busy=true;
    const p=$('pF');
    p?.classList.remove('idle');p?.classList.add(kind==='kick'?'kicking':'punching');
    const reach=kind==='kick'?16:15;
    if(Math.abs(F.ex-F.px)<reach){setTimeout(()=>{if(F&&!F.over)damageEnemy(dmg,kind==='kick'?4:2,false)},70)}
    setTimeout(()=>{p?.classList.remove('kicking','punching');p?.classList.add('idle');if(F)F.busy=false},260);
  }
  attack=stableAttack;
  if($('punch'))$('punch').onpointerdown=()=>stableAttack('punch');
  if($('kick'))$('kick').onpointerdown=()=>stableAttack('kick');

  // --- Robust gallery: correct rank labels, prices and complete stats for every hero. ---
  const rankMeta={
    'Rookie':'COMMON • BALANCED','El Primo':'RARE • TANK','Spider-Man':'EPIC • AGILE',
    'Captain America':'A RANK • TACTICAL','Iron Man':'S RANK • TECH / FLIGHT'
  };
  renderChars=function(){
    const box=$('charCards');if(!box)return;box.innerHTML='';
    Object.entries(chars).forEach(([name,c])=>{
      const b=document.createElement('button');
      b.className='card '+(chosen===name?'active ':'')+(!save.owned[name]?'locked':'');
      b.innerHTML=`<div class="eyebrow">${rankMeta[name]||'FIGHTER'}</div><div class="portrait">${previewMarkup(name)}</div><h3>${name.toUpperCase()}</h3><small>${save.owned[name]?(save.selected===name?'✓ SELECTED':'OWNED'):'🪙 '+Number(c.price||0).toLocaleString()}</small>`;
      b.onclick=()=>{chosen=name;renderChars();renderCharInfo()};box.appendChild(b);
    });
  };
  renderCharInfo=function(){
    const c=chars[chosen]||chars.Rookie;
    $('charTitle').textContent=chosen.toUpperCase();
    $('charDesc').textContent=c.desc||'Arena fighter.';
    $('charStats').innerHTML=`<div><small>HEALTH</small>${Number(c.hp)||100}</div><div><small>POWER</small>${Number(c.power)||0}</div><div><small>SPEED</small>${Number(c.speed)||0}</div><div><small>SPECIAL</small>${typeof c.special==='string'?c.special:(chosen==='Spider-Man'?'Web Burst':'Special')}</div>`;
    $('charAction').textContent=!save.owned[chosen]?`BUY • ${Number(c.price||0).toLocaleString()} 🪙`:save.selected===chosen?'SELECTED':'SELECT';
    $('charAction').disabled=save.selected===chosen;
  };

  // Keep gallery/action state synced after purchases without replacing purchase logic.
  const oldCharAction=$('charAction')?.onclick;
  if($('charAction'))$('charAction').onclick=()=>{oldCharAction&&oldCharAction();setTimeout(()=>{renderChars();renderCharInfo();refreshHub()},0)};

  function refreshHub(){
    const owned=Object.keys(chars).filter(n=>save.owned?.[n]).length;
    const summary=document.querySelector('.gallery-summary');
    if(summary)summary.innerHTML=`<div><b>FIGHTER ROSTER</b><span> ${owned} owned • ${Object.keys(chars).length} total</span></div><div class="role-chip">${save.selected.toUpperCase()} SELECTED</div>`;
    const hubs=document.querySelectorAll('.hub-card');
    if(hubs[1]){const st=hubs[1].querySelector('strong');if(st)st.textContent=`${owned} / ${Object.keys(chars).length} FIGHTERS`;const sp=hubs[1].querySelector('span');if(sp)sp.textContent=`Selected: ${save.selected}`;const bar=hubs[1].querySelector('.hub-progress i');if(bar)bar.style.width=Math.round(owned/Object.keys(chars).length*100)+'%'}
    const dash=document.querySelector('.hero-dashboard');
    if(dash){const stats=dash.querySelectorAll('.dash-stat b');if(stats[0])stats[0].textContent=save.selected.toUpperCase();if(stats[1])stats[1].textContent=`${owned}/${Object.keys(chars).length}`;if($('dashCoins'))$('dashCoins').textContent=save.coins+' 🪙'}
  }

  // --- Version/UI alignment. This runs after older scripts and wins their labels. ---
  function stamp086(){
    document.querySelectorAll('.brand .tag').forEach(x=>x.textContent='v0.8.6');
    const u=$('updates');if(u)u.textContent='📋 UPDATE LOG • v0.8.6';
    const t=document.querySelector('#home .hero-copy .tag');if(t)t.textContent='STABILITY & COMBAT REBUILD';
    const p=document.querySelector('#home .hero-copy p');if(p)p.textContent='A rebuilt combat foundation: reliable attacks, safer saves, cleaner fighter data and a unified hero roster.';
  }

  const panel=document.querySelector('#updatesScreen .panel');
  if(panel){
    // Preserve the redeem center by recreating it below the v0.8.6 changelog.
    panel.innerHTML=`<span class="tag">v0.8.6 • STABILITY & COMBAT REBUILD</span><h2>ONE SYSTEM. CLEANER COMBAT.</h2><div class="changelog">
      <div class="log-item"><div class="log-icon">👊</div><div><b>Normal attacks repaired</b><p>Punch and Kick now have valid damage stats for all five playable fighters, including Iron Man and Captain America.</p></div></div>
      <div class="log-item"><div class="log-icon">🧱</div><div><b>Damage safety layer</b><p>Invalid damage values are blocked before they can corrupt enemy HP or break a match.</p></div></div>
      <div class="log-item"><div class="log-icon">🧰</div><div><b>Save self-repair</b><p>Coins, gems, XP, selected fighter and campaign unlock data are checked and repaired on load.</p></div></div>
      <div class="log-item"><div class="log-icon">👥</div><div><b>Roster data unified</b><p>Correct ranks, prices, Power, Speed and Special labels now use one consistent gallery format.</p></div></div>
      <div class="log-item"><div class="log-icon">🕸️</div><div><b>Hero kits retained</b><p>Spider-Man web abilities, Iron Man flight/repulsors and Captain America shield abilities remain intact.</p></div></div>
    </div><div class="redeem-card"><div><small>REDEEM CENTER</small><h3>ENTER A GAME CODE</h3><p>Special testing codes can be claimed once per save.</p></div><div class="redeem-row"><input id="redeemInput" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Enter code"><button id="redeemBtn">REDEEM</button></div><div id="redeemStatus" class="redeem-status">Waiting for code…</div></div>`;
    const input=$('redeemInput'),btn=$('redeemBtn'),status=$('redeemStatus');
    if(btn&&input&&status){btn.onclick=()=>{const code=input.value.trim();if(code!=='BrandNewDay'){status.textContent='❌ INVALID CODE';status.className='redeem-status bad';return}if(save.redeemedBrandNewDay){status.textContent='✓ CODE ALREADY REDEEMED';status.className='redeem-status used';return}save.coins+=5000;save.redeemedBrandNewDay=true;persist();refreshHub();status.textContent='✓ +5,000 COINS ADDED';status.className='redeem-status good';input.value='';toast('+5,000 COINS 🪙')};input.addEventListener('keydown',e=>{if(e.key==='Enter')btn.click()})}
  }

  // Small diagnostics badge in the command center.
  const dash=document.querySelector('.hero-dashboard');
  if(dash&&!document.querySelector('.build-health')){const d=document.createElement('div');d.className='build-health';d.innerHTML='<span>◆ BUILD HEALTH</span><b>STABLE • v0.8.6</b>';dash.appendChild(d)}

  renderChars();chosen=save.selected;renderCharInfo();hud();refreshHub();stamp086();
  // Older v0.8.5.1 script updates labels on an interval, so keep v0.8.6 authoritative.
  setInterval(()=>{stamp086();refreshHub()},900);
})();
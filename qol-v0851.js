// Fight Arena v0.8.5.1 — Menu polish + redeem code
(() => {
  const $ = id => document.getElementById(id);
  document.title = 'Fight Arena v0.8.5.1';

  function refresh0851(){
    document.querySelectorAll('.brand .tag').forEach(x=>x.textContent='v0.8.5.1');
    const updateBtn=$('updates'); if(updateBtn) updateBtn.textContent='📋 UPDATE LOG • v0.8.5.1';
    const heroTag=document.querySelector('#home .hero-copy .tag'); if(heroTag) heroTag.textContent='HERO HUB UPDATE';
    const intro=document.querySelector('#home .hero-copy p'); if(intro) intro.textContent='Choose your fighter, build your roster and prepare for the next villain wave.';
    const hubs=document.querySelectorAll('.hub-card');
    if(hubs[2]){hubs[2].querySelector('strong').textContent='v0.8.5.1';const s=hubs[2].querySelector('span');if(s)s.textContent='Hero Hub + Redeem Codes';}
  }

  refresh0851();

  // Expanded home hub
  const home=document.querySelector('#home .home');
  if(home&&!document.querySelector('.hero-dashboard')){
    const dash=document.createElement('div');
    dash.className='hero-dashboard';
    const owned=Object.values(save.owned||{}).filter(Boolean).length;
    const nextLevel=Math.min(save.unlocked||1, levels.length);
    const nextEnemy=levels[nextLevel-1]?.name||'Unknown';
    dash.innerHTML=`
      <div class="dash-title"><div><small>FIGHTER COMMAND CENTER</small><strong>READY FOR BATTLE</strong></div><span class="live-dot">● ONLINE</span></div>
      <div class="dash-grid">
        <div class="dash-stat"><small>ACTIVE HERO</small><b>${save.selected.toUpperCase()}</b><span>Current selected fighter</span></div>
        <div class="dash-stat"><small>ROSTER</small><b>${owned}/${Object.keys(chars).length}</b><span>Heroes unlocked</span></div>
        <div class="dash-stat"><small>NEXT TARGET</small><b>${nextEnemy.toUpperCase()}</b><span>Campaign Level ${nextLevel}</span></div>
        <div class="dash-stat coin-stat"><small>BALANCE</small><b id="dashCoins">${save.coins} 🪙</b><span>Spend coins in Character Gallery</span></div>
      </div>`;
    home.appendChild(dash);
  }

  // Update log + redeem panel
  const panel=document.querySelector('#updatesScreen .panel');
  if(panel){
    panel.innerHTML=`
      <span class="tag">v0.8.5.1 • HERO HUB UPDATE</span>
      <h2>BETTER HUB. FASTER TESTING.</h2>
      <div class="changelog">
        <div class="log-item"><div class="log-icon">🏠</div><div><b>Expanded Main Menu</b><p>New command-center dashboard with active fighter, roster progress, next opponent and live coin balance.</p></div></div>
        <div class="log-item"><div class="log-icon">🦾</div><div><b>Hero Expansion retained</b><p>Iron Man and Captain America remain fully playable with their v0.8.5 abilities and rankings.</p></div></div>
        <div class="log-item"><div class="log-icon">🎟️</div><div><b>Redeem Codes</b><p>Enter special game codes below to unlock testing rewards.</p></div></div>
      </div>
      <div class="redeem-card">
        <div><small>REDEEM CENTER</small><h3>ENTER A GAME CODE</h3><p>Codes are case-sensitive. Each reward code can be claimed once per save.</p></div>
        <div class="redeem-row"><input id="redeemInput" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Enter code"><button id="redeemBtn">REDEEM</button></div>
        <div id="redeemStatus" class="redeem-status">Waiting for code…</div>
      </div>`;
  }

  const input=$('redeemInput'), btn=$('redeemBtn'), status=$('redeemStatus');
  if(btn&&input&&status){
    btn.onclick=()=>{
      const code=input.value.trim();
      if(code!=='BrandNewDay'){
        status.textContent='❌ INVALID CODE';
        status.className='redeem-status bad';
        return;
      }
      if(save.redeemedBrandNewDay){
        status.textContent='✓ CODE ALREADY REDEEMED';
        status.className='redeem-status used';
        return;
      }
      save.coins += 5000;
      save.redeemedBrandNewDay = true;
      persist();
      if($('dashCoins')) $('dashCoins').textContent=save.coins+' 🪙';
      status.textContent='✓ +5,000 COINS ADDED';
      status.className='redeem-status good';
      input.value='';
      toast('+5,000 COINS 🪙');
    };
    input.addEventListener('keydown',e=>{if(e.key==='Enter')btn.click()});
  }

  // Keep dashboard coin count synced after purchases/rewards.
  setInterval(()=>{if($('dashCoins')) $('dashCoins').textContent=save.coins+' 🪙';refresh0851();},700);
})();
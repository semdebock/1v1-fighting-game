// Fight Arena v0.8.5.2 — Menu polish + redeem code + combat hotfix log
(() => {
  const $ = id => document.getElementById(id);
  document.title = 'Fight Arena v0.8.5.2';

  function refresh0852(){
    document.querySelectorAll('.brand .tag').forEach(x=>x.textContent='v0.8.5.2');
    const updateBtn=$('updates'); if(updateBtn) updateBtn.textContent='📋 UPDATE LOG • v0.8.5.2';
    const heroTag=document.querySelector('#home .hero-copy .tag'); if(heroTag) heroTag.textContent='HERO COMBAT HOTFIX';
    const intro=document.querySelector('#home .hero-copy p'); if(intro) intro.textContent='Hero abilities now hit properly, fighter stats are cleaner, and Captain America finally lets go of his shield.';
    const hubs=document.querySelectorAll('.hub-card');
    if(hubs[2]){hubs[2].querySelector('strong').textContent='v0.8.5.2';const s=hubs[2].querySelector('span');if(s)s.textContent='Hero Combat Hotfix';}
  }

  refresh0852();

  const home=document.querySelector('#home .home');
  if(home&&!document.querySelector('.hero-dashboard')){
    const dash=document.createElement('div');dash.className='hero-dashboard';
    const owned=Object.values(save.owned||{}).filter(Boolean).length;
    const nextLevel=Math.min(save.unlocked||1,levels.length),nextEnemy=levels[nextLevel-1]?.name||'Unknown';
    dash.innerHTML=`<div class="dash-title"><div><small>FIGHTER COMMAND CENTER</small><strong>READY FOR BATTLE</strong></div><span class="live-dot">● ONLINE</span></div><div class="dash-grid"><div class="dash-stat"><small>ACTIVE HERO</small><b>${save.selected.toUpperCase()}</b><span>Current selected fighter</span></div><div class="dash-stat"><small>ROSTER</small><b>${owned}/${Object.keys(chars).length}</b><span>Heroes unlocked</span></div><div class="dash-stat"><small>NEXT TARGET</small><b>${nextEnemy.toUpperCase()}</b><span>Campaign Level ${nextLevel}</span></div><div class="dash-stat coin-stat"><small>BALANCE</small><b id="dashCoins">${save.coins} 🪙</b><span>Spend coins in Character Gallery</span></div></div>`;
    home.appendChild(dash);
  }

  const panel=document.querySelector('#updatesScreen .panel');
  if(panel){panel.innerHTML=`<span class="tag">v0.8.5.2 • HERO COMBAT HOTFIX</span><h2>HERO POWERS NOW HIT HARD.</h2><div class="changelog"><div class="log-item"><div class="log-icon">💥</div><div><b>Special damage fixed</b><p>Iron Man and Captain America's projectile and full-meter abilities now reliably reduce enemy HP.</p></div></div><div class="log-item"><div class="log-icon">⚡</div><div><b>Speed stats corrected</b><p>Iron Man and Captain America now use the same 0–100 gallery speed scale as the rest of the roster.</p></div></div><div class="log-item"><div class="log-icon">🛡️</div><div><b>Shield throw polish</b><p>Captain America's held shield disappears while the thrown shield is in flight and returns when it comes back.</p></div></div></div><div class="redeem-card"><div><small>REDEEM CENTER</small><h3>ENTER A GAME CODE</h3><p>Each reward code can be claimed once per save.</p></div><div class="redeem-row"><input id="redeemInput" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Enter code"><button id="redeemBtn">REDEEM</button></div><div id="redeemStatus" class="redeem-status">Waiting for code…</div></div>`;}

  const input=$('redeemInput'),btn=$('redeemBtn'),status=$('redeemStatus');
  if(btn&&input&&status){btn.onclick=()=>{const code=input.value.trim();if(code!=='BrandNewDay'){status.textContent='❌ INVALID CODE';status.className='redeem-status bad';return}if(save.redeemedBrandNewDay){status.textContent='✓ CODE ALREADY REDEEMED';status.className='redeem-status used';return}save.coins+=5000;save.redeemedBrandNewDay=true;persist();if($('dashCoins'))$('dashCoins').textContent=save.coins+' 🪙';status.textContent='✓ +5,000 COINS ADDED';status.className='redeem-status good';input.value='';toast('+5,000 COINS 🪙')};input.addEventListener('keydown',e=>{if(e.key==='Enter')btn.click()})}
  setInterval(()=>{if($('dashCoins'))$('dashCoins').textContent=save.coins+' 🪙';refresh0852()},700);
})();
// Fight Arena legacy Hero Hub layer — retained for v0.8.6
(() => {
  const $ = id => document.getElementById(id);
  const home=document.querySelector('#home .home');
  if(home&&!document.querySelector('.hero-dashboard')){
    const dash=document.createElement('div');dash.className='hero-dashboard';
    const owned=Object.values(save.owned||{}).filter(Boolean).length;
    const nextLevel=Math.min(save.unlocked||1,levels.length),nextEnemy=levels[nextLevel-1]?.name||'Unknown';
    dash.innerHTML=`<div class="dash-title"><div><small>FIGHTER COMMAND CENTER</small><strong>READY FOR BATTLE</strong></div><span class="live-dot">● ONLINE</span></div><div class="dash-grid"><div class="dash-stat"><small>ACTIVE HERO</small><b>${save.selected.toUpperCase()}</b><span>Current selected fighter</span></div><div class="dash-stat"><small>ROSTER</small><b>${owned}/${Object.keys(chars).length}</b><span>Heroes unlocked</span></div><div class="dash-stat"><small>NEXT TARGET</small><b>${nextEnemy.toUpperCase()}</b><span>Campaign Level ${nextLevel}</span></div><div class="dash-stat coin-stat"><small>BALANCE</small><b id="dashCoins">${save.coins} 🪙</b><span>Spend coins in Character Gallery</span></div></div>`;
    home.appendChild(dash);
  }
  // v0.8.6 owns version labels, changelog and redeem controls. This old layer only keeps the live balance synced.
  setInterval(()=>{if($('dashCoins'))$('dashCoins').textContent=save.coins+' 🪙';},700);
})();
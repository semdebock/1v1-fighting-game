// Fight Arena v0.8.4 — Interface & Web Burst Fix
(() => {
  const $ = id => document.getElementById(id);
  const now = () => performance.now() / 1000;
  document.title = 'Fight Arena v0.8.4';

  // Version labels and update log
  document.querySelectorAll('.brand .tag').forEach(x => x.textContent = 'v0.8.4');
  const updateBtn = $('updates');
  if (updateBtn) updateBtn.textContent = '📋 UPDATE LOG • v0.8.4';
  const heroTag = document.querySelector('#home .hero-copy .tag');
  if (heroTag) heroTag.textContent = 'INTERFACE POLISH UPDATE';
  const logPanel = document.querySelector('#updatesScreen .panel');
  if (logPanel) logPanel.innerHTML = `
    <span class="tag">v0.8.4 • INTERFACE & WEB BURST FIX</span>
    <h2>MORE DETAIL. CLEANER ROSTER. FIXED WEBS.</h2>
    <div class="changelog">
      <div class="log-item"><div class="log-icon">🕸️</div><div><b>Web Burst fixed</b><p>Spider-Man's full 100% special now triggers correctly, consumes the meter and hits with heavy web knockback.</p></div></div>
      <div class="log-item"><div class="log-icon">🏙️</div><div><b>Richer main menu</b><p>Added campaign, roster and latest-update status cards so the home screen feels more like a real game hub.</p></div></div>
      <div class="log-item"><div class="log-icon">👥</div><div><b>Cleaner Character Gallery</b><p>Three-column roster layout, larger portraits, clearer ownership states and improved selected-fighter presentation.</p></div></div>
      <div class="log-item"><div class="log-icon">🕷️</div><div><b>Spider-Man web arsenal retained</b><p>Web Shot, Web Pull and Web Dodge stay available as Spider-Man-exclusive combat buttons.</p></div></div>
    </div>`;

  // Main menu game-hub details
  const homeGrid = document.querySelector('#home .home');
  if (homeGrid && !document.querySelector('.home-hub')) {
    const hub = document.createElement('div');
    hub.className = 'home-hub';
    const ownedCount = Object.values(save.owned || {}).filter(Boolean).length;
    const totalFighters = Object.keys(chars).length;
    const unlockedLevels = Math.min(save.unlocked || 1, levels.length);
    hub.innerHTML = `
      <div class="hub-card"><small>CAMPAIGN</small><strong>LEVEL ${unlockedLevels} / ${levels.length}</strong><span>${unlockedLevels === levels.length ? 'All current stages unlocked' : 'Keep fighting to unlock the next villain'}</span><div class="hub-progress"><i style="width:${Math.round(unlockedLevels/levels.length*100)}%"></i></div></div>
      <div class="hub-card"><small>ROSTER</small><strong>${ownedCount} / ${totalFighters} FIGHTERS</strong><span>Selected: ${save.selected}</span><div class="hub-progress"><i style="width:${Math.round(ownedCount/totalFighters*100)}%"></i></div></div>
      <div class="hub-card"><small>LATEST UPDATE</small><strong>v0.8.4</strong><span>Web Burst fix + cleaner interface</span><div class="latest-chip">● LIVE BUILD</div></div>`;
    homeGrid.appendChild(hub);
  }

  // Gallery summary and cleaner role text
  const charCards = $('charCards');
  if (charCards && !document.querySelector('.gallery-summary')) {
    const sum = document.createElement('div');
    sum.className = 'gallery-summary';
    const owned = Object.values(save.owned || {}).filter(Boolean).length;
    sum.innerHTML = `<div><b>FIGHTER ROSTER</b><span> ${owned} owned • ${Object.keys(chars).length} total</span></div><div class="role-chip">${save.selected.toUpperCase()} SELECTED</div>`;
    charCards.parentNode.insertBefore(sum, charCards);
  }
  if (chars['Spider-Man']) chars['Spider-Man'].desc = 'Agile web-slinger with exclusive Web Shot, Web Pull, Web Dodge and a fixed full-meter Web Burst.';

  // Spider-specific web buttons
  const actions = document.querySelector('#fight .actions');
  if (actions && !$('spiderActions')) {
    const row = document.createElement('div');
    row.id = 'spiderActions';
    row.className = 'spider-actions';
    row.innerHTML = `
      <button id="webShotBtn">🕸️ WEB SHOT<span class="web-cd" id="webShotCd">READY</span></button>
      <button id="webPullBtn">↔️ WEB PULL<span class="web-cd" id="webPullCd">READY</span></button>
      <button id="webDodgeBtn">🕷️ WEB DODGE<span class="web-cd" id="webDodgeCd">READY</span></button>`;
    actions.insertAdjacentElement('afterend', row);
  }

  let shotReady = 0, pullReady = 0, dodgeReady = 0;
  function inSpiderFight(){
    try { return !!F && !F.over && save.selected === 'Spider-Man'; } catch { return false; }
  }
  function refreshWebButtons(){
    if (!$('spiderActions')) return;
    const spider = inSpiderFight();
    $('spiderActions').classList.toggle('active', spider);
    if (!spider) return;
    [["webShotBtn","webShotCd",shotReady],["webPullBtn","webPullCd",pullReady],["webDodgeBtn","webDodgeCd",dodgeReady]].forEach(([b,t,r])=>{
      const left = Math.max(0, r-now());
      if ($(b)) $(b).disabled = left > 0;
      if ($(t)) $(t).textContent = left > 0 ? left.toFixed(1)+'s' : 'READY';
    });
    if ($('special')) $('special').classList.toggle('special-ready', F.sp >= 100);
  }
  setInterval(refreshWebButtons, 100);

  function webShotAbility(){
    if (!inSpiderFight() || now() < shotReady) return;
    shotReady = now()+1.6;
    let w = document.createElement('div'), x = F.px+6;
    w.className='webshot2'; w.style.left=x+'%'; w.style.top='48%'; $('arena').appendChild(w);
    const i=setInterval(()=>{
      if(!F||F.over){clearInterval(i);w.remove();return}
      x+=3.8; w.style.left=x+'%';
      if(Math.abs(x-F.ex)<5){clearInterval(i);w.remove();damageEnemy(7,2,false);toast('WEB SHOT!')}
      else if(x>100){clearInterval(i);w.remove()}
    },22);
  }

  function webPullAbility(){
    if (!inSpiderFight() || now() < pullReady) return;
    const gap=F.ex-F.px;
    if(gap>46) return toast('Too far away');
    pullReady=now()+4.2;
    let line=document.createElement('div'); line.className='webline2';
    line.style.left=(F.px+5)+'%'; line.style.top='48%'; line.style.width=Math.max(25,gap*8)+'px'; $('arena').appendChild(line);
    F.ex=Math.max(F.px+9,F.ex-Math.min(15,gap-9));
    damageEnemy(5,0,false); setTimeout(()=>line.remove(),260); toast('WEB PULL!');
  }

  function webDodgeAbility(){
    if (!inSpiderFight() || now() < dodgeReady) return;
    dodgeReady=now()+5;
    F.px=Math.max(3,F.px-12);
    F.block=true;
    const p=$('pF');
    p?.classList.remove('idle'); p?.classList.add('kicking');
    setTimeout(()=>{if(F)F.block=false;p?.classList.remove('kicking');p?.classList.add('idle')},650);
    toast('SPIDER-SENSE!');
  }

  function webBurstAbility(){
    if (!inSpiderFight() || F.sp < 100) return;
    F.sp = 0;
    const p = $('pF');
    p?.classList.remove('idle'); p?.classList.add('specialing');
    const burst = document.createElement('div');
    burst.className='webburst2'; burst.style.left=(F.ex-3)+'%'; burst.style.top='38%'; $('arena').appendChild(burst);
    setTimeout(()=>burst.remove(),430);
    setTimeout(()=>damageEnemy(24,8,true),80);
    setTimeout(()=>{p?.classList.remove('specialing');p?.classList.add('idle')},430);
    draw();
    toast('WEB BURST!');
  }

  $('webShotBtn') && ($('webShotBtn').onpointerdown = webShotAbility);
  $('webPullBtn') && ($('webPullBtn').onpointerdown = webPullAbility);
  $('webDodgeBtn') && ($('webDodgeBtn').onpointerdown = webDodgeAbility);

  // Wrap startFight so Spider HUD always initializes correctly.
  const originalStartFight = window.startFight;
  if (originalStartFight) {
    window.startFight = function(){
      originalStartFight();
      shotReady=pullReady=dodgeReady=0;
      if(save.selected==='Spider-Man'){
        $('special').textContent='🕸️ WEB BURST';
        $('spiderActions')?.classList.add('active');
      } else {
        $('special').textContent='⚡ SPECIAL';
        $('spiderActions')?.classList.remove('active');
      }
      refreshWebButtons();
    };
    if ($('start')) $('start').onclick = window.startFight;
  }

  // FIX: use the shared global lexical F directly instead of window.F.
  // This is why the previous Web Burst handler could silently fail.
  const oldSpecial = $('special')?.onpointerdown;
  if ($('special')) $('special').onpointerdown = () => {
    if (!F || F.over || F.sp < 100) return;
    if (save.selected !== 'Spider-Man') return oldSpecial && oldSpecial();
    webBurstAbility();
  };

  const originalScreen = window.screen;
  if (originalScreen) {
    window.screen = function(s){
      originalScreen(s);
      if(s!=='fight'&&$('spiderActions')) $('spiderActions').classList.remove('active');
    };
  }
})();

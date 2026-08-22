// Fight Arena v0.8.3 — Spider-Man Web Arsenal patch
(() => {
  const $ = id => document.getElementById(id);
  document.title = 'Fight Arena v0.8.3';

  // Version labels / update log
  document.querySelectorAll('.brand .tag').forEach(x => x.textContent = 'v0.8.3');
  const updateBtn = $('updates');
  if (updateBtn) updateBtn.textContent = '📋 UPDATE LOG • v0.8.3';
  const heroTag = document.querySelector('#home .hero-copy .tag');
  if (heroTag) heroTag.textContent = 'WEB ARSENAL UPDATE';
  const logPanel = document.querySelector('#updatesScreen .panel');
  if (logPanel) logPanel.innerHTML = `
    <span class="tag">v0.8.3 • WEB ARSENAL UPDATE</span>
    <h2>SPIDER-MAN COMBAT UPGRADE.</h2>
    <div class="changelog">
      <div class="log-item"><div class="log-icon">🕷️</div><div><b>Cleaner Spider-Man design</b><p>Sharper mask, larger white lenses, cleaner suit panels and a stronger red/blue silhouette.</p></div></div>
      <div class="log-item"><div class="log-icon">🕸️</div><div><b>Web Shot</b><p>A fast ranged web projectile with a short cooldown. Deals light damage and pushes enemies back.</p></div></div>
      <div class="log-item"><div class="log-icon">↔️</div><div><b>Web Pull</b><p>Latch onto an enemy at medium range and drag them closer to set up melee combos.</p></div></div>
      <div class="log-item"><div class="log-icon">🕷️</div><div><b>Web Dodge</b><p>Spider-Sense dodge: jump backward and briefly auto-block incoming damage.</p></div></div>
      <div class="log-item"><div class="log-icon">💥</div><div><b>Web Burst Special</b><p>At 100% special meter, Spider-Man unleashes a heavy web burst for 24 damage and strong knockback.</p></div></div>
    </div>`;

  if (window.chars && chars['Spider-Man']) {
    chars['Spider-Man'].desc = 'Agile web-slinger with exclusive Web Shot, Web Pull and Web Dodge abilities, plus a full-meter Web Burst.';
  }

  // Add Spider-specific controls under standard combat buttons.
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
  const now = () => performance.now() / 1000;
  function refreshWebButtons(){
    if (!$('spiderActions')) return;
    const spider = window.save && save.selected === 'Spider-Man' && window.F;
    $('spiderActions').classList.toggle('active', !!spider);
    if (!spider) return;
    [["webShotBtn","webShotCd",shotReady],["webPullBtn","webPullCd",pullReady],["webDodgeBtn","webDodgeCd",dodgeReady]].forEach(([b,t,r])=>{
      const left=Math.max(0,r-now());
      $(b).disabled=left>0;
      $(t).textContent=left>0?left.toFixed(1)+'s':'READY';
    });
  }
  setInterval(refreshWebButtons,100);

  function webShotAbility(){
    if (!window.F || F.over || save.selected !== 'Spider-Man' || now() < shotReady) return;
    shotReady = now()+1.6;
    let w=document.createElement('div'), x=F.px+6;
    w.className='webshot2'; w.style.left=x+'%'; w.style.top='48%'; $('arena').appendChild(w);
    const i=setInterval(()=>{
      if(!window.F||F.over){clearInterval(i);w.remove();return}
      x+=3.8; w.style.left=x+'%';
      if(Math.abs(x-F.ex)<5){clearInterval(i);w.remove();damageEnemy(7,2,false);toast('WEB SHOT!')}
      else if(x>100){clearInterval(i);w.remove()}
    },22);
  }

  function webPullAbility(){
    if (!window.F || F.over || save.selected !== 'Spider-Man' || now() < pullReady) return;
    const gap=F.ex-F.px;
    if(gap>46) return toast('Too far away');
    pullReady=now()+4.2;
    let line=document.createElement('div'); line.className='webline2';
    line.style.left=(F.px+5)+'%'; line.style.top='48%'; line.style.width=Math.max(25,gap*8)+'px'; $('arena').appendChild(line);
    F.ex=Math.max(F.px+9,F.ex-Math.min(15,gap-9));
    damageEnemy(5,0,false); setTimeout(()=>line.remove(),260); toast('WEB PULL!');
  }

  function webDodgeAbility(){
    if (!window.F || F.over || save.selected !== 'Spider-Man' || now() < dodgeReady) return;
    dodgeReady=now()+5;
    F.px=Math.max(3,F.px-12);
    F.block=true;
    const p=$('pF'); p.classList.remove('idle'); p.classList.add('kicking');
    setTimeout(()=>{if(window.F)F.block=false;p?.classList.remove('kicking');p?.classList.add('idle')},650);
    toast('SPIDER-SENSE!');
  }

  function webBurstAbility(){
    if(!window.F||F.over)return;
    const d=document.createElement('div'); d.className='webburst2'; d.style.left=(F.ex-2)+'%'; d.style.top='39%'; $('arena').appendChild(d);
    setTimeout(()=>d.remove(),380); damageEnemy(24,7,true); toast('WEB BURST!');
  }

  $('webShotBtn').onpointerdown=webShotAbility;
  $('webPullBtn').onpointerdown=webPullAbility;
  $('webDodgeBtn').onpointerdown=webDodgeAbility;

  // Re-wrap start fight so Spider-Man gets his dedicated HUD every match.
  const originalStartFight = window.startFight;
  window.startFight = function(){
    originalStartFight();
    shotReady=pullReady=dodgeReady=0;
    if(save.selected==='Spider-Man'){
      $('special').textContent='🕸️ WEB BURST';
      $('spiderActions').classList.add('active');
    } else {
      $('special').textContent='⚡ SPECIAL';
      $('spiderActions').classList.remove('active');
    }
    refreshWebButtons();
  };
  if ($('start')) $('start').onclick=window.startFight;

  // Spider-Man's full meter special is now Web Burst; other fighters keep their old special.
  const oldSpecial = $('special').onpointerdown;
  $('special').onpointerdown = () => {
    if(!window.F||F.over||F.sp<100)return;
    if(save.selected!=='Spider-Man') return oldSpecial && oldSpecial();
    F.sp=0;
    const p=$('pF'); p.classList.remove('idle'); p.classList.add('specialing');
    setTimeout(webBurstAbility,80);
    setTimeout(()=>{p?.classList.remove('specialing');p?.classList.add('idle')},420);
    draw();
  };

  // Keep Spider controls hidden outside combat.
  const originalScreen = window.screen;
  window.screen = function(s){originalScreen(s); if(s!=='fight'&&$('spiderActions'))$('spiderActions').classList.remove('active')};
})();

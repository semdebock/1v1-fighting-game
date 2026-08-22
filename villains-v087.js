// Fight Arena v0.8.7 — Villain Expansion
(() => {
  const $ = id => document.getElementById(id);
  document.body.dataset.releaseVersion='0.8.7';
  document.title='Fight Arena v0.8.7';

  // Levels 4–6. Every fifth level is treated as a reusable boss slot.
  levels.push(
    {n:4,name:'Mysterio',diff:'Hard+',hp:165,dmg:1.22,coins:350,xp:80,gems:0,desc:'Master of misdirection. Mysterio zones with Mystic Orbs, creates illusion clones and uses smoke teleports to escape pressure.'},
    {n:5,name:'Kingpin',diff:'BOSS',hp:250,dmg:1.34,coins:600,xp:150,gems:5,boss:true,desc:'The first true Arena Boss. Kingpin uses brutal Heavy Punches, Charge Rush, Ground Smash and enters Rage below 35% HP.'},
    {n:6,name:'Prowler',diff:'Expert',hp:175,dmg:1.30,coins:450,xp:100,gems:0,desc:'A high-speed stealth hunter. Prowler cloaks, punishes whiffs with Dash Strike, chains Claw Combos and fires Tech Shock blasts.'}
  );
  save.unlocked=clamp(Number.isFinite(Number(save.unlocked))?Math.floor(Number(save.unlocked)):1,1,levels.length);
  persist();

  const levelRoles={1:'SHADOW ASSASSIN',2:'ROGUE COMBAT ANDROID',3:'GOBLIN BOMBER',4:'ILLUSION CONTROLLER',5:'CRIME LORD • BOSS',6:'STEALTH HUNTER'};

  // Campaign cards now understand all six levels and the reusable every-5-level boss rule.
  renderLevels=function(){
    const box=$('levelCards');if(!box)return;box.innerHTML='';
    levels.forEach(l=>{
      const open=l.n<=save.unlocked,b=document.createElement('button'),isBoss=!!l.boss||l.n%5===0;
      b.className='card '+(chosenLevel===l.n?'active ':'')+(!open?'locked ':'')+(isBoss?'boss-card87':'');
      b.innerHTML=`<div class="eyebrow">LEVEL ${l.n} • ${l.diff}${isBoss?' <span class="boss-badge87">BOSS</span>':''}</div><div class="portrait">${previewMarkup(l.name)}</div><h2>${l.name.toUpperCase()}</h2><div class="level-villain">${levelRoles[l.n]||'ARENA THREAT'}</div><span class="level-reward">${open?`🪙 ${l.coins} • ${l.xp} XP${l.gems?` • 💎 ${l.gems}`:''}`:'🔒 LOCKED'}</span>`;
      b.onclick=()=>{if(!open)return toast('Beat Level '+(l.n-1)+' first');chosenLevel=l.n;renderLevels();renderLevelInfo()};box.appendChild(b);
    });
  };
  renderLevelInfo=function(){
    const l=levels[chosenLevel-1],isBoss=!!l.boss||l.n%5===0;
    $('diff').textContent=(isBoss?'BOSS • ':'')+l.diff.toUpperCase();
    $('levelTitle').textContent=`LEVEL ${l.n} — ${l.name.toUpperCase()}`;
    $('levelDesc').textContent=l.desc;
    $('levelStats').innerHTML=`<div><small>HP</small>${l.hp}</div><div><small>DAMAGE</small>${Math.round(l.dmg*100)}%</div><div><small>REWARD</small>${l.coins} 🪙</div><div><small>${l.gems?'BOSS LOOT':'XP'}</small>${l.gems?`${l.gems} 💎`:l.xp}</div>`;
  };

  // --- Shared villain-combat helpers ---
  let villainTimer87=null;
  const timers87=new Set();
  const later=(fn,ms)=>{const t=setTimeout(()=>{timers87.delete(t);fn()},ms);timers87.add(t);return t};
  function clearVillainTimers(){clearInterval(villainTimer87);villainTimer87=null;timers87.forEach(clearTimeout);timers87.clear()}
  function arenaFx(className,left,top){const e=document.createElement('div');e.className=className;e.style.left=left+'%';e.style.top=top+'%';$('arena')?.appendChild(e);return e}
  function callout(text){const a=$('arena');if(!a)return;const d=document.createElement('div');d.className='villain-callout87';d.textContent=text;a.appendChild(d);later(()=>d.remove(),900)}
  function hitPlayer(amount,big=false,blockable=true){
    if(!F||F.over)return;let n=Number(amount);if(!Number.isFinite(n)||n<=0)return;
    if(blockable&&F.block)n=Math.max(2,Math.round(n*.35));
    F.ph=clamp((Number.isFinite(F.ph)?F.ph:F.pm)-n,0,F.pm);
    $('pF')?.classList.add('hurt');later(()=>$('pF')?.classList.remove('hurt'),160);
    if(F.block&&blockable)blockFx(F.px+3);impact(F.px+4);shake(big);draw();if(F.ph<=0)finish(false);
  }
  function enemyProjectile(className,damage,speed=3,top=46){
    if(!F||F.over)return;let x=F.ex-2;const p=arenaFx(className,x,top),i=setInterval(()=>{
      if(!F||F.over){clearInterval(i);p?.remove();return}x-=speed;p.style.left=x+'%';
      if(Math.abs(x-F.px)<5){clearInterval(i);p.remove();hitPlayer(damage,true,true)}else if(x<0){clearInterval(i);p.remove()}
    },25);
  }

  // --- MYSTERIO AI / abilities ---
  function mysterioOrb(){if(!F||F.over)return;callout('MYSTIC ORB');enemyProjectile('mystic-orb87',12,3.15,44)}
  function mysterioTeleport(){
    if(!F||F.over)return;const old=F.ex;callout('SMOKE TELEPORT');const s1=arenaFx('smoke87',old,38);
    later(()=>s1?.remove(),600);$('eF')?.classList.add('cloaked87');
    later(()=>{if(!F||F.over)return;const min=clamp(F.px+18,18,68),max=clamp(F.px+35,35,91);F.ex=clamp(min+Math.random()*Math.max(4,max-min),F.px+10,92);const s2=arenaFx('smoke87',F.ex,38);later(()=>s2?.remove(),600);$('eF')?.classList.remove('cloaked87');draw()},260);
  }
  function mysterioClone(){
    if(!F||F.over||$('mystClone87'))return;callout('ILLUSION CLONE');const clone=document.createElement('div');clone.id='mystClone87';clone.className='fighter enemy mysterio illusion87';clone.innerHTML=sprite();clone.style.left=clamp(F.ex-(18+Math.random()*16),8,78)+'%';$('arena').appendChild(clone);later(()=>clone.remove(),1500);
  }

  // --- KINGPIN BOSS AI / abilities ---
  function kingpinHeavy(){if(!F||F.over)return;callout('HEAVY PUNCH');$('eF')?.classList.add('warning87');later(()=>{if(!F||F.over)return;$('eF')?.classList.remove('warning87');if(F.ex-F.px<15)hitPlayer(F.v87?.rage?20:17,true,true)},280)}
  function kingpinSmash(){if(!F||F.over)return;callout('GROUND SMASH');const w=arenaFx('kingpin-wave87',F.ex-4,63);later(()=>w?.remove(),520);shake(true);later(()=>{if(F&&F.ex-F.px<25)hitPlayer(F.v87?.rage?19:16,true,true)},180)}
  function kingpinCharge(){
    if(!F||F.over)return;callout('CHARGE RUSH');const e=$('eF');e?.classList.add('warning87');
    later(()=>{if(!F||F.over)return;e?.classList.remove('warning87');e?.classList.add('charge87');const target=clamp(F.px+8,8,88),start=F.ex,steps=8;let n=0;const i=setInterval(()=>{if(!F||F.over){clearInterval(i);e?.classList.remove('charge87');return}n++;F.ex=start+(target-start)*(n/steps);draw();if(F.ex-F.px<10){clearInterval(i);e?.classList.remove('charge87');hitPlayer(F.v87?.rage?23:20,true,true)}else if(n>=steps){clearInterval(i);e?.classList.remove('charge87')}},32)},330);
  }
  function kingpinRage(){if(!F||F.over||F.v87.rage)return;F.v87.rage=true;$('eF')?.classList.add('rage87');callout('KINGPIN RAGE');shake(true);toast('BOSS PHASE 2 — RAGE!')}

  // --- PROWLER AI / abilities ---
  function prowlerCloak(){
    if(!F||F.over||F.v87.cloaked)return;F.v87.cloaked=true;callout('CLOAK');$('eF')?.classList.add('cloaked87');
    later(()=>{if(!F||F.over)return;F.ex=clamp(F.px+12+Math.random()*18,F.px+8,91);$('eF')?.classList.remove('cloaked87');F.v87.cloaked=false;draw();prowlerDash()},650);
  }
  function prowlerDash(){if(!F||F.over)return;callout('DASH STRIKE');$('eF')?.classList.add('prowler-dash87');F.ex=clamp(F.px+8,F.px+7,91);draw();later(()=>{if(F&&!F.over&&F.ex-F.px<12)hitPlayer(15,true,true);$('eF')?.classList.remove('prowler-dash87')},120)}
  function prowlerClaws(){if(!F||F.over)return;callout('CLAW COMBO');[90,210,330].forEach((ms,i)=>later(()=>{if(F&&!F.over&&F.ex-F.px<14)hitPlayer(i===2?7:5,i===2,true)},ms))}
  function prowlerBlast(){if(!F||F.over)return;callout('TECH SHOCK');enemyProjectile('tech-blast87',13,3.65,45)}

  function runVillainAI(){
    if(!F||F.over||!F.v87)return;const l=F.level,gap=F.ex-F.px,v=F.v87;v.main-=.2;v.aux-=.2;
    if(l.name==='Mysterio'){
      if(v.aux<=0){mysterioClone();v.aux=6+Math.random()*2}
      if(v.main<=0){if(gap<14)mysterioTeleport();else(Math.random()<.62?mysterioOrb():mysterioTeleport());v.main=2.4+Math.random()*1.5}
    }else if(l.name==='Kingpin'){
      if(F.eh/F.em<=.35)kingpinRage();if(v.rage&&gap>11)F.ex=clamp(F.ex-.55,F.px+7,92);if(v.rage)F.atk=Math.min(F.atk,.42);
      if(v.main<=0){if(gap>19)kingpinCharge();else if(gap<13&&Math.random()<.5)kingpinHeavy();else kingpinSmash();v.main=(v.rage?2.0:2.8)+Math.random()*1.1}
    }else if(l.name==='Prowler'){
      if(v.aux<=0){prowlerCloak();v.aux=6.5+Math.random()*1.8}
      if(v.main<=0&&!v.cloaked){if(gap>22)(Math.random()<.55?prowlerBlast():prowlerDash());else if(gap<14)prowlerClaws();else prowlerDash();v.main=1.75+Math.random()*1.0}
    }
  }

  // --- Fight integration + reusable Boss System ---
  const previousStart87=window.startFight;
  window.startFight=function(){
    clearVillainTimers();previousStart87();if(!F)return;
    $('fight')?.classList.remove('boss-mode87');$('eF')?.classList.remove('rage87','cloaked87','warning87','charge87','prowler-dash87');
    if(F.level.n>=4){F.v87={main:1.2+Math.random(),aux:4+Math.random()*2,rage:false,cloaked:false};villainTimer87=setInterval(runVillainAI,200)}
    if(F.level.boss||F.level.n%5===0){
      $('fight')?.classList.add('boss-mode87');const intro=document.createElement('div');intro.className='boss-intro87';intro.innerHTML=`<div><small>LEVEL ${F.level.n} • BOSS ENCOUNTER</small><strong>${F.level.name.toUpperCase()}</strong><span>DEFEAT THE BOSS • 💎 ${F.level.gems||5}</span></div>`;$('arena').appendChild(intro);later(()=>intro.remove(),1400);
    }
  };
  $('start').onclick=window.startFight;

  const previousFinish87=finish;
  finish=function(win){
    if(!F||F.over)return;const l=F.level,grantBossGems=!!win&&(l.boss||l.n%5===0)&&Number(l.gems)>0;clearVillainTimers();previousFinish87(win);
    if(grantBossGems)later(()=>{save.gems+=Number(l.gems);persist();const u=$('unlock');if(u)u.textContent=(u.textContent?u.textContent+' • ':'')+`💎 +${l.gems} BOSS DIAMONDS`;toast(`BOSS LOOT +${l.gems} 💎`)},690);
  };
  const oldQuit87=$('quit')?.onclick;if($('quit'))$('quit').onclick=()=>{clearVillainTimers();$('fight')?.classList.remove('boss-mode87');oldQuit87&&oldQuit87()};

  // Campaign buttons were capped at Level 3 in the original build.
  $('play').onclick=()=>{chosenLevel=clamp(save.unlocked,1,levels.length);renderLevels();renderLevelInfo();screen('levels')};
  $('continue').onclick=()=>{chosenLevel=clamp(save.unlocked,1,levels.length);renderLevels();renderLevelInfo();screen('levels')};

  function bindRedeem(){
    const input=$('redeemInput'),btn=$('redeemBtn'),status=$('redeemStatus');if(!input||!btn||!status)return;
    btn.onclick=()=>{const code=input.value.trim();if(code!=='BrandNewDay'){status.textContent='❌ INVALID CODE';status.className='redeem-status bad';return}if(save.redeemedBrandNewDay){status.textContent='✓ CODE ALREADY REDEEMED';status.className='redeem-status used';return}save.coins+=5000;save.redeemedBrandNewDay=true;persist();status.textContent='✓ +5,000 COINS ADDED';status.className='redeem-status good';input.value='';toast('+5,000 COINS 🪙')};
  }
  function stamp087(){
    document.querySelectorAll('.brand .tag').forEach(x=>x.textContent='v0.8.7');
    const u=$('updates');if(u)u.textContent='📋 UPDATE LOG • v0.8.7';const t=document.querySelector('#home .hero-copy .tag');if(t)t.textContent='VILLAIN EXPANSION';
    const p=document.querySelector('#home .hero-copy p');if(p)p.textContent='Three premium villains enter Neo City: Mysterio, Kingpin and Prowler. Every fifth level is now a Boss Encounter.';
    const hubs=document.querySelectorAll('.hub-card');if(hubs[2]){const s=hubs[2].querySelector('strong');if(s)s.textContent='v0.8.7';const x=hubs[2].querySelector('span');if(x)x.textContent='Villain Expansion • Boss System'}
    const dash=document.querySelector('.hero-dashboard');if(dash){const stats=dash.querySelectorAll('.dash-stat b'),n=clamp(save.unlocked,1,levels.length);if(stats[2])stats[2].textContent=levels[n-1].name.toUpperCase();const health=dash.querySelector('.build-health b');if(health)health.textContent='STABLE • v0.8.7'}
  }
  const panel=document.querySelector('#updatesScreen .panel');
  if(panel){panel.innerHTML=`<span class="tag">v0.8.7 • VILLAIN EXPANSION</span><h2>THREE NEW THREATS. ONE NEW BOSS SYSTEM.</h2><div class="changelog">
    <div class="log-item"><div class="log-icon">🟢</div><div><b>Level 4 — Mysterio</b><p>Premium illusion design with Mystic Orbs, Illusion Clone and Smoke Teleport. His AI zones and escapes pressure instead of blindly rushing.</p></div></div>
    <div class="log-item"><div class="log-icon">👑</div><div><b>Level 5 — Kingpin • BOSS</b><p>A much larger boss fighter with 250 HP, Heavy Punch, Charge Rush, Ground Smash and a Rage phase below 35% HP. Victory awards 5 diamonds.</p></div></div>
    <div class="log-item"><div class="log-icon">🟣</div><div><b>Level 6 — Prowler</b><p>Our smartest standard villain yet: Cloak repositioning, Dash Strike, triple-hit Claw Combo and ranged Tech Shock.</p></div></div>
    <div class="log-item"><div class="log-icon">💎</div><div><b>Boss System v1</b><p>Every fifth campaign level can now be flagged as a Boss Encounter with special presentation and diamond loot.</p></div></div>
    <div class="log-item"><div class="log-icon">🧠</div><div><b>Smarter AI progression</b><p>Levels 4–6 make decisions based on distance, health phase and cooldowns instead of simply increasing damage.</p></div></div>
  </div><div class="redeem-card"><div><small>REDEEM CENTER</small><h3>ENTER A GAME CODE</h3><p>Special testing codes can be claimed once per save.</p></div><div class="redeem-row"><input id="redeemInput" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Enter code"><button id="redeemBtn">REDEEM</button></div><div id="redeemStatus" class="redeem-status">Waiting for code…</div></div>`;bindRedeem()}

  renderLevels();renderLevelInfo();stamp087();
  // This also protects Latest Update from any older patch-layer labels.
  setInterval(stamp087,1000);
})();
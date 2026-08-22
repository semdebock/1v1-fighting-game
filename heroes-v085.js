// Fight Arena v0.8.5 — Hero Expansion: Iron Man + Captain America
(() => {
  const $ = id => document.getElementById(id);
  const now = () => performance.now()/1000;
  document.title='Fight Arena v0.8.5';

  // Match the base game's character schema so profile stats never show undefined.
  chars['Captain America']={cost:2200,hp:115,power:'High',special:'Shield Throw',dmg:1.05,speed:.96,cls:'captain',role:'Tactical',rank:'A',desc:'Tactical shield fighter. Shield Throw ricochets back, Shield Bash closes distance and Guard Stance reduces incoming pressure.'};
  chars['Iron Man']={cost:3200,hp:105,power:'Very High',special:'Unibeam',dmg:1.12,speed:1.04,cls:'ironman',role:'Tech / Flight',rank:'S',desc:'Premium ranged hero. Repulsor Blast, Micro Missile and temporary Flight give Iron Man the deepest ability kit in the current roster.'};
  if(save.owned['Captain America']===undefined) save.owned['Captain America']=false;
  if(save.owned['Iron Man']===undefined) save.owned['Iron Man']=false;
  // Repair saves created by the first v0.8.5 build, where the new heroes could appear owned for free.
  if(!save.v085OwnershipFixed){
    if(save.selected==='Iron Man'||save.selected==='Captain America') save.selected='Rookie';
    save.owned['Captain America']=false; save.owned['Iron Man']=false; save.v085OwnershipFixed=true;
  }
  saveGame();

  function stampVersion(){
    document.querySelectorAll('.brand .tag').forEach(x=>x.textContent='v0.8.5');
    const updateBtn=$('updates'); if(updateBtn) updateBtn.textContent='📋 UPDATE LOG • v0.8.5';
    const heroTag=document.querySelector('#home .hero-copy .tag'); if(heroTag) heroTag.textContent='HERO EXPANSION UPDATE';
    const intro=document.querySelector('#home .hero-copy p'); if(intro) intro.textContent='Build your hero roster, master unique abilities, and fight through the Neo City campaign.';
  }
  stampVersion();

  const logPanel=document.querySelector('#updatesScreen .panel');
  if(logPanel) logPanel.innerHTML=`<span class="tag">v0.8.5 • HERO EXPANSION</span><h2>ASSEMBLE YOUR HERO ROSTER.</h2><div class="changelog">
    <div class="log-item"><div class="log-icon">🛡️</div><div><b>Captain America • A Rank • 2,200 coins</b><p>115 HP tactical fighter with Shield Throw, Shield Bash and Guard Stance. His shield projectile flies out and returns.</p></div></div>
    <div class="log-item"><div class="log-icon">🤖</div><div><b>Iron Man • S Rank • 3,200 coins</b><p>105 HP premium tech fighter with Repulsor Blast, Micro Missile and temporary Flight. Highest-priced hero because of ranged control and mobility.</p></div></div>
    <div class="log-item"><div class="log-icon">🚀</div><div><b>Flight system</b><p>Iron Man can hover for 3 seconds and use his ranged arsenal while airborne.</p></div></div>
    <div class="log-item"><div class="log-icon">🧰</div><div><b>Hotfix included</b><p>Correct v0.8.5 labels, hero prices/ownership, profile Power/Special fields and Iron Man portrait styling.</p></div></div>
  </div>`;

  if(typeof renderChars==='function') renderChars();
  stampVersion();
  const summary=document.querySelector('.gallery-summary');
  if(summary){const owned=Object.values(save.owned||{}).filter(Boolean).length;summary.innerHTML=`<div><b>FIGHTER ROSTER</b><span> ${owned} owned • ${Object.keys(chars).length} total</span></div><div class="role-chip">${save.selected.toUpperCase()} SELECTED</div>`;}

  const hubs=document.querySelectorAll('.hub-card');
  if(hubs[1]){const owned=Object.values(save.owned||{}).filter(Boolean).length;hubs[1].querySelector('strong').textContent=`${owned} / ${Object.keys(chars).length} FIGHTERS`;const s=hubs[1].querySelector('span');if(s)s.textContent=`Selected: ${save.selected}`;const bar=hubs[1].querySelector('.hub-progress i');if(bar)bar.style.width=Math.min(100,Math.round(owned/Object.keys(chars).length*100))+'%';}
  if(hubs[2]){hubs[2].querySelector('strong').textContent='v0.8.5';const s=hubs[2].querySelector('span');if(s)s.textContent='Iron Man + Captain America';}

  const actions=document.querySelector('#fight .actions');
  if(actions&&!$('heroActions')){const row=document.createElement('div');row.id='heroActions';row.className='hero-actions';actions.insertAdjacentElement('afterend',row);}
  let cd=[0,0,0], flying=false, flightTimer=null;
  function fx(cls,left,top){const e=document.createElement('div');e.className=cls;e.style.left=left+'%';e.style.top=top+'%';$('arena').appendChild(e);return e}
  function projectile(cls,damage,speed,knock,toastText,returning=false){let x=F.px+7,dir=1,hit=false;const p=fx(cls,x,flying?32:48);const timer=setInterval(()=>{if(!F||F.over){clearInterval(timer);p.remove();return}x+=speed*dir;p.style.left=x+'%';if(!hit&&Math.abs(x-F.ex)<5){hit=true;damageEnemy(damage,knock,false);toast(toastText);if(returning)dir=-1;else{clearInterval(timer);p.remove()}}if(returning&&hit&&x<=F.px+6){clearInterval(timer);p.remove()}else if(x>101||x<0){clearInterval(timer);p.remove()}},22)}
  function setHeroButtons(){const row=$('heroActions');if(!row)return;const name=save.selected;row.classList.toggle('active',!!F&&(name==='Iron Man'||name==='Captain America'));if(name==='Iron Man')row.innerHTML=`<button data-h="0">🔴 REPULSOR<span class="hero-cd"></span></button><button data-h="1">🚀 MISSILE<span class="hero-cd"></span></button><button data-h="2">🔥 ${flying?'LAND':'FLY'}<span class="hero-cd"></span></button>`;else if(name==='Captain America')row.innerHTML=`<button data-h="0">🛡️ SHIELD THROW<span class="hero-cd"></span></button><button data-h="1">💥 SHIELD BASH<span class="hero-cd"></span></button><button data-h="2">⭐ GUARD STANCE<span class="hero-cd"></span></button>`;else return;row.querySelectorAll('button').forEach((b,i)=>{const left=Math.max(0,cd[i]-now());b.disabled=left>0;b.querySelector('.hero-cd').textContent=left>0?left.toFixed(1)+'s':'READY';b.onpointerdown=()=>heroAbility(i)})}
  setInterval(()=>{try{if(F)setHeroButtons()}catch{}},180);
  function heroAbility(i){const name=save.selected;if(!F||F.over||now()<cd[i])return;if(name==='Iron Man'){if(i===0){cd[0]=now()+1.35;projectile('repulsor85',9,4.5,3,'REPULSOR!')}if(i===1){cd[1]=now()+4.5;projectile('missile85',16,2.9,6,'MICRO MISSILE!')}if(i===2){if(flying){flying=false;clearTimeout(flightTimer);$('pF')?.classList.remove('flying85');toast('LANDING');return}cd[2]=now()+7;flying=true;$('pF')?.classList.add('flying85');toast('FLIGHT MODE!');flightTimer=setTimeout(()=>{flying=false;$('pF')?.classList.remove('flying85')},3000)}}else if(name==='Captain America'){if(i===0){cd[0]=now()+2.3;projectile('shield85',11,4,4,'SHIELD THROW!',true)}if(i===1){cd[1]=now()+3.5;const gap=F.ex-F.px;F.px=Math.min(F.ex-7,F.px+Math.min(12,Math.max(0,gap-7)));setTimeout(()=>damageEnemy(13,5,false),90);toast('SHIELD BASH!')}if(i===2){cd[2]=now()+6;F.block=true;$('pF')?.classList.add('guard85');toast('GUARD STANCE!');setTimeout(()=>{if(F)F.block=false;$('pF')?.classList.remove('guard85')},1800)}}setHeroButtons()}

  const previousStart=window.startFight;
  window.startFight=function(){previousStart();cd=[0,0,0];flying=false;clearTimeout(flightTimer);$('pF')?.classList.remove('flying85','guard85');if(save.selected==='Iron Man')$('special').textContent='⚡ UNIBEAM';else if(save.selected==='Captain America')$('special').textContent='⭐ AVENGER STRIKE';setHeroButtons()};
  if($('start'))$('start').onclick=window.startFight;
  const previousSpecial=$('special')?.onpointerdown;
  if($('special'))$('special').onpointerdown=()=>{if(!F||F.over||F.sp<100)return;if(save.selected!=='Iron Man'&&save.selected!=='Captain America')return previousSpecial&&previousSpecial();F.sp=0;if(save.selected==='Iron Man'){const beam=fx('unibeam85',F.px+8,42);setTimeout(()=>damageEnemy(28,9,true),90);setTimeout(()=>beam.remove(),500);toast('UNIBEAM!')}else{F.px=Math.min(F.ex-8,F.px+18);$('pF')?.classList.add('guard85');setTimeout(()=>damageEnemy(25,10,true),100);setTimeout(()=>$('pF')?.classList.remove('guard85'),450);toast('AVENGER STRIKE!')}draw()};
})();
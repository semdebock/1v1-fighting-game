// Fight Arena v0.8.5.2 — Hero combat hotfix
(() => {
  const $ = id => document.getElementById(id);
  const now = () => performance.now()/1000;

  chars['Captain America']={price:2200,hp:115,power:'High',special:'Avenger Strike',dmg:1.05,speed:58,cls:'captain',role:'Tactical',rank:'A',desc:'Tactical shield fighter. Shield Throw ricochets back, Shield Bash closes distance and Guard Stance reduces incoming pressure.'};
  chars['Iron Man']={price:3200,hp:105,power:'Very High',special:'Unibeam',dmg:1.12,speed:76,cls:'ironman',role:'Tech / Flight',rank:'S',desc:'Premium ranged hero. Repulsor Blast, Micro Missile and temporary Flight give Iron Man the deepest ability kit in the current roster.'};

  const baseCls=cls;
  cls=function(type){if(type==='Iron Man')return'ironman';if(type==='Captain America')return'captain';return baseCls(type)};
  if(save.owned['Captain America']===undefined)save.owned['Captain America']=false;
  if(save.owned['Iron Man']===undefined)save.owned['Iron Man']=false;
  persist();

  renderChars(); chosen=save.selected; renderCharInfo(); hud();

  const actions=document.querySelector('#fight .actions');
  if(actions&&!$('heroActions')){const row=document.createElement('div');row.id='heroActions';row.className='hero-actions';actions.insertAdjacentElement('afterend',row)}
  let cd=[0,0,0],flying=false,flightTimer=null;
  function fx(className,left,top){const e=document.createElement('div');e.className=className;e.style.left=left+'%';e.style.top=top+'%';$('arena').appendChild(e);return e}
  function directDamage(n,push=2,big=false){
    if(!F||F.over)return;
    F.eh=clamp(F.eh-n,0,F.em);F.ex=clamp(F.ex+push,10,92);
    $('eF')?.classList.add('hurt');setTimeout(()=>$('eF')?.classList.remove('hurt'),160);
    impact((F.px+F.ex)/2);shake(big);if(F.eh<=0)finish(true);draw();
  }
  function projectile(className,damage,speed,knock,toastText,returning=false,onDone=null){
    let x=F.px+7,dir=1,hit=false;const p=fx(className,x,flying?32:48);
    const end=()=>{clearInterval(timer);p.remove();if(onDone)onDone()};
    const timer=setInterval(()=>{
      if(!F||F.over){end();return}x+=speed*dir;p.style.left=x+'%';
      if(!hit&&Math.abs(x-F.ex)<6){hit=true;directDamage(damage,knock,false);toast(toastText);if(returning)dir=-1;else{end();return}}
      if(returning&&hit&&x<=F.px+6)end();else if(x>103||x<0)end();
    },22);
  }
  function setHeroButtons(){
    const row=$('heroActions');if(!row)return;const name=save.selected;
    row.classList.toggle('active',!!F&&(name==='Iron Man'||name==='Captain America'));
    if(name==='Iron Man')row.innerHTML=`<button>🔴 REPULSOR<span class="hero-cd"></span></button><button>🚀 MISSILE<span class="hero-cd"></span></button><button>🔥 ${flying?'LAND':'FLY'}<span class="hero-cd"></span></button>`;
    else if(name==='Captain America')row.innerHTML=`<button>🛡️ SHIELD THROW<span class="hero-cd"></span></button><button>💥 SHIELD BASH<span class="hero-cd"></span></button><button>⭐ GUARD STANCE<span class="hero-cd"></span></button>`;else return;
    row.querySelectorAll('button').forEach((b,i)=>{const left=Math.max(0,cd[i]-now());b.disabled=left>0;b.querySelector('.hero-cd').textContent=left>0?left.toFixed(1)+'s':'READY';b.onpointerdown=()=>heroAbility(i)});
  }
  setInterval(()=>{try{if(F)setHeroButtons()}catch{}},180);
  function heroAbility(i){
    const name=save.selected;if(!F||F.over||now()<cd[i])return;
    if(name==='Iron Man'){
      if(i===0){cd[0]=now()+1.35;projectile('repulsor85',10,4.5,3,'REPULSOR!')}
      if(i===1){cd[1]=now()+4.5;projectile('missile85',17,2.9,6,'MICRO MISSILE!')}
      if(i===2){if(flying){flying=false;clearTimeout(flightTimer);$('pF')?.classList.remove('flying85');toast('LANDING');return}cd[2]=now()+7;flying=true;$('pF')?.classList.add('flying85');toast('FLIGHT MODE!');flightTimer=setTimeout(()=>{flying=false;$('pF')?.classList.remove('flying85')},3000)}
    }else if(name==='Captain America'){
      if(i===0){cd[0]=now()+2.3;$('pF')?.classList.add('shield-away85');projectile('shield85',12,4,4,'SHIELD THROW!',true,()=>$('pF')?.classList.remove('shield-away85'))}
      if(i===1){cd[1]=now()+3.5;const gap=F.ex-F.px;F.px=Math.min(F.ex-7,F.px+Math.min(12,Math.max(0,gap-7)));setTimeout(()=>directDamage(14,5,false),90);toast('SHIELD BASH!')}
      if(i===2){cd[2]=now()+6;F.block=true;$('pF')?.classList.add('guard85');toast('GUARD STANCE!');setTimeout(()=>{if(F)F.block=false;$('pF')?.classList.remove('guard85')},1800)}
    }
    setHeroButtons();
  }

  const previousStart=window.startFight;
  window.startFight=function(){previousStart();cd=[0,0,0];flying=false;clearTimeout(flightTimer);$('pF')?.classList.remove('flying85','guard85','shield-away85');if(save.selected==='Iron Man')$('special').textContent='⚡ UNIBEAM';else if(save.selected==='Captain America')$('special').textContent='⭐ AVENGER STRIKE';setHeroButtons()};
  $('start').onclick=window.startFight;
  const previousSpecial=$('special')?.onpointerdown;
  $('special').onpointerdown=()=>{
    if(!F||F.over||F.sp<100)return;
    if(save.selected!=='Iron Man'&&save.selected!=='Captain America')return previousSpecial&&previousSpecial();
    F.sp=0;
    if(save.selected==='Iron Man'){const beam=fx('unibeam85',F.px+8,42);setTimeout(()=>directDamage(30,9,true),90);setTimeout(()=>beam.remove(),500);toast('UNIBEAM!')}
    else{F.px=Math.min(F.ex-8,F.px+18);$('pF')?.classList.add('guard85');setTimeout(()=>directDamage(27,10,true),100);setTimeout(()=>$('pF')?.classList.remove('guard85'),450);toast('AVENGER STRIKE!')}
    draw();
  };
})();
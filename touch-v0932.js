/* Fight Arena v0.9.3.2 — iPhone/iPad Safari anti-zoom guard */
(() => {
  'use strict';
  const fight=document.getElementById('fight');
  const touchCapable=(navigator.maxTouchPoints||0)>0||('ontouchstart' in window);
  if(!fight||!touchCapable){window.__FightArenaTouchV0932={ok:true,active:false};return}
  const combatSelector='#punch,#kick,#special,#jump,#block,#stick,#heroActions button,#trainingReset,#trainingSpecial';
  let lastTouchEnd=0;
  fight.addEventListener('touchend',e=>{
    const target=e.target.closest?.(combatSelector);
    if(!target)return;
    const t=Date.now();
    if(t-lastTouchEnd<360)e.preventDefault();
    lastTouchEnd=t;
  },{passive:false});
  fight.addEventListener('touchstart',e=>{
    if(e.touches?.length>1&&e.target.closest?.(combatSelector))e.preventDefault();
  },{passive:false});
  ['gesturestart','gesturechange','gestureend'].forEach(type=>document.addEventListener(type,e=>{
    if(fight.classList.contains('active'))e.preventDefault();
  },{passive:false}));
  window.__FightArenaTouchV0932={ok:true,active:true};
})();

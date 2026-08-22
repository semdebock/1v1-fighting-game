/* Fight Arena v0.9.4.1 — strict iPhone/iPad Safari combat input guard */
(() => {
 'use strict';
 const fight=document.getElementById('fight');
 const touchCapable=(navigator.maxTouchPoints||0)>0||('ontouchstart' in window);
 if(!fight||!touchCapable){window.__FightArenaTouchV0941={ok:true,active:false,mode:'non-touch'};return}
 const isActive=()=>fight.classList.contains('active');
 const combatZone=e=>!!e.target?.closest?.('#arena,.controls,.specialrow,#trainingTools');
 const lock=e=>{if(isActive()&&combatZone(e)&&e.cancelable)e.preventDefault()};
 ['touchstart','touchmove','touchend','touchcancel'].forEach(type=>fight.addEventListener(type,lock,{passive:false,capture:true}));
 fight.addEventListener('dblclick',e=>{if(isActive()&&combatZone(e)){e.preventDefault();e.stopPropagation()}},{passive:false,capture:true});
 fight.addEventListener('contextmenu',e=>{if(isActive()&&combatZone(e))e.preventDefault()},{passive:false,capture:true});
 fight.addEventListener('selectstart',e=>{if(isActive()&&combatZone(e))e.preventDefault()},{passive:false,capture:true});
 ['gesturestart','gesturechange','gestureend'].forEach(type=>document.addEventListener(type,e=>{if(isActive()&&e.cancelable)e.preventDefault()},{passive:false,capture:true}));
 const sync=()=>{document.documentElement.classList.toggle('fight-touch-lock',isActive());document.body?.classList.toggle('fight-touch-lock',isActive())};
 new MutationObserver(sync).observe(fight,{attributes:true,attributeFilter:['class']});sync();
 addEventListener('pagehide',()=>{document.documentElement.classList.remove('fight-touch-lock');document.body?.classList.remove('fight-touch-lock')});
 window.__FightArenaTouchV0941={ok:true,active:true,mode:'strict-combat-zone',multiTouch:true};
})();

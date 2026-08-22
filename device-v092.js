/* Fight Arena v0.9.2 — device selection, responsive mode and desktop keyboard controls */
(() => {
'use strict';
const KEY='fightArenaDeviceMode';
const MODES=['auto','iphone','tablet','desktop'];
const $=id=>document.getElementById(id);
let preference='';
let resolved='desktop';
let heldLeft=false,heldRight=false;

function detect(){
  const ua=navigator.userAgent||'';
  const coarse=matchMedia?.('(pointer: coarse)')?.matches ?? false;
  const touch=navigator.maxTouchPoints||0;
  const short=Math.min(screen.width||innerWidth,screen.height||innerHeight);
  if(/iPhone|iPod/i.test(ua))return 'iphone';
  if(/iPad/i.test(ua)||(navigator.platform==='MacIntel'&&touch>1))return 'tablet';
  if(coarse&&short<=520)return 'iphone';
  if(coarse||touch>1)return 'tablet';
  return 'desktop';
}
function label(mode){return mode==='iphone'?'iPHONE • PORTRAIT':mode==='tablet'?'iPAD / TABLET':mode==='desktop'?'DESKTOP':'AUTO'}
function cleanClasses(){document.documentElement.classList.remove('device-iphone','device-tablet','device-desktop');document.body.classList.remove('device-iphone','device-tablet','device-desktop')}
function apply(mode){
  resolved=mode==='auto'?detect():mode;
  cleanClasses();
  document.documentElement.classList.add('device-'+resolved);
  document.body.classList.add('device-'+resolved);
  document.body.dataset.device=resolved;
  const pill=$('devicePill');if(pill)pill.textContent=(preference==='auto'?'AUTO • ':'')+label(resolved);
  const btn=$('deviceModeBtn');if(btn)btn.textContent=preference==='auto'?`AUTO • ${label(resolved)}`:label(resolved);
  const hint=$('desktopControlsHint');if(hint)hint.classList.toggle('hidden',resolved!=='desktop');
  const rotate=$('portraitHint');if(rotate)rotate.classList.toggle('hidden',!(resolved==='iphone'&&innerWidth>innerHeight));
  if(resolved!=='desktop'){heldLeft=heldRight=false;window.FightArenaControls?.setMove(0);window.FightArenaControls?.block(false)}
}
function choose(mode,save=true){
  if(!MODES.includes(mode))mode='auto';
  preference=mode;
  if(save){try{localStorage.setItem(KEY,mode)}catch{}}
  apply(mode);
  $('deviceChooser')?.classList.add('hidden');
}
function openChooser(){
  const o=$('deviceChooser');if(!o)return;o.classList.remove('hidden');
  o.querySelectorAll('[data-device-mode]').forEach(b=>b.classList.toggle('selected',b.dataset.deviceMode===preference));
}
function init(){
  try{preference=localStorage.getItem(KEY)||''}catch{preference=''}
  if(!MODES.includes(preference))preference='';
  if(preference)choose(preference,false);else{preference='auto';apply('auto');openChooser()}
  document.querySelectorAll('[data-device-mode]').forEach(b=>b.addEventListener('click',()=>choose(b.dataset.deviceMode,true)));
  $('deviceModeBtn')?.addEventListener('click',openChooser);
  $('devicePill')?.addEventListener('click',openChooser);
  addEventListener('resize',()=>{if(preference==='auto')apply('auto');else apply(preference)});
  addEventListener('orientationchange',()=>setTimeout(()=>apply(preference||'auto'),120));
}
function typingTarget(e){const t=e.target;return t&&(t.matches?.('input,textarea,select')||t.isContentEditable)}
function updateMove(){if(resolved!=='desktop')return;window.FightArenaControls?.setMove(heldLeft===heldRight?0:heldLeft?-1:1)}
function keyDown(e){
  if(resolved!=='desktop'||typingTarget(e))return;
  const c=window.FightArenaControls;if(!c)return;
  const code=e.code;
  if(['KeyA','KeyD','KeyW','Space','KeyJ','KeyK','KeyL','ShiftLeft','ShiftRight','Digit1','Digit2','Digit3','Escape'].includes(code))e.preventDefault();
  if(code==='KeyA'){heldLeft=true;updateMove();return}
  if(code==='KeyD'){heldRight=true;updateMove();return}
  if(e.repeat)return;
  if(code==='KeyW'||code==='Space')c.jump();
  else if(code==='KeyJ')c.punch();
  else if(code==='KeyK')c.kick();
  else if(code==='KeyL')c.special();
  else if(code==='Digit1')c.ability(0);
  else if(code==='Digit2')c.ability(1);
  else if(code==='Digit3')c.ability(2);
  else if(code==='ShiftLeft'||code==='ShiftRight')c.block(true);
  else if(code==='Escape')c.pause();
}
function keyUp(e){
  if(resolved!=='desktop')return;
  const c=window.FightArenaControls;if(!c)return;
  if(e.code==='KeyA'){heldLeft=false;updateMove()}
  else if(e.code==='KeyD'){heldRight=false;updateMove()}
  else if(e.code==='ShiftLeft'||e.code==='ShiftRight')c.block(false);
}
addEventListener('keydown',keyDown,{passive:false});
addEventListener('keyup',keyUp,{passive:false});
init();
window.FightArenaDevice={get preference(){return preference},get resolved(){return resolved},choose,openChooser,detect};
})();
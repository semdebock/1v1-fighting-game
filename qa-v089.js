/* Fight Arena v0.8.9 — QA lifecycle guards */
(() => {
  const $=id=>document.getElementById(id);
  const arena=$('arena'),fight=$('fight'),overlay=$('pauseOverlay');
  if(!arena||!fight)return;

  function cleanupArenaFx(){
    [...arena.children].forEach(el=>{
      if(el.id==='pF'||el.id==='eF'||el.classList.contains('city')||el.classList.contains('floor'))return;
      el.remove();
    });
    fight.classList.remove('dummy-resetting');
  }

  function releaseHeldInputs(){
    try{$('block')?.dispatchEvent(new Event('pointerup',{bubbles:true}))}catch{}
  }

  // Prevent leaving during the short KO result handoff. This avoids stale rewards/results
  // from a fight that the player already left.
  document.addEventListener('click',e=>{
    const button=e.target.closest?.('button');
    if(!button)return;
    const id=button.id;
    if(id==='quit'&&(arena.querySelector('.ko')||arena.querySelector('.ko-banner'))){
      e.preventDefault();e.stopImmediatePropagation();return;
    }
    if(id==='pauseBtn')releaseHeldInputs();
    if(['pauseRestart','quit','pauseMenu','trainingReset','start','trainingStart'].includes(id))cleanupArenaFx();
  },true);

  // Auto-pause if the browser/app is backgrounded during a live fight.
  document.addEventListener('visibilitychange',()=>{
    if(!document.hidden||!fight.classList.contains('active'))return;
    if(overlay&&!overlay.classList.contains('hidden'))return;
    $('pauseBtn')?.click();
  });

  // Lock input for the tiny dummy-respawn window so one KO cannot be counted twice.
  const enemyHp=$('ehp');
  if(enemyHp){
    new MutationObserver(()=>{
      if(!fight.classList.contains('training-mode'))return;
      const hp=parseFloat(enemyHp.style.width||'100');
      if(hp>0.05||fight.classList.contains('dummy-resetting'))return;
      fight.classList.add('dummy-resetting');
      setTimeout(()=>fight.classList.remove('dummy-resetting'),440);
    }).observe(enemyHp,{attributes:true,attributeFilter:['style']});
  }

  const style=document.createElement('style');
  style.textContent=`
    #fight.dummy-resetting .controls,#fight.dummy-resetting #heroActions,#fight.dummy-resetting #trainingSpecial{pointer-events:none;opacity:.58}
    #fight.dummy-resetting #eF{opacity:.42;filter:grayscale(.4) brightness(1.25)}
    #fight:has(.ko) #quit{pointer-events:none;opacity:.35}
  `;
  document.head.appendChild(style);
})();
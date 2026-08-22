/* Fight Arena v0.9.3.2 — Touch Controls Hotfix loader */
(async()=>{
  const files=['core-v093-part1.txt','core-v093-part2.txt','core-v093-part3.txt','core-v093-part4.txt'];
  try{
    let code='';
    for(const file of files){const r=await fetch(`build/v093/${file}?v=0932`,{cache:'no-store'});if(!r.ok)throw new Error(`${file} HTTP ${r.status}`);code+=await r.text()}
    code=code.replace('/* Fight Arena v0.9.3 — Power & Balance Update */','/* Fight Arena v0.9.3.2 — Touch Controls Hotfix */');
    code=code.replace("window.FightArena={version:'0.9.3'","window.FightArena={version:'0.9.3.2'");
    code=code.replace('redeemedBrandNewDay:false,ownerGodUnlocked:false','redeemedBrandNewDay:false,redeemedDiamonds:false,ownerGodUnlocked:false');
    code=code.replace("s.coreVersion='0.9.3'","s.coreVersion='0.9.3.2'");
    const marker=" if(code==='GODLIKE'){";
    if(!code.includes(marker))throw new Error('redeem patch marker missing');
    const diamond=" if(code==='DIAMONDS'){if(save.redeemedDiamonds){status.textContent='✓ CODE ALREADY REDEEMED';status.className='redeem-status used';return}save.gems+=100;save.redeemedDiamonds=true;persist();input.value='';status.textContent='✓ +100 DIAMONDS ADDED';status.className='redeem-status good';toast('+100 DIAMONDS 💎');return}\n";
    code=code.replace(marker,diamond+marker);
    (0,eval)(code);
    window.dispatchEvent(new Event('fightarena-ready'));
  }catch(err){
    console.error('[Fight Arena v0.9.3.2 loader]',err);
    const h=document.querySelector('.build-health b');if(h)h.textContent='v0.9.3.2 • CORE LOAD ERROR';
    const t=document.getElementById('toast');if(t){t.textContent='CORE LOAD ERROR — REFRESH';t.classList.remove('hidden')}
  }
})();

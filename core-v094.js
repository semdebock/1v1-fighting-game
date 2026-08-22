/* Fight Arena v0.9.4.1 — Combat Stability & Collection stable loader */
(async()=>{
  const files=['core-v093-part1.txt','core-v093-part2.txt','core-v093-part3.txt','core-v093-part4.txt'];
  try{
    if(typeof window.FightArenaTransformV094!=='function')throw new Error('v0.9.4 transform unavailable');
    const css=document.createElement('link');css.rel='stylesheet';css.href='stability-v0941.css?v=0941';document.head.appendChild(css);
    const patch=document.createElement('script');patch.src='stability-v0941.js?v=0941';patch.async=false;document.head.appendChild(patch);
    await new Promise((resolve,reject)=>{patch.onload=resolve;patch.onerror=()=>reject(new Error('v0.9.4.1 patch unavailable'))});
    let code='';
    for(const file of files){const r=await fetch(`build/v093/${file}?v=0941`,{cache:'no-store'});if(!r.ok)throw new Error(`${file} HTTP ${r.status}`);code+=await r.text()}
    code=window.FightArenaTransformV094(code);
    (0,eval)(code);
    window.dispatchEvent(new Event('fightarena-ready'));
  }catch(err){
    console.error('[Fight Arena v0.9.4.1 loader]',err);
    const h=document.querySelector('.build-health b');if(h)h.textContent='v0.9.4.1 • CORE LOAD ERROR';
    const t=document.getElementById('toast');if(t){t.textContent='CORE LOAD ERROR — REFRESH';t.classList.remove('hidden')}
  }
})();

/* Fight Arena v0.9.3 — stable ranked core loader */
(async()=>{
  const files=['core-v093-part1.txt','core-v093-part2.txt','core-v093-part3.txt','core-v093-part4.txt'];
  try{
    let code='';
    for(const file of files){const r=await fetch(`build/v093/${file}?v=093`,{cache:'no-store'});if(!r.ok)throw new Error(`${file} HTTP ${r.status}`);code+=await r.text()}
    (0,eval)(code);
    window.dispatchEvent(new Event('fightarena-ready'));
  }catch(err){
    console.error('[Fight Arena v0.9.3 loader]',err);
    const h=document.querySelector('.build-health b');if(h)h.textContent='v0.9.3 • CORE LOAD ERROR';
    const t=document.getElementById('toast');if(t){t.textContent='CORE LOAD ERROR — REFRESH';t.classList.remove('hidden')}
  }
})();
/* Fight Arena v0.9.1 — stable static loader */
(async()=>{
  const files=['core-v091-part1.txt','core-v091-part2.txt','core-v091-part3.txt','core-v091-part4.txt'];
  try{
    let code='';
    for(const file of files){const r=await fetch(`build/v091/${file}?v=091`,{cache:'no-store'});if(!r.ok)throw new Error(`${file} HTTP ${r.status}`);code+=await r.text()}
    (0,eval)(code);
    window.dispatchEvent(new Event('fightarena-ready'));
  }catch(err){
    console.error('[Fight Arena v0.9.1 loader]',err);
    const h=document.querySelector('.build-health b');if(h)h.textContent='v0.9.1 • CORE LOAD ERROR';
    const t=document.getElementById('toast');if(t){t.textContent='CORE LOAD ERROR — REFRESH';t.classList.remove('hidden')}
  }
})();
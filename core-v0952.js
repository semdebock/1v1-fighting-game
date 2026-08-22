/* Fight Arena v0.9.5.2 — Street War stable loader */
(async()=>{
 const files=['core-v093-part1.txt','core-v093-part2.txt','core-v093-part3.txt','core-v093-part4.txt'];
 try{
  if(typeof window.FightArenaTransformV094!=='function')throw new Error('v0.9.4 transform unavailable');
  if(typeof window.FightArenaTransformV0941!=='function')throw new Error('v0.9.4.1 transform unavailable');
  if(typeof window.FightArenaTransformV095!=='function')throw new Error('v0.9.5 transform unavailable');
  if(typeof window.FightArenaTransformV0951!=='function')throw new Error('v0.9.5.1 transform unavailable');
  if(typeof window.FightArenaTransformV0952!=='function')throw new Error('v0.9.5.2 transform unavailable');
  let code='';
  for(const file of files){const r=await fetch(`build/v093/${file}?v=0952`,{cache:'no-store'});if(!r.ok)throw new Error(`${file} HTTP ${r.status}`);code+=await r.text()}
  code=window.FightArenaTransformV094(code);
  code=window.FightArenaTransformV0941(code);
  code=window.FightArenaTransformV095(code);
  code=window.FightArenaTransformV0951(code);
  code=window.FightArenaTransformV0952(code);
  (0,eval)(code);
  window.dispatchEvent(new Event('fightarena-ready'));
 }catch(err){
  console.error('[Fight Arena v0.9.5.2 loader]',err);
  const h=document.querySelector('.build-health b');if(h)h.textContent='v0.9.5.2 • CORE LOAD ERROR';
  const t=document.getElementById('toast');if(t){t.textContent='CORE LOAD ERROR — REFRESH';t.classList.remove('hidden')}
 }
})();

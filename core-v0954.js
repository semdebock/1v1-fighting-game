/* Fight Arena v0.9.5.4 — Raw Power stable loader */
(async()=>{
 const files=['core-v093-part1.txt','core-v093-part2.txt','core-v093-part3.txt','core-v093-part4.txt'];
 try{
  for(const [name,fn] of Object.entries({v094:window.FightArenaTransformV094,v0941:window.FightArenaTransformV0941,v095:window.FightArenaTransformV095,v0951:window.FightArenaTransformV0951,v0952:window.FightArenaTransformV0952,v0953:window.FightArenaTransformV0953,v09531:window.FightArenaTransformV09531,v0954:window.FightArenaTransformV0954}))if(typeof fn!=='function')throw new Error(name+' transform unavailable');
  let code='';
  for(const file of files){const r=await fetch(`build/v093/${file}?v=0954`,{cache:'no-store'});if(!r.ok)throw new Error(`${file} HTTP ${r.status}`);code+=await r.text()}
  code=window.FightArenaTransformV094(code);
  code=window.FightArenaTransformV0941(code);
  code=window.FightArenaTransformV095(code);
  code=window.FightArenaTransformV0951(code);
  code=window.FightArenaTransformV0952(code);
  code=window.FightArenaTransformV0953(code);
  code=window.FightArenaTransformV09531(code);
  code=window.FightArenaTransformV0954(code);
  (0,eval)(code);
  window.dispatchEvent(new Event('fightarena-ready'));
 }catch(err){
  console.error('[Fight Arena v0.9.5.4 loader]',err);
  const h=document.querySelector('.build-health b');if(h)h.textContent='v0.9.5.4 • CORE LOAD ERROR';
  const t=document.getElementById('toast');if(t){t.textContent='CORE LOAD ERROR — REFRESH';t.classList.remove('hidden')}
 }
})();

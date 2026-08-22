/* Fight Arena v0.9.0 — release sanity checks */
(() => {
  const data=window.FightArena, failures=[];
  const requiredHeroes=['Rookie','El Primo','Spider-Man','Captain America','Iron Man','Daredevil','Moon Knight'];
  const requiredSkins=['rookie-neo','primo-gold','spider-symbiote','cap-hydra','iron-nano'];
  const requiredDom=['charCards','skinCards','skinPreview','skinAction','trainingCards','arena','heroActions'];
  if(!data||data.version!=='0.9.0')failures.push('version/core');
  requiredHeroes.forEach(h=>{if(!data?.chars?.[h])failures.push('hero:'+h)});
  const skinIds=new Set((data?.skins||[]).map(s=>s.id));
  requiredSkins.forEach(id=>{if(!skinIds.has(id))failures.push('skin:'+id)});
  if(skinIds.size!==(data?.skins||[]).length)failures.push('duplicate-skin-id');
  requiredDom.forEach(id=>{if(!document.getElementById(id))failures.push('dom:'+id)});
  window.__FightArenaV090QA={ok:failures.length===0,failures};
  const health=document.querySelector('.build-health b');
  if(health){health.textContent=failures.length?'v0.9.0 • QA WARNING':'v0.9.0 • SYSTEMS READY';health.classList.toggle('qa-warning',failures.length>0)}
  if(failures.length)console.error('[Fight Arena v0.9.0 QA]',failures);
})();
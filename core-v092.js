/* Fight Arena v0.9.2 — Device & Controls stable loader */
(async()=>{
  const files=['core-v091-part1.txt','core-v091-part2.txt','core-v091-part3.txt','core-v091-part4.txt'];
  try{
    let code='';
    for(const file of files){
      const r=await fetch(`build/v091/${file}?v=092`,{cache:'no-store'});
      if(!r.ok)throw new Error(`${file} HTTP ${r.status}`);
      code+=await r.text();
    }
    code=code.replace('/* Fight Arena v0.9.1 — Stability Hotfix */','/* Fight Arena v0.9.2 — Device & Controls Update */');
    code=code.replace("window.FightArena={version:'0.9.1'","window.FightArena={version:'0.9.2'");
    code=code.replace("s.coreVersion='0.9.1'","s.coreVersion='0.9.2'");
    const marker="persist();hud();refreshDashboard();renderChars();renderCharInfo();renderSkins();renderSkinInfo();renderTraining();renderLevels();renderLevelInfo();renderSettings();showCollectionTab('fighters');\n})();";
    if(!code.includes(marker))throw new Error('v0.9.2 control bridge marker missing');
    const bridge=`// v0.9.2 public control bridge for desktop keyboard/device layers.\nwindow.FightArenaControls={\n setMove(v){if(F&&!F.paused&&!F.over)F.move=clamp(Number(v)||0,-1,1)},\n punch(){attack('punch')},kick(){attack('kick')},special(){useSpecial()},\n jump(){if(F&&!F.paused&&F.jump===0)F.jv=F.hero==='El Primo'?350:F.hero==='Spider-Man'?470:F.hero==='Daredevil'?450:F.hero==='Moon Knight'?410:F.hero===OWNER?520:390},\n block(on=true){if(!F||F.paused)return;F.block=!!on;$('pF')?.classList.toggle('blocking',!!on)},\n ability(i){heroAbility(clamp(Number(i)||0,0,2))},\n pause(){if(!F||F.over)return;F.paused?closePause():openPause()},\n active(){return !!F&&!F.over},mode(){return F?.training?'training':F?'fight':'menu'}\n};\nwindow.dispatchEvent(new Event('fightarena-controls-ready'));\n\n`;
    code=code.replace(marker,bridge+marker);
    (0,eval)(code);
    window.dispatchEvent(new Event('fightarena-ready'));
  }catch(err){
    console.error('[Fight Arena v0.9.2 loader]',err);
    const h=document.querySelector('.build-health b');if(h)h.textContent='v0.9.2 • CORE LOAD ERROR';
    const t=document.getElementById('toast');if(t){t.textContent='CORE LOAD ERROR — REFRESH';t.classList.remove('hidden')}
  }
})();
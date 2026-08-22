const fs=require('fs');
const path=require('path');
const file=path.resolve(__dirname,'../../index.html');
let html=fs.readFileSync(file,'utf8');

if(!html.includes('v0.9.5.3.1')){
 if(!html.includes('v0.9.5.3'))throw new Error('v0.9.5.3.1 index base marker missing');
 html=html.replaceAll('?v=0953','?v=09531');
 html=html.replaceAll('v0.9.5.3','v0.9.5.3.1');
 html=html.replace('<title>Fight Arena v0.9.5.3.1 — Vigilante Line</title>','<title>Fight Arena v0.9.5.3.1 — Result Flow Polish</title>');
 html=html.replace('<link rel="stylesheet" href="vigilante-v0953.css?v=09531">','<link rel="stylesheet" href="vigilante-v0953.css?v=09531">\n<link rel="stylesheet" href="results-v09531.css?v=09531">');
 html=html.replace('<script src="build/v0953/transform-v0953.js?v=09531"></script>','<script src="build/v0953/transform-v0953.js?v=09531"></script>\n<script src="build/v09531/transform-v09531.js?v=09531"></script>');
 html=html.replace('core-v0953.js?v=09531','core-v09531.js?v=09531');
 html=html.replace('campaign-v0953.js?v=09531','campaign-v09531.js?v=09531');
 html=html.replace('qa-v0953.js?v=09531','qa-v09531.js?v=09531');
 html=html.replace('<button class="primary" id="continue">CONTINUE</button>','<button class="primary" id="continue">NEXT FIGHT</button>');
 html=html.replace('<span>Punisher • Taskmaster • Rematch • Intro Pause</span>','<span>Results Flow • Punisher Unlock • Next Fight</span>');
 html=html.replace('VIGILANTE CORE • v0.9.5.3.1','RESULT FLOW CORE • v0.9.5.3.1');
 html=html.replace('<span class="tag">v0.9.5.3.1 • VIGILANTE LINE</span><h2>SECTION 2 IS LIVE.</h2><div class="changelog">','<span class="tag">v0.9.5.3.1 • RESULT FLOW POLISH</span><h2>FIGHTS NOW END CLEANLY.</h2><div class="changelog"><div class="log-item"><div class="log-icon">🏁</div><div><b>Centered Match Results</b><p>The fight screen now closes completely at K.O. Results appear as a fixed center overlay with no post-fight scrolling or touch-lock traps.</p></div></div><div class="log-item"><div class="log-icon">🔓</div><div><b>One-Time Punisher Unlock Reveal</b><p>Your first Punisher victory now triggers a dedicated Collection unlock animation. Rematches never replay the unlock reveal.</p></div></div><div class="log-item"><div class="log-icon">▶</div><div><b>Next Fight Flow</b><p>Results now offer NEXT FIGHT, REMATCH and MAIN MENU in one centered action stack.</p></div></div>');
 fs.writeFileSync(file,html);
}
for(const marker of ['v0.9.5.3.1','results-v09531.css','build/v09531/transform-v09531.js','core-v09531.js','campaign-v09531.js','qa-v09531.js','id="rematch"','id="continue">NEXT FIGHT','RESULT FLOW POLISH'])if(!html.includes(marker))throw new Error('v0.9.5.3.1 index marker missing: '+marker);
console.log('v0.9.5.3.1 index release guard passed');

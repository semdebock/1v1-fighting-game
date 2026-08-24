const fs=require('fs'),path=require('path');const file=path.resolve(__dirname,'../../index.html');let h=fs.readFileSync(file,'utf8');
/* v0.9.7.7.2 is the visible Owner Board rework. Keep every release surface and cache marker aligned. */
h=h.replace(/\?v=09771(?=["'])/g,'?v=09772');
h=h.replace(/<title>[^<]*<\/title>/,'<title>Multiverse Arena v0.9.7.7.2 — Owner Board Rework</title>');
h=h.replace(/UPDATE LOG\s*•\s*v0\.9\.7\.7\.(?:1|2)/g,'UPDATE LOG  •  v0.9.7.7.2');
h=h.replace(/<div class="dash-stat latest-stat"><small>LATEST UPDATE<\/small><b>[^<]*<\/b><span>[^<]*<\/span><\/div>/g,'<div class="dash-stat latest-stat"><small>LATEST UPDATE</small><b>v0.9.7.7.2</b><span>Owner Board Rework • Dev Tools • Repo Cleanup</span></div>');
h=h.replace(/<div class="build-health"><span>◆ BUILD HEALTH<\/span><b>[^<]*<\/b><\/div>/g,'<div class="build-health"><span>◆ BUILD HEALTH</span><b>v0.9.7.7.2 • OWNER TOOLS • STABLE</b></div>');
h=h.replace(/<span class="tag">v0\.9\.5\.7 • MASTER PLAN<\/span><h2>THE ARMS ARE THINKING\.<\/h2>/,'<span class="tag">v0.9.7.7.2 • OWNER BOARD REWORK</span><h2>OWNER TOOLS ARE LIVE.</h2>');
fs.writeFileSync(file,h);
for(const m of ['Multiverse Arena v0.9.7.7.2 — Owner Board Rework','app/core/bootstrap-v096.js?v=09772','UPDATE LOG  •  v0.9.7.7.2','Owner Board Rework • Dev Tools • Repo Cleanup','v0.9.7.7.2 • OWNER TOOLS • STABLE','v0.9.7.7.2 • OWNER BOARD REWORK'])if(!h.includes(m))throw new Error('v0.9.7.7.2 visible index marker missing '+m);
console.log('v0.9.7.7.2 visible production index polish passed');

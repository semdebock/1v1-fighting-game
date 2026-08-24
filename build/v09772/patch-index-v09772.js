const fs=require('fs'),path=require('path');const file=path.resolve(__dirname,'../../index.html');let h=fs.readFileSync(file,'utf8');
/* Technical build/cache moves to 7.7.2, but the hidden Owner Board must never appear in the visible update surfaces. */
h=h.replace(/\?v=09771(?=["'])/g,'?v=09772');
h=h.replace(/UPDATE LOG\s*•\s*v0\.9\.7\.7\.2/g,'UPDATE LOG  •  v0.9.7.7.1');
h=h.replace(/<div class="dash-stat latest-stat"><small>LATEST UPDATE<\/small><b>v0\.9\.7\.7\.2<\/b><span>Owner Board • Local Admin Controls<\/span><\/div>/g,'<div class="dash-stat latest-stat"><small>LATEST UPDATE</small><b>v0.9.7.7.1</b><span>Hero Visual Revamp • Training Repair • Mjolnir Fix</span></div>');
h=h.replace(/<div class="build-health"><span>◆ BUILD HEALTH<\/span><b>v0\.9\.7\.7\.2 • OWNER BOARD • STABLE<\/b><\/div>/g,'<div class="build-health"><span>◆ BUILD HEALTH</span><b>v0.9.7.7.2 • STABLE</b></div>');
fs.writeFileSync(file,h);
for(const m of ['app/core/bootstrap-v096.js?v=09772','UPDATE LOG  •  v0.9.7.7.1','Hero Visual Revamp • Training Repair • Mjolnir Fix'])if(!h.includes(m))throw new Error('v0.9.7.7.2 stealth index marker missing '+m);
if(h.includes('Owner Board • Local Admin Controls'))throw new Error('Owner Board must not be exposed in visible update surfaces');
console.log('v0.9.7.7.2 stealth index patch passed');

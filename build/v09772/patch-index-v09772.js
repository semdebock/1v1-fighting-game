const fs=require('fs'),path=require('path');const file=path.resolve(__dirname,'../../index.html');let h=fs.readFileSync(file,'utf8');
/* v0.9.7.7.2 is a visible Owner Board + maintenance release. Keep cache and visible release surfaces aligned. */
h=h.replace(/\?v=09771(?=["'])/g,'?v=09772');
h=h.replace(/UPDATE LOG\s*•\s*v0\.9\.7\.7\.1/g,'UPDATE LOG  •  v0.9.7.7.2');
h=h.replace(/<div class="dash-stat latest-stat"><small>LATEST UPDATE<\/small><b>v0\.9\.7\.7\.1<\/b><span>Hero Visual Revamp • Training Repair • Mjolnir Fix<\/span><\/div>/g,'<div class="dash-stat latest-stat"><small>LATEST UPDATE</small><b>v0.9.7.7.2</b><span>Owner Board Rework • Dev Tools • Repo Cleanup</span></div>');
h=h.replace(/<div class="build-health"><span>◆ BUILD HEALTH<\/span><b>v0\.9\.7\.7\.2 • STABLE<\/b><\/div>/g,'<div class="build-health"><span>◆ BUILD HEALTH</span><b>v0.9.7.7.2 • OWNER TOOLS • STABLE</b></div>');
fs.writeFileSync(file,h);
for(const m of ['app/core/bootstrap-v096.js?v=09772','UPDATE LOG  •  v0.9.7.7.2','Owner Board Rework • Dev Tools • Repo Cleanup','v0.9.7.7.2 • OWNER TOOLS • STABLE'])if(!h.includes(m))throw new Error('v0.9.7.7.2 visible index marker missing '+m);
console.log('v0.9.7.7.2 visible production index patch passed');

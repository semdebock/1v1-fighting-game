const fs=require('fs'),path=require('path');const file=path.resolve(__dirname,'../../index.html');let h=fs.readFileSync(file,'utf8');
h=h.replace(/v0\.9\.7\.7(?!\.1)/g,'v0.9.7.7.1').replace(/\?v=0977(?=["'])/g,'?v=09771');
h=h.replace('Thor • Doctor Strange • Star-Lord • Bug Fixes','Hero Visual Revamp • Training Repair • Mjolnir Fix');
h=h.replace('v0.9.7.7.1 • HERO UPDATE • STABLE','v0.9.7.7.1 • HERO REVAMP • STABLE');
fs.writeFileSync(file,h);for(const m of ['v0.9.7.7.1','app/core/bootstrap-v096.js?v=09771'])if(!h.includes(m))throw new Error('v0.9.7.7.1 index marker missing '+m);console.log('v0.9.7.7.1 index patch passed');

const fs=require('fs'),path=require('path');const file=path.resolve(__dirname,'../../index.html');let h=fs.readFileSync(file,'utf8');
h=h.replace(/\?v=09771(?=["'])/g,'?v=09772');
fs.writeFileSync(file,h);for(const m of ['app/core/bootstrap-v096.js?v=09772','UPDATE LOG  •  v0.9.7.7.1','Hero Visual Revamp • Training Repair • Mjolnir Fix'])if(!h.includes(m))throw new Error('v0.9.7.7.2 stealth index marker missing '+m);if(h.includes('Owner Board • Local Admin Controls'))throw new Error('Owner Board must not be exposed in visible update log');console.log('v0.9.7.7.2 stealth index patch passed');

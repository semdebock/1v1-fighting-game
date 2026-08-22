const fs=require('fs');
const path=require('path');
const file=path.resolve(__dirname,'../../index.html');
let html=fs.readFileSync(file,'utf8');
if(!html.includes('Multiverse Arena v0.9.5.7.1 — UI Revamp')){
 if(!html.includes('Multiverse Arena v0.9.5.7 — Master Plan'))throw new Error('v0.9.5.7.1 index base marker missing');
 html=html.replaceAll('?v=0957','?v=09571');
 html=html.replace('<title>Multiverse Arena v0.9.5.7 — Master Plan</title>','<title>Multiverse Arena v0.9.5.7.1 — UI Revamp</title>');
 html=html.replace('<link rel="stylesheet" href="masterplan-v0957.css?v=09571">','<link rel="stylesheet" href="masterplan-v0957.css?v=09571">\n<link rel="stylesheet" href="ui-v09571.css?v=09571">');
 html=html.replace('<div class="brand">MULTIVERSE ARENA <span class="tag">v0.9.5.7</span></div>','<div class="brand">MULTIVERSE ARENA <span class="tag">v0.9.5.7.1</span></div>');
 html=html.replace('📋 UPDATE LOG • v0.9.5.7</button>','📋 UPDATE LOG • v0.9.5.7.1</button>');
 html=html.replace('<div class="dash-stat latest-stat"><small>LATEST UPDATE</small><b>v0.9.5.7</b><span>Doctor Octopus • Master Plan • Rewards</span></div>','<div class="dash-stat latest-stat"><small>LATEST UPDATE</small><b>v0.9.5.7.1</b><span>Premium UI Revamp • UI Sounds • Polish</span></div>');
 html=html.replace('MASTER PLAN CORE • v0.9.5.7','UI REVAMP • v0.9.5.7.1');
 html=html.replace('MULTIVERSE ARENA v0.9.5.7</div>','MULTIVERSE ARENA v0.9.5.7.1</div>');
 html=html.replace('<script src="qa-v0957.js?v=09571"></script>','<script src="qa-v0957.js?v=09571"></script>\n<script src="ui-v09571.js?v=09571"></script>\n<script src="qa-v09571.js?v=09571"></script>');
 fs.writeFileSync(file,html);
}
for(const marker of ['Multiverse Arena v0.9.5.7.1 — UI Revamp','ui-v09571.css?v=09571','ui-v09571.js?v=09571','qa-v09571.js?v=09571','MULTIVERSE ARENA <span class="tag">v0.9.5.7.1</span>','Premium UI Revamp • UI Sounds • Polish','UI REVAMP • v0.9.5.7.1'])if(!html.includes(marker))throw new Error('v0.9.5.7.1 index marker missing: '+marker);
console.log('v0.9.5.7.1 index release guard passed');

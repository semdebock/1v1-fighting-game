const fs=require('fs');
const path=require('path');
const file=path.resolve(__dirname,'../../index.html');
let html=fs.readFileSync(file,'utf8');

// Kept as an idempotent release guard: older local copies can still be upgraded,
// while an already-released v0.9.5.2 index simply validates and passes CI.
if(html.includes('v0.9.5.1')){
  html=html.replaceAll('?v=0951','?v=0952');
  html=html.replaceAll('v0.9.5.1','v0.9.5.2');
  html=html.replace('Fight Arena v0.9.5.2 — Neo City Arena Expansion','Fight Arena v0.9.5.2 — Street War');
  if(!html.includes('street-v0952.css'))html=html.replace('<link rel="stylesheet" href="neo-v0951.css?v=0952">','<link rel="stylesheet" href="neo-v0951.css?v=0952">\n<link rel="stylesheet" href="street-v0952.css?v=0952">');
  if(!html.includes('build/v0952/transform-v0952.js'))html=html.replace('<script src="build/v0951/transform-v0951.js?v=0952"></script>','<script src="build/v0951/transform-v0951.js?v=0952"></script>\n<script src="build/v0952/transform-v0952.js?v=0952"></script>');
  html=html.replace('core-v0951.js?v=0952','core-v0952.js?v=0952');
  html=html.replace('campaign-v0951.js?v=0952','campaign-v0952.js?v=0952');
  html=html.replace('qa-v0951.js?v=0952','qa-v0952.js?v=0952');
  fs.writeFileSync(file,html);
}
for(const marker of ['v0.9.5.2','PHASE 1 • STREET WAR','street-v0952.css','build/v0952/transform-v0952.js','core-v0952.js','campaign-v0952.js','qa-v0952.js']){
  if(!html.includes(marker))throw new Error('v0.9.5.2 index marker missing: '+marker);
}
console.log('v0.9.5.2 index release guard passed');

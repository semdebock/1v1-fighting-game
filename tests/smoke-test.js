const fs=require('fs');
const path=require('path');
const root=path.resolve(__dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const exists=p=>fs.existsSync(path.join(root,p));
const assert=(ok,msg)=>{if(!ok)throw new Error(msg)};

const index=read('index.html');
const bootstrap=read('app/core/bootstrap-v096.js');
const manifest=read('app/config/runtime-manifest.js');

const requiredFiles=[
  'index.html',
  'app/core/core-runtime-v0958.js',
  'app/core/bootstrap-v096.js',
  'app/config/runtime-manifest.js',
  'app/state/state.js',
  'app/input/input.js',
  'app/characters/characters.js',
  'app/combat/combat.js',
  'app/core/game.js',
  'app/ui/ui.js',
  'app/owner/storage.js',
  'app/owner/commands.js',
  'app/ui/ownerboard.js',
  'app/systems/save.js'
];
for(const file of requiredFiles)assert(exists(file),`missing required file: ${file}`);

for(const id of ['play','training','chars','fight','pF','eF','punch','kick','special','block','toast']){
  assert(index.includes(`id="${id}"`),`missing critical UI id: ${id}`);
}
assert(index.includes('app/core/bootstrap-v096.js'), 'index no longer loads stable bootstrap');
assert(bootstrap.includes('runtimeManifest'), 'bootstrap no longer uses runtime manifest');
assert(bootstrap.includes('ownerStorage')&&bootstrap.includes('ownerCommands')&&bootstrap.includes('ownerboard'),'owner modules missing from bootstrap validation');

const runtime=[...manifest.matchAll(/'([^']+\.js)'/g)].map(m=>m[1]);
assert(runtime.length>=10,'runtime manifest unexpectedly small');
assert(new Set(runtime).size===runtime.length,'runtime manifest contains duplicate scripts');
for(const file of runtime)assert(exists(file),`runtime manifest points to missing file: ${file}`);

const ownerStorage=read('app/owner/storage.js');
const ownerCommands=read('app/owner/commands.js');
const ownerBoard=read('app/ui/ownerboard.js');
assert(ownerStorage.includes('ownerStorage'),'owner storage export missing');
assert(ownerCommands.includes('ownerCommands'),'owner commands export missing');
assert(ownerBoard.includes('ownerboard'),'ownerboard bridge export missing');

console.log(`Smoke test passed: ${requiredFiles.length} core files, ${runtime.length} runtime scripts, critical UI and owner modules verified.`);

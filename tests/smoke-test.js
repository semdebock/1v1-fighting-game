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
  'index.html','app/core/core-runtime-v0958.js','app/core/bootstrap-v096.js','app/config/runtime-manifest.js','app/config/feature-flags.js','app/state/state.js','app/input/input.js','app/characters/database.js','app/characters/validator.js','app/characters/characters.js','app/combat/invariants.js','app/combat/api.js','app/combat/combat.js','app/core/game.js','app/ui/ui.js','app/owner/storage.js','app/owner/commands.js','app/debug/error-logger.js','app/debug/debug-panel.js','app/save/migrations.js','app/systems/save.js','app/release/build-info.js','app/ui/ownerboard.js','update-v098.js','update-v098.css','tests/browser-smoke.spec.js'
];
for(const file of requiredFiles)assert(exists(file),`missing required file: ${file}`);
for(const id of ['play','training','chars','fight','pF','eF','punch','kick','special','block','toast'])assert(index.includes(`id="${id}"`),`missing critical UI id: ${id}`);
assert(index.includes('app/core/bootstrap-v096.js'),'index no longer loads stable bootstrap');
for(const token of ['runtimeManifest','features','characterDB','characterValidator','combatInvariants','combatAPI','errorLogger','debug','saveMigrations','buildInfo','ownerStorage','ownerCommands','ownerboard'])assert(bootstrap.includes(token),`bootstrap missing ${token}`);
assert(bootstrap.includes("Date.now()"),'dev cache busting missing');

const runtime=[...manifest.matchAll(/'([^']+\.js)'/g)].map(m=>m[1]);
assert(runtime.length>=10,'runtime manifest unexpectedly small');
assert(new Set(runtime).size===runtime.length,'runtime manifest contains duplicate scripts');
for(const file of runtime)assert(exists(file),`runtime manifest points to missing file: ${file}`);
assert(runtime[runtime.length-1]==='update-v098.js','v0.9.8 patch must load last');
assert(manifest.includes("version:'0.9.8-dev.1'"),'runtime manifest version is not v0.9.8-dev.1');

const ux=read('update-v098.js'),uxCss=read('update-v098.css');
assert(ux.includes("VERSION='0.9.8-dev.1'"),'v0.9.8 UX version missing');
for(const token of ['FIGHT.<br>COLLECT.<br>CONQUER.','Owner Dock Safety','Gameplay & UX'])assert(ux.includes(token),`v0.9.8 UX patch missing ${token}`);
for(const token of ['#home .home','.owner-board-dock','@media (max-width:900px)'])assert(uxCss.includes(token),`v0.9.8 responsive CSS missing ${token}`);

const characterDB=read('app/characters/database.js');
const validator=read('app/characters/validator.js');
const combatAPI=read('app/combat/api.js');
const invariants=read('app/combat/invariants.js');
assert(characterDB.includes('importLegacy'),'character database legacy import missing');
assert(validator.includes('validateAll'),'character validator missing validateAll');
for(const method of ['dealDamage','heal','stun','knockback','useAbility','endMatch','validate'])assert(combatAPI.includes(method),`combat API missing ${method}`);
for(const token of ['safeDamage','normalizeFighter','assertState'])assert(invariants.includes(token),`combat invariant missing ${token}`);

const migrations=read('app/save/migrations.js');
const save=read('app/systems/save.js');
assert(migrations.includes('CURRENT=3')&&migrations.includes('BACKUP_KEY'),'save migration version/backup missing');
assert(save.includes('restoreBackup')&&save.includes('saveMigrations'),'save migration integration missing');
const flags=read('app/config/feature-flags.js');
assert(flags.includes('experimentalAbilities:false')&&flags.includes('combatInvariants:true'),'feature flag defaults incomplete');
const buildInfo=read('app/release/build-info.js');
assert(buildInfo.includes('build-meta.json')&&buildInfo.includes('maBuildBadge'),'build identity integration missing');

const logger=read('app/debug/error-logger.js'),debug=read('app/debug/debug-panel.js');
assert(logger.includes('unhandledrejection')&&logger.includes("addEventListener('error'"),'global error hooks missing');
for(const method of ['show','hide','toggle','snapshot','copy'])assert(debug.includes(method),`debug panel missing ${method}`);

const ownerBoard=read('app/ui/ownerboard.js');
assert(ownerBoard.includes('toggleDebug')&&ownerBoard.includes('copyDebugSnapshot'),'ownerboard debug commands missing');
console.log(`V1 smoke test passed: ${requiredFiles.length} required files, ${runtime.length} runtime scripts, v0.9.8 dev.1 UX and release hardening verified.`);

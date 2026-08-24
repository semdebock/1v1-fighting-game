const fs=require('fs');
const path=require('path');

const ROOT=path.resolve(__dirname,'../..');
const BOOT=path.join(ROOT,'app/core/bootstrap-v096.js');
const INDEX=path.join(ROOT,'index.html');
const MANIFEST=path.join(ROOT,'app/config/runtime-manifest.js');
const EXPECTED_BUILD='0.9.7.7.2';
const EXPECTED_ASSET='09772';

function fail(message){console.error('REPO AUDIT FAILED:',message);process.exitCode=1}
function read(file){return fs.readFileSync(file,'utf8')}
function exists(rel){return fs.existsSync(path.join(ROOT,rel))}

const boot=read(BOOT);
const index=read(INDEX);
let runtime=[];

if(fs.existsSync(MANIFEST)){
  const manifest=read(MANIFEST);
  runtime=[...manifest.matchAll(/'([^']+\.js)'/g)].map(m=>m[1]);
  if(!boot.includes('runtimeManifest'))fail('Bootstrap is not wired to the centralized runtime manifest');
}else{
  const runtimeMatch=boot.match(/const RUNTIME=\[([^\]]+)\]/);
  if(!runtimeMatch){fail('Could not locate runtime manifest or legacy RUNTIME list');process.exit(1)}
  runtime=[...runtimeMatch[1].matchAll(/'([^']+)'/g)].map(m=>m[1]);
}

const required=['app/core/core-runtime-v0958.js',...runtime];
const missing=required.filter(rel=>!exists(rel));
if(missing.length)fail('Missing production files: '+missing.join(', '));

const duplicates=runtime.filter((item,i)=>runtime.indexOf(item)!==i);
if(duplicates.length)fail('Duplicate production runtime entries: '+[...new Set(duplicates)].join(', '));

if(!boot.includes(`const BUILD='${EXPECTED_BUILD}'`))fail('Bootstrap BUILD is not '+EXPECTED_BUILD);
const supportsStableAsset=boot.includes(`:'${EXPECTED_ASSET}'`)||boot.includes(`const ASSET='${EXPECTED_ASSET}'`);
const supportsDevBust=boot.includes('Date.now()')&&boot.includes('IS_DEV');
if(!supportsStableAsset)fail('Bootstrap no longer preserves stable production asset '+EXPECTED_ASSET);
if(!supportsDevBust)fail('Bootstrap dev cache-busting is missing');
if(!index.includes(`app/core/bootstrap-v096.js?v=${EXPECTED_ASSET}`))fail('index.html is not pointing at the current production bootstrap asset version');
if(index.includes('app/core/bootstrap-v0958.js'))fail('index.html still references the historical bootstrap');
if((index.match(/app\/core\/bootstrap-v096\.js/g)||[]).length!==1)fail('index.html must load exactly one production bootstrap');

const directRuntime=runtime.filter(file=>index.includes(`src="${file}`)||index.includes(`src='${file}`));
if(directRuntime.length)fail('index.html directly loads runtime files owned by the bootstrap: '+directRuntime.join(', '));

if(!process.exitCode)console.log(`Repo audit OK: ${required.length} runtime JS files present, centralized load order valid, production asset preserved, dev cache-busting enabled.`);

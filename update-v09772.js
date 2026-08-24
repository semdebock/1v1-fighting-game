/* Multiverse Arena v0.9.7.7.2 — hidden local Owner Board */
(()=>{
'use strict';
const BUILD='0.9.7.7.2',ASSET='09772',SAVE_KEY='fightArenaV08',CODE='OWNERBOARD',$=(s,r=document)=>r.querySelector(s);
const fighters=['Rookie','El Primo','Spider-Man','Captain America','Iron Man','Daredevil','Moon Knight','Black Panther','Wolverine','Punisher','Thor','Doctor Strange','Star-Lord'];
const skins=['rookie-default','rookie-neo','primo-default','primo-gold','spider-default','spider-symbiote','cap-default','cap-hydra','iron-default','iron-nano','iron-hulkbuster','dd-default','mk-default','bp-default','bp-kinetic','wolverine-default','punisher-default','thor-default','strange-default','starlord-default'];
const campaign=['Nightfang','Voltage','Razor','Titan','Arena Champion','Crossbones','Bullseye','Punisher','Taskmaster','Kingpin','Rhino','Electro','Mysterio','Green Goblin','Doctor Octopus','Sabretooth','Mystique','Juggernaut','Deadpool','Magneto'];
function read(){try{return JSON.parse(localStorage.getItem(SAVE_KEY)||'{}')||{}}catch{return {}}}
function write(s){localStorage.setItem(SAVE_KEY,JSON.stringify(s))}
function unlocked(){return !!read().ownerBoardUnlocked}
function reloadWith(msg){sessionStorage.setItem('ownerBoardFlash',msg||'OWNER UPDATE APPLIED');location.reload()}
function mutate(label,fn){if(!confirm(label+'\n\nApply this Owner action?'))return;const s=read();fn(s);s.ownerBoardUnlocked=true;write(s);reloadWith(label)}
function injectStyle(){if($('#ownerBoardCss'))return;const l=document.createElement('link');l.id='ownerBoardCss';l.rel='stylesheet';l.href=`update-v09772.css?v=${ASSET}`;document.head.appendChild(l)}
function brand(){document.title='Multiverse Arena v0.9.7.7.2';document.querySelectorAll('.brand .tag').forEach(x=>x.textContent='v0.9.7.7.2');const h=$('.build-health b');if(h)h.textContent='v0.9.7.7.2 • STABLE'}
function redeemOwner(e){const input=$('#redeemInput');if(!input||input.value.trim().toUpperCase()!==CODE)return false;e.preventDefault();e.stopImmediatePropagation();const s=read();s.ownerBoardUnlocked=true;s.redeemedOwnerBoard=true;write(s);const status=$('#redeemStatus');if(status){status.textContent='👑 OWNER ACCESS GRANTED';status.className='redeem-status god'}input.value='';setTimeout(()=>reloadWith('OWNER ACCESS ENABLED'),450);return true}
function wireRedeem(){const b=$('#redeemBtn');if(b&&!b.dataset.ownerBoardWire){b.dataset.ownerBoardWire='1';b.addEventListener('click',redeemOwner,true)}const i=$('#redeemInput');if(i&&!i.dataset.ownerBoardWire){i.dataset.ownerBoardWire='1';i.addEventListener('keydown',e=>{if(e.key==='Enter')redeemOwner(e)},true)}}
function ensureSettingsButton(){if(!unlocked())return;const grid=$('#settingsScreen .settings-grid');if(!grid||$('#ownerBoardLaunch'))return;const row=document.createElement('div');row.className='setting-row owner-setting-row';row.innerHTML='<div><b>👑 OWNER BOARD</b><span>Local developer permissions for economy, Collection, Campaign and save management.</span></div><button id="ownerBoardLaunch">OPEN</button>';grid.appendChild(row);$('#ownerBoardLaunch').onclick=openBoard}
function boardMarkup(){const s=read();return `<div id="ownerBoardOverlay" class="owner-board-overlay"><div class="owner-board-shell"><div class="owner-board-head"><div><small>👑 OWNER • LOCAL ADMIN</small><h2>OWNER COMMAND CENTER</h2><p>Changes write directly to this device save and reload the game to prevent stale state.</p></div><button id="ownerBoardClose">✕</button></div><div class="owner-summary"><span>LV <b>${Number(s.lv)||1}</b></span><span>🪙 <b>${Number(s.coins)||0}</b></span><span>💎 <b>${Number(s.gems)||0}</b></span><span>UNLOCKED <b>${Math.min(20,Number(s.unlocked)||1)}/20</b></span></div><div class="owner-grid">
<section><small>ECONOMY</small><h3>CURRENCY</h3><div class="owner-input-row"><input id="ownerCoinsInput" type="number" min="0" value="${Number(s.coins)||0}"><button id="ownerSetCoins">SET 🪙</button></div><div class="owner-input-row"><input id="ownerGemsInput" type="number" min="0" value="${Number(s.gems)||0}"><button id="ownerSetGems">SET 💎</button></div><div class="owner-actions"><button id="ownerAddCoins">+10,000 🪙</button><button id="ownerAddGems">+100 💎</button></div></section>
<section><small>COLLECTION</small><h3>ROSTER ACCESS</h3><div class="owner-actions stacked"><button id="ownerUnlockFighters">UNLOCK ALL FIGHTERS</button><button id="ownerUnlockSkins">UNLOCK ALL SKINS</button><button id="ownerUnlockGod">UNLOCK THE ONE ABOVE ALL</button></div></section>
<section><small>CAMPAIGN</small><h3>PROGRESSION</h3><div class="owner-actions stacked"><button id="ownerUnlockCampaign">UNLOCK ALL FIGHTS</button><button id="ownerClearCampaign">MARK ALL CLEARED</button></div></section>
<section><small>SAVE TOOLS</small><h3>BACKUP / RESTORE</h3><textarea id="ownerSaveBox" spellcheck="false" placeholder="Owner save JSON"></textarea><div class="owner-actions"><button id="ownerExportSave">EXPORT</button><button id="ownerRestoreSave">RESTORE</button></div></section>
</div><div class="owner-warning">Owner access is stored locally on this device. This is a development permission layer, not server-side authentication.</div></div></div>`}
function openBoard(){if(!unlocked())return;$('#ownerBoardOverlay')?.remove();document.body.insertAdjacentHTML('beforeend',boardMarkup());$('#ownerBoardClose').onclick=()=>$('#ownerBoardOverlay')?.remove();$('#ownerBoardOverlay').addEventListener('click',e=>{if(e.target.id==='ownerBoardOverlay')e.currentTarget.remove()});
$('#ownerSetCoins').onclick=()=>mutate('Set coin balance',s=>s.coins=Math.max(0,Number($('#ownerCoinsInput').value)||0));
$('#ownerSetGems').onclick=()=>mutate('Set diamond balance',s=>s.gems=Math.max(0,Number($('#ownerGemsInput').value)||0));
$('#ownerAddCoins').onclick=()=>mutate('Add 10,000 coins',s=>s.coins=(Number(s.coins)||0)+10000);
$('#ownerAddGems').onclick=()=>mutate('Add 100 diamonds',s=>s.gems=(Number(s.gems)||0)+100);
$('#ownerUnlockFighters').onclick=()=>mutate('Unlock all fighters',s=>{s.owned=s.owned||{};const live=Object.keys(window.FightArena?.chars||{});(live.length?live:fighters).forEach(n=>s.owned[n]=true)});
$('#ownerUnlockSkins').onclick=()=>mutate('Unlock all current skins',s=>{s.skinsOwned=s.skinsOwned||{};skins.forEach(id=>s.skinsOwned[id]=true)});
$('#ownerUnlockGod').onclick=()=>mutate('Unlock The One Above All',s=>{s.ownerGodUnlocked=true;s.owned=s.owned||{};s.owned['The One Above All']=true});
$('#ownerUnlockCampaign').onclick=()=>mutate('Unlock all campaign fights',s=>{s.unlocked=20});
$('#ownerClearCampaign').onclick=()=>mutate('Mark every campaign fight cleared',s=>{s.unlocked=20;s.campaignWins=s.campaignWins||{};campaign.forEach(n=>s.campaignWins[n]=true);s.campaignPhaseRewards=s.campaignPhaseRewards||{};s.campaignPhaseRewards.prologue=true});
$('#ownerExportSave').onclick=async()=>{const text=JSON.stringify(read(),null,2);$('#ownerSaveBox').value=text;try{await navigator.clipboard.writeText(text);$('#ownerExportSave').textContent='✓ COPIED'}catch{$('#ownerExportSave').textContent='READY'}};
$('#ownerRestoreSave').onclick=()=>{let parsed;try{parsed=JSON.parse($('#ownerSaveBox').value)}catch{return alert('Invalid save JSON.')}if(!confirm('Restore this save? This replaces the current local game save.'))return;parsed.ownerBoardUnlocked=true;write(parsed);reloadWith('SAVE RESTORED')};}
function flash(){const msg=sessionStorage.getItem('ownerBoardFlash');if(!msg)return;sessionStorage.removeItem('ownerBoardFlash');setTimeout(()=>{const t=$('#toast');if(t){t.textContent='👑 '+msg;t.classList.remove('hidden');setTimeout(()=>t.classList.add('hidden'),1800)}},700)}
function audit(){injectStyle();brand();wireRedeem();ensureSettingsButton()}
function init(){audit();flash();window.MultiverseArenaUpdate09772={version:BUILD,audit,open:openBoard,unlocked}}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();addEventListener('fightarena-ready',()=>setTimeout(audit,500));
})();

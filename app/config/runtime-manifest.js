/* Multiverse Arena runtime manifest — dev cleanup foundation */
(()=>{
'use strict';
const root=window.MultiverseArenaModules=window.MultiverseArenaModules||{};
const groups={
  platform:['device-v092.js','touch-v0941.js','stability-v0941.js'],
  campaign:['campaign-v097.js'],
  interface:['ui-v09571.js','polish-v09572.js','premium-v096.js'],
  legacyPatches:['update-v0962.js','update-v0963.js','update-v0964.js','update-v097.js','update-v0971.js','update-v0972.js','update-v0973.js','update-v0974.js','update-v09741.js','update-v0975.js','update-v09751.js','update-v0976.js','update-v09761.js','update-v0977.js','update-v09771.js','update-v09772.js'],
  ownerCompatibility:['owner-devtools-v09772.js']
};
const ordered=Object.values(groups).flat();
root.runtimeManifest={version:'0.9.7.7.5-dev',groups,ordered};
})();
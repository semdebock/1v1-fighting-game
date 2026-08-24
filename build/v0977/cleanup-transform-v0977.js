module.exports=function cleanupTransformV0977(code){
 const rep=(from,to,label)=>{if(!code.includes(from))throw new Error('v0.9.7.7 cleanup marker missing: '+label);code=code.replace(from,to)};
 rep(".electro-gridbolt').forEach(n=>n.remove());", ".electro-gridbolt,.thor-lightningfx,.thor-rushfx,.thor-stormfx,.strange-portalfx,.strange-shieldfx,.strange-mirrorfx,.starlord-jetfx,.starlord-minefx,.starlord-outlawfx').forEach(n=>n.remove());",'hero transient FX');
 rep("'hulkbuster-barrage','veronica-crashdown');", "'hulkbuster-barrage','veronica-crashdown','thor-cast','thor-rush','god-of-thunder','strange-cast','strange-shield','mirror-dimension','starlord-fire','starlord-jet','legendary-outlaw');",'hero transient classes');
 return code;
};

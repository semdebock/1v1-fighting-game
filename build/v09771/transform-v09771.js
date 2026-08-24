module.exports=function transformV09771(code){
 const from="if(i===0){setCd(0,3.6);p?.classList.add('thor-cast');playerProjectile('mjolnir-projectile',18,4.7,6,true,()=>p?.classList.remove('thor-cast'));toast('MJOLNIR THROW!')}";
 const to="if(i===0){setCd(0,3.6);p?.classList.add('thor-cast','mjolnir-away');playerProjectile('mjolnir-projectile',18,4.7,6,true,()=>{p?.classList.remove('thor-cast','mjolnir-away')});toast('MJOLNIR THROW!')}";
 if(!code.includes(from))throw new Error('v0.9.7.7.1 Thor hammer anchor missing');
 return code.replace(from,to);
};

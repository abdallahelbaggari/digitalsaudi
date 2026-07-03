const C={'Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'POST,OPTIONS','Access-Control-Allow-Headers':'Content-Type'};
export async function onRequestPost(ctx){
  try{const {paymentId}=await ctx.request.json();return new Response(JSON.stringify({cancelled:true,paymentId}),{status:200,headers:{...C,'Content-Type':'application/json'}});}
  catch(e){return new Response(JSON.stringify({cancelled:true}),{status:200,headers:{...C,'Content-Type':'application/json'}});}
}
export async function onRequestOptions(){return new Response(null,{headers:C});}

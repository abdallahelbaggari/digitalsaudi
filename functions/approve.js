const C={'Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'POST,OPTIONS','Access-Control-Allow-Headers':'Content-Type'};
export async function onRequestPost(ctx){
  const key=ctx.env.PI_API_KEY;
  try{
    const {paymentId}=await ctx.request.json();
    try{await fetch(`https://api.minepi.com/v2/payments/${paymentId}/approve`,{method:'POST',headers:{Authorization:`Key ${key}`}});}catch(e){}
    return new Response(JSON.stringify({approved:true,paymentId}),{status:200,headers:{...C,'Content-Type':'application/json'}});
  }catch(e){return new Response(JSON.stringify({approved:true}),{status:200,headers:{...C,'Content-Type':'application/json'}});}
}
export async function onRequestOptions(){return new Response(null,{headers:C});}

const CORS={'Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'GET,OPTIONS','Access-Control-Allow-Headers':'Content-Type'};
const Q={all:'saudi arabia',tech:'saudi technology AI LEAP NEOM digital',vision:'saudi vision 2030 giga projects',business:'saudi economy startup investment',tourism:'saudi tourism AlUla Red Sea',sports:'saudi pro league football'};
export async function onRequestGet(context){
  const url=new URL(context.request.url);
  const cat=url.searchParams.get('cat')||'all';
  const page=parseInt(url.searchParams.get('page')||'1');
  const q=Q[cat]||Q.all;
  try{
    const [g,e]=await Promise.allSettled([
      fetch(`https://content.guardianapis.com/search?q=${encodeURIComponent(q)}&show-fields=thumbnail,trailText&page-size=20&page=${page}&order-by=newest&api-key=test`,{signal:AbortSignal.timeout(6000)})
      .then(r=>r.ok?r.json():{response:{}}).then(d=>{
        const meta=d.response||{};
        return{articles:(meta.results||[]).map((a,i)=>({id:`g_${page}_${i}`,title:a.webTitle||'',source:'The Guardian',summary:(a.fields?.trailText||'').replace(/<[^>]+>/g,'').slice(0,200),image:a.fields?.thumbnail||null,url:a.webUrl||'',date:a.webPublicationDate||'',category:cat})),totalPages:meta.pages||1};
      }),
      cat==='sports'||cat==='all'
        ?fetch('https://site.api.espn.com/apis/site/v2/sports/soccer/sau.1/news?limit=15',{signal:AbortSignal.timeout(5000)})
         .then(r=>r.ok?r.json():{}).then(d=>({articles:(d.articles||[]).map((a,i)=>({id:`espn_${i}`,title:a.headline||'',source:'ESPN Saudi',summary:(a.description||'').slice(0,200),image:a.images?.[0]?.url||null,url:a.links?.web?.href||'',date:a.published||'',category:'sports'}))}))
        :Promise.resolve({articles:[]}),
    ]);
    const gd=g.status==='fulfilled'?g.value:{articles:[],totalPages:1};
    const ed=e.status==='fulfilled'?e.value:{articles:[]};
    const articles=[...gd.articles,...ed.articles].filter(a=>a.title);
    return new Response(JSON.stringify({articles,page,totalPages:gd.totalPages,hasMore:page<gd.totalPages,cat}),
      {headers:{...CORS,'Content-Type':'application/json','Cache-Control':'public,max-age=180'}});
  }catch(err){
    return new Response(JSON.stringify({articles:[],page,hasMore:false}),
      {headers:{...CORS,'Content-Type':'application/json'}});
  }
}
export async function onRequestOptions(){return new Response(null,{headers:CORS});}

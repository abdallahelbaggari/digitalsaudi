/**
 * DigitalSaudi · /news · v7.0
 * Guardian API + ESPN Saudi
 * Infinite scroll, paginated, fast
 */
const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const QUERIES = {
  all:      'saudi arabia',
  tech:     'saudi technology AI LEAP NEOM digital innovation',
  vision:   'saudi vision 2030 giga projects neom',
  business: 'saudi economy startup investment fintech',
  tourism:  'saudi tourism AlUla Red Sea travel',
  sports:   'saudi football pro league',
};

export async function onRequestGet(context) {
  const url = new URL(context.request.url);
  const cat  = url.searchParams.get('cat')  || 'all';
  const page = parseInt(url.searchParams.get('page') || '1');
  const q    = QUERIES[cat] || QUERIES.all;

  console.log('[news] cat:', cat, 'page:', page);

  try {
    const [guardian, espn] = await Promise.allSettled([
      fetch(
        `https://content.guardianapis.com/search?q=${encodeURIComponent(q)}`
        + `&show-fields=thumbnail,trailText&page-size=20&page=${page}&order-by=newest&api-key=test`,
        { signal: AbortSignal.timeout(7000) }
      ).then(r => r.ok ? r.json() : { response: {} })
       .then(d => {
         const meta = d.response || {};
         return {
           articles: (meta.results || []).map((a, i) => ({
             id: `g_${page}_${i}`,
             title: a.webTitle || '',
             source: 'The Guardian',
             summary: (a.fields?.trailText || '').replace(/<[^>]+>/g, '').slice(0, 200),
             image: a.fields?.thumbnail || null,
             url: a.webUrl || '',
             date: a.webPublicationDate || '',
             category: cat,
           })),
           totalPages: meta.pages || 1,
         };
       }),

      (cat === 'sports' || cat === 'all')
        ? fetch(
            'https://site.api.espn.com/apis/site/v2/sports/soccer/sau.1/news?limit=10',
            { signal: AbortSignal.timeout(6000) }
          ).then(r => r.ok ? r.json() : {})
           .then(d => ({
             articles: (d.articles || []).slice(0, 8).map((a, i) => ({
               id: `espn_${i}`,
               title: a.headline || '',
               source: 'ESPN Saudi',
               summary: (a.description || '').slice(0, 200),
               image: a.images?.[0]?.url || null,
               url: a.links?.web?.href || '',
               date: a.published || '',
               category: 'sports',
             })),
             totalPages: 1,
           }))
        : Promise.resolve({ articles: [], totalPages: 1 }),
    ]);

    const gData = guardian.status === 'fulfilled' ? guardian.value : { articles: [], totalPages: 1 };
    const eData = espn.status === 'fulfilled' ? espn.value : { articles: [] };

    const articles = [...gData.articles, ...(page === 1 ? eData.articles : [])]
      .filter(a => a.title && a.title.length > 5);

    console.log('[news] articles:', articles.length, 'guardian pages:', gData.totalPages);

    return new Response(JSON.stringify({
      articles,
      page,
      totalPages: gData.totalPages,
      hasMore: page < gData.totalPages,
      cat,
    }), {
      headers: { ...CORS, 'Content-Type': 'application/json', 'Cache-Control': 'public,max-age=180' },
    });

  } catch (err) {
    console.error('[news] error:', err.message);
    return new Response(JSON.stringify({ articles: [], page, hasMore: false, error: err.message }), {
      status: 200, headers: { ...CORS, 'Content-Type': 'application/json' },
    });
  }
}

export async function onRequestOptions() {
  return new Response(null, { status: 200, headers: CORS });
}

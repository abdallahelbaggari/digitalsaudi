/**
 * DigitalSaudi · /news · v2.0
 * Infinite scroll news feed — Guardian + ESPN Saudi
 * Fast, paginated, cacheable
 */
const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const QUERIES = {
  all:      'saudi arabia',
  tech:     'saudi technology AI digital LEAP NEOM',
  vision:   'saudi vision 2030 giga projects',
  business: 'saudi economy investment fintech startup',
  tourism:  'saudi tourism AlUla Red Sea',
  sports:   'saudi pro league football',
};

export async function onRequestGet(context) {
  const url  = new URL(context.request.url);
  const cat  = url.searchParams.get('cat')  || 'all';
  const page = parseInt(url.searchParams.get('page') || '1');
  const q    = QUERIES[cat] || QUERIES.all;

  try {
    const [guardian, espn] = await Promise.allSettled([
      fetch(
        `https://content.guardianapis.com/search?q=${encodeURIComponent(q)}`+
        `&show-fields=thumbnail,trailText,bodyText&page-size=20&page=${page}&order-by=newest&api-key=test`,
        { signal: AbortSignal.timeout(6000) }
      ).then(r => r.ok ? r.json() : { response: {} })
       .then(d => {
         const meta = d.response || {};
         return {
           articles: (meta.results || []).map((a, i) => ({
             id: `g_${page}_${i}`,
             title: a.webTitle || '',
             source: 'The Guardian',
             summary: (a.fields?.trailText || '').replace(/<[^>]+>/g, '').slice(0, 220),
             image: a.fields?.thumbnail || null,
             url: a.webUrl || '',
             date: a.webPublicationDate || '',
             category: cat,
           })),
           totalPages: meta.pages || 1,
           currentPage: meta.currentPage || page,
         };
       }),
      cat === 'sports' || cat === 'all'
        ? fetch(`https://site.api.espn.com/apis/site/v2/sports/soccer/sau.1/news?limit=20`,
            { signal: AbortSignal.timeout(5000) })
          .then(r => r.ok ? r.json() : {})
          .then(d => ({
            articles: (d.articles || []).map((a, i) => ({
              id: `espn_${i}`,
              title: a.headline || '',
              source: 'ESPN Saudi',
              summary: (a.description || '').slice(0, 220),
              image: a.images?.[0]?.url || null,
              url: a.links?.web?.href || '',
              date: a.published || '',
              category: 'sports',
            })),
            totalPages: 1, currentPage: 1,
          }))
        : Promise.resolve({ articles: [], totalPages: 1, currentPage: 1 }),
    ]);

    const gData  = guardian.status === 'fulfilled' ? guardian.value  : { articles: [], totalPages: 1 };
    const eData  = espn.status    === 'fulfilled' ? espn.value     : { articles: [], totalPages: 1 };
    const merged = [...gData.articles, ...eData.articles].filter(a => a.title);

    return new Response(JSON.stringify({
      articles: merged,
      page, totalPages: gData.totalPages,
      hasMore: page < gData.totalPages,
      cat,
    }), {
      headers: { ...CORS, 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=180' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ articles: [], page, hasMore: false, error: err.message }), {
      headers: { ...CORS, 'Content-Type': 'application/json' },
    });
  }
}

export async function onRequestOptions() {
  return new Response(null, { headers: CORS });
}

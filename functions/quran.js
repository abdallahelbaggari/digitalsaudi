// /quran?surah=2 — one surah (Arabic Uthmani text + Saheeh International English) in a small,
// compressed reply, cached at Cloudflare for 30 days. Long surahs such as Al-Baqarah were often too
// slow to load straight from alquran.cloud on mobile data; this keeps them quick and reliable.
// Source: api.alquran.cloud (text) · audio files stay on cdn.islamic.network (Mishary Alafasy).

const H = { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json; charset=utf-8' };
const out = (o, status = 200, age = 2592000) => new Response(JSON.stringify(o), { status, headers: { ...H, 'Cache-Control': 'public, max-age=' + age } });

export async function onRequestGet({ request, waitUntil }) {
  const n = parseInt(new URL(request.url).searchParams.get('surah'), 10);
  if (!(n >= 1 && n <= 114)) return out({ ok: false, error: 'surah must be 1–114' }, 400, 60);
  const ck = new Request('https://cache.digitalsaudi.internal/quran/v1/' + n);
  const hit = await caches.default.match(ck);
  if (hit) return hit;
  try {
    const r = await fetch('https://api.alquran.cloud/v1/surah/' + n + '/editions/quran-uthmani,en.sahih', { cf: { cacheTtl: 2592000, cacheEverything: true } });
    if (!r.ok) return out({ ok: false, error: 'source unavailable' }, 502, 30);
    const d = await r.json();
    const ar = d.data[0], en = d.data[1];
    const res = out({
      ok: true, n, name: ar.englishName, tr: ar.englishNameTranslation, ar: ar.name,
      ayahs: ar.ayahs.map((a, i) => ({ k: a.numberInSurah, g: a.number, ar: a.text, en: en.ayahs[i] ? en.ayahs[i].text : '' }))
    });
    waitUntil(caches.default.put(ck, res.clone()));
    return res;
  } catch (e) {
    return out({ ok: false, error: 'source unavailable' }, 502, 30);
  }
}

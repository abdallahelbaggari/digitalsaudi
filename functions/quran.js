// /quran?surah=2  — one surah: Arabic (Uthmani) + Saheeh International English, cached 30 days.
// /quran?list=1   — the 114 surahs (names, verse counts, Makki/Madani), cached 30 days.
// Source: api.alquran.cloud
const H = { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json; charset=utf-8' };
const out = (o, status = 200, age = 2592000) => new Response(JSON.stringify(o), { status, headers: { ...H, 'Cache-Control': 'public, max-age=' + age } });

export async function onRequestGet({ request, waitUntil }) {
  const q = new URL(request.url).searchParams;
  const list = q.get('list') === '1', n = parseInt(q.get('surah'), 10);
  if (!list && !(n >= 1 && n <= 114)) return out({ ok: false, error: 'surah must be 1–114' }, 400, 60);
  const ck = new Request('https://cache.digitalsaudi.internal/quran/v1/' + (list ? 'list' : n));
  try { const hit = await caches.default.match(ck); if (hit) return hit; } catch (e) {}
  try {
    let body;
    if (list) {
      const r = await fetch('https://api.alquran.cloud/v1/surah', { cf: { cacheTtl: 2592000, cacheEverything: true } });
      if (!r.ok) return out({ ok: false, error: 'source unavailable' }, 502, 30);
      const d = await r.json();
      body = { ok: true, surahs: d.data.map((s) => ({ n: s.number, name: s.englishName, tr: s.englishNameTranslation, ar: s.name, v: s.numberOfAyahs, t: s.revelationType })) };
    } else {
      const r = await fetch('https://api.alquran.cloud/v1/surah/' + n + '/editions/quran-uthmani,en.sahih', { cf: { cacheTtl: 2592000, cacheEverything: true } });
      if (!r.ok) return out({ ok: false, error: 'source unavailable' }, 502, 30);
      const d = await r.json(); const ar = d.data[0], en = d.data[1];
      body = { ok: true, n, name: ar.englishName, tr: ar.englishNameTranslation, ar: ar.name,
        ayahs: ar.ayahs.map((a, i) => ({ k: a.numberInSurah, g: a.number, ar: a.text, en: en.ayahs[i] ? en.ayahs[i].text : '' })) };
    }
    const res = out(body);
    try { waitUntil(caches.default.put(ck, res.clone())); } catch (e) {}
    return res;
  } catch (e) {
    return out({ ok: false, error: 'source unavailable' }, 502, 30);
  }
}

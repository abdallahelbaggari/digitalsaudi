// DigitalSaudi — /tts  (Cloudflare Pages Function)
// Arabic pronunciation audio for the dictionary & phrasebook, made with Google Gemini text-to-speech.
// Uses the same GEMINI_API_KEY secret as the AI assistant. Every phrase is generated ONCE and then
// cached (Cloudflare cache + DS_KV if bound), so repeat plays cost nothing.
//   GET /tts?text=السلام عليكم   -> audio/wav
// Optional variable: GEMINI_TTS_MODEL (default tries gemini-3.8-flash-tts, then older preview models).

const HEADERS = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, OPTIONS' };
const MODELS = ['gemini-3.8-flash-tts', 'gemini-3.8-flash-lite-tts', 'gemini-3.1-flash-tts-preview', 'gemini-2.5-flash-preview-tts'];
const VOICE = 'Kore';

function err(msg, code) { return new Response(JSON.stringify({ ok: false, error: msg }), { status: code || 502, headers: { ...HEADERS, 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } }); }
function audio(buf) { return new Response(buf, { status: 200, headers: { ...HEADERS, 'Content-Type': 'audio/wav', 'Cache-Control': 'public, max-age=2592000' } }); }
function b64ToBytes(b64) { const s = atob(b64); const u = new Uint8Array(s.length); for (let i = 0; i < s.length; i++) u[i] = s.charCodeAt(i); return u; }
async function sha(text) { const h = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text)); return [...new Uint8Array(h)].slice(0, 16).map(b => b.toString(16).padStart(2, '0')).join(''); }

// Wrap raw 16-bit mono PCM in a WAV header
function wav(pcm, rate) {
  const h = new ArrayBuffer(44), v = new DataView(h), w = (o, s) => { for (let i = 0; i < s.length; i++) v.setUint8(o + i, s.charCodeAt(i)); };
  w(0, 'RIFF'); v.setUint32(4, 36 + pcm.length, true); w(8, 'WAVE'); w(12, 'fmt '); v.setUint32(16, 16, true); v.setUint16(20, 1, true); v.setUint16(22, 1, true);
  v.setUint32(24, rate, true); v.setUint32(28, rate * 2, true); v.setUint16(32, 2, true); v.setUint16(34, 16, true); w(36, 'data'); v.setUint32(40, pcm.length, true);
  const out = new Uint8Array(44 + pcm.length); out.set(new Uint8Array(h), 0); out.set(pcm, 44); return out;
}
const isWav = u => u.length > 12 && u[0] === 0x52 && u[1] === 0x49 && u[2] === 0x46 && u[3] === 0x46;

// Newer Interactions API (gemini-3.x TTS)
async function viaInteractions(key, model, text) {
  const res = await fetch('https://generativelanguage.googleapis.com/v1beta/interactions', {
    method: 'POST', headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
    body: JSON.stringify({ model, input: [{ type: 'user_input', content: [{ type: 'text', text, annotations: [{ type: 'speech_metadata', style: 'clear, slow and natural, like a friendly Arabic teacher' }] }] }], response_format: { type: 'audio' }, generation_config: { speech_config: [{ voice: VOICE }] } })
  });
  const d = await res.json().catch(() => null);
  if (!res.ok || !d) throw new Error(model + ' ' + res.status + ' ' + (d && d.error && d.error.message || ''));
  let data = null;
  for (const st of (d.steps || [])) for (const c of (st.content || [])) if (c.type === 'audio' && c.data) data = c.data;
  if (!data) throw new Error(model + ' no audio');
  const bytes = b64ToBytes(data);
  return isWav(bytes) ? bytes : wav(bytes, 24000);
}
// Older generateContent API (gemini-2.5 TTS previews)
async function viaGenerate(key, model, text) {
  const res = await fetch('https://generativelanguage.googleapis.com/v1beta/models/' + model + ':generateContent', {
    method: 'POST', headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
    body: JSON.stringify({ contents: [{ parts: [{ text: 'Say clearly and slowly: ' + text }] }], generationConfig: { responseModalities: ['AUDIO'], speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: VOICE } } } } })
  });
  const d = await res.json().catch(() => null);
  if (!res.ok || !d) throw new Error(model + ' ' + res.status);
  const part = ((d.candidates || [])[0] || {}).content && d.candidates[0].content.parts.find(p => p.inlineData && p.inlineData.data);
  if (!part) throw new Error(model + ' no audio');
  const rate = parseInt((/rate=(\d+)/.exec(part.inlineData.mimeType || '') || [])[1], 10) || 24000;
  const bytes = b64ToBytes(part.inlineData.data);
  return isWav(bytes) ? bytes : wav(bytes, rate);
}

export async function onRequestGet(context) {
  const env = context.env;
  const text = (new URL(context.request.url).searchParams.get('text') || '').trim().slice(0, 160);
  if (!text) return err('Missing text', 400);
  if (!env.GEMINI_API_KEY) return err('GEMINI_API_KEY not set', 503);
  const id = await sha(text);
  const creq = new Request('https://cache.digitalsaudi.internal/tts/' + id);

  try { const hit = await caches.default.match(creq); if (hit) return audio(await hit.arrayBuffer()); } catch (e) {}
  if (env.DS_KV) { try { const kvHit = await env.DS_KV.get('tts:' + id, 'arrayBuffer'); if (kvHit) { context.waitUntil(caches.default.put(creq, audio(kvHit.slice(0)))); return audio(kvHit); } } catch (e) {} }

  const models = env.GEMINI_TTS_MODEL ? [env.GEMINI_TTS_MODEL].concat(MODELS) : MODELS;
  const errors = [];
  for (const m of models) {
    for (const fn of /2\.5/.test(m) ? [viaGenerate] : [viaInteractions, viaGenerate]) {
      try {
        const bytes = await fn(env.GEMINI_API_KEY, m, text);
        context.waitUntil(caches.default.put(creq, audio(bytes.slice(0))));
        if (env.DS_KV) context.waitUntil(env.DS_KV.put('tts:' + id, bytes.slice(0).buffer));
        return audio(bytes);
      } catch (e) { errors.push(String(e && e.message || e).slice(0, 120)); }
    }
  }
  return err('TTS unavailable: ' + errors.slice(0, 3).join(' | '));
}
export async function onRequestOptions() { return new Response(null, { status: 204, headers: HEADERS }); }

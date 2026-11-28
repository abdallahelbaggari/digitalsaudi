/* DigitalSaudi Business — invoices, sales dashboard, reports, customers, recurring requests, My Pi QR poster,
   business profile, payment sounds and hide amounts. Everything stays on this phone. */
(function () {
  'use strict';
  function boot() {
    var F = window.DigitalSaudi; if (!F || !F.kit || F.biz) return; var K = F.kit; F.biz = true;
    var $ = function (s, r) { return (r || document).querySelector(s); };
    var $$ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };
    var get = K.get, put = K.put, esc = K.esc, ic = K.ic, toast = K.toast, sheet = K.sheet, fpi = K.fpi, conv = K.conv, r7 = K.r7;
    var FONT = "Poppins,'Segoe UI',Roboto,Arial,sans-serif", MONO = "'JetBrains Mono',Menlo,Consolas,monospace";

    Object.assign(K.P, {
      eye: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
      eyeoff: '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><path d="M14.12 14.12a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>',
      repeat: '<polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>',
      bars: '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>',
      plus: '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
      minus: '<line x1="5" y1="12" x2="19" y2="12"/>',
      inv: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="13" y2="17"/>',
      store: '<path d="M3 9l1.5-5h15L21 9"/><path d="M3 9h18v2a3 3 0 0 1-6 0 3 3 0 0 1-6 0 3 3 0 0 1-6 0z"/><path d="M5 13v8h14v-8"/><path d="M10 21v-5h4v5"/>',
      sound: '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>',
      print: '<polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>',
      phone: '<rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>',
      exp: '<circle cx="12" cy="12" r="10"/><polyline points="8 12 12 16 16 12"/><line x1="12" y1="8" x2="12" y2="16"/>',
      sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>',
      bar: '<path d="M3 5v14M7 5v14M10 5v14M14 5v14M17 5v14M21 5v14"/>',
      pct: '<line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>'
    });

    /* ── data ── */
    function biz() { return get('biz', {}) || {}; }
    function bizName() { var b = biz(); return b.name || K.get('name', '') || (K.me() ? '@' + K.me() : 'DigitalSaudi user'); }
    function invs() { return get('inv', []); }
    function saveInvs(L) { put('inv', L.slice(0, 500)); }
    function custs() { return get('cust', []); }
    function recs() { return get('recur', []); }
    function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }
    function day0(t) { var d = new Date(t || Date.now()); d.setHours(0, 0, 0, 0); return d.getTime(); }
    function dstr(t) { return new Date(t).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }); }
    function iso(t) { var d = new Date(t); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
    function nextNo() { var n = (get('invSeq', 0) || 0) + 1; put('invSeq', n); return 'INV-' + String(n).padStart(4, '0'); }
    function calc(o) {
      var sub = r7((o.items || []).reduce(function (a, it) { return a + (Number(it.q) || 0) * (Number(it.p) || 0); }, 0));
      var disc = Math.min(sub, Math.max(0, Number(o.disc) || 0)), base = r7(sub - disc), tax = r7(base * (Math.max(0, Number(o.tax) || 0) / 100));
      return { sub: sub, disc: disc, tax: tax, total: r7(base + tax) };
    }
    function status(v) {
      if (v.void) return 'Cancelled';
      if (v.mpaid || (v.paid || 0) >= v.total - 1e-7) return 'Paid';
      if (v.due && v.due < day0()) return 'Overdue';
      if ((v.paid || 0) > 0) return 'Part paid';
      return 'Unpaid';
    }
    var STC = { Paid: 'ok', Overdue: 'bad', Unpaid: 'wait', 'Part paid': 'wait', Cancelled: 'off' };
    function badge(v) { var s = status(v); return '<span class="bz-st ' + STC[s] + '">' + s + '</span>'; }
    function balance(v) { return status(v) === 'Paid' || v.void ? 0 : r7(Math.max(0, v.total - (v.paid || 0))); }
    function incoming() { return K.rcpts().filter(function (r) { return r.dir === 'in' && r.kind !== 'refund'; }); }
    function sales() { return incoming().filter(function (r) { return !/\bCOL-[A-Z2-9]{6}\b/i.test(String(r.narr || '')); }); }
    function payer(r) { return r.kind === 'wallet' ? (r.from || r.addr || '') : String(r.other || '').replace(/^@/, ''); }
    var CI = { raw: null, map: {} };
    function custFor(to) { to = String(to || '').toLowerCase(); if (!to) return null; var raw = localStorage.getItem('dsw_v1_cust') || ''; if (CI.raw !== raw) { var m = {}; custs().forEach(function (c) { if (c.to) m[String(c.to).toLowerCase()] = c; }); CI = { raw: raw, map: m }; } return CI.map[to] || null; }
    function who(to) { var c = custFor(to); return c ? c.name : K.isG(to) ? K.short(to) : to ? '@' + to : '—'; }
    function invLink(v) { return K.payLink({ u: v.to, a: balance(v) || v.total, x: (v.no + ' · ' + (v.title || (v.items[0] && v.items[0].d) || 'Invoice')).slice(0, 80) }); }

    /* ── backup of business records to the Pi account (restored on any phone after sign-in) ── */
    var BK = ['biz', 'inv', 'invSeq', 'cust', 'recur', 'qrO', 'prod', 'name', 'nameType', 'exp', 'goals', 'cols', 'nw'], bT = null, put0 = K.put;
    put = function (k, v) { var r = put0(k, v); if (BK.indexOf(k) >= 0) bDirty(); if (k === 'prod' || k === 'biz' || k === 'name') { try { staffPushSoon(); } catch (e) {} } return r; };
    function bSnap() { var d = {}; BK.forEach(function (k) { var v = get(k, null); if (v !== null) d[k] = v; }); return d; }
    function bHas(d) { return !!(d && ((d.inv || []).length || (d.cust || []).length || (d.recur || []).length || (d.prod || []).length || (d.exp || []).length || (d.goals || []).length || (d.cols || []).length || (d.biz && d.biz.name))); }
    function bDirty() { put0('bizTs', Date.now()); clearTimeout(bT); bT = setTimeout(bPush, 2500); }
    function bPush() {
      if (!K.signedIn() || !K.token()) return Promise.resolve(); var ts = get('bizTs', 0);
      if (!ts || ts <= get('bizUp', 0)) return Promise.resolve();
      return K.api('/history', { a: 'bput', accessToken: K.token(), ts: ts, data: bSnap() }).then(function (d) { if (d && d.ok) put0('bizUp', ts); }).catch(function () {});
    }
    function byId(loc, srv) { var m = {}, o = []; (loc || []).forEach(function (x) { if (x && x.id) m[x.id] = x; }); (srv || []).forEach(function (x) { if (x && x.id) m[x.id] = x; }); for (var k in m) o.push(m[k]); return o.sort(function (a, b) { return (b.ts || 0) - (a.ts || 0); }); }
    function bPull() {
      if (!K.signedIn() || !K.token()) return Promise.resolve();
      return K.api('/history', { a: 'bget', accessToken: K.token() }).then(function (d) {
        if (!d || !d.ok) return; var srv = d.data, loc = bSnap();
        if (!srv || !bHas(srv)) return bPush();
        if (d.ts <= get('bizTs', 0) && bHas(loc)) return bPush();
        var extra = (loc.inv || []).some(function (x) { return !(srv.inv || []).some(function (y) { return y.id === x.id; }); }) || (loc.cust || []).some(function (x) { return !(srv.cust || []).some(function (y) { return y.id === x.id; }); });
        put0('inv', byId(loc.inv, srv.inv)); put0('cust', byId(loc.cust, srv.cust)); put0('recur', byId(loc.recur, srv.recur));
        put0('invSeq', Math.max(loc.invSeq || 0, srv.invSeq || 0)); if (srv.biz) put0('biz', srv.biz); if (srv.qrO) put0('qrO', srv.qrO); put0('prod', byId(loc.prod, srv.prod)); if (srv.name && !loc.name) { put0('name', srv.name); put0('nameType', srv.nameType || 'name'); }
        put0('bizTs', d.ts); put0('bizUp', d.ts); matchAll(); K.rerender();
        if (!bHas(loc)) K.addNote('refresh', 'Business records restored', (srv.inv || []).length + ' invoices, ' + (srv.cust || []).length + ' customers and ' + (srv.prod || []).length + ' products restored from your backup.', 'brs-' + d.ts);
        if (extra) bDirty();
      }).catch(function () {});
    }
    if (bHas(bSnap()) && !get('bizTs', 0)) put0('bizTs', Date.now());
    K.HK.signin.push(function () { setTimeout(bPull, 800); });
    K.HK.bizPush = function (force) { if (force && bHas(bSnap()) && get('bizTs', 0) <= get('bizUp', 0)) put0('bizTs', Date.now()); return bPush(); };
    K.HK.bizInfo = function () { var d = bSnap(); return { up: get('bizUp', 0), items: (d.inv || []).length + (d.cust || []).length + (d.prod || []).length + (d.recur || []).length }; };
    K.HK.repair.push(bPull);
    K.HK.dirty.push(bDirty);
    document.addEventListener('visibilitychange', function () { if (document.hidden) bPush(); });

    /* ── payment done: animated confirmation ── */
    function doneFx(r) {
      if (r.dir !== 'in' && (document.querySelector('#st-m') || document.querySelector('#wp-st'))) return; // the payment screen shows its own success mark
      var o = document.createElement('div'), inn = r.dir === 'in'; o.className = 'fp-done' + (inn ? ' in' : '');
      o.innerHTML = '<div class="fp-done-c"><svg viewBox="0 0 120 120" aria-hidden="true"><circle class="r" cx="60" cy="60" r="52"/><path class="k" d="M38 62 l15 15 l30 -32"/></svg><b class="num bz-amt">' + (inn ? '+' : '−') + fpi(r.amount) + ' π</b><span>' + esc(inn ? 'Received from ' + (r.other || K.short(r.from)) : 'Sent to ' + (r.other || K.short(r.addr))) + '</span></div>';
      o.onclick = function () { o.remove(); }; document.body.insertBefore(o, document.body.firstChild); setTimeout(function () { o.classList.add('out'); setTimeout(function () { o.remove(); }, 400); }, 1900);
    }

    /* ── sounds and vibration ── */
    var AC = null;
    function ac() { try { if (!AC) AC = new (window.AudioContext || window.webkitAudioContext)(); if (AC.state === 'suspended') AC.resume(); } catch (e) { AC = null; } return AC; }
    document.addEventListener('pointerdown', function () { if (get('sound', true)) ac(); }, { once: true, passive: true });
    function tone(c, f, t0, d, g, type) {
      var o = c.createOscillator(), v = c.createGain(); o.type = type || 'sine'; o.frequency.setValueAtTime(f, t0);
      v.gain.setValueAtTime(0.0001, t0); v.gain.exponentialRampToValueAtTime(g, t0 + 0.02); v.gain.exponentialRampToValueAtTime(0.0001, t0 + d);
      o.connect(v); v.connect(c.destination); o.start(t0); o.stop(t0 + d + 0.05);
    }
    function fx(kind) {
      if (!get('sound', true)) return;
      try { if (navigator.vibrate && kind !== 'scan') navigator.vibrate(kind === 'in' ? [60, 50, 90] : kind === 'paid' ? [50, 40, 50, 40, 120] : kind === 'err' ? [200] : [40]); } catch (e) {}
      var c = ac(); if (!c) return; var t = c.currentTime + 0.02;
      try {
        if (kind === 'in') { tone(c, 880, t, 0.22, 0.22); tone(c, 1318.5, t + 0.12, 0.42, 0.2); }
        else if (kind === 'paid') { tone(c, 784, t, 0.18, 0.2); tone(c, 988, t + 0.1, 0.2, 0.2); tone(c, 1568, t + 0.2, 0.5, 0.18); }
        else if (kind === 'err') { tone(c, 220, t, 0.3, 0.15, 'triangle'); }
        else if (kind === 'scan') { tone(c, 1320, t, 0.09, 0.16); tone(c, 1760, t + 0.07, 0.12, 0.12); }
        else { tone(c, 660, t, 0.16, 0.16); tone(c, 990, t + 0.08, 0.3, 0.14); }
      } catch (e) {}
    }
    F.fx = fx; K.bizPut = function (b) { put('biz', b); };

    /* ── DigitalSaudi voice: "DigitalSaudi! You have received 25 Pi." Spoken only after DigitalSaudi itself has checked the
       transaction on the Pi blockchain (never from a screenshot, a link or a message). ── */
    var VTXT = { en: 'Digital Saudi! You have received {a} Pi.', fr: 'Digital Saudi ! Vous avez reçu {a} Pi.', es: '¡Digital Saudi! Has recibido {a} Pi.', pt: 'Digital Saudi! Você recebeu {a} Pi.', ar: 'ديجيتال سعودي! لقد استلمت {a} باي.', ur: 'ڈیجیٹل سعودی! آپ کو {a} Pi موصول ہوئے۔', id: 'Digital Saudi! Anda telah menerima {a} Pi.', ha: 'Digital Saudi! Ka karɓi Pi {a}.' };
    var VLOC = { en: 'en', fr: 'fr', es: 'es', pt: 'pt', ar: 'ar', ur: 'ur', id: 'id', ha: 'ha' };
    function vLang() { var l = window.FPL ? FPL.lang() : 'en'; return VTXT[l] ? l : 'en'; }
    function voices() { try { return (window.speechSynthesis && speechSynthesis.getVoices()) || []; } catch (e) { return []; } }
    function pickVoice(l) {
      var V = voices().filter(function (v) { return String(v.lang || '').toLowerCase().indexOf(VLOC[l]) === 0; }); if (!V.length) return null;
      function sc(v) { var n = String(v.name || ''); return (/natural|neural|enhanced|premium|google/i.test(n) ? 4 : 0) + (v.localService ? 1 : 0) + (/female|samantha|karen|amelie|monica|joana|zira|aria|jenny/i.test(n) ? 1 : 0); }
      return V.sort(function (a, b) { return sc(b) - sc(a); })[0];
    }
    function canSpeak() { return !!(window.speechSynthesis && window.SpeechSynthesisUtterance); }
    function amtWords(a, l) { a = String(Math.round(Number(a) * 100) / 100); return /^(fr|es|pt)$/.test(l) ? a.replace('.', ',') : a; }
    function chime() {
      var c = ac(); if (!c) return 0; var t = c.currentTime + 0.03;
      try { tone(c, 1046.5, t, 0.5, 0.16); tone(c, 1318.5, t + 0.13, 0.5, 0.15); tone(c, 1568, t + 0.26, 0.9, 0.15); tone(c, 2093, t + 0.26, 0.9, 0.05); } catch (e) {}
      try { if (navigator.vibrate) navigator.vibrate([60, 50, 120]); } catch (e) {}
      return 700;
    }
    // speak in the app language; if the phone has no voice for it, English is used
    function say(a, test) {
      var l = vLang(), v = pickVoice(l); if (!v && l !== 'en') { l = 'en'; v = pickVoice('en'); }
      var txt = VTXT[l].replace('{a}', amtWords(a, l)), wait = chime();
      if (!canSpeak()) return { spoken: false, text: txt };
      setTimeout(function () {
        try { var u = new SpeechSynthesisUtterance(txt); u.lang = v ? v.lang : (l === 'en' ? 'en-US' : l); if (v) u.voice = v; u.rate = 0.98; u.pitch = 1.02; u.volume = 1; speechSynthesis.speak(u); } catch (e) {}
      }, wait);
      return { spoken: true, text: txt, voice: v ? v.name : '' };
    }
    // Android browsers only speak after the first touch on the page
    document.addEventListener('pointerdown', function () { try { if (canSpeak() && get('voice', true)) { var u = new SpeechSynthesisUtterance(' '); u.volume = 0; speechSynthesis.speak(u); } } catch (e) {} }, { once: true, passive: true });
    try { if (canSpeak()) speechSynthesis.onvoiceschanged = function () {}; } catch (e) {}
    function vAnnounce(r, tries) {
      if (!get('voice', true) || !r || r.dir !== 'in' || r.kind === 'refund' || r.kind === 'supporter') return;
      var tx = String(r.txid || '').toLowerCase(); if (!/^[a-f0-9]{64}$/.test(tx)) return;
      var done = get('vAnn', []); if (done.indexOf(tx) >= 0) return;
      K.api('/verify?tx=' + tx + '&net=' + (K.TEST ? 'test' : 'main')).then(function (d) {
        if (!d || !d.ok) { if ((tries || 0) < 2) setTimeout(function () { vAnnounce(r, (tries || 0) + 1); }, 8000); return; }
        var me = get('addr', ''), P = (d.tx && d.tx.ok && d.tx.payments) || [];
        var hit = P.filter(function (p) { return Math.abs(parseFloat(p.amount) - Number(r.amount)) < 1e-6 && (!me || !P.some(function (q) { return q.to === me; }) || p.to === me); })[0];
        if (!hit) return; // not confirmed on the blockchain: stay silent
        put('vAnn', [tx].concat(get('vAnn', [])).slice(0, 200));
        say(r.amount);
      }).catch(function () { if ((tries || 0) < 2) setTimeout(function () { vAnnounce(r, (tries || 0) + 1); }, 8000); });
    }
    F.say = say;
    function voiceSheet() {
      var on = get('voice', true), l = vLang(), v = pickVoice(l), fb = !v && l !== 'en';
      var w = sheet('Voice announcements', '<div class="pd-hero">' + ic('sound') + '<b>“DigitalSaudi! You have received 25 Pi.”</b><span>Spoken when Pi arrives, after DigitalSaudi confirms the payment on the Pi blockchain.</span></div>' +
        '<div class="list" style="margin-top:12px">' + row(on ? 'check' : 'x', on ? 'Voice on' : 'Voice off', on ? 'Tap to turn off' : 'Tap to turn on', 'x', ' data-vx="tog"') + '</div>' +
        '<div class="card vc-info"><div class="row small"><span class="grow muted">Language</span><b>' + esc(window.FPL ? FPL.LANGS[window.FPL.lang()] : 'English') + '</b></div><div class="row small"><span class="grow muted">Voice</span><b>' + esc(!canSpeak() ? 'Tone only on this browser' : v ? v.name : fb ? 'English voice' : 'Phone voice') + '</b></div></div>' +
        '<button type="button" class="btn" data-vx="play"' + (on ? '' : ' disabled') + '>' + ic('sound') + 'Play sample</button>');
      $$('[data-vx]', w).forEach(function (b) { b.removeAttribute('data-act'); b.onclick = function () { if (b.dataset.vx === 'tog') { put('voice', !get('voice', true)); toast(get('voice', true) ? 'Voice announcements on' : 'Voice announcements off'); return voiceSheet(); } ac(); say(25, true); }; });
    }

    /* ── hide amounts ── */
    function applyHide() { document.documentElement.classList.toggle('fp-hide', !!get('hide', false)); var b = $('#hide-b'); if (b) { b.innerHTML = ic(get('hide', false) ? 'eyeoff' : 'eye'); b.setAttribute('aria-label', get('hide', false) ? 'Show amounts' : 'Hide amounts'); } }
    function toggleHide() { put('hide', !get('hide', false)); applyHide(); toast(get('hide', false) ? 'Amounts hidden' : 'Amounts shown'); K.rerender(); }
    (function () {
      var tr = $('#top .top-r'); if (tr && !$('#hide-b')) { var b = document.createElement('button'); b.type = 'button'; b.className = 'tbtn'; b.id = 'hide-b'; b.dataset.act = 'hide'; tr.insertBefore(b, tr.firstChild.nextSibling); }
      applyHide();
    })();

    /* ── invoice payments: matched automatically by invoice number in the narration ── */
    function rkey(r) { return String(r.txid || r.pid || r.ts); }
    function invIndex(L) { var m = {}; L.forEach(function (v, i) { if (v && v.no) m[String(v.no).toUpperCase()] = i; }); return m; }
    function applyMatch(r, L, M) {
      if (!r || r.dir !== 'in' || r.kind === 'refund') return null;
      var nos = String(r.narr || '').toUpperCase().match(/INV-(?:S\d{1,3}-)?\d{4,}/g); if (!nos) return null;
      var k = rkey(r);
      for (var j = 0; j < nos.length; j++) {
        var i = M[nos[j]]; if (i == null) continue; var v = L[i];
        if (v.void || (v.pays || []).indexOf(k) >= 0) continue;
        v.pays = (v.pays || []).concat(k); v.paid = r7((v.paid || 0) + Number(r.amount || 0));
        if (v.paid >= v.total - 1e-7 && !v.pts) v.pts = r.ts || Date.now();
        return v;
      }
      return null;
    }
    function matchRcpt(r, quiet) {
      if (!r || r.dir !== 'in' || r.kind === 'refund' || !/INV-(?:S\d{1,3}-)?\d{4,}/i.test(String(r.narr || ''))) return false;
      var L = invs(), hit = applyMatch(r, L, invIndex(L));
      if (!hit) return false;
      saveInvs(L);
      if (!quiet) {
        var done = status(hit) === 'Paid';
        K.addNote('check', done ? 'Invoice paid' : 'Invoice part paid', hit.no + ' · ' + fpi(r.amount) + ' π from ' + who(payer(r)) + (done ? '' : ' · ' + fpi(balance(hit)) + ' π left'), 'invp-' + rkey(r));
        toast(done ? hit.no + ' paid' : hit.no + ' part paid');
        if (done && Date.now() - (r.ts || 0) < 180e3) setTimeout(function () { fx('paid'); }, 700);
      }
      if (status(hit) === 'Paid') stockOut(hit.id);
      return true;
    }
    // stock goes down once for every paid invoice, however the payment was matched
    function matchAll() { var L = invs(), M = invIndex(L), n = 0; if (!L.length) return 0; sales().forEach(function (r) { if (applyMatch(r, L, M)) n++; }); if (n) { saveInvs(L); L.forEach(function (v) { if (!v.stk && !v.void && status(v) === 'Paid' && v.items.some(function (it) { return it.pid; })) stockOut(v.id); }); } return n; }
    K.HK.rcpt.push(function (r) {
      var fresh = Date.now() - (r.ts || 0) < 180e3;
      var spoken = fresh && r.dir === 'in' && r.kind !== 'refund' && get('voice', true) && /^[a-f0-9]{64}$/i.test(String(r.txid || ''));
      if (fresh && r.kind !== 'supporter') { if (!spoken) fx(r.dir === 'in' ? 'in' : 'out'); if (r.kind !== 'refund') try { doneFx(r); } catch (e) {} }
      if (spoken) vAnnounce(r);
      matchRcpt(r, !fresh);
    });
    function invFor(r) { var k = rkey(r); return invs().filter(function (v) { return (v.pays || []).indexOf(k) >= 0; })[0]; }

    /* business details on receipts for payments you receive */
    function bizRows(r) {
      var b = biz(), out = [];
      if (r.dir !== 'in' || r.kind === 'refund' || r.kind === 'supporter') return out;
      if (K.nType() !== 'name') { if (b.addr) out.push(['Address', b.addr]); if (b.tax) out.push(['Tax ID', b.tax]); }
      var v = invFor(r); if (v) out.push(['Invoice', v.no]);
      return out;
    }
    K.HK.spec.push(function (sp, r) { var x = bizRows(r); if (x.length) sp.rows = x.concat(sp.rows || []); return sp; });
    K.HK.rows.push(function (rows, r) { var x = bizRows(r); if (x.length) [].splice.apply(rows, [0, 0].concat(x)); });

    /* ── recurring requests ── */
    var FQ = { weekly: 'Every week', monthly: 'Every month' };
    function adv(t, f) { var d = new Date(t); if (f === 'weekly') d.setDate(d.getDate() + 7); else { var dd = d.getDate(); d.setDate(1); d.setMonth(d.getMonth() + 1); d.setDate(Math.min(dd, new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate())); } return d.getTime(); }
    function issue(tpl, recId) {
      var now = Date.now(), v = { id: uid(), no: nextNo(), to: tpl.to, cname: tpl.cname, cto: tpl.cto || '', cphone: tpl.cphone || '', cemail: tpl.cemail || '', cid: tpl.cid || '', title: tpl.title || '', items: tpl.items, disc: tpl.disc || 0, tax: tpl.tax || 0, notes: tpl.notes || '', ts: now, due: day0(now) + (tpl.term || 0) * 864e5, paid: 0, pays: [], rec: recId || '' };
      v.total = calc(v).total; var L = invs(); L.unshift(v); saveInvs(L); return v;
    }
    function checkRec() {
      try { eodCheck(); } catch (e) {}
      try { if (get('staffC', {}).code) staffPull(); } catch (e) {}
      var R = recs(), ch = false, now = Date.now();
      R.forEach(function (x) {
        if (x.off) return; var guard = 0;
        while (x.next <= now && guard++ < 12) { var v = issue(x.tpl, x.id); x.next = adv(x.next, x.freq); x.last = now; ch = true;
          K.addNote('inv', 'Invoice ready to send', v.no + ' · ' + (x.tpl.cname || who(x.tpl.cto)) + ' · ' + fpi(v.total) + ' π', 'rec-' + v.id); }
      });
      if (ch) { put('recur', R); K.rerender(); }
      // overdue invoices: one notification each
      var L = invs(), od = false;
      L.forEach(function (v) { if (!v.odn && status(v) === 'Overdue') { v.odn = 1; od = true; K.addNote('warn', 'Invoice overdue', v.no + ' · ' + (v.cname || who(v.cto)) + ' · ' + fpi(balance(v)) + ' π due since ' + dstr(v.due), 'od-' + v.id); } });
      if (od) saveInvs(L);
    }

    /* ── shared bits ── */
    function row(i, t, s, a, extra) { return '<button type="button" class="li" data-act="' + a + '"' + (extra || '') + '><span class="ico">' + ic(i) + '</span><span class="grow"><b>' + esc(t) + '</b><small>' + esc(s) + '</small></span><span class="go">' + ic('chev') + '</span></button>'; }
    function sum(list) { return r7(list.reduce(function (a, r) { return a + Number(r.amount || 0); }, 0)); }
    function range(p) { var n = Date.now(), t = day0(); if (p === 'today') return [t, n + 1, 'Today']; if (p === '7d') return [t - 6 * 864e5, n + 1, 'Last 7 days']; if (p === '30d') return [t - 29 * 864e5, n + 1, 'Last 30 days']; var d = new Date(t); d.setDate(1); return [d.getTime(), n + 1, d.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })]; }
    function csvOut(rows, name, title) {
      var csv = rows.map(function (r) { return r.map(function (x) { x = String(x == null ? '' : x); if (/^[=+\-@]/.test(x)) x = "'" + x; return /[",\n]/.test(x) ? '"' + x.replace(/"/g, '""') + '"' : x; }).join(','); }).join('\n');
      var blob = new Blob(['﻿' + csv], { type: 'text/csv' }), f = null; try { f = new File([blob], name, { type: 'text/csv' }); } catch (e) {}
      if (K.canShareFile(f)) return navigator.share({ files: [f], title: title }).catch(function () {});
      K.saveFile(blob, name, 'text/csv', title.replace(/^DigitalSaudi /, '').toLowerCase() + ' file');
    }
    function stamp() { var d = new Date(); return d.getFullYear() + String(d.getMonth() + 1).padStart(2, '0') + String(d.getDate()).padStart(2, '0'); }
    function jpg(cv, q) { return new Promise(function (ok) { cv.toBlob(ok, 'image/jpeg', q || 0.92); }); }
    function pdfOf(cv) { return jpg(cv, 0.9).then(function (b) { return b.arrayBuffer(); }).then(function (ab) { return K.makePdf([{ w: cv.width, h: cv.height, bytes: new Uint8Array(ab) }]); }); }
    function loadImg(src) { return new Promise(function (ok) { if (!src) return ok(null); var i = new Image(); i.onload = function () { ok(i); }; i.onerror = function () { ok(null); }; i.src = src; }); }
    function rr(x, a, b, w, h, r) { x.beginPath(); x.moveTo(a + r, b); x.arcTo(a + w, b, a + w, b + h, r); x.arcTo(a + w, b + h, a, b + h, r); x.arcTo(a, b + h, a, b, r); x.arcTo(a, b, a + w, b, r); x.closePath(); }
    function fit(x, t, mw) { t = String(t || ''); if (x.measureText(t).width <= mw) return t; while (t.length > 1 && x.measureText(t + '…').width > mw) t = t.slice(0, -1); return t + '…'; }
    function wrap(x, t, mw) { var w = String(t || '').split(/\s+/), L = [], c = ''; w.forEach(function (s) { var n = c ? c + ' ' + s : s; if (x.measureText(n).width > mw && c) { L.push(c); c = s; } else c = n; }); if (c) L.push(c); return L; }
    function T(x, t, px, py, font, col, al) { x.font = font; x.fillStyle = col; x.textAlign = al || 'left'; x.fillText(t, px, py); }
    function fileActions(w, mk, base, what, title, linkText) {
      // mk() → Promise<canvas>. Buttons: share image, save image, save PDF, share PDF, share link
      var cvP = null; function cv() { return cvP || (cvP = K.fontsReady().then(mk)); }
      cv().then(function (c) { var p = $('.bz-prev', w); if (p) { p.className = 'bz-prev on'; p.innerHTML = '<img alt="' + esc(title) + '" src="' + c.toDataURL('image/jpeg', 0.85) + '">'; } }).catch(function () { var p = $('.bz-prev', w); if (p) p.textContent = 'Preview unavailable.'; });
      function busy(b, on) { if (b) b.disabled = on; }
      $$('[data-f]', w).forEach(function (b) {
        b.onclick = function () {
          var k = b.dataset.f; busy(b, true);
          cv().then(function (c) {
            if (k === 'img') return jpg(c).then(function (bl) { K.shareImage(bl, base + '.jpg', title, linkText ? linkText() : title, title); });
            if (k === 'save') return jpg(c).then(function (bl) { K.saveFile(bl, base + '.jpg', 'image/jpeg', what); });
            if (k === 'pdf') return pdfOf(c).then(function (bl) { K.saveFile(bl, base + '.pdf', 'application/pdf', what + ' PDF'); });
            if (k === 'spdf') return pdfOf(c).then(function (bl) { K.shareFile(bl, base + '.pdf', 'application/pdf', title, title, title); });
          }).catch(function () { toast('Could not create the file. Try again.'); }).then(function () { busy(b, false); });
        };
      });
    }
    function fileBtns(linkBtn) {
      return '<div class="two"><button type="button" class="btn" data-f="img">' + ic('share') + 'Share image</button><button type="button" class="btn ghost" data-f="save">' + ic('down') + 'Save to gallery</button></div>' +
        '<div class="two"><button type="button" class="btn soft" data-f="pdf">' + ic('print') + 'Save PDF</button><button type="button" class="btn soft" data-f="spdf">' + ic('inv') + 'Share PDF</button></div>' + (linkBtn || '');
    }

    /* ── invoice image (A4) ── */
    function invCanvas(v) {
      var b = biz(), c = calc(v), st = status(v), link = invLink(v);
      return Promise.all([loadImg(b.logo || 'icon-512.png')]).then(function (res) {
        var logo = res[0], W = 1240, H = 1754, X = 90, cv = document.createElement('canvas'); cv.width = W; cv.height = H; var x = cv.getContext('2d');
        x.fillStyle = '#FFFFFF'; x.fillRect(0, 0, W, H);
        var g = x.createLinearGradient(0, 0, W, 300); g.addColorStop(0, '#084427'); g.addColorStop(0.6, '#1AC271'); g.addColorStop(1, '#9B7213'); x.fillStyle = g; x.fillRect(0, 0, W, 290);
        x.globalAlpha = 0.08; x.strokeStyle = '#E3BD65'; x.lineWidth = 2; for (var i = 0; i < 7; i++) { x.beginPath(); x.arc(W - 60, 0, 90 + i * 44, 0, Math.PI * 2); x.stroke(); } x.globalAlpha = 1;
        if (logo) { x.save(); rr(x, X, 70, 120, 120, 26); x.clip(); x.fillStyle = '#fff'; x.fillRect(X, 70, 120, 120); x.drawImage(logo, X, 70, 120, 120); x.restore(); }
        x.font = '700 44px ' + FONT; T(x, fit(x, bizName(), 560), X + 150, 128, '700 44px ' + FONT, '#FFFFFF');
        var sub = [b.phone, b.email].filter(Boolean).join(' · ') || (K.myTarget() ? (K.isG(K.myTarget()) ? K.short(K.myTarget()) : '@' + K.myTarget()) : '');
        x.font = '500 24px ' + FONT; T(x, fit(x, sub, 560), X + 150, 172, '500 24px ' + FONT, 'rgba(255,255,255,.85)');
        T(x, 'INVOICE', W - X, 132, '800 64px ' + FONT, '#FFFFFF', 'right');
        T(x, v.no, W - X, 180, '600 30px ' + MONO, '#F1D89E', 'right');
        // status
        var sc = { Paid: ['#DCFCE7', '#047857'], Overdue: ['#FEE2E2', '#B42318'], Cancelled: ['#E3EFE9', '#475569'] }[st] || ['#FEF3C7', '#B45309'];
        x.font = '800 24px ' + FONT; var sw = x.measureText(st.toUpperCase()).width + 48; x.fillStyle = sc[0]; rr(x, W - X - sw, 212, sw, 48, 24); x.fill(); T(x, st.toUpperCase(), W - X - sw / 2, 245, '800 24px ' + FONT, sc[1], 'center');
        // parties
        var y = 360, cw = (W - 2 * X - 60) / 3;
        function block(cx, head, lines) { T(x, head, cx, y, '700 20px ' + FONT, '#64748B'); var yy = y + 40; lines.filter(Boolean).forEach(function (l, j) { x.font = (j ? '500 23px ' : '700 27px ') + FONT; wrap(x, l, cw).slice(0, 2).forEach(function (s) { T(x, s, cx, yy, (j ? '500 23px ' : '700 27px ') + FONT, j ? '#2F4B3E' : '#0B2C1C'); yy += j ? 32 : 36; }); }); return yy; }
        var me = K.myTarget(), y1 = block(X, 'FROM', [bizName(), b.addr, b.tax ? 'Tax ID: ' + b.tax : '', me ? 'Pi: ' + (K.isG(me) ? K.short(me) : '@' + me) : '']);
        var y2 = block(X + cw + 30, 'BILL TO', [v.cname || who(v.cto), v.cto ? (K.isG(v.cto) ? K.short(v.cto) : '@' + v.cto) : '', v.cphone, v.cemail]);
        var y3 = block(X + 2 * (cw + 30), 'DETAILS', ['Issued ' + dstr(v.ts), 'Due ' + (v.due ? dstr(v.due) : 'on receipt'), v.rec ? 'Recurring · ' + (FQ[(recs().filter(function (q) { return q.id === v.rec; })[0] || {}).freq] || '') : '', 'Network: ' + K.NETN]);
        y = Math.max(y1, y2, y3) + 30;
        // items table
        x.fillStyle = '#F1FBF6'; rr(x, X, y, W - 2 * X, 60, 14); x.fill();
        var cQ = W - X - 470, cP = W - X - 260, cA = W - X - 24;
        T(x, 'Description', X + 24, y + 39, '700 22px ' + FONT, '#2F4B3E'); T(x, 'Qty', cQ, y + 39, '700 22px ' + FONT, '#2F4B3E', 'right'); T(x, 'Unit price', cP, y + 39, '700 22px ' + FONT, '#2F4B3E', 'right'); T(x, 'Amount', cA, y + 39, '700 22px ' + FONT, '#2F4B3E', 'right');
        y += 60;
        v.items.slice(0, 12).forEach(function (it) {
          x.font = '500 25px ' + FONT; T(x, fit(x, it.d, cQ - X - 140), X + 24, y + 42, '500 25px ' + FONT, '#0B2C1C');
          T(x, fpi(it.q), cQ, y + 42, '500 24px ' + MONO, '#0B2C1C', 'right'); T(x, fpi(it.p) + ' π', cP, y + 42, '500 24px ' + MONO, '#0B2C1C', 'right');
          T(x, fpi(r7(it.q * it.p)) + ' π', cA, y + 42, '700 24px ' + MONO, '#0B2C1C', 'right');
          y += 64; x.fillStyle = '#E3EFE9'; x.fillRect(X, y, W - 2 * X, 2);
        });
        y += 36;
        // totals (right) and pay QR (left)
        var ty = y, tx = W - X - 24, lx = W / 2 + 40;
        function tl(k, val, strong) { T(x, k, lx, ty, (strong ? '700 26px ' : '500 24px ') + FONT, strong ? '#0B2C1C' : '#64748B'); T(x, val, tx, ty, (strong ? '700 26px ' : '500 24px ') + MONO, '#0B2C1C', 'right'); ty += 44; }
        tl('Subtotal', fpi(c.sub) + ' π'); if (c.disc) tl('Discount', '−' + fpi(c.disc) + ' π'); if (v.tax) tl('Tax (' + fpi(v.tax) + '%)', fpi(c.tax) + ' π');
        if (v.paid && st !== 'Paid') tl('Paid', '−' + fpi(v.paid) + ' π');
        ty += 6; x.fillStyle = '#0E6038'; rr(x, lx - 20, ty - 34, tx - lx + 44, 96, 18); x.fill();
        T(x, st === 'Paid' ? 'Total paid' : 'Amount due', lx, ty + 24, '700 26px ' + FONT, '#F1D89E'); T(x, fpi(st === 'Paid' ? v.total : balance(v)) + ' π', tx, ty + 26, '800 40px ' + MONO, '#FFFFFF', 'right');
        ty += 100; var cvv = conv(st === 'Paid' ? v.total : balance(v)); if (cvv) { x.font = '500 21px ' + FONT; T(x, fit(x, cvv + ' at today’s rate', tx - lx + 20), tx, ty, '500 21px ' + FONT, '#64748B', 'right'); }
        if (st !== 'Paid' && st !== 'Cancelled' && window.FPQR) {
          var q = FPQR.canvas(link, 250, '#0E6038', '#FFFFFF'), qs = q.width;
          x.fillStyle = '#F1FEF8'; rr(x, X, y - 20, 470, 370, 24); x.fill(); x.strokeStyle = 'rgba(33,188,113,.25)'; x.lineWidth = 2; x.stroke();
          x.fillStyle = '#FFFFFF'; rr(x, X + 12, y - 8, qs + 24, qs + 24, 14); x.fill(); x.imageSmoothingEnabled = false; x.drawImage(q, X + 24, y + 4); x.imageSmoothingEnabled = true; qs = 250;
          T(x, 'Scan to pay', X + qs + 44, y + 50, '800 28px ' + FONT, '#1AC271'); x.font = '500 21px ' + FONT;
          wrap(x, 'Open DigitalSaudi, tap Scan and pay ' + v.no + '.', 470 - qs - 60).slice(0, 4).forEach(function (s, j) { T(x, s, X + qs + 44, y + 90 + j * 30, '500 21px ' + FONT, '#2F4B3E'); });
          T(x, 'Pay by @username or Pi wallet address', X + 24, y + qs + 60, '600 20px ' + FONT, '#2F4B3E');
        } else if (st === 'Paid') {
          x.save(); x.translate(X + 220, y + 120); x.rotate(-0.18); x.strokeStyle = '#047857'; x.lineWidth = 8; rr(x, -170, -62, 340, 124, 22); x.stroke(); T(x, 'PAID', 0, 30, '900 84px ' + FONT, '#047857', 'center'); x.restore();
          if (v.pts) T(x, 'Paid on ' + dstr(v.pts), X + 220, y + 240, '600 22px ' + FONT, '#047857', 'center');
        }
        // notes
        var ny = Math.max(ty + 40, y + 400);
        if (v.notes || b.terms) { T(x, 'NOTES', X, ny, '700 20px ' + FONT, '#64748B'); x.font = '500 23px ' + FONT; wrap(x, [v.notes, b.terms].filter(Boolean).join(' · '), W - 2 * X).slice(0, 3).forEach(function (s, j) { T(x, s, X, ny + 38 + j * 32, '500 23px ' + FONT, '#2F4B3E'); }); }
        // footer
        x.fillStyle = '#E3EFE9'; x.fillRect(X, H - 120, W - 2 * X, 2);
        T(x, 'Include ' + v.no + ' in the narration.', X, H - 76, '500 20px ' + FONT, '#64748B');
        T(x, 'Created with DigitalSaudi · digitalsaudi.pi', X, H - 44, '500 20px ' + FONT, '#94A3B8'); T(x, K.NETN, W - X, H - 44, '600 20px ' + FONT, '#94A3B8', 'right');
        return cv;
      });
    }

    /* ── My Pi QR poster (A4) ── */
    function posterCanvas(o) {
      var b = biz(), me = K.myTarget(), link = K.payLink({ u: me, a: o.a || 0, x: o.x || '' });
      return loadImg(b.logo || 'icon-512.png').then(function (logo) {
        var W = 1240, H = 1754, cv = document.createElement('canvas'); cv.width = W; cv.height = H; var x = cv.getContext('2d');
        var g = x.createLinearGradient(0, 0, W, H); g.addColorStop(0, '#084427'); g.addColorStop(0.55, '#1AC271'); g.addColorStop(1, '#9B7213'); x.fillStyle = g; x.fillRect(0, 0, W, H);
        x.globalAlpha = 0.07; x.strokeStyle = '#F1D89E'; x.lineWidth = 3; for (var i = 0; i < 9; i++) { x.beginPath(); x.arc(W, 0, 120 + i * 70, 0, Math.PI * 2); x.stroke(); x.beginPath(); x.arc(0, H, 120 + i * 70, 0, Math.PI * 2); x.stroke(); } x.globalAlpha = 1;
        if (logo) { x.save(); rr(x, W / 2 - 70, 90, 140, 140, 32); x.clip(); x.fillStyle = '#fff'; x.fillRect(W / 2 - 70, 90, 140, 140); x.drawImage(logo, W / 2 - 70, 90, 140, 140); x.restore(); }
        x.font = '800 58px ' + FONT; T(x, fit(x, b.name || bizName(), W - 160), W / 2, 310, '800 58px ' + FONT, '#FFFFFF', 'center');
        if (b.addr) { x.font = '500 26px ' + FONT; T(x, fit(x, b.addr, W - 200), W / 2, 356, '500 26px ' + FONT, 'rgba(255,255,255,.82)', 'center'); }
        x.save(); x.shadowColor = 'rgba(0,0,0,.35)'; x.shadowBlur = 50; x.fillStyle = '#FFFFFF'; rr(x, 150, 410, W - 300, 1010, 48); x.fill(); x.restore();
        T(x, 'Scan to pay with Pi', W / 2, 500, '800 48px ' + FONT, '#0B2C1C', 'center');
        T(x, o.a ? fpi(o.a) + ' π' + (o.x ? ' · ' + o.x : '') : (o.x || 'Any amount'), W / 2, 556, '600 30px ' + FONT, '#1AC271', 'center');
        if (window.FPQR) { var q = FPQR.canvas(link, 1240, '#0C4A2C', '#FFFFFF'); x.drawImage(q, W / 2 - 330, 600, 660, 660); }
        x.fillStyle = '#0C4A2C'; rr(x, W / 2 - 58, 600 + 330 - 58, 116, 116, 28); x.fill(); T(x, 'π', W / 2, 600 + 330 + 30, '800 82px ' + FONT, '#FFFFFF', 'center');
        T(x, me ? (K.isG(me) ? K.short(me) : '@' + me) : '', W / 2, 1320, '700 38px ' + MONO, '#0B2C1C', 'center');
        T(x, 'Pay by @username or Pi wallet address', W / 2, 1374, '500 26px ' + FONT, '#64748B', 'center');
        var steps = ['Open DigitalSaudi', 'Tap Scan', 'Check and pay'], sx = [W / 2 - 360, W / 2, W / 2 + 360];
        steps.forEach(function (s, j) { x.fillStyle = 'rgba(255,255,255,.16)'; x.beginPath(); x.arc(sx[j], 1520, 40, 0, Math.PI * 2); x.fill(); T(x, String(j + 1), sx[j], 1535, '800 38px ' + FONT, '#FFFFFF', 'center'); T(x, s, sx[j], 1608, '600 30px ' + FONT, '#FFFFFF', 'center'); });
        T(x, 'DigitalSaudi · digitalsaudi.pi', W / 2, H - 56, '600 26px ' + FONT, 'rgba(255,255,255,.75)', 'center');
        return cv;
      });
    }
    function qrSheet() {
      if (K.needTarget('My Pi QR')) return;
      var o = get('qrO', { a: 0, x: '' });
      var w = sheet('My Pi QR',         '<div class="two bz-two"><div><label class="l" for="mq-a">Amount (optional)</label><div class="amt sm"><input id="mq-a" type="number" inputmode="decimal" placeholder="Any" value="' + (o.a || '') + '"><span>π</span></div></div>' +
        '<div><label class="l" for="mq-x">Label (optional)</label><input class="in" id="mq-x" maxlength="40" placeholder="e.g. Shop payment" value="' + esc(o.x || '') + '"></div></div>' +
        '<button type="button" class="btn soft" id="mq-up">' + ic('refresh') + 'Update poster</button>' +
        '<div class="bz-prev">Preparing poster…</div>' + fileBtns('<button type="button" class="btn ghost" data-x="lk">' + ic('link') + 'Share payment link</button>'));
      function mk() { return posterCanvas(get('qrO', { a: 0, x: '' })); }
      fileActions(w, mk, 'DigitalSaudi-QR-' + stamp(), 'QR poster', 'DigitalSaudi Pi QR', function () { var q = get('qrO', {}); return 'Pay ' + bizName() + ' with DigitalSaudi:\n' + K.payLink({ u: K.myTarget(), a: q.a || 0, x: q.x || '' }); });
      $('#mq-up', w).onclick = function () { var a = r7($('#mq-a', w).value) || 0; if (a && a < 0.01) return toast('The smallest amount is 0.01 π'); put('qrO', { a: a, x: $('#mq-x', w).value.trim() }); qrSheet(); };
      $('[data-x="lk"]', w).onclick = function () { var q = get('qrO', {}); K.shareText('DigitalSaudi payment link', 'Pay ' + bizName() + ' with DigitalSaudi:\n' + K.payLink({ u: K.myTarget(), a: q.a || 0, x: q.x || '' })); };
    }

    /* ── business profile ── */
    function profSheet() {
      var b = biz(), bt = K.nType() === 'name' ? 'business' : K.nType();
      var w = sheet('Business profile',         '<div class="bz-logo"><div class="bz-lg" id="bp-lg">' + (b.logo ? '<img alt="" src="' + esc(b.logo) + '">' : ic('store')) + '</div><div class="grow"><label class="btn soft sm" for="bp-f">' + ic('edit') + (b.logo ? 'Change logo' : 'Add logo') + '</label><input type="file" id="bp-f" accept="image/*" hidden>' + (b.logo ? '<button type="button" class="lnk small" id="bp-rl">Remove logo</button>' : '') + '</div></div>' +
        '<label class="l">Shown as</label><div class="chips" id="bp-ty">' + ['business', 'store', 'shop'].map(function (k) { return '<button type="button" class="chip' + (k === bt ? ' on' : '') + '" data-bt="' + k + '">' + K.NTYPE[k].l + '</button>'; }).join('') + '</div>' +
        '<label class="l" for="bp-n" id="bp-nl">' + K.NTYPE[bt].l + '</label><input class="in" id="bp-n" maxlength="60" value="' + esc(b.name || '') + '" placeholder="' + esc(K.NTYPE[bt].p) + '">' +
        '<label class="l" for="bp-a">Address</label><input class="in" id="bp-a" maxlength="120" value="' + esc(b.addr || '') + '" placeholder="Street, city">' +
        '<label class="l" for="bp-t">Tax ID / registration no. (optional)</label><input class="in" id="bp-t" maxlength="40" value="' + esc(b.tax || '') + '" placeholder="e.g. 12-3456789">' +
        '<div class="two bz-two"><div><label class="l" for="bp-p">Phone</label><input class="in" id="bp-p" maxlength="30" inputmode="tel" value="' + esc(b.phone || '') + '"></div><div><label class="l" for="bp-e">Email</label><input class="in" id="bp-e" maxlength="60" inputmode="email" value="' + esc(b.email || '') + '"></div></div>' +
        '<label class="l" for="bp-m">Invoice note (optional)</label><input class="in" id="bp-m" maxlength="120" value="' + esc(b.terms || '') + '" placeholder="e.g. Thank you for your business">' +
        '<button type="button" class="btn" id="bp-go">' + ic('check') + 'Save</button>');
      var logo = b.logo || '';
      $('#bp-f', w).onchange = function () {
        var f = this.files && this.files[0]; if (!f) return; var rd = new FileReader();
        rd.onload = function () { loadImg(rd.result).then(function (im) { if (!im) return toast('This image format is not supported'); var c = document.createElement('canvas'), s = Math.min(im.width, im.height); c.width = c.height = 256; var x = c.getContext('2d'); x.fillStyle = '#fff'; x.fillRect(0, 0, 256, 256); x.drawImage(im, (im.width - s) / 2, (im.height - s) / 2, s, s, 0, 0, 256, 256); logo = c.toDataURL('image/jpeg', 0.86); $('#bp-lg', w).innerHTML = '<img alt="" src="' + logo + '">'; }); };
        rd.readAsDataURL(f);
      };
      $$('[data-bt]', w).forEach(function (q) { q.onclick = function () { bt = q.dataset.bt; $$('[data-bt]', w).forEach(function (x) { x.classList.toggle('on', x === q); }); $('#bp-nl', w).textContent = K.NTYPE[bt].l; $('#bp-n', w).placeholder = K.NTYPE[bt].p; }; });
      var rl = $('#bp-rl', w); if (rl) rl.onclick = function () { logo = ''; $('#bp-lg', w).innerHTML = ic('store'); rl.remove(); };
      $('#bp-go', w).onclick = function () {
        var n = { name: $('#bp-n', w).value.trim(), addr: $('#bp-a', w).value.trim(), tax: $('#bp-t', w).value.trim(), phone: $('#bp-p', w).value.trim(), email: $('#bp-e', w).value.trim(), terms: $('#bp-m', w).value.trim(), logo: logo };
        if (!n.name) return toast('Enter the ' + K.NTYPE[bt].l.toLowerCase());
        put('biz', n); put('name', n.name); put('nameType', bt); K.closeSheets(); K.rerender(); toast('Business profile saved');
      };
    }

    /* ── customers ── */
    function custSheet(q) {
      var C = custs().slice().sort(function (a, b) { return a.name.localeCompare(b.name); }), S = sales();
      var known = C.map(function (c) { return String(c.to || '').toLowerCase(); });
      var sug = S.map(payer).filter(function (q, i, L) { return q && !K.isG(q) && L.indexOf(q) === i; }).filter(function (p) { return known.indexOf(p.toLowerCase()) < 0; }).slice(0, 8);
      var w = sheet('Customers', '<div class="bz-search">' + ic('search') + '<input class="in" id="cu-q" placeholder="Search customers" value="' + esc(q || '') + '"></div>' +
        '<div class="list" id="cu-l" style="margin-top:12px"></div>' +
        (sug.length ? '<div class="day">Recent payers</div><div class="chips">' + sug.map(function (p) { return '<button type="button" class="chip" data-sg="' + esc(p) + '">' + ic('plus', 'width:14px;height:14px;vertical-align:-2px') + ' @' + esc(p) + '</button>'; }).join('') + '</div>' : '') +
        '<button type="button" class="btn" data-x="add">' + ic('plus') + 'Add customer</button>');
      var PAY = {}; S.forEach(function (r) { var k = String(payer(r)).toLowerCase(); PAY[k] = r7((PAY[k] || 0) + Number(r.amount || 0)); });
      var DUE = {}; invs().forEach(function (v) { var b = balance(v); if (!b) return; if (v.cid) DUE['id:' + v.cid] = r7((DUE['id:' + v.cid] || 0) + b); else if (v.cto) DUE['to:' + v.cto.toLowerCase()] = r7((DUE['to:' + v.cto.toLowerCase()] || 0) + b); });
      function draw() {
        var t = $('#cu-q', w).value.trim().toLowerCase(), L = C.filter(function (c) { return !t || (c.name + ' ' + (c.to || '') + ' ' + (c.phone || '')).toLowerCase().indexOf(t) >= 0; });
        $('#cu-l', w).innerHTML = L.length ? L.map(function (c) {
          var got = c.to ? (PAY[c.to.toLowerCase()] || 0) : 0, due = r7((DUE['id:' + c.id] || 0) + (c.to ? (DUE['to:' + c.to.toLowerCase()] || 0) : 0));
          return '<button type="button" class="li" data-cu="' + c.id + '"><span class="ico bz-av">' + esc(c.name.charAt(0).toUpperCase()) + '</span><span class="grow"><b>' + esc(c.name) + '</b><small>' + esc(c.to ? (K.isG(c.to) ? K.short(c.to) : '@' + c.to) : (c.phone || 'No Pi account added')) + '</small></span><span class="amt-r"><b class="num bz-amt">' + fpi(got) + ' π</b>' + (due ? '<small class="bz-due">' + fpi(due) + ' π due</small>' : '') + '</span></button>';
        }).join('') : '<div class="empty">' + ic('users') + '<div>' + (C.length ? 'No match.' : 'No customers yet.') + '</div></div>';
        $$('[data-cu]', w).forEach(function (b) { b.onclick = function () { custView(b.dataset.cu); }; });
      }
      $('#cu-q', w).oninput = draw; draw();
      $('[data-x="add"]', w).onclick = function () { custEdit(''); };
      $$('[data-sg]', w).forEach(function (b) { b.onclick = function () { custEdit('', { to: b.dataset.sg, name: b.dataset.sg }); }; });
    }
    function custEdit(id, pre) {
      var c = custs().filter(function (x) { return x.id === id; })[0] || pre || {};
      var w = sheet(id ? 'Edit customer' : 'New customer', '<label class="l" for="ce-n">Name</label><input class="in" id="ce-n" maxlength="60" value="' + esc(c.name || '') + '" placeholder="Person or business">' +
        '<label class="l" for="ce-t">Pi @username or wallet address (optional)</label><input class="in num" id="ce-t" maxlength="60" autocapitalize="none" spellcheck="false" value="' + esc(c.to || '') + '" placeholder="@username or G…">' +
        '<div class="two bz-two"><div><label class="l" for="ce-p">Phone</label><input class="in" id="ce-p" maxlength="30" inputmode="tel" value="' + esc(c.phone || '') + '"></div><div><label class="l" for="ce-e">Email</label><input class="in" id="ce-e" maxlength="60" inputmode="email" value="' + esc(c.email || '') + '"></div></div>' +
        '<label class="l" for="ce-o">Note</label><input class="in" id="ce-o" maxlength="80" value="' + esc(c.note || '') + '">' +
        '<button type="button" class="btn" id="ce-go">' + ic('check') + 'Save customer</button>' + (id ? '<button type="button" class="btn danger" id="ce-rm">' + ic('trash') + 'Delete customer</button>' : ''), { stack: true });
      $('#ce-go', w).onclick = function () {
        var n = $('#ce-n', w).value.trim(), t = $('#ce-t', w).value.trim().replace(/^@/, '');
        if (!n) return toast('Enter the customer’s name');
        if (t) { if (/^G/i.test(t) && t.length > 40) { t = t.toUpperCase(); if (!K.validG(t)) return toast('This wallet address is not valid'); } else if (!K.USER_RE.test(t)) return toast('Enter a valid @username or wallet address'); }
        var L = custs(), d = { id: id || uid(), name: n, to: t, phone: $('#ce-p', w).value.trim(), email: $('#ce-e', w).value.trim(), note: $('#ce-o', w).value.trim(), ts: c.ts || Date.now() };
        if (t && L.some(function (x) { return x.id !== d.id && String(x.to || '').toLowerCase() === t.toLowerCase(); })) return toast('This customer is already saved');
        L = L.filter(function (x) { return x.id !== d.id; }); L.unshift(d); put('cust', L.slice(0, 500)); toast('Customer saved'); custSheet();
      };
      var rm = $('#ce-rm', w); if (rm) rm.onclick = function () { put('cust', custs().filter(function (x) { return x.id !== id; })); toast('Customer deleted'); custSheet(); };
    }
    function custView(id) {
      var c = custs().filter(function (x) { return x.id === id; })[0]; if (!c) return;
      var S = sales().filter(function (r) { return c.to && payer(r).toLowerCase() === c.to.toLowerCase(); }), V = invs().filter(function (v) { return v.cid === c.id || (c.to && v.cto && v.cto.toLowerCase() === c.to.toLowerCase()); });
      var due = r7(V.reduce(function (a, v) { return a + balance(v); }, 0));
      var w = sheet(c.name, '<div class="big"><div class="v bz-amt">' + fpi(sum(S)) + ' π</div><div class="c">Received from ' + esc(c.name) + ' · ' + S.length + ' payment' + (S.length === 1 ? '' : 's') + '</div>' + (due ? '<div class="w">' + fpi(due) + ' π outstanding</div>' : '') + '</div>' +
        '<div class="list" style="margin-top:12px">' + [c.to ? ['Pi', K.isG(c.to) ? K.short(c.to) : '@' + c.to] : null, c.phone ? ['Phone', c.phone] : null, c.email ? ['Email', c.email] : null, c.note ? ['Note', c.note] : null].filter(Boolean).map(function (x) { return '<div class="txr"><span>' + esc(x[0]) + '</span><b>' + esc(x[1]) + '</b></div>'; }).join('') + '</div>' +
        '<div class="two"><button type="button" class="btn" data-x="inv">' + ic('inv') + 'New invoice</button><button type="button" class="btn ghost" data-x="ed">' + ic('edit') + 'Edit</button></div>' +
        (c.to ? '<button type="button" class="btn soft" data-x="pay">' + ic('send') + 'Send Pi</button>' : '') + (V.length || S.length ? '<button type="button" class="btn soft" data-x="csv">' + ic('down') + 'Customer history (CSV)</button>' : '') +
        (function () {
          var P = V.filter(function (v) { return status(v) === 'Paid' && !v.void; }), spent = r7(P.reduce(function (a, v) { return a + v.total - retAmt(v); }, 0)), last = P.reduce(function (a, v) { return Math.max(a, v.pts || v.ts); }, 0), first = V.concat(S).reduce(function (a, x) { return Math.min(a, x.ts || a); }, Date.now());
          var it = {}; P.forEach(function (v) { v.items.forEach(function (x) { if (x.tip) return; var k = x.d.trim(); it[k] = it[k] || [0, 0]; it[k][0] += Number(x.q); it[k][1] = r7(it[k][1] + x.q * x.p); }); });
          var TI = Object.keys(it).map(function (k) { return [k, it[k][0], it[k][1]]; }).sort(function (a, b) { return b[2] - a[2]; }).slice(0, 5);
          return '<div class="stats"><div><small>Purchases</small><b>' + P.length + '</b></div><div><small>Spent</small><b class="bz-amt">' + fpi(spent) + ' π</b></div><div><small>Average</small><b class="bz-amt">' + fpi(P.length ? Math.round(spent / P.length * 100) / 100 : 0) + ' π</b></div></div>' +
            '<p class="small muted" style="margin:8px 2px 0">' + (last ? 'Last purchase ' + dstr(last) + ' · ' : '') + 'Customer since ' + dstr(c.ts || first) + '</p>' +
            (TI.length ? '<div class="day">Items bought</div><div class="card bz-card">' + TI.map(function (x) { return '<div class="cat"><div class="row"><span>' + esc(x[0]) + ' <small class="muted">× ' + fpi(x[1]) + '</small></span><b class="num bz-amt">' + fpi(x[2]) + ' π</b></div></div>'; }).join('') + '</div>' : '');
        })() +
        (V.length ? '<div class="day">Invoices and sales</div><div class="list">' + V.slice(0, 30).map(invRow).join('') + '</div>' : '') +
        (S.length ? '<div class="day">Payments</div><div class="list">' + S.slice(0, 20).map(function (r) { return '<div class="li"><span class="ico in">' + ic('req') + '</span><span class="grow"><b>' + esc(r.narr || 'Payment') + '</b><small>' + dstr(r.ts) + '</small></span><span class="amt-r"><b class="num pos bz-amt">+' + fpi(r.amount) + ' π</b></span></div>'; }).join('') + '</div>' : ''));
      $('[data-x="inv"]', w).onclick = function () { invEdit('', { cid: c.id }); };
      $('[data-x="ed"]', w).onclick = function () { custEdit(c.id); };
      var cv = $('[data-x="csv"]', w); if (cv) cv.onclick = function () {
        csvOut([['date', 'type', 'number', 'status', 'items', 'total_pi', 'paid_pi', 'transaction_id']].concat(V.map(function (v) { return [iso(v.ts), v.sale ? 'sale' : 'invoice', v.no, status(v), v.items.map(function (x) { return x.d + ' x' + x.q; }).join('; '), v.total, v.mpaid ? v.total : (v.paid || 0), '']; })).concat(S.map(function (r) { return [iso(r.ts), 'payment', '', 'Received', r.narr || '', r.amount, r.amount, r.txid || '']; })), 'DigitalSaudi-customer-' + c.name.replace(/[^A-Za-z0-9]+/g, '-') + '.csv', 'DigitalSaudi customer history');
      };
      var p = $('[data-x="pay"]', w); if (p) p.onclick = function () { K.closeSheets(); F.sendSheet({ u: c.to }); };
      bindInvRows(w);
    }

    /* ── invoices ── */
    function invRow(v) {
      return '<button type="button" class="li" data-iv="' + v.id + '"><span class="ico ' + (status(v) === 'Paid' ? 'in' : status(v) === 'Overdue' ? 'rf' : '') + '">' + ic('inv') + '</span><span class="grow"><b>' + esc(v.cname || who(v.cto)) + '</b><small>' + esc(v.no) + ' · ' + (v.due ? 'due ' + dstr(v.due) : dstr(v.ts)) + '</small></span><span class="amt-r"><b class="num bz-amt">' + fpi(v.total) + ' π</b>' + badge(v) + '</span></button>';
    }
    function bindInvRows(w) { $$('[data-iv]', w).forEach(function (b) { b.onclick = function () { invView(b.dataset.iv); }; }); }
    function invList(f) {
      f = f || 'all'; var L = invs();
      var cnt = function (k) { return L.filter(function (v) { return k === 'all' || (k === 'open' ? /Unpaid|Part paid|Overdue/.test(status(v)) : status(v) === k); }).length; };
      var w = sheet('Invoices', '<div class="chips">' + [['all', 'All'], ['open', 'Open'], ['Overdue', 'Overdue'], ['Paid', 'Paid']].map(function (x) { return '<button type="button" class="chip' + (f === x[0] ? ' on' : '') + '" data-if="' + x[0] + '">' + x[1] + ' · ' + cnt(x[0]) + '</button>'; }).join('') + '</div>' +
        '<div class="list" style="margin-top:12px">' + (function () { var F2 = L.filter(function (v) { return f === 'all' || (f === 'open' ? /Unpaid|Part paid|Overdue/.test(status(v)) : status(v) === f); }); return F2.length ? F2.map(invRow).join('') : '<div class="empty">' + ic('inv') + '<div>' + (L.length ? 'Nothing here.' : 'No invoices yet.') + '</div></div>'; })() + '</div>' +
        '<button type="button" class="btn" data-x="new">' + ic('plus') + 'New invoice</button>');
      $$('[data-if]', w).forEach(function (b) { b.onclick = function () { invList(b.dataset.if); }; });
      $('[data-x="new"]', w).onclick = function () { invEdit(''); };
      bindInvRows(w);
    }
    function invEdit(id, pre) {
      if (K.needTarget('New invoice')) return;
      var v = invs().filter(function (x) { return x.id === id; })[0], rc = null;
      if (!v) { v = { items: [{ d: '', q: 1, p: '' }], tax: 0, disc: 0, term: 7, notes: '', freq: '' }; if (pre && pre.cid) { var c0 = custs().filter(function (c) { return c.id === pre.cid; })[0]; if (c0) { v.cid = c0.id; v.cname = c0.name; v.cto = c0.to; v.cphone = c0.phone; v.cemail = c0.email; } } if (pre && pre.tpl) Object.assign(v, pre.tpl); }
      else { v = JSON.parse(JSON.stringify(v)); v.term = v.due ? Math.max(0, Math.round((v.due - day0(v.ts)) / 864e5)) : 0; }
      var C = custs().slice(0, 12), items = v.items.map(function (it) { return { d: it.d, q: it.q, p: it.p, pid: it.pid }; });
      var w = sheet(id ? 'Edit ' + v.no : 'New invoice',
        (C.length ? '<label class="l">Customer</label><div class="chips" id="ie-cc">' + C.map(function (c) { return '<button type="button" class="chip' + (v.cid === c.id ? ' on' : '') + '" data-cc="' + c.id + '">' + esc(c.name) + '</button>'; }).join('') + '</div>' : '') +
        '<label class="l" for="ie-n">Bill to</label><input class="in" id="ie-n" maxlength="60" value="' + esc(v.cname || '') + '" placeholder="Customer name">' +
        '<input class="in num" id="ie-t" maxlength="60" style="margin-top:8px" autocapitalize="none" spellcheck="false" value="' + esc(v.cto || '') + '" placeholder="@username or wallet address (optional)">' +
        (prods().length ? '<label class="l">Add from products</label><div class="chips bz-pc" id="ie-pc">' + prods().slice(0, 24).map(function (q) { return '<button type="button" class="chip" data-pp="' + q.id + '">' + esc(q.n) + ' · ' + fpi(q.p) + ' π</button>'; }).join('') + '</div>' : '') +
        '<label class="l">Items</label><div id="ie-it"></div><button type="button" class="lnk" id="ie-add">' + ic('plus', 'width:16px;height:16px;vertical-align:-3px') + ' Add item</button>' +
        '<div class="two bz-two"><div><label class="l" for="ie-d">Discount (π)</label><div class="amt sm"><input id="ie-d" type="number" inputmode="decimal" placeholder="0" value="' + (v.disc || '') + '"><span>π</span></div></div><div><label class="l" for="ie-x">Tax (%)</label><div class="amt sm"><input id="ie-x" type="number" inputmode="decimal" placeholder="0" value="' + (v.tax || '') + '"><span>%</span></div></div></div>' +
        '<label class="l">Payment due</label><div class="chips" id="ie-du">' + [[0, 'On receipt'], [7, '7 days'], [14, '14 days'], [30, '30 days']].map(function (x) { return '<button type="button" class="chip' + (v.term === x[0] ? ' on' : '') + '" data-du="' + x[0] + '">' + x[1] + '</button>'; }).join('') + '</div>' +
        (id ? '' : '<label class="l">Repeat</label><div class="chips" id="ie-rp">' + [['', 'Once'], ['weekly', 'Every week'], ['monthly', 'Every month']].map(function (x) { return '<button type="button" class="chip' + ((v.freq || '') === x[0] ? ' on' : '') + '" data-rp="' + x[0] + '">' + x[1] + '</button>'; }).join('') + '</div>') +
        '<label class="l" for="ie-o">Note (optional)</label><input class="in" id="ie-o" maxlength="120" value="' + esc(v.notes || '') + '" placeholder="e.g. Delivery included">' +
        '<div class="sum" id="ie-s"></div>' +
        '<button type="button" class="btn" id="ie-go">' + ic('inv') + (id ? 'Save invoice' : 'Create invoice') + '</button>');
      var term = v.term, freq = v.freq || '', cid = v.cid || '';
      function drawItems() {
        $('#ie-it', w).innerHTML = items.map(function (it, i) {
          return '<div class="bz-it"><input class="in" data-k="d" data-i="' + i + '" maxlength="60" placeholder="Item or service" value="' + esc(it.d) + '"><div class="bz-it2"><div class="amt sm"><input data-k="q" data-i="' + i + '" type="number" inputmode="decimal" placeholder="Qty" value="' + esc(it.q) + '"><span>×</span></div><div class="amt sm"><input data-k="p" data-i="' + i + '" type="number" inputmode="decimal" placeholder="Price" value="' + esc(it.p) + '"><span>π</span></div>' +
            (items.length > 1 ? '<button type="button" class="tbtn" data-rm="' + i + '" aria-label="Remove item">' + ic('minus') + '</button>' : '') + '</div></div>';
        }).join('');
        $$('#ie-it input', w).forEach(function (el) { el.oninput = function () { items[+el.dataset.i][el.dataset.k] = el.value; tot(); }; });
        $$('[data-rm]', w).forEach(function (b) { b.onclick = function () { items.splice(+b.dataset.rm, 1); drawItems(); tot(); }; });
        $('#ie-add', w).hidden = items.length >= 12;
      }
      function cur() { return { items: items.filter(function (it) { return String(it.d).trim() && Number(it.q) > 0 && Number(it.p) > 0; }).map(function (it) { var o = { d: String(it.d).trim().slice(0, 60), q: r7(it.q), p: r7(it.p) }; if (it.pid) o.pid = it.pid; return o; }), disc: r7($('#ie-d', w).value) || 0, tax: Math.min(100, r7($('#ie-x', w).value) || 0) }; }
      function tot() { var o = cur(), c = calc(o); $('#ie-s', w).innerHTML = '<div><span>Subtotal</span><b>' + fpi(c.sub) + ' π</b></div>' + (c.disc ? '<div><span>Discount</span><b>−' + fpi(c.disc) + ' π</b></div>' : '') + (o.tax ? '<div><span>Tax ' + fpi(o.tax) + '%</span><b>' + fpi(c.tax) + ' π</b></div>' : '') + '<div class="tot"><span>Total</span><b>' + fpi(c.total) + ' π</b></div>' + (conv(c.total) ? '<div><span></span><b class="small muted">' + esc(conv(c.total)) + '</b></div>' : ''); }
      drawItems(); tot();
      $$('[data-pp]', w).forEach(function (b) { b.onclick = function () { var q = prods().filter(function (x) { return x.id === b.dataset.pp; })[0]; if (!q) return; var ex = items.filter(function (it) { return it.pid === q.id; })[0]; if (ex) ex.q = r7(Number(ex.q || 0) + 1); else { if (items.length === 1 && !String(items[0].d).trim() && !items[0].p) items = []; if (items.length >= 12) return toast('Up to 12 items'); items.push({ d: q.n, q: 1, p: q.p, pid: q.id }); } drawItems(); tot(); }; });
      $('#ie-d', w).oninput = $('#ie-x', w).oninput = tot;
      $('#ie-add', w).onclick = function () { if (items.length < 12) { items.push({ d: '', q: 1, p: '' }); drawItems(); var L = $$('#ie-it [data-k="d"]', w); L[L.length - 1].focus(); } };
      $$('[data-cc]', w).forEach(function (b) { b.onclick = function () { var c = custs().filter(function (x) { return x.id === b.dataset.cc; })[0]; if (!c) return; cid = c.id; $('#ie-n', w).value = c.name; $('#ie-t', w).value = c.to || ''; $$('[data-cc]', w).forEach(function (x) { x.classList.toggle('on', x === b); }); }; });
      $('#ie-n', w).oninput = function () { cid = ''; $$('[data-cc]', w).forEach(function (x) { x.classList.remove('on'); }); };
      $$('[data-du]', w).forEach(function (b) { b.onclick = function () { term = +b.dataset.du; $$('[data-du]', w).forEach(function (x) { x.classList.toggle('on', x === b); }); }; });
      $$('[data-rp]', w).forEach(function (b) { b.onclick = function () { freq = b.dataset.rp; $$('[data-rp]', w).forEach(function (x) { x.classList.toggle('on', x === b); }); }; });
      $('#ie-go', w).onclick = function () {
        var o = cur(), n = $('#ie-n', w).value.trim(), t = $('#ie-t', w).value.trim().replace(/^@/, '');
        if (!n) return toast('Enter who the invoice is for');
        if (t) { if (/^G/i.test(t) && t.length > 40) { t = t.toUpperCase(); if (!K.validG(t)) return toast('The wallet address is not valid'); } else if (!K.USER_RE.test(t)) return toast('Enter a valid @username or wallet address'); }
        if (!o.items.length) return toast('Add at least one item with a quantity and price');
        var c = calc(o); if (!(c.total >= 0.01)) return toast('The invoice total must be at least 0.01 π');
        var cu = cid ? custs().filter(function (x) { return x.id === cid; })[0] : custFor(t);
        var tpl = { to: K.myTarget(), cname: n, cto: t, cid: cu ? cu.id : '', cphone: cu ? cu.phone : '', cemail: cu ? cu.email : '', items: o.items, disc: o.disc, tax: o.tax, notes: $('#ie-o', w).value.trim(), term: term, title: o.items[0].d };
        if (!cu && n && !custs().some(function (x) { return x.name.toLowerCase() === n.toLowerCase(); })) { var L0 = custs(); var nc = { id: uid(), name: n, to: t, phone: '', email: '', note: '', ts: Date.now() }; L0.unshift(nc); put('cust', L0); tpl.cid = nc.id; }
        if (id) {
          var L = invs().map(function (x) { if (x.id !== id) return x; Object.assign(x, { cname: tpl.cname, cto: tpl.cto, cid: tpl.cid, cphone: tpl.cphone, cemail: tpl.cemail, items: tpl.items, disc: tpl.disc, tax: tpl.tax, notes: tpl.notes, title: tpl.title, due: day0(x.ts) + term * 864e5 }); x.total = calc(x).total; return x; });
          saveInvs(L); toast('Invoice saved'); return invView(id);
        }
        var rid = ''; if (freq) { var R = recs(); rid = uid(); R.unshift({ id: rid, freq: freq, next: adv(Date.now(), freq), tpl: tpl, ts: Date.now() }); put('recur', R); }
        var nv = issue(tpl, rid); fx('out'); toast(nv.no + ' created'); K.rerender(); invView(nv.id);
      };
    }
    function invView(id) {
      var v = invs().filter(function (x) { return x.id === id; })[0]; if (!v) return;
      var st = status(v), open = /Unpaid|Part paid|Overdue/.test(st);
      var link = invLink(v), txt = function () { return bizName() + ' sent you invoice ' + v.no + ' for ' + fpi(balance(v) || v.total) + ' π' + (conv(balance(v) || v.total) ? ' (' + conv(balance(v) || v.total).replace('≈ ', '≈') + ')' : '') + (v.due ? ', due ' + dstr(v.due) : '') + '. Pay with DigitalSaudi:\n' + link; };
      var w = sheet('Invoice ' + v.no, '<div class="big bz-big"><div class="bz-row">' + badge(v) + '<span class="small">' + esc(v.no) + '</span></div><div class="v bz-amt">' + fpi(open ? balance(v) : v.total) + ' π</div><div class="c">' + esc(open ? 'Amount due' + (conv(balance(v)) ? ' · ' + conv(balance(v)) : '') : st === 'Paid' ? 'Paid' + (v.pts ? ' on ' + dstr(v.pts) : '') + (retAmt(v) ? ' · returned ' + fpi(retAmt(v)) + ' π' : '') : 'Cancelled') + '</div><div class="w">' + esc(v.cname || who(v.cto)) + (v.due ? ' · due ' + dstr(v.due) : '') + '</div></div>' +
        '<div class="bz-prev">Preparing invoice…</div>' +
        fileBtns(open ? '<div class="two"><button type="button" class="btn ghost" data-x="lk">' + ic('link') + 'Share pay link</button><button type="button" class="btn ghost" data-x="cp">' + ic('copy') + 'Copy link</button></div>' : '') +
        '<div class="day">Manage</div><div class="list">' +
        (open ? row('check', 'Mark as paid', 'For a payment made another way', 'x-paid') : st === 'Paid' && v.mpaid ? row('undo', 'Mark as unpaid', 'Undo the manual mark', 'x-unpaid') : '') +
        (open && !(v.paid > 0) ? row('edit', 'Edit invoice', 'Items, customer, due date', 'x-edit') : '') +
        (st === 'Paid' && !v.void && v.items.some(function (it) { return !it.tip; }) ? row('undo', 'Return items', retAmt(v) ? 'Returned so far ' + fpi(retAmt(v)) + ' π' : 'Restock and refund the customer', 'x-ret') : '') +
        row('copy', 'Duplicate', 'Create a new invoice from this one', 'x-dup') +
        (v.void ? row('trash', 'Delete invoice', 'Remove it from this phone', 'x-del') : open ? row('x', 'Cancel invoice', 'Keeps it in your records as cancelled', 'x-void') : '') + '</div>');
      fileActions(w, function () { return invCanvas(v); }, 'DigitalSaudi-' + v.no, 'invoice', 'DigitalSaudi invoice ' + v.no, txt);
      var lk = $('[data-x="lk"]', w); if (lk) lk.onclick = function () { K.shareText('Invoice ' + v.no, txt()); };
      var cp = $('[data-x="cp"]', w); if (cp) cp.onclick = function () { K.copy(link); };
    }

    /* ── products: catalog with prices and optional stock ── */
    function prods() { return get('prod', []); }
    function stockOut(id) {
      var L = invs(), v = L.filter(function (x) { return x.id === id; })[0]; if (!v || v.stk) return;
      var P = prods(), ch = false; (v.items || []).forEach(function (it) { if (!it.pid) return; P.forEach(function (q) { if (q.id === it.pid && typeof q.stock === 'number') { q.stock = Math.max(0, r7(q.stock - Number(it.q || 0))); ch = true; } }); });
      v.stk = true; saveInvs(L); if (ch) put('prod', P);
      P.forEach(function (q) { if (typeof q.stock === 'number' && q.low != null && q.stock <= q.low) K.addNote('tag', 'Low stock', q.n + ' · ' + fpi(q.stock) + ' left', 'low-' + q.id + '-' + q.stock); });
    }
    function prodSheet(q0) {
      var P = prods().slice().sort(function (a, b) { return a.n.localeCompare(b.n); });
      var w = sheet('Products', '<div class="qs-top"><div class="bz-search">' + ic('search') + '<input class="in" id="pr-q" placeholder="Search name or barcode" value="' + esc(q0 || '') + '"></div><button type="button" class="qs-scan" data-x="ps" aria-label="Scan a barcode">' + ic('bar') + '<span>Scan</span></button></div><div class="list" id="pr-l" style="margin-top:12px"></div>' +
        '<button type="button" class="btn" data-x="add">' + ic('plus') + 'Add product</button>');
      function draw() {
        var t = $('#pr-q', w).value.trim().toLowerCase(), L = P.filter(function (q) { return !t || (q.n + ' ' + (q.sku || '')).toLowerCase().indexOf(t) >= 0 || (q.sku && window.FPBar && FPBar.same(q.sku, t)); });
        $('#pr-l', w).innerHTML = L.length ? L.map(function (q) { var low = typeof q.stock === 'number' && q.low != null && q.stock <= q.low; return '<button type="button" class="li" data-pe="' + q.id + '"><span class="ico ' + (low ? 'rf' : '') + '">' + ic('tag') + '</span><span class="grow"><b>' + esc(q.n) + '</b><small>' + esc([q.unit ? 'per ' + q.unit : '', q.sku ? 'Code ' + q.sku : '', typeof q.stock === 'number' ? fpi(q.stock) + ' in stock' : ''].filter(Boolean).join(' · ') || 'No stock tracking') + '</small></span><span class="amt-r"><b class="num bz-amt">' + fpi(q.p) + ' π</b>' + (low ? '<small class="bz-due">Low stock</small>' : '') + '</span></button>'; }).join('')
          : '<div class="empty">' + ic('tag') + '<div>' + (P.length ? 'No match.' : 'No products yet.') + '</div></div>';
        $$('[data-pe]', w).forEach(function (b) { b.onclick = function () { prodEdit(b.dataset.pe); }; });
      }
      $('#pr-q', w).oninput = draw; draw(); $('[data-x="add"]', w).onclick = function () { prodEdit(''); };
      $('[data-x="ps"]', w).onclick = function () { barScan('Find a product', function (code) { var q = prods().filter(function (x) { return x.sku && window.FPBar && FPBar.same(x.sku, code); })[0]; return { stop: true, then: function () { if (q) prodEdit(q.id); else unknownCode(code, function () { prodSheet(); }); } }; }); };
    }
    function prodEdit(id, back, pre) {
      var q = prods().filter(function (x) { return x.id === id; })[0] || Object.assign({}, pre || {});
      var w = sheet(id ? 'Edit product' : 'New product', '<label class="l" for="pe-n">Product or service</label><input class="in" id="pe-n" maxlength="60" value="' + esc(q.n || '') + '" placeholder="e.g. Rice 50kg">' +
        '<div class="two bz-two"><div><label class="l" for="pe-p">Price</label><div class="amt sm"><input id="pe-p" type="number" inputmode="decimal" value="' + (q.p || '') + '" placeholder="0.00"><span>π</span></div></div><div><label class="l" for="pe-u">Unit (optional)</label><input class="in" id="pe-u" maxlength="16" value="' + esc(q.unit || '') + '" placeholder="e.g. bag, kg, hour"></div></div>' +
        '<div class="hint num" id="pe-c"></div>' +
        '<div class="two bz-two"><div><label class="l" for="pe-s">Stock (optional)</label><input class="in num" id="pe-s" type="number" inputmode="decimal" value="' + (typeof q.stock === 'number' ? q.stock : '') + '" placeholder="Not tracked"></div><div><label class="l" for="pe-lo">Low stock alert</label><input class="in num" id="pe-lo" type="number" inputmode="decimal" value="' + (q.low != null ? q.low : '') + '" placeholder="e.g. 5"></div></div>' +
        '<label class="l" for="pe-k">Barcode or SKU (optional)</label><div class="qs-top"><input class="in" id="pe-k" maxlength="40" value="' + esc(q.sku || '') + '" placeholder="Scan or type"><button type="button" class="qs-scan" data-x="pk" aria-label="Scan a barcode">' + ic('bar') + '<span>Scan</span></button></div>' +
        '<button type="button" class="btn" id="pe-go">' + ic('check') + 'Save product</button>' + (id ? '<button type="button" class="btn danger" id="pe-rm">' + ic('trash') + 'Delete product</button>' : ''), { stack: true });
      var pi = $('#pe-p', w); pi.oninput = function () { $('#pe-c', w).textContent = conv(r7(pi.value)); }; pi.oninput();
      $('[data-x="pk"]', w).onclick = function () { barScan('Scan barcode', function (code) { $('#pe-k', w).value = code; toast('Barcode added'); return { stop: true }; }); };
      $('#pe-go', w).onclick = function () {
        var n = $('#pe-n', w).value.trim(), pr = r7(pi.value), st = $('#pe-s', w).value.trim(), lo = $('#pe-lo', w).value.trim();
        if (!n) return toast('Enter the product name'); if (!(pr >= 0.01)) return toast('The price must be at least 0.01 π');
        if (st !== '' && !(Number(st) >= 0)) return toast('Stock cannot be negative'); if (lo !== '' && !(Number(lo) >= 0)) return toast('Low stock alert cannot be negative');
        var L = prods(); if (L.some(function (x) { return x.id !== id && x.n.toLowerCase() === n.toLowerCase(); })) return toast('A product with this name already exists');
        var sk = $('#pe-k', w).value.trim(); if (sk && L.some(function (x) { return x.id !== id && x.sku && window.FPBar && FPBar.same(x.sku, sk); })) return toast('Another product already uses this barcode');
        var d = { id: id || uid(), n: n, p: pr, unit: $('#pe-u', w).value.trim(), sku: $('#pe-k', w).value.trim(), stock: st === '' ? null : r7(st), low: lo === '' ? null : r7(lo), ts: q.ts || Date.now() };
        L = L.filter(function (x) { return x.id !== d.id; }); L.unshift(d); put('prod', L.slice(0, 500)); toast('Product saved'); if (back) back(); else prodSheet();
      };
      var rm = $('#pe-rm', w); if (rm) rm.onclick = function () { put('prod', prods().filter(function (x) { return x.id !== id; })); toast('Product deleted'); prodSheet(); };
    }

    /* ── quick sale: build the sale, show one QR, and it turns Paid by itself when the payment arrives ── */
    function saleSheet(c0, SX) {
      if (!SX && K.needTarget('Quick sale')) return;
      var cart = c0 || {}, P = (SX ? SX.prods : prods()).slice().sort(function (a, b) { return a.n.localeCompare(b.n); }), dm = 'pi', tp = 0;
      var w = sheet('Quick sale', (P.length ? '<div class="qs-top"><div class="bz-search">' + ic('search') + '<input class="in" id="qs-q" placeholder="Search products"></div><button type="button" class="qs-scan" data-x="scan" aria-label="Scan a barcode">' + ic('bar') + '<span>Scan</span></button></div><div class="qs-grid" id="qs-g"></div>' : SX ? '' : '<button type="button" class="btn soft" data-x="pa">' + ic('plus') + 'Add products</button>') +
        '<label class="l" for="qs-a">' + (P.length ? 'Other amount' : 'Amount') + '</label><div class="amt sm"><input id="qs-a" type="number" inputmode="decimal" placeholder="0.00"><span>π</span></div>' +
        '<label class="l" for="qs-x">Note (optional)</label><input class="in" id="qs-x" maxlength="40" placeholder="e.g. Table 4, delivery">' +
        (!SX && custs().length ? '<label class="l" for="qs-cu">Customer (optional)</label><select class="in" id="qs-cu"><option value="">Walk-in customer</option>' + custs().slice().sort(function (a, b) { return a.name.localeCompare(b.name); }).map(function (c) { return '<option value="' + esc(c.id) + '">' + esc(c.name) + '</option>'; }).join('') + '</select>' : '') +
        '<div class="qs-adj"><div><label class="l" for="qs-d">Discount</label><div class="qs-dw"><input class="in num" id="qs-d" type="number" inputmode="decimal" min="0" placeholder="0"><div class="seg qs-du" role="tablist"><button type="button" data-du="pi" class="on">π</button><button type="button" data-du="pc">%</button></div></div></div>' +
        '<div><label class="l">Tip</label><div class="chips qs-tip">' + [[0, 'None'], [5, '5%'], [10, '10%'], [15, '15%']].map(function (x) { return '<button type="button" class="chip' + (x[0] ? '' : ' on') + '" data-tp="' + x[0] + '">' + x[1] + '</button>'; }).join('') + '</div></div></div>' +
        '<div class="sum" id="qs-s"></div><button type="button" class="btn" id="qs-go">' + ic('qr') + 'Charge</button>');
      function draw() {
        var g = $('#qs-g', w); if (!g) return; var t = ($('#qs-q', w).value || '').trim().toLowerCase();
        g.innerHTML = P.filter(function (q) { return !t || q.n.toLowerCase().indexOf(t) >= 0; }).map(function (q) { var n = cart[q.id] || 0, out = typeof q.stock === 'number' && q.stock <= 0; return '<div class="qs-it' + (n ? ' on' : '') + (out ? ' out' : '') + '"><button type="button" class="qs-add" data-qa="' + q.id + '"><b>' + esc(q.n) + '</b><span class="num">' + fpi(q.p) + ' π</span>' + (out ? '<small>Out of stock</small>' : typeof q.stock === 'number' ? '<small>' + fpi(q.stock) + ' left</small>' : '') + '</button>' + (n ? '<div class="qs-n"><button type="button" data-qm="' + q.id + '" aria-label="Remove one">' + ic('minus') + '</button><b class="num">' + fpi(n) + '</b><button type="button" data-qa="' + q.id + '" aria-label="Add one">' + ic('plus') + '</button></div>' : '') + '</div>'; }).join('') || '<div class="empty">No match.</div>';
        $$('[data-qa]', w).forEach(function (b) { b.onclick = function () { var q = P.filter(function (x) { return x.id === b.dataset.qa; })[0], n = r7((cart[b.dataset.qa] || 0) + 1); if (q && typeof q.stock === 'number' && n > q.stock) return toast('Only ' + fpi(q.stock) + ' in stock'); cart[b.dataset.qa] = n; draw(); tot(); }; });
        $$('[data-qm]', w).forEach(function (b) { b.onclick = function () { cart[b.dataset.qm] = r7((cart[b.dataset.qm] || 0) - 1); if (cart[b.dataset.qm] <= 0) delete cart[b.dataset.qm]; draw(); tot(); }; });
      }
      function goods() { var L = []; Object.keys(cart).forEach(function (id) { var q = P.filter(function (x) { return x.id === id; })[0]; if (q) L.push({ d: q.n, q: cart[id], p: q.p, pid: q.id }); }); var a = r7($('#qs-a', w).value); if (a > 0) L.push({ d: $('#qs-x', w).value.trim() || 'Sale', q: 1, p: a }); return L; }
      // discount on the goods; tip on the amount after discount
      function adj() {
        var G = goods(), sub = calc({ items: G }).sub, dv = Math.max(0, Number($('#qs-d', w).value) || 0);
        var disc = r7(Math.min(sub, dm === 'pc' ? sub * Math.min(100, dv) / 100 : dv)), tip = tp ? r7((sub - disc) * tp / 100) : 0;
        var L = G.slice(); if (tip > 0) L.push({ d: 'Tip', q: 1, p: tip, tip: 1 });
        return { G: G, L: L, sub: sub, disc: disc, tip: tip, total: calc({ items: L, disc: disc }).total };
      }
      function tot() {
        var A = adj(), n = A.G.reduce(function (s0, it) { return s0 + Number(it.q); }, 0);
        $('#qs-s', w).innerHTML = '<div><span>Items</span><b>' + fpi(r7(n)) + '</b></div>' + (A.disc || A.tip ? '<div><span>Subtotal</span><b class="num">' + fpi(A.sub) + ' π</b></div>' : '') + (A.disc ? '<div><span>Discount</span><b class="num">−' + fpi(A.disc) + ' π</b></div>' : '') + (A.tip ? '<div><span>Tip ' + tp + '%</span><b class="num">+' + fpi(A.tip) + ' π</b></div>' : '') +
          '<div class="tot"><span>Total</span><b>' + fpi(A.total) + ' π</b></div>' + (conv(A.total) ? '<div><span></span><b class="small muted">' + esc(conv(A.total)) + '</b></div>' : ''); return A.total;
      }
      var qq = $('#qs-q', w); if (qq) qq.oninput = draw; $('#qs-a', w).oninput = tot; $('#qs-x', w).oninput = tot; $('#qs-d', w).oninput = tot; draw(); tot();
      $$('[data-du]', w).forEach(function (b) { b.onclick = function () { dm = b.dataset.du; $$('[data-du]', w).forEach(function (x) { x.classList.toggle('on', x === b); }); tot(); }; });
      $$('[data-tp]', w).forEach(function (b) { b.onclick = function () { tp = Number(b.dataset.tp) || 0; $$('[data-tp]', w).forEach(function (x) { x.classList.toggle('on', x === b); }); tot(); }; });
      var pa = $('[data-x="pa"]', w); if (pa) pa.onclick = function () { prodEdit('', function () { saleSheet(cart); }); };
      var sc = $('[data-x="scan"]', w); if (sc) sc.onclick = function () {
        barScan('Scan products', function (code) {
          var q = P.filter(function (x) { return x.sku && window.FPBar && FPBar.same(x.sku, code); })[0];
          if (!q && SX) { toast('This code is not in the product list'); return { msg: 'Not in the product list · ' + code }; }
          if (!q) return { stop: true, then: function () { unknownCode(code, function () { saleSheet(cart); }); } };
          var n = r7((cart[q.id] || 0) + 1); if (typeof q.stock === 'number' && n > q.stock) { toast('Only ' + fpi(q.stock) + ' ' + q.n + ' in stock'); return { msg: 'Out of stock · ' + q.n }; }
          cart[q.id] = n; draw(); tot(); return { msg: q.n + ' · ' + fpi(n) + ' in this sale' };
        }, true);
      };
      $('#qs-go', w).onclick = function () {
        var A = adj(), L = A.L, t = A.total; if (!A.G.length || !(t >= 0.01)) return toast('Add a product or enter an amount');
        if (Number($('#qs-d', w).value) < 0) return toast('Discount cannot be negative');
        if (L.length > 12) return toast('Up to 12 different items per sale');
        var note = $('#qs-x', w).value.trim();
        if (SX) return SX.charge(A, note);
        var cu = $('#qs-cu', w) && $('#qs-cu', w).value ? custs().filter(function (c) { return c.id === $('#qs-cu', w).value; })[0] : null;
        var v = issue({ to: K.myTarget(), cname: cu ? cu.name : note ? 'Sale · ' + note : 'Walk-in customer', cto: cu ? cu.to || '' : '', cid: cu ? cu.id : '', cphone: cu ? cu.phone || '' : '', items: L, disc: A.disc, notes: cu && note ? note : '', term: 0, title: A.G.length === 1 ? A.G[0].d : 'Sale' }, '');
        var all = invs(); all.forEach(function (x) { if (x.id === v.id) x.sale = true; }); saveInvs(all); K.rerender(); saleView(v.id);
      };
    }
    function saleView(id) {
      var v = invs().filter(function (x) { return x.id === id; })[0]; if (!v) return;
      var link = invLink(v), tm = null, sy = null;
      function stopT() { clearInterval(tm); clearInterval(sy); }
      var w = sheet('Charge ' + v.no, '<div class="qs-pay"><div class="qs-amt num bz-amt">' + fpi(v.total) + ' π</div><div class="small muted">' + esc(conv(v.total)) + '</div>' +
        '<div class="qr qs-qr">' + (window.FPQR ? FPQR.svg(link, 250, '#084427') : '') + '</div><div class="qs-st" id="qs-st"><span class="qs-dot"></span>Waiting for payment · ' + esc(v.no) + '</div>' +
        '<p class="small muted" style="margin-top:6px">Scan with DigitalSaudi to pay ' + esc(bizName()) + '</p></div>' +
        '<div class="two"><button type="button" class="btn ghost" data-x="lk">' + ic('share') + 'Share link</button><button type="button" class="btn ghost" data-x="inv">' + ic('inv') + 'Invoice</button></div>' +
        '<button type="button" class="btn soft" data-x="new">' + ic('plus') + 'New sale</button>', { onClose: stopT });
      function done() {
        stopT(); var st = $('#qs-st', w); if (!st) return;
        st.className = 'qs-st ok'; st.innerHTML = ic('check') + 'Paid · ' + esc(v.no); var hp = $('.qs-pay p', w); if (hp) hp.textContent = 'Payment received by ' + bizName(); var q = $('.qs-qr', w); if (q) q.classList.add('paid');
      }
      tm = setInterval(function () { if (!document.body.contains(w)) return stopT(); var x = invs().filter(function (q) { return q.id === id; })[0]; if (x && status(x) === 'Paid') done(); }, 1000);
      sy = setInterval(function () { if (!document.hidden && F.sync) F.sync(); }, 5000);
      $('[data-x="lk"]', w).onclick = function () { K.shareText('Payment request ' + v.no, bizName() + ' · ' + fpi(v.total) + ' π · ' + v.no + '\nPay with DigitalSaudi:\n' + link); };
      $('[data-x="inv"]', w).onclick = function () { stopT(); invView(id); };
      $('[data-x="new"]', w).onclick = function () { stopT(); saleSheet(); };
    }

    /* ── barcode scanner: phone's built-in reader when it supports product codes, otherwise DigitalSaudi's reader ── */
    var BDB = null, bdbP = null;
    function bdbReady() {
      if (bdbP) return bdbP;
      bdbP = Promise.resolve().then(function () { if (!('BarcodeDetector' in window)) return null; return BarcodeDetector.getSupportedFormats().then(function (f) { var want = ['ean_13', 'ean_8', 'upc_a', 'upc_e', 'code_128'].filter(function (x) { return f.indexOf(x) >= 0; }); if (want.indexOf('ean_13') >= 0) BDB = new BarcodeDetector({ formats: want }); return BDB; }); }).catch(function () { return null; });
      return bdbP;
    }
    // onCode(code) → { stop: true, then: fn } closes the scanner; { msg } shows a line and keeps scanning
    function barScan(title, onCode, multi) {
      var stream = null, raf = 0, done = false, busy = false, last = 0, prev = '', prevN = 0, lastHit = '', lastT = 0, then = null;
      var w = sheet(title, K.scanBox('bs-box').replace('class="scan"', 'class="scan bar"') + '<div class="bs-msg" id="bs-msg">' + (multi ? 'Scan each item. Tap Done when finished.' : 'Hold the barcode inside the frame.') + '</div>' +
        '<label class="l" for="bs-k">Or type the code</label><div class="qs-top"><input class="in num" id="bs-k" maxlength="40" inputmode="text" placeholder="e.g. 5901234123457"><button type="button" class="btn soft bs-ok" data-x="ok">' + ic('check') + 'Use</button></div>' +
        (multi ? '<button type="button" class="btn" data-x="done">' + ic('check') + 'Done</button>' : ''), { stack: true, onClose: stop });
      var box = $('#bs-box', w), v = $('video', box), msg = $('.scan-m', box), tb = $('.scan-t', box);
      var cv = document.createElement('canvas'), cx = cv.getContext('2d', { willReadFrequently: true });
      function stop() { done = true; cancelAnimationFrame(raf); if (stream) stream.getTracks().forEach(function (t) { t.stop(); }); }
      function close() { stop(); w.remove(); if (then) then(); }
      function hit(code) {
        code = String(code || '').trim(); if (!code || done) return;
        // the same code counts again only after it has left the camera for a moment
        var now = Date.now(); if (code === lastHit && now - lastT < 1200) { lastT = now; return; } lastHit = code; lastT = now;
        K.scanOk(); box.classList.add('ok'); setTimeout(function () { box.classList.remove('ok'); }, 450);
        var r = onCode(code) || {}; if (r.msg) $('#bs-msg', w).textContent = r.msg;
        if (r.stop) { then = r.then || null; setTimeout(close, 250); }
      }
      $('[data-x="ok"]', w).onclick = function () { var c = $('#bs-k', w).value.trim(); if (!c) return toast('Enter the code'); lastHit = ''; hit(c); $('#bs-k', w).value = ''; };
      var dn = $('[data-x="done"]', w); if (dn) dn.onclick = close;
      function frame() {
        var W = v.videoWidth, H = v.videoHeight; if (!W) return '';
        var k = Math.min(1, 1280 / W); cv.width = Math.round(W * k); cv.height = Math.round(H * k); cx.drawImage(v, 0, 0, cv.width, cv.height);
        try { return FPBar.decode(cx.getImageData(0, 0, cv.width, cv.height), false); } catch (e) { return ''; }
      }
      // DigitalSaudi's reader accepts a code only when two readings in a row agree
      function agree(c) { if (!c) { prevN = 0; return; } if (c === prev) prevN++; else { prev = c; prevN = 1; } if (prevN >= 2) { prevN = 0; hit(c); } }
      bdbReady().then(function () {
        if (done) return;
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) { msg.textContent = 'Camera is not available here. Type the code instead.'; return; }
        return navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: 'environment' }, width: { ideal: 1920 }, height: { ideal: 1080 } }, audio: false }).then(function (st) {
          if (done) { st.getTracks().forEach(function (t) { t.stop(); }); return; }
          stream = st; var track = st.getVideoTracks()[0]; v.srcObject = st; v.play().catch(function () {});
          try { var cap = track.getCapabilities ? track.getCapabilities() : {}; if (cap.focusMode && cap.focusMode.indexOf('continuous') >= 0) track.applyConstraints({ advanced: [{ focusMode: 'continuous' }] }).catch(function () {}); if (cap.torch && tb) { tb.hidden = false; var on = false; tb.onclick = function () { on = !on; track.applyConstraints({ advanced: [{ torch: on }] }).catch(function () {}); tb.classList.toggle('on', on); }; } } catch (e) {}
          box.classList.add('scanning'); msg.textContent = 'Point the camera at the barcode';
          (function tick(ts) {
            if (done) return; raf = requestAnimationFrame(tick);
            if (!document.body.contains(w)) return stop();
            if (busy || ts - last < 140 || v.readyState < 2) return; last = ts;
            if (BDB) { busy = true; BDB.detect(v).then(function (c) { busy = false; if (c && c[0] && c[0].rawValue) hit(c[0].rawValue); }).catch(function () { busy = false; BDB = null; }); }
            else if (window.FPBar) agree(frame());
          })(0);
        });
      }).catch(function (e) { msg.textContent = e && e.name === 'NotAllowedError' ? 'Allow camera access, or type the code.' : 'The camera could not start. Type the code instead.'; });
      return w;
    }
    function unknownCode(code, back) {
      var w = sheet('New barcode', '<div class="card bz-card"><div class="row"><span class="muted">Code</span><b class="num">' + esc(code) + '</b></div></div><p class="small muted" style="margin:10px 2px">No product uses this code yet.</p>' +
        '<button type="button" class="btn" data-x="add">' + ic('plus') + 'Add as new product</button><button type="button" class="btn ghost" data-x="back">' + ic('undo') + 'Back</button>', { stack: true });
      $('[data-x="add"]', w).onclick = function () { w.remove(); prodEdit('', back, { sku: code }); };
      $('[data-x="back"]', w).onclick = function () { w.remove(); if (back) back(); };
    }

    /* ── expenses and profit ── */
    var ECAT = ['Stock', 'Rent', 'Salaries', 'Transport', 'Utilities', 'Marketing', 'Fees', 'Other'];
    function exps() { return get('exp', []); }
    function expIn(a, b) { return exps().filter(function (e) { return e.ts >= a && e.ts < b; }); }
    function esum(L) { return r7(L.reduce(function (s0, e) { return s0 + Number(e.a || 0); }, 0)); }
    function salesIn(a, b) { return sales().filter(function (r) { return r.ts >= a && r.ts < b; }); }
    function expSheet(p) {
      p = p || get('exP', 'month'); put('exP', p);
      var rg = range(p), L = expIn(rg[0], rg[1]).sort(function (a, b) { return b.ts - a.ts; }), et = esum(L), st = sum(salesIn(rg[0], rg[1])), pr = r7(st - retIn(rg[0], rg[1]) - et);
      var bc = {}; L.forEach(function (e) { bc[e.cat] = r7((bc[e.cat] || 0) + Number(e.a)); });
      var C = Object.keys(bc).map(function (k) { return [k, bc[k]]; }).sort(function (a, b) { return b[1] - a[1]; }), top = C.length ? C[0][1] : 0;
      var w = sheet('Expenses', '<div class="seg bz-seg" role="tablist">' + [['today', 'Today'], ['7d', '7 days'], ['30d', '30 days'], ['month', 'Month']].map(function (x) { return '<button type="button" data-ep="' + x[0] + '" class="' + (p === x[0] ? 'on' : '') + '">' + x[1] + '</button>'; }).join('') + '</div>' +
        '<div class="bz-kpi"><div class="bz-k1"><small>Profit · ' + esc(rg[2]) + '</small><b class="num bz-amt">' + (pr < 0 ? '−' : '') + fpi(Math.abs(pr)) + ' π</b><span class="bz-amt">' + esc(conv(Math.abs(pr)) || ' ') + '</span></div>' +
        '<div><small>Sales</small><b class="num bz-amt">' + fpi(st) + ' π</b></div><div class="' + (et > st && et ? 'bad' : '') + '"><small>Expenses</small><b class="num bz-amt">' + fpi(et) + ' π</b></div><div><small>Entries</small><b class="num">' + L.length + '</b></div></div>' +
        (C.length ? '<div class="day">By category</div><div class="card bz-card">' + C.map(function (x) { return '<div class="cat"><div class="row"><span>' + esc(x[0]) + '</span><b class="num bz-amt">' + fpi(x[1]) + ' π</b></div><div class="bar"><i style="width:' + Math.max(4, x[1] / top * 100) + '%"></i></div></div>'; }).join('') + '</div>' : '') +
        '<div class="day">Entries</div><div class="list">' + (L.length ? L.slice(0, 80).map(function (e) { return '<button type="button" class="li" data-ee="' + e.id + '"><span class="ico rf">' + ic('exp') + '</span><span class="grow"><b>' + esc(e.cat) + (e.note ? ' · ' + esc(e.note) : '') + '</b><small>' + dstr(e.ts) + (e.lv ? ' · ' + esc(K.money(e.lv, e.lc, 2)) : '') + '</small></span><span class="amt-r"><b class="num bz-amt">−' + fpi(e.a) + ' π</b></span></button>'; }).join('') : '<div class="empty">' + ic('exp') + '<div>No expenses in this period. Record what the business spends to see its profit.</div></div>') + '</div>' +
        '<button type="button" class="btn" data-x="add">' + ic('plus') + 'Add expense</button>');
      $$('[data-ep]', w).forEach(function (b) { b.onclick = function () { expSheet(b.dataset.ep); }; });
      $$('[data-ee]', w).forEach(function (b) { b.onclick = function () { expEdit(b.dataset.ee); }; });
      $('[data-x="add"]', w).onclick = function () { expEdit(''); };
    }
    function expEdit(id) {
      var e = exps().filter(function (x) { return x.id === id; })[0] || { cat: 'Stock', ts: Date.now() }, c = K.curr(), mode = e.lv && e.lc === c ? 'loc' : 'pi', cat = e.cat;
      var w = sheet(id ? 'Edit expense' : 'New expense', '<label class="l" for="ex-a">Amount</label><div class="qs-top"><div class="amt sm" style="flex:1"><input id="ex-a" type="number" inputmode="decimal" placeholder="0.00" value="' + (mode === 'loc' ? e.lv : (e.a || '')) + '"><span id="ex-u">' + (mode === 'loc' ? esc(c) : 'π') + '</span></div>' +
        (c !== 'PI' && K.rateIn(c) ? '<div class="seg qs-du" role="tablist"><button type="button" data-em="pi" class="' + (mode === 'pi' ? 'on' : '') + '">π</button><button type="button" data-em="loc" class="' + (mode === 'loc' ? 'on' : '') + '">' + esc(c) + '</button></div>' : '') + '</div><div class="hint num" id="ex-c"></div>' +
        '<label class="l">Category</label><div class="chips" id="ex-cat">' + ECAT.map(function (k) { return '<button type="button" class="chip' + (k === cat ? ' on' : '') + '" data-ec="' + k + '">' + k + '</button>'; }).join('') + '</div>' +
        '<label class="l" for="ex-n">Note (optional)</label><input class="in" id="ex-n" maxlength="60" value="' + esc(e.note || '') + '" placeholder="e.g. 10 bags of rice">' +
        '<label class="l" for="ex-d">Date</label><input class="in" id="ex-d" type="date" max="' + iso(Date.now()) + '" value="' + iso(e.ts) + '">' +
        '<button type="button" class="btn" id="ex-go">' + ic('check') + 'Save expense</button>' + (id ? '<button type="button" class="btn danger" id="ex-rm">' + ic('trash') + 'Delete expense</button>' : ''), { stack: true });
      var ai = $('#ex-a', w);
      function piVal() { var v = Number(ai.value) || 0, r = K.rateIn(c); return mode === 'loc' ? (r ? Math.round(v / r * 100) / 100 : 0) : r7(v); }
      function hint() { var v = Number(ai.value) || 0; $('#ex-c', w).textContent = mode === 'loc' ? (v > 0 ? '= ' + fpi(piVal()) + ' π at today’s rate' : '') : conv(r7(v)); }
      ai.oninput = hint; hint();
      $$('[data-em]', w).forEach(function (b) { b.onclick = function () { var pv = piVal(); mode = b.dataset.em; $$('[data-em]', w).forEach(function (x) { x.classList.toggle('on', x === b); }); $('#ex-u', w).textContent = mode === 'loc' ? c : 'π'; if (pv > 0) ai.value = mode === 'loc' ? Math.round(pv * K.rateIn(c) * 100) / 100 : pv; hint(); }; });
      $$('[data-ec]', w).forEach(function (b) { b.onclick = function () { cat = b.dataset.ec; $$('[data-ec]', w).forEach(function (x) { x.classList.toggle('on', x === b); }); }; });
      $('#ex-go', w).onclick = function () {
        var a = piVal(), dv = $('#ex-d', w).value, t = dv ? new Date(dv + 'T12:00:00').getTime() : Date.now();
        if (!(a >= 0.01)) return toast(mode === 'loc' && !K.rateIn(c) ? 'Rate unavailable right now. Enter the amount in π.' : 'Enter an amount of at least 0.01 π');
        if (a > 1e9) return toast('Check the amount');
        if (!(t > 0) || day0(t) > day0()) return toast('The date cannot be in the future');
        if (day0(t) === day0()) t = e.ts && day0(e.ts) === day0() ? e.ts : Date.now();
        var d = { id: id || uid(), a: a, cat: cat, note: $('#ex-n', w).value.trim(), ts: t };
        if (mode === 'loc') { d.lv = Number(ai.value); d.lc = c; }
        put('exp', [d].concat(exps().filter(function (x) { return x.id !== d.id; })).sort(function (x, y) { return y.ts - x.ts; }).slice(0, 2000));
        toast('Expense saved'); K.rerender(); expSheet();
      };
      var rm = $('#ex-rm', w); if (rm) rm.onclick = function () { put('exp', exps().filter(function (x) { return x.id !== id; })); toast('Expense deleted'); K.rerender(); expSheet(); };
    }

    /* ── end-of-day summary ── */
    function dayData(t) {
      var a = day0(t), b = a + 864e5, S = salesIn(a, b), E = expIn(a, b), st = sum(S), et = esum(E), V = invs();
      var paid = V.filter(function (v) { return !v.void && status(v) === 'Paid' && (v.pts || v.ts) >= a && (v.pts || v.ts) < b; }), issued = V.filter(function (v) { return !v.void && v.ts >= a && v.ts < b; });
      var items = {}; paid.forEach(function (v) { v.items.forEach(function (it) { if (it.tip) return; var k = it.d.trim(); items[k] = items[k] || [0, 0]; items[k][0] += r7(it.q * it.p); items[k][1] += Number(it.q); }); });
      var TI = Object.keys(items).map(function (k) { return [k, r7(items[k][0]), items[k][1]]; }).sort(function (x, y) { return y[1] - x[1]; }).slice(0, 5);
      var n = TI.reduce(function (s0, x) { return s0 + x[2]; }, 0), tips = r7(paid.reduce(function (s0, v) { return s0 + v.items.filter(function (it) { return it.tip; }).reduce(function (q, it) { return q + it.p; }, 0); }, 0));
      var rt = retIn(a, b);
      return { a: a, S: S, E: E, st: st, et: et, rt: rt, pr: r7(st - rt - et), paid: paid, issued: issued, TI: TI, n: n, tips: tips, avg: S.length ? Math.round(st / S.length * 100) / 100 : 0 };
    }
    function dayName(t) { return new Date(t).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }); }
    function dayCanvas(t) {
      var D = dayData(t), b = biz(), FR = window.FPReceipt || {};
      return loadImg(b.logo || 'icon-512.png').then(function (logo) {
        var W = 1080, H = 1350, X = 70, cv = document.createElement('canvas'); cv.width = W; cv.height = H; var x = cv.getContext('2d');
        x.fillStyle = '#fff'; x.fillRect(0, 0, W, H); if (FR.guilloche) FR.guilloche(x, 0, 300, W, H - 300, '#21BC71', .03);
        var g = x.createLinearGradient(0, 0, W, 300); g.addColorStop(0, '#084427'); g.addColorStop(.6, '#1AC271'); g.addColorStop(1, '#9B7213'); x.fillStyle = g; x.fillRect(0, 0, W, 280);
        if (FR.guilloche) FR.guilloche(x, 0, 0, W, 280, '#FFFFFF', .1);
        if (logo) { x.save(); rr(x, X, 60, 96, 96, 22); x.clip(); x.fillStyle = '#fff'; x.fillRect(X, 60, 96, 96); x.drawImage(logo, X, 60, 96, 96); x.restore(); }
        x.font = '700 38px ' + FONT; T(x, fit(x, bizName(), W - X * 2 - 130), X + 122, 104, '700 38px ' + FONT, '#fff');
        T(x, 'END-OF-DAY SUMMARY', X + 122, 142, '700 20px ' + FONT, '#F1D89E');
        T(x, dayName(D.a), X, 228, '700 30px ' + FONT, '#fff');
        var y = 320, cw = (W - 2 * X - 20) / 2;
        [['SALES', fpi(D.st) + ' π', D.S.length + ' payment' + (D.S.length === 1 ? '' : 's')], ['EXPENSES', fpi(D.et) + ' π', D.E.length + ' entr' + (D.E.length === 1 ? 'y' : 'ies') + (D.rt ? ' · returns ' + fpi(D.rt) + ' π' : '')], ['PROFIT', (D.pr < 0 ? '−' : '') + fpi(Math.abs(D.pr)) + ' π', conv(Math.abs(D.pr))], ['AVERAGE SALE', fpi(D.avg) + ' π', D.tips ? 'Tips ' + fpi(D.tips) + ' π' : '']].forEach(function (k, i) {
          var cx = X + (i % 2) * (cw + 20), cy = y + Math.floor(i / 2) * 170; x.fillStyle = i === 2 ? (D.pr < 0 ? '#FDECEC' : '#EAFBF6') : '#F5FBF8'; rr(x, cx, cy, cw, 150, 20); x.fill();
          T(x, k[0], cx + 24, cy + 42, '700 18px ' + FONT, '#64748B'); x.font = '800 40px ' + MONO; T(x, fit(x, k[1], cw - 48), cx + 24, cy + 94, '800 40px ' + MONO, i === 2 ? (D.pr < 0 ? '#B42318' : '#047857') : '#0B2C1C');
          if (k[2]) { x.font = '500 18px ' + FONT; T(x, fit(x, k[2], cw - 48), cx + 24, cy + 128, '500 18px ' + FONT, '#64748B'); }
        });
        y = 680; T(x, 'TOP ITEMS', X, y, '700 20px ' + FONT, '#64748B');
        if (!D.TI.length) T(x, 'No paid items on this day', X, y + 56, '500 22px ' + FONT, '#94A3B8');
        D.TI.forEach(function (rw, i) { var yy = y + 56 + i * 56; x.font = '600 24px ' + FONT; T(x, fit(x, rw[0], 560), X, yy, '600 24px ' + FONT, '#0B2C1C'); T(x, '× ' + fpi(rw[2]), W - X - 240, yy, '500 22px ' + MONO, '#2F4B3E', 'right'); T(x, fpi(rw[1]) + ' π', W - X, yy, '700 22px ' + MONO, '#0E6038', 'right'); x.fillStyle = '#EEF7F3'; x.fillRect(X, yy + 20, W - 2 * X, 2); });
        y = 1020; x.fillStyle = '#F5FBF8'; rr(x, X, y, W - 2 * X, 120, 20); x.fill();
        [['Invoices paid', D.paid.length], ['Invoices issued', D.issued.length], ['Items sold', fpi(r7(D.n))]].forEach(function (k, i) { var cx = X + 30 + i * ((W - 2 * X - 60) / 3); T(x, k[0], cx, y + 46, '600 19px ' + FONT, '#64748B'); T(x, String(k[1]), cx, y + 92, '800 32px ' + MONO, '#0B2C1C'); });
        x.fillStyle = '#E3EFE9'; x.fillRect(X, H - 130, W - 2 * X, 2);
        
        T(x, 'Created with DigitalSaudi · ' + K.NETN, X, H - 58, '500 19px ' + FONT, '#94A3B8');
        if (FR.microline) FR.microline(x, 'DIGITALSAUDI•END-OF-DAY SUMMARY•' + bizName().toUpperCase() + '•' + iso(D.a) + '•', X, H - 26, W - 2 * X);
        return cv;
      });
    }
    function daySheet(t) {
      t = day0(t || Date.now()); var D = dayData(t), today = t === day0();
      var w = sheet('Day summary', '<div class="bz-dnav"><button type="button" class="tbtn" data-dn="-1" aria-label="Previous day">' + ic('chev') + '</button><b>' + esc(today ? 'Today · ' + dstr(t) : dayName(t)) + '</b><button type="button" class="tbtn" data-dn="1" aria-label="Next day"' + (today ? ' disabled' : '') + '>' + ic('chev') + '</button></div>' +
        '<div class="bz-kpi"><div class="bz-k1"><small>Sales</small><b class="num bz-amt">' + fpi(D.st) + ' π</b><span class="bz-amt">' + D.S.length + ' payment' + (D.S.length === 1 ? '' : 's') + (conv(D.st) ? ' · ' + esc(conv(D.st)) : '') + '</span></div>' +
        '<div><small>Expenses' + (D.rt ? ' · returns' : '') + '</small><b class="num bz-amt">' + fpi(r7(D.et + D.rt)) + ' π</b></div><div class="' + (D.pr < 0 ? 'bad' : '') + '"><small>Profit</small><b class="num bz-amt">' + (D.pr < 0 ? '−' : '') + fpi(Math.abs(D.pr)) + ' π</b></div><div><small>Invoices paid</small><b class="num">' + D.paid.length + '</b></div></div>' +
        '<div class="day">Top items</div>' + (D.TI.length ? '<div class="card bz-card">' + D.TI.map(function (x) { return '<div class="cat"><div class="row"><span>' + esc(x[0]) + ' <small class="muted">× ' + fpi(x[2]) + '</small></span><b class="num bz-amt">' + fpi(x[1]) + ' π</b></div></div>'; }).join('') + '</div>' : '<div class="list"><div class="empty">No paid items on this day.</div></div>') +
        '<div class="bz-prev">Preparing summary…</div>' + fileBtns(''));
      $$('[data-dn]', w).forEach(function (b) { b.onclick = function () { var n = t + Number(b.dataset.dn) * 864e5 + 3600e3; if (day0(n) <= day0()) daySheet(n); }; });
      fileActions(w, function () { return dayCanvas(t); }, 'DigitalSaudi-day-summary-' + iso(t), 'day summary', 'DigitalSaudi day summary ' + dstr(t), function () { return bizName() + ' · day summary · ' + dstr(t); });
    }
    // after 8 pm, one notification with the day's figures
    function eodCheck() {
      var now = new Date(); if (now.getHours() < 20) return; var key = iso(now); if (get('eodN', '') === key) return;
      var D = dayData(Date.now()); if (!D.S.length && !D.E.length) return;
      put('eodN', key); K.addNote('bars', 'Today’s summary', 'Sales ' + fpi(D.st) + ' π · Expenses ' + fpi(D.et) + ' π · Profit ' + (D.pr < 0 ? '−' : '') + fpi(Math.abs(D.pr)) + ' π', 'eod-' + key);
    }

    /* ── returns: items given back after payment; stock goes back and the refund can be sent in one tap ── */
    function retAmt(v) { return r7((v.rets || []).reduce(function (s0, x) { return s0 + Number(x.a || 0); }, 0)); }
    function retIn(a, b) { var t = 0; invs().forEach(function (v) { (v.rets || []).forEach(function (x) { if (x.ts >= a && x.ts < b) t += Number(x.a || 0); }); }); return r7(t); }
    function retQ(v, i) { return (v.rets || []).reduce(function (s0, x) { return s0 + (x.items || []).filter(function (it) { return it.i === i; }).reduce(function (q, it) { return q + Number(it.q); }, 0); }, 0); }
    function payerOf(v) { var keys = v.pays || []; var r = K.rcpts().filter(function (x) { return keys.indexOf(rkey(x)) >= 0; })[0]; return r ? payer(r) : (v.cto || ''); }
    function retSheet(id) {
      var v = invs().filter(function (x) { return x.id === id; })[0]; if (!v) return;
      var c = calc(v), share = c.sub > 0 ? (c.sub - c.disc) / c.sub * (1 + (Number(v.tax) || 0) / 100) : 1, sel = {};
      var L = v.items.map(function (it, i) { return { i: i, it: it, max: r7(Number(it.q) - retQ(v, i)) }; }).filter(function (x) { return !x.it.tip && x.max > 0; });
      if (!L.length) return toast('All items on ' + v.no + ' were already returned');
      var w = sheet('Return items · ' + v.no, '<div class="list" id="rt-l">' + L.map(function (x) { return '<div class="li"><span class="grow"><b>' + esc(x.it.d) + '</b><small>' + fpi(x.it.p) + ' π each · up to ' + fpi(x.max) + '</small></span><div class="qs-n rt-n"><button type="button" data-rm="' + x.i + '" aria-label="One less">' + ic('minus') + '</button><b class="num" id="rt-q' + x.i + '">0</b><button type="button" data-ra="' + x.i + '" aria-label="One more">' + ic('plus') + '</button></div></div>'; }).join('') + '</div>' +
        '<label class="tg rt-tg"><input type="checkbox" id="rt-s" checked><span>Put returned items back in stock</span></label>' +
        '<div class="sum" id="rt-sum"></div><button type="button" class="btn" id="rt-go">' + ic('undo') + 'Record return</button>', { stack: true });
      function amt() { var t = 0; L.forEach(function (x) { t += (sel[x.i] || 0) * Number(x.it.p); }); return r7(Math.min(r7(t * share), r7(v.total - retAmt(v)))); }
      function draw() { L.forEach(function (x) { $('#rt-q' + x.i, w).textContent = fpi(sel[x.i] || 0); }); var a = amt(); $('#rt-sum', w).innerHTML = '<div class="tot"><span>Refund</span><b>' + fpi(a) + ' π</b></div>' + (conv(a) ? '<div><span></span><b class="small muted">' + esc(conv(a)) + '</b></div>' : ''); }
      $$('[data-ra]', w).forEach(function (b) { b.onclick = function () { var x = L.filter(function (y) { return y.i === Number(b.dataset.ra); })[0]; var n = r7((sel[x.i] || 0) + 1); if (n > x.max) return toast('Only ' + fpi(x.max) + ' can be returned'); sel[x.i] = n; draw(); }; });
      $$('[data-rm]', w).forEach(function (b) { b.onclick = function () { var i = Number(b.dataset.rm); sel[i] = Math.max(0, r7((sel[i] || 0) - 1)); draw(); }; });
      draw();
      $('#rt-go', w).onclick = function () {
        var a = amt(), items = Object.keys(sel).filter(function (k) { return sel[k] > 0; }).map(function (k) { return { i: Number(k), q: sel[k] }; });
        if (!items.length) return toast('Choose the items being returned');
        var restock = $('#rt-s', w).checked, P = prods(), ch = false;
        saveInvs(invs().map(function (x) { if (x.id === id) { x.rets = (x.rets || []).concat([{ ts: Date.now(), items: items, a: a }]); } return x; }));
        if (restock) items.forEach(function (it) { var pid = v.items[it.i].pid; P.forEach(function (q) { if (q.id === pid && typeof q.stock === 'number') { q.stock = r7(q.stock + it.q); ch = true; } }); });
        if (ch) put('prod', P);
        fx('in'); K.rerender(); w.remove(); invView(id);
        var to = payerOf(v);
        var w2 = sheet('Return recorded', '<div class="big bz-big"><div class="v bz-amt">' + fpi(a) + ' π</div><div class="c">Refund for ' + esc(v.no) + '</div>' + (to ? '<div class="w">' + esc(K.isG(to) ? K.short(to) : '@' + to) + '</div>' : '') + '</div>' +
          (to && a >= 0.01 ? '<button type="button" class="btn" data-x="pay">' + ic('send') + 'Send refund now</button>' : '') + '<button type="button" class="btn ghost" data-x="ok">' + ic('check') + 'Done</button>', { stack: true });
        var pb = $('[data-x="pay"]', w2); if (pb) pb.onclick = function () { w2.remove(); F.sendSheet({ u: to, a: a, x: ('Refund · ' + v.no).slice(0, 40) }); };
        $('[data-x="ok"]', w2).onclick = function () { w2.remove(); };
      };
    }

    /* ── tax summary: tax collected on paid invoices and sales, by rate ── */
    function taxSheet(per) {
      per = per || 'month'; var r = perRg(per), rows = {}, T = { base: 0, tax: 0, n: 0 };
      invs().forEach(function (v) { var t = v.pts || v.ts; if (v.void || status(v) !== 'Paid' || t < r[0] || t >= r[1]) return; var c = calc(v), rate = Number(v.tax) || 0, k = String(rate); rows[k] = rows[k] || { rate: rate, base: 0, tax: 0, n: 0 }; rows[k].base = r7(rows[k].base + c.sub - c.disc); rows[k].tax = r7(rows[k].tax + c.tax); rows[k].n++; T.base = r7(T.base + c.sub - c.disc); T.tax = r7(T.tax + c.tax); T.n++; });
      var R = Object.keys(rows).map(function (k) { return rows[k]; }).sort(function (a, b) { return b.rate - a.rate; });
      var w = sheet('Tax summary', '<div class="chips">' + Object.keys(PLAB).map(function (k) { return '<button type="button" class="chip' + (k === per ? ' on' : '') + '" data-tx="' + k + '">' + PLAB[k] + '</button>'; }).join('') + '</div>' +
        '<div class="bz-kpi" style="margin-top:12px"><div class="bz-k1"><small>Tax collected · ' + esc(perName(per)) + '</small><b class="num bz-amt">' + fpi(T.tax) + ' π</b><span class="bz-amt">' + esc(conv(T.tax) || ' ') + '</span></div>' +
        '<div><small>Taxable sales</small><b class="num bz-amt">' + fpi(T.base) + ' π</b></div><div><small>Paid invoices</small><b class="num">' + T.n + '</b></div><div><small>Rates</small><b class="num">' + R.filter(function (x) { return x.rate > 0; }).length + '</b></div></div>' +
        '<div class="day">By rate</div><div class="list">' + (R.length ? R.map(function (x) { return '<div class="li"><span class="ico">' + ic('pct') + '</span><span class="grow"><b>' + (x.rate ? fpi(x.rate) + '% tax' : 'No tax') + '</b><small>' + x.n + ' invoice' + (x.n === 1 ? '' : 's') + ' · taxable ' + fpi(x.base) + ' π</small></span><span class="amt-r"><b class="num bz-amt">' + fpi(x.tax) + ' π</b></span></div>'; }).join('') : '<div class="empty">' + ic('pct') + '<div>No paid invoices in this period.</div></div>') + '</div>' +
        '<button type="button" class="btn" data-x="csv">' + ic('down') + 'Tax summary (CSV)</button>');
      $$('[data-tx]', w).forEach(function (b) { b.onclick = function () { taxSheet(b.dataset.tx); }; });
      $('[data-x="csv"]', w).onclick = function () {
        var V = invs().filter(function (v) { var t = v.pts || v.ts; return !v.void && status(v) === 'Paid' && t >= r[0] && t < r[1]; }).sort(function (a, b) { return (a.pts || a.ts) - (b.pts || b.ts); });
        if (!V.length) return toast('No paid invoices in this period');
        csvOut([['invoice', 'paid_on', 'customer', 'taxable_pi', 'tax_percent', 'tax_pi', 'total_pi']].concat(V.map(function (v) { var c = calc(v); return [v.no, iso(v.pts || v.ts), v.cname || '', r7(c.sub - c.disc), v.tax || 0, c.tax, v.total]; })).concat([['TOTAL', '', '', T.base, '', T.tax, '']]), 'DigitalSaudi-tax-summary-' + perName(per).replace(/[^A-Za-z0-9]+/g, '-') + '.csv', 'DigitalSaudi tax summary');
      };
    }

    /* ── staff mode (owner): a private link for a worker's phone; their sales arrive here automatically ── */
    function staffCfg() { var b = biz(); return { name: bizName(), staff: get('staffC', {}).staff || 'Staff', target: K.myTarget(), prods: prods().map(function (q) { return { id: q.id, n: q.n, p: q.p, sku: q.sku || '', stock: typeof q.stock === 'number' ? q.stock : null }; }) }; }
    function staffLink(code) { return location.origin + '/wallet.html?staff=' + code; }
    var stT = null;
    function staffPushSoon() { if (!get('staffC', {}).code) return; clearTimeout(stT); stT = setTimeout(function () { if (K.signedIn() && K.token()) K.api('/staff', { a: 'set', accessToken: K.token(), cfg: staffCfg() }).catch(function () {}); }, 2500); }
    function staffPull(quiet) {
      var sc = get('staffC', {}); if (!sc.code || !K.signedIn() || !K.token()) return Promise.resolve(0);
      var L = invs(), have = {}; L.forEach(function (v) { have[v.no] = v; });
      var paid = L.filter(function (v) { return v.staff && status(v) === 'Paid'; }).map(function (v) { return v.no; }).slice(0, 200);
      return K.api('/staff', { a: 'pull', accessToken: K.token(), paid: paid }).then(function (d) {
        if (!d || !d.ok) return 0;
        if (!d.code) { put('staffC', {}); return 0; }
        var add = [], tgt = K.myTarget();
        (d.items || []).forEach(function (x) { if (have[x.no]) return; var v = { id: uid(), no: x.no, to: tgt, cname: 'Sale · ' + (x.note || x.staff || 'Staff'), cto: '', items: x.items, disc: x.disc || 0, tax: 0, notes: '', ts: x.ts, due: day0(x.ts), paid: 0, pays: [], rec: '', sale: true, staff: x.staff || 'Staff' }; v.total = calc(v).total; add.push(v); });
        if (!add.length) return 0;
        saveInvs(add.concat(invs()).sort(function (a, b) { return b.ts - a.ts; })); matchAll(); K.rerender();
        if (!quiet) K.addNote('users', add.length === 1 ? 'Staff sale recorded' : add.length + ' staff sales recorded', add.map(function (v) { return v.no + ' · ' + fpi(v.total) + ' π'; }).slice(0, 3).join(' · '), 'staff-' + add[0].no);
        return add.length;
      }).catch(function () { return 0; });
    }
    function staffSheet() {
      if (!K.signedIn()) return toast('Sign in with Pi to use staff mode');
      if (K.needTarget('Staff mode')) return;
      var sc = get('staffC', {});
      if (!sc.code) {
        var w = sheet('Staff mode', '<div class="pd-hero">' + ic('users') + '<b>Let your staff take sales</b></div>' +
          '<label class="l" for="st-n">Staff name</label><input class="in" id="st-n" maxlength="30" placeholder="e.g. Cashier 1">' +
          '<button type="button" class="btn" id="st-go">' + ic('link') + 'Create staff link</button>');
        $('#st-go', w).onclick = function () {
          var n = $('#st-n', w).value.trim() || 'Staff', b = this; b.disabled = true;
          put('staffC', { staff: n });
          K.api('/staff', { a: 'set', accessToken: K.token(), cfg: staffCfg() }).then(function (d) { b.disabled = false; if (!d || !d.ok) return toast((d && d.error) || 'Could not create the link. Try again.'); put('staffC', { code: d.code, n: d.n, staff: n }); toast('Staff link ready'); staffSheet(); }).catch(function () { b.disabled = false; toast('No connection. Try again.'); });
        };
        return;
      }
      var link = staffLink(sc.code), S = invs().filter(function (v) { return v.staff; }).slice(0, 30), tod = S.filter(function (v) { return v.ts >= day0(); });
      var w2 = sheet('Staff mode', '<div class="qs-pay"><div class="small muted">Open on your staff member’s phone</div><div class="qr qs-qr">' + (window.FPQR ? FPQR.svg(link, 220, '#084427') : '') + '</div><div class="qs-st ok">' + ic('check') + 'Active · ' + esc(sc.staff || 'Staff') + '</div></div>' +
        '<div class="two"><button type="button" class="btn" data-x="sh">' + ic('share') + 'Share link</button><button type="button" class="btn ghost" data-x="cp">' + ic('copy') + 'Copy link</button></div>' +
        '<div class="stats"><div><small>Today</small><b class="bz-amt">' + fpi(sum(tod.filter(function (v) { return status(v) === 'Paid'; }).map(function (v) { return { amount: v.total }; }))) + ' π</b></div><div><small>Sales today</small><b>' + tod.length + '</b></div><div><small>Waiting</small><b>' + S.filter(function (v) { return status(v) !== 'Paid' && !v.void; }).length + '</b></div></div>' +
        '<div class="day">Staff sales</div><div class="list">' + (S.length ? S.map(invRow).join('') : '<div class="empty">' + ic('users') + '<div>Sales your staff take appear here.</div></div>') + '</div>' +
        '<div class="day">Manage</div><div class="list">' + row('refresh', 'Check for new sales', 'Sales also arrive by themselves', 'x', ' data-sx="pull"') + row('link', 'New link', 'The current link stops working', 'x', ' data-sx="renew"') + row('x', 'Turn off staff mode', 'Staff can no longer record sales', 'x', ' data-sx="off"') + '</div>');
      bindInvRows(w2);
      $('[data-x="sh"]', w2).onclick = function () { K.shareText('DigitalSaudi staff link', bizName() + ' · staff link for ' + (sc.staff || 'Staff') + '\n' + link); };
      $('[data-x="cp"]', w2).onclick = function () { K.copy(link); };
      $$('[data-sx]', w2).forEach(function (b) {
        b.removeAttribute('data-act');
        b.onclick = function () {
          var k = b.dataset.sx;
          if (k === 'pull') return staffPull(true).then(function (n) { toast(n ? n + ' new sale' + (n === 1 ? '' : 's') : 'No new sales'); staffSheet(); });
          K.api('/staff', k === 'off' ? { a: 'off', accessToken: K.token() } : { a: 'set', renew: true, accessToken: K.token(), cfg: staffCfg() }).then(function (d) {
            if (!d || !d.ok) return toast((d && d.error) || 'Try again.');
            if (k === 'off') { put('staffC', {}); toast('Staff mode turned off'); return w2.remove(); }
            put('staffC', { code: d.code, n: d.n, staff: sc.staff }); toast('New staff link ready'); staffSheet();
          }).catch(function () { toast('No connection. Try again.'); });
        };
      });
    }

    /* ── staff mode (worker's phone) ── */
    function staffMode() {
      var code = get('staffK', ''); if (!code) return false;
      document.documentElement.classList.add('fp-staff');
      var box = document.createElement('div'); box.id = 'staffv'; document.body.appendChild(box);
      var cfg = get('staffCfg', null), n = get('staffN', 0);
      function mine() { return get('staffS', []); }
      function seq() { var s = Math.max(get('staffSeq', 0), get('staffCnt', 0)) + 1; put('staffSeq', s); return 'INV-S' + n + '-' + String(s).padStart(4, '0'); }
      function paint(err) {
        var S = mine(), tod = S.filter(function (x) { return x.ts >= day0(); }), pt = r7(tod.filter(function (x) { return x.paid; }).reduce(function (s0, x) { return s0 + x.total; }, 0));
        box.innerHTML = '<div class="stf-h"><div class="stf-lg">' + ic('store') + '</div><div class="grow"><b>' + esc(cfg ? cfg.name : 'DigitalSaudi') + '</b><small>' + esc(cfg ? cfg.staff : '') + ' · Staff mode</small></div><span class="stf-b">' + esc(K.NETN.replace('Pi ', '')) + '</span></div>' +
          (err ? '<div class="stf-err">' + ic('warn') + '<span>' + esc(err) + '</span></div>' : '') +
          '<div class="bz-kpi"><div class="bz-k1"><small>Received today</small><b class="num bz-amt">' + fpi(pt) + ' π</b><span>' + tod.length + ' sale' + (tod.length === 1 ? '' : 's') + ' · ' + tod.filter(function (x) { return !x.paid; }).length + ' waiting</span></div></div>' +
          '<button type="button" class="btn stf-go" data-s="sale"' + (cfg ? '' : ' disabled') + '>' + ic('card') + 'New sale</button>' +
          '<div class="day">My sales</div><div class="list">' + (S.length ? S.slice(0, 40).map(function (x) { return '<button type="button" class="li" data-sv="' + esc(x.no) + '"><span class="ico ' + (x.paid ? 'in' : '') + '">' + ic(x.paid ? 'check' : 'qr') + '</span><span class="grow"><b>' + esc(x.no) + (x.note ? ' · ' + esc(x.note) : '') + '</b><small>' + new Date(x.ts).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) + '</small></span><span class="amt-r"><b class="num bz-amt">' + fpi(x.total) + ' π</b><small class="' + (x.paid ? 'bz-ok' : 'bz-due') + '">' + (x.paid ? 'Paid' : 'Waiting') + '</small></span></button>'; }).join('') : '<div class="empty">' + ic('card') + '<div>Sales you take appear here.</div></div>') + '</div>' +
          '<button type="button" class="btn ghost" data-s="leave">' + ic('out') + 'Leave staff mode</button>';
        var sb = $('[data-s="sale"]', box); sb.onclick = function () { sale(); };
        $('[data-s="leave"]', box).onclick = function () {
          var w = sheet('Leave staff mode', '<p class="small muted">This phone will stop taking sales for ' + esc(cfg ? cfg.name : 'this business') + '. Sales already taken stay with the business.</p><button type="button" class="btn danger" data-x="y">' + ic('out') + 'Leave staff mode</button>');
          $('[data-x="y"]', w).onclick = function () { ['staffK', 'staffCfg', 'staffN', 'staffS', 'staffSeq', 'staffCnt', 'staffQ'].forEach(function (k) { try { localStorage.removeItem('dsw_v1_' + k); } catch (e) {} }); location.replace('/'); };
        };
        $$('[data-sv]', box).forEach(function (b) { b.onclick = function () { var x = mine().filter(function (y) { return y.no === b.dataset.sv; })[0]; if (x) pay(x); }; });
      }
      function load() {
        return K.api('/staff', { a: 'cfg', code: code }).then(function (d) {
          if (d && d.ok && d.cfg) { cfg = d.cfg; n = d.n; put('staffCfg', cfg); put('staffN', n); put('staffCnt', d.count || 0); paint(); return; }
          if (d && d.off) { cfg = null; put('staffCfg', null); return paint(d.error); }
          paint(cfg ? '' : 'Could not load the shop. Check the connection.');
        }).catch(function () { paint(cfg ? '' : 'You are offline. Connect to load the shop.'); });
      }
      function flush() {
        var Q = get('staffQ', []); if (!Q.length) return Promise.resolve();
        return K.api('/staff', { a: 'sale', code: code, sale: Q[0] }).then(function (d) { if (d && (d.ok || !d.error || /not valid/.test(d.error))) { put('staffQ', get('staffQ', []).slice(1)); return flush(); } }).catch(function () {});
      }
      function status() {
        var W = mine().filter(function (x) { return !x.paid && x.ts > Date.now() - 3 * 864e5; }).map(function (x) { return x.no; }).slice(0, 30); if (!W.length) return Promise.resolve([]);
        return K.api('/staff', { a: 'status', code: code, nos: W }).then(function (d) {
          var P = (d && d.paid) || []; if (!P.length) return P;
          put('staffS', mine().map(function (x) { if (P.indexOf(x.no) >= 0 && !x.paid) { x.paid = Date.now(); } return x; })); paint(); return P;
        }).catch(function () { return []; });
      }
      function sale() {
        if (!cfg) return;
        saleSheet({}, { prods: cfg.prods || [], charge: function (A, note) {
          var x = { no: seq(), ts: Date.now(), items: A.L, disc: A.disc, total: A.total, note: note, staff: cfg.staff };
          put('staffS', [x].concat(mine()).slice(0, 300)); put('staffQ', get('staffQ', []).concat([x]));
          flush(); paint(); pay(x);
        } });
      }
      function pay(x) {
        var link = K.payLink({ u: cfg.target, a: x.total, x: (x.no + ' · ' + (x.items.length === 1 ? x.items[0].d : 'Sale')).slice(0, 80) }), tm = null;
        var w = sheet('Charge ' + x.no, '<div class="qs-pay"><div class="qs-amt num bz-amt">' + fpi(x.total) + ' π</div><div class="small muted">' + esc(conv(x.total)) + '</div>' +
          '<div class="qr qs-qr' + (x.paid ? ' paid' : '') + '">' + (window.FPQR ? FPQR.svg(link, 250, '#084427') : '') + '</div><div class="qs-st' + (x.paid ? ' ok' : '') + '" id="sp-st">' + (x.paid ? ic('check') + 'Paid · ' : '<span class="qs-dot"></span>Waiting for payment · ') + esc(x.no) + '</div>' +
          '<p class="small muted" style="margin-top:6px">Scan with DigitalSaudi to pay ' + esc(cfg.name) + '</p></div>' +
          '<button type="button" class="btn soft" data-x="new">' + ic('plus') + 'New sale</button>', { onClose: function () { clearInterval(tm); } });
        $('[data-x="new"]', w).onclick = function () { clearInterval(tm); sale(); };
        if (x.paid) return;
        tm = setInterval(function () {
          if (!document.body.contains(w)) return clearInterval(tm);
          flush().then(status).then(function (P) { if (P.indexOf(x.no) < 0) return; clearInterval(tm); var st = $('#sp-st', w); if (st) { st.className = 'qs-st ok'; st.innerHTML = ic('check') + 'Paid · ' + esc(x.no); } var q = $('.qs-qr', w); if (q) q.classList.add('paid'); fx('paid'); });
        }, 4000);
      }
      paint(); load().then(flush).then(status);
      setInterval(function () { if (!document.hidden) flush().then(status); }, 15000);
      addEventListener('online', function () { flush().then(status); });
      return true;
    }

    /* ── savings goals: progress toward a goal; the Pi stays in the user's own wallet ── */
    function goals() { return get('goals', []); }
    function gSaved(g) { return r7((g.ent || []).reduce(function (s0, e) { return s0 + Number(e.a || 0); }, 0)); }
    function goalSheet() {
      var G = goals();
      var w = sheet('Savings goals', '<div class="list">' + (G.length ? G.map(function (g) { var sv = gSaved(g), pc = g.t ? Math.min(100, Math.round(sv / g.t * 100)) : 0; return '<button type="button" class="li gl-li" data-gv="' + g.id + '"><span class="ico in">' + ic('star') + '</span><span class="grow"><b>' + esc(g.n) + '</b><small>' + fpi(sv) + ' of ' + fpi(g.t) + ' π' + (g.d ? ' · by ' + dstr(g.d) : '') + '</small><span class="bar gl-bar"><i style="width:' + Math.max(2, pc) + '%"></i></span></span><span class="amt-r"><b class="num">' + pc + '%</b>' + (pc >= 100 ? '<small class="bz-ok">Reached</small>' : '') + '</span></button>'; }).join('')
        : '<div class="empty">' + ic('star') + '<div>No goals yet. Set a goal and track every step toward it.</div></div>') + '</div>' +
        '<p class="small muted gl-note">' + ic('lock') + 'Your Pi stays in your own wallet. DigitalSaudi keeps the record.</p>' +
        '<button type="button" class="btn" data-x="new">' + ic('plus') + 'New goal</button>');
      $$('[data-gv]', w).forEach(function (b) { b.onclick = function () { goalView(b.dataset.gv); }; });
      $('[data-x="new"]', w).onclick = function () { goalEdit(''); };
    }
    function goalEdit(id) {
      var g = goals().filter(function (x) { return x.id === id; })[0] || {};
      var w = sheet(id ? 'Edit goal' : 'New goal', '<label class="l" for="gl-n">Goal</label><input class="in" id="gl-n" maxlength="40" value="' + esc(g.n || '') + '" placeholder="e.g. New phone, school fees, travel">' +
        '<label class="l" for="gl-t">Target</label><div class="amt sm"><input id="gl-t" type="number" inputmode="decimal" placeholder="0.00" value="' + (g.t || '') + '"><span>π</span></div><div class="hint num" id="gl-c"></div>' +
        '<label class="l" for="gl-d">Target date (optional)</label><input class="in" id="gl-d" type="date" min="' + iso(Date.now() + 864e5) + '" value="' + (g.d ? iso(g.d) : '') + '">' +
        '<button type="button" class="btn" id="gl-go">' + ic('check') + 'Save goal</button>' + (id ? '<button type="button" class="btn danger" id="gl-rm">' + ic('trash') + 'Delete goal</button>' : ''), { stack: true });
      var ti = $('#gl-t', w); ti.oninput = function () { $('#gl-c', w).textContent = conv(r7(ti.value)); }; ti.oninput();
      $('#gl-go', w).onclick = function () {
        var n = $('#gl-n', w).value.trim(), t = r7(ti.value), dv = $('#gl-d', w).value, d = dv ? new Date(dv + 'T12:00:00').getTime() : 0;
        if (!n) return toast('Name your goal'); if (!(t >= 0.01)) return toast('Enter a target of at least 0.01 π'); if (t > 1e9) return toast('Check the target');
        if (d && day0(d) <= day0()) return toast('Choose a date after today');
        var x = { id: id || uid(), n: n, t: t, d: d, ent: g.ent || [], ts: g.ts || Date.now() };
        put('goals', [x].concat(goals().filter(function (y) { return y.id !== x.id; })).slice(0, 50)); toast('Goal saved'); goalView(x.id);
      };
      var rm = $('#gl-rm', w); if (rm) rm.onclick = function () { put('goals', goals().filter(function (y) { return y.id !== id; })); toast('Goal deleted'); goalSheet(); };
    }
    function goalView(id) {
      var g = goals().filter(function (x) { return x.id === id; })[0]; if (!g) return goalSheet();
      var sv = gSaved(g), left = r7(Math.max(0, g.t - sv)), pc = Math.min(100, Math.round(sv / g.t * 100)), wk = g.d && left > 0 ? Math.max(1, Math.ceil((g.d - Date.now()) / (7 * 864e5))) : 0;
      var C = 2 * Math.PI * 52, E = (g.ent || []).slice().sort(function (a, b) { return b.ts - a.ts; });
      var w = sheet(g.n, '<div class="gl-hero"><svg viewBox="0 0 120 120" class="gl-ring" aria-hidden="true"><circle cx="60" cy="60" r="52" fill="none" stroke="#E3EFE9" stroke-width="12"/><circle cx="60" cy="60" r="52" fill="none" stroke="url(#glg)" stroke-width="12" stroke-linecap="round" stroke-dasharray="' + C.toFixed(1) + '" stroke-dashoffset="' + (C * (1 - pc / 100)).toFixed(1) + '" transform="rotate(-90 60 60)"/><defs><linearGradient id="glg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1AC271"/><stop offset="1" stop-color="#B98A1D"/></linearGradient></defs></svg><div class="gl-pc"><b>' + pc + '%</b><small>' + (pc >= 100 ? 'Reached' : 'saved') + '</small></div></div>' +
        '<div class="stats"><div><small>Saved</small><b class="bz-amt">' + fpi(sv) + ' π</b></div><div><small>Target</small><b class="bz-amt">' + fpi(g.t) + ' π</b></div><div><small>Left</small><b class="bz-amt">' + fpi(left) + ' π</b></div></div>' +
        (wk ? '<div class="note gl-plan">' + ic('cal') + '<span>Save ' + fpi(r7(Math.ceil(left / wk * 100) / 100)) + ' π a week to reach it by ' + dstr(g.d) + '.</span></div>' : '') +
        '<div class="two"><button type="button" class="btn" data-x="add">' + ic('plus') + 'Add savings</button><button type="button" class="btn ghost" data-x="out">' + ic('minus') + 'Take out</button></div>' +
        '<div class="day">History</div><div class="list">' + (E.length ? E.slice(0, 60).map(function (e) { return '<div class="li"><span class="ico ' + (e.a < 0 ? 'rf' : 'in') + '">' + ic(e.a < 0 ? 'minus' : 'plus') + '</span><span class="grow"><b>' + esc(e.note || (e.a < 0 ? 'Taken out' : 'Saved')) + '</b><small>' + dstr(e.ts) + '</small></span><span class="amt-r"><b class="num bz-amt">' + (e.a < 0 ? '−' : '+') + fpi(Math.abs(e.a)) + ' π</b></span></div>'; }).join('') : '<div class="empty">' + ic('star') + '<div>Add what you set aside to see your progress.</div></div>') + '</div>' +
        '<button type="button" class="btn soft" data-x="ed">' + ic('edit') + 'Edit goal</button>');
      function entry(sign) {
        var w2 = sheet(sign > 0 ? 'Add savings' : 'Take out', '<label class="l" for="ge-a">Amount</label><div class="amt sm"><input id="ge-a" type="number" inputmode="decimal" placeholder="0.00"><span>π</span></div><div class="hint num" id="ge-c"></div><label class="l" for="ge-n">Note (optional)</label><input class="in" id="ge-n" maxlength="40" placeholder="' + (sign > 0 ? 'e.g. This week' : 'e.g. Used for fees') + '"><button type="button" class="btn" id="ge-go">' + ic('check') + 'Save</button>', { stack: true });
        var ai = $('#ge-a', w2); ai.oninput = function () { $('#ge-c', w2).textContent = conv(r7(ai.value)); }; setTimeout(function () { try { ai.focus(); } catch (e) {} }, 200);
        $('#ge-go', w2).onclick = function () {
          var a = r7(ai.value); if (!(a >= 0.01)) return toast('Enter at least 0.01 π'); if (sign < 0 && a > gSaved(g) + 1e-7) return toast('You have ' + fpi(gSaved(g)) + ' π in this goal');
          var before = gSaved(g);
          put('goals', goals().map(function (y) { if (y.id === id) y.ent = (y.ent || []).concat([{ ts: Date.now(), a: sign * a, note: $('#ge-n', w2).value.trim() }]).slice(-500); return y; }));
          var now = goals().filter(function (y) { return y.id === id; })[0];
          if (sign > 0 && before < g.t && gSaved(now) >= g.t) { fx('paid'); K.addNote('star', 'Goal reached', g.n + ' · ' + fpi(g.t) + ' π', 'goal-' + id); } else toast('Saved');
          goalView(id);
        };
      }
      $('[data-x="add"]', w).onclick = function () { entry(1); };
      $('[data-x="out"]', w).onclick = function () { entry(-1); };
      $('[data-x="ed"]', w).onclick = function () { goalEdit(id); };
    }

    /* ── group collections: one link for a family, community or event fund, with live progress ── */
    function cols() { return get('cols', []); }
    function colCode() { var A = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789', c = ''; for (var i = 0; i < 6; i++) c += A[Math.floor(Math.random() * 32)]; return 'COL-' + c; }
    function colPays(c) { var re = new RegExp('\\b' + c.code + '\\b', 'i'); return incoming().filter(function (r) { return r.ts >= c.ts - 60e3 && re.test(String(r.narr || '')); }).sort(function (a, b) { return b.ts - a.ts; }); }
    function colLink(c) { return K.payLink({ u: c.to, a: c.each || '', x: (c.code + ' · ' + c.n).slice(0, 80) }); }
    function colSheet() {
      var C = cols();
      var w = sheet('Group collections', '<div class="list">' + (C.length ? C.map(function (c) { var P = colPays(c), got = sum(P), pc = c.t ? Math.min(100, Math.round(got / c.t * 100)) : 0; return '<button type="button" class="li gl-li" data-cv="' + c.id + '"><span class="ico">' + ic('users') + '</span><span class="grow"><b>' + esc(c.n) + '</b><small>' + fpi(got) + (c.t ? ' of ' + fpi(c.t) : '') + ' π · ' + P.length + ' contribution' + (P.length === 1 ? '' : 's') + (c.off ? ' · closed' : '') + '</small>' + (c.t ? '<span class="bar gl-bar"><i style="width:' + Math.max(2, pc) + '%"></i></span>' : '') + '</span><span class="go">' + ic('chev') + '</span></button>'; }).join('')
        : '<div class="empty">' + ic('users') + '<div>Collect for a family need, a community project or an event. Everyone pays with one link.</div></div>') + '</div>' +
        '<button type="button" class="btn" data-x="new">' + ic('plus') + 'New collection</button>');
      $$('[data-cv]', w).forEach(function (b) { b.onclick = function () { colView(b.dataset.cv); }; });
      $('[data-x="new"]', w).onclick = function () { colEdit(''); };
    }
    function colEdit(id) {
      if (K.needTarget('Group collection')) return;
      var c = cols().filter(function (x) { return x.id === id; })[0] || {};
      var w = sheet(id ? 'Edit collection' : 'New collection', '<label class="l" for="cl-n">Collection for</label><input class="in" id="cl-n" maxlength="40" value="' + esc(c.n || '') + '" placeholder="e.g. Wedding gift, mosque repair, team trip">' +
        '<div class="two bz-two"><div><label class="l" for="cl-t">Target (optional)</label><div class="amt sm"><input id="cl-t" type="number" inputmode="decimal" placeholder="0.00" value="' + (c.t || '') + '"><span>π</span></div></div><div><label class="l" for="cl-e">Each person (optional)</label><div class="amt sm"><input id="cl-e" type="number" inputmode="decimal" placeholder="Any" value="' + (c.each || '') + '"><span>π</span></div></div></div>' +
        '<label class="l" for="cl-d">End date (optional)</label><input class="in" id="cl-d" type="date" min="' + iso(Date.now()) + '" value="' + (c.d ? iso(c.d) : '') + '">' +
        '<button type="button" class="btn" id="cl-go">' + ic('check') + (id ? 'Save' : 'Create collection') + '</button>', { stack: true });
      $('#cl-go', w).onclick = function () {
        var n = $('#cl-n', w).value.trim(), t = r7($('#cl-t', w).value), e = r7($('#cl-e', w).value), dv = $('#cl-d', w).value;
        if (!n) return toast('Name the collection'); if ($('#cl-t', w).value && !(t >= 0.01)) return toast('The target must be at least 0.01 π'); if ($('#cl-e', w).value && !(e >= 0.01)) return toast('Each person’s amount must be at least 0.01 π');
        if (t && e && e > t) return toast('Each person’s amount is more than the target');
        var x = { id: id || uid(), code: c.code || colCode(), n: n, t: t || 0, each: e || 0, d: dv ? new Date(dv + 'T23:59:00').getTime() : 0, to: c.to || K.myTarget(), ts: c.ts || Date.now(), off: !!c.off };
        put('cols', [x].concat(cols().filter(function (y) { return y.id !== x.id; })).slice(0, 50)); toast(id ? 'Saved' : 'Collection ready'); colView(x.id);
      };
    }
    function colCanvas(c) {
      var P = colPays(c), got = sum(P), pc = c.t ? Math.min(1, got / c.t) : 0, W = 1080, H = 1350, X = 80, cv = document.createElement('canvas'); cv.width = W; cv.height = H; var x = cv.getContext('2d'), FR = window.FPReceipt || {};
      var g = x.createLinearGradient(0, 0, W, H); g.addColorStop(0, '#084427'); g.addColorStop(.55, '#1AC271'); g.addColorStop(1, '#9B7213'); x.fillStyle = g; x.fillRect(0, 0, W, H); if (FR.guilloche) FR.guilloche(x, 0, 0, W, H, '#FFFFFF', .07);
      T(x, 'GROUP COLLECTION', X, 130, '700 26px ' + FONT, '#F1D89E'); x.font = '800 60px ' + FONT; wrap(x, c.n, W - 2 * X).slice(0, 2).forEach(function (l, i) { T(x, l, X, 210 + i * 72, '800 60px ' + FONT, '#fff'); });
      T(x, fpi(got) + ' π', X, 420, '800 84px ' + MONO, '#fff'); T(x, (c.t ? 'raised of ' + fpi(c.t) + ' π' : 'raised') + ' · ' + P.length + ' contribution' + (P.length === 1 ? '' : 's'), X, 472, '600 28px ' + FONT, 'rgba(255,255,255,.85)');
      if (c.t) { x.fillStyle = 'rgba(255,255,255,.22)'; rr(x, X, 510, W - 2 * X, 26, 13); x.fill(); x.fillStyle = '#E3BD65'; rr(x, X, 510, Math.max(26, (W - 2 * X) * pc), 26, 13); x.fill(); }
      x.fillStyle = '#fff'; rr(x, W / 2 - 250, 610, 500, 500, 36); x.fill();
      if (window.FPQR) { var q = FPQR.canvas(colLink(c), 900, '#0C4A2C', '#FFFFFF'); x.drawImage(q, W / 2 - 220, 640, 440, 440); }
      T(x, 'Scan with DigitalSaudi to contribute' + (c.each ? ' · ' + fpi(c.each) + ' π each' : ''), W / 2, 1170, '700 30px ' + FONT, '#fff', 'center');
      T(x, bizName() + (c.d ? ' · until ' + dstr(c.d) : ''), W / 2, 1218, '500 26px ' + FONT, 'rgba(255,255,255,.85)', 'center');
      T(x, 'DigitalSaudi · ' + K.NETN + ' · ' + c.code, W / 2, H - 50, '600 22px ' + MONO, 'rgba(255,255,255,.7)', 'center');
      return Promise.resolve(cv);
    }
    function colView(id) {
      var c = cols().filter(function (x) { return x.id === id; })[0]; if (!c) return colSheet();
      var P = colPays(c), got = sum(P), pc = c.t ? Math.min(100, Math.round(got / c.t * 100)) : 0, link = colLink(c);
      var txt = function () { return c.n + ' · group collection' + (c.t ? ' · target ' + fpi(c.t) + ' π' : '') + (c.each ? ' · ' + fpi(c.each) + ' π each' : '') + '\nContribute with DigitalSaudi:\n' + link; };
      var w = sheet(c.n, '<div class="big bz-big"><div class="bz-row"><span class="bz-st ' + (c.off ? 'off' : 'ok') + '">' + (c.off ? 'Closed' : 'Open') + '</span><span class="small">' + esc(c.code) + '</span></div><div class="v bz-amt">' + fpi(got) + ' π</div><div class="c">' + (c.t ? pc + '% of ' + fpi(c.t) + ' π' : 'Raised so far') + ' · ' + P.length + ' contribution' + (P.length === 1 ? '' : 's') + '</div>' + (c.t ? '<div class="bar gl-bar on-dark"><i style="width:' + Math.max(2, pc) + '%"></i></div>' : '') + (c.d ? '<div class="w">Until ' + dstr(c.d) + '</div>' : '') + '</div>' +
        (c.off ? '' : '<div class="two"><button type="button" class="btn" data-x="lk">' + ic('share') + 'Share link</button><button type="button" class="btn ghost" data-x="cp">' + ic('copy') + 'Copy link</button></div>') +
        '<div class="day">Contributions</div><div class="list">' + (P.length ? P.slice(0, 100).map(function (r) { var p = payer(r); return '<div class="li"><span class="ico in">' + ic('heart') + '</span><span class="grow"><b>' + esc(K.isG(p) ? K.short(p) : who(p)) + '</b><small>' + new Date(r.ts).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) + '</small></span><span class="amt-r"><b class="num bz-amt">+' + fpi(r.amount) + ' π</b></span></div>'; }).join('') : '<div class="empty">' + ic('heart') + '<div>Contributions appear here as they arrive.</div></div>') + '</div>' +
        '<div class="day">Progress card</div><div class="bz-prev">Preparing…</div>' + fileBtns('') +
        '<div class="day">Manage</div><div class="list">' + (c.off ? '' : row('edit', 'Edit', 'Name, target and amount', 'x', ' data-cx="ed"')) + row(c.off ? 'repeat' : 'x', c.off ? 'Reopen' : 'Close collection', c.off ? 'Accept contributions again' : 'The link stays valid; mark it as finished', 'x', ' data-cx="tog"') + row('down', 'Contributions (CSV)', 'Who gave and when', 'x', ' data-cx="csv"') + row('trash', 'Delete', 'Remove it from this phone', 'x', ' data-cx="del"') + '</div>');
      fileActions(w, function () { return colCanvas(c); }, 'DigitalSaudi-collection-' + c.code, 'collection card', 'DigitalSaudi collection ' + c.n, txt);
      var lk = $('[data-x="lk"]', w); if (lk) lk.onclick = function () { K.shareText(c.n, txt()); };
      var cp = $('[data-x="cp"]', w); if (cp) cp.onclick = function () { K.copy(link); };
      $$('[data-cx]', w).forEach(function (b) {
        b.removeAttribute('data-act');
        b.onclick = function () {
          var k = b.dataset.cx;
          if (k === 'ed') return colEdit(id);
          if (k === 'tog') { put('cols', cols().map(function (y) { if (y.id === id) y.off = !y.off; return y; })); toast(c.off ? 'Collection reopened' : 'Collection closed'); return colView(id); }
          if (k === 'csv') { if (!P.length) return toast('No contributions yet'); return csvOut([['date', 'time', 'from', 'amount_pi', 'transaction_id']].concat(P.slice().reverse().map(function (r) { return [iso(r.ts), new Date(r.ts).toTimeString().slice(0, 5), payer(r), r.amount, r.txid || '']; })), 'DigitalSaudi-' + c.code + '.csv', 'DigitalSaudi collection'); }
          if (k === 'del') { put('cols', cols().filter(function (y) { return y.id !== id; })); toast('Collection deleted'); colSheet(); }
        };
      });
    }
    // a contribution arriving: one notification each
    K.HK.rcpt.push(function (r) {
      if (!r || r.dir !== 'in' || !/COL-[A-Z2-9]{6}/i.test(String(r.narr || ''))) return;
      var c = cols().filter(function (x) { return new RegExp('\\b' + x.code + '\\b', 'i').test(String(r.narr || '')); })[0]; if (!c) return;
      var got = sum(colPays(c)); K.addNote('heart', 'Contribution received', c.n + ' · ' + fpi(r.amount) + ' π from ' + who(payer(r)) + ' · ' + fpi(got) + (c.t ? ' of ' + fpi(c.t) : '') + ' π', 'col-' + rkey(r));
      if (c.t && got >= c.t && got - Number(r.amount) < c.t) K.addNote('star', 'Collection target reached', c.n + ' · ' + fpi(got) + ' π', 'colt-' + c.id);
    });

    /* ── net worth: what you own and what you owe, entered by you; your Pi balance is read from the Pi blockchain ── */
    function nwItems() { return get('nw', []); }
    function nwPi(it) { if (it.cur === 'PI') return Number(it.a) || 0; var r = K.rateIn(it.cur); return r ? Math.round((Number(it.a) || 0) / r * 100) / 100 : 0; }
    function nwSheet() {
      var L = nwItems(), A = L.filter(function (x) { return x.k === 'a'; }), D = L.filter(function (x) { return x.k === 'l'; });
      var bal = (K.wal && K.wal()) || null, pb = bal && typeof bal.bal === 'number' ? bal.bal : null;
      var ta = r7(A.reduce(function (s0, x) { return s0 + nwPi(x); }, 0) + (pb || 0)), tl = r7(D.reduce(function (s0, x) { return s0 + nwPi(x); }, 0)), nw = r7(ta - tl);
      function li(x) { return '<button type="button" class="li" data-nv="' + x.id + '"><span class="ico ' + (x.k === 'a' ? 'in' : 'rf') + '">' + ic(x.k === 'a' ? 'plus' : 'minus') + '</span><span class="grow"><b>' + esc(x.n) + '</b><small>' + (x.cur === 'PI' ? fpi(x.a) + ' π' : esc(K.money(x.a, x.cur, 2)) + ' · ≈ ' + fpi(r7(nwPi(x))) + ' π') + '</small></span><span class="amt-r"><b class="num bz-amt">' + fpi(r7(nwPi(x))) + ' π</b></span></button>'; }
      var w = sheet('Net worth', '<div class="bz-kpi"><div class="bz-k1"><small>Net worth</small><b class="num bz-amt">' + (nw < 0 ? '−' : '') + fpi(Math.abs(nw)) + ' π</b><span class="bz-amt">' + esc(conv(Math.abs(nw)) || ' ') + '</span></div>' +
        '<div><small>Own</small><b class="num bz-amt">' + fpi(ta) + ' π</b></div><div class="' + (tl > ta ? 'bad' : '') + '"><small>Owe</small><b class="num bz-amt">' + fpi(tl) + ' π</b></div><div><small>Items</small><b class="num">' + L.length + '</b></div></div>' +
        '<div class="day">Pi wallet</div><div class="list">' + (get('addr', '') ? '<div class="li"><span class="ico in">' + ic('card') + '</span><span class="grow"><b>Pi balance</b><small>' + esc(K.short(get('addr', ''))) + ' · from the Pi blockchain</small></span><span class="amt-r"><b class="num bz-amt">' + (pb === null ? '…' : fpi(r7(pb)) + ' π') + '</b></span></div>' : '<button type="button" class="li" data-act="addr-set"><span class="ico">' + ic('card') + '</span><span class="grow"><b>Add your Pi wallet address</b><small>Your Pi balance is included automatically</small></span><span class="go">' + ic('chev') + '</span></button>') + '</div>' +
        '<div class="day">What you own</div><div class="list">' + (A.length ? A.map(li).join('') : '<div class="empty">' + ic('plus') + '<div>Savings, stock, equipment, land or other Pi.</div></div>') + '</div>' +
        '<div class="day">What you owe</div><div class="list">' + (D.length ? D.map(li).join('') : '<div class="empty">' + ic('minus') + '<div>Bills or amounts you still have to pay.</div></div>') + '</div>' +
        '<div class="two"><button type="button" class="btn" data-x="a">' + ic('plus') + 'Add what you own</button><button type="button" class="btn ghost" data-x="l">' + ic('minus') + 'Add what you owe</button></div>' +
        '<p class="small muted gl-note">' + ic('lock') + 'Saved on this phone and in your backup. Values in other currencies use today’s rate.</p>');
      $$('[data-nv]', w).forEach(function (b) { b.onclick = function () { nwEdit(b.dataset.nv); }; });
      $('[data-x="a"]', w).onclick = function () { nwEdit('', 'a'); }; $('[data-x="l"]', w).onclick = function () { nwEdit('', 'l'); };
      if (get('addr', '') && pb === null && K.loadWal) K.loadWal().then(function () { if (document.body.contains(w)) nwSheet(); });
    }
    function nwEdit(id, k) {
      var x = nwItems().filter(function (y) { return y.id === id; })[0] || { k: k, cur: 'PI' }, c = K.curr(), cur = x.cur;
      var w = sheet(id ? 'Edit' : x.k === 'a' ? 'Add what you own' : 'Add what you owe', '<label class="l" for="nw-n">Name</label><input class="in" id="nw-n" maxlength="40" value="' + esc(x.n || '') + '" placeholder="' + (x.k === 'a' ? 'e.g. Shop stock, savings, motorbike' : 'e.g. Supplier balance, school fees') + '">' +
        '<label class="l" for="nw-a">Value</label><div class="qs-top"><div class="amt sm" style="flex:1"><input id="nw-a" type="number" inputmode="decimal" placeholder="0.00" value="' + (x.a || '') + '"><span id="nw-u">' + (cur === 'PI' ? 'π' : esc(cur)) + '</span></div>' +
        (c !== 'PI' ? '<div class="seg qs-du" role="tablist"><button type="button" data-nc="PI" class="' + (cur === 'PI' ? 'on' : '') + '">π</button><button type="button" data-nc="' + esc(c) + '" class="' + (cur !== 'PI' ? 'on' : '') + '">' + esc(c) + '</button></div>' : '') + '</div><div class="hint num" id="nw-c"></div>' +
        '<button type="button" class="btn" id="nw-go">' + ic('check') + 'Save</button>' + (id ? '<button type="button" class="btn danger" id="nw-rm">' + ic('trash') + 'Delete</button>' : ''), { stack: true });
      var ai = $('#nw-a', w);
      function hint() { var v = Number(ai.value) || 0; $('#nw-c', w).textContent = cur === 'PI' ? conv(v) : (v > 0 && K.rateIn(cur) ? '≈ ' + fpi(Math.round(v / K.rateIn(cur) * 100) / 100) + ' π at today’s rate' : ''); }
      ai.oninput = hint; hint();
      $$('[data-nc]', w).forEach(function (b) { b.onclick = function () { cur = b.dataset.nc; $$('[data-nc]', w).forEach(function (q) { q.classList.toggle('on', q === b); }); $('#nw-u', w).textContent = cur === 'PI' ? 'π' : cur; hint(); }; });
      $('#nw-go', w).onclick = function () {
        var n = $('#nw-n', w).value.trim(), a = Number(ai.value);
        if (!n) return toast('Enter a name'); if (!(a > 0) || a > 1e12) return toast('Enter a value');
        var d = { id: id || uid(), k: x.k, n: n, a: Math.round(a * 1e7) / 1e7, cur: cur, ts: Date.now() };
        put('nw', [d].concat(nwItems().filter(function (y) { return y.id !== d.id; })).slice(0, 200)); toast('Saved'); nwSheet();
      };
      var rm = $('#nw-rm', w); if (rm) rm.onclick = function () { put('nw', nwItems().filter(function (y) { return y.id !== id; })); toast('Deleted'); nwSheet(); };
    }

    /* ── DigitalSaudi Merchant Directory: businesses that accept Pi ── */
    var DCAT = [['food', 'Food & drink'], ['grocery', 'Groceries'], ['fashion', 'Fashion'], ['electronics', 'Electronics'], ['services', 'Services'], ['transport', 'Transport'], ['beauty', 'Health & beauty'], ['education', 'Education'], ['travel', 'Travel & stays'], ['online', 'Online shop'], ['other', 'Other']];
    function dcatName(k) { var x = DCAT.filter(function (c) { return c[0] === k; })[0]; return x ? x[1] : 'Other'; }
    function dirSheet(q0, cat0) {
      var q = q0 || '', cat = cat0 || '', page = 0, items = [];
      var w = sheet('Merchant directory', '<div class="bz-search">' + ic('search') + '<input class="in" id="dr-q" placeholder="Search name, city or country" value="' + esc(q) + '"></div>' +
        '<div class="chips dr-cat"><button type="button" class="chip' + (cat ? '' : ' on') + '" data-dc="">All</button>' + DCAT.map(function (c) { return '<button type="button" class="chip' + (cat === c[0] ? ' on' : '') + '" data-dc="' + c[0] + '">' + c[1] + '</button>'; }).join('') + '</div>' +
        '<div class="list" id="dr-l"><div class="empty">' + ic('store') + '<div>Loading businesses…</div></div></div><button type="button" class="btn soft" id="dr-more" hidden>Show more</button>' +
        '<button type="button" class="btn" data-x="mine">' + ic('store') + 'List my business</button>');
      function card(m) { var ini = esc((m.name || '?').trim().slice(0, 1).toUpperCase()); return '<button type="button" class="li dr-li" data-dm="' + esc(m.id) + '"><span class="dr-lg">' + (m.logo ? '<img alt="" src="' + esc(m.logo) + '">' : ini) + '</span><span class="grow"><b>' + esc(m.name) + '</b><small>' + esc(dcatName(m.cat)) + ' · ' + esc(m.city) + ', ' + esc(m.country) + '</small></span><span class="go">' + ic('chev') + '</span></button>'; }
      function load(reset) {
        if (reset) { page = 0; items = []; }
        K.api('/merchants?q=' + encodeURIComponent(q) + '&cat=' + cat + '&page=' + page).then(function (d) {
          if (!document.body.contains(w)) return;
          if (!d || !d.ok) { $('#dr-l', w).innerHTML = '<div class="empty">' + ic('warn') + '<div>' + esc((d && d.error) || 'Could not load the directory.') + '</div></div>'; return; }
          items = items.concat(d.items || []);
          $('#dr-l', w).innerHTML = items.length ? items.map(card).join('') : '<div class="empty">' + ic('store') + '<div>' + (q || cat ? 'No businesses found.' : 'No businesses listed yet. Be the first.') + '</div></div>';
          $('#dr-more', w).hidden = !d.more;
          $$('[data-dm]', w).forEach(function (b) { b.onclick = function () { dirView(items.filter(function (m) { return m.id === b.dataset.dm; })[0]); }; });
        }).catch(function () { $('#dr-l', w).innerHTML = '<div class="empty">' + ic('warn') + '<div>No connection. Try again.</div></div>'; });
      }
      var tm = null; $('#dr-q', w).oninput = function () { clearTimeout(tm); var v = this.value.trim(); tm = setTimeout(function () { q = v; load(true); }, 350); };
      $$('[data-dc]', w).forEach(function (b) { b.onclick = function () { cat = b.dataset.dc; $$('[data-dc]', w).forEach(function (x) { x.classList.toggle('on', x === b); }); load(true); }; });
      $('#dr-more', w).onclick = function () { page++; load(false); };
      $('[data-x="mine"]', w).onclick = dirEdit;
      load(true);
    }
    function dirView(m) {
      if (!m) return; var to = m.target;
      var w = sheet(m.name, '<div class="dr-hero"><span class="dr-lg big">' + (m.logo ? '<img alt="" src="' + esc(m.logo) + '">' : esc(m.name.slice(0, 1).toUpperCase())) + '</span><b>' + esc(m.name) + '</b><small>' + esc(dcatName(m.cat)) + ' · ' + esc(m.city) + ', ' + esc(m.country) + '</small></div>' +
        (m.about ? '<p class="dr-about">' + esc(m.about) + '</p>' : '') +
        '<div class="sum"><div><span>Pay to</span><b class="t num">' + esc(K.isG(to) ? K.short(to) : '@' + to) + '</b></div><div><span>Listed</span><b class="t">' + dstr(m.ts) + '</b></div></div>' +
        '<button type="button" class="btn" data-x="pay">' + ic('send') + 'Pay ' + esc(m.name) + '</button>' +
        '<div class="two"><button type="button" class="btn ghost" data-x="sh">' + ic('share') + 'Share</button><button type="button" class="btn ghost" data-x="rp">' + ic('warn') + 'Report</button></div>', { stack: true });
      $('[data-x="pay"]', w).onclick = function () { K.closeSheets(); F.sendSheet({ u: to, x: m.name }); };
      $('[data-x="sh"]', w).onclick = function () { K.shareText(m.name, m.name + ' accepts Pi · ' + m.city + ', ' + m.country + '\nPay with DigitalSaudi:\n' + K.payLink({ u: to, x: m.name })); };
      $('[data-x="rp"]', w).onclick = function () {
        if (!K.signedIn()) return toast('Sign in with Pi to report');
        K.api('/merchants', { a: 'report', accessToken: K.token(), id: m.id }).then(function (d) { toast(d && d.ok ? 'Report sent. Thank you.' : (d && d.error) || 'Could not send the report'); }).catch(function () { toast('No connection. Try again.'); });
      };
    }
    function smallLogo(src) {
      return new Promise(function (ok) { if (!src) return ok(''); var i = new Image(); i.onload = function () { try { var c = document.createElement('canvas'); c.width = c.height = 96; var x = c.getContext('2d'); x.fillStyle = '#fff'; x.fillRect(0, 0, 96, 96); var s0 = Math.min(i.width, i.height); x.drawImage(i, (i.width - s0) / 2, (i.height - s0) / 2, s0, s0, 0, 0, 96, 96); ok(c.toDataURL('image/jpeg', 0.8)); } catch (e) { ok(''); } }; i.onerror = function () { ok(''); }; i.src = src; });
    }
    function dirEdit() {
      if (!K.signedIn()) return toast('Sign in with Pi to list your business');
      var b = biz(), cur = null;
      var w = sheet('List my business', '<p class="sh-sub">Pioneers find you in the DigitalSaudi directory and pay you in Pi.</p>' +
        '<label class="l" for="de-n">Business name</label><input class="in" id="de-n" maxlength="60" value="' + esc(b.name || bizName()) + '">' +
        '<label class="l">Category</label><div class="chips" id="de-c">' + DCAT.map(function (c, i) { return '<button type="button" class="chip' + (i === 0 ? ' on' : '') + '" data-ec="' + c[0] + '">' + c[1] + '</button>'; }).join('') + '</div>' +
        '<div class="two bz-two"><div><label class="l" for="de-ci">City</label><input class="in" id="de-ci" maxlength="40"></div><div><label class="l" for="de-co">Country</label><input class="in" id="de-co" maxlength="40"></div></div>' +
        '<label class="l" for="de-a">About (optional)</label><textarea class="in" id="de-a" rows="3" maxlength="200" placeholder="What you sell, opening hours, delivery">' + '</textarea>' +
        '<label class="l">Payments go to</label><div class="chips" id="de-t"><button type="button" class="chip on" data-et="user">@' + esc(K.me()) + '</button>' + (get('addr', '') ? '<button type="button" class="chip" data-et="addr">' + esc(K.short(get('addr', ''))) + '</button>' : '') + '</div>' +
        '<label class="tg rt-tg"><input type="checkbox" id="de-lg"' + (b.logo ? ' checked' : ' disabled') + '><span>Show my logo</span></label>' +
        '<button type="button" class="btn" id="de-go">' + ic('check') + 'Publish listing</button><button type="button" class="btn danger" id="de-rm" hidden>' + ic('trash') + 'Remove my listing</button>', { stack: true });
      var cat = 'food', tg = 'user';
      $$('[data-ec]', w).forEach(function (x) { x.onclick = function () { cat = x.dataset.ec; $$('[data-ec]', w).forEach(function (y) { y.classList.toggle('on', y === x); }); }; });
      $$('[data-et]', w).forEach(function (x) { x.onclick = function () { tg = x.dataset.et; $$('[data-et]', w).forEach(function (y) { y.classList.toggle('on', y === x); }); }; });
      K.api('/merchants', { a: 'mine', accessToken: K.token() }).then(function (d) {
        cur = d && d.item; if (!cur || !document.body.contains(w)) return;
        $('#de-n', w).value = cur.name; $('#de-ci', w).value = cur.city; $('#de-co', w).value = cur.country; $('#de-a', w).value = cur.about || ''; cat = cur.cat; $$('[data-ec]', w).forEach(function (y) { y.classList.toggle('on', y.dataset.ec === cat); });
        if (K.isG(cur.target)) { tg = 'addr'; $$('[data-et]', w).forEach(function (y) { y.classList.toggle('on', y.dataset.et === 'addr'); }); }
        $('#de-go', w).lastChild.textContent = 'Update listing'; $('#de-rm', w).hidden = false;
      }).catch(function () {});
      $('#de-go', w).onclick = function () {
        var bt = this, L = { name: $('#de-n', w).value.trim(), cat: cat, city: $('#de-ci', w).value.trim(), country: $('#de-co', w).value.trim(), about: $('#de-a', w).value.trim(), target: tg === 'addr' ? get('addr', '') : K.me() };
        if (!L.name) return toast('Enter the business name'); if (!L.city || !L.country) return toast('Enter the city and country');
        bt.disabled = true;
        smallLogo($('#de-lg', w).checked ? b.logo : '').then(function (lg) { L.logo = lg; return K.api('/merchants', { a: 'set', accessToken: K.token(), listing: L }); }).then(function (d) {
          bt.disabled = false; if (!d || !d.ok) return toast((d && d.error) || 'Could not publish. Try again.');
          toast(d.hidden ? 'Saved. Your listing is under review after reports.' : 'Your business is listed'); dirSheet(L.name);
        }).catch(function () { bt.disabled = false; toast('No connection. Try again.'); });
      };
      $('#de-rm', w).onclick = function () { K.api('/merchants', { a: 'off', accessToken: K.token() }).then(function (d) { if (d && d.ok) { toast('Listing removed'); dirSheet(); } }).catch(function () { toast('No connection. Try again.'); }); };
    }

    /* ── online checkout: a payment link and a "Pay with Pi" button for a website; paid orders are confirmed automatically ── */
    function checkoutSheet() {
      if (K.needTarget('Online checkout')) return;
      var W = invs().filter(function (v) { return v.web; }).slice(0, 20);
      var w = sheet('Online checkout', '<p class="sh-sub">Sell on your website or social page. Each order gets its own link and is marked paid when the Pi arrives.</p>' +
        '<label class="l" for="oc-d">Item or order</label><input class="in" id="oc-d" maxlength="60" placeholder="e.g. Order 1052 · 2 T-shirts">' +
        '<label class="l" for="oc-a">Amount</label><div class="amt sm"><input id="oc-a" type="number" inputmode="decimal" placeholder="0.00"><span>π</span></div><div class="hint num" id="oc-c"></div>' +
        '<button type="button" class="btn" id="oc-go">' + ic('link') + 'Create checkout link</button>' +
        '<div class="day">Recent orders</div><div class="list">' + (W.length ? W.map(invRow).join('') : '<div class="empty">' + ic('link') + '<div>Orders you create appear here with their status.</div></div>') + '</div>');
      bindInvRows(w);
      var ai = $('#oc-a', w); ai.oninput = function () { $('#oc-c', w).textContent = conv(r7(ai.value)); };
      $('#oc-go', w).onclick = function () {
        var d0 = $('#oc-d', w).value.trim(), a = r7(ai.value);
        if (!d0) return toast('Describe the item or order'); if (!(a >= 0.01)) return toast('Enter an amount of at least 0.01 π');
        var v = issue({ to: K.myTarget(), cname: 'Online order', cto: '', items: [{ d: d0, q: 1, p: a }], term: 0, title: d0 }, '');
        saveInvs(invs().map(function (x) { if (x.id === v.id) x.web = true; return x; })); K.rerender(); checkoutView(v.id);
      };
    }
    function checkoutView(id) {
      var v = invs().filter(function (x) { return x.id === id; })[0]; if (!v) return;
      var link = invLink(v), btn = '<a href="' + link + '" target="_blank" rel="noopener" style="display:inline-block;padding:12px 22px;border-radius:12px;background:linear-gradient(135deg,#1AC271,#B0841C);color:#fff;font:600 16px Arial,sans-serif;text-decoration:none">Pay ' + fpi(v.total) + ' π with DigitalSaudi</a>';
      var w = sheet('Checkout ' + v.no, '<div class="qs-pay"><div class="qs-amt num bz-amt">' + fpi(v.total) + ' π</div><div class="small muted">' + esc(v.items[0].d) + '</div><div class="qr qs-qr">' + (window.FPQR ? FPQR.svg(link, 200, '#084427') : '') + '</div><div class="qs-st' + (status(v) === 'Paid' ? ' ok' : '') + '">' + (status(v) === 'Paid' ? ic('check') + 'Paid' : '<span class="qs-dot"></span>Waiting for payment') + ' · ' + esc(v.no) + '</div></div>' +
        '<div class="two"><button type="button" class="btn" data-x="lk">' + ic('share') + 'Share link</button><button type="button" class="btn ghost" data-x="cp">' + ic('copy') + 'Copy link</button></div>' +
        '<label class="l">Button for your website</label><div class="oc-prev">' + btn + '</div><button type="button" class="btn soft" data-x="code">' + ic('copy') + 'Copy button code</button>', { stack: true });
      $('[data-x="lk"]', w).onclick = function () { K.shareText(v.items[0].d, v.items[0].d + ' · ' + fpi(v.total) + ' π\nPay with DigitalSaudi:\n' + link); };
      $('[data-x="cp"]', w).onclick = function () { K.copy(link); };
      $('[data-x="code"]', w).onclick = function () { K.copy(btn); };
    }

    /* ── recurring requests ── */
    function recSheet() {
      var R = recs();
      var w = sheet('Recurring requests',         '<div class="list">' + (R.length ? R.map(function (x) { var c = calc(x.tpl); return '<div class="li"><span class="ico' + (x.off ? '' : ' in') + '">' + ic('repeat') + '</span><span class="grow"><b>' + esc(x.tpl.cname) + ' · <span class="num bz-amt">' + fpi(c.total) + ' π</span></b><small>' + FQ[x.freq] + ' · ' + (x.off ? 'Paused' : 'next ' + dstr(x.next)) + ' · ' + esc(x.tpl.title || '') + '</small></span><button type="button" class="tbtn" data-rm="' + x.id + '" aria-label="Options">' + ic('edit') + '</button></div>'; }).join('')
          : '<div class="empty">' + ic('repeat') + '<div>No recurring requests. Choose Every week or Every month when you create an invoice.</div></div>') + '</div>' +
        '<button type="button" class="btn" data-x="new">' + ic('plus') + 'New recurring invoice</button>');
      $('[data-x="new"]', w).onclick = function () { invEdit('', { tpl: { freq: 'monthly' } }); };
      $$('[data-rm]', w).forEach(function (b) {
        b.onclick = function () {
          var x = recs().filter(function (q) { return q.id === b.dataset.rm; })[0]; if (!x) return;
          var w2 = sheet(x.tpl.cname + ' · ' + FQ[x.freq], '<div class="list">' + row('inv', 'Create invoice now', 'Issued today, outside the schedule', 'r-now', ' data-xa="now"') + row(x.off ? 'repeat' : 'x', x.off ? 'Resume' : 'Pause', x.off ? 'Create invoices on schedule again' : 'Stop creating invoices for now', 'r-tog', ' data-xa="tog"') + row('trash', 'Delete', 'Invoices already created are kept', 'r-del', ' data-xa="del"') + '</div>', { stack: true });
          $$('[data-xa]', w2).forEach(function (q) { q.removeAttribute('data-act'); q.onclick = function () { if (q.dataset.xa === 'now') { var v = issue(x.tpl, x.id); toast(v.no + ' created'); K.rerender(); return invView(v.id); } var L = recs(); if (q.dataset.xa === 'tog') L = L.map(function (y) { if (y.id === x.id) { y.off = !y.off; if (!y.off) { while (y.next <= Date.now()) y.next = adv(y.next, y.freq); } } return y; }); else L = L.filter(function (y) { return y.id !== x.id; }); put('recur', L); recSheet(); }; });
        };
      });
    }

    /* ── sales dashboard ── */
    function chart(p) {
      var rg = range(p), S = sales(), B = [], lab = [];
      if (p === 'today') { for (var h = 0; h < 24; h++) { B.push(0); lab.push(h % 6 ? '' : String(h).padStart(2, '0')); } S.forEach(function (r) { if (r.ts >= rg[0] && r.ts < rg[1]) B[new Date(r.ts).getHours()] += Number(r.amount); }); }
      else { var n = Math.round((day0() - rg[0]) / 864e5) + 1; for (var i = 0; i < n; i++) { var d = new Date(rg[0] + i * 864e5 + 3600e3); B.push(0); lab.push(n <= 7 ? d.toLocaleDateString('en-GB', { weekday: 'short' }) : (i % 5 ? '' : String(d.getDate()))); } S.forEach(function (r) { if (r.ts >= rg[0] && r.ts < rg[1]) { var k = Math.floor((day0(r.ts) - rg[0]) / 864e5 + 0.01); if (k >= 0 && k < B.length) B[k] += Number(r.amount); } }); }
      var mx = Math.max.apply(null, B.concat([0])), W = 320, H = 120, bw = W / B.length;
      return '<svg class="bz-ch" viewBox="0 0 ' + W + ' ' + (H + 18) + '" preserveAspectRatio="none" role="img" aria-label="Sales chart"><defs><linearGradient id="bzg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#B0841C"/><stop offset="1" stop-color="#1AC271"/></linearGradient></defs>' +
        [0.5, 1].map(function (f) { return '<line x1="0" x2="' + W + '" y1="' + (H - H * f + 2) + '" y2="' + (H - H * f + 2) + '" stroke="#E3EFE9" stroke-dasharray="3 4"/>'; }).join('') +
        B.map(function (v, i) { var h = mx ? Math.max(v ? 3 : 1.5, v / mx * (H - 8)) : 1.5; return '<rect x="' + (i * bw + bw * 0.18).toFixed(2) + '" y="' + (H - h).toFixed(2) + '" width="' + (bw * 0.64).toFixed(2) + '" height="' + h.toFixed(2) + '" rx="' + Math.min(3, bw * 0.3).toFixed(2) + '" fill="' + (v ? 'url(#bzg)' : '#E3EFE9') + '"><title>' + fpi(r7(v)) + ' π</title></rect>'; }).join('') +
        lab.map(function (l, i) { return l ? '<text x="' + (i * bw + bw / 2).toFixed(2) + '" y="' + (H + 14) + '" text-anchor="middle" font-size="9" fill="#64748B">' + l + '</text>' : ''; }).join('') + '</svg>' + (mx ? '' : '<p class="small muted" style="text-align:center;margin-top:-4px">No sales in this period yet.</p>');
    }
    function bizSheet(p) {
      p = p || get('bzP', '7d'); put('bzP', p);
      var rg = range(p), S = sales().filter(function (r) { return r.ts >= rg[0] && r.ts < rg[1]; }), tot = sum(S), V = invs(), etot = esum(expIn(rg[0], rg[1])), rtot = retIn(rg[0], rg[1]), prof = r7(tot - rtot - etot);
      var open = V.filter(function (v) { return /Unpaid|Part paid|Overdue/.test(status(v)); }), od = open.filter(function (v) { return status(v) === 'Overdue'; }), out = r7(open.reduce(function (a, v) { return a + balance(v); }, 0));
      var items = {}; V.forEach(function (v) { if (status(v) === 'Paid' && (v.pts || v.ts) >= rg[0] && (v.pts || v.ts) < rg[1]) v.items.forEach(function (it) { if (it.tip) return; var k = it.d.trim(); items[k] = items[k] || [0, 0]; items[k][0] += r7(it.q * it.p); items[k][1] += Number(it.q); }); });
      var TI = Object.keys(items).map(function (k) { return [k, r7(items[k][0]), items[k][1]]; }).sort(function (a, b) { return b[1] - a[1]; }).slice(0, 5);
      var cu = {}; S.forEach(function (r) { var k = payer(r) || '—'; cu[k] = r7((cu[k] || 0) + Number(r.amount)); });
      var TC = Object.keys(cu).map(function (k) { return [k, cu[k]]; }).sort(function (a, b) { return b[1] - a[1]; }).slice(0, 5), topv = TC.length ? TC[0][1] : 0, topi = TI.length ? TI[0][1] : 0;
      var b = biz();
      var w = sheet('DigitalSaudi Business', '<div class="bz-head"><div class="bz-lg sm">' + (b.logo ? '<img alt="" src="' + esc(b.logo) + '">' : ic('store')) + '</div><div class="grow"><b>' + esc(bizName()) + '</b><small>' + (b.name ? esc(b.addr || K.NETN) : '<button type="button" class="lnk small" data-x="prof">Add your business profile</button>') + '</small></div><button type="button" class="tbtn" data-x="prof" aria-label="Business profile">' + ic('edit') + '</button></div>' +
        '<div class="seg bz-seg" role="tablist">' + [['today', 'Today'], ['7d', '7 days'], ['30d', '30 days'], ['month', 'Month']].map(function (x) { return '<button type="button" data-bp="' + x[0] + '" class="' + (p === x[0] ? 'on' : '') + '">' + x[1] + '</button>'; }).join('') + '</div>' +
        '<div class="bz-kpi"><div class="bz-k1"><small>Sales · ' + esc(rg[2]) + '</small><b class="num bz-amt">' + fpi(tot) + ' π</b><span class="bz-amt">' + S.length + ' payment' + (S.length === 1 ? '' : 's') + (S.length ? ' · average ' + fpi(Math.round(tot / S.length * 100) / 100) + ' π' : '') + (conv(tot) ? ' · ' + esc(conv(tot)) : '') + '</span></div>' +
        '<button type="button" class="bz-kb" data-x="b-exp"><small>Expenses</small><b class="num bz-amt">' + fpi(etot) + ' π</b></button><button type="button" class="bz-kb' + (prof < 0 ? ' bad' : '') + '" data-x="b-pro"><small>Profit</small><b class="num bz-amt">' + (prof < 0 ? '−' : '') + fpi(Math.abs(prof)) + ' π</b></button><div class="' + (od.length ? 'bad' : '') + '"><small>Outstanding</small><b class="num bz-amt">' + fpi(out) + ' π</b><span>' + open.length + ' open' + (od.length ? ' · ' + od.length + ' overdue' : '') + '</span></div></div>' +
        '<div class="card bz-card">' + chart(p) + '</div>' +
        '<div class="bz-grid">' + [['card', 'Quick sale', 'b-sale'], ['inv', 'New invoice', 'b-new'], ['rcpt', 'Invoices', 'b-inv'], ['tag', 'Products', 'b-prod'], ['users', 'Customers', 'b-cus'], ['exp', 'Expenses', 'b-exp'], ['sun', 'Day summary', 'b-day'], ['user', 'Staff', 'b-staff'], ['pct', 'Tax summary', 'b-tax'], ['link', 'Online checkout', 'b-web'], ['store', 'Directory', 'b-dir'], ['repeat', 'Recurring', 'b-rec'], ['store', 'My Pi QR', 'b-qr'], ['bars', 'Reports', 'b-rep']].map(function (x, i) { return '<button type="button" class="bz-a c' + i + '" data-x="' + x[2] + '"><i>' + ic(x[0]) + '</i><span>' + x[1] + '</span></button>'; }).join('') + '</div>' +
        (open.length ? '<div class="day">Open invoices</div><div class="list">' + open.slice(0, 4).map(invRow).join('') + '</div>' : '') +
        '<div class="day">Top customers</div>' + (TC.length ? '<div class="card bz-card">' + TC.map(function (x) { return '<div class="cat"><div class="row"><span>' + esc(K.isG(x[0]) ? K.short(x[0]) : who(x[0])) + '</span><b class="num bz-amt">' + fpi(x[1]) + ' π</b></div><div class="bar"><i style="width:' + Math.max(4, x[1] / topv * 100) + '%"></i></div></div>'; }).join('') + '</div>' : '<div class="list"><div class="empty">No payments received in this period.</div></div>') +
        '<div class="day">Top items</div>' + (TI.length ? '<div class="card bz-card">' + TI.map(function (x) { return '<div class="cat"><div class="row"><span>' + esc(x[0]) + ' <small class="muted">× ' + fpi(x[2]) + '</small></span><b class="num bz-amt">' + fpi(x[1]) + ' π</b></div><div class="bar"><i style="width:' + Math.max(4, x[1] / topi * 100) + '%"></i></div></div>'; }).join('') + '</div>' : '<div class="list"><div class="empty">Items from paid invoices appear here.</div></div>'));
      $$('[data-bp]', w).forEach(function (q) { q.onclick = function () { bizSheet(q.dataset.bp); }; });
      $$('[data-x="prof"]', w).forEach(function (q) { q.onclick = profSheet; });
      var go = { 'b-exp': function () { expSheet(p === '7d' || p === '30d' || p === 'today' ? p : 'month'); }, 'b-pro': function () { expSheet(p); }, 'b-day': function () { daySheet(); }, 'b-staff': function () { staffSheet(); }, 'b-web': function () { checkoutSheet(); }, 'b-dir': function () { dirEdit(); }, 'b-tax': function () { taxSheet(); }, 'b-sale': function () { saleSheet(); }, 'b-prod': function () { prodSheet(); }, 'b-new': function () { invEdit(''); }, 'b-inv': function () { invList(); }, 'b-cus': function () { custSheet(); }, 'b-rec': recSheet, 'b-qr': qrSheet, 'b-rep': repSheet };
      Object.keys(go).forEach(function (k) { $$('[data-x="' + k + '"]', w).forEach(function (q) { q.onclick = go[k]; }); });
      bindInvRows(w);
    }

    /* ── reports ── */
    /* ── business report: one A4 page with sales, invoices, products, customers and a document ID ── */
    var PLAB = { month: 'This month', last: 'Last month', '30d': 'Last 30 days', all: 'All time' };
    function perRg(per) { var n = Date.now(); if (per === 'all') return [0, n + 1]; if (per === '30d') return [day0() - 29 * 864e5, n + 1]; var d = new Date(day0()); d.setDate(1); if (per === 'last') { var e = d.getTime(); d.setMonth(d.getMonth() - 1); return [d.getTime(), e]; } return [d.getTime(), n + 1]; }
    function perName(per) { var r = perRg(per); if (per === 'month' || per === 'last') return new Date(r[0]).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }); if (per === 'all') return 'All time'; return dstr(r[0]) + ' – ' + dstr(Date.now()); }
    function repData(per) {
      var r = perRg(per), S = sales().filter(function (x) { return x.ts >= r[0] && x.ts < r[1]; }), tot = sum(S);
      var V = invs().filter(function (v) { return !v.void && v.ts >= r[0] && v.ts < r[1]; });
      var paid = V.filter(function (v) { return status(v) === 'Paid'; }), open = invs().filter(function (v) { return /Unpaid|Part paid|Overdue/.test(status(v)); }), od = open.filter(function (v) { return status(v) === 'Overdue'; });
      var items = {}; invs().forEach(function (v) { if (status(v) === 'Paid' && (v.pts || v.ts) >= r[0] && (v.pts || v.ts) < r[1]) v.items.forEach(function (it) { if (it.tip) return; var k = it.d.trim(); items[k] = items[k] || [0, 0]; items[k][0] += r7(it.q * it.p); items[k][1] += Number(it.q); }); });
      var TI = Object.keys(items).map(function (k) { return [k, r7(items[k][0]), items[k][1]]; }).sort(function (a, b) { return b[1] - a[1]; }).slice(0, 6);
      var cu = {}, cn = {}; S.forEach(function (x) { var k = payer(x) || '—'; cu[k] = r7((cu[k] || 0) + Number(x.amount)); cn[k] = (cn[k] || 0) + 1; });
      var TC = Object.keys(cu).map(function (k) { return [K.isG(k) ? K.short(k) : who(k), cu[k], cn[k]]; }).sort(function (a, b) { return b[1] - a[1]; }).slice(0, 6);
      // chart: days (or months for all time)
      var B = [], L = [];
      if (per === 'all') { var d0 = new Date(day0()); d0.setDate(1); d0.setMonth(d0.getMonth() - 11); for (var m = 0; m < 12; m++) { var a = new Date(d0); a.setMonth(a.getMonth() + m); var e = new Date(a); e.setMonth(e.getMonth() + 1); B.push(sum(S.filter(function (x) { return x.ts >= a.getTime() && x.ts < e.getTime(); }))); L.push(a.toLocaleDateString('en-GB', { month: 'short' })); } }
      else { var end = Math.min(r[1], Date.now()), n = Math.max(1, Math.round((day0(end) - r[0]) / 864e5) + 1); for (var i = 0; i < n; i++) { var t = r[0] + i * 864e5; B.push(sum(S.filter(function (x) { return day0(x.ts) === day0(t + 3600e3); }))); L.push(String(new Date(t + 3600e3).getDate())); } }
      var E = expIn(r[0], r[1]), et = esum(E), rt = retIn(r[0], r[1]);
      return { S: S, tot: tot, E: E, et: et, rt: rt, pr: r7(tot - rt - et), V: V, paid: paid, open: open, od: od, TI: TI, TC: TC, B: B, L: L, out: r7(open.reduce(function (a, v) { return a + balance(v); }, 0)) };
    }
    function docIdOf(str) {
      try { return crypto.subtle.digest('SHA-256', new TextEncoder().encode(str)).then(function (b) { var u = new Uint8Array(b), A = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789', c = ''; for (var k = 0; k < 10; k++) c += A[u[k] % 32]; return 'FPR-' + c.slice(0, 5) + '-' + c.slice(5); }).catch(function () { return ''; }); } catch (e) { return Promise.resolve(''); }
    }
    function reportCanvas(per) {
      var b = biz(), D = repData(per), FR = window.FPReceipt || {}, me = K.myTarget();
      var src = ['wallet-report', K.NETN, me, per, perName(per), D.tot, D.S.length, D.et].concat(D.S.map(function (x) { return (x.txid || x.pid) + '|' + x.amount; })).join('\n');
      return Promise.all([loadImg(b.logo || 'icon-512.png'), docIdOf(src)]).then(function (res) {
        var logo = res[0], DOC = res[1], W = 1240, H = 1754, X = 80, cv = document.createElement('canvas'); cv.width = W; cv.height = H; var x = cv.getContext('2d');
        x.fillStyle = '#FFFFFF'; x.fillRect(0, 0, W, H);
        if (FR.guilloche) { FR.guilloche(x, 0, 300, W, H - 300, '#21BC71', .035); FR.rosette(x, W / 2, 980, 340, '#997215', .04); }
        var g = x.createLinearGradient(0, 0, W, 300); g.addColorStop(0, '#084427'); g.addColorStop(.6, '#1AC271'); g.addColorStop(1, '#9B7213'); x.fillStyle = g; x.fillRect(0, 0, W, 290);
        if (FR.guilloche) FR.guilloche(x, 0, 0, W, 290, '#FFFFFF', .1);
        if (logo) { x.save(); rr(x, X, 64, 112, 112, 26); x.clip(); x.fillStyle = '#fff'; x.fillRect(X, 64, 112, 112); x.drawImage(logo, X, 64, 112, 112); x.restore(); }
        x.font = '700 42px ' + FONT; T(x, fit(x, bizName(), 600), X + 140, 116, '700 42px ' + FONT, '#FFFFFF');
        x.font = '500 23px ' + FONT; T(x, fit(x, [b.addr, b.tax ? 'Tax ID ' + b.tax : ''].filter(Boolean).join(' · ') || (me ? (K.isG(me) ? K.short(me) : '@' + me) : ''), 600), X + 140, 156, '500 23px ' + FONT, 'rgba(255,255,255,.85)');
        T(x, 'BUSINESS REPORT', W - X, 100, '700 22px ' + FONT, '#F1D89E', 'right');
        T(x, perName(per), W - X, 148, '800 38px ' + FONT, '#FFFFFF', 'right');
        T(x, 'Generated ' + dstr(Date.now()) + ' · ' + K.NETN, W - X, 186, '500 20px ' + FONT, 'rgba(255,255,255,.8)', 'right');
        // KPI cards
        var avg = D.S.length ? Math.round(D.tot / D.S.length * 100) / 100 : 0, cw = (W - 2 * X - 3 * 20) / 4, y = 330;
        [['SALES', fpi(D.tot) + ' π', D.S.length + ' payment' + (D.S.length === 1 ? '' : 's') + (D.S.length ? ' · avg ' + fpi(avg) + ' π' : ''), '#0E6038'], ['EXPENSES', fpi(D.et) + ' π', D.E.length + ' entr' + (D.E.length === 1 ? 'y' : 'ies') + (D.rt ? ' · returns ' + fpi(D.rt) + ' π' : ''), '#0B2C1C'], ['PROFIT', (D.pr < 0 ? '−' : '') + fpi(Math.abs(D.pr)) + ' π', conv(Math.abs(D.pr)), D.pr < 0 ? '#B42318' : '#047857'], ['OUTSTANDING', fpi(D.out) + ' π', D.open.length + ' open' + (D.od.length ? ' · ' + D.od.length + ' overdue' : ''), D.od.length ? '#B42318' : '#0B2C1C']].forEach(function (k, i) {
          var cx = X + i * (cw + 20); x.fillStyle = i === 0 ? '#EFFEF7' : '#F5FBF8'; rr(x, cx, y, cw, 150, 20); x.fill(); x.strokeStyle = i === 0 ? 'rgba(26,194,113,.3)' : '#E3EFE9'; x.lineWidth = 2; x.stroke();
          T(x, k[0], cx + 22, y + 40, '700 17px ' + FONT, '#64748B'); x.font = '800 32px ' + MONO; T(x, fit(x, k[1], cw - 40), cx + 22, y + 88, '800 32px ' + MONO, k[3]);
          if (k[2]) { x.font = '500 16px ' + FONT; T(x, fit(x, k[2], cw - 40), cx + 22, y + 124, '500 16px ' + FONT, '#64748B'); }
        });
        // chart
        y = 530; T(x, per === 'all' ? 'SALES BY MONTH (π)' : 'SALES BY DAY (π)', X, y, '700 19px ' + FONT, '#64748B');
        var ch = 230, cy = y + 24, mx = Math.max.apply(null, D.B.concat([0])), bw = (W - 2 * X) / Math.max(1, D.B.length);
        x.strokeStyle = '#E3EFE9'; x.lineWidth = 1.5; [0, .5, 1].forEach(function (f) { var yy = cy + ch - ch * f; x.beginPath(); x.moveTo(X, yy); x.lineTo(W - X, yy); x.stroke(); });
        if (mx) T(x, fpi(r7(mx)), X, cy + 14, '600 15px ' + MONO, '#94A3B8');
        D.B.forEach(function (v, i) { var h = mx ? Math.max(v ? 4 : 0, v / mx * (ch - 10)) : 0; if (!h) return; var gg = x.createLinearGradient(0, cy + ch - h, 0, cy + ch); gg.addColorStop(0, '#B0841C'); gg.addColorStop(1, '#1AC271'); x.fillStyle = gg; rr(x, X + i * bw + bw * .18, cy + ch - h, Math.max(2, bw * .64), h, Math.min(6, bw * .3)); x.fill(); });
        var step = Math.ceil(D.L.length / 16); D.L.forEach(function (l, i) { if (i % step === 0 || i === D.L.length - 1) T(x, l, X + i * bw + bw / 2, cy + ch + 26, '500 15px ' + FONT, '#64748B', 'center'); });
        if (!mx) T(x, 'No sales in this period', W / 2, cy + ch / 2, '600 22px ' + FONT, '#94A3B8', 'center');
        // tables
        y = 860; var colW = (W - 2 * X - 40) / 2;
        function table(cx, title, head, rows, empty) {
          T(x, title, cx, y, '700 19px ' + FONT, '#64748B');
          x.fillStyle = '#F1FBF6'; rr(x, cx, y + 18, colW, 48, 12); x.fill();
          T(x, head[0], cx + 16, y + 50, '700 17px ' + FONT, '#2F4B3E'); T(x, head[1], cx + colW - 150, y + 50, '700 17px ' + FONT, '#2F4B3E', 'right'); T(x, head[2], cx + colW - 16, y + 50, '700 17px ' + FONT, '#2F4B3E', 'right');
          if (!rows.length) { T(x, empty, cx + 16, y + 110, '500 18px ' + FONT, '#94A3B8'); return; }
          rows.forEach(function (rw, i) { var yy = y + 108 + i * 52; x.font = '600 19px ' + FONT; T(x, fit(x, rw[0], colW - 230), cx + 16, yy, '600 19px ' + FONT, '#0B2C1C'); T(x, fpi(rw[2]), cx + colW - 150, yy, '500 18px ' + MONO, '#2F4B3E', 'right'); T(x, fpi(rw[1]) + ' π', cx + colW - 16, yy, '700 18px ' + MONO, '#0E6038', 'right'); x.fillStyle = '#EEF7F3'; x.fillRect(cx, yy + 18, colW, 1.5); });
        }
        table(X, 'TOP PRODUCTS AND SERVICES', ['Item', 'Qty', 'Amount'], D.TI, 'No paid items in this period');
        table(X + colW + 40, 'TOP CUSTOMERS', ['Customer', 'Payments', 'Amount'], D.TC, 'No payments received in this period');
        // invoices summary
        y = 1270; T(x, 'INVOICES AND SALES', X, y, '700 19px ' + FONT, '#64748B');
        var iv = [['Issued', D.V.length, r7(D.V.reduce(function (a, v) { return a + v.total; }, 0))], ['Paid', D.paid.length, r7(D.paid.reduce(function (a, v) { return a + v.total; }, 0))], ['Open now', D.open.length, D.out], ['Overdue now', D.od.length, r7(D.od.reduce(function (a, v) { return a + balance(v); }, 0))]];
        iv.forEach(function (k, i) { var cx = X + i * (cw + 20); x.fillStyle = '#F5FBF8'; rr(x, cx, y + 20, cw, 110, 18); x.fill(); T(x, k[0], cx + 20, y + 56, '600 18px ' + FONT, '#64748B'); T(x, String(k[1]), cx + 20, y + 104, '800 30px ' + MONO, i === 3 && k[1] ? '#B42318' : '#0B2C1C'); x.font = '600 19px ' + MONO; T(x, fit(x, fpi(k[2]) + ' π', cw - 90), cx + cw - 20, y + 104, '600 19px ' + MONO, '#2F4B3E', 'right'); });
        // footer
        x.fillStyle = '#E3EFE9'; x.fillRect(X, H - 150, W - 2 * X, 2);
        
        T(x, 'Created with DigitalSaudi · digitalsaudi.pi', X, H - 80, '500 17px ' + FONT, '#94A3B8');
        if (DOC) T(x, 'Document ID ' + DOC, W - X, H - 80, '700 17px ' + MONO, '#0E6038', 'right');
        if (FR.watermark) { FR.watermark(x, 0, 300, W, H - 460, 'DIGITALSAUDI BUSINESS REPORT · ' + bizName() + ' · ' + perName(per) + (DOC ? ' · ' + DOC : ''), .035); FR.microline(x, 'DIGITALSAUDI•BUSINESS REPORT•' + bizName().toUpperCase() + '•' + perName(per).toUpperCase() + '•' + (DOC || '') + '•', X, H - 40, W - 2 * X); }
        return cv;
      });
    }
    function reportSheet(per) {
      per = per || 'month';
      var w = sheet('Business report', '<div class="chips" id="br-p">' + Object.keys(PLAB).map(function (k) { return '<button type="button" class="chip' + (k === per ? ' on' : '') + '" data-bp2="' + k + '">' + PLAB[k] + '</button>'; }).join('') + '</div>' +
        '<div class="bz-prev">Preparing report…</div>' + fileBtns(''));
      $$('[data-bp2]', w).forEach(function (q) { q.onclick = function () { reportSheet(q.dataset.bp2); }; });
      var nm = perName(per).replace(/[^A-Za-z0-9]+/g, '-').replace(/^-|-$/g, '');
      fileActions(w, function () { return reportCanvas(per); }, 'DigitalSaudi-business-report-' + nm, 'business report', 'DigitalSaudi business report ' + perName(per), function () { return bizName() + ' · business report · ' + perName(per); });
    }

    function repSheet() {
      var per = 'month';
      var w = sheet('Business reports', '<label class="l">Period</label><div class="chips" id="rp-p">' + [['month', 'This month'], ['last', 'Last month'], ['30d', 'Last 30 days'], ['all', 'All time']].map(function (x) { return '<button type="button" class="chip' + (x[0] === per ? ' on' : '') + '" data-rp="' + x[0] + '">' + x[1] + '</button>'; }).join('') + '</div>' +
        '<div class="card" id="rp-s"></div>' +
        '<div class="list" style="margin-top:12px">' + row('bars', 'Business report (PDF)', 'Sales, invoices, products and customers on one page', 'x', ' data-xr="pdf"') + row('down', 'Sales report (CSV)', 'Every payment received, with values', 'x', ' data-xr="sales"') + row('inv', 'Invoices report (CSV)', 'Numbers, customers, status and balances', 'x', ' data-xr="inv"') + row('exp', 'Expenses report (CSV)', 'Every expense with its category', 'x', ' data-xr="exp"') + row('pct', 'Tax summary', 'Tax collected, by rate', 'x', ' data-xr="tax"') + row('sun', 'Day summary', 'Sales, expenses and profit for any day', 'x', ' data-xr="day"') + row('rcpt', 'Monthly statement (PDF)', 'All payments for a month', 'x', ' data-xr="st"') + '</div>');
      function rg() { var n = Date.now(); if (per === 'all') return [0, n + 1, 'all']; if (per === '30d') return [day0() - 29 * 864e5, n + 1, 'last-30-days']; var d = new Date(day0()); d.setDate(1); if (per === 'last') { var e = d.getTime(); d.setMonth(d.getMonth() - 1); return [d.getTime(), e, d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0')]; } return [d.getTime(), n + 1, d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0')]; }
      function info() { var r = rg(), S = sales().filter(function (x) { return x.ts >= r[0] && x.ts < r[1]; }), V = invs().filter(function (v) { return v.ts >= r[0] && v.ts < r[1]; }); var et = esum(expIn(r[0], r[1])), pr = r7(sum(S) - retIn(r[0], r[1]) - et); $('#rp-s', w).innerHTML = '<div class="stats" style="margin-top:0"><div><small>Sales</small><b class="bz-amt">' + fpi(sum(S)) + ' π</b></div><div><small>Expenses</small><b class="bz-amt">' + fpi(et) + ' π</b></div><div><small>Profit</small><b class="bz-amt' + (pr < 0 ? ' neg' : '') + '">' + (pr < 0 ? '−' : '') + fpi(Math.abs(pr)) + ' π</b></div></div><div class="small muted" style="margin-top:8px">' + S.length + ' payment' + (S.length === 1 ? '' : 's') + ' · ' + V.length + ' invoice' + (V.length === 1 ? '' : 's') + '</div>'; }
      $$('[data-rp]', w).forEach(function (b) { b.onclick = function () { per = b.dataset.rp; $$('[data-rp]', w).forEach(function (x) { x.classList.toggle('on', x === b); }); info(); }; });
      info();
      $$('[data-xr]', w).forEach(function (b) {
        b.removeAttribute('data-act');
        b.onclick = function () {
          var r = rg(), k = b.dataset.xr;
          if (k === 'st') return K.A.statement();
          if (k === 'pdf') return reportSheet(per);
          if (k === 'day') return daySheet();
          if (k === 'tax') return taxSheet(per);
          if (k === 'exp') {
            var X = expIn(r[0], r[1]).sort(function (a, c) { return a.ts - c.ts; }); if (!X.length) return toast('No expenses in this period');
            return csvOut([['date', 'category', 'note', 'amount_pi', 'amount_local', 'currency']].concat(X.map(function (e) { return [iso(e.ts), e.cat, e.note || '', e.a, e.lv || '', e.lc || '']; })), 'DigitalSaudi-expenses-' + r[2] + '.csv', 'DigitalSaudi expenses report');
          }
          if (k === 'sales') {
            var S = sales().filter(function (x) { return x.ts >= r[0] && x.ts < r[1]; }).sort(function (a, c) { return a.ts - c.ts; });
            if (!S.length) return toast('No sales in this period');
            return csvOut([['date', 'time', 'customer', 'customer_pi', 'amount_pi', 'value_usd', 'value_local', 'currency', 'narration', 'invoice', 'network', 'transaction_id', 'reference']].concat(S.map(function (x) { var d = new Date(x.ts), v = invFor(x); var cu = custFor(payer(x)); return [iso(x.ts), d.toTimeString().slice(0, 5), cu ? cu.name : '', payer(x), x.amount, x.usd ? (x.amount * x.usd).toFixed(2) : '', x.lr ? (x.amount * x.lr).toFixed(2) : '', x.lc || '', x.narr || '', v ? v.no : '', x.net || '', x.txid || '', x.pid || '']; })), 'DigitalSaudi-sales-' + r[2] + '.csv', 'DigitalSaudi sales report');
          }
          var V = invs().filter(function (v) { return v.ts >= r[0] && v.ts < r[1]; }).sort(function (a, c) { return a.ts - c.ts; });
          if (!V.length) return toast('No invoices in this period');
          csvOut([['invoice', 'customer', 'customer_pi', 'issued', 'due', 'status', 'items', 'subtotal_pi', 'discount_pi', 'tax_percent', 'total_pi', 'paid_pi', 'balance_pi', 'paid_on']].concat(V.map(function (v) { var c = calc(v); return [v.no, v.cname || '', v.cto || '', iso(v.ts), v.due ? iso(v.due) : '', status(v), v.items.map(function (it) { return it.d + ' x' + it.q + ' @' + it.p; }).join('; '), c.sub, c.disc, v.tax || 0, v.total, v.mpaid ? v.total : (v.paid || 0), balance(v), v.pts ? iso(v.pts) : '']; })), 'DigitalSaudi-invoices-' + r[2] + '.csv', 'DigitalSaudi invoices report');
        };
      });
    }

    /* ── entry points ── */
    K.HK.html.home = function () {
      var b = biz(), V = invs(); if (!b.name && !V.length) return '';
      var t = sales().filter(function (r) { return r.ts >= day0(); }), open = V.filter(function (v) { return /Unpaid|Part paid|Overdue/.test(status(v)); });
      return '<button type="button" class="bz-strip" data-act="biz" style="margin-top:14px"><span class="bz-si">' + (b.logo ? '<img alt="" src="' + esc(b.logo) + '">' : ic('store')) + '</span><span class="grow"><b>' + esc(b.name || 'DigitalSaudi Business') + '</b><small>Today <span class="num bz-amt">' + fpi(sum(t)) + ' π</span>' + (open.length ? ' · ' + open.length + ' open invoice' + (open.length === 1 ? '' : 's') : '') + '</small></span><span class="go">' + ic('chev') + '</span></button>';
    };
    K.HK.html.pay = function () {
      return '<div class="sec"><h2>Business</h2><button type="button" data-act="biz">Dashboard</button></div><div class="tiles">' +
        '<button type="button" class="tile" data-act="invs"><i>' + ic('inv') + '</i><b>Invoices</b><small>Items, due dates, paid automatically</small></button>' +
        '<button type="button" class="tile" data-act="myqr"><i class="t">' + ic('qr') + '</i><b>My Pi QR</b><small>A poster to print or share</small></button>' +
        '<button type="button" class="tile" data-act="cust"><i class="n">' + ic('users') + '</i><b>Customers</b><small>Client records and payment history and what is due</small></button>' +
        '<button type="button" class="tile" data-act="recur"><i class="a">' + ic('repeat') + '</i><b>Recurring requests</b><small>Weekly or monthly invoices</small></button></div>';
    };
    K.HK.html.profile = function () {
      var b = biz(), open = invs().filter(function (v) { return /Unpaid|Part paid|Overdue/.test(status(v)); }).length;
      return '<div class="sec"><h2>Business</h2></div><div class="list">' + row('store', 'DigitalSaudi Business', 'Sales, invoices and reports', 'biz') + row('edit', 'Business profile', b.name || 'Name, address and tax ID', 'bizprof') +
        row('inv', 'Invoices', open ? open + ' open' : 'Create and track invoices', 'invs') + row('users', 'Customers', custs().length ? custs().length + ' saved' : 'People and businesses who pay you', 'cust') +
        row('exp', 'Expenses', 'What the business spends, and its profit', 'expenses') + row('sun', 'Day summary', 'Today’s sales, expenses and profit', 'daysum') + row('user', 'Staff mode', get('staffC', {}).code ? 'Active · ' + (get('staffC', {}).staff || 'Staff') : 'Let staff take sales on their phone', 'staff') + row('repeat', 'Recurring requests', recs().length ? recs().length + ' active' : 'Weekly or monthly invoices', 'recur') + row('qr', 'My Pi QR', 'Poster to print or share', 'myqr') + '</div>';
    };
    K.HK.html.settings = function () { return row('sound', 'Voice announcements', get('voice', true) ? 'On · “DigitalSaudi! You have received … Pi.”' : 'Off', 'voice') + row('store', 'Business profile', biz().name ? K.NTYPE[K.nType() === 'name' ? 'business' : K.nType()].l + ' · ' + biz().name : 'Name, logo, address, tax ID', 'bizprof') + row('sound', 'Payment sounds', get('sound', true) ? 'On · sound and vibration' : 'Off', 'sound') + row(get('hide', false) ? 'eyeoff' : 'eye', 'Hide amounts', get('hide', false) ? 'On' : 'Off', 'hide'); };
    Object.assign(K.A, {
      biz: function () { bizSheet(); }, bizreport: function () { reportSheet(); }, expenses: function () { expSheet(); }, daysum: function () { daySheet(); }, staff: function () { staffSheet(); }, voice: function () { voiceSheet(); }, taxsum: function () { taxSheet(); }, goals: function () { goalSheet(); }, collect: function () { colSheet(); }, networth: function () { nwSheet(); }, directory: function () { dirSheet(); }, checkout: function () { checkoutSheet(); }, sale: function () { saleSheet(); }, prods: function () { prodSheet(); }, 'inv-new': function () { invEdit(''); }, invs: function () { invList(); }, cust: function () { custSheet(); }, recur: recSheet, myqr: qrSheet, bizprof: profSheet, reports: repSheet,
      hide: toggleHide,
      sound: function () { put('sound', !get('sound', true)); if (get('sound', true)) { ac(); fx('in'); } toast(get('sound', true) ? 'Payment sounds on' : 'Payment sounds off'); K.rerender(); }
    });
    // Manage rows inside the invoice sheet use data-act="x-…" with a local handler; mark them so the global router ignores them
    var _inv = invView; invView = function (id) { _inv(id); var w = $$('.sh-wrap').pop(); if (!w) return; $$('[data-act^="x-"]', w).forEach(function (b) { b.dataset.xa = b.dataset.act; b.removeAttribute('data-act'); }); bindManage(w, id); };
    function bindManage(w, id) {
      var v = invs().filter(function (x) { return x.id === id; })[0]; if (!v) return;
      function upd(fn, msg) { saveInvs(invs().map(function (x) { if (x.id === id) fn(x); return x; })); if (msg) toast(msg); K.rerender(); invView(id); }
      var acts = { 'x-paid': function () { upd(function (x) { x.mpaid = true; x.pts = Date.now(); }, v.no + ' marked as paid'); stockOut(id); fx('paid'); }, 'x-unpaid': function () { upd(function (x) { x.mpaid = false; if ((x.paid || 0) < x.total) x.pts = 0; }, v.no + ' marked as unpaid'); },
        'x-edit': function () { invEdit(id); }, 'x-dup': function () { invEdit('', { tpl: { cid: v.cid, cname: v.cname, cto: v.cto, cphone: v.cphone, cemail: v.cemail, items: v.items, disc: v.disc, tax: v.tax, notes: v.notes, term: v.due ? Math.max(0, Math.round((v.due - day0(v.ts)) / 864e5)) : 0 } }); },
        'x-ret': function () { retSheet(id); }, 'x-void': function () { upd(function (x) { x.void = true; }, v.no + ' cancelled'); }, 'x-del': function () { saveInvs(invs().filter(function (x) { return x.id !== id; })); toast(v.no + ' deleted'); K.rerender(); invList(); } };
      $$('[data-xa]', w).forEach(function (b) { if (acts[b.dataset.xa]) b.onclick = acts[b.dataset.xa]; });
    }

    try { var sq = /[?&]staff=([A-Za-z2-9]{20})\b/.exec(location.search); if (sq) { put('staffK', sq[1].toUpperCase()); history.replaceState(null, '', location.pathname); } } catch (e) {}
    if (staffMode()) return;
    matchAll(); checkRec();
    setInterval(function () { if (!document.hidden) checkRec(); }, 60000);
    document.addEventListener('visibilitychange', function () { if (!document.hidden) checkRec(); });
    if (!$('#app').hidden) K.rerender();
  }
  if (window.DigitalSaudi && window.DigitalSaudi.kit) boot(); else document.addEventListener('wallet:ready', boot);
})();

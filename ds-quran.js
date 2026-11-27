/* DigitalSaudi — The Holy Quran (same reader as Haramain) and the Forty Hadith of an-Nawawi.
   Quran: 114 surahs, Arabic (Uthmani) + English (Saheeh International), verse-by-verse recitation from 7 reciters,
   continue where you stopped, bookmarks, text size, recent surahs kept for offline reading.
   40 Hadith: all 42 hadith of Imam an-Nawawi's collection in Arabic and English. */
(function () {
  'use strict';
  var $ = function (id) { return document.getElementById(id); };
  var get = function (k, d) { try { return store.get(k, d); } catch (e) { return d; } };
  var put = function (k, v) { try { store.set(k, v); return true; } catch (e) { return false; } };
  var say = function (m) { try { toast(m); } catch (e) {} };
  var E = function (x) { return String(x == null ? '' : x).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var arNum = function (n) { return String(n).replace(/\d/g, function (d) { return '٠١٢٣٤٥٦٧٨٩'[d]; }); };
  var pad = function (x) { return ('00' + x).slice(-3); };
  var RECITERS = [
    ['alafasy', 'Mishary Rashid Alafasy', 'Alafasy_128kbps'], ['sudais', 'Abdurrahman As-Sudais', 'Abdurrahmaan_As-Sudais_192kbps'],
    ['shuraym', 'Saud Al-Shuraim', 'Saood_ash-Shuraym_128kbps'], ['maher', 'Maher Al-Muaiqly', 'Maher_AlMuaiqly_64kbps'],
    ['husary', 'Mahmoud Khalil Al-Husary', 'Husary_64kbps'], ['minshawi', 'Muhammad Siddiq Al-Minshawi', 'Minshawy_Murattal_128kbps'],
    ['basit', 'Abdul Basit Abdus Samad', 'Abdul_Basit_Murattal_64kbps']];
  var S = { list: null, surah: null, cur: null, playing: false, audio: new Audio(), pre: new Audio(), opt: get('qopt', { r: 'alafasy', en: true, fs: 26, rep: false }) };
  S.audio.preload = 'auto';

  /* ── Quran data ── */
  function loadList() {
    if (S.list) return Promise.resolve(S.list);
    var c = get('qlist', null); if (c) { S.list = c; return Promise.resolve(c); }
    var ok = function (d) { if (!d || !d.ok || !d.surahs) throw 0; S.list = d.surahs; put('qlist', d.surahs); return d.surahs; };
    // the surah list ships with the app (instant); the server is only a backup
    return fetch('/ds-quran-list.json').then(function (r) { return r.json(); }).then(ok)
      .catch(function () { return fetch('/quran?list=1').then(function (r) { return r.json(); }).then(ok); });
  }
  function loadSurah(n) {
    var cache = get('qs_' + n, null); if (cache) return Promise.resolve(cache);
    return fetch('/quran?surah=' + n).then(function (r) { return r.json(); }).then(function (d) {
      if (!d.ok) throw 0;
      var keep = get('qkeep', []).filter(function (x) { return x !== n; }); keep.unshift(n);
      while (keep.length > 6) { try { store.set('qs_' + keep.pop(), null); } catch (e) {} }
      put('qs_' + n, d); put('qkeep', keep); return d;
    });
  }

  /* ── player bar (stays above the panel while reading) ── */
  function ensureBar() {
    if ($('hq-bar')) return;
    var bar = document.createElement('div'); bar.id = 'hq-bar'; bar.style.display = 'none';
    bar.innerHTML = '<button type="button" id="hq-prev" aria-label="Previous verse">⏮</button><button type="button" id="hq-play" aria-label="Play">▶</button><button type="button" id="hq-next" aria-label="Next verse">⏭</button>' +
      '<div class="hq-now"><b id="hq-now-t">—</b><small id="hq-now-r"></small></div><button type="button" id="hq-rep" aria-label="Repeat verse">🔁</button><button type="button" id="hq-x" aria-label="Close player">✕</button>';
    document.body.appendChild(bar);
    $('hq-play').onclick = function () { if (S.playing) pause(); else if (S.cur) play(S.cur.s, S.cur.a); };
    $('hq-prev').onclick = function () { if (S.cur && S.cur.a > 1) play(S.cur.s, S.cur.a - 1); };
    $('hq-next').onclick = function () { next(); };
    $('hq-rep').onclick = function () { S.opt.rep = !S.opt.rep; put('qopt', S.opt); this.classList.toggle('on', S.opt.rep); say(S.opt.rep ? 'Repeating this verse' : 'Repeat off'); };
    $('hq-x').onclick = function () { pause(); bar.style.display = 'none'; document.documentElement.classList.remove('hq-playing'); };
    $('hq-rep').classList.toggle('on', !!S.opt.rep);
  }

  /* ── surah list ── */
  function home() {
    ensureBar();
    var last = get('qlast', null), bm = get('qbm', []);
    showPanel('The Holy Quran',
      '<div class="hq-intro">Read and listen · 114 surahs · 7 reciters</div>' +
      (last ? '<button type="button" class="hq-cont" onclick="DSQ.open(' + last.s + ',' + last.a + ')"><span>▶</span><div><b>Continue reading</b><small>' + E(last.name || ('Surah ' + last.s)) + ' · verse ' + last.a + '</small></div></button>' : '') +
      (bm.length ? '<div class="hq-lbl">🔖 Bookmarks</div><div class="hq-bms">' + bm.slice(0, 12).map(function (b) { return '<button type="button" onclick="DSQ.open(' + b.s + ',' + b.a + ')">' + E(b.name) + ' ' + b.s + ':' + b.a + '</button>'; }).join('') + '</div>' : '') +
      '<input class="hq-search" id="hq-q" type="search" placeholder="Search surah: name, meaning or number" autocomplete="off">' +
      '<div id="hq-list"><div class="empty">Loading surahs…</div></div>', { id: 'quran', share: false });
    loadList().then(drawList).catch(function () { var l = $('hq-list'); if (l) l.innerHTML = '<div class="empty">Could not load the surah list. Check your connection and try again.<br><button class="btn btn-ghost btn-sm" style="margin-top:10px" onclick="DSQ.home()">Try again</button></div>'; });
    $('hq-q').oninput = function () { drawList(S.list || []); };
    try { award('quran'); } catch (e) {}
  }
  function drawList(list) {
    var el = $('hq-list'); if (!el) return;
    var q = (($('hq-q') || {}).value || '').trim().toLowerCase();
    var f = list.filter(function (s) { return !q || String(s.n) === q || s.name.toLowerCase().replace(/[-']/g, '').indexOf(q.replace(/[-']/g, '')) >= 0 || s.tr.toLowerCase().indexOf(q) >= 0 || s.ar.indexOf(q) >= 0; });
    el.innerHTML = f.map(function (s) {
      return '<button type="button" class="hq-row" onclick="DSQ.open(' + s.n + ')"><span class="hq-num">' + s.n + '</span><span class="hq-t"><b>' + E(s.name) + '</b><small>' + E(s.tr) + ' · ' + s.v + ' verses · ' + (s.t === 'Meccan' ? 'Makki' : 'Madani') + '</small></span><span class="hq-ar" lang="ar">' + E(s.ar) + '</span></button>';
    }).join('') || '<div class="empty">No surah matches “' + E(q) + '”.</div>';
  }

  /* ── reading a surah ── */
  function open(n, a) {
    ensureBar();
    showPanel('The Holy Quran', '<div class="empty">Loading…</div>', { id: 'surah', share: false });
    loadSurah(n).then(function (d) { S.surah = d; drawSurah(d, a); }).catch(function () {
      if (current && current.id === 'surah') $('pBody').innerHTML = '<button type="button" class="hq-back" onclick="DSQ.home()">‹ Surahs</button><div class="empty">This surah could not be loaded. Check your connection and try again.<br><button class="btn btn-ghost btn-sm" style="margin-top:10px" onclick="DSQ.open(' + n + ')">Try again</button></div>';
    });
  }
  function drawSurah(d, a) {
    if (!current || current.id !== 'surah') return;
    var o = S.opt, bism = d.n !== 1 && d.n !== 9;
    $('pTitle').textContent = d.name;
    $('pBody').innerHTML = '<div class="hq-top"><button type="button" class="hq-back" onclick="DSQ.home()">‹ Surahs</button>' +
      '<div class="hq-tools"><button type="button" onclick="DSQ.size(-2)" aria-label="Smaller text">A−</button><button type="button" onclick="DSQ.size(2)" aria-label="Larger text">A+</button>' +
      '<button type="button" class="' + (o.en ? 'on' : '') + '" onclick="DSQ.toggleEn()">EN</button></div></div>' +
      '<div class="hq-head"><div class="hq-head-ar" lang="ar">' + E(d.ar) + '</div><div class="hq-head-en">' + E(d.name) + ' · ' + E(d.tr) + ' · ' + d.ayahs.length + ' verses</div>' +
      '<label class="hq-rec">Reciter <select id="hq-rsel">' + RECITERS.map(function (x) { return '<option value="' + x[0] + '"' + (x[0] === o.r ? ' selected' : '') + '>' + x[1] + '</option>'; }).join('') + '</select></label>' +
      '<button type="button" class="hq-playall" onclick="DSQ.play(' + d.n + ',1)">▶ Play surah</button></div>' +
      (bism ? '<div class="hq-bism" lang="ar">بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</div>' : '') +
      d.ayahs.map(function (y) {
        var t = y.ar;
        if (bism && y.k === 1) { var w = t.split(' '); if (/^بِسْمِ/.test(w[0]) && w.length > 4) t = w.slice(4).join(' '); }
        return '<div class="hq-ay" id="hq-a' + y.k + '"><div class="hq-ay-ar" lang="ar" dir="rtl" style="font-size:' + o.fs + 'px">' + E(t) + ' <span class="hq-end">' + arNum(y.k) + '</span></div>' +
          (o.en ? '<div class="hq-ay-en"><b>' + d.n + ':' + y.k + '</b> ' + E(y.en) + '</div>' : '') +
          '<div class="hq-ay-act"><button type="button" onclick="DSQ.play(' + d.n + ',' + y.k + ')">▶ Listen</button><button type="button" onclick="DSQ.bm(' + d.n + ',' + y.k + ')">🔖 Bookmark</button><button type="button" onclick="DSQ.share(' + y.k + ')">Share</button></div></div>';
      }).join('') +
      '<div class="hq-foot">' + (d.n > 1 ? '<button type="button" class="btn btn-ghost btn-sm" onclick="DSQ.open(' + (d.n - 1) + ')">‹ Previous surah</button>' : '<span></span>') + (d.n < 114 ? '<button type="button" class="btn btn-primary btn-sm" onclick="DSQ.open(' + (d.n + 1) + ')">Next surah ›</button>' : '') + '</div>' +
      '<div class="hq-src">Arabic: Uthmani script · English: Saheeh International · Audio: everyayah.com</div>';
    $('hq-rsel').onchange = function () { S.opt.r = this.value; put('qopt', S.opt); if (S.playing && S.cur) play(S.cur.s, S.cur.a); };
    var target = a ? $('hq-a' + a) : null;
    if (target) setTimeout(function () { target.scrollIntoView({ block: 'center' }); mark(a); }, 60); else $('pBody').scrollTop = 0;
    if (S.cur && S.cur.s === d.n) mark(S.cur.a);
    saveLast(d.n, a || 1);
  }
  function saveLast(s, a) { var name = S.surah && S.surah.n === s ? S.surah.name : (S.list ? (S.list[s - 1] || {}).name : ''); put('qlast', { s: s, a: a, name: name }); try { store.set('lastRead', { n: s, name: name }); } catch (e) {} }
  function mark(a) { document.querySelectorAll('.hq-ay.cur').forEach(function (e) { e.classList.remove('cur'); }); var e = $('hq-a' + a); if (e) e.classList.add('cur'); }

  /* ── audio ── */
  function rec() { return RECITERS.filter(function (x) { return x[0] === S.opt.r; })[0] || RECITERS[0]; }
  function src(s, a) { return 'https://everyayah.com/data/' + rec()[2] + '/' + pad(s) + pad(a) + '.mp3'; }
  function play(s, a) {
    ensureBar();
    S.cur = { s: s, a: a };
    var bar = $('hq-bar'); bar.style.display = ''; document.documentElement.classList.add('hq-playing');
    var name = (S.surah && S.surah.n === s) ? S.surah.name : ('Surah ' + s);
    $('hq-now-t').textContent = name + ' ' + s + ':' + a; $('hq-now-r').textContent = rec()[1];
    var au = S.audio, tried = false;
    au.onerror = function () { if (!tried) { tried = true; au.src = '/quran-audio?r=' + S.opt.r + '&s=' + s + '&a=' + a; au.play().catch(function () {}); } else { pause(); say('Audio could not load. Check your connection.'); } };
    au.onended = function () { if (S.opt.rep) { au.currentTime = 0; au.play().catch(function () {}); } else next(); };
    au.src = src(s, a); au.play().then(function () { S.playing = true; $('hq-play').textContent = '⏸'; }).catch(function () {});
    S.playing = true; $('hq-play').textContent = '⏸';
    mark(a); var e = $('hq-a' + a); if (e) e.scrollIntoView({ block: 'center', behavior: 'smooth' });
    saveLast(s, a);
    var total = S.surah && S.surah.n === s ? S.surah.ayahs.length : 0;
    if (total && a < total) { S.pre.src = src(s, a + 1); S.pre.preload = 'auto'; }
    if ('mediaSession' in navigator) { try { navigator.mediaSession.metadata = new MediaMetadata({ title: name + ' ' + s + ':' + a, artist: rec()[1], album: 'DigitalSaudi · The Holy Quran' }); navigator.mediaSession.setActionHandler('nexttrack', next); navigator.mediaSession.setActionHandler('pause', pause); navigator.mediaSession.setActionHandler('play', function () { play(S.cur.s, S.cur.a); }); } catch (e2) {} }
  }
  function pause() { try { S.audio.pause(); } catch (e) {} S.playing = false; var b = $('hq-play'); if (b) b.textContent = '▶'; }
  function next() {
    if (!S.cur) return;
    var total = S.surah && S.surah.n === S.cur.s ? S.surah.ayahs.length : 0;
    if (total && S.cur.a < total) play(S.cur.s, S.cur.a + 1); else { pause(); say('✅ Surah complete'); }
  }
  function shareText(title, text) {
    if (navigator.share) navigator.share({ title: title, text: text }).catch(function () {});
    else if (window.Pi && Pi.openShareDialog) { try { Pi.openShareDialog(title, text); } catch (e) {} }
    else { try { navigator.clipboard.writeText(text); say('Copied'); } catch (e) {} }
  }
  window.DSQ = {
    home: home, open: open, play: play,
    size: function (d) { S.opt.fs = Math.max(18, Math.min(40, S.opt.fs + d)); put('qopt', S.opt); document.querySelectorAll('.hq-ay-ar').forEach(function (e) { e.style.fontSize = S.opt.fs + 'px'; }); },
    toggleEn: function () { S.opt.en = !S.opt.en; put('qopt', S.opt); if (S.surah) drawSurah(S.surah, S.cur && S.cur.s === S.surah.n ? S.cur.a : null); },
    bm: function (s, a) {
      var b = get('qbm', []), name = S.surah ? S.surah.name : '';
      if (b.some(function (x) { return x.s === s && x.a === a; })) { say('Already bookmarked'); return; }
      b.unshift({ s: s, a: a, name: name }); put('qbm', b.slice(0, 50)); say('🔖 Bookmarked ' + name + ' ' + s + ':' + a);
    },
    share: function (a) { var d = S.surah; if (!d) return; var y = d.ayahs[a - 1]; shareText('Quran ' + d.n + ':' + a, y.ar + '\n\n' + y.en + '\n— Quran ' + d.n + ':' + a + ' (' + d.name + ')\n\nDigitalSaudi · digitalsaudi.pi'); }
  };

  /* ── Forty Hadith of an-Nawawi ── */
  var H = null;
  function loadH() { if (H) return Promise.resolve(H); return fetch('/ds-hadith.json').then(function (r) { return r.json(); }).then(function (d) { H = d.hadith; return H; }); }
  function hList() {
    showPanel('40 Hadith', '<div class="hq-intro">Imam an-Nawawi’s Forty Hadith · 42 hadith in Arabic and English</div>' +
      (get('hlast', null) ? '<button type="button" class="hq-cont" onclick="DSH.open(' + get('hlast', 1) + ')"><span>▶</span><div><b>Continue reading</b><small>Hadith ' + get('hlast', 1) + ' of 42</small></div></button>' : '') +
      '<input class="hq-search" id="hh-q" type="search" placeholder="Search the hadith" autocomplete="off"><div id="hh-list"><div class="empty">Loading…</div></div>', { id: 'hadith40', share: false });
    var draw = function () {
      var q = (($('hh-q') || {}).value || '').trim().toLowerCase(), el = $('hh-list'); if (!el) return;
      el.innerHTML = H.filter(function (h) { return !q || String(h.n) === q || h.en.toLowerCase().indexOf(q) >= 0 || h.ar.indexOf(q) >= 0; }).map(function (h) {
        var first = h.en.replace(/\s+/g, ' '), m = first.match(/[“"]([^”"]{8,140})/), line = m ? m[1] : first.slice(0, 120);
        return '<button type="button" class="hq-row" onclick="DSH.open(' + h.n + ')"><span class="hq-num">' + h.n + '</span><span class="hq-t"><b>Hadith ' + h.n + '</b><small>' + E(line) + '…</small></span></button>';
      }).join('') || '<div class="empty">No hadith matches “' + E(q) + '”.</div>';
    };
    loadH().then(function () { draw(); $('hh-q').oninput = draw; }).catch(function () { var el = $('hh-list'); if (el) el.innerHTML = '<div class="empty">Could not load the hadith. Check your connection and try again.</div>'; });
  }
  function hOpen(n) {
    loadH().then(function () {
      var h = H.filter(function (x) { return x.n === n; })[0]; if (!h) return;
      put('hlast', n);
      showPanel('Hadith ' + n, '<div class="hq-top"><button type="button" class="hq-back" onclick="DSH.list()">‹ 40 Hadith</button><div class="hq-tools"><button type="button" onclick="DSQ.size(-2)" aria-label="Smaller text">A−</button><button type="button" onclick="DSQ.size(2)" aria-label="Larger text">A+</button></div></div>' +
        '<div class="hq-head"><div class="hq-head-ar" lang="ar">الحديث ' + arNum(n) + '</div><div class="hq-head-en">Hadith ' + n + ' of 42 · Forty Hadith of an-Nawawi</div></div>' +
        '<div class="hd-pl" id="hd-pl" data-n="' + n + '"><button type="button" class="hd-btn" id="hd-btn" onclick="DSH.play(' + n + ')" aria-label="Listen">' + PLAY + '</button>' +
        '<div class="hd-info"><b>Listen · Arabic reading</b><div class="hd-bar" id="hd-bar" onclick="DSH.seek(event)"><i id="hd-prog"></i></div><small id="hd-time">Hadith ' + n + '</small></div>' +
        '<button type="button" class="hd-all' + (HA.all ? ' on' : '') + '" id="hd-all" onclick="DSH.all()" aria-pressed="' + (HA.all ? 'true' : 'false') + '">Play all</button></div>' +
        '<div class="hq-ay"><div class="hq-ay-ar" lang="ar" dir="rtl" style="font-size:' + Math.max(20, S.opt.fs - 4) + 'px;font-family:Amiri,serif">' + E(h.ar) + '</div><div class="hq-ay-en" style="white-space:pre-line">' + E(h.en) + '</div>' +
        '<div class="hq-ay-act"><button type="button" onclick="DSH.share(' + n + ')">Share</button></div></div>' +
        '<div class="hq-foot">' + (n > 1 ? '<button type="button" class="btn btn-ghost btn-sm" onclick="DSH.open(' + (n - 1) + ')">‹ Previous</button>' : '<span></span>') + (n < 42 ? '<button type="button" class="btn btn-primary btn-sm" onclick="DSH.open(' + (n + 1) + ')">Next ›</button>' : '') + '</div>' +
        '<div class="hq-src">Imam Yahya ibn Sharaf an-Nawawi · Arabic and English text</div>', { id: 'hadith40', share: false });
      paint();
    });
  }
  /* ── listening: one hadith at a time, or all in order ── */
  var PLAY = '<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.4-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z"/></svg>';
  var PAUSE = '<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><rect x="6" y="5" width="4.2" height="14" rx="1.2"/><rect x="13.8" y="5" width="4.2" height="14" rx="1.2"/></svg>';
  var HA = new Audio(); HA.preload = 'none'; HA.n = 0; HA.all = !!get('hall', false);
  var tm = function (x) { x = Math.max(0, Math.floor(x || 0)); return Math.floor(x / 60) + ':' + ('0' + (x % 60)).slice(-2); };
  function paint() {
    var pl = $('hd-pl'); if (!pl) return; var mine = +pl.dataset.n === HA.n, b = $('hd-btn'), on = mine && !HA.paused && !HA.ended;
    if (b) { b.innerHTML = on ? PAUSE : PLAY; b.setAttribute('aria-label', on ? 'Pause' : 'Listen'); b.classList.toggle('busy', mine && HA.busy); }
    var p = $('hd-prog'); if (p) p.style.width = (mine && HA.duration ? Math.min(100, HA.currentTime / HA.duration * 100) : 0) + '%';
    var t = $('hd-time'); if (t) t.textContent = mine && HA.busy ? 'Loading…' : mine && HA.duration ? tm(HA.currentTime) + ' / ' + tm(HA.duration) : 'Hadith ' + pl.dataset.n;
  }
  ['play', 'pause', 'timeupdate', 'loadedmetadata', 'playing', 'waiting', 'ended'].forEach(function (ev) { HA.addEventListener(ev, function () {
    if (ev === 'waiting') HA.busy = true; if (ev === 'playing' || ev === 'pause') HA.busy = false;
    if (ev === 'timeupdate' && !$('hd-pl')) { HA.pause(); return; } // the reader was closed
    paint();
  }); });
  HA.addEventListener('ended', function () { if (HA.all && HA.n < 42 && $('hd-pl')) { var nx = HA.n + 1; hOpen(nx); setTimeout(function () { hPlay(nx); }, 400); } });
  HA.addEventListener('error', function () { if (!HA.n) return; HA.busy = false; paint(); say('Audio is not available right now. Check your connection and try again.'); });
  function hPlay(n) {
    try { if (S.audio && !S.audio.paused) S.audio.pause(); } catch (e) {}
    if (HA.n === n && HA.src) { if (HA.paused || HA.ended) { HA.play().catch(function () {}); } else HA.pause(); paint(); return; }
    HA.n = n; HA.busy = true; HA.src = '/hadith-audio?n=' + n; paint();
    HA.play().catch(function () { HA.busy = false; paint(); });
    try { if ('mediaSession' in navigator) navigator.mediaSession.metadata = new MediaMetadata({ title: 'Hadith ' + n, artist: 'Forty Hadith of an-Nawawi', album: 'DigitalSaudi', artwork: [{ src: '/icon-512.png', sizes: '512x512', type: 'image/png' }] }); } catch (e) {}
  }
  window.DSH = { play: hPlay,
    all: function () { HA.all = !HA.all; put('hall', HA.all); var b = $('hd-all'); if (b) { b.classList.toggle('on', HA.all); b.setAttribute('aria-pressed', HA.all ? 'true' : 'false'); } },
    seek: function (e) { var bar = $('hd-bar'), pl = $('hd-pl'); if (!bar || !pl || +pl.dataset.n !== HA.n || !HA.duration) return; var r = bar.getBoundingClientRect(), k = (e.clientX - r.left) / r.width; HA.currentTime = Math.max(0, Math.min(1, k)) * HA.duration; paint(); },
    list: hList, open: function (n) { hOpen(n); setTimeout(paint, 300); }, share: function (n) { var h = (H || []).filter(function (x) { return x.n === n; })[0]; if (h) shareText('Hadith ' + n + ' · 40 Hadith of an-Nawawi', h.ar + '\n\n' + h.en + '\n\n— Forty Hadith of an-Nawawi, ' + n + '\nDigitalSaudi · digitalsaudi.pi'); } };

  /* ── wiring: replace the old Quran reader, add 40 Hadith ── */
  function wire() {
    try {
      META.quran = Object.assign({}, META.quran || {}, { t: 'Quran', ic: '📖', s: '114 surahs · 7 reciters' });
      META.hadith40 = { t: '40 Hadith', ic: '📜', s: 'An-Nawawi · Arabic & English', short: '40 Hadith' };
      PANELS.quran = function () { home(); };
      PANELS.hadith40 = function () { hList(); };
      window.openQuranList = home; window.openSurah = function (n) { open(n); };
      if (Array.isArray(NOMARK) && NOMARK.indexOf('hadith40') < 0) NOMARK.push('hadith40');
    } catch (e) {}
  }
  wire();
  // get the Quran list, the 40 Hadith and Al-Faatiha ready in the background, so they open instantly
  function warm() { try { loadList().catch(function () {}); loadH().catch(function () {}); setTimeout(function () { loadSurah(1).catch(function () {}); }, 1500); } catch (e) {} }
  if (document.readyState === 'complete') setTimeout(warm, 2500); else window.addEventListener('load', function () { setTimeout(warm, 2500); });
})();

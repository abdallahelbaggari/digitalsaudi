/* DigitalSaudi — app logic. Pi sign-in, live rates, send by @username, receive by @username or wallet address (automatic, verified on the Pi blockchain),
   receipts, budgets and insights. Icons: Feather (MIT). Everything personal stays on this phone except what transfers need. */
(function () {
  'use strict';
  /* ── basics ── */
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };
  var K = 'dsw_v1_';
  /* reads: large lists are parsed once and reused until they change, so screens open instantly */
  var MEMO = {}, BIG = { rcpts: 1, inv: 1, cust: 1, prod: 1, notes: 1, recur: 1, contacts: 1, links: 1 };
  function mirrorSoon() { try { if (typeof IDB === 'object' && IDB) { clearTimeout(IDB.t); IDB.t = setTimeout(mirror, 1500); } } catch (e) {} }
  function get(k, d) {
    try {
      var v = localStorage.getItem(K + k); if (v === null) return d;
      if (!BIG[k]) return JSON.parse(v);
      var m = MEMO[k]; if (m && m.raw === v) return m.val.map(function (x) { return x && typeof x === 'object' ? Object.assign({}, x) : x; });
      var val = JSON.parse(v); if (!Array.isArray(val)) return val;
      MEMO[k] = { raw: v, val: val }; return val.map(function (x) { return x && typeof x === 'object' ? Object.assign({}, x) : x; });
    } catch (e) { return d; }
  }
  addEventListener('storage', function () { MEMO = {}; });
  /* second copy of your records in the phone's database, restored automatically if browser storage is cleared */
  var IDB = { db: null, t: null };
  function idb() { return new Promise(function (ok) { if (IDB.db) return ok(IDB.db); try { var q = indexedDB.open('dswallet', 1); q.onupgradeneeded = function () { q.result.createObjectStore('kv'); }; q.onsuccess = function () { IDB.db = q.result; ok(IDB.db); }; q.onerror = function () { ok(null); }; } catch (e) { ok(null); } }); }
  function mirror() {
    idb().then(function (db) { if (!db) return; var snap = {}; for (var i = 0; i < localStorage.length; i++) { var k = localStorage.key(i); if (k && k.indexOf(K) === 0 && !/price|fx|errlog/.test(k)) snap[k] = localStorage.getItem(k); }
      try { db.transaction('kv', 'readwrite').objectStore('kv').put({ ts: Date.now(), d: snap }, 'snap'); } catch (e) {} });
  }
  function restoreLocal() {
    return idb().then(function (db) {
      if (!db) return 0; return new Promise(function (ok) { try { var q = db.transaction('kv').objectStore('kv').get('snap'); q.onsuccess = function () { var v = q.result, n = 0; if (v && v.d) { Object.keys(v.d).forEach(function (k) { if (localStorage.getItem(k) === null) { try { localStorage.setItem(k, v.d[k]); n++; } catch (e) {} } }); } ok(n); }; q.onerror = function () { ok(0); }; } catch (e) { ok(0); } });
    });
  }
  try { if (navigator.storage && navigator.storage.persist) navigator.storage.persisted().then(function (p) { if (!p) navigator.storage.persist(); }).catch(function () {}); } catch (e) {}
  /* storage: if the phone's browser storage is full, the oldest receipts that are already backed up are trimmed
     (they stay in the server history) and the save is retried, so nothing new is ever lost */
  function put(k, v) {
    if (k === 'addr') setTimeout(function () { try { registered = false; register(); } catch (e) {} }, 0);
    try { localStorage.setItem(K + k, JSON.stringify(v)); mirrorSoon(); if (k === 'name' || k === 'nameType') setTimeout(function () { try { HK.dirty.forEach(function (f) { f(); }); } catch (e) {} }, 0); return true; } catch (e) {}
    try {
      ['errlog', 'price', 'fx', 'payers'].forEach(function (x) { if (x !== k) localStorage.removeItem(K + x); });
      var N = JSON.parse(localStorage.getItem(K + 'notes') || '[]'); if (k !== 'notes' && N.length > 15) localStorage.setItem(K + 'notes', JSON.stringify(N.slice(0, 15)));
    } catch (e3) {}
    var keepF = [0.6, 0.35, 0.15, 0.05];
    for (var i = 0; i < keepF.length; i++) {
      try {
        var R = k === 'rcpts' ? v : JSON.parse(localStorage.getItem(K + 'rcpts') || '[]');
        if (Array.isArray(R) && R.length > 20) { var cut = Math.max(20, Math.floor(R.length * keepF[i])), keep = R.slice(0, cut).concat(R.slice(cut).filter(function (r) { return !r.hs; })); if (k === 'rcpts') v = keep; else localStorage.setItem(K + 'rcpts', JSON.stringify(keep)); }
        localStorage.setItem(K + k, JSON.stringify(v)); mirrorSoon(); return true;
      } catch (e2) {}
    }
    return false;
  }
  function esc(x) { return String(x == null ? '' : x).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  /* errors never break the app: they are noted on this phone and the screen keeps working */
  var errN = 0;
  function guardErr(m) {
    try { var L = JSON.parse(localStorage.getItem(K + 'errlog') || '[]'); L.unshift({ t: Date.now(), m: String(m || '').slice(0, 200) }); localStorage.setItem(K + 'errlog', JSON.stringify(L.slice(0, 20))); } catch (e) {}
    if (!errN++) { setTimeout(function () { errN = 0; }, 30000); try { var a = document.getElementById('app'); if (a && !a.hidden && window.toast) toast('Something did not load. Please try again.'); } catch (e) {} }
  }
  addEventListener('error', function (e) { if (e && e.filename && !/wallet/.test(e.filename)) return; guardErr(e && e.message); });
  addEventListener('unhandledrejection', function (e) { try { guardErrQuiet(e.reason && (e.reason.message || e.reason)); } catch (x) {} });
  function guardErrQuiet(m) { try { var L = JSON.parse(localStorage.getItem(K + 'errlog') || '[]'); L.unshift({ t: Date.now(), m: 'async: ' + String(m || '').slice(0, 200) }); localStorage.setItem(K + 'errlog', JSON.stringify(L.slice(0, 20))); } catch (e) {} }
  /* one tap, one action: a second tap on the same button within 0.7 s is ignored (no double payments or double files) */
  var lastTap = { el: null, t: 0 };
  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('.btn, .tile, .qa button, .bz-a, .bz-mini button, [data-act], [data-f]'); if (!b) return;
    var n = Date.now(); if (b === lastTap.el && n - lastTap.t < 700) { e.stopPropagation(); e.preventDefault(); return; } lastTap = { el: b, t: n };
  }, true);
  var TEST = /(^|[.-])testnet[.-]/i.test(location.hostname), NETN = TEST ? 'Pi Testnet' : 'Pi Mainnet', NETQ = TEST ? 'test' : 'main';
  var HORIZON = TEST ? 'https://api.testnet.minepi.com' : 'https://api.mainnet.minepi.com';
  var SANDBOX = (function () { try { var r = document.referrer || '', a = location.ancestorOrigins ? [].slice.call(location.ancestorOrigins).join(' ') : ''; return /sandbox\.minepi\.com/.test(r + ' ' + a); } catch (e) { return false; } })();
  var SUPPORT = 'support.digitalsaudi.pi@gmail.com', USER_RE = /^[A-Za-z0-9_.-]{2,40}$/;
  var CATS = ['Food', 'Transport', 'Shopping', 'Bills', 'Family', 'Business', 'Gifts', 'Charity', 'Other'];
  var S = { per: 'all', q: '', from: '', to: '', page: 60, user: null, token: null, guest: false, tab: 'home', p: null, fx: null, cfg: { enabled: false, payments: null, fee: 0.01, max: 0, daily: 0 }, filter: 'all', seg: 'tx', sort: 'new', extra: [], hMore: false, month: 0, wal: null };
  var HK = { rcpt: [], spec: [], rows: [], html: {}, signin: [], repair: [], dirty: [] };
  function hook(k) { var f = HK.html[k]; try { return f ? f() : ''; } catch (e) { return ''; } }
  var r7 = function (n) { return Math.round(Number(n) * 1e7) / 1e7; };
  var me = function () { return S.user && S.user.username || ''; };
  var signedIn = function () { return !!(S.user && S.token); };

  /* ── icons (Feather, MIT) ── */
  var P = {
    scan: '<path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2"/><line x1="7" y1="12" x2="17" y2="12"/>',
    pos: '<rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/><line x1="8" y1="18" x2="16" y2="18"/>',
    pin: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
    cart: '<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>',
    idb: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="11" r="2.5"/><path d="M5.5 17c.6-1.8 2-2.7 3.5-2.7s2.9.9 3.5 2.7"/><line x1="15" y1="10" x2="19" y2="10"/><line x1="15" y1="14" x2="19" y2="14"/>',
    report: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="18" x2="8" y2="14"/><line x1="12" y1="18" x2="12" y2="11"/><line x1="16" y1="18" x2="16" y2="15"/>',
    scale: '<path d="M12 3v18M7 21h10M4 7h16"/><path d="M7 7l-3 6a3 3 0 0 0 6 0z"/><path d="M17 7l-3 6a3 3 0 0 0 6 0z"/>',
    trend: '<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>',
    wallet2: '<path d="M20 7H5a2 2 0 0 1 0-4h13v4"/><path d="M3 5v14a2 2 0 0 0 2 2h15V7"/><circle cx="16" cy="14" r="1.5"/>',
    plane: '<path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4z"/>',
    at: '<circle cx="12" cy="12" r="4"/><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"/>',
    userplus: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/>',
    book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
    sheet: '<rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/>',
    hash: '<line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/>',
    target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
    pct: '<line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>',
    exp: '<circle cx="12" cy="12" r="10"/><polyline points="8 12 12 16 16 12"/><line x1="12" y1="8" x2="12" y2="16"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>',
    home: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
    send: '<line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>',
    req: '<line x1="17" y1="7" x2="7" y2="17"/><polyline points="17 17 7 17 7 7"/>',
    link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
    users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    card: '<rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>',
    act: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
    user: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    bell: '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>',
    rcpt: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
    refresh: '<polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>',
    search: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
    check: '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
    copy: '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
    share: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>',
    conv: '<polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>',
    pie: '<path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/>',
    biz: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
    heart: '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>',
    info: '<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>',
    x: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
    chev: '<polyline points="9 18 15 12 9 6"/>', chevl: '<polyline points="15 18 9 12 15 6"/>',
    globe: '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
    qr: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>',
    out: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>',
    mail: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>',
    lock: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    down: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
    undo: '<polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>',
    trash: '<polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
    edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>',
    star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
    ext: '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>',
    warn: '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
    sort: '<line x1="4" y1="6" x2="14" y2="6"/><line x1="4" y1="12" x2="11" y2="12"/><line x1="4" y1="18" x2="8" y2="18"/><polyline points="17 8 20 5 23 8"/><line x1="20" y1="5" x2="20" y2="19"/>',
    grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/>',
    zap: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
    cal: '<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
    chevd: '<polyline points="6 9 12 15 18 9"/>',
    cloud: '<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/><polyline points="9 14 11.5 16.5 16 12"/>',
    tag: '<path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>'
  };
  function ic(n, st) { return '<svg class="ic" viewBox="0 0 24 24"' + (st ? ' style="' + st + '"' : '') + ' aria-hidden="true">' + (P[n] || '') + '</svg>'; }

  /* ── numbers & money ── */
  function fpi(n) { return Number(n || 0).toLocaleString('en-US', { maximumFractionDigits: 7 }); }
  var REG = { NG: 'NGN', PK: 'PKR', IN: 'INR', ID: 'IDR', BD: 'BDT', EG: 'EGP', TR: 'TRY', MY: 'MYR', GB: 'GBP', SA: 'SAR', AE: 'AED', GH: 'GHS', KE: 'KES', PH: 'PHP', VN: 'VND', US: 'USD', CN: 'CNY', KR: 'KRW', JP: 'JPY', TH: 'THB', CA: 'CAD', AU: 'AUD', DE: 'EUR', FR: 'EUR', IT: 'EUR', ES: 'EUR', NL: 'EUR', BR: 'BRL', MX: 'MXN', ZA: 'ZAR', MA: 'MAD', CM: 'XAF', SN: 'XOF', CI: 'XOF', UG: 'UGX', TZ: 'TZS', ET: 'ETB' };
  function curr() { var c = get('cur', ''); if (c) return c; var m = /[-_]([A-Z]{2})\b/.exec(navigator.language || ''); return (m && REG[m[1]]) || 'USD'; }
  var DN = null; try { DN = new Intl.DisplayNames(['en'], { type: 'currency' }); } catch (e) {}
  function cname(c) { try { return DN ? DN.of(c) : c; } catch (e) { return c; } }
  function money(v, c, dp) {
    if (v == null || isNaN(v)) return '—';
    var d = dp != null ? dp : (v === 0 || Math.abs(v) >= 1000 ? (v === 0 ? 2 : 0) : Math.abs(v) >= 1 ? 2 : 4);
    try { return new Intl.NumberFormat('en-US', { style: 'currency', currency: c, currencyDisplay: 'narrowSymbol', minimumFractionDigits: d, maximumFractionDigits: d }).format(v); }
    catch (e) { return c + ' ' + Number(v).toFixed(d); }
  }
  function rateIn(c) {
    var p = S.p; if (!p || !p.usd) return null;
    if (c === 'USD') return p.usd;
    if (S.fx && S.fx[c] && S.fx.USD) return p.usd * S.fx[c] / S.fx.USD;
    if (c === 'SAR') return p.sar; if (c === 'NGN') return p.ngn; return null;
  }
  function cur2() { var t = get('cur2', ''); return t && t !== curr() && t !== 'USD' ? t : ''; }
  function conv(a) { var c = curr(), r = rateIn(c), u = rateIn('USD'), t = cur2(), rt = t ? rateIn(t) : 0; if (!(a > 0) || !u) return ''; return '≈ ' + money(a * u, 'USD') + (r && c !== 'USD' ? ' · ' + money(a * r, c) : '') + (rt ? ' · ' + money(a * rt, t) : ''); }
  function ago(t) { var s = Math.max(0, (Date.now() - t) / 1000); return s < 60 ? 'just now' : s < 3600 ? Math.round(s / 60) + ' min ago' : s < 86400 ? Math.round(s / 3600) + ' h ago' : new Date(t).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }); }
  function short(a) { a = String(a || ''); return a.length > 16 ? a.slice(0, 6) + '…' + a.slice(-6) : a; }
  function spark(arr, w, h, col, area) {
    if (!arr || arr.length < 2) return '';
    var mn = Math.min.apply(null, arr), mx = Math.max.apply(null, arr), rg = (mx - mn) || 1;
    var pts = arr.map(function (v, i) { return [(i / (arr.length - 1) * w), (h - 4 - (v - mn) / rg * (h - 10))]; });
    var line = pts.map(function (p, i) { return (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1); }).join('');
    var id = 'g' + Math.random().toString(36).slice(2, 7);
    return '<svg class="sp" viewBox="0 0 ' + w + ' ' + h + '" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="' + id + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + col + '" stop-opacity="' + (area || .28) + '"/><stop offset="1" stop-color="' + col + '" stop-opacity="0"/></linearGradient></defs>' +
      '<path d="' + line + 'L' + w + ' ' + h + 'L0 ' + h + 'Z" fill="url(#' + id + ')"/><path d="' + line + '" fill="none" stroke="' + col + '" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round" vector-effect="non-scaling-stroke"/></svg>';
  }

  /* ── ui helpers ── */
  var tT = null;
  function toast(m) { var t = $('#toast'); t.textContent = m; t.classList.add('on'); clearTimeout(tT); tT = setTimeout(function () { t.classList.remove('on'); }, 3200); }
  window.toast = toast;
  function sheet(title, body, o) {
    o = o || {};
    if (!o.stack) closeSheets();
    var w = document.createElement('div'); w.className = 'sh-wrap';
    w.innerHTML = '<div class="sh" role="dialog" aria-modal="true" aria-label="' + esc(title) + '"><div class="sh-h"><h2>' + esc(title) + '</h2><button type="button" class="sh-x" aria-label="Close">' + ic('x') + '</button></div>' + body + '</div>';
    w.addEventListener('click', function (e) { if (e.target === w || e.target.closest('.sh-x')) { w.remove(); o.onClose && o.onClose(); } });
    document.body.appendChild(w);
    return w;
  }
  function closeSheets() { $$('.sh-wrap').forEach(function (x) { x.remove(); }); }
  function vv() { var v = window.visualViewport; document.documentElement.style.setProperty('--vvh', (v ? v.height : innerHeight) + 'px'); }
  if (window.visualViewport) { visualViewport.addEventListener('resize', vv); visualViewport.addEventListener('scroll', vv); }
  addEventListener('resize', vv); vv();
  document.addEventListener('focusin', function (e) { var t = e.target; if (t && /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName) && t.closest('.sh')) setTimeout(function () { try { t.scrollIntoView({ block: 'center', behavior: 'smooth' }); } catch (x) {} }, 300); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeSheets(); });
  /* network: every request has a time limit; read-only requests are retried once; a server error page never breaks the screen */
  var SAFE = { list: 1, pull: 1, bget: 1, count: 1, check: 1, status: 1 };
  function api1(path, body) {
    var ctl = window.AbortController ? new AbortController() : null, tm = ctl ? setTimeout(function () { ctl.abort(); }, 20000) : null;
    var o = body ? { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) } : { cache: 'no-store' }; if (ctl) o.signal = ctl.signal;
    return fetch(path, o).then(function (r) { clearTimeout(tm); return r.text().then(function (t) { try { return JSON.parse(t); } catch (e) { return { ok: false, error: r.status >= 500 ? 'DigitalSaudi is busy right now. Try again in a moment.' : 'Unexpected reply. Try again.' }; } }); }, function (e) { clearTimeout(tm); throw e; });
  }
  function api(path, body) {
    var retry = !body || SAFE[body.a];
    return api1(path, body).catch(function (e) { if (!retry || !navigator.onLine) throw e; return new Promise(function (ok) { setTimeout(ok, 1200); }).then(function () { return api1(path, body); }); }); }
  function copy(t) { try { navigator.clipboard.writeText(t).then(function () { toast('Copied'); }, function () { toast('Press and hold to copy'); }); } catch (e) { toast('Press and hold to copy'); } }
  function shareText(title, text) { if (navigator.share) navigator.share({ title: title, text: text }).catch(function () {}); else if (window.Pi && Pi.openShareDialog) { try { Pi.openShareDialog(title, text); } catch (e) { copy(text); } } else copy(text); }
  /* Saving and sharing files. Inside the Pi Browser a page cannot save files it made itself or share them as files,
     so DigitalSaudi keeps a private copy for 30 days (/file) and uses its link: saving downloads from that link, and sharing
     sends a link that opens, and previews in chat apps, as the full receipt image. */
  var upCache = {};
  function canShareFile(f) { try { return !!(f && navigator.canShare && navigator.canShare({ files: [f] })); } catch (e) { return false; } }
  function upload(blob, name, type) {
    var k = name + '|' + blob.size;
    if (!upCache[k]) upCache[k] = fetch('/file?type=' + encodeURIComponent(type) + '&name=' + encodeURIComponent(name), { method: 'POST', headers: { 'Content-Type': type }, body: blob })
      .then(function (r) { return r.json(); }).then(function (d) { if (!d || !d.ok) throw new Error((d && d.error) || 'Could not save'); return d; })
      .catch(function (e) { delete upCache[k]; throw e; });
    return upCache[k];
  }
  function blobSave(blob, name) { var u = URL.createObjectURL(blob), a = document.createElement('a'); a.href = u; a.download = name; a.rel = 'noopener'; document.body.appendChild(a); a.click(); a.remove(); setTimeout(function () { URL.revokeObjectURL(u); }, 15000); }
  function saveFile(blob, name, type, what, quiet) {
    toast('Saving ' + what + '…');
    upload(blob, name, type).then(function (d) {
      var url = location.origin + d.file + '?dl=1', a = document.createElement('a'); a.href = url; a.download = d.name || name; a.rel = 'noopener'; document.body.appendChild(a); a.click(); a.remove();
      if (quiet) return;
      var img = /^image\//.test(type), w = sheet('Saved to your phone',
        '<p class="sh-sub">' + (img ? 'Your ' + esc(what) + ' image is in your phone’s <b>Downloads</b> and <b>Gallery</b>.' : 'Your ' + esc(what) + ' is in your phone’s <b>Downloads</b> folder.') + '</p>' +
        '<button type="button" class="btn" data-x="open">' + ic(img ? 'rcpt' : 'down') + (img ? 'Open the image' : 'Download again') + '</button>' +
        '<p class="small muted" style="text-align:center;margin-top:10px">Not there? ' + (img ? 'Open the image, then press and hold to save.' : 'Tap Download again.') + '</p>');
      $('[data-x="open"]', w).onclick = function () { if (img) location.href = d.page; else { var b = document.createElement('a'); b.href = url; b.download = d.name || name; document.body.appendChild(b); b.click(); b.remove(); } };
    }, function () { blobSave(blob, name); toast(what.charAt(0).toUpperCase() + what.slice(1) + ' saved to Downloads'); });
  }
  function shareLink(blob, name, type, title, short) {
    toast('Preparing link…');
    upload(blob, name, type).then(function (d) {
      var link = location.origin + d.page, t = short || title, msg = t + '\n' + link;
      if (navigator.share) navigator.share({ title: title, text: t, url: link }).catch(function () {});
      else if (window.Pi && Pi.openShareDialog) { try { Pi.openShareDialog(title, msg); } catch (e) { copy(msg); } }
      else copy(msg);
    }, function () { toast('No connection. Try again.'); });
  }
  /* Share as a real image file first. If this browser cannot share files, save the image to the phone
     (Gallery) so it can be sent as an image from WhatsApp or the Gallery, and offer the link as an option. */
  function shareImage(blob, name, title, text, short) {
    var f = null; try { f = new File([blob], name, { type: 'image/jpeg' }); } catch (e) {}
    var fallback = function () {
      var wh = String(title || 'DigitalSaudi receipt').replace(/^DigitalSaudi /, ''); wh = wh.charAt(0).toLowerCase() + wh.slice(1);
      saveFile(blob, name, 'image/jpeg', wh, true);
      var w = sheet('Share the ' + wh + ' image', '<p class="sh-sub">The ' + esc(wh) + ' image is saved to your phone’s <b>Gallery</b>. Open WhatsApp (or any app), tap attach, choose <b>Gallery</b> and pick the DigitalSaudi ' + esc(wh) + '.</p>' +
        '<button type="button" class="btn" data-x="lk">' + ic('link') + 'Share as a link instead</button>');
      $('[data-x="lk"]', w).onclick = function () { closeSheets(); shareLink(blob, name, 'image/jpeg', title, short); };
    };
    if (f && navigator.share && (!navigator.canShare || canShareFile(f))) {
      return navigator.share({ files: [f], title: title }).catch(function (e) { if (!e || e.name !== 'AbortError') fallback(); });
    }
    fallback();
  }
  function shareFile(blob, name, type, title, text, short) {
    var f = null; try { f = new File([blob], name, { type: type }); } catch (e) {}
    if (canShareFile(f)) return navigator.share({ files: [f], title: title, text: text }).catch(function () {});
    toast('Preparing to share…');
    upload(blob, name, type).then(function (d) {
      // the link goes first and alone, so chat apps preview it as the receipt image
      var link = location.origin + d.page, t = short || title, msg = t + '\n' + link;
      if (navigator.share) navigator.share({ title: title, text: t, url: link }).catch(function () {});
      else if (window.Pi && Pi.openShareDialog) { try { Pi.openShareDialog(title, msg); } catch (e) { copy(msg); } }
      else copy(msg);
    }, function () { shareText(title, text); });
  }

  /* ── notifications ── */
  function notes() { return get('notes', []); }
  function addNote(icn, t, b, tag) {
    var n = notes(); if (tag && n.some(function (x) { return x.tag === tag; })) return;
    n.unshift({ ic: icn, t: t, b: b, ts: Date.now(), read: false, tag: tag || '' }); put('notes', n.slice(0, 60)); bellDot(); try { headsUp(icn, t, b); } catch (e) {}
    if (get('push', false) && 'Notification' in window && Notification.permission === 'granted') {
      var opt = { body: b, icon: 'icon-192.png', badge: 'favicon-32.png', tag: tag || undefined };
      try { navigator.serviceWorker && navigator.serviceWorker.ready.then(function (r) { r.showNotification(t, opt); }).catch(function () { try { new Notification(t, opt); } catch (e) {} }); } catch (e) {}
    }
  }
  function ntCls(i) { return { req: 'in', check: 'in', send: 'out', undo: 'rf', warn: 'bad', inv: 'iv', tag: 'rf', bell: 'iv', heart: 'sp', refresh: 'tl', act: 'iv' }[i] || 'out'; }
  var huT = null;
  function headsUp(icn, t, b) {
    var a = $('#app'); if (!a || a.hidden) return;
    var h = $('#hu'); if (!h) { h = document.createElement('button'); h.type = 'button'; h.id = 'hu'; h.setAttribute('aria-live', 'polite'); document.body.insertBefore(h, document.body.firstChild); h.onclick = function () { h.classList.remove('on'); if (A.notifs) A.notifs(); }; }
    h.innerHTML = '<span class="ico nt ' + ntCls(icn) + '">' + ic(icn || 'bell') + '</span><span class="grow"><b>' + esc(t) + '</b><small>' + esc(b) + '</small></span>';
    h.classList.remove('on'); void h.offsetWidth; h.classList.add('on'); clearTimeout(huT); huT = setTimeout(function () { h.classList.remove('on'); }, 4200);
  }
  function netBar() {
    var b = $('#netbar'); if (navigator.onLine) { if (b) b.remove(); return; }
    if (!b) { b = document.createElement('div'); b.id = 'netbar'; b.setAttribute('role', 'status'); b.textContent = 'Offline'; document.body.insertBefore(b, document.body.firstChild); }
  }
  addEventListener('offline', netBar); addEventListener('online', function () { netBar(); try { loadPrice(true); sync(); } catch (e) {} });
  function bellDot() { var d = $('#bell-dot'); if (d) d.hidden = !notes().some(function (x) { return !x.read; }); }

  /* ── receipts ── */
  var LCAP = 2500; // receipts kept on the phone (within the browser storage limit); the full history is kept on the server with no limit (see /history)
  function rcpts() { return get('rcpts', []); }
  function saveRcpt(r) {
    var R = rcpts(); if (r.txid && R.some(function (x) { return x.txid === r.txid; })) return false;
    var c = curr(); r.usd = r.usd || rateIn('USD'); r.lc = c; r.lr = rateIn(c); r.net = r.net || NETN; r.ts = r.ts || Date.now(); r.saved = Date.now();
    R.unshift(r); R.sort(function (a, b) { return (b.ts || 0) - (a.ts || 0); }); put('rcpts', R.slice(0, LCAP)); try { remMatch(r); } catch (e) {} HK.rcpt.forEach(function (f) { try { f(r); } catch (e) {} }); if (r.dir === 'out' && Date.now() - r.ts < 864e5) { try { budgetCheck(); } catch (e) {} } hSoon(); return true;
  }
  // monthly budget: one notice at 80% and one when it is passed
  function budgetCheck() {
    var b = get('budget', 0); if (!(b > 0)) return; var s0 = monthStats(0), m = new Date(), key = m.getFullYear() + '-' + (m.getMonth() + 1), st = get('budN', {}) || {};
    var lvl = s0.out >= b ? 2 : s0.out >= b * 0.8 ? 1 : 0; if (!lvl || (st.k === key && st.l >= lvl)) return;
    put('budN', { k: key, l: lvl }); addNote('warn', lvl === 2 ? 'Monthly budget passed' : 'Monthly budget 80% used', fpi(r7(s0.out)) + ' of ' + fpi(b) + ' π spent this month', 'bud-' + key + '-' + lvl);
  }
  /* ── full history, backed up on the server for this Pi account (never lost, no size limit) ── */
  function hKey(r) { var t = String(r.txid || '').toLowerCase(); if (/^[a-f0-9]{64}$/.test(t)) return 'tx:' + t + (r.kind === 'refund' ? ':r' : '') + (r.dir ? ':' + r.dir : ''); var f = String(r.ref || r.pid || ''); return f ? 'ref:' + f : ''; }
  var hBusy = false, hTimer = null;
  function hPush() {
    if (!signedIn() || !S.token) return Promise.resolve();
    var todo = rcpts().filter(function (r) { return !r.hs && hKey(r); }).slice(0, 200);
    if (!todo.length) return Promise.resolve();
    var items = todo.map(function (r) { var o = {}; for (var k in r) if (k !== 'hs') o[k] = r[k]; return o; });
    return api('/history', { a: 'push', accessToken: S.token, items: items }).then(function (d) {
      if (!d || !d.ok) return;
      var done = {}; todo.forEach(function (r) { done[hKey(r)] = 1; });
      var L = rcpts(); L.forEach(function (r) { if (done[hKey(r)]) r.hs = 1; }); put('rcpts', L);
      if (todo.length === 200) return hPush();
    });
  }
  /* records from the app's earlier wallet and from the server history use the same fields, with a few older names */
  function nrm(r) {
    if (!r || typeof r !== 'object') return r;
    if (r.kind === 'p2p') r.kind = r.refund ? 'refund' : 'transfer';
    if (/_pass$/.test(String(r.kind || '')) || r.kind === 'support') r.kind = 'supporter';
    if (!r.narr && (r.memo || r.item)) r.narr = r.memo || r.item;
    if (!r.pid && r.ref) r.pid = r.ref;
    if (!r.addr && /^G[A-Z2-7]{55}$/.test(String(r.to || ''))) r.addr = r.to;
    if (!r.other) r.other = r.dir === 'in' ? (r.name || r.user || '') : (r.toName || r.seller || r.name || '');
    if (!r.other) r.other = 'DigitalSaudi';
    if (!r.ts) r.ts = r.at || r.done || Date.now();
    r.amount = +r.amount || 0; return r;
  }
  function importHost() {
    try {
      var src = [];
      ["rcpts"].forEach(function (k) { try { var v = JSON.parse(localStorage.getItem("ds_" + k) || '[]'); if (Array.isArray(v)) src = src.concat(v); } catch (e) {} });
      src = src.filter(function (r) { return r && r.txid && +r.amount > 0; }).map(nrm); if (!src.length) return;
      var L = rcpts(), have = {}, n = 0; L.forEach(function (r) { if (r.txid) have[r.txid] = 1; });
      src.forEach(function (r) { if (!have[r.txid]) { have[r.txid] = 1; L.push(r); n++; } });
      if (n) { L.sort(function (a, b) { return (b.ts || 0) - (a.ts || 0); }); put('rcpts', L.slice(0, LCAP)); }
    } catch (e) {}
  }
  function hMerge(items) {
    var L = rcpts(), have = {}, n = 0; L.concat(S.extra).forEach(function (r) { have[hKey(r)] = 1; });
    items.forEach(function (r) { r = nrm(r); var k = hKey(r); if (k && !have[k]) { r.hs = 1; L.push(r); have[k] = 1; n++; } });
    if (n) { L.sort(function (a, b) { return (b.ts || 0) - (a.ts || 0); }); put('rcpts', L.slice(0, LCAP)); if (L.length > LCAP) S.extra = S.extra.concat(L.slice(LCAP)); }
    return n;
  }
  function historySync() {
    if (hBusy || !signedIn() || !S.token) return; hBusy = true;
    hPush().then(function () { return api('/history', { a: 'pull', accessToken: S.token, limit: 500 }); }).then(function (d) {
      if (!d || !d.ok) return; S.hMore = !!d.more;
      if (hMerge(d.items || []) && (S.tab === 'activity' || S.tab === 'home')) render(S.tab);
    }).catch(function () {}).then(function () { hBusy = false; });
  }
  function hSoon() { clearTimeout(hTimer); hTimer = setTimeout(historySync, 1500); }
  function hOlder(btn) {
    if (!signedIn() || !S.token) return toast('Sign in with Pi to load your full history');
    var all = rcpts().concat(S.extra), oldest = all.reduce(function (m, r) { return Math.min(m, r.ts || m); }, Date.now() + 864e5);
    if (btn) { btn.disabled = true; btn.textContent = 'Loading…'; }
    api('/history', { a: 'pull', accessToken: S.token, before: oldest, limit: 500 }).then(function (d) {
      if (!d || !d.ok) { toast((d && d.error) || 'Could not load older history'); return; }
      S.hMore = !!d.more; var n = hMerge(d.items || []); toast(n ? n + ' older payments loaded' : 'You have reached the start of your history'); render('activity');
    }).catch(function () { toast('No connection. Try again.'); render('activity'); });
  }
  function verifyUrl(r) { return r && /^[a-f0-9]{64}$/i.test(r.txid || '') ? location.origin + '/receipt.html#tx=' + r.txid.toLowerCase() + '&net=' + (/Testnet/.test(r.net || '') ? 'test' : 'main') : ''; }
  function rcptTitle(r) { return r.kind === 'refund' ? 'Refund · transfer to ' + r.other : r.kind === 'supporter' ? 'DigitalSaudi Supporter' : r.dir === 'in' ? 'From ' + r.other : 'To ' + r.other; }
  function valTxt(r) { return r && r.usd ? (r.lr && r.lc && r.lc !== 'USD' ? money(r.amount * r.lr, r.lc) + ' · ' : '') + money(r.amount * r.usd, 'USD') : ''; }
  function rateTxt(r) { return r && r.usd ? '1 π = ' + money(r.usd, 'USD', 4) + (r.lr && r.lc && r.lc !== 'USD' ? ' · ' + money(r.lr, r.lc, r.lr < 1 ? 4 : 2) : '') : ''; }
  function spec(r) {
    var d = new Date(r.ts), when = [['Date', d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })], ['Time', d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })]];
    var sub = r.usd ? '≈ ' + money(r.amount * r.usd, 'USD') + (r.lr && r.lc && r.lc !== 'USD' ? ' · ' + money(r.amount * r.lr, r.lc) : '') + ' at payment time' : '';
    var mine = (get('name', '') || '@' + (r.me || me())) + (get('name', '') && (r.me || me()) ? ' (@' + (r.me || me()) + ')' : '');
    var base = { amount: fpi(r.amount), sub: sub, verify: verifyUrl(r), status: { text: '✓  Verified on the Pi blockchain', ok: true } };
    if (r.kind === 'refund') return Object.assign(base, { title: 'Automatic refund', rows: [['From', 'DigitalSaudi app wallet (automatic)'], ['To', mine], ['Reason', 'Your transfer to ' + r.other + ' could not be delivered'], ['Narration', r.narr || '—'], ['Pi rate', rateTxt(r)], ['Reference', r.pid]].concat(when, [['Network', r.net], ['Your address', r.addr, 1], ['Transaction ID', r.txid, 1]]), thanks: 'Refunded by DigitalSaudi', note: 'Refunded automatically.' });
    if (r.kind === 'supporter') return Object.assign(base, { title: 'Payment receipt', status: { text: '✓  Completed', ok: true }, rows: [['Paid by', mine], ['For', 'DigitalSaudi Supporter badge'], ['Pi rate', rateTxt(r)], ['Payment ID', r.pid, 1]].concat(when, [['Network', r.net], ['Transaction ID', r.txid, 1]]), thanks: 'Thank you for supporting DigitalSaudi', note: 'The badge supports the app. It gives no reward or financial return.' });
    var rate = rateTxt(r);
    if (r.kind === 'wallet') {
      var wi = r.dir === 'in';
      return Object.assign(base, { title: wi ? 'Payment received' : 'Payment receipt',
        rows: [['From', wi ? short(r.from || r.addr) : mine], ['To', wi ? mine : short(r.addr)], ['Narration', r.narr || '—'], ['Category', wi ? '' : r.cat], ['Value', valTxt(r)], ['Pi rate', rate], ['Paid with', 'Pi Wallet'], ['Reference', r.pid]].concat(when, [['Network', r.net], ['Sender address', r.from, 1], ['Recipient address', wi ? r.to : r.addr, 1], ['Transaction ID', r.txid, 1]]),
        thanks: wi ? 'Received · verified by DigitalSaudi' : 'Paid · verified by DigitalSaudi', note: 'Paid from Pi Wallet' });
    }
    var inn = r.dir === 'in', fee = inn ? 0 : (r.fee || 0.01), A = r.tk === 'address';
    return Object.assign(base, { title: inn ? 'Transfer received' : 'Transfer receipt',
      rows: [['From', inn ? r.other : mine], ['To', inn ? mine : (A ? 'Pi wallet address' : r.other)], ['Narration', r.narr || '—'], ['Category', inn ? '' : r.cat], ['Value', valTxt(r)], ['Pi rate', rate]].concat(fee ? [['Blockchain fee', fpi(fee) + ' π'], ['Total paid', fpi(r7(Number(r.amount) + fee)) + ' π']] : [], [['Reference', r.pid]], when, [['Network', r.net], [inn ? 'Your address' : 'Recipient address', r.addr, 1], ['Transaction ID', r.txid, 1]]),
      thanks: inn ? 'Received with DigitalSaudi' : 'Sent with DigitalSaudi', note: 'Paid in DigitalSaudi' });
  }
  function fontsReady() { try { return document.fonts && document.fonts.ready ? Promise.race([document.fonts.ready, new Promise(function (r) { setTimeout(r, 1500); })]) : Promise.resolve(); } catch (e) { return Promise.resolve(); } }
  function rcName(r) { var d = new Date(r.ts); return 'DigitalSaudi-receipt-' + d.getFullYear() + String(d.getMonth() + 1).padStart(2, '0') + String(d.getDate()).padStart(2, '0') + '-' + String(r.txid || r.pid || Date.now()).slice(0, 8) + '.jpg'; }
  function rcType(r) { return r.kind === 'refund' ? 'Automatic refund' : r.kind === 'supporter' ? 'Supporter payment' : r.kind === 'wallet' ? (r.dir === 'in' ? 'Payment received' : 'Payment sent · Pi Wallet') : r.dir === 'in' ? 'Transfer received' : 'Transfer sent'; }
  /* Transaction details: every fact about the payment, then share or download the receipt image */
  /* animated payment status: a drawn check (succeeded), a turning ring (pending), a drawn cross (not completed) */
  function stMark(kind) {
    var C = '<circle class="sa-c" cx="40" cy="40" r="34"/>';
    if (kind === 'ok' || kind === 'in') return '<svg class="sa ok" viewBox="0 0 80 80" aria-hidden="true">' + C + '<path class="sa-d" d="M25 41l10 10 21-22"/></svg>';
    if (kind === 'pending') return '<svg class="sa pend" viewBox="0 0 80 80" aria-hidden="true"><circle class="sa-t" cx="40" cy="40" r="34"/><circle class="sa-c" cx="40" cy="40" r="34"/><path class="sa-h" d="M40 24v17l11 7"/></svg>';
    if (kind === 'refund') return '<svg class="sa rf" viewBox="0 0 80 80" aria-hidden="true">' + C + '<path class="sa-d" d="M30 32h17a10 10 0 0 1 0 20H33M30 32l7-7M30 32l7 7"/></svg>';
    return '<svg class="sa bad" viewBox="0 0 80 80" aria-hidden="true">' + C + '<path class="sa-d" d="M29 29l22 22M51 29L29 51"/></svg>';
  }
  function payState(w, kind, title, sub, reset) {
    var box = $('.pst', w); if (!box) { box = document.createElement('div'); var big = $('.big', w); if (big) big.parentNode.insertBefore(box, big.nextSibling); else $('.sh', w).appendChild(box); }
    box.className = 'pst ' + kind; box.setAttribute('role', 'status');
    box.innerHTML = stMark(kind) + '<b class="pst-t">' + esc(title) + '</b>' + (sub ? '<span class="pst-s">' + sub + '</span>' : '') + (reset ? '<button type="button" class="btn soft pst-r" data-act="repair">' + ic('refresh') + 'Reset now</button>' : '');
    try { if (navigator.vibrate) navigator.vibrate(kind === 'ok' ? [40, 40, 90] : kind === 'pending' ? 30 : [120, 60, 120]); } catch (e) {}
  }
  var PEND_MSG = 'A payment is still pending. Go to Profile, tap Reset, then try again.';
  function noFunds(m) { return /insufficient|not enough|balance is too low|underfunded|low balance|funds/i.test(m || ''); }
  function showRcpt(r) {
    if (!r) return;
    var inn = r.dir === 'in', v = verifyUrl(r), fee = !inn && r.kind === 'transfer' ? (r.fee || 0.01) : 0, d = new Date(r.ts);
    var mine = (get('name', '') ? get('name', '') + ' · ' : '') + '@' + (r.me || me());
    var rows = [];
    if (r.kind === 'refund') rows.push(['From', 'DigitalSaudi app wallet (automatic)'], ['To', mine], ['Reason', 'Your transfer to ' + r.other + ' could not be delivered']);
    else if (r.kind === 'supporter') rows.push(['Paid by', mine], ['For', 'DigitalSaudi Supporter badge']);
    else if (r.kind === 'wallet') rows.push(['From', inn ? short(r.from || r.addr) : mine], ['To', inn ? mine : short(r.addr)], ['Paid with', 'Pi Wallet']);
    else rows.push(['From', inn ? r.other : mine], ['To', inn ? mine : (r.tk === 'address' ? 'Pi wallet address' : r.other)]);
    if (r.narr && r.kind !== 'supporter') rows.push(['Narration', r.narr]);
    if (r.cat && !inn) rows.push(['Category', r.cat]);
    if (r.usd) rows.push(['Value at payment time', (r.lr && r.lc && r.lc !== 'USD' ? money(r.amount * r.lr, r.lc) + ' · ' : '') + money(r.amount * r.usd, 'USD')]);
    if (rateTxt(r)) rows.push([Math.abs((r.saved || r.ts) - r.ts) > 3600e3 ? 'Pi rate (when saved)' : 'Pi rate', rateTxt(r)]);
    if (fee) rows.push(['Amount', fpi(r.amount) + ' π'], ['Blockchain fee', fpi(fee) + ' π'], ['Total paid', fpi(r7(Number(r.amount) + fee)) + ' π']);
    rows.push(['Date', d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' })], ['Time', d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })], ['Network', r.net || NETN], ['Status', 'Completed']);
    if (r.pid) rows.push([r.kind === 'supporter' ? 'Payment ID' : 'Reference', r.pid, 1]);
    if (r.kind === 'wallet') { if (r.from) rows.push(['Sender address', r.from, 1]); if (inn ? r.to : r.addr) rows.push(['Recipient address', inn ? r.to : r.addr, 1]); }
    else if (r.addr) rows.push([inn || r.kind === 'refund' ? 'Your address' : 'Recipient address', r.addr, 1]);
    if (r.txid) rows.push(['Transaction ID', r.txid, 1]);
    HK.rows.forEach(function (f) { try { f(rows, r); } catch (e) {} });
    var cls = r.kind === 'refund' ? 'rf' : r.kind === 'supporter' ? 'sp' : inn ? 'in' : '';
    var w = sheet('Transaction details',
      '<div class="txd"><div class="txd-st">' + stMark(r.kind === 'refund' ? 'refund' : 'ok') + '<b>' + (r.kind === 'refund' ? 'Payment refunded' : inn ? 'Payment received' : 'Payment succeeded') + '</b></div><p class="small">' + esc(rcType(r)) + '</p>' +
      '<div class="txd-v num' + (inn ? ' pos' : '') + '">' + (inn ? '+' : '−') + fpi(r.amount) + ' π</div>' +
      (r.usd ? '<p class="small muted num">≈ ' + money(r.amount * r.usd, 'USD') + (r.lr && r.lc && r.lc !== 'USD' ? ' · ' + money(r.amount * r.lr, r.lc) : '') + ' at payment time</p>' : '') +
      '<span class="txd-ok">' + ic('check', 'width:15px;height:15px') + 'Verified on the Pi blockchain</span></div>' +
      '<div class="list txd-rows">' + rows.map(function (x, i) { return '<div class="txr"><span>' + esc(x[0]) + '</span><b class="' + (x[2] ? 'num mono' : '') + '">' + esc(x[1]) + '</b>' + (x[2] ? '<button type="button" class="cp" data-cp="' + i + '" aria-label="Copy ' + esc(x[0]) + '">' + ic('copy') + '</button>' : '') + '</div>'; }).join('') + '</div>' +
      '<div class="two"><button type="button" class="btn" data-x="share">' + ic('share') + 'Share image</button><button type="button" class="btn ghost" data-x="dl">' + ic('down') + 'Save to gallery</button></div><button type="button" class="lnk" data-x="lnk" style="display:block;margin:10px auto 0">' + ic('link', 'width:16px;height:16px;vertical-align:-3px') + ' Share as a link</button>' +
      (v ? '<a class="btn soft" href="' + esc(v) + '">' + ic('ext') + 'View on the Pi blockchain</a>' : '') +
      '<div class="sec" style="margin-top:20px"><h2>Receipt</h2></div><div id="rc-prev" class="empty">Preparing receipt…</div>' +
      '');
    $$('[data-cp]', w).forEach(function (b) { b.onclick = function () { copy(rows[+b.dataset.cp][1]); }; });
    var cvP = fontsReady().then(function () { return window.FPReceipt ? FPReceipt.canvas(HK.spec.reduce(function (sp, f) { try { return f(sp, r) || sp; } catch (e) { return sp; } }, spec(r))) : null; });
    cvP.then(function (cv) { var p = $('#rc-prev', w); if (!p) return; if (!cv) { p.textContent = 'Receipt image unavailable.'; return; } p.className = ''; p.innerHTML = '<img class="rc-img" alt="DigitalSaudi receipt" src="' + cv.toDataURL('image/png') + '">'; });
    var name = rcName(r), text = 'DigitalSaudi receipt · ' + rcType(r) + ' · ' + fpi(r.amount) + ' π · ' + d.toLocaleDateString('en-GB') + (v ? '\nVerify on the Pi blockchain: ' + v : '');
    var jpg = cvP.then(function (cv) { return cv ? new Promise(function (ok) { cv.toBlob(ok, 'image/jpeg', 0.92); }) : null; });
    var shortT = 'DigitalSaudi receipt · ' + rcType(r) + ' · ' + fpi(r.amount) + ' π · ' + d.toLocaleDateString('en-GB');
    $('[data-x="share"]', w).onclick = function () { jpg.then(function (b) { if (!b) return shareText('DigitalSaudi receipt', text); shareImage(b, name, 'DigitalSaudi receipt', text, shortT); }); };
    $('[data-x="lnk"]', w).onclick = function () { jpg.then(function (b) { if (!b) return shareText('DigitalSaudi receipt', text); shareLink(b, name, 'image/jpeg', 'DigitalSaudi receipt', shortT); }); };
    $('[data-x="dl"]', w).onclick = function () { jpg.then(function (b) { if (!b) return toast('Receipt image unavailable'); saveFile(b, name, 'image/jpeg', 'receipt'); }); };
  }

  /* ── live Pi price ── */
  try { S.p = get('price', null); if (S.p) S.p.stale = true; S.fx = get('fx', null); } catch (e) {}
  var pBusy = false, pLast = 0;
  function loadPrice(force) {
    if (pBusy || (!force && Date.now() - pLast < 20000)) return;
    pBusy = true; pLast = Date.now();
    api('/pi-price').then(function (d) { if (d && d.ok && d.usd) { S.p = d; S.p.stale = !!d.stale; put('price', d); if (!d.stale) checkAlerts(); } else if (S.p) S.p.stale = true; })
      .catch(function () { if (S.p) S.p.stale = true; }).then(function () { pBusy = false; paintPrice(); });
    if (!S.fx || Date.now() - (get('fxT', 0)) > 6 * 3600e3) api('/fx').then(function (d) { if (d && d.ok && d.rates) { S.fx = d.rates; put('fx', d.rates); put('fxT', Date.now()); paintPrice(); } }).catch(function () {});
  }
  function heroHTML() {
    var p = S.p, c = curr(), r = rateIn(c), ch = p && typeof p.change24h === 'number' ? p.change24h : null;
    if (!p || !p.usd) return '<div class="hero-k"><span><span class="live off"></span>Pi price</span></div><div class="hero-v" style="font-family:var(--f);font-size:22px">' + (pBusy ? '<span class="skel"></span>' : 'Rate unavailable right now') + '</div><div class="hero-s">' + (pBusy ? '' : '<button type="button" class="cur-b" data-act="price-retry">' + ic('refresh', 'width:14px;height:14px') + 'Try again</button>') + '</div>';
    return '<div class="hero-k"><span><span class="live"></span>Pi price</span>' + (ch !== null ? '<span class="pill ' + (ch >= 0 ? 'up' : 'dn') + '">' + (ch >= 0 ? '▲ ' : '▼ ') + Math.abs(ch).toFixed(2) + '%</span>' : '') + '</div>' +
      '<div class="hero-v">1 π = ' + money(p.usd, 'USD', p.usd < 1 ? 4 : 2) + '</div>' +
      '<div class="hero-s">' + (c !== 'USD' && r ? '<span>≈ <span class="num">' + money(r, c, r < 1 ? 4 : 2) + '</span></span>' : '') + '<button type="button" class="cur-b" data-act="currency">' + ic('globe', 'width:14px;height:14px') + esc(c) + '</button></div>' +
      spark(p.spark, 300, 58, '#E3BD65', .35);
  }
  function paintPrice() {
    var h = $('[data-p="hero"]'); if (h) h.innerHTML = heroHTML();
    var lv = $('#ld-rate-v'); if (lv) { var p = S.p, c = curr(), r = rateIn(c); lv.textContent = p && p.usd ? money(p.usd, 'USD', 4) : 'unavailable'; $('#ld-rate-c').textContent = p && r && c !== 'USD' ? '≈ ' + money(r, c, r < 1 ? 4 : 2) : ''; $('#ld-live').className = 'live' + (p && !p.stale ? '' : ' off'); }
    var wc = $('[data-p="wchart"]'); if (wc) wc.innerHTML = wChartHTML();
    if ($('#cv-pi') && document.activeElement && !/^cv-/.test(document.activeElement.id || '')) cvCalc('pi');
    var ms = $('[data-p="month"]'); if (ms) ms.innerHTML = monthHTML();
    var wb = $('[data-p="wbal"]'); if (wb) wb.innerHTML = walBalHTML();
  }

  /* ── Pi SDK & sign-in ── */
  var piReady = false;
  function initPi() { if (piReady || !window.Pi) return !!window.Pi; try { Pi.init({ version: '2.0', sandbox: SANDBOX }); piReady = true; } catch (e) {} return piReady; }
  function onIncomplete(p) {
    if (!p || !p.identifier) return;
    if (p.metadata && p.metadata.type === 'transfer') { var pd = get('pend', {}); if (!pd[p.identifier]) { pd[p.identifier] = { ts: Date.now() }; put('pend', pd); } }
    api('/recover', { paymentId: p.identifier }).then(function () { setTimeout(function () { sync(); checkPendingInApp(); }, 600); }).catch(function () {});
  }
  /* An earlier payment was left unfinished (app closed, weak network): ask Pi for it again so /recover can
     complete it (if it reached the blockchain) or cancel it (if it never did). Tried now and again after 2 minutes. */
  var resolving = 0;
  function resolvePending() {
    if (Date.now() - resolving < 30000) return; resolving = Date.now();
    var go = function () { authP = null; authAt = 0; try { signIn(true); } catch (e) {} };
    go(); setTimeout(go, 130000);
  }
  window.fpResolvePending = function () { resolving = 0; resolvePending(); toast('Checking for an unfinished payment…'); };
  // One sign-in at a time: a second tap (or the automatic sign-in on opening) reuses the request already
  // waiting for Pi. A slow answer is not treated as a failure: DigitalSaudi signs in as soon as Pi replies.
  var authP = null, authAt = 0;
  var NET_ERR = /network|timeout|timed out|failed to fetch|consent|connection|offline/i;
  function authTry(n) {
    return Pi.authenticate(['username', 'payments', 'wallet_address'], onIncomplete).catch(function (e) {
      var why = String((e && (e.message || e.error || e)) || '');
      if (!NET_ERR.test(why) || n >= 4) throw e;
      if (n === 1) toast('Weak connection. Trying again…');
      return new Promise(function (ok) { setTimeout(ok, 2500 * n); }).then(function () {
        if (navigator.onLine === false) return new Promise(function (ok) { addEventListener('online', ok, { once: true }); setTimeout(ok, 15000); });
      }).then(function () { return authTry(n + 1); });
    });
  }
  function signIn(silent) {
    var btn = $('#signin'), msg = $('#ld-msg');
    if (!window.Pi || !initPi()) { if (!silent) { msg.textContent = 'Open DigitalSaudi in the Pi Browser to sign in with Pi.'; toast('Open DigitalSaudi in the Pi Browser'); } return Promise.resolve(false); }
    if (btn && !silent) { btn.disabled = true; $('#signin-t').textContent = 'Signing in…'; }
    if (!authP || Date.now() - authAt >= 20000) {
      authAt = Date.now();
      var attempt = authTry(1).then(function (a) {
        if (authP === attempt) authP = null;
        if (S.token && !S.guest) return true; // already signed in by an earlier attempt
        S.user = { username: a.user.username, uid: a.user.uid }; S.token = a.accessToken; S.guest = false; window.WALLET_TOKEN = a.accessToken;
        put('user', { username: a.user.username }); showApp(); afterSignIn();
        return true;
      }, function () { if (authP === attempt) authP = null; return false; });
      authP = attempt;
    }
    var p = authP;
    return new Promise(function (ok) {
      var slow = setTimeout(function () { if (!silent) msg.textContent = 'Connecting to Pi… If nothing happens, tap Sign in again.'; reset(); }, 15000);
      p.then(function (res) {
        clearTimeout(slow);
        if (res) msg.textContent = ''; else if (!silent) msg.textContent = 'Sign-in was cancelled or failed. Please try again.';
        reset(); ok(res);
      });
    });
    function reset() { if (btn) { btn.disabled = false; $('#signin-t').textContent = 'Sign in with Pi'; } }
  }
  function needSignIn(why) {
    if (signedIn()) return false;
    sheet('Sign in with Pi', '<p class="sh-sub">' + esc(why || 'Sign in with your Pi account to continue.') + '</p><button type="button" class="btn" data-x="go"><span class="pi-dot">π</span>Sign in with Pi</button>');
    $('.sh [data-x="go"]').onclick = function () { closeSheets(); signIn(); };
    return true;
  }
  function showApp() {
    $('#landing').hidden = true; $('#app').hidden = false;
    $('#av').textContent = signedIn() ? me().charAt(0) : 'G';
    $('#netb').hidden = !TEST; bellDot(); render(S.tab);
  }
  function askPush() {
    if (get('pushAsk', false) || get('push', false) || !('Notification' in window) || Notification.permission === 'denied') return;
    setTimeout(function () {
      if ($('.sh-wrap') || $('#app').hidden || get('pushAsk', false)) return; put('pushAsk', true);
      if (Notification.permission === 'granted') { put('push', true); return; }
      var w = sheet('Payment notifications', '<div class="np-hero">' + ic('bell') + '</div><p class="sh-sub" style="text-align:center">Get notified when you receive Pi, an invoice is paid, a payment is due or a refund is made.</p>' +
        '<button type="button" class="btn" id="np-on">' + ic('bell') + 'Turn on notifications</button><button type="button" class="btn ghost" id="np-no">Not now</button>');
      $('#np-on', w).onclick = function () { Notification.requestPermission().then(function (p) { if (p === 'granted') { put('push', true); toast('Notifications on'); } else toast('You can turn them on later in Profile'); closeSheets(); render(S.tab); }).catch(function () { closeSheets(); }); };
      $('#np-no', w).onclick = function () { closeSheets(); };
    }, 6000);
  }
  /* opened from the app with a task (#go=send, #go=receive, #go=biz …): done once signed in */
  var goAct = null;
  function runGo() { var a = goAct; goAct = null; if (a && A[a]) { try { A[a](); } catch (e) {} } }
  /* inside the app (embedded): the app is signed in already, so the wallet signs in with it; shown on request */
  function hostSigned() { try { return !!(window.WALLET_EMBED && parent.WALLET_HOST && parent.WALLET_HOST.signed()); } catch (e) { return false; } }
  window.WALLET_SHOW = function (a) { if (!S.token && window.Pi && hostSigned()) signIn(true); if (a) { goAct = a; if (S.token) setTimeout(runGo, 150); } };
  function afterSignIn() { setTimeout(runGo, 350); askPush(); HK.signin.forEach(function (f) { try { f(); } catch (e) {} }); register(); historySync(); loadCfg().then(function () { sync(); if (pendingCode) { var c = pendingCode; pendingCode = null; openCode(c); } }); }

  /* ── transfers: server status, registration, sync ── */
  function loadCfg() {
    return api('/transfer?a=status').then(function (d) {
      if (d && d.ok) { S.cfg = { enabled: !!d.enabled, usernames: !!d.usernames, payments: d.payments !== false, addresses: d.addresses !== false, fee: d.fee || 0.01, max: d.max || 0, daily: d.daily || 0 }; if (!$('.sh-wrap')) render(S.tab); }
    }).catch(function () {});
  }
  var registered = false;
  function register() { if (registered || !signedIn()) return; registered = true; api('/users', { accessToken: S.token, addr: get('addr', '') }).then(function (d) { if (!d || !d.ok) registered = false; }).catch(function () { registered = false; }); }
  function learnAddr(a) { if (a && /^G[A-Z2-7]{55}$/.test(a) && !get('addr', '')) put('addrSug', a); }
  function saveTransfer(t, dir) {
    var pend = get('pend', {}), pd = pend[t.pid] || {};
    var ok = saveRcpt({ kind: 'transfer', dir: dir, tk: dir === 'out' && (t.to_kind === 'address' || !t.to) ? 'address' : 'user', fee: dir === 'out' ? 0.01 : 0, amount: t.amount, other: dir === 'in' ? '@' + t.from : (t.to_kind === 'address' || !t.to ? short(t.to_addr) : '@' + t.to), narr: t.narr, cat: pd.cat || '', pid: t.pid, txid: t.txid, addr: t.to_addr, ts: t.done_ts || Date.now(), me: me() });
    if (dir === 'in') learnAddr(t.to_addr);
    if (pend[t.pid]) { delete pend[t.pid]; put('pend', pend); }
    return ok;
  }
  function saveRefund(t) {
    if (!t.refund_txid) return false; learnAddr(t.refund_addr);
    var tl = t.to_kind === 'address' || !t.to ? short(t.to_addr) : '@' + t.to;
    var ok = saveRcpt({ kind: 'refund', dir: 'in', amount: t.amount, other: tl, narr: t.narr, pid: t.pid, txid: t.refund_txid, addr: t.refund_addr, ts: t.done_ts || Date.now(), me: me() });
    if (ok && Date.now() - (t.done_ts || Date.now()) < 864e5) addNote('undo', 'Refunded automatically', fpi(t.amount) + ' π returned to you: your transfer to ' + tl + ' could not be delivered.', 'ref-' + t.pid);
    return ok;
  }
  function sync() {
    if (!signedIn() || !S.cfg.enabled) return;
    api('/transfer', { a: 'list', accessToken: S.token }).then(function (d) {
      if (!d || !d.ok) return; var ch = 0;
      (d.items || []).forEach(function (t) {
        if (t.status === 'paid') {
          if (saveTransfer(t, t.dir)) { ch++; if (t.dir === 'in' && Date.now() - (t.done_ts || Date.now()) < 864e5) { var m = fpi(t.amount) + ' π from @' + t.from + (t.narr ? ' · ' + t.narr : ''); addNote('req', 'You received Pi', m, 'in-' + t.pid); } }
        } else if (t.status === 'refunded' && t.dir === 'out') { if (saveRefund(t)) ch++; }
        else if (t.dir === 'out' && /^(failed|received|paying|refunding|refund_failed|refund_needed)$/.test(t.status)) {
          api('/transfer', { a: 'payout', paymentId: t.pid }).then(function (x) { if (x && x.ok && x.row) { if (saveTransfer(x.row, 'out')) rerender(); } else if (x && x.refunded && x.row && saveRefund(x.row)) rerender(); }).catch(function () {});
        }
      });
      if (ch) rerender();
    }).catch(function () {});
  }
  function rerender() { if ($('.sh-wrap') || $('#app').hidden) return; var ae = document.activeElement; if (ae && ae.id === 'act-q') return actPaint(); render(S.tab); }

  /* ── send flow ── */
  function guardPay() {
    if (needSignIn('Sign in with Pi to send and receive Pi.')) return false;
    if (!S.cfg.enabled) {
      loadCfg();
      sheet('Sending is not available yet', '<div class="note warn">' + ic('info') + '<span>DigitalSaudi is finishing its secure payment setup. Sending will open here automatically as soon as it is ready. Nothing has been charged.</span></div>' +
        '<div class="card" style="margin-top:12px"><h3>Meanwhile you can</h3><p>• Receive Pi with your @username or wallet address<br>• Check the live Pi rate and convert<br>• See your wallet balance and receipts</p></div>' +
        '<button type="button" class="btn" data-act="receive">' + ic('req') + 'Receive Pi</button>');
      return false;
    }
    if (!window.Pi || !initPi()) { toast('Open DigitalSaudi in the Pi Browser to pay'); return false; }
    return true;
  }
  var isG = function (v) { return /^G[A-Z2-7]{55}$/.test(v); };
  function toLabel(t) { return isG(t) ? short(t) : '@' + t; }
  function sendSheet(pre) {
    pre = pre || {};
    var addrOn = true, userOn = S.cfg.enabled ? !!S.cfg.usernames : true, okName = '', kind = !userOn || (pre.u && isG(pre.u)) ? 'addr' : 'user';
    var payees = contacts().map(function (c) { return c.to; }).concat(get('payees', [])).filter(function (p, i, L) { return (userOn || isG(p)) && L.map(function (q) { return q.toLowerCase(); }).indexOf(p.toLowerCase()) === i; }).slice(0, 8);
    var w = sheet('Send Pi',
      (pre.link || pre.x && pre.a ? '<div class="note gray" style="margin-bottom:8px">' + ic('qr') + '<span>Payment request from ' + esc(isG(pre.u) ? short(pre.u) : '@' + pre.u) + (pre.a ? ' for <b>' + fpi(pre.a) + ' π</b>' : '') + (pre.x ? ' · “' + esc(pre.x) + '”' : '') + '. Check it is someone you know.</span></div>' : '') +
      (userOn ? '<div class="seg" role="tablist" style="margin-bottom:4px"><button type="button" data-k="user">Username</button><button type="button" data-k="addr">Wallet address</button></div>' : '') +
      '<div id="k-user"><label class="l" for="s-u">To</label><div class="to"><span>@</span><input id="s-u" autocomplete="off" autocapitalize="none" spellcheck="false" placeholder="username" maxlength="60"></div></div>' +
      '<div id="k-addr" hidden><label class="l" for="s-g">Pi wallet address</label><textarea class="in num" id="s-g" rows="2" maxlength="60" autocapitalize="characters" spellcheck="false" placeholder="G…" style="font-size:14px;resize:none"></textarea></div>' +
      '<div class="hint" id="s-uh"></div>' +
      (payees.length && !pre.u ? '<div class="chips" style="margin-top:2px">' + payees.map(function (p) { return '<button type="button" class="chip" data-pu="' + esc(p) + '">' + (isG(p) ? ic('card', 'width:15px;height:15px;vertical-align:-3px') + ' ' : '') + esc(cName(p) || toLabel(p)) + '</button>'; }).join('') + '</div>' : '') +
      '<label class="l" for="s-a">Amount</label><div class="amt"><input id="s-a" type="number" inputmode="decimal" min="0" step="any" placeholder="0.00"><span>π</span></div><div class="hint num" id="s-c"></div>' +
      '<label class="l">Category</label><div class="chips" id="s-cat">' + CATS.map(function (c) { return '<button type="button" class="chip" data-c="' + c + '">' + c + '</button>'; }).join('') + '</div>' +
      '<label class="l" for="s-x">Narration</label><input class="in" id="s-x" maxlength="80" placeholder="What is it for? e.g. Rent, groceries, gift">' +
      '<div class="sum" id="s-sum" hidden></div>' +
      '<button type="button" class="btn" id="s-go">Continue</button>' +
      '<p class="small muted" style="margin-top:12px;text-align:center">' + ic('lock', 'width:14px;height:14px;vertical-align:-2px') + (S.cfg.enabled && S.cfg.max ? ' Up to ' + S.cfg.max + ' π per payment' : '') + '</p>');
    var u = $('#s-u', w), g = $('#s-g', w), a = $('#s-a', w), h = $('#s-uh', w), ok = null, tm = null, cat = pre.cat || '';
    function setKind(k) {
      kind = k; ok = null; h.innerHTML = '';
      $$('[data-k]', w).forEach(function (b) { b.classList.toggle('on', b.dataset.k === k); });
      $('#k-user', w).hidden = k !== 'user'; $('#k-addr', w).hidden = k !== 'addr';
      (k === 'user' ? u : g).oninput();
    }
    function sum() {
      var v = r7(a.value); $('#s-c', w).textContent = conv(v);
      var s = $('#s-sum', w); s.hidden = !(v > 0);
      s.innerHTML = '<div><span>They receive</span><b>' + fpi(v) + ' π</b></div><div><span>Blockchain fee</span><b>' + S.cfg.fee + ' π</b></div><div class="tot"><span>You pay</span><b>' + fpi(r7(v + S.cfg.fee)) + ' π</b></div>';
    }
    function setCat(c) { cat = c; $$('#s-cat .chip', w).forEach(function (b) { b.classList.toggle('on', b.dataset.c === c); }); }
    $$('#s-cat .chip', w).forEach(function (b) { b.onclick = function () { setCat(cat === b.dataset.c ? '' : b.dataset.c); }; });
    $$('[data-k]', w).forEach(function (b) { b.onclick = function () { setKind(b.dataset.k); }; });
    $$('[data-pu]', w).forEach(function (b) { b.onclick = function () { var p = b.dataset.pu; if (isG(p)) { setKind('addr'); g.value = p; g.oninput(); } else { setKind('user'); u.value = p; u.oninput(); } a.focus(); }; });
    a.oninput = sum;
    u.oninput = function () {
      var name = u.value.trim().replace(/^@/, ''); ok = null; clearTimeout(tm);
      if (/^G[A-Z2-7]{40,}$/.test(name.toUpperCase()) && name.length > 40) { if (addrOn) { setKind('addr'); g.value = name.toUpperCase(); g.oninput(); u.value = ''; } else h.innerHTML = '<span class="bad">That is a wallet address. Send to a DigitalSaudi @username instead.</span>'; return; }
      if (!USER_RE.test(name)) { h.textContent = ''; return; }
      h.textContent = 'Checking…';
      tm = setTimeout(function () {
        api('/users?u=' + encodeURIComponent(name)).then(function (d) {
          if (kind !== 'user' || u.value.trim().replace(/^@/, '') !== name) return;
          if (!d.ok) { h.innerHTML = '<span class="bad">' + esc(d.error || 'Could not check right now.') + '</span>'; return; }
          if (d.exists && d.username.toLowerCase() === me().toLowerCase()) { h.innerHTML = '<span class="bad">That is you.</span>'; return; }
          if (d.exists && !S.cfg.enabled) { if (/^G[A-Z2-7]{55}$/.test(d.addr || '')) { ok = d.addr; okName = d.username; h.innerHTML = '<span class="ok">✓ @' + esc(d.username) + ' · ' + esc(short(d.addr)) + '</span>'; } else h.innerHTML = '<span class="bad">@' + esc(d.username) + ' has not added a wallet address yet.</span>'; return; }
          if (d.exists) { ok = d.username; h.innerHTML = '<span class="ok">✓ @' + esc(d.username) + ' is on DigitalSaudi</span>'; }
          else h.innerHTML = '<span class="bad">@' + esc(name) + ' has not used DigitalSaudi yet.' + (addrOn ? ' You can send to their wallet address instead.' : ' They need to sign in to DigitalSaudi once to receive by @username.') + '</span>';
        }).catch(function () { h.textContent = 'No connection. Try again.'; });
      }, 400);
    };
    g.oninput = function () {
      var v = g.value.replace(/\s/g, '').toUpperCase(); ok = null; clearTimeout(tm);
      if (g.value !== v && !/^S/.test(v)) g.value = v;
      if (!v) { h.textContent = ''; return; }
      if (/^S/.test(v)) { g.value = ''; h.innerHTML = '<span class="bad">That looks like a SECRET key. Never share it with anyone. Enter the address that starts with G.</span>'; return; }
      if (v.length < 56) { h.textContent = v.length + ' of 56 characters'; return; }
      if (!validG(v)) { h.innerHTML = '<span class="bad">This address is not valid. Check every character.</span>'; return; }
      if (v === get('addr', '')) { h.innerHTML = '<span class="bad">That is your own wallet address.</span>'; return; }
      h.textContent = 'Checking the Pi blockchain…';
      tm = setTimeout(function () {
        hz('/accounts/' + v).then(function (acc) {
          if (kind !== 'addr' || g.value.replace(/\s/g, '').toUpperCase() !== v) return;
          if (!acc) { h.innerHTML = '<span class="bad">This address has no Pi account on ' + NETN + ' yet. Check it with the person.</span>'; return; }
          ok = v; h.innerHTML = '<span class="ok">✓ Valid Pi wallet address · ' + esc(short(v)) + '</span>';
        }).catch(function () { h.textContent = 'Could not reach the Pi blockchain. Try again.'; });
      }, 300);
    };
    if (pre.u) { if (isG(pre.u)) g.value = pre.u; else u.value = pre.u; }
    if (pre.a > 0) a.value = pre.a;
    if (pre.x) $('#s-x', w).value = pre.x;
    if (cat) setCat(cat);
    setKind(kind);
    sum();
    $('#s-go', w).onclick = function () {
      var v = r7(a.value), x = $('#s-x', w).value.trim(), btn = this, to = ok;
      if (!to) return toast(kind === 'addr' ? 'Enter a valid Pi wallet address' : 'Enter the Pioneer’s @username');
      if (!(v >= 0.01)) return toast('The smallest payment is 0.01 π');
      if (!x) return toast('What is this payment for?');
      if (isG(to) && !S.cfg.enabled) return review(to, v, x, cat, { wallet: true, name: kind === 'user' ? okName : '', first: get('payees', []).indexOf(to) < 0 });
      if (!signedIn()) { needSignIn('Sign in with Pi to send inside DigitalSaudi.'); return; }
      if (S.cfg.max && v > S.cfg.max) return toast('The most you can send at once is ' + S.cfg.max + ' π');
      if (!x) return toast('What is this payment for?');
      btn.disabled = true; btn.textContent = 'Checking…';
      api('/transfer', isG(to) ? { a: 'check', accessToken: S.token, addr: to, amt: v } : { a: 'check', accessToken: S.token, to: to, amt: v }).then(function (d) {
        btn.disabled = false; btn.textContent = 'Continue';
        if (!d || !d.ok) return toast((d && d.error) || 'This transfer cannot be sent right now');
        review(d.addr || d.to || to, v, x, cat, { first: d.first });
      }).catch(function () { btn.disabled = false; btn.textContent = 'Continue'; toast('No connection. Check your internet and try again.'); });
    };
    if (!pre.u) setTimeout(function () { (kind === 'addr' ? g : u).focus(); }, 120);
  }
  /* ── protection: trusted recipients, community scam reports and a risk check before every payment ── */
  function contactOf(to) { var l = String(to || '').replace(/^@/, '').toLowerCase(); return contacts().filter(function (x) { return x.to.replace(/^@/, '').toLowerCase() === l; })[0] || null; }
  function isTrusted(to) { var c = contactOf(to); return !!(c && c.trusted); }
  function lev(a, b) { if (Math.abs(a.length - b.length) > 1) return 9; var d = []; for (var i = 0; i <= a.length; i++) { d[i] = [i]; } for (var j = 0; j <= b.length; j++) d[0][j] = j; for (i = 1; i <= a.length; i++) for (j = 1; j <= b.length; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); return d[a.length][b.length]; }
  // an address or username that looks like one you know but is not the same: a common trick
  function lookAlike(to) {
    var A = isG(to), known = contacts().map(function (c) { return { n: c.name, to: c.to }; }).concat(get('payees', []).map(function (p) { return { n: toLabel(p), to: p }; }));
    for (var i = 0; i < known.length; i++) {
      var k = known[i].to; if (!k || k.toLowerCase() === String(to).toLowerCase()) continue;
      if (A && isG(k) && k.slice(0, 4) === to.slice(0, 4) && k.slice(-4) === to.slice(-4)) return known[i];
      if (!A && !isG(k) && to.length > 3 && lev(k.replace(/^@/, '').toLowerCase(), String(to).toLowerCase()) === 1) return known[i];
    }
    return null;
  }
  function riskCheck(to, amt, o, box, done) {
    var R = [], A = isG(to), tr = isTrusted(to);
    function add(lv, t) { R.push([lv, t]); }
    if (tr) add(0, 'Trusted recipient'); else if (!o.first) add(0, 'You have paid ' + (A ? 'this address' : '@' + to) + ' before'); else add(1, 'First payment to ' + (A ? 'this address' : '@' + to));
    var la = lookAlike(to); if (la) add(2, 'Looks like ' + la.n + ' but it is a different ' + (A ? 'address' : 'username'));
    var out = rcpts().filter(function (r) { return r.dir === 'out' && r.kind !== 'refund' && Date.now() - r.ts < 90 * 864e5; }), mx = Math.max.apply(null, out.map(function (r) { return Number(r.amount); }).concat([0]));
    if (out.length >= 3 && amt > Math.max(10, mx * 3)) add(1, 'Much larger than your usual payments');
    var b = get('budget', 0); if (b > 0) { var sp = monthStats(0).out; if (sp + amt > b) add(1, 'This goes over your monthly budget'); }
    function paint(rep) {
      var L = R.slice(); if (rep) L.splice(1, 0, rep);
      var hi = L.some(function (x) { return x[0] === 2; }), mid = L.some(function (x) { return x[0] === 1; }), lvl = hi ? 'high' : mid ? 'mid' : 'low';
      box.className = 'risk ' + lvl;
      box.innerHTML = '<div class="risk-h"><b>Payment risk check</b><span class="risk-l">' + (hi ? 'High risk' : mid ? 'Check carefully' : 'Low risk') + '</span></div>' +
        L.map(function (x) { return '<div class="risk-r r' + x[0] + '">' + ic(x[0] === 0 ? 'check' : 'warn') + '<span>' + esc(x[1]) + '</span></div>'; }).join('') +
        '<button type="button" class="lnk risk-rep" data-rr>Report this ' + (A ? 'address' : 'username') + '</button>';
      $('[data-rr]', box).onclick = function () { reportSheet(to); };
      done(lvl);
    }
    paint([1, 'Checking scam reports…']);
    api('/report?k=' + encodeURIComponent(to)).then(function (d) {
      if (!d || !d.ok) return paint([1, 'Scam reports could not be checked']);
      // a warning appears only once 50 different Pioneers have reported it
      paint(d.flagged ? [2, 'Reported as a scam by ' + d.n + ' Pioneers'] : [0, 'No scam warnings']);
    }).catch(function () { paint([1, 'Scam reports could not be checked']); });
  }
  var RREASON = [['scam', 'Scam or fraud'], ['nodelivery', 'Paid, nothing delivered'], ['impersonation', 'Pretends to be someone else'], ['fake', 'Fake receipt or payment'], ['other', 'Other']];
  function reportSheet(pre) {
    var why = 'scam';
    var w = sheet('Report a scam', '' +
      '<label class="l" for="rp-k">@username or Pi wallet address</label><textarea class="in num" id="rp-k" rows="2" maxlength="60" autocapitalize="none" spellcheck="false" style="font-size:14px;resize:none" placeholder="@username or G…">' + esc(pre ? (isG(pre) ? pre : '@' + pre) : '') + '</textarea>' +
      '<label class="l">What happened?</label><div class="chips" id="rp-r">' + RREASON.map(function (x) { return '<button type="button" class="chip' + (x[0] === why ? ' on' : '') + '" data-rw="' + x[0] + '">' + x[1] + '</button>'; }).join('') + '</div>' +
      '<div class="hint" id="rp-h"></div><button type="button" class="btn danger" id="rp-go">' + ic('warn') + 'Send report</button>', { stack: true });
    $$('[data-rw]', w).forEach(function (b) { b.onclick = function () { why = b.dataset.rw; $$('[data-rw]', w).forEach(function (x) { x.classList.toggle('on', x === b); }); }; });
    $('#rp-go', w).onclick = function () {
      var k = $('#rp-k', w).value.replace(/\s/g, ''), bt = this;
      if (!(isG(k.toUpperCase()) && validG(k.toUpperCase())) && !USER_RE.test(k.replace(/^@/, ''))) return toast('Enter a valid @username or Pi wallet address');
      if (!signedIn()) return needSignIn('Sign in with Pi to send a report.');
      bt.disabled = true;
      api('/report', { a: 'report', accessToken: S.token, k: isG(k.toUpperCase()) ? k.toUpperCase() : k, reason: why }).then(function (d) {
        bt.disabled = false; if (!d || !d.ok) return toast((d && d.error) || 'Could not send the report. Try again.');
        var c = contactOf(k); if (c && c.trusted) put('contacts', contacts().map(function (x) { if (x === c || x.to === c.to) x.trusted = false; return x; }));
        w.remove(); toast('Report sent. Thank you for protecting the community.');
      }).catch(function () { bt.disabled = false; toast('No connection. Try again.'); });
    };
  }
  function trustedSheet() {
    var L = contacts().filter(function (c) { return c.trusted; });
    var w = sheet('Trusted recipients', ''+
      '<div class="list">' + (L.length ? L.map(function (c) { return '<button type="button" class="li" data-tp="' + esc(c.to) + '"><span class="ico in">' + ic('shield') + '</span><span class="grow"><b>' + esc(c.name) + '</b><small class="num">' + esc(toLabel(c.to)) + '</small></span><span class="go">' + ic('chev') + '</span></button>'; }).join('') : '<div class="empty">' + ic('shield') + '<div>No trusted recipients yet.</div></div>') + '</div>' +
      '<button type="button" class="btn" data-x="add">' + ic('plus') + 'Add trusted recipient</button>');
    $$('[data-tp]', w).forEach(function (b) { b.onclick = function () { var all = contacts(), i = -1; all.forEach(function (c, k) { if (c.to === b.dataset.tp) i = k; }); contactEdit(i); }; });
    $('[data-x="add"]', w).onclick = function () { contactEdit(-1); setTimeout(function () { var t = $('#ct-tr'); if (t) t.checked = true; }, 50); };
  }
  function review(to, amt, narr, cat, o) {
    var A = isG(to), warn = [], lc = String(to).toLowerCase();
    var dup = rcpts().filter(function (r) { return r.dir === 'out' && r.kind !== 'refund' && Date.now() - (r.ts || 0) < 30 * 60e3 && Math.abs(Number(r.amount) - amt) < 1e-7 && (A ? r.addr === to : String(r.other || '').toLowerCase() === '@' + lc); })[0]
      || pendingList().filter(function (q) { return String(q.to).toLowerCase() === lc && Math.abs(Number(q.amt) - amt) < 1e-7; })[0];
    if (dup) warn.push('<div class="note warn">' + ic('warn') + '<span>You already sent <b>' + fpi(amt) + ' π</b> to ' + esc(toLabel(to)) + ' at ' + new Date(dup.ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + '. Check this is not a repeat payment.</span></div>');
    if (A && !o.name) warn.push('<div class="note warn">' + ic('warn') + '<span>You are sending to a <b>wallet address</b>. Check every character with the person. Pi sent to a wrong address cannot be recovered.</span></div>');
    if (o.first) warn.push('<div class="note gray">' + ic('shield') + '<span>DigitalSaudi staff will never ask you to send Pi.</span></div>');
    warn.push('<div class="note gray">' + ic('info') + '<span>Blockchain payments cannot be reversed.</span></div>');
    var w = sheet('Check before you send',
      '<div class="big"><div class="v">' + fpi(amt) + ' π</div><div class="c">' + esc(conv(amt)) + '</div><div class="w">To ' + esc(o.name ? '@' + o.name : toLabel(to)) + '</div></div>' +
      '<div class="sum">' + (A ? '<div style="display:block"><span>To wallet address</span><b class="num" style="display:block;text-align:left;margin-top:4px;font-size:13px;overflow-wrap:anywhere">' + esc(to) + '</b></div>' : '<div><span>To</span><b class="t">@' + esc(to) + '</b></div>') +
      '<div><span>For</span><b class="t">' + esc(narr) + '</b></div>' + (cat ? '<div><span>Category</span><b class="t">' + esc(cat) + '</b></div>' : '') +
      '<div><span>They receive</span><b>' + fpi(amt) + ' π</b></div><div><span>' + (o.wallet ? 'Network fee (Pi Wallet)' : 'Blockchain fee') + '</span><b>' + S.cfg.fee + ' π</b></div><div class="tot"><span>You pay</span><b>' + fpi(r7(amt + S.cfg.fee)) + ' π</b></div></div>' +
      '<div class="risk" id="rv-risk"></div>' +
      (!isTrusted(to) ? '<label class="tg rt-tg"><input type="checkbox" id="rv-tr"><span>Save to trusted recipients</span></label>' : '') +
      '<label class="tg rt-tg" id="rv-ackw" hidden><input type="checkbox" id="rv-ack"><span>I understand the risk and still want to pay</span></label>' +
      '<div style="margin-top:12px">' + warn.join('') + '</div>' +
      (A && (o.wallet || !S.cfg.enabled) ? '<button type="button" class="btn" id="rv-w">' + ic('card') + 'Continue in Pi Wallet</button>'
        : '<button type="button" class="btn" id="rv-ok">' + ic('lock') + 'Confirm and pay</button>') +
      '<button type="button" class="btn ghost" id="rv-ed">Edit</button>');
    var risk = 'low';
    riskCheck(to, amt, o, $('#rv-risk', w), function (l) { risk = l; var ak = $('#rv-ackw', w); if (ak) ak.hidden = l !== 'high'; var tt = $('#rv-tr', w); if (tt && l === 'high') { tt.checked = false; tt.closest('label').hidden = true; } });
    function gate() { if (risk === 'high' && !$('#rv-ack', w).checked) { toast('Tick the box to confirm you understand the risk'); return false; } var tt = $('#rv-tr', w); if (tt && tt.checked) { var L2 = contacts().filter(function (x) { return x.to.toLowerCase() !== String(to).toLowerCase(); }); L2.push({ name: toLabel(to), to: to, trusted: true }); L2.sort(function (a, b) { return a.name.localeCompare(b.name); }); put('contacts', L2.slice(0, 200)); } return true; }
    var ok1 = $('#rv-ok', w); if (ok1) ok1.onclick = function () { if (!gate()) return; if (!window.Pi || !initPi()) return toast('Open DigitalSaudi in the Pi Browser to pay inside DigitalSaudi'); pay(to, amt, narr, cat); };
    var ok2 = $('#rv-w', w); if (ok2) ok2.onclick = function () { if (!gate()) return; walletPay(to, amt, narr, cat); };
    $('#rv-ed', w).onclick = function () { sendSheet({ u: to, a: amt, x: narr, cat: cat }); };
  }
  function pay(to, amt, narr, cat) {
    if (S.cfg.payments === false) { closeSheets(); return toast('Pi payments open soon. Nothing was charged.'); }
    var A = isG(to), lab = toLabel(to);
    var w = sheet('Paying ' + lab,
      '<div class="big"><div class="v">' + fpi(amt) + ' π</div><div class="c">' + esc(conv(amt)) + '</div><div class="w">To ' + esc(lab) + ' · ' + esc(narr) + '</div></div>' +
      '<div class="steps"><div id="st1" class="on">Confirm payment</div><div id="st2">Confirming your payment</div><div id="st3">Delivering to ' + esc(lab) + '</div></div><div class="status" id="st-m">Waiting for your approval…</div>');
    var refused = false, tries = 0, curPid = '';
    function step(n, m, cls) { for (var i = 1; i <= 3; i++) { var e = $('#st' + i); if (e) e.className = i < n ? 'done' : i === n ? 'on' : ''; } var s = $('#st-m'); if (s) { s.className = 'status' + (cls ? ' ' + cls : ''); s.innerHTML = m; } }
    function finish(row) {
      put('ipend', get('ipend', []).filter(function (x) { return x.pid !== row.pid; }));
      var pend = get('pend', {}); pend[row.pid] = { cat: cat }; put('pend', pend);
      saveTransfer(row, 'out');
      var pl = get('payees', []).filter(function (x) { return x.toLowerCase() !== to.toLowerCase(); }); pl.unshift(to); put('payees', pl.slice(0, 12));
      addNote('send', 'Transfer delivered', fpi(amt) + ' π to ' + lab + ' · ' + narr, 'out-' + row.pid);
      step(4, '✓ Delivered to ' + esc(lab) + ' and recorded on the Pi blockchain.', 'ok');
      payState(w, 'ok', 'Payment succeeded!', fpi(amt) + ' π delivered to ' + esc(lab));
      var b = document.createElement('button'); b.type = 'button'; b.className = 'btn'; b.innerHTML = ic('rcpt') + 'View receipt';
      b.onclick = function () { var r = rcpts().filter(function (x) { return x.txid === row.txid; })[0]; showRcpt(r); };
      var d2 = document.createElement('button'); d2.type = 'button'; d2.className = 'btn ghost'; d2.textContent = 'Done'; d2.onclick = function () { closeSheets(); render(S.tab); };
      var sh = $('.sh', w); if (sh) { sh.appendChild(b); sh.appendChild(d2); }
    }
    function refunded(row) { put('ipend', get('ipend', []).filter(function (x) { return x.pid !== row.pid; })); saveRefund(row); step(3, '↩ This transfer could not be delivered, so ' + fpi(amt) + ' π was refunded to you automatically on the Pi blockchain.', 'err'); payState(w, 'refund', 'Payment refunded', fpi(amt) + ' π is back in your wallet.'); }
    try {
      Pi.createPayment({ amount: r7(amt + S.cfg.fee), memo: ('DigitalSaudi transfer to ' + lab).slice(0, 60), metadata: A ? { type: 'transfer', addr: to, amt: amt, narr: narr } : { type: 'transfer', to: to, amt: amt, narr: narr } }, {
        onReadyForServerApproval: function (pid) {
          var pend = get('pend', {}); pend[pid] = { cat: cat, to: to, amt: amt, narr: narr, ts: Date.now() }; put('pend', pend);
          curPid = pid;
          api('/approve', { paymentId: pid }).then(function (d) { if (d && d.approved === false) { refused = true; dropPending(pid); step(1, '✕ ' + esc(d.error || 'This payment could not be sent.') + (/Nothing was charged/.test(d.error || '') ? '' : ' Nothing was charged.'), 'err'); payState(w, 'fail', 'Payment not completed', 'No Pi was moved.'); } }).catch(function () {});
        },
        onReadyForServerCompletion: function (pid, txid) {
          var ip = get('ipend', []).filter(function (x) { return x.pid !== pid; }); ip.unshift({ pid: pid, ts: Date.now() }); put('ipend', ip.slice(0, 20));
          step(2, 'Confirming your payment on the Pi blockchain…');
          api('/complete', { paymentId: pid, txid: txid }).then(function (d) {
            step(3, 'Delivering to ' + esc(lab) + '…');
            var t = d && d.transfer;
            if (t && t.ok && t.row) return finish(t.row);
            if (t && t.refunded && t.row) return refunded(t.row);
            (function retry() {
              api('/transfer', { a: 'payout', paymentId: pid }).then(function (x) {
                if (x && x.ok && x.row && x.row.txid) return finish(x.row);
                if (x && x.refunded && x.row) return refunded(x.row);
                if (++tries < 40) { step(3, 'Delivering to ' + esc(lab) + '… The receipt will appear in Activity.'); if (tries === 2) payState(w, 'pending', 'Payment pending', 'DigitalSaudi is finishing it automatically. Your receipt appears in Activity.'); setTimeout(retry, 8000); }
                else { step(3, 'Payment processing. The receipt will appear in Activity once delivered.'); payState(w, 'pending', 'Payment pending', 'If it stays pending, go to Profile and tap Reset.', true); }
              }).catch(function () { if (++tries < 40) setTimeout(retry, 8000); });
            })();
          }).catch(function () { step(2, 'Connection problem. Your payment is recorded; DigitalSaudi finishes it automatically when you reopen the app.', 'err'); payState(w, 'pending', 'Payment pending', 'If it stays pending, go to Profile and tap Reset.', true); });
        },
        onCancel: function (cp) { dropPending(cp || curPid); if (!refused) { step(1, 'You cancelled. Nothing was paid.', 'err'); payState(w, 'fail', 'Payment cancelled', 'Nothing was paid.'); } },
        onError: function (e) { if (refused) return; var m = String((e && e.message) || 'Payment error').replace(/\.+$/, '');
          if (/pending payment|incomplete|unfinished/i.test(m)) { resolvePending(); step(1, 'Nothing was paid.', 'err'); payState(w, 'pending', 'Payment pending', PEND_MSG, true); }
          else if (noFunds(m)) { step(1, 'Nothing was paid.', 'err'); payState(w, 'fail', 'Not enough Pi', 'Your Pi balance is too low for this payment. No Pi was moved.'); }
          else { step(1, '✕ ' + esc(m) + '. Nothing was paid.', 'err'); payState(w, 'fail', 'Payment not completed', 'No Pi was moved.'); } }
      });
    } catch (e) { step(1, '✕ ' + esc(e.message || e), 'err'); }
  }

  /* ── pay with Pi Wallet: you send from your own Pi Wallet; DigitalSaudi finds the payment on the Pi blockchain and makes the receipt ── */
  function newRef() { var A = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789', s = 'DS-', b = new Uint8Array(6); crypto.getRandomValues(b); for (var i = 0; i < 6; i++) s += A[b[i] % A.length]; return s; }
  function wpend() { return get('wpend', []).filter(function (p) { return Date.now() - p.ts < 2 * 86400e3; }); }
  function findWalletPay(p) {
    return hz('/accounts/' + p.to + '/payments?order=desc&limit=50&join=transactions').then(function (d) {
      var recs = (d && d._embedded && d._embedded.records) || [], hit = null, byAmt = [];
      recs.forEach(function (r) {
        if (r.type !== 'payment' || r.asset_type !== 'native' || r.to !== p.to) return;
        if (Math.abs(Number(r.amount) - p.amt) > 1e-7 || Date.parse(r.created_at) < p.ts - 120000) return;
        var memo = r.transaction && r.transaction.memo;
        if (memo && String(memo).trim().toUpperCase() === p.ref) hit = r; else byAmt.push(r);
      });
      return hit || (byAmt.length === 1 ? byAmt[0] : null);
    });
  }
  function saveWalletPay(p, r) {
    saveRcpt({ kind: 'wallet', dir: 'out', amount: p.amt, other: short(p.to), addr: p.to, from: r.from, narr: p.narr, cat: p.cat, pid: p.ref, txid: r.transaction_hash, ts: Date.parse(r.created_at) || Date.now(), me: me() });
    put('wpend', wpend().filter(function (x) { return x.ref !== p.ref; }));
    var pl = get('payees', []).filter(function (x) { return x !== p.to; }); pl.unshift(p.to); put('payees', pl.slice(0, 12));
    addNote('check', 'Payment confirmed', fpi(p.amt) + ' π to ' + short(p.to) + ' · ' + p.narr, 'wp-' + p.ref);
    return rcpts().filter(function (x) { return x.txid === r.transaction_hash; })[0];
  }
  /* Payments started in DigitalSaudi are remembered from approval until their receipt exists, even if Pi's payment page
     closed DigitalSaudi meanwhile. On return DigitalSaudi asks the server, which checks the Pi blockchain, and opens the receipt. */
  var inAppBusy = {};
  function dropPending(pid) { var pd = get('pend', {}); delete pd[pid]; put('pend', pd); put('ipend', get('ipend', []).filter(function (y) { return y.pid !== pid; })); }
  function checkPendingInApp() {
    var pend = get('pend', {}), ids = Object.keys(pend).concat(get('ipend', []).map(function (x) { return x.pid; }));
    ids = ids.filter(function (v, i) { return ids.indexOf(v) === i && /^[A-Za-z0-9_-]{6,80}$/.test(v); }).slice(0, 20);
    var changed = false;
    ids.forEach(function (pid) { if (pend[pid] && !pend[pid].ts) { pend[pid].ts = Date.now(); changed = true; } });
    if (changed) put('pend', pend);
    ids.forEach(function (pid) {
      if (inAppBusy[pid]) return; var p = pend[pid] || {};
      if (p.ts && Date.now() - p.ts > 7 * 86400e3) { dropPending(pid); return; }
      inAppBusy[pid] = true;
      api('/transfer', { a: 'payout', paymentId: pid }).then(function (x) {
        if (!x) return;
        if (!x.row || !(x.ok || x.refunded)) { if (/not found|Not a transfer/i.test(x.error || '') || (/not completed/i.test(x.error || '') && p.ts && Date.now() - p.ts > 3600e3)) dropPending(pid); return; }
        var r = null;
        if (x.ok) { if (saveTransfer(x.row, 'out')) addNote('send', 'Payment delivered', fpi(x.row.amount) + ' π to ' + (x.row.to ? '@' + x.row.to : short(x.row.to_addr)) + (x.row.narr ? ' · ' + x.row.narr : ''), 'out-' + pid); r = rcpts().filter(function (t) { return t.txid === x.row.txid; })[0]; }
        else { saveRefund(x.row); r = rcpts().filter(function (t) { return t.txid === x.row.refund_txid; })[0]; }
        dropPending(pid);
        if (r) { var pl = get('payees', []), tg = x.row.to || x.row.to_addr; if (tg && x.ok) { pl = pl.filter(function (q) { return q !== tg; }); pl.unshift(tg); put('payees', pl.slice(0, 12)); }
          if (!$('#app').hidden && !$('.sh-wrap')) { render(S.tab); toast(x.ok ? 'Payment delivered · receipt ready' : 'Refunded · receipt ready'); showRcpt(r); } else rerender(); }
      }).catch(function () {}).then(function () { inAppBusy[pid] = false; });
    });
  }
  function checkPendingWallet() {
    wpend().forEach(function (p) {
      findWalletPay(p).then(function (r) { if (r && !rcpts().some(function (x) { return x.txid === r.transaction_hash; })) { saveWalletPay(p, r); toast('Payment confirmed on the Pi blockchain'); rerender(); } }).catch(function () {});
    });
  }
  function txPayments(tx) {
    return Promise.all([hz('/transactions/' + tx), hz('/transactions/' + tx + '/operations?limit=20')]).then(function (res) {
      if (!res[0]) return null;
      var ops = ((res[1] && res[1]._embedded && res[1]._embedded.records) || []).filter(function (o) { return (o.type === 'payment' && o.asset_type === 'native') || o.type === 'create_account'; })
        .map(function (o) { return { from: o.from || o.funder || o.source_account, to: o.to || o.account, amount: Number(o.amount || o.starting_balance) }; });
      return { hash: res[0].hash, at: Date.parse(res[0].created_at), memo: res[0].memo || '', ok: res[0].successful !== false, pays: ops };
    });
  }
  function walletPay(to, amt, narr, cat) {
    var p = { ref: newRef(), to: to, amt: amt, narr: narr, cat: cat, ts: Date.now() };
    var L = wpend(); L.unshift(p); put('wpend', L.slice(0, 20));
    var rows = [['Address', to], ['Amount', fpi(amt)], ['Memo', p.ref]];
    var w = sheet('Pay in Pi Wallet',
      '<div class="big"><div class="v">' + fpi(amt) + ' π</div><div class="c">' + esc(conv(amt)) + '</div><div class="w">To ' + esc(short(to)) + ' · ' + esc(narr) + '</div></div>' +
      '<div class="steps plain"><div>1 · Copy the address, amount and memo</div><div>2 · Open Pi Wallet and tap Send</div><div>3 · Paste them and confirm in Pi Wallet</div><div>4 · Come back: your receipt appears here</div></div>' +
      '<div class="list txd-rows">' + rows.map(function (x, i) { return '<div class="txr"><span>' + x[0] + '</span><b class="' + (i !== 1 ? 'num mono' : 'num') + '">' + esc(x[1]) + (i === 1 ? ' π' : '') + '</b><button type="button" class="cp" data-cp="' + i + '" aria-label="Copy ' + x[0] + '">' + ic('copy') + '</button></div>'; }).join('') + '</div>' +
      '<p class="small muted" style="margin-top:8px">The memo lets DigitalSaudi match your payment instantly. Pi Wallet adds its own network fee.</p>' +
      '<div class="status" id="wp-st" style="margin-top:12px">' + ic('refresh', 'width:15px;height:15px;vertical-align:-3px') + ' Waiting for your payment. DigitalSaudi checks the Pi blockchain automatically.</div>' +
      '<button type="button" class="btn" data-x="all">' + ic('copy') + 'Copy all details</button><button type="button" class="btn ghost" data-x="tx">Already paid? Add the transaction ID</button>');
    $$('[data-cp]', w).forEach(function (b) { b.onclick = function () { copy(rows[+b.dataset.cp][1]); }; });
    $('[data-x="all"]', w).onclick = function () { copy('Address: ' + to + '\nAmount: ' + fpi(amt) + ' π\nMemo: ' + p.ref); };
    $('[data-x="tx"]', w).onclick = function () { addTxSheet(p); };
    var iv = setInterval(function () {
      if (!document.body.contains(w)) return clearInterval(iv);
      if (document.hidden) return;
      findWalletPay(p).then(function (r) { if (!r || !document.body.contains(w)) return; clearInterval(iv); var rc = saveWalletPay(p, r); payState(w, 'ok', 'Payment succeeded!', fpi(amt) + ' π · confirmed on the Pi blockchain'); setTimeout(function () { closeSheets(); render(S.tab); showRcpt(rc); }, 1400); }).catch(function () {});
    }, 5000);
  }
  /* add a receipt from a transaction ID (a payment made in Pi Wallet) */
  function addTxSheet(p) {
    var w = sheet(p ? 'Add the transaction ID' : 'Get a receipt', '<p class="sh-sub">' + (p ? 'Found in Pi Wallet under the payment · 64 characters.' : 'Transaction ID of any Pi payment you sent or received.') + '</p>' +
      '<label class="l" for="tx-i">Transaction ID</label><textarea class="in num" id="tx-i" rows="2" maxlength="80" spellcheck="false" style="font-size:14px;resize:none" placeholder="64 letters and numbers"></textarea><div class="hint" id="tx-h"></div>' +
      '<button type="button" class="btn" id="tx-go">' + ic('search') + 'Find payment</button><div id="tx-r"></div>', { stack: true });
    $('#tx-go', w).onclick = function () {
      var v = $('#tx-i', w).value.trim().toLowerCase(), h = $('#tx-h', w), R = $('#tx-r', w);
      if (!/^[a-f0-9]{64}$/.test(v)) { h.innerHTML = '<span class="bad">A transaction ID has 64 letters and numbers.</span>'; return; }
      if (rcpts().some(function (x) { return x.txid === v; })) { h.innerHTML = '<span class="bad">You already have a receipt for this payment.</span>'; return; }
      h.textContent = 'Reading the Pi blockchain…';
      txPayments(v).then(function (t) {
        if (!t) { h.innerHTML = '<span class="bad">Not found on ' + NETN + '. Check the ID.</span>'; return; }
        if (!t.ok || !t.pays.length) { h.innerHTML = '<span class="bad">This transaction moved no Pi.</span>'; return; }
        var pay = t.pays[0];
        if (p) {
          var m = t.pays.filter(function (x) { return x.to === p.to && Math.abs(x.amount - p.amt) < 1e-7; })[0];
          if (!m) { h.innerHTML = '<span class="bad">This payment is not ' + fpi(p.amt) + ' π to ' + esc(short(p.to)) + '.</span>'; return; }
          var rc = saveWalletPay(p, { from: m.from, transaction_hash: t.hash, created_at: new Date(t.at).toISOString() });
          closeSheets(); render(S.tab); toast('Receipt ready'); showRcpt(rc); return;
        }
        h.textContent = '';
        R.innerHTML = '<div class="card" style="margin-top:12px"><p class="small">Found on ' + NETN + '</p><div class="num" style="font-size:26px;font-weight:700">' + fpi(pay.amount) + ' π</div><p class="small num">From ' + esc(short(pay.from)) + '<br>To ' + esc(short(pay.to)) + '<br>' + new Date(t.at).toLocaleString('en-GB') + '</p></div>' +
          '<div class="two"><button type="button" class="btn" data-d="out">' + ic('send') + 'I sent it</button><button type="button" class="btn teal" data-d="in">' + ic('req') + 'I received it</button></div>';
        $$('[data-d]', R).forEach(function (b) { b.onclick = function () {
          var out = b.dataset.d === 'out';
          saveRcpt({ kind: 'wallet', dir: out ? 'out' : 'in', amount: pay.amount, other: short(out ? pay.to : pay.from), addr: out ? pay.to : pay.from, from: pay.from, to: pay.to, narr: t.memo || '', pid: '', txid: t.hash, ts: t.at, me: me() });
          var rc = rcpts().filter(function (x) { return x.txid === t.hash; })[0]; closeSheets(); render(S.tab); toast('Receipt ready'); showRcpt(rc);
        }; });
      }).catch(function () { h.innerHTML = '<span class="bad">Could not reach the Pi blockchain. Try again.</span>'; });
    };
  }

  /* ── request & scan: payment codes (QR) and links that open DigitalSaudi with the payment filled in ── */
  function enc(o) { return btoa(unescape(encodeURIComponent(JSON.stringify(o)))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); }
  function dec(t) { try { t = t.replace(/-/g, '+').replace(/_/g, '/'); while (t.length % 4) t += '='; return JSON.parse(decodeURIComponent(escape(atob(t)))); } catch (e) { return null; } }
  function payLink(o) { return location.origin + '/wallet.html#pay=' + enc(o); }
  /* what a scanned or opened code asks for: { u: @username or G-address, a: amount, x: reason } */
  function parseCode(t) {
    t = String(t || '').trim(); var m = /#pay=([A-Za-z0-9_-]{4,1200})/.exec(t);
    if (m) { var o = dec(m[1]); if (o && (isG(String(o.u || '')) || USER_RE.test(String(o.u || '')))) { var a = Number(o.a); return { u: String(o.u), a: a > 0 && a <= 1e7 ? r7(a) : 0, x: String(o.x || '').slice(0, 80), link: true }; } return null; }
    var g = /(G[A-Z2-7]{55})/.exec(t.toUpperCase()); if (g && validG(g[1])) { var am = /amount=([0-9.]+)/i.exec(t); return { u: g[1], a: am ? r7(am[1]) : 0, x: '' }; }
    return null;
  }
  function openCode(c) {
    if (!c) return;
    if (!isG(c.u) && !(S.cfg.enabled && S.cfg.usernames)) { toast('This request is for a DigitalSaudi @username. Ask for their wallet address to pay from Pi Wallet.'); return; }
    if (!isG(c.u) && needSignIn('Sign in with Pi to pay @' + c.u + '.')) { pendingCode = c; return; }
    go('pay'); setTimeout(function () { sendSheet(c); }, 250);
  }
  var pendingCode = null;
  function readHash() { var c = /#pay=/.test(location.hash) ? parseCode(location.hash) : null; if (/#pay=/.test(location.hash)) { try { history.replaceState(null, '', location.pathname); } catch (e) {} } return c; }
  function requestSheet(isLink) {
    if (needTarget(isLink ? 'Payment links' : 'Request Pi')) return;
    var to = myTarget();
    var w = sheet(isLink ? 'Create payment link' : 'Request Pi', '<p class="sh-sub">' + (isLink ? 'Leave empty for any amount.' : 'A payment code with the amount, ready to scan.') + '</p>' +
      '<label class="l" for="q-a">Amount' + (isLink ? ' (optional)' : '') + '</label><div class="amt"><input id="q-a" type="number" inputmode="decimal" placeholder="0.00"><span>π</span></div><div class="hint num" id="q-c"></div>' +
      '<label class="l" for="q-x">What is it for?</label><input class="in" id="q-x" maxlength="80" placeholder="e.g. Rent, groceries, shop payment">' +
      '<button type="button" class="btn" id="q-go">' + ic(isLink ? 'link' : 'qr') + (isLink ? 'Create link' : 'Create payment code') + '</button>', { stack: !!isLink });
    var a = $('#q-a', w); a.oninput = function () { $('#q-c', w).textContent = conv(r7(a.value)); }; setTimeout(function () { a.focus(); }, 120);
    $('#q-go', w).onclick = function () {
      var v = r7(a.value) || 0, x = $('#q-x', w).value.trim();
      if (!isLink && !(v >= 0.01)) return toast('Enter the amount in π'); if (v && v < 0.01) return toast('The smallest amount is 0.01 π'); if (!x) return toast('Say what the payment is for');
      var o = { u: to, a: v, x: x }; saveLink(o); showLink(o, isLink ? 'Payment link' : 'Payment request');
    };
  }
  /* QR scanner: camera, or a photo of a QR code from the gallery */
  var jsqrP = null;
  function loadJsQR() { if (window.jsQR) return Promise.resolve(); if (!jsqrP) jsqrP = new Promise(function (ok, no) { var s = document.createElement('script'); s.src = 'wallet-jsqr.js?v=1'; s.onload = ok; s.onerror = function () { jsqrP = null; no(); }; document.head.appendChild(s); }); return jsqrP; }
  function decodeImageData(d) { try { var q = window.jsQR && jsQR(d.data, d.width, d.height, { inversionAttempts: 'attemptBoth' }); return q ? q.data : ''; } catch (e) { return ''; } }
  function scanSheet() {
    var stop = null;
    var w = sheet('Scan QR code', '<p class="sh-sub">Payment code, Pi wallet address or DigitalSaudi receipt.</p>' + scanBox('sc-b') +
      '<label class="btn ghost" style="cursor:pointer">' + ic('down') + 'Scan a photo from the gallery<input type="file" id="sc-f" accept="image/*" hidden></label>', { onClose: function () { if (stop) stop(); } });
    var box = $('#sc-b', w), msg = $('.scan-m', box);
    function finish(fn) { if (stop) stop(); scanOk(); setTimeout(function () { w.remove(); fn(); }, 220); }
    function found(t) {
      var c = parseCode(t);
      if (!c) { var rv = /receipt\.html|blockexplorer|#tx=/i.test(t) ? rxTx(t) : null; if (rv) { finish(function () { verifySheet(rv); }); return true; } msg.textContent = 'This QR code is not a Pi payment code or receipt.'; return false; }
      finish(function () { openCode(c); }); return true;
    }
    stop = qrScan(box, found);
    $('#sc-f', w).onchange = function () {
      var f = this.files && this.files[0]; this.value = ''; if (!f) return; msg.textContent = 'Reading photo…';
      qrFromFile(f).then(function (t) { if (!t) { msg.textContent = 'No QR code found in this photo. Use a clear, uncropped image.'; return; } found(t); }).catch(function () { msg.textContent = 'Could not read this photo.'; });
    };
  }

  /* ── receive: your @username and your wallet address ── */
  function receiveSheet() {
    var a = get('addr', ''), sug = get('addrSug', ''), un = S.cfg.enabled && S.cfg.usernames && signedIn();
    var w = sheet('Receive Pi', ''+
      (!un ? '' : '<div class="card" style="margin-top:8px"><p class="small">Your DigitalSaudi username</p><div class="row"><div class="grow" style="font-size:24px;font-weight:700;overflow-wrap:anywhere">@' + esc(me()) + '</div><button type="button" class="tbtn" data-x="cu" aria-label="Copy username">' + ic('copy') + '</button></div></div>') +
      '<div class="card"><p class="small">Your Pi wallet address</p>' + (a ? (window.FPQR ? '<div class="qr" style="border:0;padding:6px 0 10px">' + FPQR.svg(a, 200, '#0C4A2C') + '</div>' : '') + '<div class="row"><div class="grow num" style="font-size:13.5px;overflow-wrap:anywhere">' + esc(a) + '</div><button type="button" class="tbtn" data-x="ca" aria-label="Copy address">' + ic('copy') + '</button></div><p class="small muted" style="margin-top:4px">Anyone can scan this code or send to the address from Pi Wallet or DigitalSaudi.</p>'
        : (sug ? '<button type="button" class="btn soft" data-x="ua">' + ic('check') + 'Use my address ' + esc(short(sug)) + '</button>' : '') + '<button type="button" class="btn ghost" data-x="aa">' + ic('card') + 'Add my wallet address</button>') + '</div>' +
      (a ? '<button type="button" class="btn" data-x="sh">' + ic('share') + 'Share my wallet address</button>' : ''));
    var t = function () { return (un ? 'Send me Pi on DigitalSaudi: @' + me() + '\n' : '') + (get('addr', '') ? 'My Pi wallet address: ' + get('addr', '') : ''); };
    var cu = $('[data-x="cu"]', w); if (cu) cu.onclick = function () { copy('@' + me()); };
    var ca = $('[data-x="ca"]', w); if (ca) ca.onclick = function () { copy(a); };
    var ua = $('[data-x="ua"]', w); if (ua) ua.onclick = function () { if (validG(sug)) { put('addr', sug); put('addrSug', ''); receiveSheet(); loadWal(); } };
    var aa = $('[data-x="aa"]', w); if (aa) aa.onclick = function () { addrSheet(true); };
    var shb = $('[data-x="sh"]', w); if (shb) shb.onclick = function () { shareText('DigitalSaudi', t()); };
  }
  /* ── wallet address (read-only, from the public Pi blockchain) ── */
  function validG(a) {
    if (!/^G[A-Z2-7]{55}$/.test(a)) return false;
    var A = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567', bits = 0, val = 0, b = [];
    for (var i = 0; i < a.length; i++) { val = ((val << 5) | A.indexOf(a[i])) & 0xffffff; bits += 5; if (bits >= 8) { b.push((val >>> (bits - 8)) & 255); bits -= 8; } }
    if (b.length !== 35 || b[0] !== 48) return false;
    var crc = 0; for (i = 0; i < 33; i++) { crc ^= b[i] << 8; for (var j = 0; j < 8; j++) crc = crc & 0x8000 ? ((crc << 1) ^ 0x1021) & 0xffff : (crc << 1) & 0xffff; }
    return b[33] === (crc & 255) && b[34] === (crc >> 8);
  }
  function hz(path) { return fetch(HORIZON + path, { headers: { Accept: 'application/json' } }).then(function (r) { if (r.status === 404) return null; if (!r.ok) throw new Error('hz'); return r.json(); }); }
  function lookAddr(a) {
    return Promise.all([hz('/accounts/' + a), hz('/accounts/' + a + '/payments?order=desc&limit=12').catch(function () { return null; })]).then(function (res) {
      var acc = res[0], list = (res[1] && res[1]._embedded && res[1]._embedded.records) || [];
      var bal = acc ? Number(((acc.balances || []).filter(function (b) { return b.asset_type === 'native'; })[0] || {}).balance || 0) : null;
      var pays = list.filter(function (p) { return (p.type === 'payment' && p.asset_type === 'native') || p.type === 'create_account'; }).map(function (p) {
        var to = p.to || p.account, from = p.from || p.funder; return { inn: to === a, amt: Number(p.amount || p.starting_balance), other: to === a ? from : to, at: Date.parse(p.created_at), tx: p.transaction_hash };
      });
      return { addr: a, exists: !!acc, bal: bal, pays: pays, t: Date.now() };
    });
  }
  function walBalHTML() {
    var a = get('addr', ''), W = S.wal;
    if (!a) {
      var sug = get('addrSug', '');
      return '<h3>See your Pi balance here</h3><p>Paste your Pi wallet address once, and DigitalSaudi shows your balance in ' + esc(curr()) + ' and your payment history from the Pi blockchain.</p>' +
        '<div class="note gray" style="margin-top:10px">' + ic('info') + '<span><b>Where to find it:</b> open Pi Wallet and copy your address (it starts with G). It is public and safe to share. DigitalSaudi can only view it: it can never move your Pi.</span></div>' +
        (sug ? '<button type="button" class="btn soft" data-act="addr-use">' + ic('check') + 'Use my address ' + esc(short(sug)) + '</button>' : '') +
        '<button type="button" class="btn" data-act="addr-set">' + ic('card') + 'Paste my wallet address</button>';
    }
    if (!W || W.addr !== a) return '<h3>Your Pi balance</h3><p class="num">' + esc(short(a)) + '</p><p style="margin-top:8px">Loading from the Pi blockchain…</p>';
    if (W.err) return '<h3>Your Pi balance</h3><p>The Pi blockchain could not be reached. <button type="button" class="lnk" data-act="wal-load">Try again</button></p>';
    var c = curr(), r = rateIn(c), u = rateIn('USD');
    return '<div class="row"><div class="grow"><p class="small">Available on ' + NETN + '</p><div class="num" style="font-size:28px;font-weight:700">' + (W.exists ? fpi(W.bal) : '0') + ' π</div>' +
      '<p class="num small">' + (W.exists && u ? '≈ ' + money(W.bal * u, 'USD') + (r && c !== 'USD' ? ' · ' + money(W.bal * r, c) : '') : '') + '</p></div>' +
      '<button type="button" class="tbtn" data-act="wal-load" aria-label="Refresh">' + ic('refresh') + '</button></div>' +
      (W.exists ? '' : '<div class="note warn" style="margin-top:10px">' + ic('info') + '<span>This address has no activity on ' + NETN + ' yet.</span></div>') +
      '<p class="small muted" style="margin-top:8px">' + esc(short(a)) + ' · updated ' + ago(W.t) + ' · <button type="button" class="lnk small" data-act="addr-set">Change</button></p>';
  }
  function loadWal() {
    var a = get('addr', ''); if (!a) return;
    S.wal = { addr: a }; var wb = $('[data-p="wbal"]'); if (wb) wb.innerHTML = walBalHTML();
    lookAddr(a).then(function (W) { S.wal = W; }).catch(function () { S.wal = { addr: a, err: true }; }).then(function () { var e = $('[data-p="wbal"]'); if (e) e.innerHTML = walBalHTML(); var h = $('[data-p="whist"]'); if (h) h.innerHTML = walHistHTML(); });
  }
  function walHistHTML() {
    var W = S.wal; if (!W || !W.pays) return '';
    if (!W.pays.length) return '<div class="list"><div class="empty">No payments on this address yet.</div></div>';
    return '<div class="list">' + W.pays.slice(0, 8).map(function (p) {
      return '<a class="li" href="receipt.html#tx=' + esc(p.tx) + '&net=' + NETQ + '"><span class="ico' + (p.inn ? ' in' : '') + '">' + ic(p.inn ? 'req' : 'send') + '</span><span class="grow"><b>' + (p.inn ? 'Received' : 'Sent') + '</b><small class="num">' + (p.inn ? 'from ' : 'to ') + esc(short(p.other)) + ' · ' + ago(p.at) + '</small></span><span class="amt-r"><b class="' + (p.inn ? 'pos' : '') + '">' + (p.inn ? '+' : '−') + fpi(p.amt) + ' π</b></span></a>';
    }).join('') + '</div>';
  }
  function addrSheet(save) {
    var w = sheet(save ? 'Your Pi wallet address' : 'Check a Pi address', '<p class="sh-sub">' + (save ? 'Starts with G · 56 characters · found in Pi Wallet' : 'Balance and recent payments of any Pi address.') + '</p>' +
      '<label class="l" for="ad-i">Wallet address</label><textarea class="in num" id="ad-i" rows="2" maxlength="56" autocapitalize="characters" spellcheck="false" placeholder="G…" style="font-size:14px;resize:none">' + esc(save ? get('addr', '') : '') + '</textarea><div class="hint" id="ad-h"></div>' +
      '<div class="note warn" style="margin-top:8px">' + ic('lock') + '<span>Never paste your passphrase or secret key anywhere. An address starts with G; a secret key starts with S.</span></div>' +
      '<button type="button" class="btn" id="ad-go">' + (save ? 'Save address' : ic('search') + 'Check address') + '</button>' + (save && get('addr', '') ? '<button type="button" class="btn danger" id="ad-rm">Remove address</button>' : '') + '<div id="ad-r" style="margin-top:12px"></div>');
    var i = $('#ad-i', w);
    i.oninput = function () { var v = i.value.replace(/\s/g, '').toUpperCase(); var h = $('#ad-h', w); if (!v) return; if (/^S/.test(v)) { h.innerHTML = '<span class="bad">This looks like a SECRET key. Do not share it with anyone, ever.</span>'; i.value = ''; return; } h.innerHTML = v.length === 56 ? (validG(v) ? '<span class="ok">✓ Valid Pi address</span>' : '<span class="bad">This address is not valid. Check it and try again.</span>') : ''; };
    $('#ad-go', w).onclick = function () {
      var v = i.value.replace(/\s/g, '').toUpperCase(); if (!validG(v)) return toast('Enter a valid Pi address (G…)');
      if (save) { put('addr', v); put('addrSug', ''); closeSheets(); render(S.tab); loadWal(); toast('Address saved'); return; }
      var R = $('#ad-r', w); R.innerHTML = '<p class="muted">Checking the Pi blockchain…</p>';
      lookAddr(v).then(function (W) { S.wal2 = W; var u = rateIn('USD'), c = curr(), r = rateIn(c);
        R.innerHTML = '<div class="card"><p class="small">Balance on ' + NETN + '</p><div class="num" style="font-size:24px;font-weight:700">' + (W.exists ? fpi(W.bal) : '0') + ' π</div><p class="small num">' + (W.exists && u ? '≈ ' + money(W.bal * u, 'USD') + (r && c !== 'USD' ? ' · ' + money(W.bal * r, c) : '') : 'No activity on this network yet') + '</p></div>' +
          (W.pays.length ? '<div class="day">Recent payments</div>' + (function () { var s = S.wal; S.wal = W; var h = walHistHTML(); S.wal = s; return h; })() : '');
      }).catch(function () { R.innerHTML = '<div class="status err">The Pi blockchain could not be reached. Try again.</div>'; });
    };
    var rm = $('#ad-rm', w); if (rm) rm.onclick = function () { put('addr', ''); S.wal = null; closeSheets(); render(S.tab); toast('Address removed'); };
  }
  /* ── Verify receipt: scan or upload any receipt (or type its transaction ID) and compare it with the Pi blockchain ── */
  function rxTx(t) {
    t = String(t || ''); var m = /(?:^|[^a-f0-9])([a-f0-9]{64})(?![a-f0-9])/i.exec(t); if (!m) return null;
    var n = /net=(test|main)/i.exec(t); return { tx: m[1].toLowerCase(), net: n ? n[1].toLowerCase() : /testnet/i.test(t) ? 'test' : NETQ };
  }
  function vChecks() { return get('vchk', []); }
  /* ── QR engine: the phone's built-in detector when available, otherwise jsQR on a centre crop and the full frame,
     both colour polarities, continuous focus and torch. Photos are read at several sizes and regions. ── */
  var BD = null, bdP = null;
  function bdReady() {
    if (bdP) return bdP;
    bdP = Promise.resolve().then(function () { if (!('BarcodeDetector' in window)) return null; return BarcodeDetector.getSupportedFormats().then(function (f) { if (f.indexOf('qr_code') >= 0) BD = new BarcodeDetector({ formats: ['qr_code'] }); return BD; }); }).catch(function () { return null; });
    return bdP;
  }
  function scanBox(id) { return '<div class="scan" id="' + id + '"><video playsinline muted></video><div class="scan-f"><i></i><i></i><i></i><i></i><b class="scan-l"></b></div><button type="button" class="scan-t" hidden aria-label="Torch">' + ic('zap') + '</button><div class="scan-m">Starting camera…</div></div>'; }
  function scanOk() { try { if (navigator.vibrate) navigator.vibrate(60); } catch (e) {} try { if (window.DigitalSaudi && DigitalSaudi.fx) DigitalSaudi.fx('scan'); } catch (e) {} }
  function qrScan(box, onText) {
    var v = $('video', box), msg = $('.scan-m', box), tb = $('.scan-t', box), stream = null, track = null, raf = 0, done = false, busy = false, n = 0, last = 0;
    var cv = document.createElement('canvas'), cx = cv.getContext('2d', { willReadFrequently: true });
    function stop() { done = true; cancelAnimationFrame(raf); if (stream) stream.getTracks().forEach(function (t) { t.stop(); }); }
    function hit(t) { if (done || !t) return; if (onText(t) === false) return; box.classList.add('ok'); stop(); }
    function jsq(full) {
      var W = v.videoWidth, H = v.videoHeight; if (!W) return '';
      var sx = 0, sy = 0, sw = W, sh = H, tgt = 960;
      if (!full) { var m = Math.min(W, H) * .72; sx = (W - m) / 2; sy = (H - m) / 2; sw = sh = m; tgt = 640; }
      var k = Math.min(1, tgt / Math.max(sw, sh)); cv.width = Math.round(sw * k); cv.height = Math.round(sh * k);
      cx.drawImage(v, sx, sy, sw, sh, 0, 0, cv.width, cv.height);
      try { var d = cx.getImageData(0, 0, cv.width, cv.height), q = jsQR(d.data, d.width, d.height, { inversionAttempts: n % 4 === 3 ? 'attemptBoth' : 'dontInvert' }); return q ? q.data : ''; } catch (e) { return ''; }
    }
    Promise.all([loadJsQR().catch(function () {}), bdReady()]).then(function () {
      if (done) return;
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) { msg.textContent = 'Camera is not available here. Use a photo instead.'; return; }
      return navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: 'environment' }, width: { ideal: 1920 }, height: { ideal: 1080 } }, audio: false }).then(function (st) {
        if (done) { st.getTracks().forEach(function (t) { t.stop(); }); return; }
        stream = st; track = st.getVideoTracks()[0]; v.srcObject = st; v.play().catch(function () {});
        try {
          var cap = track.getCapabilities ? track.getCapabilities() : {};
          if (cap.focusMode && cap.focusMode.indexOf('continuous') >= 0) track.applyConstraints({ advanced: [{ focusMode: 'continuous' }] }).catch(function () {});
          if (cap.torch && tb) { tb.hidden = false; var on = false; tb.onclick = function () { on = !on; track.applyConstraints({ advanced: [{ torch: on }] }).catch(function () {}); tb.classList.toggle('on', on); }; }
        } catch (e) {}
        box.classList.add('scanning'); msg.textContent = 'Point the camera at the QR code';
        (function tick(ts) {
          if (done) return; raf = requestAnimationFrame(tick);
          if (busy || ts - last < 110 || v.readyState < 2) return; last = ts; n++;
          if (BD) { busy = true; BD.detect(v).then(function (c) { busy = false; if (c && c[0] && c[0].rawValue) hit(c[0].rawValue); else if (window.jsQR && n % 3 === 0) hit(jsq(true)); }).catch(function () { busy = false; BD = null; }); }
          else if (window.jsQR) hit(jsq(n % 2 === 0));
        })(0);
      });
    }).catch(function (e) { msg.textContent = e && e.name === 'NotAllowedError' ? 'Allow camera access, or use a photo instead.' : 'The camera could not start. Use a photo instead.'; });
    return stop;
  }
  function qrFromFile(f) {
    return Promise.all([loadJsQR().catch(function () {}), bdReady()]).then(function () {
      return new Promise(function (ok) {
        var img = new Image(), u = URL.createObjectURL(f);
        img.onload = function () {
          URL.revokeObjectURL(u);
          function tryJs() {
            var cv = document.createElement('canvas'), cx = cv.getContext('2d', { willReadFrequently: true }), t = '', W = img.naturalWidth, H = img.naturalHeight;
            var R = [[0, 0, W, H], [0, H * .5, W, H * .5], [0, H * .35, W, H * .45], [W * .08, H * .08, W * .84, H * .84], [0, 0, W, H * .5]];
            [1600, 1100, 2400, 800].some(function (mx) { return R.some(function (r) { var k = Math.min(1, mx / Math.max(r[2], r[3])); cv.width = Math.max(1, Math.round(r[2] * k)); cv.height = Math.max(1, Math.round(r[3] * k)); cx.fillStyle = '#fff'; cx.fillRect(0, 0, cv.width, cv.height); cx.drawImage(img, r[0], r[1], r[2], r[3], 0, 0, cv.width, cv.height); t = window.jsQR ? decodeImageData(cx.getImageData(0, 0, cv.width, cv.height)) : ''; return !!t; }); });
            ok(t);
          }
          if (BD) BD.detect(img).then(function (c) { if (c && c[0] && c[0].rawValue) ok(c[0].rawValue); else tryJs(); }).catch(tryJs); else tryJs();
        };
        img.onerror = function () { URL.revokeObjectURL(u); ok(''); };
        img.src = u;
      });
    });
  }
  function verifySheet(pre) {
    var stopCam = null, mode = 'scan';
    var w = sheet('Verify receipt',
      '<div class="seg vr-seg" role="tablist"><button type="button" data-vm="scan" class="on">' + ic('qr', 'width:17px;height:17px;vertical-align:-3px') + ' Scan</button><button type="button" data-vm="photo">' + ic('down', 'width:17px;height:17px;vertical-align:-3px') + ' Photo</button><button type="button" data-vm="type">' + ic('edit', 'width:17px;height:17px;vertical-align:-3px') + ' Enter</button></div>' +
      '<div id="vr-scan" class="vr-p">' + scanBox('vr-b') + '</div>' +
      '<div id="vr-photo" class="vr-p" hidden><label class="vr-drop">' + ic('rcpt') + '<b>Upload receipt image</b><small>Screenshot or photo from your gallery</small><input type="file" id="vr-f" accept="image/*" hidden></label><p class="small muted" id="vr-pm" style="text-align:center;margin-top:8px"></p></div>' +
      '<div id="vr-type" class="vr-p" hidden><label class="l" for="vr-t">Transaction ID</label><textarea class="in num" id="vr-t" rows="2" maxlength="200" spellcheck="false" autocapitalize="none" placeholder="64 letters and numbers" style="font-size:14px;resize:none"></textarea>' +
      '<div class="two bz-two"><div><label class="l" for="vr-a">Amount on receipt</label><div class="amt sm"><input id="vr-a" type="number" inputmode="decimal" placeholder="Optional"><span>π</span></div></div><div><label class="l" for="vr-c">Verification code</label><input class="in num" id="vr-c" maxlength="14" autocapitalize="characters" spellcheck="false" placeholder="FP-XXXXX-XXXXX"></div></div>' +
      '<button type="button" class="btn" id="vr-go">' + ic('check') + 'Verify</button></div>' +
      '<div id="vr-out"></div>' +
      '<div id="vr-hist"></div>', { onClose: function () { if (stopCam) stopCam(); } });
    function setMode(m) {
      mode = m; $$('[data-vm]', w).forEach(function (b) { b.classList.toggle('on', b.dataset.vm === m); });
      ['scan', 'photo', 'type'].forEach(function (k) { $('#vr-' + k, w).hidden = k !== m; });
      if (stopCam) { stopCam(); stopCam = null; }
      if (m === 'scan') stopCam = qrScan($('#vr-b', w), function (t) { var r = rxTx(t); if (!r) { $('#vr-b .scan-m', w).textContent = 'This QR code is not a payment receipt.'; return false; } scanOk(); setTimeout(function () { setMode('type'); $('#vr-t', w).value = r.tx; check(r); }, 250); return true; });
    }
    $$('[data-vm]', w).forEach(function (b) { b.onclick = function () { setMode(b.dataset.vm); }; });
    $('#vr-f', w).onchange = function () {
      var f = this.files && this.files[0]; if (!f) return; var pm = $('#vr-pm', w); pm.textContent = 'Reading receipt…'; this.value = '';
      qrFromFile(f).then(function (t) { var r = rxTx(t); if (!r) { pm.textContent = t ? 'The QR code in this image is not a payment receipt.' : 'No QR code found. Use a clear, uncropped receipt image, or enter the transaction ID.'; return; } pm.textContent = ''; setMode('type'); $('#vr-t', w).value = r.tx; check(r); })
        .catch(function () { pm.textContent = 'Could not read this image. Check your connection and try again.'; });
    };
    $('#vr-go', w).onclick = function () { var r = rxTx($('#vr-t', w).value); if (!r) return toast('Enter the 64-character transaction ID'); check(r); };
    $('#vr-c', w).oninput = function () { var v = this.value.toUpperCase().replace(/[^A-Z0-9-]/g, ''); if (v !== this.value) this.value = v; };
    function hist() {
      var L = vChecks(); $('#vr-hist', w).innerHTML = L.length ? '<div class="day">Recent checks</div><div class="list">' + L.slice(0, 12).map(function (c, i) { return '<button type="button" class="li" data-vh="' + i + '"><span class="ico ' + (c.ok ? 'in' : 'rf') + '">' + ic(c.ok ? 'check' : 'warn') + '</span><span class="grow"><b class="num">' + (c.amt != null ? fpi(c.amt) + ' π' : 'Not found') + '</b><small class="num">' + esc(c.tx.slice(0, 10) + '…' + c.tx.slice(-6)) + ' · ' + new Date(c.ts).toLocaleString([], { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) + '</small></span><span class="vr-b ' + (c.ok ? 'ok' : 'bad') + '">' + (c.ok ? 'Genuine' : 'Not genuine') + '</span></button>'; }).join('') + '</div>' : '';
      $$('[data-vh]', w).forEach(function (b) { b.onclick = function () { var c = vChecks()[+b.dataset.vh]; setMode('type'); $('#vr-t', w).value = c.tx; check({ tx: c.tx, net: c.net }); }; });
    }
    function check(r) {
      var out = $('#vr-out', w), wantA = r7($('#vr-a', w).value), wantC = $('#vr-c', w).value.trim().toUpperCase(), netN = r.net === 'test' ? 'Pi Testnet' : 'Pi Mainnet';
      out.innerHTML = '<div class="vr-res wait"><div class="vr-i">' + ic('refresh') + '</div><b>Checking the Pi blockchain…</b></div>';
      api('/verify?tx=' + r.tx + '&net=' + r.net).then(function (d) {
        var L = vChecks().filter(function (c) { return c.tx !== r.tx; }), rec = { tx: r.tx, net: r.net, ts: Date.now(), ok: false, amt: null };
        if (!d || !d.ok || !d.tx || !d.tx.ok || !(d.tx.payments || []).length) {
          out.innerHTML = '<div class="vr-res bad"><div class="vr-i">' + ic('x') + '</div><b>Not genuine</b><p>' + esc(d && d.tx && !d.tx.ok ? 'This transaction failed. No Pi was moved.' : (d && d.error) || 'This transaction is not on the ' + netN + '.') + '</p></div>';
        } else {
          var t = d.tx, P = t.payments, tot = r7(P.reduce(function (a, q) { return a + parseFloat(q.amount || 0); }, 0)), p0 = P[0];
          var aOk = !(wantA > 0) || Math.abs(wantA - tot) < 1e-7, cOk = !wantC || !t.seal || wantC === t.seal, ok = aOk && cOk;
          rec.ok = ok; rec.amt = tot;
          var rows = [['Amount', fpi(tot) + ' π' + (conv(tot) ? ' · ' + conv(tot).replace('≈ ', '≈') : '')], ['From', p0.from], ['To', p0.to], ['Memo', t.memo || '—'], ['Date', new Date(t.at).toLocaleString([], { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })], ['Network', netN], ['Transaction ID', t.hash]];
          out.innerHTML = '<div class="vr-res ' + (ok ? 'ok' : 'bad') + '"><div class="vr-i">' + ic(ok ? 'check' : 'warn') + '</div><b>' + (ok ? 'Genuine payment' : 'Receipt does not match') + '</b><p>' + (ok ? 'Recorded on the ' + netN + '.' : 'The payment exists, but the receipt shows different details.') + '</p>' +
            '<div class="vr-amt num">' + fpi(tot) + ' π</div></div>' +
            (wantA > 0 || wantC ? '<div class="vr-cmp">' + (wantA > 0 ? '<div class="' + (aOk ? 'ok' : 'bad') + '">' + ic(aOk ? 'check' : 'x') + '<span>Amount on receipt <b class="num">' + fpi(wantA) + ' π</b> ' + (aOk ? 'matches' : 'does not match') + '</span></div>' : '') + (wantC ? '<div class="' + (cOk ? 'ok' : 'bad') + '">' + ic(cOk ? 'check' : 'x') + '<span>Verification code <b class="num">' + esc(wantC) + '</b> ' + (!t.seal ? 'cannot be checked right now' : cOk ? 'matches' : 'does not match') + '</span></div>' : '') + '</div>' : '') +
            (t.seal ? '<div class="vr-seal"><span>Verification code</span><b class="num">' + esc(t.seal) + '</b></div>' : '') +
            '<div class="list txd-rows" style="margin-top:12px">' + rows.map(function (x) { return '<div class="txr"><span>' + esc(x[0]) + '</span><b class="' + (/From|To|Transaction/.test(x[0]) ? 'num mono' : '') + '">' + esc(x[1] || '—') + '</b></div>'; }).join('') + '</div>' +
            '<div class="two"><button type="button" class="btn ghost" data-x="vsh">' + ic('share') + 'Share result</button><a class="btn ghost" href="receipt.html#tx=' + t.hash + '&net=' + r.net + '">' + ic('ext') + 'Open verify page</a></div>';
          var sh = $('[data-x="vsh"]', out); if (sh) sh.onclick = function () { shareText('DigitalSaudi payment check', (ok ? 'Genuine payment' : 'Receipt does not match') + ' · ' + fpi(tot) + ' π on the ' + netN + (t.seal ? ' · Code ' + t.seal : '') + '\n' + location.origin + '/receipt.html#tx=' + t.hash + '&net=' + r.net); };
        }
        L.unshift(rec); put('vchk', L.slice(0, 50)); hist();
        try { if (navigator.vibrate) navigator.vibrate(rec.ok ? [40] : [120, 60, 120]); } catch (e) {}
        setTimeout(function () { try { out.scrollIntoView({ behavior: 'smooth', block: 'start' }); } catch (e) {} }, 60);
      }).catch(function () { out.innerHTML = '<div class="vr-res bad"><div class="vr-i">' + ic('warn') + '</div><b>No connection</b><p>Check your internet and try again.</p></div>'; });
    }
    hist();
    if (pre && pre.tx) { setMode('type'); $('#vr-t', w).value = pre.tx; check(pre); } else setMode(pre && pre.mode || 'scan');
  }

  /* ── price & currency sheets ── */
  function wChartHTML() {
    var p = S.p; if (!p || !p.usd) return '<div class="empty">' + ic('act') + '<div>' + (pBusy ? '' : 'Rate unavailable right now.') + '</div></div>';
    var s = p.spark || [], mn = s.length ? Math.min.apply(null, s) : p.usd, mx = s.length ? Math.max.apply(null, s) : p.usd, c = curr(), r = rateIn(c), ch = p.change24h;
    return '<div class="row" style="align-items:flex-end"><div class="grow"><p class="small">1 π in US dollars</p><div class="num" style="font-size:30px;font-weight:700">' + money(p.usd, 'USD', 4) + '</div></div>' + (typeof ch === 'number' ? '<span class="chip" style="color:' + (ch >= 0 ? 'var(--ok)' : 'var(--bad)') + ';font-weight:700">' + (ch >= 0 ? '▲ ' : '▼ ') + Math.abs(ch).toFixed(2) + '%</span>' : '') + '</div>' +
      '<div class="chart" style="margin-top:8px">' + spark(s, 300, 150, '#21BC71', .22) + '</div>' +
      '<div class="stats"><div><small>7-day low</small><b>' + money(mn, 'USD', 4) + '</b></div><div><small>7-day high</small><b>' + money(mx, 'USD', 4) + '</b></div><div><small>In ' + esc(c) + '</small><b>' + (r ? money(r, c, r < 1 ? 4 : 2) : '—') + '</b></div></div>' ;
  }
  function curSheet(travel) {
    var codes = S.fx ? Object.keys(S.fx).filter(function (c) { return /^[A-Z]{3}$/.test(c); }) : ['USD', 'NGN', 'SAR'];
    if (codes.indexOf('USD') < 0) codes.push('USD');
    var list = codes.map(function (c) { return { c: c, n: cname(c) }; }).sort(function (a, b) { return a.n.localeCompare(b.n); });
    var cur = travel ? get('cur2', '') : curr();
    var w = sheet(travel ? 'Travel currency' : 'Your currency', '<p class="sh-sub">' + (travel ? 'Pi values in the currency of the country you visit.' : '') + '</p>' + (travel && cur ? '<button type="button" class="btn ghost" id="cu-off">' + ic('x') + 'Turn off travel currency</button>' : '') + '<div class="to" style="margin-top:6px">' + ic('search', 'color:var(--mute)') + '<input id="cu-q" placeholder="Search currency" autocomplete="off"></div><div class="list cur-list" id="cu-l"></div>');
    function draw() {
      var q = $('#cu-q', w).value.trim().toLowerCase();
      $('#cu-l', w).innerHTML = list.filter(function (x) { return !q || x.c.toLowerCase().indexOf(q) >= 0 || x.n.toLowerCase().indexOf(q) >= 0; }).slice(0, 80).map(function (x) {
        var r = rateIn(x.c); return '<button type="button" class="li' + (x.c === cur ? ' on' : '') + '" data-cu="' + x.c + '"><span class="grow"><b>' + esc(x.n) + '</b><small>' + x.c + '</small></span><span class="amt-r"><b class="num">' + (r ? money(r, x.c, r < 1 ? 4 : 2) : '') + '</b><small>per π</small></span></button>';
      }).join('') || '<div class="empty">No currency found</div>';
      $$('[data-cu]', w).forEach(function (b) { b.onclick = function () { put(travel ? 'cur2' : 'cur', b.dataset.cu); closeSheets(); toast((travel ? 'Travel currency: ' : 'Currency: ') + cname(b.dataset.cu)); render(S.tab); paintPrice(); }; });
    }
    $('#cu-q', w).oninput = draw; draw();
    var off = $('#cu-off', w); if (off) off.onclick = function () { put('cur2', ''); closeSheets(); toast('Travel currency off'); render(S.tab); };
  }
  function cvCalc(from) {
    var p = S.p; if (!p || !p.usd) return; var c = curr(), r = rateIn(c), pi = $('#cv-pi'), us = $('#cv-usd'), lo = $('#cv-loc'); if (!pi) return;
    var t2 = cur2(), r2 = t2 ? rateIn(t2) : 0, tr = $('#cv-tr');
    var v = from === 'pi' ? parseFloat(pi.value) : from === 'usd' ? parseFloat(us.value) / p.usd : from === 'tr' ? (r2 ? parseFloat(tr.value) / r2 : NaN) : (r ? parseFloat(lo.value) / r : NaN);
    if (tr && from !== 'tr') { var vv = from === 'pi' ? parseFloat(pi.value) : from === 'usd' ? parseFloat(us.value) / p.usd : (r ? parseFloat(lo.value) / r : NaN); tr.value = vv > 0 && r2 ? (vv * r2).toFixed(vv * r2 >= 100 ? 0 : 2) : ''; }
    if (!(v >= 0)) v = 0;
    if (from !== 'pi') pi.value = v ? +v.toFixed(4) : '';
    if (from !== 'usd') us.value = v ? (v * p.usd).toFixed(2) : '';
    if (lo && from !== 'loc') lo.value = v && r ? (v * r).toFixed(v * r >= 100 ? 0 : 2) : '';
  }

  /* ── month maths ── */
  function monthRange(off) { var d = new Date(); d.setDate(1); d.setHours(0, 0, 0, 0); d.setMonth(d.getMonth() + (off || 0)); var e = new Date(d); e.setMonth(e.getMonth() + 1); return [d.getTime(), e.getTime(), d]; }
  function catKey(r) { return String(r.other || r.addr || '').replace(/^@/, '').toLowerCase(); }
  function catOf(r) { return r.cat || (get('catMap', {}) || {})[catKey(r)] || ''; }
  function rkeyOf(r) { return String(r.txid || r.pid || r.ts); }
  function catSort(off) {
    var m = monthRange(off || 0), L = rcpts().filter(function (r) { return r.dir === 'out' && r.kind !== 'refund' && r.kind !== 'supporter' && r.ts >= m[0] && r.ts < m[1] && !catOf(r); }).sort(function (a, b) { return b.ts - a.ts; });
    if (!L.length) { toast('All payments are sorted'); return render(S.tab); }
    var w = sheet('Sort payments', '<p class="small muted" style="margin:0 2px 10px">Choose a category. DigitalSaudi remembers it for the same recipient.</p><div class="list">' + L.slice(0, 40).map(function (r) { return '<div class="li cs-li" data-ck="' + esc(rkeyOf(r)) + '"><span class="grow"><b>' + esc(r.other || short(r.addr)) + '</b><small>' + new Date(r.ts).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) + (r.narr ? ' · ' + esc(r.narr) : '') + '</small></span><b class="num">−' + fpi(r.amount) + ' π</b><div class="chips cs-ch">' + CATS.map(function (c) { return '<button type="button" class="chip" data-cc="' + c + '">' + c + '</button>'; }).join('') + '</div></div>'; }).join('') + '</div>');
    $$('[data-cc]', w).forEach(function (b) {
      b.onclick = function () {
        var li = b.closest('[data-ck]'), k = li.dataset.ck, c = b.dataset.cc, R = rcpts(), hit = null;
        R.forEach(function (r) { if (rkeyOf(r) === k) { r.cat = c; hit = r; } });
        if (!hit) return; put('rcpts', R); var mp = get('catMap', {}) || {}; mp[catKey(hit)] = c; put('catMap', mp);
        var gone = $$('[data-ck]', w).filter(function (x) { var r = R.filter(function (y) { return rkeyOf(y) === x.dataset.ck; })[0]; return r && catOf(r); });
        gone.forEach(function (x) { x.classList.add('done'); setTimeout(function () { x.remove(); if (!$('[data-ck]', w)) { w.remove(); render(S.tab); toast('All payments are sorted'); } }, 260); });
      };
    });
  }
  // forecast from your own history: the daily average of the last 90 days, plus scheduled reminders
  function forecastHTML(b) {
    var now = Date.now(), out = rcpts().filter(function (r) { return r.dir === 'out' && r.kind !== 'refund' && r.kind !== 'supporter' && now - r.ts < 90 * 864e5; });
    var first = out.reduce(function (a, r) { return Math.min(a, r.ts); }, now), days = Math.min(90, (now - first) / 864e5);
    if (out.length < 3 || days < 14) return '<div class="card fc-card"><div class="row small"><b class="grow">Spending forecast</b></div><p class="small muted" style="margin:6px 0 0">Available after two weeks of payments.</p></div>';
    var daily = out.reduce(function (a, r) { return a + Number(r.amount); }, 0) / Math.max(days, 1), m = monthRange(0), m1 = monthRange(1), left = Math.max(0, (m[1] - now) / 864e5), nd = (m1[1] - m1[0]) / 864e5;
    var remIn = function (a, z) { return rems().filter(function (q) { return q.next >= a && q.next < z; }).reduce(function (s0, q) { return s0 + Number(q.amt || 0); }, 0); };
    var spent = monthStats(0).out, endM = r7(spent + daily * left + remIn(now, m[1])), nextM = r7(daily * nd + remIn(m1[0], m1[1]));
    var over = b > 0 && endM > b;
    return '<div class="card fc-card"><div class="row small"><b class="grow">Spending forecast</b><span class="muted">from your last ' + Math.round(days) + ' days</span></div>' +
      '<div class="stats" style="margin-top:8px"><div><small>By month end</small><b class="' + (over ? 'neg' : '') + '">' + fpi(Math.round(endM * 100) / 100) + ' π</b></div><div><small>Next month</small><b>' + fpi(Math.round(nextM * 100) / 100) + ' π</b></div><div><small>Per day</small><b>' + fpi(Math.round(daily * 100) / 100) + ' π</b></div></div>' +
      (over ? '<div class="note warn" style="margin-top:10px">' + ic('warn') + '<span>At this pace you will pass your budget of ' + fpi(b) + ' π this month.</span></div>' : '') + '</div>';
  }
  function trendSvg() {
    var B = [], L = [];
    for (var i = -5; i <= 0; i++) { var s0 = monthStats(i); B.push(Math.max(0, s0.out)); L.push(monthRange(i)[2].toLocaleDateString('en-GB', { month: 'short' })); }
    var mx = Math.max.apply(null, B.concat([0])), W = 300, H = 90, bw = W / 6;
    return '<svg class="tr-ch" viewBox="0 0 ' + W + ' ' + (H + 18) + '" role="img" aria-label="Spending in the last 6 months">' + B.map(function (v, i) { var h = mx ? Math.max(v ? 4 : 2, v / mx * (H - 16)) : 2; return '<rect x="' + (i * bw + bw * .22).toFixed(1) + '" y="' + (H - h).toFixed(1) + '" width="' + (bw * .56).toFixed(1) + '" height="' + h.toFixed(1) + '" rx="5" fill="' + (i === 5 ? '#1AC271' : '#C2FCE0') + '"><title>' + fpi(r7(v)) + ' π</title></rect>' + (v ? '<text x="' + (i * bw + bw / 2).toFixed(1) + '" y="' + (H - h - 4).toFixed(1) + '" text-anchor="middle" font-size="8.5" fill="#475569">' + fpi(Math.round(v)) + '</text>' : ''); }).join('') +
      L.map(function (l, i) { return '<text x="' + (i * bw + bw / 2).toFixed(1) + '" y="' + (H + 14) + '" text-anchor="middle" font-size="9.5" fill="#64748B"' + (i === 5 ? ' font-weight="700"' : '') + '>' + l + '</text>'; }).join('') + '</svg>';
  }
  function monthStats(off) {
    var m = monthRange(off), o = { out: 0, inn: 0, n: 0, cats: {} };
    rcpts().forEach(function (r) {
      if (r.ts < m[0] || r.ts >= m[1]) return; o.n++;
      if (r.kind === 'refund') { o.out -= Number(r.amount); return; }
      if (r.dir === 'in') o.inn += Number(r.amount); else { o.out += Number(r.amount); var c = r.kind === 'supporter' ? 'Other' : (catOf(r) || 'Not sorted'); o.cats[c] = (o.cats[c] || 0) + Number(r.amount); }
    });
    o.out = r7(Math.max(0, o.out)); o.inn = r7(o.inn); return o;
  }
  function monthHTML() {
    var s = monthStats(0), b = get('budget', 0), u = rateIn('USD'), pct = b ? Math.min(100, s.out / b * 100) : 0;
    return '<div class="row"><div class="grow"><h3>This month</h3><p>' + new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }) + '</p></div><button type="button" class="lnk" data-tab="activity" data-seg="ins">Insights</button></div>' +
      '<div class="stats"><div><small>Sent</small><b>' + fpi(s.out) + ' π</b></div><div><small>Received</small><b class="pos">' + fpi(s.inn) + ' π</b></div><div><small>Payments</small><b>' + s.n + '</b></div></div>' +
      (b ? '<div style="margin-top:12px" class="row small"><span class="grow muted">Budget ' + fpi(b) + ' π' + (u ? ' (' + money(b * u, 'USD') + ')' : '') + '</span><b class="num">' + Math.round(s.out / b * 100) + '%</b></div><div class="bar"><i class="' + (s.out > b ? 'over' : '') + '" style="width:' + pct + '%"></i></div>' : '<button type="button" class="lnk small" data-act="budget">+ Set a monthly budget</button>');
  }

  /* ── views ── */
  function hour() { var h = new Date().getHours(); return h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening'; }
  function txRow(r, i) {
    var inn = r.dir === 'in', cls = r.kind === 'refund' ? 'rf' : r.kind === 'supporter' ? 'sp' : inn ? 'in' : '';
    return '<button type="button" class="li" data-rc="' + i + '"><span class="ico tx ' + (cls || 'out') + '">' + ic(r.kind === 'refund' ? 'undo' : r.kind === 'supporter' ? 'heart' : inn ? 'req' : 'send') + '</span><span class="grow"><b>' + esc(rcptTitle(r)) + '</b><small>' + esc((r.narr ? r.narr + ' · ' : '') + new Date(r.ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })) + '</small></span><span class="amt-r"><b class="' + (inn ? 'pos' : '') + '">' + (inn ? '+' : '−') + fpi(r.amount) + ' π</b><small>' + (r.cat && !inn ? esc(r.cat) : 'Verified') + '</small></span></button>';
  }
  function pendingList() {
    var pd = get('pend', {}), R = rcpts();
    return Object.keys(pd).filter(function (k) { var p = pd[k]; return p && p.amt && !R.some(function (r) { return r.pid === k; }); })
      .map(function (k) { var p = pd[k]; return { pid: k, to: p.to, amt: p.amt, narr: p.narr, cat: p.cat, ts: p.ts || Date.now() }; }).sort(function (a, b) { return b.ts - a.ts; });
  }
  function pendRow(p) {
    return '<button type="button" class="li" data-pend="' + esc(p.pid) + '"><span class="ico rf">' + ic('refresh') + '</span><span class="grow"><b>To ' + esc(isG(p.to) ? short(p.to) : '@' + p.to) + '</b><small>' + esc((p.narr ? p.narr + ' · ' : '') + new Date(p.ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })) + '</small></span><span class="amt-r"><b>−' + fpi(p.amt) + ' π</b><small>Processing</small></span></button>';
  }
  function pendSheet(pid) {
    var p = pendingList().filter(function (x) { return x.pid === pid; })[0]; if (!p) return;
    var w = sheet('Payment processing', '<div class="big"><div class="v">' + fpi(p.amt) + ' π</div><div class="c">' + esc(conv(p.amt)) + '</div><div class="w">To ' + esc(isG(p.to) ? short(p.to) : '@' + p.to) + (p.narr ? ' · ' + esc(p.narr) : '') + '</div></div>' +
      '<div class="note" style="margin-top:12px">' + ic('refresh') + '<span>Your payment is being delivered. The receipt will appear here as soon as it is done.</span></div>' +
      '<button type="button" class="btn" data-x="chk">' + ic('refresh') + 'Check now</button>');
    $('[data-x="chk"]', w).onclick = function () { closeSheets(); toast('Checking…'); checkPendingInApp(); };
  }
  var TIPS = ['DigitalSaudi staff will never ask you to send Pi or share your passphrase.', 'Check the @username and amount before you confirm.', 'Never share your passphrase or secret key.'];
  var T = {
    home: function () {
      var R = rcpts();
      return '<div class="band"><div class="hello"><h1>' + hour() + (signedIn() ? ', @' + esc(me()) : '') + '</h1><p>' + (signedIn() ? 'Your Pi at a glance.' : '') + '</p>' + (signedIn() ? '' : '<button type="button" class="hello-si" data-act="signin"><span class="pi-dot">π</span>Sign in with Pi</button>') + '</div>' +
        '<div class="hero" data-act="price" data-p="hero" role="button" tabindex="0" aria-label="Pi price details">' + heroHTML() + '</div></div>' +
        '<div class="qa"><button type="button" data-act="send"><i>' + ic('send') + '</i>Send</button><button type="button" data-act="request"><i class="t">' + ic('req') + '</i>Request</button><button type="button" data-act="scan"><i class="n">' + ic('qr') + '</i>Scan</button><button type="button" data-act="receive"><i class="a">' + ic('card') + '</i>Receive</button></div>' +
        dueHTML() + '<div class="sec"><h2>Services</h2><button type="button" data-tab="pay">All services</button></div>' + svcGrid(HOME_SVC.map(svcById), 'home') + hook('home') + '<div class="sec"><h2>Overview</h2></div><div class="card" data-p="month">' + monthHTML() + '</div>' +
        '<div class="sec"><h2>Recent activity</h2>' + (R.length ? '<button type="button" data-tab="activity">See all</button>' : '') + '</div>' +
        (pendingList().length ? '<div class="list" style="margin-bottom:10px">' + pendingList().slice(0, 3).map(pendRow).join('') + '</div>' : '') +
        (R.length ? '<div class="list">' + R.slice(0, 4).map(txRow).join('') + '</div>' : pendingList().length ? '' : '<div class="list"><div class="empty">' + ic('act') + '<div>No payments yet.</div></div></div>') +
        '';
    },
    pay: function () {
      var pl = contacts().map(function (c) { return c.to; }).concat(get('payees', [])).filter(function (p, i, L) { return (isG(p) || userSends()) && L.map(function (q) { return q.toLowerCase(); }).indexOf(p.toLowerCase()) === i; });
      return '<div class="ph"><h1>Tools</h1><p>Payments, business, receipts and tools.</p></div>' +
        '<div class="act-q sv-q">' + ic('search') + '<input class="in" id="sv-q" type="search" autocomplete="off" placeholder="Search services"></div>' +
        (pl.length ? '<div class="sec sv-again"><h2>Pay again</h2><button type="button" data-act="contacts">Contacts</button></div><div class="chips sv-again">' + pl.slice(0, 8).map(function (p) { return '<button type="button" class="chip" data-act="send-to" data-u="' + esc(p) + '">' + esc(cName(p) || toLabel(p)) + '</button>'; }).join('') + '</div>' : '') +
        SVC_G.map(function (g) { var L = SVC.filter(function (x) { return x.g === g[0]; }); return '<div class="sv-grp" data-g="' + g[0] + '"><div class="sec"><h2>' + g[1] + '</h2></div>' + svcGrid(L) + '</div>'; }).join('') +
        '<div class="sv-none" hidden><div class="list"><div class="empty">' + ic('search') + '<div>No service found.</div></div></div></div>';
    },
    wallet: function () {
      var c = curr();
      return '<div class="ph"><h1>Balance</h1><p>Live Pi rate in any currency, converter and blockchain tools.</p></div>' +
        '<div class="card" data-p="wchart">' + wChartHTML() + '</div>' +
        '<div class="sec"><h2>Converter</h2><button type="button" data-act="currency">' + esc(c) + ' ▾</button></div>' +
        '<div class="card conv"><label><span>π</span><input id="cv-pi" type="number" inputmode="decimal" value="1" aria-label="Pi"></label><label><span>USD</span><input id="cv-usd" type="number" inputmode="decimal" aria-label="US dollars"></label>' + (c !== 'USD' ? '<label><span>' + esc(c) + '</span><input id="cv-loc" type="number" inputmode="decimal" aria-label="' + esc(cname(c)) + '"></label>' : '') + (cur2() ? '<label class="cv-tr"><span>' + esc(cur2()) + '</span><input id="cv-tr" type="number" inputmode="decimal" aria-label="' + esc(cname(cur2())) + '"></label>' : '') + '</div>' + '<button type="button" class="lnk" data-act="travel" style="margin:8px 4px 0">' + ic('globe', 'width:15px;height:15px;vertical-align:-3px') + ' ' + (cur2() ? 'Travel currency: ' + esc(cname(cur2())) : 'Add a travel currency') + '</button>' +
        '<div class="sec"><h2>Tools</h2></div><div class="tiles"><button type="button" class="tile" data-act="get-rcpt"><i class="n">' + ic('rcpt') + '</i><b>Get a receipt</b><small>For any Pi payment, from its transaction ID</small></button><button type="button" class="tile" data-act="verify"><i>' + ic('check') + '</i><b>Verify receipt</b><small>Scan, upload or enter any receipt</small></button><button type="button" class="tile" data-act="check-addr"><i class="t">' + ic('search') + '</i><b>Check an address</b><small>Balance and payments of any Pi address</small></button><button type="button" class="tile" data-act="receive"><i class="a">' + ic('qr') + '</i><b>My QR code</b><small>Your wallet address to get paid</small></button><button type="button" class="tile" data-act="alerts"><i class="t">' + ic('bell') + '</i><b>Price alerts</b><small>Know when Pi reaches your price</small></button><button type="button" class="tile" data-act="statement"><i>' + ic('rcpt') + '</i><b>Statement</b><small>Monthly PDF of your payments</small></button></div>' +
        '';
    },
    activity: function () {
      var R = rcpts();
      var head = '<div class="ph"><h1>Activity</h1><p>All your payments and receipts.</p></div><div class="seg" role="tablist"><button type="button" data-seg="tx" class="' + (S.seg === 'tx' ? 'on' : '') + '">Transactions</button><button type="button" data-seg="ins" class="' + (S.seg === 'ins' ? 'on' : '') + '">Insights</button></div>';
      if (S.seg === 'ins') return head + insightsHTML();
      return head + '<div class="act-tools"><div class="act-q">' + ic('search') + '<input class="in" id="act-q" type="search" autocomplete="off" placeholder="Search payments" value="' + esc(S.q || '') + '"></div>' +
        '<div class="seg act-seg" role="tablist">' + FLT.map(function (x) { return '<button type="button" data-flt="' + x[0] + '" class="' + (S.filter === x[0] ? 'on' : '') + '">' + x[1] + '</button>'; }).join('') + '</div>' +
        '<div class="act-bar"><button type="button" class="act-pill" data-actper="1">' + ic('cal') + '<span>' + esc(perLabel()) + '</span>' + ic('chevd') + '</button><button type="button" class="act-pill" data-sort="1">' + ic('sort') + '<span>' + SORTS[S.sort] + '</span>' + ic('chevd') + '</button></div></div>' +
        '<div id="act-l">' + actList() + '</div>';
    },
    profile: function () {
      var sup = get('supporter', false);
      return '<div class="pcard"><div class="avatar">' + esc(signedIn() ? me().charAt(0) : 'G') + '</div><div class="grow"><b>' + (signedIn() ? '@' + esc(me()) : 'Guest') + '</b><small>' + (get('name', '') ? esc(get('name', '')) + ' · ' : '') + NETN + '</small>' + (sup ? '<div class="badge">' + ic('star') + 'DigitalSaudi Supporter</div>' : '') + '</div></div>' +
        (!signedIn() ? '<button type="button" class="btn" data-act="signin" style="margin-top:14px"><span class="pi-dot">π</span>Sign in with Pi</button>' : '') +
        '<div class="sec"><h2>Settings</h2></div><div class="list">' +
        row('edit', 'Name on receipts', get('name', '') ? NTYPE[nType()].l + ' · ' + get('name', '') : 'Your name, business, store or shop', 'name') + row('globe', 'Currency', cname(curr()) + ' (' + curr() + ')', 'currency') + (window.FPL && Object.keys(FPL.LANGS).length > 1 ? row('globe', 'Language', FPL.LANGS[FPL.lang()], 'lang') : '') + (canInstall() ? row('down', 'Install DigitalSaudi', 'Add to home screen', 'install') : '') +
        row('bell', 'Notifications', !('Notification' in window) ? 'In-app alerts on' : get('push', false) ? 'Phone and in-app alerts' : 'In-app alerts on', 'push') + row('pie', 'Monthly budget', get('budget', 0) ? fpi(get('budget', 0)) + ' π' : 'Not set', 'budget') + row('card', 'Wallet address', get('addr', '') ? short(get('addr', '')) : 'Not added', 'addr-set') + hook('settings') + '</div>' +
        '<div class="sec"><h2>Support</h2></div><div class="list">' +
        row('shield', 'Trust center', 'Payments, limits and records', 'security') + row('refresh', 'Reset', 'Pending payment or a problem? Reset fixes it', 'repair') + row('heart', sup ? 'You are a Supporter' : 'Become a Supporter', sup ? 'Thank you!' : '1 π · Supporter badge', 'supporter') +
        row('mail', 'Help & contact', 'Contact the DigitalSaudi team', 'help') + '</div>' +
        '<div class="sec"><h2>Legal</h2></div><div class="list">' + lrow('Terms of Service', 'terms.html') + lrow('Privacy Policy', 'privacy.html') + '</div>' +
        (signedIn() ? '<button type="button" class="btn danger" data-act="signout" style="margin-top:18px">' + ic('out') + 'Sign out</button>' : '') +
        '<p class="small muted" style="text-align:center;margin-top:16px">DigitalSaudi Wallet 1.2.0 · ' + NETN + ' · digitalsaudi.pi</p>';
      function row(i, t, s, a) { return '<button type="button" class="li" data-act="' + a + '"><span class="ico">' + ic(i) + '</span><span class="grow"><b>' + esc(t) + '</b><small>' + esc(s) + '</small></span><span class="go">' + ic('chev') + '</span></button>'; }
      function lrow(t, h) { return '<a class="li" href="' + h + '"><span class="ico">' + ic('rcpt') + '</span><span class="grow"><b>' + t + '</b></span><span class="go">' + ic('chev') + '</span></a>'; }
    }
  };
  var PER = [['all', 'All time'], ['today', 'Today'], ['7d', '7 days'], ['30d', '30 days'], ['month', 'This month'], ['last', 'Last month'], ['custom', 'Custom']];
  var SORTS = { new: 'Newest first', old: 'Oldest first', big: 'Largest first', small: 'Smallest first' };
  var FLT = [['all', 'All'], ['out', 'Sent'], ['in', 'Received'], ['ref', 'Refunds']];
  function dShort(v) { var d = new Date(v + 'T00:00:00'); return isNaN(d) ? v : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }); }
  function perLabel() { if (S.per === 'custom') return (S.from ? dShort(S.from) : 'Start') + ' – ' + (S.to ? dShort(S.to) : 'Today'); return PER.filter(function (x) { return x[0] === S.per; })[0][1]; }
  function perSheet() {
    var w = sheet('Period', '<div class="list pick">' + PER.filter(function (x) { return x[0] !== 'custom'; }).map(function (x) { return '<button type="button" class="li' + (S.per === x[0] ? ' on' : '') + '" data-pp="' + x[0] + '"><span class="grow"><b>' + x[1] + '</b></span>' + (S.per === x[0] ? ic('check') : '') + '</button>'; }).join('') + '</div>' +
      '<div class="day">Custom range</div><div class="two act-dt"><label><span>From</span><input class="in" type="date" id="pp-f" value="' + esc(S.from || '') + '" max="' + dIso(Date.now()) + '"></label><label><span>To</span><input class="in" type="date" id="pp-t" value="' + esc(S.to || '') + '" max="' + dIso(Date.now()) + '"></label></div>' +
      '<button type="button" class="btn" id="pp-go">' + ic('cal') + 'Show this range</button>');
    $$('[data-pp]', w).forEach(function (b) { b.onclick = function () { S.per = b.dataset.pp; S.page = 60; closeSheets(); render('activity'); }; });
    $('#pp-go', w).onclick = function () { var f = $('#pp-f', w).value, t = $('#pp-t', w).value; if (!f && !t) return toast('Choose a start or end date'); S.per = 'custom'; S.from = f; S.to = t; S.page = 60; closeSheets(); render('activity'); };
  }
  function sortSheet() {
    var w = sheet('Sort', '<div class="list pick">' + Object.keys(SORTS).map(function (k) { return '<button type="button" class="li' + (S.sort === k ? ' on' : '') + '" data-so="' + k + '"><span class="grow"><b>' + SORTS[k] + '</b></span>' + (S.sort === k ? ic('check') : '') + '</button>'; }).join('') + '</div>');
    $$('[data-so]', w).forEach(function (b) { b.onclick = function () { S.sort = b.dataset.so; closeSheets(); render('activity'); }; });
  }
  function dIso(t) { var d = new Date(t); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
  function perRange() {
    var t = new Date(); t.setHours(0, 0, 0, 0); var d0 = t.getTime(), n = Date.now() + 864e5, m = new Date(d0); m.setDate(1);
    if (S.per === 'today') return [d0, n]; if (S.per === '7d') return [d0 - 6 * 864e5, n]; if (S.per === '30d') return [d0 - 29 * 864e5, n];
    if (S.per === 'month') return [m.getTime(), n];
    if (S.per === 'last') { var e = m.getTime(); m.setMonth(m.getMonth() - 1); return [m.getTime(), e]; }
    if (S.per === 'custom') { var f = /^\d{4}-\d\d-\d\d$/.test(S.from || '') ? new Date(S.from + 'T00:00:00').getTime() : 0, to = /^\d{4}-\d\d-\d\d$/.test(S.to || '') ? new Date(S.to + 'T00:00:00').getTime() + 864e5 : n; return f > to ? [to - 864e5, f + 864e5] : [f, to]; }
    return [0, 9e15];
  }
  function actRows() {
    var f = S.filter, q = String(S.q || '').trim().toLowerCase().replace(/^@/, ''), rg = perRange();
    var F = rcpts().map(function (r, i) { return [r, i]; }).concat(S.extra.map(function (r, i) { return [r, 'x' + i]; })).filter(function (x) {
      var r = x[0]; if (!((r.ts || 0) >= rg[0] && (r.ts || 0) < rg[1])) return false;
      if (!(f === 'all' || (f === 'out' && r.dir === 'out') || (f === 'in' && r.dir === 'in' && r.kind !== 'refund') || (f === 'ref' && r.kind === 'refund'))) return false;
      if (q) { var hay = [r.other, r.narr, r.cat, r.txid, r.pid, r.addr, r.from, String(r.amount), fpi(r.amount), rcptTitle(r)].join(' ').toLowerCase(); if (hay.indexOf(q) < 0) return false; }
      return true;
    });
    var k = S.sort; F.sort(function (a, b) { var A = a[0], B = b[0]; return k === 'old' ? (A.ts || 0) - (B.ts || 0) : k === 'big' ? B.amount - A.amount || (B.ts || 0) - (A.ts || 0) : k === 'small' ? A.amount - B.amount || (B.ts || 0) - (A.ts || 0) : (B.ts || 0) - (A.ts || 0); });
    return F;
  }
  function actList() {
    var F = actRows(), inn = 0, out = 0, f = S.filter, lim = S.page || 60, byDay = S.sort === 'new' || S.sort === 'old';
    F.forEach(function (x) { var r = x[0], a = Number(r.amount) || 0; if (r.kind === 'refund') { if (f === 'ref') inn += a; else out -= a; } else if (r.dir === 'in') inn += a; else out += a; }); out = Math.max(0, out);
    var html = '', groups = [], cur = null;
    F.slice(0, lim).forEach(function (x) {
      var key = byDay ? new Date(x[0].ts).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }) : '';
      if (!cur || cur.k !== key) { cur = { k: key, rows: [], net: 0 }; groups.push(cur); }
      cur.rows.push(x); cur.net += (x[0].dir === 'in' ? 1 : -1) * (Number(x[0].amount) || 0);
    });
    groups.forEach(function (g) { html += (g.k ? '<div class="day act-day"><span>' + g.k + '</span><b class="num ' + (g.net >= 0 ? 'pos' : '') + '">' + (g.net >= 0 ? '+' : '−') + fpi(Math.abs(r7(g.net))) + ' π</b></div>' : '<div style="height:12px"></div>') + '<div class="list anim">' + g.rows.map(function (x) { return txRow(x[0], x[1]); }).join('') + '</div>'; });
    var showPend = pendingList().length && (f === 'all' || f === 'out') && !S.q && (S.per === 'all' || perRange()[1] > Date.now());
    var fl = FLT.filter(function (x) { return x[0] === f; })[0][1];
    return '<div class="act-card"><div class="act-k">' + ic('cal', 'width:15px;height:15px') + '<span>' + esc(perLabel()) + (f !== 'all' ? ' · ' + fl : '') + (S.q ? ' · “' + esc(S.q) + '”' : '') + '</span></div>' +
      '<div class="act-row"><div><small>Received</small><b class="num">' + (inn ? '+' : '') + fpi(r7(inn)) + ' π</b></div><div><small>Sent</small><b class="num">' + (out ? '−' : '') + fpi(r7(out)) + ' π</b></div><div><small>Payments</small><b class="num">' + F.length + '</b></div></div>' +
      (signedIn() ? '<button type="button" class="act-bk" data-act="backup">' + ic('cloud', 'width:15px;height:15px') + 'Backed up to your Pi account</button>' : '') + '</div>' +
      (showPend ? '<div class="day act-day"><span>Processing</span></div><div class="list anim">' + pendingList().map(pendRow).join('') + '</div>' : '') +
      (html || (showPend ? '' : '<div class="list" style="margin-top:14px"><div class="empty">' + ic('rcpt') + '<div>' + (rcpts().length ? 'No payments match.' : 'No payments yet.') + '</div></div></div>')) +
      (F.length > lim ? '<button type="button" class="btn ghost" data-more="1" style="margin-top:12px">Show more · ' + (F.length - lim) + ' left</button>' : '') +
      (S.hMore && signedIn() && F.length <= lim ? '<button type="button" class="btn ghost" data-older="1" style="margin-top:12px">Load older history</button>' : '') +
      (F.length ? '<div class="two" style="margin-top:4px"><button type="button" class="btn" data-act="statement">' + ic('rcpt') + 'Statement PDF</button><button type="button" class="btn ghost" data-act="csv">' + ic('down') + 'Export CSV</button></div>' : '');
  }
  function actPaint() { var l = $('#act-l'); if (l) l.innerHTML = actList(); else render('activity'); }
  /* ── services: one list, used by Home, the Services tab and search ── */
  var SVC_G = [['pay', 'Payments'], ['get', 'Get paid'], ['biz', 'Business'], ['rec', 'Receipts & records'], ['plan', 'Planning'], ['wal', 'Wallet tools'], ['sec', 'Security'], ['help', 'Help']];
  var SVC = [
    { id: 'send', n: 'Send Pi', s: 'To a @username or wallet address', i: 'send', c: 'b', g: 'pay', a: 'send' },
    { id: 'request', n: 'Request Pi', s: 'Payment code with the amount', i: 'req', c: 't', g: 'pay', a: 'request' },
    { id: 'scan', n: 'Scan to pay', s: 'Payment code or wallet QR', i: 'scan', c: 'n', g: 'pay', a: 'scan' },
    { id: 'receive', n: 'Receive Pi', s: 'Your @username and address', i: 'card', c: 'a', g: 'pay', a: 'receive' },
    { id: 'contacts', n: 'Contacts', s: 'People you pay often', i: 'book', c: 'b', g: 'pay', a: 'contacts' },
    { id: 'directory', n: 'Merchant directory', s: 'Businesses that accept Pi', i: 'pin', c: 'g', g: 'pay', a: 'directory' },
    { id: 'pidomain', n: 'Pay a .pi name', s: 'Coming soon', i: 'at', c: 'n', g: 'pay', a: 'pi-domain', soon: 1 },
    { id: 'myqr', n: 'My Pi QR', s: 'Poster to print or share', i: 'qr', c: 't', g: 'get', a: 'myqr' },
    { id: 'links', n: 'Payment links', s: 'Share a link to get paid', i: 'link', c: 'b', g: 'get', a: 'links' },
    { id: 'invoice', n: 'Invoices', s: 'Paid automatically on arrival', i: 'inv', c: 'n', g: 'get', a: 'invs' },
    { id: 'split', n: 'Split a bill', s: 'Request each share', i: 'users', c: 'a', g: 'get', a: 'split' },
    { id: 'collect', n: 'Group collection', s: 'One link for a family or event fund', i: 'heart', c: 't', g: 'get', a: 'collect' },
    { id: 'sale', n: 'Quick sale', s: 'Charge a customer by QR', i: 'pos', c: 'g', g: 'biz', a: 'sale' },
    { id: 'newinv', n: 'New invoice', s: 'Items, tax and due date', i: 'plus', c: 'n', g: 'biz', a: 'inv-new' },
    { id: 'prod', n: 'Products', s: 'Catalog, prices and stock', i: 'tag', c: 'a', g: 'biz', a: 'prods' },
    { id: 'cust', n: 'Customers', s: 'Who pays you', i: 'userplus', c: 't', g: 'biz', a: 'cust' },
    { id: 'biz', n: 'Dashboard', s: 'Sales and outstanding', i: 'bars', c: 'b', g: 'biz', a: 'biz' },
    { id: 'daysum', n: 'Day summary', s: 'Sales, expenses and profit', i: 'sun', c: 'g', g: 'biz', a: 'daysum' },
    { id: 'expenses', n: 'Expenses', s: 'Spending and profit', i: 'exp', c: 'a', g: 'biz', a: 'expenses' },
    { id: 'reports', n: 'Reports', s: 'Sales and invoices CSV', i: 'down', c: 'b', g: 'biz', a: 'reports' },
    { id: 'bizreport', n: 'Business report', s: 'One-page PDF for any period', i: 'report', c: 'n', g: 'biz', a: 'bizreport' },
    { id: 'taxsum', n: 'Tax summary', s: 'Tax collected, by rate', i: 'pct', c: 'b', g: 'biz', a: 'taxsum' },
    { id: 'recur', n: 'Recurring', s: 'Weekly or monthly invoices', i: 'repeat', c: 'a', g: 'biz', a: 'recur' },
    { id: 'checkout', n: 'Online checkout', s: 'Pay with Pi button for websites', i: 'cart', c: 'b', g: 'biz', a: 'checkout' },
    { id: 'staff', n: 'Staff mode', s: 'Staff take sales on their phone', i: 'idb', c: 'n', g: 'biz', a: 'staff' },
    { id: 'bizprof', n: 'Business profile', s: 'Name, logo, tax ID, store, shop', i: 'store', c: 'n', g: 'biz', a: 'bizprof' },
    { id: 'rname', n: 'Name on receipts', s: 'Name, business, store or shop', i: 'edit', c: 'k', g: 'biz', a: 'name' },
    { id: 'verify', n: 'Verify receipt', s: 'Scan, upload or enter', i: 'check', c: 'g', g: 'rec', a: 'verify' },
    { id: 'getrcpt', n: 'Get a receipt', s: 'From a transaction ID', i: 'hash', c: 'b', g: 'rec', a: 'get-rcpt' },
    { id: 'statement', n: 'Statement', s: 'Monthly PDF', i: 'rcpt', c: 'n', g: 'rec', a: 'statement' },
    { id: 'activity', n: 'Activity', s: 'Any period, search, sort', i: 'act', c: 't', g: 'rec', tab: 'activity' },
    { id: 'csv', n: 'Export CSV', s: 'Your payments as a file', i: 'sheet', c: 'a', g: 'rec', a: 'csv' },
    { id: 'budget', n: 'Budget', s: 'Monthly spending limit', i: 'pie', c: 't', g: 'plan', a: 'budget' },
    { id: 'insights', n: 'Spending', s: 'Categories and monthly trend', i: 'trend', c: 'b', g: 'plan', a: 'insights' },
    { id: 'rems', n: 'Reminders', s: 'Rent, fees, regular payments', i: 'bell', c: 'a', g: 'plan', a: 'rems' },
    { id: 'goals', n: 'Savings goals', s: 'Track progress to a goal', i: 'star', c: 'g', g: 'plan', a: 'goals' },
    { id: 'networth', n: 'Net worth', s: 'What you own and owe', i: 'scale', c: 'n', g: 'plan', a: 'networth' },
    { id: 'alerts', n: 'Price alerts', s: 'When Pi reaches your price', i: 'target', c: 'n', g: 'plan', a: 'alerts' },
    { id: 'wallet', n: 'Pi rate', s: 'Live rate and converter', i: 'conv', c: 'b', g: 'wal', tab: 'wallet' },
    { id: 'addr', n: 'My address', s: 'Your Pi wallet address', i: 'wallet2', c: 'n', g: 'wal', a: 'addr-set' },
    { id: 'checkaddr', n: 'Check address', s: 'Any Pi wallet address', i: 'search', c: 't', g: 'wal', a: 'check-addr' },
    { id: 'currency', n: 'Currency', s: 'Show values in your currency', i: 'globe', c: 'a', g: 'wal', a: 'currency' },
    { id: 'travel', n: 'Travel currency', s: 'Values in the country you visit', i: 'plane', c: 't', g: 'wal', a: 'travel' },
    { id: 'trust', n: 'Trust center', s: 'Payments, limits, records', i: 'lock', c: 'b', g: 'sec', a: 'security' },
    { id: 'trusted', n: 'Trusted recipients', s: 'Addresses and usernames you trust', i: 'shield', c: 'g', g: 'sec', a: 'trusted' },
    { id: 'report', n: 'Report a scam', s: 'Warn other Pioneers', i: 'warn', c: 'a', g: 'sec', a: 'report' },
    { id: 'repair', n: 'Reset', s: 'Pending payment or a problem', i: 'refresh', c: 't', g: 'help', a: 'repair' },
    { id: 'help', n: 'Help & contact', s: 'Contact DigitalSaudi support', i: 'mail', c: 'n', g: 'help', a: 'help' }
  ];
  var HOME_SVC = ['sale', 'verify', 'invoice', 'myqr', 'links', 'split', 'biz', 'more'];
  function svcById(id) { return id === 'more' ? { id: 'more', n: 'All services', i: 'grid', c: 'k', tab: 'pay' } : SVC.filter(function (x) { return x.id === id; })[0]; }
  function svcGrid(L, kind) {
    return '<div class="sv-grid' + (kind ? ' ' + kind : '') + '">' + L.filter(Boolean).map(function (x) {
      return '<button type="button" class="sv c-' + x.c + '" ' + (x.tab ? 'data-tab="' + x.tab + '"' : 'data-act="' + x.a + '"') + ' data-k="' + esc((x.n + ' ' + (x.s || '') + ' ' + x.g).toLowerCase()) + '"><i>' + ic(x.i) + '</i><b>' + esc(x.n) + '</b>' + (x.soon ? '<em class="sv-soon">Soon</em>' : '') + '</button>';
    }).join('') + '</div>';
  }
  /* ── install to the home screen (browsers that support it; the Pi Browser opens DigitalSaudi from its own menu) ── */
  var instEv = null;
  addEventListener('beforeinstallprompt', function (e) { e.preventDefault(); instEv = e; });
  addEventListener('appinstalled', function () { instEv = null; toast('DigitalSaudi is on your home screen'); });
  function standalone() { try { return matchMedia('(display-mode: standalone)').matches || navigator.standalone === true; } catch (e) { return false; } }
  function isIOS() { return /iPhone|iPad|iPod/i.test(navigator.userAgent); }
  function canInstall() { return !standalone() && !/PiBrowser/i.test(navigator.userAgent) && (!!instEv || isIOS()); }
  function installApp() {
    if (instEv) { var e = instEv; instEv = null; e.prompt(); (e.userChoice || Promise.resolve()).then(function (c) { if (c && c.outcome === 'accepted') toast('DigitalSaudi is on your home screen'); render(S.tab); }).catch(function () {}); return; }
    sheet('Install DigitalSaudi', '<div class="pd-hero">' + ic('down') + '<b>Add DigitalSaudi to your home screen</b><span>Open it like an app, in one tap.</span></div><div class="list" style="margin-top:12px">' +
      '<div class="li"><span class="ico">1</span><span class="grow"><b>Tap the Share button</b><small>At the bottom of Safari</small></span></div><div class="li"><span class="ico">2</span><span class="grow"><b>Choose Add to Home Screen</b><small>Then tap Add</small></span></div></div>');
  }
  function piDomainSheet() {
    var w = sheet('Pay a .pi name', '<div class="pd-hero">' + ic('globe') + '<b>Pay anyone by their .pi name</b><span>Send Pi to names such as shop.pi.</span><em class="sv-soon">Coming soon</em></div>' +
      '<label class="l" for="pd-i">.pi name</label><div class="pd-in"><input class="in" id="pd-i" placeholder="name" disabled><span>.pi</span></div>' +
      '<button type="button" class="btn" disabled>' + ic('send') + 'Coming soon</button><button type="button" class="btn ghost" data-pd="send">' + ic('send') + 'Send by @username or address</button>');
    $('[data-pd="send"]', w).onclick = function () { A.send(); };
  }
  function svcFilter(q) {
    q = String(q || '').trim().toLowerCase(); var any = false;
    $$('#view .sv-grp').forEach(function (g) { var n = 0; $$('.sv', g).forEach(function (b) { var on = !q || b.dataset.k.indexOf(q) >= 0; b.hidden = !on; if (on) n++; }); g.hidden = !n; if (n) any = true; });
    $$('#view .sv-again').forEach(function (e) { e.hidden = !!q; }); var no = $('#view .sv-none'); if (no) no.hidden = any;
  }
  /* ── the name shown on receipts, invoices and the QR poster: a person, business, store or shop ── */
  var NTYPE = { name: { l: 'Name', p: 'Your full name' }, business: { l: 'Business name', p: 'e.g. Global Trading Ltd' }, store: { l: 'Store name', p: 'e.g. City Market Store' }, shop: { l: 'Shop name', p: 'e.g. Corner Fashion Shop' } };
  function nType() { var t = get('nameType', ''); return NTYPE[t] ? t : 'name'; }
  function setName(v, t) {
    put('name', v); put('nameType', t);
    if (t !== 'name') { var b = get('biz', {}) || {}; if (b.name !== v) { b.name = v; if (window.DigitalSaudi && DigitalSaudi.kit && DigitalSaudi.kit.bizPut) DigitalSaudi.kit.bizPut(b); else put('biz', b); } }
  }
  function nameSheet(after) {
    var t = nType();
    var w = sheet('Name on receipts', '<div class="chips" id="nm-t">' + Object.keys(NTYPE).map(function (k) { return '<button type="button" class="chip' + (k === t ? ' on' : '') + '" data-nt="' + k + '">' + NTYPE[k].l + '</button>'; }).join('') + '</div>' +
      '<label class="l" for="nm-i" id="nm-l">' + NTYPE[t].l + '</label><input class="in" id="nm-i" maxlength="60" value="' + esc(get('name', '')) + '" placeholder="' + esc(NTYPE[t].p) + '">' +
      '<div class="nm-prev"><span>On receipts</span><b id="nm-pv"></b></div>' +
      '<button type="button" class="btn" id="nm-go">' + ic('check') + 'Save</button>');
    var i = $('#nm-i', w);
    function pv() { var v = i.value.trim(); $('#nm-pv', w).textContent = (v || NTYPE[t].l) + (me() ? ' (@' + me() + ')' : ''); }
    $$('[data-nt]', w).forEach(function (b) { b.onclick = function () { t = b.dataset.nt; $$('[data-nt]', w).forEach(function (x) { x.classList.toggle('on', x === b); }); $('#nm-l', w).textContent = NTYPE[t].l; i.placeholder = NTYPE[t].p; pv(); }; });
    i.oninput = pv; pv();
    $('#nm-go', w).onclick = function () { var v = i.value.trim().replace(/\s+/g, ' '); if (v && v.length < 2) return toast('Enter at least 2 letters'); setName(v, t); closeSheets(); render(S.tab); toast(v ? NTYPE[t].l + ' saved' : 'Name removed'); if (after) after(); };
  }
  function trustChips() { return '<button type="button" data-act="verify">' + ic('check') + 'Verified on the Pi blockchain</button><button type="button" data-act="backup">' + ic('cloud') + (signedIn() ? 'Backed up to your Pi account' : 'Backup after sign-in') + '</button><button type="button" data-tab="activity">' + ic('rcpt') + 'Receipt for every payment</button>'; }
  function backupSheet() {
    if (needSignIn('Sign in with Pi to back up your payments and business records.')) return;
    var R = rcpts(), done = R.filter(function (r) { return r.hs; }).length, bi = HK.bizInfo ? HK.bizInfo() : null;
    var w = sheet('Backup', '<div class="bk-hero"><div class="bk-i">' + ic('cloud') + '</div><b>Backed up to your Pi account</b><small>@' + esc(me()) + ' · ' + NETN + '</small></div>' +
      '<div class="list" style="margin-top:12px"><div class="txr"><span>Payments and receipts</span><b>' + done + ' of ' + R.length + ' saved</b></div>' + (bi ? '<div class="txr"><span>Business records</span><b>' + (bi.items ? bi.items + ' items · ' : '') + (bi.up ? 'saved ' + ago(bi.up) : 'nothing to save yet') + '</b></div>' : '') +
      '</div>' +
      '<button type="button" class="btn" id="bk-go">' + ic('refresh') + 'Back up now</button><button type="button" class="btn ghost" data-act="repair">' + ic('cloud') + 'Restore from backup</button>');
    $('#bk-go', w).onclick = function () {
      var b = this; b.disabled = true; b.textContent = 'Backing up…';
      Promise.all([hPush(), HK.bizPush ? HK.bizPush(true) : null]).then(function () { closeSheets(); toast('Backup complete'); backupSheet(); }).catch(function () { b.disabled = false; b.textContent = 'Back up now'; toast('No connection. Try again.'); });
    };
  }
  function trustHTML() { return '<div class="trust">' + trustChips() + '</div>'; }
  /* Repair app: clears temporary files and cached screens, checks saved data and restores history and business
     records from the backup. Payments, receipts and business records are kept. */
  function repairSheet() {
    var w = sheet('Reset', ''+
      '<div class="list rp-l">' + ['Finish pending payments', 'Clear temporary files', 'Check saved data', 'Restore from backup', 'Restart DigitalSaudi'].map(function (t, i) { return '<div class="li" data-rs="' + i + '"><span class="ico">' + ic('refresh') + '</span><span class="grow"><b>' + t + '</b></span><span class="rp-s"></span></div>'; }).join('') + '</div>' +
      '<button type="button" class="btn" id="rp-go">' + ic('refresh') + 'Reset now</button>');
    function step(i, st) { var r = $('[data-rs="' + i + '"]', w); if (!r) return; r.classList.toggle('busy', st === 'busy'); r.classList.toggle('done', st === 'done'); $('.ico', r).innerHTML = ic(st === 'done' ? 'check' : 'refresh'); }
    $('#rp-go', w).onclick = function () {
      var b = this; b.disabled = true; b.textContent = 'Resetting…'; var t0 = Date.now();
      // 1. pending payments: ask Pi for any unfinished payment and let the server finish or cancel it
      step(0, 'busy');
      var pend0 = new Promise(function (ok) {
        try { checkPendingInApp(); checkPendingWallet(); } catch (e) {}
        if (!signedIn() || !window.Pi || !initPi()) return setTimeout(ok, 600);
        resolving = 0; resolvePending(); var p = authP || Promise.resolve();
        Promise.race([p, new Promise(function (z) { setTimeout(z, 8000); })]).then(function () { setTimeout(ok, 2500); });
      });
      var p0 = pend0.then(function () { step(0, 'done'); step(1, 'busy'); }).then(function () { return Promise.all([
        window.caches ? caches.keys().then(function (ks) { return Promise.all(ks.map(function (k) { return caches.delete(k); })); }) : null,
        navigator.serviceWorker ? navigator.serviceWorker.getRegistrations().then(function (rs) { return Promise.all(rs.map(function (r) { return r.unregister(); })); }) : null
      ]).catch(function () {}); });
      p0.then(function () {
        upCache = {}; ['price', 'fx', 'errlog'].forEach(function (k) { try { localStorage.removeItem(K + k); } catch (e) {} });
        step(1, 'done'); step(2, 'busy'); var bad = 0;
        try { for (var i = localStorage.length - 1; i >= 0; i--) { var k = localStorage.key(i); if (k && k.indexOf(K) === 0) { try { JSON.parse(localStorage.getItem(k)); } catch (e) { localStorage.removeItem(k); bad++; } } } } catch (e) {}
        var R = rcpts(), seen = {}, clean = R.filter(function (r) { if (!r || !(Number(r.amount) > 0) || !r.ts) { bad++; return false; } var h = hKey(r) || JSON.stringify(r); if (seen[h]) { bad++; return false; } seen[h] = 1; return true; });
        if (clean.length !== R.length) put('rcpts', clean);
        step(2, 'done'); step(3, 'busy');
        if (!signedIn()) return null;
        hBusy = false; return Promise.all([new Promise(function (ok) { hPush().then(function () { return api('/history', { a: 'pull', accessToken: S.token, limit: 500 }); }).then(function (d) { if (d && d.ok) { S.hMore = !!d.more; hMerge(d.items || []); } }).catch(function () {}).then(ok); })].concat(HK.repair.map(function (f) { try { return f(); } catch (e) { return null; } })));
      }).then(function () {
        step(3, 'done'); step(4, 'busy');
        setTimeout(function () { step(4, 'done'); toast('Reset complete'); setTimeout(function () { location.replace(location.pathname + '?r=' + Date.now().toString(36)); }, 600); }, Math.max(300, 1400 - (Date.now() - t0)));
      });
    };
  }
  function insightsHTML() {
    var s = monthStats(S.month), m = monthRange(S.month)[2], b = get('budget', 0), u = rateIn('USD'), c = curr(), r = rateIn(c);
    var cats = Object.keys(s.cats).map(function (k) { return [k, s.cats[k]]; }).sort(function (a, b2) { return b2[1] - a[1]; }), top = cats.length ? cats[0][1] : 0;
    return '<div class="card" style="margin-top:14px"><div class="row"><button type="button" class="tbtn" data-mon="-1" aria-label="Previous month">' + ic('chevl') + '</button><div class="grow" style="text-align:center"><b>' + m.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }) + '</b></div><button type="button" class="tbtn" data-mon="1" aria-label="Next month"' + (S.month >= 0 ? ' disabled style="opacity:.4"' : '') + '>' + ic('chev') + '</button></div>' +
      '<div class="stats"><div><small>Spent</small><b>' + fpi(s.out) + ' π</b></div><div><small>Received</small><b class="pos">' + fpi(s.inn) + ' π</b></div><div><small>Net</small><b>' + (s.inn - s.out >= 0 ? '+' : '−') + fpi(Math.abs(r7(s.inn - s.out))) + ' π</b></div></div>' +
      (u ? '<p class="small muted" style="margin-top:8px">Spent ≈ ' + money(s.out * u, 'USD') + (r && c !== 'USD' ? ' · ' + money(s.out * r, c) : '') + ' at today’s rate</p>' : '') +
      (b && S.month === 0 ? '<div class="row small" style="margin-top:12px"><span class="grow muted">Monthly budget ' + fpi(b) + ' π</span><b class="num">' + Math.round(s.out / b * 100) + '%</b></div><div class="bar"><i class="' + (s.out > b ? 'over' : '') + '" style="width:' + Math.min(100, s.out / b * 100) + '%"></i></div>' + (s.out > b ? '<div class="note warn" style="margin-top:10px">' + ic('warn') + '<span>You are ' + fpi(r7(s.out - b)) + ' π over your budget this month.</span></div>' : '') : '') + '</div>' +
      (S.month === 0 ? forecastHTML(b) : '') +
      '<div class="card tr-card"><div class="row small"><b class="grow">Spending · last 6 months</b><span class="muted">π</span></div>' + trendSvg() + '</div>' +
      '<div class="sec"><h2>Where your Pi went</h2><button type="button" data-act="budget">' + (b ? 'Edit budget' : 'Set budget') + '</button></div>' +
      (cats.length ? '<div class="card">' + cats.map(function (x) { return '<div class="cat' + (x[0] === 'Not sorted' ? ' ns' : '') + '"><div class="row"><span>' + esc(x[0]) + '</span><b>' + fpi(x[1]) + ' π</b></div><div class="bar"><i style="width:' + Math.max(4, x[1] / top * 100) + '%"></i></div><small>' + Math.round(x[1] / (s.out || 1) * 100) + '% of spending' + (x[0] === 'Not sorted' ? ' · <button type="button" class="lnk" data-act="catsort">Sort these payments</button>' : '') + '</small></div>'; }).join('') + '</div>'
        : '<div class="list"><div class="empty">' + ic('pie') + '<div>No spending this month. Choose a category when you send Pi to see it here.</div></div></div>');
  }

  function render(tab) {
    S.tab = tab; var v = $('#view'); if (!v) return;
    try { v.innerHTML = T[tab](); } catch (e) { guardErr(e && e.message); v.innerHTML = '<div class="list" style="margin-top:20px"><div class="empty">' + ic('refresh') + '<div>This screen did not load.</div><button type="button" class="btn" data-act="repair" style="margin-top:14px">' + ic('refresh') + 'Repair app</button></div></div>'; }
    $$('#tabs button').forEach(function (b) { b.classList.toggle('on', b.dataset.tab === tab); b.setAttribute('aria-current', b.dataset.tab === tab ? 'page' : 'false'); });
    if (tab === 'activity') $$('.act-ch .chip.on').forEach(function (c) { try { var p = c.parentNode; p.scrollLeft = c.offsetLeft - p.clientWidth / 2 + c.offsetWidth / 2; } catch (e) {} });
    if (tab === 'wallet') { cvCalc('pi'); ['pi', 'usd', 'loc', 'tr'].forEach(function (k) { var e = $('#cv-' + k); if (e) e.oninput = function () { cvCalc(k); }; }); }
  }
  function go(tab) { if (tab === S.tab && $('#view').innerHTML) { scrollTo({ top: 0, behavior: 'smooth' }); } closeSheets(); render(tab); scrollTo(0, 0); }

  /* ── contacts: people and businesses you pay often (stay on this phone) ── */
  function contacts() { return get('contacts', []); }
  function cName(to) { to = String(to || '').toLowerCase(); var c = contacts().filter(function (x) { return x.to.toLowerCase() === to; })[0]; return c ? c.name : ''; }
  function userSends() { return !!(S.cfg.enabled && S.cfg.usernames); }
  function payTo(to, pre) {
    pre = pre || {}; pre.u = to;
    if (!isG(to) && !userSends()) return toast('Paying a @username opens soon. Use their wallet address for now.');
    sendSheet(pre);
  }
  function contactsSheet() {
    var L = contacts();
    var w = sheet('Contacts', ''+
      (L.length ? '<div class="list">' + L.map(function (c, i) { return '<div class="li"><span class="ico">' + ic(isG(c.to) ? 'card' : 'user') + '</span><button type="button" class="grow lb" data-cs="' + i + '"><b>' + esc(c.name) + (c.trusted ? ' <span class="tr-b">' + ic('shield') + 'Trusted</span>' : '') + '</b><small class="num">' + esc(toLabel(c.to)) + '</small></button><button type="button" class="tbtn" data-ce="' + i + '" aria-label="Edit ' + esc(c.name) + '">' + ic('edit') + '</button></div>'; }).join('') + '</div>'
        : '<div class="list"><div class="empty">' + ic('users') + '<div>No contacts yet. Add the people you pay often.</div></div></div>') +
      '<button type="button" class="btn" data-x="add">' + ic('users') + 'Add contact</button>');
    $$('[data-cs]', w).forEach(function (b) { b.onclick = function () { payTo(L[+b.dataset.cs].to); }; });
    $$('[data-ce]', w).forEach(function (b) { b.onclick = function () { contactEdit(+b.dataset.ce); }; });
    $('[data-x="add"]', w).onclick = function () { contactEdit(-1); };
  }
  function contactEdit(i, preTo) {
    var L = contacts(), c = i >= 0 ? L[i] : { name: '', to: preTo || '' }, rec = get('payees', []).filter(function (p) { return !L.some(function (x) { return x.to.toLowerCase() === p.toLowerCase(); }); }).slice(0, 6);
    var w = sheet(i >= 0 ? 'Edit contact' : 'Add contact',
      '<label class="l" for="ct-n">Name</label><input class="in" id="ct-n" maxlength="40" placeholder="e.g. Alex, Landlord, Shop" value="' + esc(c.name) + '">' +
      '<label class="l" for="ct-t">' + (userSends() ? '@username or wallet address' : 'Pi wallet address') + '</label><textarea class="in num" id="ct-t" rows="2" maxlength="60" autocapitalize="none" spellcheck="false" style="font-size:14px;resize:none" placeholder="' + (userSends() ? '@username or G…' : 'G…') + '">' + esc(c.to ? (isG(c.to) ? c.to : '@' + c.to) : '') + '</textarea><div class="hint" id="ct-h"></div>' +
      (i < 0 && rec.length ? '<label class="l">From your recent payments</label><div class="chips">' + rec.map(function (p) { return '<button type="button" class="chip" data-rp="' + esc(p) + '">' + esc(toLabel(p)) + '</button>'; }).join('') + '</div>' : '') +
      '<label class="tg rt-tg"><input type="checkbox" id="ct-tr"' + (c.trusted ? ' checked' : '') + '><span>Trusted recipient</span></label>' +
      '<button type="button" class="btn" id="ct-go">Save contact</button>' + (i >= 0 ? '<button type="button" class="btn ghost" id="ct-pay">' + ic('send') + 'Send Pi</button><button type="button" class="btn danger" id="ct-rm">' + ic('trash') + 'Delete contact</button>' : ''), { stack: true });
    var t = $('#ct-t', w), h = $('#ct-h', w);
    function val() {
      var v = t.value.replace(/\s/g, ''); if (/^S[A-Z2-7]{20,}$/.test(v.toUpperCase())) { t.value = ''; h.innerHTML = '<span class="bad">That looks like a SECRET key. Never share it. Use the address that starts with G.</span>'; return ''; }
      if (/^G[A-Za-z2-7]{55}$/.test(v)) { v = v.toUpperCase(); if (validG(v)) { h.innerHTML = '<span class="ok">✓ Valid Pi wallet address</span>'; return v; } h.innerHTML = '<span class="bad">This address is not valid. Check every character.</span>'; return ''; }
      v = v.replace(/^@/, ''); if (userSends() && USER_RE.test(v)) { h.textContent = ''; return v; }
      h.textContent = v ? (userSends() ? 'Enter a @username or an address that starts with G' : 'Enter a Pi wallet address (starts with G, 56 characters)') : ''; return '';
    }
    t.oninput = val;
    $$('[data-rp]', w).forEach(function (b) { b.onclick = function () { t.value = isG(b.dataset.rp) ? b.dataset.rp : '@' + b.dataset.rp; val(); $('#ct-n', w).focus(); }; });
    $('#ct-go', w).onclick = function () {
      var n = $('#ct-n', w).value.trim(), v = val();
      if (!n) return toast('Enter a name'); if (!v) return toast(userSends() ? 'Enter a valid @username or wallet address' : 'Enter a valid wallet address');
      var L2 = contacts().filter(function (x, k) { return k !== i && x.to.toLowerCase() !== v.toLowerCase(); });
      L2.push({ name: n, to: v, trusted: $('#ct-tr', w).checked }); L2.sort(function (a, b) { return a.name.localeCompare(b.name); }); put('contacts', L2.slice(0, 200));
      toast('Contact saved'); contactsSheet(); rerenderUnder();
    };
    var pb = $('#ct-pay', w); if (pb) pb.onclick = function () { payTo(c.to); };
    var rm = $('#ct-rm', w); if (rm) rm.onclick = function () { put('contacts', contacts().filter(function (x, k) { return k !== i; })); toast('Contact deleted'); contactsSheet(); rerenderUnder(); };
    if (i < 0) setTimeout(function () { $('#ct-n', w).focus(); }, 120);
  }
  function rerenderUnder() { var v = $('#view'); if (v && !$('#app').hidden) { S.y = scrollY; v.innerHTML = T[S.tab](); } }

  /* ── payment links: reusable links and QR codes that open DigitalSaudi ready to pay you ── */
  function myTarget() { var un = userSends() && signedIn(); return un ? me() : get('addr', ''); }
  function links() { return get('links', []); }
  function linkText(o) { var who = isG(o.u) ? 'I' : '@' + o.u; return who + (o.a ? ' requested ' + fpi(o.a) + ' π' + (conv(o.a) ? ' (' + conv(o.a).replace('≈ ', '≈') + ')' : '') : ' shared a payment link') + (o.x ? ' for “' + o.x + '”' : '') + '. Pay with DigitalSaudi:\n' + payLink({ u: o.u, a: o.a || 0, x: o.x || '' }); }
  function showLink(o, title) {
    var link = payLink({ u: o.u, a: o.a || 0, x: o.x || '' }), who = isG(o.u) ? short(o.u) : '@' + o.u;
    var w = sheet(title || 'Payment link', '<div class="big"><div class="v">' + (o.a ? fpi(o.a) + ' π' : 'Any amount') + '</div>' + (o.a ? '<div class="c">' + esc(conv(o.a)) + '</div>' : '') + '<div class="w">To ' + esc(who) + (o.x ? ' · ' + esc(o.x) : '') + '</div></div>' +
      '<div class="qr">' + (window.FPQR ? FPQR.svg(link, 230, '#0C4A2C') : '') + '</div><p class="small muted" style="text-align:center;margin-top:6px">Scan with DigitalSaudi or the phone camera to pay.</p>' +
      '<div class="two"><button type="button" class="btn" data-x="sh">' + ic('share') + 'Share</button><button type="button" class="btn ghost" data-x="cp">' + ic('copy') + 'Copy link</button></div>', { stack: true });
    $('[data-x="sh"]', w).onclick = function () { shareText('DigitalSaudi payment link', linkText(o)); };
    $('[data-x="cp"]', w).onclick = function () { copy(link); };
  }
  function needTarget(what) {
    if (myTarget()) return false;
    var w0 = sheet(what, '<button type="button" class="btn" data-x="aa">' + ic('card') + 'Add my wallet address</button>');
    $('[data-x="aa"]', w0).onclick = function () { addrSheet(true); }; return true;
  }
  function linksSheet() {
    if (needTarget('Payment links')) return;
    var L = links();
    var w = sheet('Payment links', '<p class="sh-sub">Get paid in Pi by link or QR code.</p>' +
      '<button type="button" class="btn" data-x="new">' + ic('link') + 'Create payment link</button>' +
      (L.length ? '<div class="day">Your links</div><div class="list">' + L.map(function (o, i) { return '<div class="li"><span class="ico">' + ic('link') + '</span><button type="button" class="grow lb" data-lk="' + i + '"><b>' + esc(o.x || 'Payment link') + '</b><small>' + (o.a ? fpi(o.a) + ' π' : 'Any amount') + ' · ' + esc(isG(o.u) ? short(o.u) : '@' + o.u) + ' · ' + ago(o.ts) + '</small></button><button type="button" class="tbtn" data-lr="' + i + '" aria-label="Delete link">' + ic('trash') + '</button></div>'; }).join('') + '</div>' : ''));
    $('[data-x="new"]', w).onclick = function () { requestSheet(true); };
    $$('[data-lk]', w).forEach(function (b) { b.onclick = function () { showLink(L[+b.dataset.lk]); }; });
    $$('[data-lr]', w).forEach(function (b) { b.onclick = function () { put('links', links().filter(function (x, k) { return k !== +b.dataset.lr; })); linksSheet(); }; });
  }
  function saveLink(o) { var L = links().filter(function (x) { return !(x.u === o.u && x.a === o.a && x.x === o.x); }); L.unshift({ u: o.u, a: o.a, x: o.x, ts: Date.now() }); put('links', L.slice(0, 50)); }

  /* ── split a bill: one amount shared between people, each gets a payment request ── */
  function splits() { return get('splits', []); }
  function splitSheet() {
    if (needTarget('Split a bill')) return;
    var w = sheet('Split a bill', '<p class="sh-sub">Share a cost and send everyone their part as a payment request.</p>' +
      '<label class="l" for="sp-a">Total amount</label><div class="amt"><input id="sp-a" type="number" inputmode="decimal" min="0" step="any" placeholder="0.00"><span>π</span></div><div class="hint num" id="sp-c"></div>' +
      '<label class="l" for="sp-x">What is it for?</label><input class="in" id="sp-x" maxlength="60" placeholder="e.g. Dinner, shared taxi, rent">' +
      '<label class="l" for="sp-p">Who is sharing? (names, separated by commas)</label><input class="in" id="sp-p" maxlength="300" placeholder="e.g. Alex, Maria, Sam">' +
      '<label class="chk"><input type="checkbox" id="sp-me" checked><span>Include my share</span></label>' +
      '<div class="sum" id="sp-sum" hidden></div><button type="button" class="btn" id="sp-go">' + ic('users') + 'Create requests</button>' +
      (splits().length ? '<button type="button" class="btn ghost" id="sp-old">Previous splits</button>' : ''));
    var a = $('#sp-a', w), p = $('#sp-p', w), mi = $('#sp-me', w);
    function names() { return p.value.split(/[,\n]/).map(function (s) { return s.trim().slice(0, 30); }).filter(Boolean).slice(0, 30); }
    function calc() {
      var v = r7(a.value), N = names(), n = N.length + (mi.checked ? 1 : 0), sh = n ? Math.ceil(v / n * 100) / 100 : 0;
      $('#sp-c', w).textContent = conv(v); var s = $('#sp-sum', w); s.hidden = !(v > 0 && N.length);
      s.innerHTML = '<div><span>People</span><b>' + n + '</b></div><div class="tot"><span>Each pays</span><b>' + fpi(sh) + ' π</b></div><div><span>You collect</span><b>' + fpi(r7(sh * N.length)) + ' π</b></div>';
      return { v: v, N: N, sh: sh };
    }
    a.oninput = p.oninput = mi.onchange = calc;
    $('#sp-go', w).onclick = function () {
      var c = calc(), x = $('#sp-x', w).value.trim();
      if (!(c.v >= 0.01)) return toast('Enter the total amount'); if (!x) return toast('Say what the bill is for'); if (!c.N.length) return toast('Add at least one name');
      if (!(c.sh >= 0.01)) return toast('Each share must be at least 0.01 π');
      var s = { id: Date.now().toString(36), u: myTarget(), total: c.v, sh: c.sh, x: x, ppl: c.N.map(function (n) { return { n: n, paid: false }; }), ts: Date.now() };
      var L = splits(); L.unshift(s); put('splits', L.slice(0, 30)); splitView(s.id);
    };
    var old = $('#sp-old', w); if (old) old.onclick = function () {
      var L = splits(), w2 = sheet('Previous splits', '<div class="list">' + L.map(function (s) { var pd = s.ppl.filter(function (q) { return q.paid; }).length; return '<button type="button" class="li" data-sv="' + s.id + '"><span class="ico">' + ic('users') + '</span><span class="grow"><b>' + esc(s.x) + '</b><small>' + fpi(s.total) + ' π · ' + pd + ' of ' + s.ppl.length + ' paid · ' + ago(s.ts) + '</small></span><span class="go">' + ic('chev') + '</span></button>'; }).join('') + '</div>', { stack: true });
      $$('[data-sv]', w2).forEach(function (b) { b.onclick = function () { splitView(b.dataset.sv); }; });
    };
    setTimeout(function () { a.focus(); }, 120);
  }
  function splitView(id) {
    var s = splits().filter(function (x) { return x.id === id; })[0]; if (!s) return;
    var o = { u: s.u, a: s.sh, x: s.x + ' (split)' }, pd = s.ppl.filter(function (q) { return q.paid; }).length;
    var w = sheet('Split · ' + s.x, '<div class="big"><div class="v">' + fpi(s.sh) + ' π each</div><div class="c">' + esc(conv(s.sh)) + '</div><div class="w">Total ' + fpi(s.total) + ' π · ' + pd + ' of ' + s.ppl.length + ' paid</div></div>' +
      '<div class="list" style="margin-top:12px">' + s.ppl.map(function (q, i) { return '<div class="li"><button type="button" class="tick' + (q.paid ? ' on' : '') + '" data-pd="' + i + '" aria-label="Mark ' + esc(q.n) + ' as paid">' + ic('check') + '</button><span class="grow"><b>' + esc(q.n) + '</b><small>' + (q.paid ? 'Paid' : 'Waiting · ' + fpi(s.sh) + ' π') + '</small></span>' + (q.paid ? '' : '<button type="button" class="tbtn" data-ps="' + i + '" aria-label="Send request to ' + esc(q.n) + '">' + ic('share') + '</button>') + '</div>'; }).join('') + '</div>' +
      '<p class="small muted" style="margin-top:8px">Tap ' + ic('share', 'width:14px;height:14px;vertical-align:-2px') + ' to send someone their request. Tick people when they have paid.</p>' +
      '<button type="button" class="btn" data-x="qr">' + ic('qr') + 'Show QR code</button><button type="button" class="btn danger" data-x="rm">' + ic('trash') + 'Delete split</button>', { stack: true });
    function upd(fn) { put('splits', splits().map(function (x) { if (x.id === id) fn(x); return x; })); w.remove(); splitView(id); }
    $$('[data-pd]', w).forEach(function (b) { b.onclick = function () { upd(function (x) { x.ppl[+b.dataset.pd].paid = !x.ppl[+b.dataset.pd].paid; }); }; });
    $$('[data-ps]', w).forEach(function (b) { b.onclick = function () { var n = s.ppl[+b.dataset.ps].n; shareText('DigitalSaudi payment request', 'Hi ' + n + ', your share of “' + s.x + '” is ' + fpi(s.sh) + ' π.\n' + linkText(o).split('\n').pop()); }; });
    $('[data-x="qr"]', w).onclick = function () { showLink(o, 'Pay your share'); };
    $('[data-x="rm"]', w).onclick = function () { put('splits', splits().filter(function (x) { return x.id !== id; })); closeSheets(); toast('Split deleted'); };
  }

  /* ── payment reminders: regular payments you approve yourself each time ── */
  var FREQ = { once: 'Once', weekly: 'Every week', monthly: 'Every month' };
  function rems() { return get('rems', []); }
  function nextDate(r) { var d = new Date(r.next); if (r.freq === 'weekly') d.setDate(d.getDate() + 7); else if (r.freq === 'monthly') { var day = r.day || d.getDate(); d.setDate(1); d.setMonth(d.getMonth() + 1); d.setDate(Math.min(day, new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate())); } return d.getTime(); }
  function advanceRem(id) {
    put('rems', rems().map(function (r) { if (r.id !== id) return r; if (r.freq === 'once') { r.done = true; return r; } var n = r.next; while (n <= Date.now()) { r.next = n = nextDate(r); } return r; }).filter(function (r) { return !r.done; }));
  }
  function dueRems() { var now = Date.now(); return rems().filter(function (r) { return r.next <= now; }); }
  function checkRems() { dueRems().forEach(function (r) { addNote('bell', 'Payment due', fpi(r.amt) + ' π to ' + (cName(r.to) || toLabel(r.to)) + ' · ' + r.narr, 'rem-' + r.id + '-' + r.next); }); }
  function remMatch(rc) {
    if (!rc || rc.dir !== 'out') return;
    dueRems().forEach(function (r) {
      var hit = isG(r.to) ? rc.addr === r.to : String(rc.other || '').toLowerCase() === '@' + r.to.toLowerCase();
      if (hit && Math.abs(Number(rc.amount) - r.amt) < 1e-7) advanceRem(r.id);
    });
  }
  function dueHTML() {
    var D = dueRems(); if (!D.length) return '';
    return '<div class="sec"><h2>Payments due</h2><button type="button" data-act="rems">All reminders</button></div><div class="list">' + D.slice(0, 3).map(function (r) {
      return '<div class="li"><span class="ico rf">' + ic('bell') + '</span><span class="grow"><b>' + esc(r.narr) + '</b><small>' + fpi(r.amt) + ' π to ' + esc(cName(r.to) || toLabel(r.to)) + ' · due ' + new Date(r.next).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) + '</small></span><button type="button" class="chip on" data-act="rem-pay" data-id="' + r.id + '">Pay</button></div>';
    }).join('') + '</div>';
  }
  function remsSheet() {
    var L = rems().slice().sort(function (a, b) { return a.next - b.next; });
    var w = sheet('Payment reminders', '<p class="sh-sub">Rent, fees and regular payments, on schedule.</p>' +
      (L.length ? '<div class="list">' + L.map(function (r) { var due = r.next <= Date.now(); return '<div class="li"><span class="ico' + (due ? ' rf' : '') + '">' + ic('bell') + '</span><button type="button" class="grow lb" data-re="' + r.id + '"><b>' + esc(r.narr) + '</b><small>' + fpi(r.amt) + ' π to ' + esc(cName(r.to) || toLabel(r.to)) + ' · ' + FREQ[r.freq] + '</small><small>' + (due ? 'Due now' : 'Next: ' + new Date(r.next).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })) + '</small></button>' + (due ? '<button type="button" class="chip on" data-act="rem-pay" data-id="' + r.id + '">Pay</button>' : '') + '</div>'; }).join('') + '</div>'
        : '<div class="list"><div class="empty">' + ic('bell') + '<div>No reminders yet. Add rent, school fees, dues or any regular payment.</div></div></div>') +
      '<button type="button" class="btn" data-x="add">' + ic('bell') + 'Add reminder</button>');
    $('[data-x="add"]', w).onclick = function () { remEdit(''); };
    $$('[data-re]', w).forEach(function (b) { b.onclick = function () { remEdit(b.dataset.re); }; });
  }
  function remEdit(id) {
    var r = rems().filter(function (x) { return x.id === id; })[0] || { to: '', amt: '', narr: '', cat: '', freq: 'monthly', next: Date.now() + 86400e3 };
    var dd = new Date(r.next), ds = dd.getFullYear() + '-' + String(dd.getMonth() + 1).padStart(2, '0') + '-' + String(dd.getDate()).padStart(2, '0'), C = contacts();
    var w = sheet(id ? 'Edit reminder' : 'Add reminder',
      '<label class="l" for="rm-x">What is it for?</label><input class="in" id="rm-x" maxlength="60" placeholder="e.g. Rent, school fees, association dues" value="' + esc(r.narr) + '">' +
      '<label class="l" for="rm-t">Pay to</label><textarea class="in num" id="rm-t" rows="2" maxlength="60" autocapitalize="none" spellcheck="false" style="font-size:14px;resize:none" placeholder="' + (userSends() ? '@username or G…' : 'G…') + '">' + esc(r.to ? (isG(r.to) ? r.to : '@' + r.to) : '') + '</textarea><div class="hint" id="rm-h"></div>' +
      (C.length ? '<div class="chips">' + C.slice(0, 8).map(function (c, i) { return '<button type="button" class="chip" data-rc2="' + i + '">' + esc(c.name) + '</button>'; }).join('') + '</div>' : '') +
      '<label class="l" for="rm-a">Amount</label><div class="amt"><input id="rm-a" type="number" inputmode="decimal" min="0" step="any" placeholder="0.00" value="' + esc(r.amt) + '"><span>π</span></div><div class="hint num" id="rm-c"></div>' +
      '<label class="l">How often</label><div class="chips" id="rm-f">' + Object.keys(FREQ).map(function (k) { return '<button type="button" class="chip' + (r.freq === k ? ' on' : '') + '" data-f="' + k + '">' + FREQ[k] + '</button>'; }).join('') + '</div>' +
      '<label class="l" for="rm-d">' + (id ? 'Next payment date' : 'First payment date') + '</label><input class="in" id="rm-d" type="date" value="' + ds + '">' +
      '<button type="button" class="btn" id="rm-go">Save reminder</button>' + (id ? '<button type="button" class="btn danger" id="rm-rm">' + ic('trash') + 'Delete reminder</button>' : ''), { stack: true });
    var f = r.freq, t = $('#rm-t', w), a = $('#rm-a', w);
    a.oninput = function () { $('#rm-c', w).textContent = conv(r7(a.value)); }; a.oninput();
    function val() {
      var v = t.value.replace(/\s/g, ''), h = $('#rm-h', w); if (/^S/i.test(v) && v.length > 20) { t.value = ''; h.innerHTML = '<span class="bad">That looks like a SECRET key. Never share it.</span>'; return ''; }
      if (/^G[A-Za-z2-7]{55}$/.test(v)) { v = v.toUpperCase(); if (validG(v)) { h.innerHTML = ''; return v; } h.innerHTML = '<span class="bad">This address is not valid.</span>'; return ''; }
      v = v.replace(/^@/, ''); if (userSends() && USER_RE.test(v)) { h.innerHTML = ''; return v; } h.textContent = v ? 'Enter a valid ' + (userSends() ? '@username or ' : '') + 'wallet address' : ''; return '';
    }
    t.oninput = val;
    $$('[data-rc2]', w).forEach(function (b) { b.onclick = function () { var c = C[+b.dataset.rc2]; t.value = isG(c.to) ? c.to : '@' + c.to; val(); }; });
    $$('#rm-f .chip', w).forEach(function (b) { b.onclick = function () { f = b.dataset.f; $$('#rm-f .chip', w).forEach(function (x) { x.classList.toggle('on', x === b); }); }; });
    $('#rm-go', w).onclick = function () {
      var x = $('#rm-x', w).value.trim(), to = val(), v = r7(a.value), dv = $('#rm-d', w).value, m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dv);
      if (!x) return toast('Say what the payment is for'); if (!to) return toast('Enter who to pay'); if (!(v >= 0.01)) return toast('Enter the amount'); if (!m) return toast('Choose a date');
      var nx = new Date(+m[1], +m[2] - 1, +m[3], 9, 0, 0).getTime();
      var L = rems().filter(function (q) { return q.id !== id; }); L.push({ id: id || Date.now().toString(36), to: to, amt: v, narr: x, cat: r.cat || '', freq: f, next: nx, day: +m[3] }); put('rems', L.slice(0, 60));
      toast('Reminder saved'); remsSheet(); rerenderUnder();
    };
    var rm = $('#rm-rm', w); if (rm) rm.onclick = function () { put('rems', rems().filter(function (q) { return q.id !== id; })); toast('Reminder deleted'); remsSheet(); rerenderUnder(); };
  }
  function remPay(id) {
    var r = rems().filter(function (x) { return x.id === id; })[0]; if (!r) return;
    var w = sheet('Payment due', '<div class="big"><div class="v">' + fpi(r.amt) + ' π</div><div class="c">' + esc(conv(r.amt)) + '</div><div class="w">To ' + esc(cName(r.to) || toLabel(r.to)) + ' · ' + esc(r.narr) + '</div></div>' +
      '<button type="button" class="btn" data-x="pay">' + ic('send') + 'Pay now</button><button type="button" class="btn ghost" data-x="done">Already paid</button><button type="button" class="btn ghost" data-x="skip">Skip this time</button>');
    $('[data-x="pay"]', w).onclick = function () { payTo(r.to, { a: r.amt, x: r.narr, cat: r.cat }); };
    $('[data-x="done"]', w).onclick = function () { advanceRem(id); closeSheets(); rerender(); toast('Marked as paid'); };
    $('[data-x="skip"]', w).onclick = function () { advanceRem(id); closeSheets(); rerender(); toast('Skipped'); };
  }

  /* ── price alerts: a notification when 1 π crosses a price you choose ── */
  function alerts() { return get('alerts', []); }
  function checkAlerts() {
    var L = alerts(), ch = false;
    L.forEach(function (a) {
      if (a.hit) return; var r = rateIn(a.c); if (!r) return;
      if ((a.dir === 'above' && r >= a.v) || (a.dir === 'below' && r <= a.v)) {
        a.hit = Date.now(); ch = true;
        addNote('bell', 'Pi price alert', '1 π is now ' + money(r, a.c, r < 1 ? 4 : 2) + ', ' + (a.dir === 'above' ? 'above' : 'below') + ' your alert of ' + money(a.v, a.c, a.v < 1 ? 4 : 2) + '.', 'pa-' + a.id);
        toast('Price alert: 1 π = ' + money(r, a.c, r < 1 ? 4 : 2));
      }
    });
    if (ch) put('alerts', L);
  }
  function alertsSheet() {
    var L = alerts(), c = curr(), r = rateIn(c), dir = 'above';
    var w = sheet('Price alerts', '<p class="sh-sub">Get notified when 1 π reaches your price.</p>' +
      '<div class="card"><p class="small">1 π now</p><div class="num" style="font-size:24px;font-weight:700">' + (r ? money(r, c, r < 1 ? 4 : 2) : '—') + '</div></div>' +
      '<label class="l">Notify me when 1 π goes</label><div class="seg" id="pa-d"><button type="button" data-d="above" class="on">Above</button><button type="button" data-d="below">Below</button></div>' +
      '<label class="l" for="pa-v">Price in ' + esc(c) + '</label><div class="amt"><input id="pa-v" type="number" inputmode="decimal" min="0" step="any" placeholder="' + (r ? (r * 1.1).toFixed(r < 1 ? 4 : 2) : '0') + '"><span style="font-size:15px">' + esc(c) + '</span></div>' +
      '<button type="button" class="btn" id="pa-go">' + ic('bell') + 'Create alert</button>' +
      (L.length ? '<div class="day">Your alerts</div><div class="list">' + L.map(function (a, i) { return '<div class="li"><span class="ico' + (a.hit ? ' in' : '') + '">' + ic(a.hit ? 'check' : 'bell') + '</span><span class="grow"><b>' + (a.dir === 'above' ? 'Above ' : 'Below ') + money(a.v, a.c, a.v < 1 ? 4 : 2) + '</b><small>' + (a.hit ? 'Reached ' + ago(a.hit) : 'Waiting') + '</small></span><button type="button" class="tbtn" data-pr="' + i + '" aria-label="Delete alert">' + ic('trash') + '</button></div>'; }).join('') + '</div>' : '') +
      (get('push', false) ? '' : '<button type="button" class="btn ghost" data-act="push">' + ic('bell') + 'Turn on phone notifications</button>'));
    $$('#pa-d button', w).forEach(function (b) { b.onclick = function () { dir = b.dataset.d; $$('#pa-d button', w).forEach(function (x) { x.classList.toggle('on', x === b); }); }; });
    $('#pa-go', w).onclick = function () {
      var v = Number($('#pa-v', w).value); if (!(v > 0)) return toast('Enter a price');
      if (r && ((dir === 'above' && r >= v) || (dir === 'below' && r <= v))) return toast('1 π is already ' + (dir === 'above' ? 'above' : 'below') + ' that price');
      var L2 = alerts(); L2.unshift({ id: Date.now().toString(36), dir: dir, v: v, c: c }); put('alerts', L2.slice(0, 20)); toast('Alert created'); alertsSheet();
    };
    $$('[data-pr]', w).forEach(function (b) { b.onclick = function () { put('alerts', alerts().filter(function (x, k) { return k !== +b.dataset.pr; })); alertsSheet(); }; });
  }

  /* ── monthly statement (PDF) ── */
  function statementSheet() {
    var R = rcpts(), opts = [];
    for (var k = 0; k > -12; k--) { var m = monthRange(k); if (k === 0 || R.some(function (r) { return r.ts >= m[0] && r.ts < m[1]; })) opts.push(k); }
    var sel = 0;
    var w = sheet('Monthly statement', '<p class="sh-sub">All your payments for a month, with values and transaction IDs.</p>' +
      '<label class="l">Month</label><div class="chips" id="st-m">' + opts.map(function (k) { return '<button type="button" class="chip' + (k === 0 ? ' on' : '') + '" data-m="' + k + '">' + monthRange(k)[2].toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }) + '</button>'; }).join('') + '</div>' +
      '<div class="card" id="st-s" style="margin-top:12px"></div>' +
      '<div class="two"><button type="button" class="btn" data-x="dl">' + ic('down') + 'Download</button><button type="button" class="btn ghost" data-x="sh">' + ic('share') + 'Share</button></div>');
    function info() { var s = monthStats(sel); $('#st-s', w).innerHTML = '<div class="stats" style="margin-top:0"><div><small>Sent</small><b>' + fpi(s.out) + ' π</b></div><div><small>Received</small><b class="pos">' + fpi(s.inn) + ' π</b></div><div><small>Payments</small><b>' + s.n + '</b></div></div>'; }
    $$('#st-m .chip', w).forEach(function (b) { b.onclick = function () { sel = +b.dataset.m; $$('#st-m .chip', w).forEach(function (x) { x.classList.toggle('on', x === b); }); info(); }; });
    info();
    function make(share) {
      var btns = $$('.two .btn', w); btns.forEach(function (b) { b.disabled = true; }); toast('Preparing your statement…');
      buildStatement(sel).then(function (o) {
        btns.forEach(function (b) { b.disabled = false; });
        if (share) shareFile(o.blob, o.name, 'application/pdf', 'DigitalSaudi statement', 'DigitalSaudi statement · ' + o.name.replace(/\.pdf$/, ''));
        else saveFile(o.blob, o.name, 'application/pdf', 'statement');
      }).catch(function () { btns.forEach(function (b) { b.disabled = false; }); toast('Could not create the statement. Please try again.'); });
    }
    $('[data-x="dl"]', w).onclick = function () { make(false); };
    $('[data-x="sh"]', w).onclick = function () { make(true); };
  }
  function buildStatement(off) {
    var m = monthRange(off), R = rcpts().filter(function (r) { return r.ts >= m[0] && r.ts < m[1]; }).sort(function (a, b) { return a.ts - b.ts; }), s = monthStats(off);
    var F = "Poppins,'Segoe UI',Roboto,Arial,sans-serif", MF = "'JetBrains Mono',Menlo,Consolas,monospace", W = 1240, H = 1754, X = 80;
    var mon = m[2].toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
    var uv = function (r) { return r.usd ? Number(r.amount) * r.usd : 0; };
    var outU = 0, inU = 0; R.forEach(function (r) { if (r.dir === 'in') inU += uv(r); else outU += uv(r); });
    var P1 = 11, PN = 15, pages = [], i = 0; pages.push(R.slice(0, P1)); i = P1; while (i < R.length) { pages.push(R.slice(i, i + PN)); i += PN; }
    function txt(x, t, px, py, font, col, al) { x.font = font; x.fillStyle = col; x.textAlign = al || 'left'; x.fillText(t, px, py); }
    function fit(x, t, mw) { t = String(t || ''); if (x.measureText(t).width <= mw) return t; while (t.length > 1 && x.measureText(t + '…').width > mw) t = t.slice(0, -1); return t + '…'; }
    var DOC = '', FR = window.FPReceipt || {}, whoS = me() ? '@' + me() : 'DigitalSaudi user';
    function docId() {
      var src = ['wallet-statement', NETN, whoS, mon].concat(R.map(function (r) { return [r.txid || r.pid || '', r.amount, r.dir, r.ts].join('|'); })).join('\n');
      try { return crypto.subtle.digest('SHA-256', new TextEncoder().encode(src)).then(function (b) { var u = new Uint8Array(b), A = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789', c = ''; for (var k = 0; k < 10; k++) c += A[u[k] % 32]; DOC = 'FPS-' + c.slice(0, 5) + '-' + c.slice(5); }).catch(function () {}); } catch (e) { return Promise.resolve(); }
    }
    return fontsReady().then(docId).then(function () { return new Promise(function (ok) { var im = new Image(); im.onload = function () { ok(im); }; im.onerror = function () { ok(null); }; im.src = 'icon-192.png'; }); }).then(function (logo) {
      var jobs = pages.map(function (rows, pi) {
        var cv = document.createElement('canvas'); cv.width = W; cv.height = H; var x = cv.getContext('2d'); x.textBaseline = 'alphabetic';
        x.fillStyle = '#FFFFFF'; x.fillRect(0, 0, W, H);
        if (FR.guilloche) { FR.guilloche(x, 0, 0, W, H, '#21BC71', .045); FR.rosette(x, W / 2, H / 2 + 120, 330, '#997215', .05); }
        var y;
        if (pi === 0) {
          var g = x.createLinearGradient(0, 0, W, 300); g.addColorStop(0, '#0C4A2C'); g.addColorStop(.75, '#21BC71'); g.addColorStop(1, '#997215'); x.fillStyle = g; x.fillRect(0, 0, W, 300);
          if (FR.guilloche) FR.guilloche(x, 0, 0, W, 300, '#FFFFFF', .1);
          if (logo) x.drawImage(logo, X, 62, 76, 76);
          txt(x, 'DigitalSaudi', X + 96, 116, '700 44px ' + F, '#FFFFFF');
          txt(x, 'MONTHLY STATEMENT', W - X, 92, '600 22px ' + F, 'rgba(255,255,255,.8)', 'right');
          txt(x, mon, W - X, 140, '700 40px ' + F, '#FFFFFF', 'right');
          var who = (get('name', '') ? get('name', '') + ' · ' : '') + (me() ? '@' + me() : 'DigitalSaudi user');
          txt(x, who, X, 214, '600 28px ' + F, '#FFFFFF');
          txt(x, NETN + ' · Values at payment time', X, 254, '400 22px ' + F, 'rgba(255,255,255,.82)');
          var bx = [['Sent', fpi(s.out) + ' π', outU ? '≈ ' + money(outU, 'USD') : ''], ['Received', fpi(s.inn) + ' π', inU ? '≈ ' + money(inU, 'USD') : ''], ['Net', (s.inn - s.out >= 0 ? '+' : '−') + fpi(Math.abs(r7(s.inn - s.out))) + ' π', ''], ['Payments', String(s.n), '']];
          var bw = (W - 2 * X - 3 * 20) / 4;
          bx.forEach(function (b, k) {
            var bxX = X + k * (bw + 20); x.fillStyle = '#F2FAF6'; x.fillRect(bxX, 340, bw, 150);
            txt(x, b[0].toUpperCase(), bxX + 22, 382, '600 18px ' + F, '#64748B');
            x.font = '700 32px ' + MF; txt(x, fit(x, b[1], bw - 44), bxX + 22, 434, '700 32px ' + MF, k === 1 ? '#8B6819' : '#0B2C1C');
            if (b[2]) txt(x, b[2], bxX + 22, 470, '400 18px ' + F, '#64748B');
          });
          y = 560;
        } else {
          x.fillStyle = '#0C4A2C'; x.fillRect(0, 0, W, 130); if (FR.guilloche) FR.guilloche(x, 0, 0, W, 130, '#FFFFFF', .1);
          if (logo) x.drawImage(logo, X, 35, 60, 60);
          txt(x, 'DigitalSaudi', X + 76, 78, '700 32px ' + F, '#FFFFFF');
          txt(x, 'Statement · ' + mon, W - X, 78, '600 24px ' + F, '#FFFFFF', 'right');
          y = 190;
        }
        /* table header */
        x.fillStyle = '#0B2C1C'; x.fillRect(X, y, W - 2 * X, 2);
        txt(x, 'DATE', X, y + 38, '600 17px ' + F, '#64748B'); txt(x, 'DETAILS', X + 170, y + 38, '600 17px ' + F, '#64748B');
        txt(x, 'AMOUNT', W - X - 230, y + 38, '600 17px ' + F, '#64748B', 'right'); txt(x, 'VALUE', W - X, y + 38, '600 17px ' + F, '#64748B', 'right');
        y += 58; x.fillStyle = '#E3EFE9'; x.fillRect(X, y, W - 2 * X, 1);
        if (!rows.length) txt(x, 'No payments this month.', W / 2, y + 90, '400 26px ' + F, '#64748B', 'center');
        rows.forEach(function (r) {
          var d = new Date(r.ts), inn = r.dir === 'in';
          txt(x, d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }), X, y + 40, '600 22px ' + F, '#0B2C1C');
          txt(x, d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), X, y + 70, '400 18px ' + F, '#64748B');
          x.font = '600 22px ' + F; txt(x, fit(x, rcptTitle(r), 560), X + 170, y + 40, '600 22px ' + F, '#0B2C1C');
          var sub = [r.narr, r.cat && !inn ? r.cat : '', r.txid ? 'Tx ' + r.txid.slice(0, 10) + '…' : ''].filter(Boolean).join(' · ');
          x.font = '400 18px ' + F; txt(x, fit(x, sub, 560), X + 170, y + 70, '400 18px ' + F, '#64748B');
          txt(x, (inn ? '+' : '−') + fpi(r.amount) + ' π', W - X - 230, y + 40, '700 22px ' + MF, inn ? '#8B6819' : '#0B2C1C', 'right');
          var lv = r.lr && r.lc ? money(Number(r.amount) * r.lr, r.lc) : '', us = r.usd ? money(uv(r), 'USD') : '';
          txt(x, lv || us || '—', W - X, y + 40, '600 20px ' + F, '#0B2C1C', 'right');
          if (lv && us && r.lc !== 'USD') txt(x, us, W - X, y + 70, '400 17px ' + F, '#64748B', 'right');
          y += 92; x.fillStyle = '#EEF7F3'; x.fillRect(X, y, W - 2 * X, 1);
        });
        /* footer */
        x.fillStyle = '#E3EFE9'; x.fillRect(X, H - 120, W - 2 * X, 1);
        txt(x, 'Generated by DigitalSaudi on ' + new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) + '.', X, H - 80, '400 17px ' + F, '#64748B');
        txt(x, '© DigitalSaudi ' + new Date().getFullYear() + ' · digitalsaudi.pi', X, H - 52, '400 17px ' + F, '#94A3B8');
        txt(x, 'Page ' + (pi + 1) + ' of ' + pages.length, W - X, H - 80, '600 17px ' + F, '#64748B', 'right');
        if (DOC) txt(x, 'Document ID ' + DOC, W - X, H - 52, '600 17px ' + MF, '#0E6038', 'right');
        if (FR.watermark) {
          FR.watermark(x, 0, pi === 0 ? 300 : 130, W, H - (pi === 0 ? 300 : 130) - 130, 'DIGITALSAUDI STATEMENT · ' + whoS + ' · ' + mon + (DOC ? ' · ' + DOC : ''), .04);
          var mt = 'DIGITALSAUDI•STATEMENT•' + whoS + '•' + mon.toUpperCase() + '•' + (DOC || '') + '•PAGE ' + (pi + 1) + '/' + pages.length + '•';
          FR.microline(x, mt, X, H - 108, W - 2 * X); FR.microline(x, mt, X, H - 22, W - 2 * X);
        }
        return new Promise(function (ok, no) { cv.toBlob(function (b) { if (!b) return no(new Error('jpg')); b.arrayBuffer().then(function (ab) { ok({ w: W, h: H, bytes: new Uint8Array(ab) }); }, no); }, 'image/jpeg', 0.9); });
      });
      return Promise.all(jobs);
    }).then(function (imgs) {
      var d = m[2]; return { blob: makePdf(imgs), name: 'DigitalSaudi-statement-' + d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '.pdf' };
    });
  }
  /* minimal PDF: one full-page JPEG per A4 page */
  function makePdf(imgs) {
    var te = new TextEncoder(), chunks = [], len = 0, offs = [];
    function add(v) { if (typeof v === 'string') v = te.encode(v); chunks.push(v); len += v.length; }
    function obj(id, body) { offs[id] = len; add(id + ' 0 obj\n' + body + '\nendobj\n'); }
    add('%PDF-1.4\n'); add(new Uint8Array([37, 226, 227, 207, 211, 10]));
    var n = imgs.length, kids = []; for (var k = 0; k < n; k++) kids.push((3 + k * 3) + ' 0 R');
    obj(1, '<< /Type /Catalog /Pages 2 0 R >>');
    obj(2, '<< /Type /Pages /Kids [' + kids.join(' ') + '] /Count ' + n + ' >>');
    imgs.forEach(function (im, k) {
      var p = 3 + k * 3, img = p + 1, ct = p + 2, s = 'q 595.28 0 0 841.89 0 0 cm /Im0 Do Q';
      obj(p, '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.28 841.89] /Resources << /XObject << /Im0 ' + img + ' 0 R >> >> /Contents ' + ct + ' 0 R >>');
      offs[img] = len; add(img + ' 0 obj\n<< /Type /XObject /Subtype /Image /Width ' + im.w + ' /Height ' + im.h + ' /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ' + im.bytes.length + ' >>\nstream\n'); add(im.bytes); add('\nendstream\nendobj\n');
      obj(ct, '<< /Length ' + s.length + ' >>\nstream\n' + s + '\nendstream');
    });
    var total = 3 + n * 3, xr = len, t = 'xref\n0 ' + total + '\n0000000000 65535 f \n';
    for (var id = 1; id < total; id++) t += String(offs[id]).padStart(10, '0') + ' 00000 n \n';
    add(t + 'trailer\n<< /Size ' + total + ' /Root 1 0 R >>\nstartxref\n' + xr + '\n%%EOF\n');
    return new Blob(chunks, { type: 'application/pdf' });
  }

  /* ── welcome screens (first open) ── */
  var ONB = [
    { t: 'Welcome to DigitalSaudi', p: 'Live Pi rate in your currency and a verified receipt for every payment', img: 'icons/onb-v3-1.webp' },
    { t: 'Send and receive Pi', p: 'Pay any Pioneer by @username or Pi wallet address', img: 'icons/onb-v3-2.webp' },
    { t: 'Scan to pay', p: 'Scan a DigitalSaudi QR code to pay a merchant or a friend', img: 'icons/onb-v3-3.webp' },
    { t: 'Run your business', p: 'Quick sale, invoices, products and business reports', img: 'icons/onb-v3-4.webp' },
    { t: 'Verify any receipt', p: 'Check any receipt against the Pi blockchain in seconds', img: 'icons/onb-v3-5.webp' }
  ];

  function onbRate() {
    var p = S.p; if (!p || !p.usd) return '<div class="onb-rate wait"><span class="live off"></span><span>Pi price</span><span class="skel"></span></div>';
    var c = curr(), r = rateIn(c), ch = typeof p.change24h === 'number' ? p.change24h : null;
    return '<div class="onb-rate"><span class="live"></span><span class="onb-rl">Pi price</span><b class="num">1 π = ' + money(p.usd, 'USD', p.usd < 1 ? 4 : 2) + '</b>' + (c !== 'USD' && r ? '<small class="num">≈ ' + money(r, c, r < 1 ? 4 : 2) + '</small>' : '') + (ch !== null ? '<em class="' + (ch >= 0 ? 'up' : 'dn') + '">' + (ch >= 0 ? '▲ ' : '▼ ') + Math.abs(ch).toFixed(2) + '%</em>' : '') + '</div>';
  }
  function onboarding(force) {
    // shown every time DigitalSaudi is opened (once per visit); Skip closes it
    try { if (localStorage.getItem('dsw_v1_staffK') || /[?&]staff=/.test(location.search)) return; } catch (e) {}
    if (!force && window.__fpOnbShown) return; window.__fpOnbShown = true;
    var rt = null, at = null;
    var i = 0, o = document.createElement('div'); o.id = 'onb'; o.setAttribute('role', 'dialog'); o.setAttribute('aria-modal', 'true'); o.setAttribute('aria-label', 'Welcome to DigitalSaudi');
    function draw(dir) {
      var s0 = ONB[i], last = i === ONB.length - 1;
      o.innerHTML = '<div class="onb-art ' + (dir || '') + '"><img src="' + s0.img + '" alt=""><button type="button" class="onb-tap l" data-o="prev" aria-label="Previous"></button><button type="button" class="onb-tap r" data-o="next" aria-label="Next"></button>' +
        '<div class="onb-top"><div class="brand"><img src="icon-192.png" alt="">DigitalSaudi</div>' + (last ? '' : '<button type="button" class="onb-skip" data-o="skip">Skip</button>') + '</div>' +
        (i === 0 ? '<div id="onb-rt">' + onbRate() + '</div>' : '') + '</div>' +
        '<div class="onb-panel"><div class="onb-dots">' + ONB.map(function (x, k) { return '<i class="' + (k === i ? 'on' : k < i ? 'done' : '') + '"></i>'; }).join('') + '</div>' +
        '<div class="onb-txt ' + (dir || '') + '"><h2>' + esc(s0.t) + '</h2><p>' + esc(s0.p) + '</p></div>' +
        (last ? '<div class="onb-b">' + (signedIn() ? '<button type="button" class="btn" data-o="skip">Continue to DigitalSaudi</button>' : '<button type="button" class="btn" data-o="signin"><span class="pi-dot">π</span>Sign in with Pi</button><button type="button" class="onb-ex" data-o="explore">Explore without signing in</button>') + '</div>' : '<div class="onb-sw">Swipe to continue</div>') + '</div>';
      clearTimeout(at); if (!last) at = setTimeout(function () { if (document.body.contains(o) && i < ONB.length - 1) { i++; draw('fwd'); } }, 4500);
    }
    function end() { put('onb', true); clearInterval(rt); clearTimeout(at); o.classList.add('out'); setTimeout(function () { o.remove(); }, 260); }
    rt = setInterval(function () { var e = $('#onb-rt', o), h = onbRate(); if (e && e.getAttribute('data-h') !== h) { e.setAttribute('data-h', h); e.innerHTML = h; } if (!document.body.contains(o)) clearInterval(rt); }, 1500);
    o.addEventListener('click', function (e) {
      var b = e.target.closest('[data-o]'); if (!b) return; var k = b.dataset.o;
      if (k === 'skip') return end();
      if (k === 'signin') { end(); if (!$('#app').hidden) return; var si = $('#signin'); if (si) si.click(); return; }
      if (k === 'explore') { end(); if (!$('#app').hidden) return; var ex = $('#explore'); if (ex) ex.click(); return; }
      if (k === 'prev') { if (i > 0) { i--; draw('back'); } return; }
      if (i < ONB.length - 1) { i++; draw('fwd'); }
    });
    var sx = null; o.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
    o.addEventListener('touchend', function (e) { if (sx === null) return; var dx = e.changedTouches[0].clientX - sx; sx = null; if (Math.abs(dx) < 50) return; if (dx < 0 && i < ONB.length - 1) { i++; draw('fwd'); } else if (dx > 0 && i > 0) { i--; draw('back'); } });
    draw(); document.body.appendChild(o);
  }

  /* ── actions ── */
  var A = {
    send: function () { sendSheet(); }, receive: function () { receiveSheet(); }, request: function () { requestSheet(); }, scan: function () { scanSheet(); }, 'get-rcpt': function () { addTxSheet(null); },
    'send-to': function (el) { payTo(el.dataset.u); },
    contacts: contactsSheet, links: linksSheet, split: splitSheet, rems: remsSheet, alerts: alertsSheet, statement: statementSheet, tour: function () { onboarding(true); },
    'rem-pay': function (el) { remPay(el.dataset.id); },
    signin: function () { signIn(); },
    price: function () { go('wallet'); }, 'price-retry': function (el, e) { e.stopPropagation(); loadPrice(true); paintPrice(); },
    currency: function (el, e) { e && e.stopPropagation(); curSheet(); },
    lang: function () { if (window.FPL) FPL.sheet(); }, install: installApp, trusted: trustedSheet, report: function () { reportSheet(''); }, 'pi-domain': piDomainSheet, 'check-addr': function () { addrSheet(false); }, verify: function () { verifySheet(); },
    'addr-set': function () { addrSheet(true); }, 'addr-use': function () { var s = get('addrSug', ''); if (validG(s)) { put('addr', s); put('addrSug', ''); render(S.tab); loadWal(); toast('Address saved'); } },
    'wal-load': function () { S.wal = null; loadWal(); },
    notifs: function () {
      var N = notes(); put('notes', N.map(function (n) { return Object.assign({}, n, { read: true }); })); bellDot();
      sheet('Notifications', (!get('push', false) && 'Notification' in window && Notification.permission !== 'denied' ? '<button type="button" class="np-cta" data-act="push">' + ic('bell') + '<span><b>Phone notifications are off</b><small>Turn on to get alerts outside DigitalSaudi</small></span>' + ic('chev') + '</button>' : '') + (N.length ? '<div class="list anim">' + N.map(function (n) { return '<div class="li' + (n.read ? '' : ' unread') + '"><span class="ico nt ' + ntCls(n.ic) + '">' + ic(n.ic || 'bell') + '</span><span class="grow"><b>' + esc(n.t) + '</b><small style="white-space:normal">' + esc(n.b) + '</small><small>' + ago(n.ts) + '</small></span></div>'; }).join('') + '</div><button type="button" class="btn ghost" data-act="notes-clear">Clear all</button>' : '<div class="empty">' + ic('bell') + '<div>No notifications yet.</div></div>'));
    },
    'notes-clear': function () { put('notes', []); closeSheets(); bellDot(); },
    csv: function () {
      var rows = [['date', 'type', 'direction', 'amount_pi', 'counterparty', 'narration', 'category', 'network', 'transaction_id']].concat(actRows().map(function (x) { return x[0]; }).map(function (r) { return [new Date(r.ts).toISOString(), r.kind, r.dir, r.amount, r.other || '', r.narr || '', r.cat || '', r.net || '', r.txid || '']; }));
      var csv = rows.map(function (r) { return r.map(function (x) { x = String(x == null ? '' : x); if (/^[=+\-@]/.test(x)) x = "'" + x; return /[",\n]/.test(x) ? '"' + x.replace(/"/g, '""') + '"' : x; }).join(','); }).join('\n');
      var blob = new Blob([csv], { type: 'text/csv' }), name = 'DigitalSaudi-activity-' + new Date().toISOString().slice(0, 10) + '.csv';
      var f = null; try { f = new File([blob], name, { type: 'text/csv' }); } catch (e) {}
      if (canShareFile(f)) return navigator.share({ files: [f], title: 'DigitalSaudi activity' }).catch(function () {});
      saveFile(blob, name, 'text/csv', 'activity file');
    },
    name: function () { nameSheet(); },
    budget: function () {
      var w = sheet('Monthly budget', '<p class="sh-sub">Your monthly Pi spending limit.</p><div class="amt"><input id="bg-i" type="number" inputmode="decimal" placeholder="0" value="' + (get('budget', 0) || '') + '"><span>π</span></div><div class="hint num" id="bg-c"></div><button type="button" class="btn" id="bg-go">Save budget</button>' + (get('budget', 0) ? '<button type="button" class="btn ghost" id="bg-rm">Remove budget</button>' : ''));
      var i = $('#bg-i', w); i.oninput = function () { $('#bg-c', w).textContent = conv(+i.value); }; i.oninput();
      $('#bg-go', w).onclick = function () { var v = r7(i.value); if (!(v > 0)) return toast('Enter an amount'); put('budget', v); closeSheets(); render(S.tab); toast('Budget saved'); };
      var rm = $('#bg-rm', w); if (rm) rm.onclick = function () { put('budget', 0); closeSheets(); render(S.tab); };
    },
    push: function () {
      var sup = 'Notification' in window, perm = sup ? Notification.permission : 'unsupported', on = get('push', false);
      var w = sheet('Notifications', '<p class="sh-sub">Alerts for payments, invoices, refunds and reminders.</p>' +
        '<div class="note ' + (perm === 'granted' ? 'ok' : perm === 'denied' || perm === 'unsupported' ? 'warn' : '') + '">' + ic('bell') + '<span>' + (perm === 'granted' ? 'Allowed on this phone.' : perm === 'denied' ? 'Blocked for DigitalSaudi. Allow notifications in your browser settings to turn them on.' : perm === 'unsupported' ? 'Alerts appear inside DigitalSaudi.' : 'Not allowed yet.') + '</span></div>' +
        (sup && perm !== 'denied' ? '<button type="button" class="btn" id="ps-on">' + (on && perm === 'granted' ? 'Turn off' : 'Turn on') + '</button>' : '') + (on && perm === 'granted' ? '<button type="button" class="btn ghost" id="ps-t">Send a test</button>' : ''));
      var b = $('#ps-on', w); if (b) b.onclick = function () {
        if (on && perm === 'granted') { put('push', false); closeSheets(); render(S.tab); return; }
        Notification.requestPermission().then(function (p) { if (p === 'granted') { put('push', true); toast('Phone notifications on'); } else toast('Notifications were not allowed'); closeSheets(); render(S.tab); });
      };
      var t = $('#ps-t', w); if (t) t.onclick = function () { addNote('bell', 'DigitalSaudi notifications', 'Alerts are working.', 'test-' + Date.now()); toast('Test sent'); };
    },
    resolvepend: function () { repairSheet(); }, backup: function () { backupSheet(); }, travel: function () { curSheet(true); }, insights: function () { S.seg = 'ins'; go('activity'); }, catsort: function () { catSort(S.month); }, repair: function () { repairSheet(); },
    security: function () {
      sheet('Trust center', '<div class="trust big-t">' + trustChips() + '</div>' +
        
        '<div class="card"><h3>Limits and fees</h3><p>' + (S.cfg.max || S.cfg.daily ? (S.cfg.max ? 'Up to ' + S.cfg.max + ' π per transfer. ' : '') + (S.cfg.daily ? 'Up to ' + S.cfg.daily + ' π per Pioneer per day. ' : '') : 'No transfer limits. ') + 'Blockchain fee: ' + S.cfg.fee + ' π per transfer.</p></div>' +
        '' +
        '<div class="card"><h3>Good practice</h3><p>• Pay Pioneers and businesses you know.<br>• Check the @username and amount before you confirm.<br>• DigitalSaudi staff never ask you to send Pi.<br>• Keep your passphrase private.</p></div>' +
        '');
    },
    supporter: function () {
      if (get('supporter', false)) return toast('You are already a Supporter. Thank you!');
      if (needSignIn('Sign in with Pi to become a Supporter.')) return;
      var w = sheet('Become a Supporter', '<div class="big"><div class="v">1 π</div><div class="c">' + esc(conv(1)) + '</div><div class="w">DigitalSaudi Supporter badge</div></div><p class="sh-sub" style="margin-top:12px">The badge gives no reward or financial return.</p><button type="button" class="btn" id="sp-go">' + ic('heart') + 'Support with 1 π</button>');
      $('#sp-go', w).onclick = supporterPay;
    },
    status: function () { location.href = 'setup.html'; },
    help: function () { sheet('Help & contact', '<p class="sh-sub">DigitalSaudi support will reply as soon as possible.</p><a class="btn" href="mailto:' + SUPPORT + '?subject=DigitalSaudi%20help">' + ic('mail') + 'Email DigitalSaudi support</a>'); },
    signout: function () { S.user = null; S.token = null; registered = false; put('user', null); closeSheets(); $('#app').hidden = true; $('#landing').hidden = false; toast('Signed out'); }
  };
  function supporterPay() {
    if (!window.Pi || !initPi()) return toast('Open DigitalSaudi in the Pi Browser to pay');
    if (S.cfg.payments === false) { closeSheets(); return toast('Pi payments open soon. Nothing was charged.'); }
    var b = $('#sp-go'); if (b) { b.disabled = true; b.textContent = 'Waiting for Pi…'; }
    var reset = function (m) { if (b) { b.disabled = false; b.innerHTML = ic('heart') + 'Support with 1 π'; } if (m) toast(m); };
    try {
      Pi.createPayment({ amount: 1, memo: 'DigitalSaudi Supporter badge', metadata: { type: 'supporter' } }, {
        onReadyForServerApproval: function (pid) { api('/approve', { paymentId: pid }).then(function (d) { if (d && d.approved === false) reset(d.error || 'Payment refused. You were not charged.'); }).catch(function () {}); },
        onReadyForServerCompletion: function (pid, txid) {
          api('/complete', { paymentId: pid, txid: txid }).then(function () {
            put('supporter', true); saveRcpt({ kind: 'supporter', dir: 'out', amount: 1, other: 'DigitalSaudi', narr: 'Supporter badge', pid: pid, txid: txid, me: me() });
            addNote('heart', 'Thank you!', 'Your DigitalSaudi Supporter badge is on your profile.', 'sup-' + pid); closeSheets(); render(S.tab); toast('Thank you for supporting DigitalSaudi!');
          }).catch(function () { reset('Connection problem. DigitalSaudi will finish it when you reopen the app.'); });
        },
        onCancel: function () { reset('Payment cancelled'); }, onError: function () { reset('Payment error. Nothing was charged.'); }
      });
    } catch (e) { reset('Payment error'); }
  }

  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-tab]'); if (t && !t.closest('.sh-wrap')) { if (t.dataset.seg) S.seg = t.dataset.seg; go(t.dataset.tab); return; }
    var s = e.target.closest('#view [data-seg]'); if (s) { S.seg = s.dataset.seg; render('activity'); return; }
    var f = e.target.closest('[data-flt]'); if (f) { S.filter = f.dataset.flt; S.page = 60; $$('[data-flt]').forEach(function (b) { b.classList.toggle('on', b === f); }); actPaint(); return; }
    if (e.target.closest('[data-actper]')) { perSheet(); return; }
    var pr = e.target.closest('[data-per]'); if (pr) { var was = S.per; S.per = pr.dataset.per; S.page = 60; if (S.per === 'custom' || was === 'custom') render('activity'); else { $$('[data-per]').forEach(function (b) { b.classList.toggle('on', b === pr); }); actPaint(); } return; }
    if (e.target.closest('[data-sort]')) { sortSheet(); return; }
    if (e.target.closest('[data-more]')) { S.page += 100; actPaint(); return; }
    var ol = e.target.closest('[data-older]'); if (ol) { hOlder(ol); return; }
    var mo = e.target.closest('[data-mon]'); if (mo) { S.month = Math.min(0, S.month + Number(mo.dataset.mon)); render('activity'); return; }
    var rc = e.target.closest('[data-rc]'); if (rc) { var ri = rc.dataset.rc; showRcpt(ri.charAt(0) === 'x' ? S.extra[+ri.slice(1)] : rcpts()[+ri]); return; }
    var pe = e.target.closest('[data-pend]'); if (pe) { pendSheet(pe.dataset.pend); return; }
    var a = e.target.closest('[data-act]'); if (a && A[a.dataset.act]) { A[a.dataset.act](a, e); }
  });
  document.addEventListener('keydown', function (e) { if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('[role="button"][data-act]')) { e.preventDefault(); e.target.click(); } });
  var qT = null;
  document.addEventListener('input', function (e) {
    var t = e.target; if (!t || !t.id) return;
    if (t.id === 'sv-q') { svcFilter(t.value); return; }
    if (t.id === 'act-q') { clearTimeout(qT); qT = setTimeout(function () { S.q = t.value.slice(0, 80); S.page = 60; actPaint(); }, 160); }
    else if (t.id === 'act-f' || t.id === 'act-t') { S[t.id === 'act-f' ? 'from' : 'to'] = t.value; S.page = 60; actPaint(); }
  });

  /* ── start ── */
  (function () { var b = document.getElementById('ld-lang'); if (b && window.FPL) { var t = document.getElementById('ld-lang-t'); if (t) { t.textContent = FPL.lang().toUpperCase(); t.setAttribute('data-noi18n', ''); } b.onclick = function () { FPL.sheet(); }; } else if (b) b.hidden = true; })();
  function start() {
    if (TEST) { $('#ld-net').textContent = 'Pi Testnet'; }
    $('#signin').onclick = function () { signIn(); };
    $('#explore').onclick = function () { S.guest = true; showApp(); if (pendingCode) { var c = pendingCode; pendingCode = null; openCode(c); } };
    loadPrice(true); paintPrice(); initPi(); loadCfg(); checkRems(); netBar(); importHost(); if (!/[?&]staff=/.test(location.search)) { S.guest = true; showApp(); } var gq = /#go=([a-z-]+)/.exec(location.hash); if (gq) { goAct = gq[1]; try { history.replaceState(null, '', location.pathname + location.search); } catch (e) {} setTimeout(runGo, window.Pi ? 4000 : 300); }
    restoreLocal().then(function (n) { if (n) { MEMO = {}; try { render(S.tab); } catch (e) {} toast('Your records were restored on this phone'); } else mirrorSoon(); });
    var u = get('user', null);
    if (window.Pi && (!window.WALLET_EMBED || hostSigned())) signIn(true);
    checkPendingWallet(); checkPendingInApp();
    var hc = readHash(); if (hc) { pendingCode = hc; var lm = $('#ld-msg'); if (lm) { lm.style.color = 'var(--blue)'; lm.textContent = 'You opened a payment request. Sign in with Pi or explore to pay it.'; } }
    addEventListener('hashchange', function () { var c = readHash(); if (c) { if ($('#app').hidden) { pendingCode = c; } else openCode(c); } });
    var bgN = 0; setInterval(function () { if (!document.hidden) { loadPrice(); sync(); checkPendingWallet(); checkPendingInApp(); checkRems(); } else if (++bgN % 2 === 0) { sync(); checkRems(); } }, 60000);
    document.addEventListener('visibilitychange', function () { if (!document.hidden) { loadPrice(); sync(); checkPendingWallet(); checkPendingInApp(); checkRems(); } });
    if ('serviceWorker' in navigator) { navigator.serviceWorker.register('sw.js').catch(function () {}); navigator.serviceWorker.ready.then(function (reg) { setTimeout(function () { try { var o = location.origin, L = [location.pathname + location.search].concat(performance.getEntriesByType('resource').map(function (x) { return x.name; }).filter(function (x) { return x.indexOf(o + '/') === 0 && !/\.(mp4|webm|mp3)(\?|$)/.test(x); }).map(function (x) { return x.slice(o.length); })); if (reg.active) reg.active.postMessage({ warm: L }); } catch (e) {} }, 20000); }); }
  }
  window.DigitalSaudi = { S: S, render: render, sync: sync, showRcpt: showRcpt, sendSheet: sendSheet,
    kit: { HK: HK, P: P, A: A, T: T, get: get, put: put, esc: esc, ic: ic, toast: toast, sheet: sheet, closeSheets: closeSheets, copy: copy, fpi: fpi, conv: conv, money: money, rateIn: rateIn, curr: curr, short: short, r7: r7,
      rcpts: rcpts, me: me, signedIn: signedIn, myTarget: myTarget, needTarget: needTarget, payLink: payLink, isG: isG, validG: validG, cName: cName, contacts: contacts, toLabel: toLabel,
      shareText: shareText, shareImage: shareImage, shareLink: shareLink, shareFile: shareFile, saveFile: saveFile, canShareFile: canShareFile, makePdf: makePdf, fontsReady: fontsReady, addNote: addNote,
      go: go, rerender: rerender, openLink: function (u) { var c = parseCode(u); if (c) openCode(c); }, wal: function () { return S.wal; }, loadWal: function () { var a = get('addr', ''); if (!a) return Promise.resolve(); return lookAddr(a).then(function (W) { S.wal = W; }).catch(function () {}); }, scanBox: scanBox, scanOk: scanOk, budgetCheck: budgetCheck, nType: nType, NTYPE: NTYPE, setName: setName, curSheet: curSheet, api: api, token: function () { return S.token; }, NETN: NETN, TEST: TEST, USER_RE: USER_RE, rcptTitle: rcptTitle } };
  try { document.dispatchEvent(new Event('wallet:ready')); } catch (e) {}
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();

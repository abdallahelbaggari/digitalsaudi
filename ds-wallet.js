/* DigitalSaudi Wallet — live Pi rate (auto-refresh), DigitalSaudi Pay (buy & sell with blockchain-verified receipts),
   branded image receipts, converter, activity, and phone notifications that work on Android.
   DigitalSaudi never holds Pi: payments go from Pi Wallet to Pi Wallet and are verified on the Pi blockchain. */
(function () {
  'use strict';
  var TESTNET = /(^|[.-])testnet[.-]/i.test(location.hostname);
  var NETN = TESTNET ? 'Pi Testnet' : 'Pi Mainnet';
  var short = function (a) { a = String(a || ''); return a.length > 16 ? a.slice(0, 6) + '…' + a.slice(-6) : a; };
  var me = function () { return piUser ? piUser.username : ''; };
  var fullName = function () { return store.get('fullname', '') || (me() ? '@' + me() : 'Guest'); };
  var home = function () { return store.get('homeCur', 'NGN'); };
  var SYM = { NGN: '₦', USD: '$', EUR: '€', GBP: '£', AED: 'AED ', EGP: 'E£', PKR: 'Rs ', INR: '₹', IDR: 'Rp ', BDT: '৳', PHP: '₱', GHS: 'GH₵', XOF: 'CFA ' };
  function pi() { return store.get('pi', null); }
  function locRate() { var c = home(), r = convert(1, 'PI', c), p = pi(); if (r == null && c === 'NGN' && p && p.ngn) r = p.ngn; return r; }
  function localOf(amtPi) { var c = home(); if (c === 'SAR') return null; var r = locRate(); if (r == null) return null; var v = amtPi * r; return (SYM[c] || c + ' ') + fmt(v, v < 10 ? 2 : 0); }
  function conv(a) {
    var p = pi(); if (!p || !p.usd || !(a > 0)) return '';
    var l = localOf(a); return '≈ ' + fmt(a * (p.sar || p.usd * 3.75), 2) + ' SAR · $' + fmt(a * p.usd, 2) + (l ? ' · ' + l : '');
  }

  /* ── receipts ── */
  function inAppList() { return store.get(histKey(), []); }
  function p2pList() { return store.get('rcpts', []); }
  function when(ts) { var d = new Date(ts); return [['Date', d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })], ['Time', d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })]]; }
  function specApp(h) {
    var st = String(h.status || 'pending'), ok = st === 'completed', p = pi();
    return { title: 'Payment receipt', status: { text: ok ? '✓  Completed' : st.charAt(0).toUpperCase() + st.slice(1), ok: ok }, amount: h.amount,
      sub: p && p.usd ? conv(+h.amount) : '',
      rows: [['Name', fullName()], ['Pi username', me() ? '@' + me() : '—'], ['Payment for', h.memo || 'Pi payment']].concat(when(h.done || h.at), [['Network', NETN], ['Payment ID', h.id, 1], ['Transaction ID', h.txid, 1]]),
      thanks: 'Thank you for supporting DigitalSaudi' };
  }
  function specP2P(r) {
    var inn = r.dir === 'in';
    return { title: inn ? 'Sale receipt' : 'Payment receipt', status: { text: '✓  Verified on the Pi blockchain', ok: true }, amount: r.amount,
      sub: r.usd ? '≈ ' + fmt(r.amount * r.sar, 2) + ' SAR · $' + fmt(r.amount * r.usd, 2) + ' at payment time' : '',
      rows: [['Paid to', inn ? (r.name || r.seller || '—') + (r.user ? ' (@' + r.user + ')' : '') : r.other], ['Paid by', inn ? short(r.from) : (r.name || short(r.from))], ['For', r.item || r.memo || 'Payment'], ['Reference', r.ref]]
        .concat(when(r.ts), [['Network', r.net], ['Seller address', r.to, 1], ['Transaction ID', r.txid, 1]]),
      thanks: 'Paid with DigitalSaudi Pay', note: 'Verified on the Pi blockchain.' };
  }
  openReceipt = function (id) {
    var h = inAppList().find(function (x) { return x.id === id; }); if (!h) return;
    DSReceipt.sheet(specApp(h), 'DigitalSaudi-receipt-' + String(h.txid || h.id).slice(0, 8) + '.png',
      'DIGITALSAUDI · Payment receipt\n' + h.amount + ' π · ' + (h.memo || '') + '\n' + new Date(h.done || h.at).toLocaleString('en-GB') + '\nPayment ID: ' + h.id + (h.txid ? '\nTransaction ID: ' + h.txid : '') + '\ndigitalsaudi.pi');
  };
  window.dsP2PReceipt = function (h) {
    var r = p2pList().concat(extra).find(function (x) { return x.txid === h; }); if (!r) return toast('Receipt not found on this phone');
    DSReceipt.sheet(specP2P(r), 'DigitalSaudi-receipt-' + h.slice(0, 8) + '.png', 'DIGITALSAUDI · Verified payment\n' + r.amount + ' π for ' + (r.item || 'payment') + '\nReference ' + r.ref + '\nTransaction ' + h + '\ndigitalsaudi.pi');
  };

  /* ── DigitalSaudi Pay ── */
  function enc(o) { return btoa(unescape(encodeURIComponent(JSON.stringify(o)))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); }
  function newRef() { var A = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789', b = new Uint8Array(6), s = 'DS-'; try { crypto.getRandomValues(b); } catch (e) { for (var j = 0; j < 6; j++) b[j] = Math.random() * 256; } for (var i = 0; i < 6; i++) s += A[b[i] % A.length]; return s; }
  function link(s) { var o = { v: 1, t: s.t, a: s.a, i: s.i, n: s.n, u: s.u, r: s.r, k: TESTNET ? 'test' : 'main', d: s.d }; ['c', 'no', 'due', 'x', 'l'].forEach(function (k) { if (s[k]) o[k] = s[k]; }); return location.origin + '/invoice.html#' + enc(o); }
  window.dsPayLink = link; window.dsNewRef = newRef;
  var back = '<button class="btn btn-ghost btn-sm dw-back" onclick="openItem(\'piWallet\')">‹ Wallet</button>';
  window.dsGetPaid = function () {
    showPanel('Get paid in Pi', back +
      '<p class="small" style="margin:4px 0 12px">Create a payment request. Your buyer pays from Pi Wallet, and DigitalSaudi confirms it on the Pi blockchain and makes a receipt for both of you.</p>' +
      '<div class="dw-amt"><input id="gpA" type="number" inputmode="decimal" min="0" step="any" placeholder="0" oninput="document.getElementById(\'gpC\').textContent=dsConvLine(parseFloat(this.value))"><span>π</span></div><div class="dw-conv" id="gpC"></div>' +
      '<div class="field"><label>What is it for?</label><input id="gpI" maxlength="60" placeholder="e.g. Dates gift box, airport taxi, phone repair"></div>' +
      '<div class="field"><label>Your name or shop name (shown to the buyer)</label><input id="gpN" maxlength="50" value="' + esc(store.get('fullname', '')) + '" placeholder="Full name or shop name"></div>' +
      '<div class="field"><label>Your Pi wallet address</label><input id="gpT" maxlength="56" autocapitalize="characters" autocomplete="off" style="font-family:ui-monospace,Menlo,monospace;font-size:13px" value="' + esc(store.get('myaddr', '')) + '" placeholder="G… (56 characters)"><div class="small" style="margin-top:4px">Find it in Pi Wallet → Receive → copy. It is saved on this phone for next time.</div></div>' +
      '<button class="btn btn-primary" style="width:100%" onclick="dsCreateReq()">Create payment request</button>', { id: 'getPaid', share: false });
    setTimeout(function () { var a = $('gpA'); if (a) a.focus(); }, 120);
  };
  window.dsConvLine = conv;
  window.dsCreateReq = function () {
    var amt = Math.round(parseFloat($('gpA').value) * 1e7) / 1e7, it = $('gpI').value.trim(), nm = $('gpN').value.trim(), to = $('gpT').value.trim().toUpperCase().replace(/\s+/g, '');
    if (!(amt > 0)) return toast('Enter the amount in π');
    if (!it) return toast('Say what the payment is for');
    if (!/^G[A-Z2-7]{55}$/.test(to)) return toast('That wallet address is not valid. It starts with G and has 56 characters.');
    store.set('myaddr', to); if (nm && !store.get('fullname', '')) store.set('fullname', nm);
    var s = { t: to, a: amt, i: it, n: nm || fullName(), u: me(), r: newRef(), d: Date.now() };
    var sales = store.get('sales', []); sales.unshift(s); store.set('sales', sales.slice(0, 100));
    dsShowReq(0);
  };
  window.dsShowReq = function (i) {
    var s = store.get('sales', [])[i]; if (!s) return;
    var url = link(s), text = (s.no ? 'Invoice ' + s.no + ' from ' + (s.n || 'me') + ': ' + s.a + ' π' + (s.due ? ', due ' + s.due : '') : 'Payment request from ' + (s.n || 'me') + ': ' + s.a + ' π for ' + s.i) + '. Pay securely with DigitalSaudi Pay:\n' + url;
    showPanel(s.paid ? (s.no ? 'Invoice paid' : 'Payment received') : (s.no ? 'Invoice ' + s.no : 'Payment request ready'), back +
      '<div class="dw-req"><div class="dw-req-a">' + s.a + ' π</div><div class="dw-req-c">' + esc(conv(s.a)) + '</div><div class="dw-req-i">' + esc(s.i) + ' · <span class="notr">' + s.r + '</span></div></div>' +
      (s.no && window.dsInvoiceInfo ? dsInvoiceInfo(s, i) : '') +
      (s.paid ? '<div class="p-actions" style="justify-content:center"><button class="btn btn-primary btn-sm" onclick="dsP2PReceipt(\'' + s.paid + '\')">🧾 View receipt</button></div>' :
      '<p class="small" style="text-align:center;margin:10px 0">Send this link to your buyer. When they pay, DigitalSaudi finds the payment automatically and adds your sale receipt to the wallet.</p>' +
      '<button class="btn btn-primary" style="width:100%" id="rqSh">📤 Share with buyer</button>' +
      '<div class="p-actions" style="justify-content:center"><button class="btn btn-ghost btn-sm" id="rqCp">🔗 Copy link</button><a class="btn btn-ghost btn-sm" href="' + url + '" target="_blank" rel="noopener">👁 Open request</a><button class="btn btn-ghost btn-sm" onclick="dsCheckSales(true)">🔎 Check now</button></div>'), { id: 'payReq', share: false });
    var b = $('rqSh'); if (b) b.onclick = function () { shareText('DigitalSaudi Pay', text, url); };
    var c = $('rqCp'); if (c) c.onclick = function () { copyText(url); };
  };
  window.dsPay = function () {
    showPanel('Pay a request', back +
      '<p class="small" style="margin:4px 0 12px">When a seller sends you a DigitalSaudi Pay link, open it to see who you are paying, the amount and the item. Or paste the link here.</p>' +
      '<div class="field"><input id="pyL" placeholder="Paste the payment link" autocomplete="off"></div>' +
      '<button class="btn btn-primary" style="width:100%" onclick="var v=document.getElementById(\'pyL\').value,m=/invoice\\.html#([A-Za-z0-9_-]+)/.exec(v);if(!m)return toast(\'That is not a DigitalSaudi Pay link\');location.href=\'/invoice.html#\'+m[1]">Open payment request</button>' +
      '<div class="note" style="margin-top:12px">🔒 DigitalSaudi never holds your Pi and never asks for your passphrase. Blockchain payments cannot be reversed, so check the seller first.</div>', { id: 'payLink', share: false });
  };
  var checking = false;
  window.dsCheckSales = function (manual) {
    if (checking) return; var sales = store.get('sales', []), open = [];
    sales.forEach(function (s, i) { if (!s.paid && Date.now() - s.d < 30 * 864e5) open.push(i); });
    if (!open.length) { if (manual) toast('No open payment requests'); return; }
    checking = true; if (manual) toast('Checking the Pi blockchain…');
    Promise.all(open.slice(0, 6).map(function (i) {
      var s = sales[i];
      return fetch('/verify?to=' + s.t + '&ref=' + s.r + '&amt=' + s.a + '&net=' + (TESTNET ? 'test' : 'main')).then(function (r) { return r.json(); }).then(function (d) {
        if (!(d.ok && d.found)) return 0;
        var tx = d.tx, all = p2pList(), p = pi();
        s.paid = tx.hash; s.at = Date.parse(tx.at) || Date.now(); s.from = tx.from;
        if (!all.some(function (x) { return x.txid === tx.hash; })) {
          all.unshift({ amount: +parseFloat(tx.amount).toFixed(7), memo: s.i, item: s.i, kind: 'p2p', dir: 'in', ts: s.at, name: s.n, user: s.u, other: tx.from, from: tx.from, to: s.t, ref: s.r, seller: s.n, net: NETN, txid: tx.hash, status: 'Verified', usd: p && p.usd, sar: p && p.sar });
          store.set('rcpts', all.slice(0, 2500)); dsHistSoon();
        }
        notify('pay', 'pay_' + s.r, '💰', 'Payment received', s.a + ' π for ' + s.i + ' · verified on the Pi blockchain', 'piWallet');
        return 1;
      }).catch(function () { return 0; });
    })).then(function (r) {
      checking = false; store.set('sales', sales);
      var n = r.reduce(function (a, b) { return a + b; }, 0);
      if (n && current && current.id === 'piWallet') piWalletPanel();
      else if (!n && manual) toast('No payment yet. DigitalSaudi keeps checking while the app is open.');
    });
  };

  /* ── the wallet ── */
  var filter = 'all';
  function rows() {
    var out = [];
    inAppList().forEach(function (h) { out.push({ raw: h, ts: h.done || h.at, dir: 'out', title: h.memo || 'Pi payment', sub: 'In-app payment · ' + String(h.status || ''), amt: h.amount, act: "openReceipt('" + esc(h.id) + "')", ic: '⭐' }); });
    p2pList().concat(extra).forEach(function (r) { var inn = r.dir === 'in'; out.push({ raw: r, ts: r.ts, dir: inn ? 'in' : 'out', title: inn ? 'From ' + short(r.other) : 'To ' + (r.seller || short(r.to)), sub: (r.item || '') + ' · Verified', amt: r.amount, act: "dsP2PReceipt('" + r.txid + "')", ic: inn ? '↓' : '↑' }); });
    return out.sort(function (a, b) { return b.ts - a.ts; });
  }
  function stats() {
    var m = new Date(); m.setDate(1); m.setHours(0, 0, 0, 0); var inn = 0, outv = 0;
    var n = 0; rows().forEach(function (r) { if (r.ts >= m.getTime() && !/cancel|fail/.test(r.sub)) { n++; if (r.dir === 'in') inn += +r.amt; else outv += +r.amt; } });
    return { inn: +inn.toFixed(4), out: +outv.toFixed(4), n: n };
  }
  var showAll = false;
  function txRow(r) {
    var parts = String(r.sub || '').split(' · '), st = parts.length > 1 ? parts.pop() : '', what = parts.join(' · ');
    st = st ? st.charAt(0).toUpperCase() + st.slice(1) : '';
    return '<button class="dw-li" onclick="' + r.act + '"><span class="dw-lic ' + r.dir + '">' + (r.dir === 'in' ? '↙' : r.ic === '⭐' ? '★' : '↗') + '</span><span class="dw-lit"><b>' + esc(r.title) + '</b><small>' + esc((what ? what + ' · ' : '') + new Date(r.ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })) + '</small></span><span class="dw-lia ' + r.dir + '"><b>' + (r.dir === 'in' ? '+' : '−') + fmt(r.amt, 7) + ' π</b><small class="dw-pill ' + (/complet|verified|paid/i.test(st) ? 'ok' : /pend|wait|process/i.test(st) ? 'wait' : /cancel|fail|refund/i.test(st) ? 'bad' : '') + '">' + esc(st) + '</small></span></button>';
  }
  var sortOld = false, extra = [], hMore = false;
  function actHTML() {
    var R = rows().filter(function (r) { return !showAll || filter === 'all' || r.dir === filter; });
    if (showAll && sortOld) R.reverse();
    var bar = showAll ? '<div class="dw-sort"><span>' + R.length + ' payment' + (R.length === 1 ? '' : 's') + (me() ? ' · backed up' : '') + '</span><button type="button" onclick="dsTxSort()">' + (sortOld ? 'Oldest first ▴' : 'Newest first ▾') + '</button></div>' : '';
    var tools = showAll ? (hMore && me() ? '<button type="button" class="btn btn-ghost" style="width:100%;margin-top:4px" onclick="dsHistOlder(this)">Load older history</button>' : '') +
      '<div class="dw-two"><button type="button" class="btn btn-primary" onclick="dsStatement()">📄 Statement</button><button type="button" class="btn btn-ghost" onclick="dsCsv()">⬇️ Export CSV</button></div>' : '';
    if (!R.length) return bar + '<div class="dw-list"><div class="empty" style="padding:18px 8px"><div class="big">🧾</div>' + (filter === 'in' && showAll ? 'No payments received yet.' : filter === 'out' && showAll ? 'No payments made yet.' : 'No payments yet. Your receipts appear here.') + '</div></div>';
    if (!showAll) return '<div class="dw-list">' + R.slice(0, 4).map(txRow).join('') + '</div>';
    var out = '', day = '';
    R.slice(0, 600).forEach(function (r) { var d = new Date(r.ts).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }); if (d !== day) { if (day) out += '</div>'; out += '<div class="dw-day">' + d + '</div><div class="dw-list">'; day = d; } out += txRow(r); });
    return bar + out + '</div>' + tools;
  }
  window.dsWalletRows = function () { return rows(); };
  window.dsTxSort = function () { sortOld = !sortOld; var e = $('dwAct'); if (e) e.innerHTML = actHTML(); };

  /* ── full history, backed up on the server for this Pi account (never lost, restored on any phone) ── */
  var tok = function () { return piUser && piUser.accessToken; };
  function hKey(r) { var t = String(r.txid || '').toLowerCase(); if (/^[a-f0-9]{64}$/.test(t)) return 'tx:' + t + (r.kind === 'refund' ? ':r' : '') + (r.dir ? ':' + r.dir : ''); var f = String(r.ref || r.pid || r.id || ''); return f ? 'ref:' + f : ''; }
  function hApi(b) { return fetch('/history', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(b) }).then(function (r) { return r.json(); }); }
  var hBusy = false, hT = null;
  function hPush() {
    if (!tok()) return Promise.resolve();
    var P = p2pList(), A = inAppList(), todo = [];
    P.forEach(function (r) { if (!r.hs && hKey(r)) todo.push(['p', r]); }); A.forEach(function (r) { if (!r.hs && hKey(r) && String(r.status) === 'completed') todo.push(['a', r]); });
    todo = todo.slice(0, 200); if (!todo.length) return Promise.resolve();
    var items = todo.map(function (x) { var o = { src: x[0] === 'a' ? 'app' : 'p2p' }; for (var k in x[1]) if (k !== 'hs') o[k] = x[1][k]; if (!o.ts) o.ts = o.done || o.at; return o; });
    return hApi({ a: 'push', accessToken: tok(), items: items }).then(function (d) {
      if (!d || !d.ok) return; todo.forEach(function (x) { x[1].hs = 1; });
      store.set('rcpts', P); store.set(histKey(), A);
      if (todo.length === 200) return hPush();
    });
  }
  function hMerge(items) {
    var P = p2pList(), A = inAppList(), have = {}, n = 0;
    P.concat(A, extra).forEach(function (r) { have[hKey(r)] = 1; });
    items.forEach(function (r) { var k = hKey(r); if (!k || have[k]) return; have[k] = 1; n++; r.hs = 1; if (r.src === 'app') A.push(r); else P.push(r); });
    if (n) {
      P.sort(function (a, b) { return (b.ts || 0) - (a.ts || 0); }); A.sort(function (a, b) { return (b.done || b.at || 0) - (a.done || a.at || 0); });
      if (P.length > 2500) extra = extra.concat(P.slice(2500));
      store.set('rcpts', P.slice(0, 2500)); store.set(histKey(), A.slice(0, 2500));
    }
    return n;
  }
  function hSync() {
    if (hBusy || !tok()) return; hBusy = true;
    hPush().then(function () { return hApi({ a: 'pull', accessToken: tok(), limit: 500 }); }).then(function (d) {
      if (!d || !d.ok) return; hMore = !!d.more;
      if (hMerge(d.items || []) && current && current.id === 'piWallet') piWalletPanel();
    }).catch(function () {}).then(function () { hBusy = false; });
  }
  window.dsHistSoon = function () { clearTimeout(hT); hT = setTimeout(hSync, 1500); };
  window.dsHistOlder = function (btn) {
    if (!tok()) return toast('Sign in with Pi to load your full history');
    var oldest = rows().reduce(function (m, r) { return Math.min(m, r.ts || m); }, Date.now() + 864e5);
    if (btn) { btn.disabled = true; btn.textContent = 'Loading…'; }
    hApi({ a: 'pull', accessToken: tok(), before: oldest, limit: 500 }).then(function (d) {
      if (!d || !d.ok) { toast((d && d.error) || 'Could not load older history'); return; }
      hMore = !!d.more; var n = hMerge(d.items || []); toast(n ? n + ' older payments loaded' : 'You have reached the start of your history');
    }).catch(function () { toast('No connection. Try again.'); }).then(function () { var e = $('dwAct'); if (e) e.innerHTML = actHTML(); });
  };
  (function () { var n = 0, iv = setInterval(function () { if (tok()) { clearInterval(iv); hSync(); } else if (++n > 150) clearInterval(iv); }, 2000); })();

  /* ── CSV and monthly statement (PDF) ── */
  function fileDate(d) { return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0'); }
  window.dsCsv = function () {
    var R = rows(), q = function (v) { v = String(v == null ? '' : v); return /[",\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v; };
    var lines = [['Date', 'Time', 'Direction', 'Details', 'Description', 'Amount (Pi)', 'Value at payment time (USD)', 'Network', 'Transaction ID'].join(',')];
    R.forEach(function (r) { var d = new Date(r.ts), x = r.raw || {}; lines.push([d.toISOString().slice(0, 10), d.toTimeString().slice(0, 5), r.dir === 'in' ? 'Received' : 'Sent', r.title, String(r.sub || '').replace(/ · /g, ' - '), (r.dir === 'in' ? '' : '-') + r.amt, x.usd ? (+r.amt * x.usd).toFixed(2) : '', x.net || NETN, x.txid || ''].map(q).join(',')); });
    var blob = new Blob(['﻿' + lines.join('\n')], { type: 'text/csv' }), name = 'DigitalSaudi-payments-' + new Date().toISOString().slice(0, 10) + '.csv';
    DSFiles.save(blob, name, 'text/csv', 'payments file');
  };
  function monthRange(k) { var d = new Date(); d.setDate(1); d.setHours(0, 0, 0, 0); d.setMonth(d.getMonth() + k); var e = new Date(d); e.setMonth(e.getMonth() + 1); return [d.getTime(), e.getTime(), d]; }
  window.dsStatement = function () {
    var R = rows(), opts = [];
    for (var k = 0; k > -12; k--) { var m = monthRange(k); if (k === 0 || R.some(function (r) { return r.ts >= m[0] && r.ts < m[1]; })) opts.push(k); }
    var sel = 0;
    showPanel('Monthly statement', back + '<p class="small" style="margin:8px 0 12px">A PDF of all your DigitalSaudi wallet payments for a month, with values and transaction IDs.</p>' +
      '<div class="dw-tabs" id="stM">' + opts.map(function (k) { return '<button data-m="' + k + '" class="' + (k === 0 ? 'on' : '') + '">' + monthRange(k)[2].toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }) + '</button>'; }).join('') + '</div>' +
      '<div class="card dw-sec" id="stS"></div><div class="dw-two"><button class="btn btn-primary" id="stD">⬇️ Download</button><button class="btn btn-ghost" id="stH">📤 Share</button></div>', { id: 'dsStatement', share: false });
    function info() {
      var m = monthRange(sel), inn = 0, o = 0, n = 0; R.forEach(function (r) { if (r.ts >= m[0] && r.ts < m[1]) { n++; if (r.dir === 'in') inn += +r.amt; else o += +r.amt; } });
      $('stS').innerHTML = '<div class="dw-stats"><div><small>Sent</small><b class="notr">' + fmt(o, 4) + ' π</b></div><div><small>Received</small><b class="notr pos">' + fmt(inn, 4) + ' π</b></div><div><small>Payments</small><b class="notr">' + n + '</b></div></div>';
    }
    document.querySelectorAll('#stM button').forEach(function (b) { b.onclick = function () { sel = +b.dataset.m; document.querySelectorAll('#stM button').forEach(function (x) { x.classList.toggle('on', x === b); }); info(); }; });
    info();
    function make(sh) {
      toast('Preparing your statement…');
      buildStatement(sel).then(function (o) { if (sh) DSFiles.shareFile(o.blob, o.name, 'application/pdf', 'DigitalSaudi statement', 'DigitalSaudi statement · ' + o.label); else DSFiles.save(o.blob, o.name, 'application/pdf', 'statement'); })
        .catch(function () { toast('Could not create the statement. Please try again.'); });
    }
    $('stD').onclick = function () { make(false); }; $('stH').onclick = function () { make(true); };
  };
  function buildStatement(off) {
    var m = monthRange(off), R = rows().filter(function (r) { return r.ts >= m[0] && r.ts < m[1]; }).sort(function (a, b) { return a.ts - b.ts; });
    var F = "'Plus Jakarta Sans','Segoe UI',Roboto,Arial,sans-serif", MF = "ui-monospace,Menlo,Consolas,monospace", W = 1240, H = 1754, X = 80;
    var mon = m[2].toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }), inn = 0, o = 0; R.forEach(function (r) { if (r.dir === 'in') inn += +r.amt; else o += +r.amt; });
    var pages = [R.slice(0, 11)]; for (var i = 11; i < R.length; i += 15) pages.push(R.slice(i, i + 15));
    function txt(x, t, px, py, font, col, al) { x.font = font; x.fillStyle = col; x.textAlign = al || 'left'; x.fillText(t, px, py); }
    function fit(x, t, mw) { t = String(t || ''); if (x.measureText(t).width <= mw) return t; while (t.length > 1 && x.measureText(t + '…').width > mw) t = t.slice(0, -1); return t + '…'; }
    return new Promise(function (ok) { var im = new Image(); im.onload = function () { ok(im); }; im.onerror = function () { ok(null); }; im.src = '/icon-192.png'; }).then(function (logo) {
      return Promise.all(pages.map(function (list, pg) {
        var cv = document.createElement('canvas'); cv.width = W; cv.height = H; var x = cv.getContext('2d'), y;
        x.fillStyle = '#FFFFFF'; x.fillRect(0, 0, W, H);
        if (pg === 0) {
          var g = x.createLinearGradient(0, 0, W, 300); g.addColorStop(0, '#064E3B'); g.addColorStop(.7, '#0B7A4B'); g.addColorStop(1, '#C9A227'); x.fillStyle = g; x.fillRect(0, 0, W, 300);
          if (logo) x.drawImage(logo, X, 62, 76, 76);
          txt(x, 'DigitalSaudi', X + 96, 116, '800 44px ' + F, '#FFFFFF');
          txt(x, 'MONTHLY STATEMENT', W - X, 92, '700 22px ' + F, 'rgba(255,255,255,.85)', 'right'); txt(x, mon, W - X, 140, '800 40px ' + F, '#FFFFFF', 'right');
          txt(x, fullName() + (me() && fullName() !== '@' + me() ? ' · @' + me() : ''), X, 214, '700 28px ' + F, '#FFFFFF');
          txt(x, NETN + ' · Wallet payments', X, 254, '500 22px ' + F, 'rgba(255,255,255,.85)');
          var bx = [['Sent', fmt(o, 4) + ' π'], ['Received', fmt(inn, 4) + ' π'], ['Net', (inn - o >= 0 ? '+' : '−') + fmt(Math.abs(inn - o), 4) + ' π'], ['Payments', String(R.length)]], bw = (W - 2 * X - 60) / 4;
          bx.forEach(function (b, k) { var bX = X + k * (bw + 20); x.fillStyle = '#F1F7F3'; x.fillRect(bX, 340, bw, 130); txt(x, b[0].toUpperCase(), bX + 22, 382, '700 18px ' + F, '#4B5B53'); x.font = '700 32px ' + MF; txt(x, fit(x, b[1], bw - 44), bX + 22, 436, '700 32px ' + MF, k === 1 ? '#0B7A4B' : '#13261E'); });
          y = 540;
        } else { x.fillStyle = '#064E3B'; x.fillRect(0, 0, W, 130); if (logo) x.drawImage(logo, X, 35, 60, 60); txt(x, 'DigitalSaudi', X + 76, 78, '800 32px ' + F, '#FFFFFF'); txt(x, 'Statement · ' + mon, W - X, 78, '600 24px ' + F, '#FFFFFF', 'right'); y = 190; }
        x.fillStyle = '#13261E'; x.fillRect(X, y, W - 2 * X, 2);
        txt(x, 'DATE', X, y + 38, '700 17px ' + F, '#4B5B53'); txt(x, 'DETAILS', X + 170, y + 38, '700 17px ' + F, '#4B5B53'); txt(x, 'AMOUNT', W - X - 200, y + 38, '700 17px ' + F, '#4B5B53', 'right'); txt(x, 'VALUE', W - X, y + 38, '700 17px ' + F, '#4B5B53', 'right');
        y += 58; x.fillStyle = '#E3E9E5'; x.fillRect(X, y, W - 2 * X, 1);
        if (!list.length) txt(x, 'No payments this month.', W / 2, y + 90, '500 26px ' + F, '#4B5B53', 'center');
        list.forEach(function (r) {
          var d = new Date(r.ts), ii = r.dir === 'in', raw = r.raw || {};
          txt(x, d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }), X, y + 40, '700 22px ' + F, '#13261E'); txt(x, d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), X, y + 70, '500 18px ' + F, '#4B5B53');
          x.font = '700 22px ' + F; txt(x, fit(x, r.title, 600), X + 170, y + 40, '700 22px ' + F, '#13261E');
          var sub = [String(r.sub || ''), raw.txid ? 'Tx ' + String(raw.txid).slice(0, 10) + '…' : ''].filter(Boolean).join(' · '); x.font = '500 18px ' + F; txt(x, fit(x, sub, 600), X + 170, y + 70, '500 18px ' + F, '#4B5B53');
          txt(x, (ii ? '+' : '−') + fmt(+r.amt, 7) + ' π', W - X - 200, y + 40, '700 22px ' + MF, ii ? '#0B7A4B' : '#13261E', 'right');
          txt(x, raw.usd ? '$' + fmt(+r.amt * raw.usd, 2) : '—', W - X, y + 40, '600 20px ' + F, '#13261E', 'right');
          y += 92; x.fillStyle = '#EEF3EF'; x.fillRect(X, y, W - 2 * X, 1);
        });
        x.fillStyle = '#E3E9E5'; x.fillRect(X, H - 120, W - 2 * X, 1);
        txt(x, 'Generated by DigitalSaudi on ' + new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) + '. Check any payment on the Pi blockchain with its transaction ID.', X, H - 80, '500 17px ' + F, '#4B5B53');
        txt(x, '© DigitalSaudi ' + new Date().getFullYear() + ' · digitalsaudi.pi', X, H - 52, '500 17px ' + F, '#7A8A81'); txt(x, 'Page ' + (pg + 1) + ' of ' + pages.length, W - X, H - 80, '700 17px ' + F, '#4B5B53', 'right');
        return new Promise(function (ok, no) { cv.toBlob(function (b) { if (!b) return no(new Error('jpg')); b.arrayBuffer().then(function (ab) { ok({ w: W, h: H, bytes: new Uint8Array(ab) }); }, no); }, 'image/jpeg', 0.9); });
      }));
    }).then(function (imgs) { return { blob: makePdf(imgs), name: 'DigitalSaudi-statement-' + fileDate(m[2]) + '.pdf', label: mon }; });
  }
  function makePdf(imgs) {
    var te = new TextEncoder(), chunks = [], len = 0, offs = [];
    function add(v) { if (typeof v === 'string') v = te.encode(v); chunks.push(v); len += v.length; }
    function obj(id, body) { offs[id] = len; add(id + ' 0 obj\n' + body + '\nendobj\n'); }
    add('%PDF-1.4\n'); add(new Uint8Array([37, 226, 227, 207, 211, 10]));
    var n = imgs.length, kids = []; for (var k = 0; k < n; k++) kids.push((3 + k * 3) + ' 0 R');
    obj(1, '<< /Type /Catalog /Pages 2 0 R >>'); obj(2, '<< /Type /Pages /Kids [' + kids.join(' ') + '] /Count ' + n + ' >>');
    imgs.forEach(function (im, k) {
      var p = 3 + k * 3, img = p + 1, ct = p + 2, st = 'q 595.28 0 0 841.89 0 0 cm /Im0 Do Q';
      obj(p, '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.28 841.89] /Resources << /XObject << /Im0 ' + img + ' 0 R >> >> /Contents ' + ct + ' 0 R >>');
      offs[img] = len; add(img + ' 0 obj\n<< /Type /XObject /Subtype /Image /Width ' + im.w + ' /Height ' + im.h + ' /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ' + im.bytes.length + ' >>\nstream\n'); add(im.bytes); add('\nendstream\nendobj\n');
      obj(ct, '<< /Length ' + st.length + ' >>\nstream\n' + st + '\nendstream');
    });
    var total = 3 + n * 3, xr = len, t = 'xref\n0 ' + total + '\n0000000000 65535 f \n';
    for (var id = 1; id < total; id++) t += String(offs[id]).padStart(10, '0') + ' 00000 n \n';
    add(t + 'trailer\n<< /Size ' + total + ' /Root 1 0 R >>\nstartxref\n' + xr + '\n%%EOF\n');
    return new Blob(chunks, { type: 'application/pdf' });
  }
  window.dsTxAll = function (on) {
    showAll = on; var e = $('dwAct'), t = $('dwTabs'), b = $('dwSeeAll');
    if (t) t.style.display = on ? '' : 'none'; if (b) b.textContent = on ? 'Show less' : 'See all';
    if (e) e.innerHTML = actHTML();
  };
  window.dsTxFilter = function (f) { filter = f; showAll = true; var e = $('dwAct'); if (e) e.innerHTML = actHTML(); document.querySelectorAll('.dw-tabs button').forEach(function (b) { b.classList.toggle('on', b.getAttribute('data-f') === f); }); };
  function rateHTML() {
    var p = pi(); if (!p || !p.usd) return '<small>1 π today</small><b>—</b><span>Loading live price…</span>';
    var l = localOf(1), ch = typeof p.change === 'number' ? p.change : null;
    return '<small><i class="dw-live' + (p.stale ? ' off' : '') + '"></i>' + (p.stale ? 'Last known price' : 'Live Pi price') + (ch !== null ? ' <em class="' + (ch >= 0 ? 'up' : 'dn') + '">' + (ch >= 0 ? '▲' : '▼') + ' ' + Math.abs(ch).toFixed(2) + '%</em>' : '') + '</small>' +
      '<b>$' + fmt(p.usd, 4) + '</b><span>' + fmt(p.sar || p.usd * 3.75, 4) + ' SAR' + (l ? ' · ' + l : '') + ' · ' + ago(p.t) + '</span>';
  }
  window.dsConv = function (from) {
    var a = $('dwPi'), s = $('dwSar'), l = $('dwLoc'); if (!a) return;
    var lr = locRate(), v = from === 'pi' ? parseFloat(a.value) : from === 'sar' ? convert(parseFloat(s.value), 'SAR', 'PI') : (lr ? parseFloat(l.value) / lr : NaN);
    if (!(v >= 0)) v = 0;
    if (from !== 'pi') a.value = v ? +v.toFixed(4) : '';
    if (from !== 'sar') { var x = convert(v, 'PI', 'SAR'); s.value = v && x != null ? x.toFixed(2) : ''; }
    if (l && from !== 'loc') { l.value = v && lr ? Math.round(v * lr) : ''; }
  };
  piWalletPanel = function () {
    var p = pi(), st = stats(), sales = store.get('sales', []), openN = sales.filter(function (s) { return !s.paid; }).length;
    var logo = (document.querySelector('header .mark') || {}).src || '/icon.svg', hc = home();
    var hr = new Date().getHours(), greet = hr < 12 ? 'Good morning' : hr < 17 ? 'Good afternoon' : 'Good evening', nR = rows().length;
    showAll = false; filter = 'all';
    showPanel('DigitalSaudi Wallet', `
    <div class="dw-hello"><h2>${greet}${me() ? ', @' + esc(me()) : ''}</h2><p>${me() ? 'Your Pi account at a glance.' : 'Sign in with Pi to send, receive and get paid in Pi.'}</p></div>
    <div class="pcard-wrap"><div class="pcard" id="pcard">
      <div class="pc-top"><img src="${logo}" alt="" class="pc-logo"><span class="pc-brand">DigitalSaudi <b>Wallet</b></span><span class="pc-net">${TESTNET ? 'Testnet' : 'Mainnet'}</span></div>
      <div class="pc-chip" aria-hidden="true"></div>
      <div class="pc-rate dw-rate notr" id="dwRate">${rateHTML()}</div>
      <div class="pc-bottom"><div><small>Account</small><b class="notr"><span style="overflow:hidden;text-overflow:ellipsis">${esc(fullName())}</span><button class="dw-ed" onclick="event.stopPropagation();dsEditName()" aria-label="Edit name">✎</button></b></div><div><small>Network</small><b class="notr">${TESTNET ? 'Pi Testnet' : 'Pi Mainnet'}</b></div></div>
    </div></div>
    <div class="dw-trust"><span>🔒 Non-custodial</span><span>⛓ Verified on the Pi blockchain</span><span>✔ You approve every payment</span></div>
    <div class="dw-qa">
      <button onclick="walletTab('send')"><i>↗</i>Send</button>
      <button onclick="dsGetPaid()"><i class="g">↙</i>Request</button>
      <button onclick="dsPay()"><i class="n">▦</i>Pay</button>
      <button onclick="dsBusiness()"><i class="b">▤</i>Business</button>
    </div>
    <div id="wBody"></div>
    <div class="dw-sh"><h3>Account overview</h3></div>
    <div class="card dw-sec"><div class="dw-h"><div><b>This month</b><div class="small" style="opacity:.7">${new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}</div></div><button class="dw-link" onclick="dsTxAll(true);document.getElementById('dwActH').scrollIntoView({behavior:'smooth',block:'start'})">Activity ›</button></div>
      <div class="dw-stats"><div><small>Sent</small><b class="notr">${fmt(st.out, 4)} π</b></div><div><small>Received</small><b class="notr pos">${fmt(st.inn, 4)} π</b></div><div><small>Payments</small><b class="notr">${st.n}</b></div></div></div>
    <div id="dwActH"><div class="dw-sh"><h3>Transactions</h3>${nR > 0 ? '<button id="dwSeeAll" onclick="dsTxAll(!' + 'document.getElementById(\'dwTabs\').offsetParent)">See all</button>' : ''}</div>
      <div class="dw-tabs" id="dwTabs" style="display:none">${[['all', 'All'], ['out', 'Sent'], ['in', 'Received']].map(function (x) { return `<button data-f="${x[0]}" class="${filter === x[0] ? 'on' : ''}" onclick="dsTxFilter('${x[0]}')">${x[1]}</button>`; }).join('')}</div>
      <div id="dwAct">${actHTML()}</div></div>
    <div class="dw-sh"><h3>Invoices & payment requests</h3>${openN ? '<button onclick="dsCheckSales(true)">Check now</button>' : ''}</div>
    <div class="card dw-sec">
      ${sales.length ? sales.slice(0, 6).map(function (s, i) { return `<button class="dw-sale" onclick="dsShowReq(${i})"><span class="dw-si ${s.paid ? 'ok' : ''}">${s.paid ? '✓' : '⏳'}</span><span class="dw-txt"><b>${esc(s.i)}</b><small class="notr">${s.r} · ${new Date(s.d).toLocaleDateString([], { day: 'numeric', month: 'short' })} · ${s.paid ? 'Paid' : 'Waiting for payment'}</small></span><span class="dw-txa ${s.paid ? 'in' : ''}">${s.a} π<small>${s.paid ? 'Receipt ›' : 'Share ›'}</small></span></button>`; }).join('') :
      '<div class="dw-how"><div><i>1</i>Create a request with the amount and item</div><div><i>2</i>The buyer pays from their Pi Wallet</div><div><i>3</i>Both get a receipt verified on the Pi blockchain</div></div>'}
      <div class="dw-two" style="margin-top:12px"><button class="btn btn-primary" onclick="dsInvoice()">＋ New invoice</button><button class="btn btn-ghost" onclick="dsGetPaid()">Quick request</button></div></div>
    <div class="dw-sh"><h3>Converter</h3><button onclick="openItem('priceAlerts')">${esc(hc)} ▾</button></div>
    <div class="card dw-sec"><div class="dw-conv3"><label><span>π</span><input id="dwPi" type="number" inputmode="decimal" value="1" oninput="dsConv('pi')"></label><label><span>SAR</span><input id="dwSar" type="number" inputmode="decimal" oninput="dsConv('sar')"></label>${hc !== 'SAR' ? `<label><span>${esc(hc)}</span><input id="dwLoc" type="number" inputmode="decimal" oninput="dsConv('loc')"></label>` : ''}</div></div>
    <button class="row" onclick="clearStuckPayment()"><div class="ic">⟳</div><div class="tx"><b>Resolve a pending payment</b><small>Completes or clears an unfinished payment so you can pay again</small></div><span class="chev">›</span></button>
    <div class="dw-secure"><b>🔒 Safe payments on the Pi blockchain</b><button onclick="dsFxSettings()">🔔 Sounds & vibration</button></div>`, { id: 'piWallet', share: false });
    dsConv('pi');
    var iv = setInterval(function () {
      if (document.hidden) return;
      loadPi(true).then(function () { var e = $('dwRate'); if (e) e.innerHTML = rateHTML(); var a = $('dwPi'); if (a && document.activeElement && !/^dw(Pi|Sar|Loc)$/.test(document.activeElement.id)) dsConv('pi'); });
    }, 60000);
    loadPi().then(function () { var e = $('dwRate'); if (e) e.innerHTML = rateHTML(); dsConv('pi'); });
    panelCleanup = function () { clearInterval(iv); };
    var c = $('pcard');
    if (c && !CALM) {
      c.addEventListener('pointermove', function (e) { var r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5; c.style.transform = 'rotateY(' + x * 10 + 'deg) rotateX(' + (-y * 8) + 'deg)'; c.style.setProperty('--gx', (x + .5) * 100 + '%'); c.style.setProperty('--gy', (y + .5) * 100 + '%'); });
      c.addEventListener('pointerleave', function () { c.style.transform = ''; });
    }
    dsCheckSales(false);
  };
  PANELS.piWallet = piWalletPanel;
  window.dsEditName = function () {
    showPanel('Name on receipts', back + '<div class="field" style="margin-top:10px"><label>Your full name</label><input id="nmV" maxlength="50" value="' + esc(store.get('fullname', '')) + '" placeholder="Your full name"></div><button class="btn btn-primary" style="width:100%" onclick="store.set(\'fullname\',document.getElementById(\'nmV\').value.trim().slice(0,50));toast(\'✅ Name saved\');openItem(\'piWallet\')">Save</button>', { id: 'editName', share: false });
  };
  // wallet tab "send" lives in #wBody: keep the original steps
  var _wt = walletTab;
  walletTab = function (t) { if (t === 'send' || !$('dwAct')) return _wt.apply(this, arguments); if (t === 'hist') { var h = $('dwActH'); if (h) h.scrollIntoView({ behavior: 'smooth' }); return; } if (t === 'req') return dsGetPaid(); };
  META.piWallet = Object.assign(META.piWallet || {}, { t: 'DigitalSaudi Wallet', ic: '👛', s: 'Live Pi rate · get paid · verified receipts', short: 'Wallet' });
  ['getPaid', 'payReq', 'payLink', 'editName'].forEach(function (k) { if (NOMARK.indexOf(k) < 0) NOMARK.push(k); });

  /* ── notifications that reach the phone ── */
  window.dsSysNotify = function (title, body, tag) {
    if (!('Notification' in window) || Notification.permission !== 'granted') return Promise.resolve(false);
    var o = { body: body, icon: '/icon-192.png', badge: '/favicon-32.png', tag: tag || 'ds', renotify: true, vibrate: [120, 60, 120] };
    var page = function () { try { new Notification(title, o); return true; } catch (e) { return false; } };
    if ('serviceWorker' in navigator) return navigator.serviceWorker.getRegistration().then(function (reg) { return reg && reg.showNotification ? reg.showNotification(title, o).then(function () { return true; }, page) : page(); }).catch(page);
    return Promise.resolve(page());
  };
  NOTIF_TYPES.push(['pay', '💰', 'Payments received', 'DigitalSaudi Pay sales, verified on the Pi blockchain']);
  var _prefs = notifPrefs;
  notifPrefs = function () { var p = _prefs.apply(this, arguments); if (p.pay === undefined) p.pay = true; return p; };
  notify = function (type, key, ic, title, body, open) {
    if (type === 'pi' && /^pi_\d{4}-/.test(String(key))) return;      // daily Pi moves are covered by Price alerts
    if (!notifPrefs()[type]) return;
    var keys = store.get('notifKeys', []); if (keys.indexOf(key) >= 0) return;
    keys.push(key); store.set('notifKeys', keys.slice(-300));
    var inbox = store.get('inbox', []); inbox.unshift({ id: Date.now() + Math.random(), ic: ic, t: title, b: body, at: Date.now(), read: false, open: open || '' }); store.set('inbox', inbox.slice(0, 60));
    updateBell(); toast(ic + ' ' + title);
    dsSysNotify(title, body, key);
  };
  window.dsTestNotify = function () {
    var b = 'This is how DigitalSaudi alerts look. ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    var inbox = store.get('inbox', []); inbox.unshift({ id: Date.now(), ic: '🔔', t: 'Test notification', b: b, at: Date.now(), read: false, open: '' }); store.set('inbox', inbox.slice(0, 60)); updateBell();
    dsSysNotify('🔔 Test notification', b, 'ds-test').then(function (ok) { toast(ok ? '✅ Sent. Check your notification bar.' : '✅ Added to your 🔔 inbox'); });
  };
  window.dsAllowNotify = function () {
    if (!('Notification' in window)) return toast('This browser cannot show phone notifications. In-app alerts still work.');
    Notification.requestPermission().then(function (p) { openItem('notifSettings'); if (p === 'granted') dsSysNotify('DigitalSaudi', 'Phone notifications are on.', 'ds-on'); });
  };
  var _ns = notifSettingsPanel;
  notifSettingsPanel = function () {
    var r = _ns.apply(this, arguments), b = $('pBody');
    if (b) {
      b.querySelectorAll('button[onclick*="Notification.requestPermission"]').forEach(function (x) { x.setAttribute('onclick', 'dsAllowNotify()'); });
      b.insertAdjacentHTML('beforeend', '<div class="p-actions" style="justify-content:center"><button class="btn btn-primary btn-sm" onclick="dsTestNotify()">🔔 Send a test notification</button></div>');
    }
    return r;
  };
  PANELS.notifSettings = notifSettingsPanel;

  /* ── Wallet on Home: replace the converter quick action (the wallet has a live converter) ── */
  try {
    Object.keys(PERSONA_QA).forEach(function (k) {
      var L = PERSONA_QA[k]; if (L.indexOf('piWallet') >= 0) return;
      var i = L.indexOf('converter'); if (i < 0) i = L.indexOf('qibla'); if (i < 0) i = L.length - 2;
      L[i] = 'piWallet';
    });
    renderLists();
  } catch (e) {}

  /* Profile → Payments & receipts: the same combined activity as the wallet */
  renderHistory = function () {
    var box = $('payHistory'); if (!box) return;
    var R = rows().slice(0, 4);
    box.innerHTML = (R.length ? R.map(function (r) { return '<button class="dw-tx" onclick="' + r.act + '"><span class="dw-txi ' + r.dir + '">' + r.ic + '</span><span class="dw-txt"><b>' + esc(r.title) + '</b><small>' + esc(r.sub) + '</small></span><span class="dw-txa ' + r.dir + '">' + (r.dir === 'in' ? '+' : '−') + r.amt + ' π<small>Receipt ›</small></span></button>'; }).join('') :
      '<p class="small" style="text-align:center;padding:8px 6px 2px">No payments yet. Payments and DigitalSaudi Pay sales appear here with a shareable receipt.</p>') +
      '<button class="btn btn-ghost btn-sm" style="margin:10px auto 2px;display:flex" onclick="openItem(\'piWallet\')">👛 Open wallet</button>';
  };
  try { renderHistory(); } catch (e) {}
  setTimeout(function () { dsCheckSales(false); }, 6000);
  setInterval(function () { if (!document.hidden) dsCheckSales(false); }, 60000);
})();

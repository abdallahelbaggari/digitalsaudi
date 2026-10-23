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
      thanks: 'Paid with DigitalSaudi Pay', note: 'Verified by DigitalSaudi on the Pi blockchain. DigitalSaudi never holds funds.' };
  }
  openReceipt = function (id) {
    var h = inAppList().find(function (x) { return x.id === id; }); if (!h) return;
    DSReceipt.sheet(specApp(h), 'DigitalSaudi-receipt-' + String(h.txid || h.id).slice(0, 8) + '.png',
      'DIGITALSAUDI · Payment receipt\n' + h.amount + ' π · ' + (h.memo || '') + '\n' + new Date(h.done || h.at).toLocaleString('en-GB') + '\nPayment ID: ' + h.id + (h.txid ? '\nTransaction ID: ' + h.txid : '') + '\ndigitalsaudi.pi');
  };
  window.dsP2PReceipt = function (h) {
    var r = p2pList().find(function (x) { return x.txid === h; }); if (!r) return toast('Receipt not found on this phone');
    DSReceipt.sheet(specP2P(r), 'DigitalSaudi-receipt-' + h.slice(0, 8) + '.png', 'DIGITALSAUDI · Verified payment\n' + r.amount + ' π for ' + (r.item || 'payment') + '\nReference ' + r.ref + '\nTransaction ' + h + '\ndigitalsaudi.pi');
  };

  /* ── DigitalSaudi Pay ── */
  function enc(o) { return btoa(unescape(encodeURIComponent(JSON.stringify(o)))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); }
  function newRef() { var A = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789', b = new Uint8Array(6), s = 'DS-'; try { crypto.getRandomValues(b); } catch (e) { for (var j = 0; j < 6; j++) b[j] = Math.random() * 256; } for (var i = 0; i < 6; i++) s += A[b[i] % A.length]; return s; }
  function link(s) { return location.origin + '/invoice.html#' + enc({ v: 1, t: s.t, a: s.a, i: s.i, n: s.n, u: s.u, r: s.r, k: TESTNET ? 'test' : 'main', d: s.d }); }
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
    var url = link(s), text = 'Payment request from ' + (s.n || 'me') + ': ' + s.a + ' π for ' + s.i + '. Pay securely with DigitalSaudi Pay:\n' + url;
    showPanel(s.paid ? 'Payment received' : 'Payment request ready', back +
      '<div class="dw-req"><div class="dw-req-a">' + s.a + ' π</div><div class="dw-req-c">' + esc(conv(s.a)) + '</div><div class="dw-req-i">' + esc(s.i) + ' · <span class="notr">' + s.r + '</span></div></div>' +
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
          store.set('rcpts', all.slice(0, 200));
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
    inAppList().forEach(function (h) { out.push({ ts: h.done || h.at, dir: 'out', title: h.memo || 'Pi payment', sub: 'In-app payment · ' + String(h.status || ''), amt: h.amount, act: "openReceipt('" + esc(h.id) + "')", ic: '⭐' }); });
    p2pList().forEach(function (r) { var inn = r.dir === 'in'; out.push({ ts: r.ts, dir: inn ? 'in' : 'out', title: inn ? 'From ' + short(r.other) : 'To ' + (r.seller || short(r.to)), sub: (r.item || '') + ' · Verified', amt: r.amount, act: "dsP2PReceipt('" + r.txid + "')", ic: inn ? '↓' : '↑' }); });
    return out.sort(function (a, b) { return b.ts - a.ts; });
  }
  function stats() {
    var m = new Date(); m.setDate(1); m.setHours(0, 0, 0, 0); var inn = 0, outv = 0;
    rows().forEach(function (r) { if (r.ts >= m.getTime() && !/cancel|fail/.test(r.sub)) { if (r.dir === 'in') inn += +r.amt; else outv += +r.amt; } });
    return { inn: +inn.toFixed(4), out: +outv.toFixed(4) };
  }
  function actHTML() {
    var R = rows().filter(function (r) { return filter === 'all' || r.dir === filter; });
    return R.length ? R.slice(0, 50).map(function (r) {
      return '<button class="dw-tx" onclick="' + r.act + '"><span class="dw-txi ' + r.dir + '">' + r.ic + '</span><span class="dw-txt"><b>' + esc(r.title) + '</b><small>' + esc(r.sub) + ' · ' + new Date(r.ts).toLocaleString([], { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) + '</small></span><span class="dw-txa ' + r.dir + '">' + (r.dir === 'in' ? '+' : '−') + r.amt + ' π<small>Receipt ›</small></span></button>';
    }).join('') : '<div class="empty" style="padding:18px 8px"><div class="big">🧾</div>' + (filter === 'in' ? 'No payments received yet.' : filter === 'out' ? 'No payments made yet.' : 'No activity yet.') + '<div class="small" style="margin-top:4px">Payments in DigitalSaudi and DigitalSaudi Pay sales appear here with a receipt you can share as an image.</div></div>';
  }
  window.dsTxFilter = function (f) { filter = f; var e = $('dwAct'); if (e) e.innerHTML = actHTML(); document.querySelectorAll('.dw-tabs button').forEach(function (b) { b.classList.toggle('on', b.getAttribute('data-f') === f); }); };
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
    showPanel('DigitalSaudi Wallet', `
    <div class="pcard-wrap"><div class="pcard" id="pcard">
      <div class="pc-top"><img src="${logo}" alt="" class="pc-logo"><span class="pc-brand">DigitalSaudi <b>Wallet</b></span><span class="pc-net">${TESTNET ? 'Testnet' : 'Mainnet'}</span></div>
      <div class="pc-chip" aria-hidden="true"></div>
      <div class="pc-rate dw-rate notr" id="dwRate">${rateHTML()}</div>
      <div class="pc-bottom"><div><small>Account</small><b class="notr"><span style="overflow:hidden;text-overflow:ellipsis">${esc(fullName())}</span><button class="dw-ed" onclick="event.stopPropagation();dsEditName()" aria-label="Edit name">✎</button></b></div><div><small>This month</small><b class="notr">+${st.inn} · −${st.out} π</b></div></div>
    </div></div>
    <div class="acts dw-acts">
      <button onclick="dsGetPaid()"><span>💰</span>Get paid</button>
      <button onclick="dsPay()"><span>💳</span>Pay</button>
      <button onclick="walletTab('send')"><span><svg class="i"><use href="#i-share"/></svg></span>Send</button>
      <button onclick="openItem('merchantQR')"><span><svg class="i"><use href="#i-image"/></svg></span>Poster</button>
      <button onclick="document.getElementById('dwActH').scrollIntoView({behavior:'smooth',block:'start'})"><span><svg class="i"><use href="#i-receipt"/></svg></span>Receipts</button>
    </div>
    <div id="wBody"></div>
    <div class="card dw-sec"><div class="dw-h"><b>🛍️ DigitalSaudi Pay · buy &amp; sell</b>${openN ? '<button class="dw-link" onclick="dsCheckSales(true)">Check now</button>' : ''}</div>
      ${sales.length ? sales.slice(0, 6).map(function (s, i) { return `<button class="dw-sale" onclick="dsShowReq(${i})"><span class="dw-si ${s.paid ? 'ok' : ''}">${s.paid ? '✓' : '⏳'}</span><span class="dw-txt"><b>${esc(s.i)}</b><small class="notr">${s.r} · ${new Date(s.d).toLocaleDateString([], { day: 'numeric', month: 'short' })} · ${s.paid ? 'Paid' : 'Waiting for payment'}</small></span><span class="dw-txa ${s.paid ? 'in' : ''}">${s.a} π<small>${s.paid ? 'Receipt ›' : 'Share ›'}</small></span></button>`; }).join('') :
      '<div class="dw-how"><div><i>1</i>Create a request with the amount and item</div><div><i>2</i>The buyer pays from their Pi Wallet</div><div><i>3</i>Both get a receipt verified on the Pi blockchain</div></div>'}
      <button class="btn btn-primary" style="width:100%;margin-top:12px" onclick="dsGetPaid()">＋ Create payment request</button></div>
    <div class="card dw-sec"><div class="dw-h"><b>💱 Converter · live rate</b><button class="dw-link" onclick="openItem('priceAlerts')">${esc(hc)} ›</button></div>
      <div class="dw-conv3"><label><span>π</span><input id="dwPi" type="number" inputmode="decimal" value="1" oninput="dsConv('pi')"></label><label><span>SAR</span><input id="dwSar" type="number" inputmode="decimal" oninput="dsConv('sar')"></label>${hc !== 'SAR' ? `<label><span>${esc(hc)}</span><input id="dwLoc" type="number" inputmode="decimal" oninput="dsConv('loc')"></label>` : ''}</div></div>
    <div class="card dw-sec" id="dwActH"><div class="dw-h"><b>🧾 Activity &amp; receipts</b></div>
      <div class="dw-tabs">${[['all', 'All'], ['in', 'Received'], ['out', 'Paid']].map(function (x) { return `<button data-f="${x[0]}" class="${filter === x[0] ? 'on' : ''}" onclick="dsTxFilter('${x[0]}')">${x[1]}</button>`; }).join('')}</div>
      <div id="dwAct">${actHTML()}</div></div>
    <button class="row" onclick="clearStuckPayment()"><div class="ic">🧹</div><div class="tx"><b>Fix “Pending payment found”</b><small>Clears an unfinished payment so you can pay again</small></div><span class="chev">›</span></button>
    <div class="note">🔒 <b>Your Pi stays in your Pi Wallet.</b> DigitalSaudi never sees your balance, holds your Pi or asks for your passphrase. Transfers always happen in your own Pi Wallet, and only you approve them.</div>`, { id: 'piWallet', share: false });
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

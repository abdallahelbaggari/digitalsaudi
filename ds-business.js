/* DigitalSaudi Business — invoices with line items, sales summary and reports for merchants, plus payment
   sounds and vibration. Everything runs on the user's phone; payments still go Pi Wallet → Pi Wallet and are
   verified on the Pi blockchain by the existing DigitalSaudi Pay checks. DigitalSaudi never holds Pi. */
(function () {
  'use strict';
  var TESTNET = /(^|[.-])testnet[.-]/i.test(location.hostname), NETN = TESTNET ? 'Pi Testnet' : 'Pi Mainnet';
  var back = '<button class="btn btn-ghost btn-sm dw-back" onclick="openItem(\'piWallet\')">‹ Wallet</button>';
  var bBack = '<button class="btn btn-ghost btn-sm dw-back" onclick="dsBusiness()">‹ Business</button>';
  var me = function () { return (window.piUser && piUser.username) || ''; };
  var P = function (v) { return +(+v || 0).toFixed(7); };
  var priceNow = function () { return store.get('pi', null) || {}; };
  var day0 = function (t) { var d = new Date(t); d.setHours(0, 0, 0, 0); return d.getTime(); };
  var dstr = function (t, o) { return new Date(t).toLocaleDateString('en-GB', o || { day: 'numeric', month: 'short', year: 'numeric' }); };
  var isoDay = function (t) { var d = new Date(t); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };

  /* ───────── sounds and vibration ───────── */
  var AC = null;
  function ac() {
    if (!AC) { var C = window.AudioContext || window.webkitAudioContext; if (!C) return null; try { AC = new C(); } catch (e) { return null; } }
    if (AC.state === 'suspended') { try { AC.resume(); } catch (e) {} }
    return AC;
  }
  // phones only allow sound after the first tap: get the audio ready then
  document.addEventListener('pointerdown', function unlock() { try { ac(); } catch (e) {} document.removeEventListener('pointerdown', unlock, true); }, true);
  var SOUNDS = {
    in: [[880, 0, .2], [1175, .11, .22], [1568, .22, .42]],      // money received: bright rising chime
    out: [[1047, 0, .14], [784, .09, .26]],                       // money sent: short confirm
    ok: [[659, 0, .14], [880, .1, .16], [1319, .2, .36]],         // payment complete
    err: [[392, 0, .2, 'triangle'], [294, .16, .3, 'triangle']]   // refund / problem
  };
  var VIB = { in: [70, 50, 140], out: [60], ok: [40, 40, 60], err: [160, 90, 160] };
  function fxPrefs() { var o = store.get('fx', null); return o && typeof o === 'object' ? o : { s: true, v: true }; }
  function tone(seq) {
    var c = ac(); if (!c) return; var t = c.currentTime + .03;
    seq.forEach(function (n) {
      var o = c.createOscillator(), g = c.createGain(); o.type = n[3] || 'sine'; o.frequency.setValueAtTime(n[0], t + n[1]);
      g.gain.setValueAtTime(.0001, t + n[1]); g.gain.exponentialRampToValueAtTime(.25, t + n[1] + .015); g.gain.exponentialRampToValueAtTime(.0001, t + n[1] + n[2]);
      o.connect(g); g.connect(c.destination); o.start(t + n[1]); o.stop(t + n[1] + n[2] + .05);
    });
  }
  window.dsFx = function (k, force) {
    var o = fxPrefs();
    try { if (o.s || force === 's') tone(SOUNDS[k] || SOUNDS.ok); } catch (e) {}
    try { if ((o.v || force === 'v') && navigator.vibrate) navigator.vibrate(VIB[k] || 60); } catch (e) {}
  };
  window.dsFxSet = function (k, on) { var o = fxPrefs(); o[k] = !!on; store.set('fx', o); if (on) dsFx('in', k); };
  window.dsFxSettings = function () {
    var o = fxPrefs(), sw = function (k, t, s) { return '<label class="bz-sw"><span><b>' + t + '</b><small>' + s + '</small></span><input type="checkbox" ' + (o[k] ? 'checked' : '') + ' onchange="dsFxSet(\'' + k + '\',this.checked)"></label>'; };
    showPanel('Sounds & vibration', back +
      '<div class="card dw-sec">' + sw('s', 'Payment sounds', 'A short chime when Pi arrives, is sent or a payment completes') + sw('v', 'Vibration', 'The phone vibrates with each payment alert') + '</div>' +
      '<div class="dw-sh"><h3>Try them</h3></div><div class="bz-try">' +
      [['in', '💰', 'Pi received'], ['out', '↗', 'Pi sent'], ['ok', '✓', 'Payment complete'], ['err', '↩', 'Refund / problem']].map(function (x) { return '<button onclick="dsFx(\'' + x[0] + '\')"><i>' + x[1] + '</i>' + x[2] + '</button>'; }).join('') + '</div>' +
      '<p class="small" style="margin-top:12px">Sound plays when your phone is not on silent. Vibration needs a phone that supports it.</p>', { id: 'fxSettings', share: false });
  };
  // play the right sound when a payment alert arrives (once per payment)
  try {
    var _notify = notify;
    notify = function (type, key, ic) {
      var seen = (store.get('notifKeys', []) || []).indexOf(key) >= 0, r = _notify.apply(this, arguments);
      if (type === 'pay' && !seen) dsFx(ic === '💰' ? 'in' : ic === '↩️' ? 'err' : 'out');
      return r;
    };
  } catch (e) {}
  try {
    var _cel = celebrate;
    celebrate = function (title) { if (/payment complete|premium unlocked|support|thank/i.test(String(title))) dsFx('ok'); return _cel.apply(this, arguments); };
  } catch (e) {}

  /* ───────── invoices ───────── */
  function sales() { return store.get('sales', []) || []; }
  function invState(s) {
    if (s.paid) return ['Paid', 'ok'];
    if (s.due && isoDay(Date.now()) > s.due) return ['Overdue', 'bad'];
    return ['Unpaid', 'wait'];
  }
  function nextNo() {
    var d = new Date(), k = 'INV-' + String(d.getFullYear()).slice(2) + String(d.getMonth() + 1).padStart(2, '0') + '-', n = 1;
    sales().forEach(function (s) { if (s.no && s.no.indexOf(k) === 0) n = Math.max(n, (parseInt(s.no.slice(k.length), 10) || 0) + 1); });
    return k + String(n).padStart(3, '0');
  }
  function itemRow(i, v) {
    v = v || ['', 1, ''];
    return '<div class="bz-it" data-i="' + i + '"><input class="bz-d" maxlength="40" placeholder="Item or service" value="' + esc(v[0]) + '" oninput="dsInvTotal()">' +
      '<input class="bz-q" type="number" inputmode="numeric" min="1" step="1" value="' + esc(v[1]) + '" oninput="dsInvTotal()" aria-label="Quantity">' +
      '<input class="bz-p" type="number" inputmode="decimal" min="0" step="any" placeholder="π" value="' + esc(v[2]) + '" oninput="dsInvTotal()" aria-label="Price in Pi">' +
      '<button type="button" class="bz-x" onclick="this.parentNode.remove();dsInvTotal()" aria-label="Remove">✕</button></div>';
  }
  function readItems() {
    var L = [];
    document.querySelectorAll('#bzItems .bz-it').forEach(function (r) {
      var d = r.querySelector('.bz-d').value.trim(), q = Math.max(1, Math.round(+r.querySelector('.bz-q').value || 1)), p = P(r.querySelector('.bz-p').value);
      if (d || p) L.push([d, q, p]);
    });
    return L;
  }
  window.dsInvTotal = function () {
    var t = P(readItems().reduce(function (a, x) { return a + x[1] * x[2]; }, 0)), e = $('bzTot');
    if (e) e.innerHTML = '<span>Total</span><b class="notr">' + fmt(t, 7) + ' π</b><small class="notr">' + esc(window.dsConvLine ? dsConvLine(t) : '') + '</small>';
    return t;
  };
  window.dsInvAdd = function () {
    var box = $('bzItems'); if (!box) return; if (box.children.length >= 10) return toast('Up to 10 items per invoice');
    box.insertAdjacentHTML('beforeend', itemRow(box.children.length)); var d = box.lastElementChild.querySelector('.bz-d'); if (d) d.focus();
  };
  window.dsInvoice = function () {
    var due = new Date(); due.setDate(due.getDate() + 7);
    showPanel('New invoice', back +
      '<div class="bz-inv">' +
      '<div class="dw-two"><div class="field"><label>Invoice number</label><input id="ivNo" maxlength="20" value="' + nextNo() + '" class="notr"></div>' +
      '<div class="field"><label>Due date</label><input id="ivDue" type="date" value="' + isoDay(due) + '"></div></div>' +
      '<div class="field"><label>Bill to (customer)</label><input id="ivC" maxlength="50" placeholder="Customer or company name (optional)"></div>' +
      '<div class="bz-lh"><span>Item</span><span>Qty</span><span>Price π</span><span></span></div>' +
      '<div id="bzItems">' + itemRow(0) + '</div>' +
      '<button type="button" class="btn btn-ghost btn-sm" onclick="dsInvAdd()">＋ Add item</button>' +
      '<div class="bz-tot" id="bzTot"></div>' +
      '<div class="field"><label>Note to customer</label><input id="ivX" maxlength="80" placeholder="e.g. Thank you for your business (optional)"></div>' +
      '<div class="dw-sh"><h3>Your business</h3></div>' +
      '<div class="field"><label>Business or shop name</label><input id="ivN" maxlength="50" value="' + esc(store.get('bizName', '') || store.get('fullname', '')) + '" placeholder="Shown on the invoice"></div>' +
      '<div class="field"><label>Your Pi wallet address (to receive payment)</label><input id="ivT" maxlength="56" autocapitalize="characters" autocomplete="off" class="notr" style="font-family:ui-monospace,Menlo,monospace;font-size:13px" value="' + esc(store.get('myaddr', '')) + '" placeholder="G… (56 characters)"><div class="small" style="margin-top:4px">Pi Wallet → Receive → copy. Saved on this phone.</div></div>' +
      '<button class="btn btn-primary" style="width:100%" onclick="dsInvCreate()">Create invoice</button></div>', { id: 'newInvoice', share: false });
    dsInvTotal();
  };
  window.dsInvCreate = function () {
    var L = readItems(), tot = dsInvTotal(), no = $('ivNo').value.trim().toUpperCase(), c = $('ivC').value.trim(), due = $('ivDue').value, x = $('ivX').value.trim(),
      n = $('ivN').value.trim(), to = $('ivT').value.trim().toUpperCase().replace(/\s+/g, '');
    if (!L.length) return toast('Add at least one item');
    if (L.some(function (it) { return !it[0]; })) return toast('Give every item a name');
    if (L.some(function (it) { return !(it[2] > 0); })) return toast('Give every item a price in π');
    if (!(tot > 0)) return toast('The total must be more than 0 π');
    if (!no) return toast('Add an invoice number');
    if (sales().some(function (s) { return s.no === no; })) return toast('Invoice ' + no + ' already exists');
    if (!n) return toast('Add your business name');
    if (!/^G[A-Z2-7]{55}$/.test(to)) return toast('That wallet address is not valid. It starts with G and has 56 characters.');
    store.set('myaddr', to); store.set('bizName', n);
    var s = { t: to, a: tot, i: L.length === 1 ? L[0][0] : 'Invoice ' + no + ' · ' + L.length + ' items', n: n, u: me(), r: dsNewRef(), d: Date.now(), no: no, l: L };
    if (c) s.c = c; if (due) s.due = due; if (x) s.x = x;
    var all = sales(); all.unshift(s); store.set('sales', all.slice(0, 300));
    try { dsFx('ok'); } catch (e) {}
    dsShowReq(0);
  };
  window.dsInvoiceInfo = function (s, i) {
    var st = invState(s);
    return '<div class="card dw-sec bz-ii"><div class="bz-ih"><b class="notr">' + esc(s.no) + '</b><span class="dw-pill ' + st[1] + '">' + st[0] + '</span></div>' +
      (s.c ? '<div class="bz-kv"><span>Bill to</span><b>' + esc(s.c) + '</b></div>' : '') +
      (s.l || []).map(function (x) { return '<div class="bz-kv"><span>' + esc(x[1] + ' × ' + x[0]) + '</span><b class="notr">' + fmt(P(x[1] * x[2]), 7) + ' π</b></div>'; }).join('') +
      '<div class="bz-kv tot"><span>Total</span><b class="notr">' + fmt(s.a, 7) + ' π</b></div>' +
      (s.due ? '<div class="bz-kv"><span>Due</span><b>' + dstr(s.due + 'T12:00:00') + '</b></div>' : '') +
      (s.x ? '<div class="bz-kv"><span>Note</span><b>' + esc(s.x) + '</b></div>' : '') +
      '<button class="btn btn-ghost btn-sm" style="width:100%;margin-top:10px" onclick="dsInvoiceImg(' + i + ')">🧾 Invoice image to share or save</button></div>';
  };
  window.dsInvoiceImg = function (i) {
    var s = sales()[i]; if (!s) return; var st = invState(s);
    var rows = [['Invoice', s.no], ['Bill to', s.c || ''], ['From', s.n + (s.u ? ' (@' + s.u + ')' : '')]]
      .concat((s.l || []).map(function (x) { return [x[1] + ' × ' + x[0], fmt(P(x[1] * x[2]), 7) + ' π']; }))
      .concat([['Total', fmt(s.a, 7) + ' π'], ['Issued', dstr(s.d)], ['Due', s.due ? dstr(s.due + 'T12:00:00') : ''], ['Note', s.x || ''], ['Reference', s.r, 1], ['Network', NETN], ['Pay to address', s.t, 1]]);
    DSReceipt.sheet({ title: 'Invoice ' + s.no, status: { text: s.paid ? '✓  Paid' : st[0] === 'Overdue' ? 'Overdue' : 'Unpaid' + (s.due ? ' · due ' + dstr(s.due + 'T12:00:00', { day: 'numeric', month: 'short' }) : ''), ok: !!s.paid },
      amount: fmt(s.a, 7), sub: window.dsConvLine ? dsConvLine(+s.a) : '', rows: rows,
      thanks: s.paid ? 'Paid with DigitalSaudi Pay' : 'Pay securely with DigitalSaudi Pay',
      note: s.paid ? 'Verified on the Pi blockchain. DigitalSaudi never holds funds.' : 'Open the payment link to pay from Pi Wallet with reference ' + s.r + '. DigitalSaudi never holds funds.' },
      'DigitalSaudi-invoice-' + s.no + '.png', 'Invoice ' + s.no + ' from ' + s.n + ': ' + s.a + ' π' + (s.paid ? ' · Paid' : '\nPay here: ' + dsPayLink(s)), 'Invoice ' + s.no);
  };

  /* ───────── sales summary ───────── */
  function income() {
    var R = []; try { R = dsWalletRows(); } catch (e) {}
    return R.filter(function (r) { return r.dir === 'in' && !/cancel|fail/i.test(r.sub || ''); });
  }
  function valSar(r) { var x = r.raw || {}, p = priceNow(); var sar = x.sar || (x.usd ? x.usd * 3.75 : 0) || p.sar || (p.usd ? p.usd * 3.75 : 0); return sar ? +r.amt * sar : null; }
  function sum(L) { var pi = 0, sar = 0, ok = true; L.forEach(function (r) { pi += +r.amt; var v = valSar(r); if (v == null) ok = false; else sar += v; }); return { pi: P(pi), sar: ok ? sar : null, n: L.length }; }
  window.dsBusiness = function () {
    var I = income(), now = Date.now(), t0 = day0(now), w0 = t0 - 6 * 864e5, m = new Date(); m.setDate(1); m.setHours(0, 0, 0, 0);
    var today = sum(I.filter(function (r) { return r.ts >= t0; })), week = sum(I.filter(function (r) { return r.ts >= w0; })), month = sum(I.filter(function (r) { return r.ts >= m.getTime(); }));
    var S = sales(), inv = S.filter(function (s) { return s.no; }), open = S.filter(function (s) { return !s.paid; }), over = open.filter(function (s) { return invState(s)[0] === 'Overdue'; });
    var owed = P(open.reduce(function (a, s) { return a + +s.a; }, 0));
    var days = []; for (var k = 6; k >= 0; k--) { var a = t0 - k * 864e5, b = a + 864e5; days.push([a, P(I.filter(function (r) { return r.ts >= a && r.ts < b; }).reduce(function (x, r) { return x + +r.amt; }, 0))]); }
    var mx = Math.max.apply(null, days.map(function (d) { return d[1]; })) || 1;
    var top = {}; I.filter(function (r) { return r.ts >= m.getTime(); }).forEach(function (r) { var k = (r.raw && (r.raw.item || r.raw.memo || r.raw.narr)) || 'Other'; top[k] = (top[k] || 0) + +r.amt; });
    var topL = Object.keys(top).sort(function (a, b) { return top[b] - top[a]; }).slice(0, 5);
    var tile = function (t, o, hi) { return '<div class="bz-k' + (hi ? ' hi' : '') + '"><small>' + t + '</small><b class="notr">' + fmt(o.pi, 4) + ' π</b><span class="notr">' + (o.sar != null && o.pi ? '≈ ' + fmt(o.sar, 2) + ' SAR · ' : '') + o.n + ' sale' + (o.n === 1 ? '' : 's') + '</span></div>'; };
    showPanel('Business', back +
      '<div class="bz-hero"><small>Sales this month · ' + dstr(now, { month: 'long', year: 'numeric' }) + '</small><b class="notr">' + fmt(month.pi, 4) + ' π</b>' +
      '<span class="notr">' + (month.sar != null && month.pi ? '≈ ' + fmt(month.sar, 2) + ' SAR · ' : '') + month.n + ' payment' + (month.n === 1 ? '' : 's') + ' received' + (month.n ? ' · average ' + fmt(month.pi / month.n, 4) + ' π' : '') + '</span>' +
      '<div class="bz-bars">' + days.map(function (d) { return '<div><i style="height:' + Math.max(4, Math.round(d[1] / mx * 100)) + '%"' + (d[1] ? '' : ' class="z"') + '></i><small>' + dstr(d[0], { weekday: 'short' }).slice(0, 2) + '</small></div>'; }).join('') + '</div></div>' +
      '<div class="bz-kpi">' + tile('Today', today) + tile('Last 7 days', week) + '<div class="bz-k' + (over.length ? ' warn' : '') + '"><small>Outstanding</small><b class="notr">' + fmt(owed, 4) + ' π</b><span>' + open.length + ' unpaid' + (over.length ? ' · ' + over.length + ' overdue' : '') + '</span></div></div>' +
      '<div class="dw-qa bz-qa"><button onclick="dsInvoice()"><i>＋</i>Invoice</button><button onclick="dsGetPaid()"><i class="g">↙</i>Request</button><button onclick="dsSalesCsv()"><i class="n">⬇</i>Report</button><button onclick="openItem(\'merchantQR\')"><i class="a">▦</i>Poster</button></div>' +
      '<div class="dw-sh"><h3>Invoices</h3>' + (open.length ? '<button onclick="dsCheckSales(true)">Check payments</button>' : '') + '</div>' +
      '<div class="card dw-sec">' + (inv.length ? inv.slice(0, 20).map(function (s) { var i = S.indexOf(s), st = invState(s); return '<button class="dw-sale" onclick="dsShowReq(' + i + ')"><span class="dw-si ' + (s.paid ? 'ok' : '') + '">' + (s.paid ? '✓' : '🧾') + '</span><span class="dw-txt"><b class="notr">' + esc(s.no) + (s.c ? ' · ' + esc(s.c) : '') + '</b><small>' + dstr(s.d, { day: 'numeric', month: 'short' }) + (s.due ? ' · due ' + dstr(s.due + 'T12:00:00', { day: 'numeric', month: 'short' }) : '') + '</small></span><span class="dw-txa ' + (s.paid ? 'in' : '') + '"><span class="notr">' + fmt(s.a, 4) + ' π</span><small class="dw-pill ' + st[1] + '">' + st[0] + '</small></span></button>'; }).join('')
        : '<div class="dw-how"><div><i>1</i>Create an invoice with items, quantities and a due date</div><div><i>2</i>Share the payment link or the invoice image with your customer</div><div><i>3</i>The customer pays from Pi Wallet; DigitalSaudi marks it paid and makes the receipt</div></div>') +
      '<button class="btn btn-primary" style="width:100%;margin-top:12px" onclick="dsInvoice()">＋ New invoice</button></div>' +
      (topL.length ? '<div class="dw-sh"><h3>Top sellers this month</h3></div><div class="card dw-sec">' + topL.map(function (k) { return '<div class="bz-kv"><span>' + esc(k) + '</span><b class="notr">' + fmt(P(top[k]), 4) + ' π</b></div>'; }).join('') + '</div>' : '') +
      '<div class="dw-sh"><h3>Reports</h3></div>' +
      '<button class="row" onclick="dsSalesCsv()"><div class="ic">⬇</div><div class="tx"><b>Sales report (CSV)</b><small>Every payment received, with customer, item, value and transaction ID</small></div><span class="chev">›</span></button>' +
      '<button class="row" onclick="dsInvCsv()"><div class="ic">🧾</div><div class="tx"><b>Invoices list (CSV)</b><small>Number, customer, amount, due date and paid / unpaid</small></div><span class="chev">›</span></button>' +
      '<button class="row" onclick="dsStatement()"><div class="ic">📄</div><div class="tx"><b>Monthly statement (PDF)</b><small>All money in and out for a month</small></div><span class="chev">›</span></button>' +
      '<button class="row" onclick="openItem(\'addBusiness\')"><div class="ic">🏪</div><div class="tx"><b>List your business</b><small>Free listing in the DigitalSaudi business directory</small></div><span class="chev">›</span></button>' +
      '<p class="small" style="text-align:center;margin:12px 0 4px">Sales figures come from payments verified on the Pi blockchain and saved in your wallet history.</p>', { id: 'business', share: false });
  };
  function csv(lines, name) {
    var q = function (v) { v = String(v == null ? '' : v); return /[",\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v; };
    DSFiles.save(new Blob(['﻿' + lines.map(function (l) { return l.map(q).join(','); }).join('\n')], { type: 'text/csv' }), name, 'text/csv', 'report');
  }
  window.dsSalesCsv = function () {
    var I = income(); if (!I.length) return toast('No sales yet. Received payments appear here.');
    var L = [['Date', 'Time', 'Customer / from', 'Item', 'Reference', 'Amount (Pi)', 'Value at payment time (SAR)', 'Value at payment time (USD)', 'Network', 'Transaction ID']];
    I.slice().sort(function (a, b) { return a.ts - b.ts; }).forEach(function (r) {
      var x = r.raw || {}, d = new Date(r.ts);
      L.push([isoDay(r.ts), d.toTimeString().slice(0, 5), x.user ? '@' + x.user : (x.from && x.from.length > 20 ? x.from : r.title.replace(/^From /, '')), x.item || x.memo || x.narr || '', x.ref || '', r.amt, x.sar ? (+r.amt * x.sar).toFixed(2) : '', x.usd ? (+r.amt * x.usd).toFixed(2) : '', x.net || NETN, x.txid || '']);
    });
    csv(L, 'DigitalSaudi-sales-' + isoDay(Date.now()) + '.csv');
  };
  window.dsInvCsv = function () {
    var S = sales().filter(function (s) { return s.no; }); if (!S.length) return toast('No invoices yet');
    var L = [['Invoice', 'Issued', 'Due', 'Customer', 'Items', 'Total (Pi)', 'Status', 'Reference', 'Transaction ID']];
    S.forEach(function (s) { L.push([s.no, isoDay(s.d), s.due || '', s.c || '', (s.l || []).map(function (x) { return x[1] + ' x ' + x[0] + ' @ ' + x[2]; }).join('; '), s.a, invState(s)[0], s.r, s.paid || '']); });
    csv(L, 'DigitalSaudi-invoices-' + isoDay(Date.now()) + '.csv');
  };

  try {
    META.business = { t: 'Business', ic: '📊', s: 'Invoices, sales summary and reports', short: 'Business' };
    PANELS.business = function () { dsBusiness(); };
    ['business', 'newInvoice', 'fxSettings'].forEach(function (k) { if (NOMARK.indexOf(k) < 0) NOMARK.push(k); });
  } catch (e) {}
})();

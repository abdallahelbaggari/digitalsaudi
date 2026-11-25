/* DigitalSaudi in-app sending: send Pi to a DigitalSaudi user (@username) or to any Pi wallet address, without leaving the app.
   The sender approves in Pi's own payment pop-up inside DigitalSaudi; DigitalSaudi's app wallet then pays the recipient
   automatically (official Pi App-to-User flow for @usernames, a signed Pi blockchain payment for addresses).
   If delivery is not possible, the sender is refunded automatically on the Pi blockchain. Same rules for everyone. */
(function () {
  'use strict';
  var TESTNET = /(^|[.-])testnet[.-]/i.test(location.hostname), NETN = TESTNET ? 'Pi Testnet' : 'Pi Mainnet';
  var CFG = { enabled: false, usernames: false, fee: 0.01, max: 0, daily: 0 };
  var r7 = function (n) { return Math.round(Number(n) * 1e7) / 1e7; };
  var num = function (n) { return fmt(n, 7); };
  var me = function () { return piUser ? piUser.username : ''; };
  var tok = function () { return piUser && piUser.accessToken; };
  var fullName = function () { return store.get('fullname', '') || (me() ? '@' + me() : 'Guest'); };
  var short = function (a) { a = String(a || ''); return a.length > 16 ? a.slice(0, 6) + '…' + a.slice(-6) : a; };
  var conv = function (a) { return window.dsConvLine ? dsConvLine(a) : ''; };
  var api = function (path, body) { return fetch(path, body ? { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) } : { cache: 'no-store' }).then(function (r) { return r.json(); }); };
  var ADDR = /^G[A-Z2-7]{55}$/, USER = /^[A-Za-z0-9_.-]{2,40}$/;
  ['dsSend', 'dsSendReview', 'dsSending'].forEach(function (k) { if (NOMARK.indexOf(k) < 0) NOMARK.push(k); });
  var back = '<button class="btn btn-ghost btn-sm dw-back" onclick="openItem(\'piWallet\')">‹ Wallet</button>';
  var css = document.createElement('style');
  css.textContent = '.tx-tg{display:flex;gap:6px;background:var(--line,#e6ebe8);padding:4px;border-radius:14px;margin:10px 0 12px}.tx-tg button{flex:1;border:0;background:transparent;border-radius:11px;padding:10px;font:inherit;font-weight:600;color:inherit;opacity:.65}.tx-tg button.on{background:var(--card,#fff);opacity:1;box-shadow:0 1px 4px rgba(0,0,0,.08)}' +
    '.tx-h{font-size:13px;margin:-4px 0 10px;min-height:18px}.tx-ok{color:#0a7a4b}.tx-bad{color:#b42318}.tx-sum{border-radius:14px;padding:4px 14px;margin:10px 0;background:var(--line,#eef2ef)}.tx-sum div{display:flex;justify-content:space-between;padding:8px 0;font-size:14px}.tx-sum .tot{border-top:1px solid rgba(0,0,0,.08);font-weight:700}' +
    '.tx-warn{font-size:13px;line-height:1.5;margin:10px 0}.tx-warn div{margin:6px 0}.tx-steps div{padding:8px 0;opacity:.5;font-size:14px}.tx-steps div.on{opacity:1;font-weight:700}.tx-steps div.done{opacity:.8}.tx-steps div.done:before{content:"✓ "}' +
    '.tx-st{padding:12px 14px;border-radius:14px;margin-top:10px;font-size:14px;line-height:1.5}.tx-st.wait{background:#fff7e6;color:#7a4b00}.tx-st.err{background:#fdecec;color:#b42318}.tx-st.ok{background:#e6f7ee;color:#0a7a4b}' +
    '.tx-big{text-align:center;margin:8px 0 4px}.tx-big b{display:block;font-size:30px}.tx-big span{font-size:13px;opacity:.75}';
  document.head.appendChild(css);

  /* ── register this user so others can send to their @username ── */
  var registered = false;
  function register() {
    if (registered || !tok() || !CFG.usernames) return;
    registered = true;
    api('/users', { accessToken: tok() }).then(function (d) { if (!d.ok) registered = false; else sync(); }).catch(function () { registered = false; });
  }

  /* ── receipts (same store as DigitalSaudi Pay receipts, so they show in the wallet activity) ── */
  function saveReceipt(t, dir) {
    var R = store.get('rcpts', []); if (!t.txid || R.some(function (x) { return x.txid === t.txid; })) return false;
    var p = store.get('pi', null), inn = dir === 'in', who = t.to_kind === 'address' || !t.to ? short(t.to_addr) : '@' + t.to;
    R.unshift({ amount: +t.amount, memo: t.narr || 'Pi transfer', item: t.narr || 'Pi transfer', kind: 'p2p', inapp: true, dir: dir, ts: t.done_ts || Date.now(),
      name: inn ? fullName() : fullName(), user: inn ? me() : '', seller: inn ? fullName() : who, other: inn ? '@' + t.from : who, from: inn ? '@' + t.from : fullName(),
      to: t.to_addr || '', ref: t.pid, net: NETN, txid: t.txid, status: 'Verified', usd: p && p.usd, sar: p && (p.sar || (p.usd && p.usd * 3.75)) });
    store.set('rcpts', R.slice(0, 2500)); if (window.dsHistSoon) dsHistSoon(); return true;
  }
  function saveRefund(t) {
    if (!t.refund_txid) return false;
    var ok = saveReceipt({ amount: t.amount, narr: 'Refund: ' + (t.narr || 'transfer'), from: 'DigitalSaudi', to: me(), to_addr: t.refund_addr, pid: t.pid + '-refund', done_ts: t.done_ts, txid: t.refund_txid }, 'in');
    if (ok) { var m = num(t.amount) + ' π returned to you: your transfer could not be delivered.'; notify('pay', 'txref_' + t.pid, '↩️', 'Refunded automatically', m, 'piWallet'); }
    return ok;
  }
  function redraw() { try { if (current && current.id === 'piWallet' && $('dwAct')) openItem('piWallet'); } catch (e) {} }
  /* fetch my sent and received transfers: add receipts, finish any delivery still pending */
  function sync() {
    if (!tok() || !CFG.usernames) return;
    api('/transfer', { a: 'list', accessToken: tok() }).then(function (d) {
      if (!d.ok) return; var news = 0;
      (d.items || []).forEach(function (t) {
        if (t.status === 'paid') {
          if (saveReceipt(t, t.dir)) { news++; if (t.dir === 'in') notify('pay', 'txin_' + t.pid, '💰', 'You received Pi', num(t.amount) + ' π from @' + t.from + (t.narr ? ' · ' + t.narr : ''), 'piWallet'); }
        } else if (t.status === 'refunded' && t.dir === 'out') {
          if (saveRefund(t)) news++;
        } else if (t.dir === 'out' && /^(failed|received|paying|refunding|refund_failed|refund_needed)$/.test(t.status)) {
          api('/transfer', { a: 'payout', paymentId: t.pid }).then(function (x) { if (x.ok && x.row && saveReceipt(x.row, 'out')) redraw(); else if (x.refunded && x.row && saveRefund(x.row)) redraw(); }).catch(function () {});
        }
      });
      if (news) redraw();
    }).catch(function () {});
  }
  window.dsTransferSync = sync;

  /* ── Send Pi ── */
  var _wt = walletTab;
  walletTab = function (t) { if (t === 'send' && CFG.enabled) return dsSendPi(); return _wt.apply(this, arguments); };
  window.dsSendPi = function (pre) {
    pre = pre || {};
    if (!CFG.enabled) return toast('Sending Pi is not available right now');
    if (!piUser || !tok()) { pendingAction = function () { dsSendPi(pre); }; toast('Sign in with Pi to send Pi'); piLogin(); return; }
    var mode = pre.addr ? 'addr' : (CFG.usernames ? 'user' : 'addr');
    showPanel('Send Pi', back +
      '<p class="small" style="margin:10px 0 0">Send Pi to any DigitalSaudi user, with a receipt for both of you.</p>' +
      (CFG.usernames ? '<div class="tx-tg"><button type="button" id="txM1">@ Username</button><button type="button" id="txM2">Wallet address</button></div>' : '<div style="height:10px"></div>') +
      '<div class="field"><label id="txTl">To</label><input id="txTo" autocomplete="off" autocapitalize="none" spellcheck="false"></div><div class="tx-h" id="txTh"></div>' +
      '<div class="field"><label>Amount (π)</label><input id="txA" type="number" inputmode="decimal" min="0" step="any" placeholder="0.00"></div><div class="small" id="txC" style="margin:-4px 0 10px"></div>' +
      '<div class="field"><label>What is it for?</label><input id="txX" maxlength="80" placeholder="e.g. Rent share, gift, shop order"></div>' +
      '<div id="txSum"></div><button class="btn btn-primary" style="width:100%" id="txGo">Continue</button>' +
      '<div class="note" style="margin-top:12px">🔒 Secured by Pi Network. DigitalSaudi never asks for your passphrase. ' + (CFG.max || CFG.daily ? 'Limits: ' + (CFG.max ? 'up to ' + CFG.max + ' π per transfer. ' : '') + (CFG.daily ? 'Up to ' + CFG.daily + ' π a day. ' : '') : 'No transfer limits. ') + 'Transfers cannot be reversed once delivered.</div>',
      { id: 'dsSend', share: false });
    var to = $('txTo'), a = $('txA'), ok = null, timer = null;
    function setMode(m) {
      mode = m; ok = null; to.value = ''; $('txTh').innerHTML = '';
      if ($('txM1')) { $('txM1').classList.toggle('on', m === 'user'); $('txM2').classList.toggle('on', m === 'addr'); }
      $('txTl').textContent = m === 'user' ? 'DigitalSaudi @username' : 'Pi wallet address (starts with G)';
      to.placeholder = m === 'user' ? '@username' : 'G…';
      to.style.fontFamily = m === 'addr' ? 'ui-monospace,Menlo,monospace' : ''; to.style.fontSize = m === 'addr' ? '13px' : '';
      to.setAttribute('autocapitalize', m === 'addr' ? 'characters' : 'none');
    }
    if ($('txM1')) { $('txM1').onclick = function () { setMode('user'); to.focus(); }; $('txM2').onclick = function () { setMode('addr'); to.focus(); }; }
    setMode(mode);
    var sum = function () {
      var v = r7(a.value); $('txC').textContent = v > 0 ? conv(v) : '';
      $('txSum').innerHTML = v > 0 ? '<div class="tx-sum"><div><span>They receive</span><b>' + num(v) + ' π</b></div><div><span>Blockchain fee</span><b>' + CFG.fee + ' π</b></div><div class="tot"><span>You pay</span><b>' + num(r7(v + CFG.fee)) + ' π</b></div></div>' : '';
    };
    a.oninput = sum;
    to.oninput = function () {
      ok = null; clearTimeout(timer); var h = $('txTh');
      if (mode === 'addr') {
        var v = to.value.trim().toUpperCase();
        if (!v) { h.innerHTML = ''; return; }
        if (ADDR.test(v)) { ok = v; h.innerHTML = '<span class="tx-ok">✓ Valid wallet address format</span>'; } else h.innerHTML = '<span class="tx-bad">' + (v.length < 56 ? 'A wallet address starts with G and has 56 characters.' : 'This is not a valid wallet address.') + '</span>';
        return;
      }
      var name = to.value.trim().replace(/^@/, '');
      if (!USER.test(name)) { h.innerHTML = ''; return; }
      h.textContent = 'Checking…';
      timer = setTimeout(function () {
        api('/users?u=' + encodeURIComponent(name)).then(function (d) {
          if (to.value.trim().replace(/^@/, '') !== name || mode !== 'user') return;
          if (!d.ok) { h.innerHTML = '<span class="tx-bad">' + esc(d.error || 'Could not check right now. Try again.') + '</span>'; return; }
          if (d.exists && d.username.toLowerCase() === me().toLowerCase()) { h.innerHTML = '<span class="tx-bad">That is you.</span>'; return; }
          if (d.exists) { ok = d.username; h.innerHTML = '<span class="tx-ok">✓ @' + esc(d.username) + ' uses DigitalSaudi</span>'; }
          else h.innerHTML = '<span class="tx-bad">@' + esc(name) + ' has not used DigitalSaudi yet. Ask them to open DigitalSaudi and sign in with Pi once, or send to their wallet address.</span>';
        }).catch(function () { h.textContent = 'No connection. Try again.'; });
      }, 450);
    };
    if (pre.to) { to.value = mode === 'user' ? '@' + pre.to : pre.to; to.oninput(); } else if (pre.addr) { to.value = pre.addr; to.oninput(); }
    if (pre.a > 0) { a.value = r7(pre.a); sum(); }
    if (pre.x) $('txX').value = String(pre.x).slice(0, 80);
    $('txGo').onclick = function () {
      var v = r7(a.value), x = $('txX').value.trim();
      if (!ok) return toast(mode === 'user' ? 'Enter a DigitalSaudi user’s @username' : 'Enter a valid Pi wallet address');
      if (!(v >= 0.01)) return toast('The smallest transfer is 0.01 π');
      if (CFG.max && v > CFG.max) return toast('The most you can send at once is ' + CFG.max + ' π');
      if (!x) return toast('Add what this payment is for');
      var btn = $('txGo'); btn.disabled = true; btn.textContent = 'Checking…';
      var body = { a: 'check', accessToken: tok(), amt: v }; if (mode === 'user') body.to = ok; else body.addr = ok;
      api('/transfer', body).then(function (d) {
        btn.disabled = false; btn.textContent = 'Continue';
        if (!d || !d.ok) return toast((d && d.error) || 'This transfer cannot be sent right now');
        review(mode === 'user' ? { to: d.to || ok } : { addr: ok }, v, x, !!d.first);
      }).catch(function () { btn.disabled = false; btn.textContent = 'Continue'; toast('No connection. Check your internet and try again.'); });
    };
    if (!pre.to && !pre.addr) setTimeout(function () { to.focus(); }, 120);
  };

  /* ── one clear last look before Pi's pop-up (stops most mistakes and scams) ── */
  function review(r, amt, narr, first) {
    var who = r.to ? '@' + esc(r.to) : '<span style="font-family:ui-monospace,Menlo,monospace;font-size:12px;overflow-wrap:anywhere">' + esc(r.addr) + '</span>';
    var warn = [];
    if (first) warn.push('⚠️ First time sending to ' + (r.to ? '<b>@' + esc(r.to) + '</b>' : 'this address') + '. Only send to people you know and trust. DigitalSaudi will never ask you to send Pi.');
    if (r.addr) warn.push('Check every character of the address. Pi sent to a wrong address cannot be returned.');
    warn.push('Transfers cannot be reversed once delivered.');
    showPanel('Check before you send', '<div class="tx-big"><b>' + num(amt) + ' π</b><span>' + esc(conv(amt)) + '</span></div>' +
      '<div class="tx-sum"><div><span>To</span><b style="text-align:right;max-width:70%">' + who + '</b></div><div><span>For</span><b>' + esc(narr) + '</b></div><div><span>They receive</span><b>' + num(amt) + ' π</b></div><div><span>Blockchain fee</span><b>' + CFG.fee + ' π</b></div><div class="tot"><span>You pay</span><b>' + num(r7(amt + CFG.fee)) + ' π</b></div></div>' +
      '<div class="tx-warn">' + warn.map(function (x) { return '<div>' + x + '</div>'; }).join('') + '</div>' +
      '<button class="btn btn-primary" style="width:100%" id="txOk">Confirm and send</button><div class="p-actions" style="justify-content:center"><button class="btn btn-ghost btn-sm" id="txEd">Edit</button></div>',
      { id: 'dsSendReview', share: false });
    $('txOk').onclick = function () { pay(r, amt, narr); };
    $('txEd').onclick = function () { dsSendPi({ to: r.to, addr: r.addr, a: amt, x: narr }); };
  }

  function pay(r, amt, narr) {
    if (typeof Pi === 'undefined' || !Pi.createPayment) return toast('Open DigitalSaudi in the Pi Browser to send Pi');
    var label = r.to ? '@' + r.to : short(r.addr);
    showPanel('Sending Pi', '<div class="tx-big"><b>' + num(amt) + ' π</b><span>To ' + esc(label) + ' · ' + esc(narr) + '</span></div>' +
      '<div class="tx-steps"><div id="txs1" class="on">1 · Confirm payment</div><div id="txs2">2 · Confirming your payment</div><div id="txs3">3 · Paying ' + esc(label) + ' on the blockchain</div></div><div class="tx-st wait" id="txSt">Waiting for your approval…</div>' +
      '<div class="p-actions" style="justify-content:center"><button class="btn btn-ghost btn-sm" onclick="openItem(\'piWallet\')">‹ Back to wallet</button></div>',
      { id: 'dsSending', share: false });
    var refused = false;
    var step = function (n, msg, cls) { for (var i = 1; i <= 3; i++) { var e = $('txs' + i); if (e) e.className = i < n || cls === 'ok' ? 'done' : i === n ? 'on' : ''; } var s = $('txSt'); if (s) { s.className = 'tx-st ' + (cls || 'wait'); s.innerHTML = msg; } };
    var refundedMsg = '↩️ This transfer could not be delivered, so ' + num(amt) + ' π was refunded to you automatically on the Pi blockchain.';
    var finish = function (pid, row) {
      saveReceipt(row, 'out');
      notify('pay', 'txout_' + pid, '✅', 'Transfer sent', num(amt) + ' π to ' + label + ' · ' + narr, 'piWallet');
      step(3, '✅ Delivered. ' + esc(label) + ' received ' + num(amt) + ' π.<div style="margin-top:10px"><button class="btn btn-primary btn-sm" onclick="dsP2PReceipt(\'' + esc(row.txid) + '\')">🧾 View receipt</button></div>', 'ok');
    };
    var md = { type: 'transfer', app: APP_NAME, amt: amt, narr: narr }; if (r.to) md.to = r.to; else md.addr = r.addr;
    try {
      initPi();
      Pi.createPayment({ amount: r7(amt + CFG.fee), memo: ('DigitalSaudi transfer to ' + label).slice(0, 60), metadata: md }, {
        onReadyForServerApproval: function (pid) {
          api('/approve', { paymentId: pid }).then(function (d) { if (d && (d.approved === false || d.ok === false)) { refused = true; step(1, '✕ ' + esc(d.error || 'This transfer was refused.') + ' You have not been charged.', 'err'); } }).catch(function () {});
        },
        onReadyForServerCompletion: function (pid, txid) {
          step(2, 'Confirming your payment on the blockchain…');
          api('/complete', { paymentId: pid, txid: txid }).then(function (d) {
            step(3, 'Paying ' + esc(label) + '…');
            var t = d && d.transfer;
            if (t && t.ok && t.row && t.row.txid) return finish(pid, t.row);
            if (t && t.refunded && t.row) { saveRefund(t.row); return step(3, refundedMsg, 'err'); }
            var tries = 0;
            (function retry() {
              api('/transfer', { a: 'payout', paymentId: pid }).then(function (x) {
                if (x.ok && x.row && x.row.txid) return finish(pid, x.row);
                if (x.refunded && x.row) { saveRefund(x.row); return step(3, refundedMsg, 'err'); }
                if (++tries < 40) { if (x.need_signin) step(3, esc(label) + ' needs to open DigitalSaudi and sign in again (tap Allow) to receive Pi. Your Pi is safe: it is delivered as soon as they do, or refunded to you automatically.', 'wait'); else step(3, 'Paying ' + esc(label) + '… the Pi blockchain is busy, retrying automatically.'); setTimeout(retry, 8000); }
                else step(3, 'Your payment is safe and recorded on the Pi blockchain. DigitalSaudi keeps trying automatically: the recipient is paid, or you are refunded, and you will be notified.', 'wait');
              }).catch(function () { if (++tries < 40) setTimeout(retry, 8000); });
            })();
          }).catch(function () { step(2, 'Connection problem. Your payment is recorded; DigitalSaudi will finish it when you reopen the wallet.', 'err'); });
        },
        onCancel: function () { if (!refused) step(1, 'You cancelled. Nothing was paid.', 'err'); },
        onError: function (err) {
          if (refused) return; var m = (err && err.message) || 'Payment error';
          if (/pending|incomplete/i.test(m)) { step(1, 'You have an unfinished payment. DigitalSaudi is clearing it; try again in a minute.', 'err'); try { setTimeout(clearStuckPayment, 600); } catch (e) {} return; }
          step(1, '✕ ' + esc(m) + '. Nothing was paid.', 'err');
        }
      });
    } catch (e) { step(1, '✕ ' + esc(e.message || e), 'err'); }
  }

  function start() {
    api('/transfer?a=status').then(function (d) {
      if (d && d.ok) { CFG.enabled = !!d.enabled; CFG.usernames = !!d.usernames; CFG.fee = d.fee || 0.01; CFG.max = d.max || 0; CFG.daily = d.daily || 0; }
      register(); sync();
    }).catch(function () {});
    var n = 0, iv = setInterval(function () { register(); if (registered || ++n > 150) clearInterval(iv); }, 2000);
    setInterval(function () { if (!document.hidden) sync(); }, 60000);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { setTimeout(start, 200); }); else setTimeout(start, 200);
})();

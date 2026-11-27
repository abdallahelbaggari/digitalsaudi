/* DigitalSaudi — branded receipt images (PNG). FPReceipt.canvas(spec) → Promise<canvas>; FPReceipt.share(canvas, filename, text). */
(function () {
  'use strict';
  if (window.FPReceipt) return;
  var F = "Poppins,'Segoe UI',Roboto,Arial,sans-serif", M = "'JetBrains Mono',Menlo,Consolas,monospace";
  function loadImg(src) { return new Promise(function (ok) { var i = new Image(); i.onload = function () { ok(i); }; i.onerror = function () { ok(null); }; i.src = src; }); }
  function rr(x, c, y, w, h, r) { x.beginPath(); x.moveTo(c + r, y); x.arcTo(c + w, y, c + w, y + h, r); x.arcTo(c + w, y + h, c, y + h, r); x.arcTo(c, y + h, c, y, r); x.arcTo(c, y, c + w, y, r); x.closePath(); }
  function wrap(x, v, maxW) {
    v = String(v); if (x.measureText(v).width <= maxW) return [v];
    var words = v.split(' '); if (words.length > 1) {
      var lines = [], cur = '';
      words.forEach(function (w) { var t = cur ? cur + ' ' + w : w; if (x.measureText(t).width > maxW && cur) { lines.push(cur); cur = w; } else cur = t; });
      if (cur) lines.push(cur); if (lines.every(function (l) { return x.measureText(l).width <= maxW; })) return lines.slice(0, 3);
    }
    var out = [], s = '';
    for (var i = 0; i < v.length; i++) { if (x.measureText(s + v[i]).width > maxW) { out.push(s); s = ''; } s += v[i]; }
    if (s) out.push(s); return out.slice(0, 3);
  }
  /* ── anti-forgery layers: guilloche lines, a rosette, a diagonal watermark and microtext that carry this
     receipt's own amount and transaction ID, plus a verification code signed by DigitalSaudi's server ── */
  function guilloche(x, X0, Y0, w, h, col, a) {
    x.save(); x.beginPath(); x.rect(X0, Y0, w, h); x.clip(); x.globalAlpha = a; x.strokeStyle = col; x.lineWidth = 1.2;
    for (var k = 0; k < 26; k++) {
      x.beginPath();
      for (var t = 0; t <= w; t += 6) { var yy = Y0 + h * (k + .5) / 26 + Math.sin(t / 38 + k * .55) * 16 + Math.sin(t / 11 + k) * 3.5; if (t) x.lineTo(X0 + t, yy); else x.moveTo(X0, yy); }
      x.stroke();
    }
    x.restore();
  }
  function rosette(x, cx, cy, R, col, a) {
    x.save(); x.globalAlpha = a; x.strokeStyle = col; x.lineWidth = 1.1;
    for (var j = 0; j < 3; j++) { var r1 = R - j * R * .18, r2 = r1 * .27, d = r1 * .32; x.beginPath();
      for (var t = 0; t <= Math.PI * 2 * 11 + .01; t += .02) { var px = (r1 - r2) * Math.cos(t) + d * Math.cos((r1 - r2) / r2 * t), py = (r1 - r2) * Math.sin(t) - d * Math.sin((r1 - r2) / r2 * t); if (t) x.lineTo(cx + px, cy + py); else x.moveTo(cx + px, cy + py); }
      x.stroke(); }
    x.restore();
  }
  function watermark(x, X0, Y0, w, h, text, a) {
    x.save(); x.beginPath(); x.rect(X0, Y0, w, h); x.clip(); x.globalAlpha = a; x.fillStyle = '#0E6038'; x.font = '700 22px ' + F; x.textAlign = 'left';
    x.translate(X0 + w / 2, Y0 + h / 2); x.rotate(-Math.PI / 6);
    var tw = x.measureText(text + '   ').width, D = Math.sqrt(w * w + h * h);
    for (var yy = -D / 2, row = 0; yy < D / 2; yy += 64, row++) for (var xx = -D / 2 - (row % 2) * tw / 2; xx < D / 2; xx += tw) x.fillText(text, xx, yy);
    x.restore();
  }
  function microline(x, txt, x0, y0, len, vertical) {
    x.save(); x.font = '600 10px ' + M; x.fillStyle = '#21BC71'; x.globalAlpha = .55; x.textAlign = 'left'; x.translate(x0, y0); if (vertical) x.rotate(Math.PI / 2);
    var s = ''; while (x.measureText(s).width < len) s += txt; while (s.length && x.measureText(s).width > len) s = s.slice(0, -1);
    x.fillText(s, 0, 0); x.restore();
  }
  function emblem(x, cx, cy, R) {
    x.save();
    var g = x.createLinearGradient(cx - R, cy - R, cx + R, cy + R); g.addColorStop(0, '#F5C451'); g.addColorStop(.5, '#B0841C'); g.addColorStop(1, '#21BC71');
    x.shadowColor = 'rgba(11,44,28,.3)'; x.shadowBlur = 18; x.beginPath(); x.arc(cx, cy, R, 0, Math.PI * 2); x.fillStyle = g; x.fill(); x.shadowBlur = 0;
    x.beginPath(); x.arc(cx, cy, R - 7, 0, Math.PI * 2); x.strokeStyle = 'rgba(255,255,255,.85)'; x.lineWidth = 2; x.stroke();
    x.beginPath(); x.arc(cx, cy, R - 30, 0, Math.PI * 2); x.fillStyle = '#FFFFFF'; x.fill();
    var ring = 'VERIFIED · PI BLOCKCHAIN · DIGITALSAUDI · '; x.font = '800 11.5px ' + F; x.fillStyle = '#FFFFFF'; x.textAlign = 'center';
    var step = Math.PI * 2 / ring.length; for (var i = 0; i < ring.length; i++) { x.save(); x.translate(cx, cy); x.rotate(i * step - Math.PI / 2 + step / 2); x.fillText(ring[i], 0, -R + 22); x.restore(); }
    x.strokeStyle = '#8B6819'; x.lineWidth = 6; x.lineCap = 'round'; x.lineJoin = 'round'; x.beginPath(); x.moveTo(cx - 15, cy + 1); x.lineTo(cx - 4, cy + 12); x.lineTo(cx + 17, cy - 11); x.stroke();
    x.restore();
  }
  function txOf(u) { var m = /tx=([a-f0-9]{64}).*?net=(main|test)/.exec(u || ''); return m ? { tx: m[1], net: m[2] } : null; }
  function getSeal(u) {
    var t = txOf(u); if (!t) return Promise.resolve('');
    try { var c = localStorage.getItem('dsw_v1_seal_' + t.tx); if (c) return Promise.resolve(c); } catch (e) {}
    return Promise.race([
      fetch('/verify?tx=' + t.tx + '&net=' + t.net).then(function (r) { return r.json(); }).then(function (d) { var s = d && d.ok && d.tx && d.tx.seal || ''; if (s) try { localStorage.setItem('dsw_v1_seal_' + t.tx, s); } catch (e) {} return s; }),
      new Promise(function (ok) { setTimeout(function () { ok(''); }, 4500); })
    ]).catch(function () { return ''; });
  }
  /* QR code for "scan to verify" — works with either QR library the page has loaded */
  function qrImg(text) { return Promise.resolve(text && window.FPQR ? FPQR.canvas(text, 250, '#084427', '#FFFFFF') : null); }
  function canvas(r) {
    return Promise.all([loadImg((r.base || '') + 'icon-512.png'), qrImg(r.verify), r.seal != null ? r.seal : getSeal(r.verify)]).then(function (res) {
      var logo = res[0], qr = res[1], code = res[2] || '', tx = (txOf(r.verify) || {}).tx || '';
      var W = 1080, maxW = W - 120 - 400;
      var mx = document.createElement('canvas').getContext('2d');
      var rows = (r.rows || []).filter(function (x) { return x && x[1] != null && x[1] !== ''; }).map(function (row) {
        mx.font = row[2] ? '600 26px ' + M : '700 31px ' + F; return { k: row[0], lines: wrap(mx, row[1], maxW), mono: !!row[2] };
      });
      var rowsH = rows.reduce(function (a, b) { return a + 86 + (b.lines.length - 1) * 38; }, 0);
      var QH = r.verify ? 350 : 0, QX = 0, QY = 0;
      var H = 860 + rowsH + QH + 270, cv = document.createElement('canvas'); cv.width = W; cv.height = H; var x = cv.getContext('2d');
      x.fillStyle = '#EEF8F3'; x.fillRect(0, 0, W, H);
      x.save(); rr(x, 60, 60, W - 120, H - 120, 44); x.fillStyle = '#FFFFFF'; x.shadowColor = 'rgba(11,44,28,.14)'; x.shadowBlur = 40; x.fill(); x.restore();
      guilloche(x, 60, 420, W - 120, H - 480, '#21BC71', .07); rosette(x, W / 2, 690, 230, '#997215', .09);
      x.save(); rr(x, 60, 60, W - 120, 360, 44); x.clip(); var g = x.createLinearGradient(60, 60, W - 60, 420); g.addColorStop(0, '#0E6038'); g.addColorStop(.65, '#21BC71'); g.addColorStop(1, '#997215'); x.fillStyle = g; x.fillRect(60, 60, W - 120, 380);
      x.globalAlpha = .08; x.fillStyle = '#E3BD65'; for (var i = 0; i < 9; i++) { x.beginPath(); x.arc(W - 120, 60, 80 + i * 46, 0, Math.PI * 2); x.lineWidth = 2; x.strokeStyle = '#E3BD65'; x.stroke(); } x.globalAlpha = 1; guilloche(x, 60, 60, W - 120, 360, '#FFFFFF', .12); x.restore();
      if (logo) x.drawImage(logo, W / 2 - 75, 104, 150, 150);
      x.textAlign = 'center'; x.fillStyle = '#FFFFFF'; x.font = '700 72px ' + F; x.fillText('DigitalSaudi', W / 2, 334);
      x.fillStyle = '#E3BD65'; x.font = '700 32px ' + F; x.fillText('digitalsaudi.pi', W / 2, 388);
      x.fillStyle = '#0B2C1C'; x.font = '800 44px ' + F; x.fillText(r.title || 'Payment receipt', W / 2, 516);
      var st = r.status || { text: '✓  Completed', ok: true }; x.font = '800 29px ' + F; var sw = Math.max(300, x.measureText(st.text).width + 70);
      x.fillStyle = st.ok ? '#F6F2E7' : '#FFF4E0'; rr(x, W / 2 - sw / 2, 544, sw, 58, 29); x.fill();
      x.fillStyle = st.ok ? '#8B6819' : '#B26B00'; x.fillText(st.text, W / 2, 584);
      x.fillStyle = '#0B2C1C'; x.font = '800 116px ' + F; x.fillText(r.amount + ' π', W / 2, 732);
      if (r.sub) { x.fillStyle = '#64748B'; x.font = '600 31px ' + F; x.fillText(r.sub, W / 2, 784); }
      var y = 864; x.textAlign = 'left';
      rows.forEach(function (row) {
        x.fillStyle = '#64748B'; x.font = '600 29px ' + F; x.fillText(row.k, 120, y);
        x.fillStyle = '#0B2C1C'; x.font = row.mono ? '600 26px ' + M : '700 31px ' + F; x.textAlign = 'right';
        row.lines.forEach(function (l, j) { x.fillText(l, W - 120, y + j * 38); });
        x.textAlign = 'left'; y += (row.lines.length - 1) * 38 + 34;
        x.strokeStyle = '#E3EFE9'; x.lineWidth = 2; x.beginPath(); x.moveTo(120, y); x.lineTo(W - 120, y); x.stroke(); y += 52;
      });
      if (r.verify) {
        var by = y - 10;
        var bh = 310; x.fillStyle = '#EFFEF7'; rr(x, 120, by, W - 240, bh, 26); x.fill(); x.strokeStyle = 'rgba(26,194,113,.35)'; x.lineWidth = 3; x.stroke();
        if (qr) { var qs = 270; x.fillStyle = '#FFFFFF'; rr(x, 140, by + 20, qs, qs, 18); x.fill(); x.strokeStyle = '#084427'; x.lineWidth = 3; x.stroke(); QX = 140 + (qs - qr.width) / 2; QY = by + 20 + (qs - qr.height) / 2; x.imageSmoothingEnabled = false; x.drawImage(qr, QX, QY); x.imageSmoothingEnabled = true; }
        var tx0 = qr ? 440 : 150; x.textAlign = 'left'; by += 30;
        x.fillStyle = '#1AC271'; x.font = '800 34px ' + F; x.fillText('Scan to verify', tx0, by + 66);
        if (code) {
          x.fillStyle = '#64748B'; x.font = '700 21px ' + F; x.fillText('VERIFICATION CODE', tx0, by + 108);
          x.fillStyle = '#0E6038'; x.font = '700 38px ' + M; x.fillText(code, tx0, by + 152);
          x.fillStyle = '#475569'; x.font = '500 21px ' + F; wrap(x, 'Must match the code on the verify page.', W - 140 - tx0).slice(0, 1).forEach(function (l) { x.fillText(l, tx0, by + 190); });
        } else {
          x.fillStyle = '#475569'; x.font = '500 25px ' + F;
          wrap(x, 'Checks this payment on the public Pi blockchain. An edited receipt will not match.', W - 140 - tx0).slice(0, 3).forEach(function (l, j) { x.fillText(l, tx0, by + 106 + j * 32); });
        }
        x.textAlign = 'center';
      }
      x.textAlign = 'center'; x.fillStyle = '#21BC71'; x.font = '800 33px ' + F; x.fillText(r.thanks || 'Thank you for using DigitalSaudi', W / 2, H - 214);
      x.fillStyle = '#64748B'; x.font = '500 25px ' + F;
      wrap(x, r.note || 'Check this payment on the Pi blockchain explorer with the Transaction ID.', W - 240).slice(0, 2).forEach(function (l, j) { x.fillText(l, W / 2, H - 164 + j * 32); });
      x.fillText('© DigitalSaudi ' + new Date().getFullYear() + ' · digitalsaudi.pi', W / 2, H - 92);
      var amt = String(r.amount || '').replace(/,/g, '');
      watermark(x, 60, 420, W - 120, H - 480, 'DIGITALSAUDI · ' + amt + ' π · ' + (code || (tx ? tx.slice(0, 10).toUpperCase() : 'RECEIPT')), .045);
      var mt = 'DIGITALSAUDI•' + (tx ? tx.toUpperCase() : 'RECEIPT') + '•' + amt + 'π•' + (code ? code + '•' : '');
      microline(x, mt, 84, 82, W - 168); microline(x, mt, 84, H - 70, W - 168); microline(x, mt, 72, 84, H - 168, true); microline(x, mt, W - 72, 84, H - 168, true);
      emblem(x, W - 170, 420, 64);
      if (qr && QX) { x.fillStyle = '#FFFFFF'; x.fillRect(QX, QY, qr.width, qr.height); x.imageSmoothingEnabled = false; x.drawImage(qr, QX, QY); x.imageSmoothingEnabled = true; }
      return cv;
    });
  }
  function share(cv, fname, text) {
    cv.toBlob(function (blob) {
      try { var f = new File([blob], fname, { type: 'image/png' }); if (navigator.canShare && navigator.canShare({ files: [f] })) { navigator.share({ files: [f], title: 'DigitalSaudi receipt', text: 'DigitalSaudi receipt' }).catch(function () {}); return; } } catch (e) {}
      if (navigator.share) navigator.share({ title: 'DigitalSaudi receipt', text: text }).catch(function () {}); else if (window.Pi && Pi.openShareDialog) { try { Pi.openShareDialog('DigitalSaudi receipt', text); } catch (e) {} } else { try { navigator.clipboard.writeText(text); } catch (e) {} }
    }, 'image/png');
  }
  window.FPReceipt = { canvas: canvas, share: share, guilloche: guilloche, rosette: rosette, watermark: watermark, microline: microline, emblem: emblem };
})();

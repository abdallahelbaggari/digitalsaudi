/* DigitalSaudi — branded receipt images (PNG), shared by the wallet and the DigitalSaudi Pay page.
   HMReceipt.canvas(spec) → Promise<canvas>; HMReceipt.share(canvas, filename, text); HMReceipt.sheet(spec, filename, text) (inside the app). */
(function () {
  'use strict';
  if (window.DSReceipt) return;
  var F = "'DM Sans','Segoe UI',Roboto,Arial,sans-serif", M = "'DM Mono',Menlo,Consolas,monospace";
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
  function canvas(r) {
    return loadImg('/icon-512.png').then(function (logo) {
      var W = 1080, maxW = W - 120 - 400;
      var mx = document.createElement('canvas').getContext('2d');
      var rows = (r.rows || []).filter(function (x) { return x && x[1] != null && x[1] !== ''; }).map(function (row) {
        mx.font = row[2] ? '600 26px ' + M : '700 31px ' + F; return { k: row[0], lines: wrap(mx, row[1], maxW), mono: !!row[2] };
      });
      var rowsH = rows.reduce(function (a, b) { return a + 86 + (b.lines.length - 1) * 38; }, 0);
      var H = 860 + rowsH + 270, cv = document.createElement('canvas'); cv.width = W; cv.height = H; var x = cv.getContext('2d');
      x.fillStyle = '#F6F4EE'; x.fillRect(0, 0, W, H);
      x.save(); rr(x, 60, 60, W - 120, H - 120, 44); x.fillStyle = '#FFFFFF'; x.shadowColor = 'rgba(19,38,30,.12)'; x.shadowBlur = 40; x.fill(); x.restore();
      x.save(); rr(x, 60, 60, W - 120, 360, 44); x.clip(); var g = x.createLinearGradient(60, 60, W - 60, 420); g.addColorStop(0, '#0C8A55'); g.addColorStop(1, '#063F27'); x.fillStyle = g; x.fillRect(60, 60, W - 120, 380);
      x.globalAlpha = .08; x.fillStyle = '#EBCB78'; for (var i = 0; i < 9; i++) { x.beginPath(); x.arc(W - 120, 60, 80 + i * 46, 0, Math.PI * 2); x.lineWidth = 2; x.strokeStyle = '#EBCB78'; x.stroke(); } x.globalAlpha = 1; x.restore();
      if (logo) x.drawImage(logo, W / 2 - 75, 104, 150, 150);
      x.textAlign = 'center'; x.fillStyle = '#FFFFFF'; x.font = '800 58px ' + F; x.fillText('D I G I T A L S A U D I', W / 2, 334);
      x.fillStyle = '#EBCB78'; x.font = '700 32px ' + F; x.fillText('digitalsaudi.pi', W / 2, 388);
      x.fillStyle = '#13261E'; x.font = '800 44px ' + F; x.fillText(r.title || 'Payment receipt', W / 2, 516);
      var st = r.status || { text: '✓  Completed', ok: true }; x.font = '800 29px ' + F; var sw = Math.max(300, x.measureText(st.text).width + 70);
      x.fillStyle = st.ok ? '#E7F6EE' : '#FFF4E0'; rr(x, W / 2 - sw / 2, 544, sw, 58, 29); x.fill();
      x.fillStyle = st.ok ? '#0E7A52' : '#B26B00'; x.fillText(st.text, W / 2, 584);
      x.fillStyle = '#13261E'; x.font = '800 116px ' + F; x.fillText(r.amount + ' π', W / 2, 732);
      if (r.sub) { x.fillStyle = '#6E7B73'; x.font = '600 31px ' + F; x.fillText(r.sub, W / 2, 784); }
      var y = 864; x.textAlign = 'left';
      rows.forEach(function (row) {
        x.fillStyle = '#6E7B73'; x.font = '600 29px ' + F; x.fillText(row.k, 120, y);
        x.fillStyle = '#13261E'; x.font = row.mono ? '600 26px ' + M : '700 31px ' + F; x.textAlign = 'right';
        row.lines.forEach(function (l, j) { x.fillText(l, W - 120, y + j * 38); });
        x.textAlign = 'left'; y += (row.lines.length - 1) * 38 + 34;
        x.strokeStyle = '#ECE7DA'; x.lineWidth = 2; x.beginPath(); x.moveTo(120, y); x.lineTo(W - 120, y); x.stroke(); y += 52;
      });
      x.textAlign = 'center'; x.fillStyle = '#0E7A52'; x.font = '800 33px ' + F; x.fillText(r.thanks || 'Thank you for using DigitalSaudi', W / 2, H - 214);
      x.fillStyle = '#6E7B73'; x.font = '500 25px ' + F;
      wrap(x, r.note || 'Check this payment on the Pi blockchain explorer with the Transaction ID.', W - 240).slice(0, 2).forEach(function (l, j) { x.fillText(l, W / 2, H - 164 + j * 32); });
      x.fillText('© DigitalSaudi ' + new Date().getFullYear() + ' · digitalsaudi.pi', W / 2, H - 92);
      return cv;
    });
  }
  /* ── saving and sharing (works inside the Pi Browser) ──
     The Pi Browser cannot save files made inside the page or share them as files, so DigitalSaudi keeps a private
     copy for 30 days (/file) and uses its link: saving downloads from that link (Downloads and Gallery), sharing tries
     a real image first, and the link is offered as an option. */
  var upCache = {};
  function T(m) { try { toast(m); } catch (e) {} }
  function upload(blob, name, type) {
    var k = name + '|' + blob.size;
    if (!upCache[k]) upCache[k] = fetch('/file?type=' + encodeURIComponent(type) + '&name=' + encodeURIComponent(name), { method: 'POST', headers: { 'Content-Type': type }, body: blob })
      .then(function (r) { return r.json(); }).then(function (d) { if (!d || !d.ok) throw new Error((d && d.error) || 'Could not save'); return d; })
      .catch(function (e) { delete upCache[k]; throw e; });
    return upCache[k];
  }
  function clickDl(href, name) { var a = document.createElement('a'); a.href = href; a.download = name; a.rel = 'noopener'; document.body.appendChild(a); a.click(); a.remove(); }
  function blobSave(blob, name) { var u = URL.createObjectURL(blob); clickDl(u, name); setTimeout(function () { URL.revokeObjectURL(u); }, 15000); }
  function canShareFile(f) { try { return !!(f && navigator.canShare && navigator.canShare({ files: [f] })); } catch (e) { return false; } }
  function note(html) {
    var old = document.getElementById('dsFileNote'); if (old) old.remove();
    var d = document.createElement('div'); d.id = 'dsFileNote'; d.className = 'ds-fnote'; d.innerHTML = html + '<button type="button" class="ds-fx" aria-label="Close">✕</button>';
    d.querySelector('.ds-fx').onclick = function () { d.remove(); };
    var host = document.querySelector('#panel .p-body, #pBody') || document.body; host.appendChild(d); try { d.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); } catch (e) {}
    return d;
  }
  function save(blob, name, type, what, quiet) {
    T('Saving ' + what + '…');
    return upload(blob, name, type).then(function (d) {
      clickDl(location.origin + d.file + '?dl=1', d.name || name);
      if (quiet) return d;
      var img = /^image\//.test(type);
      var n = note('<b>✓ Saved to your phone</b><p>' + (img ? 'Your receipt image is in your phone’s <b>Downloads</b> and <b>Gallery</b>.' : 'Your ' + what + ' is in your phone’s <b>Downloads</b> folder.') + '</p>' +
        '<button type="button" class="btn btn-ghost btn-sm" data-x="o">' + (img ? 'Open the receipt image' : 'Download again') + '</button>');
      n.querySelector('[data-x="o"]').onclick = function () { if (img) location.href = d.page; else clickDl(location.origin + d.file + '?dl=1', d.name || name); };
      return d;
    }, function () { blobSave(blob, name); T(what.charAt(0).toUpperCase() + what.slice(1) + ' saved to Downloads'); });
  }
  function shareLink(blob, name, type, title, short) {
    T('Preparing link…');
    upload(blob, name, type).then(function (d) {
      var link = location.origin + d.page, t = short || title;
      if (navigator.share) navigator.share({ title: title, text: t, url: link }).catch(function () {});
      else if (window.Pi && Pi.openShareDialog) { try { Pi.openShareDialog(title, t + '\n' + link); } catch (e) {} }
      else { try { navigator.clipboard.writeText(t + '\n' + link); T('Link copied'); } catch (e) {} }
    }, function () { T('No connection. Try again.'); });
  }
  function shareImage(blob, name, type, title, short) {
    var f = null; try { f = new File([blob], name, { type: type }); } catch (e) {}
    var fallback = function () {
      save(blob, name, type, 'receipt', true);
      var n = note('<b>Share the receipt image</b><p>The receipt image is saved to your phone’s <b>Gallery</b>. Open WhatsApp (or any app), tap attach, choose <b>Gallery</b> and pick the DigitalSaudi receipt.</p>' +
        '<button type="button" class="btn btn-primary btn-sm" data-x="l">🔗 Share as a link instead</button>');
      n.querySelector('[data-x="l"]').onclick = function () { n.remove(); shareLink(blob, name, type, title, short); };
    };
    if (f && navigator.share && (!navigator.canShare || canShareFile(f))) return navigator.share({ files: [f], title: title }).catch(function (e) { if (!e || e.name !== 'AbortError') fallback(); });
    fallback();
  }
  function shareFile(blob, name, type, title, short) {
    var f = null; try { f = new File([blob], name, { type: type }); } catch (e) {}
    if (canShareFile(f)) return navigator.share({ files: [f], title: title }).catch(function () {});
    shareLink(blob, name, type, title, short);
  }
  function toJpg(cv) { return new Promise(function (ok) { cv.toBlob(ok, 'image/jpeg', 0.92); }); }
  function share(cv, fname, text) { toJpg(cv).then(function (b) { shareImage(b, fname.replace(/\.png$/, '.jpg'), 'image/jpeg', 'DigitalSaudi receipt', String(text || '').split('\n').slice(0, 2).join(' · ')); }); }
  function sheet(spec, fname, text, title) {
    var isInv = /^Invoice/.test(spec.title || ''); T(isInv ? 'Preparing invoice…' : 'Preparing receipt…');
    fname = fname.replace(/\.png$/, '.jpg');
    var short = (isInv ? 'DigitalSaudi · ' : 'DigitalSaudi receipt · ') + (spec.title || 'Receipt') + ' · ' + spec.amount + ' π';
    return canvas(spec).then(function (cv) {
      var url = cv.toDataURL('image/jpeg', 0.92), jpg = toJpg(cv);
      showPanel(title || 'Receipt', '<img src="' + url + '" alt="' + (isInv ? 'Invoice' : 'Receipt') + '" class="ds-rimg">' +
        '<div class="ds-ract"><button class="btn btn-primary" id="dsRcShare">📤 Share image</button><button class="btn btn-ghost" id="dsRcSave">⬇️ Save to gallery</button></div>' +
        '<button type="button" class="ds-rlink" id="dsRcLink">🔗 Share as a link</button>', { id: 'receipt', share: false });
      var g = function (id, fn) { var e = document.getElementById(id); if (e) e.onclick = function () { jpg.then(fn); }; };
      g('dsRcShare', function (b) { shareImage(b, fname, 'image/jpeg', 'DigitalSaudi receipt', short); });
      g('dsRcSave', function (b) { save(b, fname, 'image/jpeg', 'receipt'); });
      g('dsRcLink', function (b) { shareLink(b, fname, 'image/jpeg', 'DigitalSaudi receipt', short); });
    });
  }
  window.DSFiles = { save: save, shareImage: shareImage, shareFile: shareFile, shareLink: shareLink };
  window.DSReceipt = { canvas: canvas, share: share, sheet: sheet };
})();

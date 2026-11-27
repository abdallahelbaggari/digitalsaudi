/* DigitalSaudi barcode reader — EAN-13, UPC-A, EAN-8 and Code 128 from camera frames or photos.
   Reads several horizontal and vertical lines, in both directions, and only accepts a code that checks out. */
(function (root) {
  'use strict';
  var EAN = ['3211', '2221', '2122', '1411', '1132', '1231', '1114', '1312', '1213', '3112'].map(function (s) { return s.split('').map(Number); });
  var EANG = EAN.map(function (p) { return p.slice().reverse(); });
  var PAR = ['LLLLLL', 'LLGLGG', 'LLGGLG', 'LLGGGL', 'LGLLGG', 'LGGLLG', 'LGGGLL', 'LGLGLG', 'LGLGGL', 'LGGLGL'];
  var C128 = ('212222 222122 222221 121223 121322 131222 122213 122312 132212 221213 221312 231212 112232 122132 122231 113222 123122 123221 223211 221132 221231 213212 223112 312131 311222 321122 321221 312212 322112 322211 212123 212321 232121 111323 131123 131321 112313 132113 132311 211313 231113 231311 112133 112331 132131 113123 113321 133121 313121 211331 231131 213113 213311 213131 311123 311321 331121 312113 312311 332111 314111 221411 431111 111224 111422 121124 121421 141122 141221 112214 112412 122114 122411 142112 142211 241211 221114 413111 241112 134111 111242 121142 121241 114212 124112 124211 411212 421112 421211 212141 214121 412121 111143 111341 131141 114113 114311 411113 411311 113141 114131 311141 411131 211412 211214 211232').split(' ').map(function (s) { return s.split('').map(Number); });
  var STOP = [2, 3, 3, 1, 1, 1, 2];

  // distance to a pattern, allowing bars to print or blur wider (and spaces narrower) by the same amount
  // d: how much wider bars print or blur than spaces (in modules), measured on the guard or start pattern
  function err(w, s, p, mods, d) {
    var t = tot(w, s, p.length), e = 0, sh = 0, i, n = [];
    d = d || 0; for (i = 0; i < p.length; i++) { n.push(p[i] + ((s + i) % 2 ? -d : d)); sh += n[i]; }
    for (i = 0; i < p.length; i++) e += Math.abs(w[s + i] * sh / t - n[i]);
    return e * mods / sh;
  }
  function fitD(w, s, p) { var bd = 9, bv = 0; for (var d = -0.8; d <= 0.81; d += 0.1) { var e = err(w, s, p, 11, d); if (e < bd) { bd = e; bv = d; } } return [bv, bd]; }
  function tot(w, s, n) { var t = 0; for (var i = 0; i < n; i++) t += w[s + i]; return t; }
  function errFit(w, s, p, mods, d0) { var m = 9; for (var d = d0 - 0.4; d <= d0 + 0.41; d += 0.1) { var e = err(w, s, p, mods, d); if (e < m) m = e; } return m; }
  function best(w, s, pats, mods, d) { d = d || 0; var b = -1, be = 9, b2 = 9; for (var i = 0; i < pats.length; i++) { var e = errFit(w, s, pats[i], mods, d); if (e < be) { b2 = be; be = e; b = i; } else if (e < b2) b2 = e; } return be < 1.3 && b2 - be > 0.25 ? [b, be] : null; }
  function guard(w, s, n, unit) { for (var i = 0; i < n; i++) { var r = w[s + i] / unit; if (r < 0.3 || r > 2) return false; } return true; }
  function inkD(w, i, unit) { return Math.max(-0.8, Math.min(0.8, ((w[i] + w[i + 2]) / 2 - w[i + 1]) / 2 / unit)); }

  // w: run widths, starting with a dark run at index 0, 2, 4…
  function ean13(w, i) {
    if (i + 59 > w.length) return '';
    var unit = tot(w, i, 59) / 95; if (!guard(w, i, 3, unit) || !guard(w, i + 27, 5, unit) || !guard(w, i + 56, 3, unit)) return '';
    if (i > 0 && w[i - 1] < unit * 3) return '';
    var d = [], par = '', k, r, ik = inkD(w, i, unit);
    for (k = 0; k < 6; k++) { var s = i + 3 + k * 4, a = best(w, s, EAN, 7, ik), g = best(w, s, EANG, 7, ik); if (a && (!g || a[1] <= g[1])) { d.push(a[0]); par += 'L'; } else if (g) { d.push(g[0]); par += 'G'; } else return ''; }
    for (k = 0; k < 6; k++) { r = best(w, i + 32 + k * 4, EAN, 7, ik); if (!r) return ''; d.push(r[0]); }
    var f = PAR.indexOf(par); if (f < 0) return '';
    d.unshift(f); return ck13(d) ? d.join('') : '';
  }
  function ean8(w, i) {
    if (i + 43 > w.length) return '';
    var unit = tot(w, i, 43) / 67; if (!guard(w, i, 3, unit) || !guard(w, i + 19, 5, unit) || !guard(w, i + 40, 3, unit)) return '';
    if (i > 0 && w[i - 1] < unit * 3) return '';
    var d = [], k, r, ik = inkD(w, i, unit);
    for (k = 0; k < 4; k++) { r = best(w, i + 3 + k * 4, EAN, 7, ik); if (!r) return ''; d.push(r[0]); }
    for (k = 0; k < 4; k++) { r = best(w, i + 24 + k * 4, EAN, 7, ik); if (!r) return ''; d.push(r[0]); }
    var s = 0; for (k = 0; k < 8; k++) s += d[k] * (k % 2 ? 1 : 3); return s % 10 === 0 ? d.join('') : '';
  }
  function ck13(d) { var s = 0; for (var k = 0; k < 13; k++) s += d[k] * (k % 2 ? 3 : 1); return s % 10 === 0; }
  function c128(w, i) {
    if (i + 6 + 6 + 7 > w.length) return '';
    var st = null, ik = 0; for (var q = 103; q <= 105; q++) { var f = fitD(w, i, C128[q]); if (f[1] < 1.2 && (!st || f[1] < st[1])) { st = [q, f[1]]; ik = f[0]; } } if (!st) return '';
    var unit = tot(w, i, 6) / 11; if (i > 0 && w[i - 1] < unit * 4) return '';
    var vals = [st[0]], p = i + 6;
    while (p + 7 <= w.length) {
      if (err(w, p, STOP, 13, ik) < 1.5 && Math.abs(tot(w, p, 7) / 13 - unit) < unit * 0.45) break;
      var r = best(w, p, C128, 11, ik); if (!r) return ''; var u2 = tot(w, p, 6) / 11; if (Math.abs(u2 - unit) > unit * 0.45) return '';
      vals.push(r[0]); p += 6; if (vals.length > 60) return '';
    }
    if (p + 7 > w.length || vals.length < 3) return '';
    var cs = vals[0]; for (var k = 1; k < vals.length - 1; k++) cs += k * vals[k];
    if (cs % 103 !== vals[vals.length - 1]) return '';
    var set = vals[0] === 103 ? 'A' : vals[0] === 104 ? 'B' : 'C', out = '', sh = false;
    for (k = 1; k < vals.length - 1; k++) {
      var v = vals[k], cur = sh ? (set === 'A' ? 'B' : 'A') : set; sh = false;
      if (cur === 'C') { if (v < 100) out += (v < 10 ? '0' : '') + v; else if (v === 100) set = 'B'; else if (v === 101) set = 'A'; continue; }
      if (v < 96) { out += cur === 'B' ? String.fromCharCode(v + 32) : String.fromCharCode(v < 64 ? v + 32 : v - 64); continue; }
      if (v === 98) sh = true; else if (v === 99) set = 'C'; else if (v === 100 && cur === 'A') set = 'B'; else if (v === 101 && cur === 'B') set = 'A';
    }
    return out.replace(/[\x00-\x1f]/g, '');
  }
  function fromRuns(w) {
    for (var i = 0; i < w.length - 18; i += 2) { var c = ean13(w, i) || ean8(w, i) || c128(w, i); if (c) return c; }
    return '';
  }
  // luminance line → run widths (dark first), with a local threshold
  function runs(L, sm) {
    var n = L.length, R = Math.max(6, Math.round(n / 60)), i, j, h = sm || 1;
    var S = new Float32Array(n); for (i = 0; i < n; i++) { var a = 0, c = 0; for (j = -h; j <= h; j++) { var q = L[Math.max(0, Math.min(n - 1, i + j))], wt = h + 1 - Math.abs(j); a += q * wt; c += wt; } S[i] = a / c; }
    var mn = 255, mx = 0; for (i = 0; i < n; i++) { if (S[i] < mn) mn = S[i]; if (S[i] > mx) mx = S[i]; }
    if (mx - mn < 40) return [];
    // threshold: middle of the local light and dark levels
    var T = new Float32Array(n), lo, hi;
    for (i = 0; i < n; i++) { lo = 255; hi = 0; for (j = Math.max(0, i - R); j <= Math.min(n - 1, i + R); j++) { if (S[j] < lo) lo = S[j]; if (S[j] > hi) hi = S[j]; } T[i] = hi - lo < Math.max(48, (mx - mn) * 0.3) ? -1 : (lo + hi) / 2; }
    var E = [], prev = S[0] < T[0];
    for (i = 1; i < n; i++) { var cur = S[i] < T[i]; if (cur !== prev) { var t = T[i] < 0 ? (S[i - 1] + S[i]) / 2 : T[i], dd = S[i - 1] - S[i], f = dd ? (S[i - 1] - t) / dd : 0.5; E.push({ x: i - 1 + Math.max(0, Math.min(1, f)), dark: cur }); prev = cur; } }
    var k0 = 0; while (k0 < E.length && !E[k0].dark) k0++;
    var w = []; for (i = k0 + 1; i < E.length; i++) w.push(E[i].x - E[i - 1].x);
    return w;
  }
  function tryLine(L) {
    for (var sm = 1; sm <= 2; sm++) {
      var w = runs(L, sm); if (w.length < 19) continue;
      var c = fromRuns(w); if (c) return c;
      var rv = w.length % 2 ? w.slice() : w.slice(0, -1); rv.reverse(); c = fromRuns(rv); if (c) return c;
    }
    return '';
  }
  function lum(d, W, x0, y0, dx, dy, n) { var L = new Uint8Array(n); for (var k = 0; k < n; k++) { var o = ((y0 + dy * k) * W + (x0 + dx * k)) * 4; L[k] = (d[o] * 2 + d[o + 1] * 5 + d[o + 2]) >> 3; } return L; }
  // Reads an ImageData; returns the code found on at least two lines (or one, if strict is false)
  function decode(img, strict) {
    var W = img.width, H = img.height, d = img.data, seen = {}, k, c;
    var rows = [0.5, 0.42, 0.58, 0.34, 0.66, 0.46, 0.54, 0.26, 0.74, 0.38, 0.62];
    for (k = 0; k < rows.length; k++) { c = tryLine(lum(d, W, 0, Math.round(H * rows[k]), 1, 0, W)); if (c) { seen[c] = (seen[c] || 0) + 1; if (!strict || seen[c] >= 2) return c; } }
    var cols = [0.5, 0.4, 0.6, 0.3, 0.7];
    for (k = 0; k < cols.length; k++) { c = tryLine(lum(d, W, Math.round(W * cols[k]), 0, 0, 1, H)); if (c) { seen[c] = (seen[c] || 0) + 1; if (!strict || seen[c] >= 2) return c; } }
    return '';
  }
  // product codes: UPC-A is EAN-13 with a leading 0, so compare digits without leading zeros
  function same(a, b) { a = String(a || '').trim(); b = String(b || '').trim(); if (!a || !b) return false; if (/^\d+$/.test(a) && /^\d+$/.test(b)) return a.replace(/^0+/, '') === b.replace(/^0+/, ''); return a.toLowerCase() === b.toLowerCase(); }
  root.FPBar = { decode: decode, same: same, _runs: runs, _fromRuns: fromRuns };
})(typeof window !== 'undefined' ? window : globalThis);

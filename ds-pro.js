/* DigitalSaudi — "All services" directory on Home.
   One clear map of everything in the app, grouped the same way as the Services tab, so every utility is
   easy to find. It only opens the existing tabs and groups; no utility is changed. */
(function () {
  'use strict';
  var DIR = [
    ['islamic', 'Islamic', 'mosque', 'Quran, 40 Hadith, prayer, Qibla', function () { switchTab('tools'); dsSvcShow('islamic'); }],
    ['money', 'Pi & money', 'coins', 'Wallet, send Pi, currency, Zakat', function () { switchTab('tools'); dsSvcShow('money'); }],
    ['travel', 'Travel & papers', 'luggage', 'Visas, documents, transport', function () { switchTab('tools'); dsSvcShow('travel'); }],
    ['work', 'Work & life', 'briefcase', 'Jobs, CV, banking, housing', function () { switchTab('tools'); dsSvcShow('work'); }],
    ['gov', 'Government', 'landmark', 'Absher, Nafath, Qiwa, Nusuk', function () { switchTab('tools'); dsSvcShow('gov'); }],
    ['live', 'Live', 'live', 'News, football, markets, weather', function () { switchTab('live'); }],
    ['explore', 'Explore', 'compass', 'Cities, experiences, Saudi guide', function () { switchTab('explore'); }],
    ['safety', 'Safety', 'shield', 'Emergency numbers, what to do', function () { switchTab('tools'); dsSvcShow('safety'); }],
    ['green', 'Green', 'leaf', 'Save water and power, recycling', function () { switchTab('tools'); dsSvcShow('green'); }]
  ];
  var tr = function (s) { try { return t(s); } catch (e) { return s; } };
  var icon = function (n) { try { return ico(n); } catch (e) { return ''; } };
  window.dsDirOpen = function (id) {
    var d = DIR.find(function (x) { return x[0] === id; }); if (!d) return;
    try { d[4](); } catch (e) {}
    try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch (e) { window.scrollTo(0, 0); }
  };
  function build() {
    if (document.getElementById('dsDir')) return;
    var qa = document.getElementById('quickActions'); if (!qa) return;
    var box = document.createElement('div'); box.id = 'dsDir'; box.className = 'ds-dir';
    box.innerHTML =
      '<div class="ds-dir-h"><h2>' + esc(tr('All services')) + '</h2><span>' + esc(tr('Everything in one place')) + '</span></div>' +
      '<button type="button" class="ds-dir-q" onclick="openSearch()">' + icon('search') + '<span>' + esc(tr('Search services, guides and tools')) + '</span></button>' +
      '<div class="ds-dir-g">' + DIR.map(function (d) {
        return '<button type="button" class="ds-dir-t ds-c-' + d[0] + '" onclick="dsDirOpen(\'' + d[0] + '\')"><i>' + icon(d[2]) + '</i><b>' + esc(tr(d[1])) + '</b><small>' + esc(tr(d[3])) + '</small></button>';
      }).join('') + '</div>';
    qa.parentNode.insertBefore(box, qa.nextSibling);
  }
  var _enter = enterApp;
  enterApp = function () { var r = _enter.apply(this, arguments); setTimeout(build, 60); return r; };
  if (document.getElementById('app') && getComputedStyle(document.getElementById('app')).display !== 'none') setTimeout(build, 60);
})();

/* ── Focus: no AI assistant and no map/GPS place finder (removed); Wallet in the centre;
      everything opens inside the Pi Browser; full-screen news reader and photos. ── */
(function () {
  'use strict';
  var GONE = ['ai', 'nearMe', 'hotels', 'food', 'savedPlaces'];
  try {
    GONE.forEach(function (id) { try { delete META[id]; } catch (e) {} PANELS[id] = function () { openItem('piWallet'); }; });
    window.openAI = function () { openItem('piWallet'); };
    window.openMap = function () { switchTab('explore'); };
    ['mapper', 'hotelier', 'foodie', 'aiChat'].forEach(function (k) {
      try { for (var i = BADGES.length - 1; i >= 0; i--) { var b = BADGES[i]; if ((b && (b.id === k || b[0] === k))) BADGES.splice(i, 1); } } catch (e) {}
      try { delete BADGE_HOW[k]; } catch (e) {}
    });
    Object.keys(PERSONA_QA).forEach(function (k) {
      var pool = ['piWallet', 'quran', 'hadith40', 'converter', 'qibla', 'duas'], L = PERSONA_QA[k].filter(function (id) { return GONE.indexOf(id) < 0; });
      pool.forEach(function (id) { if (L.length < 6 && L.indexOf(id) < 0) L.push(id); }); PERSONA_QA[k] = L;
    });
  } catch (e) {}
  // remove any leftover button that leads to the AI assistant or the map
  var SEL = '[onclick*="openAI("],[onclick*="openMap("],[onclick*="srGo(\'map\'"],[onclick*="srGo(\'ai\'"],.sr-ai,' + GONE.map(function (id) { return '[onclick*="openItem(\'' + id + '\')"]'; }).join(',');
  function sweep(root) { try { (root || document).querySelectorAll(SEL).forEach(function (el) { if (!el.closest('#nav')) el.remove(); }); } catch (e) {} }
  var mo = new MutationObserver(function (list) { for (var i = 0; i < list.length; i++) if (list[i].addedNodes.length) { sweep(); break; } });
  function start() { sweep(); mo.observe(document.body, { childList: true, subtree: true }); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();

  // keep every web link inside the Pi Browser (no jump to another browser)
  window.dsOpenExt = function (url) {
    if (/^(sms|mailto|tel):/.test(url)) { var a = document.createElement('a'); a.href = url; document.body.appendChild(a); a.click(); a.remove(); return; }
    if (/^https?:\/\//.test(url)) location.assign(url);
  };
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]'); if (!a) return;
    var h = a.getAttribute('href') || '';
    if (a.target === '_blank' && /^https?:\/\//.test(h) && !a.hasAttribute('download')) { e.preventDefault(); location.assign(h); }
  }, true);

  // news: full-screen reader and tap a photo to see it full screen
  var _art = window.openArticle;
  if (typeof _art === 'function') window.openArticle = function () { var r = _art.apply(this, arguments); try { document.getElementById('panel').classList.add('ds-full'); var n = document.querySelector('#pBody .reader > .small:last-child'); if (n && /Pi Browser/.test(n.textContent)) n.remove(); } catch (e) {} return r; };
  var _show = window.showPanel;
  window.showPanel = function (t, h, o) { try { document.getElementById('panel').classList.toggle('ds-full', !!(o && /^(article|quran|surah|hadith40)$/.test(o.id))); } catch (e) {} return _show.apply(this, arguments); };
  window.dsViewImg = function (src) {
    var v = document.getElementById('dsImgV'); if (v) v.remove();
    v = document.createElement('div'); v.id = 'dsImgV'; v.setAttribute('role', 'dialog');
    v.innerHTML = '<img alt=""><button type="button" aria-label="Close">✕</button>'; v.querySelector('img').src = src;
    v.onclick = function () { v.remove(); }; document.body.appendChild(v);
  };
  document.addEventListener('click', function (e) {
    var im = e.target.closest && e.target.closest('#pBody img.reader-img, #pBody .reader img'); if (!im || !im.src) return;
    e.preventDefault(); e.stopPropagation(); dsViewImg(im.currentSrc || im.src);
  }, true);
})();

/* DigitalSaudi languages. The interface is written in English; this layer shows it in the chosen language.
   Receipts, invoices, statements and reports stay in English so every document reads the same everywhere. */
(function () {
  'use strict';
  var LANGS = { en: 'English' };
  var D = {}, lang = 'en';
  function saved() { try { var v = JSON.parse(localStorage.getItem('dsw_v1_lang') || 'null'); return LANGS[v] ? v : ''; } catch (e) { return ''; } }
  function auto() { var l = String((navigator.languages && navigator.languages[0]) || navigator.language || '').slice(0, 2).toLowerCase(); return 'en'; }
  lang = saved() || auto();
  var FPL = window.FPL = {
    LANGS: LANGS, lang: function () { return lang; },
    add: function (l, d) { if (l === lang) D = d; },
    t: function (s) { var k = String(s == null ? '' : s).trim(); return (k && D[k]) || s; },
    set: function (l) { if (!LANGS[l]) return; try { localStorage.setItem('dsw_v1_lang', JSON.stringify(l)); } catch (e) {} location.reload(); },
    sheet: sheet
  };
  document.documentElement.lang = lang;
  if (lang === 'ar') document.documentElement.dir = 'rtl';
  if (lang !== 'en') document.write('<script src="wallet-i18n/' + lang + '.js?v=6"><\/script>');

  // the greeting carries the user's name, so it is matched by its start
  var PRE = ['Good morning', 'Good afternoon', 'Good evening'];
  // "12 payments", "9 left", "3 open": the number stays, the word is translated
  var CNT = /^(\d[\d.,]*) (payments?|left|open|overdue|sales?|entry|entries|waiting|in stock|contributions?|invoices?)$/;
  function one(k) {
    if (D[k]) return D[k];
    var m = CNT.exec(k), w = D['@w'] || {}; if (m && w[m[2]]) return m[1] + ' ' + w[m[2]];
    return null;
  }
  function tr(s) {
    var k = s.trim(); if (!k || typeof D['Home'] !== 'string') return null;
    var v = one(k); if (v) return s.replace(k, v);
    for (var i = 0; i < PRE.length; i++) if (k.indexOf(PRE[i] + ',') === 0 && D[PRE[i]]) return s.replace(PRE[i], D[PRE[i]]);
    // labels joined with " · " are translated part by part
    if (k.indexOf(' · ') > 0) { var parts = k.split(' · '), hit = false; parts = parts.map(function (x) { var t = one(x); if (t) { hit = true; return t; } return x; }); if (hit) return s.replace(k, parts.join(' · ')); }
    return null;
  }
  function node(n) {
    if (n.nodeType === 3) { var p = n.parentNode; if (!p || /^(SCRIPT|STYLE|TEXTAREA)$/.test(p.nodeName) || (p.closest && p.closest('[data-noi18n]'))) return; var v = tr(n.nodeValue); if (v !== null && v !== n.nodeValue) n.nodeValue = v; return; }
    if (n.nodeType !== 1) return;
    if (n.getAttribute('data-i18n') === 'hero' && D['@hero']) { if (n.innerHTML !== D['@hero']) n.innerHTML = D['@hero']; return; }
    ['placeholder', 'aria-label', 'title'].forEach(function (a) { var v = n.getAttribute(a); if (v) { var t = tr(v); if (t !== null && t !== v) n.setAttribute(a, t); } });
    var w = document.createTreeWalker(n, 5), c; // elements and text
    while ((c = w.nextNode())) {
      if (c.nodeType === 3) node(c);
      else if (c.nodeType === 1) { if (c.getAttribute('data-i18n') === 'hero' && D['@hero']) { if (c.innerHTML !== D['@hero']) c.innerHTML = D['@hero']; } ['placeholder', 'aria-label', 'title'].forEach(function (a) { var v = c.getAttribute(a); if (v) { var t = tr(v); if (t !== null && t !== v) c.setAttribute(a, t); } }); }
    }
  }
  var obs = null;
  function watch() {
    if (obs || lang === 'en') return;
    obs = new MutationObserver(function (ms) {
      if (!Object.keys(D).length) return;
      ms.forEach(function (m) {
        if (m.type === 'characterData') node(m.target);
        else if (m.type === 'attributes') node(m.target);
        else m.addedNodes.forEach(node);
      });
    });
    obs.observe(document.documentElement, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ['placeholder', 'aria-label', 'title'] });
  }
  watch(); // translates the page while it loads, before it is shown
  function start() { if (lang !== 'en' && document.body && Object.keys(D).length) node(document.body); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();

  // language picker (works before and after sign-in)
  function sheet() {
    var w = document.createElement('div'); w.className = 'sh-wrap';
    w.innerHTML = '<div class="sh" role="dialog" aria-modal="true" aria-label="Language"><div class="sh-h"><h2>Language</h2><button type="button" class="sh-x" aria-label="Close"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button></div><div class="list" data-noi18n>' +
      Object.keys(LANGS).map(function (k) { return '<button type="button" class="li lg-li' + (k === lang ? ' on' : '') + '" data-lg="' + k + '" lang="' + k + '"' + (k === 'ar' ? ' dir="rtl"' : '') + '><span class="grow"><b>' + LANGS[k] + '</b></span>' + (k === lang ? '<span class="lg-ok">✓</span>' : '') + '</button>'; }).join('') + '</div></div>';
    w.addEventListener('click', function (e) { if (e.target === w || e.target.closest('.sh-x')) w.remove(); var b = e.target.closest('[data-lg]'); if (b) { if (b.dataset.lg === lang) w.remove(); else FPL.set(b.dataset.lg); } });
    document.body.appendChild(w);
  }
})();

// Theme dropdown, scrollbar-style dropdown, scroll progress bar and back-to-top button.
(function () {
  var doc = document.documentElement;
  var dataEl = document.getElementById('hb-themes');
  if (!dataEl) return;

  var themes = [];
  try { themes = JSON.parse(dataEl.textContent); } catch (e) {}
  var defaultPack = dataEl.getAttribute('data-default') || (themes[0] && themes[0].id) || '';

  function store(key, val) { try { localStorage.setItem(key, val); } catch (e) {} }
  function load(key) { try { return localStorage.getItem(key); } catch (e) { return null; } }

  // Put the featured themes first, then the built-in packs alphabetically.
  var featured = ['bmw-m', 'ferrari', 'mclaren', 'phthalo', 'northwestern', 'raceday', 'transformers', 'redbull'];
  themes.sort(function (a, b) {
    var ia = featured.indexOf(a.id), ib = featured.indexOf(b.id);
    if (ia === -1 && ib === -1) return a.label.localeCompare(b.label);
    if (ia === -1) return 1;
    if (ib === -1) return -1;
    return ia - ib;
  });

  function themeById(id) {
    for (var i = 0; i < themes.length; i++) if (themes[i].id === id) return themes[i];
    return themes[0];
  }

  function applyTheme(id) {
    var t = themeById(id);
    if (!t) return;
    doc.setAttribute('data-theme-pack', t.id);
    if (t.mode === 'light') doc.classList.remove('dark'); else doc.classList.add('dark');
    updateThemeButton(t);
    markActive('hb-theme-menu', t.id);
    updateToTop(t.id);
  }

  // ── Back-to-top button: fixed at the right edge, with a different icon per theme ──
  var ARROW = '<svg viewBox="0 0 32 32" width="26" height="26" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 26V7M7 15l9-9 9 9"/></svg>';
  var CHEV2 = '<svg viewBox="0 0 32 32" width="26" height="26" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17l9-9 9 9M7 26l9-9 9 9"/></svg>';
  var TOPICONS = {
    // Autobot-style emblem (own simplified drawing): angular red helmet, yellow visor, silver mouth plate
    'transformers': '<svg viewBox="0 0 32 32" width="34" height="34" aria-hidden="true"><polygon points="16,2 21,6 28,5 25,14 22,26 16,30 10,26 7,14 4,5 11,6" fill="#e8252c" stroke="#000" stroke-width="2" stroke-linejoin="round"/><polygon points="8.5,13 14,15.5 14,18 9.5,16.5" fill="#ffd21f" stroke="#000" stroke-width="1.2"/><polygon points="23.5,13 18,15.5 18,18 22.5,16.5" fill="#ffd21f" stroke="#000" stroke-width="1.2"/><polygon points="12.5,21 19.5,21 18,26 14,26" fill="#cfd6e4" stroke="#000" stroke-width="1.4" stroke-linejoin="round"/><path d="M12.5 10.5L16 7l3.5 3.5" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    'bmw-m': ARROW,
    'ferrari': ARROW,
    'mclaren': '<svg viewBox="0 0 32 32" width="28" height="28" fill="none" stroke="currentColor" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 25C9 12 18 7 27 8"/><path d="M19 4l8 4-5 8"/></svg>',
    'phthalo': '<svg viewBox="0 0 32 32" width="26" height="26" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 27V8M8 15l8-8 8 8"/><path d="M10 27h12"/></svg>',
    'northwestern': CHEV2,
    'raceday': '<svg viewBox="0 0 32 32" width="26" height="26" fill="none" stroke="#d7191f" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 26V7M7 15l9-9 9 9"/></svg>',
    'redbull': '<svg viewBox="0 0 32 32" width="28" height="28" fill="currentColor" aria-hidden="true"><path d="M16 3L28 17h-7v12H11V17H4z"/></svg>',
    'coffee': '<svg viewBox="0 0 32 32" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 14h17v7a6 6 0 0 1-6 6h-5a6 6 0 0 1-6-6z"/><path d="M23 16h2.5a3 3 0 0 1 0 6H23"/><path d="M11 4c-2 2 2 3 0 6M16 4c-2 2 2 3 0 6M21 4c-2 2 2 3 0 6"/></svg>',
    'contrast': ARROW,
    'cupcake': '<svg viewBox="0 0 32 32" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 17h16l-2 11H10z"/><path d="M7 17c-2-5 2-7 4-7 0-4 8-5 10-1 4 0 5 5 3 8z"/><circle cx="16" cy="5" r="1.6" fill="currentColor"/></svg>',
    'dracula': '<svg viewBox="0 0 32 32" width="30" height="30" fill="currentColor" aria-hidden="true"><path d="M2 11c4-4 9-3 11 2l3-3 3 3c2-5 7-6 11-2-1 6-4 9-8 9l-3 6-3-6c-4 0-9-3-14-9z"/><circle cx="12.5" cy="15" r="1.2" fill="#000"/><circle cx="19.5" cy="15" r="1.2" fill="#000"/></svg>',
    'marine': '<svg viewBox="0 0 32 32" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="16" cy="7" r="3"/><path d="M16 10v17M9 15h14M6 21c1 4 5 6 10 6s9-2 10-6"/></svg>',
    'matcha': '<svg viewBox="0 0 32 32" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 27C5 14 12 6 27 5c0 14-7 21-20 21"/><path d="M5 27L18 14"/></svg>',
    'minimal': ARROW,
    'retro': '<svg viewBox="0 0 16 16" width="28" height="28" shape-rendering="crispEdges" fill="currentColor" aria-hidden="true"><rect x="7" y="2" width="2" height="2"/><rect x="5" y="4" width="6" height="2"/><rect x="3" y="6" width="10" height="2"/><rect x="6" y="8" width="4" height="6"/></svg>',
    'solar': '<svg viewBox="0 0 32 32" width="30" height="30" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><circle cx="16" cy="16" r="6"/><path d="M16 2v4M16 26v4M2 16h4M26 16h4M6 6l3 3M23 23l3 3M26 6l-3 3M9 23l-3 3"/></svg>',
    'synthwave': '<svg viewBox="0 0 32 32" width="26" height="26" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 5l11 20H5z"/><path d="M16 14v6"/></svg>'
  };

  var toTopBtn = null;
  function ensureToTop() {
    if (toTopBtn) return toTopBtn;
    toTopBtn = document.createElement('button');
    toTopBtn.type = 'button';
    toTopBtn.id = 'hb-to-top';
    toTopBtn.className = 'hb-to-top';
    toTopBtn.setAttribute('aria-label', 'Back to top');
    toTopBtn.title = 'Back to top';
    toTopBtn.innerHTML = '<span class="hb-ttt-shape"><span class="hb-ttt-icon"></span></span>';
    toTopBtn.addEventListener('click', function () {
      toTopBtn.classList.add('is-launching');
      setTimeout(function () { toTopBtn.classList.remove('is-launching'); }, 700);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    document.body.appendChild(toTopBtn);
    return toTopBtn;
  }
  function updateToTop(id) {
    var b = ensureToTop();
    b.setAttribute('data-icon', id);
    var html = TOPICONS[id] || ARROW;
    // Robots in Disguise: Autobot emblem by default, switches to the Decepticon emblem on hover
    if (id === 'transformers' && dataEl.getAttribute('data-autobot') && dataEl.getAttribute('data-decepticon')) {
      html = '<img class="hb-logo hb-logo-auto" alt="" src="' + dataEl.getAttribute('data-autobot') + '">' +
             '<img class="hb-logo hb-logo-decep" alt="" src="' + dataEl.getAttribute('data-decepticon') + '">';
    }
    b.querySelector('.hb-ttt-icon').innerHTML = html;
  }

  var scrollStyles = [
    { id: 'default', label: 'Default', note: 'Browser standard' },
    { id: 'slim', label: 'Slim accent', note: 'Thin, theme colour' },
    { id: 'racing', label: 'Racing stripe', note: 'Gradient with track lines' },
    { id: 'chequered', label: 'Chequered flag', note: 'Black and white squares' },
    { id: 'neon', label: 'Neon glow', note: 'Glowing thumb' },
    { id: 'cel', label: 'Cel-shaded', note: 'Thick outline, flat shadow' },
    { id: 'progress', label: 'Progress bar', note: 'Hidden bar, line at top' }
  ];

  function applyScroll(id) {
    doc.setAttribute('data-scroll', id);
    store('hb-scroll-style', id);
    var b = document.getElementById('hb-scroll-btn-label');
    for (var i = 0; i < scrollStyles.length; i++) if (scrollStyles[i].id === id && b) b.textContent = scrollStyles[i].label;
    markActive('hb-scroll-menu', id);
  }

  function markActive(menuId, id) {
    var m = document.getElementById(menuId);
    if (!m) return;
    var items = m.querySelectorAll('[data-id]');
    for (var i = 0; i < items.length; i++) {
      var on = items[i].getAttribute('data-id') === id;
      items[i].classList.toggle('is-active', on);
      items[i].setAttribute('aria-checked', on ? 'true' : 'false');
    }
  }

  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }

  function swatch(t) {
    return '<span class="hb-sw" style="background:' + t.bg + '"><i style="background:' + t.p + '"></i><i style="background:' + t.s + '"></i></span>';
  }

  var themeBtnLabel, themeBtnSw;
  function updateThemeButton(t) {
    if (themeBtnLabel) themeBtnLabel.textContent = t.label;
    if (themeBtnSw) themeBtnSw.innerHTML = swatch(t);
  }

  function build() {
    var host = el('div', 'hb-controls');

    // Theme dropdown
    var themeWrap = el('div', 'hb-dd');
    var themeBtn = el('button', 'hb-dd-btn',
      '<span class="hb-btn-sw"></span><span class="hb-btn-label"></span><svg viewBox="0 0 20 20" width="14" height="14" fill="currentColor" aria-hidden="true"><path d="M5.5 7.5l4.5 4.5 4.5-4.5z"/></svg>');
    themeBtn.type = 'button';
    themeBtn.setAttribute('aria-haspopup', 'menu');
    themeBtnSw = themeBtn.querySelector('.hb-btn-sw');
    themeBtnLabel = themeBtn.querySelector('.hb-btn-label');
    var themeMenu = el('div', 'hb-dd-menu hb-theme-menu');
    themeMenu.id = 'hb-theme-menu';
    themeMenu.setAttribute('role', 'menu');
    themeMenu.appendChild(el('div', 'hb-dd-title', 'Themes <span>' + themes.length + '</span>'));
    var grid = el('div', 'hb-theme-grid');
    themes.forEach(function (t) {
      var item = el('button', 'hb-theme-item',
        '<span class="hb-prev" style="background:' + t.bg + ';color:' + t.fg + '">' +
          '<span class="hb-prev-head" style="background:' + t.head + '"></span>' +
          '<span class="hb-prev-stripes"><i style="background:' + t.p + '"></i><i style="background:' + t.s + '"></i></span>' +
          '<span class="hb-prev-lines"><b style="background:' + t.fg + '"></b><b style="background:' + t.fg + '"></b></span>' +
          '<span class="hb-prev-dot" style="background:' + t.p + '"></span>' +
        '</span><span class="hb-theme-name">' + t.label + '</span>');
      item.type = 'button';
      item.setAttribute('data-id', t.id);
      item.setAttribute('role', 'menuitemradio');
      item.addEventListener('click', function () { applyTheme(t.id); });
      grid.appendChild(item);
    });
    themeMenu.appendChild(grid);
    themeWrap.appendChild(themeBtn);
    themeWrap.appendChild(themeMenu);

    // (The theme dropdown is no longer shown: the site stays on BMW M until a visitor types TRANSFORM.)

    // Resume download button (replaces the "Open menu" hamburger)
    var resumeUrl = dataEl.getAttribute('data-resume');
    if (resumeUrl) {
      var resume = el('a', 'hb-resume', '<span>Resume</span>');
      resume.href = resumeUrl;
      resume.setAttribute('download', 'Govindarajula_Adarsh_Resume.pdf');
      resume.setAttribute('aria-label', 'Download resume');
      host.appendChild(resume);
    }

    // Open / close behaviour
    var wraps = [themeWrap];
    function closeAll(except) { wraps.forEach(function (w) { if (w !== except) w.classList.remove('is-open'); }); }
    themeBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      themeWrap.classList.toggle('is-open');
    });
    document.addEventListener('click', function (e) { if (!host.contains(e.target)) closeAll(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeAll(); });

    // Mount into the header, on the right
    var header = document.querySelector('header') || document.querySelector('nav');
    if (header) {
      header.style.position = header.style.position || 'sticky';
      header.appendChild(host);
    } else {
      host.classList.add('hb-controls-float');
      document.body.appendChild(host);
    }
  }

  // Scroll progress bar + back-to-top
  function wireScroll() {
    var bar = document.getElementById('hb-progress');
    function onScroll() {
      var h = doc.scrollHeight - doc.clientHeight;
      var pct = h > 0 ? (window.scrollY / h) * 100 : 0;
      if (bar) bar.style.width = pct + '%';
      var b = ensureToTop();
      b.style.setProperty('--prog', pct.toFixed(1));
      b.classList.toggle('is-visible', window.scrollY > 320);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Company badge on project pages: move it right under the page title
  function placeCompanyBadge() {
    var badge = document.getElementById('hb-company');
    var h1 = document.querySelector('article h1');
    if (!badge || !h1) return;
    h1.insertAdjacentElement('afterend', badge);
    badge.hidden = false;
  }

  // Ruby on Rails: use the Rails logo image instead of the generic icon
  function railsLogo() {
    var sk = document.getElementById('skills');
    if (!sk) return;
    var nodes = sk.querySelectorAll('*');
    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      if (n.children.length === 0 && n.textContent.trim() === 'Ruby on Rails') {
        var card = n.parentElement;
        while (card && !card.querySelector('svg, img') && card !== sk) card = card.parentElement;
        var icon = card && card.querySelector('svg, img');
        if (icon) {
          var img = document.createElement('img');
          img.src = '/img/skills/rails.png';
          img.alt = 'Ruby on Rails';
          img.className = 'hb-rails-logo';
          icon.replaceWith(img);
        }
        break;
      }
    }
  }

  // Contact: no click-to-copy / send button; just LinkedIn, GitHub and a mail icon that opens Gmail
  function tuneContact() {
    var c = document.getElementById('contact');
    if (!c) return;
    var email = dataEl.getAttribute('data-email');
    var copyBtn = c.querySelector('button[class*="group"]');
    if (copyBtn) { var box = copyBtn.closest('.relative') || copyBtn; box.remove(); }
    var links = c.querySelectorAll('a');
    for (var i = 0; i < links.length; i++) if (/send a message/i.test(links[i].textContent)) links[i].remove();
    var heads = c.querySelectorAll('h4');
    var row = null;
    for (var j = 0; j < heads.length; j++) if (/find me on/i.test(heads[j].textContent)) row = heads[j].nextElementSibling;
    if (row && email && !row.querySelector('.hb-mail-link')) {
      var first = row.querySelector('a');
      var mail = document.createElement('a');
      mail.className = (first ? first.className : '') + ' hb-mail-link';
      mail.href = 'https://mail.google.com/mail/?view=cm&fs=1&to=' + encodeURIComponent(email);
      mail.target = '_blank';
      mail.rel = 'noopener';
      mail.title = 'Email me on Gmail';
      mail.setAttribute('aria-label', 'Email me on Gmail');
      mail.innerHTML = '<div class="text-gray-600 dark:text-gray-300"><svg viewBox="0 0 24 24" class="w-7 h-7" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg></div>';
      row.insertBefore(mail, row.firstChild);
    }
  }

  // Section buttons beside the name
  function buildSecNav() {
    var nav = document.querySelector('header nav');
    var brandWrap = nav && nav.querySelector('.order-0');
    if (!brandWrap) return;
    var sections = [['Projects', 'projects'], ['Skills', 'skills'], ['Experience', 'experience'], ['Contact', 'contact']];
    var wrap = el('div', 'hb-secnav');
    sections.forEach(function (s) {
      var a = el('a', null, s[0]);
      a.href = '/#' + s[1];
      a.setAttribute('data-sec', s[1]);
      wrap.appendChild(a);
    });
    var host = document.querySelector('.hb-controls');
    if (host) host.insertBefore(wrap, host.firstChild); // section buttons sit on the right, before Resume
    else brandWrap.insertAdjacentElement('afterend', wrap);
    if ('IntersectionObserver' in window) {
      var links = wrap.querySelectorAll('a');
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          for (var i = 0; i < links.length; i++) links[i].classList.toggle('is-active', links[i].getAttribute('data-sec') === en.target.id);
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      sections.forEach(function (s) { var t = document.getElementById(s[1]); if (t) io.observe(t); });
    }
  }

  // ── Easter egg: typing TRANSFORM (capitals) switches the site to the Robots in Disguise theme ──
  // The transformed theme follows you from page to page (opening a project keeps it),
  // but a reload goes back to the default theme.
  function keepTransformed() { try { sessionStorage.setItem('hb-transformed', '1'); } catch (e) {} }
  function restoreTransformed() {
    var nav = (performance.getEntriesByType && performance.getEntriesByType('navigation')[0]) || {};
    try {
      if (nav.type === 'reload') { sessionStorage.removeItem('hb-transformed'); return false; }
      return sessionStorage.getItem('hb-transformed') === '1';
    } catch (e) { return false; }
  }
  // Clicking the name in the header goes home and returns to the default theme
  function wireBrandReset() {
    var brand = document.querySelector('.navbar-brand');
    if (!brand) return;
    brand.addEventListener('click', function () {
      try { sessionStorage.removeItem('hb-transformed'); } catch (e) {}
      transformed = false;
      typed = '';
      applyTheme(defaultPack);
    });
  }
  var SECRET = 'TRANSFORM';
  var typed = '';
  var transformed = false;

  function transformFx() {
    if (transformed) return;
    transformed = true;
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { applyTheme('transformers'); keepTransformed(); return; }
    var logo = dataEl.getAttribute('data-autobot');
    var o = el('div', 'hb-xform',
      '<div class="hb-xform-panel hb-xl"></div><div class="hb-xform-panel hb-xr"></div>' +
      '<div class="hb-xform-core">' + (logo ? '<img alt="" src="' + logo + '">' : '') + '<b>TRANSFORM</b><small>Autobots, roll out!</small></div>');
    document.body.appendChild(o);
    document.body.classList.add('hb-shake');
    requestAnimationFrame(function () { o.classList.add('is-in'); });
    setTimeout(function () { applyTheme('transformers'); keepTransformed(); }, 750);
    setTimeout(function () { o.classList.add('is-out'); document.body.classList.remove('hb-shake'); }, 1500);
    setTimeout(function () { o.remove(); }, 2300);
  }

  document.addEventListener('keydown', function (e) {
    if (e.ctrlKey || e.metaKey || e.altKey || e.key.length !== 1) return;
    var t = e.target;
    if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
    var ch = e.key;
    var caps = e.getModifierState && e.getModifierState('CapsLock');
    if (e.shiftKey && !caps) ch = ch.toUpperCase(); // Shift held = capital letter
    typed = (typed + ch).slice(-SECRET.length);
    if (typed === SECRET) { typed = ''; transformFx(); }
  });

  try { localStorage.removeItem('hb-theme-pack'); } catch (e) {} // always start on the default theme
  build();
  buildSecNav();
  wireBrandReset();
  placeCompanyBadge();
  railsLogo();
  tuneContact();
  if (restoreTransformed()) { transformed = true; applyTheme('transformers'); } else { applyTheme(defaultPack); }
  doc.setAttribute('data-scroll', 'slim'); // single scrollbar style: Slim accent
  wireScroll();
})();

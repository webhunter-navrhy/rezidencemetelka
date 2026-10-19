// Rezidence Metelka: hlavička, menu, reveal, řez domem, půdorys, filtr ceníku, formulář.
(function () {
  var d = document;

  // hlavička po odscrollování + mobilní menu
  var hl = d.querySelector('[data-hlavicka]');
  var naScroll = function () { hl.classList.toggle('je-dole', window.scrollY > 24); };
  naScroll(); window.addEventListener('scroll', naScroll, { passive: true });
  var burger = d.querySelector('[data-burger]'), menu = d.getElementById('menu');
  var zavri = function () { burger.setAttribute('aria-expanded', 'false'); menu.classList.remove('je-otevrene'); d.body.classList.remove('menu-otevrene'); };
  burger.addEventListener('click', function () {
    var otevrit = burger.getAttribute('aria-expanded') !== 'true';
    burger.setAttribute('aria-expanded', String(otevrit)); menu.classList.toggle('je-otevrene', otevrit); d.body.classList.toggle('menu-otevrene', otevrit);
  });
  menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', zavri); });
  d.addEventListener('keydown', function (e) { if (e.key === 'Escape') zavri(); });

  // reveal + kreslení řezu
  var cile = d.querySelectorAll('[data-reveal], [data-rez]');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (zaznamy) {
      zaznamy.forEach(function (z) { if (z.isIntersecting) { z.target.classList.add('is-in'); io.unobserve(z.target); } });
    }, { rootMargin: '0px 0px -12% 0px' });
    cile.forEach(function (el) { io.observe(el); });
  } else { cile.forEach(function (el) { el.classList.add('is-in'); }); }

  // půdorys: místnost v plánu <-> záložky
  var p = d.querySelector('[data-pudorys]');
  if (p) {
    var vyber = function (id) {
      p.querySelectorAll('[role="tab"]').forEach(function (t) {
        var ano = t.dataset.mistnost === id;
        t.setAttribute('aria-selected', String(ano)); t.tabIndex = ano ? 0 : -1;
        d.getElementById(t.getAttribute('aria-controls')).hidden = !ano;
      });
      p.querySelectorAll('polygon').forEach(function (pl) { pl.classList.toggle('je-aktivni', pl.dataset.mistnost === id); });
    };
    p.querySelectorAll('[data-mistnost]').forEach(function (el) { el.addEventListener('click', function () { vyber(el.dataset.mistnost); }); });
    var taby = Array.prototype.slice.call(p.querySelectorAll('[role="tab"]'));
    p.querySelector('[role="tablist"]').addEventListener('keydown', function (e) {
      var i = taby.indexOf(d.activeElement); if (i < 0) return;
      var n = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? -1 : 0;
      if (!n) return; e.preventDefault();
      var t = taby[(i + n + taby.length) % taby.length]; t.focus(); vyber(t.dataset.mistnost);
    });
    vyber(taby[0].dataset.mistnost);
  }

  // filtr ceníku
  var f = d.querySelector('[data-filtr]');
  if (f) {
    var stav = { dum: '', podlazi: '' }, radky = d.querySelectorAll('.tabulka tbody tr'), pocet = f.querySelector('[data-pocet]');
    f.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      stav[b.dataset.f] = b.dataset.v;
      f.querySelectorAll('[data-f="' + b.dataset.f + '"]').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
      var n = 0;
      radky.forEach(function (r) {
        var ok = (!stav.dum || r.dataset.dum === stav.dum) && (!stav.podlazi || r.dataset.podlazi === stav.podlazi);
        r.hidden = !ok; if (ok) n++;
      });
      pocet.textContent = n;
    });
  }

  // „Mám zájem“ předvyplní byt ve formuláři
  var poleByt = d.querySelector('[data-pole-byt]');
  d.querySelectorAll('[data-zajem]').forEach(function (a) {
    a.addEventListener('click', function () {
      if (!poleByt) return;
      poleByt.value = a.dataset.zajem;
      var form = poleByt.form; form.classList.remove('je-zvyrazneny'); void form.offsetWidth; form.classList.add('je-zvyrazneny');
    });
  });

  // formulář: demo režim neodesílá nic, ostrý režim posílá na endpoint ze site.json
  d.querySelectorAll('form.formular').forEach(function (fm) {
    var st = fm.querySelector('.formular-stav');
    fm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (fm.querySelector('.past input').value) return;
      var endpoint = fm.getAttribute('data-endpoint'), demo = fm.getAttribute('data-demo') === '1';
      if (demo || !endpoint) { st.textContent = 'Ukázka formuláře: nic se neodesílá. Po spuštění webu přijde poptávka e-mailem.'; return; }
      st.textContent = 'Odesílám…';
      fetch(endpoint, { method: 'POST', body: new FormData(fm), headers: { Accept: 'application/json' } })
        .then(function (r) { if (!r.ok) throw new Error(r.status); fm.reset(); st.textContent = 'Děkujeme, ozveme se vám.'; })
        .catch(function () { st.textContent = 'Odeslání se nepodařilo. Zkuste to prosím znovu.'; });
    });
  });
})();

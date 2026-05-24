/*
  Nutribox · Giveaway Forma · standalone bundle
  =============================================
  Embed snippet (paste u Webflow Embed Code element):

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&display=swap">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/intl-tel-input@20.3.0/build/css/intlTelInput.min.css">
    <link rel="stylesheet" href="https://[your-host]/nutribox-giveaway.css?v=2">

    <div id="nb-giveaway"></div>

    <script src="https://cdn.jsdelivr.net/npm/intl-tel-input@20.3.0/build/js/intlTelInput.min.js"></script>
    <script src="https://[your-host]/nutribox-giveaway.js?v=2"></script>
*/

(function () {
  'use strict';

  // ====================== CONFIG ======================

  var CONFIG = {
    FORM_ID: 'nutribox-giveaway-2026',
    WEBHOOK_URL: 'https://hook.eu2.make.com/hxj3ha7bdjvyulslglo6skiadwz4uead',
    THANKYOU_URL: 'https://www.nutribox.rs/giveaway/maj-2026-uspesna-prijava',
    ITI_UTILS_URL: 'https://cdn.jsdelivr.net/npm/intl-tel-input@20.3.0/build/js/utils.js',
    META_PIXEL_ID: '1620244502475061'
  };

  var SCREENS = ['intro', 'q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'kontakt'];
  var TOTAL_STEPS = SCREENS.length - 1; // 7 (intro ne broji)

  // ====================== HTML TEMPLATE ======================

  function buildProgressBar() {
    return [
      '<div class="progress-inline">',
      '  <div class="segments-inline"></div>',
      '  <div class="step-counter"><span class="step-now">1</span> <span class="step-sep">/</span> <span>' + TOTAL_STEPS + '</span></div>',
      '</div>'
    ].join('\n');
  }

  var TEMPLATE = [
    '<div class="main">',

    // ===== INTRO =====
    '  <section class="screen active" data-screen="intro">',
    '    <div class="wrap">',
    '      <div class="intro-block">',
    '        <h1 class="intro-headline">Osvoji 28-dnevni Nutribox plan</h1>',
    '        <p class="intro-lead">Inače, vrednost plana je 78.400 RSD.</p>',
    '        <div>',
    '          <button type="button" class="btn lg" data-go="q1">',
    '            <span class="btn-label">Učestvuj sada →</span>',
    '          </button>',
    '        </div>',
    '        <p class="intro-microcopy">Traje samo 1 minut.</p>',
    '      </div>',
    '    </div>',
    '  </section>',

    // ===== Q1 =====
    '  <section class="screen" data-screen="q1" data-auto-next>',
    '    <div class="wrap">',
    '      ' + buildProgressBar(),
    '      <div class="step-head">',
    '        <h1>Koji je tvoj glavni cilj sa ishranom?</h1>',
    '      </div>',
    '      <div class="options" role="radiogroup" aria-label="Glavni cilj sa ishranom">',
    '        <label class="opt"><input type="radio" name="glavni_cilj" value="Mršavljenje"><span class="opt-check"></span><span class="opt-letter">A</span><span class="opt-label">Mršavljenje</span></label>',
    '        <label class="opt"><input type="radio" name="glavni_cilj" value="Dobijanje mišićne mase"><span class="opt-check"></span><span class="opt-letter">B</span><span class="opt-label">Dobijanje mišićne mase</span></label>',
    '        <label class="opt"><input type="radio" name="glavni_cilj" value="Želim da se hranim zdravo ali da ne kuvam"><span class="opt-check"></span><span class="opt-letter">C</span><span class="opt-label">Želim da se hranim zdravo ali da ne kuvam</span></label>',
    '        <label class="opt"><input type="radio" name="glavni_cilj" value="Želim da uštedim vreme"><span class="opt-check"></span><span class="opt-letter">D</span><span class="opt-label">Želim da uštedim vreme</span></label>',
    '        <label class="opt"><input type="radio" name="glavni_cilj" value="Drugo" data-needs="glavni_cilj_drugo"><span class="opt-check"></span><span class="opt-letter">E</span><span class="opt-label">Drugo</span></label>',
    '      </div>',
    '      <div class="conditional" id="cond_glavni_cilj_drugo">',
    '        <label for="glavni_cilj_drugo_input">Opiši ukratko svoj cilj</label>',
    '        <input type="text" class="input" id="glavni_cilj_drugo_input" name="glavni_cilj_drugo" placeholder="npr. priprema za maraton, kontrola dijabetesa…" maxlength="120">',
    '      </div>',
    '      <div class="nav-row">',
    '        <button type="button" class="btn ghost" data-back>← Nazad</button>',
    '        <button type="button" class="btn" data-next disabled><span class="btn-label">Dalje →</span></button>',
    '      </div>',
    '    </div>',
    '  </section>',

    // ===== Q2 =====
    '  <section class="screen" data-screen="q2" data-auto-next>',
    '    <div class="wrap">',
    '      ' + buildProgressBar(),
    '      <div class="step-head">',
    '        <h1>Za koliko osoba bi naručivao Nutribox?</h1>',
    '      </div>',
    '      <div class="options" role="radiogroup" aria-label="Broj osoba">',
    '        <label class="opt"><input type="radio" name="za_koliko_osoba" value="Samo za sebe"><span class="opt-check"></span><span class="opt-letter">A</span><span class="opt-label">Samo za sebe</span></label>',
    '        <label class="opt"><input type="radio" name="za_koliko_osoba" value="Za sebe i partnera/ku (2 osobe)"><span class="opt-check"></span><span class="opt-letter">B</span><span class="opt-label">Za sebe i partnera/ku (2 osobe)</span></label>',
    '        <label class="opt"><input type="radio" name="za_koliko_osoba" value="Za celu porodicu (3–4 osobe)"><span class="opt-check"></span><span class="opt-letter">C</span><span class="opt-label">Za celu porodicu (3–4 osobe)</span></label>',
    '      </div>',
    '      <div class="nav-row">',
    '        <button type="button" class="btn ghost" data-back>← Nazad</button>',
    '        <button type="button" class="btn" data-next disabled><span class="btn-label">Dalje →</span></button>',
    '      </div>',
    '    </div>',
    '  </section>',

    // ===== Q3 (scale 1-5) =====
    '  <section class="screen" data-screen="q3" data-auto-next>',
    '    <div class="wrap">',
    '      ' + buildProgressBar(),
    '      <div class="step-head">',
    '        <h1>Koliko ti je trenutno ozbiljan taj cilj?</h1>',
    '        <p class="lead">Oceni od 1 (slabo) do 5 (vrlo ozbiljno).</p>',
    '      </div>',
    '      <div class="scale" role="radiogroup" aria-label="Ozbiljnost cilja 1-5">',
    '        <label class="opt"><input type="radio" name="ozbiljnost" value="1"><span class="opt-label">1</span></label>',
    '        <label class="opt"><input type="radio" name="ozbiljnost" value="2"><span class="opt-label">2</span></label>',
    '        <label class="opt"><input type="radio" name="ozbiljnost" value="3"><span class="opt-label">3</span></label>',
    '        <label class="opt"><input type="radio" name="ozbiljnost" value="4"><span class="opt-label">4</span></label>',
    '        <label class="opt"><input type="radio" name="ozbiljnost" value="5"><span class="opt-label">5</span></label>',
    '      </div>',
    '      <div class="scale-hint"><span>Slabo</span><span>Vrlo ozbiljno</span></div>',
    '      <div class="nav-row">',
    '        <button type="button" class="btn ghost" data-back>← Nazad</button>',
    '        <button type="button" class="btn" data-next disabled><span class="btn-label">Dalje →</span></button>',
    '      </div>',
    '    </div>',
    '  </section>',

    // ===== Q4 =====
    '  <section class="screen" data-screen="q4" data-auto-next>',
    '    <div class="wrap">',
    '      ' + buildProgressBar(),
    '      <div class="step-head">',
    '        <h1>Koliko često jedeš gotove obroke van kuće?</h1>',
    '        <p class="lead">Restorani, dostava, brza hrana — uračunaj sve.</p>',
    '      </div>',
    '      <div class="options" role="radiogroup" aria-label="Učestalost gotovih obroka">',
    '        <label class="opt"><input type="radio" name="ucestalost" value="Svaki dan"><span class="opt-check"></span><span class="opt-letter">A</span><span class="opt-label">Svaki dan</span></label>',
    '        <label class="opt"><input type="radio" name="ucestalost" value="3–5 puta nedeljno"><span class="opt-check"></span><span class="opt-letter">B</span><span class="opt-label">3–5 puta nedeljno</span></label>',
    '        <label class="opt"><input type="radio" name="ucestalost" value="1–2 puta nedeljno"><span class="opt-check"></span><span class="opt-letter">C</span><span class="opt-label">1–2 puta nedeljno</span></label>',
    '        <label class="opt"><input type="radio" name="ucestalost" value="Retko"><span class="opt-check"></span><span class="opt-letter">D</span><span class="opt-label">Retko</span></label>',
    '      </div>',
    '      <div class="nav-row">',
    '        <button type="button" class="btn ghost" data-back>← Nazad</button>',
    '        <button type="button" class="btn" data-next disabled><span class="btn-label">Dalje →</span></button>',
    '      </div>',
    '    </div>',
    '  </section>',

    // ===== Q5 =====
    '  <section class="screen" data-screen="q5" data-auto-next>',
    '    <div class="wrap">',
    '      ' + buildProgressBar(),
    '      <div class="step-head">',
    '        <h1>Koliko trenutno mesečno trošiš na hranu?</h1>',
    '        <p class="lead">Uračunaj sve — kućnu kupovinu, dostavu i restorane.</p>',
    '      </div>',
    '      <div class="options" role="radiogroup" aria-label="Mesečna potrošnja">',
    '        <label class="opt"><input type="radio" name="potrosnja" value="Do 30.000 RSD"><span class="opt-check"></span><span class="opt-letter">A</span><span class="opt-label">Do 30.000 RSD</span></label>',
    '        <label class="opt"><input type="radio" name="potrosnja" value="30.000 – 50.000 RSD"><span class="opt-check"></span><span class="opt-letter">B</span><span class="opt-label">30.000 – 50.000 RSD</span></label>',
    '        <label class="opt"><input type="radio" name="potrosnja" value="50.000 – 80.000 RSD"><span class="opt-check"></span><span class="opt-letter">C</span><span class="opt-label">50.000 – 80.000 RSD</span></label>',
    '        <label class="opt"><input type="radio" name="potrosnja" value="Preko 80.000 RSD"><span class="opt-check"></span><span class="opt-letter">D</span><span class="opt-label">Preko 80.000 RSD</span></label>',
    '      </div>',
    '      <div class="nav-row">',
    '        <button type="button" class="btn ghost" data-back>← Nazad</button>',
    '        <button type="button" class="btn" data-next disabled><span class="btn-label">Dalje →</span></button>',
    '      </div>',
    '    </div>',
    '  </section>',

    // ===== Q6 =====
    '  <section class="screen" data-screen="q6" data-auto-next>',
    '    <div class="wrap">',
    '      ' + buildProgressBar(),
    '      <div class="step-head">',
    '        <h1>Da li si do sada koristio neku sličnu uslugu poput Nutriboxa?</h1>',
    '        <p class="lead">Pomaže nam da znamo sa kog nivoa krećeš.</p>',
    '      </div>',
    '      <div class="options" role="radiogroup" aria-label="Prethodno iskustvo">',
    '        <label class="opt"><input type="radio" name="iskustvo" value="Da, trenutno koristim drugog provajdera" data-needs="konkurent"><span class="opt-check"></span><span class="opt-letter">A</span><span class="opt-label">Da, trenutno koristim drugog provajdera</span></label>',
    '        <label class="opt"><input type="radio" name="iskustvo" value="Da, koristio sam ranije"><span class="opt-check"></span><span class="opt-letter">B</span><span class="opt-label">Da, koristio sam ranije</span></label>',
    '        <label class="opt"><input type="radio" name="iskustvo" value="Ne, ovo bi bilo prvi put"><span class="opt-check"></span><span class="opt-letter">C</span><span class="opt-label">Ne, ovo bi bilo prvi put</span></label>',
    '      </div>',
    '      <div class="conditional" id="cond_konkurent">',
    '        <label for="konkurent_input">Kog provajdera koristiš?</label>',
    '        <input type="text" class="input" id="konkurent_input" name="konkurent" placeholder="Naziv firme ili usluge" maxlength="80">',
    '      </div>',
    '      <div class="nav-row">',
    '        <button type="button" class="btn ghost" data-back>← Nazad</button>',
    '        <button type="button" class="btn" data-next disabled><span class="btn-label">Dalje →</span></button>',
    '      </div>',
    '    </div>',
    '  </section>',

    // ===== Kontakt =====
    '  <section class="screen" data-screen="kontakt">',
    '    <div class="wrap">',
    '      ' + buildProgressBar(),
    '      <div class="step-head">',
    '        <h1>Tvoji kontakt podaci</h1>',
    '      </div>',
    '      <div class="field"><label for="ime_prezime">Ime i prezime <span class="req">*</span></label><input type="text" class="input" id="ime_prezime" name="ime_prezime" autocomplete="name" placeholder="Marko Marković" required><div class="field-error">Unesi i ime i prezime</div></div>',
    '      <div class="field phone-field"><label for="telefon">Kontakt telefon <span class="req">*</span></label><input type="tel" class="input" id="telefon" name="telefon" autocomplete="tel" inputmode="tel" required><div class="field-error">Unesi važeći broj telefona</div></div>',
    '      <div class="field"><label for="email">E-mail <span class="req">*</span></label><input type="email" class="input" id="email" name="email" autocomplete="email" placeholder="tvoj@email.com" required><div class="field-error">Unesi važeću e-mail adresu</div></div>',
    '      <div class="field"><label for="opstina">Opština u kojoj živiš <span class="req">*</span></label><input type="text" class="input" id="opstina" name="opstina" autocomplete="address-level2" placeholder="npr. Vračar" required><div class="field-error">Unesi opštinu</div></div>',
    '      <div class="nav-row">',
    '        <button type="button" class="btn ghost" data-back>← Nazad</button>',
    '        <button type="button" class="btn lg" id="submitBtn"><span class="btn-label">Pošalji prijavu →</span><span class="btn-spinner" aria-hidden="true"></span></button>',
    '      </div>',
    '      <p class="micro-note">Klikom na <strong>Pošalji prijavu</strong> potvrđuješ da si saglasan da te kontaktiramo ukoliko budeš izvučen kao pobednik. Tvoji podaci se ne dele sa trećim licima.</p>',
    '    </div>',
    '  </section>',
    '</div>'
  ].join('\n');

  // ====================== STATE ======================

  function generateSessionId() {
    return 'nb_gv_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8);
  }

  var state = {
    glavni_cilj: '',
    glavni_cilj_drugo: '',
    za_koliko_osoba: '',
    ozbiljnost: '',
    ucestalost: '',
    potrosnja: '',
    iskustvo: '',
    konkurent: '',
    ime_prezime: '',
    telefon: '',           // E.164 from intl-tel-input
    telefon_raw: '',       // What user typed (fallback if library fails)
    email: '',
    opstina: '',
    session_id: generateSessionId(),
    started_at: new Date().toISOString(),
    ref: ''
  };

  var screenIdx = 0;
  var ROOT = null;
  var itiInstance = null;

  // ====================== HELPERS ======================

  function captureRef() {
    try {
      var fromUrl = new URLSearchParams(window.location.search).get('r');
      if (fromUrl) {
        var clean = fromUrl.trim().toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8);
        if (clean.length >= 4) {
          try { localStorage.setItem('nb_ref', clean); } catch (e) {}
          state.ref = clean;
          return;
        }
      }
      var stored = localStorage.getItem('nb_ref');
      if (stored && stored.length >= 4) state.ref = stored;
    } catch (e) { /* localStorage unavailable */ }
  }

  function $(sel) { return ROOT.querySelector(sel); }
  function $$(sel) { return ROOT.querySelectorAll(sel); }

  function buildSegments() {
    $$('.segments-inline').forEach(function (wrap) {
      wrap.innerHTML = '';
      for (var i = 0; i < TOTAL_STEPS; i++) {
        var s = document.createElement('span');
        s.className = 'seg';
        wrap.appendChild(s);
      }
    });
  }

  function updateProgress() {
    var screen = SCREENS[screenIdx];
    if (screen === 'intro') return;

    var active = $('.screen.active');
    if (!active) return;

    var stepIdx = screenIdx;
    var stepNow = active.querySelector('.step-now');
    if (stepNow) stepNow.textContent = stepIdx;

    var segs = active.querySelectorAll('.segments-inline .seg');
    segs.forEach(function (s, i) {
      s.classList.remove('done', 'current');
      if (i < stepIdx - 1) s.classList.add('done');
      else if (i === stepIdx - 1) s.classList.add('current');
    });
  }

  function showScreen(idx) {
    if (idx < 0 || idx >= SCREENS.length) return;
    $$('.screen').forEach(function (s) { s.classList.remove('active'); });
    var target = SCREENS[idx];
    var el = $('.screen[data-screen="' + target + '"]');
    if (el) el.classList.add('active');
    screenIdx = idx;
    updateProgress();
    try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch (e) { window.scrollTo(0, 0); }

    if (target === 'kontakt') {
      setTimeout(function () {
        var f = $('#ime_prezime');
        if (f) f.focus();
      }, 200);
    }
  }

  function goNext() { if (screenIdx < SCREENS.length - 1) showScreen(screenIdx + 1); }
  function goBack() { if (screenIdx > 0) showScreen(screenIdx - 1); }
  function goTo(name) {
    var idx = SCREENS.indexOf(name);
    if (idx >= 0) showScreen(idx);
  }

  // ====================== RADIO + CONDITIONAL ======================

  function syncNextEnabled(section) {
    var next = section.querySelector('[data-next]');
    if (!next) return;
    var checked = section.querySelector('input[type="radio"]:checked');
    if (!checked) { next.disabled = true; return; }
    var needs = checked.getAttribute('data-needs');
    if (needs) {
      var cond = section.querySelector('#cond_' + needs);
      var input = cond ? cond.querySelector('input, textarea') : null;
      if (input && input.value.trim().length === 0) { next.disabled = true; return; }
    }
    next.disabled = false;
  }

  function bindRadioSection(section) {
    var radios = section.querySelectorAll('input[type="radio"]');
    var fieldName = radios[0] ? radios[0].name : null;

    radios.forEach(function (r) {
      r.addEventListener('change', function () {
        if (fieldName && fieldName in state) state[fieldName] = r.value;

        section.querySelectorAll('input[type="radio"]').forEach(function (other) {
          var otherNeeds = other.getAttribute('data-needs');
          if (otherNeeds) {
            var cond = section.querySelector('#cond_' + otherNeeds);
            if (cond) cond.classList.toggle('show', other.checked);
            if (!other.checked) {
              var input = cond ? cond.querySelector('input, textarea') : null;
              if (input) { input.value = ''; state[otherNeeds] = ''; }
            }
          }
        });

        syncNextEnabled(section);

        if (section.hasAttribute('data-auto-next') && !r.getAttribute('data-needs')) {
          setTimeout(function () {
            if (!section.classList.contains('active')) return;
            var btn = section.querySelector('[data-next]');
            if (btn && !btn.disabled) btn.click();
          }, 260);
        }
      });
    });

    section.querySelectorAll('.conditional input, .conditional textarea').forEach(function (input) {
      input.addEventListener('input', function () {
        var condEl = input.closest('.conditional');
        if (!condEl) return;
        var fieldKey = condEl.id.replace(/^cond_/, '');
        if (fieldKey in state) state[fieldKey] = input.value.trim();
        syncNextEnabled(section);
      });
    });
  }

  // ====================== META PIXEL ======================

  function loadMetaPixel() {
    if (!CONFIG.META_PIXEL_ID) return;
    // Idempotent base code from Meta — adds fbq() global and loads fbevents.js
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      if (!f._fbq) f._fbq = n;
      n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = [];
      t = b.createElement(e); t.async = !0; t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    try {
      window.fbq('init', CONFIG.META_PIXEL_ID);
      window.fbq('track', 'PageView');
    } catch (e) { /* swallow — pixel must not break form */ }
  }

  function trackLead() {
    if (!window.fbq || !CONFIG.META_PIXEL_ID) return;
    try {
      // trackSingle targets our pixel specifically, even if other pixels are on the host page
      window.fbq('trackSingle', CONFIG.META_PIXEL_ID, 'Lead');
    } catch (e) { /* swallow */ }
  }

  // ====================== INTL-TEL-INPUT ======================

  function initPhoneInput(retries) {
    retries = retries || 0;
    if (!window.intlTelInput) {
      if (retries < 50) { // ~5s total
        setTimeout(function () { initPhoneInput(retries + 1); }, 100);
      } else {
        console.warn('intl-tel-input library not loaded — phone field falls back to basic validation');
      }
      return;
    }
    var input = $('#telefon');
    if (!input || itiInstance) return;
    itiInstance = window.intlTelInput(input, {
      initialCountry: 'rs',
      preferredCountries: ['rs', 'ba', 'hr', 'me', 'mk', 'si'],
      showSelectedDialCode: true,
      utilsScript: CONFIG.ITI_UTILS_URL
    });
  }

  // ====================== CONTACT VALIDATION ======================

  function validateImePrezime(val) {
    var trimmed = val.trim();
    if (trimmed.length === 0) return false;
    // Must have at least two non-whitespace parts (ime + prezime), each ≥2 chars
    var parts = trimmed.split(/\s+/).filter(function (p) { return p.length >= 2; });
    return parts.length >= 2;
  }

  function validatePhone(input) {
    if (itiInstance && typeof itiInstance.isValidNumber === 'function') {
      // isValidNumber requires utils.js to be loaded; returns null/false if not
      var result = itiInstance.isValidNumber();
      if (result === true) return true;
      if (result === false) return false;
      // null = utils not loaded yet, fall through to basic check
    }
    // Basic fallback
    var digits = (input.value || '').replace(/[^\d]/g, '');
    return digits.length >= 8 && digits.length <= 15;
  }

  function validateField(field) {
    // Use [name] selector — intl-tel-input injects an unnamed country-search
    // input that we must NOT pick up, only the original named input/select.
    var input = field.querySelector('input[name], select[name]');
    if (!input) return true;
    var val = input.value.trim();
    var valid = val.length > 0;

    if (valid && input.id === 'ime_prezime') {
      valid = validateImePrezime(val);
    }
    if (valid && input.type === 'email') {
      valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val);
    }
    if (valid && input.type === 'tel') {
      valid = validatePhone(input);
    }

    field.classList.toggle('has-error', !valid);
    input.classList.toggle('invalid', !valid);
    return valid;
  }

  function bindContactValidation() {
    var fields = $$('.screen[data-screen="kontakt"] .field');
    fields.forEach(function (field) {
      var input = field.querySelector('input[name], select[name]');
      if (!input) return;
      input.addEventListener('blur', function () { validateField(field); });
      var evt = input.tagName === 'SELECT' ? 'change' : 'input';
      input.addEventListener(evt, function () {
        if (field.classList.contains('has-error')) validateField(field);
        var key = input.name;
        if (key in state) state[key] = input.value.trim();
        if (key === 'telefon') {
          state.telefon_raw = input.value.trim();
        }
      });
    });
  }

  function validateContactForm() {
    var fields = $$('.screen[data-screen="kontakt"] .field');
    var allValid = true;
    var firstInvalid = null;
    fields.forEach(function (field) {
      var v = validateField(field);
      if (!v) {
        allValid = false;
        if (!firstInvalid) firstInvalid = field.querySelector('input[name], select[name]');
      }
    });
    if (firstInvalid) firstInvalid.focus();
    return allValid;
  }

  // ====================== SUBMIT ======================

  function getPhoneE164() {
    if (itiInstance && typeof itiInstance.getNumber === 'function') {
      var num = itiInstance.getNumber();
      if (num) return num;
    }
    return state.telefon_raw || state.telefon || '';
  }

  function splitName(full) {
    var parts = (full || '').trim().split(/\s+/);
    if (parts.length <= 1) return { first: parts[0] || '', last: '' };
    return { first: parts[0], last: parts.slice(1).join(' ') };
  }

  function buildPayload() {
    var phoneFull = getPhoneE164();
    var name = splitName(state.ime_prezime);
    return {
      'Koji je tvoj glavni cilj sa ishranom?': state.glavni_cilj,
      'Glavni cilj — drugo (opis)': state.glavni_cilj_drugo,
      'Za koliko osoba bi naručivao Nutribox?': state.za_koliko_osoba,
      'Koliko ti je trenutno ozbiljan taj cilj? (1-5)': state.ozbiljnost,
      'Koliko često jedeš gotove obroke van kuće?': state.ucestalost,
      'Koliko trenutno mesečno trošiš na hranu?': state.potrosnja,
      'Da li si do sada koristio neku sličnu uslugu poput Nutriboxa?': state.iskustvo,
      'Kog provajdera trenutno koristi (ako koristi drugog)': state.konkurent,
      'Ime i prezime': state.ime_prezime,
      'Kontakt telefon': phoneFull,
      'E-mail': state.email,
      'Opština u kojoj živiš': state.opstina,
      form_id: CONFIG.FORM_ID,
      session_id: state.session_id,
      started_at: state.started_at,
      submitted_at: new Date().toISOString(),
      referred_by_code: state.ref || '',
      first_name: name.first,
      last_name: name.last,
      page_url: window.location.href,
      referrer: document.referrer || '',
      user_agent: navigator.userAgent || ''
    };
  }

  function stashForThankyou() {
    try {
      var name = splitName(state.ime_prezime);
      var stash = {
        email: state.email.toLowerCase(),
        name: state.ime_prezime,
        first_name: name.first,
        last_name: name.last,
        ref: state.ref || '',
        ts: Date.now()
      };
      sessionStorage.setItem('nb_signup', JSON.stringify(stash));
    } catch (e) { /* sessionStorage unavailable */ }
  }

  function redirectToThankyou() {
    var url;
    try {
      url = new URL(CONFIG.THANKYOU_URL);
    } catch (e) {
      window.location.href = CONFIG.THANKYOU_URL;
      return;
    }
    url.searchParams.set('email', state.email.toLowerCase());
    url.searchParams.set('name', state.ime_prezime);
    if (state.ref) url.searchParams.set('ref', state.ref);
    window.location.href = url.toString();
  }

  function submitForm() {
    var btn = $('#submitBtn');
    if (!validateContactForm()) return;

    btn.disabled = true;
    btn.classList.add('loading');

    var payload = buildPayload();
    stashForThankyou();
    trackLead();

    fetch(CONFIG.WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true
    }).catch(function (err) {
      console.warn('Webhook submit failed, redirecting anyway:', err);
    }).finally(function () {
      redirectToThankyou();
    });
  }

  // ====================== INIT ======================

  function init() {
    ROOT = document.getElementById('nb-giveaway');
    if (!ROOT) return;

    if (!ROOT.querySelector('.screen')) {
      ROOT.innerHTML = TEMPLATE;
    }

    captureRef();
    buildSegments();
    updateProgress();

    $$('.screen[data-auto-next]').forEach(bindRadioSection);

    $$('[data-next]').forEach(function (btn) { btn.addEventListener('click', goNext); });
    $$('[data-back]').forEach(function (btn) { btn.addEventListener('click', goBack); });
    $$('[data-go]').forEach(function (btn) {
      btn.addEventListener('click', function () { goTo(btn.getAttribute('data-go')); });
    });

    bindContactValidation();
    var sub = $('#submitBtn');
    if (sub) sub.addEventListener('click', submitForm);

    $$('.screen[data-screen="kontakt"] input[name]').forEach(function (inp) {
      inp.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') { e.preventDefault(); submitForm(); }
      });
    });

    initPhoneInput();
    loadMetaPixel();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

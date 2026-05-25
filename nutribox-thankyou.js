/*
  Nutribox · Thank-you · Referral Card · standalone bundle
  ========================================================
  Embed snippet (paste u Webflow Embed element na thank-you stranici):

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&display=swap">
    <link rel="stylesheet" href="https://nutribox-giveaway-referral.vercel.app/nutribox-thankyou.css?v=1">

    <div id="nb-thankyou"></div>

    <script src="https://nutribox-giveaway-referral.vercel.app/nutribox-thankyou.js?v=1"></script>

  Skripta injektuje karticu sa "Tvoj lični link", POST-uje na /api/signup
  i prikazuje share buttons (Copy/WhatsApp/Viber/SMS).
*/

(function () {
  'use strict';

  var CONFIG = {
    apiUrl: 'https://nutribox-giveaway-referral.vercel.app/api/signup',
    webinarUrl: 'https://www.nutribox.rs/giveaway/maj-2026',
    dashboardBaseUrl: 'https://nutribox-giveaway-referral.vercel.app'
  };

  var ROOT = null;
  var TOAST = null;

  function init() {
    ROOT = document.getElementById('nb-thankyou');
    if (!ROOT) return;

    ROOT.innerHTML = '<div class="nb-ref-card"><div class="nb-ref-status">Pripremamo tvoj lični link…</div></div>';

    TOAST = document.createElement('div');
    TOAST.className = 'nb-ref-toast';
    TOAST.id = 'nb-ref-toast';
    TOAST.textContent = 'Link kopiran ✓';
    ROOT.appendChild(TOAST);

    var params = new URLSearchParams(window.location.search);

    if (params.get('demo') === '1') {
      setTimeout(function () {
        renderCard({
          firstName: 'Marko',
          shareUrl: CONFIG.webinarUrl + '?r=X7K2M9',
          dashboardUrl: CONFIG.dashboardBaseUrl + '/?t=demo-token'
        });
      }, 200);
      return;
    }

    // Data flow: form bundle stashes contact info to sessionStorage as 'nb_signup'.
    // Fallback order: URL params → sessionStorage → localStorage (ref only).
    var stashed = readStashedSignup();
    var email = getParam(params, ['email', 'Email']) || stashed.email;
    var name  = getParam(params, ['name', 'Name'])   || stashed.name;
    var ref   = getParam(params, ['ref', 'Ref'])     || stashed.ref || getStoredRef();

    if (!email) {
      renderStatus('Nismo pročitali tvoju prijavu. <strong>Proveri email</strong> — lični link ti šaljemo tamo.');
      return;
    }

    try { localStorage.setItem('nb_ref_email', email); } catch (e) {}

    fetch(CONFIG.apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        name: name,
        ref: ref,
        webinarUrl: CONFIG.webinarUrl
      })
    })
      .then(function (res) {
        if (!res.ok) throw new Error('status ' + res.status);
        return res.json();
      })
      .then(renderCard)
      .catch(function (err) {
        console.error('[nb-thankyou] signup failed', err);
        renderStatus('Problem pri generisanju linka. <strong>Proveri email</strong> — stiže ti tamo za par minuta.');
      });
  }

  function renderCard(data) {
    var greeting = data.firstName ? esc(data.firstName) + ', ' : '';
    var shareUrl = esc(data.shareUrl);
    var dashboardUrl = esc(data.dashboardUrl);

    var html =
      '<div class="nb-ref-card">' +
        '<div class="nb-ref-label">Tvoj lični link</div>' +
        '<h3 class="nb-ref-title">' + greeting + 'pozovi prijatelje i dupliraj svoju šansu da osvojiš.</h3>' +
        '<div class="nb-ref-row">' +
          '<input class="nb-ref-input" id="nb-ref-input" value="' + shareUrl + '" readonly />' +
          '<button class="nb-ref-btn" id="nb-ref-btn" type="button">Kopiraj</button>' +
        '</div>' +
        '<p class="nb-ref-footnote">' +
          'Prati broj prijavljenih preko svog linka na <a href="' + dashboardUrl + '" target="_blank" rel="noopener">svojoj platformi</a>.' +
        '</p>' +
      '</div>';

    // Preserve TOAST as last child
    ROOT.innerHTML = html;
    ROOT.appendChild(TOAST);

    document.getElementById('nb-ref-btn').addEventListener('click', onCopy);
    document.getElementById('nb-ref-input').addEventListener('click', function (e) { e.target.select(); });
  }

  function renderStatus(html) {
    ROOT.innerHTML = '<div class="nb-ref-card"><div class="nb-ref-status">' + html + '</div></div>';
    ROOT.appendChild(TOAST);
  }

  function onCopy() {
    var btn = document.getElementById('nb-ref-btn');
    var input = document.getElementById('nb-ref-input');
    var done = function () {
      btn.textContent = 'Kopirano ✓';
      btn.classList.add('nb-ref-copied');
      showToast();
      setTimeout(function () {
        btn.textContent = 'Kopiraj';
        btn.classList.remove('nb-ref-copied');
      }, 2000);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(input.value).then(done, fallback);
    } else {
      fallback();
    }
    function fallback() {
      input.select();
      try { document.execCommand('copy'); } catch (e) {}
      done();
    }
  }

  function showToast() {
    if (!TOAST) return;
    TOAST.classList.add('nb-ref-show');
    setTimeout(function () { TOAST.classList.remove('nb-ref-show'); }, 1800);
  }

  function getParam(params, keys) {
    for (var i = 0; i < keys.length; i++) {
      var v = params.get(keys[i]);
      if (v && v.trim()) return v.trim();
    }
    return '';
  }

  function getStoredRef() {
    try { return localStorage.getItem('nb_ref') || ''; } catch (e) { return ''; }
  }

  function readStashedSignup() {
    try {
      var raw = sessionStorage.getItem('nb_signup');
      if (!raw) return {};
      var obj = JSON.parse(raw);
      return {
        email: (obj && obj.email) || '',
        name:  (obj && obj.name)  || '',
        ref:   (obj && obj.ref)   || ''
      };
    } catch (e) { return {}; }
  }

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

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

  var SHARE_MSG = function (url) {
    return 'Prijavi se za Nutribox giveaway i osvoji 28-dnevni plan zdrave ishrane: ' + url;
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
    var msgEnc = encodeURIComponent(SHARE_MSG(data.shareUrl));

    var html =
      '<div class="nb-ref-card">' +
        '<div class="nb-ref-label">Tvoj lični link</div>' +
        '<h3 class="nb-ref-title">' + greeting + 'pozovi prijatelje i dupliraj svoju šansu da osvojiš.</h3>' +
        '<div class="nb-ref-row">' +
          '<input class="nb-ref-input" id="nb-ref-input" value="' + shareUrl + '" readonly />' +
          '<button class="nb-ref-btn" id="nb-ref-btn" type="button">Kopiraj</button>' +
        '</div>' +
        '<div class="nb-ref-share">' +
          '<a class="nb-ref-share-btn" href="https://wa.me/?text=' + msgEnc + '" target="_blank" rel="noopener">' +
            '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7 0-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.7.1-.1.3-.4.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.2-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4 0 1.4 1.1 2.8 1.2 3 .2.2 2.1 3.3 5.1 4.6 1.8.7 2.5.8 3.3.7.5-.1 1.6-.7 1.8-1.3.2-.6.2-1.2.2-1.3-.1-.1-.3-.2-.6-.3zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.1-1.3c1.4.8 3.1 1.3 4.9 1.3 5.5 0 10-4.5 10-10S17.5 2 12 2z"/></svg>' +
            'WhatsApp</a>' +
          '<a class="nb-ref-share-btn" href="viber://forward?text=' + msgEnc + '" rel="noopener">' +
            '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.4 0H12.6c1.5 0 6.3.2 9 2.7 1.6 1.5 2.2 3.8 2.3 6.6.1 2.8.2 8-4.7 9.8h-.1l.1 2.9-3.5-2c-3.6.1-7.3.3-9.5-2-1-1.1-1.7-2.4-2-3.9C4 12.2 3.9 9.7 4.1 7.4 4.4 5.1 5 3.1 6.6 1.7 9 .2 11.4 0 11.4 0zm6.3 8.4c-.2-.4-.6-.6-1-.6-1 0-1.4 1.3-1.6 1.7-.2.4-.3.4-.7.2-1-.6-2-1.5-2.7-2.6-.2-.4-.2-.5.1-.8.4-.4 1.2-1.1.8-1.9-.3-.8-.6-1.5-1.1-2.2-.4-.7-1.1-.5-1.7-.2-1.1.6-1.7 1.7-1.6 2.9 0 .3.1.6.2.9.4 1.2 1 2.3 1.7 3.3.7 1 1.4 1.9 2.3 2.7.9.8 1.9 1.4 3.1 1.8.6.2 1.3.4 2 .3 1.3-.1 2.4-1.2 2.5-2.4 0-.1 0-.2-.1-.3-.2-.4-2.1-1.3-2.2-.8z"/></svg>' +
            'Viber</a>' +
          '<a class="nb-ref-share-btn" href="sms:?body=' + msgEnc + '" rel="noopener">' +
            '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM7 9h10v2H7V9zm10 5H7v-2h10v2zm0-6H7V6h10v2z"/></svg>' +
            'SMS</a>' +
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

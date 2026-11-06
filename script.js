/* ==========================================================================
   Tegar Raditya — Brutalist Motion
   Vanilla JS, tanpa dependency. Semua efek menghormati prefers-reduced-motion.
   ========================================================================== */

(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------------- *
   * 1. Progress bar scroll
   * ---------------------------------------------------------------- */
  var bar = document.getElementById('scrollBar');

  function updateProgress() {
    var max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  /* ---------------------------------------------------------------- *
   * 2. Reveal saat masuk viewport
   *    IntersectionObserver + safety net `sweep()` supaya konten
   *    tidak pernah tertinggal invisible kalau observer gagal.
   * ---------------------------------------------------------------- */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll('.reveal'));

  function sweep() {
    var vh = window.innerHeight || document.documentElement.clientHeight;
    for (var i = revealEls.length - 1; i >= 0; i--) {
      var el = revealEls[i];
      if (el.classList.contains('in')) {
        revealEls.splice(i, 1);
        continue;
      }
      if (el.getBoundingClientRect().top < vh * 0.95) {
        el.classList.add('in');
        revealEls.splice(i, 1);
      }
    }
  }

  if (reduce || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('in'); });
    revealEls = [];
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });

    revealEls.forEach(function (el) { io.observe(el); });

    window.addEventListener('load', sweep, { once: true });

    var ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        sweep();
        ticking = false;
      });
    }, { passive: true });
  }

  /* ---------------------------------------------------------------- *
   * 3. Counter angka
   * ---------------------------------------------------------------- */
  function animateCount(el) {
    var target = parseFloat(el.dataset.to);
    var decimals = parseInt(el.dataset.dec || '0', 10);

    if (reduce) {
      el.textContent = target.toFixed(decimals);
      return;
    }

    var start = performance.now();
    var duration = 900;

    function step(now) {
      var progress = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = (target * eased).toFixed(decimals);
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  var counters = document.querySelectorAll('.count');

  if (!('IntersectionObserver' in window)) {
    counters.forEach(animateCount);
  } else {
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });

    counters.forEach(function (counter) { counterObserver.observe(counter); });
  }

  /* ---------------------------------------------------------------- *
   * 4. Nav link aktif mengikuti section
   * ---------------------------------------------------------------- */
  var navLinks = document.querySelectorAll('.nav-link');
  var trackedSections = ['about', 'work']
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);

  if ('IntersectionObserver' in window && trackedSections.length) {
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (link) {
          link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    trackedSections.forEach(function (section) { navObserver.observe(section); });
  }

  /* ---------------------------------------------------------------- *
   * 5. Tilt kartu proyek (hanya perangkat dengan pointer presisi)
   * ---------------------------------------------------------------- */
  var hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  if (hasFinePointer && !reduce) {
    document.querySelectorAll('[data-tilt]').forEach(function (card) {
      var frame = null;
      var tiltX = 0;
      var tiltY = 0;

      card.addEventListener('mousemove', function (event) {
        var rect = card.getBoundingClientRect();
        tiltX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
        tiltY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;

        if (frame) return;
        frame = requestAnimationFrame(function () {
          card.style.transform =
            'translate(3px, 3px) perspective(900px) ' +
            'rotateX(' + (-tiltY * 2.2).toFixed(2) + 'deg) ' +
            'rotateY(' + (tiltX * 2.2).toFixed(2) + 'deg)';
          frame = null;
        });
      });

      card.addEventListener('mouseleave', function () {
        card.style.transform = '';
        if (frame) {
          cancelAnimationFrame(frame);
          frame = null;
        }
      });
    });
  }

  /* ---------------------------------------------------------------- *
   * 6. Salin email + toast
   * ---------------------------------------------------------------- */
  var toast = document.getElementById('toast');
  var toastTimer = null;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('show'); }, 2200);
  }

  var copyButton = document.getElementById('copyEmail');

  if (copyButton) {
    copyButton.addEventListener('click', function () {
      var email = copyButton.dataset.email;

      /* Fallback untuk browser/konteks yang memblokir Clipboard API */
      function legacyCopy() {
        var field = document.createElement('textarea');
        field.value = email;
        field.setAttribute('readonly', '');
        field.style.position = 'fixed';
        field.style.top = '-1000px';
        document.body.appendChild(field);
        field.select();
        var copied = false;
        try { copied = document.execCommand('copy'); } catch (err) { copied = false; }
        document.body.removeChild(field);
        return copied;
      }

      function done() {
        showToast('email disalin');
      }

      function fallback() {
        if (legacyCopy()) {
          done();
        } else {
          window.location.href = 'mailto:' + email;
        }
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(done).catch(fallback);
      } else {
        fallback();
      }
    });
  }

  /* ---------------------------------------------------------------- *
   * 7. Menu mobile
   * ---------------------------------------------------------------- */
  var burger = document.getElementById('burger');
  var mobileMenu = document.getElementById('mobileMenu');

  if (burger && mobileMenu) {
    burger.addEventListener('click', function () {
      var isOpen = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', String(!isOpen));
      mobileMenu.classList.toggle('open', !isOpen);
    });

    mobileMenu.addEventListener('click', function (event) {
      if (event.target.closest('a')) {
        burger.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.remove('open');
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && mobileMenu.classList.contains('open')) {
        burger.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.remove('open');
        burger.focus();
      }
    });
  }
})();

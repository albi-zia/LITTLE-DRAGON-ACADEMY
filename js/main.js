/* ==========================================================================
   LITTLE DRAGON MARTIAL ARTS ACADEMY — SHARED SITE SCRIPT
   Loaded on every page. Handles: mobile nav toggle, scroll-reveal animation,
   and the homepage splash intro (only runs if #splash exists on the page).
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Mobile nav toggle ---- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.classList.toggle('active', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
    navLinks.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
    }));
  }

  /* ---- Scroll reveal ----
     Skips content inside #mediaGrid / #noticesList — those are rendered
     dynamically by gallery.js / notices.js, which set up their own
     reveal observers after injecting their cards. */
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealEls = Array.from(document.querySelectorAll('.reveal')).filter(
    (el) => !el.closest('#mediaGrid, #noticesList')
  );
  if ('IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('in-view'));
  }

  /* ---- Splash intro (index.html only — element only exists there) ---- */
  const splash = document.getElementById('splash');
  if (splash) {
    if (reduceMotion) {
      splash.remove();
      document.body.classList.remove('splash-active');
    } else {
      document.body.classList.add('splash-active');
      let splashStarted = false;
      const finishSplash = () => {
        if (splashStarted) return;
        splashStarted = true;
        setTimeout(() => {
          splash.classList.add('splash-exit');
          document.body.classList.remove('splash-active');
          setTimeout(() => splash.remove(), 850);
        }, 1500);
      };
      if (document.readyState === 'complete') {
        finishSplash();
      } else {
        window.addEventListener('load', finishSplash, { once: true });
        // Fallback in case 'load' is delayed by slow external assets (fonts, etc.)
        setTimeout(finishSplash, 3000);
      }
    }
  }

});

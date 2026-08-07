/* ==========================================================================
   NOTICES RENDER — reads the NOTICES array from notices-data.js and builds
   the notice cards on notices.html. You shouldn't need to edit this file —
   to publish a new notice, edit js/notices-data.js instead.
   ========================================================================== */

function placeholderSVG() {
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="8.5" cy="10" r="1.5"/><path d="M21 15l-5-5-11 9"/></svg>';
}

function renderNotices() {
  const list = document.getElementById('noticesList');
  if (!list) return;

  if (!Array.isArray(NOTICES) || NOTICES.length === 0) {
    list.innerHTML = '<p class="notices-empty">No notices published yet. Add one in js/notices-data.js.</p>';
    return;
  }

  list.innerHTML = NOTICES.map((notice, i) => {
    const hasImage = notice.image && notice.image.trim() !== '';
    const thumb = hasImage
      ? '<div class="notice-thumb">'
        + '<img src="' + notice.image + '" alt="" onerror="this.closest(\'.notice-thumb\').classList.add(\'load-failed\'); this.remove();">'
        + '<div class="media-placeholder">' + placeholderSVG() + '<span>' + notice.image + '</span></div>'
        + '</div>'
      : '';

    return '<article class="notice-card glass-card reveal" style="transition-delay:' + (Math.min(i, 5) * 0.08) + 's">'
      + thumb
      + '<div>'
      + '<p class="notice-date">' + notice.date + '</p>'
      + '<h3>' + notice.title + '</h3>'
      + '<p>' + notice.body + '</p>'
      + '</div>'
      + '</article>';
  }).join('');

  // Re-run reveal observer for newly-injected cards
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const cards = list.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    cards.forEach((el) => io.observe(el));
  } else {
    cards.forEach((el) => el.classList.add('in-view'));
  }
}

document.addEventListener('DOMContentLoaded', renderNotices);

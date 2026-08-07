/* ==========================================================================
   GALLERY RENDER — reads the GALLERY array from gallery-data.js, builds the
   media grid, and wires up the All / Photos / Videos filter. You shouldn't
   need to edit this file — to add media, edit js/gallery-data.js instead.
   ========================================================================== */

function galleryPlaceholderSVG(isVideo) {
  return isVideo
    ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2.5" y="5" width="19" height="14" rx="2"/><path d="M10 9.5l5 2.5-5 2.5v-5z" fill="currentColor" stroke="none"/></svg>'
    : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="8.5" cy="10" r="1.5"/><path d="M21 15l-5-5-11 9"/></svg>';
}

function playBadgeSVG() {
  return '<svg viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>';
}

function buildTile(item, index) {
  const isVideo = item.type === 'video';
  const placeholder = '<div class="media-placeholder">' + galleryPlaceholderSVG(isVideo) + '<span>' + item.src + '</span></div>';
  const caption = '<div class="tile-caption">' + item.caption + '</div>';
  const playBadge = isVideo ? '<div class="play-badge">' + playBadgeSVG() + '</div>' : '';

  let mediaEl;
  if (isVideo) {
    const posterAttr = item.poster ? ' poster="' + item.poster + '"' : '';
    mediaEl = '<video muted loop playsinline preload="metadata"' + posterAttr + ' onmouseover="this.play()" onmouseout="this.pause()" onerror="this.closest(\'.media-tile\').classList.add(\'load-failed\')">'
      + '<source src="' + item.src + '">'
      + '</video>';
  } else {
    mediaEl = '<img src="' + item.src + '" alt="' + item.caption + '" loading="lazy" onerror="this.closest(\'.media-tile\').classList.add(\'load-failed\')">';
  }

  return '<div class="media-tile reveal" data-type="' + item.type + '" style="transition-delay:' + (Math.min(index % 6, 5) * 0.07) + 's">'
    + mediaEl + playBadge + caption + placeholder
    + '</div>';
}

function renderGallery() {
  const grid = document.getElementById('mediaGrid');
  if (!grid) return;

  if (!Array.isArray(GALLERY) || GALLERY.length === 0) {
    grid.innerHTML = '<p class="notices-empty">No media yet. Add photos and videos in js/gallery-data.js.</p>';
    return;
  }

  grid.innerHTML = GALLERY.map(buildTile).join('');

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const tiles = grid.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    tiles.forEach((el) => io.observe(el));
  } else {
    tiles.forEach((el) => el.classList.add('in-view'));
  }

  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      grid.querySelectorAll('.media-tile').forEach((tile) => {
        const show = filter === 'all' || tile.dataset.type === filter;
        tile.classList.toggle('hidden', !show);
      });
    });
  });
}

document.addEventListener('DOMContentLoaded', renderGallery);

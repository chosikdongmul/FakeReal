// ═══════════════════════════════════════
//  오들오들 교수와 이상한 마을 — main.js
// ═══════════════════════════════════════

// ── 유틸 ───────────────────────────────
function esc(str) {
  return String(str ?? '')
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
function youtubeId(url) {
  if (!url) return null;
  const m = url.match(/(?:youtu\.be\/|v=|embed\/)([A-Za-z0-9_-]{11})/);
  return m ? m[1] : null;
}


// ── 히어로 배너 ────────────────────────
// 연출:
//   PNG 4장 순차 재생 → 마지막 장 고정
//   - 1~3번째: 페이드인(fade) → 유지(duration) → 페이드아웃
//   - 마지막:  페이드인 → 고정 (루프 없음)
//   배경(heroBg)은 별도 레이어로 항상 표시

function renderHeroBanner() {
  const slot  = document.getElementById('hero-bg-media');
  const pngs  = DATA.heroPngs || [];
  const bgSrc = DATA.heroBg   || '';
  const dur   = DATA.heroPngDuration ?? 1200;  // 각 이미지 표시 시간 ms
  const fade  = DATA.heroPngFade      ?? 600;   // 페이드 시간 ms

  slot.innerHTML = '';

  // 1. 배경 레이어 (jpg)
  if (bgSrc) {
    const bgEl = document.createElement('img');
    bgEl.src = bgSrc;
    bgEl.alt = '';
    bgEl.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center top;';
    slot.appendChild(bgEl);
  }

  // 2. PNG 레이어 컨테이너 (relative position, 투명 PNG들이 쌓임)
  const pngLayer = document.createElement('div');
  pngLayer.style.cssText = 'position:absolute;inset:0;';
  slot.appendChild(pngLayer);

  if (!pngs.length) return;

  // 이미지 엘리먼트 미리 생성 (모두 숨김 상태)
  const imgs = pngs.map(src => {
    const img = document.createElement('img');
    img.src = src;
    img.className = 'hero-png-img';
    img.alt = '';
    img.style.opacity = '0';
    img.style.transition = `opacity ${fade}ms ease`;
    pngLayer.appendChild(img);
    return img;
  });

  // 순차 재생
  function showAt(idx) {
    if (idx >= imgs.length) return;
    const img    = imgs[idx];
    const isLast = idx === imgs.length - 1;

    // 페이드인
    img.style.opacity = '1';

    if (isLast) return; // 마지막은 고정, 끝

    // 유지 후 페이드아웃 → 다음
    setTimeout(() => {
      img.style.opacity = '0';
      setTimeout(() => showAt(idx + 1), fade);
    }, dur);
  }

  showAt(0);
}


// ── 캐릭터 렌더 ────────────────────────
function renderCharacters() {
  const grid = document.getElementById('char-grid');
  if (!grid) return;
  const chars = DATA.characters || [];

  grid.innerHTML = chars.map((c, i) => {
    const isFirst = i === 0;
    const photoHtml = c.photo
      ? `<img class="char-photo" src="${esc(c.photo)}" alt="${esc(c.name)}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`
      : '';
    const placeholder = `<div class="char-placeholder" ${c.photo?'style="display:none"':''}>${isFirst?'🎩':'🧩'}</div>`;

    return `
      <div class="char-card">
        ${photoHtml}${placeholder}
        <div class="char-overlay">
          <div class="char-role">${esc(c.role)}</div>
          <div class="char-name">${esc(c.name)}</div>
          <div class="char-desc">${esc(c.desc)}</div>
          ${c.cosplayer ? `<div class="char-cosplay-tag">📸 by ${esc(c.cosplayer)}</div>` : ''}
        </div>
      </div>`;
  }).join('');
}


// ── 갤러리 렌더 ────────────────────────
let _galleryFilter = 'all';

function renderGallery(filter) {
  _galleryFilter = filter || 'all';
  const grid = document.getElementById('gallery-grid');
  if (!grid) return;

  const items = (DATA.gallery || []).filter(g =>
    _galleryFilter === 'all' || g.category === _galleryFilter
  );

  if (!items.length) {
    grid.innerHTML = `<div style="grid-column:1/-1;padding:60px;text-align:center;color:var(--text-faint);font-size:13px">사진을 준비 중입니다.</div>`;
    return;
  }

  grid.innerHTML = items.map(g => {
    const imgHtml = g.src
      ? `<img src="${esc(g.src)}" alt="${esc(g.alt)}" loading="lazy" onerror="this.parentElement.innerHTML='<div class=\\'gallery-placeholder\\'>📷</div>'">`
      : `<div class="gallery-placeholder">📷</div>`;
    return `
      <div class="gallery-item" onclick="openLightbox('${esc(g.src)}','${esc(g.alt)}')">
        ${imgHtml}
        <div class="gallery-item-overlay">
          <span class="gallery-item-icon">🔍</span>
        </div>
      </div>`;
  }).join('');
}

function initGalleryFilter() {
  document.querySelectorAll('.gallery-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.gallery-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderGallery(btn.dataset.filter);
    });
  });
}

// 라이트박스
function openLightbox(src, alt) {
  if (!src) return;
  document.getElementById('lightbox-img').src = src;
  document.getElementById('lightbox-img').alt = alt || '';
  document.getElementById('lightbox').classList.add('open');
}
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
}
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});


// ── 퍼즐 카드 렌더 ─────────────────────
function renderPuzzleCards() {
  const wrap = document.getElementById('puzzle-cards');
  if (!wrap) return;
  wrap.innerHTML = (DATA.puzzles || []).map(p => `
    <div class="puzzle-card ${p.status === 'available' ? 'available' : ''}">
      <div class="puzzle-card-num">수수께끼 #${esc(p.num)}</div>
      <span class="puzzle-card-icon">${p.icon}</span>
      <div class="puzzle-card-title">${esc(p.title)}</div>
      <div class="puzzle-card-desc">${esc(p.desc)}</div>
      <div class="puzzle-card-badge">${p.status === 'available' ? '도전 가능' : '준비 중'}</div>
    </div>`).join('');
}


// ── NAV ────────────────────────────────
function initNav() {
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });

  const hamburger = document.getElementById('nav-hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });
    mobileMenu.querySelectorAll('.mobile-menu-link').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });
  }
}


// ── REVEAL 애니메이션 ───────────────────
function initReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}


// ── INIT ────────────────────────────────
function init() {
  renderHeroBanner();
  renderCharacters();
  renderGallery('all');
  initGalleryFilter();
  renderPuzzleCards();
  initNav();
  initReveal();
}

document.addEventListener('DOMContentLoaded', init);

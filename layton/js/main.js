// ═══════════════════════════════════════
//  오들오들 교수와 이상한 마을 — main.js
// ═══════════════════════════════════════

// ── 데이터 로드 ────────────────────────
function loadData() {
  try {
    const saved = localStorage.getItem('layton_data');
    DATA = saved ? JSON.parse(saved) : JSON.parse(JSON.stringify(DEFAULT_DATA));
  } catch(e) {
    DATA = JSON.parse(JSON.stringify(DEFAULT_DATA));
  }
}

// ── 유틸 ───────────────────────────────
function esc(str) {
  return String(str ?? '')
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
function nl2br(str) {
  return esc(str).replace(/\n/g, '<br>');
}
// **텍스트** → <strong>텍스트</strong>
function parseBold(str) {
  return esc(str).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
}


// ── 히어로 배너 ────────────────────────
function renderHeroBanner() {
  const slot  = document.getElementById('hero-bg-media');
  const h     = DATA.hero || {};
  const pngs  = h.pngs || [];
  const dur   = h.pngDuration ?? 1200;
  const fade  = h.pngFade     ?? 600;

  slot.innerHTML = '';

  // 1. 배경 이미지 레이어
  if (h.bgImage) {
    const bgEl = document.createElement('img');
    bgEl.src = h.bgImage;
    bgEl.alt = '';
    bgEl.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center top;';
    slot.appendChild(bgEl);
  }

  // 2. PNG 순차 연출
  if (!pngs.length) return;

  const pngLayer = document.createElement('div');
  pngLayer.style.cssText = 'position:absolute;inset:0;';
  slot.appendChild(pngLayer);

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

  function showAt(idx) {
    if (idx >= imgs.length) return;
    const img    = imgs[idx];
    const isLast = idx === imgs.length - 1;
    img.style.opacity = '1';
    if (isLast) return;
    setTimeout(() => {
      img.style.opacity = '0';
      setTimeout(() => showAt(idx + 1), fade);
    }, dur);
  }
  showAt(0);
}


// ── 히어로 텍스트 ──────────────────────
function renderHero() {
  const h = DATA.hero || {};
  const s = DATA.site || {};

  // 제목 (금색 첫 줄 처리)
  const titleEl = document.getElementById('hero-title');
  if (titleEl && h.title) {
    const lines = h.title.split('\n');
    titleEl.innerHTML = lines.map((l, i) =>
      i === 0 ? `<span class="gold">${esc(l)}</span>` : esc(l)
    ).join('<br>');
  }

  const subtitleEl = document.getElementById('hero-subtitle');
  if (subtitleEl) subtitleEl.innerHTML = nl2br(h.subtitle || '');

  const eyebrowEl = document.getElementById('hero-eyebrow');
  if (eyebrowEl) eyebrowEl.textContent = h.eyebrow || '';

  const ctaPrimEl = document.getElementById('hero-cta-primary');
  if (ctaPrimEl) ctaPrimEl.textContent = h.ctaPrimary || '';

  const ctaSecEl = document.getElementById('hero-cta-secondary');
  if (ctaSecEl) ctaSecEl.textContent = h.ctaSecondary || '';

  // Nav 로고
  const navLogoEl = document.getElementById('nav-logo-main');
  if (navLogoEl) navLogoEl.textContent = s.navLabel || '';
  const navSubEl = document.getElementById('nav-logo-sub');
  if (navSubEl) navSubEl.textContent = s.navSub || '';
}


// ── About ──────────────────────────────
function renderAbout() {
  const a = DATA.about || {};

  const titleEl = document.getElementById('about-title');
  if (titleEl) titleEl.innerHTML = nl2br(a.title || '');

  const labelEl = document.getElementById('about-label');
  if (labelEl) labelEl.textContent = a.label || '';

  const textEl = document.getElementById('about-text');
  if (textEl) {
    textEl.innerHTML = (a.paragraphs || [])
      .map(p => `<p>${parseBold(p)}</p>`).join('');
  }

  const quoteEl = document.getElementById('about-quote-text');
  if (quoteEl) quoteEl.textContent = a.quote || '';

  const authorEl = document.getElementById('about-quote-author');
  if (authorEl) authorEl.textContent = a.quoteAuthor || '';
}


// ── 캐릭터 ─────────────────────────────
function renderCharacters() {
  const grid = document.getElementById('char-grid');
  if (!grid) return;
  const chars = DATA.characters || [];

  grid.innerHTML = chars.map((c, i) => {
    const isFirst = i === 0;
    const ph = c.photo
      ? `<img class="char-photo" src="${esc(c.photo)}" alt="${esc(c.name)}"
           onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`
      : '';
    const placeholder = `<div class="char-placeholder" ${c.photo?'style="display:none"':''}>${isFirst?'🎩':'🧩'}</div>`;

    return `<div class="char-card">
      ${ph}${placeholder}
      <div class="char-overlay">
        <div class="char-role">${esc(c.role)}</div>
        <div class="char-name">${esc(c.name)}</div>
        <div class="char-desc">${esc(c.desc)}</div>
        ${c.cosplayer ? `<div class="char-cosplay-tag">📸 by ${esc(c.cosplayer)}</div>` : ''}
      </div>
    </div>`;
  }).join('');
}


// ── 수수께끼 카드 ──────────────────────
function renderPuzzleCards() {
  const wrap = document.getElementById('puzzle-cards');
  if (!wrap) return;
  const p = DATA.puzzles || {};

  const labelEl = document.getElementById('puzzles-label');
  if (labelEl) labelEl.textContent = p.label || '';
  const titleEl = document.getElementById('puzzles-title');
  if (titleEl) titleEl.textContent = p.title || '';
  const descEl  = document.getElementById('puzzles-desc');
  if (descEl)  descEl.textContent  = p.desc  || '';

  wrap.innerHTML = (p.items || []).map(item => `
    <div class="puzzle-card ${item.status==='available'?'available':''}">
      <div class="puzzle-card-num">수수께끼 #${esc(item.num)}</div>
      <span class="puzzle-card-icon">${item.icon || '🧩'}</span>
      <div class="puzzle-card-title">${esc(item.title)}</div>
      <div class="puzzle-card-desc">${esc(item.desc)}</div>
      <div class="puzzle-card-badge">${item.status==='available'?'도전 가능':'준비 중'}</div>
    </div>`).join('');
}


// ── 푸터 ───────────────────────────────
function renderFooter() {
  const s = DATA.site || {};
  const logoEl = document.getElementById('footer-logo');
  if (logoEl) logoEl.innerHTML = `${esc(s.navLabel||'')}<span>${esc(s.navSub||'')}</span>`;
  const tagEl = document.getElementById('footer-tagline');
  if (tagEl) tagEl.innerHTML = nl2br(s.tagline||'');
  const discEl = document.getElementById('footer-disclaimer');
  if (discEl) discEl.textContent = s.disclaimer || '';
}


// ── NAV ────────────────────────────────
function initNav() {
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });
  const hamburger  = document.getElementById('nav-hamburger');
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


// ── REVEAL ─────────────────────────────
function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}


// ── 어드민 바 ──────────────────────────
function checkAdminBar() {
  const params = new URLSearchParams(location.search);
  if (params.get('admin') === 'LAYTON2025' || sessionStorage.getItem('layton_admin')) {
    sessionStorage.setItem('layton_admin', '1');
    const bar = document.getElementById('admin-bar');
    if (bar) bar.style.display = 'block';
  }
}


// ── INIT ────────────────────────────────
function init() {
  loadData();
  renderHeroBanner();
  renderHero();
  renderAbout();
  renderCharacters();
  renderPuzzleCards();
  renderFooter();
  initNav();
  initReveal();
  checkAdminBar();
}

document.addEventListener('DOMContentLoaded', init);

// ── LOAD DATA ──────────────────────────────────────────
function loadData() {
  try {
    const saved = localStorage.getItem('odod_data');
    return saved ? JSON.parse(saved) : DEFAULT_DATA;
  } catch (e) {
    return DEFAULT_DATA;
  }
}

const DATA = loadData();

// ── YOUTUBE IFRAME API ─────────────────────────────────
// Load API script once; queue players until API is ready
window._ytPendingPlayers = [];
window._ytApiReady = false;

window.onYouTubeIframeAPIReady = function () {
  window._ytApiReady = true;
  window._ytPendingPlayers.forEach(_createYtPlayer);
  window._ytPendingPlayers = [];
};

function _loadYtApi() {
  if (document.getElementById('yt-api-script')) return;
  const s = document.createElement('script');
  s.id = 'yt-api-script';
  s.src = 'https://www.youtube.com/iframe_api';
  document.head.appendChild(s);
}

function _createYtPlayer({ elementId, videoId, slideEl }) {
  if (!videoId) return;
  // eslint-disable-next-line no-undef
  const player = new YT.Player(elementId, {
    videoId,
    playerVars: {
      autoplay: 1, mute: 1, loop: 1, playlist: videoId,
      controls: 0, rel: 0, modestbranding: 1,
      playsinline: 1, disablekb: 1, iv_load_policy: 3,
    },
    events: {
      onReady(e) {
        if (slideEl) slideEl._ytPlayer = e.target;
      },
    },
  });
}

function queueYtPlayer(config) {
  _loadYtApi();
  if (window._ytApiReady) _createYtPlayer(config);
  else window._ytPendingPlayers.push(config);
}


function extractYouTubeId(input) {
  if (!input) return '';
  const srcMatch = input.match(/src=["']([^"']+)/);
  const url = srcMatch ? srcMatch[1] : input;
  const m1 = url.match(/youtube\.com\/embed\/([^?&"'\s]+)/);
  const m2 = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?"\s]+)/);
  return (m1 || m2 || [])[1] || '';
}

// ── SOCIAL ICONS (shared by nav + footer) ─────────────
const SOCIAL_ICONS = {
  twitter:   `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/></svg>`,
  instagram: `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>`,
  youtube:   `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,
};
const SVG_MUTE   = `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 12A4.5 4.5 0 0014 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM19 12c0 3.02-1.67 5.65-4.14 7.05l1.42 1.42C19.11 18.44 21 15.42 21 12c0-3.42-1.89-6.44-4.72-8.47l-1.42 1.42C17.33 6.35 19 9 19 12zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>`;
const SVG_UNMUTE = `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0014 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>`;

// ── IMG HELPER ─────────────────────────────────────────
function imgOrPlaceholder(src, alt, cls = '') {
  const img = document.createElement('img');
  img.alt = alt || '';
  if (cls) img.className = cls;
  img.onerror = function () {
    const ph = document.createElement('div');
    ph.className = 'photo-placeholder';
    ph.innerHTML = `<span>${(alt || '?').charAt(0).toUpperCase()}</span>`;
    this.parentNode.replaceChild(ph, this);
  };
  img.src = src;
  return img;
}

// ── RENDER NAV ─────────────────────────────────────────
function renderNav() {
  const t = DATA.team;
  document.getElementById('nav-name').textContent = t.name;
  document.getElementById('nav-fullname').textContent = t.fullName;

  const socialLinks = document.getElementById('nav-social');
  if (socialLinks) {
    socialLinks.innerHTML = '';
    if (t.social) {
      Object.entries(t.social).forEach(([k, v]) => {
        if (v) {
          const a = document.createElement('a');
          a.href = v;
          a.target = '_blank';
          a.rel = 'noopener';
          a.className = 'nav-social-icon';
          a.setAttribute('aria-label', k);
          a.innerHTML = SOCIAL_ICONS[k.toLowerCase()] || k.charAt(0).toUpperCase();
          socialLinks.appendChild(a);
        }
      });
    }
  }
}

// ── RENDER HERO ────────────────────────────────────────
let _bannerIndex = 0;
let _bannerTimer = null;

function renderHero() {
  const t = DATA.team;
  const tagEl = document.getElementById('hero-tag');
  if (tagEl) tagEl.textContent = [t.league, t.city, t.founded].filter(Boolean).join(' · ');
  const titleEl = document.getElementById('hero-title');
  if (titleEl) titleEl.textContent = t.name;
  document.getElementById('hero-slogan').textContent = `"${t.slogan}"`;

  // ── Rolling banner (독립 banners 배열) ──────────────
  const banner = document.getElementById('hero-banner');
  const dotsEl = document.getElementById('hero-banner-dots');
  if (!banner || !dotsEl) return;
  banner.innerHTML = '';
  dotsEl.innerHTML = '';

  const banners = (DATA.banners || []).filter(b => b.image || b.video);

  if (banners.length === 0) {
    // 등록된 배너 없음 → 빈 플레이스홀더
    const ph = document.createElement('div');
    ph.className = 'hero-slide active';
    ph.innerHTML = `<div class="hero-slide-placeholder"><span>ODOD</span></div>`;
    banner.appendChild(ph);
    updateBannerInfo(0);
  } else {
    banners.forEach((b, i) => {
      const slide = document.createElement('div');
      slide.className = 'hero-slide' + (i === 0 ? ' active' : '');

      if (b.video) {
        const wrap = document.createElement('div');
        wrap.className = 'hero-slide-video';
        const isLocal = /\.(mp4|webm|ogg)$/i.test(b.video.trim());
        if (isLocal) {
          // 로컬 MP4/영상 파일
          const vid = document.createElement('video');
          vid.src = b.video;
          vid.autoplay = true;
          vid.muted = true;
          vid.loop = true;
          vid.playsInline = true;
          vid.setAttribute('playsinline', '');
          wrap.appendChild(vid);
        } else {
          // YouTube embed — use IFrame API so we detect PLAYING and remove overlay
          const videoId = extractYouTubeId(b.video);
          // Div placeholder: YT.Player replaces this with an iframe
          const placeholder = document.createElement('div');
          placeholder.id = 'yt-banner-' + i;
          wrap.appendChild(placeholder);
          // Shield: sits above the iframe, blocks mouse hover → no hover controls
          const shield = document.createElement('div');
          shield.className = 'yt-shield';
          wrap.appendChild(shield);
          queueYtPlayer({ elementId: 'yt-banner-' + i, videoId, slideEl: slide });
        }
        slide.appendChild(wrap);
      } else {
        // 이미지 배너
        const img = document.createElement('img');
        img.src = b.image;
        img.alt = b.caption || `배너 ${i + 1}`;
        img.onerror = function () {
          const ph = document.createElement('div');
          ph.className = 'hero-slide-placeholder';
          ph.innerHTML = `<span>ODOD</span>`;
          slide.replaceChild(ph, img);
        };
        slide.appendChild(img);
      }

      banner.appendChild(slide);

      const dot = document.createElement('div');
      dot.className = 'banner-dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => goToSlide(i));
      dotsEl.appendChild(dot);
    });

    updateBannerInfo(0);

    // 화살표 버튼 연결
    const prevBtn = document.getElementById('banner-prev');
    const nextBtn = document.getElementById('banner-next');
    if (prevBtn) prevBtn.onclick = () => goToSlide((_bannerIndex - 1 + banners.length) % banners.length);
    if (nextBtn) nextBtn.onclick = () => goToSlide((_bannerIndex + 1) % banners.length);

    // 배너가 1개면 화살표 + 프로그레스 바 숨김
    const pb = document.getElementById('banner-progress');
    if (banners.length <= 1) {
      if (prevBtn) prevBtn.style.display = 'none';
      if (nextBtn) nextBtn.style.display = 'none';
      if (pb) pb.style.display = 'none';
    }

    if (_bannerTimer) clearInterval(_bannerTimer);
    if (banners.length > 1) {
      resetProgressBar();
      _bannerTimer = setInterval(() => {
        goToSlide((_bannerIndex + 1) % banners.length);
      }, 7000);
    }

    // ── 드래그 / 스와이프 이동 ────────────────────────
    let _dragStartX = null;
    let _isDragging = false;
    const DRAG_THRESHOLD = 50;

    function onDragStart(x) { _dragStartX = x; _isDragging = false; }
    function onDragMove(x)  { if (_dragStartX !== null && Math.abs(x - _dragStartX) > 8) _isDragging = true; }
    function onDragEnd(x) {
      if (_dragStartX === null) return;
      const diff = x - _dragStartX;
      if (Math.abs(diff) >= DRAG_THRESHOLD && banners.length > 1) {
        if (diff < 0) goToSlide((_bannerIndex + 1) % banners.length);
        else          goToSlide((_bannerIndex - 1 + banners.length) % banners.length);
      }
      _dragStartX = null;
    }

    const heroEl = document.getElementById('hero');
    if (heroEl) {
      // 마우스
      heroEl.addEventListener('mousedown',  e => onDragStart(e.clientX));
      heroEl.addEventListener('mousemove',  e => onDragMove(e.clientX));
      heroEl.addEventListener('mouseup',    e => onDragEnd(e.clientX));
      heroEl.addEventListener('mouseleave', e => { if (_dragStartX !== null) onDragEnd(e.clientX); });
      // 슬라이드 클릭 이벤트가 드래그 후 발동되지 않도록 캡처 단계에서 차단
      heroEl.addEventListener('click', e => { if (_isDragging) { e.stopPropagation(); _isDragging = false; } }, true);
      // 터치
      heroEl.addEventListener('touchstart', e => onDragStart(e.touches[0].clientX),      { passive: true });
      heroEl.addEventListener('touchmove',  e => onDragMove(e.touches[0].clientX),       { passive: true });
      heroEl.addEventListener('touchend',   e => onDragEnd(e.changedTouches[0].clientX), { passive: true });
    }
  }

  // ── Staff strip ─────────────────────────────────────
  const staffStrip = document.getElementById('hero-staff');
  if (!staffStrip) return;
  staffStrip.innerHTML = '';

  DATA.staff.forEach(s => {
    const item = document.createElement('div');
    item.className = 'hero-staff-item';

    const ph = document.createElement('div');
    ph.style.cssText = 'width:32px;height:32px;border-radius:50%;overflow:hidden;border:0.5px solid rgba(240,235,228,0.13);flex-shrink:0;background:var(--bg3)';
    const img = imgOrPlaceholder(s.photo, s.nickname);
    img.style.cssText = 'width:100%;height:100%;object-fit:cover;';
    ph.appendChild(img);

    item.appendChild(ph);
    const sInfo = document.createElement('div');
    sInfo.className = 'hero-staff-info';
    sInfo.innerHTML = `<div class="hero-staff-role">${s.role}</div><div class="hero-staff-nick">${s.nickname}</div>`;
    item.appendChild(sInfo);
    item.addEventListener('click', () => openStaffPopup(s));
    staffStrip.appendChild(item);
  });
}

function goToSlide(idx) {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.banner-dot');
  if (!slides.length) return;

  slides[_bannerIndex].classList.remove('active');
  dots[_bannerIndex].classList.remove('active');

  _bannerIndex = idx;

  slides[_bannerIndex].classList.add('active');
  dots[_bannerIndex].classList.add('active');
  updateBannerInfo(_bannerIndex);
  resetProgressBar();

  // Resume video if browser throttled hidden iframe
  const slide = slides[_bannerIndex];
  if (slide._ytPlayer) {
    try { slide._ytPlayer.playVideo(); } catch(e) {}
  }
}

function updateBannerInfo(idx) {
  const banners = (DATA.banners || []).filter(b => b.image || b.video);
  const b = banners[idx];
  const posEl = document.getElementById('hbn-pos');
  const nickEl = document.getElementById('hbn-nick');
  if (posEl) posEl.textContent = banners.length > 1 ? `${idx + 1} / ${banners.length}` : '';
  if (nickEl) {
    nickEl.style.opacity = '0';
    setTimeout(() => {
      nickEl.textContent = b ? b.caption : '';
      nickEl.style.opacity = '1';
    }, 200);
  }
}

// ── RENDER STATS ───────────────────────────────────────
function renderStats() {
  const t = DATA.team;
  document.getElementById('stat-standing').textContent = `${t.standing}위`;
  document.getElementById('stat-record').textContent = `${t.record.wins}W ${t.record.losses}L`;
  document.getElementById('stat-winrate').textContent = `${t.winRate}%`;
  document.getElementById('stat-worlds').textContent = `${t.worldsAppearances}회`;
}

// ── RENDER RESULTS ─────────────────────────────────────
function renderResults() {
  const tbody = document.getElementById('results-tbody');
  if (!tbody) return;
  tbody.innerHTML = '';

  if (!DATA.results.length) {
    tbody.innerHTML = `<tr><td colspan="5" class="section-empty">첫 시즌 준비 중</td></tr>`;
    return;
  }
  DATA.results.forEach(r => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${r.date}</td>
      <td>${r.stage}</td>
      <td>vs <strong style="color:var(--text)">${r.opponent}</strong></td>
      <td class="result-score">${r.score}</td>
      <td><span class="result-badge ${r.result}">${r.result}</span></td>
    `;
    tbody.appendChild(tr);
  });
}

// ── RENDER SCHEDULE ────────────────────────────────────
function renderSchedule() {
  const list = document.getElementById('schedule-list');
  if (!list) return;
  list.innerHTML = '';

  if (!DATA.schedule.length) {
    list.innerHTML = `<div class="section-empty">일정 공개 예정</div>`;
    return;
  }
  DATA.schedule.forEach(s => {
    const item = document.createElement('div');
    item.className = 'schedule-item';
    item.innerHTML = `
      <span class="schedule-date">${s.date}</span>
      <span class="schedule-vs">vs ${s.opponent}<span>${s.stage}</span></span>
      <span class="schedule-time">${s.time} KST</span>
    `;
    list.appendChild(item);
  });
}

// ── RENDER ROSTER ──────────────────────────────────────
function renderRoster() {
  const grid = document.getElementById('roster-grid');
  if (!grid) return;
  const sub = document.getElementById('roster-season-sub');
  if (sub) sub.textContent = `${DATA.team.season} Season`;
  grid.innerHTML = '';

  DATA.players.forEach((p, pi) => {
    const card = document.createElement('div');
    card.className = 'roster-card';

    const wrap = document.createElement('div');
    wrap.className = 'roster-photo-wrap';

    if (p.isAce) {
      const badge = document.createElement('div');
      badge.className = 'roster-ace-badge';
      badge.textContent = 'ACE';
      wrap.appendChild(badge);
    }

    const img = imgOrPlaceholder(p.photo, p.nickname);
    wrap.appendChild(img);

    // 비교 버튼
    const cmpBtn = document.createElement('button');
    cmpBtn.className = 'roster-compare-btn';
    cmpBtn.textContent = '+';
    cmpBtn.title = '비교에 추가';
    cmpBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleCompare(p.id, cmpBtn);
    });
    wrap.appendChild(cmpBtn);

    card.appendChild(wrap);
    const rInfo = document.createElement('div');
    rInfo.className = 'roster-info';
    rInfo.innerHTML = `<div class="roster-pos">${p.positionKo}</div><div class="roster-nick">${p.nickname}</div><div class="roster-name">${p.realNameKo}</div>`;
    card.appendChild(rInfo);

    card.addEventListener('click', () => openPlayerPopup(p, pi));
    grid.appendChild(card);
  });
}

// ── RENDER STAFF ROSTER ROW ────────────────────────────
function renderStaffRoster() {
  const row = document.getElementById('roster-staff-row');
  if (!row) return;
  row.innerHTML = '';

  DATA.staff.forEach(s => {
    const card = document.createElement('div');
    card.className = 'staff-roster-card';

    const photoWrap = document.createElement('div');
    photoWrap.className = 'staff-roster-photo';
    const img = document.createElement('img');
    img.src = s.photo;
    img.alt = s.nickname;
    img.onerror = function () {
      photoWrap.innerHTML = `<div class="staff-roster-photo-ph">${s.nickname.charAt(0)}</div>`;
    };
    photoWrap.appendChild(img);

    card.appendChild(photoWrap);
    const srInfo = document.createElement('div');
    srInfo.className = 'staff-roster-info';
    srInfo.innerHTML = `<div class="staff-roster-role">${s.roleKo}</div><div class="staff-roster-nick">${s.nickname}</div><div class="staff-roster-name">${s.realNameKo}</div>`;
    card.appendChild(srInfo);
    card.addEventListener('click', () => openStaffPopup(s));
    row.appendChild(card);
  });
}

// ── RENDER GALLERY ─────────────────────────────────────
function renderGallery() {
  const grid = document.getElementById('gallery-grid');
  if (!grid) return;
  grid.innerHTML = '';

  DATA.gallery.forEach(g => {
    const item = document.createElement('div');
    item.className = 'gallery-item';

    const img = document.createElement('img');
    img.src = g.src;
    img.alt = g.caption;
    img.onerror = function () {
      const ph = document.createElement('div');
      ph.className = 'gallery-placeholder';
      ph.innerHTML = `<span>${g.caption}</span>`;
      if (this.parentNode) this.parentNode.replaceChild(ph, this);
    };

    const caption = document.createElement('div');
    caption.className = 'gallery-caption';
    caption.textContent = g.caption;

    item.appendChild(img);
    item.appendChild(caption);
    item.style.cursor = 'pointer';
    item.addEventListener('click', () => openLightbox(g));
    grid.appendChild(item);
  });
}

// ── RENDER SPONSORS ────────────────────────────────────
function renderSponsors() {
  const row = document.getElementById('sponsors-row');
  if (!row) return;
  row.innerHTML = '';

  DATA.sponsors.forEach(s => {
    const item = document.createElement('a');
    item.className = 'sponsor-item';
    item.href = s.url || '#';
    item.target = '_blank';

    if (s.logo) {
      const img = document.createElement('img');
      img.src = s.logo;
      img.alt = s.name;
      img.onerror = function () {
        this.parentNode.innerHTML = `<span class="sponsor-name-text">${s.name}</span>`;
      };
      item.appendChild(img);
    } else {
      item.innerHTML = `<span class="sponsor-name-text">${s.name}</span>`;
    }

    row.appendChild(item);
  });
}

// ── LIVE WIDGET ────────────────────────────────────────
function renderLive() {
  const live = DATA.live;
  const widget = document.getElementById('live-widget');
  if (!widget || !live || !live.active) return;

  widget.style.display = 'block';

  // nav badge: "ODOD 1 — T1 0" 형식
  const [myScore, oppScore] = (live.score || '0-0').split('-');
  const nav = document.getElementById('live-match-nav');
  if (nav) {
    nav.innerHTML = `ODOD <span style="color:var(--orange);margin:0 4px">${myScore}</span><span style="color:var(--text-dim)">—</span><span style="margin:0 4px">${oppScore}</span>${live.opponent}`;
  }

  // panel
  const scoreEl = document.getElementById('live-panel-score');
  if (scoreEl) {
    scoreEl.innerHTML = `<span class="score-my">ODOD ${myScore}</span><span class="score-sep">—</span>${oppScore} ${live.opponent}`;
  }
  const statusEl = document.getElementById('live-panel-status');
  if (statusEl) statusEl.textContent = live.mapStatus || '';

  const timerEl = document.getElementById('live-panel-timer');
  if (timerEl) timerEl.textContent = live.timer || '';

  const linkEl = document.getElementById('live-panel-link');
  if (linkEl && live.stream) linkEl.href = live.stream;
}

function toggleLivePanel() {
  const panel = document.getElementById('live-panel');
  if (panel) panel.classList.toggle('open');
}

// 패널 외부 클릭 시 닫기
document.addEventListener('click', (e) => {
  const widget = document.getElementById('live-widget');
  const panel = document.getElementById('live-panel');
  if (panel && panel.classList.contains('open') && widget && !widget.contains(e.target)) {
    panel.classList.remove('open');
  }
});

// ── COMPARE MODE ───────────────────────────────────────
let _compareSelected = [];

function toggleCompare(playerId, btn) {
  const idx = _compareSelected.indexOf(playerId);
  if (idx !== -1) {
    _compareSelected.splice(idx, 1);
    btn.classList.remove('selected');
    btn.textContent = '+';
  } else {
    if (_compareSelected.length >= 2) return; // 최대 2명
    _compareSelected.push(playerId);
    btn.classList.add('selected');
    btn.textContent = '✓';
  }

  const toast = document.getElementById('compare-toast');
  if (_compareSelected.length === 0) {
    toast.style.display = 'none';
  } else if (_compareSelected.length === 1) {
    toast.style.display = 'flex';
    document.getElementById('compare-toast-text').textContent = '선수 1명 더 선택하면 비교합니다';
  } else {
    toast.style.display = 'none';
    openCompare();
  }
}

function clearCompare() {
  _compareSelected = [];
  document.querySelectorAll('.roster-compare-btn').forEach(b => {
    b.classList.remove('selected');
    b.textContent = '+';
  });
  document.getElementById('compare-toast').style.display = 'none';
}

function openCompare() {
  const [idA, idB] = _compareSelected;
  const pA = DATA.players.find(p => p.id === idA);
  const pB = DATA.players.find(p => p.id === idB);
  if (!pA || !pB) return;

  const STATS = [
    { key: 'kda',      label: 'KDA',    fmt: v => v.toFixed(1) },
    { key: 'winRate',  label: '승률',   fmt: v => v.toFixed(1) + '%' },
    { key: 'csPerMin', label: 'CS/분',  fmt: v => v.toFixed(1) },
    { key: 'kills',    label: '킬',     fmt: v => v.toFixed(1) },
    { key: 'deaths',   label: '데스',   fmt: v => v.toFixed(1), invert: true },
    { key: 'assists',  label: '어시',   fmt: v => v.toFixed(1) },
  ];

  function playerCard(p) {
    const img = p.photoThumb || p.photo
      ? `<img class="compare-player-img" src="${p.photoThumb || p.photo}" alt="${p.nickname}" onerror="this.outerHTML='<div class=\\'compare-player-img\\'></div>'" />`
      : `<div class="compare-player-img"></div>`;
    return `
      <div class="compare-player">
        ${img}
        <div class="compare-player-pos">${p.positionKo}</div>
        <div class="compare-player-nick">${p.nickname}</div>
      </div>`;
  }

  document.getElementById('compare-header').innerHTML =
    playerCard(pA) +
    `<div class="compare-vs">VS</div>` +
    playerCard(pB);

  document.getElementById('compare-stats').innerHTML = STATS.map(s => {
    const vA = pA.stats?.[s.key] ?? 0;
    const vB = pB.stats?.[s.key] ?? 0;
    const aWins = s.invert ? vA < vB : vA > vB;
    const bWins = s.invert ? vB < vA : vB > vA;
    return `
      <div class="compare-stat-row">
        <div class="compare-stat-val compare-stat-val-left ${aWins ? 'win' : ''}">${s.fmt(vA)}</div>
        <div class="compare-stat-lbl">${s.label}</div>
        <div class="compare-stat-val compare-stat-val-right ${bWins ? 'win' : ''}">${s.fmt(vB)}</div>
      </div>`;
  }).join('');

  document.getElementById('compare-overlay').classList.add('open');
}

function closeCompare() {
  document.getElementById('compare-overlay').classList.remove('open');
  clearCompare();
}

// ── MVP VOTE ───────────────────────────────────────────
function renderMvpVote() {
  const section = document.getElementById('mvp-section');
  const body    = document.getElementById('mvp-body');
  const matchLbl = document.getElementById('mvp-match-label');
  if (!section || !body) return;

  const results = DATA.results || [];
  if (results.length === 0) return;

  // 가장 최근 경기
  const latest = results[0];
  const matchKey = `mvp_${latest.date}_${latest.opponent}`.replace(/\s/g, '_');

  section.style.display = '';
  if (matchLbl) matchLbl.textContent = `vs ${latest.opponent} · ${latest.date}`;

  const players = DATA.players || [];
  const voted = localStorage.getItem('odod_mvp_voted');
  const votedKey = localStorage.getItem('odod_mvp_voted_key');

  // 가짜 투표 사전 시딩 (처음 로드 시 한 번만)
  const countKey = 'odod_mvp_counts_' + matchKey;
  if (!localStorage.getItem(countKey) && players.length > 0) {
    const seed = {};
    // 각 선수별 시드값: KDA × 게임수 기반으로 현실적인 분포 생성
    const base = players.reduce((s, p) => s + (p.stats?.kda || 3) * (p.games || 50), 0);
    players.forEach(p => {
      const weight = (p.stats?.kda || 3) * (p.games || 50);
      const raw = Math.round((weight / base) * 2800) + Math.floor(Math.random() * 180 + 20);
      seed[p.id] = raw;
    });
    // Ace 플레이어 보너스
    const ace = players.find(p => p.isAce);
    if (ace) seed[ace.id] = Math.round(seed[ace.id] * 1.35);
    localStorage.setItem(countKey, JSON.stringify(seed));
  }

  // 이미 투표했고 같은 경기면 결과 표시
  if (voted && votedKey === matchKey) {
    renderMvpResults(body, matchKey, players, voted);
  } else {
    // 다른 경기면 이전 투표 초기화
    if (votedKey !== matchKey) {
      localStorage.removeItem('odod_mvp_voted');
      localStorage.removeItem('odod_mvp_voted_key');
      // 이전 경기 카운트도 초기화
      localStorage.removeItem('odod_mvp_counts_' + votedKey);
    }
    renderMvpCandidates(body, matchKey, players);
  }
}

function renderMvpCandidates(body, matchKey, players) {
  body.innerHTML = `<div class="mvp-candidates">${
    players.map(p => `
      <button class="mvp-btn" onclick="castMvpVote('${matchKey}','${p.id}')">
        ${p.photoThumb || p.photo
          ? `<img class="mvp-btn-thumb" src="${p.photoThumb || p.photo}" alt="${p.nickname}" onerror="this.outerHTML='<div class=\\'mvp-btn-thumb\\'></div>'" />`
          : `<div class="mvp-btn-thumb"></div>`}
        <div>
          <span class="mvp-btn-pos">${p.positionKo}</span>
          <span class="mvp-btn-nick">${p.nickname}</span>
        </div>
      </button>`).join('')}
  </div>`;
}

function castMvpVote(matchKey, playerId) {
  const countKey = 'odod_mvp_counts_' + matchKey;
  const raw = localStorage.getItem(countKey);
  const counts = raw ? JSON.parse(raw) : {};
  counts[playerId] = (counts[playerId] || 0) + 1;
  localStorage.setItem(countKey, JSON.stringify(counts));
  localStorage.setItem('odod_mvp_voted', playerId);
  localStorage.setItem('odod_mvp_voted_key', matchKey);

  const body = document.getElementById('mvp-body');
  if (body) renderMvpResults(body, matchKey, DATA.players, playerId);
}

function renderMvpResults(body, matchKey, players, myVote) {
  const countKey = 'odod_mvp_counts_' + matchKey;
  const raw = localStorage.getItem(countKey);
  const counts = raw ? JSON.parse(raw) : {};

  const total = Object.values(counts).reduce((s, v) => s + v, 0) || 1;
  const maxVotes = Math.max(...Object.values(counts), 1);

  const rows = players.map(p => {
    const votes = counts[p.id] || 0;
    const pct   = Math.round((votes / total) * 100);
    const isWinner = votes === maxVotes && votes > 0;
    return { p, votes, pct, isWinner };
  }).sort((a, b) => b.votes - a.votes);

  body.innerHTML = `
    <div class="mvp-results">
      ${rows.map(({ p, pct, isWinner }) => `
        <div class="mvp-result-row">
          <div class="mvp-result-name ${isWinner ? 'winner' : ''}">${p.nickname}</div>
          <div class="mvp-result-bar-wrap">
            <div class="mvp-result-bar ${isWinner ? 'winner' : ''}" style="width:${pct}%"></div>
          </div>
          <div class="mvp-result-pct ${isWinner ? 'winner' : ''}">${pct}%</div>
        </div>`).join('')}
    </div>
    <p class="mvp-voted-note">투표해주셔서 감사합니다 · 내 선택: ${players.find(p => p.id === myVote)?.nickname || '?'}</p>
  `;
}

// ── RENDER CHAMPION POOL ───────────────────────────────
function renderChampPool() {
  const grid = document.getElementById('champ-pool-grid');
  if (!grid) return;

  // 전 선수 챔피언 데이터 집계
  const map = {};
  (DATA.players || []).forEach(p => {
    (p.champions || []).forEach(c => {
      if (!c.name) return;
      if (!map[c.name]) {
        map[c.name] = { name: c.name, image: c.image, games: 0, winRateSum: 0, count: 0 };
      }
      map[c.name].games     += (c.games || 0);
      map[c.name].winRateSum += (c.winRate || 0) * (c.games || 0);
      map[c.name].count     += 1;
    });
  });

  const champs = Object.values(map)
    .sort((a, b) => b.games - a.games);

  if (champs.length === 0) return;

  const maxGames = champs[0].games;

  grid.innerHTML = champs.map(c => {
    const barPct = maxGames > 0 ? Math.round((c.games / maxGames) * 100) : 0;
    const imgHtml = c.image
      ? `<img class="champ-cell-img" src="${c.image}" alt="${c.name}" onerror="this.outerHTML='<div class=\\'champ-cell-placeholder\\'>${c.name.slice(0,3).toUpperCase()}</div>'" />`
      : `<div class="champ-cell-placeholder">${c.name.slice(0,3).toUpperCase()}</div>`;
    return `
      <div class="champ-cell">
        ${imgHtml}
        <div class="champ-cell-overlay"></div>
        <div class="champ-cell-info">
          <span class="champ-cell-name">${c.name}</span>
          <span class="champ-cell-games">${c.games}G</span>
        </div>
        <div class="champ-cell-bar-wrap">
          <div class="champ-cell-bar" style="width:${barPct}%"></div>
        </div>
      </div>`;
  }).join('');
}

// ── RENDER SPONSORSHIP ─────────────────────────────────
function renderSponsorship() {
  const t = DATA.team;
  const contact = t.contact || 'partnership@odod.gg';

  const introEl = document.getElementById('sp-intro-text');
  if (introEl) {
    introEl.textContent = `${t.name}는 ${t.league} 무대에서 성장하는 팀입니다. 저희와 함께하는 파트너사는 경기 중계, SNS, 유니폼, 공식 채널 등 다양한 노출 기회를 얻게 됩니다.`;
  }

  const tiers = DATA.sponsorshipTiers || [];
  const grid = document.getElementById('sp-grid');
  if (!grid) return;

  grid.innerHTML = tiers.map((tier, i) => {
    const isTitle = tier.id === 'title' || i === tiers.length - 1;
    return `
      <div class="sp-card ${isTitle ? 'tier-title' : ''}">
        <div class="sp-card-tier">${tier.tier || tier.name}</div>
        <div class="sp-card-name">${tier.name}</div>
        <div class="sp-card-price">${tier.price || '문의 시 협의'}</div>
        <div class="sp-card-divider"></div>
        <ul class="sp-card-benefits">
          ${(tier.benefits || []).map(b => `<li>${b}</li>`).join('')}
        </ul>
      </div>`;
  }).join('');

  const ctaBtn = document.getElementById('sp-cta-btn');
  if (ctaBtn) ctaBtn.href = `mailto:${contact}?subject=${t.name} 파트너십 문의`;
}

// ── RENDER MEDIA KIT ───────────────────────────────────
function renderMediaKit() {
  const mk = DATA.mediakit;
  const grid = document.getElementById('mk-grid');
  if (!grid || !mk) return;

  const ICONS = { logo: '◈', photos: '◉', presskit: '◎', brandguide: '◻' };
  const KEYS  = ['logo', 'photos', 'presskit', 'brandguide'];

  grid.innerHTML = KEYS.map(key => {
    const item = mk[key] || {};
    const hasFile = !!item.file;
    if (hasFile) {
      return `
        <a class="mk-card" href="${item.file}" download target="_blank" rel="noopener">
          <div class="mk-card-icon">${ICONS[key]}</div>
          <div class="mk-card-label">${item.label || key}</div>
          <div class="mk-card-desc">${item.desc || ''}</div>
          <div class="mk-card-action">다운로드 →</div>
        </a>`;
    } else {
      return `
        <div class="mk-card mk-unavailable">
          <div class="mk-card-icon">${ICONS[key]}</div>
          <div class="mk-card-label">${item.label || key}</div>
          <div class="mk-card-desc">${item.desc || ''}</div>
          <div class="mk-card-action">준비 중</div>
        </div>`;
    }
  }).join('');
}

// ── RENDER FOOTER ──────────────────────────────────────
function renderFooter() {
  const t = DATA.team;

  const brandEl = document.getElementById('footer-brand');
  if (brandEl) brandEl.textContent = t.name;

  const leagueEl = document.getElementById('footer-league');
  if (leagueEl) leagueEl.textContent = `${t.league} · ${t.city} · Est. ${t.founded}`;

  const copyEl = document.getElementById('footer-copy');
  if (copyEl) copyEl.textContent = `© ${new Date().getFullYear()} ${t.name} Esports`;

  const sloganEl = document.getElementById('footer-slogan');
  if (sloganEl) sloganEl.textContent = `"${t.slogan}"`;

  const social = document.getElementById('footer-social');
  if (social && t.social) {
    social.innerHTML = '';
    Object.entries(t.social).forEach(([k, v]) => {
      if (v) {
        const a = document.createElement('a');
        a.href = v;
        a.target = '_blank';
        a.rel = 'noopener';
        a.className = 'nav-social-icon';
        a.setAttribute('aria-label', k);
        a.innerHTML = SOCIAL_ICONS[k.toLowerCase()] || k.charAt(0).toUpperCase();
        social.appendChild(a);
      }
    });
  }
}

// ── BANNER PROGRESS BAR ────────────────────────────────
function resetProgressBar() {
  const pb = document.getElementById('banner-progress');
  if (!pb) return;
  pb.style.animation = 'none';
  pb.offsetHeight; // force reflow
  pb.style.animation = 'bannerProgressAnim 7s linear forwards';
}

// ── GALLERY LIGHTBOX ───────────────────────────────────
function openLightbox(g) {
  const lb = document.getElementById('lightbox');
  if (!lb) return;
  document.getElementById('lightbox-img').src = g.src;
  document.getElementById('lightbox-caption').textContent = g.caption || '';
  lb.classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  const lb = document.getElementById('lightbox');
  if (lb) lb.classList.remove('active');
  document.body.style.overflow = '';
}

// ── POPUP: PLAYER ──────────────────────────────────────
let _isMuted = true;
let _currentPlayerIdx = -1;


function buildYoutubeUrl(url, muted) {
  // Accept full YouTube URL or embed URL, return embed URL with params
  let videoId = '';
  const matchEmbed = url.match(/youtube\.com\/embed\/([^?]+)/);
  const matchWatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?]+)/);
  if (matchEmbed) videoId = matchEmbed[1];
  else if (matchWatch) videoId = matchWatch[1];
  else return url; // Not a YouTube URL — return as-is

  const params = new URLSearchParams({
    autoplay: 1,
    mute: muted ? 1 : 0,
    loop: 1,
    playlist: videoId,
    rel: 0,
    modestbranding: 1,
    enablejsapi: 1,
  });
  return `https://www.youtube.com/embed/${videoId}?${params}`;
}

function openPlayerPopup(p, idx) {
  _currentPlayerIdx = (idx !== undefined) ? idx : DATA.players.findIndex(pl => pl.id === p.id);
  const overlay = document.getElementById('popup-overlay');
  const popup = document.getElementById('popup');
  popup.className = 'popup player-popup';

  // Show/hide correct sections
  document.getElementById('popup-video').style.display = '';
  document.getElementById('popup-photo').style.display = 'none';
  document.getElementById('popup-philosophy').style.display = 'none';
  document.getElementById('popup-champs-section').style.display = '';

  // Left: full-panel video or player photo as background
  _isMuted = true;
  const videoEl = document.getElementById('popup-video-inner');
  const muteBtn = document.getElementById('popup-mute-btn');

  if (p.highlight) {
    videoEl.innerHTML = `<iframe src="${buildYoutubeUrl(p.highlight, true)}"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen></iframe>`;
    muteBtn.style.display = 'flex';
    muteBtn.innerHTML = SVG_MUTE;
    muteBtn.onclick = () => {
      _isMuted = !_isMuted;
      muteBtn.innerHTML = _isMuted ? SVG_MUTE : SVG_UNMUTE;
      videoEl.innerHTML = `<iframe src="${buildYoutubeUrl(p.highlight, _isMuted)}"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen></iframe>`;
    };
  } else {
    // No highlight: show player photo as full background
    const ph = document.createElement('div');
    ph.className = 'popup-video-placeholder';
    const img = document.createElement('img');
    img.src = p.photo;
    img.alt = p.nickname;
    img.onerror = function () {
      ph.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;"><span style="font-size:72px;font-weight:900;color:rgba(240,235,228,0.06);">${p.nickname.charAt(0)}</span></div>`;
    };
    ph.appendChild(img);
    ph.innerHTML += `<span class="ph-label">Highlight TBD</span>`;
    videoEl.innerHTML = '';
    videoEl.appendChild(ph);
    muteBtn.style.display = 'none';
  }

  // Right: header (thumb + info)
  const thumbEl = document.getElementById('popup-thumb');
  thumbEl.innerHTML = '';
  const thumbSrc = p.photoThumb || p.photo;
  if (thumbSrc) {
    const tImg = document.createElement('img');
    tImg.src = thumbSrc;
    tImg.alt = p.nickname;
    tImg.onerror = function () {
      thumbEl.innerHTML = `<div class="popup-thumb-placeholder">${p.nickname.charAt(0)}</div>`;
    };
    thumbEl.appendChild(tImg);
  } else {
    thumbEl.innerHTML = `<div class="popup-thumb-placeholder">${p.nickname.charAt(0)}</div>`;
  }

  document.getElementById('popup-pos').textContent = `${p.positionKo} · #${p.number}`;
  document.getElementById('popup-nick').textContent = p.nickname;
  document.getElementById('popup-realname').textContent = `${p.realNameKo} / ${p.realName}`;

  const metaGrid = document.getElementById('popup-meta');
  metaGrid.innerHTML = `
    <div class="popup-meta-item"><div class="popup-meta-label">나이</div><div class="popup-meta-value">${p.age}세</div></div>
    <div class="popup-meta-item"><div class="popup-meta-label">생년월일</div><div class="popup-meta-value">${p.birthdate}</div></div>
    <div class="popup-meta-item"><div class="popup-meta-label">합류</div><div class="popup-meta-value">${p.joinYear}년</div></div>
    <div class="popup-meta-item"><div class="popup-meta-label">총 경기</div><div class="popup-meta-value">${p.games}게임</div></div>
  `;

  const statsEl = document.getElementById('popup-stats');
  const s = p.stats;
  statsEl.innerHTML = `
    <div class="popup-stat"><div class="popup-stat-val">${s.kda}</div><div class="popup-stat-lbl">KDA</div></div>
    <div class="popup-stat"><div class="popup-stat-val">${s.winRate}%</div><div class="popup-stat-lbl">승률</div></div>
    <div class="popup-stat"><div class="popup-stat-val">${s.csPerMin}</div><div class="popup-stat-lbl">CS/분</div></div>
    <div class="popup-stat"><div class="popup-stat-val">${s.kills}</div><div class="popup-stat-lbl">킬</div></div>
    <div class="popup-stat"><div class="popup-stat-val">${s.deaths}</div><div class="popup-stat-lbl">데스</div></div>
    <div class="popup-stat"><div class="popup-stat-val">${s.assists}</div><div class="popup-stat-lbl">어시스트</div></div>
  `;

  const champsEl = document.getElementById('popup-champs');
  champsEl.innerHTML = '';
  (p.champions || []).forEach(c => {
    const div = document.createElement('div');
    div.className = 'popup-champ';
    if (c.image) {
      const ci = document.createElement('img');
      ci.src = c.image;
      ci.alt = c.name;
      ci.onerror = function() { this.remove(); };
      div.appendChild(ci);
    }
    const cs = document.createElement('div');
    cs.innerHTML = `<div class="popup-champ-name">${c.name}</div><div class="popup-champ-stats">${c.winRate}% WR · ${c.kda} KDA<br>${c.games} 게임</div>`;
    div.appendChild(cs);
    champsEl.appendChild(div);
  });

  const careerEl = document.getElementById('popup-career');
  careerEl.innerHTML = '';
  (p.career || []).forEach(c => {
    const li = document.createElement('li');
    li.className = 'popup-career-item';
    li.innerHTML = `<span class="popup-career-year">${c.year}</span><span class="popup-career-desc">${c.org} · ${c.role}</span>`;
    careerEl.appendChild(li);
  });

  const awardsEl = document.getElementById('popup-awards');
  const awardsSection = document.getElementById('popup-awards-section');
  if (p.awards && p.awards.length) {
    awardsSection.style.display = '';
    awardsEl.innerHTML = '';
    p.awards.forEach(a => {
      const li = document.createElement('li');
      li.className = 'popup-award-item';
      li.textContent = a;
      awardsEl.appendChild(li);
    });
  } else {
    awardsSection.style.display = 'none';
  }

  // Player nav buttons
  const prevBtn = document.getElementById('popup-player-prev');
  const nextBtn = document.getElementById('popup-player-next');
  if (prevBtn && nextBtn) {
    const total = DATA.players.length;
    prevBtn.style.display = total > 1 ? '' : 'none';
    nextBtn.style.display = total > 1 ? '' : 'none';
    prevBtn.onclick = () => {
      const ni = (_currentPlayerIdx - 1 + total) % total;
      openPlayerPopup(DATA.players[ni], ni);
    };
    nextBtn.onclick = () => {
      const ni = (_currentPlayerIdx + 1) % total;
      openPlayerPopup(DATA.players[ni], ni);
    };
  }

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// ── POPUP: STAFF ───────────────────────────────────────
function openStaffPopup(s) {
  const overlay = document.getElementById('popup-overlay');
  const popup = document.getElementById('popup');
  popup.className = 'popup staff-popup';

  // Hide video & champions, show photo & philosophy
  document.getElementById('popup-video-inner').innerHTML = '';
  document.getElementById('popup-video').style.display = 'none';
  document.getElementById('popup-mute-btn').style.display = 'none';
  document.getElementById('popup-photo').style.display = '';
  document.getElementById('popup-champs-section').style.display = 'none';
  document.getElementById('popup-philosophy').style.display = '';

  const photoEl = document.getElementById('popup-photo');
  photoEl.innerHTML = '';
  const img = imgOrPlaceholder(s.photo, s.nickname);
  img.style.cssText = 'width:100%;height:100%;object-fit:cover;object-position:top center;';
  photoEl.appendChild(img);

  // Staff: no thumb
  document.getElementById('popup-thumb').innerHTML =
    `<div class="popup-thumb-placeholder">${s.nickname.charAt(0)}</div>`;

  document.getElementById('popup-pos').textContent = s.roleKo;
  document.getElementById('popup-nick').textContent = s.nickname;
  document.getElementById('popup-realname').textContent = `${s.realNameKo} / ${s.realName}`;

  const metaGrid = document.getElementById('popup-meta');
  metaGrid.innerHTML = `
    <div class="popup-meta-item"><div class="popup-meta-label">나이</div><div class="popup-meta-value">${s.age}세</div></div>
    <div class="popup-meta-item"><div class="popup-meta-label">합류</div><div class="popup-meta-value">${s.joinYear}년</div></div>
  `;

  document.getElementById('popup-stats').innerHTML = '';

  const champsEl = document.getElementById('popup-champs');
  champsEl.innerHTML = '';

  // Philosophy
  const careerEl = document.getElementById('popup-career');
  careerEl.innerHTML = '';

  // Show philosophy above career
  const philosophyEl = document.getElementById('popup-philosophy');
  if (philosophyEl) {
    philosophyEl.textContent = `"${s.philosophy}"`;
    philosophyEl.style.display = '';
  }

  (s.career || []).forEach(c => {
    const li = document.createElement('li');
    li.className = 'popup-career-item';
    li.innerHTML = `<span class="popup-career-year">${c.year}</span><span class="popup-career-desc">${c.org} · ${c.role}</span>`;
    careerEl.appendChild(li);
  });

  const awardsSection = document.getElementById('popup-awards-section');
  awardsSection.style.display = 'none';

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// ── CLOSE POPUP ────────────────────────────────────────
function closePopup() {
  const overlay = document.getElementById('popup-overlay');
  overlay.classList.remove('active');
  document.body.style.overflow = '';
  _isMuted = true;
  _currentPlayerIdx = -1;
  const videoInner = document.getElementById('popup-video-inner');
  if (videoInner) videoInner.innerHTML = '';
  const muteBtn = document.getElementById('popup-mute-btn');
  if (muteBtn) muteBtn.style.display = 'none';
}

// ── SCROLL EFFECTS ─────────────────────────────────────
function initScrollEffects() {
  // Nav scroll
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  // Reveal
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 90);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  reveals.forEach(el => observer.observe(el));
}

// ── ADMIN CHECK ────────────────────────────────────────
function checkAdmin() {
  const params = new URLSearchParams(window.location.search);
  if (params.get('admin') === 'ODOD2025') {
    const bar = document.getElementById('admin-bar');
    if (bar) bar.classList.add('visible');
  }
}

// ── THEME TOGGLE ───────────────────────────────────────
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const btn = document.getElementById('theme-toggle-btn');
  if (btn) btn.textContent = theme === 'light' ? '☀' : '☽';
  localStorage.setItem('odod_theme', theme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  applyTheme(current === 'dark' ? 'light' : 'dark');
}

// ── INIT ───────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // 저장된 테마 적용 (깜빡임 방지용 — HTML에 인라인 스크립트가 없어서 DOMContentLoaded에서 처리)
  applyTheme(localStorage.getItem('odod_theme') || 'dark');

  renderNav();
  renderLive();
  renderHero();
  renderStats();
  renderResults();
  renderMvpVote();
  renderSchedule();
  renderRoster();
  renderStaffRoster();
  renderChampPool();
  renderGallery();
  renderSponsors();
  renderSponsorship();
  renderMediaKit();
  renderFooter();
  initScrollEffects();
  checkAdmin();

  // Hamburger menu
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

  // Popup close
  document.getElementById('popup-close').addEventListener('click', closePopup);
  document.getElementById('popup-overlay').addEventListener('click', (e) => {
    if (e.target === document.getElementById('popup-overlay')) closePopup();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { closePopup(); closeLightbox(); closeCompare(); }
  });

  // Compare overlay
  const cmpClose = document.getElementById('compare-close');
  if (cmpClose) cmpClose.addEventListener('click', closeCompare);
  const cmpOverlay = document.getElementById('compare-overlay');
  if (cmpOverlay) cmpOverlay.addEventListener('click', (e) => { if (e.target === cmpOverlay) closeCompare(); });

  // Lightbox
  const lbClose = document.getElementById('lightbox-close');
  if (lbClose) lbClose.addEventListener('click', closeLightbox);
  const lb = document.getElementById('lightbox');
  if (lb) lb.addEventListener('click', (e) => { if (e.target === lb) closeLightbox(); });
});

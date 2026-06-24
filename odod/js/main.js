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
          a.textContent = k.charAt(0).toUpperCase() + k.slice(1);
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
          // YouTube embed
          const embedUrl = buildYoutubeEmbedForBanner(b.video);
          const iframe = document.createElement('iframe');
          iframe.src = embedUrl;
          iframe.setAttribute('allow', 'autoplay; encrypted-media');
          iframe.setAttribute('allowfullscreen', '');
          wrap.appendChild(iframe);
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

    // 배너가 1개면 화살표 숨김
    if (banners.length <= 1) {
      if (prevBtn) prevBtn.style.display = 'none';
      if (nextBtn) nextBtn.style.display = 'none';
    }

    if (_bannerTimer) clearInterval(_bannerTimer);
    if (banners.length > 1) {
      _bannerTimer = setInterval(() => {
        goToSlide((_bannerIndex + 1) % banners.length);
      }, 7000);

      // 호버 시 자동 전환 일시정지
      const heroEl = document.getElementById('hero');
      if (heroEl) {
        heroEl.addEventListener('mouseenter', () => {
          clearInterval(_bannerTimer);
          _bannerTimer = null;
        });
        heroEl.addEventListener('mouseleave', () => {
          if (_bannerTimer) clearInterval(_bannerTimer);
          _bannerTimer = setInterval(() => {
            goToSlide((_bannerIndex + 1) % banners.length);
          }, 7000);
        });
      }
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
    item.innerHTML += `
      <div class="hero-staff-info">
        <div class="hero-staff-role">${s.role}</div>
        <div class="hero-staff-nick">${s.nickname}</div>
      </div>
    `;
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
}

function updateBannerInfo(idx) {
  const banners = (DATA.banners || []).filter(b => b.image);
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

  DATA.players.forEach(p => {
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

    card.appendChild(wrap);
    card.innerHTML += `
      <div class="roster-info">
        <div class="roster-pos">${p.positionKo}</div>
        <div class="roster-nick">${p.nickname}</div>
        <div class="roster-name">${p.realNameKo}</div>
      </div>
    `;

    card.addEventListener('click', () => openPlayerPopup(p));
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
    card.innerHTML += `
      <div class="staff-roster-info">
        <div class="staff-roster-role">${s.roleKo}</div>
        <div class="staff-roster-nick">${s.nickname}</div>
        <div class="staff-roster-name">${s.realNameKo}</div>
      </div>
    `;
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

// ── RENDER FOOTER ──────────────────────────────────────
function renderFooter() {
  const t = DATA.team;
  const el = document.getElementById('footer-slogan');
  if (el) el.textContent = `"${t.slogan}"`;

  const social = document.getElementById('footer-social');
  if (social && t.social) {
    social.innerHTML = '';
    Object.entries(t.social).forEach(([k, v]) => {
      if (v) {
        const a = document.createElement('a');
        a.href = v;
        a.target = '_blank';
        a.textContent = k.charAt(0).toUpperCase() + k.slice(1);
        social.appendChild(a);
      }
    });
  }
}

// ── POPUP: PLAYER ──────────────────────────────────────
let _isMuted = true;

function buildYoutubeEmbedForBanner(input) {
  if (!input) return '';
  // iframe 코드 붙여넣기 → src 추출
  const srcMatch = input.match(/src=["']([^"']+)/);
  const url = srcMatch ? srcMatch[1] : input;
  let videoId = '';
  const matchEmbed = url.match(/youtube\.com\/embed\/([^?&"'\s]+)/);
  const matchWatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?"\s]+)/);
  if (matchEmbed) videoId = matchEmbed[1];
  else if (matchWatch) videoId = matchWatch[1];
  else return '';
  return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&rel=0&modestbranding=1&showinfo=0`;
}

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
    rel: 0,
    modestbranding: 1,
    enablejsapi: 1,
  });
  return `https://www.youtube.com/embed/${videoId}?${params}`;
}

function openPlayerPopup(p) {
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
    muteBtn.textContent = '🔇';
    muteBtn.onclick = () => {
      _isMuted = !_isMuted;
      muteBtn.textContent = _isMuted ? '🔇' : '🔊';
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
    div.innerHTML = `
      <div class="popup-champ-name">${c.name}</div>
      <div class="popup-champ-stats">${c.winRate}% WR · ${c.kda} KDA<br>${c.games} 게임</div>
    `;
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

// ── INIT ───────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderNav();
  renderHero();
  renderStats();
  renderResults();
  renderSchedule();
  renderRoster();
  renderStaffRoster();
  renderGallery();
  renderSponsors();
  renderFooter();
  initScrollEffects();
  checkAdmin();

  // Popup close
  document.getElementById('popup-close').addEventListener('click', closePopup);
  document.getElementById('popup-overlay').addEventListener('click', (e) => {
    if (e.target === document.getElementById('popup-overlay')) closePopup();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closePopup();
  });
});

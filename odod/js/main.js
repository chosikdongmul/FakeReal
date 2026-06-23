/* ════════════════════════════════════════════════
   ODOD — main.js
   ════════════════════════════════════════════════ */

// ── DEFAULT DATA (embedded to avoid CORS on local) ──
const DEFAULT_DATA = {
  "team": {
    "name": "ODOD",
    "fullName": "OverDrive Outlaw Dogs",
    "league": "LCK",
    "founded": "2022",
    "city": "Seoul",
    "slogan": "We don't follow the meta. We break it.",
    "season": "2025",
    "standing": 3,
    "record": { "wins": 18, "losses": 9 },
    "winRate": 66.7,
    "worldsAppearances": 1,
    "social": {
      "twitter": "https://twitter.com/ODOD_LCK",
      "instagram": "https://instagram.com/odod_lck",
      "youtube": "https://youtube.com/@ODOD"
    }
  },
  "staff": [
    {
      "id": "vortex", "role": "Head Coach", "roleKo": "감독",
      "nickname": "Vortex", "realName": "Kim Dohyun", "realNameKo": "김도현",
      "age": 34, "nationality": "KR", "joinYear": 2022,
      "photo": "assets/images/staff/vortex.jpg",
      "philosophy": "읽히는 순간 지는 거다.",
      "career": [
        { "year": "2017–2019", "org": "APEX Force", "role": "Analyst" },
        { "year": "2019–2021", "org": "Nova Esports", "role": "Assistant Coach" },
        { "year": "2022–", "org": "ODOD", "role": "Head Coach" }
      ]
    },
    {
      "id": "reaper", "role": "Coach", "roleKo": "코치",
      "nickname": "Reaper", "realName": "Choi Junho", "realNameKo": "최준호",
      "age": 28, "nationality": "KR", "joinYear": 2023,
      "photo": "assets/images/staff/reaper.jpg",
      "philosophy": "드래프트는 이미 게임의 절반이다.",
      "career": [
        { "year": "2018–2022", "org": "KT Bullet", "role": "Pro Player (Mid)" },
        { "year": "2023–", "org": "ODOD", "role": "Coach" }
      ]
    },
    {
      "id": "circuit", "role": "Analyst", "roleKo": "애널리스트",
      "nickname": "Circuit", "realName": "Park Seungwoo", "realNameKo": "박승우",
      "age": 25, "nationality": "KR", "joinYear": 2022,
      "photo": "assets/images/staff/circuit.jpg",
      "philosophy": "숫자가 거짓말을 하면 더 많은 숫자로 잡는다.",
      "career": [
        { "year": "2022–", "org": "ODOD", "role": "Analyst" }
      ]
    }
  ],
  "players": [
    {
      "id": "ironwall", "position": "Top", "positionKo": "탑", "number": 1,
      "nickname": "Ironwall", "realName": "Jang Minjun", "realNameKo": "장민준",
      "age": 22, "birthdate": "2003-04-11", "nationality": "KR",
      "joinYear": 2023, "games": 87,
      "photo": "assets/images/players/ironwall.jpg", "photoThumb": "assets/images/players/ironwall_thumb.jpg", "bannerImage": "assets/images/players/ironwall_banner.jpg", "highlight": "",
      "stats": { "kda": 3.2, "winRate": 62.1, "csPerMin": 8.4, "kills": 2.8, "deaths": 2.1, "assists": 5.7 },
      "champions": [
        { "name": "Garen", "image": "assets/images/champions/garen.jpg", "winRate": 71, "kda": 4.1, "games": 21 },
        { "name": "Renekton", "image": "assets/images/champions/renekton.jpg", "winRate": 64, "kda": 3.4, "games": 14 },
        { "name": "Camille", "image": "assets/images/champions/camille.jpg", "winRate": 60, "kda": 2.9, "games": 10 }
      ],
      "career": [
        { "year": "2022", "org": "ODOD Academy", "role": "Top" },
        { "year": "2023–", "org": "ODOD", "role": "Top" }
      ],
      "awards": ["2024 LCK Summer All-Pro Team (3rd)"],
      "social": {}
    },
    {
      "id": "feral", "position": "Jungle", "positionKo": "정글", "number": 2,
      "nickname": "Feral", "realName": "Lee Taehwan", "realNameKo": "이태환",
      "age": 21, "birthdate": "2004-08-29", "nationality": "KR",
      "joinYear": 2024, "games": 54,
      "photo": "assets/images/players/feral.jpg", "photoThumb": "assets/images/players/feral_thumb.jpg", "bannerImage": "assets/images/players/feral_banner.jpg", "highlight": "",
      "stats": { "kda": 4.1, "winRate": 68.5, "csPerMin": 5.9, "kills": 3.5, "deaths": 1.8, "assists": 8.2 },
      "champions": [
        { "name": "Vi", "image": "assets/images/champions/vi.jpg", "winRate": 75, "kda": 5.2, "games": 16 },
        { "name": "Jarvan IV", "image": "assets/images/champions/jarvaniv.jpg", "winRate": 70, "kda": 4.0, "games": 10 },
        { "name": "Hecarim", "image": "assets/images/champions/hecarim.jpg", "winRate": 62, "kda": 3.8, "games": 8 }
      ],
      "career": [
        { "year": "2023", "org": "Storm Wings (Challenger)", "role": "Jungle" },
        { "year": "2024–", "org": "ODOD", "role": "Jungle" }
      ],
      "awards": [],
      "social": {}
    },
    {
      "id": "overdrive", "position": "Mid", "positionKo": "미드", "number": 3,
      "nickname": "Overdrive", "realName": "Han Seojun", "realNameKo": "한서준",
      "age": 20, "birthdate": "2005-01-17", "nationality": "KR",
      "joinYear": 2022, "games": 134, "isAce": true,
      "photo": "assets/images/players/overdrive.jpg", "photoThumb": "assets/images/players/overdrive_thumb.jpg", "bannerImage": "assets/images/players/overdrive_banner.jpg", "highlight": "",
      "stats": { "kda": 5.8, "winRate": 70.1, "csPerMin": 9.7, "kills": 5.2, "deaths": 1.6, "assists": 7.3 },
      "champions": [
        { "name": "Azir", "image": "assets/images/champions/azir.jpg", "winRate": 78, "kda": 7.1, "games": 29 },
        { "name": "Zed", "image": "assets/images/champions/zed.jpg", "winRate": 72, "kda": 6.2, "games": 18 },
        { "name": "Orianna", "image": "assets/images/champions/orianna.jpg", "winRate": 68, "kda": 5.4, "games": 15 }
      ],
      "career": [
        { "year": "2022–", "org": "ODOD", "role": "Mid" }
      ],
      "awards": [
        "2023 LCK Summer MVP",
        "2024 LCK Spring All-Pro Team (1st)",
        "2024 Worlds Quarterfinals"
      ],
      "social": {}
    },
    {
      "id": "buckshot", "position": "Bot", "positionKo": "원딜", "number": 4,
      "nickname": "Buckshot", "realName": "Oh Yoongi", "realNameKo": "오윤기",
      "age": 23, "birthdate": "2002-11-03", "nationality": "KR",
      "joinYear": 2022, "games": 112,
      "photo": "assets/images/players/buckshot.jpg", "photoThumb": "assets/images/players/buckshot_thumb.jpg", "bannerImage": "assets/images/players/buckshot_banner.jpg", "highlight": "",
      "stats": { "kda": 4.4, "winRate": 65.2, "csPerMin": 9.1, "kills": 4.8, "deaths": 2.0, "assists": 6.0 },
      "champions": [
        { "name": "Jhin", "image": "assets/images/champions/jhin.jpg", "winRate": 74, "kda": 5.5, "games": 27 },
        { "name": "Kai'Sa", "image": "assets/images/champions/kaisa.jpg", "winRate": 66, "kda": 4.2, "games": 19 },
        { "name": "Caitlyn", "image": "assets/images/champions/caitlyn.jpg", "winRate": 61, "kda": 3.9, "games": 12 }
      ],
      "career": [
        { "year": "2021", "org": "Red Storm (Challenger)", "role": "Bot" },
        { "year": "2022–", "org": "ODOD", "role": "Bot" }
      ],
      "awards": ["2024 LCK Spring All-Pro Team (2nd)"],
      "social": {}
    },
    {
      "id": "shackle", "position": "Support", "positionKo": "서포터", "number": 5,
      "nickname": "Shackle", "realName": "Yoo Chanho", "realNameKo": "유찬호",
      "age": 24, "birthdate": "2001-06-22", "nationality": "KR",
      "joinYear": 2022, "games": 134,
      "photo": "assets/images/players/shackle.jpg", "photoThumb": "assets/images/players/shackle_thumb.jpg", "bannerImage": "assets/images/players/shackle_banner.jpg", "highlight": "",
      "stats": { "kda": 6.2, "winRate": 66.4, "csPerMin": 1.8, "kills": 1.1, "deaths": 1.9, "assists": 12.7 },
      "champions": [
        { "name": "Thresh", "image": "assets/images/champions/thresh.jpg", "winRate": 72, "kda": 7.8, "games": 31 },
        { "name": "Nautilus", "image": "assets/images/champions/nautilus.jpg", "winRate": 68, "kda": 6.5, "games": 20 },
        { "name": "Lulu", "image": "assets/images/champions/lulu.jpg", "winRate": 64, "kda": 5.9, "games": 13 }
      ],
      "career": [
        { "year": "2020–2021", "org": "Phoenix Wings", "role": "Support" },
        { "year": "2022–", "org": "ODOD", "role": "Support" }
      ],
      "awards": [
        "2023 LCK Summer All-Pro Team (2nd)",
        "2024 LCK Summer All-Pro Team (1st)"
      ],
      "social": {}
    }
  ],
  "results": [
    { "date": "2025-06-14", "opponent": "T1", "score": "2-1", "result": "W", "stage": "LCK Summer" },
    { "date": "2025-06-10", "opponent": "Gen.G", "score": "1-2", "result": "L", "stage": "LCK Summer" },
    { "date": "2025-06-07", "opponent": "KT Rolster", "score": "2-0", "result": "W", "stage": "LCK Summer" },
    { "date": "2025-05-31", "opponent": "DRX", "score": "2-1", "result": "W", "stage": "LCK Summer" },
    { "date": "2025-05-27", "opponent": "Hanwha Life", "score": "2-0", "result": "W", "stage": "LCK Summer" }
  ],
  "schedule": [
    { "date": "2025-06-28", "opponent": "Dplus KIA", "time": "17:00", "stage": "LCK Summer" },
    { "date": "2025-07-02", "opponent": "Nongshim RedForce", "time": "19:00", "stage": "LCK Summer" },
    { "date": "2025-07-05", "opponent": "T1", "time": "17:00", "stage": "LCK Summer" },
    { "date": "2025-07-09", "opponent": "BNK FearX", "time": "19:00", "stage": "LCK Summer" }
  ],
  "gallery": [
    { "src": "assets/images/gallery/01.jpg", "caption": "2025 LCK Summer 개막전" },
    { "src": "assets/images/gallery/02.jpg", "caption": "팀 트레이닝 세션" },
    { "src": "assets/images/gallery/03.jpg", "caption": "Overdrive 솔로킬 클립" },
    { "src": "assets/images/gallery/04.jpg", "caption": "월드챔피언십 8강" },
    { "src": "assets/images/gallery/05.jpg", "caption": "미디어데이" },
    { "src": "assets/images/gallery/06.jpg", "caption": "팬미팅 2025" }
  ],
  "sponsors": [
    { "name": "APEX Gaming Chairs", "logo": "assets/images/sponsors/apex.png", "url": "#" },
    { "name": "RedBull", "logo": "assets/images/sponsors/redbull.png", "url": "#" },
    { "name": "Logitech G", "logo": "assets/images/sponsors/logitechg.png", "url": "#" },
    { "name": "Samsung", "logo": "assets/images/sponsors/samsung.png", "url": "#" }
  ],
  "banners": [
    { "image": "", "caption": "" },
    { "image": "", "caption": "" },
    { "image": "", "caption": "" }
  ]
};

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

    if (_bannerTimer) clearInterval(_bannerTimer);
    if (banners.length > 1) {
      _bannerTimer = setInterval(() => {
        goToSlide((_bannerIndex + 1) % banners.length);
      }, 5000);
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

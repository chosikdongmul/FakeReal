/* =============================================
   ODFC — Outlaw Dogs Fighting Championship
   main.js
   ============================================= */

// ---------- Data ----------
let DATA = null;

function loadData() {
  try {
    const saved = localStorage.getItem('odfc_data');
    DATA = saved ? JSON.parse(saved) : DEFAULT_DATA;
  } catch (e) {
    DATA = DEFAULT_DATA;
  }
}

// ---------- Helpers ----------
function esc(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function recordStr(r) {
  if (!r) return '';
  return `${r.w}-${r.l}${r.d ? '-' + r.d : ''}`;
}

function getFighter(id) {
  return (DATA.fighters || []).find(f => f.id === id) || null;
}

function weightClassById(id) {
  return (DATA.weightClasses || []).find(w => w.id === id) || null;
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T00:00:00');
  const months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
  return { month: months[d.getMonth()], day: d.getDate(), year: d.getFullYear() };
}

function getMainFight(event) {
  if (!event.card || !event.card.length) return null;
  return event.card.find(c => c.type === 'main') || event.card[0];
}

// ---------- Hero Banner ----------
function youtubeId(url) {
  if (!url) return null;
  // 이미 embed URL이면 ID 추출
  let m = url.match(/youtube\.com\/embed\/([^?&]+)/);
  if (m) return m[1];
  // watch?v=
  m = url.match(/[?&]v=([^&]+)/);
  if (m) return m[1];
  // youtu.be/
  m = url.match(/youtu\.be\/([^?&]+)/);
  if (m) return m[1];
  return null;
}

function renderHeroBanner() {
  const slot = document.getElementById('hero-bg-media');
  if (!slot) return;
  const banner = (DATA.banners || [])[0];
  if (!banner) return;

  if (banner.video) {
    const vid = youtubeId(banner.video);
    if (vid) {
      slot.innerHTML = `
        <div class="hero-bg-yt-wrap">
          <iframe
            src="https://www.youtube.com/embed/${vid}?autoplay=1&mute=1&loop=1&playlist=${vid}&controls=0&disablekb=1&modestbranding=1&playsinline=1"
            allow="autoplay; encrypted-media"
            allowfullscreen
          ></iframe>
        </div>`;
      return;
    }
  }
  if (banner.image) {
    slot.innerHTML = `<img class="hero-bg-video" src="../${esc(banner.image)}" alt="" loading="eager">`;
  }
}

// ---------- Countdown ----------
function startCountdown(targetDate) {
  const el = document.getElementById('hero-countdown');
  if (!el || !targetDate) return;

  function tick() {
    const now = new Date();
    const end = new Date(targetDate + 'T18:00:00');
    const diff = end - now;
    if (diff <= 0) {
      el.innerHTML = `<div class="countdown-block"><span class="countdown-val">LIVE</span></div>`;
      return;
    }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    el.innerHTML = `
      <div class="countdown-block"><span class="countdown-val">${String(d).padStart(2,'0')}</span><span class="countdown-lbl">Days</span></div>
      <div class="countdown-block"><span class="countdown-val">${String(h).padStart(2,'0')}</span><span class="countdown-lbl">Hrs</span></div>
      <div class="countdown-block"><span class="countdown-val">${String(m).padStart(2,'0')}</span><span class="countdown-lbl">Min</span></div>
      <div class="countdown-block"><span class="countdown-val">${String(s).padStart(2,'0')}</span><span class="countdown-lbl">Sec</span></div>`;
  }
  tick();
  setInterval(tick, 1000);
}

// ---------- Announcement ----------
function renderAnnouncementBar() {
  const bar = document.getElementById('announcement-bar');
  if (!bar) return;
  const ann = DATA.announcement;
  if (!ann || !ann.active || !ann.message) {
    bar.classList.add('hidden');
    document.body.classList.remove('has-announcement');
    return;
  }
  const dismissKey = 'odfc_ann_' + btoa(unescape(encodeURIComponent(ann.message))).slice(0, 16);
  if (localStorage.getItem(dismissKey) === '1') {
    bar.classList.add('hidden');
    document.body.classList.remove('has-announcement');
    return;
  }
  const linkHtml = ann.link && ann.linkText
    ? ` <a class="ann-link" href="${esc(ann.link)}" target="_blank" rel="noopener">${esc(ann.linkText)} →</a>`
    : '';
  bar.innerHTML = `<span class="ann-message">${esc(ann.message)}${linkHtml}</span><button class="ann-dismiss" onclick="dismissAnnouncement('${dismissKey}')">✕</button>`;
  bar.classList.remove('hidden');
  document.body.classList.add('has-announcement');
}
function dismissAnnouncement(key) {
  localStorage.setItem(key, '1');
  const bar = document.getElementById('announcement-bar');
  if (bar) bar.classList.add('hidden');
  document.body.classList.remove('has-announcement');
}

// ---------- Nav ----------
function renderNav() {
  const org = DATA.org || {};
  const logoEl = document.getElementById('nav-logo');
  if (logoEl) logoEl.innerHTML = `<span class="accent">${esc(org.abbr || 'ODFC')}</span>`;
}

// ---------- Hero ----------
function renderHero() {
  const org = DATA.org || {};
  const upcoming = (DATA.events || []).find(e => e.status === 'upcoming');

  const sloganEl = document.getElementById('hero-slogan');
  if (sloganEl) sloganEl.textContent = org.slogan || 'Every dog has their day.';

  const titleEl = document.getElementById('hero-title');
  if (titleEl) {
    titleEl.innerHTML = `<span class="red">${esc(org.abbr || 'ODFC')}</span><br>${esc(org.fullName ? org.fullName.replace(org.abbr, '').trim() : 'Fighting Championship')}`;
  }

  const nextWrap = document.getElementById('hero-next');
  if (nextWrap && upcoming) {
    const dt = formatDate(upcoming.date);
    document.getElementById('hero-next-name').textContent = `${upcoming.name}: ${upcoming.subtitle || ''}`;
    document.getElementById('hero-next-meta').textContent = `${dt.month} ${dt.day}, ${dt.year} · ${upcoming.venue} · ${upcoming.city}`;
    startCountdown(upcoming.date);
  } else if (nextWrap) {
    nextWrap.style.display = 'none';
  }

  const heroSection = document.getElementById('hero');
  const live = DATA.live;
  if (heroSection && live && live.active) {
    heroSection.querySelector('.hero-cta') && (heroSection.querySelector('.hero-cta').style.display = 'none');
  }
}

// ---------- Live Bar ----------
function renderLiveBar() {
  const bar = document.getElementById('live-bar');
  if (!bar) return;
  const live = DATA.live;
  if (!live || !live.active) { bar.classList.remove('active'); return; }
  bar.classList.add('active');
  document.getElementById('live-match').textContent = `${live.fighter1} vs ${live.fighter2}`;
  document.getElementById('live-event').textContent = live.event || '';
  document.getElementById('live-round').textContent = `${live.round || ''} · ${live.time || ''}`;
  const watchBtn = document.getElementById('live-watch-btn');
  if (watchBtn && live.stream) watchBtn.setAttribute('href', live.stream);
}

// ---------- Fight Card ----------
function renderFightCard() {
  const upcoming = (DATA.events || []).find(e => e.status === 'upcoming');
  const section = document.getElementById('fightcard');
  if (!section) return;
  if (!upcoming) { section.style.display = 'none'; return; }

  section.style.display = '';
  document.getElementById('fightcard-event-name').textContent = `${upcoming.name}: ${upcoming.subtitle || ''}`;
  const dt = formatDate(upcoming.date);
  document.getElementById('fightcard-event-meta').textContent = `${dt.month} ${dt.day}, ${dt.year} · ${upcoming.venue}`;

  const grid = document.getElementById('fightcard-grid');
  if (!grid) return;

  const card = upcoming.card || [];
  const rows = [];

  // main / co-main first, then prelims
  const ordered = [
    ...card.filter(c => c.type === 'main'),
    ...card.filter(c => c.type === 'co-main'),
    ...card.filter(c => c.type === 'prelim'),
  ];

  ordered.forEach(fight => {
    const f1 = fight.fighter1Id ? getFighter(fight.fighter1Id) : null;
    const f2 = fight.fighter2Id ? getFighter(fight.fighter2Id) : null;
    const wc = weightClassById(fight.weightClass);

    const f1Name = f1 ? `"${f1.nickname}"` : (fight.fighter1Label || 'TBA');
    const f1Real = f1 ? f1.nameKo : '';
    const f1Record = f1 ? recordStr(f1.record) : '';
    const f1Photo = f1 && f1.photo
      ? `<img src="../${esc(f1.photo)}" alt="${esc(f1Name)}" loading="lazy">`
      : `<div class="placeholder-fighter">🥊</div>`;
    const f1ChampClass = f1 && f1.isChampion ? ' champ' : '';

    const f2Name = f2 ? `"${f2.nickname}"` : (fight.fighter2Label || 'TBA');
    const f2Real = f2 ? f2.nameKo : '';
    const f2Record = f2 ? recordStr(f2.record) : '';
    const f2Photo = f2 && f2.photo
      ? `<img src="../${esc(f2.photo)}" alt="${esc(f2Name)}" loading="lazy">`
      : `<div class="placeholder-fighter">🥊</div>`;
    const f2ChampClass = f2 && f2.isChampion ? ' champ' : '';

    const typeLabel = fight.type === 'main' ? 'MAIN EVENT' : fight.type === 'co-main' ? 'CO-MAIN EVENT' : 'PRELIM';
    const typeBadgeClass = fight.type === 'prelim' ? 'prelim' : '';
    const isMain = fight.type === 'main';

    const titleLine = fight.titleFight ? `${wc ? wc.name + ' ' : ''}타이틀 매치 · ${fight.rounds}R` : `${fight.rounds}R`;
    const wcLine = wc ? `${wc.nameKo} (${wc.limit})` : '';

    const rowClass = isMain ? 'fight-row main-event' : 'fight-row';

    const f1Click = f1 ? `onclick="openFighterPopup('${f1.id}')"` : '';
    const f2Click = f2 ? `onclick="openFighterPopup('${f2.id}')"` : '';

    rows.push(`
      <div class="${rowClass}" style="position:relative; padding-top:${typeLabel ? '32px' : '28px'}">
        <span class="fight-type-badge ${typeBadgeClass}">${typeLabel}</span>
        <div class="fight-fighter" ${f1Click} style="${f1 ? 'cursor:pointer' : ''}">
          <div class="fight-fighter-photo${f1ChampClass}">${f1Photo}</div>
          <div class="fight-info">
            <div class="fight-nickname">${esc(f1Name)}</div>
            ${f1Real ? `<div class="fight-realname">${esc(f1Real)}</div>` : ''}
            ${f1Record ? `<div class="fight-record">${esc(f1Record)}</div>` : ''}
          </div>
        </div>
        <div class="fight-vs">
          <span class="fight-vs-text">VS</span>
          <span class="fight-vs-meta">${esc(titleLine)}</span>
          ${wcLine ? `<span class="fight-vs-meta" style="color:var(--text-faint);font-size:8px">${esc(wcLine)}</span>` : ''}
        </div>
        <div class="fight-fighter right" ${f2Click} style="${f2 ? 'cursor:pointer' : ''}">
          <div class="fight-fighter-photo${f2ChampClass}">${f2Photo}</div>
          <div class="fight-info">
            <div class="fight-nickname">${esc(f2Name)}</div>
            ${f2Real ? `<div class="fight-realname">${esc(f2Real)}</div>` : ''}
            ${f2Record ? `<div class="fight-record">${esc(f2Record)}</div>` : ''}
          </div>
        </div>
      </div>
    `);
  });

  grid.innerHTML = rows.join('');
}

// ---------- Champion (단일) ----------
function renderChampions() {
  const wrap = document.getElementById('champs-grid');
  if (!wrap) return;
  const champ = (DATA.fighters || []).find(f => f.isChampion);

  if (!champ) {
    wrap.innerHTML = `<div style="padding:32px;color:var(--text-faint);font-size:14px">챔피언 공석</div>`;
    return;
  }

  const photoHtml = champ.photo
    ? `<img src="../${esc(champ.photo)}" alt="${esc(champ.nickname)}" loading="lazy" style="width:100%;height:100%;object-fit:cover;object-position:top">`
    : `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:64px;background:var(--bg3)">🥊</div>`;

  const finHtml = champ.finishes
    ? `<div style="display:flex;gap:16px;margin-top:8px">
        <div style="text-align:center"><div style="font-size:20px;font-weight:900;color:var(--text)">${champ.finishes.ko}</div><div style="font-size:12px;color:var(--text-faint);letter-spacing:0.08em">KO/TKO</div></div>
        <div style="text-align:center"><div style="font-size:20px;font-weight:900;color:var(--text)">${champ.finishes.sub}</div><div style="font-size:12px;color:var(--text-faint);letter-spacing:0.08em">서브미션</div></div>
        <div style="text-align:center"><div style="font-size:20px;font-weight:900;color:var(--text)">${champ.finishes.dec}</div><div style="font-size:12px;color:var(--text-faint);letter-spacing:0.08em">판정</div></div>
      </div>`
    : '';

  wrap.innerHTML = `
    <div class="champ-featured" onclick="openFighterPopup('${champ.id}')">
      <div class="champ-featured-photo">${photoHtml}</div>
      <div class="champ-featured-info">
        <div class="champ-featured-label">🏆 CHAMPION</div>
        <div class="champ-featured-nickname">${esc(champ.nickname)}</div>
        <div class="champ-featured-realname">${esc(champ.nameKo || champ.name)}</div>
        <div class="champ-featured-record">${recordStr(champ.record)}</div>
        ${finHtml}
        ${champ.titles && champ.titles.length ? `<div style="margin-top:16px;font-size:12px;color:var(--text-faint)">${champ.titles.map(t => esc(t)).join('<br>')}</div>` : ''}
      </div>
    </div>
  `;
}

// ---------- 대표선수 (챔피언 → #1 → #2 … 전체 랭킹 순) ----------
function renderFighters() {
  const tabsEl = document.getElementById('wc-tabs');
  if (tabsEl) tabsEl.style.display = 'none';

  const grid = document.getElementById('fighters-grid');
  if (!grid) return;

  const fighters = DATA.fighters || [];
  const rankings = Array.isArray(DATA.rankings) ? DATA.rankings : [];

  // 챔피언 먼저, 그 다음 rankings 배열 순서
  const sorted = [...fighters].sort((a, b) => {
    if (a.isChampion && !b.isChampion) return -1;
    if (!a.isChampion && b.isChampion) return 1;
    const aRank = rankings.indexOf(a.id);
    const bRank = rankings.indexOf(b.id);
    if (aRank === -1 && bRank === -1) return 0;
    if (aRank === -1) return 1;
    if (bRank === -1) return -1;
    return aRank - bRank;
  });

  grid.innerHTML = sorted.map((f, i) => {
    // rankings에서 순위 산정: champion은 C, 나머지는 #1, #2…
    const rankIdx = rankings.indexOf(f.id);
    // champion이 rankings[0]이면 다음부터 #1
    const champIdx = rankings.findIndex(id => {
      const fnd = getFighter(id);
      return fnd && fnd.isChampion;
    });
    let rankLabel = '';
    if (f.isChampion) {
      rankLabel = 'C';
    } else if (rankIdx >= 0) {
      // champion 제외한 순번
      const contenderRank = champIdx >= 0 && rankIdx > champIdx
        ? rankIdx - (champIdx + 1) + 1
        : rankIdx + 1;
      rankLabel = `#${contenderRank}`;
    }

    const badgeHtml = f.isChampion
      ? `<span class="fighter-champ-badge">CHAMPION</span>`
      : rankLabel
        ? `<span class="fighter-rank-badge">${rankLabel}</span>`
        : '';

    const photoHtml = f.photo
      ? `<img src="../${esc(f.photo)}" alt="${esc(f.nickname)}" loading="lazy">`
      : `<div class="placeholder-fighter">🥊</div>`;

    return `
      <div class="fighter-card" onclick="openFighterPopup('${f.id}')">
        <div class="fighter-photo-wrap">${photoHtml}</div>
        ${badgeHtml}
        <div class="fighter-card-info">
          <div class="fighter-card-nickname">${esc(f.nickname)}</div>
          <div class="fighter-card-realname">${esc(f.nameKo || f.name)}</div>
          <div class="fighter-card-record">${recordStr(f.record)}</div>
        </div>
      </div>
    `;
  }).join('') || `<div style="padding:40px;color:var(--text-faint)">선수 정보가 없습니다.</div>`;
}

// ---------- Rankings ----------
function renderRankings() {
  const grid = document.getElementById('rankings-grid');
  if (!grid) return;

  const wcs = DATA.weightClasses || [];
  const rankings = DATA.rankings || {};

  grid.innerHTML = wcs.map(wc => {
    const list = rankings[wc.id] || [];
    const rows = list.map((fid, i) => {
      const f = getFighter(fid);
      if (!f) return '';
      const isChamp = f.isChampion;
      const pos = isChamp ? 'C' : `#${i + 1}`;
      const photoHtml = f.photo
        ? `<img src="../${esc(f.photo)}" alt="${esc(f.nickname)}" loading="lazy">`
        : '';

      return `
        <div class="ranking-row" onclick="openFighterPopup('${f.id}')">
          <span class="ranking-pos${isChamp ? ' champ' : ''}">${isChamp ? '🏆' : pos}</span>
          <div class="ranking-photo">${photoHtml}</div>
          <div class="ranking-info">
            <div class="ranking-nickname">${esc(f.nickname)}</div>
            <div class="ranking-record">${recordStr(f.record)}</div>
          </div>
        </div>
      `;
    }).join('');

    return `
      <div class="ranking-col">
        <div class="ranking-col-title">${esc(wc.name)}<span class="ranking-col-limit">${esc(wc.limit)}</span></div>
        ${rows || '<div style="color:var(--text-faint);font-size:12px;padding:8px">—</div>'}
      </div>
    `;
  }).join('');
}

// ---------- Past Events ----------
function renderPastEvents() {
  const list = document.getElementById('events-list');
  if (!list) return;

  const events = (DATA.events || []).filter(e => e.status === 'completed');
  if (!events.length) {
    list.innerHTML = `<div style="padding:32px;color:var(--text-faint);font-size:13px">이전 이벤트가 없습니다.</div>`;
    return;
  }

  list.innerHTML = events.map(ev => {
    const dt = formatDate(ev.date);
    const mainFight = getMainFight(ev);
    let mainStr = '';
    if (mainFight) {
      const f1 = mainFight.fighter1Id ? getFighter(mainFight.fighter1Id) : null;
      const f2 = mainFight.fighter2Id ? getFighter(mainFight.fighter2Id) : null;
      const n1 = f1 ? f1.nickname : mainFight.fighter1Label || 'TBA';
      const n2 = f2 ? f2.nickname : mainFight.fighter2Label || 'TBA';
      mainStr = `${n1} vs ${n2}`;
      if (mainFight.result) {
        const winner = mainFight.result.winnerId ? getFighter(mainFight.result.winnerId) : null;
        if (winner) mainStr += ` — ${winner.nickname} (${mainFight.result.method} R${mainFight.result.round} ${mainFight.result.time})`;
      }
    }

    return `
      <div class="event-row">
        <div class="event-date-block">
          <span class="event-month">${dt.month}</span>
          <span class="event-day">${dt.day}</span>
          <span class="event-year">${dt.year}</span>
        </div>
        <div class="event-divider"></div>
        <div class="event-info">
          <div class="event-name">${esc(ev.name)}</div>
          ${ev.subtitle ? `<div class="event-subtitle">${esc(ev.subtitle)}</div>` : ''}
          <div class="event-venue">${esc(ev.venue)} · ${esc(ev.city)}</div>
          ${mainStr ? `<div class="event-main-event">${esc(mainStr)}</div>` : ''}
        </div>
        <span class="event-status ${ev.status}">${ev.status === 'completed' ? '종료' : '예정'}</span>
      </div>
    `;
  }).join('');
}

// ---------- Sponsors ----------
function renderSponsors() {
  const grid = document.getElementById('sponsors-grid');
  if (!grid) return;
  const sponsors = DATA.sponsors || [];
  if (!sponsors.length) {
    document.getElementById('sponsors')?.style.setProperty('display', 'none');
    return;
  }
  grid.innerHTML = sponsors.map(s => `
    <a class="sponsor-item" href="${esc(s.url || '#')}" target="_blank" rel="noopener">
      ${s.logo
        ? `<img src="../${esc(s.logo)}" alt="${esc(s.name)}" loading="lazy">`
        : `<span class="sponsor-name-only">${esc(s.name)}</span>`}
    </a>
  `).join('');
}

// ---------- Media Kit ----------
function renderMediaKit() {
  const mk = DATA.mediakit || {};
  const items = [
    { key: 'logo',       icon: '🎨', el: 'mk-logo' },
    { key: 'photos',     icon: '📷', el: 'mk-photos' },
    { key: 'presskit',   icon: '📄', el: 'mk-presskit' },
    { key: 'brandguide', icon: '📐', el: 'mk-brand' },
  ];
  const grid = document.getElementById('mediakit-grid');
  if (!grid) return;

  grid.innerHTML = items.map(({ key, icon }) => {
    const item = mk[key] || {};
    const hasFile = !!item.file;
    return `
      <div class="mediakit-item">
        <span class="mediakit-icon">${icon}</span>
        <div class="mediakit-label">${esc(item.label || key)}</div>
        <div class="mediakit-desc">${esc(item.desc || '')}</div>
        <a class="mediakit-btn${hasFile ? '' : ' no-file'}" href="${hasFile ? esc(item.file) : '#'}" ${hasFile ? 'download target="_blank"' : ''}>
          ${hasFile ? '⬇ 다운로드' : '준비 중'}
        </a>
      </div>
    `;
  }).join('');
}

// ---------- Footer ----------
function renderFooter() {
  const org = DATA.org || {};
  document.getElementById('footer-logo-text')?.innerHTML
    && (document.getElementById('footer-logo-text').innerHTML = `<span class="accent">${esc(org.abbr || 'ODFC')}</span>`);
  document.getElementById('footer-slogan') && (document.getElementById('footer-slogan').textContent = org.slogan || '');
  document.getElementById('footer-contact') && (document.getElementById('footer-contact').textContent = org.contact || '');

  const social = org.social || {};
  const socialEl = document.getElementById('footer-social');
  if (socialEl) {
    socialEl.innerHTML = Object.entries(social).filter(([,v])=>v).map(([k,v])=>
      `<a href="${esc(v)}" target="_blank" rel="noopener">${k.toUpperCase()}</a>`
    ).join('');
  }
}

// ---------- Fighter Popup ----------
function openFighterPopup(fighterId) {
  const f = getFighter(fighterId);
  if (!f) return;
  const wc = weightClassById(f.weightClass);

  const overlay = document.getElementById('popup-overlay');
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';

  // Photo / highlight
  const photoEl = document.getElementById('popup-fighter-photo');
  const iframeEl = document.getElementById('popup-highlight-iframe');
  if (f.highlight) {
    iframeEl.src = f.highlight;
    iframeEl.style.display = '';
    photoEl.style.display = 'none';
  } else if (f.photo) {
    photoEl.src = `../${f.photo}`;
    photoEl.alt = f.nickname;
    photoEl.style.display = '';
    iframeEl.style.display = 'none';
  } else {
    photoEl.style.display = 'none';
    iframeEl.style.display = 'none';
    document.getElementById('popup-photo-placeholder').style.display = '';
  }

  // Header
  document.getElementById('popup-champ-badge').style.display = f.isChampion ? '' : 'none';
  if (f.isChampion && wc) {
    document.getElementById('popup-champ-badge').textContent = `🏆 ${wc.name} Champion`;
  }
  document.getElementById('popup-nickname').textContent = `"${f.nickname}"`;
  document.getElementById('popup-realname').textContent = f.nameKo || f.name || '';
  document.getElementById('popup-class').textContent = wc ? `${wc.name} (${wc.limit})` : '';
  document.getElementById('popup-record').innerHTML =
    `${f.record.w}-${f.record.l}${f.record.d ? '-'+f.record.d : ''}<span>W-L${f.record.d?'-D':''}</span>`;

  // Bio
  document.getElementById('popup-age').textContent = f.age ? `${f.age}세` : '—';
  document.getElementById('popup-height').textContent = f.height || '—';
  document.getElementById('popup-reach').textContent = f.reach || '—';
  document.getElementById('popup-stance').textContent = f.stance || '—';
  document.getElementById('popup-nationality').textContent = f.nationality || '—';

  // Style tags
  const styleEl = document.getElementById('popup-style-tags');
  if (styleEl) {
    styleEl.innerHTML = (f.style || []).map(s => `<span class="popup-style-tag">${esc(s)}</span>`).join('');
  }

  // Stats
  const stats = f.stats || {};
  const statDefs = [
    { key: 'striking',  label: '타격' },
    { key: 'grappling', label: '그래플링' },
    { key: 'wrestling', label: '레슬링' },
    { key: 'cardio',    label: '체력' },
    { key: 'chin',      label: '맷집' },
    { key: 'power',     label: '파워' },
  ];
  const statsGrid = document.getElementById('popup-stats-grid');
  if (statsGrid) {
    statsGrid.innerHTML = statDefs.map(({ key, label }) => {
      const val = stats[key] ?? 0;
      const pct = (val / 10) * 100;
      return `
        <div class="popup-stat-item">
          <div class="popup-stat-val">${val.toFixed(1)}</div>
          <div class="popup-stat-bar-wrap"><div class="popup-stat-bar" style="width:${pct}%"></div></div>
          <div class="popup-stat-lbl">${label}</div>
        </div>
      `;
    }).join('');
  }

  // Finishes
  const fin = f.finishes || {};
  document.getElementById('popup-ko').textContent = fin.ko ?? 0;
  document.getElementById('popup-sub').textContent = fin.sub ?? 0;
  document.getElementById('popup-dec').textContent = fin.dec ?? 0;

  // Recent fights
  const fightsBody = document.getElementById('popup-fights-body');
  if (fightsBody) {
    fightsBody.innerHTML = (f.recentFights || []).map(r => `
      <tr>
        <td>${esc(r.opponent)}</td>
        <td class="result-${r.result}">${r.result}</td>
        <td>${esc(r.method)}</td>
        <td>R${r.round} ${r.time !== '—' ? r.time : ''}</td>
        <td style="color:var(--text-faint)">${esc(r.event)}</td>
      </tr>
    `).join('') || `<tr><td colspan="5" style="color:var(--text-faint)">전적 정보 없음</td></tr>`;
  }

  // Career
  const careerEl = document.getElementById('popup-career');
  if (careerEl) {
    careerEl.innerHTML = (f.career || []).map(c => `
      <div class="popup-career-item">
        <span class="popup-career-year">${esc(c.year)}</span>
        <div class="popup-career-detail">
          <div class="popup-career-org">${esc(c.org)}</div>
          <div class="popup-career-role">${esc(c.role)}</div>
        </div>
      </div>
    `).join('');
  }

  // Titles
  const titlesWrap = document.getElementById('popup-titles-wrap');
  const titlesList = document.getElementById('popup-titles');
  if (titlesWrap && titlesList) {
    if (f.titles && f.titles.length) {
      titlesWrap.style.display = '';
      titlesList.innerHTML = f.titles.map(t => `<div class="popup-title-item">${esc(t)}</div>`).join('');
    } else {
      titlesWrap.style.display = 'none';
    }
  }
}

function closePopup() {
  const overlay = document.getElementById('popup-overlay');
  overlay.classList.remove('open');
  document.body.style.overflow = '';
  const iframe = document.getElementById('popup-highlight-iframe');
  if (iframe) iframe.src = '';
}

// ---------- Scroll Reveal ----------
function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 60);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ---------- Theme ----------
function initTheme() {
  const saved = localStorage.getItem('odfc_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
  updateThemeIcon(saved);
}
function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('odfc_theme', next);
  updateThemeIcon(next);
}
function updateThemeIcon(theme) {
  const btn = document.getElementById('theme-toggle');
  if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// ---------- Admin bar ----------
function checkAdminBar() {
  const params = new URLSearchParams(window.location.search);
  if (params.get('admin') === 'ODFC2025') {
    const bar = document.getElementById('admin-bar');
    if (bar) bar.classList.add('visible');
  }
}

// ---------- Keyboard ----------
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closePopup();
});

// ---------- Init ----------
function init() {
  loadData();
  initTheme();
  renderAnnouncementBar();
  renderNav();
  renderHeroBanner();
  renderHero();
  renderLiveBar();
  renderFightCard();
  renderChampions();
  renderFighters();
  renderPastEvents();
  renderSponsors();
  renderMediaKit();
  renderFooter();
  initReveal();
  checkAdminBar();
}

document.addEventListener('DOMContentLoaded', init);

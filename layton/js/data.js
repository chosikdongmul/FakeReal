// ═══════════════════════════════════════
//  오들오들 교수와 이상한 마을 — DEFAULT DATA
//  어드민에서 수정한 값은 localStorage('layton_data')에 저장
//  main.js의 loadData()가 localStorage 우선 적용
// ═══════════════════════════════════════

const DEFAULT_DATA = {

  // ── 사이트 기본 정보 ──────────────────
  site: {
    title:      '오들오들 교수와 이상한 마을',
    titleEn:    'Professor Oddleoddle and the Strange Town',
    tagline:    '레이튼 교수 시리즈 팬사이트.\n코스플레이어와 함께 재현한 세계관.',
    disclaimer: 'Professor Layton is a trademark of Level-5 Inc. All fan content is non-commercial.',
    navLabel:   '오들오들 교수',
    navSub:     '와 이상한 마을',
  },

  // ── 히어로 ────────────────────────────
  hero: {
    eyebrow:      'A Mystery Adventure Fan Site',
    title:        '오들오들 교수와\n이상한 마을',
    subtitle:     '신사라면 어떤 수수께끼도 피하지 않는 법이지.\n교수와 함께 마을의 비밀을 풀어보세요.',
    ctaPrimary:   '수수께끼 도전하기',
    ctaSecondary: '갤러리 보기',
    bgImage:      'assets/images/hero-bg.jpg',
    pngs: [
      'assets/images/intro1.png',
      'assets/images/intro2.png',
      'assets/images/intro3.png',
      'assets/images/final.png',
    ],
    pngDuration: 1200,
    pngFade:     600,
  },

  // ── About ─────────────────────────────
  about: {
    label: 'About',
    title: '이상한 마을의\n이야기',
    paragraphs: [
      '**오들오들 교수**는 고고학자이자 신사, 그리고 세상에서 가장 탁월한 수수께끼 풀이사입니다. 그의 조수 루크와 함께, 그는 어디서든 수수께끼가 있는 곳이라면 반드시 찾아갑니다.',
      '이 사이트는 레이튼 교수 시리즈를 사랑하는 팬과 코스플레이어가 함께 만든 공간입니다. 게임 속 세계관을 현실로 옮겨온 다양한 작업물들을 만나보세요.',
      '수수께끼 섹션에서는 레이튼 스타일의 퍼즐 미니게임도 순차적으로 공개됩니다.',
    ],
    quote:       '"신사라면 어떤 수수께끼도 피하지 않는 법이지."',
    quoteAuthor: '— 오들오들 교수',
  },

  // ── 등장인물 ──────────────────────────
  characters: [
    {
      id:        'professor',
      name:      '오들오들 교수',
      role:      'Professor',
      desc:      '고고학자이자 수수께끼 마스터. 어떤 수수께끼도 풀지 못한 적이 없다.',
      photo:     '',
      cosplayer: '',
    },
    {
      id:        'luke',
      name:      '루크',
      role:      'Apprentice',
      desc:      '교수의 충실한 조수. 동물과 대화할 수 있는 능력을 가졌다.',
      photo:     '',
      cosplayer: '',
    },
    {
      id:        'flora',
      name:      '플로라',
      role:      'Lady of Mystery',
      desc:      '수수께끼 저택의 주인. 교수와 함께 사건을 해결한다.',
      photo:     '',
      cosplayer: '',
    },
  ],

  // ── 갤러리 ────────────────────────────
  gallery: {
    label: 'Gallery',
    title: '갤러리',
    desc:  '촬영 현장의 비하인드, 완성된 코스프레 사진들을 모았습니다.',
    items: [],
  },

  // ── 수수께끼 카드 ─────────────────────
  puzzles: {
    label: 'Puzzles',
    title: '수수께끼',
    desc:  '레이튼 교수 스타일의 퍼즐 미니게임들. 순차적으로 공개됩니다.',
    items: [
      { id:'p1', num:'001', icon:'🎩', title:'역무원의 암호',       desc:'기차역에서 발견된 수상한 메모. 숫자 속에 숨겨진 진실을 찾아라.',                        status:'coming' },
      { id:'p2', num:'002', icon:'⚖️', title:'시장의 저울',        desc:'과일 가게의 이상한 저울. 무게의 균형을 맞춰야 비밀이 열린다.',                          status:'coming' },
      { id:'p3', num:'003', icon:'🕰', title:'멈춘 시계탑',        desc:'자정에 멈춰버린 시계. 시간이 멈춘 이유를 밝혀라.',                                      status:'coming' },
      { id:'p4', num:'004', icon:'☕', title:'카페의 암호 메뉴',    desc:'메뉴판 뒷면에 적힌 이상한 글씨. 해독의 열쇠는 의외의 곳에.',                            status:'coming' },
      { id:'p5', num:'005', icon:'📚', title:'거꾸로 꽂힌 책',     desc:'도서관의 모든 책이 뒤집혀 있다. 올바른 순서를 찾아라.',                                  status:'coming' },
      { id:'p6', num:'006', icon:'🏰', title:'영주의 최후 수수께끼', desc:'저택 입구에 새겨진 세 사람의 증언. 단 한 명만이 진실을 말한다.',                       status:'coming' },
    ],
  },
};

// 런타임 DATA (main.js에서 loadData() 호출 시 채워짐)
let DATA = {};

// ═══════════════════════════════════════
//  오들오들 교수와 이상한 마을 — 사이트 데이터
// ═══════════════════════════════════════

const DATA = {

  // 히어로 배너
  // heroBg: 히어로 전체 배경 이미지 (jpg/webp 등 배경용)
  // heroPngs: 순서대로 페이드인→아웃 재생, 마지막 이미지는 고정 유지
  heroBg: 'assets/images/hero-bg.jpg',   // 배경 (없으면 dark gradient)
  heroPngs: [
    'assets/images/intro1.png',   // 페이드인 → 아웃
    'assets/images/intro2.png',   // 페이드인 → 아웃
    'assets/images/intro3.png',   // 페이드인 → 아웃
    'assets/images/final.png',    // 페이드인 → 고정 (루프 없음)
  ],
  heroPngDuration: 1200,   // 각 PNG 표시 시간(ms), 마지막 제외
  heroPngFade: 600,        // 페이드 시간(ms)

  // 등장인물
  characters: [
    {
      id: 'professor',
      name: '오들오들 교수',
      role: 'Professor',
      desc: '고고학자이자 수수께끼 마스터. 어떤 수수께끼도 풀지 못한 적이 없다.',
      photo: '',
      cosplayer: '',
    },
    {
      id: 'luke',
      name: '루크',
      role: 'Apprentice',
      desc: '교수의 충실한 조수. 동물과 대화할 수 있는 능력을 가졌다.',
      photo: '',
      cosplayer: '',
    },
    {
      id: 'flora',
      name: '플로라',
      role: 'Lady of Mystery',
      desc: '수수께끼 저택의 주인. 교수와 함께 사건을 해결한다.',
      photo: '',
      cosplayer: '',
    },
  ],

  // 갤러리
  gallery: [
    { id: 'g1', src: 'assets/images/gallery/g1.jpg', category: 'portrait', alt: '교수 포트레이트' },
    { id: 'g2', src: 'assets/images/gallery/g2.jpg', category: 'scene',    alt: '마을 장면' },
    { id: 'g3', src: 'assets/images/gallery/g3.jpg', category: 'behind',   alt: '촬영 비하인드' },
    { id: 'g4', src: 'assets/images/gallery/g4.jpg', category: 'portrait', alt: '루크 포트레이트' },
    { id: 'g5', src: 'assets/images/gallery/g5.jpg', category: 'scene',    alt: '기차역 장면' },
    { id: 'g6', src: 'assets/images/gallery/g6.jpg', category: 'behind',   alt: '메이크업 비하인드' },
    { id: 'g7', src: 'assets/images/gallery/g7.jpg', category: 'portrait', alt: '그룹 포트레이트' },
    { id: 'g8', src: 'assets/images/gallery/g8.jpg', category: 'scene',    alt: '도서관 장면' },
  ],

  // 수수께끼 카드 (placeholder)
  puzzles: [
    {
      id: 'p1',
      num: '001',
      icon: '🎩',
      title: '역무원의 암호',
      desc: '기차역에서 발견된 수상한 메모. 숫자 속에 숨겨진 진실을 찾아라.',
      status: 'coming', // coming | available | solved
    },
    {
      id: 'p2',
      num: '002',
      icon: '⚖️',
      title: '시장의 저울',
      desc: '과일 가게의 이상한 저울. 무게의 균형을 맞춰야 비밀이 열린다.',
      status: 'coming',
    },
    {
      id: 'p3',
      num: '003',
      icon: '🕰',
      title: '멈춘 시계탑',
      desc: '자정에 멈춰버린 시계. 시간이 멈춘 이유를 밝혀라.',
      status: 'coming',
    },
    {
      id: 'p4',
      num: '004',
      icon: '☕',
      title: '카페의 암호 메뉴',
      desc: '메뉴판 뒷면에 적힌 이상한 글씨. 해독의 열쇠는 의외의 곳에 있다.',
      status: 'coming',
    },
    {
      id: 'p5',
      num: '005',
      icon: '📚',
      title: '거꾸로 꽂힌 책',
      desc: '도서관의 모든 책이 뒤집혀 있다. 올바른 순서를 찾아라.',
      status: 'coming',
    },
    {
      id: 'p6',
      num: '006',
      icon: '🏰',
      title: '영주의 최후 수수께끼',
      desc: '저택 입구에 새겨진 세 사람의 증언. 단 한 명만이 진실을 말한다.',
      status: 'coming',
    },
  ],
};

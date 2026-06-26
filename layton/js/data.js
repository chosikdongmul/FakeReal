// ═══════════════════════════════════════
//  오들오들 교수와 이상한 마을 — 게임 데이터
// ═══════════════════════════════════════

const GAME_DATA = {
  title: '오들오들 교수와 이상한 마을',
  subtitle: 'Professor Oddleoddle and the Strange Town',

  // 등장인물
  characters: {
    prof: { name: '오들오들 교수', emoji: '🎩', color: '#c8960a' },
    luke: { name: '루크', emoji: '🧒', color: '#a0c8f0' },
    npc: { name: '주민', emoji: '👤', color: '#a09070' },
  },

  // 마을 장소 (노드) — 위치는 map-area 기준 %
  locations: [
    {
      id: 'station',
      name: '기차역',
      emoji: '🚂',
      x: 50, y: 12,
      status: 'unlocked', // unlocked | solved | locked
      puzzleId: 'p01',
      intro: [
        { char: 'prof', text: '루크, 드디어 이상한 마을에 도착했군. 역에서부터 뭔가 이상한 느낌이 드는걸.' },
        { char: 'luke', text: '교수님! 저쪽 매표소 앞에 사람이 쓰러져 있어요!' },
        { char: 'npc', text: '아이고, 아까부터 저기 있었는데... 누가 쓰러뜨린 걸까요?' },
      ],
      image: '',
    },
    {
      id: 'market',
      name: '시장',
      emoji: '🏪',
      x: 25, y: 40,
      status: 'locked',
      puzzleId: 'p02',
      intro: [
        { char: 'prof', text: '시장에서 수상한 거래가 있었다는 제보를 받았네.' },
        { char: 'luke', text: '교수님, 저 과일 가게 아저씨가 뭔가 숨기는 것 같아요.' },
      ],
      image: '',
    },
    {
      id: 'clock_tower',
      name: '시계탑',
      emoji: '🕰',
      x: 75, y: 38,
      status: 'locked',
      puzzleId: 'p03',
      intro: [
        { char: 'prof', text: '마을의 시계탑 시계가 멈춰있다는군. 이 또한 사건과 관련이 있겠지.' },
        { char: 'luke', text: '시계가 멈춘 시각이 정확히 자정이에요! 교수님!' },
      ],
      image: '',
    },
    {
      id: 'cafe',
      name: '카페',
      emoji: '☕',
      x: 30, y: 68,
      status: 'locked',
      puzzleId: 'p04',
      intro: [
        { char: 'prof', text: '이 마을에서 가장 오래된 카페라네. 여기서 단서를 찾을 수 있을 거야.' },
        { char: 'npc', text: '손님, 저희 카페에 오신 걸 환영합니다. 뭘 도와드릴까요?' },
      ],
      image: '',
    },
    {
      id: 'library',
      name: '도서관',
      emoji: '📚',
      x: 65, y: 68,
      status: 'locked',
      puzzleId: 'p05',
      intro: [
        { char: 'prof', text: '도서관에는 이 마을의 역사 기록이 있을 거야. 어서 찾아보세.' },
        { char: 'luke', text: '교수님! 책들이 전부 거꾸로 꽂혀 있어요!' },
      ],
      image: '',
    },
    {
      id: 'manor',
      name: '영주의 저택',
      emoji: '🏰',
      x: 50, y: 88,
      status: 'locked',
      puzzleId: 'p06',
      intro: [
        { char: 'prof', text: '이 모든 사건의 끝은 결국 이곳에서 풀릴 것 같군.' },
        { char: 'luke', text: '교수님... 무섭지 않으세요?' },
        { char: 'prof', text: '신사는 두려움에 지지 않는 법이지, 루크.' },
      ],
      image: '',
    },
  ],

  // 수수께끼
  puzzles: {
    p01: {
      id: 'p01',
      number: 1,
      title: '역무원의 암호',
      description: '기차역 매표소에서 역무원이 남긴 메모가 발견됐습니다.\n\n"나는 짝수도, 홀수도 아니다. 더하면 제 자신, 곱하면 제 자신. 나는 무엇인가?"',
      type: 'choice', // choice | text
      choices: ['1', '0', '무한', '없음'],
      answer: 1, // choices 인덱스 (0-based), text면 string
      hints: [
        '수학에서 아무것도 없는 상태를 나타내는 수를 생각해보세요.',
        '어떤 수에 이 수를 더해도 변하지 않고, 곱해도 0이 됩니다.',
      ],
      correctMsg: '정답입니다! 역무원은 "0"을 뜻하는 암호를 남겼습니다. 다음 장소의 단서가 열렸습니다.',
      wrongMsg: '틀렸습니다. 다시 한번 생각해보세요.',
      unlocks: 'market',
    },
    p02: {
      id: 'p02',
      number: 2,
      title: '과일 가게의 저울',
      description: '과일 가게 아저씨가 이상한 저울을 들고 있습니다.\n\n"사과 3개 = 배 2개, 배 3개 = 귤 4개일 때, 사과 4개는 귤 몇 개와 같을까요?"',
      type: 'text',
      answer: '8',
      hints: [
        '먼저 사과와 배의 비율을 구하세요.',
        '사과 1개 = 배 2/3개 = 귤 ?개 순서로 계산해보세요.',
      ],
      correctMsg: '훌륭합니다! 사과 4개 = 귤 8개가 맞습니다. 다음 장소가 열렸습니다.',
      wrongMsg: '계산을 다시 해보세요. 힌트를 사용해보는 건 어떨까요?',
      unlocks: 'clock_tower',
    },
    p03: {
      id: 'p03',
      number: 3,
      title: '멈춘 시계',
      description: '시계탑의 시계가 자정에 멈춰있습니다. 관리인이 수수께끼를 냈습니다.\n\n"나는 앞으로도 뒤로도 읽히는 4자리 수입니다. 각 자릿수의 합은 12이며, 천의 자리 숫자는 3입니다. 나는 무엇인가?"',
      type: 'text',
      answer: '3663',
      hints: [
        '앞뒤로 같이 읽히는 수를 "회문수"라고 합니다.',
        '천의 자리가 3이라면 일의 자리도 3입니다. 나머지 두 숫자의 합은?',
      ],
      correctMsg: '정답! 3663이 맞습니다. 시계탑의 비밀이 밝혀졌습니다.',
      wrongMsg: '다시 생각해보세요.',
      unlocks: 'cafe',
    },
    p04: {
      id: 'p04',
      number: 4,
      title: '카페의 메뉴 암호',
      description: '카페 메뉴판 뒷면에 이상한 글씨가 적혀 있습니다.\n\n"처음은 끝이고, 끝은 처음이다. ABCDE에서 두 번째가 빠지면 무엇이 남는가?"',
      type: 'text',
      answer: 'ACDE',
      hints: [
        '"두 번째"가 빠진다는 것은 두 번째 글자가 사라진다는 뜻입니다.',
        'ABCDE에서 B를 빼면?',
      ],
      correctMsg: '맞습니다! ACDE가 정답입니다. 카페 주인이 단서를 알려줍니다.',
      wrongMsg: '다시 생각해보세요.',
      unlocks: 'library',
    },
    p05: {
      id: 'p05',
      number: 5,
      title: '거꾸로 꽂힌 책',
      description: '도서관의 책들이 모두 거꾸로 꽂혀 있습니다. 사서가 말했습니다.\n\n"책들이 이 순서대로 꽂혀야 단서가 보입니다. 가나다 순으로 정렬할 때 세 번째 책은?\n\n① 호랑이 전설\n② 나비의 꿈\n③ 달빛 소나타\n④ 가을 이야기"',
      type: 'choice',
      choices: ['호랑이 전설', '나비의 꿈', '달빛 소나타', '가을 이야기'],
      answer: 1, // 나비의 꿈
      hints: [
        '가나다 순으로 정렬해보세요. 첫 글자를 기준으로.',
        '가 → 나 → 달 → 호 순서입니다.',
      ],
      correctMsg: '정답! 가나다 순으로 ④가을→②나비→③달빛→①호랑이, 세 번째는 "달빛 소나타"... 잠깐, 다시 확인해볼게요.',
      wrongMsg: '가나다 순서를 다시 확인해보세요.',
      unlocks: 'manor',
    },
    p06: {
      id: 'p06',
      number: 6,
      title: '영주의 마지막 수수께끼',
      description: '저택 입구에 새겨진 글귀입니다.\n\n"진실은 하나, 거짓은 둘. 세 사람 중 한 명만 진실을 말합니다.\n\n갑: 을이 범인이다.\n을: 나는 범인이 아니다.\n병: 갑이 범인이다.\n\n범인은 누구인가?"',
      type: 'choice',
      choices: ['갑', '을', '병'],
      answer: 0, // 갑
      hints: [
        '한 명만 진실을 말한다면, 나머지 둘은 거짓을 말합니다.',
        '각 사람이 범인이라고 가정하고 모순이 없는 경우를 찾으세요.',
      ],
      correctMsg: '탁월합니다! 갑이 범인입니다! 을의 말("나는 범인이 아니다")이 참이 되고, 갑과 병의 말은 거짓이 됩니다. 사건이 해결되었습니다!',
      wrongMsg: '논리를 다시 따져보세요.',
      unlocks: null,
    },
  },
};

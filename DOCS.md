# 진짜같은 가짜 — 개발 지시서

> Claude Cowork 세션 인계용 문서. 새 세션에서 이 파일을 먼저 읽고 작업을 이어받을 것.

---

## 프로젝트 개요

**GitHub**: `https://github.com/chosikdongmul/FakeReal`  
**배포**: `https://chosikdongmul.github.io` (GitHub Pages)  
**로컬 경로**: `C:\Users\assur\Claude\Projects\real but fake`  
**기술 스택**: 바닐라 HTML / CSS / JS — 빌드 도구 없음, 프레임워크 없음

세 개의 독립 팬사이트. 각각 완전히 다른 세계관과 디자인 시스템.

| 사이트 | 슬러그 | 설명 | 상태 |
|--------|--------|------|------|
| ODOD | `/odod/` | 가짜 LoL 프로게임단 (LCK) | ✅ 운영 중 |
| ODFC | `/odfc/` | 가짜 MMA 프로모션 | ✅ 운영 중 |
| Layton | `/layton/` | 탐정 교수 코스플레이 팬사이트 | ✅ 운영 중 |

---

## 디렉토리 구조

```
real but fake/
├── index.html              # 브랜드 허브 (세 사이트 진입점)
├── DOCS.md                 # 이 파일
├── .nojekyll               # GitHub Pages Jekyll 빌드 스킵
├── .gitattributes          # * text=auto eol=lf
│
├── odod/
│   ├── index.html
│   ├── admin/index.html
│   ├── css/style.css
│   ├── js/
│   │   ├── data.js         # DEFAULT_DATA (배포 소스)
│   │   └── main.js
│   └── assets/images/
│       ├── players/        # topplayer.jpg, midplayer.jpg, jgplayer.jpg 등
│       ├── sponsors/       # SVG 파일들
│       └── Bannertest.jpg
│
├── odfc/
│   ├── index.html
│   ├── admin/index.html
│   ├── css/style.css
│   ├── js/
│   │   ├── data.js
│   │   └── main.js
│   └── assets/images/
│       ├── sponsors/       # SVG 파일들
│       └── Banners/TEST.jpg
│
└── layton/
    ├── index.html
    ├── admin/index.html
    ├── css/style.css
    ├── js/
    │   ├── data.js
    │   └── main.js
    └── assets/images/
        ├── intro1.png ~ intro3.png
        └── final.png
```

---

## 핵심 아키텍처 패턴

### 1. 데이터 흐름

```
data.js (DEFAULT_DATA)
    ↓ <script src>로 로드
main.js loadData()
    → localStorage에 저장된 값 있으면 우선 사용
    → 없으면 DEFAULT_DATA 사용
    ↓
DATA 전역 변수로 렌더링
```

**각 사이트 localStorage 키:**
- ODOD: `odod_data`
- ODFC: `odfc_data`
- Layton: `layton_data`

### 2. 어드민 showAdmin() 패턴 (3개 사이트 공통)

```js
async function showAdmin() {
  // 로그인 화면 숨기고 어드민 표시
  try {
    const resp = await fetch('../js/data.js?_=' + Date.now()); // 캐시 버스팅
    if (resp.ok) {
      const text = await resp.text();
      const fresh = new Function(text + '; return DEFAULT_DATA;')();
      localStorage.setItem('사이트_data', JSON.stringify(fresh));
    }
  } catch(e) { /* fetch 실패 시 기존 localStorage 유지 */ }
  initAdmin();
}
```

→ 어드민을 열 때마다 배포된 data.js를 fetch해서 localStorage를 최신화.  
→ 다른 기기에서 편집한 내용이 있어도 항상 배포 버전을 기준으로 시작.

### 3. 배포 내보내기 흐름

```
어드민에서 설정
    ↓ "배포용 내보내기" 버튼
toJS() 함수가 JS 형식으로 직렬화 (JSON.stringify 아님, 키 따옴표 없음)
    ↓ 클립보드 복사
js/data.js 파일 전체 교체
    ↓ git commit & push
GitHub Pages 배포 완료 → 모든 기기에서 새 데이터 적용
```

**중요**: 어드민 저장만 하면 localStorage에만 저장됨. 다른 기기에 반영하려면 반드시 내보내기 → data.js 교체 → push 해야 함.

### 4. 어드민 비밀번호

모든 사이트 동일: `'1'`  
URL 파라미터로도 접근 가능: `?admin=1`

---

## 사이트별 상세

---

### ODOD (LoL 프로게임단)

**URL**: `https://chosikdongmul.github.io/odod/`  
**어드민**: `/odod/admin/?admin=1`

#### 디자인 시스템
```css
--bg: #0c0c0c
--bg2: #141414
--bg3: #1c1c1c
--orange: #e8192c    /* 브랜드 레드 (변수명은 orange지만 실제는 빨강) */
--text: #ffffff
--text-muted: #999999
--text-dim: #555555
--border: rgba(255,255,255,0.08)
```
다크/라이트 토글 지원 (`[data-theme="light"]` 오버라이드).

#### data.js 최상위 키
```
team, staff, players, results, schedule, gallery,
sponsors, sponsorshipIntro, sponsorshipTiers,
mediakit, live, banners, goodsStore, announcement
```

#### 주요 기능
- 히어로 롤링 배너 (이미지 + YouTube 영상, 슬라이드쇼)
- 선수 팝업 (레이더 차트, 최근 경기, 챔피언 풀 히트맵)
- 팬 MVP 투표 (localStorage 기반)
- 선수 비교 모드 (2명 나란히)
- LIVE 경기 위젯
- 스폰서십 패키지 페이지
- 팬 굿즈 스토어
- 어드민 전체 편집 가능

---

### ODFC (MMA 프로모션)

**URL**: `https://chosikdongmul.github.io/odfc/`  
**어드민**: `/odfc/admin/?admin=1`

#### 디자인 시스템
```css
--bg: #0c1018        /* 네이비 블랙 */
--bg2: #131923
--bg3: #1a2232
--bg4: #222d3d
--red: #c41e1e        /* 브랜드 크림슨 */
--gold: #c8992a       /* 챔피언 골드 */
--text: #eef2f7
--text-muted: #7d8fa3
--radius: 4px
```

#### data.js 최상위 키
```
org, fighters, events, sponsors, banners, mediakit, live, announcement
```

#### 세계관 규칙 (절대 변경 금지)
- **체급 없음** — 단일 챔피언 체계. `weightClass` 필드 절대 사용 금지.
- 챔피언은 `isChampion: true`인 파이터 1명 (현재: The Phantom, id: "phantom")
- 이벤트는 `ODFC {번호}` 형식 (현재 ODFC 11까지)
- 경기 타입: `"main"` (1개), `"co-main"` (1개), `"prelim"` (나머지)

#### 파이터 데이터 구조
```js
{
  id: "phantom",
  name: "Kim Junho",
  nameKo: "김준호",
  nickname: "The Phantom",
  isChampion: true,
  record: { w: 18, l: 2, d: 0 },
  photo: "",            // 외부 URL 권장
  highlight: "",        // YouTube URL
  age: 28,
  height: "180cm",
  reach: "185cm",
  stance: "Orthodox",
  nationality: "KR",
  style: ["Muay Thai", "Boxing"],
  stats: { striking:9, grappling:7, wrestling:6, cardio:8, chin:8, power:9 },
  finishes: { ko: 10, sub: 2, dec: 6 },
  recentFights: [ { opponent, result, method, round, event } ],
  career: ["string"],
  titles: ["string"]
}
```

#### 챔피언 섹션 렌더링
`renderChampions()` — `isChampion: true`인 파이터 1명을 피처드 카드로 렌더.  
좌: 사진, 우: 배지·닉네임·전적·스타일태그·기본정보·능력치 바.  
클릭 시 파이터 팝업 열림.

#### 이벤트 파이트카드 구조
```js
{
  id: "odfc-11",
  name: "ODFC 11",
  date: "2026-09-20",
  venue: "...",
  status: "upcoming",   // "upcoming" | "past"
  fightCard: [
    {
      type: "main",     // "main" | "co-main" | "prelim"
      red: { id, nickname, record },
      blue: { id, nickname, record },
      rounds: 5,
      isTitleFight: true,
      result: null      // 또는 { winner, method, round, time }
    }
  ]
}
```

---

### Layton (탐정 교수 코스플레이 팬사이트)

**URL**: `https://chosikdongmul.github.io/layton/`  
**어드민**: `/layton/admin/?admin=1`

#### 세계관
가상의 탐정 교수 "레이튼" 캐릭터의 팬사이트. 고전 미스터리·퍼즐·빅토리안 분위기.

#### 디자인 시스템
```css
--bg: #0c0905        /* 다크 세피아 */
--bg2: #141009
--bg3: #1e170c
--bg4: #261e10
--gold: #c8960a       /* 주 브랜드 컬러 */
--parchment: #f0dea0  /* 텍스트 강조 */
--text: #ede0c0
--text-muted: #9a8a68
--border: rgba(200,150,10,0.15)
```

#### data.js 최상위 키
```
site, hero, about, characters, puzzles
```

#### hero 섹션 구조
```js
hero: {
  bgImage: "",          // 배경 이미지 (반드시 외부 URL — 로컬 파일 git 미등록 주의)
  pngs: [               // PNG 순차 페이드 연출
    "assets/images/intro1.png",   // git에 있음
    "assets/images/intro2.png",   // git에 있음
    "assets/images/intro3.png",   // git에 있음
    "assets/images/final.png",    // git에 있음
  ],
  pngDuration: 1200,
  pngFade: 600,
  title: "",
  subtitle: "",
  eyebrow: "",
  ctaPrimary: { label, href },
  ctaSecondary: { label, href },
}
```

---

## 공통 개발 규칙

### JS 패턴
- `esc(str)` 함수로 HTML 이스케이프 (XSS 방지) — 모든 사이트 동일
- `onerror`로 이미지 fallback (이니셜 플레이스홀더)
- `reveal` 클래스: IntersectionObserver로 스크롤 진입 시 fade-in
- 이미지 경로: 외부 URL 우선. 로컬 파일은 반드시 git에 커밋 확인 후 사용

### data.js 직렬화 형식 (toJS)
```js
// JSON이 아닌 JS 객체 리터럴 — 키에 따옴표 없음
const DEFAULT_DATA = {
  team: {
    name: "Outlaw Dogs",
  },
  banners: [
    { image: "", video: "", caption: "" },
  ],
};
```
ODFC만 예외적으로 JSON 형식(따옴표 있는 키)으로 출력됨.

### GitHub Pages 배포
- push 후 30초~2분 내 반영
- 메인 사이트 캐시: 강제새로고침(Ctrl+Shift+R)으로 확인
- 어드민은 매번 data.js를 `?_=Date.now()`로 fetch해서 캐시 우회함

### 이미지 규칙
- ODOD: 선수 사진 로컬 파일 (`assets/images/players/`) 또는 URL
- ODFC: 파이터 사진 외부 URL 권장
- Layton: bgImage 반드시 외부 URL (로컬 `hero-bg.jpg` 없음)
- 공통: 챔피언 이미지는 LoL 공식 CDN 사용 가능 (`ddragon.leagueoflegends.com`)


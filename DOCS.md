# 진짜같은 가짜 — 프로젝트 참고 문서

> 이 문서는 프로젝트 구조, 데이터 필드, 어드민 기능, 용어를 정리한 참고용 문서입니다.

---

## 목차

1. [프로젝트 구조](#1-프로젝트-구조)
2. [데이터 구조 (필드 설명)](#2-데이터-구조-필드-설명)
3. [어드민 페이지 사용법](#3-어드민-페이지-사용법)
4. [이미지 등록 방법](#4-이미지-등록-방법)
5. [롤링 배너](#5-롤링-배너)
6. [선수·코치진 팝업](#6-선수코치진-팝업)
7. [데이터 저장 방식](#7-데이터-저장-방식)
8. [디자인 시스템 (색상·스타일)](#8-디자인-시스템-색상스타일)
9. [자주 쓰는 용어 정리](#9-자주-쓰는-용어-정리)

---

## 1. 프로젝트 구조

```
real but fake/
├── index.html                  ← 허브 메인 (모든 프로젝트 포털)
│
└── odod/                       ← ODOD 프로젝트 (가짜 LoL 프로게임단)
    ├── index.html              ← ODOD 메인 페이지
    ├── css/
    │   └── style.css           ← 모든 스타일
    ├── js/
    │   └── main.js             ← 모든 동작 + DEFAULT_DATA 내장
    ├── data/
    │   └── team.json           ← 참고용 JSON (실제 로드는 main.js에서)
    ├── admin/
    │   └── index.html          ← 어드민 페이지 (비밀번호 보호)
    └── assets/
        └── images/
            ├── players/        ← 선수 사진 (photo, photoThumb, bannerImage)
            ├── staff/          ← 코치진 사진
            ├── champions/      ← 챔피언 아이콘
            ├── gallery/        ← 갤러리 사진
            ├── sponsors/       ← 스폰서 로고
            └── banners/        ← 메인 롤링 배너 이미지
```

---

## 2. 데이터 구조 (필드 설명)

### 팀 (team)

| 필드 | 설명 | 예시 |
|------|------|------|
| `name` | 팀 약칭 | `"ODOD"` |
| `fullName` | 팀 풀네임 | `"OverDrive Outlaw Dogs"` |
| `league` | 소속 리그 | `"LCK"` |
| `founded` | 창단 연도 | `"2022"` |
| `city` | 연고지 | `"Seoul"` |
| `slogan` | 팀 슬로건 (히어로·푸터에 표시) | `"We don't follow the meta."` |
| `season` | 현재 시즌 | `"2025"` |
| `standing` | 현재 순위 (숫자) | `3` |
| `record.wins` / `record.losses` | 승/패 수 | `18`, `9` |
| `winRate` | 승률 (%) | `66.7` |
| `worldsAppearances` | 월드챔피언십 출전 횟수 | `1` |
| `social.twitter` / `instagram` / `youtube` | SNS 링크 | URL 문자열 |

---

### 선수 (players 배열)

| 필드 | 설명 | 예시 |
|------|------|------|
| `id` | 고유 식별자 (영어 소문자) | `"ironwall"` |
| `position` | 포지션 (영어) | `"Top"`, `"Jungle"`, `"Mid"`, `"Bot"`, `"Support"` |
| `positionKo` | 포지션 (한국어) | `"탑"`, `"정글"` 등 |
| `number` | 등번호 | `1` |
| `nickname` | 게임 닉네임 | `"Ironwall"` |
| `realName` | 실명 (영어) | `"Jang Minjun"` |
| `realNameKo` | 실명 (한국어) | `"장민준"` |
| `age` | 나이 | `22` |
| `birthdate` | 생년월일 | `"2003-04-11"` |
| `nationality` | 국적 코드 | `"KR"`, `"US"` 등 |
| `joinYear` | 팀 합류 연도 | `2023` |
| `games` | 총 출전 경기 수 | `87` |
| `photo` | 팝업용 대형 사진 경로 | `"assets/images/players/ironwall.jpg"` |
| `photoThumb` | 팝업 헤더 썸네일 (원형, 작은 사진) | `"assets/images/players/ironwall_thumb.jpg"` |
| `bannerImage` | (예비 필드, 현재 미사용) 선수 개인 배너 | `"assets/images/players/ironwall_banner.jpg"` |
| `highlight` | 하이라이트 영상 YouTube URL | `"https://youtu.be/xxxx"` |
| `isAce` | 에이스 선수 여부 (로스터 카드에 강조) | `true` |
| `stats.kda` | KDA | `3.2` |
| `stats.winRate` | 승률 (%) | `62.1` |
| `stats.csPerMin` | 분당 CS | `8.4` |
| `stats.kills` / `deaths` / `assists` | 평균 킬/데스/어시 | `2.8`, `2.1`, `5.7` |
| `champions` | 주 챔피언 배열 (최대 3개 권장) | 아래 참조 |
| `champions[].name` | 챔피언 이름 | `"Garen"` |
| `champions[].image` | 챔피언 이미지 경로 | `"assets/images/champions/garen.jpg"` |
| `champions[].winRate` | 해당 챔피언 승률 (%) | `71` |
| `champions[].kda` | 해당 챔피언 KDA | `4.1` |
| `champions[].games` | 해당 챔피언 게임 수 | `21` |
| `career` | 커리어 배열 | 아래 참조 |
| `career[].year` | 기간 | `"2022–2023"` |
| `career[].org` | 소속 팀/조직 | `"ODOD Academy"` |
| `career[].role` | 역할 | `"Top"` |
| `awards` | 수상 내역 배열 (문자열) | `["2024 LCK Summer MVP"]` |

---

### 코치진 (staff 배열)

| 필드 | 설명 | 예시 |
|------|------|------|
| `id` | 고유 식별자 | `"vortex"` |
| `role` | 역할 (영어) | `"Head Coach"`, `"Coach"`, `"Analyst"` |
| `roleKo` | 역할 (한국어) | `"감독"`, `"코치"`, `"애널리스트"` |
| `nickname` | 닉네임 | `"Vortex"` |
| `realName` / `realNameKo` | 실명 | `"Kim Dohyun"` / `"김도현"` |
| `age` | 나이 | `34` |
| `nationality` | 국적 코드 | `"KR"` |
| `joinYear` | 합류 연도 | `2022` |
| `photo` | 사진 경로 (팝업용) | `"assets/images/staff/vortex.jpg"` |
| `philosophy` | 지도 철학 (팝업에 표시) | `"읽히는 순간 지는 거다."` |
| `career` | 커리어 배열 (선수와 동일 구조) | |

---

### 메인 롤링 배너 (banners 배열)

| 필드 | 설명 | 예시 |
|------|------|------|
| `image` | 배너 이미지 경로 또는 URL | `"assets/images/banners/01.jpg"` 또는 `"https://..."` |
| `caption` | 배너 하단 캡션 (선택) | `"2025 LCK Summer 개막"` |

> 배너는 선수 데이터와 완전히 독립. 원하는 이미지를 자유롭게 등록.

---

### 경기 결과 (results 배열)

| 필드 | 설명 | 예시 |
|------|------|------|
| `date` | 경기 날짜 | `"2025-06-14"` |
| `opponent` | 상대 팀명 | `"T1"` |
| `score` | 스코어 | `"2-1"` |
| `result` | 승패 | `"W"` 또는 `"L"` |
| `stage` | 대회/스테이지명 | `"LCK Summer"` |

---

### 일정 (schedule 배열)

| 필드 | 설명 | 예시 |
|------|------|------|
| `date` | 경기 날짜 | `"2025-06-28"` |
| `opponent` | 상대 팀명 | `"Dplus KIA"` |
| `time` | 경기 시간 (24h) | `"17:00"` |
| `stage` | 대회/스테이지명 | `"LCK Summer"` |

---

### 갤러리 (gallery 배열)

| 필드 | 설명 | 예시 |
|------|------|------|
| `src` | 이미지 경로 | `"assets/images/gallery/01.jpg"` |
| `caption` | 사진 설명 | `"2025 LCK Summer 개막전"` |

---

### 스폰서 (sponsors 배열)

| 필드 | 설명 | 예시 |
|------|------|------|
| `name` | 스폰서 이름 | `"APEX Gaming Chairs"` |
| `logo` | 로고 이미지 경로 | `"assets/images/sponsors/apex.png"` |
| `url` | 클릭 시 이동할 URL | `"https://apex.com"` |

---

## 3. 어드민 페이지 사용법

### 접근 방법

```
ODOD 메인 페이지 URL에 ?admin=ODOD2025 를 붙인다
예: file:///C:/Users/.../odod/index.html?admin=ODOD2025
```

하단에 Admin bar가 나타나면 **"어드민 페이지 열기 →"** 클릭.

어드민 페이지에서 비밀번호 입력: `ODOD2025`

---

### 탭 구성

| 탭 | 관리 내용 |
|----|-----------|
| 팀 정보 | 팀명, 슬로건, 순위, 전적, SNS 링크 등 |
| 선수 | 선수별 정보, 사진, 하이라이트, 통계, 챔피언, 커리어 |
| 코치진 | 코치진 정보, 사진, 지도 철학, 커리어 |
| 경기 결과 | 최근 경기 승패 기록 |
| 일정 | 향후 경기 일정 |
| 갤러리 | 갤러리 사진 목록 |
| 스폰서 | 파트너사 로고 및 링크 |
| **메인 배너** | 히어로 롤링 배너 이미지 등록 |

---

### 저장

- **저장 버튼** 클릭 → 브라우저 LocalStorage에 저장
- 저장 후 메인 페이지 새로고침하면 반영됨
- **초기화 버튼** → LocalStorage 삭제, 코드에 내장된 기본값으로 복원

---

## 4. 이미지 등록 방법

### 방법 A: 로컬 파일 경로 (GitHub Pages 미사용 시)

이미지를 `odod/assets/images/` 하위 폴더에 넣고 경로 입력:

```
assets/images/banners/summer2025.jpg
assets/images/players/ironwall.jpg
```

> `odod/` 폴더를 기준으로 한 상대 경로.

---

### 방법 B: 외부 URL

직접 URL을 붙여넣기:

```
https://example.com/image.jpg
https://i.imgur.com/xxxxx.jpg
```

---

### 이미지 권장 규격

| 용도 | 권장 비율 | 권장 크기 |
|------|-----------|-----------|
| 메인 롤링 배너 (`banners`) | 16:9 또는 와이드 | 1920×1080px 이상 |
| 선수 팝업 사진 (`photo`) | 2:3 세로형 | 600×900px 이상 |
| 선수 썸네일 (`photoThumb`) | 1:1 정사각형 | 200×200px 이상 |
| 챔피언 아이콘 (`champions[].image`) | 1:1 | 100×100px |
| 갤러리 (`gallery`) | 자유 | 1200px 이상 권장 |
| 스폰서 로고 (`sponsors`) | 자유 (투명 PNG 권장) | 400px 이상 |

---

## 5. 롤링 배너

- 히어로 섹션 전체를 덮는 슬라이드쇼
- **데이터 위치**: `DATA.banners` 배열 (선수 데이터와 완전 독립)
- 이미지가 없는 슬롯은 무시되고, 등록된 이미지만 롤링
- 이미지가 하나도 없으면 "ODOD" 텍스트 플레이스홀더 표시
- 자동 슬라이드: 5초 간격
- 하단 점(dot) 클릭으로 수동 이동
- 배너 하단 우측에 `1 / 3` 형식 카운터 + 캡션 표시

---

## 6. 선수·코치진 팝업

### 선수 팝업

- 로스터 카드 클릭 시 열림
- **좌측**: 유튜브 하이라이트 영상 풀패널 (영상 없으면 빈 어두운 패널)
- **우측 상단**: 썸네일(`photoThumb`) + 닉네임 + 실명
- **우측**: KDA/승률/CS 통계, 주 챔피언 3개, 커리어, 수상 내역
- 🔇 버튼으로 영상 음소거/해제 토글

### 코치진 팝업

- 코치진 카드 클릭 시 열림
- **좌측**: 사진(`photo`) 표시 (영상 없음)
- **우측**: 역할, 합류연도, 지도 철학, 커리어
- 챔피언 섹션은 코치진 팝업에 미표시

---

## 7. 데이터 저장 방식

```
브라우저 LocalStorage (키: "odod_data")
        ↓  없으면 (첫 방문, 또는 초기화 후)
main.js 내 DEFAULT_DATA 상수 (코드에 내장)
```

- 어드민에서 저장 → LocalStorage 갱신
- 초기화 → LocalStorage 삭제 → DEFAULT_DATA로 복원
- **GitHub Pages 등 서버 배포 시에도 fetch 없이 작동** (CORS 이슈 없음)

> `data/team.json`은 현재 참고용. 실제 로드에 사용되지 않음.
> DEFAULT_DATA와 team.json을 동기화 상태로 유지 권장.

---

## 8. 디자인 시스템 (색상·스타일)

### CSS 변수

| 변수 | 값 | 용도 |
|------|----|------|
| `--bg` | `#0e0c08` | 페이지 기본 배경 |
| `--bg2` | `#141210` | 카드, 팝업 배경 |
| `--bg3` | `#1a1710` | 코치진 카드, 입력 필드 |
| `--text` | `#f0ebe4` | 기본 텍스트 |
| `--text-muted` | `rgba(240,235,228,0.45)` | 보조 텍스트 |
| `--orange` | `#c8601a` | 강조색 (포인트 컬러) |
| `--border` | `rgba(240,235,228,0.07)` | 기본 테두리 |
| `--border-light` | `rgba(240,235,228,0.15)` | 밝은 테두리 |

### 폰트

- 영문: `'Inter'` (Google Fonts)
- 한국어: 시스템 폰트 fallback

### 기본 원칙

- 테두리: `0.5px solid` (얇게)
- 모서리: 최소한의 `border-radius` (2–4px, 거의 직각)
- 여백: 넉넉한 패딩, 섹션 간 공간
- 애니메이션: 스크롤 시 `reveal` 클래스로 fade-in (`IntersectionObserver`)

---

## 9. 자주 쓰는 용어 정리

| 용어 | 설명 |
|------|------|
| **DEFAULT_DATA** | `main.js`에 코드로 내장된 기본 데이터. LocalStorage가 없을 때 사용 |
| **LocalStorage** | 브라우저가 로컬에 저장하는 데이터. 어드민 저장 시 여기에 기록 |
| **롤링 배너** | 히어로 섹션의 자동 슬라이드 이미지. `banners` 배열로 관리 |
| **photoThumb** | 팝업 우측 상단 원형 썸네일용 선수 사진 (작은 버전) |
| **photo** | 팝업 좌측 패널에 표시되는 선수/코치 대형 사진 |
| **highlight** | 선수 하이라이트 유튜브 URL. 팝업 좌측에 임베드됨 |
| **bannerImage** | 선수 개인 배너 이미지 (예비 필드, 현재 메인 배너와 별개) |
| **popup** | 카드 클릭 시 화면 중앙에 뜨는 상세 정보 오버레이 |
| **reveal** | 스크롤 진입 시 나타나는 fade-in 애니메이션 CSS 클래스 |
| **staff** | 코치진 (감독·코치·애널리스트 등) |
| **players** | 선수진 (5명 포지션 선수) |
| **isAce** | 팀 에이스 선수 표시 플래그. 로스터 카드에 강조 뱃지 추가 |
| **Admin URL 파라미터** | `?admin=ODOD2025` — 하단 Admin bar를 활성화하는 URL 파라미터 |
| **허브 (Hub)** | `real but fake/index.html` — 모든 프로젝트를 연결하는 메인 포털 |
| **CORS** | 로컬 파일을 브라우저에서 열 때 외부 JSON 로드를 막는 보안 정책. 이 프로젝트는 fetch 없이 JS에 데이터 내장으로 우회 |

---

*최종 업데이트: 2025 · 진짜같은 가짜 프로젝트*

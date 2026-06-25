# 진짜같은 가짜

> "개념과 사진"으로 완전히 다른 세계를 하나씩 만드는 크리에이티브 프로젝트.

각 프로젝트는 독립된 세계관을 가진 가짜 조직의 실제 사이트처럼 구현됩니다.

---

## 프로젝트 목록

| # | 슬러그 | 설명 | 상태 |
|---|--------|------|------|
| 01 | `/odod/` | ODOD — 가짜 LoL 프로게임단 (LCK) | ✅ 완성 |
| 02 | `/odfc/` | ODFC — 가짜 격투기 프로모션 (Outlaw Dogs FC) | 🔨 진행 중 |

---

## 구조

```
/
├── index.html          ← 허브 메인
├── odod/               ← 프로젝트 01
│   ├── index.html
│   ├── admin/          ← 어드민 (비밀번호 보호)
│   ├── css/
│   ├── js/
│   └── assets/
└── ...
```

## 로컬 실행

브라우저에서 `index.html`을 직접 열거나, 영상 배너 사용 시 로컬 서버 필요:

```bash
python -m http.server 8000
# → http://localhost:8000
```

또는 `서버시작.bat` 더블클릭 (Windows).

## 배포

GitHub Pages — `Settings → Pages → Deploy from branch (main)`

배포 후 URL: `https://{username}.github.io/{repo-name}/`



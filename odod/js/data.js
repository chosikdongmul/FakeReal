
/* ⚠️ 경고: 영상 배너 1개가 이미지 없이 등록됨.
   YouTube 퍼가기 차단 시 다른 사람 화면에 빈 슬라이드로 표시됩니다.
   이미지 배너와 함께 사용하거나, 직접 올린 YouTube 영상만 사용하세요. */
const DEFAULT_DATA = {
  "team": {
    "name": "ODOD",
    "fullName": "OverDrive Outlaw Dogs",
    "league": "LCK",
    "founded": "2026",
    "city": "Seoul",
    "slogan": "We don't follow the meta. We break it.",
    "season": "2026",
    "standing": 3,
    "record": {
      "wins": 18,
      "losses": 9
    },
    "winRate": 66.7,
    "worldsAppearances": 1,
    "social": {
      "twitter": "https://twitter.com/ODOD_LCK",
      "instagram": "https://instagram.com/odod_lck",
      "youtube": "https://youtube.com/@ODOD"
    },
    "contact": "partnership@odod.gg"
  },
  "staff": [
    {
      "id": "vortex",
      "role": "Head Coach",
      "roleKo": "감독",
      "nickname": "Vortex",
      "realName": "Kim Dohyun",
      "realNameKo": "김도현",
      "age": 34,
      "nationality": "KR",
      "joinYear": 2022,
      "photo": "assets/images/staff/vortex.jpg",
      "philosophy": "읽히는 순간 지는 거다.",
      "career": [
        {
          "year": "2017–2019",
          "org": "APEX Force",
          "role": "Analyst"
        },
        {
          "year": "2019–2021",
          "org": "Nova Esports",
          "role": "Assistant Coach"
        },
        {
          "year": "2022–",
          "org": "ODOD",
          "role": "Head Coach"
        }
      ]
    },
    {
      "id": "reaper",
      "role": "Coach",
      "roleKo": "코치",
      "nickname": "Reaper",
      "realName": "Choi Junho",
      "realNameKo": "최준호",
      "age": 28,
      "nationality": "KR",
      "joinYear": 2023,
      "photo": "assets/images/staff/reaper.jpg",
      "philosophy": "드래프트는 이미 게임의 절반이다.",
      "career": [
        {
          "year": "2018–2022",
          "org": "KT Bullet",
          "role": "Pro Player (Mid)"
        },
        {
          "year": "2023–",
          "org": "ODOD",
          "role": "Coach"
        }
      ]
    },
    {
      "id": "circuit",
      "role": "Analyst",
      "roleKo": "애널리스트",
      "nickname": "Circuit",
      "realName": "Park Seungwoo",
      "realNameKo": "박승우",
      "age": 25,
      "nationality": "KR",
      "joinYear": 2022,
      "photo": "assets/images/staff/circuit.jpg",
      "philosophy": "숫자가 거짓말을 하면 더 많은 숫자로 잡는다.",
      "career": [
        {
          "year": "2022–",
          "org": "ODOD",
          "role": "Analyst"
        }
      ]
    }
  ],
  "players": [
    {
      "id": "ironwall",
      "position": "Top",
      "positionKo": "탑",
      "number": 1,
      "nickname": "덕지",
      "realName": "Jang Minjun",
      "realNameKo": "장민준",
      "age": 22,
      "birthdate": "2003-04-11",
      "nationality": "KR",
      "joinYear": 2026,
      "games": 87,
      "photo": "assets/images/players/topplayer.jpg",
      "highlight": "",
      "stats": {
        "kda": 3.2,
        "winRate": 62.1,
        "csPerMin": 8.4,
        "kills": 2.8,
        "deaths": 2.1,
        "assists": 5.7
      },
      "champions": [
        {
          "name": "Garen",
          "image": "https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Garen.png",
          "winRate": 71,
          "kda": 4.1,
          "games": 21
        },
        {
          "name": "Renekton",
          "image": "https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Renekton.png",
          "winRate": 64,
          "kda": 3.4,
          "games": 14
        },
        {
          "name": "Camille",
          "image": "https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Camille.png",
          "winRate": 60,
          "kda": 2.9,
          "games": 10
        }
      ],
      "career": [
        {
          "year": "2022",
          "org": "T1 Academy",
          "role": "Top"
        },
        {
          "year": "2026–",
          "org": "ODOD",
          "role": "Top"
        }
      ],
      "awards": [
        "2024 LCK Summer All-Pro Team (3rd)"
      ],
      "social": {},
      "bannerImage": "",
      "photoThumb": "assets/images/players/topplayer_small.jpg"
    },
    {
      "id": "feral",
      "position": "Jungle",
      "positionKo": "정글",
      "number": 2,
      "nickname": "DONG",
      "realName": "Lee Taehwan",
      "realNameKo": "이태환",
      "age": 21,
      "birthdate": "2004-08-29",
      "nationality": "KR",
      "joinYear": 2024,
      "games": 54,
      "photo": "assets/images/players/jgplayer.jpg",
      "highlight": "",
      "stats": {
        "kda": 4.1,
        "winRate": 68.5,
        "csPerMin": 5.9,
        "kills": 3.5,
        "deaths": 1.8,
        "assists": 8.2
      },
      "champions": [
        {
          "name": "Vi",
          "image": "https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Vi.png",
          "winRate": 75,
          "kda": 5.2,
          "games": 16
        },
        {
          "name": "Jarvan IV",
          "image": "https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/JarvanIV.png",
          "winRate": 70,
          "kda": 4,
          "games": 10
        },
        {
          "name": "Hecarim",
          "image": "https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Hecarim.png",
          "winRate": 62,
          "kda": 3.8,
          "games": 8
        }
      ],
      "career": [
        {
          "year": "2023",
          "org": "Storm Wings (Challenger)",
          "role": "Jungle"
        },
        {
          "year": "2024–",
          "org": "ODOD",
          "role": "Jungle"
        }
      ],
      "awards": [],
      "social": {},
      "bannerImage": "",
      "photoThumb": ""
    },
    {
      "id": "overdrive",
      "position": "Mid",
      "positionKo": "미드",
      "number": 3,
      "nickname": "페이커",
      "realName": "Sang--hyuk Lee",
      "realNameKo": "이상혁",
      "age": 20,
      "birthdate": "2005-01-17",
      "nationality": "KR",
      "joinYear": 2022,
      "games": 134,
      "isAce": true,
      "photo": "assets/images/players/midplayer.jpg",
      "highlight": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/PBkoTpaAiQY?si=mrcEUFsJrkaVG5s7\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
      "stats": {
        "kda": 5.8,
        "winRate": 70.1,
        "csPerMin": 9.7,
        "kills": 5.2,
        "deaths": 1.6,
        "assists": 7.3
      },
      "champions": [
        {
          "name": "Azir",
          "image": "https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Azir.png",
          "winRate": 78,
          "kda": 7.1,
          "games": 29
        },
        {
          "name": "Zed",
          "image": "https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Zed.png",
          "winRate": 72,
          "kda": 6.2,
          "games": 18
        },
        {
          "name": "Orianna",
          "image": "https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Orianna.png",
          "winRate": 68,
          "kda": 5.4,
          "games": 15
        }
      ],
      "career": [
        {
          "year": "2022–",
          "org": "ODOD",
          "role": "Mid"
        }
      ],
      "awards": [
        "2023 LCK Summer MVP",
        "2024 LCK Spring All-Pro Team (1st)",
        "2024 Worlds Quarterfinals"
      ],
      "social": {},
      "bannerImage": "",
      "photoThumb": "assets/images/players/midplayer_small.jpg"
    },
    {
      "id": "buckshot",
      "position": "Bot",
      "positionKo": "원딜",
      "number": 4,
      "nickname": "Buckshot",
      "realName": "Oh Yoongi",
      "realNameKo": "오윤기",
      "age": 23,
      "birthdate": "2002-11-03",
      "nationality": "KR",
      "joinYear": 2022,
      "games": 112,
      "photo": "assets/images/players/buckshot.jpg",
      "highlight": "",
      "stats": {
        "kda": 4.4,
        "winRate": 65.2,
        "csPerMin": 9.1,
        "kills": 4.8,
        "deaths": 2,
        "assists": 6
      },
      "champions": [
        {
          "name": "Jhin",
          "image": "https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Jhin.png",
          "winRate": 74,
          "kda": 5.5,
          "games": 27
        },
        {
          "name": "KaiSa",
          "image": "https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Kaisa.png",
          "winRate": 66,
          "kda": 4.2,
          "games": 19
        },
        {
          "name": "Caitlyn",
          "image": "https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Caitlyn.png",
          "winRate": 61,
          "kda": 3.9,
          "games": 12
        }
      ],
      "career": [
        {
          "year": "2021",
          "org": "Red Storm (Challenger)",
          "role": "Bot"
        },
        {
          "year": "2022–",
          "org": "ODOD",
          "role": "Bot"
        }
      ],
      "awards": [
        "2024 LCK Spring All-Pro Team (2nd)"
      ],
      "social": {},
      "bannerImage": "",
      "photoThumb": ""
    },
    {
      "id": "shackle",
      "position": "Support",
      "positionKo": "서포터",
      "number": 5,
      "nickname": "Shackle",
      "realName": "Yoo Chanho",
      "realNameKo": "유찬호",
      "age": 24,
      "birthdate": "2001-06-22",
      "nationality": "KR",
      "joinYear": 2022,
      "games": 134,
      "photo": "assets/images/players/shackle.jpg",
      "highlight": "",
      "stats": {
        "kda": 6.2,
        "winRate": 66.4,
        "csPerMin": 1.8,
        "kills": 1.1,
        "deaths": 1.9,
        "assists": 12.7
      },
      "champions": [
        {
          "name": "Thresh",
          "image": "https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Thresh.png",
          "winRate": 72,
          "kda": 7.8,
          "games": 31
        },
        {
          "name": "Nautilus",
          "image": "https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Nautilus.png",
          "winRate": 68,
          "kda": 6.5,
          "games": 20
        },
        {
          "name": "Lulu",
          "image": "https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Lulu.png",
          "winRate": 64,
          "kda": 5.9,
          "games": 13
        }
      ],
      "career": [
        {
          "year": "2020–2021",
          "org": "Phoenix Wings",
          "role": "Support"
        },
        {
          "year": "2022–",
          "org": "ODOD",
          "role": "Support"
        }
      ],
      "awards": [
        "2023 LCK Summer All-Pro Team (2nd)",
        "2024 LCK Summer All-Pro Team (1st)"
      ],
      "social": {},
      "bannerImage": "",
      "photoThumb": ""
    }
  ],
  "results": [
    {
      "date": "2025-06-14",
      "opponent": "T1",
      "score": "2-1",
      "result": "W",
      "stage": "LCK Summer"
    },
    {
      "date": "2025-06-10",
      "opponent": "Gen.G",
      "score": "1-2",
      "result": "L",
      "stage": "LCK Summer"
    },
    {
      "date": "2025-06-07",
      "opponent": "KT Rolster",
      "score": "2-0",
      "result": "W",
      "stage": "LCK Summer"
    },
    {
      "date": "2025-05-31",
      "opponent": "DRX",
      "score": "2-1",
      "result": "W",
      "stage": "LCK Summer"
    },
    {
      "date": "2025-05-27",
      "opponent": "Hanwha Life",
      "score": "2-0",
      "result": "W",
      "stage": "LCK Summer"
    }
  ],
  "schedule": [
    {
      "date": "2025-06-28",
      "opponent": "Dplus KIA",
      "time": "17:00",
      "stage": "LCK Summer"
    },
    {
      "date": "2025-07-02",
      "opponent": "Nongshim RedForce",
      "time": "19:00",
      "stage": "LCK Summer"
    },
    {
      "date": "2025-07-05",
      "opponent": "T1",
      "time": "17:00",
      "stage": "LCK Summer"
    },
    {
      "date": "2025-07-09",
      "opponent": "BNK FearX",
      "time": "19:00",
      "stage": "LCK Summer"
    }
  ],
  "gallery": [
    {
      "src": "assets/images/gallery/01.jpg",
      "caption": "2025 LCK Summer 개막전",
      "name": "2026 홈 저지",
      "price": "89,000",
      "desc": "공식 경기 유니폼 · 선수 넘버 커스텀 가능",
      "badge": "NEW",
      "image": "",
      "url": "#"
    },
    {
      "src": "assets/images/gallery/02.jpg",
      "caption": "팀 트레이닝 세션",
      "name": "ODOD 팀 후드",
      "price": "69,000",
      "desc": "오버사이즈 · 오렌지 로고 자수",
      "badge": "",
      "image": "",
      "url": "#"
    },
    {
      "src": "assets/images/gallery/03.jpg",
      "caption": "Overdrive 솔로킬 클립",
      "name": "팀 마우스패드 XL",
      "price": "32,000",
      "desc": "900×400mm · 선수 사인 프린트",
      "badge": "SOLD OUT",
      "image": "",
      "url": "#"
    },
    {
      "src": "assets/images/gallery/04.jpg",
      "caption": "월드챔피언십 8강",
      "name": "스냅백 캡",
      "price": "39,000",
      "desc": "조절 가능 · 자수 로고",
      "badge": "",
      "image": "",
      "url": "#"
    },
    {
      "src": "assets/images/gallery/05.jpg",
      "caption": "미디어데이"
    },
    {
      "src": "assets/images/gallery/06.jpg",
      "caption": "팬미팅 2025"
    }
  ],
  "sponsors": [
    {
      "name": "AXPEX Gaming",
      "logo": "assets/images/sponsors/axpex.svg",
      "url": "#"
    },
    {
      "name": "Red Wulf",
      "logo": "assets/images/sponsors/redwulf.svg",
      "url": "#"
    },
    {
      "name": "Logitex G",
      "logo": "assets/images/sponsors/logitex.svg",
      "url": "#"
    },
    {
      "name": "Sunsung",
      "logo": "assets/images/sponsors/sunsung.svg",
      "url": "#"
    },
    {
      "name": "HyperZ",
      "logo": "assets/images/sponsors/hyperz.svg",
      "url": "#"
    },
    {
      "name": "SteelForce",
      "logo": "assets/images/sponsors/steelforce.svg",
      "url": "#"
    },
    {
      "name": "Razyr",
      "logo": "assets/images/sponsors/razyr.svg",
      "url": "#"
    },
    {
      "name": "Intek",
      "logo": "assets/images/sponsors/intek.svg",
      "url": "#"
    },
    {
      "name": "ROQ",
      "logo": "assets/images/sponsors/roq.svg",
      "url": "#"
    },
    {
      "name": "Venom Energy",
      "logo": "assets/images/sponsors/venomx.svg",
      "url": "#"
    },
    {
      "name": "Novania",
      "logo": "assets/images/sponsors/novania.svg",
      "url": "#"
    },
    {
      "name": "CrownLab",
      "logo": "assets/images/sponsors/crownlab.svg",
      "url": "#"
    }
  ],
  "sponsorshipIntro": "ODOD는 국내 최대 리그 오브 레전드 대회, LCK 무대에서 성장하는 팀입니다. \n저희와 함께하는 파트너사는 경기 중계, SNS, 유니폼, 공식 채널 등 다양한 노출 기회를 얻게 됩니다.",
  "sponsorshipTiers": [
    {
      "id": "bronze",
      "tier": "Bronze",
      "name": "Bronze",
      "price": "문의 시 협의",
      "benefits": [
        "공식 웹사이트 로고 노출",
        "SNS 멘션 연 4회",
        "시즌 종료 보고서 제공"
      ]
    },
    {
      "id": "silver",
      "tier": "Silver",
      "name": "Silver",
      "price": "문의 시 협의",
      "benefits": [
        "Bronze 전체 포함",
        "연습 시설 로고 부착",
        "SNS 멘션 연 8회",
        "팀 콘텐츠 공동 제작 1회"
      ]
    },
    {
      "id": "gold",
      "tier": "Gold",
      "name": "Gold",
      "price": "문의 시 협의",
      "benefits": [
        "Silver 전체 포함",
        "유니폼 슬리브 로고",
        "경기 전 인터뷰 배경 노출",
        "SNS 멘션 연 16회",
        "팬 미팅 공동 주최 가능"
      ]
    },
    {
      "id": "title",
      "tier": "Title",
      "name": "Title",
      "price": "문의 시 협의",
      "benefits": [
        "Gold 전체 포함",
        "팀명 병기 (ODOD × 파트너)",
        "유니폼 전면 메인 로고",
        "모든 공식 채널 최우선 노출",
        "전용 브랜드 콘텐츠 시리즈",
        "연간 파트너십 리뷰 미팅"
      ]
    }
  ],
  "mediakit": {
    "logo": {
      "file": "",
      "label": "팀 로고 패키지",
      "desc": "PNG · SVG · 흰색/컬러/모노 버전 포함"
    },
    "photos": {
      "file": "",
      "label": "선수 공식 사진",
      "desc": "고해상도 JPG · 선수별 개인 컷 포함"
    },
    "presskit": {
      "file": "",
      "label": "보도자료 PDF",
      "desc": "팀 소개 · 선수단 · 시즌 성적 요약"
    },
    "brandguide": {
      "file": "",
      "label": "브랜드 가이드라인",
      "desc": "컬러 코드 · 폰트 · 사용 규정"
    }
  },
  "live": {
    "active": false,
    "opponent": "T1",
    "opponentLogo": "",
    "score": "1-0",
    "mapStatus": "Game 2 진행 중",
    "timer": "23:14",
    "stream": "https://www.twitch.tv/lck"
  },
  "banners": [
    {
      "image": "",
      "video": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/hL2AHOehBy4?si=q3pFUyFwfg5X1aRK\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
      "caption": ""
    },
    {
      "image": "assets/images/Bannertest.jpg",
      "video": "",
      "caption": ""
    }
  ],
  "goodsStore": {
    "active": true,
    "storeUrl": "#",
    "items": [
      {
        "id": "jersey-2026",
        "name": "2026 홈 저지",
        "desc": "공식 경기 유니폼 · 선수 넘버 커스텀 가능",
        "price": "89,000",
        "badge": "NEW",
        "image": "",
        "url": "#",
        "src": "assets/images/gallery/01.jpg",
        "caption": "2025 LCK Summer 개막전"
      },
      {
        "id": "hoodie",
        "name": "ODOD 팀 후드",
        "desc": "오버사이즈 · 오렌지 로고 자수",
        "price": "69,000",
        "badge": "",
        "image": "",
        "url": "#",
        "src": "assets/images/gallery/02.jpg",
        "caption": "팀 트레이닝 세션"
      },
      {
        "id": "mousepad",
        "name": "팀 마우스패드 XL",
        "desc": "900×400mm · 선수 사인 프린트",
        "price": "32,000",
        "badge": "SOLD OUT",
        "image": "",
        "url": "#",
        "src": "assets/images/gallery/03.jpg",
        "caption": "Overdrive 솔로킬 클립"
      },
      {
        "id": "cap",
        "name": "스냅백 캡",
        "desc": "조절 가능 · 자수 로고",
        "price": "39,000",
        "badge": "",
        "image": "",
        "url": "#",
        "src": "assets/images/gallery/04.jpg",
        "caption": "월드챔피언십 8강"
      }
    ]
  },
  "announcement": {
    "active": true,
    "message": "2026 LCK Summer 플레이오프 진출 확정! 응원해주세요 🔥",
    "link": "",
    "linkText": ""
  }
};
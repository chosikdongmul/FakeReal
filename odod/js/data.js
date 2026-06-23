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
    }
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
      "joinYear": 2023,
      "games": 87,
      "photo": "assets/images/players/ironwall.jpg",
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
          "image": "assets/images/champions/garen.jpg",
          "winRate": 71,
          "kda": 4.1,
          "games": 21
        },
        {
          "name": "Renekton",
          "image": "assets/images/champions/renekton.jpg",
          "winRate": 64,
          "kda": 3.4,
          "games": 14
        },
        {
          "name": "Camille",
          "image": "assets/images/champions/camille.jpg",
          "winRate": 60,
          "kda": 2.9,
          "games": 10
        }
      ],
      "career": [
        {
          "year": "2022",
          "org": "ODOD Academy",
          "role": "Top"
        },
        {
          "year": "2023–",
          "org": "ODOD",
          "role": "Top"
        }
      ],
      "awards": [
        "2024 LCK Summer All-Pro Team (3rd)"
      ],
      "social": {},
      "bannerImage": "",
      "photoThumb": ""
    },
    {
      "id": "feral",
      "position": "Jungle",
      "positionKo": "정글",
      "number": 2,
      "nickname": "Feral",
      "realName": "Lee Taehwan",
      "realNameKo": "이태환",
      "age": 21,
      "birthdate": "2004-08-29",
      "nationality": "KR",
      "joinYear": 2024,
      "games": 54,
      "photo": "assets/images/players/feral.jpg",
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
          "image": "assets/images/champions/vi.jpg",
          "winRate": 75,
          "kda": 5.2,
          "games": 16
        },
        {
          "name": "Jarvan IV",
          "image": "assets/images/champions/jarvaniv.jpg",
          "winRate": 70,
          "kda": 4,
          "games": 10
        },
        {
          "name": "Hecarim",
          "image": "assets/images/champions/hecarim.jpg",
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
      "nickname": "Overdrive",
      "realName": "Han Seojun",
      "realNameKo": "한서준",
      "age": 20,
      "birthdate": "2005-01-17",
      "nationality": "KR",
      "joinYear": 2022,
      "games": 134,
      "isAce": true,
      "photo": "assets/images/players/overdrive.jpg",
      "highlight": "",
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
          "image": "assets/images/champions/azir.jpg",
          "winRate": 78,
          "kda": 7.1,
          "games": 29
        },
        {
          "name": "Zed",
          "image": "assets/images/champions/zed.jpg",
          "winRate": 72,
          "kda": 6.2,
          "games": 18
        },
        {
          "name": "Orianna",
          "image": "assets/images/champions/orianna.jpg",
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
      "photoThumb": ""
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
          "image": "assets/images/champions/jhin.jpg",
          "winRate": 74,
          "kda": 5.5,
          "games": 27
        },
        {
          "name": "Kai'Sa",
          "image": "assets/images/champions/kaisa.jpg",
          "winRate": 66,
          "kda": 4.2,
          "games": 19
        },
        {
          "name": "Caitlyn",
          "image": "assets/images/champions/caitlyn.jpg",
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
          "image": "assets/images/champions/thresh.jpg",
          "winRate": 72,
          "kda": 7.8,
          "games": 31
        },
        {
          "name": "Nautilus",
          "image": "assets/images/champions/nautilus.jpg",
          "winRate": 68,
          "kda": 6.5,
          "games": 20
        },
        {
          "name": "Lulu",
          "image": "assets/images/champions/lulu.jpg",
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
      "caption": "2025 LCK Summer 개막전"
    },
    {
      "src": "assets/images/gallery/02.jpg",
      "caption": "팀 트레이닝 세션"
    },
    {
      "src": "assets/images/gallery/03.jpg",
      "caption": "Overdrive 솔로킬 클립"
    },
    {
      "src": "assets/images/gallery/04.jpg",
      "caption": "월드챔피언십 8강"
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
      "name": "APEX Gaming Chairs",
      "logo": "assets/images/sponsors/apex.png",
      "url": "#"
    },
    {
      "name": "RedBull",
      "logo": "assets/images/sponsors/redbull.png",
      "url": "#"
    },
    {
      "name": "Logitech G",
      "logo": "assets/images/sponsors/logitechg.png",
      "url": "#"
    },
    {
      "name": "Samsung",
      "logo": "assets/images/sponsors/samsung.png",
      "url": "#"
    }
  ],
  "banners": [
    {
      "image": "assets/images/bannertest.png",
      "video": "",
      "caption": ""
    }
  ]
};

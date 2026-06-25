/* ⚠️ 경고: 영상 배너 1개가 이미지 없이 등록됨.
   YouTube 퍼가기 차단 시 다른 사람 화면에 빈 슬라이드로 표시됩니다. */
const DEFAULT_DATA = {
  "org": {
    "name": "Outlaw Dogs FC",
    "abbr": "ODFC",
    "fullName": "Outlaw Dogs Fight Club",
    "slogan": "Every dog has their day.",
    "founded": "2026",
    "city": "Seoul",
    "country": "KR",
    "contact": "booking@odfc.gg",
    "social": {
      "twitter": "https://twitter.com/OutlawDogsFC",
      "instagram": "https://instagram.com/outlawdogsfc",
      "youtube": "https://youtube.com/@ODFC"
    }
  },
  "weightClasses": [
    {
      "id": "flyweight",
      "name": "Flyweight",
      "nameKo": "플라이급",
      "limit": "56.7kg"
    },
    {
      "id": "lightweight",
      "name": "Lightweight",
      "nameKo": "라이트급",
      "limit": "70.3kg"
    },
    {
      "id": "welterweight",
      "name": "Welterweight",
      "nameKo": "웰터급",
      "limit": "77.1kg"
    },
    {
      "id": "middleweight",
      "name": "Middleweight",
      "nameKo": "미들급",
      "limit": "83.9kg"
    },
    {
      "id": "heavyweight",
      "name": "Heavyweight",
      "nameKo": "헤비급",
      "limit": "120.2kg"
    }
  ],
  "fighters": [
    {
      "id": "phantom",
      "name": "Kim Junho",
      "nameKo": "김준호",
      "nickname": "The Phantom",
      "weightClass": "lightweight",
      "isChampion": true,
      "record": {
        "w": 18,
        "l": 2,
        "d": 0
      },
      "age": 28,
      "nationality": "KR",
      "height": "175cm",
      "reach": "182cm",
      "stance": "Orthodox",
      "style": [
        "킥복싱",
        "BJJ"
      ],
      "photo": "assets/images/fighters/phantom.jpg",
      "photoThumb": "",
      "highlight": "",
      "stats": {
        "striking": 9.2,
        "grappling": 7.8,
        "wrestling": 6.5,
        "cardio": 8.5,
        "chin": 8,
        "power": 8.8
      },
      "finishes": {
        "ko": 8,
        "sub": 4,
        "dec": 6
      },
      "recentFights": [
        {
          "opponent": "Seo Minjun",
          "result": "W",
          "method": "KO",
          "round": 3,
          "time": "2:41",
          "event": "ODFC 11"
        },
        {
          "opponent": "Lee Sunghoon",
          "result": "W",
          "method": "SUB",
          "round": 2,
          "time": "3:08",
          "event": "ODFC 10"
        },
        {
          "opponent": "Park Minsu",
          "result": "W",
          "method": "DEC",
          "round": 5,
          "time": "—",
          "event": "ODFC 8"
        },
        {
          "opponent": "Kang Donghyun",
          "result": "W",
          "method": "KO",
          "round": 1,
          "time": "0:47",
          "event": "ODFC 7"
        },
        {
          "opponent": "Yoon Seongmin",
          "result": "L",
          "method": "DEC",
          "round": 3,
          "time": "—",
          "event": "ODFC 5"
        }
      ],
      "career": [
        {
          "year": "2024~",
          "org": "Outlaw Dogs FC",
          "role": "라이트급 챔피언"
        },
        {
          "year": "2022–2024",
          "org": "Outlaw Dogs FC",
          "role": "라이트급 컨텐더"
        },
        {
          "year": "2019–2022",
          "org": "K-1 코리아",
          "role": "킥복서"
        }
      ],
      "titles": [
        "ODFC 라이트급 챔피언 (2024~현재)"
      ]
    },
    {
      "id": "ironjaw",
      "name": "Park Minsu",
      "nameKo": "박민수",
      "nickname": "Iron Jaw",
      "weightClass": "lightweight",
      "isChampion": false,
      "record": {
        "w": 15,
        "l": 3,
        "d": 0
      },
      "age": 30,
      "nationality": "KR",
      "height": "172cm",
      "reach": "178cm",
      "stance": "Southpaw",
      "style": [
        "레슬링",
        "타격"
      ],
      "photo": "assets/images/fighters/ironjaw.jpg",
      "photoThumb": "",
      "highlight": "",
      "stats": {
        "striking": 7.5,
        "grappling": 6.8,
        "wrestling": 8.9,
        "cardio": 8.2,
        "chin": 9.5,
        "power": 7.2
      },
      "finishes": {
        "ko": 6,
        "sub": 2,
        "dec": 7
      },
      "recentFights": [
        {
          "opponent": "Jung Taeyong",
          "result": "W",
          "method": "KO",
          "round": 2,
          "time": "1:33",
          "event": "ODFC 11"
        },
        {
          "opponent": "Oh Seungwon",
          "result": "W",
          "method": "DEC",
          "round": 3,
          "time": "—",
          "event": "ODFC 10"
        },
        {
          "opponent": "Kim Junho",
          "result": "L",
          "method": "DEC",
          "round": 5,
          "time": "—",
          "event": "ODFC 8"
        },
        {
          "opponent": "Bae Hyunwoo",
          "result": "W",
          "method": "DEC",
          "round": 3,
          "time": "—",
          "event": "ODFC 7"
        },
        {
          "opponent": "Lim Chansu",
          "result": "W",
          "method": "SUB",
          "round": 1,
          "time": "2:14",
          "event": "ODFC 6"
        }
      ],
      "career": [
        {
          "year": "2022~",
          "org": "Outlaw Dogs FC",
          "role": "라이트급 #1 컨텐더"
        },
        {
          "year": "2019–2022",
          "org": "국군 체육부대",
          "role": "레슬링 국가대표"
        }
      ],
      "titles": []
    },
    {
      "id": "reaper",
      "name": "Choi Yongseok",
      "nameKo": "최용석",
      "nickname": "The Reaper",
      "weightClass": "welterweight",
      "isChampion": false,
      "record": {
        "w": 20,
        "l": 1,
        "d": 0
      },
      "age": 31,
      "nationality": "KR",
      "height": "180cm",
      "reach": "188cm",
      "stance": "Orthodox",
      "style": [
        "무에타이",
        "레슬링"
      ],
      "photo": "assets/images/fighters/reaper.jpg",
      "photoThumb": "",
      "highlight": "",
      "stats": {
        "striking": 9.6,
        "grappling": 7.2,
        "wrestling": 7.8,
        "cardio": 9,
        "chin": 7.5,
        "power": 9.2
      },
      "finishes": {
        "ko": 14,
        "sub": 2,
        "dec": 4
      },
      "recentFights": [
        {
          "opponent": "Jeon Hyunsu",
          "result": "W",
          "method": "KO",
          "round": 1,
          "time": "0:54",
          "event": "ODFC 11"
        },
        {
          "opponent": "Kim Hyunsoo",
          "result": "W",
          "method": "KO",
          "round": 3,
          "time": "3:21",
          "event": "ODFC 9"
        },
        {
          "opponent": "Oh Jungmin",
          "result": "W",
          "method": "KO",
          "round": 2,
          "time": "1:58",
          "event": "ODFC 7"
        },
        {
          "opponent": "Na Taeho",
          "result": "W",
          "method": "DEC",
          "round": 5,
          "time": "—",
          "event": "ODFC 5"
        },
        {
          "opponent": "Choi Minjun",
          "result": "L",
          "method": "KO",
          "round": 2,
          "time": "4:07",
          "event": "ODFC 3"
        }
      ],
      "career": [
        {
          "year": "2023~",
          "org": "Outlaw Dogs FC",
          "role": "웰터급 챔피언"
        },
        {
          "year": "2018–2021",
          "org": "태국 무에타이 투어",
          "role": "프로 선수"
        }
      ],
      "titles": [
        "ODFC 웰터급 챔피언 (2023~현재)"
      ]
    },
    {
      "id": "rampage",
      "name": "Kim Hyunsoo",
      "nameKo": "김현수",
      "nickname": "Rampage",
      "weightClass": "welterweight",
      "isChampion": false,
      "record": {
        "w": 14,
        "l": 4,
        "d": 0
      },
      "age": 27,
      "nationality": "KR",
      "height": "178cm",
      "reach": "185cm",
      "stance": "Orthodox",
      "style": [
        "복싱",
        "파워 펀처"
      ],
      "photo": "assets/images/fighters/rampage.jpg",
      "photoThumb": "",
      "highlight": "",
      "stats": {
        "striking": 8,
        "grappling": 5.5,
        "wrestling": 6,
        "cardio": 7.8,
        "chin": 8.5,
        "power": 9.8
      },
      "finishes": {
        "ko": 12,
        "sub": 0,
        "dec": 2
      },
      "recentFights": [
        {
          "opponent": "Park Jinwoo",
          "result": "W",
          "method": "KO",
          "round": 1,
          "time": "1:12",
          "event": "ODFC 11"
        },
        {
          "opponent": "Choi Yongseok",
          "result": "L",
          "method": "KO",
          "round": 3,
          "time": "3:21",
          "event": "ODFC 9"
        },
        {
          "opponent": "Seo Junho",
          "result": "W",
          "method": "KO",
          "round": 2,
          "time": "0:38",
          "event": "ODFC 8"
        },
        {
          "opponent": "Lee Donghyun",
          "result": "W",
          "method": "KO",
          "round": 1,
          "time": "2:55",
          "event": "ODFC 7"
        },
        {
          "opponent": "Im Seungho",
          "result": "W",
          "method": "KO",
          "round": 3,
          "time": "1:44",
          "event": "ODFC 6"
        }
      ],
      "career": [
        {
          "year": "2022~",
          "org": "Outlaw Dogs FC",
          "role": "웰터급 #1 컨텐더"
        },
        {
          "year": "2020–2022",
          "org": "WBO 코리아",
          "role": "아마추어 복싱"
        }
      ],
      "titles": []
    },
    {
      "id": "viper",
      "name": "Lee Taehun",
      "nameKo": "이태훈",
      "nickname": "The Viper",
      "weightClass": "middleweight",
      "isChampion": false,
      "record": {
        "w": 16,
        "l": 2,
        "d": 0
      },
      "age": 29,
      "nationality": "KR",
      "height": "183cm",
      "reach": "191cm",
      "stance": "Orthodox",
      "style": [
        "BJJ",
        "레슬링"
      ],
      "photo": "assets/images/fighters/viper.jpg",
      "photoThumb": "",
      "highlight": "",
      "stats": {
        "striking": 7,
        "grappling": 9.5,
        "wrestling": 9,
        "cardio": 8.5,
        "chin": 8,
        "power": 6.5
      },
      "finishes": {
        "ko": 2,
        "sub": 11,
        "dec": 3
      },
      "recentFights": [
        {
          "opponent": "Han Seongmin",
          "result": "W",
          "method": "SUB",
          "round": 2,
          "time": "4:28",
          "event": "ODFC 11"
        },
        {
          "opponent": "Kwon Taeho",
          "result": "W",
          "method": "SUB",
          "round": 3,
          "time": "2:11",
          "event": "ODFC 9"
        },
        {
          "opponent": "Bae Sungwoo",
          "result": "W",
          "method": "DEC",
          "round": 5,
          "time": "—",
          "event": "ODFC 7"
        },
        {
          "opponent": "Jung Minho",
          "result": "L",
          "method": "KO",
          "round": 3,
          "time": "3:52",
          "event": "ODFC 5"
        },
        {
          "opponent": "Shin Junhyuk",
          "result": "W",
          "method": "SUB",
          "round": 1,
          "time": "1:39",
          "event": "ODFC 4"
        }
      ],
      "career": [
        {
          "year": "2023~",
          "org": "Outlaw Dogs FC",
          "role": "미들급 챔피언"
        },
        {
          "year": "2018–2023",
          "org": "BJJ 월드 서킷",
          "role": "블랙벨트 / 선수"
        }
      ],
      "titles": [
        "ODFC 미들급 챔피언 (2023~현재)"
      ]
    },
    {
      "id": "thewall",
      "name": "Oh Dongkyu",
      "nameKo": "오동규",
      "nickname": "The Wall",
      "weightClass": "heavyweight",
      "isChampion": false,
      "record": {
        "w": 12,
        "l": 1,
        "d": 0
      },
      "age": 32,
      "nationality": "KR",
      "height": "193cm",
      "reach": "205cm",
      "stance": "Orthodox",
      "style": [
        "복싱",
        "무에타이"
      ],
      "photo": "assets/images/fighters/thewall.jpg",
      "photoThumb": "",
      "highlight": "",
      "stats": {
        "striking": 8.8,
        "grappling": 6,
        "wrestling": 5.5,
        "cardio": 7,
        "chin": 9.8,
        "power": 9.9
      },
      "finishes": {
        "ko": 10,
        "sub": 1,
        "dec": 1
      },
      "recentFights": [
        {
          "opponent": "Kang Chulwon",
          "result": "W",
          "method": "KO",
          "round": 2,
          "time": "3:18",
          "event": "ODFC 11"
        },
        {
          "opponent": "Park Gyumin",
          "result": "W",
          "method": "KO",
          "round": 1,
          "time": "1:05",
          "event": "ODFC 9"
        },
        {
          "opponent": "Sim Jaehong",
          "result": "W",
          "method": "KO",
          "round": 3,
          "time": "2:44",
          "event": "ODFC 7"
        },
        {
          "opponent": "Cho Yongjun",
          "result": "L",
          "method": "DEC",
          "round": 3,
          "time": "—",
          "event": "ODFC 4"
        },
        {
          "opponent": "Lee Mingyu",
          "result": "W",
          "method": "KO",
          "round": 2,
          "time": "0:59",
          "event": "ODFC 3"
        }
      ],
      "career": [
        {
          "year": "2022~",
          "org": "Outlaw Dogs FC",
          "role": "헤비급 챔피언"
        },
        {
          "year": "2016–2022",
          "org": "한국 복싱 국가대표팀",
          "role": "아마추어 복서"
        }
      ],
      "titles": [
        "ODFC 헤비급 챔피언 (2022~현재)"
      ]
    },
    {
      "id": "ghost",
      "name": "Shin Junho",
      "nameKo": "신준호",
      "nickname": "Ghost",
      "weightClass": "flyweight",
      "isChampion": false,
      "record": {
        "w": 21,
        "l": 0,
        "d": 0
      },
      "age": 26,
      "nationality": "KR",
      "height": "165cm",
      "reach": "170cm",
      "stance": "Southpaw",
      "style": [
        "킥복싱",
        "무에타이"
      ],
      "photo": "assets/images/fighters/ghost.jpg",
      "photoThumb": "",
      "highlight": "",
      "stats": {
        "striking": 9,
        "grappling": 7.5,
        "wrestling": 7,
        "cardio": 9.5,
        "chin": 8.5,
        "power": 7.8
      },
      "finishes": {
        "ko": 11,
        "sub": 3,
        "dec": 7
      },
      "recentFights": [
        {
          "opponent": "Jung Kanghyun",
          "result": "W",
          "method": "KO",
          "round": 4,
          "time": "2:07",
          "event": "ODFC 11"
        },
        {
          "opponent": "Yoo Jaewon",
          "result": "W",
          "method": "DEC",
          "round": 3,
          "time": "—",
          "event": "ODFC 9"
        },
        {
          "opponent": "Baek Seungmin",
          "result": "W",
          "method": "SUB",
          "round": 2,
          "time": "3:55",
          "event": "ODFC 7"
        },
        {
          "opponent": "Lim Donghyun",
          "result": "W",
          "method": "KO",
          "round": 1,
          "time": "0:42",
          "event": "ODFC 5"
        },
        {
          "opponent": "Kwon Minjun",
          "result": "W",
          "method": "DEC",
          "round": 3,
          "time": "—",
          "event": "ODFC 3"
        }
      ],
      "career": [
        {
          "year": "2022~",
          "org": "Outlaw Dogs FC",
          "role": "플라이급 챔피언 (무패)"
        },
        {
          "year": "2019–2022",
          "org": "아마추어 무에타이 서킷",
          "role": "선수"
        }
      ],
      "titles": [
        "ODFC 플라이급 챔피언 (2022~현재)",
        "프로 무패 기록 21-0"
      ]
    }
  ],
  "events": [
    {
      "id": "odfc-12",
      "name": "ODFC 12",
      "subtitle": "IRON NIGHT",
      "date": "2026-08-09",
      "time": "18:00",
      "venue": "장충체육관",
      "city": "Seoul, KR",
      "status": "upcoming",
      "poster": "",
      "card": [
        {
          "type": "main",
          "fighter1Id": "phantom",
          "fighter2Id": "ironjaw",
          "fighter1Label": "",
          "fighter2Label": "",
          "titleFight": true,
          "weightClass": "lightweight",
          "rounds": 5,
          "result": null
        },
        {
          "type": "co-main",
          "fighter1Id": "reaper",
          "fighter2Id": "rampage",
          "fighter1Label": "",
          "fighter2Label": "",
          "titleFight": true,
          "weightClass": "welterweight",
          "rounds": 5,
          "result": null
        },
        {
          "type": "prelim",
          "fighter1Id": "ghost",
          "fighter2Id": "",
          "fighter1Label": "",
          "fighter2Label": "TBA",
          "titleFight": false,
          "weightClass": "flyweight",
          "rounds": 3,
          "result": null
        },
        {
          "type": "prelim",
          "fighter1Id": "viper",
          "fighter2Id": "",
          "fighter1Label": "",
          "fighter2Label": "TBA",
          "titleFight": false,
          "weightClass": "middleweight",
          "rounds": 3,
          "result": null
        }
      ]
    },
    {
      "id": "odfc-11",
      "name": "ODFC 11",
      "subtitle": "DARK MATTER",
      "date": "2026-05-17",
      "time": "18:00",
      "venue": "올림픽 핸드볼경기장",
      "city": "Seoul, KR",
      "status": "completed",
      "poster": "",
      "card": [
        {
          "type": "main",
          "fighter1Id": "phantom",
                 "type": "main",
          "fighter1Id": "phantom",
          "fighter2Id": "",
          "fighter1Label": "",
          "fighter2Label": "Seo Minjun",
          "titleFight": false,
          "weightClass": "lightweight",
          "rounds": 5,
          "result": { "winnerId": "phantom", "method": "KO", "round": 3, "time": "2:47" }
        },
        {
          "type": "co-main",
          "fighter1Id": "ghost",
          "fighter2Id": "",
          "fighter1Label": "",
          "fighter2Label": "Kim Hyunwoo",
          "titleFight": false,
          "weightClass": "flyweight",
          "rounds": 3,
          "result": { "winnerId": "ghost", "method": "SUB", "round": 2, "time": "3:55" }
        },
        {
          "type": "prelim",
          "fighter1Id": "thewall",
          "fighter2Id": "",
          "fighter1Label": "",
          "fighter2Label": "Park Jiwon",
          "titleFight": false,
          "weightClass": "heavyweight",
          "rounds": 3,
          "result": { "winnerId": "thewall", "method": "DEC", "round": 3, "time": "5:00" }
        }
      ]
    },
    {
      "id": "odfc-10",
      "name": "ODFC 10",
      "subtitle": "BLOOD OATH",
      "date": "2026-02-28",
      "time": "18:00",
      "venue": "고척스카이돔 아레나",
      "city": "Seoul, KR",
      "status": "completed",
      "poster": "",
      "card": [
        {
          "type": "main",
          "fighter1Id": "ironjaw",
          "fighter2Id": "",
          "fighter1Label": "",
          "fighter2Label": "Choi Sungmin",
          "titleFight": false,
          "weightClass": "middleweight",
          "rounds": 5,
          "result": { "winnerId": "ironjaw", "method": "TKO", "round": 4, "time": "1:22" }
        },
        {
          "type": "co-main",
          "fighter1Id": "reaper",
          "fighter2Id": "",
          "fighter1Label": "",
          "fighter2Label": "Lee Donghyun",
          "titleFight": false,
          "weightClass": "welterweight",
          "rounds": 3,
          "result": { "winnerId": "reaper", "method": "KO", "round": 1, "time": "0:58" }
        }
      ]
    }
  ],
  "rankings": ["ghost", "phantom", "ironjaw", "reaper", "rampage", "viper", "thewall"],
  "sponsors": [
    { "name": "Naike", "logo": "assets/images/sponsors/nike.svg", "url": "#" },
    { "name": "adadis", "logo": "assets/images/sponsors/adidas.svg", "url": "#" },
    { "name": "Vennom", "logo": "assets/images/sponsors/venum.svg", "url": "#" },
    { "name": "Monstar Energy", "logo": "assets/images/sponsors/monster.svg", "url": "#" },
    { "name": "Hayabuzz", "logo": "assets/images/sponsors/hayabusa.svg", "url": "#" },
    { "name": "Upper Armour", "logo": "assets/images/sponsors/underarmour.svg", "url": "#" }
  ],
  "banners": [
    { "video": "", "image": "", "caption": "" }
  ],
  "mediakit": {
    "logo": { "label": "로고 패키지", "desc": "SVG / PNG / EPS 포함", "file": "#" },
    "photos": { "label": "공식 선수 사진", "desc": "고해상도 프레스 키트", "file": "#" },
    "presskit": { "label": "보도자료 PDF", "desc": "최신 이벤트 보도자료", "file": "#" },
    "brandguide": { "label": "브랜드 가이드라인", "desc": "컬러, 폰트, 사용 규정", "file": "#" }
  },
  "live": { "active": false, "event": "", "fighter1": "", "fighter2": "", "round": "", "time": "", "stream": "" },
  "announcement": { "active": false, "message": "", "link": "", "linkText": "" }
};

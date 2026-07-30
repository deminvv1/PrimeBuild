/**
 * Автоматически сгенерировано scripts/build-house-catalog.mjs из constructor/.
 * Не редактировать руками — запустите скрипт повторно после изменения исходников.
 * Площадь и цена — реальные данные из названий папок (площадь в м², цена в ₽).
 */

export interface HouseCatalogEntry {
  key: string
  floors: 1 | 2
  bedrooms: number
  garage: boolean
  spa: boolean
  area: number
  priceMin: number
  priceMax: number
  plans: string[]
  photos: string[]
}

export const HOUSE_CATALOG: HouseCatalogEntry[] = [
  {
    "key": "1-2-0-0",
    "floors": 1,
    "bedrooms": 2,
    "garage": false,
    "spa": false,
    "area": 154,
    "priceMin": 24000000,
    "priceMax": 28000000,
    "plans": [
      "/images/konstruktor/1-2-0-0/plan-1.png"
    ],
    "photos": [
      "/images/konstruktor/1-2-0-0/photo-1.png",
      "/images/konstruktor/1-2-0-0/photo-2.png",
      "/images/konstruktor/1-2-0-0/photo-3.png",
      "/images/konstruktor/1-2-0-0/photo-4.png"
    ]
  },
  {
    "key": "1-2-0-1",
    "floors": 1,
    "bedrooms": 2,
    "garage": false,
    "spa": true,
    "area": 242,
    "priceMin": 36000000,
    "priceMax": 40000000,
    "plans": [
      "/images/konstruktor/1-2-0-1/plan-1.png"
    ],
    "photos": [
      "/images/konstruktor/1-2-0-1/photo-1.png",
      "/images/konstruktor/1-2-0-1/photo-2.png",
      "/images/konstruktor/1-2-0-1/photo-3.png",
      "/images/konstruktor/1-2-0-1/photo-4.png"
    ]
  },
  {
    "key": "1-2-1-0",
    "floors": 1,
    "bedrooms": 2,
    "garage": true,
    "spa": false,
    "area": 209,
    "priceMin": 25000000,
    "priceMax": 29000000,
    "plans": [
      "/images/konstruktor/1-2-1-0/plan-1.png"
    ],
    "photos": [
      "/images/konstruktor/1-2-1-0/photo-1.png",
      "/images/konstruktor/1-2-1-0/photo-2.png",
      "/images/konstruktor/1-2-1-0/photo-3.png",
      "/images/konstruktor/1-2-1-0/photo-4.png"
    ]
  },
  {
    "key": "1-2-1-1",
    "floors": 1,
    "bedrooms": 2,
    "garage": true,
    "spa": true,
    "area": 296,
    "priceMin": 37000000,
    "priceMax": 41000000,
    "plans": [
      "/images/konstruktor/1-2-1-1/plan-1.png"
    ],
    "photos": [
      "/images/konstruktor/1-2-1-1/photo-1.png",
      "/images/konstruktor/1-2-1-1/photo-2.png",
      "/images/konstruktor/1-2-1-1/photo-3.png",
      "/images/konstruktor/1-2-1-1/photo-4.png"
    ]
  },
  {
    "key": "1-3-0-0",
    "floors": 1,
    "bedrooms": 3,
    "garage": false,
    "spa": false,
    "area": 180,
    "priceMin": 25500000,
    "priceMax": 29500000,
    "plans": [
      "/images/konstruktor/1-3-0-0/plan-1.png"
    ],
    "photos": [
      "/images/konstruktor/1-3-0-0/photo-1.png",
      "/images/konstruktor/1-3-0-0/photo-2.png",
      "/images/konstruktor/1-3-0-0/photo-3.png",
      "/images/konstruktor/1-3-0-0/photo-4.png"
    ]
  },
  {
    "key": "1-3-0-1",
    "floors": 1,
    "bedrooms": 3,
    "garage": false,
    "spa": true,
    "area": 267,
    "priceMin": 37500000,
    "priceMax": 41500000,
    "plans": [
      "/images/konstruktor/1-3-0-1/plan-1.png"
    ],
    "photos": [
      "/images/konstruktor/1-3-0-1/photo-1.png",
      "/images/konstruktor/1-3-0-1/photo-2.png",
      "/images/konstruktor/1-3-0-1/photo-3.png",
      "/images/konstruktor/1-3-0-1/photo-4.png"
    ]
  },
  {
    "key": "1-3-1-0",
    "floors": 1,
    "bedrooms": 3,
    "garage": true,
    "spa": false,
    "area": 234,
    "priceMin": 27000000,
    "priceMax": 31000000,
    "plans": [
      "/images/konstruktor/1-3-1-0/plan-1.png"
    ],
    "photos": [
      "/images/konstruktor/1-3-1-0/photo-1.png",
      "/images/konstruktor/1-3-1-0/photo-2.png",
      "/images/konstruktor/1-3-1-0/photo-3.png",
      "/images/konstruktor/1-3-1-0/photo-4.png"
    ]
  },
  {
    "key": "1-3-1-1",
    "floors": 1,
    "bedrooms": 3,
    "garage": true,
    "spa": true,
    "area": 321,
    "priceMin": 39000000,
    "priceMax": 43000000,
    "plans": [
      "/images/konstruktor/1-3-1-1/plan-1.png"
    ],
    "photos": [
      "/images/konstruktor/1-3-1-1/photo-1.png",
      "/images/konstruktor/1-3-1-1/photo-2.png",
      "/images/konstruktor/1-3-1-1/photo-3.png",
      "/images/konstruktor/1-3-1-1/photo-4.png"
    ]
  },
  {
    "key": "1-4-0-0",
    "floors": 1,
    "bedrooms": 4,
    "garage": false,
    "spa": false,
    "area": 205,
    "priceMin": 28000000,
    "priceMax": 33000000,
    "plans": [
      "/images/konstruktor/1-4-0-0/plan-1.png"
    ],
    "photos": [
      "/images/konstruktor/1-4-0-0/photo-1.png",
      "/images/konstruktor/1-4-0-0/photo-2.png",
      "/images/konstruktor/1-4-0-0/photo-3.png",
      "/images/konstruktor/1-4-0-0/photo-4.png"
    ]
  },
  {
    "key": "1-4-0-1",
    "floors": 1,
    "bedrooms": 4,
    "garage": false,
    "spa": true,
    "area": 292,
    "priceMin": 40000000,
    "priceMax": 45000000,
    "plans": [
      "/images/konstruktor/1-4-0-1/plan-1.png"
    ],
    "photos": [
      "/images/konstruktor/1-4-0-1/photo-1.png",
      "/images/konstruktor/1-4-0-1/photo-2.png",
      "/images/konstruktor/1-4-0-1/photo-3.png",
      "/images/konstruktor/1-4-0-1/photo-4.png"
    ]
  },
  {
    "key": "1-4-1-0",
    "floors": 1,
    "bedrooms": 4,
    "garage": true,
    "spa": false,
    "area": 259,
    "priceMin": 30000000,
    "priceMax": 35000000,
    "plans": [
      "/images/konstruktor/1-4-1-0/plan-1.png"
    ],
    "photos": [
      "/images/konstruktor/1-4-1-0/photo-1.png",
      "/images/konstruktor/1-4-1-0/photo-2.png",
      "/images/konstruktor/1-4-1-0/photo-3.png",
      "/images/konstruktor/1-4-1-0/photo-4.png"
    ]
  },
  {
    "key": "1-4-1-1",
    "floors": 1,
    "bedrooms": 4,
    "garage": true,
    "spa": true,
    "area": 346,
    "priceMin": 41000000,
    "priceMax": 46000000,
    "plans": [
      "/images/konstruktor/1-4-1-1/plan-1.png"
    ],
    "photos": [
      "/images/konstruktor/1-4-1-1/photo-1.png",
      "/images/konstruktor/1-4-1-1/photo-2.png",
      "/images/konstruktor/1-4-1-1/photo-3.png",
      "/images/konstruktor/1-4-1-1/photo-4.png"
    ]
  },
  {
    "key": "1-5-0-0",
    "floors": 1,
    "bedrooms": 5,
    "garage": false,
    "spa": false,
    "area": 231,
    "priceMin": 30000000,
    "priceMax": 35000000,
    "plans": [
      "/images/konstruktor/1-5-0-0/plan-1.png"
    ],
    "photos": [
      "/images/konstruktor/1-5-0-0/photo-1.png",
      "/images/konstruktor/1-5-0-0/photo-2.png",
      "/images/konstruktor/1-5-0-0/photo-3.png",
      "/images/konstruktor/1-5-0-0/photo-4.png"
    ]
  },
  {
    "key": "1-5-0-1",
    "floors": 1,
    "bedrooms": 5,
    "garage": false,
    "spa": true,
    "area": 318,
    "priceMin": 42000000,
    "priceMax": 47000000,
    "plans": [
      "/images/konstruktor/1-5-0-1/plan-1.png"
    ],
    "photos": [
      "/images/konstruktor/1-5-0-1/photo-1.png",
      "/images/konstruktor/1-5-0-1/photo-2.png",
      "/images/konstruktor/1-5-0-1/photo-3.png",
      "/images/konstruktor/1-5-0-1/photo-4.png"
    ]
  },
  {
    "key": "1-5-1-0",
    "floors": 1,
    "bedrooms": 5,
    "garage": true,
    "spa": false,
    "area": 285,
    "priceMin": 31000000,
    "priceMax": 36000000,
    "plans": [
      "/images/konstruktor/1-5-1-0/plan-1.png"
    ],
    "photos": [
      "/images/konstruktor/1-5-1-0/photo-1.jpg",
      "/images/konstruktor/1-5-1-0/photo-2.png",
      "/images/konstruktor/1-5-1-0/photo-3.png",
      "/images/konstruktor/1-5-1-0/photo-4.png"
    ]
  },
  {
    "key": "1-5-1-1",
    "floors": 1,
    "bedrooms": 5,
    "garage": true,
    "spa": true,
    "area": 372,
    "priceMin": 44000000,
    "priceMax": 49000000,
    "plans": [
      "/images/konstruktor/1-5-1-1/plan-1.png"
    ],
    "photos": [
      "/images/konstruktor/1-5-1-1/photo-1.jpg",
      "/images/konstruktor/1-5-1-1/photo-2.png",
      "/images/konstruktor/1-5-1-1/photo-3.png",
      "/images/konstruktor/1-5-1-1/photo-4.png",
      "/images/konstruktor/1-5-1-1/photo-5.png"
    ]
  },
  {
    "key": "2-3-0-0",
    "floors": 2,
    "bedrooms": 3,
    "garage": false,
    "spa": false,
    "area": 214,
    "priceMin": 27000000,
    "priceMax": 31000000,
    "plans": [
      "/images/konstruktor/2-3-0-0/plan-1.png",
      "/images/konstruktor/2-3-0-0/plan-2.png"
    ],
    "photos": [
      "/images/konstruktor/2-3-0-0/photo-1.png",
      "/images/konstruktor/2-3-0-0/photo-2.png",
      "/images/konstruktor/2-3-0-0/photo-3.png",
      "/images/konstruktor/2-3-0-0/photo-4.png"
    ]
  },
  {
    "key": "2-3-0-1",
    "floors": 2,
    "bedrooms": 3,
    "garage": false,
    "spa": true,
    "area": 301,
    "priceMin": 39000000,
    "priceMax": 43000000,
    "plans": [
      "/images/konstruktor/2-3-0-1/plan-1.png",
      "/images/konstruktor/2-3-0-1/plan-2.png"
    ],
    "photos": [
      "/images/konstruktor/2-3-0-1/photo-1.png",
      "/images/konstruktor/2-3-0-1/photo-2.png",
      "/images/konstruktor/2-3-0-1/photo-3.png",
      "/images/konstruktor/2-3-0-1/photo-4.png"
    ]
  },
  {
    "key": "2-3-1-0",
    "floors": 2,
    "bedrooms": 3,
    "garage": true,
    "spa": false,
    "area": 268,
    "priceMin": 29000000,
    "priceMax": 33000000,
    "plans": [
      "/images/konstruktor/2-3-1-0/plan-1.png",
      "/images/konstruktor/2-3-1-0/plan-2.png"
    ],
    "photos": [
      "/images/konstruktor/2-3-1-0/photo-1.png",
      "/images/konstruktor/2-3-1-0/photo-2.png",
      "/images/konstruktor/2-3-1-0/photo-3.png",
      "/images/konstruktor/2-3-1-0/photo-4.png"
    ]
  },
  {
    "key": "2-3-1-1",
    "floors": 2,
    "bedrooms": 3,
    "garage": true,
    "spa": true,
    "area": 355,
    "priceMin": 41000000,
    "priceMax": 45000000,
    "plans": [
      "/images/konstruktor/2-3-1-1/plan-1.png",
      "/images/konstruktor/2-3-1-1/plan-2.png"
    ],
    "photos": [
      "/images/konstruktor/2-3-1-1/photo-1.png",
      "/images/konstruktor/2-3-1-1/photo-2.png",
      "/images/konstruktor/2-3-1-1/photo-3.png",
      "/images/konstruktor/2-3-1-1/photo-4.png"
    ]
  },
  {
    "key": "2-4-0-0",
    "floors": 2,
    "bedrooms": 4,
    "garage": false,
    "spa": false,
    "area": 238,
    "priceMin": 30000000,
    "priceMax": 35000000,
    "plans": [
      "/images/konstruktor/2-4-0-0/plan-1.png",
      "/images/konstruktor/2-4-0-0/plan-2.png"
    ],
    "photos": [
      "/images/konstruktor/2-4-0-0/photo-1.png",
      "/images/konstruktor/2-4-0-0/photo-2.png",
      "/images/konstruktor/2-4-0-0/photo-3.png",
      "/images/konstruktor/2-4-0-0/photo-4.png"
    ]
  },
  {
    "key": "2-4-0-1",
    "floors": 2,
    "bedrooms": 4,
    "garage": false,
    "spa": true,
    "area": 321,
    "priceMin": 42000000,
    "priceMax": 47000000,
    "plans": [
      "/images/konstruktor/2-4-0-1/plan-1.png",
      "/images/konstruktor/2-4-0-1/plan-2.png"
    ],
    "photos": [
      "/images/konstruktor/2-4-0-1/photo-1.png",
      "/images/konstruktor/2-4-0-1/photo-2.png",
      "/images/konstruktor/2-4-0-1/photo-3.png",
      "/images/konstruktor/2-4-0-1/photo-4.png"
    ]
  },
  {
    "key": "2-4-1-0",
    "floors": 2,
    "bedrooms": 4,
    "garage": true,
    "spa": false,
    "area": 292,
    "priceMin": 31000000,
    "priceMax": 36000000,
    "plans": [
      "/images/konstruktor/2-4-1-0/plan-1.png",
      "/images/konstruktor/2-4-1-0/plan-2.png"
    ],
    "photos": [
      "/images/konstruktor/2-4-1-0/photo-1.png",
      "/images/konstruktor/2-4-1-0/photo-2.png",
      "/images/konstruktor/2-4-1-0/photo-3.png",
      "/images/konstruktor/2-4-1-0/photo-4.png"
    ]
  },
  {
    "key": "2-4-1-1",
    "floors": 2,
    "bedrooms": 4,
    "garage": true,
    "spa": true,
    "area": 375,
    "priceMin": 43000000,
    "priceMax": 48000000,
    "plans": [
      "/images/konstruktor/2-4-1-1/plan-1.png",
      "/images/konstruktor/2-4-1-1/plan-2.png"
    ],
    "photos": [
      "/images/konstruktor/2-4-1-1/photo-1.png",
      "/images/konstruktor/2-4-1-1/photo-2.png",
      "/images/konstruktor/2-4-1-1/photo-3.png",
      "/images/konstruktor/2-4-1-1/photo-4.png"
    ]
  },
  {
    "key": "2-5-0-1",
    "floors": 2,
    "bedrooms": 5,
    "garage": false,
    "spa": true,
    "area": 342,
    "priceMin": 44000000,
    "priceMax": 49000000,
    "plans": [
      "/images/konstruktor/2-5-0-1/plan-1.png",
      "/images/konstruktor/2-5-0-1/plan-2.png"
    ],
    "photos": [
      "/images/konstruktor/2-5-0-1/photo-1.png",
      "/images/konstruktor/2-5-0-1/photo-2.png",
      "/images/konstruktor/2-5-0-1/photo-3.png",
      "/images/konstruktor/2-5-0-1/photo-4.png"
    ]
  },
  {
    "key": "2-5-1-1",
    "floors": 2,
    "bedrooms": 5,
    "garage": true,
    "spa": true,
    "area": 396,
    "priceMin": 45000000,
    "priceMax": 50000000,
    "plans": [
      "/images/konstruktor/2-5-1-1/plan-1.png",
      "/images/konstruktor/2-5-1-1/plan-2.png"
    ],
    "photos": [
      "/images/konstruktor/2-5-1-1/photo-1.png",
      "/images/konstruktor/2-5-1-1/photo-2.png",
      "/images/konstruktor/2-5-1-1/photo-3.png",
      "/images/konstruktor/2-5-1-1/photo-4.png"
    ]
  }
]

export interface InteriorShowcaseImage {
  slug: string
  label: string
  src: string
}

// Интерьеры показаны только для самой полной комплектации (396 м²) — как пример
export const INTERIOR_SHOWCASE: InteriorShowcaseImage[] = [
  {
    "slug": "balcony",
    "label": "Балкон",
    "src": "/images/konstruktor/interior-396/balcony.png"
  },
  {
    "slug": "living-room",
    "label": "Гостиная",
    "src": "/images/konstruktor/interior-396/living-room.png"
  },
  {
    "slug": "living-room-2",
    "label": "Гостиная",
    "src": "/images/konstruktor/interior-396/living-room-2.png"
  },
  {
    "slug": "living-room-3",
    "label": "Гостиная",
    "src": "/images/konstruktor/interior-396/living-room-3.png"
  },
  {
    "slug": "living-room-4",
    "label": "Гостиная",
    "src": "/images/konstruktor/interior-396/living-room-4.png"
  },
  {
    "slug": "master-closet",
    "label": "Гардеробная мастер-спальни",
    "src": "/images/konstruktor/interior-396/master-closet.png"
  },
  {
    "slug": "master-closet-2",
    "label": "Гардеробная мастер-спальни",
    "src": "/images/konstruktor/interior-396/master-closet-2.png"
  },
  {
    "slug": "master-bedroom",
    "label": "Мастер-спальня",
    "src": "/images/konstruktor/interior-396/master-bedroom.png"
  },
  {
    "slug": "master-bathroom-2",
    "label": "Ванная мастер-спальни",
    "src": "/images/konstruktor/interior-396/master-bathroom-2.png"
  },
  {
    "slug": "sauna",
    "label": "Сауна",
    "src": "/images/konstruktor/interior-396/sauna.png"
  },
  {
    "slug": "spa",
    "label": "СПА-зона",
    "src": "/images/konstruktor/interior-396/spa.png"
  },
  {
    "slug": "spa-2",
    "label": "СПА-зона",
    "src": "/images/konstruktor/interior-396/spa-2.png"
  },
  {
    "slug": "guest-bedroom-3",
    "label": "Гостевая спальня",
    "src": "/images/konstruktor/interior-396/guest-bedroom-3.png"
  },
  {
    "slug": "guest-bedroom",
    "label": "Гостевая спальня",
    "src": "/images/konstruktor/interior-396/guest-bedroom.png"
  },
  {
    "slug": "guest-bedroom-2",
    "label": "Гостевая спальня",
    "src": "/images/konstruktor/interior-396/guest-bedroom-2.png"
  },
  {
    "slug": "hammam",
    "label": "Хаммам",
    "src": "/images/konstruktor/interior-396/hammam.png"
  }
]

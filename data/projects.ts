import { Project } from '@/lib/types'

export const projects: Project[] = [
  {
    slug: 'proekt-alpha',
    name: 'Проект Alpha',
    category: 'midi',
    finish: ['comfort', 'business'],
    area: 180,
    floors: 2,
    buildTime: '5 месяцев',
    priceFrom: 12_000_000,
    images: ['/images/projects/alpha-1.jpg', '/images/projects/alpha-2.jpg'],
    shortDesc: 'Двухэтажный дом с плоской кровлей и панорамным остеклением.',
    comfortDesc: 'Отделка уровня Комфорт: тёплые нейтральные тона, ламинат, кухонный гарнитур.',
    businessDesc: 'Отделка уровня Бизнес: мрамор, инженерная доска, встроенная техника Bosch.',
    comfortIncludes: ['Стяжка пола', 'Штукатурка стен', 'Ламинат 33 класс', 'Кухонный гарнитур', 'Сантехника Grohe базовая'],
    businessIncludes: ['Инженерная доска', 'Штукатурка с покраской', 'Плитка крупного формата', 'Кухня под заказ', 'Сантехника Grohe Essence'],
    floorPlan: '/images/projects/alpha-plan.jpg',
  },
  {
    slug: 'proekt-beta',
    name: 'Проект Beta',
    category: 'mini',
    finish: ['comfort'],
    area: 110,
    floors: 1,
    buildTime: '3 месяца',
    priceFrom: 7_500_000,
    images: ['/images/projects/beta-1.jpg'],
    shortDesc: 'Компактный одноэтажный дом — максимум функциональности.',
    comfortDesc: 'Полная чистовая отделка в тёплых тонах, готов к заезду.',
    businessDesc: '',
    comfortIncludes: ['Стяжка', 'Обои', 'Ламинат', 'Кухонный гарнитур', 'Сантехника'],
    businessIncludes: [],
    floorPlan: '/images/projects/beta-plan.jpg',
  },
  {
    slug: 'proekt-gamma',
    name: 'Проект Gamma',
    category: 'maxi',
    finish: ['comfort', 'business'],
    area: 280,
    floors: 2,
    buildTime: '6 месяцев',
    priceFrom: 19_000_000,
    images: ['/images/projects/gamma-1.jpg', '/images/projects/gamma-2.jpg'],
    shortDesc: 'Просторный дом для большой семьи с террасой и гаражом.',
    comfortDesc: 'Двухуровневая планировка, тёплый пол в санузлах, панорамные окна.',
    businessDesc: 'Камин, умный дом базовый, отделка натуральным камнем.',
    comfortIncludes: ['Тёплый пол в с/у', 'Ламинат', 'Кухня', 'Сантехника Hansgrohe'],
    businessIncludes: ['Умный дом базовый', 'Инженерная доска дуб', 'Натуральный камень', 'Камин'],
    floorPlan: '/images/projects/gamma-plan.jpg',
  },
]

export function getProject(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug)
}

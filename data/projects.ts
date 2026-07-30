import { Project, ProjectCategory } from '@/lib/types'
import { bedroomsWord } from '@/lib/pluralize'
import { HOUSE_CATALOG, HouseCatalogEntry } from './houseCatalog'

/**
 * Пороги площади — округлые абсолютные значения (как принято у строительных
 * компаний: "до 200", "200-300", "от 300"), а не деление на равные по
 * количеству группы. Из-за этого группы получаются разного размера — это
 * нормально, зато сама категория интуитивно понятна: дом 214 м² не должен
 * восприниматься как "mini".
 */
function categoryOf(area: number): ProjectCategory {
  if (area < 200) return 'mini'
  if (area <= 300) return 'midi'
  return 'maxi'
}

function nameOf(area: number, bedrooms: number): string {
  return `Дом ${area} м² · ${bedrooms} ${bedroomsWord(bedrooms)}`
}

function shortDescOf(entry: HouseCatalogEntry): string {
  const parts = [`${entry.floors === 1 ? 'Одноэтажный' : 'Двухэтажный'} дом на ${entry.bedrooms} ${bedroomsWord(entry.bedrooms)}, ${entry.area} м²`]
  if (entry.garage) parts.push('закрытый гараж')
  if (entry.spa) parts.push('СПА-зона с сауной и хаммамом')
  return parts.join(', ') + '.'
}

export const projects: Project[] = HOUSE_CATALOG.map((entry) => ({
  slug: `dom-${entry.key}`,
  name: nameOf(entry.area, entry.bedrooms),
  category: categoryOf(entry.area),
  area: entry.area,
  floors: entry.floors,
  bedrooms: entry.bedrooms,
  garage: entry.garage,
  spa: entry.spa,
  buildTime: entry.floors === 1 ? '4–5 месяцев' : '5–6 месяцев',
  priceFrom: entry.priceMin,
  images: entry.photos,
  shortDesc: shortDescOf(entry),
  floorPlan: entry.plans[0],
}))

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

/**
 * Подборка для главной страницы: по 2 проекта на каждую этажность
 * (самый компактный и самый большой в группе — чтобы показать разброс).
 */
export const homepageProjects: Project[] = (() => {
  const pick = (floors: 1 | 2) => {
    const group = projects.filter((p) => p.floors === floors).sort((a, b) => a.area - b.area)
    if (group.length === 0) return []
    return [group[0], group[group.length - 1]]
  }
  return [...pick(1), ...pick(2)]
})()

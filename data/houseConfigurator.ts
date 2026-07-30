import { HOUSE_CATALOG, INTERIOR_SHOWCASE, HouseCatalogEntry } from './houseCatalog'

export type GuestBedroom = 'none' | 'with-closet' | 'without-closet'

export interface HouseConfig {
  floors: 1 | 2
  bedrooms: number
  masterBedroom: boolean
  guestBedroom: GuestBedroom
  spa: boolean
  garage: boolean
  terraceCanopy: boolean
}

export const DEFAULT_CONFIG: HouseConfig = {
  floors: 1,
  bedrooms: 2,
  masterBedroom: false,
  guestBedroom: 'none',
  spa: false,
  garage: false,
  terraceCanopy: false,
}

/**
 * Диапазон спален по каталогу реальных рендеров зависит от этажности:
 * для 1 этажа доступны 2–5 спален, для 2 этажей — 3–5 (меньше не строят).
 */
export function getBedroomsRange(floors: 1 | 2): { min: number; max: number } {
  const forFloor = HOUSE_CATALOG.filter((e) => e.floors === floors)
  const values = forFloor.map((e) => e.bedrooms)
  return { min: Math.min(...values), max: Math.max(...values) }
}

/**
 * Находит конфигурацию в реальном каталоге рендеров. Кодировка папок у
 * архитектора: этажи.спальни.гараж.спа-зона — именно гараж и спа-зона меняют
 * реальную планировку и рендеры экстерьера. Мастер-спальня и гостевая
 * спальня с гардеробной в каталоге не выделены отдельными рендерами (см.
 * calculatePrice) — это доплаты без смены картинки.
 * Если точного совпадения по спальням/гаражу/спа нет (у заказчика есть
 * несколько пропущенных комбинаций), берём ближайшую существующую.
 */
export function getCatalogEntry(config: HouseConfig): HouseCatalogEntry {
  const pool = HOUSE_CATALOG.filter((e) => e.floors === config.floors)

  const exact = pool.find(
    (e) => e.bedrooms === config.bedrooms && e.garage === config.garage && e.spa === config.spa
  )
  if (exact) return exact

  const sameBedroomsAndGarage = pool.filter((e) => e.bedrooms === config.bedrooms && e.garage === config.garage)
  if (sameBedroomsAndGarage.length > 0) return sameBedroomsAndGarage[0]

  const sameBedrooms = pool.filter((e) => e.bedrooms === config.bedrooms)
  if (sameBedrooms.length > 0) return sameBedrooms[0]

  const nearest = [...pool].sort((a, b) => Math.abs(a.bedrooms - config.bedrooms) - Math.abs(b.bedrooms - config.bedrooms))
  return nearest[0]
}

/**
 * Наценки за опции, которых нет в реальном каталоге рендеров (не влияют на
 * картинку — только на итоговую цену). Гараж и СПА-зона в наценки не входят:
 * они меняют саму базовую цену через выбор нужной записи каталога.
 * TODO: ориентировочные наценки — уточнить точную смету с заказчиком.
 */
const PRICE_MASTER_BEDROOM = 450_000
const PRICE_GUEST_BEDROOM: Record<GuestBedroom, number> = {
  none: 0,
  'without-closet': 150_000,
  'with-closet': 280_000,
}
const PRICE_TERRACE_CANOPY = 220_000

export function calculatePrice(config: HouseConfig): number {
  const entry = getCatalogEntry(config)
  return (
    entry.priceMin +
    (config.masterBedroom ? PRICE_MASTER_BEDROOM : 0) +
    PRICE_GUEST_BEDROOM[config.guestBedroom] +
    (config.terraceCanopy ? PRICE_TERRACE_CANOPY : 0)
  )
}

export function formatPrice(value: number): string {
  return value.toLocaleString('ru-RU').replace(/,/g, ' ')
}

const GUEST_BEDROOM_LABEL: Record<GuestBedroom, string> = {
  none: 'нет',
  'without-closet': 'без гардеробной',
  'with-closet': 'с гардеробной',
}

/**
 * Человекочитаемая сводка выбранной комплектации — используется как
 * содержимое заявки (email/Telegram), чтобы менеджер видел, что именно
 * собрал клиент в конструкторе, без необходимости переспрашивать.
 */
export function describeConfig(config: HouseConfig): string {
  const entry = getCatalogEntry(config)
  const price = calculatePrice(config)
  return [
    `Этажность: ${config.floors}`,
    `Спальни: ${config.bedrooms}`,
    `Мастер-спальня: ${config.masterBedroom ? 'да' : 'нет'}`,
    `Гостевая спальня: ${GUEST_BEDROOM_LABEL[config.guestBedroom]}`,
    `Гараж: ${config.garage ? 'да' : 'нет'}`,
    `СПА-зона: ${config.spa ? 'да' : 'нет'}`,
    `Навес над террасой: ${config.terraceCanopy ? 'да' : 'нет'}`,
    `Площадь: ${entry.area} м²`,
    `Ориентировочная цена: ${formatPrice(price)} ₽`,
  ].join('\n')
}

export interface GalleryImage {
  src: string | null
  label: string
}

export function getPlanImages(config: HouseConfig): GalleryImage[] {
  const entry = getCatalogEntry(config)
  return entry.plans.map((src, i) => ({
    src,
    label: entry.plans.length > 1 ? `Планировка · этаж ${i + 1}` : `Планировка · ${entry.area} м²`,
  }))
}

export function getExteriorGallery(config: HouseConfig): GalleryImage[] {
  const entry = getCatalogEntry(config)
  return entry.photos.map((src, i) => ({ src, label: `Экстерьер · ракурс ${i + 1}` }))
}

// Интерьеры показаны как пример по самой полной комплектации (396 м²) — единый
// набор для всех конфигураций, не привязан к выбору в конструкторе.
export const INTERIOR_GALLERY: GalleryImage[] = INTERIOR_SHOWCASE.map((img) => ({ src: img.src, label: img.label }))

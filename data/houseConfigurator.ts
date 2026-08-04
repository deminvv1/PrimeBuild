import { HOUSE_CATALOG, INTERIOR_SHOWCASE, HouseCatalogEntry } from './houseCatalog'

export interface HouseConfig {
  floors: 1 | 2
  bedrooms: number
  spa: boolean
  garage: boolean
  /** Комплектация мебелью — по умолчанию выключена, показываем цену без мебели (см. calculatePrice). */
  furniture: boolean
}

export const DEFAULT_CONFIG: HouseConfig = {
  floors: 1,
  bedrooms: 2,
  spa: false,
  garage: false,
  furniture: false,
}

/**
 * Собирает query-параметры для ссылки на конструктор с предзаполненной
 * конфигурацией конкретного проекта — например, из карточки в /proekty.
 * Булевы опции добавляются в URL только когда отличаются от значения по
 * умолчанию, чтобы не засорять ссылку лишним "=0"/"=1"
 * (/podbor-doma?floors=1&bedrooms=3&garage=1).
 */
export function configToQuery(config: Pick<HouseConfig, 'floors' | 'bedrooms' | 'spa' | 'garage'> & Partial<Pick<HouseConfig, 'furniture'>>): string {
  const params = new URLSearchParams()
  params.set('floors', String(config.floors))
  params.set('bedrooms', String(config.bedrooms))
  if (config.spa) params.set('spa', '1')
  if (config.garage) params.set('garage', '1')
  if (config.furniture === false) params.set('furniture', '0')
  return params.toString()
}

/** Обратное преобразование — читает те же query-параметры на странице конструктора. */
export function configFromSearchParams(sp: Record<string, string | string[] | undefined>): Partial<HouseConfig> {
  const floorsRaw = Array.isArray(sp.floors) ? sp.floors[0] : sp.floors
  const bedroomsRaw = Array.isArray(sp.bedrooms) ? sp.bedrooms[0] : sp.bedrooms
  const spaRaw = Array.isArray(sp.spa) ? sp.spa[0] : sp.spa
  const garageRaw = Array.isArray(sp.garage) ? sp.garage[0] : sp.garage
  const furnitureRaw = Array.isArray(sp.furniture) ? sp.furniture[0] : sp.furniture

  const config: Partial<HouseConfig> = {}
  if (floorsRaw === '1' || floorsRaw === '2') config.floors = Number(floorsRaw) as 1 | 2
  if (bedroomsRaw && !Number.isNaN(Number(bedroomsRaw))) config.bedrooms = Number(bedroomsRaw)
  if (spaRaw === '1') config.spa = true
  if (garageRaw === '1') config.garage = true
  if (furnitureRaw === '0') config.furniture = false
  return config
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
 * priceMin — цена без мебели, priceMax — цена с мебелью (реальные значения
 * из каталога архитектора, не диапазон). Гараж и СПА-зона в эту вилку не
 * входят: они меняют саму запись каталога через getCatalogEntry.
 */
export function calculatePrice(config: HouseConfig): number {
  const entry = getCatalogEntry(config)
  return config.furniture ? entry.priceMax : entry.priceMin
}

export function formatPrice(value: number): string {
  return value.toLocaleString('ru-RU').replace(/,/g, ' ')
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
    `Гараж: ${config.garage ? 'да' : 'нет'}`,
    `СПА-зона: ${config.spa ? 'да' : 'нет'}`,
    `Комплектация мебелью: ${config.furniture ? 'с мебелью' : 'без мебели'}`,
    `Площадь: ${entry.area} м²`,
    `Ориентировочная цена: ${formatPrice(price)} ₽`,
  ].join('\n')
}

export interface GalleryImage {
  src: string | null
  label: string
  portrait?: boolean
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
export const INTERIOR_GALLERY: GalleryImage[] = INTERIOR_SHOWCASE.map((img) => ({ src: img.src, label: img.label, portrait: img.portrait }))

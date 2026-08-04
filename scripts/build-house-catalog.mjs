#!/usr/bin/env node
/**
 * Одноразовый (переиспользуемый) скрипт: переносит реальные рендеры/планировки
 * из constructor/ в public/images/konstruktor/ и генерирует data/houseCatalog.ts
 * с реальными площадями, ценами и путями к файлам — на основе кодировки в
 * названиях папок: {этажи}.{спальни}.{гараж 0/1}.{спа-зона 0/1} area(без мебели-с мебелью)
 *
 * Запуск: node scripts/build-house-catalog.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const SRC = path.join(ROOT, 'constructor')
const DEST = path.join(ROOT, 'public', 'images', 'konstruktor')
const DATA_OUT = path.join(ROOT, 'data', 'houseCatalog.ts')

const FOLDER_RE = /^(\d)\.(\d)\.([01])\.([01])\s+([\d.]+)\(\s*([\d.]+)\s*-\s*([\d.]+)\s*\)$/

/**
 * Для двухэтажных домов имя файла плана ("План 117.png" и т.п.) НЕ отражает
 * порядок этажей — это просто внутренний номер проекта у архитектора.
 * Проверено визуально для каждой из 10 конфигураций 2 этажей: сортировка по
 * номеру файла даёт верный порядок (этаж 1 → этаж 2) только для базовых
 * вариантов без опций. Для всех вариантов с гаражом и/или спа-зоной порядок
 * файлов перевёрнут — второй этаж (спальни) идёт первым файлом, первый этаж
 * (гараж/кухня-гостиная/спа) — вторым.
 * Ниже — явный список ключей, для которых нужно поменять план-1 и план-2
 * местами. Если архитектор добавит новые конфигурации — проверять визуально.
 */
const REVERSE_PLAN_ORDER = new Set([
  '2-3-0-1',
  '2-3-1-0',
  '2-3-1-1',
  '2-4-0-1',
  '2-4-1-0',
  '2-4-1-1',
  '2-5-0-1',
  '2-5-1-1',
])

const INTERIOR_SLUGS = {
  'Балкон': 'balcony',
  'Гостиная': 'living-room',
  'Гостиная2': 'living-room-2',
  'Гостиная3': 'living-room-3',
  'Гостиная4': 'living-room-4',
  'Мастер Гардероб': 'master-closet',
  'Мастер Гардероб2': 'master-closet-2',
  'Мастер СУ2': 'master-bathroom-2',
  'Мастер Спальня': 'master-bedroom',
  'Сауна': 'sauna',
  'Спа': 'spa',
  'Спа2': 'spa-2',
  'Спальня г': 'guest-bedroom',
  'Спальня г2': 'guest-bedroom-2',
  'Спальня г_1': 'guest-bedroom-3',
  'Хамам': 'hammam',
}
const INTERIOR_LABELS = {
  'balcony': 'Балкон',
  'living-room': 'Гостиная',
  'living-room-2': 'Гостиная',
  'living-room-3': 'Гостиная',
  'living-room-4': 'Гостиная',
  'master-closet': 'Гардеробная мастер-спальни',
  'master-closet-2': 'Гардеробная мастер-спальни',
  'master-bathroom-2': 'Ванная мастер-спальни',
  'master-bedroom': 'Мастер-спальня',
  'sauna': 'Сауна',
  'spa': 'СПА-зона',
  'spa-2': 'СПА-зона',
  'guest-bedroom': 'Гостевая спальня',
  'guest-bedroom-2': 'Гостевая спальня',
  'guest-bedroom-3': 'Гостевая спальня',
  'hammam': 'Хаммам',
}

function ensureDir(p) { fs.mkdirSync(p, { recursive: true }) }
function ext(file) { return path.extname(file) }
function copy(from, to) { ensureDir(path.dirname(to)); fs.copyFileSync(from, to) }

function listImages(dir) {
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir)
    .filter((f) => /\.(png|jpg|jpeg|webp)$/i.test(f))
    .sort((a, b) => a.localeCompare(b, 'en', { numeric: true }))
}

const entries = []

for (const floorFolder of ['1 этаж', '2 этажа']) {
  const floorDir = path.join(SRC, floorFolder)
  if (!fs.existsSync(floorDir)) continue

  for (const name of fs.readdirSync(floorDir)) {
    const m = name.match(FOLDER_RE)
    if (!m) continue
    const [, floors, bedrooms, garage, spa, area, priceMin, priceMax] = m
    const key = `${floors}-${bedrooms}-${garage}-${spa}`
    const srcDir = path.join(floorDir, name)
    const destDir = path.join(DEST, key)

    let plans = listImages(srcDir).filter((f) => /^План/i.test(f))
    if (REVERSE_PLAN_ORDER.has(key)) plans = [...plans].reverse()
    const photos = listImages(path.join(srcDir, 'Фото'))

    const planFiles = plans.map((f, i) => {
      const to = `plan-${i + 1}${ext(f)}`
      copy(path.join(srcDir, f), path.join(destDir, to))
      return `/images/konstruktor/${key}/${to}`
    })
    const photoFiles = photos.map((f, i) => {
      const to = `photo-${i + 1}${ext(f)}`
      copy(path.join(srcDir, 'Фото', f), path.join(destDir, to))
      return `/images/konstruktor/${key}/${to}`
    })

    entries.push({
      key,
      floors: Number(floors),
      bedrooms: Number(bedrooms),
      garage: garage === '1',
      spa: spa === '1',
      area: Number(area),
      priceMin: Math.round(Number(priceMin) * 1_000_000),
      priceMax: Math.round(Number(priceMax) * 1_000_000),
      plans: planFiles,
      photos: photoFiles,
    })
  }
}

// ── интерьеры (только самый большой дом, как witness-пример) ──
const interiorSrcDir = path.join(SRC, '2 этажа', '2.5.1.1 396(45-50)', 'Интерьер')
const interior = []
if (fs.existsSync(interiorSrcDir)) {
  for (const f of listImages(interiorSrcDir)) {
    const base = path.basename(f, path.extname(f))
    const slug = INTERIOR_SLUGS[base] ?? base.toLowerCase().replace(/\s+/g, '-')
    const to = `${slug}${ext(f).toLowerCase()}`
    copy(path.join(interiorSrcDir, f), path.join(DEST, 'interior-396', to))
    interior.push({ slug, label: INTERIOR_LABELS[slug] ?? base, src: `/images/konstruktor/interior-396/${to}` })
  }
}

entries.sort((a, b) => a.key.localeCompare(b.key))

const banner = `/**
 * Автоматически сгенерировано scripts/build-house-catalog.mjs из constructor/.
 * Не редактировать руками — запустите скрипт повторно после изменения исходников.
 * Площадь и цена — реальные данные из названий папок (площадь в м², цена в ₽).
 * priceMin — цена без мебели, priceMax — цена с мебелью (не диапазон).
 */`

const ts = `${banner}

export interface HouseCatalogEntry {
  key: string
  floors: 1 | 2
  bedrooms: number
  garage: boolean
  spa: boolean
  area: number
  /** Цена без мебели. */
  priceMin: number
  /** Цена с мебелью. */
  priceMax: number
  plans: string[]
  photos: string[]
}

export const HOUSE_CATALOG: HouseCatalogEntry[] = ${JSON.stringify(entries, null, 2)}

export interface InteriorShowcaseImage {
  slug: string
  label: string
  src: string
}

// Интерьеры показаны только для самой полной комплектации (396 м²) — как пример
export const INTERIOR_SHOWCASE: InteriorShowcaseImage[] = ${JSON.stringify(interior, null, 2)}
`

fs.writeFileSync(DATA_OUT, ts)

console.log(`Готово: ${entries.length} конфигураций, ${interior.length} интерьерных рендеров.`)
console.log(`Ассеты скопированы в ${path.relative(ROOT, DEST)}`)
console.log(`Каталог записан в ${path.relative(ROOT, DATA_OUT)}`)

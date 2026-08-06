#!/usr/bin/env node
/**
 * Одноразовый (переиспользуемый) скрипт: читает реальные пиксельные размеры
 * всех фото галереи конструктора (public/images/konstruktor/**\/photo-*.webp
 * и интерьеров) через sharp и пишет data/imageDimensions.ts — карту
 * "/публичный/путь.webp" -> { width, height }.
 *
 * Нужно, чтобы FullscreenGallery не растягивала фото шире их реального
 * разрешения (у части рендеров архитектора оно всего ~1670px, апскейл на
 * широких мониторах даёт заметное размытие).
 *
 * Запуск: node scripts/gen-image-dimensions.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const IMAGES_DIR = path.join(ROOT, 'public', 'images', 'konstruktor')
const DATA_OUT = path.join(ROOT, 'data', 'imageDimensions.ts')

function walk(dir) {
  const out = []
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name)
    if (fs.statSync(full).isDirectory()) out.push(...walk(full))
    else if (/\.(webp|jpg|jpeg|png)$/i.test(name)) out.push(full)
  }
  return out
}

const files = walk(IMAGES_DIR)
const entries = {}

for (const file of files) {
  const meta = await sharp(file).metadata()
  if (!meta.width || !meta.height) continue
  const publicPath = '/' + path.relative(path.join(ROOT, 'public'), file).split(path.sep).join('/')
  entries[publicPath] = { width: meta.width, height: meta.height }
}

const sortedKeys = Object.keys(entries).sort()
const sorted = {}
for (const k of sortedKeys) sorted[k] = entries[k]

const ts = `/**
 * Автоматически сгенерировано scripts/gen-image-dimensions.mjs.
 * Не редактировать руками — запустите скрипт повторно после замены/добавления фото.
 * Реальные пиксельные размеры фото галереи — чтобы не растягивать их сверх исходного разрешения.
 */

export const IMAGE_DIMENSIONS: Record<string, { width: number; height: number }> = ${JSON.stringify(sorted, null, 2)}
`

fs.writeFileSync(DATA_OUT, ts)
console.log(`Готово: ${sortedKeys.length} изображений. Записано в ${path.relative(ROOT, DATA_OUT)}`)

import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import os from 'os'

interface LeadPayload {
  name?: string
  phone: string
  comment?: string
  source?: string
  _honey?: string
  /** "submit" (по умолчанию) — реальная отправка, шлём в Telegram сразу.
   *  "pending" — номер введён полностью, но кнопка ещё не нажата; сервер
   *  тихо запомнит заявку и пришлёт её сам через 20 минут, если реального
   *  сабмита по этому номеру так и не будет. */
  mode?: 'submit' | 'pending'
  pageUrl?: string
  utm?: Record<string, string>
}

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const
const MAX_FIELD_LENGTH = 200
// pageUrl — не короткое поле формы, а вся ссылка с UTM-метками. Яндекс.Директ
// (особенно РСЯ) кладёт в неё кириллицу и служебные макросы — после
// percent-encoding (1 кириллическая буква → 6 символов) она легко перевалит
// за 200 символов, и заявка с рекламы будет отклоняться целиком по этой
// проверке. Даём ссылке отдельный, гораздо более щедрый лимит.
const MAX_URL_LENGTH = 2000

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;')
}

export const runtime = 'nodejs'

const WINDOW_MS = 10 * 60 * 1000
const MAX_REQUESTS = 5
const ipMap = new Map<string, { count: number; resetAt: number }>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = ipMap.get(ip)
  if (!entry || now > entry.resetAt) {
    ipMap.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return false
  }
  if (entry.count >= MAX_REQUESTS) return true
  entry.count++
  return false
}

// Телефоны, по которым человек дозаполнил номер, но ещё не отправил форму —
// ждём 20 минут и, если реального сабмита так и не было, тихо шлём заявку
// сами. Состояние держим в файле на диске (не в памяти процесса), чтобы
// таймер переживал перезапуск dev-сервера/деплой и не зависел от того,
// какой инстанс принял "pending", а какой — итоговый "submit".
const DEFERRED_LEAD_DELAY_MS = 20 * 60 * 1000
const SWEEP_INTERVAL_MS = 30 * 1000
const PENDING_DIR = path.join(os.tmpdir(), 'buildx-pending-leads')

let pendingDirReady: Promise<void> | null = null
function ensurePendingDir(): Promise<void> {
  if (!pendingDirReady) {
    pendingDirReady = fs.mkdir(PENDING_DIR, { recursive: true }).then(() => undefined)
  }
  return pendingDirReady
}

function pendingFilePath(key: string): string {
  return path.join(PENDING_DIR, `${key.replace(/[^\d]/g, '')}.json`)
}

function plainPhone(value: string): string {
  return `+${value.replace(/\D/g, '')}`
}

function tooLong(value: string | undefined): boolean {
  return typeof value === 'string' && value.length > MAX_FIELD_LENGTH
}

function urlTooLong(value: string | undefined): boolean {
  return typeof value === 'string' && value.length > MAX_URL_LENGTH
}

function buildMessageText(body: LeadPayload, now: string, deferred: boolean): string {
  const safeName    = (body.name ?? '').trim().slice(0, 100)
  const safeComment = (body.comment ?? '').trim().slice(0, 500)
  const safeSource  = (body.source ?? 'site').trim().slice(0, 50)
  const lines = [
    deferred
      ? `⏳ <b>Заявка не досмотрена (авто-отправка через 20 мин) — ${esc(safeSource)}</b>`
      : `📩 <b>Новая заявка — ${esc(safeSource)}</b>`,
    `Имя: ${esc(safeName) || '—'}`,
    `Телефон: ${esc(plainPhone(body.phone))}`,
    `Комментарий:\n${esc(safeComment) || '—'}`,
  ]

  for (const key of UTM_KEYS) {
    const value = body.utm?.[key]
    if (value && !tooLong(value)) lines.push(`${key.replace('utm_', 'UTM ')}: ${esc(value)}`)
  }

  if (body.pageUrl && !urlTooLong(body.pageUrl)) lines.push(`Страница: ${esc(body.pageUrl)}`)
  lines.push(`Время: ${now} (МСК)`)

  return lines.join('\n')
}

async function sendTelegramNotification(text: string): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  if (!token || !chatId) {
    console.error('TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID не заданы в окружении')
    return false
  }

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
  })
  if (!res.ok) {
    console.error('Telegram API error:', await res.text())
    return false
  }
  return true
}

async function sweepPendingLeads(): Promise<void> {
  await ensurePendingDir()
  const files = await fs.readdir(PENDING_DIR)
  const now = Date.now()

  for (const file of files) {
    if (!file.endsWith('.json')) continue
    const filePath = path.join(PENDING_DIR, file)

    let raw: string
    try {
      raw = await fs.readFile(filePath, 'utf8')
    } catch {
      continue // уже забрал другой процесс
    }

    let entry: { body: LeadPayload; dueAt: number }
    try {
      entry = JSON.parse(raw)
    } catch {
      await fs.unlink(filePath).catch(() => {})
      continue
    }
    if (entry.dueAt > now) continue

    // Атомарный захват: rename на одном и том же файле успеет только у одного процесса.
    const claimPath = `${filePath}.claimed`
    try {
      await fs.rename(filePath, claimPath)
    } catch {
      continue
    }
    const nowStr = new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })
    await sendTelegramNotification(buildMessageText(entry.body, nowStr, true))
    await fs.unlink(claimPath).catch(() => {})
  }
}

// Один интервал на процесс; в dev-режиме модуль может перезагружаться —
// защищаемся флагом на globalThis, чтобы не наплодить дублирующих интервалов.
if (!(globalThis as unknown as { __buildxPendingSweepStarted?: boolean }).__buildxPendingSweepStarted) {
  (globalThis as unknown as { __buildxPendingSweepStarted?: boolean }).__buildxPendingSweepStarted = true
  setInterval(() => {
    sweepPendingLeads().catch((err) => console.error('Pending leads sweep failed:', err))
  }, SWEEP_INTERVAL_MS)
}

export async function POST(req: NextRequest) {
  try {
    const ct = req.headers.get('content-type') ?? ''
    if (!ct.includes('application/json')) {
      return NextResponse.json({ error: 'Unsupported Media Type' }, { status: 415 })
    }

    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
      req.headers.get('x-real-ip') ??
      'unknown'

    if (isRateLimited(ip)) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
    }

    const body = (await req.json()) as LeadPayload

    // Honeypot
    if (body._honey) return NextResponse.json({ ok: true })

    if (!body.phone?.trim()) {
      return NextResponse.json({ error: 'Phone is required' }, { status: 400 })
    }

    if (
      tooLong(body.name) || tooLong(body.phone) || tooLong(body.comment) || tooLong(body.source) ||
      urlTooLong(body.pageUrl) || Object.values(body.utm ?? {}).some(tooLong)
    ) {
      return NextResponse.json({ error: 'Field too long' }, { status: 400 })
    }

    const key = plainPhone(body.phone)

    if (body.mode === 'pending') {
      await ensurePendingDir()
      const payload = JSON.stringify({ body, dueAt: Date.now() + DEFERRED_LEAD_DELAY_MS })
      try {
        // "wx" — создать, только если файла ещё нет: уже ждём по этому номеру —
        // не переставляем таймер и не дублируем.
        await fs.writeFile(pendingFilePath(key), payload, { flag: 'wx' })
      } catch (err) {
        if ((err as NodeJS.ErrnoException).code !== 'EEXIST') throw err
      }
      return NextResponse.json({ ok: true })
    }

    // Реальный сабмит — если по этому номеру уже была запланирована тихая
    // отправка, отменяем её, чтобы менеджер не получил заявку дважды.
    await ensurePendingDir()
    await fs.unlink(pendingFilePath(key)).catch(() => {})

    const now = new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })
    const sent = await sendTelegramNotification(buildMessageText(body, now, false))
    if (!sent) {
      return NextResponse.json({ error: 'Telegram send failed' }, { status: 502 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

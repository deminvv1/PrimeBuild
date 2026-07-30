import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

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

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

async function sendTelegramNotification(text: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  if (!token || !chatId) return

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
  })
  if (!res.ok) {
    console.error('Telegram API error:', await res.text())
  }
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

    const { name, phone, comment, source, _honey } = await req.json()

    // Honeypot
    if (_honey) return NextResponse.json({ ok: true })

    if (!phone?.trim()) {
      return NextResponse.json({ error: 'Phone is required' }, { status: 400 })
    }

    const safeName    = (name ?? '').trim().slice(0, 100)
    const safePhone   = phone.trim().slice(0, 30)
    const safeComment = (comment ?? '').trim().slice(0, 500)
    const safeSource  = (source ?? 'site').trim().slice(0, 50)

    const LEAD_EMAIL = process.env.LEAD_EMAIL ?? process.env.SMTP_USER ?? ''
    const now = new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })

    await sendTelegramNotification(
      [
        `📩 <b>Новая заявка — ${esc(safeSource)}</b>`,
        `Имя: ${esc(safeName) || '—'}`,
        `Телефон: ${esc(safePhone)}`,
        `Комментарий:\n${esc(safeComment) || '—'}`,
        `Время: ${now} (МСК)`,
      ].join('\n')
    ).catch((err) => console.error('Telegram send failed:', err))

    await transporter.sendMail({
      from: `"BuildX сайта" <${process.env.SMTP_USER}>`,
      to: LEAD_EMAIL,
      subject: `📩 Новая заявка — ${safeSource}`,
      text: [
        `Имя:        ${safeName || '—'}`,
        `Телефон:    ${safePhone}`,
        `Комментарий: ${safeComment || '—'}`,
        `Источник:   ${safeSource}`,
        `Время:      ${now} (МСК)`,
      ].join('\n'),
      html: `
        <div style="font-family:Arial,sans-serif;max-width:480px;padding:24px;border:1px solid #e0e0e0;border-radius:8px">
          <h2 style="margin:0 0 16px;color:#1a1a1a">Новая заявка — ${esc(safeSource)}</h2>
          <table style="border-collapse:collapse;width:100%">
            <tr>
              <td style="padding:8px 12px;background:#f5f5f5;font-weight:600;width:130px">Имя</td>
              <td style="padding:8px 12px">${esc(safeName) || '—'}</td>
            </tr>
            <tr>
              <td style="padding:8px 12px;background:#f5f5f5;font-weight:600">Телефон</td>
              <td style="padding:8px 12px"><a href="tel:${esc(safePhone)}">${esc(safePhone)}</a></td>
            </tr>
            <tr>
              <td style="padding:8px 12px;background:#f5f5f5;font-weight:600">Комментарий</td>
              <td style="padding:8px 12px;white-space:pre-wrap">${esc(safeComment) || '—'}</td>
            </tr>
          </table>
          <p style="margin:16px 0 0;font-size:12px;color:#999">
            ${now} (МСК)
          </p>
        </div>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

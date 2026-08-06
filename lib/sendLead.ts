const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const
const STORAGE_KEY = 'buildx_utm'
const UTM_TTL_MS = 30 * 24 * 60 * 60 * 1000

// Запоминает UTM-метки из текущего URL на весь визит. Кладём в localStorage
// (не sessionStorage), чтобы они не терялись, если человек перешёл с рекламы
// в одной вкладке, а заявку оставил позже — в другой вкладке или после
// закрытия браузера. savedAt нужен, чтобы не подсовывать в заявку метки
// от рекламы, на которую кликнули много недель назад (см. getUtmParams).
export function captureUtmParams(): void {
  if (typeof window === 'undefined') return
  const params = new URLSearchParams(window.location.search)
  const utm: Record<string, string> = {}
  for (const key of UTM_KEYS) {
    const value = params.get(key)
    if (value) utm[key] = value
  }
  if (Object.keys(utm).length > 0) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ utm, savedAt: Date.now() }))
    } catch {
      // localStorage недоступен (приватный режим и т.п.) — просто не сохраняем
    }
  }
}

export function getUtmParams(): Record<string, string> {
  if (typeof window === 'undefined') return {}
  const params = new URLSearchParams(window.location.search)
  const fromUrl: Record<string, string> = {}
  for (const key of UTM_KEYS) {
    const value = params.get(key)
    if (value) fromUrl[key] = value
  }
  if (Object.keys(fromUrl).length > 0) return fromUrl

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const { utm, savedAt } = JSON.parse(stored) as { utm: Record<string, string>; savedAt: number }
      if (Date.now() - savedAt < UTM_TTL_MS) return utm
      localStorage.removeItem(STORAGE_KEY)
    }
  } catch {
    // ignore
  }
  return {}
}

export async function sendLead(data: {
  name?: string
  phone: string
  comment?: string
  source?: string
  _honey?: string
  /** "submit" (по умолчанию) — реальная отправка формы, шлём в Telegram сразу.
   *  "pending" — человек дозаполнил телефон, но ещё не нажал кнопку;
   *  сервер тихо запомнит заявку и пришлёт её сам через 20 минут, если
   *  реальный сабмит с этим же номером так и не придёт. */
  mode?: 'submit' | 'pending'
}): Promise<boolean> {
  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, pageUrl: window.location.href, utm: getUtmParams() }),
    })
    return res.ok
  } catch {
    return false
  }
}

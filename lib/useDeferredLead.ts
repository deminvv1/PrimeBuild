'use client'

import { useEffect, useRef } from 'react'
import { sendLead } from './sendLead'
import { isValidRuPhone } from './phone'

/**
 * Как только телефон в форме становится полным и валидным — тихо сообщаем
 * об этом на сервер (mode: "pending"). Если человек передумает или просто
 * закроет вкладку, не дожав кнопку отправки, сервер сам пришлёт заявку в
 * Telegram через 20 минут. Если он всё же отправит форму — сервер отменит
 * отложенную отправку и пришлёт обычную (см. app/api/contact/route.ts).
 */
export function useDeferredLead(
  phone: string,
  source: string,
  extra?: { name?: string; comment?: string }
) {
  const scheduledFor = useRef<string | null>(null)
  const { name, comment } = extra ?? {}

  useEffect(() => {
    if (!isValidRuPhone(phone)) return
    if (scheduledFor.current === phone) return
    scheduledFor.current = phone
    void sendLead({ phone, source, name, comment, mode: 'pending' })
  }, [phone, source, name, comment])
}

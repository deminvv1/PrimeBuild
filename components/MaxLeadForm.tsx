'use client'

import { useState } from 'react'
import Link from 'next/link'
import { formatRuPhone, isValidRuPhone } from '@/lib/phone'
import { sendLead } from '@/lib/sendLead'
import { useDeferredLead } from '@/lib/useDeferredLead'

const GOLD_SHIMMER: React.CSSProperties = {
  background: 'linear-gradient(105deg, #b8924a 0%, #C9A96E 28%, #f5e4aa 50%, #C9A96E 72%, #b8924a 100%)',
  backgroundSize: '250% 100%',
  animation: 'btn-gold-shimmer 3.5s linear infinite',
}

const COMPANY_MAX_URL = 'https://max.ru/u/f9LHodD0cOK40wm-W0V18bTlb2qrm87RrBvr0Q1DkK9s7kmLBzNWBZ2bb6I'
const LEAD_COMMENT = 'Заявка со страницы /max — хочет перейти в MAX-чат с менеджером.'

export default function MaxLeadForm() {
  const [phone, setPhone] = useState('')
  const [honey, setHoney] = useState('')
  const [phoneError, setPhoneError] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle')

  useDeferredLead(phone, 'max', { comment: LEAD_COMMENT })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValidRuPhone(phone)) { setPhoneError(true); return }
    setPhoneError(false)
    setStatus('loading')
    const ok = await sendLead({ phone, comment: LEAD_COMMENT, source: 'max', _honey: honey })
    if (ok) {
      setStatus('ok')
      window.location.href = COMPANY_MAX_URL
    } else {
      setStatus('error')
    }
  }

  if (status === 'ok') {
    return (
      <div style={{ textAlign: 'center', padding: '12px 0' }}>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 8 }}>
          Спасибо!
        </p>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'rgba(255,255,255,0.5)', margin: 0 }}>
          Переходим в MAX...
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true"
        value={honey} onChange={(e) => setHoney(e.target.value)} style={{ display: 'none' }} />

      <input
        type="tel" value={phone} onChange={(e) => { setPhone(formatRuPhone(e.target.value)); setPhoneError(false) }}
        placeholder="+7 (999) 999-99-99" aria-label="Ваш телефон" autoComplete="tel" required
        maxLength={18} inputMode="tel"
        aria-invalid={phoneError}
        style={{
          width: '100%', fontFamily: 'var(--font-sans)', fontSize: 16,
          padding: '16px 20px', borderRadius: 10, outline: 'none',
          background: '#fff', color: '#1a1a1a',
          border: `1px solid ${phoneError ? '#e53e3e' : 'transparent'}`,
          marginBottom: phoneError ? 8 : 20,
        }}
      />
      {phoneError && (
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: '#e53e3e', margin: '0 0 12px' }}>
          Введите номер полностью, в формате +7 (999) 999-99-99
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-glow-gold"
        style={{
          ...GOLD_SHIMMER,
          display: 'block', width: '100%', border: 'none', cursor: 'pointer',
          fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 700,
          letterSpacing: '0.5px', color: '#1a1a1a',
          padding: '17px 24px', borderRadius: 10,
          opacity: status === 'loading' ? 0.7 : 1,
        }}
      >
        {status === 'loading' ? 'Отправка...' : 'Перейти в MAX'}
      </button>

      {status === 'error' && (
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: '#e53e3e', textAlign: 'center', marginTop: 12 }}>
          Ошибка отправки. Позвоните нам напрямую.
        </p>
      )}

      <p style={{ fontFamily: 'var(--font-sans)', fontSize: 11, color: 'rgba(255,255,255,0.3)', lineHeight: 1.5, marginTop: 16, textAlign: 'center' }}>
        Отправляя номер, вы соглашаетесь с{' '}
        <Link href="/privacy" style={{ textDecoration: 'underline', color: 'rgba(255,255,255,0.3)' }}>
          политикой конфиденциальности
        </Link>
      </p>
    </form>
  )
}

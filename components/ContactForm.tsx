'use client'

import { useState } from 'react'

interface Props {
  source?: string
  buttonLabel?: string
  dark?: boolean
}

export default function ContactForm({ source = 'main', buttonLabel = 'Получить консультацию', dark = false }: Props) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [comment, setComment] = useState('')
  const [honey, setHoney] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle')
  const [phoneError, setPhoneError] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (phone.replace(/\D/g, '').length < 10) { setPhoneError(true); return }
    setPhoneError(false)
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, comment, source, _honey: honey }),
      })
      setStatus(res.ok ? 'ok' : 'error')
    } catch {
      setStatus('error')
    }
  }

  const textColor = dark ? '#fff' : '#1a1a1a'
  const mutedColor = dark ? 'rgba(255,255,255,0.5)' : 'rgba(26,26,26,0.45)'
  const inputBg = dark ? 'rgba(255,255,255,0.07)' : '#fff'
  const inputBorder = dark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.14)'
  const inputBorderFocus = dark ? '#fff' : '#1a1a1a'

  if (status === 'ok') {
    return (
      <div style={{ padding: '40px 0', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 20, fontWeight: 700, color: textColor, marginBottom: 8 }}>
          Спасибо! Заявка принята.
        </p>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: mutedColor }}>
          Перезвоним в течение 2 часов в рабочее время.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true"
        value={honey} onChange={e => setHoney(e.target.value)} style={{ display: 'none' }} />

      <input
        type="text" value={name} onChange={e => setName(e.target.value)}
        placeholder="Ваше имя"
        style={{ ...inputStyle, background: inputBg, border: `1px solid ${inputBorder}`, color: textColor }}
        onFocus={e => (e.target.style.borderColor = inputBorderFocus)}
        onBlur={e => (e.target.style.borderColor = inputBorder)}
      />

      <div>
        <input
          type="tel" value={phone} onChange={e => { setPhone(e.target.value); setPhoneError(false) }}
          placeholder="+7 (___) ___-__-__"
          required
          style={{ ...inputStyle, background: inputBg, border: `1px solid ${phoneError ? '#e53e3e' : inputBorder}`, color: textColor }}
          onFocus={e => (e.target.style.borderColor = phoneError ? '#e53e3e' : inputBorderFocus)}
          onBlur={e => (e.target.style.borderColor = phoneError ? '#e53e3e' : inputBorder)}
        />
        {phoneError && (
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: '#e53e3e', marginTop: 4 }}>
            Введите корректный номер телефона
          </p>
        )}
      </div>

      <textarea
        value={comment} onChange={e => setComment(e.target.value)}
        placeholder="Комментарий (необязательно)"
        rows={3}
        style={{ ...inputStyle, background: inputBg, border: `1px solid ${inputBorder}`, color: textColor, resize: 'none', lineHeight: '1.5', paddingTop: 12 }}
        onFocus={e => (e.target.style.borderColor = inputBorderFocus)}
        onBlur={e => (e.target.style.borderColor = inputBorder)}
      />

      <button type="submit" disabled={status === 'loading'} style={{
        background: '#1a1a1a', border: 'none', cursor: 'pointer',
        fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 700,
        letterSpacing: '0.8px', textTransform: 'uppercase', color: '#fff',
        padding: '16px 32px', borderRadius: 6,
        opacity: status === 'loading' ? 0.65 : 1,
        transition: 'background 0.2s',
      }}>
        {status === 'loading' ? 'Отправка...' : buttonLabel}
      </button>

      <p style={{ fontFamily: 'var(--font-sans)', fontSize: 11, color: mutedColor, textAlign: 'center', lineHeight: '1.5' }}>
        Нажимая кнопку, вы соглашаетесь с{' '}
        <a href="/privacy" style={{ textDecoration: 'underline', color: mutedColor }}>политикой конфиденциальности</a>
      </p>

      {status === 'error' && (
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: '#e53e3e', textAlign: 'center' }}>
          Ошибка отправки. Позвоните нам напрямую.
        </p>
      )}
    </form>
  )
}

const inputStyle: React.CSSProperties = {
  width: '100%', fontFamily: 'var(--font-sans)',
  fontSize: 15, padding: '13px 16px',
  borderRadius: 6, outline: 'none',
  display: 'block', transition: 'border-color 0.2s',
}

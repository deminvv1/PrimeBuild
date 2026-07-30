'use client'

import { useState, useRef, useLayoutEffect } from 'react'

interface Props {
  source?: string
  buttonLabel?: string
  dark?: boolean
  /** Доп. текст (например, сводка конфигуратора), добавляется к комментарию при отправке. Всегда берётся актуальным на момент сабмита. */
  configSummary?: string
}

export default function ContactForm({ source = 'main', buttonLabel = 'Получить консультацию', dark = false, configSummary }: Props) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [comment, setComment] = useState('')
  const [honey, setHoney] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle')
  const [phoneError, setPhoneError] = useState(false)
  const [size, setSize] = useState({ w: 0, h: 0 })
  const [hovered, setHovered] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const measure = () => {
      const r = el.getBoundingClientRect()
      setSize({ w: r.width, h: r.height })
    }
    measure()
    const obs = new ResizeObserver(measure)
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (phone.replace(/\D/g, '').length < 10) { setPhoneError(true); return }
    setPhoneError(false)
    setStatus('loading')
    const fullComment = [comment.trim(), configSummary].filter(Boolean).join('\n\n')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, comment: fullComment, source, _honey: honey }),
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

  const pad = 1.5
  const rW = Math.max(0, size.w - pad * 2)
  const rH = Math.max(0, size.h - pad * 2)

  if (status === 'ok') {
    return (
      <div style={{ padding: '40px 0', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 20, fontWeight: 700, color: textColor, marginBottom: 8 }}>
          Спасибо! Заявка принята.
        </p>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: mutedColor }}>
          Перезвоним в течение 15 минут в рабочее время.
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

      <div
        ref={wrapRef}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ position: 'relative', opacity: status === 'loading' ? 0.65 : 1 }}
      >
        <button
          type="submit"
          disabled={status === 'loading'}
          style={{
            display: 'block', width: '100%',
            background: hovered ? '#1a1a1a' : '#fff',
            border: 'none', cursor: 'pointer',
            fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 700,
            letterSpacing: '0.8px', textTransform: 'uppercase',
            color: hovered ? '#fff' : '#1a1a1a',
            padding: '16px 32px', borderRadius: 999,
            transition: 'background 0.35s ease, color 0.35s ease',
          }}
        >
          {status === 'loading' ? 'Отправка...' : buttonLabel}
        </button>

        {size.w > 0 && (
          <svg
            aria-hidden="true"
            width={size.w}
            height={size.h}
            style={{
              position: 'absolute', top: 0, left: 0,
              pointerEvents: 'none',
              filter: hovered
                ? 'drop-shadow(0 0 6px rgba(201,169,110,0.85))'
                : 'drop-shadow(0 0 2px rgba(139,105,20,0.4))',
              transition: 'filter 0.35s ease',
            }}
          >
            <rect
              x={pad} y={pad}
              width={rW} height={rH}
              rx={rH / 2} ry={rH / 2}
              fill="none"
              strokeWidth="2.5"
              pathLength="100"
              strokeDasharray="22 78"
              strokeLinecap="round"
              style={{
                stroke: hovered ? '#C9A96E' : '#9A6F00',
                animation: 'cta-travel 6s linear infinite',
                transition: 'stroke 0.35s ease',
              }}
            />
          </svg>
        )}
      </div>

      <style>{`
        @keyframes cta-travel {
          from { stroke-dashoffset: 100; }
          to   { stroke-dashoffset: 0; }
        }
      `}</style>

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

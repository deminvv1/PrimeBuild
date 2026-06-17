'use client'

import { useState } from 'react'

const STEPS = [
  {
    title: 'Выберите размер дома',
    options: ['Mini — до 120 м²', 'Midi — 120–200 м²', 'Maxi — 200–300 м²', 'Ещё не знаю'],
  },
  {
    title: 'Вариант отделки',
    options: ['Комфорт', 'Бизнес', 'Не определился'],
  },
  {
    title: 'Ваш район / город МО',
    options: [],
    isText: true,
    placeholder: 'Например: Красногорск, Химки, Одинцово...',
  },
  {
    title: 'Когда планируете строительство?',
    options: ['В ближайшие 3 месяца', 'В этом году', 'Присматриваюсь, пока не решил'],
  },
  {
    title: 'Оставьте контакты для расчёта',
    options: [],
    isContact: true,
  },
]

export default function QuizCalculator() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<string[]>(Array(STEPS.length).fill(''))
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [honey, setHoney] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle')
  const [phoneError, setPhoneError] = useState(false)

  const current = STEPS[step]
  const isLast = step === STEPS.length - 1
  const progress = (step / (STEPS.length - 1)) * 100

  const choose = (option: string) => {
    setAnswers(a => a.map((v, i) => (i === step ? option : v)))
    if (step < STEPS.length - 1) setStep(s => s + 1)
  }

  const handleSubmit = async () => {
    if (phone.replace(/\D/g, '').length < 10) { setPhoneError(true); return }
    setPhoneError(false)
    setStatus('loading')
    try {
      const body = {
        name, phone,
        comment: STEPS.slice(0, -1).map((s, i) => `${s.title}: ${answers[i]}`).join('\n'),
        source: 'quiz', _honey: honey,
      }
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      setStatus(res.ok ? 'ok' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'ok') {
    return (
      <div style={{ textAlign: 'center', padding: '48px 0' }}>
        <div style={{
          width: 56, height: 56, borderRadius: '50%', background: '#f0fdf4',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 20px',
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 22, fontWeight: 700, color: '#1a1a1a', marginBottom: 8 }}>
          Спасибо{name ? `, ${name}` : ''}!
        </p>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 15, color: 'rgba(26,26,26,0.55)' }}>
          Перезвоним в течение 2 часов в рабочее время.
        </p>
      </div>
    )
  }

  return (
    <div>
      {/* Progress bar */}
      <div style={{ marginBottom: 36 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'rgba(26,26,26,0.4)', fontWeight: 500 }}>
            Шаг {step + 1} из {STEPS.length}
          </span>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'rgba(26,26,26,0.4)', fontWeight: 500 }}>
            {Math.round(progress)}%
          </span>
        </div>
        <div style={{ height: 4, background: '#f0efed', borderRadius: 2, overflow: 'hidden' }}>
          <div style={{
            height: '100%', background: '#1a1a1a', borderRadius: 2,
            width: `${progress}%`, transition: 'width 0.4s ease',
          }} />
        </div>
      </div>

      {/* Question */}
      <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: 22, fontWeight: 700, color: '#1a1a1a', marginBottom: 24 }}>
        {current.title}
      </h3>

      {/* Text answer */}
      {current.isText && (
        <div>
          <input
            type="text"
            value={answers[step]}
            onChange={e => setAnswers(a => a.map((v, i) => i === step ? e.target.value : v))}
            placeholder={current.placeholder}
            className="input"
            style={{ marginBottom: 16 }}
          />
          <button onClick={() => setStep(s => s + 1)} style={btnStyle}>
            Далее →
          </button>
        </div>
      )}

      {/* Contact step */}
      {isLast && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true"
            value={honey} onChange={e => setHoney(e.target.value)} style={{ display: 'none' }} />
          <input
            type="text" value={name} onChange={e => setName(e.target.value)}
            placeholder="Ваше имя" className="input"
          />
          <input
            type="tel" value={phone} onChange={e => { setPhone(e.target.value); setPhoneError(false) }}
            placeholder="Телефон *" className="input"
            style={{ borderColor: phoneError ? '#e53e3e' : '' }}
          />
          {phoneError && <p style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: '#e53e3e' }}>Введите корректный номер</p>}
          <button onClick={handleSubmit} disabled={status === 'loading'} style={{ ...btnStyle, opacity: status === 'loading' ? 0.65 : 1, marginTop: 4 }}>
            {status === 'loading' ? 'Отправка...' : 'Получить расчёт стоимости'}
          </button>
          {status === 'error' && (
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: '#e53e3e', textAlign: 'center' }}>
              Ошибка. Позвоните нам напрямую.
            </p>
          )}
        </div>
      )}

      {/* Choice options */}
      {!current.isText && !isLast && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {current.options.map(opt => (
            <button key={opt} onClick={() => choose(opt)} style={{
              background: answers[step] === opt ? '#1a1a1a' : '#fff',
              border: `1px solid ${answers[step] === opt ? '#1a1a1a' : 'rgba(0,0,0,0.14)'}`,
              color: answers[step] === opt ? '#fff' : '#1a1a1a',
              fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: answers[step] === opt ? 600 : 400,
              padding: '14px 20px', borderRadius: 8, textAlign: 'left',
              cursor: 'pointer', transition: 'all 0.15s',
            }}>
              {opt}
            </button>
          ))}
        </div>
      )}

      {step > 0 && (
        <button onClick={() => setStep(s => s - 1)} style={{
          marginTop: 20, background: 'none', border: 'none', cursor: 'pointer',
          fontFamily: 'var(--font-sans)', fontSize: 13, color: 'rgba(26,26,26,0.4)',
          padding: 0,
        }}>
          ← Назад
        </button>
      )}
    </div>
  )
}

const btnStyle: React.CSSProperties = {
  background: '#1a1a1a', border: 'none', cursor: 'pointer',
  fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 700,
  letterSpacing: '0.5px', color: '#fff',
  padding: '16px 32px', borderRadius: 6, width: '100%',
  transition: 'background 0.2s',
}

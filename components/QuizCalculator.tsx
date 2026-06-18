'use client'

import { useState } from 'react'
import Link from 'next/link'

const BG     = '#242424'
const TEXT   = 'rgba(255,255,255,0.9)'
const DIM    = 'rgba(255,255,255,0.38)'
const BORDER = 'rgba(255,255,255,0.12)'
const SURF   = '#2c2c2c'
const CASLON  = 'var(--font-caslon), Georgia, serif'
const MONO    = 'var(--font-mono), monospace'
const GROTESK = 'var(--font-grotesk), -apple-system, sans-serif'

type Status = 'idle' | 'loading' | 'ok' | 'error'

const TITLES = [
  'Выберите масштаб вашего будущего дома',
  'Характер внутреннего пространства',
  'Где вы планируете возведение резиденции?',
  'Желаемые сроки начала реализации',
  'Персональный расчет стоимости',
]

export default function QuizCalculator() {
  const [step, setStep]       = useState(1)
  const [vis, setVis]         = useState(true)
  const [size, setSize]       = useState('')
  const [finish, setFinish]   = useState('')
  const [location, setLoc]    = useState('')
  const [timing, setTiming]   = useState('')
  const [name, setName]       = useState('')
  const [phone, setPhone]     = useState('')
  const [honey, setHoney]     = useState('')
  const [status, setStatus]   = useState<Status>('idle')
  const [phoneErr, setPhErr]  = useState(false)

  const goto = (n: number) => {
    setVis(false)
    setTimeout(() => { setStep(n); setVis(true) }, 360)
  }
  const next = () => { if (step < 5) goto(step + 1) }
  const prev = () => { if (step > 1) goto(step - 1) }

  const submit = async () => {
    if (phone.replace(/\D/g, '').length < 10) { setPhErr(true); return }
    setPhErr(false)
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, phone, _honey: honey, source: 'quiz',
          comment: `Размер: ${size}\nОтделка: ${finish}\nРайон: ${location}\nСроки: ${timing}`,
        }),
      })
      setStatus(res.ok ? 'ok' : 'error')
    } catch { setStatus('error') }
  }

  /* ── THANK YOU ── */
  if (status === 'ok') return (
    <div style={{ minHeight: '70vh', background: BG, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '80px 24px' }}>
      <div style={{ width: 80, height: 80, border: `1px solid ${BORDER}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 40 }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={TEXT} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <h2 style={{ fontFamily: CASLON, fontSize: 'clamp(32px,5vw,48px)', fontWeight: 400, color: TEXT, marginBottom: 16 }}>Заявка принята</h2>
      <p style={{ fontFamily: GROTESK, fontSize: 18, color: DIM, maxWidth: 400, lineHeight: 1.6, marginBottom: 48 }}>
        Ваш расчёт уже в работе у архитектора. Мы свяжемся с вами в ближайшее время для обсуждения деталей.
      </p>
      <Link href="/" style={{ fontFamily: MONO, fontSize: 12, letterSpacing: '0.15em', color: TEXT, borderBottom: `1px solid ${TEXT}`, paddingBottom: 4 }}>
        Вернуться на главную
      </Link>
    </div>
  )

  const progress = (step / 5) * 100
  const title    = TITLES[step - 1]

  return (
    <div style={{ background: BG, minHeight: '100vh' }}>

      {/* ── PROGRESS ── */}
      <div style={{ padding: '48px 24px 0', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <span style={{ fontFamily: MONO, fontSize: 12, letterSpacing: '0.3em', color: DIM }}>
            ШАГ 0{step} / 05
          </span>
          <div style={{ width: 192, height: 1, background: BORDER, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, width: `${progress}%`, background: TEXT, transition: 'width 0.8s ease' }} />
          </div>
        </div>
      </div>

      {/* ── STEP CONTENT ── */}
      <div style={{
        maxWidth: 1000, margin: '0 auto', padding: '48px 24px 80px',
        opacity: vis ? 1 : 0,
        transform: vis ? 'none' : 'translateY(20px)',
        transition: 'opacity 0.36s ease, transform 0.36s ease',
      }}>

        {/* STEP 1 — Size */}
        {step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2 style={{ fontFamily: CASLON, fontSize: 'clamp(28px,4vw,48px)', fontWeight: 400, color: TEXT, textAlign: 'center', marginBottom: 48, maxWidth: 680 }}>
              {title}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24, width: '100%' }} className="qz-g3">
              {([
                { label: 'Mini', sub: 'до 150 м²',    img: '/images/quiz/mini.jpg',  n: '01' },
                { label: 'Midi', sub: '150 — 350 м²', img: '/images/quiz/midi.jpg',  n: '02' },
                { label: 'Maxi', sub: 'от 350 м²',    img: '/images/quiz/maxi.jpg',  n: '03' },
              ] as const).map(({ label, sub, img, n }) => (
                <button key={label} className="qz-card"
                  onClick={() => { setSize(label); next() }}
                  style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden', background: SURF, border: 'none', cursor: 'pointer', display: 'block' }}>
                  <img src={img} alt={label} className="qz-img" loading="eager" decoding="async"
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)', transition: 'transform 0.9s ease, filter 0.5s ease' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(28,27,27,0.82) 0%,rgba(28,27,27,0) 60%)', opacity: 0.75 }} />
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 32, color: '#fff', textAlign: 'left' }}>
                    <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.2em', opacity: 0.8, marginBottom: 8 }}>{sub}</span>
                    <h3 style={{ fontFamily: CASLON, fontSize: 28, fontWeight: 400, margin: 0 }}>{label}</h3>
                  </div>
                  <span style={{ position: 'absolute', top: 24, right: 24, fontFamily: MONO, fontSize: 10, color: 'rgba(255,255,255,0.35)' }}>{n}</span>
                </button>
              ))}
            </div>
            <button onClick={next}
              style={{ marginTop: 48, fontFamily: MONO, fontSize: 11, letterSpacing: '0.15em', color: DIM, background: 'none', border: 'none', cursor: 'pointer' }}>
              Затрудняюсь с выбором ›
            </button>
          </div>
        )}

        {/* STEP 2 — Finish */}
        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <button onClick={prev} style={backSt}>← Назад</button>
            <h2 style={{ fontFamily: CASLON, fontSize: 'clamp(28px,4vw,48px)', fontWeight: 400, color: TEXT, textAlign: 'center', marginBottom: 48 }}>
              {title}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 40, width: '100%' }} className="qz-g2">
              {([
                { label: 'Комфорт', sub: 'Базовый подход',        img: '/images/quiz/comfort.jpg' },
                { label: 'Бизнес',  sub: 'Премиальные материалы', img: '/images/quiz/premium.jpg' },
              ] as const).map(({ label, sub, img }) => (
                <button key={label} className="qz-card-v"
                  onClick={() => { setFinish(label); next() }}
                  style={{ textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer' }}>
                  <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden', marginBottom: 24, background: SURF }}>
                    <img src={img} alt={label} className="qz-img" loading="lazy" decoding="async"
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)', transition: 'transform 0.7s ease, filter 0.6s ease' }} />
                  </div>
                  <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.15em', color: DIM, display: 'block', marginBottom: 8 }}>{sub}</span>
                  <h3 style={{ fontFamily: CASLON, fontSize: 28, fontWeight: 400, color: TEXT, margin: 0 }}>{label}</h3>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3 — Location */}
        {step === 3 && (
          <div>
            <button onClick={prev} style={backSt}>← Назад</button>
            <h2 style={{ fontFamily: CASLON, fontSize: 'clamp(28px,4vw,48px)', fontWeight: 400, color: TEXT, marginBottom: 32 }}>
              {title}
            </h2>
            <div style={{ maxWidth: 640 }}>
              <label style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.15em', color: DIM, display: 'block', marginBottom: 16 }}>
                РАЙОН ИЛИ ГОРОД МОСКОВСКОЙ ОБЛАСТИ
              </label>
              <input type="text" value={location} onChange={e => setLoc(e.target.value)}
                placeholder="Например, Барвиха..."
                style={{ ...inpSt, fontFamily: CASLON, fontSize: 'clamp(22px,3vw,32px)' }}
                onFocus={e => (e.target.style.borderBottomColor = TEXT)}
                onBlur={e => (e.target.style.borderBottomColor = BORDER)} />
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 48 }}>
                <button onClick={next} className="qz-continue"
                  style={{ display: 'flex', alignItems: 'center', gap: 24, background: 'none', border: 'none', cursor: 'pointer' }}>
                  <span style={{ fontFamily: MONO, fontSize: 12, letterSpacing: '0.15em', color: TEXT }}>Продолжить</span>
                  <div className="qz-arrow" style={{ width: 48, height: 48, border: `1px solid ${TEXT}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: TEXT, transition: 'all 0.3s' }}>
                    →
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4 — Timing */}
        {step === 4 && (
          <div>
            <button onClick={prev} style={backSt}>← Назад</button>
            <h2 style={{ fontFamily: CASLON, fontSize: 'clamp(28px,4vw,48px)', fontWeight: 400, color: TEXT, marginBottom: 48 }}>
              {title}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }} className="qz-g3">
              {([
                { label: 'В этом сезоне',    sub: 'Срочный старт'   },
                { label: 'В следующем году', sub: 'Плановое начало' },
                { label: 'Прицениваюсь',     sub: 'Консультация'    },
              ] as const).map(({ label, sub }) => (
                <button key={label} className="qz-choice"
                  onClick={() => { setTiming(label); next() }}
                  style={{ padding: '48px 16px', border: `1px solid ${BORDER}`, background: 'none', cursor: 'pointer', textAlign: 'center', transition: 'border-color 0.3s, background 0.3s' }}>
                  <span style={{ fontFamily: CASLON, fontSize: 22, fontWeight: 400, color: TEXT, display: 'block', marginBottom: 12 }}>{label}</span>
                  <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.15em', color: DIM, textTransform: 'uppercase' }}>{sub}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 5 — Contact */}
        {step === 5 && (
          <div style={{ display: 'flex', gap: 80, alignItems: 'flex-start' }} className="qz-final">
            <div style={{ flex: 1, minWidth: 0 }}>
              <button onClick={prev} style={backSt}>← Назад</button>
              <h2 style={{ fontFamily: CASLON, fontSize: 'clamp(28px,4vw,48px)', fontWeight: 400, color: TEXT, marginBottom: 24, lineHeight: 1.1 }}>
                {title}
              </h2>
              <p style={{ fontFamily: GROTESK, fontSize: 16, color: DIM, marginBottom: 48, lineHeight: 1.6, maxWidth: 380 }}>
                Наш ведущий архитектор проанализирует ваши ответы и подготовит предварительную концепцию и смету в течение 2-х часов.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
                <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true"
                  value={honey} onChange={e => setHoney(e.target.value)} style={{ display: 'none' }} />
                <div>
                  <label style={lblSt}>ПРЕДСТАВЬТЕСЬ</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)}
                    placeholder="Ваше имя" style={inpSt}
                    onFocus={e => (e.target.style.borderBottomColor = TEXT)}
                    onBlur={e => (e.target.style.borderBottomColor = BORDER)} />
                </div>
                <div>
                  <label style={lblSt}>КОНТАКТНЫЙ НОМЕР</label>
                  <input type="tel" value={phone}
                    onChange={e => { setPhone(e.target.value); setPhErr(false) }}
                    placeholder="+7 (___) ___-__-__"
                    style={{ ...inpSt, borderBottomColor: phoneErr ? '#ba1a1a' : BORDER }}
                    onFocus={e => (e.target.style.borderBottomColor = TEXT)}
                    onBlur={e => (e.target.style.borderBottomColor = phoneErr ? '#ba1a1a' : BORDER)} />
                  {phoneErr && (
                    <p style={{ fontFamily: MONO, fontSize: 10, color: '#ba1a1a', marginTop: 8, letterSpacing: '0.1em' }}>
                      Введите корректный номер
                    </p>
                  )}
                </div>
                <button onClick={submit} disabled={status === 'loading'}
                  style={{ background: '#C9A96E', color: '#1a1a1a', border: 'none', cursor: status === 'loading' ? 'default' : 'pointer', fontFamily: MONO, fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', padding: '24px 64px', alignSelf: 'flex-start', opacity: status === 'loading' ? 0.6 : 1, transition: 'opacity 0.2s, background 0.3s' }}
                  className="qz-submit">
                  {status === 'loading' ? 'Отправка...' : 'Получить расчет'}
                </button>
                {status === 'error' && (
                  <p style={{ fontFamily: MONO, fontSize: 10, color: '#ba1a1a', letterSpacing: '0.1em' }}>
                    Ошибка отправки. Позвоните нам напрямую.
                  </p>
                )}
              </div>
            </div>
            <div style={{ position: 'relative', width: 400, flexShrink: 0, aspectRatio: '4/5', overflow: 'hidden', filter: 'grayscale(100%)' }} className="qz-photo">
              <img src="/images/quiz/contact.jpg" alt="Проект" className="qz-photo-img" loading="lazy" decoding="async"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 3s ease' }} />
            </div>
          </div>
        )}
      </div>

      <style>{`
        .qz-card:hover .qz-img   { transform: scale(1.08) !important; filter: grayscale(0%) !important; }
        .qz-card-v:hover .qz-img { transform: scale(1.05) !important; filter: grayscale(0%) !important; }
        .qz-choice:hover          { border-color: rgba(255,255,255,0.5) !important; background: #333 !important; }
        .qz-continue:hover .qz-arrow { background: rgba(255,255,255,0.9); color: #1a1a1a; }
        .qz-submit:hover          { background: #b8945a !important; }
        .qz-photo:hover .qz-photo-img { transform: scale(1.05); }
        input::placeholder        { color: rgba(255,255,255,0.2); }
        @media (max-width: 700px) {
          .qz-g3    { grid-template-columns: 1fr !important; }
          .qz-g2    { grid-template-columns: 1fr !important; }
          .qz-final { flex-direction: column !important; }
          .qz-photo { display: none !important; }
        }
      `}</style>
    </div>
  )
}

/* ── Shared styles ── */
const backSt: React.CSSProperties = {
  fontFamily: MONO,
  fontSize: 11, letterSpacing: '0.12em', color: '#747878',
  background: 'none', border: 'none', cursor: 'pointer',
  marginBottom: 32, display: 'block', alignSelf: 'flex-start', padding: 0,
}

const lblSt: React.CSSProperties = {
  fontFamily: MONO,
  fontSize: 10, letterSpacing: '0.2em', color: '#747878',
  display: 'block', marginBottom: 8,
}

const inpSt: React.CSSProperties = {
  width: '100%', background: 'transparent', border: 'none',
  borderBottom: '1px solid rgba(255,255,255,0.12)',
  padding: '16px 0',
  fontFamily: GROTESK,
  fontSize: 18, fontWeight: 400, color: 'rgba(255,255,255,0.9)',
  outline: 'none', transition: 'border-color 0.3s',
}

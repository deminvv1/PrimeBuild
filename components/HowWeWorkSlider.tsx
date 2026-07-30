'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const DELAY = 15000

const STEPS = [
  {
    n: '01',
    title: 'Заявка и расчёт',
    desc: 'Оставляете заявку — перезваниваем в течение 15 минут, обсуждаем задачу и считаем предварительную смету.',
    img: '/images/quiz/contact.jpg',
  },
  {
    n: '02',
    title: 'Договор',
    desc: 'Фиксируем цену, сроки и технические характеристики в договоре. Никаких скрытых платежей.',
    img: '/images/projects/alpha-2.jpg',
  },
  {
    n: '03',
    title: 'Фундамент и коробка',
    desc: 'Заливаем фундамент, возводим стены и кровлю. Присылаем фото-отчёт раз в неделю.',
    img: '/images/projects/alpha-1.jpg',
  },
  {
    n: '04',
    title: 'Отделка и инженерия',
    desc: 'Электрика, сантехника, отопление, чистовая отделка по выбранному пакету.',
    img: '/images/quiz/premium.jpg',
  },
  {
    n: '05',
    title: 'Сдача ключей',
    desc: 'Подписываем акт приёма-передачи и вручаем ключи. Гарантия на дом — 5 лет.',
    img: '/images/projects/gamma-1.jpg',
  },
]

const PEEK = [
  // main — полная высота, левые 60%
  { left: '0%',  top: '15px',  width: '60%', bottom: '15px',  zIndex: 5, opacity: 1,   radius: 10  },
  // peek 1 — заходит под main на половину своей ширины (left=45% → 15% скрыто под main)
  { left: '45%', top: '5%',  width: '30%', bottom: '8%',  zIndex: 4, opacity: 1,   radius: 10 },
  // peek 2 — заходит под peek 1 на половину (left=63% → 12% скрыто под peek 1)
  { left: '63%', top: '14%', width: '24%', bottom: '16%', zIndex: 3, opacity: 0.9, radius: 10 },
]

export default function HowWeWorkSlider() {
  const [active, setActive] = useState(0)

  const go = (i: number) => setActive((i + STEPS.length) % STEPS.length)
  const prev = () => go(active - 1)
  const next = () => go(active + 1)
  const step = STEPS[active]

  // Auto-advance: restarts timer on every active change
  useEffect(() => {
    const id = setTimeout(() => go(active + 1), DELAY)
    return () => clearTimeout(id)
  }, [active]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div className="hww-root" style={{
        display: 'grid',
        gridTemplateColumns: '500px 1fr',
        minHeight: 520,
        overflow: 'hidden',
      }}>
        {/* ── Left: info ── */}
        <div style={{
          padding: '56px 60px 40px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Ghost number */}
          <div aria-hidden style={{
            position: 'absolute', top: -10,
            fontFamily: 'var(--font-sans)', fontSize: 220, fontWeight: 900,
            color: 'rgba(255,255,255,0.03)', lineHeight: 1,
            userSelect: 'none', pointerEvents: 'none',
          }}>
            {step.n}
          </div>


          {/* Text */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '40px 0' }}>
            <h3 style={{
              fontFamily: 'var(--font-sans)', fontSize: 'clamp(20px, 2vw, 28px)',
              fontWeight: 800, color: 'rgba(255,255,255,0.92)', lineHeight: 1.2, marginBottom: 16,
            }}>
              {step.title}
            </h3>
            <p style={{
              fontFamily: 'var(--font-sans)', fontSize: 14,
              color: 'rgba(255,255,255,0.42)', lineHeight: 1.8, margin: 0,
            }}>
              {step.desc}
            </p>
          </div>

          {/* Nav row */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              {/* Dots */}
              <div style={{ display: 'flex', gap: 6 }}>
                {STEPS.map((_, i) => (
                  <button key={i} onClick={() => go(i)} aria-label={`Этап ${i + 1}`} style={{
                    width: i === active ? 22 : 6, height: 6, borderRadius: 999,
                    background: i === active ? '#C9A96E' : 'rgba(255,255,255,0.18)',
                    border: 'none', cursor: 'pointer', padding: 0,
                    transition: 'width 0.35s ease, background 0.35s ease',
                  }} />
                ))}
              </div>

              {/* Arrows */}
              <div style={{ display: 'flex', gap: 8 }}>
                {([
                  { fn: prev, d: 'M15 19l-7-7 7-7' },
                  { fn: next, d: 'M9 5l7 7-7 7' },
                ] as const).map(({ fn, d }, i) => (
                  <button key={i} onClick={fn} aria-label={i === 0 ? 'Назад' : 'Вперёд'} style={{
                    width: 40, height: 40, borderRadius: 999,
                    border: '1px solid rgba(255,255,255,0.12)',
                    background: 'transparent', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'border-color 0.2s',
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                      stroke="rgba(255,255,255,0.75)" strokeWidth="2"
                      strokeLinecap="round" strokeLinejoin="round">
                      <path d={d} />
                    </svg>
                  </button>
                ))}
              </div>
            </div>

            {/* Progress line */}
            <div style={{ height: 2, background: 'rgba(255,255,255,0.08)', borderRadius: 999, overflow: 'hidden' }}>
              <div
                key={active}
                style={{
                  height: '100%',
                  background: '#C9A96E',
                  borderRadius: 999,
                  animation: `hww-fill ${DELAY}ms linear forwards`,
                }}
              />
            </div>
          </div>
        </div>

        {/* ── Right: stacked gallery ── */}
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          {STEPS.map((s, i) => {
            const offset = (i - active + STEPS.length) % STEPS.length
            if (offset >= PEEK.length) return null
            const p = PEEK[offset]
            return (
              <div
                key={s.img}
                onClick={offset > 0 ? () => go(i) : undefined}
                style={{
                  position: 'absolute',
                  top: p.top, left: p.left, width: p.width, bottom: p.bottom,
                  zIndex: p.zIndex, borderRadius: p.radius,
                  overflow: 'hidden', opacity: p.opacity,
                  cursor: offset > 0 ? 'pointer' : 'default',
                  transition: 'top 0.7s cubic-bezier(0.25,0.46,0.45,0.94), left 0.7s cubic-bezier(0.25,0.46,0.45,0.94), width 0.7s cubic-bezier(0.25,0.46,0.45,0.94), bottom 0.7s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.7s ease, border-radius 0.7s ease',
                  boxShadow: offset === 0 ? 'none' : '0 8px 32px rgba(0,0,0,0.45)',
                }}
              >
                <Image src={s.img} alt={s.title} fill
                  sizes="(max-width: 768px) 100vw, 60vw"
                  style={{ objectFit: 'cover', display: 'block' }}
                  priority={i === 0}
                />
                {offset > 0 && (
                  <>
                    <div style={{
                      position: 'absolute', top: 10, right: 10,
                      background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)',
                      WebkitBackdropFilter: 'blur(6px)',
                      border: '1px solid rgba(201,169,110,0.3)', borderRadius: 999,
                      padding: '4px 10px',
                      fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 800, color: '#C9A96E',
                    }}>
                      {s.n}
                    </div>
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(15,15,15,0.25)' }} />
                  </>
                )}
              </div>
            )
          })}


          {/* Bottom gradient */}
          {/* <div style={{
            position: 'absolute', bottom: 0, left: 0, width: '60%', zIndex: 6,
            padding: '48px 28px 24px',
            background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)',
            pointerEvents: 'none',
          }}>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.55)', margin: 0 }}>
              {step.title}
            </p>
          </div> */}
        </div>
      </div>

      <style>{`
        @keyframes hww-fill {
          from { width: 0% }
          to   { width: 100% }
        }
        @media (max-width: 860px) {
          .hww-root { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}

'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const DELAY = 15000

const STEPS = [
  {
    n: '01',
    title: 'Заявка и расчёт',
    desc: 'Оставляете заявку — перезваниваем в течение 15 минут, обсуждаем задачу и считаем предварительную смету.',
    img: '/images/projects/midi.webp',
  },
  {
    n: '02',
    title: 'Договор',
    desc: 'Фиксируем цену, сроки и технические характеристики в договоре. Никаких скрытых платежей.',
    img: '/images/projects/alpha-3.webp',
  },
  {
    n: '03',
    title: 'Фундамент и коробка',
    desc: 'Заливаем фундамент, возводим стены и кровлю. Присылаем фото-отчёт раз в неделю.',
    img: '/images/projects/alpha-1.webp',
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
    desc: 'Подписываем акт приёма-передачи и вручаем ключи. Гарантия на дом — 6 месяцев.',
    img: '/images/projects/mini.webp',
  },
]

// Базовый бокс (геометрия "main") — одинаковый для всех слотов, никогда не меняется.
// Разное положение каждой стадии задаётся исключительно через transform (GPU, без reflow),
// поэтому объект в фокусе никогда не пересчитывает object-fit: cover на лету.
const BASE_BOX = { top: '15px', left: 0, width: '60%', bottom: '15px' }

// Стадии: 0 — главное фото, 1/2 — «peek»-карточки, 3/4 — скрыты за кадром (ждут своей очереди).
const STAGES = [
  { x: '0%',   y: '0%',   sx: 1,    sy: 1,    zIndex: 5, opacity: 1,   radius: 10 },
  { x: '75%',  y: '3%',   sx: 0.5,  sy: 0.87, zIndex: 4, opacity: 1,   radius: 10 },
  { x: '105%', y: '12%',  sx: 0.4,  sy: 0.72, zIndex: 3, opacity: 0.9, radius: 10 },
  { x: '130%', y: '18%',  sx: 0.35, sy: 0.6,  zIndex: 2, opacity: 0,   radius: 10 },
  { x: '150%', y: '24%',  sx: 0.3,  sy: 0.5,  zIndex: 1, opacity: 0,   radius: 10 },
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
  }, [active])

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
        <div className="hww-gallery" style={{ position: 'relative', overflow: 'hidden' }}>
          {/* Отдельный контейнер-обёртка: абсолютные дети считают проценты от НЕГО,
              а не от .hww-gallery — реальный margin здесь реально подожмёт стек внутрь на мобильном
              (в отличие от padding на родителе, который position:absolute дети просто игнорируют). */}
          <div className="hww-gallery-inner" style={{ position: 'relative', height: '100%' }}>
          {STEPS.map((s, i) => {
            const offset = (i - active + STEPS.length) % STEPS.length
            const stage = STAGES[offset]
            const isPeek = offset > 0 && offset < 3
            return (
              <div
                key={s.img}
                className={`hww-stage-${offset}`}
                onClick={isPeek ? () => go(i) : undefined}
                style={{
                  position: 'absolute',
                  ...BASE_BOX,
                  zIndex: stage.zIndex, borderRadius: stage.radius,
                  overflow: 'hidden', opacity: stage.opacity,
                  cursor: isPeek ? 'pointer' : 'default',
                  pointerEvents: offset >= 3 ? 'none' : 'auto',
                  transformOrigin: '0 0',
                  transform: `translate(${stage.x}, ${stage.y}) scale(${stage.sx}, ${stage.sy})`,
                  transition: 'transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.7s ease',
                  boxShadow: offset === 0 ? 'none' : '0 8px 32px rgba(0,0,0,0.45)',
                }}
              >
                <Image src={s.img} alt={s.title} fill
                  sizes="(max-width: 768px) 100vw, 60vw"
                  style={{ objectFit: 'cover', display: 'block' }}
                  priority={i === 0}
                />
                {isPeek && (
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
          </div>

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
          /* В 1-колоночной раскладке грид больше не задаёт высоту этой ячейке —
             все фото внутри position:absolute и без явной высоты контейнер схлопывается. */
          .hww-gallery { min-height: 360px; }
          /* Реальный margin (не padding — абсолютные дети его игнорируют) поджимает весь стек внутрь. */
          .hww-gallery-inner { margin: 0 24px; }
          /* На мобильном показываем только главное фото + один "peek", третье прячем — не помещается. */
          .hww-stage-2 { display: none !important; }
          /* BASE_BOX.left=0 центрирует раскладку только на десктопе рядом с peek-карточками;
             на мобильном 60%-ширины фото нужно центрировать вручную: (100% - 60%) / 2 = 20%. */
          .hww-stage-0 { left: 20% !important; }
          /* Peek-карточку сдвигаем на ту же величину (20% контейнера = 33.3% её локального бокса),
             иначе после центрирования главного фото она полностью прячется под ним. */
          .hww-stage-1 { transform: translate(108%, 3%) scale(0.5, 0.87) !important; }
        }
        @media (max-width: 480px) {
          .hww-gallery { min-height: 280px; }
        }
      `}</style>
    </>
  )
}

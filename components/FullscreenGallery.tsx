'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { GalleryImage } from '@/data/houseConfigurator'

const SWIPE_COMMIT_RATIO = 0.22
const SPRING_TRANSITION = 'transform 320ms cubic-bezier(0.22, 1, 0.36, 1)'

export default function FullscreenGallery({ images }: { images: GalleryImage[] }) {
  const [index, setIndex] = useState(0)
  const [offset, setOffset] = useState(0)
  const [transitionOn, setTransitionOn] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef<{ x: number; y: number; width: number; locked: 'x' | 'y' | null } | null>(null)
  const animatingRef = useRef(false)
  const commitDirRef = useRef(0)

  const hasPrev = index > 0
  const hasNext = index < images.length - 1

  const animateTo = (target: number, dir: number) => {
    animatingRef.current = true
    commitDirRef.current = dir
    setTransitionOn(true)
    // Двойной rAF: даём браузеру отрисовать кадр с уже включённым transition,
    // прежде чем менять offset — иначе из состояния покоя (transition: none)
    // transform может примениться мгновенно, без анимации.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setOffset(target)
      })
    })
  }

  const prev = () => {
    if (!hasPrev || animatingRef.current) return
    animateTo(containerRef.current?.clientWidth || window.innerWidth, -1)
  }
  const next = () => {
    if (!hasNext || animatingRef.current) return
    animateTo(-(containerRef.current?.clientWidth || window.innerWidth), 1)
  }

  const handleTransitionEnd = () => {
    if (!transitionOn) return
    const dir = commitDirRef.current
    setTransitionOn(false)
    if (dir !== 0) {
      setIndex((i) => i + dir)
    }
    setOffset(0)
    commitDirRef.current = 0
    animatingRef.current = false
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    if (animatingRef.current) return
    const t = e.touches[0]
    dragRef.current = {
      x: t.clientX, y: t.clientY,
      width: containerRef.current?.clientWidth || window.innerWidth,
      locked: null,
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    const drag = dragRef.current
    if (!drag) return
    const t = e.touches[0]
    const dx = t.clientX - drag.x
    const dy = t.clientY - drag.y

    if (!drag.locked) {
      if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return
      drag.locked = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y'
    }
    if (drag.locked !== 'x') return

    let next = dx
    if ((next < 0 && !hasNext) || (next > 0 && !hasPrev)) next *= 0.35
    setTransitionOn(false)
    setOffset(next)
  }

  const handleTouchEnd = () => {
    const drag = dragRef.current
    dragRef.current = null
    if (!drag || drag.locked !== 'x') {
      if (offset !== 0) { setTransitionOn(true); setOffset(0) }
      return
    }
    const width = drag.width
    const passed = Math.abs(offset) > width * SWIPE_COMMIT_RATIO
    if (passed && offset < 0 && hasNext) animateTo(-width, 1)
    else if (passed && offset > 0 && hasPrev) animateTo(width, -1)
    else { setTransitionOn(true); setOffset(0) }
  }

  return (
    <div
      ref={containerRef}
      className="fs-gallery"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ position: 'relative', width: '100%', height: 'min(100vh, 56.25vw)', background: '#111', overflow: 'hidden', touchAction: 'pan-y' }}
    >
      {images.map((img, i) => {
        const diff = i - index
        if (Math.abs(diff) > 1) return null
        return (
          <div
            key={i}
            onTransitionEnd={diff === 0 ? handleTransitionEnd : undefined}
            style={{
              position: 'absolute',
              inset: 0,
              transform: `translateX(calc(${diff * 100}% + ${offset}px))`,
              transition: transitionOn ? SPRING_TRANSITION : 'none',
              pointerEvents: 'none',
            }}
          >
            {img.src ? (
              img.portrait ? (
                <>
                  {/* Размытый фон-подложка — заполняет letterbox по бокам вертикального кадра */}
                  <Image
                    src={img.src} alt="" aria-hidden fill sizes="100vw" quality={60}
                    style={{ objectFit: 'cover', filter: 'blur(30px) brightness(0.55)', transform: 'scale(1.15)' }}
                    priority={i === 0}
                  />
                  <Image
                    src={img.src} alt={img.label} fill sizes="100vw" quality={90}
                    style={{ objectFit: 'contain' }}
                    priority={i === 0}
                  />
                </>
              ) : (
                <Image src={img.src} alt={img.label} fill sizes="100vw" quality={90} className="fs-gallery-img" style={{ objectFit: 'cover' }} priority={i === 0} />
              )
            ) : (
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#242424' }}>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: 16, color: 'rgba(255,255,255,0.25)' }}>
                  {img.label}
                </span>
              </div>
            )}
          </div>
        )
      })}

      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 70%, rgba(0,0,0,0.35) 100%)', pointerEvents: 'none' }} />

      {/* сшивка с фоном страницы сверху и снизу */}
      <div className="fs-gallery-stitch" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 140, background: 'linear-gradient(to bottom, #242424 0%, rgba(36,36,36,0) 100%)', pointerEvents: 'none' }} />
      <div className="fs-gallery-stitch" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 140, background: 'linear-gradient(to bottom, rgba(36,36,36,0) 0%, #242424 100%)', pointerEvents: 'none' }} />

      {hasPrev && (
        <button onClick={prev} aria-label="Предыдущее изображение" className="fs-gallery-arrow" style={{ ...arrowSt, left: 24 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      )}
      {hasNext && (
        <button onClick={next} aria-label="Следующее изображение" className="fs-gallery-arrow" style={{ ...arrowSt, right: 24 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      )}

      <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8 }}>
        {images.map((_, i) => (
          <span
            key={i}
            style={{
              width: i === index ? 24 : 8,
              height: 4,
              borderRadius: 999,
              background: i === index ? '#C9A96E' : 'rgba(255,255,255,0.3)',
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </div>

      <span style={{ position: 'absolute', bottom: 32, right: 32, fontFamily: 'var(--font-mono)', fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>
        {index + 1} / {images.length}
      </span>

      <style>{`
        @media (max-width: 640px) {
          .fs-gallery {
            height: auto !important;
            aspect-ratio: 4 / 3 !important;
          }
          .fs-gallery-img { object-position: center 42% !important; }
          .fs-gallery-stitch { height: 56px !important; }
          .fs-gallery-arrow { width: 40px !important; height: 40px !important; }
        }
      `}</style>
    </div>
  )
}

const arrowSt: React.CSSProperties = {
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  width: 52,
  height: 52,
  borderRadius: '50%',
  border: '1px solid rgba(255,255,255,0.25)',
  background: 'rgba(0,0,0,0.35)',
  backdropFilter: 'blur(6px)',
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  zIndex: 1,
}

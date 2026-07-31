'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

interface GalleryItem {
  src: string
  alt: string
}

interface Props {
  images: GalleryItem[]
  index: number
  onClose: () => void
  onIndexChange: (index: number) => void
}

const ZOOM = 2.4
const MAX_SCALE = 4
const SWIPE_THRESHOLD = 40
const SPRING_TRANSITION = 'transform 320ms cubic-bezier(0.22, 1, 0.36, 1)'

export default function ImageLightbox({ images, index, onClose, onIndexChange }: Props) {
  const [scale, setScale] = useState(1)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const zoomed = scale > 1.01
  const [transitionOn, setTransitionOn] = useState(false)
  const [prevIndex, setPrevIndex] = useState(index)
  if (prevIndex !== index) {
    setPrevIndex(index)
    setScale(1)
    setPos({ x: 0, y: 0 })
  }
  const containerRef = useRef<HTMLDivElement>(null)

  const dragRef = useRef<{ x: number; y: number; locked: 'x' | 'y' | null } | null>(null)
  const pinchRef = useRef<{ startDist: number; startScale: number; anchor: { x: number; y: number } } | null>(null)
  const panRef = useRef<{ x: number; y: number; posX: number; posY: number } | null>(null)

  const getCenter = () => {
    const rect = containerRef.current!.getBoundingClientRect()
    return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
  }
  const touchDist = (touches: React.TouchList) =>
    Math.max(1, Math.hypot(touches[1].clientX - touches[0].clientX, touches[1].clientY - touches[0].clientY))
  const touchMid = (touches: React.TouchList) => ({
    x: (touches[0].clientX + touches[1].clientX) / 2,
    y: (touches[0].clientY + touches[1].clientY) / 2,
  })

  const hasPrev = index > 0
  const hasNext = index < images.length - 1

  const goPrev = () => { if (hasPrev && !zoomed) onIndexChange(index - 1) }
  const goNext = () => { if (hasNext && !zoomed) onIndexChange(index + 1) }

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const header = document.querySelector('header')
    if (header) header.style.visibility = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      if (header) header.style.visibility = ''
      window.removeEventListener('keydown', onKey)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onClose, index, images.length, zoomed])

  const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    e.stopPropagation()
    setTransitionOn(true)
    if (zoomed) {
      setScale(1)
      setPos({ x: 0, y: 0 })
      return
    }
    const C = getCenter()
    const anchorX = e.clientX - C.x
    const anchorY = e.clientY - C.y
    setScale(ZOOM)
    setPos({ x: anchorX * (1 - ZOOM), y: anchorY * (1 - ZOOM) })
  }

  // Два пальца — pinch-to-zoom; один палец на увеличенном фото — панорамирование;
  // один палец на обычном фото — свайп для перехода (без слежения, просто по порогу).
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      dragRef.current = null
      const C = getCenter()
      const mid = touchMid(e.touches)
      pinchRef.current = {
        startDist: touchDist(e.touches),
        startScale: scale,
        anchor: { x: (mid.x - C.x - pos.x) / scale, y: (mid.y - C.y - pos.y) / scale },
      }
      setTransitionOn(false)
      return
    }
    if (zoomed) {
      const t = e.touches[0]
      panRef.current = { x: t.clientX, y: t.clientY, posX: pos.x, posY: pos.y }
      setTransitionOn(false)
      return
    }
    const t = e.touches[0]
    dragRef.current = { x: t.clientX, y: t.clientY, locked: null }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && pinchRef.current) {
      const { startDist, startScale, anchor } = pinchRef.current
      const newScale = Math.min(MAX_SCALE, Math.max(1, startScale * (touchDist(e.touches) / startDist)))
      const C = getCenter()
      const mid = touchMid(e.touches)
      setScale(newScale)
      setPos({ x: mid.x - C.x - anchor.x * newScale, y: mid.y - C.y - anchor.y * newScale })
      return
    }
    if (panRef.current) {
      const t = e.touches[0]
      setPos({ x: panRef.current.posX + (t.clientX - panRef.current.x), y: panRef.current.posY + (t.clientY - panRef.current.y) })
      return
    }
    const drag = dragRef.current
    if (!drag || drag.locked || zoomed) return
    const t = e.touches[0]
    const dx = t.clientX - drag.x
    const dy = t.clientY - drag.y
    if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return
    drag.locked = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y'
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (pinchRef.current) {
      pinchRef.current = null
      if (e.touches.length === 1) {
        const t = e.touches[0]
        panRef.current = { x: t.clientX, y: t.clientY, posX: pos.x, posY: pos.y }
      } else if (scale < 1.05) {
        setTransitionOn(true)
        setScale(1)
        setPos({ x: 0, y: 0 })
      }
      return
    }
    if (panRef.current) {
      panRef.current = null
      return
    }
    const drag = dragRef.current
    dragRef.current = null
    if (!drag || drag.locked !== 'x' || zoomed) return
    const dx = e.changedTouches[0].clientX - drag.x
    if (dx <= -SWIPE_THRESHOLD) goNext()
    else if (dx >= SWIPE_THRESHOLD) goPrev()
  }

  return createPortal(
    <div
      ref={containerRef}
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 21000,
        background: '#101010',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        overscrollBehavior: 'contain',
        touchAction: 'none',
        cursor: zoomed ? 'zoom-out' : 'zoom-in',
      }}
    >
      <button
        onClick={(e) => { e.stopPropagation(); onClose() }}
        aria-label="Закрыть"
        style={{
          position: 'fixed',
          top: 24,
          right: 24,
          zIndex: 1,
          width: 44,
          height: 44,
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.25)',
          background: 'rgba(0,0,0,0.4)',
          color: '#fff',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      {images.length > 1 && !zoomed && (
        <>
          {hasPrev && (
            <button
              onClick={(e) => { e.stopPropagation(); goPrev() }}
              aria-label="Предыдущее фото"
              className="lightbox-nav-btn"
              style={{ left: 16 }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          )}
          {hasNext && (
            <button
              onClick={(e) => { e.stopPropagation(); goNext() }}
              aria-label="Следующее фото"
              className="lightbox-nav-btn"
              style={{ right: 16 }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
          )}
        </>
      )}

      {images.length > 1 && (
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            position: 'fixed', bottom: 20, left: '50%', transform: 'translateX(-50%)',
            zIndex: 1, fontFamily: 'var(--font-sans)', fontSize: 13,
            color: 'rgba(255,255,255,0.6)', background: 'rgba(0,0,0,0.4)',
            padding: '6px 14px', borderRadius: 999,
          }}
        >
          {index + 1} / {images.length}
        </div>
      )}

      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        {images.map((img, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              inset: 0,
              opacity: i === index ? 1 : 0,
              transition: 'opacity 0.6s ease',
              pointerEvents: i === index ? 'auto' : 'none',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- открывается по клику, не влияет на LCP; next/image не поддерживает pinch-zoom до 4x */}
            <img
              src={img.src}
              alt={img.alt}
              loading={i === index ? 'eager' : 'lazy'}
              onClick={i === index ? handleImageClick : undefined}
              style={{
                position: 'absolute', inset: 0, margin: 'auto',
                maxWidth: '92vw', maxHeight: '92vh', width: 'auto',
                transform: i === index ? `translate(${pos.x}px, ${pos.y}px) scale(${scale})` : 'none',
                transformOrigin: 'center center',
                transition: i === index && transitionOn ? SPRING_TRANSITION : 'none',
                background: '#f5f3ef', borderRadius: 4,
              }}
            />
          </div>
        ))}
      </div>

      <style>{`
        .lightbox-nav-btn {
          position: fixed;
          top: 50%;
          transform: translateY(-50%);
          z-index: 1;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.25);
          background: rgba(0,0,0,0.4);
          color: #fff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </div>,
    document.body
  )
}

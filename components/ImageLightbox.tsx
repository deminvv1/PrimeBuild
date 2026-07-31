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
const SWIPE_COMMIT_RATIO = 0.22
const SPRING_TRANSITION = 'transform 320ms cubic-bezier(0.22, 1, 0.36, 1)'

export default function ImageLightbox({ images, index, onClose, onIndexChange }: Props) {
  const [zoomed, setZoomed] = useState(false)
  const [offset, setOffset] = useState(0)
  const [transitionOn, setTransitionOn] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const clickFraction = useRef({ x: 0.5, y: 0.5 })

  const dragRef = useRef<{ x: number; y: number; width: number; locked: 'x' | 'y' | null } | null>(null)
  const animatingRef = useRef(false)
  const commitDirRef = useRef(0)

  const { src, alt } = images[index]
  const hasPrev = index > 0
  const hasNext = index < images.length - 1
  const swipeDir = offset < 0 ? 1 : offset > 0 ? -1 : 0 // 1 = к следующему, -1 = к предыдущему
  const neighborIndex = swipeDir === 1 ? index + 1 : swipeDir === -1 ? index - 1 : -1
  const neighbor = neighborIndex >= 0 && neighborIndex < images.length ? images[neighborIndex] : null

  const animateTo = (target: number, dir: number) => {
    if (offset === target) {
      // уже там (например, отпустили ровно на пороге) — коммитим сразу, transitionend не наступит
      onIndexChange(index + dir)
      setOffset(0)
      return
    }
    animatingRef.current = true
    commitDirRef.current = dir
    setTransitionOn(true)
    setOffset(target)
  }

  const goPrev = () => {
    if (!hasPrev || animatingRef.current || zoomed) return
    animateTo(dragRef.current?.width || containerRef.current?.clientWidth || window.innerWidth, -1)
  }
  const goNext = () => {
    if (!hasNext || animatingRef.current || zoomed) return
    animateTo(-(dragRef.current?.width || containerRef.current?.clientWidth || window.innerWidth), 1)
  }

  const handleTrackTransitionEnd = () => {
    if (!transitionOn) return
    const dir = commitDirRef.current
    setTransitionOn(false)
    if (dir !== 0) {
      onIndexChange(index + dir)
    }
    setOffset(0)
    commitDirRef.current = 0
    animatingRef.current = false
  }

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

  // После включения зума — скроллим так, чтобы точка клика оказалась там же, где был курсор
  useEffect(() => {
    if (!zoomed) return
    const container = containerRef.current
    const img = imgRef.current
    if (!container || !img) return
    const { x: fx, y: fy } = clickFraction.current
    // ждём применения нового размера картинки
    requestAnimationFrame(() => {
      const targetX = img.offsetWidth * fx - container.clientWidth / 2
      const targetY = img.offsetHeight * fy - container.clientHeight / 2
      container.scrollLeft = Math.max(0, targetX)
      container.scrollTop = Math.max(0, targetY)
    })
  }, [zoomed])

  const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    e.stopPropagation()
    if (zoomed) {
      setZoomed(false)
      return
    }
    const rect = e.currentTarget.getBoundingClientRect()
    clickFraction.current = {
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    }
    setZoomed(true)
  }

  // Свайп для перехода между фото — только когда изображение не увеличено
  // (в увеличенном состоянии тем же жестом скроллим по картинке).
  const handleTouchStart = (e: React.TouchEvent) => {
    if (zoomed || animatingRef.current) return
    const t = e.touches[0]
    dragRef.current = {
      x: t.clientX, y: t.clientY,
      width: containerRef.current?.clientWidth || window.innerWidth,
      locked: null,
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    const drag = dragRef.current
    if (!drag || zoomed) return
    const t = e.touches[0]
    const dx = t.clientX - drag.x
    const dy = t.clientY - drag.y

    if (!drag.locked) {
      if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return
      drag.locked = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y'
    }
    if (drag.locked !== 'x') return

    let next = dx
    // упругое сопротивление на краях галереи, если дальше листать некуда
    if ((next < 0 && !hasNext) || (next > 0 && !hasPrev)) next *= 0.35
    setTransitionOn(false)
    setOffset(next)
  }

  const handleTouchEnd = () => {
    const drag = dragRef.current
    dragRef.current = null
    if (!drag || zoomed || drag.locked !== 'x') {
      if (offset !== 0) { setTransitionOn(true); setOffset(0) }
      return
    }
    const width = drag.width
    const passed = Math.abs(offset) > width * SWIPE_COMMIT_RATIO
    if (passed && offset < 0 && hasNext) animateTo(-width, 1)
    else if (passed && offset > 0 && hasPrev) animateTo(width, -1)
    else { setTransitionOn(true); setOffset(0) }
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
        alignItems: zoomed ? 'flex-start' : 'center',
        justifyContent: zoomed ? 'flex-start' : 'center',
        overflow: zoomed ? 'auto' : 'hidden',
        overscrollBehavior: 'contain',
        WebkitOverflowScrolling: 'touch',
        touchAction: zoomed ? 'pan-x pan-y' : 'pan-y',
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

      {!zoomed ? (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- открывается по клику, не влияет на LCP */}
          <img
            ref={imgRef}
            src={src}
            alt={alt}
            onClick={handleImageClick}
            onTransitionEnd={handleTrackTransitionEnd}
            style={{
              position: 'absolute', inset: 0, margin: 'auto',
              maxWidth: '92vw', maxHeight: '92vh', width: 'auto',
              transform: `translateX(${offset}px)`,
              transition: transitionOn ? SPRING_TRANSITION : 'none',
              background: '#f5f3ef', borderRadius: 4,
            }}
          />
          {neighbor && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={neighbor.src}
              alt={neighbor.alt}
              style={{
                position: 'absolute', inset: 0, margin: 'auto',
                maxWidth: '92vw', maxHeight: '92vh', width: 'auto',
                transform: `translateX(${offset + swipeDir * (dragRef.current?.width || containerRef.current?.clientWidth || window.innerWidth)}px)`,
                transition: transitionOn ? SPRING_TRANSITION : 'none',
                background: '#f5f3ef', borderRadius: 4,
                pointerEvents: 'none',
              }}
            />
          )}
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element -- открывается по клику, не влияет на LCP; next/image не поддерживает натуральный размер + zoom до 240%
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          onClick={handleImageClick}
          style={{
            flexShrink: 0,
            maxWidth: 'none',
            maxHeight: 'none',
            width: `${ZOOM * 100}%`,
            margin: 0,
            background: '#f5f3ef',
            borderRadius: 4,
          }}
        />
      )}

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

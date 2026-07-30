'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

interface Props {
  src: string
  alt: string
  onClose: () => void
}

const ZOOM = 2.4

export default function ImageLightbox({ src, alt, onClose }: Props) {
  const [zoomed, setZoomed] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const clickFraction = useRef({ x: 0.5, y: 0.5 })

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const header = document.querySelector('header')
    if (header) header.style.visibility = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      if (header) header.style.visibility = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

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

  return createPortal(
    <div
      ref={containerRef}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 21000,
        background: '#101010',
        display: 'flex',
        alignItems: zoomed ? 'flex-start' : 'center',
        justifyContent: zoomed ? 'flex-start' : 'center',
        overflow: 'auto',
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

      {/* eslint-disable-next-line @next/next/no-img-element -- открывается по клику, не влияет на LCP; next/image не поддерживает натуральный размер + zoom до 240% */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        onClick={handleImageClick}
        style={{
          flexShrink: 0,
          maxWidth: zoomed ? 'none' : '92vw',
          maxHeight: zoomed ? 'none' : '92vh',
          width: zoomed ? `${ZOOM * 100}%` : 'auto',
          margin: zoomed ? 0 : 'auto',
          transition: 'width 0.3s ease, max-width 0.3s ease, max-height 0.3s ease',
          background: '#f5f3ef',
          borderRadius: 4,
        }}
      />
    </div>,
    document.body
  )
}

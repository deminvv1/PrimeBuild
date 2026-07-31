'use client'

import { useState } from 'react'
import Image from 'next/image'
import { GalleryImage } from '@/data/houseConfigurator'

export default function FullscreenGallery({ images }: { images: GalleryImage[] }) {
  const [index, setIndex] = useState(0)

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length)
  const next = () => setIndex((i) => (i + 1) % images.length)

  return (
    <div className="fs-gallery" style={{ position: 'relative', width: '100%', height: '100vh', background: '#111', overflow: 'hidden' }}>
      {images.map((img, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            inset: 0,
            opacity: i === index ? 1 : 0,
            transition: 'opacity 0.9s ease',
            pointerEvents: 'none',
          }}
        >
          {img.src ? (
            <Image src={img.src} alt={img.label} fill sizes="100vw" quality={90} className="fs-gallery-img" style={{ objectFit: 'cover' }} priority={i === 0} />
          ) : (
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#242424' }}>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: 16, color: 'rgba(255,255,255,0.25)' }}>
                {img.label}
              </span>
            </div>
          )}
        </div>
      ))}

      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 70%, rgba(0,0,0,0.35) 100%)' }} />

      {/* сшивка с фоном страницы сверху и снизу */}
      <div className="fs-gallery-stitch" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 140, background: 'linear-gradient(to bottom, #242424 0%, rgba(36,36,36,0) 100%)', pointerEvents: 'none' }} />
      <div className="fs-gallery-stitch" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 140, background: 'linear-gradient(to bottom, rgba(36,36,36,0) 0%, #242424 100%)', pointerEvents: 'none' }} />

      <button onClick={prev} aria-label="Предыдущее изображение" className="fs-gallery-arrow" style={{ ...arrowSt, left: 24 }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <button onClick={next} aria-label="Следующее изображение" className="fs-gallery-arrow" style={{ ...arrowSt, right: 24 }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

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

'use client'

import { useEffect, useState } from 'react'
import TileWipe, { TilePhase, TILE_WIPE_MS } from './TileWipe'

const DURATION = 1400

export default function Preloader() {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState<TilePhase>('covered')

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const start = performance.now()

    let raf: number
    const tick = (now: number) => {
      const elapsed = now - start
      const pct = Math.min(100, Math.round((elapsed / DURATION) * 100))
      setProgress(pct)
      if (pct < 100) {
        raf = requestAnimationFrame(tick)
      } else {
        document.body.style.overflow = ''
        window.dispatchEvent(new CustomEvent('preloader:done'))
        setPhase('out')
        setTimeout(() => setPhase('hidden'), TILE_WIPE_MS)
      }
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <TileWipe phase={phase}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <svg className="preloader-mark" width="88" height="88" viewBox="0 0 48 48" style={{ marginBottom: 26 }}>
          <defs>
            <linearGradient id="preloader-gold" x1="0.2" y1="0" x2="0.8" y2="1">
              <stop offset="0%" stopColor="#D9B96A" />
              <stop offset="45%" stopColor="#C9A96E" />
              <stop offset="100%" stopColor="#A87E3A" />
            </linearGradient>
          </defs>
          {/* Силуэт крыши, складывающийся в букву B — фирменный знак BuildX */}
          <path d="M8 32 L16.5 10 L25 32" stroke="url(#preloader-gold)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M25 32 C25 20 28.5 11 36 11 C43 11 45 19 43 25 C41 30 35.5 32 29 32" stroke="url(#preloader-gold)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M8 32 L42 32" stroke="url(#preloader-gold)" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          <rect x="19.5" y="36" width="4" height="4" fill="url(#preloader-gold)" />
          <rect x="26" y="36" width="4" height="4" fill="url(#preloader-gold)" />
        </svg>

        <div className="preloader-label" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
          <div style={{ position: 'relative', width: 120, height: 1, background: 'rgba(255,255,255,0.1)' }}>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #A87E3A, #C9A96E)',
                transition: 'width 0.1s linear',
              }}
            />
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '1.5px', color: 'rgba(255,255,255,0.35)' }}>
            {progress}%
          </span>
        </div>
      </div>
    </TileWipe>
  )
}

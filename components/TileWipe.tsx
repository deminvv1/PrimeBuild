'use client'

import { useEffect, useState } from 'react'

const COLS = 8
const ROWS = 5
const STEP = 0.05
const DURATION = 0.65

export type TilePhase = 'hidden' | 'in' | 'covered' | 'out'

/** Суммарная длительность волны в мс — держим синхронно с STEP/DURATION выше. */
export const TILE_WIPE_MS = Math.round(((COLS + ROWS - 2) * STEP + DURATION) * 1000)

export default function TileWipe({ phase, children }: { phase: TilePhase; children?: React.ReactNode }) {
  const [entered, setEntered] = useState(false)
  const isHidden = phase === 'hidden'

  useEffect(() => {
    if (isHidden) {
      setEntered(false)
      return
    }
    const raf = requestAnimationFrame(() => setEntered(true))
    return () => cancelAnimationFrame(raf)
  }, [isHidden])

  if (isHidden) return null

  // "covered" без предварительного "in" — это стартовое состояние (например,
  // прелоадер сразу закрыт при монтировании), рисуем его без анимации входа.
  const covering = phase === 'covered' || (phase === 'in' && entered)

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 19000,
        display: 'grid',
        gridTemplateColumns: `repeat(${COLS}, 1fr)`,
        gridTemplateRows: `repeat(${ROWS}, 1fr)`,
        pointerEvents: covering ? 'auto' : 'none',
      }}
    >
      {Array.from({ length: COLS * ROWS }).map((_, i) => {
        const col = i % COLS
        const row = Math.floor(i / COLS)
        const dist = phase === 'out' ? COLS + ROWS - 2 - (col + row) : col + row
        const delay = dist * STEP
        return (
          <div
            key={i}
            style={{
              background: '#1a1a1a',
              transform: covering ? 'scale(1)' : 'scale(0)',
              transition: `transform ${DURATION}s cubic-bezier(0.65, 0, 0.35, 1) ${delay}s`,
              transformOrigin: 'center',
            }}
          />
        )
      })}

      {children && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: covering ? 1 : 0,
            transition: 'opacity 0.3s ease',
            pointerEvents: 'none',
          }}
        >
          {children}
        </div>
      )}
    </div>
  )
}

'use client'

import { useEffect, useRef } from 'react'

interface Props {
  left: string | number
  delay?: number
  color?: string
  threshold?: number
}

export default function VerticalRevealLine({
  left,
  delay = 0,
  color = 'rgba(255,255,255,0.18)',
  threshold = 0.4,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            if (el) el.style.transform = 'scaleY(1)'
          }, delay)
          observer.disconnect()
        }
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left,
        width: 1,
        background: color,
        transform: 'scaleY(0)',
        transformOrigin: 'top',
        transition: 'transform 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}

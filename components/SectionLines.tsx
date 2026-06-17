'use client'

import { useEffect, useRef } from 'react'

interface Props {
  color?: string
  delay?: number
  offset?: number
  threshold?: number
}

export default function SectionLines({
  color = 'rgba(255,255,255,0.18)',
  delay = 0,
  offset = 24,
  threshold = 0.4,
}: Props) {
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = triggerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            if (leftRef.current) leftRef.current.style.transform = 'scaleY(1)'
            if (rightRef.current) rightRef.current.style.transform = 'scaleY(1)'
          }, delay)
          observer.disconnect()
        }
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [delay, threshold])

  const line: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 1,
    background: color,
    transform: 'scaleY(0)',
    transformOrigin: 'top',
    transition: 'transform 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
    pointerEvents: 'none',
  }

  return (
    <div
      ref={triggerRef}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}
    >
      <div ref={leftRef} style={{ ...line, left: offset }} />
      <div ref={rightRef} style={{ ...line, right: offset }} />
    </div>
  )
}

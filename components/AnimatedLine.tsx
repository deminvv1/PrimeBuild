'use client'

import { useEffect, useRef } from 'react'

interface Props {
  direction?: 'horizontal' | 'vertical'
  length?: string | number
  color?: string
  delay?: number
  thickness?: number
  threshold?: number
  className?: string
}

export default function AnimatedLine({
  direction = 'horizontal',
  length = '100%',
  color = 'rgba(255,255,255,0.12)',
  delay = 0,
  thickness = 1,
  threshold = 0.01,
  className,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            if (el) el.style.transform = direction === 'horizontal' ? 'scaleX(1)' : 'scaleY(1)'
          }, delay)
          observer.disconnect()
        }
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [delay, direction, threshold])

  if (direction === 'vertical') {
    return (
      <div
        ref={ref}
        className={className}
        style={{
          width: thickness,
          height: typeof length === 'number' ? length : length,
          background: color,
          transform: 'scaleY(0)',
          transformOrigin: 'top',
          transition: 'transform 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
          flexShrink: 0,
          alignSelf: 'stretch',
        }}
      />
    )
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        width: typeof length === 'number' ? length : length,
        height: thickness,
        background: color,
        transform: 'scaleX(0)',
        transformOrigin: 'left',
        transition: 'transform 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    />
  )
}

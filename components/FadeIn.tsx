'use client'

import { useEffect, useRef } from 'react'

interface Props {
  children: React.ReactNode
  delay?: number
  threshold?: number
  style?: React.CSSProperties
  className?: string
}

export default function FadeIn({
  children,
  delay = 0,
  threshold = 0.01,
  style,
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
            if (el) {
              el.style.opacity = '1'
              el.style.transform = 'translateY(0)'
            }
          }, delay)
          observer.disconnect()
        }
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [delay, threshold])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: 0,
        transform: 'translateY(20px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
        ...style,
      }}
    >
      {children}
    </div>
  )
}

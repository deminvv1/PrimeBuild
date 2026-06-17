'use client'

import { useEffect, useRef } from 'react'

export default function ScrollLines() {
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const maxHeight = window.innerHeight - 72

    const update = () => {
      const progress = Math.min(window.scrollY / 600, 1)
      const height = progress * maxHeight

      if (leftRef.current) leftRef.current.style.height = `${height}px`
      if (rightRef.current) rightRef.current.style.height = `${height}px`
    }

    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', () => {
      const h = window.innerHeight - 72
      const progress = Math.min(window.scrollY / 600, 1)
      if (leftRef.current) leftRef.current.style.height = `${progress * h}px`
      if (rightRef.current) rightRef.current.style.height = `${progress * h}px`
    })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])

  const line: React.CSSProperties = {
    position: 'fixed',
    top: 72,
    width: 1,
    height: 0,
    background: 'rgba(255,255,255,0.15)',
    pointerEvents: 'none',
    zIndex: 400,
    transformOrigin: 'top',
    transition: 'height 0.1s linear',
  }

  return (
    <>
      <div ref={leftRef} style={{ ...line, left: 72 }} />
      <div ref={rightRef} style={{ ...line, right: 72 }} />
    </>
  )
}

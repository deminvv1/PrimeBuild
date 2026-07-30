'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const KEY = 'cookie_ok'
const T = '1.1s cubic-bezier(0.16, 1, 0.3, 1)'
const REVEAL_DELAY = 1400

export default function CookieBanner() {
  const [render, setRender] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (localStorage.getItem(KEY)) return
    // Рендерим null на сервере и при гидратации, чтобы не было hydration mismatch
    // (localStorage недоступен на сервере) — баннер сознательно появляется только после монтирования.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRender(true)

    let t: ReturnType<typeof setTimeout>
    const reveal = () => {
      clearTimeout(fallback)
      t = setTimeout(() => setVisible(true), REVEAL_DELAY)
    }

    window.addEventListener('preloader:done', reveal)
    // на случай, если прелоадер уже отработал до монтирования баннера
    const fallback = setTimeout(reveal, 2500)

    return () => {
      window.removeEventListener('preloader:done', reveal)
      clearTimeout(t)
      clearTimeout(fallback)
    }
  }, [])

  if (!render) return null

  const close = () => {
    setVisible(false)
    localStorage.setItem(KEY, '1')
    setTimeout(() => setRender(false), 1100)
  }

  return (
    <div style={{
      position: 'fixed', bottom: 8, zIndex: 10000,
      left: 'max(24px, calc(50% - 580px))', right: 'max(24px, calc(50% - 580px))',
      minHeight: 56,
      background: 'rgba(26,26,26,0.7)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 999,
      boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
      padding: '10px 24px',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexWrap: 'wrap', gap: 16,
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(40px)',
      transition: `opacity ${T}, transform ${T}`,
      pointerEvents: visible ? 'auto' : 'none',
    }}>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'rgba(255,255,255,0.65)', margin: 0, lineHeight: 1.5, textAlign: 'center' }}>
        Мы используем файлы cookie для улучшения работы сайта. Продолжая, вы соглашаетесь с{' '}
        <Link href="/privacy" style={{ color: '#C9A96E', textDecoration: 'underline' }}>политикой конфиденциальности</Link>.
      </p>
      <button onClick={close} style={{
        background: '#C9A96E', border: 'none', cursor: 'pointer',
        fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 700,
        letterSpacing: '0.8px', textTransform: 'uppercase', color: '#1a1a1a',
        padding: '10px 24px', borderRadius: 999, whiteSpace: 'nowrap',
      }}>
        Понятно
      </button>
    </div>
  )
}

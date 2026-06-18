'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const KEY = 'cookie_ok'

export default function CookieBanner() {
  const [show, setShow] = useState(false)
  useEffect(() => { if (!localStorage.getItem(KEY)) setShow(true) }, [])
  if (!show) return null

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 10000,
      background: '#fff', borderTop: '1px solid rgba(0,0,0,0.08)',
      boxShadow: '0 -4px 24px rgba(0,0,0,0.07)',
      padding: '16px 24px', display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', flexWrap: 'wrap', gap: 12,
    }}>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'rgba(26,26,26,0.6)', margin: 0, maxWidth: 700 }}>
        Мы используем файлы cookie для улучшения работы сайта. Продолжая, вы соглашаетесь с{' '}
        <Link href="/privacy" style={{ color: '#1a1a1a', textDecoration: 'underline' }}>политикой конфиденциальности</Link>.
      </p>
      <button onClick={() => { localStorage.setItem(KEY, '1'); setShow(false) }} style={{
        background: '#1a1a1a', border: 'none', cursor: 'pointer',
        fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 700,
        letterSpacing: '0.8px', textTransform: 'uppercase', color: '#fff',
        padding: '10px 24px', borderRadius: 999, whiteSpace: 'nowrap',
      }}>
        Понятно
      </button>
    </div>
  )
}

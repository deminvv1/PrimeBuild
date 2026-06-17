'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const PHONE = 'TODO: +7 (XXX) XXX-XX-XX'
const PHONE_HREF = 'tel:+7XXXXXXXXXX'

const NAV = [
  { label: 'Проекты', href: '/proekty' },
  { label: 'Калькулятор', href: '/kalkulyator' },
  { label: 'О компании', href: '/o-kompanii' },
  { label: 'Отзывы', href: '/otzyvy' },
  { label: 'Контакты', href: '/kontakty' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [pathname])

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9000,
      height: 72,
      background: scrolled ? 'rgba(30,30,30,0.97)' : '#242424',
      borderBottom: '1px solid rgba(255,255,255,0.07)',
      boxShadow: scrolled ? '0 2px 16px rgba(0,0,0,0.07)' : 'none',
      transition: 'box-shadow 0.3s',
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto', padding: '0 24px',
        height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>

        {/* Logo */}
        <Link href="/" style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
          <Image src="/images/logo.svg" alt="PrimeBuild" height={36} width={158} style={{ objectFit: 'contain', objectPosition: 'left' }} priority />
        </Link>

        {/* Desktop nav */}
        <nav className="hdr-nav" style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          {NAV.map(({ label, href }) => (
            <Link key={href} href={href} style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 14, fontWeight: 500,
              color: pathname === href ? '#C9A96E' : 'rgba(255,255,255,0.75)',
              transition: 'color 0.2s',
              opacity: pathname === href ? 1 : 0.75,
            }}>
              {label}
            </Link>
          ))}
        </nav>

        {/* Phone + CTA */}
        <div className="hdr-right" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <a href={PHONE_HREF} style={{
            fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 600,
            color: 'rgba(255,255,255,0.85)', whiteSpace: 'nowrap',
          }}>
            {PHONE}
          </a>
          <Link href="/kalkulyator" style={{
            background: '#C9A96E', color: '#1a1a1a',
            fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 700,
            letterSpacing: '0.8px', textTransform: 'uppercase',
            padding: '11px 22px', borderRadius: 4, whiteSpace: 'nowrap',
            transition: 'background 0.2s',
          }}>
            Рассчитать
          </Link>
        </div>

        {/* Mobile burger */}
        <button
          className="hdr-burger"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Меню"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, display: 'none' }}
        >
          <span style={{ display: 'block', width: 22, height: 2, background: 'rgba(255,255,255,0.85)', marginBottom: 5, transition: 'transform 0.2s', transform: menuOpen ? 'rotate(45deg) translate(5px,5px)' : 'none' }} />
          <span style={{ display: 'block', width: 22, height: 2, background: 'rgba(255,255,255,0.85)', marginBottom: 5, opacity: menuOpen ? 0 : 1, transition: 'opacity 0.2s' }} />
          <span style={{ display: 'block', width: 22, height: 2, background: 'rgba(255,255,255,0.85)', transition: 'transform 0.2s', transform: menuOpen ? 'rotate(-45deg) translate(5px,-5px)' : 'none' }} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: 'absolute', top: 72, left: 0, right: 0,
          background: '#242424', borderBottom: '1px solid rgba(255,255,255,0.07)',
          padding: '12px 24px 24px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
        }}>
          {NAV.map(({ label, href }) => (
            <Link key={href} href={href} style={{
              display: 'block', padding: '13px 0',
              fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 500,
              color: 'rgba(255,255,255,0.85)', borderBottom: '1px solid rgba(255,255,255,0.07)',
            }}>
              {label}
            </Link>
          ))}
          <a href={PHONE_HREF} style={{
            display: 'block', marginTop: 16,
            fontFamily: 'var(--font-sans)', fontSize: 18, fontWeight: 700, color: '#fff',
          }}>
            {PHONE}
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 960px) { .hdr-nav { display: none !important; } }
        @media (max-width: 640px) { .hdr-right { display: none !important; } .hdr-burger { display: block !important; } }
      `}</style>
    </header>
  )
}

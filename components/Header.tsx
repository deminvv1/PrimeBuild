'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const PHONE = '+7 (985) 933-01-21'
const PHONE_HREF = 'tel:+79859330121'

// TODO: вставить реальные ссылки на Telegram и MAX
const TELEGRAM_HREF = '#'
const MAX_HREF = '#'

const CONTACT_LINKS = [
  { label: 'Telegram', href: TELEGRAM_HREF },
  { label: 'MAX', href: MAX_HREF },
]

const GOLD_SHIMMER: React.CSSProperties = {
  background: 'linear-gradient(105deg, #b8924a 0%, #C9A96E 28%, #f5e4aa 50%, #C9A96E 72%, #b8924a 100%)',
  backgroundSize: '250% 100%',
  animation: 'btn-gold-shimmer 3.5s linear infinite',
}

const NAV = [
  { label: 'Проекты', href: '/proekty' },
  { label: 'Построено', href: '/postroeno' },
  { label: 'Подбор дома', href: '/podbor-doma' },
  { label: 'О компании', href: '/o-kompanii' },
  // { label: 'Отзывы', href: '/otzyvy' },
  { label: 'Контакты', href: '/kontakty' },
]

const T = '1s cubic-bezier(0.16, 1, 0.3, 1)'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Закрываем мобильное меню при смене маршрута (стандартный паттерн Next.js App Router).
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setMenuOpen(false) }, [pathname])

  return (
    <>
      <header style={{
        position: 'fixed',
        top: scrolled ? 8 : 0,
        left: scrolled ? 'max(24px, calc(50% - 580px))' : 0,
        right: scrolled ? 'max(24px, calc(50% - 580px))' : 0,
        zIndex: 9000,
        height: 56,
        borderRadius: scrolled ? 999 : 0,
        background: 'rgba(26,26,26,0.7)',
        border: `1px solid ${scrolled ? 'rgba(255,255,255,0.08)' : 'transparent'}`,
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        boxShadow: scrolled ? '0 8px 32px rgba(0,0,0,0.5)' : 'none',
        overflow: 'hidden',
        transition: [
          `top ${T}`,
          `left ${T}`,
          `right ${T}`,
          `border-radius ${T}`,
          'box-shadow 0.4s ease',
          'border-color 0.4s ease',
        ].join(', '),
      }}>
        <div style={{
          height: '100%', padding: '0 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>

          {/* Logo */}
          <Link href="/" style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
            <Image src="/images/logo.svg" alt="BuildX" height={36} width={158}
              style={{ objectFit: 'contain', objectPosition: 'left' }} priority />
          </Link>

          {/* Desktop nav */}
          <nav className="hdr-nav" style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            {NAV.map(({ label, href }) => (
              <Link key={href} href={href} style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 15, fontWeight: 500,
                color: pathname === href ? '#C9A96E' : 'rgba(255,255,255,0.65)',
                transition: 'color 0.2s',
              }}>
                {label}
              </Link>
            ))}
          </nav>

          {/* Phone + CTA */}
          <div className="hdr-right" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <a href={TELEGRAM_HREF} target="_blank" rel="noopener noreferrer" aria-label="Telegram" style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: 32, height: 32, borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.14)', color: 'rgba(255,255,255,0.65)',
              }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21.9 4.3 2.6 11.9c-1.2.5-1.2 1.2-.2 1.5l4.9 1.5 1.9 5.8c.2.6.4.8.9.8.5 0 .7-.2 1-.5l2.4-2.3 5 3.7c.9.5 1.5.2 1.8-.9L23.9 5.6c.3-1.4-.5-2-1.9-1.3zM8.5 14.9l-1.3-4.3L18 6.5c.5-.3.9 0 .6.4L8.5 14.9zm0 0" />
                </svg>
              </a>
              <a href={MAX_HREF} target="_blank" rel="noopener noreferrer" aria-label="MAX" style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: 32, height: 32, borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.14)',
                fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 800,
                color: 'rgba(255,255,255,0.65)',
              }}>
                MAX
              </a>
            </div>
            <a href={PHONE_HREF} style={{
              fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 500,
              color: 'rgba(255,255,255,0.70)', whiteSpace: 'nowrap',
            }}>
              {PHONE}
            </a>
            <Link href="/kontakty" className="btn-glow-gold" style={{
              ...GOLD_SHIMMER,
              color: '#1a1a1a',
              fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 700,
              letterSpacing: '0.8px', textTransform: 'uppercase',
              padding: '9px 20px', borderRadius: 999, whiteSpace: 'nowrap',
            }}>
              Заказать звонок
            </Link>
          </div>

          {/* Mobile burger */}
          <button
            className="hdr-burger"
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Меню"
            aria-expanded={menuOpen}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, display: 'none' }}
          >
            <span style={{ display: 'block', width: 20, height: 2, background: 'rgba(255,255,255,0.85)', marginBottom: 5, transition: 'transform 0.2s', transform: menuOpen ? 'rotate(45deg) translate(5px,5px)' : 'none' }} />
            <span style={{ display: 'block', width: 20, height: 2, background: 'rgba(255,255,255,0.85)', marginBottom: 5, opacity: menuOpen ? 0 : 1, transition: 'opacity 0.2s' }} />
            <span style={{ display: 'block', width: 20, height: 2, background: 'rgba(255,255,255,0.85)', transition: 'transform 0.2s', transform: menuOpen ? 'rotate(-45deg) translate(5px,-5px)' : 'none' }} />
          </button>
        </div>
      </header>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div style={{
          position: 'fixed', top: 80,
          left: '50%', transform: 'translateX(-50%)',
          width: 'calc(100% - 48px)', maxWidth: 1160,
          zIndex: 8999,
          background: 'rgba(26,26,26,0.7)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderRadius: 20,
          border: '1px solid rgba(255,255,255,0.08)',
          padding: '16px 24px 20px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
        }}>
          {NAV.map(({ label, href }) => (
            <Link key={href} href={href} style={{
              display: 'block', padding: '12px 0',
              fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 500,
              color: pathname === href ? '#C9A96E' : 'rgba(255,255,255,0.85)',
              borderBottom: '1px solid rgba(255,255,255,0.07)',
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
          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
            {CONTACT_LINKS.map(({ label, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" style={{
                flex: 1, textAlign: 'center', padding: '10px 0', borderRadius: 999,
                border: '1px solid rgba(255,255,255,0.14)',
                fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 700,
                color: 'rgba(255,255,255,0.85)',
              }}>
                {label}
              </a>
            ))}
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 960px) { .hdr-nav { display: none !important; } }
        @media (max-width: 640px) { .hdr-right { display: none !important; } .hdr-burger { display: block !important; } }
      `}</style>
    </>
  )
}

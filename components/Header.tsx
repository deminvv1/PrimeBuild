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

const GOLD_SHIMMER: React.CSSProperties = {
  background: 'linear-gradient(105deg, #b8924a 0%, #C9A96E 28%, #f5e4aa 50%, #C9A96E 72%, #b8924a 100%)',
  backgroundSize: '250% 100%',
  animation: 'btn-gold-shimmer 3.5s linear infinite',
}

const NAV = [
  { label: 'Проекты', href: '/proekty' },
  { label: 'Построено', href: '/postroeno' },
  { label: 'Подбор дома', href: '/proekty/podbor-doma' },
  { label: 'О компании', href: '/o-kompanii' },
  // { label: 'Отзывы', href: '/otzyvy' },
  { label: 'Контакты', href: '/kontakty' },
]

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  )
}

/** Мессенджер MAX: толстое кольцо-пузырь с хвостиком снизу слева. */
function MaxIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22 11.5C22 16.75 17.75 21 12.5 21c-1.03 0-2.03-.16-2.96-.47-.9 1.02-2.1 1.93-3.9 2.4-.5.13-1.2.2-1.62.13-.4-.07-.5-.5-.22-.78.9-.9 1.42-1.94 1.36-3.4A9.47 9.47 0 0 1 3 11.5C3 6.25 7.25 2 12.5 2S22 6.25 22 11.5Zm-9.5 4.9a4.9 4.9 0 1 0 0-9.8 4.9 4.9 0 0 0 0 9.8Z"
      />
    </svg>
  )
}

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
              <a href={TELEGRAM_HREF} target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="hdr-social-link hdr-social-link--tg" style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <TelegramIcon className="hdr-social-icon" />
              </a>
              <a href={MAX_HREF} target="_blank" rel="noopener noreferrer" aria-label="MAX" className="hdr-social-link hdr-social-link--max" style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <MaxIcon className="hdr-social-icon" />
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

          {/* Mobile quick actions */}
          <div className="hdr-mobile-actions" style={{ display: 'none', alignItems: 'center', gap: 14 }}>
            <a href={TELEGRAM_HREF} target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="hdr-social-link hdr-social-link--tg" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <TelegramIcon className="hdr-social-icon" />
            </a>
            <a href={MAX_HREF} target="_blank" rel="noopener noreferrer" aria-label="MAX" className="hdr-social-link hdr-social-link--max" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <MaxIcon className="hdr-social-icon" />
            </a>
            <a href={PHONE_HREF} aria-label="Позвонить" className="hdr-social-link hdr-social-link--phone" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg className="hdr-social-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2z" />
              </svg>
            </a>
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
        </div>
      )}

      <style>{`
        .hdr-social-link { color: rgba(255,255,255,0.65); transition: color 0.2s, opacity 0.2s; }
        .hdr-social-link:hover { color: #C9A96E; }
        .hdr-social-icon { width: 32px; height: 32px; }
        .hdr-social-link--tg { color: #fff; background: #29A9EA; border-radius: 50%; width: 34px; height: 34px; }
        .hdr-social-link--tg:hover { color: #fff; opacity: 0.85; }
        .hdr-social-link--tg .hdr-social-icon { width: 20px; height: 20px; }
        .hdr-social-link--max { color: #7C5CFC; }
        .hdr-social-link--max:hover { color: #7C5CFC; opacity: 0.8; }

        .hdr-social-link--tg, .hdr-social-link--max, .hdr-social-link--phone {
          animation: hdr-social-jiggle 6s ease-in-out infinite;
        }
        .hdr-social-link--max { animation-delay: 0.25s; }
        .hdr-social-link--phone { animation-delay: 0.5s; }
        @keyframes hdr-social-jiggle {
          0%, 90%, 100% { transform: rotate(0deg) scale(1); }
          91% { transform: rotate(-16deg) scale(1.22); }
          92.5% { transform: rotate(14deg) scale(1.22); }
          94% { transform: rotate(-11deg) scale(1.15); }
          95.5% { transform: rotate(8deg) scale(1.1); }
          97% { transform: rotate(-4deg) scale(1.03); }
          98.5% { transform: rotate(0deg) scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hdr-social-link--tg, .hdr-social-link--max, .hdr-social-link--phone { animation: none; }
        }
        @media (max-width: 960px) { .hdr-nav { display: none !important; } }
        @media (max-width: 640px) { .hdr-right { display: none !important; } .hdr-burger { display: block !important; } .hdr-mobile-actions { display: flex !important; } }
      `}</style>
    </>
  )
}

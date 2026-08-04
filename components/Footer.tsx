import Link from 'next/link'

const NAV = [
  { label: 'Проекты', href: '/proekty' },
  { label: 'Построено', href: '/postroeno' },
  { label: 'Подбор дома', href: '/proekty/podbor-doma' },
  { label: 'О компании', href: '/o-kompanii' },
  { label: 'Контакты', href: '/kontakty' },
]

const SEO_PAGES = [
  { label: 'Дома в стиле хай-тек', href: '/doma-hi-tek' },
  { label: 'Дома с плоской кровлей', href: '/doma-s-ploskoy-krovley' },
  { label: 'Дома с панорамным остеклением', href: '/doma-s-panoramnym-ostekleniem' },
  { label: 'Современные дома', href: '/sovremennye-doma' },
  { label: 'Монолитные дома', href: '/monolitnye-doma' },
  { label: 'Дом под ключ с мебелью', href: '/dom-pod-klyuch-s-mebeliyu' },
  { label: 'Одноэтажные дома', href: '/odnoetazhnye-doma' },
  { label: 'Дома барнхаус', href: '/doma-barnhaus' },
]

const GEO_PAGES = [
  { label: 'Красногорск', href: '/krasnogorsk' },
  { label: 'Химки', href: '/himki' },
  { label: 'Одинцово', href: '/odincovo' },
  { label: 'Мытищи', href: '/mytishchi' },
  { label: 'Истра', href: '/istra' },
  { label: 'Дмитров', href: '/dmitrov' },
  { label: 'Балашиха', href: '/balashiha' },
  { label: 'Подольск', href: '/podolsk' },
]

const C: React.CSSProperties = { maxWidth: 1200, margin: '0 auto', padding: '0 24px' }

export default function Footer() {
  return (
    <footer style={{ background: '#1a1a1a', padding: '56px 0 32px', position: 'relative' }}>
      <div style={{
        position: 'absolute', top: -120, left: 0, right: 0, height: 120,
        background: 'linear-gradient(to bottom, transparent, #1a1a1a)',
        pointerEvents: 'none',
      }} />
      <div style={C}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 40, marginBottom: 48 }}>
          <div>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 18, fontWeight: 800, color: '#fff', marginBottom: 12 }}>
              BuildX
            </p>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'rgba(255,255,255,0.35)', lineHeight: 1.6, margin: 0 }}>
              Строительство домов под ключ в Московской области
            </p>
          </div>
          <div>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: 16 }}>
              Разделы
            </p>
            {NAV.map(({ label, href }) => (
              <Link key={href} href={href} style={{
                display: 'block', fontFamily: 'var(--font-sans)', fontSize: 14,
                color: 'rgba(255,255,255,0.5)', marginBottom: 10,
              }}>
                {label}
              </Link>
            ))}
          </div>
          <div>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: 16 }}>
              Типы домов
            </p>
            {SEO_PAGES.map(({ label, href }) => (
              <Link key={href} href={href} style={{
                display: 'block', fontFamily: 'var(--font-sans)', fontSize: 14,
                color: 'rgba(255,255,255,0.5)', marginBottom: 10,
              }}>
                {label}
              </Link>
            ))}
          </div>
          <div>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: 16 }}>
              Районы МО
            </p>
            {GEO_PAGES.map(({ label, href }) => (
              <Link key={href} href={href} style={{
                display: 'block', fontFamily: 'var(--font-sans)', fontSize: 14,
                color: 'rgba(255,255,255,0.5)', marginBottom: 10,
              }}>
                {label}
              </Link>
            ))}
          </div>
          <div>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: 16 }}>
              Контакты
            </p>
            <a href="tel:+79859330121" style={{ display: 'block', fontFamily: 'var(--font-sans)', fontSize: 16, fontWeight: 600, color: '#fff', marginBottom: 6, textDecoration: 'none' }}>+7 (985) 933-01-21</a>
            <a href="mailto:Mail@vvsamohin.ru" style={{ display: 'block', fontFamily: 'var(--font-sans)', fontSize: 13, color: 'rgba(255,255,255,0.35)', marginBottom: 6, textDecoration: 'none' }}>Mail@vvsamohin.ru</a>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'rgba(255,255,255,0.35)', margin: 0, lineHeight: 1.5 }}>
              Пн – Пт: 9:00 – 20:00<br />Сб: 10:00 – 18:00
            </p>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'rgba(255,255,255,0.2)', margin: 0 }}>
            © {new Date().getFullYear()} BuildX. Все права защищены.
          </p>
          <Link href="/privacy" style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'rgba(255,255,255,0.2)' }}>
            Политика конфиденциальности
          </Link>
        </div>
      </div>
    </footer>
  )
}

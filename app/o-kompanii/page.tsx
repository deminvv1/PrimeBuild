import type { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.ru'

export const metadata: Metadata = {
  title: 'О компании — PrimeBuild',
  description: 'TODO: О строительной компании. История, команда, принципы работы.',
  alternates: { canonical: `${SITE_URL}/o-kompanii` },
}

const TEAM = [
  { name: 'TODO: Имя', role: 'Основатель / Руководитель проектов', photo: '' },
  { name: 'TODO: Имя', role: 'Главный архитектор', photo: '' },
]

export default function OKompaniiPage() {
  return (
    <main style={{ paddingTop: 72 }}>

      {/* About */}
      <section style={{ padding: '80px 0', background: '#242424' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px' }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#C9A96E', marginBottom: 12 }}>
            О нас
          </p>
          <h1 style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(28px,4vw,44px)', fontWeight: 800, color: '#1a1a1a', marginBottom: 32 }}>
            PrimeBuild
          </h1>
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: 16, color: 'rgba(26,26,26,0.65)', lineHeight: 1.9, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <p>
              TODO: история компании. Мы основали компанию с одной целью — строить качественные современные дома в Московской области по честной цене.
            </p>
            <p>
              TODO: о подходе. Наша команда специализируется на домах с плоской кровлей, монолитным каркасом и панорамным остеклением. Работаем только по МО.
            </p>
            <p>
              TODO: о ценообразовании. Цена ниже рынка — не маркетинговый ход.
            </p>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section style={{ background: '#1a1a1a', padding: '40px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 0 }}>
            {[
              { num: 'TODO', label: 'домов построено' },
              { num: '6 мес', label: 'средний срок' },
              { num: 'TODO лет', label: 'на рынке' },
              { num: '100%', label: 'сданы в срок' },
            ].map(({ num, label }, i) => (
              <div key={label} style={{ padding: '24px', borderRight: i < 3 ? '1px solid rgba(255,255,255,0.07)' : 'none' }}>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: 28, fontWeight: 900, color: '#C9A96E', lineHeight: 1 }}>{num}</div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'rgba(255,255,255,0.38)', marginTop: 6 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ padding: '80px 0', background: '#242424' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#C9A96E', marginBottom: 12 }}>
            Команда
          </p>
          <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: '#1a1a1a', marginBottom: 40 }}>
            Люди за проектами
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
            {TEAM.map(({ name, role, photo }) => (
              <div key={role} style={{ background: '#fff', borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(0,0,0,0.06)' }}>
                <div style={{ height: 240, background: '#ededea', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {photo
                    ? <img src={photo} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : <span style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'rgba(26,26,26,0.25)' }}>Фото</span>
                  }
                </div>
                <div style={{ padding: '20px' }}>
                  <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: 17, fontWeight: 700, color: '#1a1a1a', marginBottom: 4 }}>{name}</h3>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'rgba(26,26,26,0.45)', margin: 0 }}>{role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Documents */}
      <section style={{ padding: '80px 0', background: '#242424' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', padding: '0 24px' }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#C9A96E', marginBottom: 12 }}>
            Документы
          </p>
          <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: '#1a1a1a', marginBottom: 24 }}>
            Лицензии и документы
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 15, color: 'rgba(26,26,26,0.5)', lineHeight: 1.7, margin: 0 }}>
            TODO: реквизиты компании, допуски СРО и другие документы будут размещены здесь после регистрации.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 0', background: '#242424' }}>
        <div style={{ maxWidth: 560, margin: '0 auto', padding: '0 24px' }}>
          <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: '#1a1a1a', marginBottom: 12 }}>
            Готовы обсудить проект?
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 15, color: 'rgba(26,26,26,0.5)', marginBottom: 40 }}>
            Оставьте заявку — перезвоним и ответим на все вопросы.
          </p>
          <ContactForm source="o-kompanii" />
        </div>
      </section>

    </main>
  )
}

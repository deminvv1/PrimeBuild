'use client'

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
      <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: 24, color: '#fff' }}>Что-то пошло не так</h2>
      <button onClick={reset} style={{
        background: '#C9A96E', border: 'none', cursor: 'pointer',
        fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 700,
        color: '#111', padding: '12px 24px', borderRadius: 999,
      }}>
        Попробовать снова
      </button>
    </main>
  )
}

import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          background: '#1a1a1a',
          padding: '80px 90px',
        }}
      >
        <div style={{ display: 'flex', fontSize: 28, fontWeight: 700, letterSpacing: 4, color: '#C9A96E', textTransform: 'uppercase', marginBottom: 28 }}>
          BuildX
        </div>
        <div style={{ display: 'flex', fontSize: 64, fontWeight: 800, color: '#ffffff', lineHeight: 1.15, maxWidth: 980 }}>
          Строим дома под ключ в Московской области
        </div>
        <div style={{ display: 'flex', fontSize: 28, color: 'rgba(255,255,255,0.55)', marginTop: 32 }}>
          Срок 6 месяцев · Реальная цена · Технадзор
        </div>
      </div>
    ),
    { ...size }
  )
}

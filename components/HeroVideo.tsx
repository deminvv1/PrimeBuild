'use client'

import { useState } from 'react'

export default function HeroVideo() {
  const [visible, setVisible] = useState(false)

  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      onCanPlay={() => setVisible(true)}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        opacity: visible ? 1 : 0,
        transition: 'opacity 1.5s ease',
      }}
    >
      {/* Раскомментировать когда будет видео: */}
      {/* <source src="/videos/hero.mp4" type="video/mp4" /> */}
    </video>
  )
}

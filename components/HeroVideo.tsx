'use client'

import { useRef, useState } from 'react'

export default function HeroVideo() {
  const [visible, setVisible] = useState(false)
  const [muted, setMuted] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  const toggleSound = () => {
    const video = videoRef.current
    if (!video) return
    const next = !muted
    video.muted = next
    if (!next) video.play().catch(() => {})
    setMuted(next)
  }

  return (
    <>
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onLoadedData={() => setVisible(true)}
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
        <source src="/video/video-hero.mp4" type="video/mp4" />
      </video>

      <button
        onClick={toggleSound}
        aria-label={muted ? 'Включить звук' : 'Выключить звук'}
        style={{
          position: 'absolute',
          bottom: 32,
          right: 32,
          zIndex: 2,
          width: 48,
          height: 48,
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.25)',
          background: 'rgba(0,0,0,0.35)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: '#fff',
        }}
      >
        {muted ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
        )}
      </button>
    </>
  )
}

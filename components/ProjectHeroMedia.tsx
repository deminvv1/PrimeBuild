'use client'

import { useState } from 'react'

interface Props {
  video?: string
  image?: string
  alt: string
}

export default function ProjectHeroMedia({ video, image, alt }: Props) {
  const [videoErr, setVideoErr] = useState(false)
  const showImage = !video || videoErr

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#111' }}>
      {video && !videoErr && (
        <video
          autoPlay muted loop playsInline
          onError={() => setVideoErr(true)}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        >
          <source src={video} type="video/mp4" />
        </video>
      )}
      {showImage && image && (
        <div className="ken-burns">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt={alt}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>
      )}
    </div>
  )
}

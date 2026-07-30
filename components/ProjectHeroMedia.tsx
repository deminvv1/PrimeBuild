'use client'

import { useState } from 'react'
import ImageLightbox from './ImageLightbox'

interface Props {
  video?: string
  image?: string
  alt: string
}

export default function ProjectHeroMedia({ video, image, alt }: Props) {
  const [videoErr, setVideoErr] = useState(false)
  const [zoomOpen, setZoomOpen] = useState(false)
  const showImage = !video || videoErr

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#242424' }}>
      {video && !videoErr && (
        <video
          className="hero-media-fit"
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
            className="hero-media-fit"
            src={image}
            alt={alt}
            onClick={() => setZoomOpen(true)}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block', cursor: 'zoom-in' }}
          />
        </div>
      )}
      {showImage && image && zoomOpen && (
        <ImageLightbox src={image} alt={alt} onClose={() => setZoomOpen(false)} />
      )}
      <style>{`
        @media (max-width: 600px) {
          .hero-media-fit { object-fit: contain !important; object-position: center 32% !important; }
        }
      `}</style>
    </div>
  )
}

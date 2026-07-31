'use client'

import { useState } from 'react'
import ImageLightbox from './ImageLightbox'

interface GalleryItem {
  src: string
  alt: string
}

interface Props {
  video?: string
  image?: string
  alt: string
  /** Полная галерея проекта (главное фото + остальные) — чтобы из хиро-фото можно было свайпом уйти к следующим. */
  gallery?: GalleryItem[]
}

export default function ProjectHeroMedia({ video, image, alt, gallery }: Props) {
  const [videoErr, setVideoErr] = useState(false)
  const [zoomOpen, setZoomOpen] = useState(false)
  const [index, setIndex] = useState(0)
  const showImage = !video || videoErr
  const images = gallery && gallery.length > 0 ? gallery : (image ? [{ src: image, alt }] : [])

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
            onClick={() => { setIndex(0); setZoomOpen(true) }}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block', cursor: 'zoom-in' }}
          />
        </div>
      )}
      {showImage && images.length > 0 && zoomOpen && (
        <ImageLightbox images={images} index={index} onIndexChange={setIndex} onClose={() => setZoomOpen(false)} />
      )}
      <style>{`
        @media (max-width: 600px) {
          .hero-media-fit { object-fit: contain !important; object-position: center 32% !important; }
        }
      `}</style>
    </div>
  )
}

'use client'

import { useState } from 'react'
import Image from 'next/image'
import ImageLightbox from './ImageLightbox'

interface GalleryItem {
  src: string
  alt: string
}

interface Props {
  src: string
  alt: string
  sizes?: string
  objectFit?: 'contain' | 'cover'
  /** Полный список фото галереи и позиция текущего — для свайпа/стрелок между фото в лайтбоксе. */
  gallery?: GalleryItem[]
  galleryIndex?: number
}

export default function ZoomableImage({ src, alt, sizes = '100vw', objectFit = 'contain', gallery, galleryIndex = 0 }: Props) {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(galleryIndex)

  const images = gallery && gallery.length > 0 ? gallery : [{ src, alt }]

  return (
    <>
      <div
        onClick={() => { setIndex(gallery ? galleryIndex : 0); setOpen(true) }}
        style={{ position: 'absolute', inset: 0, cursor: 'zoom-in' }}
      >
        <Image src={src} alt={alt} fill sizes={sizes} style={{ objectFit }} />
      </div>
      {open && (
        <ImageLightbox
          images={images}
          index={index}
          onIndexChange={setIndex}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  )
}
